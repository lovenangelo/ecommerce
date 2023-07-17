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
// const deleteProduct = async () => {};
// const updateProduct = async () => {};
const getProducts = async (category: string) =>
  await axiosClient.get(`/api/products/${category}`);

// const getProductItem = async () => {};

const getProductImage = async ($id: number) =>
  await axiosClient.get(`/products/images/${$id}`);

const productsApi = {
  addNewProduct,
  // deleteProduct,
  // updateProduct,
  getProducts,
  // getProductItem,
  getProductImage,
};

export default productsApi;
