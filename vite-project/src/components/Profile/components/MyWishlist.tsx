import ItemCard from "@/components/Products/ItemCard";
import CardSkeleton from "@/components/Products/Loaders/CardSkeleton";
import Pagination from "@/components/Products/Pagination";
import { ProductItem } from "@/components/Products/types/product-item";
import { deleteWishlistItem, getWishlist } from "@/lib/api/wishlist";
import images from "@/lib/images";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type WishlistItem = {
  id: number;
  product: ProductItem;
};

const MyWishlist = () => {
  const [removedAnItem, setRemovedAnItem] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[] | []>([]);
  const user = useAppSelector((state) => state.user.value);
  const getUserProducts = () => getWishlist(user?.id ?? null);

  const [isLoading, setIsLoading] = useState(false);
  const wishlistQuery = useQuery(["user-wishlist"], getUserProducts, {
    enabled: true,
    retry: 2,
    onSuccess(data) {
      console.log(data);

      if (data?.data.wishlist !== null) {
        setWishlist(data?.data.wishlist.wishlist_items);
      }
      setIsLoading(false);
    },
  });

  const refetch = wishlistQuery.refetch;

  useEffect(() => {
    if (removedAnItem) {
      refetch();
    }
    // Reset the state
    setRemovedAnItem(false);
  }, [removedAnItem, refetch]);

  const items = wishlist.map((item: WishlistItem, index: number) => (
    <div key={index}>
      <ItemCard
        id={item.product.id}
        title={item.product.name}
        description={item.product.description}
        ratings={null}
        price={item.product.price}
        promo={"50% OFF"}
        img={
          item.product.image == null
            ? images.productItemFallback
            : `http://localhost:8000/${item.product.image.url}`
        }
        deletable={true}
        editable={false}
        onDelete={async () => {
          if (user) {
            await deleteWishlistItem(item.id);
            setRemovedAnItem(true);
          }
        }}
        category={item.product.category.category}
      />
    </div>
  ));

  return (
    <div className="col-span-4 sm:col-span-3 grid grid-flow-row grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-5 w-full space-y-2 sm:space-y-0">
      <div className="col-span-3 flex items-center justify-between">
        <p className="font-bold">
          Showing {wishlistQuery.data?.data.current_page}-
          {wishlistQuery.data?.data.last_page} of{" "}
          {wishlistQuery.data?.data.total} items
        </p>
      </div>
      {wishlistQuery.isLoading || isLoading ? (
        <CardSkeleton />
      ) : items.length !== 0 ? (
        items
      ) : (
        <div className="flex w-full justify-center col-span-4">
          <h1>No results</h1>
        </div>
      )}
      <div className="col-span-3 w-full">
        <Pagination
          nextPageUrl={wishlistQuery.data?.data.next_page_url}
          prevPageUrl={wishlistQuery.data?.data.prev_page_url}
          links={wishlistQuery.data?.data.links}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default MyWishlist;
