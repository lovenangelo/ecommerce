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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfilePhotoUpload from "../ProfilePhotoUpload";

const PersonalInformationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const personalInformationSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    keep_me_signed_in: z.boolean(),
  });

  type PersonalInformationSchemaType = z.infer<
    typeof personalInformationSchema
  >;

  const onSubmit: SubmitHandler<PersonalInformationSchemaType> = async (
    data
  ) => {
    setIsLoading(true);
    console.log(data);
  };

  const form = useForm<z.infer<typeof personalInformationSchema>>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      email: "",
      password: "",
      keep_me_signed_in: false,
    },
  });
  return (
    <>
      <h1 className="font-bold">Personal Information</h1>
      <hr />
      <div className="flex items-center space-x-4">
        <Avatar className="mt-4 w-20 h-20">
          <AvatarImage src="/" />
          <AvatarFallback className="font-semibold text-2xl">LA</AvatarFallback>
        </Avatar>
        <Dialog>
          <DialogTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Upload
          </DialogTrigger>
          <ProfilePhotoUpload />
        </Dialog>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-1/2 mt-8 space-y-4 overflow-y-auto">
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
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
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full col-span-auto">
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-60 col-span-1 ">
                  <FormLabel>Mobile Number</FormLabel>
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
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ChangePasswordForm form={form} isLoading={isLoading} />
          <div className="flex justify-end mt-4">
            <Button className="flex">Save Changes</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PersonalInformationForm;
