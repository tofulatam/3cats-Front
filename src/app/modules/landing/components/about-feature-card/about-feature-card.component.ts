import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	signal,
	ViewChild
} from '@angular/core';
import { ScrollButtonsComponent } from '@app/shared/components/buttons/scroll-buttons/scroll-buttons.component';
import { AboutFeature } from '@landing/interfaces/about.interface';

@Component({
	selector: 'landing-about-feature-card',
	templateUrl: './about-feature-card.component.html',
	styleUrls: ['./about-feature-card.component.scss'],
	imports: [ScrollButtonsComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingAboutFeatureCardComponent implements AfterViewInit {
	@ViewChild('aboutScroll') aboutScroll?: ElementRef;
	public SCROLL_AMOUNT = 248 + 24; // cardWidth + gap
	public showLeftButton = signal<boolean>(false);
	public showRightButton = signal<boolean>(true);

	public aboutFeatures: AboutFeature[] = [
		{
			title: 'Fans',
			description: 'Sigue y apoya a tus familiares y amigos en su pasión por el fútbol aficionado.',
			isActive: true,
			comingSoon: false
		},
		{
			title: 'Caza Talentos',
			description: 'Usa estadísticas avanzadas para descubrir talentos con potencial profesional.',
			isActive: false,
			comingSoon: true
		},
		{
			title: 'Entrenadores y Cuerpos Técnicos',
			description:
				'Muestra tu experiencia como estratega y colabora con equipos que buscan mejorar.',
			isActive: false,
			comingSoon: true
		},
		{
			title: 'Servicios Profesionales',
			description:
				'Ofrece servicios de salud, diseño o marketing para potenciar a jugadores y equipos.',
			isActive: false,
			comingSoon: true
		}
	];

	constructor(private cdr: ChangeDetectorRef) {}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		setTimeout(() => {
			const scrollContainer = this.aboutScroll?.nativeElement;
			if (scrollContainer) {
				this.checkScrollButtons(scrollContainer);
				scrollContainer.addEventListener('scroll', () => {
					this.checkScrollButtons(scrollContainer);
				});
			}
		}, 100);
	}

	/**
	 * Check scroll buttons
	 * @param container - The container element
	 */
	private checkScrollButtons(container: HTMLElement): void {
		const scrollPosition = Math.round(container.scrollLeft);
		const maxScroll = container.scrollWidth - container.clientWidth - 1;

		this.showLeftButton.set(scrollPosition > 0);
		this.showRightButton.set(scrollPosition < maxScroll);
		this.cdr.detectChanges();
	}

	/**
	 * Handle scroll left
	 */
	handleScrollLeft(): void {
		const container = this.aboutScroll?.nativeElement;
		if (container) {
			container.scrollBy({
				left: -this.SCROLL_AMOUNT,
				behavior: 'smooth'
			});
		}
	}

	/**
	 * Handle scroll right
	 */
	handleScrollRight(): void {
		const container = this.aboutScroll?.nativeElement;
		if (container) {
			container.scrollBy({
				left: this.SCROLL_AMOUNT,
				behavior: 'smooth'
			});
		}
	}
}
