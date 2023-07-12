import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Coupon = () => {
  return (
    <div className="flex border-2 w-60">
      <Input
        className="border-0 shadow-none focus-visible:ring-0"
        placeholder="Apply Valid Pincode"
      />
      <Button variant={"ghost"}>CHECK</Button>
    </div>
  );
};

export default Coupon;
