import { useState, useEffect } from "react";
import { TProduct, ApiState } from "@/types";
import { productService } from "@/services/productServices";

export function useProducts() {
  const [state, setState] = useState<ApiState<TProduct[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await productService.getAll();
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch products";
        if (!cancelled) {
          setState({ data: null, loading: false, error: message });
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    ...state,
    refetch: () => {
      return productService
        .getAll()
        .then((data) => setState({ data, loading: false, error: null }))
        .catch((err) =>
          setState({
            data: null,
            loading: false,
            error:
              err instanceof Error ? err.message : "Failed to fetch products",
          }),
        );
    },
  };
}
