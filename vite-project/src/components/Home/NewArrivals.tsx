import productsApi from "@/lib/api/products";
import icons from "@/lib/icons";
import { useQuery } from "react-query";
import { ProductItem } from "../Products/types/product-item";
import ItemCard from "../Products/ItemCard";
import CardSkeleton from "../Products/Loaders/CardSkeleton";
const NewArrivals = () => {
  const axiosGetNewArrivals = async () => await productsApi.getNewArrivals();
  const newArrivals = useQuery("fetch-new-arrivals", axiosGetNewArrivals);

  const products = newArrivals.data?.data.map(
    (item: ProductItem, index: number) => {
      return (
        <ItemCard
          key={index}
          id={item.id}
          category={"newArrivals"}
          title={item.name}
          description={item.description}
          ratings={null}
          price={item.price}
          promo={"20% OFF"}
          img={`http://localhost:8000/${item.image.url}`}
          editable={false}
        />
      );
    }
  );

  return (
    <section className="container w-full mt-8 lg:mt-10 grid grid-cols-1 rows-auto md:grid-cols-6 lg:grid-row-2 lg:min-h-screen">
      <div className="justify-start items-start col-span-2 h-max">
        <div className="flex items-center justify-start lg:h-max">
          <icons.arrowDown className="animate-bounce h-32 w-32 md:h-24 md:w-24" />
          <h1 className="transition-opacity font-bold text-5xl">
            New Arrivals
          </h1>
        </div>
      </div>
      <div className="col-span-4 bg-primary h-2 w-full mt-12 hidden md:block" />
      <div className="col-span-6">
        <div className="grid grid-cols-1 rows-auto md:grid-cols-4 rows-auto gap-4 max-w-full mt-12 lg:mt-4">
          {newArrivals.isLoading ? <CardSkeleton number={4} /> : products}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
