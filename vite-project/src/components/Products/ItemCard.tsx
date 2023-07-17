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

type Item = {
  id: number;
  title: string;
  description: string;
  ratings: {
    review_count: number;
    stars: number;
  } | null;
  price: string;
  promo: string | null;
  img: string;
};

const ItemCard = ({
  id,
  title,
  description,
  ratings,
  price,
  promo,
  img,
}: Item) => {
  return (
    <Link to={`/profile/${id}`}>
      <Card className="grid grid-cols-1 rows-auto h-full w-full hover:cursor-pointer">
        <CardHeader className={cn("h-24 w-full ")}>
          <CardTitle>{title}</CardTitle>
          <CardDescription className={cn("truncate")}>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("h-60 w-full")}>
          <img className="object-cover w-full h-full" src={img} alt="bag" />
        </CardContent>
        <CardFooter className={cn("flex justify-between items-start")}>
          <div>
            <p className="font-semibold">
              ${price} <s className="text-sm">${parseInt(price) * 2}</s>{" "}
              <span className="text-red-500 font-bold">{promo}</span>
              <Ratings starCount={4} reviewCount={24} />
            </p>
          </div>
          <button>
            <Icons.nav.favorites />
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
