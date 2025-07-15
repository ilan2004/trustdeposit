// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TrustDeposit
 * @notice Simple on-chain escrow for rental security deposits.
 *         – Tenant calls `holdDeposit` (payable) supplying a `leaseId` that uniquely identifies the lease.
 *         – Backend signer (or landlord for MVP) calls `releaseDeposit` with the amount that should return to the tenant.
 *           Remaining balance automatically goes to landlord.
 *         – Future: dispute flow can freeze & resolve deposits.
 */
contract TrustDeposit is Ownable, ReentrancyGuard {
    /// @dev signer address authorised to release deposits (settable by owner).
    address public backendSigner;
    address public arbitrator;

    struct Lease {
        address tenant;
        address landlord;
        uint256 amount; // total deposit held (wei)
        bool    active; // true after deposit, false after release
        bool    disputed; // true when dispute escalated
    }

    /// @notice mapping from leaseId hash to Lease data
    mapping(bytes32 => Lease) public leases;

    /// ============================= EVENTS =============================
    event DepositHeld(bytes32 indexed leaseId, address indexed tenant, address indexed landlord, uint256 amount);
    event DepositReleased(bytes32 indexed leaseId, uint256 tenantShare, uint256 landlordShare);
    event DisputeEscalated(bytes32 indexed leaseId, address indexed caller);
    event DisputeResolved(bytes32 indexed leaseId, uint256 tenantShare, uint256 landlordShare);
    event ArbitratorChanged(address indexed newArbitrator);

    /// ============================= ERRORS =============================
    error NotTenant();
    error LeaseAlreadyActive();
    error LeaseNotActive();
    error NotBackendSigner();
    error InvalidShare();
    error AlreadyDisputed();
    error NotDisputed();
    error NotArbitrator();
    error NotParticipant();

    constructor(address _backendSigner, address _arbitrator) Ownable(msg.sender) {
        backendSigner = _backendSigner;
        arbitrator = _arbitrator;
    }

    /// @notice Owner can update backendSigner address.
    function setBackendSigner(address _newSigner) external onlyOwner {
        backendSigner = _newSigner;
    }

    function setArbitrator(address _newArb) external onlyOwner {
        arbitrator = _newArb;
        emit ArbitratorChanged(_newArb);
    }

    /// @param leaseId keccak256 hash that uniquely represents tenant+landlord+nonce.
    /// @param landlord address of the landlord that will ultimately receive funds.
    function holdDeposit(bytes32 leaseId, address landlord) external payable nonReentrant {
        if (landlord == address(0)) revert InvalidShare();
        if (msg.value == 0) revert InvalidShare();
        Lease storage l = leases[leaseId];
        if (l.active) revert LeaseAlreadyActive();

        l.tenant = msg.sender;
        l.landlord = landlord;
        l.amount = msg.value;
        l.active = true;
        l.disputed = false;

        emit DepositHeld(leaseId, msg.sender, landlord, msg.value);
    }

    /// @notice Release deposit according to AI calculation.
    /// @param leaseId lease identifier used in holdDeposit.
    /// @param tenantShareWei amount to refund to tenant in wei (must be <= deposit amount).
    function releaseDeposit(bytes32 leaseId, uint256 tenantShareWei) external nonReentrant {
        Lease storage l = leases[leaseId];
        if (l.disputed) revert AlreadyDisputed();
        if (msg.sender != backendSigner) revert NotBackendSigner();
        if (!l.active) revert LeaseNotActive();
        if (tenantShareWei > l.amount) revert InvalidShare();

        uint256 landlordShare = l.amount - tenantShareWei;
        l.active = false; // mark inactive before external calls

        if (tenantShareWei > 0) {
            payable(l.tenant).transfer(tenantShareWei);
        }
        if (landlordShare > 0) {
            payable(l.landlord).transfer(landlordShare);
        }

        emit DepositReleased(leaseId, tenantShareWei, landlordShare);
    }

    /// @notice Tenant or landlord can escalate dispute to arbitrator.
    function escalateDispute(bytes32 leaseId) external {
        Lease storage l = leases[leaseId];
        if (!l.active) revert LeaseNotActive();
        if (l.disputed) revert AlreadyDisputed();
        if (msg.sender != l.tenant && msg.sender != l.landlord) revert NotParticipant();
        l.disputed = true;
        emit DisputeEscalated(leaseId, msg.sender);
    }

    /// @notice Arbitrator resolves dispute and splits deposit.
    function resolveDispute(bytes32 leaseId, uint256 tenantShareWei) external nonReentrant {
        if (msg.sender != arbitrator) revert NotArbitrator();
        Lease storage l = leases[leaseId];
        if (!l.disputed) revert NotDisputed();
        if (tenantShareWei > l.amount) revert InvalidShare();

        uint256 landlordShare = l.amount - tenantShareWei;
        l.active = false;
        l.disputed = false;

        if (tenantShareWei > 0) {
            payable(l.tenant).transfer(tenantShareWei);
        }
        if (landlordShare > 0) {
            payable(l.landlord).transfer(landlordShare);
        }

        emit DisputeResolved(leaseId, tenantShareWei, landlordShare);
    }

    /// @dev Reserved storage space to allow for layout changes in the future.
    uint256[45] private __gap;
}
