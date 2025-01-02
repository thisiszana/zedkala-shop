import CustomBtn from "@/components/shared/CustomBtn";
import { Button, Drawer, Modal } from "antd";
import { useState } from "react";

const maxVisibleSpecifications = 3;

export default function ProductSpecifications({ specifications }) {
  if (!specifications || specifications.length === 0) {
    return null;
  }

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowDrawer = () => setIsDrawerVisible(true);
  const handleCloseDrawer = () => setIsDrawerVisible(false);
  const handleShowModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <div className="mt-8 border rounded-lg shadow-lg bg-white">
      <div className="bg-mainRed text-white p-2 rounded-t-lg">
        <h3 className="text-[12px] font-bold text-center">مشخصات محصول</h3>
      </div>

      <div className="p-4 grid grid-cols-1 gap-4 lg:hidden">
        {specifications
          .slice(0, maxVisibleSpecifications)
          .map((spec, index) => (
            <div
              key={index}
              className="flex gap-3 flex-col bg-gray-50 border rounded-md p-3"
            >
              <span className="text-gray-700 text-sm truncate">
                {spec.label} :
              </span>
              <span className="text-gray-900 text-sm font-medium truncate">
                {spec.value}
              </span>
            </div>
          ))}
        {specifications.length > maxVisibleSpecifications && (
          <CustomBtn
            onClick={handleShowDrawer}
            classNames="mt-4 w-full text-center py-2 text-sm text-secondaryRed border border-mainRed rounded-md transition"
            title={<span className="text-secondaryRed">مشاهده همه</span>}
          />
        )}
      </div>

      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4 p-4">
        {specifications
          .slice(0, maxVisibleSpecifications)
          .map((spec, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 border rounded-md p-3"
            >
              <span className="text-gray-700 text-[12px] inline-flex items-center truncate">
                {spec.label} :
              </span>
              <span className="text-gray-900 text-[12px] font-medium truncate">
                {spec.value}
              </span>
            </div>
          ))}
        {specifications.length > maxVisibleSpecifications && (
          <CustomBtn
            onClick={handleShowModal}
            classNames="w-full text-center py-1 text-sm text-secondaryRed border border-mainRed rounded-md transition"
            title={<span className="text-secondaryRed">مشاهده همه</span>}
          />
        )}
      </div>

      <Drawer
        title="مشخصات کامل محصول"
        placement="bottom"
        closable
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
        height="90%"
        className="rounded-t-[15px]"
        styles={{
          body: {
            padding: "16px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <ul className="space-y-4">
          {specifications.map((spec, index) => (
            <li
              key={index}
              className="flex justify-between flex-col md:flex-row md:items-center gap-3 text-gray-600 border-b border-gray-200 pb-2"
            >
              <strong>{spec.label} :</strong>
              <span>{spec.value}</span>
            </li>
          ))}
        </ul>
      </Drawer>

      <Modal
        title="مشخصات کامل محصول"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width="50%"
        styles={{
          body: {
            padding: "20px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <ul className="space-y-4">
          {specifications.map((spec, index) => (
            <li
              key={index}
              className="flex justify-between text-gray-600 border-b border-gray-200 pb-2"
            >
              <strong>{spec.label} :</strong>
              <span>{spec.value}</span>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
