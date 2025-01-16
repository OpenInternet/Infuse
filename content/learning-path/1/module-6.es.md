---
style: module
title: Investigación activa - analiza correos electrónicos maliciosos
description: "Ya se trate de ingeniería social pura, phishing o envío de
  malware, los correos electrónicos maliciosos pueden ser bastante complejos.
  Este módulo le enseñará cómo interpretar y comprender los correos electrónicos
  maliciosos y a encontrar la infraestructura a la que se vinculan. "
weight: 6
---

## Estudios de caso


Este módulo le enseñará a **interpretar correos electrónicos maliciosos** y a **encontrar la infraestructura a la que se vinculan**. Ya sea que sea trate de ingeniería social pura, phishing o envío de malware, los correos electrónicos maliciosos pueden ser muy complejos. Si bien el objetivo inmediato de esta habilidad es identificar la infraestructura del atacante, estas competencias avanzadas de saber revertir correos electrónicos complejos, también constituyen una buena preparación para comprender las campañas de los atacantes, y son una buena introducción para analizar malware más complicado. Algunas de esas técnicas también pueden ayudarle a analizar mensajes sospechosos enviados a través de otros medios como WhatsApp.

Tenga en cuenta que durante la investigación activa, es posible que se realicen acciones que alerten al atacante de la investigación (o al menos de que alguien está interactuando con su trampa). Piense si este es un coste razonable para completar una investigación.

Lo mejor es hacer este tipo de análisis desde una máquina virtual o un dispositivo especialmente dedicado para ello. Para mayor protección, una buena idea podría ser utilizar una VPN de buena reputación para que su dirección IP no se filtre cuando esté llevando a cabo una investigación activa.

Este módulo trata sobre el análisis del _cuerpo_ de un correo electrónico malicioso, mientras que el módulo sobre [Investigación Pasiva: Analizar los encabezados de correos electrónicos](/es/learning-path/1/module-5/) se ocupa del encabezado. Para una investigación adecuada, recomendamos usar las habilidades aprendidas en ambos módulos Tenga en cuenta que el análisis de los contenidos y el comportamiento de los archivos adjuntos de correo electrónico está cubierto en la ruta de aprendizaje Análisis de malware.

## Objetivos

Después de completar esta módulo, el profesional debe ser capaz de hacer:

- Analizar el código HTML de un correo electrónico y comprender los conceptos básicos de MIME;
- Comprender y detectar píxeles de rastreo y contenido activo similar;
- Usar herramientas como VirusTotal y URLScan para evaluar archivos adjuntos y URLs en busca de contenido malicioso.

---
## Sección Principal

### Conocimiento Básico: Correos electrónicos HTML y MIME

- Para practicar esta habilidad, usted debe comprender los conceptos básicos de los correos electrónicos HTML y MIME. Si necesita repasar sus conocimientos en esta área, consulte algunos de los recursos sobre temas clave enumerados a continuación:
- La mayoría de los correos electrónicos se envían en formato HTML, lo que permite a quienes hacen phishing el uso de varios métodos inteligentes de presentación y fraude.
- Si bien no es necesario tener la capacidad de escribir HTML o diseñar páginas web, los profesionales deben saber abrir y revisar el código fuente de un correo electrónico HTML y entender los elementos esenciales presentes. Para hacerlo, lea esta introducción para [MIME](https://learn.microsoft.com/en-us/previous-versions/office/developer/exchange-server-2010/aa494197%28v=exchg.140%29) y HTML.
- Aprender algo de HTML es inevitable, y recursos como [W3Schools](https://www.w3schools.com/html/) pueden proporcionar un buen punto de partida. Tenga en cuenta también que algunos proveedores de correo electrónico(por ejemplo, Outlook) no le permiten descargar todo el cuerpo del correo.
- MIME es un estándar de Internet que amplía el formato de los mensajes de correo electrónico más allá de los mensajes de texto sin formato, y permite textos en conjuntos de caracteres distintos de ASCII, archivos adjuntos no textuales y cuerpos de mensajes con varias partes. Algunas de las funciones MIME pueden utilizarse para ocultar y adjuntar contenido malicioso. [Este artículo de Wikipedia](https://en.wikipedia.org/wiki/MIME) ofrece una buena introducción inicial.

### Identificación de amenazas potenciales: Imágenes Insertadas y Píxeles de Rastreo

Cuando investigue correos electrónicos potencialmente maliciosos para descubrir la infraestructura del atacante, no busque solo enlaces y archivos adjuntos. Los atacantes pueden incluir rastreadores en sus correos electrónicos, al igual que los especialistas en marketing. [Este artículo para especialistas en marketing](https://www.unir.net/revista/marketing-comunicacion/que-es-pixel-seguimiento/) explica cómo funciona el rastreo de correo electrónico. Tenga en cuenta que cualquier recurso cargado desde la web, no solo las imágenes, se puede utilizar para hacer seguimiento. Revise los tipos de información que se pueden obtener a través de un píxel de rastreo o un elemento de seguimiento, incluida la información de IP (geolocalización) y de huellas dactilares del navegador. Internews creó un ejercicio de capacitación (descrito en la sección de práctica que sigue a continuación) que lo ayudará a familiarizarse con los rastreadores y parte de la información que pueden detectar.

### Herramientas y Flujo de Trabajo para el Análisis de Correos Electrónicos Maliciosos

Una vez que comprenda los conceptos fundamentales y las amenazas potenciales, necesitará un flujo de trabajo y herramientas para el análisis.

- El flujo de trabajo de [Suspicious Phishing Email](https://communitydocs.accessnow.org/58-Suspicious_Phishing_Email.html) de Access Now evalúa los correos electrónicos sospechosos de forma sistemática. Incluye una lista de pasos a seguir desde la observación inicial hasta la categorización de amenazas y la presentación de informes.
- [VirusTotal](https://virustotal.com/) se puede utilizar para evaluar URLs y archivos adjuntos en busca de contenido malicioso. Sin embargo, tenga en cuenta que otros usuarios pueden acceder a las URLs y los archivos enviados, lo que puede alertar al atacante. Esto representa un riesgo solo durante las campañas específicas; en otras campañas, los adversarios generalmente asumen que alguien detectó y está analizando sus patrones de ataque.
- Eche un vistazo a [algunas de las herramientas de análisis de correo electrónico descritas en este artículo](https://intezer.com/blog/incident-response/automate-analysis-phishing-email-files/). Estas herramientas pueden investigar el contenido del correo electrónico y los archivos adjuntos, y varias de ellas se basan en la línea de comandos. Esto resulta especialmente útil para los analistas que investigan contenidos creados por actores sofisticados, que podrían tratar de elaborar mensajes con los que aprovechan las brechas de seguridad de los programas de correo electrónico. El artículo también detalla algunas técnicas que utilizan los agentes de amenazas para frustrar el análisis. [En este artículo](https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91) también se explica cómo convertir archivos de Outlook en archivos de texto sin formato y analizarlos mediante el bloc de notas o la línea de comandos, con el fin de reducir la superficie de ataque del correo electrónico malicioso que aprovecha los errores de Outlook.

## Practique

- Lea en su totalidad los dos casos prácticos siguientes y anote todos los elementos que le resulten nuevos y que requieran más práctica:
  - [Analyzing Malicious Email Files | by Josh Lemon | Medium](https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91)
  - [Analyzing Malicious Emails. An intro to analyzing a phishing email | by Kyle Bubp | Medium](https://medium.com/@kylebubp/analyzing-malicious-emails-fb4ddcf0663e)
- Un proyecto de Internews que se centra en la seguridad digital de los periodistas [creó un ejercicio de simulación](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) para ayudar a las personas a comprender mejor y practicar el trabajo con rastreadores. Lea el proyecto y complete algunos de los ejercicios.

## Comprobación de habilidades

Pídale a un compañero/a o mentor/a que le envíe un correo electrónico. Idealmente, el correo electrónico debería contener varios elementos, como píxeles de rastreo, archivos adjuntos y enlaces, que se beneficiarían de un análisis en profundidad. Alternativamente, entre en su propia bandeja y elija un correo electrónico no malicioso (con suerte). Utilice los conocimientos adquiridos en este módulo para analizarlo:

- ¿Puede leer los encabezados del correo electrónico para averiguar la dirección del remitente?
- ¿Puede confirmar la autenticidad del remitente? ¿Es probable que el correo electrónico haya sido suplantado?
- ¿Qué infraestructura se utilizó en la entrega del mensaje?
- ¿Qué contenido activo (MIME, píxeles de rastreo) se incluye en el correo electrónico?
- ¿Qué datos podrían filtrarse al abrir el correo electrónico e interactuar con él?
- ¿Qué quiere el remitente que haga al recibir el correo electrónico?

Comente con su compañero/a o tutor/a sus respuestas a las preguntas anteriores.

## Recursos de Aprendizaje

{{% resource title="Introducción al código HTML del correo electrónico" description="Una breve introducción al concepto de envío de correos electrónicos que contienen HTML" languages="Múltiple" cost="Gratis" url="https://es.wikipedia.org/wiki/Correo_HTML" %}}
{{% resource title="Introducción al código MIME" description="Una breve introducción al formato MIME para mensajes" languages="Múltiple" cost="Gratis" url="https://es.wikipedia.org/wiki/Multipurpose_Internet_Mail_Extensions" %}}
{{% resource title="Cómo incluir imágenes en el correo electrónico" description="Aunque esta página está orientada a los remitentes de correo electrónico, analiza las formas en que los atacantes pueden incorporar imágenes en su correo electrónico." languages="Inglés" cost="Gratis" url="https://mailchimp.com/es/resources/embed-image-in-email/" %}}
{{% resource title="Aprende sobre HTML" description="La mayoría de los correos electrónicos maliciosos de phishing utilizan HTML para engañar a los usuarios.  Para extraer las URLs (y, por lo tanto, las direcciones del servidor) de los correos electrónicos, tendrá que aprender algo de HTML." languages="Múltiple (autotraducción)" cost="Gratis" url="https://www.w3schools.com/html/" %}}
{{% resource title="Qué es un píxel de seguimiento?" description="Al investigar correos electrónicos potencialmente maliciosos para descubrir la infraestructura del atacante, no busque solo enlaces y archivos adjuntos.  Los atacantes pueden incluir rastreadores en sus correos electrónicos, tal como también lo hacen que los especialistas en marketing.   Este artículo para especialistas en marketing explica cómo funciona el rastreo de correo electrónico.  Tenga en cuenta que cualquier recurso cargado desde la web se puede utilizar para el rastreo." languages="Español" cost="Gratis" url="https://www.unir.net/revista/marketing-comunicacion/que-es-pixel-seguimiento/" %}}
{{% resource title="VirusTotal" description="Una herramienta para evaluar las URL y los archivos adjuntos en busca de contenido malicioso. Tenga en cuenta que otros usuarios pueden acceder a las URL y los archivos enviados." languages="La interfaz principal está en inglés" cost="Gratis, con algunas limitaciones de tarifa y funciones profesionales adicionales" url="https://www.virustotal.com/gui/home/url" %}}
{{% resource title="Flujo de trabajo de correo electrónico malicioso" description="Un manual de estrategias sobre qué hacer al evaluar un correo electrónico sospechoso" languages="Múltiple" cost="Gratis" url="https://communitydocs.accessnow.org/58-Suspicious_Phishing_Email.html" %}}
{{% resource title="Manual de investigación del correo electrónico malicioso de Exchange" description="Un manual para investigar correos electrónicos maliciosos en un entorno de Microsoft Exchange (donde el investigador tiene acceso de administrador)" languages="Inglés" cost="Gratis" url="https://learn.microsoft.com/fr-fr/security/operations/incident-response-playbook-phishing" %}}
{{% resource title="Ejemplos de análisis de correos electrónicos de phishing, recurso 1" description="Análisis de ejemplos de correos electrónicos de phishing.  Incluye un vistazo a los archivos HTML con scripts maliciosos insertados y contenido codificado." languages="Inglés" cost="Gratis" url="https://medium.com/@kylebubp/analyzing-malicious-emails-fb4ddcf0663e" %}}
{{% resource title="Ejemplos de análisis de correos electrónicos de phishing, recurso 2" description="Análisis de ejemplos de correos electrónicos de phishing.  Incluye un vistazo a los archivos HTML con scripts maliciosos insertados y contenido codificado." languages="Inglés" cost="Gratis" url="https://www.vadesecure.com/en/blog/m365-phishing-email-analysis-eevilcorp" %}}
{{% resource title="Ejemplos de análisis de correos electrónicos con malware, recurso 3" description="Dado que los correos electrónicos maliciosos pueden aprovechar las brechas de seguridad de los programas de correo electrónico, esta guía muestra la mejor manera de analizarlos utilizando herramientas de línea de comandos y editores de texto." languages="Inglés" cost="Gratis" url="https://intezer.com/blog/incident-response/automate-analysis-phishing-email-files/" %}}
{{% resource title="Ejemplos de análisis de correos electrónicos con malware, recurso 4" description="Dado que los correos electrónicos maliciosos pueden aprovechar las brechas de seguridad de los programas de correo electrónico, esta guía muestra la mejor manera de analizarlos utilizando herramientas de línea de comandos y editores de texto." languages="Inglés" cost="Gratis" url="https://blog.joshlemon.com.au/analysing-malicious-email-files-d85d8ff76a91" %}}
