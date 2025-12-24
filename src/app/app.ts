import { Component, inject } from '@angular/core';
import { firstValueFrom, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { InventoryService } from './services/inventory.service';
import { InventoryComponent } from './components/inventory.component';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, InventoryComponent],
  template: `
    @if (inventory$ | async; as inventory) {
      <inventory [inventory]="inventory" />
    }

    <button (click)="save()">Save</button>
  `,
  styles: [],
})
export class App {
  private readonly service = inject(InventoryService);

  inventory$ = this.service.getInventory().pipe(
    map(({ items }) => [...items].sort(({ stock: a }, { stock: b }) => b - a )),
    map(items => ({ items })),
    // tap(inventory => {
    //   const items = [...inventory.items].sort((a, b) => a.imgSrc.localeCompare(b.imgSrc));
    //   console.log('Received', items);
    // }),
  );

  async save() {
    const obs$ = this.service.saveInventory({
      items: [
        {
          taste: ['Strawberry', 'Banana'],
          imgSrc: 'img/strawberry-banana.png',
          stock: 8,
        },
        {
          taste: ['Mango'],
          imgSrc: 'img/mango.png',
          stock: 0,
        },
        {
          taste: ['Watermelon ice'],
          imgSrc: 'img/watermelon-ice.png',
          stock: 0,
        },
        {
          taste: ['Lemon', 'Lime'],
          imgSrc: 'img/lemon-lime.png',
          stock: 6,
        },
        {
          taste: ['Black ice', 'Dragon fruit', 'Strawberry'],
          imgSrc: 'img/black-ice.png',
          stock: 4,
        },
        {
          taste: ['Love 66'],
          imgSrc: 'img/love-66.png',
          stock: 0,
        },
        {
          taste: ['Cherry', 'Cola'],
          imgSrc: 'img/cherry-cola.png',
          stock: 5,
        },
        {
          taste: ['Cherry', 'Lemon'],
          imgSrc: 'img/cherry-lemon.png',
          stock: 5,
        },
        {
          taste: ['Peach', 'Berry'],
          imgSrc: 'img/peach.png',
          stock: 5,
        },
        {
          taste: ['Peach', 'Mango'],
          imgSrc: 'img/peach-mango.png',
          stock: 0,
        },
        {
          taste: ['Sex on the beach'],
          imgSrc: 'img/sex-on-the-beach.png',
          stock: 0,
        },
        {
          taste: ['Strawberry', 'Kiwi'],
          imgSrc: 'img/strawberry-kiwi.png',
          stock: 0,
        },
        {
          taste: ['Pink lemonade'],
          imgSrc: 'img/pink-lemonade.png',
          stock: 0,
        },
        {
          taste: ['Piña colada'],
          imgSrc: 'img/pina-colada.png',
          stock: 0,
        },
        {
          taste: ['Blueberry sour', 'Raspberry'],
          imgSrc: 'img/blueberry.png',
          stock: 10,
        },
        {
          taste: ['Grape burst'],
          imgSrc: 'img/grape.png',
          stock: 0,
        },
        {
          taste: ['Fizzy cherry'],
          imgSrc: 'img/cherry.png',
          stock: 0,
        },
        {
          taste: ['Strawberry', 'Watermelon'],
          imgSrc: 'img/strawberry-watermelon.png',
          stock: 8,
        },
        {
          taste: ['Mix berries'],
          imgSrc: 'img/berries.png',
          stock: 0,
        },
        {
          taste: ['Kiwi', 'Passion fruit', 'Guayaba'],
          imgSrc: 'img/passion-fruit.png',
          stock: 0,
        },
      ],
    });

    await firstValueFrom(obs$);
  }
}
