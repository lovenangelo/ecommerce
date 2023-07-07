import { Button } from "./ui/button";
import icons from "@/lib/icons";
import images from "@/lib/images";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="container h-96 w-full">
      <div className="flex justify-end relative">
        <div className="z-20 absolute bg-[#DEDEDE]/50 md:bg-[#DEDEDE]/60 md:w-3/4 h-96 rounded-r-md items-start justify-center flex flex-col p-8 space-y-4">
          <h1 className="z-30 text-5xl font-bold text-[#17494D]">
            Shop in style!
          </h1>
          <p className="text-[#17494D]">Classy and trendy collections.</p>
          <Button className={cn("bg-[#1B4B66] space-x-2")}>
            <icons.arrowRight />
            <span>See more</span>
          </Button>
        </div>
      </div>
      <img
        className="h-full w-full rounded-md object-cover"
        src={images.heroBg}
        alt="hero backround"
      />
    </section>
  );
};

export default Hero;
