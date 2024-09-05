+++
style = "module"
weight = 5
title = "Crear y compartir IoC"
description = "Analizamos cómo puede crear y compartir indicadores de compromiso (IoC) e informar a otros en la comunidad sobre el malware que encontró o analizó."
+++

## Caso práctico

Una vez que hayas analizado un malware, puedes ayudar a la comunidad (y también a ti mismo y al resto del mundo) compartiendo tus hallazgos. El malware novedoso es bastante raro y, una vez utilizado, tiende a reutilizarse ampliamente. Al compartir sus hallazgos, puede ayudar a todos de varias maneras:

- Si un miembro de la comunidad ha sido atacado por un actor de amenazas, es muy posible que el actor de amenazas esté atacando a otros miembros de la comunidad. Al compartir sus hallazgos, puede ayudar a crear conciencia y, con suerte, ayudar a los defensores digitales a prevenir o mitigar otros ataques.
- Analizar una nueva pieza de malware es un logro significativo. Debes estar orgulloso de ello y también ser recompensado por tus esfuerzos. Al compartir su proceso y hallazgos, es más probable que seas reconocido por su experiencia, lo que aumenta sus oportunidades de trabajo interesante y colaboración en el campo.
- Finalmente, al crear y compartir IoCs, puedes ayudar a la detección automática del malware en cuestión. Si los fabricantes de software de detección y prevención integran esas IoCs en sus bases de datos, eso hace que el malware sea significativamente menos útil para los actores de amenazas y mejora la seguridad de las personas en todo el mundo.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Comprender los diferentes tipos de IoC y cómo compartirlos
- Comprender las reglas de YARA y Snort
- Crear y compartir un breve informe sobre el malware que encontraron

---
## Sección Principal
### Tipos de IoC

Podemos dividir los IoCs en términos generales en legibles por humanos y legibles por máquinas. Las IoCs legibles por máquina pueden ser cualquier cosa que una computadora pueda usar para detectar malware, y hay muchos formatos que intentan representar ricamente la complejidad del comportamiento del malware. Sin embargo, hay varios formatos simples que son fáciles de crear y usar y que son bastante populares:

- Hashes MD5 o SHA de archivos de malware
- Reglas de YARA que identifican archivos de malware. Las reglas de YARA identifican secuencias o strings binarias específicas dentro de un archivo
- Especificaciones del servidor (direcciones IP o nombres de host, con o sin números de puerto, URL, etc.) para identificar el tráfico de red del malware
- Reglas de snort para identificar el tráfico de red del malware

Los hashes de archivos y las especificaciones del servidor son los más fáciles de crear y usar. Sin embargo, a veces se requiere la complejidad adicional de las reglas de YARA o Snort para identificar el malware. Por ejemplo, el malware puede comunicarse con su servidor de C&C en cualquier host y puerto, pero envía un mensaje específico al servidor; para eso, necesita algo así como una regla de Snort. Del mismo modo, un archivo de malware puede contener contenido diferente con cada infección, pero siempre contiene una string única específica. Para eso, necesitas algo así como una regla de YARA.

Las IoCs legibles por humanos son descripciones de cosas que hace el malware que son útiles para las personas que investigan un posible compromiso, pero menos para las computadoras. Estos toman la forma de descripciones narrativas de las actividades del malware. Estos tienen la ventaja de que generalmente ser más fáciles de crear y comprender, y se pueden convertir en IoCs legibles por máquina para una variedad de sistemas de detección.

Un buen informe de análisis de malware generalmente contendrá una descripción legible por humanos del malware y sus capacidades, junto con algunos IoCs legibles por máquina en un apéndice. Esto garantiza que el informe sea útil para la audiencia más amplia.

### Creación de IoCs

Un buen IoC minimizará tanto los falsos positivos como los falsos negativos. Especialmente porque es de esperar que el malware sea raro en la mayoría de los sistemas, detectar buenos archivos como maliciosos (falsos positivos) puede crear una falsa sensación de riesgo y conducir a la eliminación de archivos legítimos. Del mismo modo, un IoC que no detecta una parte significativa de ese malware (falsos negativos) puede ser peligroso, atrayendo a los defensores a una falsa sensación de seguridad.

Con eso en mente, repasemos algunos de los formatos simples comunes de IoC.

#### Hashes de archivo

Los hashes de archivos se encuentran entre los IoCs más simples. Se calcula un [hash criptográfico](https://www.sentinelone.com/cybersecurity-101/hashing/) (o dos) de un archivo que es exclusivo del malware, y eso es todo. Convencionalmente, se proporcionan hashes MD5 y SHA256. Aunque hay numerosas debilidades con MD5, generalmente no son significativas en el contexto de las IoCs. Las principales desventajas de los hashes de archivos es que cualquier cambio en el archivo permitirá que el malware eluda la detección basada en IoC. En la mayoría de los casos, es trivial simplemente agregar un byte al archivo, causando un hash completamente diferente. Sin embargo, los hashes de archivos siguen siendo sorprendentemente efectivos para detectar malware.

#### Reglas de YARA

Un paso adelante en la complejidad de los hashes de archivos son las reglas de YARA. Las reglas de YARA empaquetan información sobre el malware, una lista de secuencias binarias o cadenas en el archivo y reglas sobre qué strings/secuencias deben estar en el archivo (por ejemplo, string 1 o string 2, y también string 3). YARA mantiene un buen equilibrio entre simplicidad y flexibilidad. Para obtener más información sobre YARA, consulte el [sitio web oficial](https://virustotal.github.io/yara/) y también esta [publicación de blog sobre la creación de reglas de YARA para un archivo de malware](https://medium.com/@laroshkhanpk/threat-hunting-101-hunting-with-yara-rules-82aff0898674).

Una cosa a tener en cuenta al trabajar con YARA es asegurarse de que su regla esté libre de falsos positivos. Por ejemplo, una regla que coincida con "Este programa no se puede ejecutar en modo DOS" coincidiría con todos los ejecutables en un sistema Windows. Después de crear tus reglas de YARA para algunos programas maliciosos, es una buena idea ejecutarlas en un par de sistemas (con suerte) no infectados para asegurarse de que no identifiquen archivos no maliciosos. Existen herramientas para ayudar a crear reglas de YARA, por ejemplo, [yarGen](https://github.com/Neo23x0/yarGen) analizará un archivo de malware y creará un punto de partida para una regla de YARA que no incluya strings buenas conocidas. Asegúrese de leer el README y las publicaciones de blog adjuntas antes de usar la herramienta.

#### Identificadores del servidor

A menudo, el malware se pondrá en contacto con un servidor de comando y control remoto para recibir instrucciones, descargar etapas posteriores de malware, etc. Si es posible predecir con qué servidores se pondrá en contacto el malware (por ejemplo, si está codificado en el binario), entonces es posible crear IoCs que identifiquen el tráfico de red malicioso. Algunos ejemplos pueden ser:

- La dirección IP de un servidor o de algunos servidores
- Uno o más nombres de host de servidor
- Números de puerto que utiliza el malware al conectarse al servidor (ocho por sí mismos o junto con direcciones IP o nombres de host)
- URL o fragmentos de URL que solicita el malware

Los identificadores de servidor son similares a los hashes de archivos en que son bastante simples pero también bastante frágiles. Sin embargo, al igual que los hashes de archivos, también son sorprendentemente efectivos.

#### Reglas de Snort

Si los identificadores del servidor son como hashes de archivos para el tráfico de red, entonces las reglas de Snort son como las reglas de YARA para el tráfico. Snort es un sistema de detección de intrusiones de código abierto y tiene un motor de reglas maduro y ampliamente utilizado. Las reglas de snort son más complicadas que las de YARA, pero siguen siendo bastante manejables. [La documentación oficial](https://docs.snort.org/start/rules) puede ser bastante desalentadora, pero la mayoría de las reglas son bastante simples. [Esta página](https://www.sapphire.net/security/snort-rules-examples/) describe la estructura de las reglas de Snort y proporciona algunos ejemplos simples. Finalmente, [aquí hay un conjunto de reglas de Snort](https://github.com/abhinavbom/Snort-Rules/blob/master/malware.rules) para algunos malware reales.

Al igual que con las reglas de YARA, puede ser bastante fácil crear falsos positivos accidentalmente. Considere capturar unos días de su tráfico de red y ejecutar cualquier regla de Snort que cree contra esas capturas de paquetes.

### Elegir los IoCs apropiados

Al pensar en crear IoCs, debe considerar lo que es intrínseco al malware en general, en comparación con lo que es específico de la muestra que analizó. Aquí están algunos ejemplos:

- Si la etapa 1 del malware es un PDF que contiene contenido personalizado para la víctima, pero también un exploit que descarga e instala una segunda etapa, entonces sería inapropiado usar un hash de archivo del PDF. En su lugar, querrás crear una regla de YARA que identifique el código de explotación en el PDF.
- Si una pieza de malware reutiliza partes de algún malware existente y conocido, pero luego también tiene un componente novedoso, querrás crear tus IoCs, incluido el nuevo componente. Esto evitará clasificaciones erróneas.
- Si el malware se envía con una configuración para el servidor al que se conecta, sería inapropiado crear un IoC usando ese servidor, ya que diferentes campañas probablemente usarán diferentes servidores.
- Si el servidor C&C del malware se identifica por el nombre de host en el malware, la creación de una regla de detección de red basada en una dirección IP daría lugar a falsos positivos y falsos negativos. En su lugar, la regla de red debe usar el nombre de host.

### Creación de un informe

En este punto, debes saber cómo adquiriste el malware, qué hace y cómo detectarlo. [Este artículo](https://zeltser.com/malware-analysis-report/) desglosa algunas de las cosas que debe contener un excelente informe de análisis de malware, y [esta publicación de blog de un instructor de SANS](https://www.sans.org/blog/writing-malware-reports/) proporciona algunos consejos para el informe general. Además, es genial explicar tu proceso de pensamiento en secciones narrativas. Esto puede ser tanto educativo para las personas que se inician en el análisis de malware como para ayudar a los investigadores de malware más experimentados a ayudarte en caso de que te hayas perdido algo.

Atribuir malware a un actor de amenazas en particular es una actividad popular entre los analistas de malware. Sin embargo, es difícil obtener resultados precisos. No sientas que necesitas realizar una atribución si no estás seguro, lo más importante es publicar IoCs.

En la ruta de aprendizaje Detección, Investigación y Seguimiento de Infraestructuras Maliciosas, también hemos [creado una sección sobre artículos e informes](https://docs.google.com/document/d/1Qhka7uQYCBye-EQRQrrETo-ptik2yDAGDZg5DrncYF4/edit) que podrían ser de ayuda.

Las siguientes publicaciones de blog públicas pueden servirte de inspiración para tus propios informes. Todos ellos utilizan diferentes tonos y formatos, pero todos también contienen IoCs.

- [IoCs de Amnesty Tech para un nuevo malware para Android](https://github.com/AmnestyTech/investigations/tree/master/2023-03-29_android_campaign)
- [Publicación de Citizen Lab sobre los exploits de QuaDream](https://citizenlab.ca/2023/04/spyware-vendor-quadream-exploits-victims-customers/)
- [Informe de investigación de Human Rights Watch sobre una campaña de phishing](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians)
- [La investigación de Bellingcat sobre una campaña de phishing dirigida a usuarios de ProtonMail](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/)
- [Informe de EFF sobre una nueva versión de Bandook](https://www.eff.org/deeplinks/2023/02/uncle-sow-dark-caracal-latin-america)
- [Análisis del ransomware MirageFox](https://github.com/saasthavasan/Malware-Analysis-Reports/tree/master/MirageFox/Report)
- [Análisis del ladrón de datos de Windows llamado Krown](https://github.com/albertzsigovits/malware-notes/tree/master/Stealer-Windows-Krown)

### Compartiendo el informe

Una vez que hayas creado un informe, hay algunas cosas que puedes hacer con el:

- Compártelo con tus compañeros defensores digitales de la sociedad civil
- Publícalo al mundo
- Compartir muestras de malware con empresas antimalware

Puedes hacer cualquiera, todas o incluso ninguna de estas cosas. Si estaba trabajando con un cliente cuyo dispositivo se vio comprometido, por supuesto, deberá asegurarse de que se sienta cómodo compartiendo el informe. Lo mejor es obtener su aprobación por escrito.

Si eres miembro de una organización como [CiviCERT](https://www.civicert.org/), ese es un gran lugar para compartir tus hallazgos. Es probable que los demás miembros lean tu informe, proporcionen comentarios y tomen medidas al respecto.

También puedes publicar tus hallazgos en tu blog o en algún lugar como GitHub. Esto requiere poco esfuerzo, pero también puede ser limitado en su impacto. Sin embargo, su informe puede ser invaluable para alguien que busca en Internet el hash SHA de un archivo o un identificador de servidor.

Por último, si tienes muestras de malware, puedes enviarlas a las principales compañías antivirus. Es poco probable que lean un informe, pero pueden analizar el malware e incluir firmas en su producto. Para obtener más información sobre el envío de malware, [esta página proporciona enlaces a la información de envío de varias empresas](https://www.thewindowsclub.com/malware-submission-where-to-submit-malware-and-suspicious-files-to-microsoft).

## Práctica

Responda la pregunta 7.3 y complete el ejercicio 7.3 de la [guía de campo para la respuesta a incidentes](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).

## Verificación de Habilidades

Discuta con su mentor o compañero cómo manejaría cada una de esas direcciones IP en sus informes de malware. ¿Algunos de ellos hacen mejores IoCs que otros?

- Una dirección IP en Amazon Web Services que aloja malware
- Una dirección IP de un nodo de salida Tor
- Una dirección IP residencial que busca vulnerabilidades en un sitio web
- Una dirección IP en una red de entrega de contenido (CDN - content-delivery network), como Cloudflare

## Recursos de aprendizaje

{{% resource title="¿Qué es el hashing y cómo funciona?" description="Una breve introducción al tema de los hashes de archivos y qué papel desempeñan en la detección e investigación de malware" languages="Inglés" cost="Gratis" url="https://www.sentinelone.com/cybersecurity-101/hashing/" %}}

{{% resource title="YARA" description="La página de inicio oficial de la herramienta YARA, que se utiliza para la coincidencia de patrones, principalmente durante la investigación de malware" languages="Inglés" cost="Gratis" url="https://virustotal.github.io/yara/" %}}

{{% resource title="Caza de amenazas 101 con reglas de Yara" description="Esta publicación analiza cómo crear y usar las reglas de YARA para detectar archivos maliciosos." languages="Inglés" cost="Gratis" url="https://medium.com/@laroshkhanpk/threat-hunting-101-hunting-with-yara-rules-82aff0898674" %}}

{{% resource title="yarGen" description="Una herramienta que puede automatizar alguna generación de strings para las reglas de YARA" languages="Inglés" cost="Gratis" url="https://github.com/Neo23x0/yarGen" %}}

{{% resource title="Reglas de Snort" description="La mejor manera de pensar en Snort es como si fuera similar a YARA, pero para las redes, utilizando patrones para detectar y detener las intrusiones. Esta publicación presenta algunas reglas básicas para ello." languages="Inglés" cost="Gratis" url="https://docs.snort.org/start/rules" %}}

{{% resource title="Ejemplos y uso de reglas de snort" description="Algunas buenas reglas para los principiantes de Snort" languages="Inglés" cost="Gratis" url="https://www.sapphire.net/security/snort-rules-examples/" %}}

{{% resource title="Qué incluir en un informe de análisis de malware" description="Una sólida lista de tareas pendientes para todas las cosas principales que debe tener en cuenta y anotar al crear un informe de análisis de malware para compartir con los demás" languages="Inglés" cost="Gratis" url="https://zeltser.com/malware-analysis-report/" %}}

{{% resource title="Redacción de informes de malware" description="Una guía más antigua (2012) pero aún muy útil de SANS sobre las mejores prácticas al escribir informes de malware" languages="Inglés" cost="Gratis" url="https://www.sans.org/blog/writing-malware-reports/" %}}