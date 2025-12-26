import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-footer',
  template: `
    <div class="background-slide">
      <span><b>© VRoxa</b> - 2025</span>
    </div>
  `,
  styles: [`
    .background-slide {
      width: 100%;
      height: 30vh;
      margin: -25vh 0 0 0;

      position: relative;

      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: inherit;
        height: inherit;
        background: linear-gradient(
          to left,
          var(--accent-color-700),
          var(--accent-color-300)
        );

        clip-path: polygon(
          0 0,
          100% 60%,
          100% 100%,
          0 100%,
        );

        z-index: 0;
      }

      span {
        position: relative;
        z-index: 1;
        padding: 0 .5rem;
        color: var(--background-dark);
      }
    }  
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
