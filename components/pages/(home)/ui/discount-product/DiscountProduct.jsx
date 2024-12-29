import { fetchDiscountProduct } from "@/services/req";
import DisProductSlider from "./DisProductSlider";

export default async function DiscountProduct() {
  const { productsDiscount, success } = await fetchDiscountProduct();

  if (!success) {
    return <div>خطا در دریافت اطلاعات</div>;
  }
  return (
    <div>
      <DisProductSlider discountProduct={productsDiscount} />
    </div>
  );
}
