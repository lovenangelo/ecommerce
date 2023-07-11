import { Button } from "../ui/button";

const OAuthLogin = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full space-x-4 mt-8">
        <hr className="w-full" />
        <p className="text-xs whitespace-nowrap">Or, login with your email</p>
        <hr className="w-full" />
      </div>
      <div className="px-12 w-full md:w-96 mt-4">
        <Button variant={"outline"} className="w-full m-0">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="google-logo"
          />
          <span className="pl-4">Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default OAuthLogin;
