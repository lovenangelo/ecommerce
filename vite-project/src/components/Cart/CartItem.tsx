import images from "@/lib/images";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const CartItem = ({
  src,
  title,
  subtitle,
  quantity,
}: {
  src: string | null;
  title: string;
  subtitle: string;
  quantity: number;
}) => {
  return (
    <div className="grid grid-cols-2 row-auto gap-2 w-full h-full">
      <div className="row-span-3">
        <LazyLoadImage
          effect="opacity"
          src={
            src == null
              ? images.productItemFallback
              : `http://localhost:8000/${src}`
          }
          alt="product image"
        />
      </div>
      <div className="space-y-2">
        <h1 className="font-bold">{title}</h1>
        <p className="truncate overflow-hidden">{subtitle}</p>
        <p>Qty: {quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
