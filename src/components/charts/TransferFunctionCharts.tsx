import {
  BodeData,
  Complex,
  NyquistData,
  Point,
} from "systems-control-js";
import { BodeCharts } from './BodeCharts';
import { ImpulseChart } from './ImpulseChart';
import { NyquistChart } from './NyquistChart';
import { PolesAndZerosChart } from "./PolesAndZerosChart";
import { StepChart } from './StepChart';

export type TransferFunctionChartsProps = {
  bode?: BodeData;
  nyquist?: NyquistData;
  impulse?: Point<number>[];
  step?: Point<number>[];
  poles?: Complex[];
  zeros?: Complex[];
};

export const TransferFunctionCharts = ({
  bode,
  nyquist,
  impulse,
  step,
  poles,
  zeros,
}: TransferFunctionChartsProps) => {
  return (
    <>
      <div className="mx-auto max-w-2xl rounded-3xl sm:mt-13 mt-16 lg:mx-0 lg:flex lg:max-w-none">
        <div className="items-center flex w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900">
          {poles && zeros && <PolesAndZerosChart poles={poles} zeros={zeros} />}
        </div>
        {/*           <div className="items-center flex w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900">
                  {rootLocus ? <RlocusChart rlocus={rootLocus} /> : null}
                </div> */}
      </div>
      <div className="mx-auto max-w-2xl rounded-3xl sm:mt-13 mt-16 lg:mx-0 lg:flex lg:max-w-none">
        <div className="items-center flex w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900">
          {step && <StepChart step={step} />}
        </div>
        <div className="items-center flex w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900">
          {impulse && <ImpulseChart impulse={impulse} />}
        </div>
      </div>
      <div className="mx-auto max-w-2xl rounded-3xl sm:mt-13 mt-16 lg:mx-0 lg:flex lg:max-w-none">
        <div className="items-center flex w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900">
          {bode && <BodeCharts bode={bode} />}
        </div>
      </div>
      <div className="mx-auto max-w-2xl rounded-3xl sm:mt-13 mt-16 lg:mx-0 lg:flex lg:max-w-none">
        <div className="items-center flex w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900">
          {nyquist && <NyquistChart nyquist={nyquist} />}
        </div>
      </div>
    </>
  );
};
