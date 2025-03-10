import { ChangeDetectionStrategy, Component } from '@angular/core';

// Componentes
import { MatchesChartComponent } from '../components/matches-chart/matches-chart.component';
import { StatisticsCardComponent } from '../components/statistics-card/statistics-card.component';
import { TournamentsListComponent } from '../components/tournaments-list/tournaments-list.component';
import { UpcomingMatchesComponent } from '../components/upcoming-matches/upcoming-matches.component';

@Component({
	selector: 'home',
	standalone: true,
	imports: [
		StatisticsCardComponent,
		MatchesChartComponent,
		TournamentsListComponent,
		UpcomingMatchesComponent
	],
	templateUrl: './home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {}
