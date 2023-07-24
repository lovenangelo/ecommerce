import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import Ratings from "./Ratings";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import productsApi from "@/lib/api/products";
type Item = {
  id: number;
  title: string;
  description: string;
  ratings: {
    review_count: number;
    stars: number;
  } | null;
  price: number;
  promo: string | null;
  img: string;
  deletable?: boolean;
};

const ItemCard = ({
  id,
  title,
  description,
  ratings,
  price,
  promo,
  img,
  deletable = false,
}: Item) => {
  const handleDelete = async () => {
    try {
      await productsApi.deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="grid grid-cols-1 rows-auto h-[416px] w-fullr">
      <CardHeader className={cn("h-24 w-full ")}>
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          {deletable && (
            <Button
              onClick={handleDelete}
              variant={"ghost"}
              className="p-0 m-0 h-4444 w-4 "
            >
              <Icons.deleteIcon color="red" />
            </Button>
          )}
        </div>
        <CardDescription className={cn("truncate")}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn("h-60 w-full cursor-pointer")}>
        <Link to={`/item/${id}`}>
          <LazyLoadImage
            height={"100%"}
            width={"100%"}
            placeholder={<Skeleton className="h-full w-full" />}
            className="object-cover w-full h-full transition-opacity"
            effect="opacity"
            src={img}
            alt={title}
          />
        </Link>
      </CardContent>
      <CardFooter className={cn("flex justify-between items-start")}>
        <div>
          <div className="font-semibold">
            ${price} <s className="text-sm">${price * 2}</s>{" "}
            <span className="text-red-500 font-bold">{promo}</span>
            <Ratings starCount={ratings?.stars ?? 2} reviewCount={24} />
          </div>
        </div>
        <button>
          <Icons.nav.favorites />
        </button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
