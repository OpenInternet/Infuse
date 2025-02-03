---
style: module
title: Detección de malware mediante análisis de tráfico
weight: 6
---

## Estudio de caso

La mayoría de los programas maliciosos realizan algún tipo de conexión de red, ya sea para conectarse a un servidor de comando y control para recibir instrucciones adicionales o para extraer datos de una computadora. Si bien el malware puede usar diversas tácticas para evitar ser detectado por los escáneres antivirus, en muchos casos un analista con acceso a todo el tráfico de red del dispositivo puede detectar esas conexiones sospechosas y analizarlas en busca de signos de actividad maliciosa.

Use este método para configurar una solución de análisis de tráfico en línea, por ejemplo, utilizando un dispositivo de punto de acceso WiFi que funcione con una Raspberry Pi, como se discute en algunas de las herramientas mencionadas aquí. Otras opciones podrían incluir el uso de puertos TAP o SPAN para capturar el tráfico de todos los usuarios de una red local, como puede ser una oficina.

Nota para los estudiantes: Este módulo da por hecho que usted tiene acceso a una Raspberry Pi. Si este no es el caso, puede omitirlo y pasar al siguiente._

## Objetivos

Después de completar este módulo, el profesional debe ser capaz de: 

- Comentar con el cliente el enfoque sugerido de análisis de tráfico, incluyendo la explicación del proceso, los riesgos y las limitaciones de la acción.
- Seleccionar una herramienta apropiada de análisis de tráfico de red e implementarla utilizando la configuración de hardware o software relevante.
- Investigar y comprender qué conjunto de reglas o heurísticas se están utilizando para cada enfoque de análisis de tráfico de red y entender cuáles son sus fortalezas o debilidades.
- Leer los resultados de los flujos de red marcados y ser capaz de hacer un triaje de cuáles resultados requieren una investigación adicional o una acción de mitigación de riesgos.


---
## Sección Principal

En lugar de analizar archivos y procesos en un dispositivo, el malware también puede ser identificado por las comunicaciones de red que se inician o a las que responde. Este enfoque tiene varias ventajas sobre el análisis basado en dispositivos, ya que es difícil para el malware evitar hacer comunicaciones de red en algún momento, y, en algunos casos, le permite a usted como asesor tecnológico investigar varios dispositivos a la vez.

### Captura de tráfico utilizando una Raspberry Pi

En esta sección, veremos dos herramientas: PiRogue Tool Suite y SpyGuard. Ambas herramientas requieren hardware adicional (una computadora pequeña y económica llamada Raspberry Pi y una tarjeta SD).

‼️ Después de aprender las habilidades en cualquiera de las dos herramientas, usted debería poder:

- Instalar la herramienta seleccionada en la tarjeta SD de una Raspberry Pi y realizar la configuración inicial.
- Acceder al panel de control de la herramienta.
- Conectar dispositivos al punto de acceso WiFi.
- Identificar dispositivos conectados al punto de acceso (si se conectan varios dispositivos a la vez).
- Leer e interpretar hallazgos sospechosos y hacer triaje de cuáles requieren soluciones para remediar el riesgo y cuáles necesitan una investigación adicional.
Avanzado: configurar el registro de eventos y las notificaciones en la herramienta seleccionada.
- Avanzado: realizar la captura de tráfico para una investigación más a fondo.


#### PiRogue Tool Suite

PiRogue Tool Suite es un conjunto de herramientas de software que convierte la Raspberry Pi en una estación de análisis de malware. Fue desarrollada por Defensive Lab Agency. Sirve como un rúter intermediario, que se sitúa entre un dispositivo que usted sospecha podría estar infectado y el internet. Dicho rúter captura y analiza todos los servidores y servicios con los que el dispositivo infectado intenta comunicarse. Esto se puede utilizar para detectar potenciales actividades de malware.

Si estás interesado en ejecutar esas herramientas, consulta la [excelente documentación](https://pts-project.org/docs/prologue/introduction/) del autor. Recomendamos comenzar con la guía para principiantes, que explica [cómo configurar un PiRogue](https://pts-project.org/guides/g1/) y [cómo realizar sus primeros análisis](https://pts-project.org/guides/g2/).

#### SpyGuard

Una herramienta alternativa, llamada SpyGuard, también se ejecuta en Raspberry Pi u otros dispositivos Linux y funciona como enrutador intermediario. A diferencia de PiRogue Tool Suite, que se centra principalmente en análisis de red más avanzados, SpyGuard se enfoca en escanear el tráfico de red en busca de IoCs conocidos y [comportamientos potencialmente sospechosos](https://github.com/SpyGuard/SpyGuard/wiki/Detection-methods-and-IOCs) como contactar dominios registrados recientemente o utilizar puertos inusuales. SpyGuard se deriva de otro proyecto llamado TinyCheck, que fue diseñado originalmente para una asociación francesa de mujeres para detectar rastros de stalkerware (malware utilizado para espiar a personas sin su consentimiento. A menudo el SpyGuard lo instalan personas que abusan de sus parejas y lo hacen en sus dispositivos móviles. Sin embargo, sus capacidades se han ampliado y ahora se puede utilizar para realizar pruebas en muchos otros tipos de malware. Puedes leer más sobre SpyGuard [en su página de github](https://github.com/SpyGuard/SpyGuard/).

### Otros Enfoques

#### Cortafuegos salientes

El uso de un cortafuegos de dispositivo “ruidoso” que solicita permiso para enviar tráfico de Internet, es una forma útil aunque complicada, de identificar procesos de conexión de red y potencialmente identificar comunicaciones sospechosas. Esto requiere un nivel de familiaridad con los procesos comunes en la plataforma elegida para poder identificar procesos no sospechosos, así como la capacidad de investigar bloques de IP y búsquedas de DNS. Dejar esto activo en la computadora de un cliente no siempre es la mejor opción, ya que es difícil investigar adecuadamente cada proceso. Sin embargo, como profesional de la seguridad digital, es útil poder realizar este trabajo en su dispositivo o en el dispositivo del cliente al que asiste. Algunos cortafuegos de punto final o endpoint en esta categoría incluyen:

- Mac OS
  - [LuLu](https://objective-see.org/products/lulu.html) (Código Abierto, gratuito).
  - [Little Snitch](https://www.obdev.at/products/littlesnitch) (de pago) o [Little Snitch Mini](https://www.obdev.at/products/index.html) (Patentado, gratis).
- Windows
  - [PortMaster](https://safing.io/) (Disponible en versión de Código Abierto, gratuita/de Pago, con función de historial/investigación de red).
  - [GlassWire](https://www.glasswire.com/) (Versión disponible patentada gratuita/de pago).
- Android
  - [NetGuard](https://github.com/M66B/NetGuard) (Disponible versión de Código Abierto gratuita / Versión Freemium con captura/historial de tráfico).
  - [AFWall+](https://github.com/ukanth/afwall) (Código Abierto, gratuito).
- Linux
  - [OpenSnitch](https://github.com/evilsocket/opensnitch) (Código Abierto, gratuito).

Los cortafuegos salientes pueden ser un poco difíciles de dominar al principio. La relación señal-ruido está lejos de ser óptima. Antes de utilizarlas en su propio análisis, le recomendamos trabajar primero con otros profesionales que tengan experiencia con tales herramientas.

#### Análisis de tráfico de terceros

El tráfico puede ser capturado, filtrado o analizado por terceros. Uno de esos servicios semiautomáticos es [Emergency VPN](https://www.civilsphereproject.org/emergency-vpn), dirigido por el proyecto Civilsphere de Czech Technical University. Este servicio permite generar e instalar un perfil VPN en cualquier plataforma. Después de conectarse a la VPN y ejecutar el tráfico del dispositivo a través de ella durante 24 horas, el servicio Emergency VPN enviará automáticamente un análisis que alerta de marcará cualquier hallazgo inicial. Posteriormente, el tráfico del dispositivo será retenido y analizado manualmente por un analista y, en caso de hallazgos maliciosos, se enviará un informe manual. Esta es una forma de subcontratar habilidades de análisis cuando sea necesario. Asegúrese de que usted o su cliente comprendan las implicaciones para su privacidad y se sientan cómodos con los riesgos asociados a la captura de tráfico externa.

Si tiene un momento para hacerlo y está de acuerdo con los riesgos para la privacidad  de compartir sus datos con el equipo de Emergency VPN, le recomendamos que lea un poco más sobre el servicio, lo ejecute durante unos días y luego analice los datos que reciba. Una vez que lo haya hecho, debería poder:

- Entender cómo funciona el servicio Emergency VPN.
- Solicitar un perfil de Emergency VPN e instalarlo en la plataforma que haya seleccionado.
- Leer y comprender el primer informe automatizado de Emergency VPN y analizar los resultados para así poder identificar cualquier hallazgo sospechoso que requiera investigaciones adicionales.

En otros casos, si está trabajando con un analista externo, es posible que le soliciten que realice un proceso similar basado en VPN o que ejecute una herramienta para capturar el tráfico de red. Por lo general, esto debe hacerse en un archivo PCAP (Packet CAPture) para compartirlo y revisarlo externamente.

### Análisis de Tráfico Manual y Seguimiento Organizacional

Si usted está listo para trabajar  a un nivel más alto,  necesitará desarrollar sus habilidades en la captura, filtrado y análisis de tráfico utilizando herramientas como Suricata, Zeek y Wireshark. A continuación, revise algunos recursos que le recomendamos:

- [Malware-traffic-analysis.net](https://www.malware-traffic-analysis.net/) - Contiene archivos de varios años con artículos de blogs y tutoriales para practicar habilidades de detección y análisis.
- Curso: [Monitoreo de Seguridad de Red con Suricata](https://www.pluralsight.com/courses/network-security-monitoring-suricata) (Pluralsight, gratis).
- Curso: [Curso de Capacitación en Caza de Amenazas](https://www.activecountermeasures.com/hunt-training/) (Contramedidas Activas, utiliza AC-Hunter CE, ofrecido en vivo mensualmente).

Considere también aprender sobre los despliegues organizativos de tales herramientas en diversas categorías, por ejemplo, utilizando [Security Onion](https://github.com/Security-Onion-Solutions/securityonion), [pfsense](https://www.pfsense.org/)/[Opensense](https://opnsense.org/), [AC-Hunter CE](https://www.activecountermeasures.com/ac-hunter-community-edition/), [RITA](https://github.com/activecm/rita), y [Wazuh](https://wazuh.com/)

### Entender: Limitaciones y Privacidad

Como ocurre con todos los enfoques en esta ruta de aprendizaje, existen fortalezas y debilidades en cada método de detección de malware y estos solo serán efectivos en la medida que se usen conjuntamente con las habilidades y experiencia adecuadas.  veces, estos métodos requieren acceder a las fuentes de amenazas o conjuntos de reglas adecuados. En e análisis de redes las cosas no son diferentes.

Los enfoques de análisis de tráfico combinan reglas estrictas como “esta IP se considera maliciosa” junto con reglas heurísticas como “cantidad inusual de tráfico saliente a una nueva IP” o “uso inesperado de puerto/protocolo”. Dado que el primer enfoque se basa en IoC, sólo puede detectar malware conocido y bien documentado. Si bien estos últimos enfoques heurísticos pueden detectar malware novedoso, a menudo requieren habilidades de análisis adicionales para capturar y revisar manualmente el tráfico en una herramienta como Wireshark mientras se utilizan reglas e IoC adicionales para buscar amenazas específicas. Más adelante enumeramos varios recursos para aprender habilidades de análisis adicionales .

Algunos programas maliciosos sofisticados podrían exfiltrar datos o contactar servidores de maneras muy sutiles o confusas, lo que complica aún más el análisis.

Es importante comprende también que interceptar el tráfico en el dispositivo del cliente puede exponer actividades en línea u otra información privada almacenada allí.  La mayor parte del tráfico del dispositivo estará cifrado con TLS; esto significa que un analista no podrá capturar mensajes privados ni contraseñas. Aun así, sigue habiendo una cantidad sustancial de información privada que podría capturarse, incluidos los servicios que alguien usa, los dominios que visita y las páginas potencialmente confidenciales por las que navega o los servicios que utiliza. Algunas herramientas mostrarán flujos de tráfico en vivo en un panel de control, lo que potencialmente podría revelar información privada en un entorno grupal. Asegúrese de que su cliente entienda el proceso y maneje cualquier información recopilada con la máxima confidencialidad y OPSEC.

## Verificación de habilidades

Configure PiRogue en una Raspberry Pi y verifique el tráfico desde un dispositivo. Idealmente, este sería un dispositivo de prueba en el que haya instalado muchas aplicaciones aleatorias. Intente comprender la información que sale y las alertas genere PiRogue. Anote al menos tres tipos diferentes de salidas de datos, explique lo que cree que significan y discútalas con un mentor/a o compañero/a.

## Recursos de Aprenizaje

{{% resource title="Documentación de Pirogue Tool Suite" description="La documentación de Pirogue Tool Suite" languages="Inglés" cost="Gratis" url="https://pts-project.org/docs/prologue/introduction/" %}}
{{% resource title="Guías de Pirogue Tool Suite" description="Conjunto adicional de guías para Pirogue Tool Suite" languages="Inglés" cost="Gratis" url="https://pts-project.org/docs/" %}}
{{% resource title="SpyGuard wiki" description="La documentación de SpyGuard" languages="Inglés" cost="Gratis" url="https://github.com/SpyGuard/SpyGuard/wiki" %}}
{{% resource title="Análisis de Tráfico de Malware" description="Un recurso avanzado con archivos PCAP de muestra para aquellos que deseen ir más allá en el desarrollo de sus habilidades de análisis de tráfico." languages="Ingles" cost="Gratis" url="https://malware-traffic-analysis.net/" %}}
{{% resource title="Emergency VPN" description="Un proyecto de CivilSphere, que le permite conectarse a una VPN especial que recopila los datos de conectividad a Internet de su dispositivo y luego compila informes detallados sobre los mismos." languages="Inglés" cost="Gratis" url="https://www.civilsphereproject.org/emergency-vpn" %}}
{{% resource title="Curso de Capacitación para Cazar Amenazas" description="Un curso gratuito de un día sobre análisis e interpretación de datos de red para la caza de amenazas" languages="Inglés" cost="Gratis" url="https://www.activecountermeasures.com/hunt-training/" %}}
{{% resource title="Curso de monitoreo de seguridad de redes con Suricata" description="Un curso gratuito sobre cómo utilizar Suricata, una herramienta de detección de amenazas de código abierto de uso común" languages="Inglés" cost="Gratis" url="https://www.pluralsight.com/courses/network-security-monitoring-suricata" %}}
{{% resource title="Firewalls salientes: Lulu (macOS)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="Gratis" url="https://objective-see.org/products/lulu.html" %}}
{{% resource title="Firewalls salientes: Little Snitch (macOS)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="59 EUR" url="https://www.obdev.at/products/littlesnitch" %}}
{{% resource title="Firewalls salientes: Little Snitch Mini (macOS)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="Gratis" url="https://www.obdev.at/products/littlesnitch-mini/index.html" %}}
{{% resource title="Firewalls salientes: Portmaster (Windows, Linux)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="Gratis con funciones premium" url="https://safing.io/" %}}
{{% resource title="Firewalls salientes: GlassWire (Windows)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="Versión disponible patentada gratuita/de pago" url="https://www.glasswire.com/" %}}
{{% resource title="Firewalls salientes: NetGuard (Android)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="Disponible versión de Código Abierto Gratuita / Freemium con captura/historial de tráfico" url="https://github.com/M66B/NetGuard" %}}
{{% resource title="Firewalls salientes: AFWall+ (Android)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="Código Abierto, Gratuito" url="https://github.com/ukanth/afwall" %}}
{{% resource title="Firewalls salientes: OpenSnitch (Linux)" description="Un firewall de salida es un programa instalado en una computadora que analiza todo el tráfico que sale de él y todos los servidores a los que se conecta. Si bien puede recopilar una gran cantidad de datos, la relación señal/ruido también puede ser peor que con otras herramientas." languages="Diversos" cost="Código Abierto, Gratuito" url="https://github.com/evilsocket/opensnitch" %}}
{{% resource title="Plataformas de Caza de Amenazas: Security Onion" description="Aquí presentamos varias plataformas que utilizan datos de red para detectar posibles amenazas dentro de un sistema" languages="Varios" cost="Gratis" url="https://github.com/Security-Onion-Solutions/securityonion" %}}
{{% resource title="Plataformas de Caza de Amenazas: PFSense" description="Aquí presentamos varias plataformas que utilizan datos de red para detectar posibles amenazas dentro de un sistema" languages="Varios" cost="Gratis" url="https://www.pfsense.org/" %}}
{{% resource title="Plataformas de Caza de Amenazas: OPNSense" description="Aquí presentamos varias plataformas que utilizan datos de red para detectar posibles amenazas dentro de un sistema" languages="Varios" cost="Gratis" url="https://opnsense.org/" %}}
{{% resource title="Plataformas de Caza de Amenazas: AC Hunter Community Edition" description="Aquí presentamos varias plataformas que utilizan datos de red para detectar posibles amenazas dentro de un sistema" languages="Varios" cost="Gratis" url="https://www.activecountermeasures.com/ac-hunter-community-edition/" %}}
{{% resource title="Plataformas de Caza de Amenazas: RITA" description="Aquí presentamos varias plataformas que utilizan datos de red para detectar posibles amenazas dentro de un sistema" languages="Varios" cost="Gratis" url="https://github.com/activecm/rita" %}}
{{% resource title="Plataformas de Caza de Amenazas; Wazuh" description="Aquí presentamos varias plataformas que utilizan datos de red para detectar posibles amenazas dentro de un sistema" languages="Varios" cost="Gratis" url="https://wazuh.com/" %}}
{{% resource title="Plataformas de Caza de Amenazas: Suricata" description="Aquí presentamos varias plataformas que utilizan datos de red para detectar posibles amenazas dentro de un sistema" languages="Varios" cost="Gratis" url="https://suricata.io/features/" %}}
