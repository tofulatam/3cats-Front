import { NavigationItem } from '../interfaces/navigation.interface';

/**
 * Navigation items for the sidebar
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		id: 'home',
		title: '',
		subtitle: '',
		type: 'group',
		children: [
			{
				id: 'home.stats',
				title: 'Inicio',
				type: 'basic',
				fontIcon: 'home',
				link: '/home'
			}
		]
	},
	{
		id: 'player',
		title: 'Jugador',
		subtitle: '',
		type: 'group',
		children: [
			{
				id: 'player.stats',
				title: 'Estadísticas',
				type: 'basic',
				fontIcon: 'bar_chart',
				link: '/jugador/estadisticas'
			},
			{
				id: 'player.matches',
				title: 'Partidos',
				type: 'basic',
				fontIcon: 'sports_soccer',
				link: '/jugador/partidos'
			},
			{
				id: 'player.tournaments',
				title: 'Torneos',
				type: 'basic',
				fontIcon: 'emoji_events',
				link: '/jugador/torneos'
			},
			{
				id: 'players.teams',
				title: 'Equipos',
				type: 'basic',
				fontIcon: 'security',
				link: '/jugadores/equipos'
			}
		]
	},
	{
		id: 'organizer',
		title: 'Organizador',
		subtitle: '',
		type: 'group',
		children: [
			{
				id: 'organizer.dashboard',
				title: 'Dashboard',
				type: 'basic',
				fontIcon: 'dashboard',
				link: '/organizador/dashboard'
			},
			{
				id: 'organizer.create-tournament',
				title: 'Crear Torneo',
				type: 'basic',
				fontIcon: 'add_circle',
				link: '/organizador/crear-torneo'
			},
			{
				id: 'organizer.tournaments',
				title: 'Mis Torneos',
				type: 'basic',
				fontIcon: 'emoji_events',
				link: '/organizador/torneos'
			}
		]
	}
];
