import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';

type ItemViewModel = Item & {
  stockClass: string;
  plainImgSrc: string;
}

@Component({
  selector: 'item',
  imports: [CommonModule],
  template: `
    <div class="item" [class.out-of-stock]="vm.stock === 0">
      <div class="item__img-container">
        <img class="img-idle" [src]="vm.imgSrc" [alt]="vm.imgSrc">
        <img class="img-hover" [src]="vm.plainImgSrc" [alt]="vm.imgSrc">
      </div>

      <div class="item__taste-lab">
        @for (taste of vm.taste; track taste) {
          <span class="taste-bubble">
            {{ taste }}
          </span>
        }
      </div>

      <div class="item__stock" [ngClass]="vm.stockClass">
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

      &__img-container {
        display: grid;
        place-items: center;
        overflow: hidden;

        img {
          grid-area: 1 / 1; // Stacks images on top of each other
          width: 100%;
          display: block;
          transition:
            opacity 0.5s ease,
            transform 0.5s ease,
            filter 0.5s ease;
        }

        .img-hover {
          opacity: 0;
          z-index: 1;
        }
      }

      &__taste {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &__stock {
        position: absolute;
        top: 0.5rem;
        right: 3rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: .9rem;

        // Direct color mapping
        &.red { background-color: rgb(235, 143, 136); }
        &.yellow { background-color: rgb(235, 214, 136); }
        &.green { background-color: rgb(136, 235, 166); }
      }

      &__taste-lab {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 15px;
        perspective: 1000px; // Prep for some 3D flavor
      }

      .taste-bubble {
        padding: 4px 12px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.05);
        font-style: italic;
        font-weight: bold;
        color: #eee;
        transition: all 0.5s ease-out;
      }

      &:hover {
        .taste-bubble {
          color: #ff5722;
          transform: scale(1.1); 
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          background: white;
        }

        .img-hover {
          opacity: 1;
          transform: scale(1.2);
        }
        .img-idle {
          transform: scale(1.1);
        }
      }

      // State Modifier
      &.out-of-stock {
        .item__img-container {
          filter: grayscale(100%);
          transition: filter 0.5s ease;

          &:hover {
            filter: grayscale(50%);
          }
        }

        .taste-bubble {
          opacity: .6;
          text-decoration: line-through;
        }
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

    const [folder, imgSrc] = value.imgSrc.split('/');

    this.vm = {
      ...value,
      stockClass,
      plainImgSrc: `${folder}/_${imgSrc}`
    };
  }
}
