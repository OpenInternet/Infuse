---
style: module
title: Respuesta - desmontaje de la infraestructura
description: En este módulo cubrimos la denuncia de abusos y otros mecanismos de
  navegación segura y de sumideros. Esto incluye ponerse en contacto con el
  proveedor de la infraestructura para informar sobre la presencia de elementos
  maliciosos para que puedan desmontarla.
weight: 9
---

## Estudio de caso

En los módulos anteriores, analizamos cómo se puede identificar la infraestructura que sirve contenido malicioso, ya sea spam, malware o phishing. Una vez que usted logrado identificar  con éxito, es hora de advertir a los demás al respecto. En este módulo, cubrimos **la denuncia de abusos y otros mecanismos seguros de navegación y sumideros**. Esto incluye ponerse en contacto con el proveedor de la infraestructura para informarle sobre la que son maliciosas y que puedan eliminarlas.

Combine este esfuerzo con actividades más amplias de respuesta a incidentes, incluido el intercambio de información sobre posibles amenazas y la comunicación con las comunidades que también pueden haber sido blanco de los ataques que se originan en la misma infraestructura.


## Objetivos

Después de completar esta subtarea, el profesional debe ser capaz de:

- Tener una comprensión básica de cómo funcionan los informes de abuso y las bases de datos;
- Identificar las bases de datos que contienen direcciones URL y dominios sospechosos de ser maliciosos;
- Solicitar datos desde esas bases de datos y escribirles;
- Identificar y denunciar abusos en proveedores de infraestructura más grandes.

---
## Sección Principal

### Informes de abuso en proveedores de servicios de alojamiento

Muchos casos de infraestructura maliciosa se ejecutan en los principales proveedores de servicios comerciales a los que les preocupa mantener la seguridad, la estabilidad, la reputación y la lucha contra las amenazas cibernéticas a sus sistemas. Los proveedores de servicios responsables ofrecen mecanismos eficaces de denuncia de abusos. La utilización de estos mecanismos puede conducir a un rápido desmontaje de la infraestructura activa.

Aprenda a localizar y utilizar estos mecanismos de denuncia de abusos. Los contactos para localizar e informar  abusos están disponibles a través de varios mecanismos:

- Los registros WHOIS de un dominio proporcionarán un correo electrónico y un número de teléfono de contacto para reportar abusos.
- Busque el contacto relevante para una IP determinada en [RIPEstat](https://stat.ripe.net/app/launchpad).
- Para una utilidad programática, consulte la página Abusix Abuse Contacts Databaseʼs [GettingStarted](https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee) que explica cómo utilizar una herramienta python o una simple búsqueda de host para obtener contactos que gestionan los reportes deabuso.
- Haga búsquedas web para obtener detalles de informes de abuso para otros tipos de proveedores de servicios que puedan no estar disponibles a través de los métodos anteriores, como el abuso en plataformas como [Twilio](https://www.twilio.com/help/abuse) y [Mailchimp](https://mailchimp.com/contact/abuse/).

Recuerde que puede haber varios proveedores de servicios implicados. Por ejemplo, en el caso de un phishing a una página de destino, el incidente se puede reportar tanto al proveedor del servicio de alojamiento web como al registrador de dominios.

Aprenda a escribir un informe sobre abusos con la información técnica que ha recopilado. Su informe debe incluir suficientes detalles para que el proveedor de servicios pueda identificar qué cuenta específica de su plataforma está sirviendo contenido malicioso. Pueden incluirse los aspectos siguientes:

- URL del contenido
- La dirección IP del anfitrión
- Cualquier otro identificador relevante para el servicio
- Cualquier archivo/imágenes del contenido
- Capturas de pantalla
- Encabezados de correo electrónico, si corresponde
- Análisis de seguridad positivos o indicadores de amenazas
- Detalles de cómo se está abusando del servicio/recurso

Cuando proporcione capturas de pantalla o archivos adjuntos, asegúrese de que no está poniendo compartiendo y poniendo en riesgo información confidencial suya o de sus clientes que sean objetivo del contenido malicioso.

Aunque es poco probable que los proveedores de servicios ofrezcan información adicional sobre la cuenta de usuario que sirve contenido malicioso, puede intentar solicitarla en caso de que sea útil para sus investigaciones.

En algunos casos, las empresas de servicios y tecnología de internet hacen un esfuerzo especial para coordinar con la sociedad civil los ataques dirigidos y pueden ofrecer apoyo adicional. Podría valer la pena trabajar con una organización miembro de [CiviCERT member](https://www.civicert.org/) para buscar un contacto en la empresa involucrada para obtener una respuesta más rápida y así poder avanzar en su investigación.

Tenga en cuenta que, en muchos casos, la infraestructura maliciosa está alojada en cuentas que han sido vulneradas o servidores de partes no relacionadas con el ataque (por ejemplo, una cuenta de Google vulnerada, un sitio web pirateado o un dispositivo infectado en un grupo de equipos (botnet).

Si busca inspiración sobre cómo escribir un mensaje de correo electrónico a un proveedor de infraestructura, consulte las siguientes plantillas creadas por la línea de ayuda de Access Now:

- Plantilla de correo electrónico [a un registrador de dominio malicioso](https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html)
- Plantilla de correo electrónico [a un proveedor de hosting](https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html)
- Plantilla de correo electrónico [a un cliente](https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html), pidiéndole permiso para compartir IOCs con la comunidad

### Navegación segura, sumideros y listas de bloqueo

Además de recurrir a contactos que gestionan abusivos para desmontar contenidos, existen diversos mecanismos para que se agreguen infraestructuras maliciosas u otros indicadores maliciosos a listas de bloqueo y bases de datos integradas en herramientas y servicios ampliamente utilizados.

El mismo principio se aplica a las redes sociales y las plataformas de mensajería, y se basan en los procedimientos de denuncia de abuso o contenido en esas plataformas (o servicios de seguridad complementarios).

Conozca algunas de estas listas de bloqueo, dónde están integradas y cómo informarlas, como:

- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_general/)
- [PhishTank](https://phishtank.org/)
- [Abuse IP DB](https://www.abuseipdb.com/)
- [Phishing Database](https://github.com/mitchellkrogza/Phishing.Database#additions) (enviar adiciones a través de GitHub)
- Las bases de datos de amenazas y de informes más específicas son ofrecidas por [abuse.ch](https://abuse.ch/) y requieren autenticación para poder enviarlas, como [URLhaus](https://urlhaus.abuse.ch/), [ThreatFox](https://threatfox.abuse.ch/), y [SSL Blacklist](https://sslbl.abuse.ch/).
- Denuncie el Phishing de Discord a [phish.gg_](https://docs.phish.gg/) (o adicione un servidor a su servicio).

## Practique

- Encuentre los contactos de abuso para 3 empresas de alojamiento web, incluida al menos una plataforma importante (use como AWS, GCP, Azure, Oracle Cloud y Alibaba Cloud). Busque cualquier información adicional que ofrezan sobre su proceso de denuncia incidentes de abuso.
- Investigue cómo funcionan las bases de datos sobre abusos y Google Safe Browsing. Enumere varias herramientas y servicios con los que están integrados.
- Cree su propio diagrama de flujo de respuesta a incidentes y una lista de verificación que contenga enlaces relevantes y acciones a tomar en caso de un incidente de infraestructura maliciosa en línea.

## Comprobación de habilidades

Trabaje con un mentor/a o compañero/a que tenga cierta experiencia en el desarme de infraestructuras maliciosas. Realicen juntos las siguientes tareas:

- Preparar todas las pruebas (direcciones IP, hashes, dominios y cualquier otra) que necesite para enviar un informe sobre un incidente de abuso. Si tiene un ejemplo de infraestructura maliciosa a mano, recopile esa información como prueba para esta infraestructura. Si no lo hace, recopile la evidencia de una página web legítima (pero sin enviar un informe de abuso, por supuesto). Analice las pruebas con su compañero/a o mentor/a, quien podrá verificar que ha recopilado las evidencias adecuadas y las ha documentado correctamente.
- Explicar cómo funcionan la navegación segura, la base de datos de abusos y los proveedores de listas de bloqueo. Si tiene un ejemplo de infraestructura maliciosa a mano, envíelo a dicha base de datos o proveedor. Si no lo hace, vaya a la página web del proveedor y haga una prueba del proceso de envío con su compañero/a o mentor/a (explique qué información prepararía, pero sin enviarla).
- Pedir a su mentor/a o compañero/a que enumere tres proveedores de alojamiento web, alojamiento en la nube y registradores, entre otros.  Para cada uno de ellos, encuentre el contacto de la persona que gestiona los incidentes de abuso o el mecanismo de denuncia correspondiente.
- Hablar con su mentor/a o compañero/a sobre los riesgos estratégicos y personales de iniciar el desmontaje, de revelar potencialmente los datos del cliente e indicar potencialmente a un atacante que su ataque está siendo examinado muy de cerca. Haga un borrador de un juego de roles en el que comunique estas consideraciones a la persona objetol del ataque.

## Recursos de Aprendizaje

{{% resource title="RIPEstat launchpad" description="Un servicio que le permite buscar y enumerar mecanismos relevantes de denuncia de abusos" languages="Inglés, Español, Árabe, Ruso, Francés, Farsi, Italiano, Turco" cost="Gratis" url="https://stat.ripe.net/app/launchpad" %}}
{{% resource title="Getting Started - Abusix" description="Una guía básica para la BD de Contacto de Abuso" languages="Inglés" cost="Gratis" url="https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee" %}}
{{% resource title="Informes de abuso de Twilio" description="Puede denunciar llamadas telefónicas o mensajes SMS no deseados de números de teléfono alojados en Twilio aquí." languages="Inglés" cost="Gratis" url="https://www.twilio.com/en-us/help/abuse" %}}
{{% resource title="Informes de abuso de Mailchimp" description="Puede denunciar cualquier abuso que tenga lugar en la plataforma de Mailchimp aquí." languages="Inglés" cost="Gratis" url="https://mailchimp.com/contact/abuse/" %}}

{{% resource title="CiviCERT" description="Una red de profesionales de seguridad digital que ayudan a la sociedad civil a abordar problemas de ciberseguridad." languages="Inglés" cost="Gratis" url="https://www.civicert.org/" %}}

{{% resource title="Plantillas de correos electrónicos que podríamos enviar para reportar actividad maliciosa: Registrar" description="Tres plantillas de correo electrónico para enviarlo que le permiten crear fácilmente un correo electrónico a un registrador de dominios, proveedor de hosting o un cliente para informarles sobre la presencia de una infraestructura maliciosa" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html" %}}

{{% resource title="Plantillas de correos electrónicos que podríamos enviar para reportar actividad maliciosa: Provedor de Hosting" description="Tres plantillas de correo electrónico que le permiten crear fácilmente un correo electrónico para enviarlo a un registrador de dominios, proveedor de hosting o a un cliente para informarles sobre la presencia de una infraestructura maliciosa" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html" %}}

{{% resource title="Plantillas de correos electrónicos que podríamos enviar para reportar actividad maliciosa: Cliente" description="Tres plantillas de correo electrónico que le permiten crear fácilmente un correo electrónico a un registrador de dominios, proveedor de hosting o un cliente para informarles sobre la presencia de una infraestructura maliciosa" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html" %}}

{{% resource title="Enviar un informe de SafeBrow sing" description="Aquí puede enviar informes de SafeBrowsing a una base de datos mantenida por Google que llega a una enorme cantidad de usuarios." languages="Inglés" cost="Gratis" url="https://safebrowsing.google.com/safebrowsing/report_general/" %}}

{{% resource title="PhishTank" description="Una lista colaborativa de envíos de sitios de phishing, permite a los usuarios buscar y enviar URLs" languages="Inglés" cost="Gratis" url="https://phishtank.org/" %}}

{{% resource title="AbusiveIP" description="Permite a los usuarios buscar direcciones IP de informes vinculados a comportamientos maliciosos" languages="Inglés" cost="Gratis" url="https://www.abuseipdb.com/" %}}

{{% resource title="Phishing Database" description="Otra base de datos colaborativa de dominios y enlaces sospechosos de phishing" languages="Inglés" cost="Gratis" url="https://github.com/mitchellkrogza/Phishing.Database#additions" %}}

{{% resource title="Abuse ch" description="Una plataforma impulsada por la comunidad que se centra en la inteligencia de amenazas con respecto al malware y botnets" languages="Inglés" cost="Gratis" url="https://abuse.ch/" %}}

{{% resource title="Documentación sobre Phish.gg" description="Un servicio donde puede denunciar phishing en servicios como Discord" languages="Inglés" cost="Gratis" url="https://docs.phish.gg/docs/get-started/welcome/" %}}
