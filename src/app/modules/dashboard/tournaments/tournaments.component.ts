import { ChangeDetectionStrategy, Component } from '@angular/core';
// Components
import { EmptyTournamentsComponent } from '@app/shared/components/empty-tournaments/empty-tournaments.component';
import { FilterComponent } from '@app/shared/components/filter/filter.component';
import { DashboardMyTournamentCardComponent } from './components/my-tournament-card/my-tournament-card.component';
import { DashboardTournamentCardComponent } from './components/tournament-card/tournament-card.component';
// Constants
import { TOURNAMENTS } from '@app/shared/constants/tournaments.constant';
// Interfaces
import { Tournament } from '@app/shared/interfaces/tournament.interface';

@Component({
	selector: 'app-tournaments',
	templateUrl: './tournaments.component.html',
	imports: [
		DashboardMyTournamentCardComponent,
		DashboardTournamentCardComponent,
		EmptyTournamentsComponent,
		FilterComponent
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TournamentsComponent {
	// Mock data
	public myTournaments: Tournament[] = TOURNAMENTS.slice(0, 3);
	public newTournaments: Tournament[] = TOURNAMENTS;

	onFilterMyTournamentsChange(filter: any): void {
		console.log('Filtro de torneos en los que estoy participando aplicado:', filter);
	}

	onClearMyTournamentsFilter(): void {
		console.log('Filtros de torneos en los que estoy participando limpiados');
	}

	onFilterNewTournamentsChange(filter: any): void {
		console.log('Filtro de torneos nuevos aplicado:', filter);
	}

	onClearNewTournamentsFilter(): void {
		console.log('Filtros de torneos nuevos limpiados');
	}
}
