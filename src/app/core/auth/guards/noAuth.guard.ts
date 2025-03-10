import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
	const router: Router = inject(Router);

	// Check the authentication status
	return inject(AuthService)
		.check()
		.pipe(
			switchMap((authenticated) => {
				// If the user is authenticated...
				if (authenticated) {
					return of(router.parseUrl('/dashboard/home'));
				}

				// Allow the access
				return of(true);
			})
		);
};
