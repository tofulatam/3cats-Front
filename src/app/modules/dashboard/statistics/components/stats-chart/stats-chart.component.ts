import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface ChartDataPoint {
	month: string;
	value: number;
}

interface ChartData {
	title: string;
	subtitle: string;
	data: ChartDataPoint[];
}

@Component({
	selector: 'app-stats-chart',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './stats-chart.component.html'
})
export class StatsChartComponent implements OnInit {
	@Input() chartData!: ChartData;

	constructor() {}

	ngOnInit(): void {}
}
