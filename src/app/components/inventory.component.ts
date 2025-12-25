import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Inventory } from '../models/item.model';
import { ItemComponent } from './item.component';

@Component({
  selector: 'inventory',
  imports: [ItemComponent],
  template: `
    <div class="inventory">
      @for (item of inventory().items; track item.taste) {
        <div class="inventory__item">
          <item [item]="item" />
        </div>
      }
    </div>
  `,
  styles: [`
    .inventory {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      &__item {
        flex: 0 1 calc(50% - 0.5rem);
      }
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  inventory = input.required<Inventory>();
}
