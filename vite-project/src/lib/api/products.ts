import axiosClient from "../axios";

const addNewProduct = async (data: ProductsType) => {
  await axiosClient
    .post("/api/add-product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => console.log("success"))
    .catch((err) => {
      console.log(err);
    });
};
const deleteProduct = async () => {};
const updateProduct = async () => {};
const getProducts = async () => {};
const getItem = async () => {};

const productsApi = {
  addNewProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getItem,
};

export default productsApi;
