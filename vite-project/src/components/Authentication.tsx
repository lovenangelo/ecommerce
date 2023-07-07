import { Button } from "./ui/button";
import authImage from "@/assets/images/bg/auth-bg.jpg";
import LoginForm from "./LoginForm";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
const Authentication = () => {
  const [authType, setAuthType] = useState<"LOGIN" | "REGISTER">("LOGIN");
  return (
    <div className="grid grid-cols-2 gap-1 h-[calc(100vh-80px)] w-full">
      <img src={authImage} alt="wardrobe" className="w-full h-full" />
      <div className=" flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="w-96 flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl">
              {authType == "LOGIN" ? "Hi, Welcome Back!" : "Register"}
            </h1>
            {authType == "LOGIN" && <LoginForm />}
            {authType == "REGISTER" && <RegistrationForm />}
            <div className="flex justify-center items-center w-full space-x-4 mt-8">
              <hr className="w-full" />
              <p className="text-xs whitespace-nowrap">
                Or, login with your email
              </p>
              <hr className="w-full" />
            </div>
          </div>
          <div className="w-full mt-4">
            <Button variant={"outline"} className="w-full m-0">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
              <span className="pl-4">Sign in with Google</span>
            </Button>

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
    </div>
  );
};

export default Authentication;
