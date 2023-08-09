import { Button } from "../ui/button";
import icons from "@/lib/icons";
import images from "@/lib/images";
import { cn } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Link } from "wouter";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="container h-96 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, repeat: 0 }}
        viewport={{ once: true }}
        className="flex justify-end relative"
      >
        <div className=" z-20 absolute bg-[#DEDEDE]/50 md:bg-[#DEDEDE]/60 md:w-3/4 h-96 rounded-r-md items-start justify-center flex flex-col p-8 space-y-4">
          <h1 className="z-30 text-5xl font-bold text-[#17494D]">
            Shop in style!
          </h1>
          <p className="text-[#17494D]">Classy and trendy collections.</p>
          <Link to="/products/handbags">
            <Button className={cn("bg-[#1B4B66] space-x-2")}>
              <icons.arrowRight />
              <span>See more</span>
            </Button>
          </Link>
        </div>
      </motion.div>
      <LazyLoadImage
        effect="opacity"
        height={"100%"}
        width={"100%"}
        className="h-full w-full rounded-md object-cover transition-opacity"
        src={images.heroBg}
        alt="hero backround"
      />
    </section>
  );
};

export default Hero;
