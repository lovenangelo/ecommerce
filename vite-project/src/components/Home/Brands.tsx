import images from "@/lib/images";
import { Link } from "wouter";

const Brands = () => {
  const logos = images.brands.map((brand, index) => {
    return (
      <Link to="/products/apparels" key={index}>
        <div className="transition-colors hover:cursor-pointer flex justify-center items-center rounded-md bg-[#F4F4F4] hover:bg-[#9dc4b8] h-24 w-24 p-5">
          <img src={brand} alt={brand} />
        </div>
      </Link>
    );
  });
  return (
    <section className="container py-5 space-y-8 md:space-y-12 mt-8">
      <h1 className="font-bold text-3xl">Shop by Brands</h1>
      <div className="grid grid-cols-3 gap-2 row-auto md:flex md:justify-around">
        {logos}
      </div>
      <div className="grid grid-cols-2 auto-rows-auto gap-5 relative">
        <Link
          to="/products/skincare"
          className="flex col-span-2 justify-start items-center rounded-md transition ease-in delay-75 duration-200 ring-[#97451F] hover:ring-2"
        >
          <img
            src={images.makeupBg}
            className="w-full rounded-md "
            alt="makeup background"
          />

          <div className="absolute ml-5 text-[#97451F] space-y-2 md:space-y-4">
            <h1 className="text:md md:text-2xl">LIFESTYLE</h1>
            <h2 className="text-xl md:text-5xl font-semibold w-3/4">
              Makeup Accessories from Top Brands
            </h2>
          </div>
        </Link>
        <Link
          to="/products/skincare"
          className="flex justify-end items-center transition ease-in delay-50 duration-200 ring-[#D692A0] hover:ring-2 rounded-md"
        >
          <img
            src={images.creamBg}
            className="rounded-md w-full h-full"
            alt="cream background"
          />
          <div className="absolute text-[#A53F64]">
            <Link to="/products/skincare">
              <h2 className="text-md md:text-5xl  mr-2 md:mr-5 font-semibold">
                Skincare Essentials
              </h2>
            </Link>
          </div>
        </Link>
        <Link
          to="/products/skincare"
          className="flex justify-end items-center transition ease-in delay-50 duration-200 ring-[#5e7e91] hover:ring-2 rounded-md"
        >
          <img
            src={images.skincareBg}
            className="rounded-md w-full h-full"
            alt="skin care background"
          />
          <div className="absolute">
            <h1 className="text-md md:text-5xl text-[#1B4B66] mr-2 md:mr-5 font-semibold">
              Facepacks & Peels
            </h1>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Brands;
