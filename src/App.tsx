import { FAQ } from "./components/FAQ";
import { ThemeColorSwitcher } from "./components/ThemeColorSwitcher";
import { TransferFunctionForm } from "./components/TransferFunctionForm";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

function App() {
  return (
    <main className="bg-white dark:bg-black relative">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-0">
          <ThemeSwitcher />

          <div className="mx-auto max-w-2xl sm:text-center">
            <ThemeColorSwitcher />
            <h2 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl text-center">
              Control Systems Calculator
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white text-center">
              Visualize and Design Control Systems with the aid of the{" "}
              <i>
                <a
                  className="text-brand hover:underline"
                  href="https://github.com/Brenopms/systems-controls-js"
                >
                  systems-control-js
                </a>
              </i>
              {" "}package
            </p>
          </div>

          <TransferFunctionForm />
        </div>
      </div>

      <FAQ />
    </main>
  );
}

export default App;
