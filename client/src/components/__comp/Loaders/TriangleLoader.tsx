import { Triangle } from "react-loader-spinner";

const TriangleLoader = () => {
  return (
    <div className="h-screen w-full flexCenter mx-auto">
      <Triangle
        visible={true}
        height={120}
        width={120}
        color=""
        ariaLabel="triangle-loading"
        wrapperClass=""
      />
    </div>
  );
};

export default TriangleLoader;
