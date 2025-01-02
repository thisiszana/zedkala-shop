import {
  PiTextBLight,
  PiBasketThin,
  PiQuestionLight,
  PiBoundingBoxLight,
} from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdNotificationImportant } from "react-icons/md";
import { HiBars3BottomRight } from "react-icons/hi2";
import { ImSortAmountDesc } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoShieldCheck } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { TiInfoLarge } from "react-icons/ti";
import { GoHome } from "react-icons/go";

export const icons = {
  home: <GoHome />,
  info: <TiInfoLarge />,
  check: <IoCheckmark />,
  textB: <PiTextBLight />,
  basket: <PiBasketThin />,
  shield: <GoShieldCheck />,
  sort: <ImSortAmountDesc />,
  question: <PiQuestionLight />,
  category: <PiBoundingBoxLight />,
  menuBars: <HiBars3BottomRight />,
  fastDelivery: <TbTruckDelivery />,
  freeDelivery: <CiDeliveryTruck />,
  important: <MdNotificationImportant />,
  aviable: <IoMdCheckmarkCircleOutline />,
};

export const images = {
  disIcon: "/icon/Amazing.svg",
  home_logo: "/logo/z-logo.jpg",
  disIcon1: "/icon/Amazings1.svg",
  shopBanner: "/images/shop-banner.png",
  avatar: `/images/avatars/avatar_6.jpg`,
  freeDeliverySvg: "/icon/free-delivery.svg",
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

export const productBanner = [
  {
    src: "/images/productBannerRecom1.webp",
    alt: "Slide 1",
    id: 1,
  },
  {
    src: "/images/productBannerRecom2.webp",
    alt: "Slide 1",
    id: 2,
  },
  {
    src: "/images/productBannerRecom3.webp",
    alt: "Slide 1",
    id: 3,
  },
  {
    src: "/images/productBannerRecom4.webp",
    alt: "Slide 1",
    id: 4,
  },
];

export const productBanner1 = [
  {
    src: "/images/productBanner1.webp",
    alt: "Slide 1",
    id: 1,
  },
  {
    src: "/images/productBanner2.webp",
    alt: "Slide 1",
    id: 2,
  },
];

export const productDetailIcons = [
  {
    id: 1,
    src: "/icon/product-details/express-delivery.svg",
    title: "امکان تحویل اکسپرس",
  },
  {
    id: 2,
    src: "/icon/product-details/support.svg",
    title: "24 ساعته، 7 روز هفته",
  },
  {
    id: 3,
    src: "/icon/product-details/cash-on-delivery.svg",
    title: "امکان پرداخت در محل",
  },
  {
    id: 4,
    src: "/icon/product-details/days-return.svg",
    title: "هفت روز ضمانت بازگشت کالا",
  },
  {
    id: 5,
    src: "/icon/product-details/express-delivery.svg",
    title: "ضمانت اصل بودن کالا",
  },
];
