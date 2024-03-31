import Button from "components/HTML/Button";
import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "../../services/apiGoogle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSubmit = async () => {
    try {
      await googleAuth(dispatch);
      navigate("/");
    } catch (error) {
      throw new Error(`You can't login via Google: ${error}`);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleSubmit}
      aria-label="Google Auth"
      title="Google Auth Modal"
      className="h-10 w-auto max-w-[400px] relative flex items-center justify-center whitespace-nowrap regular-16 text-center rounded-[20px] border border-solid border-[#747775] outline-none px-3 shadow-md cursor-pointer bg-white transition-all ease-in hover:opacity-95 hover:scale105"
    >
      <FcGoogle height={20} width={20} className="mx-3" />
      Continue with Google
      <span className="sr-only">Continue with Google</span>
    </Button>
  );
};

export default GoogleAuth;
