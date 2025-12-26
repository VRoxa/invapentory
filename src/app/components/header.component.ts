import { Component } from "@angular/core";

@Component({
  selector: 'app-header',
  template: `
    <div class="background-slide">
      <div class="info"></div>
      <div class="img"></div>
      <!-- <img src="img/banner.png" alt="banner"> -->
    </div>
  `,
  styles: [`
    .background-slide {
      width: 100%;
      height: 30vh;
      margin: 0 0 -10vh 0;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        background: linear-gradient(
          to left,
          var(--accent-color-700),
          var(--accent-color-300)
        );

        clip-path: polygon(
          0 0,
          100% 0,
          100% 60%,
          0 100%
        );
      }

      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .img {
        height: 10rem;
        width: 10rem;
        margin-top: 1rem;

        background-color: var(--background-dark);
        mask-image: url('/img/banner.png');
        mask-size: contain;
        mask-repeat: no-repeat;

        z-index: 2;
      }
    }

    @keyframes hue-cycle {
      from { filter: hue-rotate(0deg); }
      to { filter: hue-rotate(360deg); }
    }
  `],
  standalone: true,
})
export class HeaderComponent {}
