// Minimal type declarations to satisfy the TypeScript compiler when using `web3.storage`.
// These are NOT complete. They only cover the subset of the API used in this codebase.
// If you need additional methods/properties later, extend this file accordingly.

// See: https://www.npmjs.com/package/web3.storage for full documentation.

declare module "web3.storage" {
  /**
   * Options accepted by the Web3Storage constructor.
   */
  interface Web3StorageOptions {
    token: string;
    endpoint?: string;
  }

  /**
   * A very small subset of the `web3.storage` client that we actually use.
   */
  export class Web3Storage {
    constructor(options: Web3StorageOptions);

    /**
     * Store an array of `File`/`Blob` objects and return the resulting CID string.
     */
    put(files: File[]): Promise<string>;
  }

  /**
   * Re-export `File` under a different name so we can refer to it via `Web3File` in imports.
   */
  export type File = globalThis.File;
}
