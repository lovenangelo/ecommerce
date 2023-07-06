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
          <CardDescription>{img.description}</CardDescription>
        </CardHeader>
        <CardContent className={cn("h-max")}>
          <img src={img.src} alt="bag" />
        </CardContent>
        <CardFooter>$500</CardFooter>
      </Card>
    );
  });

  return (
    <section className="container w-full mt-12 grid grid-cols-6 grid-row-2 min-h-screen">
      <div className="flex justify-start items-start col-span-2">
        <div className="flex items-center justify-start">
          <icons.arrowDown height={90} width={90} />
          <h1 className="font-bold text-5xl">New Arrivals</h1>
        </div>
      </div>
      <div className="col-span-4 bg-primary h-2 w-full mt-12" />
      <div className="col-span-6">
        <div className="grid grid-cols-4 rows-auto gap-4 max-w-full mt-4">
          {products}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
