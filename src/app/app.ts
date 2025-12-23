import { Component, inject } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
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
    tap(() => console.log('Received inventory')),
    tap((x) => console.log(x)),
  );

  async save() {
    const obs$ = this.service.saveInventory({
      items: [
        {
          taste: ['strawberry', 'banana'],
          imgSrc: '',
          stock: 4,
        },
      ],
    });

    await firstValueFrom(obs$);
  }
}
