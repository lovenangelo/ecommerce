import axiosClient from "@/lib/axios";

export const getCartItems = async () => {
  return await axiosClient.get("/api/cart");
};
