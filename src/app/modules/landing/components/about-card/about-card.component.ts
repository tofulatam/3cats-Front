import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Interface
import { AboutCard } from '@app/modules/landing/interfaces/about.interface';

@Component({
	selector: 'landing-about-card',
	templateUrl: './about-card.component.html',
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class:
			'bg-card h-84 w-84 space-y-3 rounded-3xl px-10 py-6 shadow-[0_0_10px_rgba(0,0,0,0.05)] shadow-primary-300'
	}
})
export class LandingAboutCardComponent {
	public card = input.required<AboutCard>();
}
