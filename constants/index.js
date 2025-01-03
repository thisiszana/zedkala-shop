import {
  PiTextBLight,
  PiBasketThin,
  PiSignOutFill,
  PiQuestionLight,
  PiBoundingBoxLight,
} from "react-icons/pi";
import {
  MdNotificationImportant,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import {
  IoCheckmark,
  IoChatbubbleOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiDeliveryTruck, CiStar } from "react-icons/ci";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { BsBag, BsClockHistory } from "react-icons/bs";
import { HiBars3BottomRight } from "react-icons/hi2";
import { ImSortAmountDesc } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";
import { FiGift, FiEdit3 } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { TiInfoLarge } from "react-icons/ti";
import { GoHome } from "react-icons/go";

export const icons = {
  bag: <BsBag />,
  home: <GoHome />,
  gift: <FiGift />,
  star: <CiStar />,
  edit: <FiEdit3 />,
  user: <FaRegUser />,
  info: <TiInfoLarge />,
  heart: <FaRegHeart />,
  check: <IoCheckmark />,
  textB: <PiTextBLight />,
  basket: <PiBasketThin />,
  shield: <GoShieldCheck />,
  signout: <PiSignOutFill />,
  sort: <ImSortAmountDesc />,
  history: <BsClockHistory />,
  question: <PiQuestionLight />,
  chat: <IoChatbubbleOutline />,
  category: <PiBoundingBoxLight />,
  menuBars: <HiBars3BottomRight />,
  location: <IoLocationOutline />,
  fastDelivery: <TbTruckDelivery />,
  freeDelivery: <CiDeliveryTruck />,
  important: <MdNotificationImportant />,
  notif: <MdOutlineNotificationsActive />,
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

export const personalInfoSidebar = [
  {
    id: 1,
    icon: icons.home,
    title: "خلاصه فعالیت ها",
    pathname: "",
  },
  {
    id: 2,
    icon: icons.star,
    title: "پلاس",
    pathname: "/zedplus",
  },
  {
    id: 3,
    icon: icons.bag,
    title: "سفارشات",
    pathname: "/orders",
  },
  {
    id: 4,
    icon: icons.heart,
    title: "لیست‌های من",
    pathname: "/lists",
  },
  {
    id: 5,
    icon: icons.chat,
    title: "دیدگاه و پرسش‌ها",
    pathname: "/comments",
  },
  {
    id: 6,
    icon: icons.location,
    title: "آدرس‌ها",
    pathname: "/addresses",
  },
  {
    id: 7,
    icon: icons.gift,
    title: "کارت‌های هدیه",
    pathname: "/gift-cards",
  },
  {
    id: 8,
    icon: icons.notif,
    title: "پیام ها",
    pathname: "/notifcation",
  },
  {
    id: 9,
    icon: icons.history,
    title: "بازدیدهای اخیر",
    pathname: "/user-history",
  },
  {
    id: 10,
    icon: icons.user,
    title: "اطلاعات حساب کاربری",
    pathname: "/profile-info",
  },
  // {
  //   id: 11,
  //   icon: icons.signout,
  //   title: "خروج",
  //   pathname: "",
  // },
];

export const passwordRequirements = [
  { label: "شامل عدد", test: /\d/, points: 1 },
  { label: "حداقل ۸ حرف", test: /.{8,}/, points: 3 },
  { label: "شامل علامت (!@#$%^&*())", test: /[!@#$%^&*()]/, points: 2 },
  {
    label: "شامل یک حرف بزرگ و کوچک",
    test: /(?=.*[a-z])(?=.*[A-Z])/,
    points: 2,
  },
];
