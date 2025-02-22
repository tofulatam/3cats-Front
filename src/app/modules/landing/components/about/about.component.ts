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

interface Cards {
	title: string;
	description: string;
	image: string;
	button: string;
	redirect: string;
}

interface Feature {
	title: string;
	description: string;
	isActive: boolean;
	comingSoon: boolean;
}

@Component({
	selector: 'landing-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
	imports: [ScrollButtonsComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingAboutComponent implements AfterViewInit {
	@ViewChild('aboutScroll') aboutScroll?: ElementRef;
	public SCROLL_AMOUNT = 248 + 24; // cardWidth + gap
	public showLeftButton = signal<boolean>(false);
	public showRightButton = signal<boolean>(true);

	public cards: Cards[] = [
		{
			title: 'Jugador',
			description:
				'Conéctate con equipos, participa en torneos y demuestra tu talento donde importa.',
			image: 'images/landing/jugador.svg',
			redirect: 'jugador',
			button: 'Busca torneos'
		},
		{
			title: 'Equipo',
			description: 'Registra tu equipo, lleva tus colores al próximo nivel y conquista la cancha.',
			image: 'images/landing/equipo.svg',
			redirect: 'equipo',
			button: 'Crea tu equipo'
		},
		{
			title: 'Organizador',
			description: 'Lleva tus eventos al máximo nivel, con herramientas diseñadas para destacar.',
			image: 'images/landing/torneos.svg',
			redirect: 'torneos',
			button: 'Crea tu torneo'
		}
	];

	public features: Feature[] = [
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

	private checkScrollButtons(container: HTMLElement): void {
		const scrollPosition = Math.round(container.scrollLeft);
		const maxScroll = container.scrollWidth - container.clientWidth - 1;

		this.showLeftButton.set(scrollPosition > 0);
		this.showRightButton.set(scrollPosition < maxScroll);
		this.cdr.detectChanges();
	}

	handleScrollLeft(): void {
		const container = this.aboutScroll?.nativeElement;
		if (container) {
			container.scrollBy({
				left: -this.SCROLL_AMOUNT,
				behavior: 'smooth'
			});
		}
	}

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
