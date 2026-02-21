"use client";
import AppButton from "../shared/AppButton";
import ProductCard from "../shared/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import AppLoader from "../shared/AppLoader";
import GlobalError from "../shared/GlobalError";
import EmptyState from "../shared/EmptyState";

export default function AllProductsSection() {
  const { data: products, loading, error, refetch } = useProducts();
  const firstFourProducts = products ? products.slice(0, 4) : [];

  //   Todo:make loading state skeletons
  if (loading) return <AppLoader text="Products Loading..." />;
  if (error) return <GlobalError message={error} onRetry={refetch} />;
  if (!products?.length)
    return <EmptyState title="No Products" description="Check back later." />;

  return (
    <section className="w-full py-10">
      <div className="flex items-end justify-between my-16">
        <h2 className="text-5xl md:text-6xl xl-text-[74px]  font-semibold uppercase tracking-tight text-gray-900">
          Don’t miss out <br /> new drops
        </h2>
        <AppButton title="SHOP NEW DROPS" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {firstFourProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
