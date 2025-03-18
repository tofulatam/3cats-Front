import { ChangeDetectionStrategy, Component } from '@angular/core';
// Componentes
import { TournamentsListComponent } from '../../components/tournaments-list/tournaments-list.component';
import { UpcomingMatchesComponent } from '../../components/upcoming-matches/upcoming-matches.component';
// Const
import { PLAYERS } from '@app/shared/constants/players.constant';
import { StatisticsFairPlayComponent } from '@statistics/components/fair-play/fair-play.component';
import { StatisticsGoalEfficiencyComponent } from '@statistics/components/goal-efficiency/goal-efficiency.component';
import { StatisticsMatchResultsComponent } from '@statistics/components/match-results/match-results.component';

@Component({
	selector: 'home-player',
	imports: [
		StatisticsMatchResultsComponent,
		StatisticsGoalEfficiencyComponent,
		StatisticsFairPlayComponent,
		TournamentsListComponent,
		UpcomingMatchesComponent
	],
	templateUrl: './home-player.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomePlayerComponent {
	public player = PLAYERS[0];
}
