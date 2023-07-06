import images from "@/lib/images";

const Brands = () => {
  const logos = images.brands.map((brand) => {
    return (
      <a href="/">
        <div className="flex justify-center items-center rounded-md bg-[#F4F4F4] h-24 w-24 p-5">
          <img src={brand} alt={brand} />
        </div>
      </a>
    );
  });
  return (
    <section className="container py-5 space-y-12 mt-12">
      <h1 className="font-bold text-2xl ">Shop by Brands</h1>
      <div className="flex justify-between">{logos}</div>
      <div className="grid grid-cols-2 auto-rows-auto gap-5 relative">
        <div className="flex col-span-2 justify-start items-center">
          <img
            src={images.makeupBg}
            className="w-full rounded-md"
            alt="makeup background"
          />
          <div className="absolute ml-5 text-[#97451F] space-y-4">
            <h1 className="text-2xl">LIFESTYLE</h1>
            <h2 className="text-5xl font-semibold w-3/4">
              Makeup Accessories from Top Brands
            </h2>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <img
            src={images.creamBg}
            className="rounded-md w-full h-full"
            alt="cream background"
          />
          <div className="absolute text-[#A53F64]">
            <h2 className="text-5xl mr-5 font-semibold">Skincare Essentials</h2>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <img
            src={images.skincareBg}
            className="rounded-md w-full h-full"
            alt="skin care background"
          />
          <div className="absolute">
            <h1 className="text-5xl text-[#1B4B66] mr-5 font-semibold">
              Facepacks & Peels
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
