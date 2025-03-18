import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: 'img[appHandleImageError]',
	standalone: true
})
export class HandleImageErrorDirective {
	/**
	 * Path to the fallback image that will be displayed when the original image fails to load
	 * @default 'images/placeholder/broken-image.png'
	 */
	@Input() fallbackImage: string = 'images/placeholder/broken-image.png';

	constructor(private el: ElementRef) {}

	/**
	 * Handles the error event when an image fails to load
	 * Sets the src attribute to the fallback image
	 */
	@HostListener('error')
	private onError(): void {
		this.el.nativeElement.src = this.fallbackImage;
	}
}
