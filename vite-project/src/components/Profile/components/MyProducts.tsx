import ItemCard from "@/components/Products/ItemCard";
import CardSkeleton from "@/components/Products/Loaders/CardSkeleton";
import Pagination from "@/components/Products/Pagination";
import { ProductItem } from "@/components/Products/types/product-item";
import productsApi from "@/lib/api/products";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const MyProducts = () => {
  const [deletedAProduct, setDeletedAProduct] = useState(false);
  const getUserProducts = () => productsApi.getUserProducts("/api/my-products");
  const user = useAppSelector((state) => state.user.value);

  const products = useQuery(["user-products"], getUserProducts, {
    enabled: true,
    retry: 2,
  });

  const refetch = products.refetch;

  useEffect(() => {
    if (deletedAProduct) {
      refetch();
    }
    // Reset the state
    setDeletedAProduct(false);
  }, [deletedAProduct, refetch]);

  const items = products.data?.data.data.map(
    (item: ProductItem, index: number) => (
      <div key={index}>
        <ItemCard
          id={item.id}
          title={item.name}
          description={item.description}
          ratings={null}
          price={item.price}
          promo={"50% OFF"}
          img={`http://localhost:8000/${item.image.url}`}
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
    <div className="col-span-3 grid grid-flow-row grid-cols-3 gap-5">
      <div className="col-span-3 flex items-center justify-between">
        <p className="font-bold">
          Showing {products.data?.data.current_page}-
          {products.data?.data.last_page} of {products.data?.data.total} items
        </p>
      </div>
      {products.isLoading ? (
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
          nextPageUrl={products.data?.data.next_page_url}
          prevPageUrl={products.data?.data.prev_page_url}
          links={products.data?.data.links}
        />
      </div>
    </div>
  );
};

export default MyProducts;
