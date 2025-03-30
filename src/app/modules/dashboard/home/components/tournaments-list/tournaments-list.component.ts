import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EmptyTournamentsComponent } from '@app/shared/components/empty-tournaments/empty-tournaments.component';

interface Tournament {
	nombre: string;
	logo: string;
	fase: string;
	ciudad: string;
	proximo: string;
	tiempoRestante: string;
}

const ELEMENT_DATA: Tournament[] = [
	{
		nombre: 'Copa Pasión Local',
		logo: 'images/torneo.png',
		fase: 'Cuartos de final',
		ciudad: 'Pereira',
		proximo: 'LGA',
		tiempoRestante: 'Mar 20, 17h'
	},
	{
		nombre: 'Copa Barrio en Llamas',
		logo: 'images/torneo.png',
		fase: 'Semifinal',
		ciudad: 'Medellín',
		proximo: 'ERS',
		tiempoRestante: 'Jun 12, 10h'
	},
	{
		nombre: 'La Gloria del Parque',
		logo: 'images/torneo.png',
		fase: 'Grupos',
		ciudad: 'Bogotá',
		proximo: 'CSF',
		tiempoRestante: 'Sep 20, 12h'
	}
];

@Component({
	selector: 'app-tournaments-list',
	imports: [EmptyTournamentsComponent, MatTableModule],
	templateUrl: './tournaments-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentsListComponent {
	// Inputs
	public title = input.required<string>();

	// Public
	public displayedColumns: string[] = ['logo', 'nombre', 'fase', 'ciudad', 'proximo'];
	public dataSource = ELEMENT_DATA;
}
