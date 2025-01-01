import { fetchProduct } from "@/services/req";
import ProductInformation from "./ui/ProductInformation";

export default async function ProductPage({ id }) {
  const product = await fetchProduct(id);

  console.log(product);
  return (
    <div>
      <ProductInformation product={product?.product} />
    </div>
  );
}
