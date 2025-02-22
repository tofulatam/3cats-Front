import { Injectable } from '@angular/core';
import { User } from '@app/core/user/user.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { user } from './data';

@Injectable({ providedIn: 'root' })
export class UserService {
	private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

	// -----------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------

	/**
	 * Setter & getter for user
	 *
	 * @param value
	 */
	set user(value: User) {
		// Store the value
		this._user.next(value);
	}

	get user$(): Observable<User> {
		return this._user.asObservable();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Get the current signed-in user data
	 */
	get(): void {
		this._user.next(user);
	}
}
