import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  private readonly http = inject(HttpClient);

  getPhone() {
    return this.http.get<string>('/.netlify/functions/contact');
  }
}
