import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
import { Player } from '@app/shared/interfaces/player.interface';
// Third party libraries
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

type TimeGroup = 'week' | 'fortnight' | 'month';

@Component({
	selector: 'statistics-match-results-line',
	imports: [MatIconModule, NgApexchartsModule, FormsModule],
	templateUrl: './match-results-line.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsMatchResultsLineComponent {
	// Inputs
	public player = input.required<Player>();

	// Public
	public lineChartOptions: ApexOptions;
	public matchStats: { label: string; value: number }[] = [];
	public selectedTimeGroup: TimeGroup = 'fortnight';

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initMatchStats();
		this.initChartOptions();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Get title prefix based on selected time group
	 */
	public getTitlePrefix(): string {
		return this.selectedTimeGroup === 'week'
			? 'semanal'
			: this.selectedTimeGroup === 'fortnight'
				? 'quincenal'
				: 'mensual';
	}

	/**
	 * Handle time group change
	 */
	onTimeGroupChange(value: TimeGroup): void {
		this.selectedTimeGroup = value;
		this.initChartOptions();
	}

	/**
	 * Get period key based on selected time group
	 */
	private getPeriodKey(date: Date): string {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');

		switch (this.selectedTimeGroup) {
			case 'week': {
				// Get week number
				const weekNumber = Math.ceil(
					(date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7
				);
				return `${year}-${month}-W${weekNumber}`;
			}
			case 'fortnight': {
				const fortnight = date.getDate() <= 15 ? '1' : '2';
				return `${year}-${month}-${fortnight}`;
			}
			case 'month': {
				return `${year}-${month}`;
			}
		}
	}

	/**
	 * Get middle date of period
	 */
	private getPeriodMiddleDate(key: string): number {
		const [year, month, period] = key.split('-');
		const yearNum = parseInt(year);
		const monthNum = parseInt(month);

		switch (this.selectedTimeGroup) {
			case 'week': {
				const weekNum = parseInt(period.replace('W', ''));
				const dayOffset = (weekNum - 1) * 7 + 3; // Middle of the week
				return new Date(yearNum, monthNum - 1, dayOffset).getTime();
			}
			case 'fortnight': {
				const day = parseInt(period) === 1 ? 8 : 23;
				return new Date(yearNum, monthNum - 1, day).getTime();
			}
			case 'month': {
				return new Date(yearNum, monthNum - 1, 15).getTime();
			}
		}
	}

	/**
	 * Init match types
	 */
	initMatchStats(): void {
		this.matchStats = [
			{ label: 'Partidos jugados', value: this.player().rp_matchPlayedCount },
			{ label: 'Partidos ganados', value: this.player().rp_matchWonCount },
			{ label: 'Partidos empatados', value: this.player().rp_matchDrawCount },
			{ label: 'Partidos perdidos', value: this.player().rp_matchLostCount }
		];
	}

	/**
	 * Init chart options
	 */
	initChartOptions(): void {
		// Sort matches by date
		const sortedMatches = [...this.player().rp_matchPlayed].sort(
			(a, b) => new Date(a.matchDay).getTime() - new Date(b.matchDay).getTime()
		);

		// Group matches by selected period
		const matchesByPeriod = new Map();
		sortedMatches.forEach((match) => {
			const date = new Date(match.matchDay);
			const periodKey = this.getPeriodKey(date);

			if (!matchesByPeriod.has(periodKey)) {
				matchesByPeriod.set(periodKey, {
					total: 0,
					wins: 0,
					draws: 0,
					losses: 0,
					timestamp: this.getPeriodMiddleDate(periodKey)
				});
			}

			const stats = matchesByPeriod.get(periodKey);
			stats.total++;
			switch (match.result) {
				case 'WIN':
					stats.wins++;
					break;
				case 'DRAW':
					stats.draws++;
					break;
				case 'LOSS':
					stats.losses++;
					break;
			}
		});

		// Convert Map to arrays for the chart
		const dates = [];
		const totalMatches = [];
		const wins = [];
		const draws = [];
		const losses = [];

		// Sort by date before converting to arrays
		const sortedPeriods = Array.from(matchesByPeriod.entries()).sort(([keyA], [keyB]) =>
			keyA.localeCompare(keyB)
		);

		sortedPeriods.forEach(([key, stats]) => {
			dates.push(stats.timestamp);
			totalMatches.push(stats.total);
			wins.push(stats.wins);
			draws.push(stats.draws);
			losses.push(stats.losses);
		});

		// Set chart options
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
			colors: ['#4ecdc4', '#2196f3', '#F3F781', '#ef4444'],
			series: [
				{
					name: 'Partidos jugados',
					data: totalMatches
				},
				{
					name: 'Partidos ganados',
					data: wins
				},
				{
					name: 'Partidos empatados',
					data: draws
				},
				{
					name: 'Partidos perdidos',
					data: losses
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
				size: 5,
				strokeWidth: 0,
				hover: {
					size: 7
				}
			},
			xaxis: {
				type: 'datetime',
				categories: dates,
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
				tickAmount: 6
			},
			yaxis: {
				title: {
					text: 'Número de partidos'
				},
				min: 0,
				max: Math.max(...totalMatches) + 1,
				tickAmount: 5,
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
				shared: true,
				intersect: false,
				x: {
					format: 'dd MMM yyyy'
				},
				y: {
					formatter: (val) => val + (val === 1 ? ' partido' : ' partidos')
				}
			}
		};
	}
}
