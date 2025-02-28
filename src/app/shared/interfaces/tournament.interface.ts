export interface Tournament {
	tournamentName: string;
	uidTournament: string;
	urlTournamentPhoto: string;
	urlTournamentShield: string;
	primaryColor: string;
	secondaryColor: string;
	adminTournamentName: string;
	adminTournamentUid: string;
	country: string;
	mainCity: string;
	latitude: number;
	longitude: number;
	statusTournament: 'En Inscripción' | 'En Curso' | 'Finalizado';
	startTournament: string;
	teams: number;
	totalMatches: number;
	totalGoals: number;
	totalYellows: number;
	totalReds: number;
	totalTeams: number;
	totalFollowers: number;
	popularityScore: number;
	gender?: string;
	minAge: number;
	maxAge: number;
	fields: string[];
	formatSoccer: string;
}
