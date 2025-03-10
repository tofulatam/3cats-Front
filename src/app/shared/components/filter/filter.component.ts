import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface TournamentFilter {
	search: string;
	city: string;
	status: string;
}

@Component({
	selector: 'app-dashboard-filter',
	templateUrl: './filter.component.html',
	imports: [MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, FormsModule]
})
export class FilterComponent {
	// Outputs
	public filterChange = output<TournamentFilter>();
	public clearFilter = output<void>();

	// Public
	public filter: TournamentFilter = {
		search: '',
		city: '',
		status: ''
	};

	cities = ['Ciudad 1', 'Ciudad 2', 'Ciudad 3']; // Mock data
	statuses = ['En Inscripción', 'En Curso', 'Finalizado'];

	onFilterChange(): void {
		this.filterChange.emit(this.filter);
	}

	onClearFilter(): void {
		this.filter = {
			search: '',
			city: '',
			status: ''
		};

		this.clearFilter.emit();
	}
}
