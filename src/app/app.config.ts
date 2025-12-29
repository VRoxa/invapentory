import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { App } from './app';
import { TranslateService } from './services/translate.service';

const routes: Routes = [
  { path: ':lang', component: App },
  { path: '', redirectTo: TranslateService.DEFAULT_LANG, pathMatch: 'full' },
  { path: '**', redirectTo: TranslateService.DEFAULT_LANG },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
