# TrustDeposit

A full-stack Web3 platform for holding and releasing residential security deposits with unparalleled transparency.  
Tenants lock their deposit on-chain, AI analyzes property photos to recommend a fair refund split at move-out, and both parties can track the whole flow in a slick Next.js dashboard.

---

## ✨ Key Features

* **On-chain escrow** — Solidity smart contract holds ETH deposits per lease; only authorised signer or arbitrator can release funds.
* **AI damage assessment** — Python + YOLOv8 service compares _move-in_ vs _move-out_ photos and scores damage.
* **Fair refund calculation** — Backend converts AI score into tenant / landlord share and submits a signed transaction to the contract.
* **Dispute & arbitration** — Either party can escalate; an arbitrator contract method resolves and splits the deposit.
* **Modern web UI** — Next 14, Tailwind & shadcn/ui, Wagmi v2 for wallet connectivity, React Query for data.
* **IPFS storage** — Images uploaded directly from the browser to Web3 Storage.

---

## 🗂 Repository Structure

| Path | Description |
|------|-------------|
| `frontend/` | Next.js app (TypeScript) — user dashboards, wallet connect, file uploads. |
| `backend/contracts` | Solidity sources (Hardhat). |
| `backend/scripts` | Hardhat deployment & interaction scripts. |
| `backend/ai-service/` | FastAPI micro-service that runs YOLOv8 & returns damage score. |
| `backend/src` | Helper TypeScript that signs/refines AI output and calls the contract. |

---

## 🧰 Tech Stack

Frontend
* Next.js 14 / React 18 / TypeScript
* Tailwind CSS & shadcn/ui
* Wagmi + Web3Modal
* @tanstack/react-query
* Web3.Storage SDK

Smart Contracts
* Solidity ^0.8.25
* Hardhat & TypeChain
* OpenZeppelin contracts

AI Service
* Python 3.10
* FastAPI
* Ultralytics YOLOv8
* sqlite (simple metadata store)

---

## ⚙️ Local Development

### Prerequisites
* **Node.js >= 20** & npm 8+
* **Python >= 3.10** (for AI service)
* **Git & Docker** (optional)

### 1. Clone & install
```bash
# root
git clone https://github.com/<you>/trustdeposit.git
cd trustdeposit

# frontend
cd frontend && npm install && cd ..

# backend contracts
cd backend && npm install && cd ..

# AI service (venv recommended)
cd backend/ai-service
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd ../../..
```

### 2. Environment variables
Create the following files (examples included in repo):
* `frontend/.env.local`   – NEXT_PUBLIC_CHAIN_ID, NEXT_PUBLIC_CONTRACT_ADDRESS, WEB3_STORAGE_TOKEN
* `backend/.env`          – PRIVATE_KEY, RPC_URL, CONTRACT_ADDRESS
* `backend/ai-service/.env` – (any model config)

### 3. Run everything
```bash
# 3 terminals or tmux panes

# a) Local Hardhat node & deploy contract
cd backend
npx hardhat node &
npx hardhat run scripts/deploy.ts --network localhost

# b) AI service
cd backend/ai-service
uvicorn app.main:app --reload &

# c) Frontend
cd frontend
npm run dev
```
Visit `http://localhost:3000` and connect a wallet (MetaMask on localhost 31337).

---

## 🧪 Testing
```bash
cd backend
npx hardhat test
```

---

## 🚀 Deployment

| Piece | Suggested platform |
|-------|--------------------|
| Smart contract | Hardhat → any EVM (Goerli, Sepolia, Base, etc.) |
| Frontend | Vercel / Netlify (`npm run build && next start`) |
| AI service | Fly.io / Railway / Render / Docker container |

---

## 📄 License

MIT © 2025 TrustDeposit contributors

---

## 🤝 Contributing
Pull requests welcome!  
1. Fork & create a branch.  
2. Run lint (`npm run lint`), tests, and `prettier --write`.  
3. Open a PR describing your change.

---

## Contact
* **Website**: _coming soon_  
* **X / Twitter**: [@trustdeposit](https://twitter.com/trustdeposit)

