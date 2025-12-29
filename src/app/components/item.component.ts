import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';
import { QuantityComponent } from './quantity.component';
import { GlobalStateService } from '../services/global-state.service';
import { TranslatePipe } from '../pipes/translate.pipe';

const styles = `
  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    z-index: 1;

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
        z-index: 3;
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
      border-width: .1rem;
      border-style: solid;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      font-weight: bold;
      font-size: 1rem;

      transition: transform 0.5s ease;

      // Direct color mapping
      &.red     { color: rgb(235, 143, 136); border-color: rgb(235, 143, 136); }
      &.yellow  { color: rgb(235, 214, 136); border-color: rgb(235, 214, 136); }
      &.green   { color: rgb(136, 235, 166); border-color: rgb(136, 235, 166); }
    }

    &__taste-lab {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .taste-bubble {
      padding: .3rem .4rem;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.05);
      font-style: italic;
      font-weight: bold;
      text-align: center;
      color: var(--contrast);
      transition: all 0.5s ease-out;
    }

    &:hover {
      .taste-bubble {
        color: var(--accent-color-500);
        transform: scale(1.1); 
        background: var(--contrast);
      }

      .img-hover {
        opacity: 1;
        transform: scale(1.2);
      }
      .img-idle {
        transform: scale(1.1);
      }

      .item__stock {
        transform: scale(1.8);
      }
    }

    &__quantity-input {
      width: 100%;
      margin-top: 1rem;
    }

    // State Modifier
    &.out-of-stock {
      .item__img-container {
        filter: none; 
        transition: filter 0.5s ease;
      }

      .img-idle {
        filter: grayscale(100%);
      }
        
      &:hover .img-idle {
        filter: grayscale(50%);
      }

      .taste-bubble {
        // opacity: .6;
        text-decoration: line-through;
      }
    }
  }
`;

type ItemViewModel = Item & {
  stockColor: string;
  plainImgSrc: string;
}

@Component({
  selector: 'item',
  imports: [CommonModule, QuantityComponent, TranslatePipe],
  template: `
    <div class="item" [class.out-of-stock]="vm().stock === 0">
      <div class="item__img-container">
        <img class="img-idle" [src]="vm().imgSrc" [alt]="vm().imgSrc">
        <img class="img-hover" [src]="vm().plainImgSrc" [alt]="vm().imgSrc">
      </div>

      <div class="item__taste-lab">
        @for (taste of vm().taste; track taste) {
          <span class="taste-bubble">
            {{ taste | translate }}
          </span>
        }
      </div>

      <div class="item__stock" [ngClass]="vm().stockColor">
        {{ vm().stock }}
      </div>

      @if (state.isAdmin()) {
        <div class="item__quantity-input">
          <quantity [item]="item()" />
        </div>
      }
    </div>
  `,
  styles: [styles],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {

  state = inject(GlobalStateService);

  item = input.required<Item>();
  vm = computed<ItemViewModel>(() => {
    const getColor = ({ stock }: Item) => {
      if (stock > 4) {
        return 'green';
      }

      return stock > 2 ? 'yellow' : 'red';
    }

    const item = this.item();
    const [folder, imgSrc] = item.imgSrc.split('/');

    return {
      ...item,
      stockColor: getColor(item),
      plainImgSrc: `${folder}/_${imgSrc}`
    };
  })
}
