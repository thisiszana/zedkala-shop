import { useEffect, useState } from "react";
import { Modal } from "antd";
import AddToCartInfo from "@/components/shared/cart/AddToCartInfo";
import { Close, LeftAngle, ShoppingBag } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import { icons, images } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import { sp } from "@/utils/clientFun";
import Image from "next/image";

export default function SidebarProduct({ product }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const slideVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { x: "100%", transition: { duration: 0.5 } },
  };

  const handleShowModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalContent("");
  };

  return (
    <>
      <div className="hidden md:bg-[#f7f7f7] md:border md:flex md:flex-col md:rounded-[8px] md:shadow-md md:w-[35%] md:p-4 md:mt-8 md:h-fit">
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-[14px] font-bold">فروشنده</h1>
          <div className="flex items-center gap-2">
            <Image src={images.home_logo} width={40} height={40} alt="آیکون" />
            <span className="font-bold text-[12px] text-secondaryRed">زد - کالا</span>
          </div>
        </div>
        <AddToCartInfo productId={product._id} stock={product.stock} />
        <div className="flex flex-col items-end w-full gap-2 text-xs my-3">
          {product.discount?.value > 0 ? (
            <>
              <div className="flex items-center gap-1">
                <span className="bg-mainRed text-white rounded-full px-1 ml-2 text-[10px]">
                  {product.discount.value} %
                </span>
                <span className="text-red-500 font-bold line-through">
                  {sp(product.price)}
                </span>
              </div>
              <p className="text-gray-800">
                {sp(
                  Math.floor(product.price * (1 - product.discount.value / 100))
                )}{" "}
                <span className="text-[10px]">تومان</span>
              </p>
            </>
          ) : (
            <p className="text-gray-800 font-bold">
              {sp(product.price)} <span className="text-[10px]">تومان</span>
            </p>
          )}
        </div>
        {product.warranty && (
          <div className="hidden md:flex items-center gap-2 mt-1 font-bold">
            <span className="inline-flex items-center">{icons.shield}</span>
            <p className="text-[12px] text-gray-600">{product.warranty}</p>
          </div>
        )}

        <div className="mt-3 hidden md:flex flex-col gap-3 border-t pt-2">
          {product.deliveryOptions.fastDelivery && (
            <CustomBtn
              classNames="flex items-center justify-between cursor-pointer"
              onClick={() => handleShowModal("ارسال سریع")}
              title={
                <>
                  <div className="flex items-center gap-2 text-green-600 text-[12px] border-b pb-2">
                    <span className="inline-flex items-center text-[22px]">
                      {icons.fastDelivery}
                    </span>
                    <p>ارسال سریع</p>
                  </div>
                  <LeftAngle size={8} className="text-green-600" />
                </>
              }
            />
          )}

          {product.deliveryOptions.freeDelivery && (
            <CustomBtn
              classNames="flex items-center justify-between cursor-pointer"
              onClick={() => handleShowModal("ارسال رایگان")}
              title={
                <>
                  <div className="flex items-center gap-2 text-[#ef4056] text-[12px]">
                    <span className="inline-flex items-center text-[22px]">
                      {icons.freeDelivery}
                    </span>
                    <p>ارسال رایگان</p>
                  </div>
                  <LeftAngle size={8} className="text-[#ef4056]" />
                </>
              }
            />
          )}
        </div>
      </div>

      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[150px] left-0 bg-mainRed text-white p-2 rounded-tr-[10px] text-[12px] shadow-lg z-[1000] md:hidden"
          initial={{ y: 150, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <ShoppingBag />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white p-6 z-50 shadow-lg rounded-t-lg md:hidden"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end items-center mb-3">
              <CustomBtn
                icon={<Close className="text-[10px]" />}
                onClick={() => setIsOpen(false)}
                classNames="text-mainRed"
              />
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <AddToCartInfo productId={product._id} stock={product.stock} />
              <span className="block text-[14px] font-bold text-green-600 text-end mt-4">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        title={
          <div className="text-right text-lg font-bold border-b pb-3">
            جزئیات ارسال
          </div>
        }
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <div className="space-y-4">
          {modalContent === "ارسال رایگان" ? (
            <>
              <h3 className="text-right text-base font-semibold">
                ارسال رایگان زدکالا
              </h3>
              <p className="text-right text-sm text-gray-600 leading-relaxed">
                این کالا با ارسال رایگان توسط پیک زدکالا ارسال می‌شود و هزینه‌ای
                بابت ارسال پرداخت نخواهید کرد.
              </p>
            </>
          ) : modalContent === "ارسال سریع" ? (
            <>
              <h3 className="text-right text-base font-semibold">
                ارسال سریع زدکالا
              </h3>
              <p className="text-right text-sm text-gray-600 leading-relaxed">
                این کالا در انبار زدکالا موجود است و با ارسال سریع در بازه
                انتخابی به شما تحویل داده خواهد شد.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-right text-base font-semibold">
                ارسال زدکالا
              </h3>
              <p className="text-right text-sm text-gray-600 leading-relaxed">
                این کالا در انبار زدکالا موجود و آماده پردازش است و توسط پیک
                زدکالا در بازه انتخابی ارسال خواهد شد.
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
