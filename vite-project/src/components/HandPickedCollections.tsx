import images from "@/lib/images";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const HandPickedCollections = () => {
  const collections = images.collections.map((collection) => {
    return (
      <Card className="h-70 w-70 overflow-hidden">
        <CardContent
          className={cn("w-full h-full p-0 relative flex items-end ")}
        >
          <img
            src={collection.image}
            className="w-full h-full shadow-blue-500/50"
            alt={collection.title}
          />
          <div className="absolute w-full h-full" />
          <p className="absolute m-3 md:m-5 font-semibold md:text-2xl text-sm ">
            {collection.title}
          </p>
        </CardContent>
      </Card>
    );
  });
  return (
    <section className="py-5 bg-[#1B4B66] space-y-4 overflow-hidden flex flex-col justify-center container mt-12">
      <h1 className="font-semibold text-2xl text-primary-foreground">
        Handpicked Collections
      </h1>
      <div className="md:flex justify-between grid grid-cols-2 gap-5">
        {collections}
      </div>
    </section>
  );
};

export default HandPickedCollections;
