import { Component, inject, output, Signal } from "@angular/core";
import { GlobalStateService } from "../services/global-state.service";
import { ContactInfoService } from "../services/contact-info.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of } from "rxjs";
import { PhoneFormatPipe } from "../pipes/phone.pipe";
import { TranslatePipe } from "../pipes/translate.pipe";
import { TranslateService } from "../services/translate.service";
import { RouterLink } from "@angular/router";

type PhoneViewModel = {
  label: string;
  url: string;
}

type LangViewModel = {
  currentLang: string;
  targetLang: string;
}

@Component({
  selector: 'app-header',
  imports: [PhoneFormatPipe, TranslatePipe, RouterLink],
  template: `
    <div class="background-slide">
      <div class="background-slide__img"></div>
      <div class="background-slide__info">
        <div class="background-slide__info-settings">
          <svg 
            (click)="toggleSettings()"
            viewBox="0 0 24 24" fill="none"
          >
            <g stroke-width="0"></g>
            <g stroke-linecap="round" stroke-linejoin="round"></g>
            <g>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"></circle>
              <path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            </g>
          </svg>

          @if (state.isAdmin()) {
            <button
              (click)="this.save.emit()"
            >
              {{ 'APP_RETAIL' | translate }}
            </button>
          }

          <a [routerLink]="lang().targetLang">
            @if (lang().currentLang === 'es') {
              <svg viewBox="0 0 256 256">
                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                  <path d="M 0 45 c 0 8.199 2.202 15.88 6.034 22.5 h 77.932 C 87.798 60.88 90 53.199 90 45 c 0 -8.199 -2.202 -15.88 -6.034 -22.5 H 6.034 C 2.202 29.12 0 36.801 0 45 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,196,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 83.966 22.5 c -0.269 -0.465 -0.546 -0.926 -0.831 -1.381 C 75.176 8.438 61.077 0 45 0 c -8.201 0 -15.881 2.205 -22.5 6.04 c -6.357 3.682 -11.736 8.867 -15.635 15.08 C 6.58 21.574 6.304 22.035 6.034 22.5 H 83.966 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(198,11,30); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 6.034 67.5 c 0.269 0.465 0.546 0.926 0.831 1.38 c 3.899 6.213 9.278 11.397 15.635 15.08 C 29.119 87.795 36.799 90 45 90 c 16.077 0 30.176 -8.438 38.135 -21.12 c 0.285 -0.455 0.562 -0.915 0.831 -1.38 H 6.034 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(198,11,30); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                </g>
              </svg>
            }

            @if (lang().currentLang === 'en') {
              <svg viewBox="0 0 256 256">
                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                  <path d="M 88.35 57.052 c 0.034 -0.123 0.076 -0.243 0.109 -0.367 l -0.004 -0.002 C 89.457 52.957 90 49.043 90 45 c 0 -4.033 -0.54 -7.938 -1.538 -11.657 l 0.004 -0.002 c -0.039 -0.146 -0.088 -0.289 -0.128 -0.434 c -0.137 -0.492 -0.28 -0.982 -0.434 -1.468 c -0.081 -0.257 -0.167 -0.512 -0.253 -0.768 c -0.073 -0.217 -0.139 -0.437 -0.215 -0.653 h -0.015 c -1.645 -4.653 -4.021 -8.96 -7.01 -12.768 L 59.997 27.458 V 2.57 c -4.368 -1.544 -9.046 -2.427 -13.915 -2.542 h -2.164 c -4.868 0.115 -9.545 0.998 -13.913 2.541 v 24.889 L 9.589 17.249 c -2.989 3.809 -5.366 8.116 -7.01 12.769 H 2.564 c -0.076 0.216 -0.143 0.436 -0.216 0.653 c -0.086 0.255 -0.172 0.509 -0.253 0.765 c -0.154 0.486 -0.297 0.977 -0.434 1.47 c -0.04 0.145 -0.089 0.287 -0.128 0.432 l 0.004 0.002 C 0.54 37.061 0 40.966 0 45 c 0 4.043 0.543 7.957 1.545 11.684 l -0.004 0.002 c 0.033 0.123 0.074 0.242 0.108 0.365 c 0.146 0.524 0.298 1.046 0.462 1.562 c 0.075 0.236 0.154 0.47 0.233 0.705 c 0.077 0.231 0.148 0.464 0.229 0.693 H 2.59 c 1.647 4.651 4.025 8.955 7.016 12.761 l 20.4 -10.2 v 24.86 C 34.697 89.089 39.741 90 45 90 c 5.26 0 10.305 -0.911 14.997 -2.57 V 62.572 l 20.398 10.199 c 2.991 -3.806 5.368 -8.11 7.015 -12.76 h 0.015 c 0.081 -0.229 0.152 -0.463 0.23 -0.694 c 0.079 -0.234 0.158 -0.468 0.233 -0.704 C 88.052 58.096 88.205 57.575 88.35 57.052 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(243,244,245); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 53.999 0.902 c -2.565 -0.521 -5.213 -0.81 -7.917 -0.874 h -2.164 c -2.703 0.064 -5.35 0.354 -7.914 0.874 v 35.116 H 0.899 C 0.311 38.92 0 41.924 0 45 c 0 3.087 0.312 6.1 0.904 9.012 h 35.1 v 35.087 C 38.911 89.689 41.919 90 45 90 c 3.082 0 6.091 -0.311 8.999 -0.902 V 54.012 h 35.097 C 89.688 51.1 90 48.087 90 45 c 0 -3.076 -0.311 -6.08 -0.899 -8.983 H 53.999 V 0.902 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(204,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 85.242 65.135 c 0.829 -1.653 1.56 -3.363 2.184 -5.125 H 74.993 L 85.242 65.135 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(204,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 82.216 19.701 L 61.581 30.019 h 13.412 l 10.261 -5.131 C 84.353 23.088 83.341 21.354 82.216 19.701 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(204,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 4.747 24.887 c -0.829 1.655 -1.559 3.368 -2.182 5.132 H 15.01 L 4.747 24.887 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(204,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 7.8 70.321 L 28.422 60.01 H 15.01 L 4.758 65.136 C 5.661 66.936 6.674 68.67 7.8 70.321 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(204,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 9.605 72.771" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 80.412 17.251" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 80.395 72.77" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 9.589 17.25" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 9.589 17.249 l 20.416 10.208 v -3.99 V 2.584 C 21.874 5.458 14.813 10.593 9.589 17.249 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 59.997 2.585 v 22.302 v 2.57 L 80.411 17.25 C 75.188 10.594 68.128 5.459 59.997 2.585 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 30.006 72.77 V 62.572 l -20.4 10.2 c 5.222 6.646 12.276 11.774 20.4 14.646 V 72.77 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  <path d="M 59.997 62.572 v 9.296 v 15.548 c 8.123 -2.872 15.176 -8 20.398 -14.646 L 59.997 62.572 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,102); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                </g>
              </svg>
            }
          </a>
        </div>

        <div class="background-slide__info-contact">
          <a [href]="phone().url" target="_blank">
            <svg viewBox="0 0 24 24" fill="none">
              <g stroke-width="0"></g>
              <g stroke-linecap="round" stroke-linejoin="round"></g>
              <g>
                <path d="M4.00655 7.93309C3.93421 9.84122 4.41713 13.0817 7.6677 16.3323C8.45191 17.1165 9.23553 17.7396 10 18.2327M5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C15.2529 20.0243 14.1963 19.9541 13 19.6111" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
              </g>
            </svg>
            <span>{{ phone().label | phone }}</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .background-slide {
      width: 100%;
      height: 30vh;
      margin: 0 0 -10vh 0;

      &__info {
        z-index: 2;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;

        &-settings {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 1rem;

          svg {
            width: 2rem;
            height: 2rem;
            color: var(--background-dark);
            cursor: pointer;
          }
        }

        &-contact a {
          display: flex;
          flex-direction: row-reverse;
          gap: .1rem;
          justify-content: start;
          align-items: center;
          color: var(--accent-color-300);
          font-size: .9rem;
          cursor: pointer;
          text-decoration: none;

          background-color: var(--background-dark);
          border-radius: .5rem;
          padding: .2rem .5rem;
          font-weight: bold;
          letter-spacing: 0.1rem;

          svg {
            width: 2rem;
            height: 2rem;
            color: var(--accent-color-300);
            transform: rotate(270deg);
          }
        }

        button {
          height: 100%;
          background-color: var(--background-dark);
          color: var(--contrast);
          cursor: pointer;
          border-radius: .5rem;
          border: none;

          letter-spacing: .5rem;
          // Centers the text back in, since letter-spacing adds .5rem at the end of the last letter.
          text-indent: .5rem;
          text-transform: uppercase;

          &:disabled {
            background-color: var(--background-mid);
            filter: blur(.05rem);
            // text-decoration: line-through;
          }
        }
      }
      
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
          100% 100%,
          0 40%,
        );
      }

      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &__img {
        height: 20vh;
        width: 20vh;
        margin-top: 1rem;

        // Just guessing (try and error) the angle that forms the clip-path polygon...
        background: linear-gradient(
          20deg,
          var(--contrast) 10%,
          var(--background-dark) 60%,
          var(--background-dark) 100%
        );

        mask-image: url('/img/banner.png');
        mask-size: contain;
        mask-repeat: no-repeat;

        z-index: 2;
      }
    }
  `],
  standalone: true,
})
export class HeaderComponent {

  state = inject(GlobalStateService);
  contactInfo = inject(ContactInfoService);
  translate = inject(TranslateService);

  save = output<void>();

  phone: Signal<PhoneViewModel> = toSignal(
    this.contactInfo.getPhone().pipe(
      catchError(() => of('00000000000')),
      map(phone => ({
        label: phone.toString(),
        url: `https://wa.me/${phone}`
      })),
    ),
    {
      initialValue: { label: '00000000000', url: 'https://wa.me/00000000000' }
    }
  );

  // This will work for now, since we only have two languages to translate to.
  // If we had more (or even an unknown amount of them), we'd have to refactor it.
  lang: Signal<LangViewModel> = toSignal(
    this.translate.currentLang$.pipe(
      map(lang => ({
        currentLang: lang,
        targetLang: lang === 'en' ? '/es' : '/en'
      })),
    ),
    { initialValue: { currentLang: 'es', targetLang: '/en' } }
  );

  async toggleSettings() {
    await this.state.toggleAdmin();
  }
}
