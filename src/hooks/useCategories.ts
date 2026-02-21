import { useState, useEffect } from "react";
import { TCategory, ApiState } from "@/types";
import { categoryService } from "@/services/categoryService";

export function useCategories() {
  const [state, setState] = useState<ApiState<TCategory[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await categoryService.getAll();
        setState({ data, loading: false, error: null });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch categories";
        setState({ data: null, loading: false, error: message });
      }
    };
    fetch();
  }, []);

  return state;
}
