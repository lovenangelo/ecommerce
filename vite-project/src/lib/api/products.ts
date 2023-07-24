import axiosClient from "../axios";
import { ProductsType } from "./types";

const addNewProduct = async (data: ProductsType) => {
  await axiosClient
    .post("/api/products/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => console.log("success"))
    .catch((err) => {
      console.log(err);
    });
};

const getProducts = async (
  base: string,
  category: string,
  price: number[],
  colors: string[],
  sizes: string[],
  sort: string
) => {
  const sortValues = sort.split(".");
  return await axiosClient.get(base, {
    params: {
      category,
      price: price[0],
      colors,
      sizes,
      sort_by: sortValues[0],
      sort_direction: sortValues[1],
    },
  });
};
const getProductItem = async (id: string) =>
  await axiosClient.get(`api/products/${id}`);

const productsApi = {
  addNewProduct,
  // deleteProduct,
  // updateProduct,
  getProducts,
  getProductItem,
};

export default productsApi;
