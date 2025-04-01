export interface Organizer {
	uid: string;
	userName: string;
	nickname: string;
	email: string;
	profilePhotoUrl: string;
	dateOfBirth: string;
	gender: string;
	city: string;
	country: string;
	createdSince: string;
	subscriptionLevel: string;
	isVerified: boolean;
	bio: string;
	followers: string[];
	lastLogin: string;
	status: string;
	rolesList: string[];
	ra_tournamentsManagedCount: number;
	ra_tournamentsManaged: RaTournamentsManaged[];
	ra_applications: RaApplication[];
}

export interface RaApplication {
	uidApplication: string;
	teamName: string;
	tournamentName: string;
	uidTournament: string;
	status: string;
}

export interface RaTournamentsManaged {
	tournamentName: string;
	uidTournament: string;
	teamsRegistered: number;
	fieldMain: string;
	city: string;
	urlTournamentShield: string;
	tournamentStatus: string;
	round: string;
	startDate: string;
	endDate: string;
	winner: string;
}
