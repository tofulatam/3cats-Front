import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export type Screens = Record<string, string>;

@Injectable({
	providedIn: 'root'
})
export class MediaWatcherService {
	// Private
	private _onMediaChange: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
	private screens: Screens = {
		'2xs': '375px',
		xs: '480px',
		sm: '600px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px'
	};

	/**
	 * Constructor
	 */
	constructor(private _breakpointObserver: BreakpointObserver) {
		// Initialize the media watcher
		this._breakpointObserver
			.observe(Object.values(this.createScreens(this.screens)))
			.subscribe((state) => {
				// Handle the breakpoint change
				this.handleBreakpointChange(state);
			});
	}

	// -----------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------

	/**
	 * Getter for _onMediaChange
	 */
	get onMediaChange$(): Observable<string[]> {
		return this._onMediaChange.asObservable();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Creates a screens object with the media query as value
	 * @param screens
	 * @returns Screens object
	 * @private
	 *
	 */
	private createScreens(screens: Screens): Screens {
		// Initialize the result object
		const result: Screens = {};

		// Create the screens object
		Object.entries(screens).forEach(([alias, screen]: [string, string]) => {
			result[alias] = `(min-width: ${screen})`;
		});

		return result;
	}

	/**
	 * Handles the breakpoint change
	 * @param state
	 * @private
	 *
	 */
	private handleBreakpointChange(state: BreakpointState): void {
		const screens = this.createScreens(this.screens);
		const matchingAliases: string[] = [];

		// Get the matching aliases for the current breakpoint
		Object.entries(state.breakpoints)
			.filter(([, matches]) => matches)
			.forEach(([query]) => {
				// Get the matching alias for the current breakpoint
				const matchingAlias = Object.entries(screens).find(([, q]) => q === query)?.[0];

				// If the matching alias is found, add it to the matching aliases array
				if (matchingAlias) {
					matchingAliases.push(matchingAlias);
				}
			});

		// Emit the matching aliases
		this._onMediaChange.next(matchingAliases);
	}
}
