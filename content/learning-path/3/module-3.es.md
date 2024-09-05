+++
style = "module"
weight = 3
title = "Sandboxes y análisis dinámico"
description = "El análisis dinámico es el proceso de ejecutar un programa malicioso y observar lo que hace. La forma más sencilla de hacerlo es ejecutar un programa en un entorno seguro y aislado llamado sandbox."
+++

## Caso práctico

El análisis dinámico es el proceso de ejecutar un malware y observar lo que hace. La forma más fácil de hacer un análisis dinámico es ejecutar un software en un sandbox. Un sandbox es un entorno seguro y aislado que abre un archivo, URL o programa potencialmente malicioso y genera una gran cantidad de datos en él. Este subtema analiza el análisis de sandbox, lo que puede y no puede hacer y cómo hacerlo.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Comprender el caso de uso y las limitaciones del análisis dinámico
- Comprender las ventajas y limitaciones de los sandboxes
- Abrir un archivo, URL o programa sospechoso en un sandbox
- Ser capaz de realizar algunos análisis dinámicos básicos en binarios de Windows o Android utilizando herramientas listas para usar

---
## Sección Principal
### Análisis dinámico

Cuando realice un análisis dinámico en un archivo potencialmente sospechoso, abrirá y ejecutará el archivo en una herramienta especializada y observará lo que hace este archivo, si intenta acceder a otros archivos, si realiza conexiones de red y similares. El análisis estático, descrito en el subtema 4, por otro lado, desmonta el archivo en lugar de abrirlo o ejecutarlo.

Dependiendo de la situación, el análisis dinámico puede ser más fácil o difícil que el análisis estático, y también puede ser más o menos preciso. En la práctica, una combinación de análisis estático y dinámico probablemente producirá los mejores resultados. La mayoría de los análisis dinámicos también implicarán algún análisis estático, por lo que la línea entre las dos técnicas a menudo es borrosa.

La configuración general para el análisis dinámico incluye un sandbox en la que se ejecuta el malware, un depurador para controlar y monitorear la ejecución del programa, monitoreo del sistema para observar los cambios en el estado del sistema del sandbox y algo para mediar en el acceso a Internet para bloquear, observar y/o modificar el tráfico de red. Todos estos pueden existir en un sistema, o pueden ser dispositivos virtuales o físicos separados. Por ejemplo, puedes usar un iPhone con jailbreak como sandbox, una herramienta para la depuración remota y el monitoreo del sistema, y otra herramienta para la mediación de Internet. No todos los sistemas se pueden usar en todas las situaciones, por ejemplo, puede capturar el tráfico de red y monitorear los cambios del sistema sin usar un depurador.

Hay muchos métodos diferentes en los que podríamos realizar un análisis dinámico, incluso abriendo el ejecutable en un sandbox y verificando las conexiones de red que realice. Para obtener un gran recurso sobre la detección de malware a través del tráfico de red que genera, consulte [esta guía](https://malware-traffic-analysis.net/).

En teoría, el análisis dinámico podría alertar a un actor de amenazas de que estás analizando su malware. En la práctica, los adversarios a menudo esperan que se analice su malware y es muy raro encontrar un malware completamente nuevo en tu carrera. Con la excepción de algunos casos muy sensibles, no nos preocuparíamos por este riesgo.

### Sandboxes

Un sandbox (malware) es un entorno seguro en el que puedes abrir y ejecutar un archivo o una URL. Es esencialmente una máquina virtual diseñada a medida que se inicia antes de que se abra el archivo o la URL, y luego se apaga después de un cierto tiempo.

Todas las actividades en el sandbox, como los archivos que se abren o crean, así como las conexiones de red realizadas, se registran y se puede acceder a ellas a través de un informe de actividad. El informe de actividad puede ayudarte a comprender si el archivo o la URL eran maliciosos. También puede ayudarlo a vincular el malware a actividades vistas anteriormente, por ejemplo, en función de conexiones de red específicas o archivos que se crean.

Ejecutar malware conocido dentro de un sandbox también puede ser muy útil a medida que aprende más sobre el malware. Le ayuda a comprender qué hace el malware y qué cambios realiza en el sistema. Por ejemplo, una gran cantidad de malware cuando se ejecuta inicialmente intenta garantizar la persistencia para que aún se ejecute después de un reinicio. Estos métodos de persistencia son algo que puede buscar cuando realiza análisis forenses manuales en un posible dispositivo infectado.

Una gran cantidad de malware tiene funciones anti-sandbox integradas: cuando el malware detecta que se está ejecutando dentro de un entorno sandbox, terminará o, a veces, hará algo inofensivo para confundir el análisis. Además, algunos programas maliciosos están diseñados para ejecutarse solo si se cumplen condiciones específicas, por ejemplo, una versión específica del sistema operativo o una dirección IP ubicada en un país específico. Los sandboxes a menudo se actualizan para responder a los métodos anti-sandbox y muchos sandboxes le permiten elegir las propiedades determinadas.

Es importante tener esto en cuenta al leer un informe de sandbox: la falta de actividad maliciosa no significa automáticamente que el archivo o la URL no sean maliciosos. Por otro lado, si se mostró actividad maliciosa, puede estar seguro de que el archivo o la URL eran maliciosos.

Consulte el [Capítulo 10 de la Guía de Campo para la respuesta a incidentes para la sociedad civil y los medios de comunicación](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) para obtener una introducción más detallada a los sandboxes.

Es posible ejecutar un sandbox localmente. [Cuckoo](https://cuckoosandbox.org/) es un sandbox de código abierto que ha existido durante muchos años. Se está desarrollando una [nueva versión](https://github.com/cert-ee/cuckoo3), pero aún no está disponible en el momento de escribir este artículo (febrero de 2024).

Si bien que ejecutar un sandbox localmente le brinda un control total del entorno y significa que puede mantener sus archivos y URL completamente privados, puede ser mucho trabajo configurarlos y mantenerlos. Afortunadamente, hay muchos sandboxes en línea disponibles, como [ANY.RUN](https://any.run/), [Hybrid Analysis](https://www.hybrid-analysis.com/), [Joe Sandbox](https://www.joesandbox.com/), [Triage](https://tria.ge/) e incluso una versión en línea de [Cuckoo](https://cuckoo.cert.ee/). Todos ellos tienen versiones gratuitas que te permiten cargar malware y URL, aunque algunos requieren registro. Ten en cuenta que si utilizas una versión gratuita, todo lo que ejecutes dentro de un sandbox estará disponible públicamente. Esto puede ser una preocupación si no desea alertar a un adversario o si se trata de datos muy privados, como documentos confidenciales potencialmente infectados.

### Análisis dinámico de binarios de Windows

Recomendamos comenzar con una clase general, esta vez de [OpenSecurityTraining](https://opensecuritytraining.info/Training.html). Su clase de [Análisis Dinámico de Malware](https://opensecuritytraining.info/MalwareDynamicAnalysis.html) incluye diapositivas, materiales de laboratorio y videos, y cubre la configuración, el análisis y la creación de IoC.

### Análisis dinámico de binarios de Android

Se pueden utilizar muchas herramientas para analizar dinámicamente los binarios de Android. Estos incluyen algunos de los sandboxes descritos anteriormente y [Frida](https://frida.re/docs/android/) (consulte [esta herramienta](https://github.com/nccgroup/house) para obtener una interfaz gráfica de usuario para Frida).

PiRogue Tool Suite (descrito en la ruta de aprendizaje de detección de malware) también puede realizar un [excelente análisis dinámico](https://pts-project.org/guides/g8/) de los binarios de Android, aunque algunos de esos métodos de análisis requieren que primero rootee su dispositivo.

## Verificación de Habilidades

### General

1. Vaya a la sección ‘Sandbox’ en el Capítulo 10 de la [Guía de campo para la respuesta a incidentes para la sociedad civil y los medios de comunicación](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) y realice los ejercicios 10.2 a 10.4. En el último ejercicio, asegúrate de ejecutar al menos una muestra de malware de macOS y Android cada uno.
2. En el mismo capítulo, vaya a la subsección "Análisis de enlaces" y haga el ejercicio 10.12.

### Específico de Windows

Realice un análisis dinámico en una pieza de software no malicioso de Windows. Probablemente incluye un instalador, que realizará acciones similares al malware. ¿Qué archivos crea? ¿Qué claves de registro crea? ¿Qué tráfico de red envía?

## Recursos de aprendizaje

{{% resource title="Capítulo 10, Guía de campo para la respuesta a incidentes para la sociedad civil y los medios de comunicación" description="Las primeras páginas de este capítulo proporcionan una visión en profundidad de cómo podemos usar sandboxes para analizar las cargas útiles de correo electrónico." languages="Inglés" cost="Gratis" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

{{% resource title="Any.run" description="Un sandbox comercial" languages="Inglés" cost="Gratis sólo para uso no comercial" url="https://any.run/" %}}

{{% resource title="Joe Sandbox" description="Sandbox comercial" languages="Inglés" cost="Gratis para cuentas públicas (los resultados del análisis se publicarán en el sitio web)" url="https://www.joesandbox.com/#windows" %}}

{{% resource title="Cuckoo Sandbox," description="Un servicio de sandbox gestionado por el CERT (Equipo de Respuesta a Emergencias Informáticas) de Estonia" languages="Inglés" cost="Gratis" url="https://cuckoo.cert.ee/" %}}

{{% resource title="Análisis Híbrido" description="Un servicio sandbox de CrowdStrike que mezcla análisis estático y dinámico" languages="Inglés" cost="Gratis" url="https://www.hybrid-analysis.com/" %}}

{{% resource title="Sandbox de triaje" description="Sandbox impulsado por la comunidad" languages="Inglés" cost="Se requiere registro" url="https://tria.ge/" %}}

{{% resource title="Clase online sobre análisis dinámico de malware" description="Una clase de tres días que proporciona una entrevista de análisis dinámico de malware. Si bien la clase puede estar basada en Windows XP, todo lo que importa en esta etapa del análisis de malware es el formato binario del programa. Sus fundamentos no han cambiado en la última década+, lo que hace que la clase siga siendo relevante." languages="Inglés" cost="Gratis" url="https://opensecuritytraining.info/MalwareDynamicAnalysis.html" %}}

{{% resource title="Estudio de caso 1: Análisis dinámico de un binario autopropagable malicioso de Windows" description="Esta entrada de blog, una lectura de 15 minutos, demuestra el análisis dinámico de un binario de Windows, incluido el tráfico de red y el tráfico de comando y control." languages="Inglés" cost="Gratis" url="https://www.keysight.com/blogs/tech/nwvs/2022/06/10/dynamic-analysis-of-a-windows-malicious-self-propagating-binary" %}}

{{% resource title="Estudio de caso 2: Configuración de un dominio de Windows para analizar dinámicamente una herramienta de movimiento lateral ofuscada" description="Investiga el malware que tiene mecanismos de desofuscación bastante potentes y explica cómo los analistas de seguridad pueden usar el análisis dinámico para obtener más información al respecto. Incluye piezas sobre cómo construir un entorno de prueba y hacer un análisis dinámico en un dominio específico." languages="Inglés" cost="Gratis" url="https://www.real-sec.com/2020/07/configuring-a-windows-domain-to-dynamically-analyze-an-obfuscatedlateral-movement-tool/" %}}

{{% resource title="Estudio de caso 3: Inicio del análisis dinámico en un rootkit de Windows x64" description="Una mirada en profundidad al análisis dinámico de los rootkits de Windows, incluida una descripción general de cómo configurar una máquina virtual específicamente para recopilar datos sobre ella. También muestra cómo combinar el análisis estático y dinámico." languages="Inglés" cost="Gratis" url="https://medium.com/@0x4ndr3/starting-dynamic-analysis-on-a-windows-x64-rootkit-8c7a74871fda" %}}

{{% resource title="Análisis de Tráfico de Malware" description="Un gran recurso que analiza cómo usar los paquetes de red capturados para detectar y analizar malware." languages="Inglés" cost="Gratis" url="https://malware-traffic-analysis.net" %}}

{{% resource title="Curso Hack The Box sobre pruebas de penetración móvil, recurso 1" description="Las herramientas y técnicas utilizadas para el análisis dinámico de malware móvil son en gran medida las mismas que las utilizadas para las pruebas de penetración de aplicaciones móviles. Este artículo (y los ejercicios asociados) proporcionan una sólida introducción a la práctica." languages="Inglés" cost="Gratis" url="https://www.hackthebox.com/blog/intro-to-mobile-pentesting" %}}

{{% resource title="Curso Hack The Box sobre pruebas de penetración móvil, recurso 2" description="Las herramientas y técnicas utilizadas para el análisis dinámico de malware móvil son en gran medida las mismas que las utilizadas para las pruebas de penetración de aplicaciones móviles. Este artículo (y los ejercicios asociados) proporcionan una sólida introducción a la práctica." languages="Inglés" cost="Gratis" url="https://app.hackthebox.com/tracks/Intro-to-Android-Exploitation" %}}

{{% resource title="Frida y House para Android: Frida" description="Frida es un marco de depuración multiplataforma de código abierto. Si bien no tiene una interfaz gráfica de usuario, es bastante potente, lo que le permite monitorear dinámicamente el comportamiento de la aplicación. Para que sea un poco más fácil de usar, hay una herramienta llamada House que es una interfaz para Frida." languages="Inglés" cost="Gratis" url="https://frida.re/docs/android/" %}}

{{% resource title="Frida y House para Android: House" description="Frida es un marco de depuración multiplataforma de código abierto. Si bien no tiene una interfaz gráfica de usuario, es bastante potente, lo que le permite monitorear dinámicamente el comportamiento de la aplicación. Para que sea un poco más fácil de usar, hay una herramienta llamada House que es una interfaz para Frida." languages="Inglés" cost="Gratis" url="https://github.com/nccgroup/house" %}}

{{% resource title="Guía avanzada - Cómo usar PiRogue para interceptar el tráfico TLS de una aplicación móvil" description="Una serie de instrucciones sobre cómo podría usar PiRogue Tool Suite para realizar análisis dinámicos en binarios de Android potencialmente maliciosos" languages="Inglés" cost="Gratis" url="https://pts-project.org/guides/g8/" %}}