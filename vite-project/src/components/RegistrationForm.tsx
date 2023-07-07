import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const RegistrationForm = () => {
  return (
    <div className="w-full">
      <div className="space-y-4 w-full">
        <span>
          <Label htmlFor="name">Name</Label>
          <Input className="w-full" />
        </span>
        <span>
          <Label htmlFor="email">Email Address</Label>
          <Input className="w-full" />
        </span>
        <span>
          <Label htmlFor="password">Password</Label>
          <Input className="w-full" />
        </span>
        <span>
          <Label htmlFor="password">Confirm password</Label>
          <Input className="w-full" />
        </span>
        <div className="flex items-center w-full justify-center space-x-2">
          <Switch id="agree-to-terms" />
          <Label className="text-xs" htmlFor="agree-to-terms">
            I agree to the{" "}
            <span className="font-semibold">terms of service</span> and{" "}
            <span className="font-semibold">privacy policy</span>.
          </Label>
        </div>
        <Button className="w-full">Sign Up</Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
