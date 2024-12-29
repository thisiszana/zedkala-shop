import {
  PiTextBLight,
  PiBasketThin,
  PiQuestionLight,
  PiBoundingBoxLight,
} from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiBars3BottomRight } from "react-icons/hi2";
import { ImSortAmountDesc } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
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
  fastDelivery: <TbTruckDelivery />,
  freeDelivery: <CiDeliveryTruck />,
  aviable: <IoMdCheckmarkCircleOutline />,
};

export const images = {
  home_logo: "/logo/z-logo.jpg",
  shopBanner: "/images/shop-banner.png",
  avatar: `/images/avatars/avatar_6.jpg`,
  disIcon: "icon/Amazing.svg",
  imageNotFound: "/images/imagenotfound.jfif",
};

export const sortOptions = [
  { title: "پربازدیدترین", sort: 1 },
  { title: "بیشترین‌تخفیف", sort: 2 },
  { title: "جدیدترین", sort: 3 },
  { title: "ارزان‌ترین", sort: 4 },
  { title: "گران‌ترین", sort: 5 },
  { title: "سوپرمارکتی", sort: 6 },
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
