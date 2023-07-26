import axiosClient from "@/lib/axios";

export const getCartItems = async () => {
  return await axiosClient.get("/api/cart");
};

export const deleteCartItem = async (id: string) => {
  return await axiosClient.delete(`/api/cart/${id}`);
};

export const addCartItem = async (product_id: number, quantity: number) => {
  return await axiosClient.post("/api/cart", {
    product_id,
    quantity,
  });
};

export const updateCartItem = async (id: string, quantity: number) => {
  return await axiosClient.put(`/api/cart/${id}`, { quantity });
};
