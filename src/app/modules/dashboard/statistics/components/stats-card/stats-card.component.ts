import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Interfaces
import { StatItem } from '@statistics/interfaces/statistics.interface';

@Component({
	selector: 'statistics-stats-card',
	imports: [MatIconModule],
	templateUrl: './stats-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardComponent {
	// Inputs
	public statsCard = input.required<StatItem>();
}
