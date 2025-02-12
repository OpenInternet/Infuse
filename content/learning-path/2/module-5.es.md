---
style: module
title: Métodos forenses en sistemas en vivo de Windows y macOS
description: La inspección directa de un dispositivo puede ser necesaria para comprender lo que está sucediendo en el mismo e identificar procesos, artefactos o tráfico sospechosos.
weight: 5
---

## Estudio de caso

La inspección directa de un dispositivo puede ser necesaria para comprender lo que está sucediendo en el mismo e identificar procesos, artefactos o tráfico sospechosos. Vaya más allá de las herramientas de escaneo utilizando métodos para examinar más a fondo lo que está ocurriendo en un dispositivo.

## Objetivos

Después de completar este módulo, el profesional debe ser capaz de:

- Comprender las formas de inspeccionar procesos en ejecución y métodos para clasificar procesos potencialmente sospechosos.
- Comprender los mecanismos de persistencia comunes y las formas de comprobarlos.
- Inspeccionar el tráfico de red en busca de comunicaciones sospechosas.

---
## Sección Principal

Los métodos forenses requieren un mayor conocimiento sobre las operaciones internas de un sistema operativo, así como el desarrollo de un instinto para distinguir entre hallazgos normales y anormales.

### Windows

La [Guía Breve de Análisis Forense](https://pellaeon.gitbook.io/mobile-forensics/es) proporciona una buena introducción a los enfoques forenses para la inspección de dispositivos. La guía incluye una introducción al importante conjunto de herramientas _Sysinternals_ que Microsoft ofrece. Complete las secciones de la guía sobre [Autoruns](https://pellaeon.gitbook.io/mobile-forensics/es/windows/autoruns), [Process Explorer](https://pellaeon.gitbook.io/mobile-forensics/es/windows/processes), y [TCPView](https://pellaeon.gitbook.io/mobile-forensics/es/windows/network).[^1]

Después de completar las actividades guiadas, usted debería estar en capacidad de:

- Comprender qué es [SysInternals suite](https://learn.microsoft.com/en-us/sysinternals/) y cómo utilizar algunas de sus útiles herramientas para el análisis forense.
- Leer y entender los resultados de la herramienta Sysinternals Autoruns y comprender cuáles son las diferentes localizaciones y métodos de persistencia (entendiendo las diferentes pestañas mostradas en la herramienta).
- Leer y filtrar resultados de la herramienta Sysinternals Autoruns para identificar binarios sin firmar de Microsoft, y cómo verificar los hashes de archivos en VirusTotal.
- Saber cómo leer y entender los resultados de Process Explorer, incluyendo cómo verificar los procesos en ejecución con firmas de archivos no verificadas y cómo comprobar los hashes de procesos en VirusTotal.


Las herramientas de SysInternal de Microsoft son ampliamente utilizadas; podráencontrar tutoriales adicionales sobre su uso en la web. Sin embargo, la [Guía Breve de Análisis Forense](https://pellaeon.gitbook.io/mobile-forensics/es) proporciona una buena y objetiva introducción.

### Mac OS

Existen [algunas herramientas para macOS](https://objective-see.org/tools.html) creadas por Objective-See que pueden ayudar a detectar actividad potencialmente sospechosa en un sistema. Muchas de las herramientas de Objective-See tienen una búsqueda integrada en VirusTotal; esta es una herramienta que también mencionaremos más adelante en esta ruta de aprendizaje. Para un tutorial rápido sobre VirusTotal, consulta el [capítulo 7 de la guía de campo](https://internews.org/wp-content/uploads/2024/12/Field-Guide-to-Incident-Response-for-Civil-Society-and-Media-Chapter-8-ES.pdf). Recomendamos a los estudiantes que deseen familiarizarse más con macOS echar un vistazo a las siguientes herramientas:

- LuLu: una aplicación de firewall gratuita y con muchas funciones para macOS. Puede enumerar todas las conexiones de red salientes y, por lo tanto, detectar cualquier intento de malware de comunicarse con un servidor. Consulte el manual completo de [LuLu](https://objective-see.org/products/lulu.html), que muestra cómo buscar procesos específicos que intentan establecer una conexión de red. Si no está seguro acerca de procesos específicos, también puede buscarlo en VirusTotal (LuLu tiene una búsqueda integrada) o buscarlo en su motor de búsqueda favorito y ver qué dicen otros al respecto.
- OverSight: Una herramienta que alerta al usuario cada vez que se habilita el micrófono o la cámara web. Si el malware intenta capturar información a través del micrófono o la cámara, entonces la herramienta debería alertar a un usuario o analista al respecto.
- KnockKnock y BlockBlock: Estas dos aplicaciones detectan el software que se ejecuta  cuando el usuario inicia sesión en el sistema. Por lo tanto, puede alertar al usuario o analista sobre malware que persiste o que comienza a ejecutarse nuevamente cada vez que se reinicia el sistema. KnockKnock puede proporcionar una lista de software persistentes, mientras que BlockBlock envía un mensaje de alerta cada vez que se instala un nuevo componente persistente.
- KextViewer: Una herramienta para revisar e inspeccionar extensiones del núcleo o *kernel*, paquetes que amplían el código central del sistema operativo y se ejecutan con el nivel de privilegio más alto.

## Práctica

### Windows y macOS

1. Abra el administrador de procesos de su sistema operativo y revise sus salidas. ¿Observa algún proceso que parezca fuera de lugar o que consuma una cantidad inusualmente alta o baja de recursos? Anótelos y búsquelos en la web para obtener más información sobre ellos.
2. Mientras rastrea las conexiones de red según se describe en la Guía de Forense Móvil (artículos para [Windows](https://pellaeon.gitbook.io/mobile-forensics/es/windows/network) y [macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network)), abra una o dos aplicaciones que se conecten a internet y anote a qué direcciones IP se conectan. ¿Hay algo que le sorprenda sobre alguna de esas conexiones o direcciones IP?
3. Revise los ítems de inicio y sepáralos entre los que provienen del proveedor de su sistema operativo y los que provienen de otros proveedores. Busque en línea tres de ellos para aprender más sobre lo que hacen. Si está trabajando con un compañero o mentor/a, discutan los hallazgos juntos.

### Android

Lea esta guía: [Guía para principiantes - cómo manejar una aplicación móvil potencialmente maliciosa: PiRogue Tool Suite (pts-project.org)](https://pts-project.org/guides/g3/)

## Verificación de habilidades

1. Descargue una pieza de malware reciente de Malware Bazaar. Envíela a una *sandbox* pública (como Triage) y compruebe qué hace en el sistema.
   Escriba sus hallazgos y luego discútalos con un mentor/a o colega que se asegurará de que haya realizado correctamente el ejercicio.
   (Nota: puede suceder que el malware parezca “no hacer nada”. En ese caso, discútalo con el mentor/a y colega e intente un tipo diferente de malware.)
2. (Ejercicio adicional, opcional) Revise [este análisis](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html) de la compañía de seguridad Trend Micro y compárelo con [este informe](https://tria.ge/240207-qlmmrahhgr/behavioral1) de Triage. Comparta sus impresiones sobre ambos con un mentor/a o colega, centrándose en cuestiones como las formas en que los dos informes etiquetan los TTP y tratan de explicar el malware. Hablen sobre qué formato encuentran más legible y por qué. (Nota: este malware, que Trend Micro llama “Earth Preta”, también se conoce como “Mustang Panda” y se ha dirigido a organizaciones de medios y ONG, sobre todo en Myanmar).

## Recursos de Aprendizaje

{{% resource title="Forense móvil" description="Una guía completa sobre cómo realizar análisis forenses y triaje para muchos de los principales sistemas operativos" languages="Inglés" cost="Gratis" url="https://pellaeon.gitbook.io/mobile-forensics/" %}}
{{% resource title="Sysinternals" description="Una serie de excelentes herramientas que los analistas pueden utilizar para comprender mejor lo que sucede en un sistema Windows" languages="Inglés" cost="Gratis" url="https://learn.microsoft.com/en-us/sysinternals/" %}}
{{% resource title="Herramientas Objective-see" description="Excelentes herramientas de seguridad para macOS que pueden ayudar a detectar infecciones de malware o intentos de recopilar/filtrar datos" languages="Inglés" cost="Gratis" url="https://objective-see.org/tools.html" %}}

## Notas

[^1]: La herramienta CrowdInspect de Crowdstrike no está siendo mantenida activamente y es posible que no tenga todas las funciones, por lo que recomendamos centrarse en las herramientas de Microsoft mencionadas en este módulo. Sin embargo, usando la herramienta aún es posible obtener información útil  similar a las obtenida de herramientas como _Process Explorer_ y _TCPView_
