import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	inject
} from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// Material
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// Services
import { NavigationService } from '@app/core/navigation/services/navigation.service';
import { UtilsService } from '@app/core/utils/utils.service';
// Interfaces
import { NavigationItem } from '@app/core/navigation/interfaces/navigation.interface';
// Components
import { NavigationComponent } from '../../navigation.component';

@Component({
	selector: 'app-navigation-basic-item',
	templateUrl: './basic.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgClass,
		RouterLink,
		RouterLinkActive,
		MatTooltipModule,
		NgTemplateOutlet,
		MatIconModule
	]
})
export class NavigationBasicItemComponent implements OnInit, OnDestroy {
	// Injections
	private _changeDetectorRef = inject(ChangeDetectorRef);
	private _navigationService = inject(NavigationService);
	private _utilsService = inject(UtilsService);

	// Inputs
	@Input() item: NavigationItem;
	@Input() name: string;

	// Set the equivalent of {exact: false} as default for active match options.
	// We are not assigning the item.isActiveMatchOptions directly to the
	// [routerLinkActiveOptions] because if it's "undefined" initially, the router
	// will throw an error and stop working.
	isActiveMatchOptions: IsActiveMatchOptions = this._utilsService.subsetMatchOptions;

	// Private
	private _navigationComponent: NavigationComponent;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Set the "isActiveMatchOptions" either from item's
		// "isActiveMatchOptions" or the equivalent form of
		// item's "exactMatch" option
		this.isActiveMatchOptions =
			(this.item.isActiveMatchOptions ?? this.item.exactMatch)
				? this._utilsService.exactMatchOptions
				: this._utilsService.subsetMatchOptions;

		// Get the parent navigation component
		this._navigationComponent = this._navigationService.getComponent(this.name);

		// Mark for check
		this._changeDetectorRef.markForCheck();

		// Subscribe to onRefreshed on the navigation component
		this._navigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
			// Mark for check
			this._changeDetectorRef.markForCheck();
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
}
