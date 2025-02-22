import { inject, Injectable } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { Observable, of, throwError } from 'rxjs';
import { user } from '../user/data';

@Injectable({ providedIn: 'root' })
export class AuthService {
	// Injects
	private _userService = inject(UserService);

	// Private
	private _authenticated: boolean = false;
	private readonly _secretToken: string =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDAyNTA2MTUsImlzcyI6IkFwcCIsImV4cCI6MTc3MTc4NjYxNX0.OkXMRuFTbYU5m-T4mLJ-SpEV6g0Ox_dk4ajpfQhOccE';
	private _user: any = user;

	// -----------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------

	/**
	 * Setter & getter for access token
	 */
	set accessToken(token: string) {
		localStorage.setItem('accessToken', token);
	}

	get accessToken(): string {
		return localStorage.getItem('accessToken') ?? '';
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Sign in
	 *
	 * @param credentials
	 */
	signIn(credentials: { email: string; password: string }): Observable<any> {
		// Throw error, if the user is already logged in
		if (this._authenticated) {
			return throwError(() => 'User is already logged in.');
		}

		if (credentials.email === '3cats@3cats.com' && credentials.password === 'admin') {
			const response = {
				user: this._user,
				accessToken: this._secretToken,
				tokenType: 'bearer'
			};

			// Store the access token in the local storage
			this.accessToken = response.accessToken;

			// Set the authenticated flag to true
			this._authenticated = true;

			// Store the user on the user service
			this._userService.user = response.user;

			// Return the response
			return of(response);
		}

		// Return error for invalid credentials
		return throwError(() => 'Invalid credentials');
	}

	/**
	 * Sign in using the access token
	 */
	signInUsingToken(): Observable<any> {
		// Verify the token
		if (this.accessToken) {
			const response = {
				user: this._user,
				accessToken: this._secretToken,
				tokenType: 'bearer'
			};

			// Store the access token in the local storage
			this.accessToken = response.accessToken;

			// Set the authenticated flag to true
			this._authenticated = true;

			// Store the user on the user service
			this._userService.user = response.user;

			return of(true);
		}

		return of(false);
	}

	/**
	 * Sign out
	 */
	signOut(): Observable<any> {
		// Remove the access token from the local storage
		localStorage.removeItem('accessToken');

		// Set the authenticated flag to false
		this._authenticated = false;

		// Return the observable
		return of(true);
	}

	/**
	 * Check the authentication status
	 */
	check(): Observable<boolean> {
		// Check if the user is logged in
		if (this._authenticated) {
			return of(true);
		}

		// Check the access token availability
		if (!this.accessToken) {
			return of(false);
		}

		// If the access token exists, and it didn't expire, sign in using it
		return this.signInUsingToken();
	}
}
