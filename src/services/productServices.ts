import axiosInstance from "@/lib/axiosInstance";
import { TProduct } from "@/types";

export const productService = {
  getAll: async (): Promise<TProduct[]> => {
    const { data } = await axiosInstance.get<TProduct[]>("/products");
    return data;
  },

  getById: async (id: number): Promise<TProduct> => {
    const { data } = await axiosInstance.get<TProduct>(`/products/${id}`);
    return data;
  },
};
