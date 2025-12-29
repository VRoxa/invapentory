import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, firstValueFrom, map, of } from "rxjs";
import { TranslateService } from "./translate.service";

@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);
  
  readonly isAdmin = signal(false);

  async toggleAdmin() {
    if (this.isAdmin()) {
      this.isAdmin.set(false);
      return;
    }

    const password = prompt(this.translate.translate('APP_PASSWORD'));
    const obs$ = this.http.post<void>('/.netlify/functions/auth', { password }).pipe(
      map(() => true),
      catchError(() => of(false)),
    );

    const authorized = await firstValueFrom(obs$);
    if (authorized) {
      this.isAdmin.set(true);
    }
  }
}
