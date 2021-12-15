declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: string;
      TON_ENDPOINT: string;
      NODE_ENV?: "development";
      // Addresses
      DEX_ROOT_ADDRESS: string;
      LIMIT_ROOT_ADDRESS: string;
      // Fees
      SWAP_PROCESSING_FEE: string;
      SWAP_GAS_FEE: string;
      LIMIT_ORDER_PROCESSING_FEE: string;
      LIMIT_ORDER_GAS_FEE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
