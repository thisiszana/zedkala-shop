"use client";

import { e2p, shorterText, sp } from "@/utils/clientFun";
import { Drawer } from "antd";
import Image from "next/image";
import AddToCartInfo from "./AddToCartInfo";
import Link from "next/link";
import { images } from "@/constants";

export default function CartDrawer({
  isOpenDarawer,
  setIsOpenDarawer,
  cartData,
}) {
  const { selectedItems, totalProductsCount, items } = cartData?.cart || {};

  return (
    <div>
      <Drawer
        title={<h2 className="text-xl font-semibold">سبد خرید</h2>}
        open={isOpenDarawer}
        placement="left"
        onClose={() => setIsOpenDarawer(false)}
        width="500px"
        className="custom-drawer"
      >
        {selectedItems?.length > 0 ? (
          <>
            <div className="space-y-4">
              {selectedItems.map((item) => {
                const matchedItem = items.find((i) => i.productId === item._id);
                return (
                  <div
                    key={item._id}
                    className="flex items-center flex-col sm:flex-row gap-4 border border-gray-200 rounded-lg p-2 hover:shadow-lg transition-shadow duration-300 w-full"
                  >
                    <Link
                      href={`product/${item._id}`}
                      className="w-16 h-16 flex-shrink-0"
                    >
                      <Image
                        src={item.images[0]}
                        width={100}
                        height={100}
                        alt={shorterText(item.title, 5)}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-shrink overflow-hidden">
                      <h3 className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                        {item.title}
                      </h3>
                      {matchedItem ? (
                        <p className="text-sm text-gray-500 mt-1">
                          تعداد: {e2p(matchedItem.quantity)}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">تعداد: ۰</p>
                      )}
                    </div>
                    <div className="text-right flex-1">
                      <p className="text-sm font-semibold text-mainRed text-center">
                        {sp(item.price)} تومان
                      </p>
                      <AddToCartInfo
                        productId={item._id}
                        stock={item.stock}
                        isGrocery={item.isGrocery?.value}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  تعداد محصولات:
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {e2p(totalProductsCount) || 0}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  جمع کل:
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {selectedItems
                    ?.reduce((sum, item) => sum + item.price, 0)
                    .toLocaleString("fa-IR")}{" "}
                  تومان
                </span>
              </div>
              <Link
                href="checkout/cart"
                className="w-full inline-block text-center mt-4 bg-mainRed text-white py-2 rounded-lg"
              >
                ادامه به پرداخت
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
          <Image
            src={images.imageNotFoundCart}
            width={200}
            height={200}
            alt="سبد خرید خالی است"
            className="mb-4"
          />
          <p className="text-gray-600 text-lg font-medium mb-4">
            سبد خرید شما خالی است!
          </p>
          <Link
            href="/products"
            className="text-mainRed font-bold hover:underline transition duration-200"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
        )}
      </Drawer>
    </div>
  );
}
