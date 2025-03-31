import { ChangeDetectionStrategy, Component } from '@angular/core';
// Components
import { EmptyTeamsComponent } from '@app/shared/components/empty-teams/empty-teams.component';
import { FilterComponent } from '@app/shared/components/filter/filter.component';
import { MyTeamCardComponent } from '../../components/my-team-card/my-team-card.component';
import { TeamCardComponent } from '../../components/team-card/team-card.component';
// Constants
import { TEAMS } from '@app/shared/constants/teams.constant';
// Interfaces
import { RouterLink } from '@angular/router';
import { Team } from '@app/shared/interfaces/team.interface';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.component.html',
	imports: [
		EmptyTeamsComponent,
		FilterComponent,
		MyTeamCardComponent,
		RouterLink,
		TeamCardComponent
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TeamsComponent {
	// Mock data
	public myTeams: Team[] = TEAMS.slice(0, 3);
	public newTeams: Team[] = TEAMS.slice(3, 6);

	onFilterMyTeamsChange(filter: any): void {
		console.log('Filtro de equipos aplicado:', filter);
	}

	onClearMyTeamsFilter(): void {
		console.log('Filtros de equipos limpiados');
	}

	onFilterNewTeamsChange(filter: any): void {
		console.log('Filtro de equipos nuevos aplicado:', filter);
	}

	onClearNewTeamsFilter(): void {
		console.log('Filtros de equipos nuevos limpiados');
	}
}
