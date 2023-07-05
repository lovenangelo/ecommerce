import heroBg2 from "@/assets/images/hero-bg-2.jpg";

const Hero = () => {
  return (
    <section className="h-96 w-screen px-5">
      <img
        className="h-full w-full rounded-md object-cover"
        src={heroBg2}
        alt="hero backround"
      />
    </section>
  );
};

export default Hero;
