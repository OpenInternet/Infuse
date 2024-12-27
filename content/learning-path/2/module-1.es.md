---
style: module
title: Habilidades interpersonales para detectar malware
description: Antes de comenzar a analizar cualquier malware, debe configurar un
  entorno seguro para hacerlo. El malware daña los sistemas en los que se
  ejecuta. No desea ejecutarlo en su sistema principal.
weight: 1
---

## Caso de Uso

Antes de comenzar a analizar cualquier malware, debes configurar un entorno seguro para hacerlo. Definitivamente, el malware daña los sistemas en los que se ejecuta. No deseas ejecutarlo en tu sistema principal. Además, probablemente querrás evitar que el malware realmente establezca conexiones con los servidores de C&C (comando y control) del autor de amenazas. Ambos significan que debes configurar una máquina virtual para utilizarla al realizar análisis de malware.

## Objetivos

Después de completar este subtema, los profesionales podrán ofrecer soporte a aquellos que pueden haber recibido o hecho clic en enlaces o correos electrónicos maliciosos de una manera más responsable.

Los profesionales también deberán ser capaces de hacer lo siguiente:

- Explicar el alcance del trabajo y qué información recopilarían.
- Proporcionar garantías al cliente sobre su seguridad y la seguridad de sus datos.
- Elaborar un acuerdo de confidencialidad simple con un cliente, si es necesario.
- Navega por una discusión sobre triage para ayudar a identificar cuándo es necesario realizar más investigaciones y detección.

---
## Sección Principal

### Conocimiento Básico

_Security Education Companion_ ofrece una gran cantidad de consejos sobre cómo interactuar como asistente tecnológico de manera ponderada, cuidadosa y con el objetivo de reducir los riesgos Si aún no estás familiarizado con este tipo de contenido, te recomendamos mucho que revises [Security Education 101](https://www.securityeducationcompanion.org/articles).

Después de leer los recursos anteriores, deberías poder:

- Comprender cómo la evaluación de riesgos es importante en cada interacción.
- Comprender los riesgos de tener contacto con los dispositivos de las personas o tener acceso a sus cuentas.
- Comprender los riesgos de participar en un discurso que infunde miedo.
- Comprender sus propias limitaciones, tanto en términos de capacidad técnica como de su competencia para ofrecer soporte a una persona o comunidad y los riesgos inherentes al hacerlo.
- Evita la inyección de preferencias de plataformas, tecnología, código abierto versus código cerrado, etc., en las interacciones de ayuda.

### 📋Conocimiento específico de la ruta

Una vez que estés familiarizado con los conocimientos básicos anteriores, tómate un tiempo para pensar en habilidades interpersonales particulares que podrían ser necesarias para esta ruta de aprendizaje específica. Cada ruta de aprendizaje e intervención son ligeramente diferentes; cada uno puede traer consigo diferentes narrativas o preocupaciones por los aprendices.

Deberías ser capaz de:

- Recordar que quienes crean malware no sólo pretenden obtener datos, pero también asustar a las personas haciéndoles creer que están perpetuamente vigilados. Los ataques de malware dirigidos a la sociedad civil a menudo tienen como propósito tanto la recopilación de datos como la intimidación.
- Reconocer que muchas personas objetivo tendrán datos muy confidenciales en sus dispositivos, que pueden estar relacionados tanto a su vida personal como profesional. La detección e investigación de malware será un proceso estresante para ellos porque, en ambos casos, deben preocuparse por qué información sobre ellos puede haberse filtrado a los atacantes. Además deben entregar el control de los dispositivos a los protectores digitales que los respaldan, lo que podría hacerlos sentir incluso más vulnerable. Debes estar preparado para debatir tus prácticas de manejo de datos, incluidas las formas en que cifras la unidad en la que estás realizando la detección y cómo planeas manejar y eliminar sus datos una vez que se complete el proceso.
- Comprender que muchas personas que trabajan en la sociedad civil son conscientes de los riesgos que enfrentan personalmente, pero están extremadamente preocupadas por su familia, amigos y fuentes cuyos datos pueden haberse filtrado o que podrían ser atacados.
- Hable con las personas sobre los riesgos potenciales involucrados en el proceso de detección de malware (los atacantes pueden descubrirlo, pueden perder el acceso a sus dispositivos y el proceso puede no arrojar ningún resultado satisfactorio).
- Comprender que el conocimiento técnico, los niveles de habilidad y los recursos varían ampliamente entre las personas. A un grupo de la sociedad civil podría resultarle fácil bloquear dispositivos y reducir las posibilidades de infecciones de malware, mientras que otros podrían tener dificultades para incluso encontrar dispositivos que aún reciban actualizaciones de software.
- Debes estar preparado para explicar cómo el mismo método de análisis a veces puede producir muchos datos y otras muy pocos; ser capaz de gestionar las expectativas en consecuencia.
- Entender que a algunos grupos de la sociedad civil les gustaría firmar un acuerdo de confidencialidad o un acuerdo similar antes de compartir gran parte de sus datos o dispositivos.

Ten en cuenta que los otros subtemas de esta ruta de aprendizaje también contienen consejos sobre el desarrollo de habilidades interpersonales para proporcionar un apoyo ponderado y que reduzca los daños sobre este tema.

### Entender: Reducción de Daños y Seguridad Operativa

Cuando se haya compartido contigo una muestra de malware, es posible que se haya causado daño a la persona objetivo. Es posible que el malware haya capturado datos y la persona objetivo también puede verse afectada por el impacto psicosocial de ser atacado u observado. Es importante ofrece soporte a la persona objetivo y, al mismo tiempo, evitar causarse daño durante la interacción activa con contenido malicioso.

La reducción de daños para la persona objetivo debe comenzar con la recopilación de información sobre las acciones que tomó y las circunstancias en las que interactuó con sus dispositivos. Puedes hacer diferentes conjuntos de preguntas a personas que conoces bien, como colegas, en contraste con los beneficiarios sobre los que sabes menos. A continuación, algunas preguntas que vale la pena hacer: ¿Cuál es su modelado de amenaza? ¿Es un bloguero anónimo? ¿Un disidente en el exilio que intenta ocultar su localización?

Las respuestas a estas preguntas te ayudarán a proporcionar soporte útil para reducir los daños y te ayudarán en tus investigaciones. A medida que avances en el análisis y la comprensión del contenido malicioso, actualiza a la persona objetivo, especialmente en lo que respecta a la reducción de daños.

Para la seguridad operativa y protegerte mientras trabajas con correos electrónicos maliciosos, completa el [subtema 3](https://infuse.quest/es/learning-path/1/module-3/) (Manejo Seguro de Enlaces e Infraestructura) de la ruta de aprendizaje sobre la detección, seguimiento e investigación de la infraestructura maliciosa.

### Entender: Detección, Hallazgos Negativos y Paranoia

El spyware es un ataque extremadamente invasivo contra individuos, familias, comunidades y movimientos. Comprende que la información y el análisis, ya sea positivo o negativo, que proporcionas a un cliente puede ser extremadamente significativo e informar las decisiones de riesgo que toman con sus dispositivos. Como tal, es importante tener claro el verdadero alcance y significado de cualquier trabajo de detección y determinación que les proporcione.

Fuera de entornos de dispositivos altamente controlados y monitoreados, las modernas plataformas de OS siguen siendo difíciles de evaluar completamente en busca de compromisos e infecciones, especialmente en el caso de ataques sofisticados zero-day que puedan ser utilizados. Por lo tanto, nunca podrás hacer una determinación definitiva del 100% sobre la ausencia de malware en un dispositivo. Solo puedes afirmar que, utilizando la técnica que has implementado y con las habilidades que tienes, no pudiste encontrar malware. Esto no significa que no existe malware, sólo que las pruebas utilizadas no identificaron ninguno.

Al mismo tiempo, sabemos que la paranoia es un fenómeno común en el que la sensación de vigilancia (justificada o no) es una experiencia mental negativa persistente para activistas, periodistas, líderes u otros clientes con los que puedas estar trabajando. Es necesario caminar sobre la delgada línea para determinar un equilibrio entre proporcionar evidencia técnica útil para actualizar las hipótesis y probabilidades de que se esté produciendo vigilancia, sin fomentar una sensación de falsa confianza ni un temor infundado a la vigilancia personalizada.

### Hacer un triage de la situación, así como del dispositivo

El triage es el paso necesario en el que se recopila información y se utiliza para decidir cuándo invertir tiempo en una investigación más amplia. Si bien el triage eficaz se basa en conocimientos técnicos e instintos, también requiere habilidades interpersonales para involucrar al cliente con empatía, tomar en serio sus inquietudes, escuchar activamente y comprender la situación en la que se encuentra.

Durante las conversaciones iniciales, trata de determinar:

- ¿Existe una razón particular por la que quieren que se revise su dispositivo, o es un miedo general, curiosidad, suposición o acto de prudencia?
- Las razones y las explicaciones específicas te ayudarán a enfocar tu búsqueda, por ejemplo:
  - Cambio en el rendimiento del dispositivo.
  - Un incidente físico, como que alguien más manipule el dispositivo o que sea confiscado y devuelto por las autoridades.
  - Un incidente digital, como un software o una aplicación que se está instalando, o se hace clic en un enlace sospechoso.
  - Una advertencia, indicador o alerta de seguridad.

Hay muchas explicaciones alternativas para el rendimiento deficiente del dispositivo, como hardware antiguo o defectuoso, errores de software, falta de actualizaciones y configuraciones no deseadas. Por supuesto, la infección y el comprometido por malware también pueden existir junto con estas explicaciones. Por lo tanto, encontrar configuraciones incorrectas, notar software desactualizado o bajos recursos del dispositivo no es suficiente para rechazar la hipótesis del malware.

Utilice una combinación de preguntas interpersonales e interacción con su cliente, así como acceso al dispositivo (cuando sea posible y apropiado) para determinar cuándo es necesario un seguimiento detallado. Y cuando no sea posible para ti realizar investigaciones por tu cuenta debido a tu tiempo limitado, recursos y habilidades, siempre es deseable compartir recursos que permitan a tu contacto tomar medidas para investigar y asegurar sus dispositivos por sí mismos.

La configuración exacta que necesitas depende de tu método de análisis y del sistema operativo del malware que estés analizando. En la mayoría de los casos, puedes comenzar con una máquina virtual Linux preconfigurada como [REMnux](https://remnux.org/). Consulta el [Capítulo 6 de la Guía de Campo para Respuesta a Incidente para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) para obtener instrucciones paso a paso sobre cómo realizar la configuración. Para cosas específicas (por ejemplo, análisis dinámico de malware de iOS) necesitarás herramientas adicionales (por ejemplo, un iPhone o iPad con jailbreak). En ocasiones, las VM tienen vulnerabilidades que permiten que el software que se ejecuta en la VM ataque el sistema operativo host. La mayoría del malware ni siquiera se acerca a este nivel de sofisticación, pero en caso de duda, lo más seguro es analizar el malware en un dispositivo físico separado que se borre posteriormente.

Para configurar REMnux, recomendamos que sigas los pasos descritos en el [Capítulo 6 de la Guía de Campo para Respuesta a Incidentes para la Sociedad Civil y Medios](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) y [descargues la VM](https://docs.remnux.org/install-distro/get-virtual-appliance)[^1]. Esta es una manera fácil de comenzar que proporciona un excelente aislamiento entre su sistema host y el entorno REMnux. Ten cuidado de no compartir datos confidenciales de su sistema operativo host en la VM. Según las instrucciones vinculadas anteriormente, toma un snapshot de tu VM una vez que esté configurada y antes de comenzar a trabajar con cualquier malware. Puedes utilizar snapshots para volver a tu máquina virtual válida conocida antes de analizar diferentes piezas de malware y aislar diferentes clientes entre sí. Para obtener más información sobre VM snapshots en general, revisa [este artículo](https://www.nakivo.com/blog/vm-snapshot-vs-backup/).

Mientras realizas un análisis de malware, es posible que desees herramientas adicionales en tu VM de análisis. Adelante e instálalos y configúralos, pero ten en cuenta lo que hiciste. Después de que hayas terminado tu análisis, puedes subir tu snapshot "limpio" de la VM , instalar y configurar la herramienta, y luego crear un nuevo snapshot "limpio" para tu próxima aventura de análisis de malware.

Para mover archivos de malware, la práctica estándar es colocarlos en archivos ZIP cifrados. En este caso, la calidad del cifrado no importa. El objetivo no es tanto mantener en secreto el malware, sino más bien evitar liberarlo involuntariamente en otros sistemas y prevenir que los sistemas antimalware lo detecten o lo eliminen. Tomate la libertad de incluir la contraseña en el nombre del archivo ZIP.

## Práctica

Reflexiona y responde/discute lo siguiente con tus compañeros, colegas, amigos o un mentor. Si está disponible y es apropiado, habla con un "cliente" con el que hayas trabajado antes para pedirle su contribución y sus experiencias sobre algunas de estas cuestiones.

- Describe cómo hacer contacto y obtener acceso al dispositivo de alguien puede presentar riesgos inesperados.
- Imagina que estás ayudando a alguien con datos sensibles en su dispositivo. ¿Cómo abordarías una conversación con esta persona sobre tu acceso y manejo de datos?
- ¿Por qué es imposible decir que un dispositivo está libre de malware?
- ¿Cómo afecta la comprensión del perfil de amenazas específico de una persona en tus esfuerzos de reducción de daños, por ejemplo, si es un bloguero anónimo o un disidente en el exilio?
- ¿Cómo conduces la entrega de evidencias técnicas factuales según tu capacidad, al mismo tiempo que equilibras la necesidad de no proporcionar una falsa confianza y tampoco promocionar la paranoia?
- Describe tus propias habilidades y limitaciones al realizar trabajos de detección de malware. Después de hacer un primer intento de esta descripción, intenta agregar más matices y precisión a tu descripción.
  - ¿Cuáles podrían ser los riesgos si procedes sin reconocer tus limitaciones?
- Representa un escenario en el que informas a un cliente sobre el hallazgo de malware activo en un dispositivo.

## Verificación de habilidades

Con un Mentor o Colega

- Explícale a tu mentora/colega o grupo de colegas tus respuestas a las preguntas de la Práctica anterior.
- Representa algunas de las interacciones descritas en las preguntas de la Práctica anterior.
  - Discusión inicial con un cliente.
  - Discutiendo su modelado de amenaza.
  - Describe un hallazgo negativo (no malware), incluida una explicación de las limitaciones de la evaluación.
  - Informa un hallazgo positivo (malware encontrado).
- Si es posible, pide a alguien que observe tus interacciones reales y tu proceso de respuesta ante incidentes con un cliente, y que te de retroalimentación sobre cómo manejas los aspectos interpersonales de la interacción.

## Recursos Educativos

{{% resource title="Security Education 101" description="Un recurso comunitario popular sobre cómo enseñar y hablar sobre seguridad digital" languages="Inglés" cost="Gratis" url="https://www.securityeducationcompanion.org/articles" %}}

## Notas

[^1]: REMnux no está disponible en procesadores ARM, como las computadoras Apple Silicon. Aunque es posible virtualizar entre arquitecturas de CPU usando emuladores como QEMU o UTM (VirtualBox no admite actualmente arquitecturas ARM), el rendimiento será lento y no se recomienda. Sería más sensato seleccionar otra distribución de Linux que sea compatible con su hardware e instalar los paquetes de software necesarios para completar las actividades, si no vienen ya con el sistema operativo. Kali Linux es una distribución de Linux popular que incluye o admite muchas herramientas también encontradas en REMnux. Si tiene un dispositivo Apple Silicon, puede usar [UTM](https://mac.getutm.app/) para ejecutar la imagen del instalador de Kali para Apple Silicon (ARM64). Guías paso a paso están disponibles tanto de UTM como de Kali. En el momento de escribir esto, un error que afecta el proceso de instalación requiere un paso adicional durante la instalación que consiste en adjuntar una pantalla de terminal serial virtual: ambas guías describen este proceso. También puede obtener una versión ARM de Kali para el Raspberry Pi, con la mayoría de los modelos de Raspberry Pi compatibles.
