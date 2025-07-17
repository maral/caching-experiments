import ProductCategory from "@/components/ProductCategory";
import ProductDescription from "@/components/ProductDescription";
import ProductDetail from "@/components/ProductDetail";
import ProductDiscount from "@/components/ProductDiscount";
import ProductImage from "@/components/ProductImage";
import ProductManufacturer from "@/components/ProductManufacturer";
import ProductPrice from "@/components/ProductPrice";
import ProductStockCount from "@/components/ProductStockCount";
import ProductTitle from "@/components/ProductTitle";
import VolatileLastUpdated from "@/components/VolatileLastUpdated";
import { Suspense } from "react";

const components = {
  ProductDetail,
  ProductCategory,
  ProductDescription,
  ProductTitle,
  ProductDiscount,
  ProductImage,
  ProductManufacturer,
  ProductPrice,
  ProductStockCount,
  VolatileLastUpdated,
};

type Node = {
  component: keyof typeof components;
  children?: Node[];
};

const config: Node = {
  component: "ProductDetail",
  children: [
    { component: "ProductImage" },
    { component: "ProductPrice" },
    { component: "VolatileLastUpdated" },
    { component: "ProductDiscount" },
    { component: "ProductStockCount" },
    { component: "ProductCategory" },
    { component: "ProductManufacturer" },
  ],
};

export default function About() {
  console.log("About");
  return <RenderSuspendedNode node={config} />;
}

function RenderSuspendedNode({ node }: { node: Node }) {
  const Component = components[node.component];
  console.log("RenderSuspendedNode");
  return (
    <Suspense fallback={<div>Loading {node.component}...</div>}>
      <Component>
        {node.children?.map((child, index) => (
          <RenderSuspendedNode key={index} node={child} />
        ))}
      </Component>
    </Suspense>
  );
}
