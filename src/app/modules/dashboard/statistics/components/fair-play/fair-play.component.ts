import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
// Third party libraries
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

interface CardData {
	reds: number;
	yellows: number;
	played: number;
	fairPlay: number;
}

@Component({
	selector: 'statistics-fair-play',
	imports: [MatIconModule, NgApexchartsModule],
	templateUrl: './fair-play.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true
})
export class StatisticsFairPlayComponent {
	// Inputs
	public cardData = input.required<CardData>();

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
		return 100 - (3 * this.cardData().reds + this.cardData().yellows) / this.cardData().played;
	}

	/**
	 * Init card stats
	 */
	initCardStats(): void {
		this.cardStats = [
			{ label: 'Partidos jugados', value: this.cardData().played },
			{ label: 'Fair Play', value: this.cardData().fairPlay + '%' },
			{ label: 'Tarjetas amarillas', value: this.cardData().yellows },
			{ label: 'Tarjetas rojas', value: this.cardData().reds }
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
			colors: ['#facc15', '#ef4444'],
			series: [
				{
					name: 'Tarjetas',
					data: [this.cardData().yellows, this.cardData().reds]
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
