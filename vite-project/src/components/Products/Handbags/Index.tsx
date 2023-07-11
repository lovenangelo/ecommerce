import ItemCard from "../ItemCard";
import Layout from "../Layout";
import images from "@/lib/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Collapsibles from "./Collapsibles";

const Index = () => {
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

            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />

            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
            <ItemCard
              id="testid"
              title="Grande"
              description="Blossom Pouc"
              ratings={{ review_count: 43, stars: 4 }}
              price={39.49}
              promo={"50% OFF"}
              img={images.bags[0].src}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
