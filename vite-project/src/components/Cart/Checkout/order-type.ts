export type Order = {
  user_id?: number;
  payment_method: string;
  total_amount: number;
  order_items: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
  order_address_id: number;
};
