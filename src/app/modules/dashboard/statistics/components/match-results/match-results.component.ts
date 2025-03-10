import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
import { MatchResult } from '../../interfaces/statistics.interface';
// Third party libraries
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
	selector: 'statistics-match-results',
	imports: [MatIconModule, NgApexchartsModule],
	templateUrl: './match-results.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsMatchResultsComponent {
	// Inputs
	public matchResults = input.required<MatchResult>();

	// Public
	public areaChartOptions: ApexOptions;
	public matchTypes: { label: string; value: number }[] = [];

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initMatchTypes();
		this.initChartOptions();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Init match types
	 */
	initMatchTypes(): void {
		this.matchTypes = [
			{ label: 'Partidos jugados', value: this.matchResults().played },
			{ label: 'Partidos ganados', value: this.matchResults().won },
			{ label: 'Partidos empatados', value: this.matchResults().drawn },
			{ label: 'Partidos perdidos', value: this.matchResults().lost }
		];
	}

	/**
	 * Init chart options
	 */
	initChartOptions(): void {
		// Set chart options
		this.areaChartOptions = {
			chart: {
				type: 'pie',
				height: '100%',
				fontFamily: 'inherit',
				foreColor: 'inherit',
				toolbar: {
					show: false
				},
				animations: {
					enabled: true,
					speed: 500
				}
			},
			colors: ['#4ecdc4', '#facc15', '#ef4444'],
			labels: ['Ganados', 'Empatados', 'Perdidos'],
			series: [this.matchResults().won, this.matchResults().drawn, this.matchResults().lost],
			legend: {
				position: 'bottom',
				fontSize: '14px'
			},
			title: {
				text: 'Distribución de resultados de partidos',
				align: 'center',
				style: {
					fontSize: '14px',
					fontWeight: 500
				}
			},
			tooltip: {
				followCursor: true,
				y: {
					formatter: function (val) {
						return val + ' partidos';
					}
				}
			}
		};
	}
}
