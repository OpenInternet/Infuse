+++
style = "module"
weight = 6
title = "Habilidades Interpersonales para la Seguridad de Aplicaciones Web"
description = "Al trabajar en la seguridad de aplicaciones web (¡o en cualquier seguridad!), es importante verificar la naturaleza de la relación de protección digital, brindar consejos útiles, no alarmistas, y brindar evaluaciones de riesgos sólidas."
+++

## Caso de Uso

Al interactuar con personas y organizaciones que operan aplicaciones web, es necesario tener conciencia de sí mismo para comprobar la naturaleza de la relación de protección digital y brindar asesoramiento o servicios útiles y no alarmistas. Es fundamental enmarcar el trabajo técnico en una evaluación de riesgos sólida de la realidad de la aplicación web y sus usuarios.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de hacer lo siguiente:

- Reflexión personal sobre la relación de protección digital con un cliente en el marco del trabajo de evaluación y elaboración de informes de aplicaciones web
- Simplificar y filtrar los hallazgos y explicarlos de una manera que tenga sentido para las necesidades y los modelos de amenazas de la organización y sus partes interesadas
- Mantener la conciencia de los límites de su propio conocimiento y capacidad
- Comunicarse de manera no alarmista sobre vulnerabilidades y debilidades
- Realizar un análisis de riesgo más amplio de una aplicación web basado en las realidades políticas, sociales, económicas y técnicas que la rodean.

---

## Sección Principal

Su trabajo en la evaluación de la seguridad de aplicaciones web debe permanecer contextualizado dentro del marco de la organización que opera o aloja la aplicación, las personas que la utilizan (y sus dispositivos), las relaciones interpersonales que tiene con estas personas, la naturaleza de la aplicación web en sí, los datos almacenados o tratados en la misma, las realidades jurídicas que prevalecen sobre la solicitud, y una sólida evaluación de riesgos de todos estos elementos. Analicemos estos elementos y consideremos una autocrítica de su papel como protector digital.

## El Papel del protector digital en la evaluación de la seguridad de las aplicaciones web

La evaluación de la seguridad de las aplicaciones web – y especialmente muchos de los elementos de esta y otras rutas de aprendizaje vinculados posteriores que van más allá del escaneo básico de vulnerabilidades, la enumeración de versiones y las comprobaciones de configuración incorrecta) es un conjunto de habilidades altamente técnico y enrarecido con una terminología que es inaccesible y difícil de entender tanto por los usuarios laicos como por los administradores de sitios web expertos en tecnología. Tómese un momento para reflexionar sobre su propio nivel de conocimiento y sus sentimientos personales acerca de realizar esta evaluación y lo que espera comunicar con su cliente. Una de las reglas de oro para trabajar como protector digital eficaz: _El objetivo no es impresionar a los demás y parecer superior, sino brindar asistencia efectiva que reduzca el daño y el riesgo y al mismo tiempo respalde los objetivos de defensa de su cliente._

Como tal, es importante filtrar y explicar sus hallazgos dentro del contexto de un análisis de riesgos de la propia aplicación web. Si bien encontrar muchas vulnerabilidades y debilidades puede hacer que se sienta bien como analista, compartirlas todas con el cliente puede generar confusión y estrés innecesario para su cliente. Lograr el equilibrio adecuado puede ser más difícil de lo que parece a primera vista: no todos los hallazgos en materia de seguridad son iguales entre sí. Es necesario comprender la naturaleza de la vulnerabilidad, la cadena de ataque que la hace significativa y el potencial de daño que podría tener una explotación de la vulnerabilidad.

Por ejemplo, cuando se utiliza una herramienta de evaluación de seguridad automatizada como ZAP (mencionada con más detalle en la [Ruta de Aprendizaje sobre Evaluación de Sitios Web](/es/learning-path/5/)), el escaneo de un sitio web puede revelar docenas o incluso cientos de debilidades y vulnerabilidades. Proporcionar esta lista a su cliente es menos útil a menos que pueda explicar cómo algunos de estos hallazgos son _importantes_ para sus partes interesadas y sus objetivos operativos y de promoción. ¿Entiende los hallazgos lo suficiente como para poder proporcionar ese filtrado y explicación? También es necesario ser conscientes de las limitaciones de nuestra propia comprensión en este campo. En caso de que no pueda evaluar adecuadamente si una determinada vulnerabilidad o debilidad es importante, puede dejar una recomendación con su mejor interpretación y consejo de que es posible que necesiten investigarla más a fondo.

### Evaluación de riesgos con Aplicaciones Web

Las organizaciones utilizan aplicaciones web para diversos fines. En algunos casos, se tratarán de información directa o con fines de difusión de la marca e incluirán datos confidenciales limitados. Incluso en estos casos, la información filtrada sobre el tráfico y los visitantes y los riesgos de implantar contenido malicioso en el sitio pueden suponer un daño real para los visitantes o la reputación de la organización.

En otros casos, la aplicación puede procesar datos confidenciales y de misión crítica. A medida que avance por estas rutas de aprendizaje que se centran en gran medida en las habilidades técnicas, realice una verificación continua de los modelos de amenazas que prevalecen sobre la aplicación en sí, la organización y las personas que la operan, así como sobre quienes la utilizan, incluida la consideración a los dispositivos que utilizan para interactuar con él.

## Informar y hablar sobre vulnerabilidades

Informar las vulnerabilidades que ha descubierto puede resultar difícil, especialmente si es nuevo en esto. Hemos creado una breve descripción general del proceso de generación de informes en el [Subtema 5 de la Ruta de Aprendizaje de Evaluación de Seguridad de Aplicaciones Web](/es/learning-path/5/module-5) y alentamos a todos los estudiantes que necesitan redactar informes para los clientes a que lo revisen.

## Vídeos de becarios de Infuse

Dos de nuestros becarios de Infuse, LF y Nanbaan, produjeron vídeos que demuestran cómo los protectores digitales pueden ayudar a las demás personas de forma profesional y empática. ¡Recomendamos que los vean!

* [Vídeo de Nanbaan](https://www.youtube.com/watch?v=oSR_EL-6qAQ) (audio en inglés, subtítulos en inglés, posiblemente traducción automática)
* [Vídeo de LF](https://www.youtube.com/watch?v=SbALgt0oZIo) (audio en español, subtítulos y diapositivas en español, posiblemente traducción automática)
* [Vídeo de LF](https://www.youtube.com/watch?v=ouKS7s4GAPs) (audio en español, subtítulos y diapositivas en inglés,  posiblemente traducción automática)

## Verificación de Habilidades

Inicie sesión en DVWA nuevamente y abra una de sus páginas. Configúrela en seguridad baja o media. Imagine que esta página pertenece a un cliente suyo y necesita informarle sobre las vulnerabilidades, su impacto potencial y las mitigaciones necesarias. Puedes hacer este ejercicio:

1. Por tu cuenta, escribiendo un borrador de un correo electrónico que enviarías al cliente. Si es posible, comparta ese borrador con un colega o mentor más adelante, quien verificará que sea una respuesta apropiada y mesurada.
2. Con un colega o mentor, representando la conversación que tendrías con el cliente. Haga un informe después de la conversación, pidiéndole al colega que le dé su opinión sobre lo que hizo bien y dónde podría mejorar.
