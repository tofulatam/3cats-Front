import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
import { MatchResult } from '../../interfaces/statistics.interface';
// Third party libraries
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

interface MatchData {
	date: string;
	played: number;
	won: number;
	drawn: number;
	goals: number;
	redCards: number;
	yellowCards: number;
}

const MOCK_MATCH_DATA: MatchData[] = [
	{
		date: '17-jun',
		played: 2,
		won: 1,
		drawn: 1,
		goals: 3,
		redCards: 0,
		yellowCards: 1
	},
	{
		date: '12-Ago',
		played: 3,
		won: 2,
		drawn: 0,
		goals: 4,
		redCards: 0,
		yellowCards: 2
	},
	{
		date: '6-Sep',
		played: 1,
		won: 1,
		drawn: 0,
		goals: 2,
		redCards: 0,
		yellowCards: 0
	},
	{
		date: '24-Sep',
		played: 2,
		won: 0,
		drawn: 1,
		goals: 1,
		redCards: 1,
		yellowCards: 1
	},
	{
		date: '13-Oct',
		played: 2,
		won: 2,
		drawn: 0,
		goals: 5,
		redCards: 0,
		yellowCards: 1
	},
	{
		date: '3-Nov',
		played: 1,
		won: 0,
		drawn: 0,
		goals: 0,
		redCards: 0,
		yellowCards: 2
	},
	{
		date: '23-Nov',
		played: 3,
		won: 2,
		drawn: 1,
		goals: 6,
		redCards: 0,
		yellowCards: 1
	},
	{
		date: '12-Dic',
		played: 2,
		won: 1,
		drawn: 0,
		goals: 3,
		redCards: 0,
		yellowCards: 1
	}
];

@Component({
	selector: 'statistics-goal-efficiency',
	imports: [MatIconModule, NgApexchartsModule],
	templateUrl: './goal-efficiency.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true
})
export class StatisticsGoalEfficiencyComponent {
	// Inputs
	public matchResults = input.required<MatchResult>();

	// Public
	public lineChartOptions: ApexOptions;
	public goalStats: { label: string; value: number | string }[] = [];
	public matchData: MatchData[] = MOCK_MATCH_DATA;

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
	calculateFairPlay(match: MatchData): number {
		return 100 - (3 * match.redCards + match.yellowCards) / match.played;
	}

	/**
	 * Calculate efficiency
	 * Efficiency (%) = (3 * won + drawn + (2 * goals) + 1.5 * Fair Play) / total matches
	 */
	calculateEfficiency(match: MatchData): number {
		const fairPlay = this.calculateFairPlay(match);
		return (3 * match.won + match.drawn + 2 * match.goals + 1.5 * fairPlay) / match.played;
	}

	/**
	 * Init goal stats
	 */
	initGoalStats(): void {
		const totalGoals = this.matchData.reduce((sum, match) => sum + match.goals, 0);
		const totalMatches = this.matchData.reduce((sum, match) => sum + match.played, 0);
		const avgGoalsPerMatch = totalGoals / totalMatches;
		const avgEfficiency =
			this.matchData.reduce((sum, match) => sum + this.calculateEfficiency(match), 0) /
			this.matchData.length;

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
					data: this.matchData.map((item) => item.played)
				},
				{
					name: 'Partidos ganados',
					data: this.matchData.map((item) => item.won)
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
				categories: this.matchData.map((item) => item.date),
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
					fontSize: '14px',
					fontWeight: 500
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
