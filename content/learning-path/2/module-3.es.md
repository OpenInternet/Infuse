+++
style = "module"
weight = 3
title = "Cómo funciona el malware y los diferentes tipos de malware"
+++

## Caso de Uso

Para empezar a trabajar con malware, primero debemos conocer sus diferentes tipos. Virus, spyware, backdoors, ransomware y adware se comportan de manera diferente y se inspiran en diferentes motivaciones. Este conocimiento ayudará al protector a clasificar el tipo de malware detectado.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Diferenciar entre los varios tipos de malware.
- Comprender lo que puede hacer el malware.
- Comprender cómo comienzan las infecciones de malware.
- Describir qué son los indicadores de compromiso.

---
## Sección Principal

En general, el malware es cualquier software que se utiliza para realizar acciones no autorizadas en la computadora o dispositivo móvil de un usuario. Wikipedia tiene una buena [introducción al malware en general.](https://es.wikipedia.org/wiki/Malware)

### ¿Cómo funciona el malware?

El malware puede hacer cualquier cosa que cualquier software puede hacer, pero hay varias capacidades comunes que existe en el malware. Si bien algunos malware tienen un solo propósito, otros tendrán varias capacidades. Las capacidades utilizadas con frecuencia incluyen:

- Borrar o cifrar datos (ransomware). A menudo son dirigidos por atacantes con motivaciones financieras. Este malware tomará control de la computadora de la persona objetivo y le negará el acceso a sus datos hasta que se pague un rescate.
- Robo de datos. El malware puede enviar datos de forma selectiva o indiscriminada desde el dispositivo de la persona objetivo a una computadora controlada por el atacante. Se utiliza solo o junto con ransomware.
- Uso no autorizado de recursos. Los atacantes con motivaciones financieras utilizarán con frecuencia conjuntos de computadoras comprometidas para realizar acciones, como la minería de criptomonedas, enviar spam o realizar ataques de denegación de servicio.
- Secuestro del navegador web de un usuario. Algunos malware pueden insertar anuncios en páginas web mientras un usuario navega por la web, recaudando ingresos por publicidad. Otros pueden robar contraseñas o cookies de sesión (la cookie que te autentica al iniciar una sesión en tu cuenta), lo que permite a los atacantes acceder a las cuentas de la persona objetivo en los sitios web. Algunos malware ladrones extraen contraseñas, cookies y otros tipos de datos confidenciales de un dispositivo y luego los eliminan, intentando borrar cualquier rastro de la infección.
- Recopilación de la actividad del usuario. El malware más sofisticado intentará capturar las actividades de la persona objetivo, como grabar video o audio, capturar la escritura del usuario, registrar la localización de un dispositivo móvil, etc. Esto se utiliza a menudo para espionaje/vigilancia o extorsión.
- Control interactivo o seminteractivo. El malware más sofisticado tendrá capacidades de propósito general que le permitirá al atacante utilizar el dispositivo de la persona objetivo para actividades improvisadas. Un atacante puede enviar comandos generales a través de un servidor de comando y control o una conexión directa, y el malware ejecutará los comandos en el dispositivo de la persona objetivo y devolverá los resultados al atacante. Esto se utiliza a menudo contra objetivos de gran valor o para lanzar más ataques dentro de una red.

La lista anterior no es exhaustiva, pero describe las capacidades de malware más comunes. Para obtener una excelente visión general de los principales malware descubiertos en el año anterior, consulte la publicación del blog de Patrick Wardle en [The Mac Malware of 2023](https://objective-see.org/blog/blog_0x77.html). Si bien esta publicación describe muchos conceptos que cubriremos más adelante a lo largo de esta ruta de aprendizaje (como los escaneos de VirusTotal), es una fantástica introducción y visión general del mundo del malware.

Quizás una de las piezas de Malware más notoriamente capaz es el paquete Pegasus de NSO Group, que está diseñado específicamente para la vigilancia encubierta. Sus capacidades se enumeran en este [documento de ventas de NSO Group](https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html).

Recomendamos mucho la lectura del [Capítulo 5](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) de la Guía de Campo sobre respuesta a incidentes para la sociedad civil y medios para obtener una visión general temáticamente relevante del malware y conceptos relacionados, que incluyen:

- Ofuscación de código.
- Tipos de malware.
- Persistencia.
- Cadenas de infección.
- Comunicación de comando y control.
- Programas antivirus.
- Vulnerabilidades y exploits.

### ¿Cómo se infectan los dispositivos objetivo?

El malware tiene que llegar de alguna manera al dispositivo de la persona objetivo. Los métodos para hacerlo van desde engañar a los usuarios para que ejecuten software malicioso hasta la explotación de software y servicios vulnerables, incluidos los verdaderos ataques de 0-clics.

#### Métodos para infectar Windows, macOS y Linux

1. Ejecutar directamente (ejecución) programas maliciosos recibidos a través de ataques de ingeniería social.
    1. Phishing a través de correo electrónico, SMS, WhatsApp, etc.
    2. Malware disfrazado de software legítimo, como software pirateado.
    3. Malware copiado de memorias USB, etc.
2. Documentos que contienen malware incrustado, normalmente documentos heredados de Microsoft Office, pero también formatos como PDF, páginas web, etc.
3. Documentos y páginas web que aprovechan errores en el software para instalar malware. Estos eluden los controles integrados de seguridad en las aplicaciones y sistema operativo.
4. [Ataque “Sin clic”](https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html) (Gratis, Ingles) que no requieren ninguna interacción del usuario, pero permiten al atacante atacar directamente una aplicación o sistema operativo. Afectan tanto a los sistemas operativos de escritorio como a los móviles.

Una vez que se logra el comprometimiento inicial, la mayoría del malware pasará por [varias etapas de infección](https://community.fireeye.com/s/article/000002205) (Gratis, Inglés).

#### Métodos para infectar iOS y Android

Los sistemas operativos móviles tienen una arquitectura ligeramente diferente a los sistemas operativos de escritorio. Por lo general, están más asegurados y restringen el código que se puede ejecutar en ellos. Esto significa que el malware también tiene rutas y métodos de infección ligeramente diferentes. Verifica la sección de [arquitectura de sistemas de teléfonos inteligentes](https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture) de la Guía Forense Móvil para obtener una buena visión general.

Las configuraciones estándar de iOS y Android sólo permiten al usuario ejecutar software descargado de las tiendas de aplicaciones oficiales. El malware para esas plataformas se instala a través de dicha tienda de aplicaciones (lo que significa que no fue descubierto durante las auditorías de seguridad de Apple o Google) o explotando agujeros en iOS y Android que impiden la ejecución de código no autorizado. Alternativamente, algunos autores de malware también utilizan la ingeniería social para convencer a las personas objetivo a instalar perfiles maliciosos u otras configuraciones de dispositivos.

### Persistencia

Muchos de los malware que encuentras en tu trabajo serán persistentes o capaces de comenzar a ejecutarse automáticamente cada vez que la persona objetivo inicie sesión o reinicie su sistema. Cada sistema operativo tiene mecanismos que ejecutan automáticamente cierto software al iniciar sesión, en momentos programados o cuando sucede algo (por ejemplo, cuando se realiza una nueva conexión de red o se inicia un programa).

El malware puede utilizar una amplia gama de técnicas de persistencia; algunos de ellos son razonablemente simples (como agregarse a la lista de programas que se ejecutan automáticamente al iniciar sesión), mientras que otros son mucho más complejos y aprovechan los recursos especializados del sistema operativo. Si deseas obtener más información sobre ellos, consulta [este análisis a fondo del tema](https://github.com/Karneades/malware-persistence/blob/master/README.md) y [esta lista avanzada y completa](https://github.com/Karneades/awesome-malware-persistence) de técnicas de persistencia. Muchas de esas técnicas incluyen análisis avanzados que están ligeramente fuera del alcance de esta ruta de aprendizaje; al mismo tiempo, es buena idea que tengas una idea general de qué es la persistencia y qué mecanismos podrían utilizarse.

Algunos malware no buscarán la persistencia. En su lugar, se ejecutará, extraerá datos y luego desaparecerá después de cerrar sesión o reiniciar. Si los atacantes quieren volver a utilizar las capacidades del malware, simplemente lo reinstalan en el sistema de la persona objetivo. Si bien esto puede limitar el período durante el cual el malware está activo en un sistema y, por lo tanto, los datos que recopila, también hacen que el malware sea más difícil de detectar, ya que deja menos rastros en el sistema.

### Indicadores de Compromiso

En el proceso de instalación y realización de actividades maliciosas, el malware deja IoCs o Indicadores de Compromiso. Se utilizan con frecuencia para identificar piezas específicas de malware. Los IoCs podrían incluir hashes cifrados (los cubriremos más adelante en esta ruta de aprendizaje) que representan archivos ejecutables específicos, pero también pueden ser conexiones a servicios de red o tráfico de red privada, patrones de ejecución, etc.

Para obtener un breve resumen de qué son los IoCs y cómo podrían verse, [consulta las páginas 2-4](https://internews.org/wp-content/uploads/2024/12/Field-Guide-to-Incident-Response-for-Civil-Society-and-Media-Chapter-7-ES.pdf) (desde indicadores de compromiso hasta neutralización) de la Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios

Para una discusión extensa sobre los IoC y sus usos en la respuesta a incidentes, echa un vistazo a [este seminario web de CISA](https://www.youtube.com/watch?v=zs-AEaSd2vk) (inglés, 46 minutos).

Consulta los IoCs descritos en la página 52 [de este Informe de Amnistía](https://www.amnesty.org/en/documents/act10/7245/2023/ess/) un artículo sobre el poderoso spyware comercial: en su mayoría consisten en nombres de dominios que se utilizaron como infraestructura durante esta campaña de malware. Después de haber hecho eso, revisa [esta página](https://github.com/AmnestyTech/investigations), que recopila IoCs de varias investigaciones realizadas por Amnesty Tech.

Hay muchas maneras diferentes de detectar indicadores de compromiso. Incluyen revisar los registros de red para ver si algún dispositivo intentó contactar con un dominio específico y verificar si algún archivo en un dispositivo coincide con ciertos _hashes_. Si desea aprender un poco más sobre ellos, te recomendamos consultar los artículos de [Microsoft](https://www.microsoft.com/es-es/security/business/security-101/what-are-indicators-of-compromise-ioc) y [Fortinet](https://www.fortinet.com/resources/cyberglossary/indicators-of-compromise).

### Malware conocido versus malware desconocido

La gran mayoría de las infecciones de malware que encontrarás durante tu carrera habrán sido causadas por malware que la comunidad conoce. Esto significa que alguien más ya encontró este malware y compartió los IoCs o muestras de los mismos con motores de escaneo de malware. Aun así, los ciberdelincuentes continúan escribiendo nuevo malware y adaptando programas existentes. Por lo tanto, siempre existe una pequeña posibilidad de que los dispositivos que estás investigando estén infectados con malware que aún no ha sido documentado. Si te preocupa que este sea el caso, te recomendamos que consultes la Ruta de Aprendizaje sobre Análisis de Malware, la cual te guiará sobre cómo analizar muestras desconocidas para averiguar si son maliciosas.

Tampoco todo el malware que se ha identificado está ampliamente documentado. Muchas de las muestras que se pueden encontrar en sitios web como _MalwareBazaar_ pueden tener IoCs asociados y se sabe que son maliciosos, pero es posible que los analistas no hayan escrito qué hace exactamente ese malware. Si encuentras una muestra que otros marcaron como maliciosa pero que, no obstante, está poco documentada y te gustaría aprender más sobre cómo funciona y qué hace, sigue algunas de las guías en la ruta de aprendizaje del análisis.

## Práctica

Tómate un momento para revisar la lista de malware de Malware Bazaar’s [recientemente enviada](https://bazaar.abuse.ch/browse/). Lee las descripciones y los comentarios de varias muestras de malware y toma nota de la forma que toman, qué mecanismo de entrega utilizan, y afines. Algunas de las muestras de malware tienen comentarios adjuntos; revísalos también. Ten en cuenta que no todas las muestras de malware contendrán detalles como IoCs o mecanismos de entrega.

Ten en cuenta que Malware Bazaar también contiene algunos detalles, como _hashes_, que solo se cubrirán en fases posteriores de esta ruta de aprendizaje.

No descargues ninguna muestra en este momento. Simplemente echa un vistazo a las descripciones de las muestras, eso es suficiente en esta etapa.

## Verificación de habilidades

Trabajando con un colega o mentor, encuentra dos o tres informes que describan infecciones de malware para una plataforma de tu elección. Asegúrate de que esos informes incluyan IoCs. Si no puedes encontrar ningún informe, simplemente puedes leer uno de estos:

- [HotRat: Los Riesgos de las Descargas Ilegales de Software y del Script AutoHotkey Oculto](https://decoded.avast.io/martinchlumecky/hotrat-the-risks-of-illegal-software-downloads-and-hidden-autohotkey-script-within/)
- [Earth Preta utiliza Spear-Phishing para atacar Gobiernos en Todo el Mundo](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html)
- [Nuevo SugarGh0st RAT apunta al gobierno de Uzbekistán y Corea del Sur](https://blog.talosintelligence.com/new-sugargh0st-rat/)
- (este documento es largo, solo léelo detenidamente si se siente particularmente ambiciosa) [Amnesty Tech informe sobre Predator](https://www.amnesty.org/en/documents/act10/7245/2023/en/)

Responde las siguientes preguntas para uno de esos informes:

- ¿Qué hace este malware?
- ¿Cómo logra el malware llegar a un sistema? ¿Aprovecha un error existente para ser instalado? ¿Requiere intervención del usuario para instalarse?
- ¿Cuáles son los IoCs para este malware? ¿Qué medidas podríamos tomar para detectar esos IoCs en un sistema o red infectados?

Discute tus respuestas a todas esas preguntas con tu colega o mentor.

## Recursos Educativos

{{% resource title="Capítulo sobre malware en la Guía de Campo para Threat Labs (Capítulo 5)" description="Buena introducción al malware desde la perspectiva de un protector digital que necesita comprender" languages="Varios idiomas" cost="Gratis" url="https://internews.org/wp-content/uploads/2024/12/Field-Guide-to-Incident-Response-for-Civil-Society-and-Media-Chapter-7-ES.pdf" %}}
{{% resource title="Malware - Wikipedia" description="Una buena introducción básica al tema que explica algunos de los conceptos básicos y moderadamente avanzados necesarios" languages="Varios idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Malware" %}}
{{% resource title="El Malware para Mac de 2023" description="Una visión general importante del malware para macOS detectado en 2023. Incluye tipos de malware, vectores de infección, mecanismos de persistencia y objetivos." languages="Inglés" cost="Gratis" url="https://objective-see.org/blog/blog_0x77.html" %}}
{{% resource title="Documento de ventas de Pegasus de NSO group" description="Este documento filtrado describe algunas de las capacidades de Pegasus, un artículo sobre spyware dirigido a activistas de derechos humanos, entre otros. Ofrece una buena introducción a cómo se vende y comercializa el spyware" languages="Inglés" cost="Gratis" url="https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html" %}}
{{% resource title="Ataques sin clic (ataque sin clic) explicado" description="Describe qué es un zero-click attack, por qué los atacantes pueden estar tan interesados en usarlos y por qué son tan peligrosos" languages="Inglés" cost="Gratis" url="https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html" %}}
{{% resource title="Comprender los indicadores de compromiso para la respuesta a incidentes" description="Un vídeo de US CISA que ofrece una buena visión general y una introducción a IoCs y cómo podrían utilizarlos los respondientes a incidentes." languages="Inglés" cost="Gratis" url="https://www.youtube.com/watch?v=zs-AEaSd2vk" %}}
{{% resource title="Guía para la Prevención y el Manejo de Incidente de Malware para Computadoras de Escritorio y Portátiles" description="Una guía anterior (2013) del US NIST que cubre ampliamente el tema" languages="Inglés" cost="Gratis" url="https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-83r1.pdf" %}}
{{% resource title="Arquitectura de Sistemas de Teléfonos Inteligentes" description="Una mirada sobre cómo funcionan los sistemas operativos móviles y cómo el malware puede propagarse en ellos" languages="Inglés" cost="Gratis" url="https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture" %}}
{{% resource title="Los Archivos Predator" description="Una investigación de malware realizada por Amnesty Tech; incluye listas de IoCs en la página 52" languages="Inglés" cost="Gratis" url="https://www.amnesty.org/en/documents/act10/7245/2023/en/" %}}
{{% resource title="Indicadores de las investigaciones de Amnesty International's" description="Una lista de IoCs que Amnesty recopiló en el curso de sus investigaciones" languages="Ninguno (conjunto de datos)" cost="Gratis" url="https://github.com/AmnestyTech/investigations" %}}
{{% resource title="Microsoft Security: Indicadores de compromiso explicados" description="Un resumen de qué son los IoCs y qué formas podrían adoptar" languages="Inglés" cost="Gratis" url="https://www.microsoft.com/es-es/security/business/security-101/what-are-indicators-of-compromise-ioc" %}}
{{% resource title="Glosario de Fortinet: Indicadores de compromiso" description="Un resumen más, muy útil, de los IoCs" languages="Inglés" cost="Gratis" url="https://www.fortinet.com/resources/cyberglossary/indicators-of-compromise" %}}
{{% resource title="Ingeniería de Detección en Linux - Una introducción a los mecanismos de persistencia" languages="Español" cost="Gratis" description="Un recorrido sobre cómo los actores de amenazas establecen persistencia en sistemas Linux y cómo buscar estas técnicas." url="https://www.elastic.co/security-labs/primer-on-persistence-mechanisms" %}}
