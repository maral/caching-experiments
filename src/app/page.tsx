import ProductPrice from "@/components/ProductPrice";
import VolatileLastUpdated from "@/components/VolatileLastUpdated";
import { getCachedConfig } from "@/utils/data";
import { Suspense } from "react";
import ProductCategory from "../components/ProductCategory";
import ProductDetail from "../components/ProductDetail";
import ProductDiscount from "../components/ProductDiscount";
import ProductImage from "../components/ProductImage";
import ProductManufacturer from "../components/ProductManufacturer";
import ProductStockCount from "../components/ProductStockCount";
import { revalidateConfig } from "@/utils/actions";

export default async function Product() {
  const config = await getCachedConfig();
  console.log("Product");

  return (
    <ProductDetail>
      <div>
        Cached config: {config}
        <form action={revalidateConfig}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Revalidate config
          </button>
        </form>
      </div>
      <Suspense fallback={<p>Loading product image...</p>}>
        <ProductImage />
      </Suspense>
      <Suspense fallback={<p>Loading product price...</p>}>
        <ProductPrice />
        <VolatileLastUpdated />
      </Suspense>
      <Suspense fallback={<p>Loading product discount...</p>}>
        <ProductDiscount />
      </Suspense>
      <Suspense fallback={<p>Loading product stock count...</p>}>
        <ProductStockCount />
      </Suspense>
      <Suspense fallback={<p>Loading product category...</p>}>
        <ProductCategory />
      </Suspense>
      <Suspense fallback={<p>Loading product manufacturer...</p>}>
        <ProductManufacturer />
      </Suspense>
    </ProductDetail>
  );
}
