export interface Item {
  taste: string[];
  imgSrc: string;
  stock: number;
}

export interface Inventory {
  items: Item[];
}
