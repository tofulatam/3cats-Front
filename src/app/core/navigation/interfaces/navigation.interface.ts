import { IsActiveMatchOptions, Params, QueryParamsHandling } from '@angular/router';

export interface NavigationItem {
	id?: string;
	title?: string;
	subtitle?: string;
	type: 'basic' | 'group';
	hidden?: (item: NavigationItem) => boolean;
	active?: boolean;
	disabled?: boolean;
	tooltip?: string;
	link?: string;
	fragment?: string;
	preserveFragment?: boolean;
	queryParams?: Params | null;
	queryParamsHandling?: QueryParamsHandling | null;
	externalLink?: boolean;
	target?: '_blank' | '_self' | '_parent' | '_top' | string;
	exactMatch?: boolean;
	isActiveMatchOptions?: IsActiveMatchOptions;
	function?: (item: NavigationItem) => void;
	classes?: {
		title?: string;
		subtitle?: string;
		icon?: string;
		wrapper?: string;
	};
	icon?: string;
	fontIcon?: string;
	badge?: {
		title?: string;
		classes?: string;
	};
	children?: NavigationItem[];
}

export type NavigationMode = 'over' | 'side';

export type NavigationPosition = 'left' | 'right';
