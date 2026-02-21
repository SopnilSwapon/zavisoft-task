export type TCategory = {
  id: number;
  name: string;
  image: string;
  slug: string;
  creationAt: string;
  updatedAt: string;
};

export type TProduct = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: TCategory;
};

export interface CartItem extends TProduct {
  quantity: number;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
