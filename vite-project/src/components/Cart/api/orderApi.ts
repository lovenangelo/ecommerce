import axiosClient from "@/lib/axios";

export const addNewOrder = async (product_id: number, quantity: number) => {
  return await axiosClient.post("/api/order", {
    product_id,
    quantity,
  });
};
