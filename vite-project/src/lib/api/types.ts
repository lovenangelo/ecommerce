type ProductsType = {
  name: string;
  description: string;
  category: "handbags" | "watches" | "skincare" | "jewellery" | "apparels";
  price: number;
  quantity: number;
  image: File;
};
