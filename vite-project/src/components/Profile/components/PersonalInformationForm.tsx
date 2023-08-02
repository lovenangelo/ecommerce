import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import ChangePasswordForm from "./ChangePasswordForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import { useAppSelector } from "@/redux/hooks";
import Icons from "@/lib/icons";
import resetPassword from "@/lib/api/profile";
import { toast } from "@/components/ui/use-toast";

const PersonalInformationForm = () => {
  const user = useAppSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState(false);

  const personalInformationSchema = z
    .object({
      name: z.string(),
      email: z.string().email("Invalid email").min(1, "Email is required"),
      current_password: z.string().nonempty("Enter your current password"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
      password_confirmation: z
        .string()
        .min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ["password_confirmation"],
      message: "Passwords do not match",
    });

  type PersonalInformationSchemaType = z.infer<
    typeof personalInformationSchema
  >;

  const onSubmit: SubmitHandler<PersonalInformationSchemaType> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      await resetPassword(data);
      toast({
        title: "Success!",
        description: "Your password is updated.",
      });
    } catch (error: unknown) {
      toast({
        title: "Update failed",
        description: "Make sure to enter current password correctly.",
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof personalInformationSchema>>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });
  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar className="mt-4 w-28 h-28 lg:w-20 lg:h-20">
          <AvatarImage
            className="object-cover"
            src={user?.avatar ? `http://localhost:8000/${user.avatar}` : "/"}
          />
          <AvatarFallback className="font-semibold text-4xl lg:text-2xl">
            {user ? user.name?.[0][0].toUpperCase() : ""}
          </AvatarFallback>
        </Avatar>
        <Dialog>
          <DialogTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Upload
          </DialogTrigger>
          <ProfilePhotoUpload />
        </Dialog>
      </div>
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full lg:w-1/2 mt-2 md:mt-8 space-y-4 overflow-y-auto">
            <div className="w-full flex space-x-2 md:space-x-4 p-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input readOnly disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full col-span-auto">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input readOnly disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <ChangePasswordForm form={form} isLoading={isLoading} />
          <div className="flex justify-start mt-4 ml-2">
            <Button disabled={isLoading} className="flex">
              Save Changes
              {isLoading && (
                <span className="ml-2">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PersonalInformationForm;
