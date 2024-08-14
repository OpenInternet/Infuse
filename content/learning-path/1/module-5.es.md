---
style: module
title: "Investigación pasiva - Análisis de los encabezados de correo electrónico"
description: Una investigación pasiva es aquella que no carga ningún sitio web, sino que solo busca datos disponibles públicamente en ellos. Como tal, el atacante no será alertado de que su sitio web recibió visitas adicionales, lo que podría indicarle que se está llevando a cabo una investigación.
weight: 5
---

## Estudios de caso

Hay mucho más en los correos electrónicos de lo que parece. El subtema le enseñará cómo **analizar los extensos metadatos que documentan el origen de un correo** electrónico, los servidores por los que viajó, información sobre posibles verificaciones de spam y mucho más. Estos metadatos pueden formar una parte crucial de cualquier investigación en profundidad sobre correos electrónicos potencialmente maliciosos.

Utilice esta habilidad después o junto con el subtema Triage dentro de esterutao de aprendizaje. Algunas de estas habilidades pueden ser necesarias como parte del proceso de clasificación para decidir si un mensaje es sospechoso.

Dado que los encabezados de correo electrónico pueden contener referencias a otros dominios e infraestructura, los profesionales primero deben estar familiarizados con el Subtema 4, que analiza la información de dominio e IP, antes de abordar este.

## Objetivos

Después de completar esta subhabilidad, el profesional debe ser capaz de hacer lo siguiente:

● Extraer encabezados completos de un correo electrónico que han recibido o están analizando;

● Analizar los encabezados extraídos, prestando especial atención a

○ La identidad del servidor o servidores que enviaron el correo electrónico;

○ Cualquier información sobre los datos SPF o DKIM que contengan esos encabezados;

La posibilidad de que alguna de la información en el encabezado haya sido falsificada

---
## Sección Principal

Cada correo electrónico tiene encabezados, que contienen metadatos cruciales sobre el remitente, el destinatario y el propio correo electrónico. En esta sección, veremos los encabezados de los correos electrónicos, cómo puede analizarlos y cómo se pueden falsificar los correos electrónicos. Esto requiere algunos conocimientos previos.

#### Conocimiento Fundamental

Lea los recursos y documentos a continuación para familiarizarse un poco con (o recapitular sus conocimientos sobre) los encabezados de correo electrónico, SPF y DKIM.

- Comprender [qué son los encabezados de correo electrónico](https://support.google.com/mail/answer/29436?hl=en) y cómo podemos verlos en múltiples sistemas
- Comprender los conceptos básicos de la falsificación de correo electrónico y el uso de SPF y DKIM para combatirla
  - Obtenga información sobre la falsificación de correo electrónico/ aprenda a identificar los correos electrónicos falsificados
    - <https://docs.sendgrid.com/glossary/spoofing>
  - Obtenga información sobre el Sender Policy Framework y cómo pretende evitar la falsificación de direcciones de remitentes.
    - Utilice dig/doggo para buscar un registro SPF válido (puede hacerlo [ejecutando el comando dig con el argumento txt](https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool)), analice su contenido (consulte [aquí](https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain) una guía) y responda las siguientes preguntas.
      - ¿Cuál es la versión SPF utilizada?
      - ¿Qué dominios son remitentes de correo electrónico autorizados para el dominio?
      - ¿Qué mecanismo (o política) se utilizó para todos los “otros” remitentes?
      - ¿Hay otros mecanismos (o políticas) definidos en el registro?
    - Use <https://mxtoolbox.com/spf.aspx> to conduct a lookup and test on an SPF protected domain. Puede buscar los registros de su propia organización, por ejemplo, verificando su dominio principal.
  - Obtenga información sobre DomainKeys Identified Mail (DKIM) y el modo en que, como norma de autenticación, se utiliza para evitar la falsificación del correo electrónico.
    - <https://docs.sendgrid.com/ui/account-and-settings/dkim-records>
    - Use <https://mxtoolbox.com/dkim.aspx> to conduct a lookup on a DKIM authenticated domain. Puede buscar los registros de su propia organización, por ejemplo, verificando su dominio principal.
- **(Avanzado)** Familiarícese con las diversas técnicas y mecanismos que utilizan los filtros de spam para identificar correos electrónicos no deseados/falsificados.
  - Consulte la lista de módulos disponibles (y selectores) compatibles con RSPAMD <https://rspamd.com/doc/modules/>

#### Analizando encabezados

El [equipo GenCyber de Nebraska creó un curso rápido y relativamente completo sobre encabezados de correo electrónico](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers): Se lo recomendamos a todos los que quieran aprender sobre el tema.

A medida que analice los encabezados, aprenderá bastante sobre los diferentes dominios involucrados en la configuración del correo electrónico. Una vez que tenga una lista de esos dominios, puede usar las mismas herramientas que usamos en la sección anterior (dig, whois, geoIP y otras) para obtener más información sobre ellos.

Los administradores de sistemas que usan dominios del lugar de trabajo como Google Workspace y Microsoh 365 con frecuencia tienen acceso a potentes herramientas de registro y búsqueda de registros: pueden usarlas para buscar en sus sistemas identificadores que se encontraron en encabezados de correo electrónico (como dominios sospechosos), lo que puede ayudarlos a averiguar quién, si alguien, ha sido atacado en su organización. Consulte la documentación[Google’s](https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA) y [Microsoft’s](https://learn.microsoft.com/en-us/exchange/monitoring/monitoring)sobre la búsqueda a través de los registros. Tenga en cuenta que esas funciones de búsqueda generalmente están restringidas a cuentas comerciales o empresariales.

## Practique

Después de leer todos los materiales en el curso de [análisis de encabezado de correo electrónico GenCyber de Nebraska](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/), haga los ejercicios vinculados en el mismo. El sitio tiene un problema con los enlaces, ya que los ejercicios a menudo no están disponibles directamente en él, pero también se pueden descargar [aquí](https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers)

## Comprobación de Habilidades

Encuentre un correo electrónico en su bandeja de entrada o en la carpeta de correo no deseado. Alternativamente, pida a un compañero o mentor que le envíe los encabezados de un correo electrónico que haya recibido recientemente. Analice los encabezados del correo electrónico utilizando las mismas técnicas que se describieron en el ejercicio de práctica, incluso cargándolos en la herramienta [Google Admin Toolbox Message Header](https://toolbox.googleapps.com/apps/messageheader/). Luego, responda las preguntas 1, 2, 3 y 5 descritas en la [sección de investigación](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#investigation) del curso de análisis de encabezado de correo electrónico de Nebraska GenCyber, esta vez utilizando los encabezados del correo electrónico que encontró en lugar del correo electrónico adjunto al curso.

## Recursos de Aprendizaje

{{% resource title="¿Qué son los encabezados de correo electrónico?" description="Una buena introducción a los encabezados de correo electrónico.  Se destacan tres agrupaciones importantes de encabezados de correo electrónico.  Incluye una lista de guías paso a paso para diferentes MUA." languages="Inglés" cost="Gratis" url="https://mailtrap.io/blog/email-headers/" %}}
{{% resource title="Visualización de los encabezados de correo electrónico completos" description="Cómo ver los encabezados de correo electrónico en múltiples sistemas de correo electrónico (Gmail, Outlook, Apple Mail, Thunderbird, etc.)" languages="Múltiple" cost="Gratis" url="https://support.google.com/mail/answer/29436?hl=en" %}}
{{% resource title="Comprobar los encabezados SPF utilizando la herramienta dig" description="Esta pieza ofrece una guía rápida sobre cómo verificar los encabezados SPF utilizando dig, una herramienta instalada en la mayoría de los sistemas Unix-like." languages="Inglés" cost="Gratis" url="https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool" %}}
{{% resource title="Cómo comprobar y leer el registro Sender Policy Framework de un dominio" description="Este artículo muestra cómo comprobar los encabezados SPF utilizando nslookup, una herramienta alternativa a dig, y describe cómo interpretar los resultados." languages="Inglés" cost="Gratis" url="https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain" %}}
{{% resource title="Curso del equipo GenCyber de Nebraska sobre encabezados de correo electrónico" description="Un curso completo sobre cómo analizar los encabezados de correo electrónico al investigar posibles casos de phishing" languages="Inglés" cost="Gratis" url="https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers" %}}
{{% resource title="Los ejemplos de ejercicios también se reflejan aquí:  https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers" description="Comprobación del correo electrónico encabezados en Proton Mail" languages="Inglés" cost="Gratis" url="https://proton.me/support/check-email-headers" %}}
{{% resource title="Ver correo electrónico encabeçados en Zoho" description="Ver correo electrónico encabeçados en Zoho" languages="Inglés" cost="Gratis" url="https://www.zoho.com/mail/help/mail-options.html#alink1" %}}
{{% resource title="Herramienta para análisis de los encabezados de correo electrónico" description="Enlazamos con un par de herramientas que pueden extraer y diseccionar encabezados de correo electrónico, cruciales para cualquier análisis de correos electrónicos potencialmente maliciosos." languages="Inglés" cost="Gratis" url="https://mxtoolbox.com/EmailHeaders.aspx<br>https://github.com/keraattin/EmailAnalyzer<br>https://github.com/umair9747/headmail<br>https://github.com/cyberdefenders/email-header-analyzer" %}}
{{% resource title="Introducción a la suplantación de correo electrónico" description="Introducción a la suplantación de identidad por correo electrónico" languages="Múltiple" cost="Gratis" url="https://en.wikipedia.org/wiki/Email_spoofing<br>https://docs.sendgrid.com/glossary/spoofing<br>https://www.fortinet.com/resources/cyberglossary/email-spoofing" %}}
{{% resource title="Evaluación de los encabezados 'Recibidos'" description="Cómo utilizar los encabezados del correo electrónico para encontrar el servidor que lo envió" languages="Inglés" cost="Gratis" url="https://www.techlicious.com/how-to/how-to-tell-if-email-has-been-spoofed/" %}}
{{% resource title="Análisis de encabezados 'Recibidos' potencialmente falsificados" description="Cómo identificar encabezados 'recibidos' falsos" languages="Inglés" cost="Gratis" url="https://luxsci.com/blog/analyzing-forged-email-message.html <br>https://www.linkedin.com/pulse/anatomy-phishing-email-whats-header-penelope-raquel-bise-" %}}
{{% resource title="Encontrar mensajes con Email Log Search" description="Describa cómo los administradores de cuentas comerciales y empresariales de Google pueden supervisar los registros de mensajes" languages="Inglés" cost="La documentación es gratuita, pero las herramientas sólo están disponibles para usuarios empresariales" url="https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA" %}}
{{% resource title="Supervisión, elaboración de informes y rastreo de mensajes en exchange Online" description="Describe cómo los administradores de cuentas empresariales de Microsoft pueden supervisar los registros de mensajes." languages="Inglés" cost="Documentación gratuita, herramientas sólo disponibles para usuarios de empresa" url="https://learn.microsoft.com/en-us/exchange/monitoring/monitoring" %}}