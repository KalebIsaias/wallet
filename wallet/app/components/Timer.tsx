import NumberFlow from "@number-flow/react";
import { ComponentProps, useEffect, useState } from "react";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

const format: ComponentProps<typeof NumberFlow>["format"] = {
  minimumIntegerDigits: 2,
};

export function Timer() {
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);

      if (seconds === 59) {
        setSeconds(0);
        setMinutes((minutes) => minutes + 1);
      }

      if (minutes === 59 && seconds === 59) {
        setSeconds(0);
        setMinutes(0);
        setHours((hours) => hours + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <div className="font-mono text-3xl flex">
        <NumberFlow value={hours} format={format} />
        <div>:</div>
        <NumberFlow value={minutes} format={format} />
        <div>:</div>
        <NumberFlow value={seconds} format={format} />
      </div>

      <div>
        <button
          onClick={() => {
            setHours(0);
            setMinutes(0);
            setSeconds(0);
          }}
          className="bg-slate-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
