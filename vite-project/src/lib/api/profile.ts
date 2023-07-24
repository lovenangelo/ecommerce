import axiosClient from "../axios";

const resetPassword = async (passwordReset: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  return await axiosClient.post("api/reset-password", passwordReset);
};

export default resetPassword;
