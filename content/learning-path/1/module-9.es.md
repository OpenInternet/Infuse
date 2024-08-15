---
style: module
title: Respuesta - desmontaje de la infraestructura
description: Aquí, cubrimos la denuncia de abusos y otros mecanismos de navegación segura y de sumideros. Esto incluye ponerse en contacto con el proveedor de infraestructura para informar sobre la infraestructura maliciosa y poder eliminarla.
weight: 9
---

## Estudios de caso

En los subtemas anteriores, analizamos cómo puede identificar la infraestructura que sirve contenido malicioso, ya sea spam, malware o phishing. Una vez que lo haya hecho con éxito, es hora de advertir a los demás al respecto. En este subtema, cubrimos la denuncia de abusos y otros mecanismos seguros de navegación y sumideros. Esto incluye ponerse en contacto con el proveedor de la infraestructura para informar sobre algunas malintencionadas y poder eliminarlas.

Combine este esfuerzo con actividades más amplias de respuesta a incidentes, incluido el intercambio de amenazas y la comunicación con las comunidades que también pueden haber sido blanco de los ataques que se originan en la misma infraestructura.

## Objetivos

Después de completar esta subhabilidad, el profesional debe ser capaz de hacer lo siguiente:

- Tener una comprensión básica de cómo funcionan los informes de abuso y las bases de datos
- Identificar las bases de datos de abuso que muestran direcciones URL y dominios sospechosos de ser maliciosos
- Solicitar datos desde esas bases de datos y escribir en ellas
- Identificar y utilizar mecanismos de denuncia de abusos en proveedores de infraestructura más grandes

---
## Sección Principal

### Informes de abuso en proveedores de servicios de hosting

Muchos casos de infraestructura maliciosa se ejecutan en los principales proveedores de servicios comerciales preocupados por mantener la seguridad, la estabilidad, la reputación y la lucha contra las amenazas cibernéticas de sus sistemas. Los proveedores de servicios responsables ofrecen mecanismos eficaces de denuncia de abusos. La utilización de estos mecanismos puede conducir a un rápido desmontaje de la infraestructura activa.

Aprenda a localizar y utilizar estos mecanismos de denuncia de abusos. Los contactos de abuso están disponibles a través de numerosos mecanismos:

- Los registros WHOIS de un dominio proporcionarán un correo electrónico y un número de teléfono de contacto de abuso.
- Busque el contacto de abuso relevante para una IP determinada en [RIPEstat](https://stat.ripe.net/app/launchpad).
- Para una utilidad programática, consulte la página Abusix Abuse Contacts Databaseʼs [GettingStarted](https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee) que explica cómo utilizar una utilidad python o una simple búsqueda de host para obtener contactos de abuso.
- Utilice la búsqueda web para obtener detalles de informes de abuso para otros tipos de proveedores de servicios que pueden no estar disponibles a través de los métodos anteriores, como el abuso en plataformas como [Twilio](https://www.twilio.com/help/abuse) y [Mailchimp](https://mailchimp.com/contact/abuse/).

Recuerde que puede haber varios proveedores de servicios implicados. Por ejemplo, una página de destino de phishing se puede informar tanto al proveedor de alojamiento web como al registrador de dominios.

Aprenda a escribir un informe de abuso con la información técnica que ha recopilado. Su informe debe incluir suficientes detalles para que el proveedor de servicios pueda identificar qué cuenta específica de su plataforma está sirviendo contenido malicioso. Pueden incluirse los aspectos siguientes:

- URL del contenido
- IP de hosted
- Cualquier otro identificador relevante para el servicio
- Cualquier archivo/instantánea tomada del contenido
- Capturas de Pantalla
- Encabezados de correo electrónico, si corresponde
- Análisis de seguridad positivos o indicadores de amenazas
- Cómo se está abusando del servicio/recurso

Cuando proporcione capturas de pantalla o archivos adjuntos, asegúrese de que no está poniendo en peligro información confidencial suya o de sus clientes que sean objetivo del contenido malicioso.

Aunque es poco probable que los proveedores de servicios ofrezcan información adicional sobre la cuenta de usuario que perpetra contenido abusivo, puede intentar solicitar dicha información en caso de que sea útil para sus investigaciones.

En algunos casos, las empresas de servicios y tecnología de internet hacen un esfuerzo especial para coordinar con la sociedad civil los ataques dirigidos y pueden ofrecer apoyo adicional. Puede valer la pena trabajar con una organización miembro de [CiviCERT member](https://www.civicert.org/) para buscar un contacto en la empresa con fines de investigación y respuesta rápida acelerada.

Tenga en cuenta que, en muchos casos, la infraestructura maliciosa está alojada en cuentas comprometidas o servidores de partes no relacionadas con el ataque (por ejemplo, una cuenta de Google comprometida, un sitio web pirateado o un dispositivo infectado coordinado en una botnet).

Si está buscando inspiración sobre cómo escribir un mensaje de correo electrónico a un proveedor de infraestructura, consulte las siguientes plantillas creadas por la línea de ayuda de Access Now:

- Plantilla de correo electrónico [a un registrador de dominio malicioso](https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html)
- Plantilla de correo electrónico [a un proveedor de hosting](https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html)
- Plantilla de correo electrónico [a un cliente](https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html), pidiéndole permiso para compartir IOCs con la comunidad

### Navegación segura, sumideros y listas de bloqueo

Además de recurrir a contactos abusivos para desmontar contenidos, existen diversos mecanismos para que se agreguen infraestructuras maliciosas u otros indicadores maliciosos a listas de bloqueo y bases de datos integradas en herramientas y servicios ampliamente utilizados.

El mismo principio se aplica a las redes sociales y las plataformas de mensajería, y se basan en los procedimientos de denuncia de abuso o contenido en esas plataformas (o servicios de seguridad complementarios).

Conozca algunas de estas listas de bloqueo, dónde están integradas y cómo informarlas, como:

- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_general/)
- [PhishTank](https://phishtank.org/)
- [Abuse IP DB](https://www.abuseipdb.com/)
- [Phishing Database](https://github.com/mitchellkrogza/Phishing.Database#additions) (enviar adiciones a través de GitHub)
- Las bases de datos de amenazas y de informes más específicas son ofrecidas por [abuse.ch](https://abuse.ch/) y requieren autenticación para poder enviarlas, como [URLhaus](https://urlhaus.abuse.ch/), [ThreatFox](https://threatfox.abuse.ch/), y [SSL Blacklist](https://sslbl.abuse.ch/).
- Denuncie el Phishing de Discord a [phish.gg_](https://docs.phish.gg/) (o adicione un servidor a su servicio).

## Practique

- Encuentre los contactos de abuso para 3 empresas de alojamiento web, incluida al menos una plataforma importante (use como AWS, GCP, Azure, Oracle Cloud y Alibaba Cloud). Busque cualquier información adicional que ofrezan sobre su proceso de denuncia de abuso.
- Investigue cómo funcionan las bases de datos sobre abusos y Google Safe Browsing. Enumere varias herramientas y servicios con los que están integrados.
- Cree su propio diagrama de flujo de respuesta a incidentes y una lista de verificación que contenga enlaces relevantes y acciones a tomar en caso de un incidente de infraestructura maliciosa en línea.

## Comprobación de Habilidades

Trabaje con un mentor o compañero que tenga cierta experiencia en el desarme de infraestructuras maliciosas. Realice con ellos las siguientes tareas:

- Prepare toda la evidencia (direcciones IP, hashes, dominios y cualquier otra) que necesite para enviar un informe de abuso. Si tiene un ejemplo de infraestructura maliciosa a mano, recopile esa evidencia para esta infraestructura. Si no lo hace, recopile la evidencia de una página web legítima (pero sin enviar un informe de abuso, por supuesto). Discuta la evidencia con su compañero o mentor, quien verificará que ha recopilado las evidencias adecuadas y las ha documentado correctamente.
- Explique cómo funcionan la navegación segura, la base de datos de abusos y los proveedores de listas de bloqueo. Si tiene un ejemplo de infraestructura maliciosa a mano, envíelo a dicha base de datos o proveedor. Si no lo hace, vaya a la página web del proveedor y haga una prueba del proceso de envío con su compañero o mentor (explique qué información prepararía, sin enviarla).
- Pídale a su mentor o compañero que enumere tres proveedores de alojamiento web, proveedores de nube, registradores u otros proveedores de servicios. Para cada uno de ellos, encuentre el contacto de abuso o el mecanismo de denuncia correspondiente.
- Hable con su mentor o compañero sobre los riesgos estratégicos y personales de iniciar el desmontaje, revelar potencialmente los datos del cliente e indicar potencialmente a un atacante que su ataque está siendo examinado críticamente. Haga un borrador de un juego de rol en el que comunique estas consideraciones al objetivo del ataque.

## Recursos de Aprendizaje

{{% resource title="RIPEstat launchpad" description="Un servicio que le permite buscar y enumerar mecanismos relevantes de denuncia de abusos" languages="Inglés, Español, Árabe, Ruso, Francés, Farsi, Italiano, Turco" cost="Gratis" url="https://stat.ripe.net/app/launchpad" %}}
{{% resource title="Getting Started - Abusix" description="Una guía de inicio para la BD de Contacto de Abuso" languages="Inglés" cost="Gratis" url="https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee" %}}
{{% resource title="Informes de abuso de Twilio" description="Puede denunciar llamadas telefónicas o mensajes SMS no deseados de números de teléfono alojados en Twilio aquí." languages="Inglés" cost="Gratis" url="https://www.twilio.com/en-us/help/abuse" %}}
{{% resource title="Informes de abuso de Mailchimp" description="Puede denunciar cualquier abuso que tenga lugar en la plataforma de Mailchimp aquí." languages="Inglés" cost="Gratis" url="https://mailchimp.com/contact/abuse/" %}}
{{% resource title="CiviCERT" description="Una red de profesionales de seguridad que ayudan a la sociedad civil a abordar problemas de ciberseguridad." languages="Inglés" cost="Gratis" url="https://www.civicert.org/" %}}
{{% resource title="Plantillas de correos electrónicos que podríamos enviar para reportar actividad maliciosa: Registrar" description="Tres plantillas de correo electrónico que le permiten crear fácilmente un correo electrónico a un registrador de dominios, proveedor de hosting o un cliente para informarles sobre la presencia de una infraestructura maliciosa" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html" %}}
{{% resource title="Plantillas de correos electrónicos que podríamos enviar para reportar actividad maliciosa: Provedor de Hosting" description="Tres plantillas de correo electrónico que le permiten crear fácilmente un correo electrónico a un registrador de dominios, proveedor de hosting o un cliente para informarles sobre la presencia de una infraestructura maliciosa" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html" %}}
{{% resource title="Plantillas de correos electrónicos que podríamos enviar para reportar actividad maliciosa: Cliente" description="Tres plantillas de correo electrónico que le permiten crear fácilmente un correo electrónico a un registrador de dominios, proveedor de hosting o un cliente para informarles sobre la presencia de una infraestructura maliciosa" languages="Inglés" cost="Gratis" url="https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html" %}}

{{% resource title="Enviar un informe de SafeBrow sing" description="Aquí puede enviar informes de SafeBrowsing a una base de datos mantenida por Google que llega a una enorme cantidad de usuarios." languages="Inglés" cost="Gratis" url="https://safebrowsing.google.com/safebrowsing/report_general/" %}}
{{% resource title="PhishTank" description="Una lista colaborativa de envíos de sitios de phishing, permite a los usuarios buscar y enviar URL" languages="Inglés" cost="Gratis" url="https://phishtank.org/" %}}
{{% resource title="AbusiveIP" description="Permite a los usuarios buscar direcciones IP de informes vinculadas a comportamientos maliciosos" languages="Inglés" cost="Gratis" url="https://www.abuseipdb.com/" %}}
{{% resource title="Phishing Database" description="Otra base de datos colaborativa de dominios y enlaces sospechosos de phishing" languages="Inglés" cost="Gratis" url="https://github.com/mitchellkrogza/Phishing.Database#additions" %}}
{{% resource title="Abuse ch" description="Una plataforma impulsada por la comunidad que se centra en la inteligencia de amenazas con respecto al malware y botnets" languages="Inglés" cost="Gratis" url="https://abuse.ch/" %}}
{{% resource title="Documentación sobre Phish.gg" description="Un servicio donde puede denunciar phishing en servicios como Discord" languages="Inglés" cost="Gratis" url="https://docs.phish.gg/docs/get-started/welcome/" %}}