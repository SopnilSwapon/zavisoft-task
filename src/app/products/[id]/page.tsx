import ProductDetailPage from "@/app/components/productDetails/ProductDetails";
import YouMayAlsoLikeSection from "@/app/components/productDetails/YouMayAlsoLikeSec";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return(<div>

    <ProductDetailPage productId={Number(id)} />;
    <YouMayAlsoLikeSection/>
  </div>) 
  
}
