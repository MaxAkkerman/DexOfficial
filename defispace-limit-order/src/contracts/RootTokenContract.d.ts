export declare const RootTokenContractContract: {
  abi: {
    "ABI version": number;
    header: string[];
    functions: (
      | {
          name: string;
          inputs: {
            name: string;
            type: string;
          }[];
          outputs: {
            name: string;
            type: string;
          }[];
        }
      | {
          name: string;
          inputs: {
            name: string;
            type: string;
          }[];
          outputs: {
            components: {
              name: string;
              type: string;
            }[];
            name: string;
            type: string;
          }[];
        }
    )[];
    data: {
      key: number;
      name: string;
      type: string;
    }[];
    events: never[];
  };
  tvc: string;
  code: string;
};
