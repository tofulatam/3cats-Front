import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

export interface Statistics {
	partidosJugados: number;
	partidosGanados: number;
	golesTotal: number;
	tarjetasTotal: number;
}

@Component({
	selector: 'app-statistics-card',
	standalone: true,
	imports: [CommonModule, NgApexchartsModule],
	templateUrl: './statistics-card.component.html'
})
export class StatisticsCardComponent {
	@Input() increasePercentage: number = 23;

	@Input() statistics: Statistics = {
		partidosJugados: 24,
		partidosGanados: 18,
		golesTotal: 42,
		tarjetasTotal: 8
	};

	get barChartOptions(): ApexOptions {
		// Nombres completos para el tooltip
		const fullNames = ['Partidos jugados', 'Partidos ganados', 'Goles totales', 'Tarjetas totales'];

		return {
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
				customLegendItems: fullNames,
				itemMargin: {
					horizontal: 8
				}
			},
			tooltip: {
				x: {
					formatter: (val, opts) => {
						// Devuelve el nombre completo en lugar de la abreviatura
						return fullNames[opts.dataPointIndex];
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
}
