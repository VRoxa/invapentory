import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, firstValueFrom, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  private readonly http = inject(HttpClient);
  
  readonly isAdmin = signal(false);

  async toggleAdmin() {
    if (this.isAdmin()) {
      this.isAdmin.set(false);
      return;
    }

    const password = prompt('Password');
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
