import axiosClient from "../axios";

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
  category: string,
  price: number[],
  colors: string[],
  sizes: {
    s: boolean;
    m: boolean;
    l: boolean;
  }
) =>
  await axiosClient.get(`/api/products`, {
    params: { category, price: price[0], colors, sizes },
  });

const getProductItem = async (id: string, category: string) =>
  await axiosClient.get(`api/products/${category}/${id}`);

const productsApi = {
  addNewProduct,
  // deleteProduct,
  // updateProduct,
  getProducts,
  getProductItem,
};

export default productsApi;
