import { Component, Input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
	selector: 'app-matches-chart',
	imports: [NgApexchartsModule],
	templateUrl: './matches-chart.component.html'
})
export class MatchesChartComponent {
	@Input() title: string = 'Partidos ganados';

	areaChartOptions: ApexOptions = {
		chart: {
			type: 'area',
			height: 350,
			toolbar: {
				show: false
			},
			animations: {
				enabled: true
			},
			zoom: {
				enabled: false
			}
		},
		dataLabels: { enabled: false },
		series: [
			{
				name: 'Ganados',
				data: [31, 40, 28, 51, 42, 50, 30]
			},
			{
				name: 'Perdidos',
				data: [11, 32, 45, 32, 34, 52, 41]
			}
		],
		stroke: {
			curve: 'smooth'
		},
		colors: ['#4ecdc4', '#FF6B6B'],
		xaxis: {
			type: 'category',
			categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']
		},
		yaxis: {
			labels: {
				formatter: (val): string => val.toString()
			}
		}
	};
}
