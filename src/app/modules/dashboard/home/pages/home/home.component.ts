import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

interface Torneo {
	nombre: string;
	fase: string;
	ciudad: string;
	proximo: string;
	tiempoRestante: string;
}

interface Equipo {
	nombre: string;
	abreviatura: string;
	imagen: string;
}

interface ProximoPartido {
	torneo: string;
	fecha: string;
	hora: string;
	equipoLocal: Equipo;
	equipoVisitante: Equipo;
}

@Component({
	selector: 'home',
	standalone: true,
	imports: [CommonModule, NgApexchartsModule],
	templateUrl: './home.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent implements OnInit {
	// Estadísticas
	statistics = {
		partidosJugados: 9,
		partidosGanados: 6,
		golesTotal: 12,
		tarjetasTotal: 5
	};

	// Configuración del gráfico de barras
	barChartOptions: ApexOptions = {
		chart: {
			type: 'bar',
			height: 250,
			toolbar: { show: false },
			stacked: false
		},
		colors: ['#4B5563', '#00E396', '#3b82f6', '#FEB019'],
		plotOptions: {
			bar: {
				borderRadius: 2,
				columnWidth: '50%'
			}
		},
		dataLabels: { enabled: false },
		series: [
			{
				name: 'Partidos jugados',
				data: [9, 7, 8, 6, 9, 8, 7, 9, 8]
			},
			{
				name: 'Partidos ganados',
				data: [6, 4, 5, 3, 6, 5, 4, 6, 5]
			},
			{
				name: 'Goles totales',
				data: [12, 10, 8, 11, 9, 13, 10, 12, 9]
			},
			{
				name: 'Tarjetas totales',
				data: [5, 3, 4, 2, 5, 3, 4, 3, 2]
			}
		],
		xaxis: {
			categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
			labels: {
				style: {
					colors: '#9CA3AF'
				}
			}
		},
		yaxis: {
			labels: {
				style: {
					colors: '#9CA3AF'
				}
			}
		},
		legend: {
			position: 'bottom'
		}
	};

	// Configuración del gráfico de área
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
				name: 'series1',
				data: [31, 40, 28, 51, 42, 50, 30]
			},
			{
				name: 'series2',
				data: [90, 32, 45, 32, 34, 52, 41]
			}
		],
		stroke: {
			curve: 'smooth'
		},
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

	// Datos de torneos
	torneos: Torneo[] = [
		{
			nombre: 'Copa Pasión Local',
			fase: 'Eliminatorias',
			ciudad: 'Bogotá',
			proximo: 'GUE',
			tiempoRestante: 'Mar 20, 17h'
		},
		{
			nombre: 'Copa Barrio en Llamas',
			fase: 'Grupos',
			ciudad: 'Pereira',
			proximo: 'LGA',
			tiempoRestante: 'Mar 27, 17h'
		},
		{
			nombre: 'Desafío de los Vecinos',
			fase: 'Grupos',
			ciudad: 'Ibagué',
			proximo: 'ERS',
			tiempoRestante: 'Jun 12, 10h'
		},
		{
			nombre: 'La Gloria del Parque',
			fase: 'Semifinal',
			ciudad: 'Pereira',
			proximo: 'CSF',
			tiempoRestante: 'Sep 20, 12h'
		}
	];

	proximosPartidos: ProximoPartido[] = [
		{
			torneo: 'Copa Pasión Local',
			fecha: 'Martes 20',
			hora: '17 horas',
			equipoLocal: {
				nombre: 'Real Madrid',
				abreviatura: 'RMA',
				imagen: 'images/madrid.png'
			},
			equipoVisitante: {
				nombre: 'Atlético de Madrid',
				abreviatura: 'ATM',
				imagen: 'images/atmadrid.png'
			}
		},
		{
			torneo: 'Copa Pasión Local',
			fecha: 'Martes 20',
			hora: '17 horas',
			equipoLocal: {
				nombre: 'Real Madrid',
				abreviatura: 'RMA',
				imagen: 'images/madrid.png'
			},
			equipoVisitante: {
				nombre: 'Atlético de Madrid',
				abreviatura: 'ATM',
				imagen: 'images/atmadrid.png'
			}
		},
		{
			torneo: 'Copa Pasión Local',
			fecha: 'Martes 20',
			hora: '17 horas',
			equipoLocal: {
				nombre: 'Real Madrid',
				abreviatura: 'RMA',
				imagen: 'images/madrid.png'
			},
			equipoVisitante: {
				nombre: 'Atlético de Madrid',
				abreviatura: 'ATM',
				imagen: 'images/atmadrid.png'
			}
		}
	];

	ngOnInit(): void {
		// Initialize any additional logic if needed
	}
}
