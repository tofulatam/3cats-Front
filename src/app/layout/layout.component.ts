import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
// Components
import { ClassicLayoutComponent } from './components/classic/classic.component';
import { EmptyLayoutComponent } from './components/empty/empty.component';

@Component({
	selector: 'layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [EmptyLayoutComponent, ClassicLayoutComponent]
})
export class LayoutComponent implements OnInit, OnDestroy {
	// Public
	public layout: string = 'classic';

	// Private
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router
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
				this._updateLayout();
			});

		this._updateLayout();
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
	 * Update the selected layout
	 */
	private _updateLayout(): void {
		// Get the current activated route
		let route = this._activatedRoute;
		while (route.firstChild) {
			route = route.firstChild;
		}

		// 1. Set the layout from the config
		const paths = route.pathFromRoot;
		paths.forEach((path) => {
			if (path.routeConfig?.data?.layout) {
				this.layout = path.routeConfig.data.layout;
			}
		});

		// 2. Get the query parameter from the current route and
		// set the layout and save the layout to the config
		const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');
		if (layoutFromQueryParam) {
			this.layout = layoutFromQueryParam;
		}
	}
}
