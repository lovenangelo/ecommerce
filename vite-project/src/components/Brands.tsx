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
      <h1 className="font-semibold text-xl ">Shop by Brands</h1>
      <div className="flex justify-between">{logos}</div>
      <div className="grid grid-cols-2 auto-rows-auto gap-5">
        <img
          src={images.makeupBg}
          className="w-full rounded-md col-span-2"
          alt="makeup background"
        />
        {/* <div className="absolute">
          <h2>Makeup Accessories from Top Brands</h2>
          <h1>LIFESTYLE</h1>
        </div> */}
        <img
          src={images.creamBg}
          className="rounded-md w-full h-full"
          alt="cream background"
        />
        <img
          src={images.skincareBg}
          className="rounded-md w-full h-full"
          alt="skin care background"
        />
      </div>
    </section>
  );
};

export default Brands;
