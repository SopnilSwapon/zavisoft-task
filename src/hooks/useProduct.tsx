import { useState, useEffect } from "react";
import { TProduct, ApiState } from "@/types";
import { productService } from "@/services/productServices";

export function useProduct(id: number) {
  const [state, setState] = useState<ApiState<TProduct>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await productService.getById(id);
        setState({ data, loading: false, error: null });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch product";
        setState({ data: null, loading: false, error: message });
      }
    };

    fetchProduct();
  }, [id]);

  return state;
}
