import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

const ChangePasswordForm = ({
  form,
  isLoading,
}: {
  form: UseFormReturn<
    {
      email: string;
      password: string;
      keep_me_signed_in: boolean;
    },
    any,
    undefined
  >;
  isLoading: boolean;
}) => {
  return (
    <div className="mt-4  space-y-4">
      <div>
        <h1 className="font-bold">Change Password</h1>
        <hr />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-60 col-span-1 ">
            <FormLabel>Current Password</FormLabel>
            <FormControl>
              <Input disabled={isLoading} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-60 col-span-1 ">
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Input disabled={isLoading} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-60 col-span-1 ">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input disabled={isLoading} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChangePasswordForm;
