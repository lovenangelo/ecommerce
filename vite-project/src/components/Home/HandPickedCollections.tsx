import images from "@/lib/images";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { motion } from "framer-motion";
const HandPickedCollections = () => {
  const collections = images.collections.map((collection, index) => {
    return (
      <Link key={index} to="/products/watches">
        <Card
          className="transition-all hover:-translate-y-1 h-70 w-70 overflow-hidden hover:cursor-pointer"
          key={index}
        >
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
      </Link>
    );
  });
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
      className="py-5 md:py-12 bg-[#17494D] space-y-4 overflow-hidden flex flex-col justify-center container mt-8"
    >
      <h1 className="font-semibold text-3xl text-primary-foreground">
        Handpicked Collections
      </h1>
      <div className="md:flex justify-between grid grid-cols-2 gap-5">
        {collections}
      </div>
    </motion.section>
  );
};

export default HandPickedCollections;
