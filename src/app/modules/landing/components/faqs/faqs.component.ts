/* eslint-disable max-len */
import { Component } from '@angular/core';
import { Faq } from '@landing/interfaces/faq.interface';

@Component({
	selector: 'landing-faqs',
	templateUrl: './faqs.component.html'
})
export class LandingFaqsComponent {
	faqs: Faq[] = [
		{
			question: '¿Qué es 3Cats?',
			answer:
				'3Cats es la solución definitiva para quienes viven el fútbol en su máxima expresión, desde la cancha amateur hasta las ligas locales más competitivas. Con 3Cats, llevamos la gestión de torneos al siguiente nivel, permitiendo a los organizadores y jugadores acceder a un sistema sofisticado pero fácil de usar para registrar y seguir cada aspecto de su competición.'
		},
		{
			question: '¿Qué características ofrece 3Cats?',
			answer: `<ul class="list-disc space-y-2 ml-6">
      <li>Gestión Integral de Torneos: Configuración, seguimiento de partidos y administración de equipos.</li>
      <li>Registro Personalizado de Jugadores: Perfiles individuales con estadísticas y logros.</li>
      <li>Estadísticas y Análisis: Clasificaciones en tiempo real y análisis detallado del rendimiento.</li>
      <li>Interacción y Comunidad: Seguimiento de equipos y jugadores, y red social interna.</li>
      <li>Monetización y Premium: Suscripciones premium y opciones de publicidad/patrocinio.</li>
    </ul>`
		},
		{
			question: '¿Qué beneficios tiene usar 3Cats para los torneos?',
			answer: `<ul class="list-disc space-y-2 ml-6">
      <li>Centraliza toda la gestión del torneo en una sola plataforma fácil de usar.</li>
      <li>Ofrece resultados y clasificaciones actualizados en tiempo real, eliminando la necesidad de cálculos manuales.</li>
      <li>Incrementa la visibilidad de equipos y jugadores con perfiles personalizados y estadísticas destacadas.</li>
      <li>Proporciona herramientas avanzadas para mejorar el rendimiento, planificar estrategias y analizar datos clave.</li>
      <li>Facilita la interacción entre jugadores, aficionados y equipos, fomentando una comunidad activa y comprometida.</li>
    </ul>`
		},
		{
			question: '¿Cómo puedo acceder a mis estadísticas como jugador en 3Cats?',
			answer:
				'Al registrarte en 3Cats, obtendrás un perfil personal donde se actualizarán automáticamente tus estadísticas, como goles, eficiencia y fair play, a medida que participas en torneos.'
		},
		{
			question: '¿Puedo personalizar mis torneos en 3Cats?',
			answer: `<p>¡Por supuesto! 3Cats te permite personalizar tus torneos de manera sencilla y profesional. Puedes:</p>
      <ul class="list-disc space-y-2 ml-6">
        <li>Centraliza toda la gestión del torneo en una sola plataforma fácil de usar.</li>
        <li>Ofrece resultados y clasificaciones actualizados en tiempo real, eliminando la necesidad de cálculos manuales.</li>
        <li>Incrementa la visibilidad de equipos y jugadores con perfiles personalizados y estadísticas destacadas.</li>
        <li>Proporciona herramientas avanzadas para mejorar el rendimiento, planificar estrategias y analizar datos clave.</li>
        <li>Facilita la interacción entre jugadores, aficionados y equipos, fomentando una comunidad activa y comprometida.</li>
      </ul>`
		},
		{
			question: '¿Puedo compartir mis logros y estadísticas con amigos?',
			answer:
				'Sí, 3Cats incluye una función para compartir tus estadísticas y logros en redes sociales directamente desde tu perfil.'
		},
		{
			question: '¿Puedo crear mi equipo en 3Cats?',
			answer:
				'¡Por supuesto! En 3Cats puedes crear tu equipo de manera sencilla. Registrar tu cuenta: Accede a la plataforma y crea un perfil personal. Desde tu dashboard, selecciona la opción "Crear Equipo". Completar los detalles: Ingresa el nombre del equipo, sube un escudo, define los colores del uniforme y personaliza los roles de tus jugadores. Invitar jugadores: Envía invitaciones a tus compañeros o agrega sus datos manualmente. Una vez creado, podrás gestionar a tus jugadores, inscribir a tu equipo en torneos y hacer un seguimiento detallado de su rendimiento. ¡Haz que tu equipo destaque en la comunidad de fútbol amateur!'
		}
	];
}
