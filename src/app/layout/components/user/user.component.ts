import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
// Services
import { UserService } from 'app/core/user/user.service';
// Types
import { User } from '@app/core/user/user.interface';

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'user',
	imports: [MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule]
})
export class UserComponent implements OnInit, OnDestroy {
	// Public
	public user: User;

	// Private
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		private _router: Router,
		private _userService: UserService
	) {}

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Subscribe to user changes
		this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: User) => {
			this.user = user;

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
	 * Sign out
	 */
	signOut(): void {
		this._router.navigate(['/cerrar-sesion']);
	}
}
