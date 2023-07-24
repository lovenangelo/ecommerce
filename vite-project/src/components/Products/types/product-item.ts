export type ProductItem = {
  brand: {
    brand: string;
  };
  category: {
    category: string;
  };
  color: {
    color: string;
  };
  description: string;
  payment_options: {
    cod: boolean;
    card: boolean;
  };
  price: number;
  quantity: {
    quantity: number;
  };
  subtitle: string;
  size: {
    s: boolean;
    m: boolean;
    l: boolean;
  };
  image: {
    url: string;
  };
  id: number;
  name: string;
};
