import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EmptyTournamentsComponent } from '@app/shared/components/empty-tournaments/empty-tournaments.component';
import { FilterComponent } from '@app/shared/components/filter/filter.component';
import { PaginatorComponent } from '@app/shared/components/paginator/paginator.component';
import { TOURNAMENTS } from '@app/shared/constants/tournaments.constant';
import { Tournament } from '@app/shared/interfaces/tournament.interface';
import { DashboardTournamentCardComponent } from '../../components/tournament-card/tournament-card.component';

@Component({
	selector: 'app-new-tournaments',
	imports: [
		DashboardTournamentCardComponent,
		EmptyTournamentsComponent,
		FilterComponent,
		PaginatorComponent
	],
	templateUrl: './new-tournaments.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NewTournamentsComponent {
	// Mock data
	private allTournaments: Tournament[] = TOURNAMENTS;
	public newTournaments: Tournament[] = [];

	// Pagination
	public pageSize = 3;
	public currentPage = 0;
	public totalTournaments = this.allTournaments.length;

	constructor() {
		this.updatePageData();
	}

	onFilterNewTournamentsChange(filter: any): void {
		console.log('Filtro de torneos nuevos aplicado:', filter);
	}

	onClearNewTournamentsFilter(): void {
		console.log('Filtros de torneos nuevos limpiados');
	}

	onPageChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.updatePageData();
	}

	private updatePageData(): void {
		const startIndex = this.currentPage * this.pageSize;
		this.newTournaments = this.allTournaments.slice(startIndex, startIndex + this.pageSize);
	}
}
