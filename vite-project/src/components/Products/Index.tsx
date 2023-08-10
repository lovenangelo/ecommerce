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
import HeroPromo from "./HeroPromo";
import { cn } from "@/lib/utils";
import images from "@/lib/images";
const Index = ({ category }: { category: string }) => {
  const [currentCategory, setCurrentCategory] = useState(category);
  const [price, setPrice] = useState<number[]>([20]);
  const [sizesFilter, setSizesFilter] = useState<string[]>([]);
  const [colorsFilter, setColorsFilter] = useState<string[]>([]);
  const [sort, setSort] = useState("featured.asc");
  const productQuery = useAppSelector((state) => state.productQuery.value);

  const getHandbags = async () =>
    await productsApi.getProducts(
      productQuery,
      currentCategory,
      price,
      colorsFilter.join(),
      sizesFilter.join(),
      sort
    );

  const [isLoading, setIsLoading] = useState(false);

  const handbags = useQuery(["get-handbags", currentCategory], getHandbags, {
    enabled: true,
    retry: 2,
    onSuccess: () => {
      setIsLoading(false);
    },
  });

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
      <div className="md:col-span-2 lg:col-span-1" key={index}>
        <ItemCard
          id={item.id}
          category={category}
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
          editable={false}
        />
      </div>
    )
  );

  return (
    <Layout>
      {category == "handbags" && <HeroPromo />}
      {/* Sets grid */}
      <div className="container md:mt-8 grid row-auto grid-cols-4 pb-8">
        <div className="col-span-1 space-y-2 pr-4">
          <h1 className="mt-8 md:mt-0 sm:text-2xl lg:text-4xl font-bold mb-4 md:mb-8 text-[#1B4B66]">
            {category.toUpperCase()}
          </h1>
          <Collapsibles
            setPriceFilterValue={setPrice}
            setColorsFilterValue={setColorsFilter}
            setSizesFilterValue={setSizesFilter}
          />
        </div>
        <div className="col-span-4 sm:col-span-3 grid grid-flow-row grid-cols-1 rows-auto sm:grid-cols-3 gap-2 sm:gap-5 w-full space-y-2 sm:space-y-0">
          <div className="col-span-3 flex items-center justify-between w-full space-x-4">
            <p className="font-bold text-xs sm:text-sm w-1/4 sm:w-full">
              Showing {handbags.data?.data.current_page}-
              {handbags.data?.data.last_page} of {handbags.data?.data.total}{" "}
              items
            </p>
            <div className="flex items-center justify-end space-x-2 h-full w-3/4">
              <p className="font-bold text-left text-xs sm:text-sm">Sort By</p>
              <Select
                defaultValue={sort}
                onValueChange={(value) => setSort(value)}
              >
                <SelectTrigger className="text-xs sm:text-sm w-32 sm:w-[180px]">
                  <SelectValue placeholder="featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price.desc">Price: High to Low</SelectItem>
                  <SelectItem value="price.asc">Price: Low to High </SelectItem>
                  <SelectItem value="featured.asc">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {handbags.isLoading || isLoading ? (
            <CardSkeleton />
          ) : items.length !== 0 ? (
            <>
              {items}{" "}
              <div className={cn("col-span-3 w-full")}>
                <Pagination
                  nextPageUrl={handbags.data?.data.next_page_url}
                  prevPageUrl={handbags.data?.data.prev_page_url}
                  links={handbags.data?.data.links}
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
      </div>
    </Layout>
  );
};

export default Index;
