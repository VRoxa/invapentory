import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Inventory } from '../models/item.model';
import { ItemComponent } from './item.component';

@Component({
  selector: 'inventory',
  imports: [ItemComponent],
  template: `
    @for (item of inventory.items; track item.taste) {
      <item [item]="item" />
    }
  `,
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  @Input() inventory!: Inventory;
}
