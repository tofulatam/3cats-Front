import { Component } from '@angular/core';
// Constants
import { TOURNAMENTS } from '@shared/constants/tournaments.constant';
// Interfaces
import { Tournament } from '@shared/interfaces/tournament.interface';
// Components
import { LandingTournamentCardComponent } from '../tournament-card/tournament-card.component';

@Component({
	selector: 'landing-tournaments',
	templateUrl: './tournaments.component.html',
	styleUrls: ['./tournaments.component.scss'],
	imports: [LandingTournamentCardComponent]
})
export class LandingTournamentsComponent {
	tournaments: Tournament[] = TOURNAMENTS.slice(0, 6);
}
