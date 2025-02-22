import {
	EnvironmentProviders,
	inject,
	provideEnvironmentInitializer,
	Provider
} from '@angular/core';
import { UtilsService } from './utils.service';

export const provideUtils = (): (Provider | EnvironmentProviders)[] => {
	return [provideEnvironmentInitializer(() => inject(UtilsService))];
};
