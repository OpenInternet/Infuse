---
style: module
title: Prerrequisitos OPSEC para detectar malware
weight: 2
---

## Estudio de caso

Antes de comenzar a analizar cualquier malware, debes configurar un entorno seguro para hacerlo. Definitivamente, el malware daña los sistemas en los que se ejecuta. No deseas ejecutarlo en tu sistema principal. Además, probablemente querrás evitar que el malware realmente establezca conexiones con los servidores de C&C (comando y control) del autor de amenazas. Ambos significan que debes configurar una máquina virtual para utilizarla al realizar análisis de malware.

## Objetivos

Al acabar este módulo, el profesional debe ser capaz de garantizar la confidencialidad e integridad de los datos, lo que incluye:

- Cifrado durante el almacenamiento y la transferencia.
- Hacer sumas de comprobación después de la adquisición de datos.
- No utilizar dispositivos sospechosos de haber sido vulnerados.
- Uso de entornos air-gapped (sin conexión física o inalámbrica).
- Garantizar la seguridad de los dispositivos y servidores utilizados en el proceso.
- Modelado de amenazas y evaluación de riesgos.
- Realización de copias de seguridad e imágenes de disco.

---
## Sección Principal

La seguridad operativa para detectar malware genera preocupaciones que se pueden agrupar en los siguientes escenarios específicos:

- Interactuar directamente con un dispositivo de estado desconocido.
- Usar un dispositivo "bueno" separado para interactuar con un dispositivo de estado desconocido.
- Interactuar con archivos o enlaces de estado desconocido.

### Usar un dispositivo de estado desconocido

En muchos casos, le entregarán un dispositivo y le pedirán que lo inspeccione para detectar malware (o es posible que necesite hacerlo en su propio dispositivo).

Tenga en cuenta que en caso de que el dispositivo haya sido vulnerado, sus actividades pueden ser monitoreadas, lo que podría arriesgar la seguridad de su cliente. Entre las cosas que se pueden detectar se incluye el pulsar las teclas en el dispositivo, el acceso a cuentas en línea y otras comunicaciones. Los dispositivos de almacenamiento externos como discos duros o memorias USB, pueden convertirse en objetivos para la transferencia de código malicioso, y cualquier conexión a la red puede ser utilizada para propagar o filtrar código malicioso.

También tenga en cuenta que la introducción de herramientas de análisis puede activar un ‘kill switch’ (interruptor de apagado) en algunos malware. Este interruptor ha sido diseñado para evadir la detección y el análisis. En tales casos, puede ser necesario capturar una imagen de disco y otros registros forenses para realizar un análisis más profundo posteriormente. Este aspecto no se cubre en esta ruta de aprendizaje, pero si en la ruta sobre [Análisis de Malware](/es/learning-path/3/).

### Usar un dispositivo "bueno" separado durante el proceso de detección de malware

Si sospecha que un dispositivo está infectado con malware, deberá manipularlo  lo menos posible hasta conocer más detalles sobre su estado. Por esta misma razón, siempre debe usar un dispositivo del que no sospeche ninguna infección por malware, especialmente cuando maneje información confidencial.

Por ejemplo, si una persona a la que está asistiendo sospecha que su computadora portátil o de escritorio podría haber sido vulnerada, pídale que utilice solo su teléfono móvil para comunicarse con usted. Por lo general, es buena idea apagar la computadora portátil o de escritorio potencialmente vulnerada o, al menos, desconectarla de Internet. Si su cliente tiene sus cuentas de Signal, WhatsApp y otras vinculadas a la computadora potencialmente vulnerada, podría ser recomendable desvincularlas del todo (hacerlo desde un dispositivo que no esté infectado) mientras el proceso de detección está en curso.


### Interactuar con archivos o enlaces de estado desconocido

Al realizar el proceso de detección de malware, es posible que se encuentre con enlaces o archivos (normales o ejecutables) sobre los que no esté seguro y que sospeche que podrían estar filtrando cargas útiles de malware (payloads). Si copia esos enlaces o archivos desde un dispositivo potencialmente vulnerado a un dispositivo de análisis, siempre existe el riesgo de que este también se infecte. Para reducir las posibilidades de que esto ocurra, le recomendamos lo siguiente:

- Utilizar una máquina virtual en su dispositivo de análisis y solo abrir los archivos allí. De esta manera, incluso si abre un enlace o archivo malicioso que infecta su sistema, el daño estará contenido en su máquina virtual.
- Usar servicios basados ​​en web y entornos aislados o sandboxes. (Más adelante en esta ruta de aprendizaje se habla de estos servicios).
- Neutralizar todas las URL (consulta la sección relevante en el Módulo 3 en la ruta de aprendizaje sobre infraestructura maliciosa).
- Almacenar todos los archivos potencialmente sospechosos en carpetas comprimidas y protegidas con contraseña. Esto evita que se abran por accidente o sean escaneados por herramientas del sistema operativo cuando, por ejemplo, indexan carpetas. La contraseña no necesita ser compleja; literalmente puede ser "ABC". Todo lo que necesitas hacer es evitar la apertura automática o accidental del archivo.

Para obtener más información sobre este tema, revisa la guía de Defensive Lab Agency sobre cómo [manejar un dispositivo potencialmente vulnerado](https://pts-project.org/guides/g6/), en particular:

- Aislar dispositivos Android y iOS.
- Procedimientos para enviar y recibir físicamente dispositivos afectados para su análisis en caso de que esté trabajando con un equipo de análisis técnico remoto o usted mismo sirva como tal.
- Consejos introductorios sobre la cadena de custodia durante el análisis de dispositivos.

El término “cadena de custodia” se refiere a las mejores prácticas en análisis forense digital y respuesta a incidentes. La práctica alude al registro del manejo de un dispositivo con el fin de preservar la evidencia, la cual podría ser usada en cualquier procedimiento legal eventual. El artículo vinculado proporciona una buena introducción a dichas prácticas.

## Práctica

Configura una máquina virtual que ejecute REmnux, siguiendo [los pasos descritos en la Guía de Campo para respuesta a incidentes para la sociedad civil y medios (capítulo 6, comienza en la página 30).](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/)

## Verificación de habilidades

Después de haber configurado su REmnux VM, instale y luego conéctese a una VPN confiable. Asegúrese de que su sistema principal no esté conectado a una VPN o a un servidor diferente al de su instancia de REmnux. Pídale a su colega o mentor/a que le envíe un canary token de web bug, el cual será abierto únicamente en REmnux, a través de un navegador web de su elección. (Si aún no está familiarizado con los canary tokens, [consulte esta guía](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) que creamos sobre cómo podría usarlos en entrenamientos de seguridad.)

¿Qué dirección IP activó? ¿Qué agente de usuario?

Hable con su colega o mentor/a sobre qué datos permanecen en su VM y cuáles no. Si ejecuta una pieza de malware en su VM que contacta a un servidor, ¿pasará esto a través de su VPN o conexión de red doméstica u oficina?

## Recursos de Aprendizaje

{{% resource title="Guía intermedia - Cómo manejar un dispositivo potencialmente vulnerado" description="Una guía paso a paso sobre cómo manejar dispositivos con iOS o Android que sospeche puedan tener malware antes de comenzar el trabajo de detección" languages="Inglés" cost="Gratis" url="https://pts-project.org/guides/g6/" %}}

{{% resource title="Capítulo de máquina virtual de la Guía de Campo para respuesta a incidentes para la sociedad civil y medios (capítulo 6)" description="Una visión general introductoria de cómo los analistas de malware pueden comenzar a trabajar con máquinas virtuales y una instalación de la distribución de Linux" languages="Inglés" cost="Gratis" url="https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/" %}}

{{% resource title="Simulación técnica con canary tokens." description="Una guía sobre cómo utilizar canary tokens, una herramienta de seguridad ofensiva, para simular rastreadores de malware. Puede resultar muy útil para enseñar a los defensores digitales qué datos se pueden filtrar fácilmente" languages="Inglés" cost="Gratis" url="https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/" %}}
