import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '@app/shared/interfaces/player.interface';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
	selector: 'statistics-player-attack-stats',
	imports: [MatIconModule, NgApexchartsModule, DecimalPipe],
	templateUrl: './player-attack-stats.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true
})
export class PlayerAttackStatsComponent {
	// Inputs
	public player = input.required<Player>();

	// Public properties
	public stats = {
		totalGoals: 0,
		assists: 0,
		penaltiesScored: 0,
		penaltiesMissed: 0,
		penaltiesSaved: 0,
		penaltiesFaced: 0,
		cleanSheets: 0,
		goalsReceived: 0,
		goalsPerMatch: 0,
		playerOfTheMatch: 0,
		efficiency: 0,
		matchesPlayed: 0,
		matchesWon: 0,
		matchesDrawn: 0,
		matchesLost: 0
	};

	public matchResultsChartOptions: ApexOptions;
	public performanceChartOptions: ApexOptions;

	public yellowCardCount = computed(() =>
		this.player().rp_cardssScored.reduce(
			(acc, card) => acc + (card.cardType === 'Yellow' ? 1 : 0),
			0
		)
	);

	public redCardCount = computed(() =>
		this.player().rp_cardssScored.reduce((acc, card) => acc + (card.cardType === 'Red' ? 1 : 0), 0)
	);

	public isGoalkeeper = computed(() => this.player().rp_positionPreference === 'GOALKEEPER');

	// -----------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------

	ngOnInit(): void {
		this.initStats();
		this.initChartOptions();
	}

	// -----------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Initialize statistics
	 */
	private initStats(): void {
		const player = this.player();

		// Estadísticas generales
		this.stats.playerOfTheMatch = player.rp_playerOfTheMatchCount || 0;
		this.stats.efficiency = player.rp_efficiency || 0;
		this.stats.matchesPlayed = player.rp_matchPlayedCount || 0;
		this.stats.matchesWon = player.rp_matchWonCount || 0;
		this.stats.matchesDrawn = player.rp_matchDrawCount || 0;
		this.stats.matchesLost = player.rp_matchLostCount || 0;

		if (this.isGoalkeeper()) {
			// Estadísticas de portero
			this.stats.cleanSheets = player.rp_cleanSheets || 0;
			this.stats.penaltiesSaved = player.penaltiesSavedCount || 0;
			this.stats.penaltiesFaced = player.penaltiesFacedCount || 0;

			// Calcular goles recibidos
			this.stats.goalsReceived = player.rp_matchPlayed.reduce(
				(acc, match) => acc + match.rivalTeamGoals,
				0
			);

			console.log(this.stats.goalsReceived);

			// Calcular promedio de goles por partido
			this.stats.goalsPerMatch =
				this.stats.matchesPlayed > 0 ? this.stats.goalsReceived / this.stats.matchesPlayed : 0;

			console.log(this.stats.goalsPerMatch);
		} else {
			// Estadísticas ofensivas
			this.stats.totalGoals = player.rp_goalsCount || 0;
			this.stats.assists = player.rp_assistsCount || 0;
			this.stats.penaltiesScored = player.penaltiesScoredCount || 0;
			this.stats.penaltiesMissed =
				(player.penaltiesTakenCount || 0) - (player.penaltiesScoredCount || 0);
		}
	}

	/**
	 * Initialize chart options
	 */
	private initChartOptions(): void {
		// Gráfica de resultados de partidos
		this.matchResultsChartOptions = {
			series: [this.stats.matchesWon, this.stats.matchesDrawn, this.stats.matchesLost],
			chart: {
				type: 'donut',
				height: 320
			},
			labels: ['Victorias', 'Empates', 'Derrotas'],
			colors: ['#2196f3', '#F3F781', '#ef4444'],
			legend: {
				position: 'bottom',
				fontSize: '14px',
				itemMargin: {
					horizontal: 8,
					vertical: 8
				}
			},
			plotOptions: {
				pie: {
					donut: {
						size: '75%',
						labels: {
							show: true,
							total: {
								show: true,
								label: 'Total Partidos',
								formatter: () => this.stats.matchesPlayed.toString()
							}
						}
					}
				}
			},
			dataLabels: {
				enabled: true,
				formatter: (val: number) => Math.round(val) + '%'
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							height: 250
						},
						legend: {
							position: 'bottom'
						}
					}
				}
			]
		};

		// Gráfica de rendimiento (ofensivo o defensivo)
		if (this.isGoalkeeper()) {
			const cleanSheetsPercentage = (this.stats.cleanSheets / this.stats.matchesPlayed) * 100;
			this.performanceChartOptions = {
				series: [cleanSheetsPercentage, 100 - cleanSheetsPercentage],
				chart: {
					type: 'donut',
					height: 320
				},
				labels: ['Partidos sin goles', 'Partidos con goles'],
				colors: ['#4ecdc4', '#ef4444'],
				legend: {
					position: 'bottom',
					fontSize: '14px',
					itemMargin: {
						horizontal: 8,
						vertical: 8
					}
				},
				plotOptions: {
					pie: {
						donut: {
							size: '75%',
							labels: {
								show: true,
								total: {
									show: true,
									label: 'Partidos sin goles',
									formatter: () => `${this.stats.cleanSheets}/${this.stats.matchesPlayed}`
								}
							}
						}
					}
				},
				dataLabels: {
					enabled: true,
					formatter: (val: number) => Math.round(val) + '%'
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								height: 250
							},
							legend: {
								position: 'bottom'
							}
						}
					}
				]
			};
		} else {
			const totalOffensive = this.stats.totalGoals + this.stats.assists;
			this.performanceChartOptions = {
				series: [this.stats.totalGoals, this.stats.assists],
				chart: {
					type: 'donut',
					height: 320
				},
				labels: ['Goles', 'Asistencias'],
				colors: ['#4ecdc4', '#2196f3'],
				legend: {
					position: 'bottom',
					fontSize: '14px',
					itemMargin: {
						horizontal: 8,
						vertical: 8
					}
				},
				plotOptions: {
					pie: {
						donut: {
							size: '75%',
							labels: {
								show: true,
								total: {
									show: true,
									label: 'Total',
									formatter: () => totalOffensive.toString()
								}
							}
						}
					}
				},
				dataLabels: {
					enabled: true,
					formatter: (val: number) => Math.round(val) + '%'
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								height: 250
							},
							legend: {
								position: 'bottom'
							}
						}
					}
				]
			};
		}
	}
}
