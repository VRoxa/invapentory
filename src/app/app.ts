import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { InventoryComponent } from './components/inventory.component';
import { InventoryService } from './services/inventory.service';
import { Inventory } from './models/item.model';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, HeaderComponent, InventoryComponent],
  template: `
    @if (inventory$ | async; as inventory) {
      <div class="header">
        <app-header />
      </div>

      <inventory [inventory]="inventory" />
    }
  `,
  styles: [],
})
export class App {
  private readonly service = inject(InventoryService);

  inventory$ = this.service.getInventory().pipe(
    map(({ items }) => [...items].sort(({ stock: a }, { stock: b }) => b - a )),
    map(items => ({ items })),
  );

  async save(inventory: Inventory) {
    console.log('about to save', inventory)
  }
}
