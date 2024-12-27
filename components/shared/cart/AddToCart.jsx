"use client";

import { useAuth } from "@/context/AuthContext";
import { useAddToCart } from "@/hooks/useAddToCart";
import Loader from "../Loader";
import CustomBtn from "../CustomBtn";
import { isInCart, productQuantity } from "@/utils/clientFun";
import { useUserCart } from "@/hooks/useUserQuery";
import { Exclamation, Trash } from "@/components/icons/Icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MESSAGES } from "@/messages/messages";
import { Tooltip } from "antd";

export default function AddToCart({ productId, stock }) {
  const [action, setAction] = useState("");
  const { user } = useAuth();
  const { accessToken } = user || "";

  const { data, isFetching,isError } = useUserCart(accessToken, productId);
  const { userCart } = data || {};

  const { mutate: addToCart, isPending } = useAddToCart();
  const isProductInCart = isInCart(productId, userCart?.cart?.selectedItems);
  const quantity = productQuantity(productId, userCart?.cart?.items);

  const addHandler = () => {
    if (!user) return toast.error(MESSAGES.userUnAuth);
    setAction("add");
    addToCart(
      {
        action: "add",
        productId,
        accessToken,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.msg);
        },
        onError: (error) => {
          console.error("Error updating cart:", error);
        },
      }
    );
  };

  const decreaseHandler = () => {
    if (!user) return toast.error(MESSAGES.userUnAuth);
    setAction("decrease");
    addToCart(
      {
        action: "decrease",
        productId,
        accessToken,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.msg);
        },
        onError: (error) => {
          console.error("Error updating cart:", error);
        },
      }
    );
  };

  const deleteHandler = () => {
    if (!user) return toast.error(MESSAGES.userUnAuth);
    setAction("delete");
    addToCart(
      {
        action: "delete",
        productId,
        accessToken,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.msg);
        },
        onError: (error) => {
          console.error("Error updating cart:", error);
        },
      }
    );
  };

  if (isError)
    return (
      <Tooltip title="خطا" placement="left">
        <Exclamation size={20} className="text-darkRose" />
      </Tooltip>
    );

  const drawerVariants = {
    hidden: { width: "48px" },
    visible: {
      width: "auto",
      transition: { type: "spring", stiffness: 100, duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex items-center gap-2 bg-white/80 rounded-[8px] overflow-hidden"
      initial="hidden"
      animate={quantity > 0 ? "visible" : "hidden"}
      variants={drawerVariants}
    >
      {isFetching ? (
        <div className="w-[100px] flex items-center justify-center">
          <Loader size={5} color="#000" />
        </div>
      ) : isProductInCart < 0 ? (
        <CustomBtn
          title={
            action === "add" && isPending ? (
              <Loader size={5} color="#000" />
            ) : (
              <span className="text-green-500 text-[30px] font-bold">+</span>
            )
          }
          type="button"
          classNames="flex items-center justify-center text-[28px] h-[28px] rounded-full"
          onClick={addHandler}
          disabled={isPending || quantity >= stock}
        />
      ) : (
        <>
          {quantity > 1 ? (
            <CustomBtn
              type="button"
              title={
                action === "decrease" && isPending ? (
                  <Loader size={5} color="#000" />
                ) : (
                  <span className="text-[#e2a703] text-[30px] font-bold">
                    -
                  </span>
                )
              }
              classNames="flex items-center justify-center text-[28px] h-[28px] rounded-full"
              onClick={decreaseHandler}
              disabled={isPending}
            />
          ) : (
            <CustomBtn
              type="button"
              classNames="flex items-center justify-center bg-white text-[28px] h-[28px] rounded-full"
              onClick={deleteHandler}
              disabled={isPending}
              title={
                action === "delete" && isPending ? (
                  <Loader size={5} color="#ef4444" />
                ) : (
                  <span>
                    <Trash fill="#ef4444" />
                  </span>
                )
              }
            />
          )}
          <span
            className={`text-center font-bold mx-[15px] ${
              quantity === stock ? "text-red-500 text-[10px]" : "text-[16px]"
            }`}
          >
            {quantity && quantity === stock ? "حداکثر مقدار" : quantity}
          </span>
          <CustomBtn
            title={
              action === "add" && isPending ? (
                <Loader size={4} color="#000" />
              ) : (
                <span className="text-green-500 text-[30px] font-bold">+</span>
              )
            }
            type="button"
            classNames="flex items-center justify-center h-[28px] text-[28px] bg-white rounded-full"
            onClick={addHandler}
            disabled={isPending || quantity >= stock}
          />
        </>
      )}
    </motion.div>
  );
}
