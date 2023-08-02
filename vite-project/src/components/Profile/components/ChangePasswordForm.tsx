import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { UseFormReturn } from "react-hook-form";

const ChangePasswordForm = ({
  form,
  isLoading,
}: {
  form: UseFormReturn<
    {
      name: string;
      email: string;
      current_password: string;
      password: string;
      password_confirmation: string;
    },
    undefined
  >;
  isLoading: boolean;
}) => {
  return (
    <div className=" space-y-4 p-2">
      <div>
        <h1 className="font-bold mb-2">Change Password</h1>
        <hr />
      </div>
      <FormField
        control={form.control}
        name="current_password"
        render={({ field }) => (
          <FormItem className="w-full md:w-60 col-span-1 ">
            <FormLabel>Current Password</FormLabel>
            <FormControl>
              <Input type="password" disabled={isLoading} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex space-x-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-60 col-span-1 ">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem className="w-60 col-span-1 ">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ChangePasswordForm;
