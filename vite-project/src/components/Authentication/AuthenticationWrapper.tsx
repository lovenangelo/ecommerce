import { Button } from "../ui/button";
import authImage from "@/assets/images/bg/auth-bg.jpg";
import LoginForm from "./LoginForm";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import { Redirect } from "wouter";
import { useAppSelector } from "@/redux/hooks";

const Authentication = () => {
  const user = useAppSelector((state) => state.user.value);

  const [authType, setAuthType] = useState<"LOGIN" | "REGISTER">("LOGIN");

  if (user !== null) {
    return <Redirect to="/" />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 h-screen w-full">
      <img
        src={authImage}
        alt="wardrobe"
        className="w-full h-full hidden md:block object-cover"
      />
      <div className="flex flex-col justify-center items-center w-full">
        <div className="px-12 w-full md:w-96 flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">
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
