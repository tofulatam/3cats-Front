export interface Statistics {
	partidosJugados: number;
	partidosGanados: number;
	golesTotal: number;
	tarjetasTotal: number;
}

export interface StatItem {
	icon: string;
	label: string;
	value: number;
	key: keyof Statistics;
}
