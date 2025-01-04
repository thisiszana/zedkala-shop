"use client";

import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Modal, Form, Input, Progress } from "antd";

import CustomBtn from "@/components/shared/CustomBtn";
import { passwordRequirements } from "@/constants";
import BirthDateInput from "./BirthDateInput";
import { fetchEditUserInfo } from "@/services/req";
import { useAuth } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/services/queryKey";
import toast from "react-hot-toast";
import Loader from "@/components/shared/Loader";
import UploadAvatar from "@/components/shared/UploadAvatar";
import { uploadCompressedFile } from "@/utils/clientFun";
import { useUserQuery } from "@/hooks/useUserQuery";

const EditModal = ({ visible, onClose, type, name, id }) => {
  const [birthDate, setBirthDate] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { control, handleSubmit, reset, watch } = useForm();

  const queryClient = useQueryClient();

  const { user } = useAuth();
  const { accessToken } = user || "";
  useUserQuery(accessToken);

  const newPassword = watch("newPassword", "");

  const onSubmit = async (data) => {
    setLoading(true);

    const avatarData =
      imageType === "custom" ? await uploadCompressedFile(image) : image;

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    if (avatarData && avatarData.fileUrl) {
      filteredData.images = avatarData.fileUrl;
    }

    if (birthDate) {
      filteredData.birthDate = birthDate;
    }

    const res = await fetchEditUserInfo({ accessToken, filteredData, id });
    console.log("ressssssssss", res);
    if (res.success === true) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user_session] });
      reset();
      onClose(false);
    } else {
      toast.error(res.msg);
    }
    setLoading(false);
  };

  const calculatePasswordStrength = () => {
    let strength = 0;
    passwordRequirements.forEach((req) => {
      if (req.test.test(newPassword)) strength += req.points;
    });
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength <= 2) return { label: "ضعیف", color: "#ff0000" };
    if (strength <= 4) return { label: "متوسط", color: "#f7b100" };
    return { label: "قوی", color: "#008000" };
  };

  const strength = calculatePasswordStrength();
  const { label, color } = getPasswordStrengthLabel(strength);

  const isRequirementMet = (test) => test.test(newPassword);

  const renderInputs = () => {
    switch (type) {
      case "password":
        return (
          <>
            <Controller
              name="currentPassword"
              control={control}
              defaultValue=""
              rules={{ required: "رمز عبور فعلی الزامی است." }}
              render={({ field, fieldState }) => (
                <Form.Item
                  label="رمز عبور فعلی"
                  validateStatus={fieldState.error ? "error" : ""}
                  help={fieldState.error?.message}
                >
                  <Input.Password
                    {...field}
                    placeholder="رمز عبور فعلی"
                    className="py-[12px] rounded-[8px] text-[12px]"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "رمز عبور جدید الزامی است.",
              }}
              render={({ field, fieldState }) => (
                <Form.Item
                  label="رمز عبور جدید"
                  validateStatus={fieldState.error ? "error" : ""}
                  help={fieldState.error?.message}
                >
                  <Input.Password
                    {...field}
                    placeholder="رمز عبور جدید"
                    className="py-[12px] rounded-[8px] text-[12px]"
                  />
                </Form.Item>
              )}
            />
            <ul className="text-gray-600 text-sm mb-4">
              {passwordRequirements.map((req, index) => (
                <li
                  key={index}
                  className={`text-[12px] mb-1 ${
                    isRequirementMet(req.test)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {req.label}
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <Progress
                percent={(strength / 6) * 100}
                showInfo={false}
                strokeColor={color}
              />
              <span style={{ color }}>{label}</span>
            </div>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "تکرار رمز عبور الزامی است.",
                validate: (value) =>
                  value === newPassword || "رمز عبور مطابقت ندارد.",
              }}
              render={({ field, fieldState }) => (
                <Form.Item
                  label="تکرار رمز عبور جدید"
                  validateStatus={fieldState.error ? "error" : ""}
                  help={fieldState.error?.message}
                >
                  <Input.Password
                    {...field}
                    placeholder="تکرار رمز عبور"
                    className="py-[12px] rounded-[8px] text-[12px]"
                  />
                </Form.Item>
              )}
            />
          </>
        );
      case "nationalcode":
        return (
          <>
            <Controller
              name="nationalcode"
              control={control}
              defaultValue=""
              rules={{
                required: "کد ملی الزامی است.",
                pattern: { value: /^\d{10}$/, message: "کد ملی نامعتبر است." },
              }}
              render={({ field, fieldState }) => (
                <Form.Item
                  label="کد ملی"
                  validateStatus={fieldState.error ? "error" : ""}
                  help={fieldState.error?.message}
                >
                  <Input
                    {...field}
                    type="number"
                    placeholder="کد ملی"
                    className="py-[12px] rounded-[8px] text-[12px]"
                  />
                </Form.Item>
              )}
            />
          </>
        );
      case "gender":
        return (
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            rules={{ required: "انتخاب جنسیت الزامی است." }}
            render={({ field, fieldState }) => (
              <Form.Item
                label="جنسیت"
                validateStatus={fieldState.error ? "error" : ""}
                help={fieldState.error?.message}
              >
                <select
                  {...field}
                  className="py-[12px] rounded-[8px] text-[12px] w-full border"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                  <option value="etc">غیره</option>
                </select>
              </Form.Item>
            )}
          />
        );
      case "phoneNumber":
        return (
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: "شماره موبایل الزامی است.",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل معتبر نیست.",
              },
            }}
            render={({ field, fieldState }) => (
              <Form.Item
                label="شماره موبایل"
                validateStatus={fieldState.error ? "error" : ""}
                help={fieldState.error?.message}
              >
                <Input
                  {...field}
                  type="number"
                  placeholder="شماره موبایل"
                  className="py-[12px] rounded-[8px] text-[12px]"
                />
              </Form.Item>
            )}
          />
        );
      case "email":
        return (
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "ایمیل الزامی است.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "ایمیل معتبر نیست.",
              },
            }}
            render={({ field, fieldState }) => (
              <Form.Item
                label="ایمیل"
                validateStatus={fieldState.error ? "error" : ""}
                help={fieldState.error?.message}
              >
                <Input
                  {...field}
                  type="email"
                  placeholder="ایمیل"
                  className="py-[12px] rounded-[8px] text-[12px]"
                />
              </Form.Item>
            )}
          />
        );
      case "displayName":
        return (
          <Controller
            name="displayName"
            control={control}
            defaultValue=""
            rules={{
              required: "نام و نام خانوادگی الزامی است.",
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: "فقط حروف فارسی مجاز است.",
              },
            }}
            render={({ field, fieldState }) => (
              <Form.Item
                label="نام و نام خانوادگی"
                validateStatus={fieldState.error ? "error" : ""}
                help={fieldState.error?.message}
              >
                <Input
                  {...field}
                  placeholder="نام و نام خانوادگی"
                  className="py-[12px] rounded-[8px] text-[12px]"
                />
              </Form.Item>
            )}
          />
        );
      case "birthDate":
        return (
          <BirthDateInput
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
        );
      case "images":
        return (
          <UploadAvatar
            image={image}
            setImage={setImage}
            setImageType={setImageType}
          />
        );
      default:
        return (
          <Controller
            name={type}
            control={control}
            defaultValue=""
            rules={{ required: `${type} الزامی است.` }}
            render={({ field, fieldState }) => (
              <Form.Item
                label={name}
                validateStatus={fieldState.error ? "error" : ""}
                help={fieldState.error?.message}
              >
                <Input
                  {...field}
                  placeholder={type}
                  className="py-[12px] rounded-[8px] text-[12px]"
                />
              </Form.Item>
            )}
          />
        );
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title={<span>{`ویرایش ${name}`}</span>}
    >
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        {renderInputs()}
        <Form.Item>
          <CustomBtn
            classNames="w-[20%] bg-mainRed text-white text-[12px] font-bold py-2 rounded-[4px]"
            title={
              loading ? (
                <Loader size={4} color={"#fff"} />
              ) : (
                <div>ثبت اطلاعات</div>
              )
            }
            type="submit"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
