import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	inject,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	Renderer2,
	SimpleChanges,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, ReplaySubject, Subject, takeUntil } from 'rxjs';
// Material
import { MatIconModule } from '@angular/material/icon';
// Services
import { NavigationService } from './services/navigation.service';
// Components
import { NavigationGroupItemComponent } from './components/group/group.component';
// Const
import { NAVIGATION_ITEMS } from './const/navigation-items.cont';
// Interfaces
import {
	NavigationItem,
	NavigationMode,
	NavigationPosition
} from './interfaces/navigation.interface';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NavigationGroupItemComponent, MatIconModule]
})
export class NavigationComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
	// Injections
	private _animationBuilder = inject(AnimationBuilder);
	private _changeDetectorRef = inject(ChangeDetectorRef);
	private _elementRef = inject(ElementRef);
	private _renderer2 = inject(Renderer2);
	private _router = inject(Router);
	private _scrollStrategyOptions = inject(ScrollStrategyOptions);
	private _navigationService = inject(NavigationService);

	// Inputs
	@Input() mode: NavigationMode = 'side';
	@Input({ required: true }) name: string;
	@Input() opened: boolean = true;
	@Input() position: NavigationPosition = 'left';

	// Outputs
	@Output() readonly modeChanged: EventEmitter<NavigationMode> = new EventEmitter<NavigationMode>();
	@Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

	// ViewChild
	@ViewChild('navigationContent') private _navigationContentEl: ElementRef;

	// Public
	public navigation: NavigationItem[] = NAVIGATION_ITEMS;
	public onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	// Private
	private _animationsEnabled: boolean = false;
	private readonly _handleOverlayClick: any;
	private _hovered: boolean = false;
	private _overlay: HTMLElement;
	private _player: AnimationPlayer;
	private _scrollStrategy: ScrollStrategy = this._scrollStrategyOptions.block();
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor() {
		this._handleOverlayClick = (): void => {
			this.close();
		};
	}

	// -----------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------

	/**
	 * Host binding for component classes
	 */
	@HostBinding('class') get classList(): any {
		return {
			'app-navigation-animations-enabled': this._animationsEnabled,
			'app-navigation-hover': this._hovered,
			'app-navigation-mode-over': this.mode === 'over',
			'app-navigation-mode-side': this.mode === 'side',
			'app-navigation-opened': this.opened,
			'app-navigation-position-left': this.position === 'left'
		};
	}

	/**
	 * Host binding for component inline styles
	 */
	@HostBinding('style') get styleList(): any {
		return {
			visibility: this.opened ? 'visible' : 'hidden'
		};
	}

	// -----------------------------------------------------------------------------------------------
	// @ Decorated methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * On mouseenter
	 *
	 * @private
	 */
	@HostListener('mouseenter')
	private _onMouseenter(): void {
		// Enable the animations
		this._enableAnimations();

		// Set the hovered
		this._hovered = true;
	}

	/**
	 * On mouseleave
	 *
	 * @private
	 */
	@HostListener('mouseleave')
	private _onMouseleave(): void {
		// Enable the animations
		this._enableAnimations();

		// Set the hovered
		this._hovered = false;
	}

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On changes
	 *
	 * @param changes
	 */
	ngOnChanges(changes: SimpleChanges): void {
		// Mode
		if ('mode' in changes) {
			// Get the previous and current values
			const currentMode = changes.mode.currentValue;
			const previousMode = changes.mode.previousValue;

			// Disable the animations
			this._disableAnimations();

			// If the mode changes: 'over -> side'
			if (previousMode === 'over' && currentMode === 'side') {
				// Hide the overlay
				this._hideOverlay();
			}

			// If the mode changes: 'side -> over'
			if (previousMode === 'side' && currentMode === 'over') {
				// If the navigation is opened
				if (this.opened) {
					// Show the overlay
					this._showOverlay();
				}
			}

			// Execute the observable
			this.modeChanged.next(currentMode);

			// Enable the animations after a delay
			// The delay must be bigger than the current transition-duration
			// to make sure nothing will be animated while the mode changing
			setTimeout(() => {
				this._enableAnimations();
			}, 500);
		}

		// Navigation
		if ('navigation' in changes) {
			// Mark for check
			this._changeDetectorRef.markForCheck();
		}

		// Opened
		if ('opened' in changes) {
			// Coerce the value to a boolean
			this.opened = coerceBooleanProperty(changes.opened.currentValue);

			// Open/close the navigation
			this._toggleOpened(this.opened);
		}
	}

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Register the navigation component
		this._navigationService.registerComponent(this.name, this);

		// Subscribe to the 'NavigationEnd' event
		this._router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(() => {
				// If the mode is 'over' and the navigation is opened...
				if (this.mode === 'over' && this.opened) {
					// Close the navigation
					this.close();
				}
			});
	}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		// Scroll to the active item
		Promise.resolve().then(() => {
			// Return if the navigation content element does not exist
			if (!this._navigationContentEl) {
				return;
			}

			// Find the active item
			const activeItem = this._navigationContentEl.nativeElement.querySelector(
				'.app-navigation-item-active'
			);

			// If the active item exists, scroll with smooth behavior
			if (activeItem) {
				// First reset the scroll to the beginning
				this._navigationContentEl.nativeElement.scrollTop = 0;

				// Then scroll to the active item
				setTimeout(() => {
					activeItem.scrollIntoView({
						behavior: 'smooth',
						block: 'center'
					});
				}, 100);
			} else {
				// If there is no active item, ensure the scroll is at the beginning
				this._navigationContentEl.nativeElement.scrollTop = 0;
			}
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Forcefully close the navigation in case they are opened
		this.close();

		// Deregister the navigation component from the registry
		this._navigationService.deregisterComponent(this.name);

		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Refresh the component to apply the changes
	 */
	refresh(): void {
		// Mark for check
		this._changeDetectorRef.markForCheck();

		// Execute the observable
		this.onRefreshed.next(true);
	}

	/**
	 * Open the navigation
	 */
	open(): void {
		// Return if the navigation is already open
		if (this.opened) {
			return;
		}

		// Set the opened
		this._toggleOpened(true);
	}

	/**
	 * Close the navigation
	 */
	close(): void {
		// Return if the navigation is already closed
		if (!this.opened) {
			return;
		}

		// Set the opened
		this._toggleOpened(false);
	}

	/**
	 * Toggle the navigation
	 */
	toggle(): void {
		// Toggle
		if (this.opened) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Track by function for ngFor loops
	 *
	 * @param index
	 * @param item
	 */
	trackByFn(index: number, item: any): any {
		return item.id || index;
	}

	// -----------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Enable the animations
	 *
	 * @private
	 */
	private _enableAnimations(): void {
		// Return if the animations are already enabled
		if (this._animationsEnabled) {
			return;
		}

		// Enable the animations
		this._animationsEnabled = true;
	}

	/**
	 * Disable the animations
	 *
	 * @private
	 */
	private _disableAnimations(): void {
		// Return if the animations are already disabled
		if (!this._animationsEnabled) {
			return;
		}

		// Disable the animations
		this._animationsEnabled = false;
	}

	/**
	 * Show the overlay
	 *
	 * @private
	 */
	private _showOverlay(): void {
		// Create the overlay element
		this._overlay = this._renderer2.createElement('div');

		// Add a class to the overlay element
		this._overlay.classList.add('app-navigation-overlay');

		// Append the overlay to the parent of the navigation
		this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);

		// Enable block scroll strategy
		this._scrollStrategy.enable();

		// Create the enter animation and attach it to the player
		this._player = this._animationBuilder
			.build([animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1 }))])
			.create(this._overlay);

		// Play the animation
		this._player.play();

		// Add an event listener to the overlay
		this._overlay.addEventListener('click', this._handleOverlayClick);
	}

	/**
	 * Hide the overlay
	 *
	 * @private
	 */
	private _hideOverlay(): void {
		if (!this._overlay) {
			return;
		}

		// Create the leave animation and attach it to the player
		this._player = this._animationBuilder
			.build([animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 0 }))])
			.create(this._overlay);

		// Play the animation
		this._player.play();

		// Once the animation is done...
		this._player.onDone(() => {
			// If the overlay still exists...
			if (this._overlay) {
				// Remove the event listener
				this._overlay.removeEventListener('click', this._handleOverlayClick);

				// Remove the overlay
				this._overlay.parentNode.removeChild(this._overlay);
				this._overlay = null;
			}

			// Disable block scroll strategy
			this._scrollStrategy.disable();
		});
	}

	/**
	 * Open/close the navigation
	 *
	 * @param open
	 * @private
	 */
	private _toggleOpened(open: boolean): void {
		// Set the opened
		this.opened = open;

		// Enable the animations
		this._enableAnimations();

		// If the navigation opened, and the mode
		// is 'over', show the overlay
		if (this.mode === 'over') {
			if (this.opened) {
				this._showOverlay();
			} else {
				this._hideOverlay();
			}
		}

		// Execute the observable
		this.openedChanged.next(open);
	}
}
