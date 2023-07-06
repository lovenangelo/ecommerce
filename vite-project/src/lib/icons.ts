import {
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  SearchIcon,
  MoveRightIcon,
  MoveDownIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  MapPin,
} from "lucide-react";

const icons = {
  nav: {
    favorites: HeartIcon,
    profile: UserIcon,
    checkout: ShoppingBagIcon,
  },
  search: SearchIcon,
  arrowRight: MoveRightIcon,
  arrowDown: MoveDownIcon,
  mapPin: MapPin,
  socialMedia: {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    youtube: YoutubeIcon,
  },
};

export default icons;
