import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PLAYERS } from '@app/shared/constants/players.constant';
import { StatisticsFairPlayComponent } from '../components/fair-play/fair-play.component';
import { StatisticsGoalEfficiencyComponent } from '../components/goal-efficiency/goal-efficiency.component';
import { StatisticsMatchResultsLineComponent } from '../components/match-results-line/match-results-line.component';
import { StatisticsMatchResultsComponent } from '../components/match-results/match-results.component';
import { PlayerAttackStatsComponent } from '../components/player-attack-stats/player-attack-stats.component';
import { PlayerComparisonComponent } from '../components/player-comparison/player-comparison.component';
import { StatsCardComponent } from '../components/stats-card/stats-card.component';
import { StatItem } from '../interfaces/statistics.interface';

@Component({
	selector: 'statistics',
	imports: [
		StatsCardComponent,
		StatisticsMatchResultsComponent,
		StatisticsMatchResultsLineComponent,
		StatisticsGoalEfficiencyComponent,
		StatisticsFairPlayComponent,
		PlayerAttackStatsComponent,
		PlayerComparisonComponent
	],
	templateUrl: './statistics.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent {
	public player = PLAYERS[2];

	public statsCards: StatItem[] = [
		{
			icon: 'sports_soccer',
			label: 'Partidos jugados',
			value: this.player.rp_matchPlayedCount,
			key: 'partidosJugados'
		},
		{
			icon: 'stars',
			label: 'Partidos ganados',
			value: this.player.rp_matchWonCount,
			key: 'partidosGanados'
		},
		{
			icon: 'local_fire_department',
			label: 'Goles totales',
			value: this.player.rp_goalsCount,
			key: 'golesTotal'
		},
		{
			icon: 'style',
			label: 'Tarjetas totales',
			value: this.player.rp_cardssScored.length,
			key: 'tarjetasTotal'
		}
	];
}
