export interface TransferFunctionFormErrors {
  numerator: string | null;
  denominator: string | null;
}

export interface TransferFunctionFormState {
  transferFunctionString: string;
  zeros: string[];
  poles: string[];
  errors: TransferFunctionFormErrors;
}
