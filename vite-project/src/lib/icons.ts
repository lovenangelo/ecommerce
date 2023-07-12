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
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
  StarIcon,
  CreditCardIcon,
} from "lucide-react";

import googleIcon from "@/assets/images/svg/icons8-google.svg";

const Icons = {
  nav: {
    favorites: HeartIcon,
    profile: UserIcon,
    checkout: ShoppingBagIcon,
    menu: MenuIcon,
  },
  creditCard: CreditCardIcon,
  starIcon: StarIcon,
  minusIcon: MinusIcon,
  plusIcon: PlusIcon,
  search: SearchIcon,
  arrowRight: MoveRightIcon,
  arrowDown: MoveDownIcon,
  mapPin: MapPin,
  chevronRight: ChevronRightIcon,
  chevronDownIcon: ChevronDownIcon,
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
