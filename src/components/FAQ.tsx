export const FAQ = () => {
  return (
    <div className="max-w-screen-xl p-8 mx-auto pb-52">
      <h2 className="mb-12 text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 underline underline-offset-6 decoration-8 decoration-brand">
        FAQs
      </h2>
      <ul className="flex flex-col items-start gap-8">
        <li>
          <p className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            What is a control system?
          </p>
          <div className="mt-2 text-base leading-6 text-gray-500 dark:text-gray-400">
            A control system manages, commands, directs, or regulates the
            behavior of other devices or systems using control loops. It can
            range from a single home heating controller using a thermostat
            controlling a domestic boiler to large industrial control systems
            which are used for controlling processes or machines. The control
            systems are designed via control engineering process. Directly from
            wikipedia - :)
          </div>
        </li>
        <li>
          <p className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            What does this application do?
          </p>
          <div className="mt-2 text-base leading-6 text-gray-500 dark:text-gray-400">
            This application takes a <i>transfer function</i> and displays the
            associated zeros and poles as well as plotting a couple of the more
            common charts for Stability Analysis, Time-Domain and
            Frequency-Domain behavior
          </div>
        </li>
        <li>
          <p className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            How does it work?
          </p>
          <div className="mt-2 text-base leading-6 text-gray-500 dark:text-gray-400">
            You first have to input the transfer function numerator and
            denominator. This can be done writing numbers split by a ";". The
            first number will be the highest coefficient of the expression. A
            "1;2;3" represents the expression: "s² + 2s + 3".
          </div>
        </li>
        <li>
          <p className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            But why?
          </p>
          <div className="mt-2 text-base leading-6 text-gray-500 dark:text-gray-400">
            This is actually just a demo for demonstrating the functionalities
            of a{" "}
            <a
              href="https://github.com/Brenopms/systems-controls-js"
              className="text-brand hover:underline"
            >
              Typescript library
            </a>{" "}
            built for aiding in system control analysis. There are just visual
            examples of the data generated using the package.
          </div>
        </li>
        <li>
          <p className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            How can I contribute?
          </p>
          <div className="mt-2 text-base leading-6 text-gray-500 dark:text-gray-400">
            You can check, make questions, open issues and pull requests in the{" "}
            <a
              href="https://github.com/Brenopms/systems-controls-js"
              className="text-brand hover:underline"
            >
              original repository
            </a>
            . You can also check the code for this example{" "}
            <a
              href="https://github.com/Brenopms/systems-controls-js-demo"
              className="text-brand hover:underline"
            >
              here
            </a>
            .
          </div>
        </li>
      </ul>
    </div>
  );
};
