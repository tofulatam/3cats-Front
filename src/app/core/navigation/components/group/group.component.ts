import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	forwardRef,
	inject
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
// Material
import { MatIconModule } from '@angular/material/icon';
// Services
import { NavigationService } from '@app/core/navigation/services/navigation.service';
// Interfaces
import { NavigationItem } from '@app/core/navigation/interfaces/navigation.interface';
// Components
import { NavigationComponent } from '../../navigation.component';
import { NavigationBasicItemComponent } from '../basic/basic.component';

@Component({
	selector: 'app-navigation-group-item',
	templateUrl: './group.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgClass,
		MatIconModule,
		NavigationBasicItemComponent,
		forwardRef(() => NavigationGroupItemComponent)
	]
})
export class NavigationGroupItemComponent implements OnInit, OnDestroy {
	// Injections
	private _changeDetectorRef = inject(ChangeDetectorRef);
	private _navigationService = inject(NavigationService);

	// Inputs
	@Input() item: NavigationItem;
	@Input() name: string;

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
		// Get the parent navigation component
		this._navigationComponent = this._navigationService.getComponent(this.name);

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

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Track by function for ngFor loops
	 *
	 * @param index
	 * @param item
	 */
	trackByFn(index: number, item: any): any {
		return item.id || index;
	}
}
