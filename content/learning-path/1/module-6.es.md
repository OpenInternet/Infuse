---
style: module
title: Investigación activa - analiza correos electrónicos maliciosos
description: Este módulo de habilidades le enseñará a interpretar y comprender los correos electrónicos maliciosos y a encontrar la infraestructura a la que se vinculan. Ya se trate de ingeniería social pura, phishing o envío de malware, los correos electrónicos maliciosos pueden ser bastante complejos. Estas habilidades avanzadas para revertir correos electrónicos complejos también son una buena preparación para comprender las campañas de atacantes, y son una buena introducción para analizar más complicado.
weight: 6
---

## Estudios de caso

Este módulo de habilidades le enseñará a **interpretar y comprender los correos electrónicos maliciosos y a encontrar la infraestructura a la que se vinculan**. Ya se trate de ingeniería social pura, phishing o envío de malware, los correos electrónicos maliciosos pueden ser bastante complejos. Si bien el objetivo inmediato de esta habilidad es identificar la infraestructura del atacante, estas habilidades avanzadas para revertir correos electrónicos complejos también son una buena preparación para comprender las campañas de atacantes, y son una buena introducción para analizar más complicado. Algunas de esas técnicas también pueden **ayudarle a analizar mensajes sospechosos enviados a través de otros medios, como WhatsApp**.

Tenga en cuenta que durante la investigación activa, es posible que se realicen acciones que alerten al atacante de la investigación (o al menos de que alguien está interactuando con su trampa). Considere si este es un coste aceptable para completar una investigación.

Lo mejor es hacer este tipo de análisis desde una máquina virtual o dispositivo dedicado. Para mayor protección, podría ser una buena idea utilizar una VPN de buena reputación para que su dirección IP no se filtre cuando esté llevando a cabo una investigación activa.

Este módulo se ocupa de analizar el cuerpo de un correo electrónico malicioso, mientras que el módulo Investigación Pasiva: Analizar los encabezados de correos electrónicos (/es/learning-path/1/module-5/) se ocupa del encabezado. Para una investigación adecuada, querrá usar ambas habilidades. Tenga en cuenta que el análisis de los contenidos y comportamientos de los archivos adjuntos de correo electrónico está cubierto en elrutao de aprendizaje Análisis de malware.

## Objetivos

Después de completar esta subhabilidad, el profesional debe ser capaz de hacer lo siguiente:

- Analizar el código HTML de un correo electrónico y comprender los conceptos básicos de MIME;
- Comprender y detectar píxeles de rastreo y contenido activo similar;
- Utilice herramientas como VirusTotal y URLScan para evaluar archivos adjuntos y las URL en busca de contenido malicioso.

---
## Sección Principal

### Conocimiento Fundamental: Correos electrónicos HTML y MIME

- Para practicar esta habilidad secundaria, debe comprender los conceptos básicos de los correos electrónicos HTML y MIME. Si cree que es necesario repasar un poco este tema, consulte algunos de los recursos sobre temas clave a continuación:
- La mayoría de los correos electrónicos se envían en formato HTML, lo que permite el uso de varios métodos inteligentes de presentación y engaño por parte de los phishers.
- Si bien no es necesario tener la capacidad de escribir HTML o diseñar páginas web, los profesionales deben sentirse cómodos abriendo y revisando el código fuente de un correo electrónico HTML y entendiendo los elementos esenciales presentes. Para hacerlo, lea esta introducción para [MIME](https://learn.microsoft.com/en-us/previous-versions/office/developer/exchange-server-2010/aa494197%28v=exchg.140%29) y HTML.
- Aprender algo de HTML es inevitable, y recursos como [W3Schools](https://www.w3schools.com/html/) pueden proporcionar un buen punto de partida. Tenga en cuenta también que algunos clientes de correo (por ejemplo, Outlook) no le permiten descargar todo el cuerpo del correo electrónico.
- MIME es un estándar de Internet que amplía el formato de los mensajes de correo electrónico más allá de los mensajes de texto sin formato y permite textos en conjuntos de caracteres distintos de ASCII, archivos adjuntos no textuales y cuerpos de mensajes con varias partes. Se puede abusar de las funciones MIME para ocultar contenido y adjuntar contenido malicioso. [Este artículo de Wikipedia](https://en.wikipedia.org/wiki/MIME) da una buena introducción inicial.

### Identificación de amenazas potenciales: Imágenes Insertadas y Píxeles de Rastreo

Cuando investigue correos electrónicos potencialmente maliciosos para descubrir la infraestructura del atacante, no busque solo enlaces y archivos adjuntos. Los atacantes pueden incluir rastreadores en sus correos electrónicos, al igual que los especialistas en marketing. [Este artículo para especialistas en marketing](https://www.nutshell.com/blog/email-tracking-pixels-101-how-do-tracking-pixels-work) explica cómo funciona el rastreo de correo electrónico. Tenga en cuenta que cualquier recurso cargado desde la web, no solo las imágenes, se puede utilizar para el seguimiento. Revise los tipos de información que se pueden obtener a través de un píxel de rastreo o un elemento de seguimiento, incluida la información de IP (geolocalización) y de huellas dactilares del navegador. Internews creó un ejercicio de capacitación (descrito en la sección de práctica a continuación) que lo ayudará a familiarizarse con los rastreadores y parte de la información que pueden detectar.

### Herramientas y Flujo de Trabajo para el Análisis de Correos Electrónicos Maliciosos

Una vez que comprenda los conceptos fundamentales y las amenazas potenciales, necesitará un flujo de trabajo y herramientas para el análisis.

- El flujo de trabajo de [Suspicious Phishing Email](https://communitydocs.accessnow.org/58-Suspicious_Phishing_Email.html) de Access Now proporciona un enfoque sistemático para evaluar los correos electrónicos sospechosos. Incluye una lista de pasos desde la observación inicial hasta la categorización de amenazas y la presentación de informes.
- [VirusTotal](https://virustotal.com/) se puede utilizar para evaluar URL y archivos adjuntos en busca de contenido malicioso conocido. Sin embargo, tenga en cuenta que otros usuarios pueden acceder a las URL y los archivos enviados, lo que puede hacer que el atacante sea alertado sobre el análisis que se realiza sobre ellos. Esto suele ser solo un riesgo durante las campañas muy específicas; en otras, los adversarios generalmente asumen que alguien detectó y está analizando sus patrones de ataque.
- Eche un vistazo a [algunas de las herramientas de análisis de correo electrónico descritas en este artículo](https://intezer.com/blog/incident-response/automate-analysis-phishing-email-files/). Pueden investigar el contenido del correo electrónico y los archivos adjuntos, y varias de ellas se basan en la línea de comandos, lo que resulta especialmente útil para los analistas que investigan contenidos creados por actores sofisticados, que podrían tratar de elaborar mensajes de forma que aprovechen las brechas de seguridad de los programas de correo electrónico. El artículo también detalla algunas técnicas que utilizan los actores de amenazas para frustrar el análisis. [En este artículo](https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91) también explica cómo convertir archivos de Outlook en archivos de texto sin formato y analizarlos mediante el bloc de notas o la línea de comandos, con el fin de reducir la superficie de ataque del correo electrónico malicioso que aprovecha los errores de Outlook.

## Practique

- Lea completamente los dos casos prácticos siguientes y anote todos los elementos que le resulten nuevos y que requieran más práctica:
  - [Analyzing Malicious Email Files | by Josh Lemon | Medium](https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91)
  - [Analyzing Malicious Emails. An intro to analyzing a phishing email | by Kyle Bubp | Medium](https://medium.com/@kylebubp/analyzing-malicious-emails-fb4ddcf0663e)
- Un proyecto de Internews que se centra en la seguridad de los periodistas [creó un ejercicio de simulación](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) para ayudar a las personas a comprender mejor y practicar el trabajo con rastreadores. Lea el proyecto y complete algunos de los ejercicios.

## Comprobación de Habilidades

Pídale a un compañero o mentor que le envíe un correo electrónico. Idealmente, el correo electrónico contendría varios elementos, como píxeles de rastreo, archivos adjuntos y enlaces, que se beneficiarían de un análisis en profundidad. Alternativamente, entre en su propia bandeja y elija un correo electrónico (con suerte) no malicioso. Utilice los conocimientos adquiridos en este módulo para analizarlo:

- ¿Puede leer los encabezados del correo electrónico para averiguar la dirección del remitente?
- ¿Puede confirmar la autenticidad del remitente? ¿Es probable que el correo electrónico haya sido suplantado?
- ¿Qué infraestructura se utilizó en la entrega del mensaje?
- ¿Qué contenido activo (MIME, píxeles de rastreo) se incluye en el correo electrónico?
- ¿Qué datos podrían filtrarse al abrir el correo electrónico e interactuar con él?
- ¿Qué quiere el remitente que haga al recibir el correo electrónico?

Comente sus respuestas a las preguntas anteriores con su compañero o tutor.

## Recursos de Aprendizaje

{{% resource title="Introducción al código HTML del correo electrónico" description="Una breve introducción al concepto de envío de correos electrónicos que contienen HTML" languages="Múltiple" cost="Gratis" url="https://en.wikipedia.org/wiki/HTML_email" %}}
{{% resource title="Introducción al código MIME" description="Una breve introducción al formato MIME para mensajes" languages="Múltiple" cost="Gratis" url="https://en.wikipedia.org/wiki/MIME" %}}
{{% resource title="Cómo incluir imágenes en el correo electrónico" description="Aunque esta página está orientada a los remitentes de correo electrónico, analiza las formas en que los atacantes pueden incorporar imágenes en su correo electrónico." languages="Inglés" cost="Gratis" url="https://mailchimp.com/resources/embed-image-in-email/" %}}
{{% resource title="Aprende sobre HTML" description="La mayoría de los correos electrónicos maliciosos de phishing utilizan HTML para engañar a los usuarios.  Y así, extraer las URL (y, por lo tanto, las direcciones del servidor) de los correos electrónicos, tendrá que aprender algo de HTML." languages="Múltiple (autotraducción)" cost="Gratis" url="https://www.w3schools.com/html/" %}}
{{% resource title="Introducción a los píxeles de rastreo" description="Cuando investigue correos electrónicos potencialmente maliciosos para descubrir la infraestructura del atacante, no busque solo enlaces y archivos adjuntos.  Los atacantes pueden incluir rastreadores en sus correos electrónicos, al igual que los especialistas en marketing.   Este artículo para especialistas en marketing explica cómo funciona el rastreo de correo electrónico.  Tenga en cuenta que cualquier recurso cargado desde la web se puede utilizar para el rastreo." languages="Inglés" cost="Gratis" url="https://www.nutshell.com/blog/email-tracking-pixels-101-how-do-tracking-pixels-work" %}}
{{% resource title="VirusTotal" description="Una herramienta para evaluar las URL y los archivos adjuntos en busca de malicia conocida. Tenga en cuenta que otros usuarios pueden acceder a las URL y los archivos enviados." languages="La interfaz principal está en inglés" cost="Gratis, con algunas limitaciones de tarifa y funciones profesionales adicionales" url="https://www.virustotal.com/gui/home/url" %}}
{{% resource title="Flujo de trabajo de correo electrónico malicioso" description="Un manual de estrategias sobre qué hacer al evaluar un correo electrónico sospechoso" languages="Múltiple" cost="Gratis" url="https://communitydocs.accessnow.org/58-Suspicious_Phishing_Email.html" %}}
{{% resource title="Manual de investigación del correo electrónico malicioso de Exchange" description="Un manual para investigar correos electrónicos maliciosos en un entorno Microsoh Exchange (donde el investigador tiene acceso de administrador)" languages="Inglés" cost="Gratis" url="https://learn.microsoft.com/en-us/security/operations/incident-response-playbook-phishing" %}}
{{% resource title="Ejemplos de análisis de correos electrónicos de phishing" description="Análisis de ejemplos de correos electrónicos de phishing.  Incluye un vistazo a los archivos HTML con scripts maliciosos insertados y contenido codificado." languages="Inglés" cost="Gratis" url="https://medium.com/@kylebubp/analyzing-malicious-emails-fb4ddcf0663e <br>https://www.vadesecure.com/en/blog/m365-phishing-email-analysis-eevilcorp" %}}
{{% resource title="Ejemplos de análisis de correos electrónicos con malware" description="Dado que los correos electrónicos maliciosos pueden aprovechar las brechas de seguridad de los programas de correo electrónico, esta guía muestra la mejor manera de analizarlos utilizando herramientas de línea de comandos y editores de texto." languages="Inglés" cost="Gratis" url="https://intezer.com/blog/incident-response/automate-analysis-phishing-email-files/ <br>https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91" %}}