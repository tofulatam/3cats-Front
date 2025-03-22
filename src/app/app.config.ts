import localeEsCo from '@angular/common/locales/es-CO';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import {
	PreloadAllModules,
	provideRouter,
	withComponentInputBinding,
	withInMemoryScrolling,
	withPreloading,
	withViewTransitions
} from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { provideAuth } from './core/auth/auth.provider';
import { provideIcons } from './core/icons/icons.provider';
import { provideMediaWatcher } from './core/media-watcher/media-watcher.provider';

registerLocaleData(localeEsCo);

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			appRoutes,
			withPreloading(PreloadAllModules),
			withComponentInputBinding(),
			withViewTransitions(),
			withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })
		),
		provideAnimationsAsync(),
		provideHttpClient(),
		provideAuth(),
		provideIcons(),
		provideMediaWatcher(),
		{
			// Use the 'fill' appearance on Angular Material form fields by default
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: {
				appearance: 'fill'
			}
		},
		// Locale configuration for date pipes
		{
			provide: LOCALE_ID,
			useValue: 'es-CO'
		}
	]
};
