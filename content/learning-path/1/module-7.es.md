---
style: module
title: Investigación activa - Análisis de páginas web maliciosas
description: Los correos electrónicos de phishing suelen ser solo el primer paso
  en un ataque. La mayoría intenta que la persona objetivo visite una página web
  con el propósito específico de atacar. Este módulo de habilidades le enseñará
  a observar los sitios web controlados por atacantes para comprender sus
  acciones y descubrir potencialmente más infraestructura controlada por ellos o
  vectores empleados en los ataques.
weight: 7
---
## Estudio de caso

Los correos electrónicos de phishing suelen ser solo el primer paso en un ataque. La mayoría intenta que la persona objetivo visite una página web con el propósito específico de atacar. Este módulo de habilidades le enseñará a **observar los sitios web controlados por atacantes para comprender sus acciones** y **potencialmente descubrir más infraestructura controlada por ellos** o vectores empleados en los ataques. Tenga en cuenta que los sitios web pueden ser extremadamente complicados, con comportamientos que van desde simples páginas de suplantación de credenciales hasta ataques complejos contra el navegador web o el propio dispositivo de navegación.

Interactuar con sitios web maliciosos puede poner en riesgo al propio analista. Asegúrese de configurar y utilizar un entorno aislado (consulte el módulo 3), así como de recopilar y almacenar de forma segura todas las páginas web. Por último, esta habilidad se entrecruza con la ruta de aprendizaje del Análisis de Malware.

## Objetivos

Después de completar este módulo, el profesional debe ser capaz de:

* Analizar sitios web propiedad de los atacantes examinando su código fuente mediante las funciones de inspección de los navegadores web y, opcionalmente, utilizando herramientas como proxies de interceptación o depuradores de JavaScript.
* Averiguar a qué otras infraestructuras podrían conectarse estos sitios web buscando URL, redireccionamientos, dominios enlazados, etc

- - -

## Sección Principal

### Conocimiento Fundamental

Este módulo será considerablemente más fácil de practicar si conoce los conceptos básicos de JavaScript y HTML, aunque esto no es un requisito previo estrictamente necesario.

Vale la pena destacar algunas diferencias básicas entre un correo electrónico y una página web:

* Las páginas web pueden ser dinámicas, por lo que el servidor puede generar una página web diferente en función de variables como la dirección IP del solicitante, el tipo de navegador, la hora del día y muchas otras.
* Los navegadores web procesarán más tipos de HTML que los lectores de correo electrónico, con menos protecciones. Lo más importante es que los navegadores web ejecutarán JavaScript, algo que los proveedores de correo electrónico no hacen.
* Los correos electrónicos HTML se generan cuando se envía el correo; la acción es iniciada por el atacante. Con las páginas web, la acción es iniciada por el visitante. Cuando vea una página web maliciosa, el atacante siempre puede estar al tanto de sus acciones. Si bien mecanismos como las VPN o Tor podrían evitar que el administrador de la página web vea su dirección IP, el sitio en sí podría contener referencias vinculadas al correo electrónico de phishing o haber sido personalizado para cada destinatario. De esa manera, el atacante sabrá con un alto grado de certeza, que solo aquellas personas que tuvieron acceso al correo electrónico de phishing visitarían la página web.

Por ello, recomendamos analizar las páginas web únicamente en un entorno seguro, diseñado específicamente para abrir archivos potencialmente sospechosos, como una máquina virtual o un *sandbox*. Además, recomendamos analizar el modelo de amenaza específico para el destinatario del correo con el fin de garantizar que es seguro para ellos y para usted realizar una actividad de análisis adicional que podría ser visible para el atacante.

### Estudio de casos

Lea estos dos estudios de caso que analizan los ataques de phishing dirigidos a grupos de la sociedad civil. Ambos ataques tuvieron un éxito parcial:

* Human Rights Watch: [Iran: Jaqueo, respaldado por el estado, de activistas, periodistas, políticos](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) (La sección introductoria es un contexto útil sobre las tácticas y motivaciones de los atacantes; sin embargo, con fines de aprendizaje concéntrese en la *sección Análisis Técnico de la Campaña de Phishing*.)
* Bellingcat: [Guccifer Rising? Campaña de Phishing de un Mes de Duración en ProtonMail Dirigida a Docenas de Periodistas y ONG Centradas en Rusia](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/)

En el [estudio de caso de HRW](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) anterior, observe algunas características clave del análisis utilizado en cada investigación. Algunos de estos requieren habilidades técnicas, mientras que otros requieren investigación, pensamiento crítico y habilidades interpersonales. Algunos de los métodos identificados en el estudio de caso incluyen:

* Los atacantes utilizaron un servicio de acortador de URL. Esto es común tanto para correos electrónicos legítimos como ilegítimos.  Usted debe ser capaz de reconocerlos y ser consciente de las formas de expandir estas URLs cuando sea posible (por ejemplo, utilizando el mecanismo incorporado del acortador, como añadir un + al final de la URL, o utilizando una herramienta de expansión como [Urlex](https://urlex.org/)) o rastrear las etapas de las redirecciones HTTP. Sin embargo, el atacante creó su propio servicio para acortar URLs que suplantó (mediante un pequeño cambio de escritura en el dominio) a otro acortador de URL conocido.
* Se registraron varios dominios destinados a confundir al objetivo (por ejemplo, sharefilesonline\[.]live, que juega con los nombres de los productos SharePoint y Live.com de Microsoft).
* Enlaces únicos enviados a objetivos individuales con un identificador de cinco caracteres (esto podría conseguirse mediante cualquier cadena única en una URL, normalmente dentro del trayecto de la URL o pasada en un parámetro por ejemplo después de un ʻ?ʼ).
* Ponerse en contacto con otros posibles objetivos de la misma campaña para compartir información sobre amenazas y comprender mejor las técnicas del adversario. Se hicieron pasar por proveedores de correo electrónico populares y utilizaron un *kit* de phishing que permite técnicas de derivación de la MFA.
* Ponerse en contacto con otros posibles objetivos de la misma campaña para compartir información de inteligencia sobre amenazas y comprender mejor las técnicas del adversario.
* Los atacantes utilizaron tácticas como acceder a los datos y usar [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) (una herramienta que permite a los usuarios descargar todos los datos de su cuenta de Google).
* Los autores del informe examinaron el historial de Google Takeout y otros registros de las personas objetivo. Esto ayudó a revelar la actividad posterior al ataque, el nombre del dispositivo que accede a los datos y la IP de una posible conexión doméstica del atacante.
* Los autores también señalaron otros trabajos de investigación y atribución que realizaron:

  * Se refirieron a la investigación de grupos de inteligencia de amenazas en grupos de amenazas persistentes avanzadas (APT) (consulte y marque esta [APT Group and Operations](https://docs.google.com/spreadsheets/d/1H9_xaxQHpWaa4O_Son4Gx0YOIzlcBWMsdvePFX68EKU/htmlview) Google Sheet).
  * Revisaron el código fuente para identificar bloques de código reutilizados o similares en amenazas previamente investigadas.
  * Escribieron sobre otras tácticas de los atacantes, como hacerse pasar por organizadores de conferencias/cumbres o figuras clave de ONG.
* Por último, el informe también comparte indicadores técnicos de compromiso.

### Inspección automatizada en *sandbox* de un sitio web

El primer paso cuando esté listo para inspeccionar un sitio web enlazado desde un mensaje de phishing es examinar el sitio web de forma segura. Esto implica cierto grado de interacción con el sitio web. Para manipular un sitio web potencialmente malicioso, debe tomar precauciones que le permitan trabajar en un entorno seguro, como se explica en el módulo 3. Sin embargo, también puede utilizar herramientas en línea para inspeccionar un sitio web en una sandbox remota segura:

* 🧰 Herramientas [UrlScan](https://urlscan.io/) permiten la realización de un escaneo de una URL. Tenga en cuenta algunas de las características clave y las habilidades necesarias para interpretar los resultados:

  * Cuando ejecute un análisis, elija Public, Unlisted o Private. Lea su [explicación](https://urlscan.io/docs/api/) de la diferencia, pero sepa que un escaneo público (la opción predeterminada) mostrará la URL en su portada.
  * Imagen en vivo del sitio web (este puede ser el primer paso de una clasificación simple si el modelo de amenaza le permite iniciar esta exploración)
  * Información de dominio e IP
  * Recursos cargados, incluidos scripts y AJAX (pestaña HTTP)
  * Elementos dinámicos, cookies, variables (pestaña Comportamiento)
  * Redirecciones (si las hay)
  * Indicadores como dominios, IP, cadenas, hashes (pestaña Indicadores)

    * Un *hash* es como una huella digital corta de un archivo: se puede utilizar para identificar un archivo único sin revelar su contenido. Puede calcular un hash utilizando [la línea de comando en Windows, macOS y Linux](https://techdocs.akamai.com/download-ctr/docs/verify-checksum).
  * Contenido tales como formularios (pestaña Contenido)
  * Tecnologías utilizadas (tales como un CMS)
  * Veredictos (en caso de que otros hayan marcado la URL como maliciosa)
  * Botón de búsqueda para comprobar el sitio en otros motores de análisis
* 🧰[Análisis Híbrido](https://www.hybrid-analysis.com/) es una *sandbox* alojada que puede cargar una página web dentro de un entorno de prueba y hacer coincidir el comportamiento del sitio web con varias heurísticas de actividad maliciosa y verificar los indicadores internos contra amenazas conocidas. Tenga en cuenta algunas de las características clave y las habilidades necesarias para interpretar los resultados:

  * Al enviar una URL, seleccione el entorno que se utilizará como sandbox. En caso de que seleccione 'Escaneo Rápido', no se llevará a cabo una ejecución completa de la *sandbox*, sino más bien un conjunto más pequeño de análisis estáticos y comprobaciones de indicadores.
* [VirusTotal_](https://www.virustotal.com/) también puede verificar una URL en busca de contenido malicioso. Tenga en cuenta que el análisis híbrido incluye búsquedas de VirusTotal. Considere  más problemas para determinar su calificación.

Preste atención al hecho de que una aplicación web sofisticada podría detectar si una solicitud proviene de los rangos de IP de estas herramientas. Podría entonces servir datos diferentes o ninguno y  contenido malicioso a otras IP.

### Manual y herramientas específicas para la inspección de un sitio web

Una de las formas más sencillas de analizar un sitio web es [utilizar la herramienta de inspección incorporada en nuestro navegador](https://blog.hubspot.com/website/how-to-inspect), Esta herramienta suele dividir el sitio en diferentes partes. A veces puede mostrar qué código solicita el sitio web y a qué servidor; también permite modificar el código del sitio y ver cómo cambia el diseño y la funcionalidad.

#### Fuerza bruta

Al igual que en el informe de Human Rights Watch presentado anteriormente, el uso de enfoques programáticos para las URLs de fuerza bruta es una técnica de uso común en OSINT. Varias herramientas y enfoques incluyen:

* OWASP [DirBuster](https://gitlab.com/kalilinux/packages/dirbuster)
* Generadores de listas de palabras: se usan con frecuencia para descifrar contraseña., Estas listas también se emplean para descubrir por fuerza bruta carpetas y subdominios. Estas listas de palabras funcionarán junto a las herramientas enumeradas en el punto anterior. Ver herramientas como Crunch ([Tutorial 1](https://www.hackers-arise.com/post/creating-a-custom-wordlist-with-crunch) | [Tutorial 2](https://null-byte.wonderhowto.com/how-to/tutorial-create-wordlists-with-crunch-0165931/))

#### Análisis del kit de phishing

La mayoría de los ataques que encontrará usarán un kit de phishing prefabricado o modificado, una colección de código y plantillas que permiten a los atacantes crear fácilmente un sitio web de phishing convincente. Algunos kits de phishing tienen signos reveladores; muchos de ellos, por ejemplo, utilizan ciertos mecanismos para evitar ser [detectados e indexados por los motores de búsqueda](https://arxiv.org/pdf/2210.08273.pdf). Incluso pueden negarse a cargar desde las [direcciones IP de los motores de búsqueda o las empresas de seguridad](https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html).

Algunos kits de phishing también tienen la capacidad de eludir la autenticación de múltiples factores, por ejemplo capturando un código que una persona objetivo tecleó e inmediatamente usándolo para iniciar una sesión en la página web real en su nombre. [Este artículo explica](https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/) cómo un kit de phishing de código abierto utilizado por los equipos de seguridad puede capturar y usar datos de autenticación de dos factores (y qué se podría hacer para evitarlo). También puede [consultar otro informe de un kit de phishing](https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/), esta vez escrito por ciberdelincuentes, que utilizaba algunas técnicas fascinantes y de derivación (bypass) de MFA para frustrar la detección.

## Practique

* [Lea](https://www.linkedin.com/pulse/security-analyst-skills-pt-1-qualifying-domains-craig-smith) el siguiente artículo, que muestra cómo usar urlscan.io para analizar una página. Realice las mismas búsquedas y análisis contenidas en el artículo, y piense cómo el autor llegó a las conclusiones finales.
* [Revise un segundo análisis](https://www.linkedin.com/pulse/security-analyst-skills-pt-2-techniques-analyzing-web-craig-smith) del mismo autor. Siga los enlaces a VirusTotal, UrlScan y Hybrid Analysis, y vea si entiende cómo el autor llegó a sus conclusiones.


## Comprobación de habilidades

Complete esta sala con TryHackMe: [Recorrido por una Aplicación](https://tryhackme.com/room/walkinganapplication)

* Revise la [tarea dos](https://tryhackme.com/room/activerecon) en esta sala TryHackMe.
* Analice un sitio web malicioso (por ejemplo, un dominio que aparece en [PhishTank](https://phishtank.org/)) utilizando una combinación de análisis pasivo y activo, asegurándose de hacer el análisis activo en un entorno aislado (*sandbox*) o utilizando una herramienta como UrlScan. Responda las siguientes preguntas sobre el sitio y comparta sus respuestas a las preguntas anteriores con un compañero/a o un mentor/a:
  * ¿Quién es el propietario de la infraestructura que sirve al sitio web?
  * ¿Qué otros dominios cargan o enlaza esta carga lateral? ¿Qué hacen?
  * ¿Cuándo se registró este dominio?
  * (opcional) ¿Qué software se está utilizando para atender el sitio?
  * ¿Otros han clasificado el sitio como malicioso?

## Recursos de Aprendizaje

{{% resource title="Iran: Jaqueo, respaldado por el Estado, de Activistas, Periodistas y Políticos" description="Un buen artículo de análisis sobre una campaña de phishing altamente sofisticada dirigida a grupos de la sociedad civil. Incluye extensas discusiones sobre infraestructura y atribución." languages="Inglés" cost="Gratis" url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}
{{% resource title="¿Guccifer Rising? Campaña de phishing de meses de duración en ProtonMail está dirigida a docenas de periodistas y ONG de Rusia" description="Un informe de una campaña de phishing anterior dirigida específicamente a grupos civiles que trabajan temas relacionados con Rusia. El ataque en sí incluía un bypass (derivación) de MFA." languages="Inglés" cost="Gratis" url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}
{{% resource title="VirusTotal" description="Una herramienta para evaluar URL y archivos adjuntos en busca de contenido malicioso conocido. Tenga en cuenta que otros usuarios pueden acceder a las URL y los archivos enviados." languages="Ingles" cost="Gratis, con algunas limitaciones de tarifa y funciones profesionales adicionales" url="https://www.virustotal.com/gui/home/url" %}}
{{% resource title="UrlScan" description="Una herramienta en la que se introduce una URL y que analiza el sitio web resultante en busca de malware u otros comportamientos sospechosos." languages="Ingles" cost="Gratis, con funciones premium adicionales" url="https://urlscan.io/" %}}
{{% resource title="Análisis híbrido" description="Una herramienta que puede escanear archivos y enlaces en busca de contenido o comportamiento malicioso. A diferencia de UrlScan, también puede abrir muestras de malware o archivos ejecutables." languages="Ingles" cost="Gratis" url="https://www.hybrid-analysis.com/" %}}
{{% resource title="Learn JavaScript" description="Además de HTML, la mayoría de las páginas web utilizan JavaScript. Aunque no hace falta ser un experto, aprender algo de JavaScript es importante para entender lo que hacen los sitios web." languages="Ingles" cost="Gratis" url="https://www.codecademy.com/learn/introduction-to-javascript" %}}
{{% resource title="Cómo utilizar Inspect Element en Chrome, Safari y Firefox" description="Los principales navegadores web disponen de una función de inspeccón de elementos, la cual permite estudiar y modificar cuidadosamente los componentes de código que conforman una página web. Este artículo ofrece un breve resumen de esa función (aunque la documentación de cada navegador será aún más exhaustiva) y muestra cómo activarla en los principales navegadores." languages="Inglés" cost="Gratis" url="https://blog.hubspot.com/website/how-to-inspect" %}}
{{% resource title="Ejemplos de análisis de sitios web maliciosos, recurso 1" description="Una buena guía sobre cómo hacer un análisis inicial y clasificación de un sitio web para averiguar si es malicioso y ha sido etiquetado por otros como tal." languages="Inglés" cost="Gratis" url="https://infosecwriteups.com/analyzing-a-malicious-site-9fb8730be51b" %}}
{{% resource title="Ejemplos de análisis de sitios web maliciosos, recurso 2" description="Una buena guía sobre cómo hacer un análisis inicial y clasificación de un sitio web para averiguar si es malicioso y ha sido etiquetado por otros como tal." languages="Inglés" cost="Gratis" url="https://www.linkedin.com/pulse/security-analyst-skills-pt-2-techniques-analyzing-web-craig-smith" %}}
{{% resource title="Clasificación de los kits de Phishing web para su detección precoz por los proveedores de plataformas" description="Un artículo académico que analiza los kits de phishing, qué mecanismos utilizan algunos de ellos y cómo podemos utilizar herramientas como el aprendizaje automático para detectarlos." languages="Inglés" cost="Gratis" url="https://arxiv.org/pdf/2210.08273.pdf" %}}
{{% resource title="Protección de páginas phishing mediante .htaccess" description="Hay muchas formas en las cuales las páginas de phishing pueden evitar ser detectadas. Una de ellas es utilizar .htaccess, un archivo que contiene instrucciones para servidores web, a fin de incluir o excluir rangos de IP específicos." languages="Inglés" cost="Gratis" url="https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html" %}}
{{% resource title="StalkPhish" description="Una herramienta diseñada para automatizar el descubrimiento y la identificación de kits de phishing" languages="Inglés" cost="Gratis" url="https://github.com/t4d/StalkPhish" %}}
{{% resource title="Eludir la AMF: Una Mirada Forense al Kit de Phishing Evilginx2" description="Este artículo analiza un kit de phishing que ha encontrado una manera de eludir algunas formas de AMF y proporciona un análisis básico de cómo lo hace y qué medidas de mitigación podríamos tomar." languages="Inglés" cost="Gratis" url="https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/" %}}
{{% resource title="El kit de phishing W3LL secuestra miles de cuentas de Microsoft 365 y evita el MFA" description="Este recurso analiza un kit de phishing diseñado y vendido por ciberdelincuentes. Contiene múltiples mecanismos que frustran el análisis, además de utilizar técnicas de derivación (bypass) MFA." languages="Inglés" cost="Gratis" url="https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/" %}}
