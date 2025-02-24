import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ScrollService implements OnDestroy {
	private observer: IntersectionObserver;
	private currentSectionSubject = new BehaviorSubject<string>('');
	currentSection$ = this.currentSectionSubject.asObservable();

	constructor() {
		this.observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.currentSectionSubject.next('#' + entry.target.id);
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: '-80px 0px 0px 0px'
			}
		);
	}

	observeSection(element: Element): void {
		this.observer.observe(element);
	}

	ngOnDestroy(): void {
		this.observer.disconnect();
	}
}
