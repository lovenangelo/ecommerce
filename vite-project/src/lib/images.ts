import bag1 from "@/assets/images/bags/bag-1.jpg";
import bag2 from "@/assets/images/bags/bag-2.jpg";
import bag3 from "@/assets/images/bags/bag-3.jpg";
import bag4 from "@/assets/images/bags/bag-4.jpg";
import heroBg from "@/assets/images/bg/hero-bg.jpg";
import handbags from "@/assets/images/collections/handbags.png";
import personalCare from "@/assets/images/collections/personal-care.png";
import sunGlasses from "@/assets/images/collections/sun-glasses.png";
import wristWatches from "@/assets/images/collections/wrist-watches.png";
import biba from "@/assets/images/brands/biba.png";
import prada from "@/assets/images/brands/prada.png";
import chanel from "@/assets/images/brands/chanel.png";
import hm from "@/assets/images/brands/h&m.png";
import dg from "@/assets/images/brands/d&g.png";
import zara from "@/assets/images/brands/zara.png";
import makeupBg from "@/assets/images/bg/makeup-bg.jpg";
import skincareBg from "@/assets/images/bg/skincare-bg.jpg";
import creamBg from "@/assets/images/bg/cream-bg.jpg";
import heroPromo from "@/assets/images/bg/hero-promo.jpg";
import sellBg from "@/assets/images/bg/sell-page-bg.jpg";

const images = {
  sellBg,
  skincareBg,
  creamBg,
  makeupBg,
  heroBg,
  heroPromo,
  bags: [
    {
      src: bag1,
      title: "Pink bag",
      description: "Proin id ornare ante, at volutpat eros.",
    },
    {
      src: bag2,
      title: "Leather bag",
      description:
        " Nam accumsan libero at est ultricies, sit amet semper massa semper.",
    },
    {
      src: bag3,
      title: "Brown bag",
      description:
        " Vestibulum sed lorem dictum, pretium erat non, venenatis augue. ",
    },
    {
      src: bag4,
      title: "Black bag",
      description: "Donec malesuada finibus porta.",
    },
  ],
  collections: [
    {
      title: "Personal Care",
      image: personalCare,
    },
    {
      title: "Handbags",
      image: handbags,
    },
    {
      title: "Wrist Watches",
      image: wristWatches,
    },
    {
      title: "Sun Glasses",
      image: sunGlasses,
    },
  ],
  brands: [biba, zara, hm, dg, prada, chanel],
};

export default images;
