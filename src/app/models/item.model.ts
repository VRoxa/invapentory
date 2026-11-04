export interface Item {
  taste: string[];
  imgSrc: string;
  stock: number;
  new: boolean;
  ice: boolean;
}

export interface Inventory {
  items: Item[];
}
