import heroBg from "@/assets/images/bg/hero-bg.webp";
import handbags from "@/assets/images/collections/handbags.webp";
import personalCare from "@/assets/images/collections/personal-care.webp";
import sunGlasses from "@/assets/images/collections/sun-glasses.webp";
import wristWatches from "@/assets/images/collections/wrist-watches.webp";
import biba from "@/assets/images/brands/biba.png";
import prada from "@/assets/images/brands/prada.png";
import chanel from "@/assets/images/brands/chanel.png";
import hm from "@/assets/images/brands/h&m.png";
import dg from "@/assets/images/brands/d&g.png";
import zara from "@/assets/images/brands/zara.png";
import makeupBg from "@/assets/images/bg/makeup-bg.webp";
import skincareBg from "@/assets/images/bg/skincare-bg.webp";
import creamBg from "@/assets/images/bg/cream-bg.webp";
import heroPromo from "@/assets/images/bg/hero-promo.webp";
import authImage from "@/assets/images/bg/auth-bg.webp";
import productItemFallback from "@/assets/images/product-item-fallback.jpg";

const images = {
  authImage,
  skincareBg,
  creamBg,
  makeupBg,
  heroBg,
  heroPromo,
  productItemFallback,
  collections: [
    {
      title: "Personal Care",
      image: personalCare,
      color: "#FCB860",
    },
    {
      title: "Handbags",
      image: handbags,
      color: "#ECAAAA",
    },
    {
      title: "Wrist Watches",
      image: wristWatches,
      color: "#B9CBDB",
    },
    {
      title: "Sun Glasses",
      image: sunGlasses,
      color: "#616063",
    },
  ],
  brands: [biba, zara, hm, dg, prada, chanel],
};

export default images;
