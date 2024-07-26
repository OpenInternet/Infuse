+++
style = "module"
weight = 7
title = "Detección de malware mediante adquisición de imagen (iOS, Android)"
+++

## Caso de Uso

El primer paso para detectar malware en un dispositivo es recopilar datos del propio dispositivo para su análisis. Lo ideal es que los datos se recuperen del dispositivo a un espacio seguro con mínima alteración para el dispositivo en sí mismo. El malware más avanzado puede intentar detectar actividad forense y eliminarse para dificultar la detección y el análisis.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Realizar un respaldo de un dispositivo iOS o Android para revisarlo en busca de posibles malware.
- Verifica los datos recopilados en ese respaldo, por ejemplo, buscando marcas de tiempo y metadatos o artefactos similares.
- Analiza los respaldos de iOS y Android usando MVT.

---
## Sección Principal

Para obtener una visión más amplia de los métodos de detección de malware y los posibles desafíos, recomendamos que todos los aprendices echen un vistazo [a esta charla](https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik) (originalmente en alemán pero también traducida al francés y al inglés), que es una excelente introducción al tema y dura alrededor de 50 minutos (más preguntas y respuestas).

### Adquisición de imágenes iOS/Android

Los sistemas operativos móviles suelen ser más limitados/bloqueados que los de escritorio, por lo que crear y trabajar con un respaldo completo no es tan sencillo y es posible que no puedas obtener fácilmente toda la información de un dispositivo. Una herramienta multiplataforma repleta de funcionalidades para la extracción de datos móviles pertenece a _Amnesty International Security Lab’s_ 🧰 [Mobile Verification Toolkit](https://mvt.re) (MVT). La documentación completa está disponible en su sitio web, pero también hay tutoriales, por ejemplo [este](https://www.youtube.com/watch?v=iLOSlHhGI9U) (Inglés, video de 6 minutos). Ten en cuenta que este último tutorial también incluye materiales que cubriremos en el siguiente subtema. Alternativamente, también puedes utilizar [esta guía](https://pts-project.org/guides/g4/) que te mostrará cómo realizar respaldos tanto en iOS como en Android.

Cuando se trata de sistema operativo, puedes usar una herramienta llamada [libimobiledevice](https://libimobiledevice.org/) o iTunes para hacer un respaldo. Este respaldo luego se puede analizar usando MVT.

Detectar malware en Android es un poco más complicado. Puede utilizar una herramienta llamada [androidqf](https://github.com/botherder/androidqf) para capturar registros. Revisa [este artículo](https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/) para obtener más detalles sobre androidqf y por qué es difícil realizar un respaldo sin conectar primero un dispositivo Android a otra computadora.

Puede instalar MVT en Linux o macOS. La mayoría de los sistemas Linux tienen pip3, una herramienta utilizada para instalar paquetes de Python, lo que hace que la instalación de MVT sea algo sencilla. En macOS, normalmente necesitarás instalar dos herramientas - XCode y Homebrew - antes de poder instalar MVT. Puede seguir las instrucciones de [esta guía](https://docs.mvt.re/en/latest/install/) para instalar MVT.

### Análisis de imágenes con MVT

🧰 Para los dispositivos móviles, la arquitectura del sistema hace que el software antimalware del dispositivo sea menos efectivo. Sin embargo, [Mobile Verification Toolkit](https://mvt.re) (MVT) escaneará los datos extraídos de un dispositivo Android o iOS en busca de varios malware.

En la sección anterior, repasamos la copia de respaldo de un dispositivo con MVT. Una vez que lo hayas hecho, puedes escanear el respaldo usando la herramienta de línea de comando.

Sin embargo, ten en cuenta que MVT tiene algunas limitaciones:

- MVT compara la copia de respaldo del dispositivo con los IoC conocidos. Esto significa que sólo puede buscar malware que tenga esos IoCs específicos. No busca otros heurísticos (como un sistema jailbreak o automatizaciones o scripts sospechosos) que puedan sugerir una infección.
- Para iOS, el mejor enfoque es [obtener acceso a un respaldo del dispositivo y luego extraer los datos del respaldo](https://docs.mvt.re/en/latest/ios/backup/itunes/). Esto debería proporcionar la mayoría de los datos disponibles en el dispositivo. (Existe un trabajo de análisis adicional que podría realizarse en un dispositivo iOS con jailbreak, aunque esto queda fuera del alcance de esta ruta de aprendizaje). También vale la pena señalar que un respaldo cifrado contiene muchos más datos que uno no cifrado. Recomendamos trabajar siempre con el primero, si es posible.
- Para Android, a menos que el dispositivo esté rooteado, no podrás extraer todo. Sin embargo, puedes obtener gran parte de los datos del dispositivo sin acceso root.

Para obtener una lectura rápida sobre los IoCs que MVT verifica, cómo descargar y proporcionar nuevos datos de IoC a MVT, y una lista de posibles IoCs que podrías utilizar en tus esfuerzos de detección, revisa [esta subpágina en la documentación de MVT.](https://docs.mvt.re/en/latest/iocs/)

## Práctica

Para los ejercicios prácticos en este subtema, primero realiza un respaldo de tu dispositivo (las instrucciones para cada plataforma están detalladas a continuación), y luego responde las preguntas con la etiqueta "todos los sistemas".

### iOS

Instala MVT en tu sistema operativo de escritorio. Sigue las instrucciones detalladas en [esta sección](https://docs.mvt.re/en/latest/ios/install/) para hacer un respaldo, ya sea utilizando iTunes o instalando primero [libimobiledevice](https://docs.mvt.re/en/latest/ios/install/).

### Android

Instala MVT en tu sistema operativo de escritorio. Instala [Androidqf](https://github.com/botherder/androidqf) y utilízalo para hacer un respaldo.

### Windows, macOS, Linux

Realizar una copia de respaldo de tu sistema operativo de escritorio utilizando una herramienta de tu elección. Puedes utilizar una de las herramientas descritas en la sección de recursos de aprendizaje anterior.

### Todos los sistemas

Verifica lo siguiente en tu copia de respaldo:

- ¿Qué datos obtuviste del dispositivo? ¿Qué datos no obtuviste?
- ¿Qué se modificó más recientemente?
- ¿Se conservan las marcas de tiempo en la copia de adquisición de datos?

## Verificación de habilidades

Antes de realizar la parte de verificación de habilidades del ejercicio, asegúrese de haber hecho un respaldo de sus archivos (como se describe en la sección de práctica). Una vez que hayas completado esto, realiza lo siguiente:

### Windows, macOS, Linux

Has completado una copia de respaldo de tu sistema operativo de escritorio. Ábrelo y dentro de él, encuentra:

- La carpeta de descargas.
- Al menos un archivo ejecutable.
- Al menos una configuración del sistema o un archivo de configuración.

Está perfectamente bien utilizar tu motor de búsqueda favorito para determinar dónde deben estar localizados esos archivos y carpetas en un disco y luego buscarlos en la misma localización, justo dentro de tu respaldo.

### iOS

Si tu respaldo de iOS ha sido cifrado, utiliza MVT para descifrarlo siguiendo [estas instrucciones](https://docs.mvt.re/en/latest/ios/backup/check/#decrypting-a-backup). Lee el resultado del comando para asegurarte de que el descifrado se haya ejecutado correctamente.

Después de que hayas descifrado la copia de respaldo, solicita a MVT que descargue los IoCs más recientes y luego utiliza la herramienta para escanear la copia de respaldo en busca de malware.

### Android

Pídele a MVT que descargue los IoCs más recientes y luego úsalo para escanear la copia de respaldo que hiciste utilizando androidqf.

## Recursos Educativos

{{% resource title="Análisis forense de malware en teléfonos inteligentes: Introducción" description="Una charla de dos investigadores de malware móvil que trabajan con periodistas. En la charla resumen lo básico del análisis forense de malware de smartphones, y cómo difiere del análisis forense de equipos de computadoras de escritorio, y cuáles son las principales herramientas y métodos." languages="La charla original está en alemán, traducida al francés y al inglés. Las diapositivas están en inglés." cost="Gratis" url="https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik" %}}
{{% resource title="Forense móvil" description="Esta guía completa fue creada inicialmente por Security Without Borders. Analiza cómo realizar análisis forenses básicos y recopilación de datos en todas las plataformas principales." languages="Inglés" cost="Gratis" url="https://pellaeon.gitbook.io/mobile-forensics/" %}}
{{% resource title="Cómo hacer una copia de respaldo de una imagen de Windows 10/11" description="Para analizar un sistema en busca de malware, primero debemos hacer un respaldo de los archivos y carpetas de este sistema. Esta guía nos muestra cómo podemos hacerlo en Windows." languages="Inglés" cost="Gratis" url="https://www.computerworld.com/article/3655693/how-to-make-image-backup-windows-10-windows-11.html" %}}
{{% resource title="Cómo hacer una copia de respaldo de una Mac o MacBook" description="Este artículo se centra en las imágenes de disco en macOS." languages="Inglés" cost="Gratis" url="https://www.macworld.com/article/671336/how-to-back-up-a-mac-or-macbook.html" %}}
{{% resource title="Cómo Hacer un Respaldo de Todo Tu Sistema Linux Utilizando Rsync" description="Esta pieza utiliza rsync, una utilidad de línea de comandos muy poderosa que también se puede usar para clonar un sistema Linux con el propósito de analizar la subsecuente imagen de disco." languages="Inglés" cost="Gratis" url="https://ostechnix.com/backup-entire-linux-system-using-rsync/" %}}
{{% resource title="MVT, herramienta de verificación móvil" description="Una herramienta gratuita que puede analizar copias de respaldo de sistemas iOS y Android para buscar IoCs asociados con infecciones de malware o spyware. Utilizado ampliamente en análisis forense de dispositivos para la sociedad civil" languages="Inglés" cost="Gratis" url="https://docs.mvt.re/en/latest/" %}}
{{% resource title="Respaldo con iTunes" description="Este artículo de la documentación de MVT muestra cómo utilizar iTunes para crear una copia de respaldo que posteriormente se puede analizar con MVT." languages="Inglés" cost="Gratis" url="https://docs.mvt.re/en/latest/ios/backup/itunes/" %}}
{{% resource title="Analicé mi teléfono en busca de spyware Pegasus" description="Un vídeo paso a paso que ilustra cómo puedes utilizar MVT para encontrar IoCs asociados con Pegasus en iOS" languages="Inglés" cost="Gratis" url="https://www.youtube.com/watch?v=iLOSlHhGI9U" %}}
{{% resource title="Guía para principiantes - Cómo hacer una copia de respaldo de un dispositivo móvil con fines de análisis forense" description="Una guía introductoria sobre cómo utilizar herramientas comunes para realizar un respaldo de dispositivos iOS y Android con el fin de escanearlos en busca de malware posteriormente" languages="Inglés" cost="Gratis" url="https://pts-project.org/guides/g4/" %}}
{{% resource title="libimobiledevice" description="La página de inicio de una biblioteca de software que se puede utilizar para acceder y realizar respaldos de dispositivos iOS desde dispositivos Windows, macOS o Linux" languages="Inglés" cost="Gratis" url="https://libimobiledevice.org/" %}}
{{% resource title="Simplificando el Análisis Forense de Android" description="Un artículo elaborado por un miembro de Amnesty Tech sobre las herramientas actuales que se pueden utilizar para hacer respaldo de dispositivos Android para análisis forense y algunas de sus limitaciones." languages="Inglés" cost="Gratis" url="https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/" %}}
{{% resource title="Instalar libimobiledevice" description="Una guía rápida sobre cómo instalar libimobiledevice para fines de análisis forense" languages="Inglés" cost="Gratis" url="https://docs.mvt.re/en/latest/ios/install/" %}}
{{% resource title="androidqf" description="Android Quick Forensics es una herramienta que se puede utilizar para acceder fácilmente a datos desde un dispositivo Android para futuros análisis forense, investigación y escaneo de malware." languages="Inglés" cost="Gratis" url="https://github.com/botherder/androidqf" %}}
{{% resource title="Curso SANS sobre Adquisición Digital y Triage Rápido" description="Un curso muy completo, largo y costoso sobre adquisición y análisis de datos desde dispositivos móviles" languages="Inglés" cost="alrededor de 8.000 dólares estadounidenses" url="https://www.sans.org/cyber-security-courses/digital-acquisition-rapid-triage/" %}}