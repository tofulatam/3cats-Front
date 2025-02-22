import { Component } from '@angular/core';
import { TOURNAMENTS } from '@shared/constants/tournaments.constant';
import { Tournament } from '@shared/interfaces/tournament.interface';
import { LandingTournamentCardComponent } from '../tournament-card/tournament-card.component';

@Component({
	selector: 'landing-tournaments',
	templateUrl: './tournaments.component.html',
	styleUrls: ['./tournaments.component.scss'],
	imports: [LandingTournamentCardComponent]
})
export class LandingTournamentsComponent {
	tournaments: Tournament[] = TOURNAMENTS;
}
