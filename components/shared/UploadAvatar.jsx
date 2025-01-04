"use client";

import Image from "next/image";

import toast from "react-hot-toast";

import { MESSAGES } from "@/messages/messages";
import { defaultAvatars } from "@/constants";
import CustomBtn from "./CustomBtn";

export default function UploadAvatar({ image, setImage, setImageType }) {
  const getAvatar = () => image;

  const setAvatar = (newAvatar, id, type = "custom") => {
    setImageType(type);
    setImage(newAvatar);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 4 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setAvatar(result, "custom");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(MESSAGES.uploadAvatar);
    }
  };

  const handleAvatarClick = (avatar) => {
    setAvatar(avatar.url, avatar.id, "default");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
          {getAvatar() ? (
            <Image
              width={128}
              height={128}
              src={getAvatar()}
              alt="آواتار انتخاب شده"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">آواتار انتخاب کنید</span>
          )}
        </div>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/webp"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <p className="text-sm text-gray-500">
        فرمت‌های مجاز: jpeg, jpg, png, webp | حداکثر حجم: ۴ مگابایت
      </p>

      <div className="flex gap-2">
        {defaultAvatars.map((avatar, index) => (
          <CustomBtn
            key={avatar.id}
            onClick={() => handleAvatarClick(avatar)}
            classNames={`w-12 h-12 rounded-full overflow-hidden border-2 mb-4 ${
              getAvatar() === avatar.id ? "border-blue-500" : "border-gray-300"
            }`}
            title={
              <Image
                width={48}
                height={48}
                src={avatar.url}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover"
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
