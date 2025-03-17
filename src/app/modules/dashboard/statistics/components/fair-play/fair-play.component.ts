import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
import { Player } from '@app/shared/interfaces/player.interface';
// Third party libraries
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
	selector: 'statistics-fair-play',
	imports: [MatIconModule, NgApexchartsModule],
	templateUrl: './fair-play.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsFairPlayComponent {
	// Inputs
	public player = input.required<Player>();

	// Public
	public barChartOptions: ApexOptions;
	public cardStats: { label: string; value: number | string }[] = [];

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initCardStats();
		this.initChartOptions();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Calculate fair play
	 * Fair Play = 100 - ((3 * red cards + yellow cards) / total matches)
	 */
	calculateFairPlay(): number {
		return (
			100 -
			(3 * this.player().rp_cardssScored.length + this.player().rp_cardssScored.length) /
				this.player().rp_matchPlayedCount
		);
	}

	/**
	 * Init card stats
	 */
	initCardStats(): void {
		this.cardStats = [
			{ label: 'Partidos jugados', value: this.player().rp_matchPlayedCount },
			{ label: 'Fair Play', value: this.calculateFairPlay().toFixed(2) + '%' },
			{ label: 'Tarjetas amarillas', value: this.player().rp_cardssScored.length },
			{ label: 'Tarjetas rojas', value: this.player().rp_cardssScored.length }
		];
	}

	/**
	 * Init chart options
	 */
	initChartOptions(): void {
		this.barChartOptions = {
			chart: {
				height: '100%',
				type: 'bar',
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
			plotOptions: {
				bar: {
					borderRadius: 4,
					columnWidth: '50%',
					distributed: true
				}
			},
			colors: ['#F3F781', '#ef4444'],
			series: [
				{
					name: 'Tarjetas',
					data: [
						this.player().rp_cardssScored.reduce(
							(acc, card) => acc + (card.cardType === 'Yellow' ? 1 : 0),
							0
						),
						this.player().rp_cardssScored.reduce(
							(acc, card) => acc + (card.cardType === 'Red' ? 1 : 0),
							0
						)
					]
				}
			],
			grid: {
				borderColor: '#e0e0e0',
				strokeDashArray: 5,
				xaxis: {
					lines: {
						show: false
					}
				},
				yaxis: {
					lines: {
						show: true
					}
				}
			},
			xaxis: {
				type: 'category',
				categories: ['Tarjetas amarillas', 'Tarjetas rojas'],
				axisBorder: {
					show: true
				},
				axisTicks: {
					show: true
				},
				labels: {
					style: {
						fontWeight: 500,
						fontSize: '12px'
					}
				}
			},
			yaxis: {
				min: 0,
				labels: {
					style: {
						fontSize: '12px'
					},
					formatter: (val) => val.toFixed(0)
				}
			},
			legend: {
				show: false
			},
			title: {
				text: 'Tarjetas Recibidas',
				align: 'center',
				style: {
					fontSize: '18px',
					fontWeight: 600
				}
			},
			dataLabels: {
				enabled: true,
				style: {
					fontSize: '12px'
				}
			},
			tooltip: {
				enabled: true,
				theme: 'light'
			}
		};
	}
}
