import { LeftAngle } from "@/components/icons/Icons";
import { images } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function ShippingInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between px-[10px] py-2 rounded-[8px] border">
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-[12px] font-bold text-pink-600">
              ارسال رایگان سفارش‌ها برای اعضای پلاس
            </h3>
            <ul className="mt-2 text-[12px] text-gray-600 list-disc px-5">
              <li className="mt-2">۴ ارسال رایگان عادی</li>
              <li className="mt-2">۲ ارسال سوپرمارکت</li>
              <li className="mt-2">پشتیبانی اختصاصی</li>
            </ul>
          </div>
        </div>
        <Image
          src={images.freeDeliverySvg1}
          width={100}
          height={100}
          alt="آیکون"
        />
      </div>
      <div className="flex items-end justify-between px-[10px] py-2 rounded-[8px] border">
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-[14px] font-bold text-blue-600">
              خرید این کالا با تسهیلات دیجی‌پی
            </h3>
            <ul className="mt-2 text-[12px] text-gray-600 list-disc px-5">
              <li className="mt-2">فقط با ماهی ۶،۵۸۵،۳۰۰ تومان (۱۲ ماه)</li>
              <li className="mt-2">اعتبار پیشنهادی برای خرید: ۷۰،۰۰۰،۰۰۰ تومان</li>
            </ul>
          </div>
        </div>
        <Link
          href="#"
          className="text-[10px] text-blue-600 font-bold flex items-center gap-1"
        >
          مشاهده جزئیات <span><LeftAngle className="w-2 h-2" /></span>
        </Link>
      </div>
    </div>
  );
}
