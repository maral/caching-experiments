import ProductPrice from "@/components/ProductPrice";
import VolatileLastUpdated from "@/components/VolatileLastUpdated";
import { Suspense } from "react";
import ProductCategory from "../components/ProductCategory";
import ProductDetail from "../components/ProductDetail";
import ProductDiscount from "../components/ProductDiscount";
import ProductImage from "../components/ProductImage";
import ProductManufacturer from "../components/ProductManufacturer";
import ProductStockCount from "../components/ProductStockCount";

export default async function Product() {
  console.log("Product");

  return (
    <ProductDetail>
      <Suspense fallback={<p>Loading ProductImage...</p>}>
        <ProductImage />
      </Suspense>
      <Suspense fallback={<p>Loading ProductPrice...</p>}>
        <ProductPrice />
      </Suspense>
      <Suspense fallback={<p>Loading VolatileLastUpdated...</p>}>
        <VolatileLastUpdated />
      </Suspense>
      <Suspense fallback={<p>Loading ProductDiscount...</p>}>
        <ProductDiscount />
      </Suspense>
      <Suspense fallback={<p>Loading ProductStockCount...</p>}>
        <ProductStockCount />
      </Suspense>
      <Suspense fallback={<p>Loading ProductCategory...</p>}>
        <ProductCategory />
      </Suspense>
      <Suspense fallback={<p>Loading ProductManufacturer...</p>}>
        <ProductManufacturer />
      </Suspense>
    </ProductDetail>
  );
}
