import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

interface Achievement {
	title: string;
	value: number;
	teams: string[];
}

@Component({
	selector: 'app-achievements-list',
	imports: [CommonModule, MatDividerModule],
	templateUrl: './achievements-list.component.html'
})
export class AchievementsListComponent {
	@Input() achievements: Achievement[] = [];
}
