import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

interface BreadcrumbItem {
	label: string;
	url: string;
}

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	imports: [RouterLink, MatIconModule]
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
	// Public
	public breadcrumbs: BreadcrumbItem[] = [];

	// Private
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {}

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this._router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(() => {
				this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root);
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
	// @ Private methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Create breadcrumbs
	 *
	 * @param route
	 * @param url
	 * @param breadcrumbs
	 * @returns BreadcrumbItem[]
	 */
	private createBreadcrumbs(
		route: ActivatedRoute,
		url: string = '',
		breadcrumbs: BreadcrumbItem[] = []
	): BreadcrumbItem[] {
		// Get the child routes
		const children: ActivatedRoute[] = route.children;

		// If there are no more children, return the breadcrumbs
		if (children.length === 0) {
			return breadcrumbs;
		}

		// Iterate over the children
		for (const child of children) {
			// Get the route URL
			const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');

			// If the route URL is not empty, add it to the URL
			if (routeURL !== '') {
				url += `/${routeURL}`;
			}

			// Get the label
			const label = child.snapshot.data['breadcrumb'];

			// If the label is not empty and is not 'Inicio', add it to the breadcrumbs
			if (label && label !== 'Inicio') {
				breadcrumbs.push({ label, url });
			}

			// Recursively call the function to get the breadcrumbs
			return this.createBreadcrumbs(child, url, breadcrumbs);
		}

		// Return the breadcrumbs
		return breadcrumbs;
	}
}
