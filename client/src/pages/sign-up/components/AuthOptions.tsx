import React, { memo } from "react";
import GoogleAuth from "auth/GoogleAuth";
import GitHubAuth from "auth/GitHubAuth";

const AuthOptions: React.FC = () => {
  return (
    <>
      <div className="gap-2 flex flex-col md:flex-row items-center justify-center lg:justify-start mt-3">
        <GoogleAuth title="Sign up with Google" />
        <GitHubAuth title="Sign up with GitHub" />
      </div>
      <span className="flex items-center my-4">
        <span className="h-px flex-1 bg-[#e5e7eb]"></span>
        <span className="shrink-0 px-5 text-slate-500">or</span>
        <span className="h-px flex-1 bg-[#e5e7eb]"></span>
      </span>
    </>
  );
};

const MemoAuthOptions = memo(AuthOptions);

export default MemoAuthOptions;
