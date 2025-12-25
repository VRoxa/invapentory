import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Item } from "../models/item.model";

@Component({
  selector: 'quantity',
  template: `
    <div class="quantity">
      <button (click)="subtract()">−</button>
      <span>{{ item().stock }}</span>
      <button (click)="add()">+</button>
    </div>
  `,
  styles: [`
    .quantity {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      width: 100%;

      button {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: white;
        border: none;
        font-size: 1.3rem;
        color: #ff5722;
      }

      span {
        font-size: 1.3rem;
      }
    }  
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantityComponent {
  item = input.required<Item>();

  public add() {
    this.item().stock += 1;
  }

  public subtract() {
    if (this.item().stock === 0) {
      return;
    }

    this.item().stock -= 1;
  }
}
