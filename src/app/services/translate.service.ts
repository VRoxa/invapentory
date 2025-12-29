import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { catchError, filter, map, of, shareReplay, startWith, switchMap } from "rxjs";

type Translations = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  
  public static readonly DEFAULT_LANG = 'es';
  
  currentLang$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(void 0),
    map(() => this.router.url.split('/')),
    map(([, url]) => url),
    map(language => language || TranslateService.DEFAULT_LANG),
    shareReplay(1),
  );

  private readonly translations$ = this.currentLang$.pipe(
    map(language => `/i18n/${language}.json`),
    switchMap(file => this.http.get<Translations>(file).pipe(
      catchError(() => {
        console.error(`Could not load translation file: ${file}`);
        this.router.navigate([TranslateService.DEFAULT_LANG]);
        return of({} as Translations);
      }),
    )),
    shareReplay(1),
  );

  private readonly translationsSignal = toSignal(
    this.translations$,
    { initialValue: {} as Translations }
  );

  translate(label: string) {
    return this.translationsSignal()[label] || label
  }
}
