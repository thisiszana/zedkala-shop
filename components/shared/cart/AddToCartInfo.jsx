"use client";

import { useAuth } from "@/context/AuthContext";
import { useAddToCart } from "@/hooks/useAddToCart";
import Loader from "../Loader";
import CustomBtn from "../CustomBtn";
import { e2p, isInCart, productQuantity } from "@/utils/clientFun";
import { useUserCart } from "@/hooks/useUserQuery";
import { Exclamation, Trash } from "@/components/icons/Icons";
import { useState } from "react";
import toast from "react-hot-toast";

import { MESSAGES } from "@/messages/messages";
import { Tooltip } from "antd";
import Link from "next/link";

export default function AddToCartInfo({ productId, stock, isGrocery }) {
  const [action, setAction] = useState("");
  const { user } = useAuth();
  const { accessToken } = user || "";
  
  const { data, isFetching, isError } = useUserCart(accessToken, productId);
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

  const buttonClasses = `${isGrocery ? "bg-mainGreen" : "bg-mainRed"}`;

  const textClasses = `${isGrocery ? "text-mainGreen" : "text-mainRed"}`;

  return (
    <div className="flex items-center md:mx-auto gap-2 rounded-[8px] md:w-[100%]">
      {isProductInCart < 0 ? (
        <CustomBtn
          title={
            action === "add" && isPending ? (
              <span className="px-4 md:px-0">
                <Loader size={5} color="#000" />
              </span>
            ) : (
              <>
                <p className="text-white text-[10px] font-bold hidden md:block">
                  افزودن به سبد
                </p>
                <p className="text-white text-[10px] font-bold md:hidden px-4">
                  افزودن
                </p>
              </>
            )
          }
          type="button"
          classNames={`flex items-center justify-center text-[10px] h-[40px] w-full rounded-[4px]  ${buttonClasses}`}
          onClick={addHandler}
          disabled={isPending || quantity >= stock}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-white shadow-md px-4 py-2 rounded-lg">
            {quantity > 1 ? (
              <CustomBtn
                type="button"
                title={
                  action === "decrease" && isPending ? (
                    <Loader size={5} color="#000" />
                  ) : (
                    <span className={`${textClasses} text-xl font-bold`}>
                      -
                    </span>
                  )
                }
                classNames="flex items-center justify-center text-xl h-8 w-8 rounded-full"
                onClick={decreaseHandler}
                disabled={isPending}
              />
            ) : (
              <CustomBtn
                type="button"
                classNames="flex items-center justify-center bg-white text-xl h-8 w-8 rounded-full"
                onClick={deleteHandler}
                disabled={isPending}
                title={
                  action === "delete" && isPending ? (
                    <Loader size={5} className={`${textClasses}`} />
                  ) : (
                    <Trash className={`${textClasses} w-5 h-5`} />
                  )
                }
              />
            )}
            {isFetching ? (
              <div className="text-center font-bold mx-3">
                <Loader size={5} className={`${textClasses}`} />
              </div>
            ) : (
              <span
                className={`text-center font-bold mx-5 ${
                  quantity === stock ? "text-red-500 text-xs" : "text-base"
                }`}
              >
                {quantity && quantity === stock ? "حداکثر مقدار" : e2p(quantity)}
              </span>
            )}
            <CustomBtn
              title={
                action === "add" && isPending ? (
                  <Loader size={4} className={`${textClasses}`} />
                ) : (
                  <span className={`${textClasses} text-xl font-bold`}>+</span>
                )
              }
              type="button"
              classNames="flex items-center justify-center h-8 w-8 text-xl bg-white rounded-full"
              onClick={addHandler}
              disabled={isPending || quantity >= stock}
            />
          </div>
          <Link
            href="/cart"
            className={`hidden md:block text-xs text-center ${textClasses}`}
          >
            مشاهده سبد خرید
          </Link>
        </div>
      )}
    </div>
  );
}
