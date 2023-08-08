import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import Icons from "@/lib/icons";
import axios from "axios";
const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const registrationFormSchema = z
    .object({
      name: z.string().min(1, "Name is required").max(100),
      email: z.string().email("Invalid email").min(1, "Email is required"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
      password_confirmation: z
        .string()
        .min(1, "Password confirmation is required"),
      terms: z.boolean().refine((value) => value === true, {
        message: "The terms must be accepted",
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ["password_confirmation"],
      message: "Passwords do not match",
    });

  type RegsitrationFormSchemaType = z.infer<typeof registrationFormSchema>;

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<RegsitrationFormSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      await axiosClient.post("/register", data);
      const res = await axiosClient.get("api/user");
      dispatch(
        setUser({
          name: res.data.name,
          email: res.data.email,
          avatar: res.data.avatar,
          id: res.data.id,
          remember_me: false,
        })
      );
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
        className="w-full sm:space-y-2 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="jd@gmail.com"
                  {...field}
                />
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
                <Input
                  disabled={isLoading}
                  type="password"
                  placeholder="Enter a secure password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="password"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div>
                <div className="flex items-center w-full justify-center space-x-2">
                  <Label className="text-xs" htmlFor="terms">
                    I agree to the{" "}
                    <span className="font-semibold">terms of service</span> and{" "}
                    <span className="font-semibold">privacy policy</span>.
                  </Label>
                  <FormControl>
                    <Switch
                      disabled={isLoading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4 w-full">
          <Button className="w-full" disabled={isLoading} type="submit">
            Sign Up
            {isLoading && (
              <span className="ml-2">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
