import { Component } from '@angular/core';
import { LandingAboutComponent } from '../components/about/about.component';
import { LandingFaqsComponent } from '../components/faqs/faqs.component';
import { LandingFooterComponent } from '../components/footer/footer.component';
import { LandingHeaderComponent } from '../components/header/header.component';
import { LandingHeroComponent } from '../components/hero/hero.component';
import { LandingOrganizeComponent } from '../components/organize/organize.component';
import { LandingTeamsComponent } from '../components/teams/teams.component';
import { LandingTournamentsComponent } from '../components/tournaments/tournaments.component';

@Component({
	selector: 'landing',
	templateUrl: './landing.component.html',
	imports: [
		LandingHeroComponent,
		LandingTournamentsComponent,
		LandingTeamsComponent,
		LandingAboutComponent,
		LandingFaqsComponent,
		LandingFooterComponent,
		LandingHeaderComponent,
		LandingOrganizeComponent
	]
})
export class LandingComponent {}
