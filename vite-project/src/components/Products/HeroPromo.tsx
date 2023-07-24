import images from "@/lib/images";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
const HeroPromo = () => {
  return (
    <section className="container h-96 w-full relative">
      <div className="flex justify-end relative">
        <div className=" absolute md:w-2/4 h-96 rounded-r-md items-start justify-center flex flex-col p-8 space-y-4">
          <p className="z-30 text-5xl font-bold">UP TO 70% OFF</p>
          <p className="z-30 text-5xl font-normal">BLACK FRIDAY</p>
        </div>
      </div>
      <LazyLoadImage
        className="h-full w-full rounded-md object-fit"
        height={"100%"}
        width={"100%"}
        effect="opacity"
        src={images.heroPromo}
        alt="hero backround"
      />
    </section>
  );
};

export default HeroPromo;
