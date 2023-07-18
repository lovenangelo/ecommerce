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
import { useState } from "react";
import CardSkeleton from "./Loaders/CardSkeleton";
const Index = () => {
  const [filters, setFilters] = useState<object>({ category: "handbags" });
  console.log(filters);

  const getHandbags = async () => await productsApi.getProducts(filters);
  const handbags = useQuery("get-handbags", getHandbags, {
    enabled: true,
    retry: 2,
  });

  const items = handbags.data?.data.data.map(
    (
      item: {
        category: string;
        created_at: string;
        description: string;
        id: number;
        name: string;
        user_id: number;
        updated_at: string;
        price: string;
        quantity: number;
        image: {
          url: string;
        };
      },
      index: number
    ) => (
      <div key={index}>
        <ItemCard
          id={item.id}
          title={item.name}
          description={item.description}
          ratings={null}
          price={item.price}
          promo={"50% OFF"}
          img={`http://localhost:8000/${item.image.url}`}
          category="handbags"
        />
      </div>
    )
  );
  console.log(filters);
  return (
    <Layout>
      <div className="container mt-8">
        <div className="grid grid-cols-4">
          <div className="col-span-1 space-y-2 pr-4">
            <h1 className="text-4xl font-bold mb-8">Handbags</h1>
            <Collapsibles setFilters={setFilters} filterValue={filters} />
          </div>
          <div className="col-span-3 grid grid-flow-row grid-cols-3 gap-5">
            <div className="col-span-3 flex items-center justify-between">
              <p className="font-bold">
                Showing {handbags.data?.data.current_page}-
                {handbags.data?.data.last_page} of {handbags.data?.data.total}
                items
              </p>
              <div className="flex items-center space-x-4">
                <p className="font-semibold">Sort By</p>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Popularity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
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
              <Pagination pages={10} currentPage={1} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
