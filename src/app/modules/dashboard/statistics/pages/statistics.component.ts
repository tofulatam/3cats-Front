import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TEAMS } from '@app/shared/constants/teams.constant';
import { StatisticsFairPlayComponent } from '../components/fair-play/fair-play.component';
import { StatisticsGoalEfficiencyComponent } from '../components/goal-efficiency/goal-efficiency.component';
import { StatisticsMatchResultsComponent } from '../components/match-results/match-results.component';
import { StatsCardComponent } from '../components/stats-card/stats-card.component';
import { StatItem } from '../interfaces/statistics.interface';

@Component({
	selector: 'statistics',
	imports: [
		StatsCardComponent,
		StatisticsMatchResultsComponent,
		StatisticsGoalEfficiencyComponent,
		StatisticsFairPlayComponent
	],
	templateUrl: './statistics.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent {
	public team = TEAMS[0];

	public statsCards: StatItem[] = [
		{
			icon: 'sports_soccer',
			label: 'Partidos jugados',
			value: this.team.played,
			key: 'partidosJugados'
		},
		{
			icon: 'stars',
			label: 'Partidos ganados',
			value: this.team.won,
			key: 'partidosGanados'
		},
		{
			icon: 'local_fire_department',
			label: 'Goles totales',
			value: this.team.goalsFor,
			key: 'golesTotal'
		},
		{
			icon: 'style',
			label: 'Tarjetas totales',
			value: this.team.yellows + this.team.reds,
			key: 'tarjetasTotal'
		}
	];
}
