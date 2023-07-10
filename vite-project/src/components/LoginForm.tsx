import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "./ui/label";
const LoginForm = () => {
  const loginFormSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    keep_me_signed_in: z.boolean(),
  });

  type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      keep_me_signed_in: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) =>
    alert(JSON.stringify(data));

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4 mt-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full">Login</Button>
        <div className="flex justify-between w-full items-center mt-8">
          <FormField
            control={form.control}
            name="keep_me_signed_in"
            render={({ field }) => (
              <FormItem>
                <div>
                  <div className="flex items-center w-full justify-center space-x-2">
                    <Label className="text-xs" htmlFor="keep_me_signed_in">
                      Keep me signed in
                    </Label>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>{" "}
                      <Button variant={"ghost"} className="text-xs">
                        Forgot password?
                      </Button>
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
