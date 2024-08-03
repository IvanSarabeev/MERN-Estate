import Button from "components/HTML/Button";
import { FcGoogle } from "react-icons/fc";
import { googleAuthentication } from "api/authManager";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "components/ui/use-toast";

type GoogleProps = {
  title: string;
};

const GoogleAuth = ({ title }: GoogleProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSubmit = async () => {
    try {
      await googleAuthentication(dispatch);

      toast({
        title: "Authenticated",
        description: "Authentication Successful",
      });

      setTimeout(() => {
        navigate("/account");
      }, 800);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authenticated",
        description: "Authentication Successful",
      });

      throw new Error(`You can't login via Google: ${error}`);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleSubmit}
      aria-label="Google Auth"
      title="Google Auth Modal"
      className="auth-btn"
    >
      <FcGoogle className="size-5 mr-2" />
      {title}
      <span className="sr-only">Google Sign Authentication</span>
    </Button>
  );
};

export default GoogleAuth;
