---
style: introduction
title: Introducción
description: COMIENCE AQUÍ. Lea la descripción general del camino de
  aprendizaje, los objetivos, las amenazas asociadas y los requisitos previos.
weight: 1
---
## Resumen

Los mensajes de phishing suelen estar vinculados a una infraestructura maliciosa que, o bien intenta capturar las credenciales de log-in y utilizarlas para acceder a los sistemas de una organización o de una persona, o bien pretende poner en peligro la seguridad mediante técnicas de ingeniería social, como la exploit de un navegador o de un dispositivo. Son una de las técnicas más comunes utilizadas por los actores malintencionados que tienen como objetivo comprometer a las ONG. Muy a menudo, una ONG que recibe un mensaje de este tipo podría tener dificultades para decir con certeza si era sospechoso, y mucho menos cuál era la identidad y el objetivo del atacante. Verificar con el presunto remitente a través de otro canal podría ser la forma más fácil de comprobar si un mensaje es legítimo. Si no se puede contactar con el remitente o si el mensaje no era legítimo, podría ser importante analizarlo con más profundidad. Esto puede permitirnos detener tales ataques antes de que se comprometan los sistemas de una ONG, evitar que lo hagan en el futuro y alertar a otros dentro de la comunidad sobre dichos atacantes y sus tácticas, técnicas y procedimientos (TTP). Los resultados de tales investigaciones se comparten, ya sea a través de informes formales o redes, o discusiones informales entre profesionales de seguridad de las ONG.

Ha habido varios casos en los que las ONG realizaron excelentes investigaciones sobre infraestructura maliciosa. Estos incluyen un esfuerzo conjunto entre Bellingcat y varios grupos [del sector privado que investigan ataques de *phishing* contra organizaciones que se centran en asuntos relacionados con Rusia](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/), así como [un proyecto de HRW-Amnesty](https://www.hrw.org/the-day-in-human-rights/2022/12/05) que [rastreó intentos de *phishing*](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) atribuidos al gobierno iraní.

Los ataques que investiga esta sección generalmente comienzan con un mensaje de phishing. La persona objetivo recibe un mensaje (por correo electrónico, WhatsApp u otro medio) que intenta convencerla de que haga clic en un link. A veces, la persona objetivo del ataque trabaja para un grupo de la sociedad civil y es atacada por sus vínculos con él, con la esperanza de profundizar en los sistemas de la organización. En otras ocasiones, los atacantes se dirigirán directamente a investigadores individuales o freelancers.

Un mensaje de phishing intentará engañar a la persona objetivo para que introduzca sus credenciales, como nombres de usuario y contraseñas (como sucedió con los ataques documentados por los grupos liderados por Bellingcat y HRW), descargue malware o, en algunos casos, eluda la seguridad del navegador para acceder directamente a la información en el navegador o instalar malware automáticamente. Las secciones “Investigación pasiva: Análisis de URL, nombres de host y direcciones IP” e “Investigación pasiva: Análisis de los encabezados de correo electrónico” cubren estas fases de un ataque.

Cuando alguien recibe un mensaje de phishing creíble o es atacado por un software malicioso, es posible que deba tratar de identificar la infraestructura (servidores, sitios web, etc.) utilizada por los atacantes. Los ataques dirigidos que utilizan infraestructura dedicada o comprometida son relativamente raros, por lo que la sección sobre “Clasificación” lo ayudará a determinar si vale la pena dedicar tiempo al análisis. Es una buena idea tener una sólida comprensión de la gestión de incidentes en general antes de comenzar este ruta de aprendizaje.

Antes de visitar cualquier sitio web controlado por un atacante o descargar cualquier malware, es importante que aprenda a hacerlo de forma segura. Este ruta de aprendizaje examina tanto las técnicas de investigación pasivas, que no contactan con el servidor del atacante y, por tanto, es poco probable que le alerten de una investigación en curso, como las técnicas activas, que sí contactan con los servidores. Una vez que haya aprendido a hacer una investigación pasiva, puede visitar los sitios web vinculados a los mensajes de phishing y analizarlos para descubrir más infraestructura controlada por el atacante. Esto se trata en la sección “Investigación activa: Analizar páginas web maliciosas”.

Si el atacante logra introducir malware en el dispositivo de la persona u organización objetivo, ese malware generalmente se comunicará con un servidor de comando y control (C&C). Descubrir cuáles son los servidores de C&C del atacante y cómo funcionan está cubierto en el ruta de aprendizaje de Análisis de Malware. Analizar el malware es otra habilidad que puede utilizar para descubrir más infraestructura de los atacantes.

Para apoyar mejor tanto a la persona a la que ayuda como a la comunidad en general, es importante documentar y compartir sus hallazgos. Esto se trata en la sección “Documentación de los hallazgos”. Existen varias comunidades de intercambio de información y amenazas dentro del espacio más amplio de las ONG, pero su enumeración queda fuera del alcance de este ruta de aprendizaje.

Por último, es importante reconocer por adelantado que muchas de las técnicas de investigación en este ruta de aprendizaje pueden alertar a un atacante de que están siendo investigados, o incluso poner en riesgo al investigador, o a la comunidad en general. Dividimos las técnicas en métodos pasivos y activos. Sea prudente al considerar métodos activos de investigación, y hable primero con la persona/organización receptora antes de hacerlo para discutir su modelo de amenaza y permitirle tomar una decisión informada sobre cómo proceder con las investigaciones.

* Pasivo (apropiado en todos los casos)

  * Utiliza información que ya se ha entregado a la persona objetivo
  * No implica comunicación con la infraestructura del atacante
  * Generalmente más fácil
  * Por lo general, no alerta al atacante de que está bajo investigación
  * Más seguro
* Activo

  * Generalmente sólo se utiliza para la entrega de malware y servidores de comando y controlo
  * El investigador interactuará con la infraestructura del atacante...
  * A menudo requiere más habilidad y una investigación más profunda.

    * “Juego del gato y el ratón” con el atacante.
  * Puede alertar al atacante de que está siendo investigado

Riesgo de que el investigador se vea comprometido o se convierta en objetivo.

## Objetivo

Los profesionales aprenderán a:

* Clasificación de los mensajes de correo electrónico para saber si son maliciosos/vale la pena investigarlos en profundidad.
* Entender al atacante y los métodos de ataque
* Analizar los encabezados de correo electrónico para identificar la infraestructura del atacante
* Analizar páginas de destino web maliciosas
* Documentar e informar los hallazgos de la investigación
* Iniciar acciones de desmontaje para reducir el daño

## ¿A qué amenazas mitiga o responde esta habilidad?

Las habilidades en investigación, abordaje y detección de infraestructuras maliciosas pueden ayudar a responder a lo siguiente:

● Ataques dirigidos de phishing

● Phishing basado en Messenger

● Infraestructura relacionada con el phishing

## ¿Cuáles son los prerrequisitos?

* Conocimientos básicos de línea de comandos en los principales sistemas operativos (OS). Si quiere aprender o repasar algunos conceptos básicos de la línea de comandos, le recomendamos [estos](https://www.git-tower.com/blog/command-line-cheat-sheet/) enlaces: [este y este](https://github.com/jlevy/the-art-of-command-line). Si busca una introducción general 'para principiantes a la línea de comandos, le recomendamos que complete el capítulo 4 de la guía [Field Guide to Threat Labs](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) sobre el tema.
* Conceptos básicos de HTML y JavaScript. Si necesita aprender sobre ellos desde cero o quiere actualizar su conocimiento, le recomendamos [MDN Developer](https://developer.mozilla.org/en-US/docs/Learn) docs
* Conceptos básicos sobre cómo interactúan y funcionan los repositorios Git. Aunque el conocimiento detallado de Git y las plataformas basadas en Git, como GitHub y GitLab, no es imprescindible, puede ser útil para todos los itinerarios de aprendizaje, ya que muchas herramientas y recursos se alojan allí y, con el tiempo, puede que acabe actualizando repositorios locales o incluso creando sus propias ramas. Si no ha trabajado mucho con tales plataformas en el pasado, recomendamos comenzar con algunas de estas guías:
* [Pro Git Book](https://book.git-scm.com/book/en/v2) (disponible en 17 idiomas) - Un estudio de los capítulos 1-3 más temas seleccionados en otros capítulos dará una excelente introducción.
* [git - la guía simple](https://rogerdudler.github.io/git-guide/index.html) (disponible en 16 idiomas) es una hoja de instrucciones de los comandos de Git. Útil para cuando se tiene un concepto general de git pero se necesita referencia sobre comandos y sintaxis
* [Una referencia visual de Git](https://marklodato.github.io/visual-git-guide/index-en.html) (disponible en 14 idiomas): referencia visual más avanzada para comprender los flujos de trabajo y los comandos de Git.
* [GitHub Skills](https://skills.github.com/)(Solo en Inglés)
* [GitLab Git Essentials](https://levelup.gitlab.com/courses/gitlab-with-git-essentials-s2) (Solo en Inglés)

## ¿Qué dispositivos o software necesitas para los ejercicios?

* No necesita ningún hardware potente o especializado para este ruta de aprendizaje. Cualquier computadora moderna debe funcionar. Aunque las herramientas de este ruta de aprendizaje solo se han probado en sistemas basados en x86, la mayoría, si no todos, también deben funcionar en sistemas ARM como los ordenadores Raspberry Pi o Apple Silicon.
* Muchas de las herramientas de este ruta de aprendizaje funcionan mejor en sistemas operativos Unix-like. Esto significa que es más fácil usar dispositivos Linux, macOS o Windows con WSL (Subsistema de Windows para Linux) instalado.
* Si está ejecutando Windows, necesitará instalar WSL (Subsistema de Windows para Linux) para ejecutar algunas de las herramientas que se describen a continuación.
* Si está ejecutando macOS, es una buena idea instalar [Homebrew](https://brew.sh/) o [Macports](https://www.macports.org/); estos son administradores de paquetes que pueden automatizar el proceso de instalación de algunas de las herramientas descritas a lo largo del ruta de aprendizaje.
* Tanto WSL como Linux deben tener gestores de paquetes integrados que puede utilizar para instalar las herramientas descritas a continuación.

Es mejor analizar la infraestructura maliciosa en un dispositivo separado que no se utiliza para otro trabajo sensible y donde no se ha iniciado sesión en ninguna cuenta sensible o de trabajo. Si no puede utilizar un dispositivo discreto, también puede ejecutar el análisis dentro de una máquina virtual. Si está comenzando a utilizar máquinas virtuales, consulte esta guía rápida sobre cómo ejecutar [Ubuntu Linux](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview) en una de ellas.

Itinerarios de aprendizaje relacionados

Este ruta de aprendizaje ofrece una fantástica introducción a otros. Tras completarla, recomendamos a los alumnos que sigan [Detecting Malware](/es/learning-path/2/) o [Web Security Fundamentals](/es/learning-path/4/).

## Otros Recursos y Enlaces [opcional]

{{% resource title="Flujo de trabajo del Helpdesk: El cliente recibe un correo electrónico sospechoso/phishing" description="Documentación comunitaria de la línea de ayuda Access Now para responder a correos electrónicos sospechosos/phishing" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.htmlLista de todos los tipos de registros DNS" %}}

{{% resource title="Incluye (¿casi?) todos los tipos de registros DNS." description="Inglés, Chino, Japonés, Coreano, Ruso, Serbio, Ucraniano, Esperanto, Húngaro, Vietnamita, Italiano, Español, Francés" languages=" " cost="Gratis" url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="Informes de amnistía de la campaña de phishing" description="Una lista de ejemplos de cómo es una campaña de phishing dirigida contra defensores de los derechos humanos, activistas y periodistas" languages="Múltiples, según el informe" cost="Gratis" url="https://www.amnesty.org/en/search/phishing" %}}
