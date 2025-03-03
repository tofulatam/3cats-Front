import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyTournamentsComponent } from '@app/shared/components/empty-tournaments/empty-tournaments.component';

export interface Team {
	nombre: string;
	abreviatura: string;
	imagen: string;
}

export interface Match {
	torneo: string;
	fecha: string;
	hora: string;
	equipoLocal: Team;
	equipoVisitante: Team;
}

@Component({
	selector: 'app-upcoming-matches',
	imports: [EmptyTournamentsComponent],
	templateUrl: './upcoming-matches.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingMatchesComponent {
	upcomingMatches: Match[] = [
		{
			torneo: 'Liga Española',
			fecha: '15 Mar',
			hora: '20:00',
			equipoLocal: {
				nombre: 'Real Madrid',
				abreviatura: 'RMA',
				imagen: 'images/madrid.png'
			},
			equipoVisitante: {
				nombre: 'Atlético de Madrid',
				abreviatura: 'ATM',
				imagen: 'images/atmadrid.png'
			}
		},
		{
			torneo: 'Liga Española',
			fecha: '18 Mar',
			hora: '15:30',
			equipoLocal: {
				nombre: 'Atlético de Madrid',
				abreviatura: 'ATM',
				imagen: 'images/atmadrid.png'
			},
			equipoVisitante: {
				nombre: 'Real Madrid',
				abreviatura: 'RMA',
				imagen: 'images/madrid.png'
			}
		}
	];

	onViewDetails(match: Match): void {
		console.log('Ver detalles del partido:', match);
		// Aquí puedes implementar la navegación o mostrar un modal con detalles
	}
}
