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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { addWishListItem } from "@/lib/api/wishlist";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "../ui/use-toast";

type Item = {
  id: number;
  title: string;
  description: string;
  category: string;
  ratings: {
    review_count: number;
    stars: number;
  } | null;
  price: number;
  promo: string | null;
  img: string;
  editable: boolean;
  deletable?: boolean;
  onDelete?: () => void;
};

const ItemCard = ({
  id,
  category,
  title,
  description,
  ratings,
  price,
  promo,
  img,
  editable = false,
  deletable = false,
  onDelete,
}: Item) => {
  const user = useAppSelector((state) => state.user.value);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setDeleteDialogOpen(false);
  };
  const handleAddToWishlist = async () => {
    console.log("adding to wishlist");
    try {
      await addWishListItem(user?.id ?? null, id);
      console.log("good");
      toast({
        title: "Added item to your wishlist",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="transition ease-in-out delay-100 ring-[#17494D] hover:ring-2 hover:-translate-y-1 hover:shadow-lg duration-300 grid grid-cols-1 rows-auto h-[416px]">
      <CardHeader className={cn("h-24 w-full ")}>
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          <div className="flex space-x-2">
            {editable && (
              <Link to={`/my-products/edit/${id}`}>
                <Button variant={"ghost"} className="p-0 m-0 h-4 w-4 ">
                  <Icons.editIcon color="blue" />
                </Button>
              </Link>
            )}
            {deletable && (
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={(open) => setDeleteDialogOpen(open)}
              >
                <DialogTrigger className="w-max h-max p-0 m-0">
                  <Icons.deleteIcon height={16} color="red" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the item.
                    </DialogDescription>
                    <DialogFooter className="flex justify-end space-x-2">
                      <Button
                        disabled={isLoading}
                        onClick={() => {
                          setDeleteDialogOpen(false);
                        }}
                      >
                        No
                      </Button>
                      <Button
                        disabled={isLoading}
                        variant={"outline"}
                        onClick={handleDelete}
                      >
                        Yes
                        {isLoading && (
                          <span className="ml-2">
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          </span>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>{" "}
        </div>
        <CardDescription className={cn("truncate")}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn("h-60 w-full cursor-pointer")}>
        <Link to={`/products/${category}/${id}`}>
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
            <Ratings starCount={ratings?.stars ?? 5} reviewCount={60} />
          </div>
        </div>
        {user && (
          <button onClick={handleAddToWishlist}>
            <Icons.nav.favorites color="black" className="hover:fill-red-300" />
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
