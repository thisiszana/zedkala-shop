import {
  PiTextBLight,
  PiBasketThin,
  PiQuestionLight,
  PiBoundingBoxLight,
} from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { GoHome } from "react-icons/go";

export const icons = {
  home: <GoHome />,
  textB: <PiTextBLight />,
  basket: <PiBasketThin />,
  question: <PiQuestionLight />,
  category: <PiBoundingBoxLight />,
  menuBars: <HiBars3BottomRight />,
};

export const images = {
  home_logo: "/logo/z-logo.jpg",
  avatar: `/images/avatars/avatar_${Math.floor(Math.random() * 25) + 1}.jpg`,
};

export const navLinks = [
  {
    title: "صفحه‌اصلی",
    icon: icons.home,
    link: "/",
  },
  {
    title: "محصولات",
    icon: icons.basket,
    link: "/products",
  },
  {
    title: "دسته‌بندی",
    icon: icons.category,
    link: "/categories",
  },
  {
    title: "وبلاگ",
    icon: icons.textB,
    link: "/blogs",
  },
  {
    title: "درباره ما",
    icon: icons.question,
    link: "/about-us",
  },
];
