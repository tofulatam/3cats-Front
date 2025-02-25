import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollButtonsComponent } from '@app/shared/components/buttons/scroll-buttons/scroll-buttons.component';
import { TEAMS } from '@app/shared/constants/teams.constant';
import { Team } from '@app/shared/interfaces/team.interface';
import { LandingTeamCardComponent } from '../team-card/team-card.component';

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

	private checkScrollButtons(container: HTMLElement): void {
		const scrollPosition = Math.round(container.scrollLeft);
		const maxScroll = container.scrollWidth - container.clientWidth - 1;

		this.showLeftButton = scrollPosition > 0;
		this.showRightButton = scrollPosition < maxScroll;
		this._changeDetectorRef.detectChanges();
	}

	handleScrollLeft(): void {
		const container = this.teamsScroll?.nativeElement;
		if (container) {
			container.scrollBy({
				left: -this.SCROLL_AMOUNT,
				behavior: 'smooth'
			});
		}
	}

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
