"use client";

import { useState } from "react";
import Image from "next/image";
import { useUserQuery } from "@/hooks/useUserQuery";
import { icons, images } from "@/constants";
import CustomBtn from "@/components/shared/CustomBtn";
import EditModal from "./EditModal";
import Loader from "@/components/shared/Loader";
import moment from "moment-jalaali";
import { e2p } from "@/utils/clientFun";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [nameForm, setNameForm] = useState("");

  const { userData, isPending } = useUserQuery();

  const handleEditClick = (type, name) => {
    setModalType(type);
    setNameForm(name);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const userInfo = [
    {
      label: "نام و نام خانوادگی",
      field: "displayName",
      value: userData?.user?.displayName,
      editable: true,
    },
    {
      label: "نام کاربری",
      field: "username",
      value: userData?.user?.username,
      editable: false,
    },
    {
      label: "شماره موبایل",
      field: "phoneNumber",
      value: userData?.user?.phoneNumber,
      editable: true,
    },
    {
      label: "کد ملی",
      field: "nationalcode",
      value: userData?.user?.nationalcode,
      editable: true,
    },
    {
      label: "ایمیل",
      field: "email",
      value: userData?.user?.email,
      editable: true,
    },
    { label: "شغل", field: "job", value: userData?.user?.job, editable: true },
    {
      label: "جنسیت",
      field: "gender",
      value:
        userData?.user?.gender === "male"
          ? "مرد"
          : userData?.user?.gender === "female"
          ? "زن"
          : "غیره",
      editable: true,
    },
    {
      label: "تاریخ تولد",
      field: "birthDate",
      value: moment(userData?.user?.birthDate).format("jYYYY/jMM/jDD"),
      editable: true,
    },
    { label: "رمز عبور", field: "password", value: "******", editable: true },
  ];

  if (isPending) {
    return (
      <main className="text-center py-10 w-full flex items-center justify-center">
        <Loader size={8} />
      </main>
    );
  }

  return (
    <div className="w-full border pt-5 bg-white rounded-lg shadow-md h-fit">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={userData?.user?.images || images.avatar}
          width={60}
          height={60}
          priority={true}
          alt="آواتار"
          className="w-20 mr-5 border border-[#000] p-1 h-20 rounded-full object-cover shadow-sm"
        />
        <div>
          <h2 className="text-[16px] font-semibold text-gray-800">
            {userData?.user?.displayName || "کاربر"}
          </h2>
          <p className="text-gray-500 text-[12px]">
            {userData?.user?.email || "ایمیل وارد نشده"}
          </p>
        </div>
        <CustomBtn
          classNames="text-blue-500 text-sm hover:underline"
          title={<span className="text-blue-400">{icons.edit}</span>}
          onClick={() => handleEditClick("images", "آواتار")}
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 ">
        {userInfo.map((item, index) => (
          <li
            key={index}
            className="p-4 hover:shadow-sm border-t border-r border-gray-100 hover:bg-gray-100 transition duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-600 text-[14px]">
                {item.label}
              </span>
              {item.editable && (
                <CustomBtn
                  classNames="text-blue-500 text-sm hover:underline"
                  title={<span className="text-blue-400">{icons.edit}</span>}
                  onClick={() => handleEditClick(item.field, item.label)}
                />
              )}
            </div>
            <span className="text-gray-800 text-[12px]">
              {e2p(item.value) || (
                <span className="text-gray-400">اطلاعات وارد نشده</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <EditModal
        visible={isModalOpen}
        onClose={handleModalClose}
        type={modalType}
        name={nameForm}
        id={userData?.user?._id}
      />
    </div>
  );
};

export default UserProfile;
