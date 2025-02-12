+++
style = "module"
weight = 10
title = "Descubrir de dónde vino el malware"
description = "Ningún malware aparece espontáneamente en el dispositivo de la persona objetivo. Saber de dónde provino la infección puede ser importante para gestionar riesgos futuros."
+++

## Estudio de caso

Ningún malware aparece espontáneamente en el dispositivo de una persona blanco de un posible ataque; siempre proviene de alguna parte. A veces, ese lugar es obvio: la persona se da cuenta de que el enlace en el que hizo clic era malicioso. En otros casos, el vector de infección puede ser menos claro. Saber de dónde provino la infección puede ser importante para gestionar riesgos futuros. Si la fuente de infección inicial no estaba dirigida, es posible que la persona haya sido víctima de una banda criminal cuyo objetivo no haya sido otro que ganar dinero. Por otro lado, si la infección inicial provino de un sofisticado ataque de ingeniería social dirigido, es probable que la persona enfrente ataques futuros continuos por parte mismo perpetrador de las amenazas.

## Objetivos

Después de completar este subtema, el profesional debe:

- Comprender cómo funcionan las marcas de tiempo en dispositivos móviles y de escritorio.
- Mira los metadatos del sistema operativo para saber de dónde se descargaron los archivos maliciosos.

---
## Sección Principal

### Marcas de tiempo de archivos

El primer paso para rastrear el origen del ataque es establecer la hora en que se instaló el malware. Si ha identificado el archivo de malware descargado, puede utilizar las marcas de tiempo del archivo. Esto es más difícil de lo que uno podría imaginar al principio, porque las marcas de tiempo del sistema de archivos son complicadas. La mejor opción es comenzar con la hora de creación del archivo que se descargó primero. Tenga en cuenta que los archivos extraídos de otros archivos pueden tener diferentes horas de creación; es importante empezar con el archivo real que se descargó inicialmente.

#### Windows, macOS, Linux

Para obtener más información sobre las marcas de tiempo del sistema de archivos de escritorio, revisa [este documento oficial de SANS sobre Windows](https://www.sans.org/white-papers/36842/), [esta descripción de las marcas de tiempo casi infinitas sobre MacOS](https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/), [esta descripción de las marcas de tiempo de Linux](https://linuxhandbook.com/file-timestamps/) y [una forma de ver la hora de creación de archivos en ext4](https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/).

#### iOS, Android

Para dispositivos móviles, MVT proporciona información de marca de tiempo. Para iOS, esto se [describe en la documentación](https://docs.mvt.re/en/latest/ios/records/). Para Android, se extrae menos información y es posible que tenga que realizar comprobaciones en el dispositivo.

La aplicación [Google Files](https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_US&gl=US) mostrará la hora de modificación de un archivo desde el menú despegable de opciones para cada archivo.

Tenga en cuenta que, por lo general, el malware móvil deja vestigios mucho menos evidentes en el sistema de archivos. Las formas comunes en que los dispositivos móviles se infectan son a través de aplicaciones falsas transferidas localmente, aplicaciones maliciosas en las tiendas de aplicaciones de Apple/Google, o mediante *exploits* sofisticados del navegador que obtienen acceso profundo al dispositivo antes de descargar cualquier archivo. En estos últimos casos, los archivos maliciosos pueden no aparecer en directorios de descarga comunes.

### Mensajes/Descargas Sospechosos

Ya sea que encuentre un archivo malicioso o no, el siguiente paso es encontrar de dónde provino. Hay varios fragmentos que puede recopilar y buscar.

En algunos sistemas operativos, las descargas están asociadas con su fuente. Esto significa que los archivos pueden contener metadatos que muestran desde qué servidor se descargaron. [Esta guía](https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/#:~:text=To%20Find%20Origin%20URL%20For%20File%20Downloaded%20with,the%20following%20command%3A%20Get-Content%20%22file%20name%22%20-Stream%20Zone.Identifier.) muestra cómo verificar dicha información en Windows y Linux, mientras que [esta otra](https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/) hace lo mismo para macOS. Tales metadatos le mostrarán el servidor desde el cual se descargó el archivo, pero no lo que causó la descarga.[^1] También tenga en cuenta que el enlace en el que la persona objetivo hizo clic puede no ser la URL de descarga debido a los redireccionamientos.

A continuación, busque correos electrónicos, mensajes, etc. que puedan haber activado la descarga. Puede utilizar cualquier marca de tiempo e información de URL que identificó anteriormente como ayuda.

## Verificación de habilidades

Escoja al menos cinco archivos en su carpeta de descargas:

- Escriba todas las marcas de tiempo que contienen y lo que podrían indicar.
- Si están disponibles, encuentre los atributos extendidos o metadatos que describen desde qué URL o servicio se descargaron (en nuestras pruebas, no todos los archivos tenían información sobre URL en sus metadatos, así que no se preocupe si no puede encontrarlo).

Pídale a un colega o mentor/a que revise su trabajo para asegurarse de que ha leído correctamente todos los metadatos.

En Android, instale una aplicación (no maliciosa) y utilice el administrador de archivos para encontrar las propiedades de la aplicación y ver qué puede aprender sobre ella. Si tiene acceso a un teléfono Android de prueba, descargue una aplicación desde fuera de Google Play y haga lo mismo. Pídale a un colega o mentor/a que revise su trabajo para asegurarse de que ha leído correctamente todas las propiedades de la aplicación.

## Recursos de Aprendizaje

{{% resource title="Marcas de Tiempo del Sistema de Archivos: ¿Qué las mueve?" description="Una visión general de qué son las marcas de tiempo, qué tan portátiles son y cómo funcionan a nivel técnico. Principalmente centrado en Windows" languages="Inglés" cost="Gratis" url="https://www.sans.org/white-papers/36842/" %}}
{{% resource title="marcas de tiempo de macOS de atributos extendidos y enfoque" description="Una guía para usar metadatos de archivos avanzados en macOS para encontrar diferentes marcas de tiempo de archivos y lo que significan esas marcas de tiempo" languages="Inglés" cost="Gratis" url="https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/" %}}
{{% resource title="Explicación de Marcas de tiempo de archivos en Linux: atime, mtime, ctime" description="Linux tiene diferentes tipos de marcas de tiempo. Este artículo explica cómo interpretarlos." languages="Inglés" cost="Gratis" url="https://linuxhandbook.com/file-timestamps/" %}}
{{% resource title="Hora de creación de archivos en ext4 Linux" description="El sistema de archivos más moderno que utiliza Linux se llama ext4. Este artículo analiza cómo ext4 gestiona las marcas de tiempo y cómo encontrar información detallada sobre la creación de archivos." languages="Inglés" cost="Gratis" url="https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/" %}}
{{% resource title="Registros extraídos por mvt-ios" description="Observa qué archivos genera MVT al realizar análisis de volcados de iOS y cómo interpretarlos" languages="Inglés" cost="Gratis" url="https://docs.mvt.re/en/latest/ios/records/" %}}
{{% resource title="Archivos de Google" description="Una aplicación de Android que proporciona acceso a metadatos de archivos avanzados" languages="Varios idiomas" cost="Gratis" url="https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_US&gl=US" %}}
{{% resource title="Mark of the Web desde la Perspectiva de un Red Team" description="Introduce Mark of the Web, una bandera en Windows que sugiere que un archivo fue descargado de la web y requiere precauciones de seguridad especiales al abrirlo." languages="Inglés" cost="Gratis" url="https://outflank.nl/blog/2020/03/30/mark-of-the-web-from-a-red-teams-perspective/" %}}
{{% resource title="Bewar: Los navegadores basados en Chromium guardan la URL de origen de descarga de archivos" description="Analiza cómo los sistemas Windows y Linux a veces guardan metadatos en las URL desde las que se descargó un archivo" languages="Inglés" cost="Gratis" url="https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/" %}}
{{% resource title="Descubre desde dónde se descargó un archivo en Mac OS X" description="Los archivos macOS que se han descargado desde la URL suelen tener la URL de descarga incrustada en sus metadatos. Este artículo muestra cómo extraer dicha URL." languages="Inglés" cost="Gratis" url="https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/" %}}

## Notas

[^1]:
    En Windows, verá además un número correspondiente a una ID de la zona. Las Zonas asociadas con los archivos descargados son las siguientes:  

    - ZoneId=1: Intranet Local
    - ZoneId=2: Sitios de confianza
    - ZoneId=3: Internet
    - ZoneId=4: Sitios restringidos
