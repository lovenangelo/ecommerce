import ItemCard from "../ItemCard";
import Layout from "../Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Collapsibles from "./Collapsibles";
import Pagination from "../Pagination";
import productsApi from "@/lib/api/products";
import { useQuery } from "react-query";

const Index = () => {
  const getHandbags = async () => await productsApi.getProducts("handbags");

  const handbags = useQuery("get-handbags", getHandbags, {
    enabled: true,
    retry: 2,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  console.log(handbags);

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

  if (handbags.isLoading) return <>Loading</>;

  return (
    <Layout>
      <div className="container mt-8">
        <div className="grid grid-cols-4">
          <div className="col-span-1 space-y-2 pr-4">
            <h1 className="text-4xl font-bold mb-8">Handbags</h1>
            <Collapsibles />
          </div>
          <div className="col-span-3 grid grid-flow-row grid-cols-3 gap-5">
            <div className="col-span-3 flex items-center justify-between">
              <p className="font-bold">Showing 1-40 of 145 items</p>
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
            {items}
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
