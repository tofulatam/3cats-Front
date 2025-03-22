import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
// Material
import { MatDividerModule } from '@angular/material/divider';
// Components
import { ScrollButtonsComponent } from '@app/shared/components/buttons/scroll-buttons/scroll-buttons.component';
import { LandingTeamCardComponent } from '../team-card/team-card.component';
// Constants
import { TEAMS } from '@app/shared/constants/teams.constant';
// Interfaces
import { Team } from '@app/shared/interfaces/team.interface';

@Component({
	selector: 'landing-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.scss'],
	imports: [MatDividerModule, ScrollButtonsComponent, LandingTeamCardComponent]
})
export class LandingTeamsComponent implements AfterViewInit {
	@ViewChild('teamsScroll') teamsScroll?: ElementRef;

	public SCROLL_AMOUNT = 256 + 24; // cardWidth + gap
	public showLeftButton = false;
	public showRightButton = true;

	teams: Team[] = TEAMS;

	constructor(private _changeDetectorRef: ChangeDetectorRef) {}

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		setTimeout(() => {
			const scrollContainer = this.teamsScroll?.nativeElement;
			if (scrollContainer) {
				this.checkScrollButtons(scrollContainer);
				scrollContainer.addEventListener('scroll', () => {
					this.checkScrollButtons(scrollContainer);
				});
			}
		}, 100);
	}

	// -----------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Check scroll buttons visibility
	 * @param container - The container element
	 */
	private checkScrollButtons(container: HTMLElement): void {
		const scrollPosition = Math.round(container.scrollLeft);
		const maxScroll = container.scrollWidth - container.clientWidth - 1;

		this.showLeftButton = scrollPosition > 0;
		this.showRightButton = scrollPosition < maxScroll;
		this._changeDetectorRef.detectChanges();
	}

	/**
	 * Handle scroll left
	 */
	handleScrollLeft(): void {
		const container = this.teamsScroll?.nativeElement;
		if (container) {
			container.scrollBy({
				left: -this.SCROLL_AMOUNT,
				behavior: 'smooth'
			});
		}
	}

	/**
	 * Handle scroll right
	 */
	handleScrollRight(): void {
		const container = this.teamsScroll?.nativeElement;
		if (container) {
			container.scrollBy({
				left: this.SCROLL_AMOUNT,
				behavior: 'smooth'
			});
		}
	}
}
