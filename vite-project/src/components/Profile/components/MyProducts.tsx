import ItemCard from "@/components/Products/ItemCard";
import CardSkeleton from "@/components/Products/Loaders/CardSkeleton";
import Pagination from "@/components/Products/Pagination";
import { ProductItem } from "@/components/Products/types/product-item";
import productsApi from "@/lib/api/products";
import images from "@/lib/images";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const MyProducts = () => {
  const [deletedAProduct, setDeletedAProduct] = useState(false);
  const myProductQuery = useAppSelector((state) => state.myProductQuery.value);
  const getUserProducts = () => productsApi.getUserProducts(myProductQuery);
  const user = useAppSelector((state) => state.user.value);

  const [isLoading, setIsLoading] = useState(false);
  const products = useQuery(
    ["user-products", myProductQuery],
    getUserProducts,
    {
      enabled: true,
      retry: 2,
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );

  const refetch = products.refetch;

  useEffect(() => {
    if (deletedAProduct) {
      refetch();
    }
    // Reset the state
    setDeletedAProduct(false);
  }, [deletedAProduct, refetch]);

  console.log(products.data?.data);

  const items = products.data?.data.data.map(
    (item: ProductItem, index: number) => (
      <div className="md:col-span-2 lg:col-span-1" key={index}>
        <ItemCard
          id={item.id}
          title={item.name}
          description={item.description}
          ratings={null}
          price={item.price}
          promo={"50% OFF"}
          img={
            item.image == null
              ? images.productItemFallback
              : `http://localhost:8000/${item.image.url}`
          }
          deletable={true}
          editable={true}
          onDelete={async () => {
            if (user) {
              await productsApi.deleteProduct(user.id);
              setDeletedAProduct(true);
            }
          }}
          category={item.category.category}
        />
      </div>
    )
  );
  return (
    <div className="col-span-4 sm:col-span-3 grid grid-flow-row grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-5 w-full space-y-2 sm:space-y-0">
      <div className="col-span-3 flex items-center justify-between w-full space-x-4">
        <p className="font-bold">
          Showing {products.data?.data.current_page}-
          {products.data?.data.last_page} of {products.data?.data.total} items
        </p>
      </div>
      {products.isLoading || isLoading ? (
        <CardSkeleton />
      ) : items.length !== 0 ? (
        <>
          {items}{" "}
          <div className={cn("col-span-3 w-full")}>
            <Pagination
              nextPageUrl={products.data?.data.next_page_url}
              prevPageUrl={products.data?.data.prev_page_url}
              links={products.data?.data.links}
              setIsLoading={setIsLoading}
            />
          </div>
        </>
      ) : (
        <div className="flex w-full col-span-4 h-24 items-center justify-center">
          <h1>No results</h1>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
