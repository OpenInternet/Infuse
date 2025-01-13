---
style: module
title: Prerrequisitos OPSEC para detectar malware
weight: 2
---

## Caso de Uso

Antes de comenzar a analizar cualquier malware, debes configurar un entorno seguro para hacerlo. Definitivamente, el malware daña los sistemas en los que se ejecuta. No deseas ejecutarlo en tu sistema principal. Además, probablemente querrás evitar que el malware realmente establezca conexiones con los servidores de C&C (comando y control) del autor de amenazas. Ambos significan que debes configurar una máquina virtual para utilizarla al realizar análisis de malware.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de garantizar la confidencialidad e integridad de los datos, lo que incluye:

- Cifrado durante el almacenamiento y la transferencia.
- Hacer sumas de comprobación después de la adquisición de datos.
- No utilizar dispositivos sospechosos de estar comprometidos.
- Uso de entornos air-gapped (sin conexión física o inalámbrica).
- Garantizar la seguridad de los dispositivos y servidores utilizados en el proceso.
- Modelado de amenazas y evaluación de riesgos.
- Realización de copias de seguridad e imágenes de disco.

---
## Sección Principal

La seguridad operativa para detectar malware se puede dividir en preocupaciones relacionadas con escenarios específicos:

- Interactuar directamente con un dispositivo de estado desconocido.
- Usar un dispositivo "bueno" separado para interactuar con un dispositivo de estado desconocido.
- Interactuar con archivos o enlaces de estado desconocido.

### Usando un dispositivo de estado desconocido

En muchos casos, te entregarán un dispositivo y te pedirán que lo inspecciones en busca de malware (o es posible que necesites hacerlo en tu propio dispositivo).

Ten en cuenta que en caso de que el dispositivo esté comprometido, tus actividades pueden ser monitoreadas, lo que puede afectar el riesgo y la seguridad de tu cliente. Se pueden capturar todas las pulsaciones de teclas, incluido el acceso a cuentas en línea o comunicaciones. Los dispositivos de almacenamiento externos, como discos duros o memorias USB, pueden convertirse en objetivos para la transferencia de código malicioso, y cualquier conexión a la red puede ser utilizada para propagar o exfiltrar código malicioso.

También ten en cuenta que la introducción de herramientas de análisis puede activar un 'kill switch' (interruptor de apagado) en algunos malware que ha sido diseñado para evadir la detección y el análisis. En tales casos, puede ser necesario capturar una imagen de disco y otros registros forenses para un análisis más profundo. No se cubre en esta ruta de aprendizaje, pero se cubre en el [Análisis de Malware](/es/learning-path/3/).

### Usar un dispositivo "bueno" separado durante el proceso de detección de malware

Si sospechas que un dispositivo está infectado con malware, debes hacer lo menos posible con él hasta conocer más sobre su estado. Por esta razón, siempre debes usar un dispositivo en el que no sospeches ninguna infección por malware para manejar cualquier información sensible.

Si, por ejemplo, una persona a la que estás dando soporte sospecha que su computadora portátil o de escritorio podría haber sido comprometida, pídeles que utilicen solo su teléfono móvil para comunicarse contigo. Por lo general, es una buena idea apagar la computadora portátil o de escritorio potencialmente comprometida o, al menos, desconectarla de Internet. Si tu beneficiario ha vinculado sus cuentas de Signal, WhatsApp y otras a la computadora potencialmente comprometida, podría ser una buena idea desvincularlas (hacerlo desde un dispositivo que no sospeches que esté comprometido) mientras el proceso de detección está en curso.

### Interactuar con archivos o enlaces de estado desconocido

Al realizar el proceso de detección de malware, es posible que te encuentres con enlaces o archivos (ya sean archivos normales o ejecutables) sobre los que no estés seguro y que sospeches que podrían estar entregando payloads (cargas útiles) de malware. Si estás copiando esos enlaces o archivos desde un dispositivo potencialmente comprometido a un dispositivo de análisis, siempre existe el riesgo de que también infecten tu dispositivo de análisis. Para reducir las posibilidades de que esto ocurra, te recomendamos lo siguiente:

- Utilizar una máquina virtual en tu dispositivo de análisis y solo abrir los archivos allí. De esta manera, incluso si abres un enlace o archivo malicioso e infecta tu sistema, el daño estará contenido en tu máquina virtual.
- Usar servicios basados ​​en web y sandbox (los cubriremos más adelante en esta ruta de aprendizaje).
- Neutralizar todas las URL (consulta la sección relevante en el Subtema 3 en la ruta de aprendizaje sobre infraestructura maliciosa).
- Almacenar todos los archivos potencialmente sospechosos en carpetas comprimidas y protegidas con contraseña. Esto evita que se abran por accidente o sean escaneados por herramientas del sistema operativo cuando, por ejemplo, indexan carpetas. La contraseña no necesita ser compleja; literalmente puede ser "ABC". Todo lo que necesitas hacer es evitar la apertura automática o accidental del archivo.

Para obtener más información sobre el tema, revisa la guía de Defensive Lab Agency sobre cómo [manejar un dispositivo potencialmente comprometido](https://pts-project.org/guides/g6/), en particular:

- Aislar dispositivos Android y iOS.
- Procedimientos para enviar y recibir físicamente dispositivos comprometidos para su análisis en caso de que estés trabajando con (o tú mismo sirvas como) un equipo de análisis técnico remoto.
- Consejos introductorios sobre la cadena de custodia durante el análisis de dispositivos.

Este último término cadena de custodia se refiere a las mejores prácticas en análisis forense digital y respuesta a incidentes para registrar el manejo de un dispositivo con el fin de preservar la evidencia y permitir que la evidencia recopilada se utilice en cualquier posible procedimiento legal. El artículo vinculado proporciona una buena introducción a las mejores prácticas de uso general que puedes seguir en caso de que te encuentres en una posición de manejar evidencia que podría ser utilizada en un escenario con una mayor responsabilidad de prueba sobre la evidencia.

## Práctica

Configura una máquina virtual que ejecute REmnux, siguiendo [los pasos descritos en la Guía de Campo para respuesta a incidentes para la sociedad civil y medios (capítulo 6, comienza en la página 30).](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/)

## Verificación de habilidades

Después de haber configurado tu REmnux VM, instala y luego conéctate a una VPN confiable. Asegúrate de que tu sistema principal no esté conectado a una VPN o conectado a un servidor diferente al de tu instancia de REmnux. Pídele a tu colega o mentor que te envíe un canary token de web bug, el cual será abierto únicamente en REmnux, a través de un navegador web de tu elección. (Si aún no estás familiarizado con los canary tokens, [consulta esta guía](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) que creamos sobre cómo podrías usarlos en entrenamientos de seguridad.)

¿Qué dirección IP activó? ¿Qué agente de usuario?

Habla con tu colega/mentor sobre qué datos permanecen en tu VM y cuáles no. Si ejecutas una pieza de malware en tu VM que contacta a un servidor, ¿pasará esto a través de tu VPN o conexión de red doméstica/oficina?

## Recursos Educativos

{{% resource title="Guía intermedia - Cómo manejar un dispositivo potencialmente comprometido" description="Una guía paso a paso sobre cómo manejar dispositivos con iOS o Android que sospechas que pueden tener malware antes de comenzar el trabajo de detección" languages="Inglés" cost="Gratis" url="https://pts-project.org/guides/g6/" %}}
{{% resource title="Capítulo de máquina virtual de la Guía de Campo para respuesta a incidentes para la sociedad civil y medios (capítulo 6)" description="Una visión general introductoria de cómo los analistas de malware pueden comenzar a trabajar con máquinas virtuales y una instalación de la distribución de Linux" languages="Inglés" cost="Gratis" url="https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/" %}}
{{% resource title="Simulación técnica con canary tokens." description="Una guía sobre cómo utilizar tokens canary, una herramienta de seguridad ofensiva, para simular rastreadores de malware. Puede resultar muy útil para enseñar a los defensores qué datos se pueden exfiltrar fácilmente" languages="Inglés" cost="Gratis" url="https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/" %}}