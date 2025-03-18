import { Component, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { PLAYERS } from '@shared/constants/players.constant';
import { Player } from '@shared/interfaces/player.interface';

type StatKey =
	| 'rp_goalsCount'
	| 'rp_matchPlayedCount'
	| 'rp_matchWonCount'
	| 'rp_efficiency'
	| 'rp_fairPlay'
	| 'rp_popularityScore'
	| 'rp_assistsCount'
	| 'rp_cleanSheets'
	| 'rp_playerOfTheMatchCount'
	| 'yellowCards'
	| 'redCards';

type StatConfig = {
	label: string;
	key: StatKey;
	suffix?: string;
	customValue?: (player: Player) => string;
};

@Component({
	selector: 'statistics-player-comparison',
	imports: [FormsModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatRadioModule],
	templateUrl: './player-comparison.component.html'
})
export class PlayerComparisonComponent implements OnInit {
	// Inputs
	public loggedPlayer = input.required<Player>();

	// Signals
	searchMode = signal<'universe' | 'tournament'>('universe');
	searchQuery = signal<string>('');
	selectedPlayer = signal<Player | null>(null);
	selectedTournament = signal<string | null>(null);
	filteredPlayers = signal<Player[]>([]);
	availableTournaments = signal<{ tournamentName: string; uidTournament: string }[]>([]);

	// Stats to compare
	statsToCompare: StatConfig[] = [
		{ label: 'Goles', key: 'rp_goalsCount' },
		{ label: 'Asistencias', key: 'rp_assistsCount' },
		{ label: 'Partidos jugados', key: 'rp_matchPlayedCount' },
		{ label: 'Partidos Ganados', key: 'rp_matchWonCount' },
		{ label: 'Eficiencia', key: 'rp_efficiency', suffix: '%' },
		{
			label: 'Tarjetas amarillas',
			key: 'yellowCards',
			customValue: (player) => this.getCardCount(player, 'Yellow').toString()
		},
		{
			label: 'Tarjetas rojas',
			key: 'redCards',
			customValue: (player) => this.getCardCount(player, 'Red').toString()
		},
		{ label: 'Fair Play', key: 'rp_fairPlay' },
		{ label: 'Popularidad', key: 'rp_popularityScore' },
		{ label: 'MVP', key: 'rp_playerOfTheMatchCount' }
	];

	ngOnInit(): void {
		this.availableTournaments.set(
			this.loggedPlayer().rp_tournamentPlayed.map((t) => ({
				tournamentName: t.tournamentName,
				uidTournament: t.uidTournament
			}))
		);
	}

	onSearchModeChange(mode: 'universe' | 'tournament'): void {
		this.searchMode.set(mode);
		this.searchQuery.set('');
		this.filteredPlayers.set([]);
	}

	onSearchQueryChange(query: string): void {
		this.searchQuery.set(query);
		if (query.length < 3) {
			this.filteredPlayers.set([]);
			return;
		}

		const filtered = PLAYERS.filter(
			(player) =>
				player.uid !== this.loggedPlayer().uid &&
				(player.userName.toLowerCase().includes(query.toLowerCase()) ||
					player.nickname.toLowerCase().includes(query.toLowerCase()))
		);

		this.filteredPlayers.set(filtered);
	}

	selectPlayer(player: Player): void {
		this.selectedPlayer.set(player);
	}

	onTournamentChange(uidTournament: string): void {
		this.selectedTournament.set(uidTournament);
	}

	getCardCount(player: Player, cardType: 'Yellow' | 'Red'): number {
		return player.rp_cardssScored?.filter((card) => card.cardType === cardType)?.length || 0;
	}

	getStatValue(player: Player, key: StatKey, suffix = ''): string {
		const stat = this.statsToCompare.find((s) => s.key === key);
		if (stat?.customValue) {
			return stat.customValue(player) + suffix;
		}
		return player[key]?.toString() + suffix;
	}
}
