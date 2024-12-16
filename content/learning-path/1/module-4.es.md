---
style: module
title: "Investigación Pasiva - Análisis de URL, los nombres de host y direcciones IP"
description: "Un profesional puede usar las habilidades descritas en este subtema para comenzar una investigación pasiva contra los servidores en Internet. Una investigación pasiva es aquella que no carga ningún sitio web, sino que solo busca datos disponibles públicamente en ellos. Como tal, el atacante no será alertado de que su sitio web recibió visitas adicionales, lo que podría indicarle que se está llevando a cabo una investigación."
weight: 4
---

## Estudios de caso

Un profesional puede usar las habilidades descritas en este subtema para **comenzar una investigación pasiva contra los servidores en Internet**. Una investigación pasiva es aquella que no carga ningún sitio web, sino que solo busca datos disponibles públicamente en ellos. Como tal, el atacante no será alertado de que su sitio web recibió visitas adicionales, lo que podría indicarle que se está llevando a cabo una investigación. Al evaluar la información de dominio e IP, un investigador puede trabajar para **generar información técnica enriquecida sobre el ataque, útil para la** educación de la comunidad, el intercambio de información sobre amenazas, el descubrimiento de la infraestructura de atacantes asociada y para colocar los ataques en el contexto de patrones de ataque más amplios.

Algunas de esas habilidades pueden ser necesarias como parte de un proceso de clasificación inicial, por ejemplo, para ayudar a un analista a decidir si un enlace es sospechoso. También resultarán muy útiles durante un análisis en profundidad de los encabezados de correo electrónico, que se describe en la siguiente sección.

## Objetivos

Después de completar esta subtarea, el profesional debe ser capaz de hacer lo siguiente:

- Comprender cómo está estructurada una URL;
- Comprender los tipos de registros DNS, WHOIS y la diferencia entre IPv4 e IPv6;
- Llevar a cabo un reconocimiento básico en los dominios;
- Reconocer proxies inversos comunes que protejan las direcciones IP de origen con fines de protección contra DDoS u optimización de la entrega de contenido, como CloudFlare, Akamai y Fastly;
- Descubrir subdominios fácilmente observables en el dominio.

---
## Sección Principal

La investigación pasiva utiliza herramientas y recursos de inteligencia de código abierto (OSINT) que pueden darnos muchos detalles sobre la huella digital de la infraestructura de ataque sin que un atacante se dé cuenta de que estamos investigando.

### Conocimiento Fundamental

Esta subtarea profundiza en los conceptos básicos de URL, DNS e IPv4/IPv6. Si se siente cómodo con esos conceptos, ¡excelente! Vaya y salte a la sección ‘flujos de trabajo’. De lo contrario, revise los documentos y recursos a continuación:

- Construcción de URL
  - Debería poder leer una URL y comprender el significado de sus partes, incluida la identificación del esquema, los subdominios, el dominio principal, los dominios de nivel superior y cualquier característica de identificación del itinerario o los parámetros en la URL. Si necesita repasar este conocimiento, [este documento de MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL).
- Reductores de URL
  - Algunos mensajes maliciosos pueden usar un reductor de URL para ocultar el enlace malicioso real. Si desea ver el destino final del enlace, puede utilizar un servicio en línea como [unshorten.me](https://unshorten.me/) para ver la URL completa. Tenga en cuenta, no obstante, que el hecho de no reducir una URL puede alertar al atacante de que está llevando a cabo una investigación y debe considerarse un análisis activo;
- DNS
  - [Introduction to Domain Name System](https://aws.amazon.com/route53/what-is-dns/)
  - [DNS record types](https://www.cloudflare.com/learning/dns/dns-records/)
  - WHOIS: Usted debe poder comprender cómo se crean y almacenan los registros WHOIS, leer un registro WHOIS, consultar el registro WHOIS para cualquier dominio. Si necesita más información al respecto, consulte [esta guía](https://www.domain.com/blog/what-is-whois-and-how-is-it-used/).
- IPv4/IPv6
  - ¿Qué es una dirección IPv4?

<https://bluecatnetworks.com/glossary/what-is-ipv4/>

- - Comprender las diferencias entre IPv4 e IPv6

[https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6](https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/)

- - Comprender las direcciones IP  
        <https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/>

● Además de las direcciones IP, es útil leer sobre los [números de puerto](https://www.techtarget.com/searchnetworking/definition/port-number).

### Flujo de trabajo: Herramientas y capacidades

Las investigaciones pasivas de IP/DNS se pueden dividir en varias categorías.

#### Obtener información esencial de IP/DNS

Una de las primeras cosas que debemos hacer en nuestra investigación es obtener información inicial sobre dominios y hosts. Varias herramientas y categorías de herramientas que pueden ayudar con eso.

- WHOIS

Los registros WHOIS son de acceso público y contienen información útil sobre un dominio. Aprenda a usar utilidades basadas en la web (por ejemplo, [ARIN whois](https://search.arin.net/rdap/) o[who.is](https://who.is/)) o [de línea de comandos](https://www.arin.net/resources/registry/whois/rws/cli/) para ver un registro WHOIS y aprender a leer la información del registrante (si se revela), el registrador, la fecha de registro y los servidores de nombres DNS que indican dónde están alojados los registros fidedignos para esa zona DNS.

WHOIS también se puede ejecutar en una dirección IP con el fin de averiguar la empresa responsable de la IP, por lo que potencialmente le indica la empresa de alojamiento que sirve a un sitio web.

- dig & host

**dig** es una herramienta de línea de comandos preinstalada o disponible para los principales sistemas operacionales. Permite buscar fácilmente (siga el [tutorial aquí](https://phoenixnap.com/kb/linux-dig-command-examples)) los registros DNS de cualquier dominio y distingue entre distintos tipos de registros. Si bien el tutorial vinculado contiene muchos elementos de sintaxis **dig**, los usos más comunes son buscar tipos de registros A y MX. dig es bastante popular entre los analistas, ya que es simple y fácil de automatizar. **host** (ver [enlace tutorial](https://www.geeksforgeeks.org/host-command-in-linux-with-examples/)) es una herramienta alternativa de línea de comandos que convierte rápidamente un nombre de host en una dirección IP con una sintaxis más simple. También hay muchas alternativas a dig con más funciones o mejor legibilidad, [como doggo](https://github.com/mr-karan/doggo).

Busque servidores de nombres proxy inversos de distribución de contenido comunes, como los ofrecidos por Akamai (por ejemplo, a1-64.akam.net), CloudFlare (por ejemplo, eve.ns.cloudflare.com), Fastly (por ejemplo, ns3.fastly.net), ya que ocultarán la IP real del servidor de origen. Si pasa algún tiempo buscando servidores de nombres, podrá reconocer fácilmente muchos de esos proxies. Si, por ejemplo, ejecuta el comando dig para buscar theguardian.com, verá que se resuelve en los servidores Fastly (al menos en el momento de escribir).  

- geoIP

Las direcciones IP están más o menos vinculadas a geografías físicas. Esto significa que, si conoce una dirección IP, [puede averiguar](https://www.maxmind.com/en/geoip-demo) (MaxMind GeoIP lookup demo linked)) con cierto grado de certeza en qué parte del mundo (país, región) se encuentra el dispositivo que utiliza esta dirección. Hay muchas bases de datos, conocidas como geoIP, que te permiten buscarlas. Tenga en cuenta que la precisión de las búsquedas basadas en IP puede ser extremadamente variada: a veces, es posible rastrear una dirección IP a una organización específica, mientras que en otras ocasiones solo se obtiene granularidad a nivel de país.

🛠️Tómese un momento para practicar el uso de estos servicios. Podría, por ejemplo, usarlos para buscar su sitio web o el de su organización.

#### Descubrimiento de información oculta de DNS/IP

Hay varias formas de obtener información adicional sobre los hosts de un dominio. Sin embargo, tenga en cuenta que la mayoría de esas técnicas solo funcionan una parte del tiempo y luego fallan. Si uno de ellos no funciona, no se desanime. Algunos de estos métodos incluyen:

- Uso de transferencias de zona DNS. Una característica (generalmente deshabilitada a través de Internet) de los servidores DNS autorizados es dar a conocer todo su conjunto de registros DNS para un dominio determinado. Su uso previsto es sincronizar los servidores de réplica con el servidor principal. Consulta [esta guía](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) sobre cómo usar dig y otras herramientas para descubrir subdominios basados en transferencias de zona DNS.
- Subdominios de fuerza bruta. Uno puede simplemente adivinar subdominios usando una lista de prefijos de subdominios comunes y pedirle al servidor DNS las direcciones IP de esos servidores. (por ejemplo, webmail.attacker.com, vpn.attacker.com, remoteaccess.attacker.com, etc.) Siempre que el servidor dé una respuesta NXDOMAIN (sin dicho dominio) para nombres de host inexistentes, se pueden encontrar dominios ocultos de esta manera. La [guía sobre la enumeración de subdominios](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) enlazada anteriormente también enumera algunas herramientas de fuerza bruta.
- Búsqueda inversa de direcciones IP adyacentes. Algunos servidores DNS te permitirán buscar el nombre de host para una dirección IP. Es común que la infraestructura autoalojada exista en un pequeño bloque de direcciones IP. En vista de ello, a veces es posible, dada la dirección IP de un nombre de host (por ejemplo, 127.0.0.5), buscar los nombres de host de las direcciones IP cercanas (por ejemplo, 127.0.0.1-127.0.0.254).

There exist tools that use these and other techniques to try to discover additional network resources. One of the first of these, still under development, is called [Fierce](https://www.kali.org/tools/fierce/). Another popular tool is [DNS Recon](https://securitytrails.com/blog/dnsrecon-tool). This [blog post describing DNSRecon](https://securitytrails.com/blog/dnsrecon-tool#content-alternatives-to-dnsrecon) also includes a list of other popular DNS enumeration tools.

#### Enriquecimiento de la información IP/DNS mediante los Servicios de Escáner de Internet

Una vez que haya obtenido la información del identificador (dominios e IP), puede buscar estos datos con mayor profundidad utilizando algunos servicios que te permiten investigar información adicional sobre el host y cualquier actividad asociada a su alrededor.

Aprenda a ver puertos abiertos, servicios activos y banners de servicio desde una IP determinada utilizando uno de los numerosos servicios de escaneo de inteligencia web. Tenga en cuenta que esta sigue siendo una técnica de investigación pasiva, ya que estos servicios escanean repetidamente la web en busca de sus conjuntos de datos y no iniciará una nueva actividad en la infraestructura de interés:

- Utilice [Censys Search](https://search.censys.io/) para observar puertos abiertos, servicios en ejecución, certificados TLS y más para una IP determinada.
- Utilice [Shodan](https://www.shodan.io/) (se requiere suscripción para algunas funciones y se requiere la utilización de filtros Shodan en las consultas, vea la [referencia](https://www.shodan.io/search/filters) y [los ejemplos](https://www.shodan.io/search/examples)) para buscar información sobre los servicios que se ejecutan en un servidor por dirección IP. Shodcan también puede buscar todos los servidores que ejecutan un servicio con un banner en particular.
- Utilice el [DNS Dumpster](https://dnsdumpster.com/) para buscar las posibles superficies de ataque de los servicios orientados a Internet.

Estos y otros servicios y bases de datos similares pueden ayudarle a identificar las actividades y el historial de un servidor/servicio específico.

Otros servicios de escáner también recopilan el **historial de DNS**, lo que le permite mirar hacia atrás en el tiempo para saber qué otras resoluciones de dominio han aparecido para una IP determinada, cuándo aparecieron/desaparecieron, así como subdominios para un dominio determinado.

- [Senderos de seguridad](https://securitytrails.com/)
- [Microsoft XDR](https://www.microsoft.com/es-es/security/business/siem-and-xdr/microsoft-defender-xdr) (anteriormente RiskIQ) proporciona historial de DNS limitado y datos de resoluciones a clientes de nivel gratuito.

#### Enriquecimiento de la información IP/DNS mediante bases de datos de inteligencia de amenazas

Varios servicios recopilarán indicadores de amenazas e historial de comportamiento malicioso. Si necesita asegurarse de que no se inicie una nueva actividad de escaneo (lo que sería una investigación activa), asegúrese de que no está iniciando un nuevo análisis con su búsqueda (por ejemplo, aunque VirusTotal le permite comprobar una URL, lanzará un nuevo escaneo contra la URL, iniciando así una actividad que podría ser detectada como una investigación).

- [Alienvault OTX](https://otx.alienvault.com/) es un recurso abierto impulsado por la comunidad para indicadores maliciosos. La búsqueda de una IP o un nombre de host mostrará información útil de OSINT, así como registros de cualquier actividad maliciosa obtenida previamente.
- [Mandiant Advantage](https://www.mandiant.com/multi-vendor-security-platform-free-access) (propiedad de Google) proporciona una funcionalidad de búsqueda limitada en su nivel gratuito.

#### Usando la búsqueda de certificados

En la actualidad, casi todos los sitios web que visita un usuario utilizan HTTPS, que emplea una tecnología conocida como TLS (Transport Layer Security). Los sitios web maliciosos también lo utilizan, en parte jugando con la creencia de los usuarios de que HTTPS y un candado que aparece en la barra de URL del navegador significa que el sitio web es por tanto seguro, independientemente de otros factores.

Como los certificados TLS deben estar firmados por una Autoridad de Certificación (CA) de confianza para que el navegador confíe en ellos, es posible que haya una cantidad sustancial de datos sobre el dominio disponibles para su investigación mientras busca infraestructura, subdominios, identificadores y otros activos compartidos.

Los datos enriquecidos de certificados están disponibles públicamente debido a la práctica de Transparencia de Certificados, en la que las Autoridades de certificación agregan todos los certificados emitidos a un registro público a prueba de manipulaciones. Puede ser útil comprender este sistema: consulte una breve descripción general en el [sitio web de Certificate Transparency](https://certificate.transparency.dev/) o profundice en su descripción técnica en [How CT Works](https://certificate.transparency.dev/howctworks/). Es útil para los alumnos que desean obtener más información sobre el rastreo y la detección de infraestructuras maliciosas tener una amplia comprensión de este sistema.

Hacer uso práctico de la búsqueda de certificados implica buscar dominios, subdominios, IP, identificar información interesante, como las fechas de emisión, y correlacionar la información que se encuentra en los certificados emitidos.

Lea la guía en [Certificados: The OSINT Gih that Keeps on Giving…](https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/) que describe los campos de investigación clave y las búsquedas utilizando Censys y Shodan, y vea el [video adjunto de 10 minutos en YouTube](https://www.youtube.com/watch?v=XHltHamQVoA) que lleva a cabo la misma búsqueda utilizando [crt.sh](https://crt.sh/). Es útil poder emplear las tres utilidades de búsqueda. En particular, asegúrese de comprender:

- ¿Cuáles son algunos de los campos 'interesantes' dentro de un certificado al realizar una investigación?
- Cómo buscar dentro de esos campos en las diversas plataformas
- Cómo identificar subdominios, direcciones IP de host y dominios alternativos emitidos para un certificado.

Tenga en cuenta que la sintaxis de la API de búsqueda de Censys cambió en 2021 y algunas de las búsquedas en los tutoriales anteriores no funcionarán. Por ejemplo, en lugar de “parsed.names:”simplemente use “names:” en la nueva sintaxis.

Se han creado muchas herramientas en torno a los registros de transparencia de certificados. Por ejemplo, intente enumerar los subdominios usando [MassDNS](https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains) (consulte las instrucciones para usar scripts/ct.py en la página READMe).

Censys ofrece más información sobre técnicas avanzadas para el rastreo y la búsqueda de actores de amenazas utilizando su plataforma en [Advanced Persistent Infrastructure Tracking](https://censys.com/advanced-persistent-infrastructure-tracking/).

**Aspectos a destacar**

- Cuando utiliza una herramienta como WHOIS, encontrará muchas direcciones ocultas detrás de Cloudflare o servicios similares. Esto significa que los administradores de esta dirección la alojan parcialmente utilizando un importante servicio de terceros, por ejemplo, para mantener un mayor anonimato o para protección contra DDoS. Del mismo modo, muchos dominios utilizan servicios de privacidad para asegurarse de que sus datos no aparezcan en WHOIS. Algunas personas también ponen datos falsos en WHOIS. Si este es el caso, analizar la dirección a través de WHOIS no arrojará mucha información buena (excepto tal vez para la fecha de creación del dominio) y deberá utilizar formas alternativas de análisis
- Muchas URL maliciosas utilizadas en correos electrónicos de phishing utilizan redireccionamientos (a veces múltiples), lo que significa que la URL inicial puede ser menos relevante para el análisis. La identificación de redireccionamientos y otras IP involucradas requerirá una interacción activa con la URL, que está cubierta en la habilidad de Investigación Activa.
- Los atacantes pueden alojar su propio servidor DNS y realizar un seguimiento de las solicitudes. En este caso, las solicitudes de DNS pueden no ser “pasivas” y pueden alertar al atacante de la investigación. Especialmente busque nombres de host que puedan tener identificadores, como r2378r233yr39wjwr.example.com..

## Practique

Elija un nombre de dominio aleatorio, asegurándose de que no está alojado detrás de un servicio de distribución de contenidos/proxy inverso como Cloudflare (puede averiguarlo buscándolo rápidamente con una herramienta como dig y utilizando la opción NS para buscar servidores de nombres). Utilizando las categorías de herramientas anteriores, investigue el dominio e intente explicarlo:

- ¿Dónde está registrado el dominio y, si está disponible, quién lo registró?
- ¿Cuál es la dirección IP del dominio?
- ¿Quién gestiona esa dirección IP?
- ¿Cuál es la dirección IP del dominio?
- (Si los profesionales tienen acceso a Shodan o Censys) ¿Qué servicios se están ejecutando en ese servidor?
- ¿Qué otros dominios están alojados en la misma IP?
- ¿Puedes encontrar algún subdominio para ese dominio?

## Comprobación de Habilidades

Siéntese con un compañero o un mentor que tenga una experiencia significativa en la investigación pasiva contra servidores en Internet. Entonces:

- Completa la [sala de reconocimiento pasivo](https://tryhackme.com/room/passiverecon) en TryHackMe.
- Realice los Ejercicios de Práctica anteriores, idealmente en un dominio diferente, y repase su proceso y hallazgos con su compañero o mentor. Pídales que revisen su trabajo y le den su opinión tanto sobre el proceso como sobre los resultados. Puede ser un buen ejercicio discutir específicamente cómo encontrar subdominios que se ejecutan en ese dominio y discutir la exactitud de las búsquedas geoIP relativas a esos dominios. Como extra opcional, siéntese con el mentor o compañero para revisar algunas configuraciones avanzadas de dig y configurar una automatización básica juntos, por ejemplo, pedirle a dig que cargue una lista de dominios de un archivo de texto y proporcione información sobre ellos.
- Si tiene un mensaje de phishing del mundo real (o, alternativamente, tome un dominio de phishing de [PhishTank](https://phishtank.org/) analícelo, tenga en cuenta que el sitio web recopila dominios en lugar de mensajes), lleve a cabo la investigación pasiva descrita en el ejercicio de práctica (¡con cuidado!) mientras consulta con un compañero o mentor. Documente sus hallazgos y su proceso. Pídales que revisen su trabajo y le den su opinión tanto sobre el proceso como sobre los resultados.

## Recursos de Aprendizaje

{{% resource title="¿Qué es una URL?" description="Una breve descripción de qué son las URL, cómo se construyen y qué características adicionales (anclajes y similares) pueden tener" languages="Chino, Inglés, Francés, Japonés, Coreano, Ruso, Español" cost="Gratis" url="https://developer.mozilla.org/es/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL" %}}
{{% resource title="Introducción al DNS" description="Resumen básico sobre el funcionamiento del DNS" languages="Vídeo en Inglés, texto en Vídeo en inglés, texto en Árabe, Bahasa Indonesio, Alemán, Español, Francés, Italiano, Portugués, Vietnamita, Turco, Ruso, Tailandés, Japonés, Coreano, Chino, Taiwanés" cost="Gratis" url="https://aws.amazon.com/es/route53/what-is-dns/?nc1=h_ls" %}}
{{% resource title="Resumen de los tipos de registros DNS" description="Incluye los tipos de registro más habituales y algunos menos comunes." languages="Inglés, Alemán, Español, Francés, Italiano, Japonés, Coreano, Portugués, Taiwanés, Mandarín" cost="Gratis" url="https://www.cloudflare.com/es-la/learning/dns/dns-records/" %}}
{{% resource title="Uso del comando dig" description="Cómo buscar información sobre direcciones IP" languages="Inglés" cost="Gratis" url="https://phoenixnap.com/kb/linux-dig-command-examples" %}}
{{% resource title="doggo" description="Una alternativa al comando dig, con una funcionalidad muy similar pero con un formato de salida diferente" languages="Inglés" cost="Gratis" url="https://github.com/mr-karan/doggo" %}}
{{% resource title="comando host en Linux con ejemplos" description="Una guía sobre cómo utilizar el comando host en Linux, otra herramienta de uso común para analizar servidores y otros tipos de infraestructura." languages="Inglés" cost="Gratis" url="https://www.geeksforgeeks.org/host-command-in-linux-with-examples/" %}}
{{% resource title="Further DNS reconnaissance, recurso 1" description="Varias herramientas para automatizar la búsqueda de servidores relacionados: DNSRecon" languages="Inglés" cost="Gratis" url="https://securitytrails.com/blog/dnsrecon-tool" %}}
{{% resource title="Further DNS reconnaissance, recurso 2" description="Varias herramientas para automatizar la búsqueda de servidores relacionados: Fierce" languages="Inglés" cost="Gratis" url="https://www.kali.org/tools/fierce/" %}}
{{% resource title="Further DNS reconnaissance, recurso 3" description="Varias herramientas para automatizar la búsqueda de servidores relacionados: Fierce" languages="Inglés" cost="Gratis" url="https://salsa.debian.org/pkg-security-team/fierce" %}}
{{% resource title="Further DNS reconnaissance, recurso 4" description="VirusTotal para buscar manualmente nombres de URL y servidores" languages="Inglés" cost="Gratis" url="https://docs.virustotal.com/docs/how-it-works" %}}
{{% resource title="GeoIP" description="Buscar la ubicación física (probable) de un servidor por dirección IP" languages="Inglés" cost="Gratis para cantidades limitadas" url="https://www.maxmind.com/en/geoip-demo" %}}
{{% resource title="whois/RDAP, recurso 1: ARIN Search" description="Muestra la información de propiedad de un dominio o dirección IP" languages="Inglés" cost="Gratis" url="https://who.is/" %}}
{{% resource title="whois/RDAP, recurso 2: ICANN Lookup" description="Muestra la información de propiedad de un dominio o dirección IP" languages="Múltiple" cost="Gratis" url="https://lookup.icann.org/es" %}}
{{% resource title="whois/RDAP, recurso 3: who.is" description="Muestra la información de propiedad de un dominio o dirección IP" languages="Inglés" cost="Gratis" url="https://who.is/" %}}
{{% resource title="Qué es whois y cómo se utiliza" description="Un breve resumen de qué es una base de datos whois y cuáles son sus posibles limitaciones" languages="Inglés" cost="Gratis" url="https://www.domain.com/blog/what-is-whois-and-how-is-it-used/" %}}
{{% resource title="La guía definitiva de la base de datos whois" description="Ofrece una mirada a lo que whois puede y (no puede) usar" languages="Inglés" cost="Gratis" url="https://domainnamestat.com/blog/the-ultimate-guide-to-the-whois-database" %}}
{{% resource title="¿Qué es una dirección IPv4?" description="Existen dos tipos de direcciones IP, IPv4 e IPv6.  Esta guía ofrece una introducción a las primeras" languages="Inglés" cost="Gratis" url="https://bluecatnetworks.com/glossary/what-is-ipv4/" %}}
{{% resource title="Diferencia entre IPv4 e IPv6" description="Describa las principales diferencias entre los dos tipos de direcciones IP" languages="Inglés" cost="Gratis" url="https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/" %}}
{{% resource title="Comprensión de las direcciones IP" description="Una rápida introducción a qué son las direcciones IP, cuáles son sus diferentes tipos" languages="Inglés" cost="Gratis" url="https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/" %}}
{{% resource title="¿Qué son los números de puerto y cómo funcionan?" description="Una rápida introducción a números de puerto, incluye una lista de algunos de los principales" languages="Inglés" cost="Gratis" url="https://www.techtarget.com/searchnetworking/definition/port-number" %}}
{{% resource title="Enumeración de subdominios: la guía definitiva" description="Una guía que contiene varias técnicas para enumerar (averiguar) qué subdominios contienen un dominio específico.  Vale la pena recordar que no todas las técnicas funcionarán en todos los dominios/servidores" languages="Inglés" cost="Gratis" url="https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/" %}}
{{% resource title="Servicios de inteligencia sobre amenazas con historial DNS: Security Trails" description="Estos servicios realizan escaneos de DNS y añaden historiales; los analistas que los utilizan pueden así ver si determinados sitios web o direcciones se movieron o cambiaron" languages="Inglés" cost="Gratuito con funciones Premium" url="https://securitytrails.com/"  %}}
{{% resource title="Servicios de inteligencia sobre amenazas con historial DNS: Microsoft XDR" description="Estos servicios realizan escaneos de DNS y añaden historiales; los analistas que los utilizan pueden así ver si determinados sitios web o direcciones se movieron o cambiaron" languages="Inglés" cost="Gratuito" url="https://www.microsoft.com/es-es/security/business/siem-and-xdr/microsoft-defender-xdr" %}}
{{% resource title="Alienvault OTX" description="Un servicio que recopila información sobre amenazas e indicadores presentados por la comunidad" languages="Inglés" cost="Gratis" url="https://otx.alienvault.com/" %}}
{{% resource title="Mandiant Advantage" description="Otro servicio de inteligencia sobre amenazas, actualmente propiedad de Google" languages="Inglés" cost="Algunas funciones están disponibles en la versión gratuita" url="https://www.mandiant.es/" %}}
{{% resource title="Shodan" description="Muestra información sobre los servicios que se ejecutan en un servidor a través de la dirección IP, también puede buscar todos los servidores que ejecutan un servicio con un banner determinado" languages="Inglés" cost="Gratis Nivel, Básico $49, Más volumen disponible como suscripciones mensuales" url="https://www.shodan.io/" %}}
{{% resource title="Censys Search" description="Una herramienta que puede observar puertos abiertos, servicios en ejecución, certificados TLS, etc. para una IP determinada." languages="Inglés" cost="Gratis" url="https://search.censys.io/" %}}
{{% resource title="DNS Dumpster" description="Herramienta utilizada para buscar las posibles superficies de ataque de los servicios orientados a Internet." languages="Inglés" cost="Gratis" url="https://dnsdumpster.com/" %}}
{{% resource title="DNS Checker" description="ʻSwiss Army Knivesʼ de búsquedas DNS e IP: permite diversas búsquedas rápidas en registros de dominio/DNS, IP y correo electrónico." languages="Inglés" cost="Gratis" url="https://dnschecker.org/all-tools.php" %}}
{{% resource title="MX ToolBox" description="ʻSwiss Army Knivesʼ de búsquedas DNS e IP: permite diversas búsquedas rápidas en registros de dominio/DNS, IP y correo electrónico." languages="Inglés" cost="Gratis" url="https://mxtoolbox.com/SuperTool.aspx" %}}
{{% resource title="Cómo funciona la transparencia de los certificados" description="Una rápida introducción a qué es la transparencia de los certificados, qué problemas aborda y cómo funciona" languages="Inglés" cost="Gratis" url="https://certificate.transparency.dev/howctworks/" %}}
{{% resource title="Certificados.: el OSINT Gih que sigue dando (Versión de texto)" description="Una guía para analistas sobre cómo usar herramientas como Shodan para buscar certificados y obtener buenos datos en los servidores web que están investigando" languages="Inglés" cost="Gratis" url="https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/" %}}
{{% resource title="Certificados.: el OSINT Gih que sigue dando (Versión en vídeo)" description="Una guía para analistas sobre cómo usar herramientas como Shodan para buscar certificados y obtener buenos datos en los servidores web que están investigando" languages="Inglés" cost="Gratis" url="https://www.youtube.com/watch?v=XHltHamQVoA" %}}
{{% resource title="crt.sh" description="Un motor de búsqueda que se centra específicamente en la búsqueda de certificados" languages="Inglés" cost="Gratis" url="https://crt.sh/" %}}
{{% resource title="masadns" description="Una herramienta que se puede utilizar para realizar búsquedas de subdominio por fuerza bruta" languages="Inglés" cost="Gratis" url="https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains" %}}
{{% resource title="Rastreo de infraestructuras persistentes avanzadas" description="Una guía sobre diversos métodos que podrían utilizarse para rastrear la infraestructura de los atacantes, que también examina la búsqueda de certificados" languages="Inglés" cost="Gratis" url="https://censys.com/advanced-persistent-infrastructure-tracking/" %}}
