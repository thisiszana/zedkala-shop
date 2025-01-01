import ProductPage from "@/components/pages/product/ProductPage";

export default async function page({ params }) {
  const id = (await params).id;

  return <ProductPage id={id} />;
}
