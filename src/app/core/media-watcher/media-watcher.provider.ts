import {
	EnvironmentProviders,
	inject,
	provideEnvironmentInitializer,
	Provider
} from '@angular/core';
import { MediaWatcherService } from './media-watcher.service';

export const provideMediaWatcher = (): (Provider | EnvironmentProviders)[] => {
	return [provideEnvironmentInitializer(() => inject(MediaWatcherService))];
};
