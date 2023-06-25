"use client";

import DeepgramLogo from "./DeepgramLogo";
import LightModeToggle from "./LightModeToggle";

const Brand = () => {
  return (
    <span className="flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-black dark:text-white">
          <DeepgramLogo />
        </span>
        <h1 className="ml-4 pb-1 text-4xl font-bold gradient-text">CLI</h1>
      </div>
      <LightModeToggle />
    </span>
  );
};

export default Brand;
