import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import authImage from "@/assets/images/auth-bg.jpg";
import { Switch } from "./ui/switch";

const Authentication = () => {
  return (
    <div className="grid grid-cols-2 gap-0 h-[calc(100vh-80px)]">
      <img src={authImage} alt="wardrobe" className="w-full h-full" />
      <div className=" flex flex-col justify-center items-center">
        <div className="space-y-8 w-96 flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">Hi, Welcome Back!</h1>
          <div className="space-y-4 w-full">
            <span>
              <Label htmlFor="email">Email Address</Label>
              <Input className="w-full" />
            </span>
            <span>
              <Label htmlFor="password">Password</Label>
              <Input className="w-full" />
            </span>
            <Button className="w-full">Login</Button>
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center space-x-2">
              <Switch id="keep-me-signed-in" />
              <Label htmlFor="keep-me-signed-in">Keep me signed in</Label>
            </div>
            <div>
              <Button variant={"ghost"} className="text-sm">
                Forgot password?
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center w-full space-x-4">
            <hr className="w-full" />
            <p className="text-xs whitespace-nowrap">
              Or, login with your email
            </p>
            <hr className="w-full" />
          </div>
          <link
            type="image/png"
            sizes="16x16"
            rel="icon"
            href=".../icons8-google-16.png"
          />
          <Button variant={"outline"} className="w-full">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
            <span className="pl-4">Sign in with Google</span>
          </Button>
          <div className="flex justify-center items-center space-x-1">
            <p className="text-sm">Don't have an account yet?</p>{" "}
            <Button variant={"ghost"} className="font-bold p-0">
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
