import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';

type ItemViewModel = Item & { stockClass: string }

@Component({
  selector: 'item',
  imports: [CommonModule],
  template: `
    <div class="item" [ngClass]="{ 'out-of-stock': vm.stock === 0 }">
      <img 
        class="item__img"
        [src]="vm.imgSrc" [alt]="vm.imgSrc"
      >

      <div class="item__taste">
        @for (taste of vm.taste; track taste) {
          <span class="item__taste-line">{{ taste }}</span>
        }
      </div>

      <div class="item__stock" [ngClass]="[vm.stockClass]">
        {{ vm.stock }}
      </div>
    </div>
  `,
  styles: [`
    .item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      &__img {
        width: 100%;

        &:hover {
          transform: scale(1.2);
        }

        transition: transform linear 0.2s;
      }

      &__taste {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &__stock {
        position: absolute;
        right: 3rem;
        top: .5rem;
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        background-color: rgb(235, 143, 136);
        color: black;
        
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .red { background-color: rgb(235, 143, 136) }
      .yellow { background-color: rgb(235, 214, 136) }
      .green { background-color: rgb(136, 235, 166) }
    }

    .out-of-stock {
      .item__img {
        filter: grayscale(100%);
      }
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  public vm!: ItemViewModel;

  @Input() set item(value: Item) {
    const { stock } = value;
    const stockClass = stock > 4
      ? 'green'
      : stock > 2
        ? 'yellow'
        : 'red';

    this.vm = {
      ...value,
      stockClass
    };
  }
}
