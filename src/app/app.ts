import { Component, inject } from '@angular/core';
import { firstValueFrom, map, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { InventoryComponent } from './components/inventory.component';
import { InventoryService } from './services/inventory.service';
import { Inventory } from './models/item.model';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, HeaderComponent, FooterComponent, InventoryComponent],
  template: `
    @if (inventory$ | async; as inventory) {
      <app-header (onSave)="save(inventory)" />
      <inventory [inventory]="inventory" />
      <app-footer />
    }
  `,
})
export class App {
  private readonly service = inject(InventoryService);
  private readonly refresh$$ = new Subject<void>();

  inventory$ = this.refresh$$.pipe(
    startWith(void 0),
    switchMap(() => this.service.getInventory()),
    map(({ items }) => [...items].sort(({ stock: a }, { stock: b }) => b - a )),
    map(items => ({ items })),
  );

  async save(inventory: Inventory) {
    const obs$ = this.service.saveInventory(inventory);
    await firstValueFrom(obs$);
    this.refresh$$.next();
  }
}
