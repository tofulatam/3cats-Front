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
	 * Calculate fair play
	 * Fair Play = 100 - ((3 * red cards + yellow cards) / total matches)
	 */
	calculateFairPlay(match: Player): number {
		return (
			100 -
			(3 * match.rp_cardssScored.length + match.rp_cardssScored.length) / match.rp_matchPlayedCount
		);
	}

	/**
	 * Calculate efficiency
	 * Efficiency (%) = (3 * won + drawn + (2 * goals) + 1.5 * Fair Play) / total matches
	 */
	calculateEfficiency(match: Player): number {
		const fairPlay = this.calculateFairPlay(match);
		return (
			(3 * match.rp_matchWonCount +
				match.rp_matchDrawCount +
				2 * match.rp_goalsCount +
				1.5 * fairPlay) /
			match.rp_matchPlayedCount
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
					name: 'Partidos jugados',
					data: this.player().rp_matchPlayed.map((item) => 1)
				},
				{
					name: 'Goles marcados',
					data: this.player().rp_matchPlayed.map((item) => item.myGoals)
				}
			],
			stroke: {
				curve: 'smooth',
				width: 2
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
				type: 'category',
				categories: this.player().rp_matchPlayed.map((item) => item.matchDay),
				axisBorder: {
					show: true
				},
				axisTicks: {
					show: true
				},
				labels: {
					rotate: -90,
					style: {
						fontSize: '12px'
					}
				}
			},
			yaxis: {
				min: 0,
				// max: 100,
				labels: {
					formatter: (val) => val.toFixed(1)
				}
			},
			legend: {
				position: 'bottom',
				fontSize: '14px',
				fontWeight: 500
			},
			title: {
				text: 'Partidos míos y de mi equipo',
				align: 'center',
				style: {
					fontSize: '18px',
					fontWeight: 600
				}
			},
			tooltip: {
				theme: 'light',
				y: {
					formatter: (val) => val.toString()
				}
			}
		};
	}
}
