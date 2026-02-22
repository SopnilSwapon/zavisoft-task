"use client";
import AppButton from "../shared/AppButton";
import ProductCard from "../shared/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import GlobalError from "../shared/GlobalError";
import EmptyState from "../shared/EmptyState";

export default function AllProductsSection() {
  const { data: products, loading, error, refetch } = useProducts();
  const firstFourProducts = products ? products.slice(0, 4) : [];

  if (loading) return <ProductCardSkeleton />;
  if (error) return <GlobalError message={error} onRetry={refetch} />;
  if (!products?.length)
    return <EmptyState title="No Products" description="Check back later." />;

  return (
    <section className="w-full mt-6 md:mt-16 lg:mt-22.5">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-5xl xl-text-[74px]  font-semibold uppercase tracking-tight text-gray-900">
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
