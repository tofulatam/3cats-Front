import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [
	// Landing page
	{
		path: '',
		pathMatch: 'full',
		component: LayoutComponent,
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		data: {
			layout: 'empty'
		},
		children: [{ path: '', loadChildren: () => import('app/modules/landing/landing.routes') }]
	},

	// Auth routes for guests
	{
		path: '',
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{ path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') }
		]
	},

	// Auth routes for authenticated users
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{ path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') }
		]
	},

	// Redirect to home after sign in
	{
		path: 'signed-in-redirect',
		pathMatch: 'full',
		redirectTo: 'home'
	},

	// Dashboards routes
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		children: [
			// Home
			{
				path: 'home',
				loadComponent: () => import('@app/modules/dashboard/home/pages/home/home.component')
			},

			// Player routes
			{
				path: 'jugador',
				children: [
					// {
					// 	path: 'partidos',
					// 	loadChildren: () => import('@app/modules/dashboard/project/project.routes')
					// },
					// {
					// 	path: 'estadisticas',
					// 	loadChildren: () => import('@app/modules/dashboard/analytics/analytics.routes')
					// },
					// {
					// 	path: 'torneos',
					// 	loadComponent: () => import('@app/modules/dashboard/tournaments/tournaments.component')
					// }
				]
			},

			// Organizer routes
			{
				path: 'organizador',
				children: [
					// {
					// 	path: 'tournaments',
					// 	loadChildren: () => import('@app/modules/dashboard/home/pages/home/home.component')
					// }
				]
			},

			// 404
			{
				path: '404-not-found',
				pathMatch: 'full',
				loadChildren: () => import('app/shared/pages/error/error-404/error-404.routes')
			},
			{ path: '**', redirectTo: '404-not-found' }
		]
	}
];
