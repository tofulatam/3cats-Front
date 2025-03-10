import { Component, computed, input } from '@angular/core';
import { TournamentStatus } from '@app/shared/interfaces/tournament.interface';

@Component({
	selector: 'app-status-badge',
	template: `
		<div [class]="badgeClass() + ' rounded-xl px-3 py-1'">
			{{ status() }}
		</div>
	`
})
export class StatusBadgeComponent {
	// Inputs signal
	public status = input.required<TournamentStatus>();

	// Computed signal
	public badgeClass = computed(() => {
		switch (this.status()) {
			case TournamentStatus.EnInscripcion:
				return 'bg-red-100 text-red-600';
			case TournamentStatus.EnCurso:
				return 'bg-green-100 text-green-600';
			case TournamentStatus.Finalizado:
				return 'bg-purple-100 text-purple-600';
			default:
				return '';
		}
	});
}
