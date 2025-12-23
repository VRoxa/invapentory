import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const FUNCTIONS_PATH = '/.netlify/functions';

@Injectable({ providedIn: 'root' })
export class BlobService {
  private readonly http = inject(HttpClient);

  getData<TData>(key: string) {
    return this.http.get<TData>(`${FUNCTIONS_PATH}/get-data?key=${key}`);
  }

  saveData<TData>(key: string, data: TData) {
    return this.http.post(`${FUNCTIONS_PATH}/save-data`, { key, data });
  }
}
