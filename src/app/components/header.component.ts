import { Component, inject, output, Signal } from "@angular/core";
import { GlobalStateService } from "../services/global-state.service";
import { ContactInfoService } from "../services/contact-info.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of, tap } from "rxjs";
import { PhoneFormatPipe } from "../pipes/phone.pipe";

type PhoneViewModel = {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  imports: [PhoneFormatPipe],
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
            <button (click)="onSave.emit()">Save</button>
          }
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
          color: var(--background-dark);
          font-size: .9rem;
          cursor: pointer;
          text-decoration: none;

          svg {
            width: 2rem;
            height: 2rem;
            color: var(--background-dark);
            transform: rotate(270deg);
          }
        }

        button {
          background-color: var(--background-dark);
          color: var(--contrast);
          cursor: pointer;
          border-radius: .5rem;
          border: none;

          letter-spacing: .5rem;
          // Centers the text back in, since letter-spacing adds .5rem at the end of the last letter.
          text-indent: .5rem;
          text-transform: uppercase;
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

  onSave = output<void>();

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

  async toggleSettings() {
    await this.state.toggleAdmin();
  }
}
