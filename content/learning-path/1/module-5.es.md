---
style: module
title: Investigación pasiva - Análisis de los encabezados de correo electrónico
description: "Este módulo le enseñará cómo analizar los numerosos metadatos que
  documentan el origen de un correo electrónico, los servidores a través de los
  cuales viaja, la información sobre posibles revisiones de correo basura (spam)
  y mucho más. Estos metadatos pueden ser una parte crucial de cualquier
  investigación a fondo que se realice sobre correos electrónicos potencialmente
  maliciosos. "
weight: 5
---

## Estudio de caso

Hay mucho más en los correos electrónicos de lo que parece. En este módulo aprenderá a analizar los metadatos de un correo electrónico. Estos documentan su origen, los servidores por los que viajó, la información sobre posibles verificaciones de spam y mucho más. Dichos metadatos pueden formar una parte crucial de cualquier investigación a fondo sobre correos electrónicos potencialmente maliciosos.

Ponga en práctica esta habilidad después o junto con el módulo  sobre Clasificación/Triaje en esta ruta de aprendizaje. Algunas de estas habilidades pueden resultarle necesarias como parte del proceso de clasificación para decidir si un mensaje es sospechoso o no.

Dado que los encabezados de correos electrónicos pueden contener referencias a otros dominios e infraestructura, los profesionales deben familiarizarse primero con el módulo 4 que analiza la información de dominio e IP, antes de abordar el contenido de este módulo.


## Objetivos

Después de completar este módulo, el profesional debe ser capaz de:

- Extraer encabezados completos de un correo electrónico que han recibido o están analizando;

- Analizar los encabezados extraídos, prestando especial atención a

  - La identidad del servidor o servidores que enviaron el correo electrónico;

  - Cualquier información sobre los datos SPF o DKIM contenidos en esos encabezados;

  - La posibilidad de que alguna de la información en el encabezado haya sido falsificada

---

Cada correo electrónico tiene encabezados que contienen metadatos cruciales sobre el remitente, el destinatario y el propio correo electrónico. En este módulo, veremos los encabezados de los correos electrónicos, cómo pueden analizarse y cómo se pueden falsificar.. Esto requiere algunos conocimientos previos.

#### Conocimiento Básico

Lea los recursos y documentos a continuación para familiarizarse con la información (o revisar sus conocimientos previos) sobre los encabezados de los correos electrónicos, SPF y DKIM.

- Entender [qué son los encabezados de correo electrónico](https://support.google.com/mail/answer/29436?hl=en) y cómo podemos verlos en múltiples sistemas
- Entender los conceptos básicos de la falsificación de correo electrónicos y el uso de SPF y DKIM para combatirla
  - Obtener información sobre la suplantación de correo electrónico/ aprender a identificar los correos electrónicos falsificados
    - <https://docs.sendgrid.com/glossary/spoofing>
  - Obtener información sobre el Sender Policy Framework y cómo pretende evitar la falsificación de direcciones de remitentes.
    - Usar dig/doggo para buscar un registro SPF válido (puede hacerlo [ejecutando el comando dig con el argumento txt](https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool)), analizar su contenido (consulte [aquí](https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain) una guía) y responda las siguientes preguntas.
      - ¿Cuál es la versión SPF utilizada?
      - ¿Qué dominios son remitentes de correo electrónico autorizados para el dominio?
      - ¿Qué mecanismo (o política) se utilizó para todos los “otros” remitentes?
      - ¿Hay otros mecanismos (o políticas) definidos en el registro?
    - Use <https://mxtoolbox.com/spf.aspx> to conduct a lookup and test on an SPF protected domain. Puede buscar los registros de su propia organización, por ejemplo, verificando su dominio principal.
  - Obtenga información sobre DomainKeys Identified Mail (DKIM) y el modo en que, como norma de autenticación, se utiliza para evitar la falsificación del correo electrónico.
    - <https://docs.sendgrid.com/ui/account-and-settings/dkim-records>
    - Use <https://mxtoolbox.com/dkim.aspx> para examinar un dominio verificado DKIM. Puede buscar los registros de su propia organización, por ejemplo, verificando su dominio principal.
- **(Avanzado)** Familiarícese con las diversas técnicas y mecanismos que utilizan los filtros de spam para identificar correos electrónicos no deseados/falsificados.
  - Consulte la lista de módulos disponibles (y selectores) compatibles con RSPAMD <https://rspamd.com/doc/modules/>

## Sección Principal
### Analizando encabezados

El [equipo GenCyber de Nebraska creó un curso rápido y relativamente completo sobre encabezados de correo electrónico](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers): Se lo recomendamos a todos los que quieran aprender sobre el tema.

A medida que analice los encabezados, aprenderá bastante sobre los diferentes dominios involucrados en la configuración del correo electrónico. Una vez que tenga una lista de esos dominios, puede usar las mismas herramientas que usamos en la sección anterior (dig, whois, geoIP y otras) para obtener más información sobre ellos.

Los administradores de sistemas que usan dominios del lugares de trabajo como Google Workspace y Microsoft 365, con frecuencia tienen acceso a potentes herramientas de registro y búsqueda de registros; pueden usarlas para buscar en sus sistemas identificadores que encontraron en encabezados de correo electrónico (como dominios sospechosos). Esto puede  ayudarles a averiguar quién, si hay alguien, ha sido atacado en su organización. Consulte la documentación [Google’s](https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA) y [Microsoft’s](https://learn.microsoft.com/en-us/exchange/monitoring/monitoring)sobre la búsqueda a través de los registros. Tenga en cuenta que esas funciones de búsqueda generalmente están restringidas a cuentas comerciales o de empresas.

## Practique

Después de leer todos los materiales en el curso de [análisis de encabezado de correo electrónico GenCyber de Nebraska](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/), haga los ejercicios vinculados en el mismo. El sitio tiene un problema con los enlaces, ya que los ejercicios a menudo no están disponibles directamente en él, pero también se pueden descargar [aquí](https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers)

## Comprobación de habilidades

Encuentre un correo electrónico en su bandeja de entrada o en la carpeta de correo no deseado. Alternativamente, pida a un compañero/a o mentor/a que le envíe los encabezados de un correo electrónico que haya recibido recientemente. Analice los encabezados del correo electrónico usando las mismas técnicas que se describieron en el ejercicio de práctica, incluso cargándolos en la herramienta [Google Admin Toolbox Message Header](https://toolbox.googleapps.com/apps/messageheader/). Luego, responda las preguntas 1, 2, 3 y 5 descritas en la [sección de investigación](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#investigation) del curso de análisis de encabezado de correo electrónico de Nebraska GenCyber, pero esta vez utilizando los encabezados del correo electrónico que encontró en lugar del correo electrónico adjunto al curso.

## Recursos de Aprendizaje

{{% resource title="¿Qué son los encabezados de correo electrónico?" description="Una buena introducción a los encabezados de correo electrónico.  Se destacan tres agrupaciones importantes de encabezados de correo electrónico.  Incluye una lista de guías paso a paso para diferentes MUA." languages="Inglés" cost="Gratis" url="https://mailtrap.io/blog/email-headers/" %}}

{{% resource title="Visualización de los encabezados de correo electrónico completos" description="Cómo ver los encabezados de correo electrónico en múltiples sistemas de correo electrónico (Gmail, Outlook, Apple Mail, Thunderbird, etc.)" languages="Múltiple" cost="Gratis" url="https://support.google.com/mail/answer/29436?hl=es" %}}

{{% resource title="Comprobar los encabezados SPF utilizando la herramienta dig" description="Esta recurso ofrece una guía rápida sobre cómo verificar los encabezados SPF utilizando dig, una herramienta instalada en la mayoría de los sistemas Unix-like." languages="Inglés" cost="Gratis" url="https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool" %}}

{{% resource title="Cómo comprobar y leer el registro Sender Policy Framework de un dominio" description="Este artículo muestra cómo comprobar los encabezados SPF utilizando nslookup, una herramienta alternativa a dig, y describe cómo interpretar los resultados." languages="Inglés" cost="Gratis" url="https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain" %}}

{{% resource title="Curso del equipo GenCyber de Nebraska sobre encabezados de correo electrónico" description="Un curso completo sobre cómo analizar los encabezados de correo electrónico al investigar posibles casos de phishing" languages="Inglés" cost="Gratis" url="https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers" %}}

{{% resource title="Los ejemplos de ejercicios para el curso anterior.:" description="Ejercicios alojados en GitHub" languages="Inglés" cost="Gratis" url="https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers" %}}

{{% resource title="Comprobación de encabezados de l correos electrónicos en Proton Mail" description="Una guía para revisar los encabezados de correo electrónico en Proton Mail." languages="Inglés" cost="Gratis" url="https://proton.me/support/check-email-headers" %}}

{{% resource title="Ver correo electrónico encabeçados en Zoho" description="Ver correo electrónico encabeçados en Zoho" languages="Inglés" cost="Gratis" url="https://www.zoho.com/mail/help/mail-options.html#alink1" %}}

{{% resource title="Herramienta para análisis de los encabezados de correo electrónico: MXToolbos" description="Enlazamos con un par de herramientas que pueden extraer y diseccionar encabezados de correo electrónico, cruciales para cualquier análisis de correos electrónicos potencialmente maliciosos." languages="Inglés" cost="Gratis" url="https://mxtoolbox.com/EmailHeaders.aspx" %}}

{{% resource title="Herramienta para análisis de los encabezados de correo electrónico: Keraattin" description="Enlazamos con un par de herramientas que pueden extraer y diseccionar encabezados de correo electrónico, cruciales para cualquier análisis de correos electrónicos potencialmente maliciosos." languages="Inglés" cost="Gratis" url="https://github.com/keraattin/EmailAnalyzer" %}}

{{% resource title="Herramienta para análisis de los encabezados de correo electrónico: Headmail" description="Enlazamos con un par de herramientas que pueden extraer y diseccionar encabezados de correo electrónico, cruciales para cualquier análisis de correos electrónicos potencialmente maliciosos." languages="Inglés" cost="Gratis" url="https://github.com/umair9747/headmail" %}}

{{% resource title="Herramienta para análisis de los encabezados de correo electrónico: Email Header Analyzer" description="Enlazamos con un par de herramientas que pueden extraer y diseccionar encabezados de correo electrónico, cruciales para cualquier análisis de correos electrónicos potencialmente maliciosos." languages="Inglés" cost="Gratis" url="https://github.com/cyberdefenders/email-header-analyzer" %}}

{{% resource title="Introducción a la suplantación de correo electrónico: Wikipedia" description="Introducción a la suplantación de identidad por correo electrónico" languages="Múltiple" cost="Gratis" url="https://es.wikipedia.org/wiki/Email_spoofing" %}}

{{% resource title="Introducción a la suplantación de correo electrónico" description="Introducción a la suplantación de identidad por correo electrónico: Sendgrid Docs" languages="Múltiple" cost="Gratis" url="https://docs.sendgrid.com/glossary/spoofing" %}}

{{% resource title="Introducción a la suplantación de correo electrónico: Fortinet" description="Introducción a la suplantación de identidad por correo electrónico" languages="Múltiple" cost="Gratis" url="https://www.fortinet.com/resources/cyberglossary/email-spoofing" %}}

{{% resource title="Evaluación de los encabezados 'Recibidos'" description="Cómo utilizar los encabezados del correo electrónico para encontrar el servidor que lo envió" languages="Inglés" cost="Gratis" url="https://www.techlicious.com/how-to/how-to-tell-if-email-has-been-spoofed/" %}}

{{% resource title="Análisis de encabezados 'Recibidos' potencialmente falsificados, recurso 1" description="Cómo identificar encabezados 'recibidos' falsos" languages="Inglés" cost="Gratis" url="https://luxsci.com/blog/analyzing-forged-email-message.html" %}}

{{% resource title="Análisis de encabezados 'Recibidos' potencialmente falsificados, recurso 2" description="Cómo identificar encabezados 'recibidos' falsos" languages="Inglés" cost="Gratis" url="https://www.linkedin.com/pulse/anatomy-phishing-email-whats-header-penelope-raquel-bise-" %}}

{{% resource title="Encontrar mensajes con Email Log Search" description="Describa cómo los administradores de cuentas comerciales y empresariales de Google pueden supervisar los registros de mensajes" languages="Inglés" cost="La documentación es gratuita, pero las herramientas sólo están disponibles para usuarios empresariales" url="https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA" %}}

{{% resource title="Supervisión, elaboración de informes y rastreo de mensajes en exchange Online" description="Describe cómo los administradores de cuentas empresariales de Microsoft pueden supervisar los registros de mensajes." languages="Inglés" cost="Documentación gratuita, herramientas sólo disponibles para usuarios de empresa" url="https://learn.microsoft.com/en-us/exchange/monitoring/monitoring" %}}
