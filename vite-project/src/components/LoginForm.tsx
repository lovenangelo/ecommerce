import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const LoginForm = () => {
  return (
    <>
      <div className="mt-8 space-y-4 w-full">
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
      <div className="flex justify-between w-full items-center mt-8">
        <div className="flex items-center space-x-2">
          <Switch id="keep-me-signed-in" />
          <Label className=" text-xs md:text-xs" htmlFor="keep-me-signed-in">
            Keep me signed in
          </Label>
        </div>
        <div>
          <Button variant={"ghost"} className="text-xs">
            Forgot password?
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
