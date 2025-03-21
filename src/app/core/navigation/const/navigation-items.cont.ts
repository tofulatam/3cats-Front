import { NavigationItem } from '../interfaces/navigation.interface';

/**
 * Navigation items for the sidebar
 * @description This is the navigation items for the sidebar used to build the sidebar
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
				link: '/dashboard/home'
			}
		]
	},
	// Player
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
				link: '/dashboard/jugador/estadisticas'
			},
			{
				id: 'player.matches',
				title: 'Partidos',
				type: 'basic',
				fontIcon: 'sports_soccer',
				link: '/dashboard/jugador/partidos'
			},
			{
				id: 'player.tournaments',
				title: 'Torneos',
				type: 'basic',
				fontIcon: 'emoji_events',
				link: '/dashboard/jugador/torneos'
			},
			{
				id: 'players.teams',
				title: 'Equipos',
				type: 'basic',
				fontIcon: 'security',
				link: '/dashboard/jugador/equipos'
			}
		]
	},
	// Organizer
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
				link: '/dashboard/organizador/home'
			},
			{
				id: 'organizer.create-tournament',
				title: 'Crear Torneo',
				type: 'basic',
				fontIcon: 'add_circle',
				link: '/dashboard/organizador/crear-torneo'
			},
			{
				id: 'organizer.tournaments',
				title: 'Mis Torneos',
				type: 'basic',
				fontIcon: 'emoji_events',
				link: '/dashboard/organizador/torneos'
			}
		]
	}
];
