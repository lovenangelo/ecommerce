import images from "@/lib/images";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
const HeroPromo = () => {
  return (
    <section className="container h-96 w-full relative">
      <div className="bg-[#EBEAEF] w-full h-full md:w-full md:h-0 rounded-md mt-4 flex justify-center md:justify-end relative">
        <div className=" absolute md:w-2/4 h-96 rounded-r-md items-start justify-center flex flex-col p-8 space-y-4">
          <p className="z-30 text-4xl md:text-5xl font-bold">UP TO 70% OFF</p>
          <p className="z-30 text-3xl md:text-5xl font-normal">BLACK FRIDAY</p>
        </div>
      </div>
      <div className="w-full h-full hidden md:block">
        <LazyLoadImage
          className="my-4 h-full w-full rounded-md"
          height={"100%"}
          width={"100%"}
          effect="opacity"
          src={images.heroPromo}
          alt="hero background"
        />
      </div>
    </section>
  );
};

export default HeroPromo;
