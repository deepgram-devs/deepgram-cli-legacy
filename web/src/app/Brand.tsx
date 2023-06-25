import DeepgramLogo from "./DeepgramLogo";

const Brand = () => {
  return (
    <span className="flex items-center">
      <span className="text-black dark:text-white">
        <DeepgramLogo />
      </span>
      <h1 className="ml-2 pb-[0.15rem] text-2xl font-bold gradient-text">
        CLI
      </h1>
    </span>
  );
};

export default Brand;
