import {
  PiTextBLight,
  PiBasketThin,
  PiQuestionLight,
  PiBoundingBoxLight,
} from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { ImSortAmountDesc } from "react-icons/im";
import { IoCheckmark } from "react-icons/io5";
import { GoHome } from "react-icons/go";

export const icons = {
  home: <GoHome />,
  check: <IoCheckmark />,
  textB: <PiTextBLight />,
  basket: <PiBasketThin />,
  sort: <ImSortAmountDesc />,
  question: <PiQuestionLight />,
  category: <PiBoundingBoxLight />,
  menuBars: <HiBars3BottomRight />,
};

export const images = {
  home_logo: "/logo/z-logo.jpg",
  avatar: `/images/avatars/avatar_6.jpg`,
  shopBanner: "/images/shop-banner.png",
  imageNotFound: "/images/imagenotfound.jfif",
};

export const sortOptions = [
  "پر بازدیدترین",
  "بیشترین تخفیف",
  "جدیدترین",
  "ارزان‌ترین",
  "گران‌ترین",
  "سوپرمارکتی",
];

export const navLinks = [
  {
    title: "صفحه‌اصلی",
    icon: icons.home,
    link: "/",
    name: "home",
  },
  {
    title: "محصولات",
    icon: icons.basket,
    link: "/products",
    name: "products",
  },
  {
    title: "دسته‌بندی",
    icon: icons.category,
    link: "/categories",
    name: "categories",
  },
  {
    title: "وبلاگ",
    icon: icons.textB,
    link: "/blogs",
    name: "blogs",
  },
  {
    title: "درباره ما",
    icon: icons.question,
    link: "/about-us",
    name: "about",
  },
];
