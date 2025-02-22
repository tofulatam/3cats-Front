import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Services
import { MediaWatcherService } from '@app/core/media-watcher/media-watcher.service';
// Components
import { NavigationComponent, NavigationService } from '@app/core/navigation';
import { UserComponent } from '@app/layout/components/user/user.component';

@Component({
	selector: 'classic-layout',
	templateUrl: './classic.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NavigationComponent, MatButtonModule, MatIconModule, UserComponent, RouterOutlet]
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
	// Public
	public isScreenSmall: boolean;

	// Private
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _mediaWatcherService: MediaWatcherService,
		private _navigationService: NavigationService
	) {}

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Subscribe to media changes
		this._mediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((matchingAliases) => {
				// Check if the screen is small
				this.isScreenSmall = !matchingAliases.includes('md');
			});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Toggle navigation
	 *
	 * @param name
	 */
	toggleNavigation(name: string): void {
		// Get the navigation
		const navigation = this._navigationService.getComponent<NavigationComponent>(name);

		if (navigation) {
			// Toggle the opened status
			navigation.toggle();
		}
	}
}
