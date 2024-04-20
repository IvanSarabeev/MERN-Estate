import Button from "components/HTML/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { gitHubAuth } from "services/apiGitHub";

type GitHubProps = {
  title: string;
};

const GitHubAuth = ({ title }: GitHubProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hangleGitHubSubmit = async () => {
    try {
      await gitHubAuth(dispatch);

      navigate("/profile");
    } catch (error) {
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
