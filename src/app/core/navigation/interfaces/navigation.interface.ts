export interface NavigationItem {
	id?: string;
	title?: string;
	subtitle?: string;
	type: 'basic' | 'group';
	tooltip?: string;
	link?: string;
	fontIcon?: string;
	children?: NavigationItem[];
}

export type NavigationMode = 'over' | 'side';

export type NavigationPosition = 'left' | 'right';
