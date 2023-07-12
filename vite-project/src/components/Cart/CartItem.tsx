import images from "@/lib/images";

const CartItem = () => {
  return (
    <div className="grid grid-cols-2 row-auto gap-2 w-full h-full">
      <div className="row-span-3 w-full h-full">
        <img
          className="object-cover h-full w-full"
          src={images.bags[0].src}
          alt="product image"
        />
      </div>
      <div className="space-y-2">
        <h1 className="font-bold">Coach</h1>
        <p>Leather Coach Bag</p>
        <p>Qty- 1</p>
      </div>
    </div>
  );
};

export default CartItem;
