import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
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
import axiosClient from "@/lib/axios";
import { Label } from "../ui/label";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/login", data);

      console.log("successfully logged in");
      const res = await axiosClient.get("api/user");
      console.log(res);
      dispatch(setUser({ name: res.data.name, email: res.data.email }));
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        const message: string = error.response?.data.message;
        form.setError("email", { type: "422", message: message });
      } else {
        console.log(error);
      }
    }
    setIsLoading(false);
  };

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
                <Input disabled={isLoading} {...field} />
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
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full">
          Login
        </Button>
        <div className="flex justify-between w-full items-center mt-8">
          <FormField
            control={form.control}
            name="keep_me_signed_in"
            render={({ field }) => (
              <FormItem>
                <div>
                  <div className="flex items-center w-full justify-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>{" "}
                      <Label className="text-xs" htmlFor="keep_me_signed_in">
                        Keep me signed in
                      </Label>
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
