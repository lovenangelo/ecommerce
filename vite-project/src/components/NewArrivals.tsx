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
const NewArrivals = () => {
  const products = images.bags.map((img) => {
    return (
      <Card className="grid">
        <CardHeader>
          <CardTitle>{img.title}</CardTitle>
          <CardDescription>{img.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={img.src} alt="bag" />
        </CardContent>
        <CardFooter>$500</CardFooter>
      </Card>
    );
  });

  return (
    <section className="container w-full px-5 mt-12 grid grid-cols-6 grid-row-3 gap-5">
      <div className="flex justify-start items-start row-span-3 col-span-2">
        <div className="flex items-center justify-start">
          <icons.arrowDown height={90} width={90} className="text-black" />
          <h1 className="font-bold text-5xl text-black">New Arrivals</h1>
        </div>
      </div>
      <div className="col-span-4 bg-black h-2 w-full inline-block mt-12" />
      <div className="col-span-4 ">
        <div className="grid grid-cols-4 rows-auto gap-4 max-w-full mt-24">
          {products}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
