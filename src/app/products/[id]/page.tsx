import ProductDetailPage from "@/app/components/productDetails/ProductDetails";
import YouMayAlsoLikeSection from "@/app/components/productDetails/YouMayAlsoLikeSec";

interface IPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IPageProps) {
  const { id } = await params;

  return (
    <div>
      {/* Specific product details */}
      <ProductDetailPage productId={Number(id)} />
      {/* More Products Section */}
      <YouMayAlsoLikeSection />
    </div>
  );
}
