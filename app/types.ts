export type TCategories = {
  title: string;
  href: string;
};

export type TProduct = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
};

export type LoaderData<T> = {
  data: T;
};
