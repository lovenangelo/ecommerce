export type OrderItems =
  | {
      price: number;
      product_id: number;
      quantity: number;
      src: string;
      subtitle: string;
      title: string;
    }[]
  | [];
