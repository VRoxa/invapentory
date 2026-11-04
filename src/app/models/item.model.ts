export interface Item {
  taste: string[];
  imgSrc: string;
  stock: number;
  new: boolean;
}

export interface Inventory {
  items: Item[];
}
