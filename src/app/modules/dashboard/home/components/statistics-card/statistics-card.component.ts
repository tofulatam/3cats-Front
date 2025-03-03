import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

export interface Statistics {
	partidosJugados: number;
	partidosGanados: number;
	golesTotal: number;
	tarjetasTotal: number;
}

interface StatItem {
	icon: string;
	label: string;
	value: number;
	key: keyof Statistics;
}

@Component({
	selector: 'app-statistics-card',
	imports: [MatIconModule, NgApexchartsModule],
	templateUrl: './statistics-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsCardComponent implements OnInit {
	@Input() increasePercentage: number = 23;

	@Input() statistics: Statistics = {
		partidosJugados: 9,
		partidosGanados: 6,
		golesTotal: 12,
		tarjetasTotal: 5
	};

	statItems: StatItem[] = [];

	ngOnInit() {
		this.statItems = [
			{
				icon: 'sports_soccer',
				label: 'Partidos jugados',
				value: this.statistics.partidosJugados,
				key: 'partidosJugados'
			},
			{
				icon: 'stars',
				label: 'Partidos ganados',
				value: this.statistics.partidosGanados,
				key: 'partidosGanados'
			},
			{
				icon: 'local_fire_department',
				label: 'Goles totales',
				value: this.statistics.golesTotal,
				key: 'golesTotal'
			},
			{
				icon: 'style',
				label: 'Tarjetas totales',
				value: this.statistics.tarjetasTotal,
				key: 'tarjetasTotal'
			}
		];
	}

	barChartOptions: ApexOptions = {
		chart: {
			type: 'bar',
			height: 250,
			toolbar: { show: false },
			stacked: false
		},
		colors: ['#424242', '#4ecdc4', '#3B5998', '#FF6B6B'],
		plotOptions: {
			bar: {
				borderRadius: 4,
				columnWidth: '50%',
				distributed: true
			}
		},
		dataLabels: {
			enabled: true,
			style: {
				fontSize: '12px',
				fontWeight: 'bold',
				colors: ['#fff']
			},
			offsetY: -20
		},
		series: [
			{
				name: 'Valor',
				data: [
					this.statistics.partidosJugados,
					this.statistics.partidosGanados,
					this.statistics.golesTotal,
					this.statistics.tarjetasTotal
				]
			}
		],
		xaxis: {
			categories: ['PJ', 'PG', 'GT', 'TT'],
			labels: {
				style: {
					fontSize: '12px',
					fontWeight: 'bold'
				}
			}
		},
		yaxis: {
			labels: {
				formatter: (val): string => val.toString()
			}
		},
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'center',
			fontSize: '12px',
			itemMargin: {
				horizontal: 8
			},
			formatter: (seriesName, opts) => {
				return this.statItems[opts.seriesIndex].label;
			}
		},
		tooltip: {
			x: {
				formatter: (val, opts) => {
					return this.statItems[opts.dataPointIndex].label;
				}
			},
			y: {
				title: {
					formatter: (seriesName) => ''
				}
			}
		}
	};
}
