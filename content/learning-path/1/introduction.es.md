---
style: introduction
title: Introducción
description: Lea la descripción general del ruta de aprendizaje, los objetivos,
  las amenazas asociadas y los requisitos previos.
weight: 1
---
## Resumen

Los mensajes de phishing suelen estar vinculados a una infraestructura maliciosa. Dicha infraestructura intenta robar las credenciales de acceso y utilizarlas para acceder a los sistemas de una organización o de un individuo, o bien pretende poner en peligro la seguridad mediante técnicas de ingeniería social, como la exploit en un navegador o dispositivo. Phishing es una de las técnicas más comunes utilizadas por  actores malintencionados. Su objetivo es comprometer a las ONG. Con frecuencia, una ONG que recibe este tipo de mensajes podría tener dificultad para afirmar con certeza si es sospechoso, y menos aún cuál es la identidad y el objetivo del atacante. Verificar con el presunto remitente a través de otro canal podría ser la forma más fácil de comprobar si un mensaje es legítimo. Si no se puede contactar con el remitente, o si el mensaje no era legítimo, podría ser importante analizarlo más a fondo. Esto puede ayudarnos a detener tales ataques antes de que se comprometan los sistemas de una ONG. También podría evitar ataques futuros y alertar a otros en la comunidad sobre dichos atacantes y sus tácticas, técnicas y procedimientos (TTP). Los resultados de tales investigaciones se comparten, ya sea a través de informes, redes o discusiones informales entre los profesionales de seguridad de las ONG.

Ha habido varios casos en los que las ONG realizaron excelentes investigaciones sobre infraestructura maliciosa. Estos incluyen un esfuerzo conjunto entre Bellingcat y varios grupos [del sector privado que investigan ataques de *phishing* contra organizaciones que se centran en asuntos relacionados con Rusia](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/), así como [un proyecto de HRW-Amnesty](https://www.hrw.org/the-day-in-human-rights/2022/12/05) que [rastreó intentos de *phishing*](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) atribuidos al gobierno iraní.

Los ataques que investiga esta ruta de aprendizaje generalmente comienzan con un mensaje de phishing. La persona objeto del ataque recibe un mensaje (por correo electrónico, WhatsApp u otro medio) que intenta convencerla de hacer clic en un enlace. A veces, la persona trabaja para un grupo de la sociedad civil y es atacada por sus vínculos con dicho grupo, con la esperanza de penetrar más fondo en los sistemas de la organización. En otras ocasiones, los atacantes se dirigen directamente a investigadores individuales o freelancers.

Un mensaje de phishing intentará engañar a la persona que busca atacar para que introduzca sus credenciales como nombres de usuario y contraseñas (como sucedió con los ataques documentados por los grupos liderados por Bellingcat y HRW). También intentará que descargue malware o, en algunos casos, eluda la seguridad del navegador para acceder directamente a la información allí o instalar malware automáticamente. Los módulos “Investigación pasiva: Análisis de URL, nombres de anfitrión (host) y direcciones IP” e “Investigación pasiva: Análisis de los encabezados de correo electrónico” cubren estas fases de un ataque.

Cuando alguien recibe un mensaje de phishing creíble o es atacado por un software malicioso, es posible que intente tratar de identificar la infraestructura (servidores, sitios web, etc.) utilizada por los atacantes. Los ataques dirigidos que utilizan infraestructura dedicada o comprometida son relativamente raros. El módulo sobre “Triaje” le ayudará a determinar si vale la pena analizarlos. Es buena idea conocer bien la gestión de incidentes en general antes de comenzar esta ruta de aprendizaje.

Antes de visitar cualquier sitio web controlado por un atacante o descargar cualquier malware, es importante que aprenda a hacerlo de forma segura. Esta ruta de aprendizaje examina tanto las técnicas de investigación pasivas como las activas. Las técnicas pasivas no contactan con el servidor del atacante y, por tanto, es poco probable que le alerten de una investigación en curso, mientras que las técnicas activas sí contactan con los servidores. Una vez que haya aprendido a hacer una investigación pasiva, puede visitar los sitios web vinculados a los mensajes de phishing y analizarlos para descubrir más infraestructura controlada por el atacante. Esto se trata en el módulo “Investigación activa: Analizar páginas web maliciosas”.

Si el atacante logra introducir malware en el dispositivo de la persona u organización objetivo, ese malware generalmente se comunicará con un servidor de comando y control (C&C). En la ruta de aprendizaje de Análisis de Malware se incluye información sobre cómo descubrir cuáles son los servidores de C&C del atacante y cómo funcionan. Analizar el malware es otra habilidad que se puede utilizar para descubrir otras infraestructura de los atacantes.

Para apoyar mejor a la persona a la que asiste y a la comunidad en general, es importante documentar y compartir sus hallazgos. Esto se trata en la sección “Documentación de los hallazgos”. Hay varias comunidades de intercambio de información y amenazas dentro del espacio más amplio de las ONG, pero enumerarlas queda fuera del alcance de esta ruta de aprendizaje.

Por último, es importante precisar que muchas de las técnicas de investigación descritas en esta ruta de aprendizaje pueden alertar a un atacante de que está siendo investigado, o incluso poner en peligro al investigador o a la comunidad en general. Las técnicas las hemos dividido en métodos pasivos y activos. Sea prudente al considerar métodos activos de investigación. Hable primero con la persona/organización receptora para discutir su modelo de amenaza y permitirle tomar una decisión informada sobre cómo proceder con las investigaciones.


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

* Conocimientos básicos de línea de comandos en los principales sistemas operativos (OS). Si quiere aprender o repasar algunos conceptos básicos de la línea de comandos, le recomendamos [estos](https://www.git-tower.com/blog/command-line-cheat-sheet/) enlaces: [este y este](https://github.com/jlevy/the-art-of-command-line). Si busca una introducción general 'para principiantes a la línea de comandos, le recomendamos que complete el capítulo 4 de la guía [Field Guide to Threat Labs](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) sobre el tema.
* Conceptos básicos de HTML y JavaScript. Si necesita aprender sobre ellos desde cero o quiere actualizar su conocimiento, le recomendamos [MDN Developer](https://developer.mozilla.org/en-US/docs/Learn) docs
* Conceptos básicos sobre cómo interactúan y funcionan los repositorios Git. No es imprescindible pero puede ser útil conocer bien Git y plataformas como GitHub y GitLab ya que muchas herramientas y recursos puede encontrarlas allí. Con el tiempo puede que acabe actualizando repositorios locales o incluso creando sus propias ramas. Si no ha trabajado mucho con tales plataformas en el pasado, recomendamos comenzar con algunas de estas guías:
* [Pro Git Book](https://book.git-scm.com/book/en/v2) (disponible en 17 idiomas) - Los capítulos 1-3 y algunos otros constituyen una excelente introducción.
* [git - la guía simple](https://rogerdudler.github.io/git-guide/index.html) (disponible en 16 idiomas) es una hoja de instrucciones de los comandos de Git. Esútil cuando se tiene un concepto general. Sirve de referencia sobre comandos y sintaxis.
* [Una referencia visual de Git](https://marklodato.github.io/visual-git-guide/index-en.html) (disponible en 14 idiomas): es una referencia más avanzada para comprender los flujos de trabajo y los comandos de Git.
* [GitHub Skills](https://skills.github.com/)(Solo en Inglés)
* [GitLab Git Essentials](https://levelup.gitlab.com/courses/gitlab-with-git-essentials-s2) (Solo en Inglés)

## ¿Qué dispositivos o software necesitas para los ejercicios?

* No necesita ningún hardware potente o especializado para esta ruta de aprendizaje. Cualquier computadora moderna debe funcionar. Aunque las herramientas de esta ruta de aprendizaje solo se han probado en sistemas basados en x86, la mayoría, si no todos, también deben funcionar en sistemas ARM como los ordenadores Raspberry Pi o Apple Silicon.
* Muchas de las herramientas de esta ruta de aprendizaje funcionan mejor en sistemas operativos con distribuciones Unix. Esto significa que es más fácil usar dispositivos Linux, macOS o Windows con WSL (Subsistema de Windows para Linux) instalado.
* Si está ejecutando Windows, necesitará instalar WSL (Subsistema de Windows para Linux) para ejecutar algunas de las herramientas que se describen a continuación.
* Si está ejecutando macOS, es una buena idea instalar [Homebrew](https://brew.sh/) o [Macports](https://www.macports.org/); estos son administradores de paquetes que pueden automatizar el proceso de instalación de algunas de las herramientas descritas a lo largo del ruta de aprendizaje.
* Tanto WSL como Linux deben tener gestores de paquetes integrados que puede utilizar para instalar las herramientas descritas a continuación.

Es mejor analizar la infraestructura maliciosa en un dispositivo separado que no se utiliza para otro trabajo sensible y donde no se ha iniciado sesión en ninguna cuenta sensible o de trabajo. Si no puede utilizar un dispositivo discreto, también puede ejecutar el análisis dentro de una máquina virtual. Si está comenzando a utilizar máquinas virtuales, consulte esta guía rápida sobre cómo ejecutar [Ubuntu Linux](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview) en una de ellas.

Itinerarios de aprendizaje relacionados

esta ruta de aprendizaje ofrece una fantástica introducción a otros. Tras completarla, recomendamos a los alumnos que sigan [Detecting Malware](/es/learning-path/2/) o [Web Security Fundamentals](/es/learning-path/4/).

## Otros Recursos y Enlaces [opcional]

{{% resource title="Flujo de trabajo del Helpdesk: El cliente recibe un correo electrónico sospechoso/phishing" description="Documentación comunitaria de la línea de ayuda Access Now para responder a correos electrónicos sospechosos/phishing" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.htmlLista de todos los tipos de registros DNS" %}}

{{% resource title="Incluye (¿casi?) todos los tipos de registros DNS." description="Inglés, Chino, Japonés, Coreano, Ruso, Serbio, Ucraniano, Esperanto, Húngaro, Vietnamita, Italiano, Español, Francés" languages=" " cost="Gratis" url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="Informes de amnistía de la campaña de phishing" description="Una lista de ejemplos de cómo es una campaña de phishing dirigida contra defensores de los derechos humanos, activistas y periodistas" languages="Múltiples, según el informe" cost="Gratis" url="https://www.amnesty.org/en/search/phishing" %}}
