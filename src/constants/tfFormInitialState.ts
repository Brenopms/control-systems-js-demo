import { TransferFunctionFormState } from "../types/tfFormState";

export const tfFormInitialState: Readonly<TransferFunctionFormState> = {
  transferFunctionString: "",
  zeros: [],
  poles: [],
  errors: {
    numerator: null,
    denominator: null,
  },
};
