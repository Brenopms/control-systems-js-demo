import { useMemo, useState } from "react";
import * as z from "zod";
import { useForm, Controller, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "./TextField";
import {
  transferFunction,
  ITransferFunction,
  RootLocusData,
  Point,
  BodeData,
  NyquistData,
} from "control-systems-js";
import { Outcome } from "./Outcome";
import { toSuperscriptExpression } from "../utils/supescript";
import { tfFormInputSchema } from "../validations/tfInput";
import { TransferFunctionCharts } from "./charts/TransferFunctionCharts";
import { complexToString } from '../utils/complexToString';

// Define the form inputs as a TypeScript interface
type TfFormValues = z.infer<typeof tfFormInputSchema>;

export const TransferFunctionForm = () => {
  const [tf, setTf] = useState<ITransferFunction>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setRootLocus] = useState<RootLocusData>();
  const [step, setStep] = useState<Point<number>[]>();
  const [impulse, setImpulse] = useState<Point<number>[]>();
  const [bode, setBode] = useState<BodeData>();
  const [nyquist, setNyquist] = useState<NyquistData>();

  // Use useForm to handle the form inputs and validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isValidating },
  } = useForm<TfFormValues>({
    resolver: zodResolver(tfFormInputSchema),
  });

  const onReset = () => {
    setTf(undefined);
    reset();
  };

  // Handle form submission
  const onSubmit = (data: TfFormValues) => {
    setIsLoading(true);
    const tf = transferFunction(data);
    setTf(tf);
  };

  useMemo(() => {
    const rlocus = tf?.rlocus();
    setRootLocus(rlocus);

    const step = tf?.step();
    setStep(step);

    const impulse = tf?.impulse();
    setImpulse(impulse);

    const bode = tf?.bode();
    setBode(bode);

    const nyquist = tf?.nyquist();
    setNyquist(nyquist);

    setIsLoading(false);
  }, [tf]);

  return (
    <>
      <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-13 mt-16 lg:mx-0 lg:flex lg:max-w-none">
        <div className="px-4 py-6 md:p-6 sm:p-8 lg:flex-auto items-center flex">
          <form
            method="POST"
            autoComplete="off"
            className="space-y-8 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="numerator"
              control={control}
              render={({ field }) => (
                <TextField
                  name="numerator"
                  label="Numerator"
                  value={field.value}
                  error={errors.numerator?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <Controller
              name="denominator"
              control={control}
              render={({ field }) => (
                <TextField
                  name="denominator"
                  label="Denominator"
                  value={field.value}
                  error={errors.denominator?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-8">
              <button
                disabled={isDirty && !isValidating && !isValid}
                type="submit"
                className="flex-2 align-middle justify-center btn btn-primary disabled:opacity-50 flex flex-row"
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={onReset}
                className="flex-1 btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-lg lg:flex-shrink-0">
          <div className="rounded-2xl bg-gray-50 dark:bg-black text-center ring-1 ring-inset ring-gray-900/5 dark:ring-gray-700 lg:flex lg:flex-col lg:justify-center py-8">
            <div className="space-y-8">
              <Outcome
                withDivider
                label="Expression"
                value={toSuperscriptExpression(tf?.toString() || "")}
              />
              <Outcome
                withDivider
                label="Zeros"
                value={
                  tf
                    ?.zero()
                    .map((i) => complexToString(i, 2))
                    .join(", ") || ""
                }
              />
              <Outcome
                label="Poles"
                value={
                  tf
                    ?.pole()
                    .map((i) => complexToString(i, 2))
                    .join(", ") || ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {tf && !isLoading && (
        <TransferFunctionCharts
          bode={bode}
          nyquist={nyquist}
          impulse={impulse}
          step={step}
          zeros={tf.zero()}
          poles={tf.pole()}
        />
      )}
    </>
  );
};
