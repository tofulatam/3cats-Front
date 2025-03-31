import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EmptyTeamsComponent } from '@app/shared/components/empty-teams/empty-teams.component';
import { FilterComponent } from '@app/shared/components/filter/filter.component';
import { PaginatorComponent } from '@app/shared/components/paginator/paginator.component';
import { TEAMS } from '@app/shared/constants/teams.constant';
import { Team } from '@app/shared/interfaces/team.interface';
import { TeamCardComponent } from '../../components/team-card/team-card.component';

@Component({
	selector: 'teams-new-teams',
	imports: [FilterComponent, PaginatorComponent, EmptyTeamsComponent, TeamCardComponent],
	templateUrl: './new-teams.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NewTeamsComponent {
	// Mock data
	private allTeams: Team[] = TEAMS;
	public newTeams: Team[] = [];

	// Pagination
	public pageSize = 3;
	public currentPage = 0;
	public totalTeams = this.allTeams.length;

	constructor() {
		this.updatePageData();
	}

	onFilterNewTeamsChange(filter: any): void {
		console.log('Filtro de equipos nuevos aplicado:', filter);
	}

	onClearNewTeamsFilter(): void {
		console.log('Filtros de equipos nuevos limpiados');
	}

	onPageChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.updatePageData();
	}

	private updatePageData(): void {
		const startIndex = this.currentPage * this.pageSize;
		this.newTeams = this.allTeams.slice(startIndex, startIndex + this.pageSize);
	}
}
