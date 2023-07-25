export type ProductsType = {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  image: File | null;
  sizes: string;
  payment_options: string;
  subtitle: string;
  brand: string;
  color: string;
};
