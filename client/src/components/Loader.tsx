import { ThreeCircles } from "react-loader-spinner";

function Loader() {
  return (
    <div className="w-full flexCenter mx-auto">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
