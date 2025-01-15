import Link from "next/link";
import { LeftAngle } from "../icons/Icons";

export default function BackBtn({ backLink }) {
  return (
    <Link href={backLink || "/"} className="flex items-center gap-1 ml-2 border px-2 py-[2px] rounded-lg text-gray-400 w-fit">
      <span className="text-[11px]">بازگشت</span>
      <span>
        <LeftAngle className="w-2 h-2" />
      </span>
    </Link>
  );
}
