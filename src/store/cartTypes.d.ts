export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string; 
};

export type CartState = {
  items: CartItem[];
  total: number;
  itemCount: number;
}; 