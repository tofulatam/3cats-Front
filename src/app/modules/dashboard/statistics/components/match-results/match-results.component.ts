import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interface
import { Player } from '@app/shared/interfaces/player.interface';
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
	public player = input.required<Player>();

	// Public
	public areaChartOptions: ApexOptions;
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
			colors: ['#4ecdc4', '#F3F781', '#ef4444'],
			labels: ['Ganados', 'Empatados', 'Perdidos'],
			series: [
				this.player().rp_matchWonCount,
				this.player().rp_matchDrawCount,
				this.player().rp_matchLostCount
			],
			legend: {
				position: 'bottom',
				fontSize: '14px'
			},
			title: {
				text: 'Distribución de resultados de partidos',
				align: 'center',
				style: {
					fontSize: '18px',
					fontWeight: 600
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
