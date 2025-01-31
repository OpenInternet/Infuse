+++
style = "module"
weight = 5
title = "Métodos forenses en vivo en sistemas Windows y macOS"
+++

## Caso de Uso

La inspección directa de un dispositivo puede ser necesaria para comprender lo que está sucediendo en él e identificar procesos, artefactos o tráfico sospechosos. Ve más allá de las herramientas de escaneo utilizando métodos para examinar más a fondo lo que está ocurriendo en un dispositivo.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Comprender las formas de inspeccionar procesos en ejecución y métodos para clasificar procesos potencialmente sospechosos.
- Comprender los mecanismos de persistencia comunes y las formas de comprobarlos.
- Inspeccionar el tráfico de red en busca de comunicaciones sospechosas.

---
## Sección Principal

Los métodos forenses requieren un mayor conocimiento sobre las operaciones internas de un sistema operativo, así como el desarrollo de un instinto para distinguir entre hallazgos normales y anormales.

### Windows

La [Guía Breve de Análisis Forense](https://pellaeon.gitbook.io/mobile-forensics/) proporciona una buena introducción a los enfoques forenses para la inspección de dispositivos. La guía incluye una introducción al importante conjunto de herramientas _Sysinternals_ que Microsoft ofrece. Complete las secciones de la guía sobre [Autoruns](https://pellaeon.gitbook.io/mobile-forensics/es/windows/autoruns), [Process Explorer](https://pellaeon.gitbook.io/mobile-forensics/es/windows/processes), y [TCPView](https://pellaeon.gitbook.io/mobile-forensics/es/windows/network).[^1]

Después de completar las actividades guiadas, deberías poder:

- Comprender qué es [SysInternals suite](https://learn.microsoft.com/en-us/sysinternals/) y cómo utilizar algunas de las herramientas útiles para el análisis forense.
- Leer y entender los resultados de la herramienta Sysinternals Autoruns y comprender cuáles son las diferentes localizaciones y métodos de persistencia (entendiendo las diferentes pestañas mostradas en la herramienta).
- Leer y filtrar resultados de la herramienta Sysinternals Autoruns para identificar solo binarios sin firmar de Microsoft, y cómo verificar los hashes de archivos en VirusTotal.
- Saber cómo leer y entender los resultados de Process Explorer, incluyendo cómo verificar los procesos en ejecución con firmas de archivos no verificadas y cómo verificar los hashes de procesos en VirusTotal.

Las herramientas de SysInternal de Microsoft son ampliamente utilizadas y podrás encontrar tutoriales adicionales sobre su uso en la web, sin embargo, la [Guía Breve de Análisis Forense](https://pellaeon.gitbook.io/mobile-forensics/) proporciona una buena introducción objetiva.

### Mac OS

Existen [algunas herramientas para macOS](https://objective-see.org/tools.html) creadas por Objective-See que pueden ayudar a detectar actividad potencialmente sospechosa en un sistema. Muchas de las herramientas de Objective-See tienen una búsqueda integrada en VirusTotal; esta es una herramienta que también mencionaremos más adelante en esta ruta de aprendizaje. Para un tutorial rápido sobre VirusTotal, consulta el [capítulo 7 de la guía de campo](https://internews.org/wp-content/uploads/2024/12/Field-Guide-to-Incident-Response-for-Civil-Society-and-Media-Chapter-8-ES.pdf). Recomendamos que los aprendices que deseen familiarizarse más con macOS echen un vistazo a las siguientes herramientas:

- LuLu: una aplicación de firewall gratuita y con muchas funciones para macOS. Puedes enumerar todas las conexiones de red salientes y, por lo tanto, detectar cualquier intento de malware de comunicarse con un servidor. Consulte el manual completo de [LuLu](https://objective-see.org/products/lulu.html), que muestra cómo buscar procesos específicos que intentan establecer una conexión de red. Si no estás seguro acerca de procesos específicos, también puedes buscarlo en VirusTotal (LuLu tiene una búsqueda integrada) o buscarlo en tu motor de búsqueda favorito y ver qué dicen otros al respecto.
- OverSight: Una herramienta que alerta al usuario cada vez que se habilita el micrófono o la cámara web. Si el malware intenta capturar información a través del micrófono o la cámara, entonces la herramienta debería alertar a un usuario o analista al respecto.
- KnockKnock y BlockBlock: Esas dos aplicaciones detectan el software que se ejecutan al inicio cuando el usuario inicia sesión en el sistema. Por lo tanto, puede alertar al usuario o analista sobre malware que persiste o que comienza a ejecutarse nuevamente cada vez que se reinicia. _KnockKnock_ puede proporcionar una lista de software persistente, mientras que _BlockBlock_ envía una alerta cada vez que se instala un nuevo componente persistente.
- KextViewer: Una herramienta para revisar e inspeccionar extensiones del kernel, paquetes que amplían el código central del sistema operativo y se ejecutan con el nivel de privilegio más alto.

## Práctica

### Windows y macOS

1. Abre el administrador de procesos de tu sistema operativo y revisa sus salidas. ¿Observas algún proceso que parezca fuera de lugar o que consuma una cantidad inusualmente alta o baja de recursos? Anótalos y búscalos en la web para obtener más información sobre ellos.
2. Mientras rastreas las conexiones de red según se describe en la Guía de Forense Móvil (artículos para [Windows](https://pellaeon.gitbook.io/mobile-forensics/es/windows/network) y [macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network)), abre una o dos aplicaciones que se conecten a internet y anota a qué direcciones IP se conectan. ¿Hay algo sorprendente sobre alguna de esas conexiones o direcciones IP?
3. Revisa los ítems de inicio y sepáralos entre los que provienen del proveedor de tu sistema operativo y los que provienen de otros proveedores. Busca en línea tres de ellos para aprender más sobre lo que hacen. Si estás trabajando con un compañero o mentor, discute los hallazgos con ellos.

### Android

Lee esta guía: [Guía para principiantes - cómo manejar una aplicación móvil potencialmente maliciosa: PiRogue Tool Suite (pts-project.org)](https://pts-project.org/guides/g3/)

## Verificación de habilidades

1. Descarga una pieza de malware reciente de Malware Bazaar. Envíala a una sandbox pública (como Triage) y comprueba qué hace en el sistema.  
    Escribe tus hallazgos y luego discútelos con un mentor o un colega que se asegurará de que hayas realizado correctamente el ejercicio.  
    (Nota: puede suceder que el malware parezca "no hacer nada". En ese caso, discútelo con un mentor y un colega e intenta un tipo diferente de malware.)
2. (Ejercicio opcional, adicional) Revisa [este análisis](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html) de la compañía de seguridad Trend Micro y compáralo con [este informe](https://tria.ge/240207-qlmmrahhgr/behavioral1) de Triage. Discute esos dos con un mentor o colega, centrándote en cuestiones como las formas en que ambos informes etiquetan los TTP y tratan de explicar el malware. Habla sobre qué formato encuentras más legible y por qué. (Nota: este malware, que Trend Micro llama “Earth Preta”, también se conoce como “Mustang Panda” y se ha dirigido a organizaciones de medios y ONG, sobre todo en Myanmar).

## Recursos Educativos

{{% resource title="Forense móvil" description="Una guía completa sobre cómo realizar análisis forenses y triage para muchos de los principales sistemas operativos" languages="Inglés" cost="Gratis" url="https://pellaeon.gitbook.io/mobile-forensics/" %}}
{{% resource title="Sysinternals" description="Una serie de excelentes herramientas que los analistas pueden utilizar para comprender mejor lo que sucede en un sistema Windows" languages="Inglés" cost="Gratis" url="https://learn.microsoft.com/en-us/sysinternals/" %}}
{{% resource title="Herramientas Objective-see" description="Excelentes herramientas de seguridad para macOS que pueden ayudar a detectar infecciones de malware o intentos de recopilar/exfiltrar datos" languages="Inglés" cost="Gratis" url="https://objective-see.org/tools.html" %}}

## Notas

[^1]: La herramienta CrowdInspect de Crowdstrike no está siendo mantenida activamente y es posible que no tenga todas las funciones, por lo que recomendamos centrarse en las herramientas de Microsoft mencionadas en la guía para esta sección. Sin embargo, aún puedes obtener información útil utilizando la herramienta y puedes obtener tipos de percepciones similares a las obtenidas de herramientas como _Process Explorer_ y _TCPView_