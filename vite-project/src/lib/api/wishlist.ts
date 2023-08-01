import axiosClient from "../axios";

export const addWishListItem = async (
  user_id: number | null,
  product_id: number
) => {
  if (user_id !== null) {
    return await axiosClient.post(`/api/users/${user_id}/wishlist`, {
      product_id,
    });
  }
};

export const getWishlist = async (user_id: number | null) => {
  if (user_id !== null) {
    return axiosClient.get(`/api/users/${user_id}/wishlist`);
  }
};

export const deleteWishlistItem = async (wishlist_item_id: number) => {
  return await axiosClient.delete(`/api/wishlist/${wishlist_item_id}`);
};
