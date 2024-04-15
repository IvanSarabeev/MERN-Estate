import Button from "components/HTML/Button";
import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "../../services/apiGoogle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type GoogleProps = {
  title: string;
};

const GoogleAuth = ({ title }: GoogleProps) => {
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
      className="w-full md:w-56 inline-flex items-center justify-center font-medium regular-14 text-black border rounded-lg px-5 py-2.5 text-center bg-white hover:bg-[#f3f4f6]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50"
    >
      <FcGoogle className="size-5 mr-2" />
      {title}
      <span className="sr-only">Google Sign Authentication</span>
    </Button>
  );
};

export default GoogleAuth;
