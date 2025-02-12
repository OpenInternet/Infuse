+++
style = "module"
weight = 7
title = "Detección de malware mediante adquisición de imagen (iOS, Android)"
description = "El primer paso para detectar malware es recopilar datos del propio dispositivo para su análisis."
+++

## Estudio de Caso

El primer paso para detectar malware es recopilar datos del propio dispositivo para su análisis. Lo ideal es que los datos se recuperen del dispositivo y se lleven a un espacio seguro con una mínima alteración para el dispositivo en sí mismo. El malware más avanzado puede intentar detectar actividad forense y autoeliminarse para dificultar la detección y el análisis.

## Objetivos

Después de completar este módulo, el profesional debe:

- Comentar con el cliente el enfoque propuesto para el análisis de tráfico, explicándole el proceso a seguir, sus riesgos y limitaciones.
- Seleccionar una herramienta de análisis de tráfico de red apropiada e implementarla utilizando la configuración de hardware o software relevante.
- Leer los resultados de los flujos de red marcados y ser capaz de clasificar qué resultados requieren una investigación más a fondo o acciones para remediar el riesgo.

---
## Sección Principal

Para obtener una visión más amplia de los métodos de detección de malware y los posibles desafíos, recomendamos que todos los aprendices echen un vistazo [a esta charla](https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik) (originalmente en alemán pero también traducida al francés y al inglés), que es una excelente introducción al tema y dura alrededor de 50 minutos (más preguntas y respuestas).

### Adquisición de imágenes iOS/Android

Los sistemas operativos móviles suelen ser más limitados/bloqueados que los de escritorio, por lo que crear y trabajar con un respaldo completo no es tan sencillo y es posible que usted no pueda obtener fácilmente toda la información de un dispositivo. Una herramienta multiplataforma provistar de funcionalidades para la extracción de datos móviles pertenece a _Amnesty International Security Lab’s_ 🧰 [Mobile Verification Toolkit](https://mvt.re) (MVT). La documentación completa está disponible en su sitio web, pero también hay tutoriales, por ejemplo [este](https://www.youtube.com/watch?v=iLOSlHhGI9U) (en inglés, video de 6 minutos). Tenga en cuenta que este último tutorial también incluye infromacion que cubrimos en el siguiente módulo. Alternativamente, también puede utilizar [esta guía](https://pts-project.org/guides/g4/) que le mostrará cómo realizar respaldos tanto en iOS como en Android.

Cuando se trata de sistemas operativos, puedes usar una herramienta llamada [libimobiledevice](https://libimobiledevice.org/) o iTunes para hacer un respaldo. Este respaldo luego se puede analizar usando MVT.

Detectar malware en Android es un poco más complicado. Puede utilizar una herramienta llamada [androidqf](https://github.com/botherder/androidqf) para capturar registros. Revise [este artículo](https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/) para obtener más detalles sobre androidqf y por qué es difícil hacer un respaldo sin conectar primero un dispositivo Android a otra computadora.

Puede instalar MVT en Linux o macOS. La mayoría de los sistemas Linux tienen pip3, una herramienta utilizada para instalar paquetes de Python, lo que hace que la instalación de MVT sea algo más sencilla. En macOS, normalmente necesitará instalar dos herramientas - XCode y Homebrew - antes de poder instalar MVT; puede seguir las instrucciones de [esta guía](https://docs.mvt.re/en/latest/install/) para hacerlo.

### Análisis de imágenes con MVT

🧰 Para los dispositivos móviles, la arquitectura del sistema hace que el software antimalware del dispositivo sea menos efectivo. Sin embargo, [Mobile Verification Toolkit](https://mvt.re) (MVT) escaneará los datos extraídos de un dispositivo Android o iOS en busca de varios malware.

En la sección anterior, repasamos la copia de respaldo de un dispositivo con MVT. Una vez que lo haya hecho, puede escanear el respaldo usando la herramienta de línea de comando.

Sin embargo, tenga en cuenta que MVT tiene algunas limitaciones:

- MVT compara la copia de respaldo del dispositivo con los IoC conocidos. Esto significa que sólo puede buscar malware que tenga esos IoCs específicos. No busca otros heurísticos (como un sistema *jailbreak* o automatizaciones o *scripts* sospechosos) que puedan dar indicios de  una infección.
- Para iOS, el mejor enfoque es [obtener acceso a un respaldo del dispositivo y luego extraer los datos del respaldo](https://docs.mvt.re/en/latest/ios/backup/itunes/). Esto debería proporcionar la mayoría de los datos disponibles en el dispositivo. (Existe un trabajo de análisis adicional que podría realizarse en un dispositivo iOS con *jailbreak*, aunque esto queda fuera del alcance de esta ruta de aprendizaje). También vale la pena señalar que un respaldo cifrado contiene muchos más datos que uno no cifrado. Si es posible, recomendamos trabajar siempre con el primero.
- Para Android, a menos que el dispositivo esté rooteado, no podrás extraer todo. Sin embargo, puedes obtener gran parte de los datos del dispositivo sin acceso root.

Para obtener una lectura rápida sobre los IoCs que MVT verifique, cómo descargar y proporcionar nuevos datos de IoC a MVT, además de una lista de posibles IoCs que podría utilizar en sus esfuerzos de detección, revisa [esta subpágina en la documentación de MVT.](https://docs.mvt.re/en/latest/iocs/)

## Práctica

Para los ejercicios prácticos en este módulo, primero realice un respaldo de tu dispositivo (las instrucciones para cada plataforma están detalladas a continuación), y luego responda las preguntas que llevan la etiqueta "todos los sistemas".

### iOS

Instale MVT en su sistema operativo de escritorio. Siga las instrucciones detalladas en [esta sección](https://docs.mvt.re/en/latest/ios/install/) para hacer un respaldo, ya sea utilizando iTunes o instalando primero [libimobiledevice](https://docs.mvt.re/en/latest/ios/install/).

### Android

Instale MVT en su sistema operativo de escritorio. Instale [Androidqf](https://github.com/botherder/androidqf) y utilícelo para hacer un respaldo.

### Windows, macOS, Linux

Realice una copia de respaldo de su sistema operativo de escritorio utilizando una herramienta de su elección. Puede utilizar una de las herramientas descritas en la sección de recursos de aprendizaje anterior.

### Todos los sistemas

Verifique lo siguiente en su copia de respaldo:

- ¿Qué datos obtuvo del dispositivo? ¿Qué datos no obtuvo?
- ¿Qué se modificó más recientemente?
- ¿Se conservan las marcas de tiempo en la copia de adquisición de datos?

## Verificación de habilidades

Antes de realizar la verificación de habilidades del ejercicio, asegúrese de haber hecho un respaldo de sus archivos (como se describe en la sección de práctica). Una vez que haya completado esto, realice lo siguiente:

### Windows, macOS, Linux

Si has completado una copia de respaldo de su sistema operativo de escritorio. Ábralo y dentro de él, encuentre:

- La carpeta de descargas.
- Al menos un archivo ejecutable.
- Al menos una configuración del sistema o un archivo de configuración.

Es perfectamente correcto utilizar su motor de búsqueda favorito para determinar dónde deben estar localizados esos archivos y carpetas en un disco, y luego buscarlos en la misma localización, justo dentro de su respaldo.

### iOS

Si su respaldo de iOS ha sido cifrado, utilice MVT para descifrarlo siguiendo [estas instrucciones](https://docs.mvt.re/en/latest/ios/backup/check/#decrypting-a-backup). Lea el resultado del comando para asegurarte de que el descifrado se haya ejecutado correctamente.

Después de que hayas descifrado la copia de respaldo, solicite a MVT que descargue los IoCs más recientes y luego utilice la herramienta para escanear la copia de respaldo en busca de malware.

### Android

Pídale a MVT que descargue los IoCs más recientes y luego úselo para escanear la copia de respaldo que hizo utilizando androidqf.

## Recursos de Aprendizaje

{{% resource title="Análisis forense de malware en teléfonos inteligentes: Introducción" description="Una charla de dos investigadores de malware móvil que describe los conceptos básicos, herramientas y métodos de investigación forense de malware en teléfonos inteligentes" languages="La charla original está en alemán, traducida al francés y al inglés. Las diapositivas están en inglés." cost="Gratis" url="https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik" %}}
{{% resource title="Forense móvil" description="Esta guía completa fue creada inicialmente por Security Without Borders. Analiza cómo realizar análisis forenses básicos y recopilación de datos en todas las plataformas principales." languages="Inglés" cost="Gratis" url="https://pellaeon.gitbook.io/mobile-forensics/" %}}
{{% resource title="Cómo hacer una copia de respaldo de una imagen de Windows 10/11" description="Guía para crear un sistema de respaldo para análisis de malware en Windows." languages="Inglés" cost="Gratis" url="https://www.computerworld.com/article/3655693/how-to-make-image-backup-windows-10-windows-11.html" %}}
{{% resource title="Cómo hacer una copia de respaldo de una Mac o MacBook" description="Este artículo se centra en las imágenes de disco en macOS." languages="Inglés" cost="Gratis" url="https://www.macworld.com/article/671336/how-to-back-up-a-mac-or-macbook.html" %}}
{{% resource title="Cómo hacer un respaldo de todo su sistema Linux utilizando Rsync" description="Guía sobre el uso de rsync para clonar un sistema Linux con fines de análisis forense." languages="Inglés" cost="Gratis" url="https://ostechnix.com/backup-entire-linux-system-using-rsync/" %}}
{{% resource title="MVT, herramienta de verificación móvil" description="Herramienta para analizar las copias de seguridad de iOS y Android en busca de loCs de malware." languages="Inglés" cost="Gratis" url="https://docs.mvt.re/en/latest/" %}}
{{% resource title="Respaldo con iTunes" description="Este artículo muestra cómo utilizar iTunes para crear una copia de respaldo que posteriormente se puede analizar con MVT." languages="Inglés" cost="Gratis" url="https://docs.mvt.re/en/latest/ios/backup/itunes/" %}}
{{% resource title="Analicé mi teléfono en busca de spyware Pegasus" description="Una guía de vídeo que ilustra cómo usar MVT para encontrar IoCs asociados con Pegasus en iOS" languages="Inglés" cost="Gratis" url="https://www.youtube.com/watch?v=iLOSlHhGI9U" %}}
{{% resource title="Guía para principiantes - Cómo hacer una copia de respaldo de un dispositivo móvil con fines de análisis forense" description="Una guía introductoria sobre cómo utilizar herramientas comunes para realizar un respaldo de dispositivos iOS y Android con el fin de escanearlos en busca de malware." languages="Inglés" cost="Gratis" url="https://pts-project.org/guides/g4/" %}}
{{% resource title="libimobiledevice" description="La página de inicio de una biblioteca de software que se puede utilizar para acceder y realizar respaldos de dispositivos iOS desde Windows, macOS o Linux" languages="Inglés" cost="Gratis" url="https://libimobiledevice.org/" %}}
{{% resource title="Simplificando el Análisis Forense de Android" description="Un artículo sobre las herramientas que se pueden usar para hacer respaldo de dispositivos Android y sus limitaciones." languages="Inglés" cost="Gratis" url="https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/" %}}
{{% resource title="Instalar libimobiledevice" description="Una guía sobre cómo instalar libimobiledevice para fines de análisis forense" languages="Inglés" cost="Gratis" url="https://docs.mvt.re/en/latest/ios/install/" %}}
{{% resource title="androidqf" description="Herramienta para acceder datos desde un dispositivo Android para análisis forense." languages="Inglés" cost="Gratis" url="https://github.com/botherder/androidqf" %}}
{{% resource title="Curso SANS sobre Adquisición Digital y Triage Rápido" description="Un curso completo sobre adquisición y análisis de datos desde dispositivos móviles" languages="Inglés" cost="Alrededor de unos 8.000 dólares estadounidenses" url="https://www.sans.org/cyber-security-courses/digital-acquisition-rapid-triage/" %}}