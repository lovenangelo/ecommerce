import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import icons from "@/lib/icons";
import images from "@/lib/images";
import { cn } from "@/lib/utils";
const NewArrivals = () => {
  const products = images.bags.map((img) => {
    return (
      <Card className="grid grid-cols-1 rows-auto">
        <CardHeader className={cn("h-24")}>
          <CardTitle>{img.title}</CardTitle>
          <CardDescription className={cn("text-ellipsis")}>
            {img.description}
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("h-max")}>
          <img src={img.src} alt="bag" />
        </CardContent>
        <CardFooter className={cn("flex justify-between items-center")}>
          <p>$500</p>
          <button>
            <icons.nav.favorites />
          </button>
        </CardFooter>
      </Card>
    );
  });

  return (
    <section className="container w-full mt-8 md:mt-12 grid grid-cols-1 rows-auto md:grid-cols-6 md:grid-row-2 min-h-screen">
      <div className="flex justify-start items-start col-span-2">
        <div className="flex items-center justify-start">
          <icons.arrowDown className="h-36 w-36 md:h-24 md:w-24" />
          <h1 className="font-bold text-5xl">New Arrivals</h1>
        </div>
      </div>
      <div className="col-span-4 bg-primary h-2 w-full mt-12 hidden md:block" />
      <div className="col-span-6">
        <div className="grid grid-cols-2 rows-auto md:grid-cols-4 rows-auto gap-4 max-w-full mt-12 md:mt-4">
          {products}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
