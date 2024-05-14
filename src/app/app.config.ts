import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideRouterStore } from '@ngrx/router-store';
import { tokenInterceptor, authFunctionalEffects, authFeature } from './auth';
import {
  errorHandlerFeature,
  errorHandlingInterceptor,
  errorHandlerEffects,
} from './core/error-handler';
import { environment } from '../environments/environment';
import { ngrxFormsFeature, ngrxFormsEffects } from './core/forms';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { API_URL, APP_VERSION } from './core/http-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideStore({
      auth: authFeature.reducer,
      errorHandler: errorHandlerFeature.reducer,
      ngrxForms: ngrxFormsFeature.reducer,
    }),
    provideEffects(
      errorHandlerEffects,
      ngrxFormsEffects,
      authFunctionalEffects
    ),
    provideRouterStore(),
    provideHttpClient(
      withInterceptors([errorHandlingInterceptor, tokenInterceptor]),
      withFetch()
    ),
    !environment.production ? provideStoreDevtools() : [],
    { provide: API_URL, useValue: environment.api_url },
    { provide: APP_VERSION, useValue: environment.app_version },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
