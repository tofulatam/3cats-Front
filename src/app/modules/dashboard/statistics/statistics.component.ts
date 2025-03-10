import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TEAMS } from '@app/shared/constants/teams.constant';
import { AchievementsListComponent } from './components/achievements-list/achievements-list.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
import { StatItem } from './interfaces/statistics.interface';

@Component({
	selector: 'app-statistics',
	imports: [StatsCardComponent, StatsChartComponent, AchievementsListComponent],
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

	// Datos para los logros
	achievements = [
		{
			title: 'Partidos ganados',
			value: 50,
			teams: ['team1', 'team2', 'team3', 'team4']
		},
		{
			title: 'Goles en un partido',
			value: 3,
			teams: ['team1', 'team2', 'team3', 'team4']
		},
		{
			title: 'Campeón de un torneo',
			value: 5,
			teams: ['team1', 'team2', 'team3', 'team4']
		},
		{
			title: 'Goleador de un torneo',
			value: 1,
			teams: ['team1', 'team2', 'team3', 'team4']
		},
		{
			title: 'Fair play de un torneo',
			value: 1,
			teams: ['team1', 'team2', 'team3', 'team4']
		},
		{
			title: 'Avance de fases',
			value: 6,
			teams: ['team1', 'team2', 'team3', 'team4']
		}
	];

	// Datos para el gráfico
	chartData = {
		title: 'Partidos ganados',
		subtitle: '(+5) más - 2024',
		data: [
			{ month: 'Ene', value: 10 },
			{ month: 'Feb', value: 15 },
			{ month: 'Mar', value: 8 },
			{ month: 'Abr', value: 12 },
			{ month: 'May', value: 20 },
			{ month: 'Jun', value: 18 },
			{ month: 'Jul', value: 22 },
			{ month: 'Ago', value: 16 },
			{ month: 'Sep', value: 19 },
			{ month: 'Oct', value: 14 },
			{ month: 'Nov', value: 25 },
			{ month: 'Dic', value: 30 }
		]
	};
}
