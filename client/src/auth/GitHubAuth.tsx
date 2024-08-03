import Button from "components/HTML/Button";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { githubAuthentication } from "api/authManager";
import { toast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";

type GitHubProps = {
  title: string;
};

const GitHubAuth = ({ title }: GitHubProps) => {
  const dispatch = useDispatch();

  const hangleGitHubSubmit = async () => {
    try {
      await githubAuthentication(dispatch);

      toast({
        title: "Authenticated",
        description: "Authentication Successful",
      });

      setTimeout(() => {
        redirect("/account");
      }, 800);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Uh oh! Something went wrong.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      throw new Error(`You can't login via GitHub: ${error}`);
    }
  };
  return (
    <Button
      type="button"
      title="GitHub Auth Modal"
      aria-label="Github Auth"
      onClick={hangleGitHubSubmit}
      className="auth-btn"
    >
      <FaGithub className="size-5 mr-2" />
      {title}
      <span className="sr-only">GitHub Auth Authentication</span>
    </Button>
  );
};

export default GitHubAuth;
