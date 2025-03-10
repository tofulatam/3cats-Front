import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
	selector: 'scroll-buttons',
	template: `
		<button
			class="scroll-button left"
			[class]="showLeftButton() ? 'opacity-100' : 'pointer-events-none opacity-0'"
			(click)="onScrollLeft()"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="white"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<button
			class="scroll-button right"
			[class]="showRightButton() ? 'opacity-100' : 'pointer-events-none opacity-0'"
			(click)="onScrollRight()"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="white"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	`,
	styleUrls: ['./scroll-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollButtonsComponent {
	public showLeftButton = input.required<boolean>();
	public showRightButton = input.required<boolean>();
	public scrollLeft = output<void>();
	public scrollRight = output<void>();

	onScrollLeft(): void {
		this.scrollLeft.emit();
	}

	onScrollRight(): void {
		this.scrollRight.emit();
	}
}
