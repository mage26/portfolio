"use client";

import { useState, useEffectEvent, useEffect } from "react";
import * as Switch from "@radix-ui/react-switch";

function ReduceMotion({ label }: { label: string }) {
  const [isMotionReduced, setMotionReduced] = useState(false);

  const changeMotion = (value: boolean) => {
    if (value) {
      document.body.classList.add("motion-off");
      document.body.classList.remove("motion-on");
    } else {
      document.body.classList.remove("motion-off");
      document.body.classList.add("motion-on");
    }

    setMotionReduced(value);
  };

  const initialMotion = useEffectEvent(() => {
    changeMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  });

  useEffect(() => {
    initialMotion();
  }, []);

  return (
    <div
      className="flex items-center justify-center text-center md:whitespace-nowrap"
      data-checked={isMotionReduced}
    >
      <label
        className="mr-2 cursor-pointer select-none text-sm uppercase"
        htmlFor="reduce-motion"
      >
        {label}
      </label>
      <Switch.Root
        id="reduce-motion"
        className="group relative h-5 w-9 rounded-full border border-foreground bg-background p-0.5 data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary-dark"
        onCheckedChange={changeMotion}
        checked={isMotionReduced}
      >
        <Switch.Thumb className="relative block aspect-square h-full w-auto translate-x-0 rounded-full bg-foreground transition will-change-transform group-data-[state=checked]:translate-x-4" />
      </Switch.Root>
    </div>
  );
}

export default ReduceMotion;
