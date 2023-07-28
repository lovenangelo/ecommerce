import axiosClient from "../axios";

export const addWishList = async (
  user_id: number | null,
  product_id: number
) => {
  if (user_id !== null) {
    return await axiosClient.post("/api/wishlist", {
      user_id,
      product_id,
    });
  }
};
