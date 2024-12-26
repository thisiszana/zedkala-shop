"use client";

import { Suspense } from "react";

import ProductSkeletons from "./ui/ProductCardSkeleton";
import ProductContent from "./ui/ProductContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductSkeletons count={9} />}>
      <ProductContent />
    </Suspense>
  );
}