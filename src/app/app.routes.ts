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
			{
				path: 'sign-in',
				loadComponent: () => import('app/modules/auth/sign-in/sign-in.component')
			}
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
			{
				path: 'sign-out',
				loadComponent: () => import('app/modules/auth/sign-out/sign-out.component')
			}
		]
	},

	// Redirect to home after sign in
	{
		path: 'redireccion-inicio',
		pathMatch: 'full',
		redirectTo: 'dashboard/home'
	},

	// Dashboards routes
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		children: [
			// Dashboard
			{
				path: 'dashboard',
				children: [
					// Home
					{
						path: 'home',
						pathMatch: 'full',
						loadComponent: () => import('@app/modules/dashboard/home/pages/home.component')
					},

					// Player routes
					{
						path: 'jugador',
						children: [
							{
								path: 'equipos',
								pathMatch: 'full',
								loadComponent: () => import('@app/modules/dashboard/teams/pages/teams.component')
							},
							{
								path: 'estadisticas',
								pathMatch: 'full',
								loadComponent: () =>
									import('@app/modules/dashboard/statistics/pages/statistics.component').then(
										(m) => m.StatisticsComponent
									)
							},
							{
								path: 'torneos',
								pathMatch: 'full',
								loadComponent: () =>
									import('@app/modules/dashboard/tournaments/pages/tournaments.component')
							}
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
						path: '404',
						pathMatch: 'full',
						loadChildren: () => import('app/shared/pages/error/error-404/error-404.routes')
					},
					{ path: '**', redirectTo: '404' }
				]
			}
		]
	},

	// 404
	{
		path: '404-not-found',
		pathMatch: 'full',
		loadChildren: () => import('app/shared/pages/error/error-404/error-404.routes')
	},
	{ path: '**', redirectTo: '404-not-found' }
];
