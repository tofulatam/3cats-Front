import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
import { Player } from '@app/shared/interfaces/player.interface';
// Third party libraries
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
	selector: 'statistics-goal-efficiency',
	imports: [MatIconModule, NgApexchartsModule],
	templateUrl: './goal-efficiency.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsGoalEfficiencyComponent {
	// Inputs
	public player = input.required<Player>();

	// Public
	public lineChartOptions: ApexOptions;
	public goalStats: { label: string; value: number | string }[] = [];

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initGoalStats();
		this.initChartOptions();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Calculate efficiency
	 * Efficiency (%) = (3 * won + drawn + (2 * goals) + 1.5 * Fair Play) / total matches
	 */
	calculateEfficiency(player: Player): number {
		return (
			(3 * player.rp_matchWonCount +
				player.rp_matchDrawCount +
				2 * player.rp_goalsCount +
				1.5 * player.rp_fairPlay) /
			player.rp_matchPlayedCount
		);
	}

	/**
	 * Init goal stats
	 */
	initGoalStats(): void {
		const totalGoals = this.player().rp_goalsScored.reduce((sum, match) => sum + match.goals, 0);
		const totalMatches = this.player().rp_matchPlayedCount;
		const avgGoalsPerMatch = totalGoals / totalMatches;
		const avgEfficiency = this.player().rp_efficiency;

		this.goalStats = [
			{ label: 'Partidos jugados', value: totalMatches },
			{ label: 'Eficiencia', value: avgEfficiency.toFixed(2) + '%' },
			{ label: 'Goles marcados', value: totalGoals },
			{ label: 'Gol por partido', value: avgGoalsPerMatch.toFixed(2) }
		];
	}

	/**
	 * Init chart options
	 */
	initChartOptions(): void {
		// Order matches by date
		const sortedMatches = [...this.player().rp_matchPlayed].sort(
			(a, b) => new Date(a.matchDay).getTime() - new Date(b.matchDay).getTime()
		);

		// Days before and after
		const daysBefore = 7;
		const daysAfter = 7;

		this.lineChartOptions = {
			chart: {
				height: '100%',
				type: 'line',
				fontFamily: 'inherit',
				foreColor: 'inherit',
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				},
				animations: {
					enabled: true,
					speed: 500
				}
			},
			colors: ['#4ecdc4', '#ef4444'],
			series: [
				{
					name: 'Goles del equipo',
					data: sortedMatches.map((match) => match.myTeamGoals)
				},
				{
					name: 'Mis goles',
					data: sortedMatches.map((match) => match.myGoals)
				}
			],
			stroke: {
				curve: 'smooth',
				width: [3, 3],
				dashArray: [0, 0]
			},
			grid: {
				borderColor: '#e0e0e0',
				strokeDashArray: 5,
				xaxis: {
					lines: {
						show: true
					}
				},
				yaxis: {
					lines: {
						show: true
					}
				}
			},
			markers: {
				size: 4,
				strokeWidth: 0,
				hover: {
					size: 6
				}
			},
			xaxis: {
				type: 'datetime',
				categories: sortedMatches.map((match) => new Date(match.matchDay).getTime()),
				axisBorder: {
					show: true
				},
				axisTicks: {
					show: true
				},
				labels: {
					rotate: -45,
					style: {
						fontSize: '12px'
					},
					datetimeFormatter: {
						year: 'yyyy',
						month: 'MMM',
						day: 'dd'
					}
				},
				min: new Date(sortedMatches[0].matchDay).getTime() - daysBefore * 24 * 60 * 60 * 1000,
				max:
					new Date(sortedMatches[sortedMatches.length - 1].matchDay).getTime() +
					daysAfter * 24 * 60 * 60 * 1000,
				tickAmount: 10
			},
			yaxis: {
				title: {
					text: 'Goles'
				},
				min: 0,
				max: Math.max(...sortedMatches.map((m) => Math.max(m.myTeamGoals, m.myGoals))) + 1,
				labels: {
					formatter: (val) => Math.round(val).toString()
				}
			},
			legend: {
				position: 'bottom',
				fontSize: '14px',
				fontWeight: 500
			},
			tooltip: {
				x: {
					format: 'dd MMM yyyy'
				},
				y: {
					formatter: (val) => val.toString() + ' goles'
				}
			}
		};
	}
}
