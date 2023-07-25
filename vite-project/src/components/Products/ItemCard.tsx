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
  onDelete?: () => void;
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
  onDelete,
}: Item) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await productsApi.deleteProduct(id);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setDialogOpen(false);
  };
  return (
    <Card className="grid grid-cols-1 rows-auto h-[416px] w-fullr">
      <CardHeader className={cn("h-24 w-full ")}>
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          {deletable && (
            <Dialog
              open={dialogOpen}
              onOpenChange={(open) => setDialogOpen(open)}
            >
              <DialogTrigger className="w-max h-max p-0 m-0">
                <Button variant={"ghost"} className="p-0 m-0 h-4 w-4 ">
                  <Icons.deleteIcon color="red" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your product and remove its data from our servers.
                  </DialogDescription>
                  <DialogFooter className="flex justify-end space-x-2">
                    <Button
                      disabled={isLoading}
                      onClick={() => {
                        setDialogOpen(false);
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
