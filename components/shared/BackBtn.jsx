import Link from "next/link";
import { LeftAngle } from "../icons/Icons";

export default function BackBtn({ backLink }) {
  return (
    <Link href={backLink || "/"} className="flex items-center gap-1 ml-2 border px-2 py-1 rounded-lg">
      <span className="text-[12px]">بازگشت</span>
      <span>
        <LeftAngle className="w-2 h-2" />
      </span>
    </Link>
  );
}
