import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
import { Player } from '@app/shared/interfaces/player.interface';
// Third party libraries
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
	selector: 'statistics-match-results-line',
	imports: [MatIconModule, NgApexchartsModule],
	templateUrl: './match-results-line.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsMatchResultsLineComponent {
	// Inputs
	public player = input.required<Player>();

	// Public
	public lineChartOptions: ApexOptions;
	public matchStats: { label: string; value: number }[] = [];

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
	 * Get fortnight period key
	 */
	private getFortnight(date: Date): string {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const fortnight = day <= 15 ? '1' : '2';
		return `${year}-${(month + 1).toString().padStart(2, '0')}-${fortnight}`;
	}

	/**
	 * Get middle date of fortnight
	 */
	private getFortnightMiddleDate(key: string): number {
		const [year, month, fortnight] = key.split('-').map((n) => parseInt(n));
		const day = fortnight === 1 ? 8 : 23; // Día medio de cada quincena
		return new Date(year, month - 1, day).getTime();
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
		// Ordenar los partidos por fecha
		const sortedMatches = [...this.player().rp_matchPlayed].sort(
			(a, b) => new Date(a.matchDay).getTime() - new Date(b.matchDay).getTime()
		);

		// Agrupar partidos por quincena
		const matchesByFortnight = new Map();
		sortedMatches.forEach((match) => {
			const date = new Date(match.matchDay);
			const fortnightKey = this.getFortnight(date);

			if (!matchesByFortnight.has(fortnightKey)) {
				matchesByFortnight.set(fortnightKey, {
					total: 0,
					wins: 0,
					draws: 0,
					losses: 0,
					timestamp: this.getFortnightMiddleDate(fortnightKey)
				});
			}

			const stats = matchesByFortnight.get(fortnightKey);
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

		// Convertir el Map a arrays para el gráfico
		const dates = [];
		const totalMatches = [];
		const wins = [];
		const draws = [];
		const losses = [];

		// Ordenar por fecha antes de convertir a arrays
		const sortedFortnights = Array.from(matchesByFortnight.entries()).sort(([keyA], [keyB]) =>
			keyA.localeCompare(keyB)
		);

		sortedFortnights.forEach(([key, stats]) => {
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
			title: {
				text: 'Evolución quincenal de resultados',
				align: 'center',
				style: {
					fontSize: '18px',
					fontWeight: 600
				}
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
