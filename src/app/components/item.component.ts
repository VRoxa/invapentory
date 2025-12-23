import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../models/item.model';

@Component({
  selector: 'item',
  template: `
    <div style='border: 1px solid black'>
      @for (taste of item.taste; track taste) {
        {{ taste }}
      }

      {{ item.imgSrc }}
      {{ item.stock }}
    </div>
  `,
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() item!: Item;
}
