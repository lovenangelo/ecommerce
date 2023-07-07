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
  MenuIcon,
  GithubIcon,
} from "lucide-react";

import googleIcon from "@/assets/images/svg/icons8-google.svg";

const Icons = {
  nav: {
    favorites: HeartIcon,
    profile: UserIcon,
    checkout: ShoppingBagIcon,
    menu: MenuIcon,
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
    github: GithubIcon,
    google: googleIcon,
  },
};

export default Icons;
