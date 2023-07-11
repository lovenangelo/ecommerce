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

type Item = {
  id: string;
  title: string;
  description: string;
  ratings: {
    review_count: number;
    stars: number;
  };
  price: number;
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
        <CardContent className={cn("h-max")}>
          <img src={img} alt="bag" />
        </CardContent>
        <CardFooter className={cn("flex justify-between items-center")}>
          <p>${price}</p>
          <button>
            <Icons.nav.favorites />
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
