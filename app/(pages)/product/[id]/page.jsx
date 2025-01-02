import ProductPage from "@/components/pages/product/ProductPage";
import { fetchProduct } from "@/services/req";

export default async function page({ params }) {
  const id = (await params).id;

  return <ProductPage id={id} />;
}


export async function generateMetadata({ params }) {
  const id = (await params).id;
  const data = await fetchProduct(id);

  if (!data) {
    notFound();
  }

  return {
    title: {
      absolute: `قیمت و خرید ${data.product.title}`,
    },
    description: data.product.description,
    keywords: data.product.keywords,
  };
}
