interface TeamFounder {
	uid: string;
	name: string;
}

export interface Team {
	teamName: string;
	uidTeam: string;
	aliasTeam: string;
	ownerTeam: string;
	uidOwnerTeam: string;
	urlTeamPhoto: string;
	creationDate: string;
	createdSince: string;
	mainCity: string;
	country: string;
	latitude: number;
	longitude: number;
	founders: TeamFounder[];
	aboutTeam: string;
	primaryColor: string;
	secondaryColor: string;
	applications: any[]; // TODO: type this more specifically if you have the structure
	players: any[]; // TODO: type this more specifically if you have the structure
	goalsFor: number;
	goalsAgainst: number;
	played: number;
	won: number;
	drawn: number;
	lost: number;
	points: number;
	yellows: number;
	reds: number;
	fairPlay: number;
	followers: any[]; // TODO: type this more specifically if you have the structure
	followersCount: number;
}
