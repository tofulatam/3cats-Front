import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Components
import { FavoriteButtonComponent } from '@app/shared/components/buttons/favorite-button/favorite-button.component';
// Interfaces
import { Tournament } from '@shared/interfaces/tournament.interface';

@Component({
	selector: 'landing-tournament-card',
	templateUrl: './tournament-card.component.html',
	imports: [MatIconModule, FavoriteButtonComponent, TitleCasePipe]
})
export class LandingTournamentCardComponent {
	// Public input required signal
	public tournament = input.required<Tournament>();
}
