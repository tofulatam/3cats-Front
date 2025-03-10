import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StatItem } from '../../interfaces/statistics.interface';

@Component({
	selector: 'app-stats-card',
	imports: [MatIconModule],
	templateUrl: './stats-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardComponent {
	public statsCard = input.required<StatItem>();
}
