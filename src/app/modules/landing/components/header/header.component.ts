import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interfaces
import { LandingNavigationItem } from '../../interfaces/nav-item.interface';

@Component({
	selector: 'landing-header',
	templateUrl: './header.component.html',
	imports: [MatIconModule, RouterLink]
})
export class LandingHeaderComponent implements OnDestroy {
	// Injections
	private readonly _activatedRoute = inject(ActivatedRoute);
	private readonly _viewportScroller = inject(ViewportScroller);

	// Private
	private readonly _unsubscribeAll = new Subject<void>();

	// Public
	public isMobileMenuOpen = false;
	public currentHash = '';

	public readonly landingNavigationItems: LandingNavigationItem[] = [
		{ id: 'home', href: '#home', label: 'Inicio' },
		{ id: 'torneos', href: '#torneos', label: 'Torneos' },
		{ id: 'equipos', href: '#equipos', label: 'Equipos' },
		{ id: 'sobre-nosotros', href: '#sobre-nosotros', label: 'Sobre 3cats' }
	];

	/**
	 * Constructor
	 */
	constructor() {
		// Set offset to scroll to the header
		this._viewportScroller.setOffset([0, 80]);

		// Subscribe to the fragment to scroll to the section
		this._activatedRoute.fragment.pipe(takeUntil(this._unsubscribeAll)).subscribe((fragment) => {
			if (fragment) {
				// Set the current hash to the fragment
				this.currentHash = `#${fragment}`;

				// Scroll to the section
				this.scrollToSection(fragment);
			}
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
	 * Scroll to the section
	 * @param elementId - The id of the section to scroll to
	 */
	scrollToSection(elementId: string): void {
		// Scroll to the section
		this._viewportScroller.scrollToAnchor(elementId);

		// Close the mobile menu
		this.isMobileMenuOpen = false;
	}

	/**
	 * Toggle the mobile menu
	 */
	toggleMobileMenu(): void {
		// Toggle the mobile menu
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
	}
}
