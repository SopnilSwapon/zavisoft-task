import axiosInstance from "@/lib/axiosInstance";
import { TCategory } from "@/types";

export const categoryService = {
  getAll: async (): Promise<TCategory[]> => {
    const { data } = await axiosInstance.get<TCategory[]>("/categories");
    return data;
  },
};
