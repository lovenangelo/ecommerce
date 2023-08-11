export type OrderItems =
  | {
      cart_item_id: string;
      price: number;
      product_id: number;
      quantity: number;
      src: string | null;
      subtitle: string;
      title: string;
    }[]
  | [];
