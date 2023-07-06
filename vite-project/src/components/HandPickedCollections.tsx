import images from "@/lib/images";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const HandPickedCollections = () => {
  const collections = images.collections.map((collection) => {
    return (
      <Card className="h-70 w-70 overflow-hidden">
        <CardContent className={cn("w-full h-full p-0 relative")}>
          <img
            src={collection.image}
            className="w-full h-full"
            alt={collection.title}
          />
          <p className="absolute">{collection.title}</p>
        </CardContent>
      </Card>
    );
  });
  return (
    <section className="py-5 bg-[#1B4B66] space-y-4 overflow-hidden flex flex-col justify-center container mt-12">
      <h1 className="font-semibold text-2xl text-primary-foreground">
        Handpicked Collections
      </h1>
      <div className="flex justify-between">{collections}</div>
    </section>
  );
};

export default HandPickedCollections;
