export interface Player {
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
	favorites: any[];
	lastLogin: string;
	status: string;
	rolesList: string[];
	rp_Height: number;
	rp_Weight: number;
	rp_goalsScored: RpGoalsScored[];
	rp_goalsCount: number;
	rp_cardssScored: RpCardssScored[];
	rp_fairPlay: number;
	rp_matchPlayed: RpMatchPlayed[];
	rp_matchPlayedCount: number;
	rp_matchWonCount: number;
	rp_matchDrawCount: number;
	rp_matchLostCount: number;
	rp_teamPlayed: RpTeamPlayed[];
	rp_tournamentPlayed: RpTournamentPlayed[];
	rp_awardsPlayerWon?: RpAwardsPlayerWon[];
	rp_positionPreference: string;
	rp_assistsCount: number;
	rp_cleanSheets: number;
	penaltiesTakenCount: number;
	penaltiesScoredCount: number;
	penaltiesFacedCount: number;
	penaltiesSavedCount: number;
	rp_playerOfTheMatchCount: number;
	rp_efficiency: number;
	rp_popularityScore: number;
}

export interface RpAwardsPlayerWon {
	awardId: string;
	awardType: string;
	teamName: string;
	tournamentName: string;
	awarDate: string;
}

export interface RpCardssScored {
	matchDay: string;
	tournamentName: string;
	uidTournament: string;
	myTeam: string;
	rivalTeam: string;
	cardType: string;
}

export interface RpGoalsScored {
	matchDay: string;
	tournamentName: string;
	uidTournament: string;
	myTeam: string;
	goalsMyTeam: number;
	rivalTeam: string;
	goalsRivalTeam: number;
	goals: number;
}

export interface RpMatchPlayed {
	matchDay: string;
	tournamentDay: number;
	uidMatch: string;
	uidTournament: string;
	myTeam: string;
	myTeamGoals: number;
	rivalTeam: string;
	rivalTeamGoals: number;
	result: string;
	myGoals: number;
	playerOfTheMatch: boolean;
	attendance: boolean;
}

export enum Result {
	Draw = 'DRAW',
	Loss = 'LOSS',
	Win = 'WIN'
}

export interface RpTeamPlayed {
	teamName: string;
	uidTeam: string;
	urlTeamShield: string;
	yearPlayed: number;
	active: boolean;
}

export interface RpTournamentPlayed {
	tournamentName: string;
	uidTournament: string;
	urlTournamentShield: string;
	startTournament: string;
	statusTournament: string;
	position: number;
}
