import ItemCard from "./ItemCard";
import Layout from "./Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Collapsibles from "./Collapsibles";
import Pagination from "./Pagination";
import productsApi from "@/lib/api/products";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import CardSkeleton from "./Loaders/CardSkeleton";
import { ProductItem } from "./types/product-item";
import { useAppSelector } from "@/redux/hooks";
const Index = ({ category }: { category: string }) => {
  const [currentCategory, setCurrentCategory] = useState(category);
  const [price, setPrice] = useState<number[]>([20]);
  const [sizesFilter, setSizesFilter] = useState<{
    s: boolean;
    m: boolean;
    l: boolean;
  }>({ s: false, m: false, l: false });
  const [colorsFilter, setColorsFilter] = useState<string[]>([]);
  const [sort, setSort] = useState("featured.asc");
  const productQuery = useAppSelector((state) => state.productQuery.value);

  const getHandbags = async () =>
    await productsApi.getProducts(
      productQuery,
      currentCategory,
      price,
      colorsFilter,
      sizesFilter,
      sort
    );
  console.log(sort);

  const handbags = useQuery(["get-handbags", currentCategory], getHandbags, {
    enabled: true,
    retry: 2,
  });

  console.log(handbags);

  const refetch = handbags.refetch;

  useEffect(() => {
    if (currentCategory !== category) {
      setCurrentCategory(category);
    }
  }, [category, currentCategory]);

  useEffect(() => {
    refetch();
  }, [
    category,
    currentCategory,
    refetch,
    price,
    sizesFilter,
    colorsFilter,
    sort,
    productQuery,
  ]);

  const items = handbags.data?.data.data.map(
    (item: ProductItem, index: number) => (
      <div key={index}>
        <ItemCard
          id={item.id}
          title={item.name}
          description={item.description}
          ratings={null}
          price={item.price.price}
          promo={"50% OFF"}
          img={`http://localhost:8000/${item.image.url}`}
        />
      </div>
    )
  );

  return (
    <Layout>
      <div className="container mt-8">
        <div className="grid grid-cols-4">
          <div className="col-span-1 space-y-2 pr-4">
            <h1 className="text-4xl font-bold mb-8">
              {category.toUpperCase()}
            </h1>
            <Collapsibles
              setPriceFilterValue={setPrice}
              setColorsFilterValue={setColorsFilter}
              setSizesFilterValue={setSizesFilter}
            />
          </div>
          <div className="col-span-3 grid grid-flow-row grid-cols-3 gap-5">
            <div className="col-span-3 flex items-center justify-between">
              <p className="font-bold">
                Showing {handbags.data?.data.current_page}-
                {handbags.data?.data.last_page} of {handbags.data?.data.total}{" "}
                items
              </p>
              <div className="flex items-center space-x-4">
                <p className="font-semibold">Sort By</p>
                <Select
                  defaultValue={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price.desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="price.asc">
                      Price: Low to High{" "}
                    </SelectItem>
                    <SelectItem value="featured.asc">Featured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {handbags.isLoading ? (
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
                nextPageUrl={handbags.data?.data.next_page_url}
                prevPageUrl={handbags.data?.data.prev_page_url}
                links={handbags.data?.data.links}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
