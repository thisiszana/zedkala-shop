"use client";

import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Modal, Form, Input, Progress } from "antd";

import CustomBtn from "@/components/shared/CustomBtn";
import { passwordRequirements } from "@/constants";

const EditModal = ({ visible, onClose, type, name }) => {
  const { control, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const newPassword = watch("newPassword", "");

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Updated Data:", data);
    setTimeout(() => {
      setLoading(false);
      onClose();
      reset();
    }, 1000);
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
            {console.log(strength, color)}
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
              name="nationalCode"
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
                    placeholder="کد ملی"
                    className="py-[12px] rounded-[8px] text-[12px]"
                  />
                </Form.Item>
              )}
            />
          </>
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
                label={type}
                validateStatus={fieldState.error ? "error" : ""}
                help={fieldState.error?.message}
              >
                <Input
                  {...field}
                  placeholder={`ویرایش ${type}`}
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
            title="ثبت اطلاعات"
            classNames="w-[20%] bg-mainRed text-white text-[12px] font-bold py-2 rounded-[4px]"
            loading={loading}
            type="submit"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
