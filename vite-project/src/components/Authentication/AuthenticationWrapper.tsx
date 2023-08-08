import { Button } from "../ui/button";
import LoginForm from "./LoginForm";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import { Redirect } from "wouter";
import { useAppSelector } from "@/redux/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { cn } from "@/lib/utils";
import images from "@/lib/images";
const Authentication = () => {
  const user = useAppSelector((state) => state.user.value);

  const [authType, setAuthType] = useState<"LOGIN" | "REGISTER">("LOGIN");

  if (user !== null) {
    return <Redirect to="/" />;
  }
  return (
    <div className="grid grid-cols-1 grid-rows-4 lg:grid-rows-1 lg:grid-cols-2 w-full md:h-screen lg:h-full">
      <div className="hidden lg:flex h-full sm:h-[calc(100vh-80px)] w-full">
        <LazyLoadImage
          effect="opacity"
          src={images.authImage}
          alt="wardrobe"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={cn(
          "row-span-3 flex flex-col justify-center items-center w-full",
          authType == "REGISTER" && "mt-8 sm:mt-4",
          authType == "LOGIN" && "mt-16 sm:mt-0"
        )}
      >
        <div className="px-12 h-full w-full lg:w-96 flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl lg:text-3xl sm:text-5xl">
            {authType == "LOGIN" ? "Hi, Welcome Back!" : "Register"}
          </h1>
          {authType == "LOGIN" && <LoginForm />}
          {authType == "REGISTER" && <RegistrationForm />}
          {/* <OAuthLogin /> */}
          <div className="flex justify-center items-center space-x-1 mt-4">
            <p className="text-sm">
              {authType == "LOGIN"
                ? "Don't have an account yet?"
                : "Already have an account?"}
            </p>
            {authType == "LOGIN" ? (
              <Button
                variant={"ghost"}
                onClick={() => setAuthType("REGISTER")}
                className="font-bold p-0"
              >
                Register
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                onClick={() => setAuthType("LOGIN")}
                className="font-bold p-0"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
