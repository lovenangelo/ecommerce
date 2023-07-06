import heroBg2 from "@/assets/images/hero-bg-2.jpg";
import { Button } from "./ui/button";
import icons from "@/lib/icons";

const Hero = () => {
  return (
    <section className="h-96 w-screen px-5">
      <div className="flex justify-end relative">
        <div className="z-20 absolute bg-[#DEDEDE]/50 w-96 h-96 rounded-md items-start justify-center flex flex-col p-8 space-y-4">
          <h1 className="z-30 text-5xl font-bold"> Shop in style!</h1>
          <p>Classy and trendy collections.</p>
          <Button className="space-x-2">
            <icons.moveRight />
            <span>See more</span>
          </Button>
        </div>
      </div>
      <img
        className="h-full w-full rounded-md object-cover"
        src={heroBg2}
        alt="hero backround"
      />
    </section>
  );
};

export default Hero;
