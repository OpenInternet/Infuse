+++
style = "module"
weight = 3
title = "Respuesta a Incidentes de Negación de Servicio"
description = "Si un sitio web sufre un ataque de denegación de servicio prolongado, puede ser fundamental actuar rápidamente para que el sitio vuelva a funcionar. Este subtema describe algunas prácticas para permitir que los propietarios de sitios se recuperen de un ataque DoS"
+++

## Caso de Uso

Si un sitio web sufre un ataque sostenido de denegación de servicio, puede ser vital actuar rápidamente para que el sitio vuelva a funcionar. Esta Ruta de Aprendizaje describe algunas prácticas que permiten a los propietarios de sitios recuperarse de un ataque DoS.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Determinar qué tipo de ataque DoS sufre un sitio web
- Mitigar o neutralizar un ataque en proceso

---
## Sección Principal

Para algunos sitios (por ejemplo, sitios de apuestas), incluso un breve DoS puede ser una amenaza existencial para la supervivencia del sitio. Los atacantes suelen tener motivaciones económicas y utilizarán DoS como amenaza de extorsión. Para los sitios centrados en la sociedad civil, el modelo de amenaza suele ser bastante diferente. Los ataques suelen estar controlados por rivales políticos (a menudo actores de estados-nación o aquellos vinculados a ellos o apoyados por ellos) y se dividen en dos categorías:

- Ataques breves (de horas a días) destinados a intimidar a los propietarios del sitio.
- Ataques sostenidos diseñados para silenciar permanentemente el sitio

Al comienzo de un ataque, es imposible saber qué tipo de ataque sufre el sitio. Afortunadamente, la respuesta técnica y operativa es la misma. La respuesta básica se divide en tres pasos:

1. Determinar qué tipo de ataque está sufriendo el sitio.
2. Mitigar ese ataque (el sitio debería estar operativo en este punto)
3. Reforzar proactivamente el sitio contra futuros ataques

### Determinar el Tipo de Ataque

Generalmente, un ataque DoS se detectará cuando los usuarios noten que el sitio deja de estar disponible o muestra un rendimiento degradado. En algunos casos, los sistemas de seguimiento del rendimiento del sitio pueden notificar de forma proactiva a los propietarios del sitio. En cualquier caso, el primer paso es determinar por qué el sitio no funciona. Tenga en cuenta que el rendimiento degradado del sitio o que un sitio no esté disponible puede no deberse a un ataque, sino a fallas del equipo, una mala configuración, cambios mal concebidos en el sitio, y [algo en el sitio que se vuelve viral](https://en.wikipedia.org/wiki/Slashdot_effect). Al investigar la degradación del sitio, tenga en cuenta los tipos de ataques DoS y sus síntomas:

- Nivel de Red
  - Volumétrico - Las herramientas de diagnóstico de red, como el ping, mostrarán una gran pérdida de paquetes y tiempos de ida y vuelta prolongados. Si el sitio web está alojado en un ISP o servicio de alojamiento web, otros sitios alojados por ese ISP/servicio de alojamiento tampoco estarán disponibles.
  - Basado en exploits - Las herramientas de diagnóstico de red tenderán a mostrar una gran pérdida de paquetes, pero a menudo mostrarán tiempos de ida y vuelta normales. Si el sitio web está alojado en un ISP/proveedor de alojamiento, otros sitios alojados por ellos tampoco estarán disponibles.
- Nivel de Protocolo
  - Volumétrico - Las herramientas de diagnóstico de red normalmente mostrarán una pérdida de paquetes y tiempos de ida y vuelta elevados. Las solicitudes del navegador al sitio suelen tardar mucho tiempo y, por lo general, caducan. Si el sitio web está alojado en un proveedor de alojamiento web, es probable que otros sitios alojados en el mismo servidor no estén disponibles, mientras que los alojados en otros servidores normalmente funcionarán. Tenga en cuenta que los ataques DoS a nivel de protocolo volumétrico encontrarán cualquier cuello de botella, ya sea en la red o en el servidor. Por ejemplo, un ataque a nivel de protocolo contra un servidor potente en una red con poca potencia afectará a la red más que al servidor.
  - Basado en exploits - Las herramientas de diagnóstico de red normalmente mostrarán tiempos de pérdida de paquetes y de ida y vuelta normales. Las solicitudes del navegador al sitio pueden ser muy lentas o devolver rápidamente un error. Si el sitio web está alojado en un proveedor de alojamiento web, es probable que otros sitios alojados en el mismo servidor no estén disponibles, mientras que los alojados en otros servidores normalmente funcionarán.
- Nivel de Aplicación
  - Las herramientas de diagnóstico de red normalmente mostrarán tiempos normales de pérdida de paquetes y de ida y vuelta. El contenido estático ofrecido por el sitio puede comportarse normalmente o también puede estar degradado. Si el sitio web está alojado en un proveedor de alojamiento web, es probable que otros sitios alojados en el mismo servidor no estén disponibles, mientras que los alojados en otros servidores normalmente funcionarán.

Saber qué tipo de ataque está ocurriendo ayudará a guiar la respuesta de los propietarios del sitio. Si se sospecha algún tipo de ataque a nivel de red o protocolo, es importante comunicarse con el ISP/proveedor de alojamiento de los sitios para ayudar a diagnosticar el problema. Por lo general, tendrán acceso a mejores herramientas de diagnóstico y respuesta para ataques a nivel de red y protocolo.

Una palabra de advertencia, un ataque DoS contra un sitio web suele ser necesariamente también un ataque contra el ISP/proveedor de alojamiento de ese sitio. Especialmente en el caso de ataques a nivel de red, el ISP puede verse tan afectado como el sitio web de destino. Por este motivo, [los ISP o los proveedores de alojamiento a veces cierran los sitios web que son objeto de ataques DoS](https://www.qurium.org/alerts/azerbaijan/ddos-the-inconvenient-business-visitor/), para proteger al propio proveedor. Es de esperar que interactuar temprano con el ISP/proveedor de alojamiento del sitio le brinde algunas posibilidades de negociación o coordinación si el proveedor decide cerrar un sitio.

### Mitigar la amenaza

Dependiendo del tipo de ataque y del servicio de alojamiento del sitio, las mitigaciones pueden variar.

#### Ataques basados ​​en exploits

Para ataques de denegación de servicio a nivel de red y protocolo, generalmente será necesario aplicar una actualización de software. Como mitigación a corto plazo, el ISP del sitio puede bloquear fuentes de tráfico malicioso hasta que se puedan aplicar actualizaciones de software.

#### Ataques volumétricos

Para ataques volumétricos a nivel de red y protocolo, la respuesta generalmente se lleva a cabo a nivel de ISP. Por lo general, el ISP analizará el tráfico de red entrante e identificará las fuentes de tráfico malicioso. Luego bloquearán esas fuentes a nivel de red y trabajarán con su ISP ascendente para bloquear esas fuentes también. Con el tiempo, los ISP ascendentes que bloquean el tráfico malicioso son lo suficientemente grandes como para poder manejar fácilmente el nivel de tráfico malicioso que se genera, y los ISP descendentes (y el sitio de destino) pueden reanudar las operaciones normales.

#### Ataques a nivel de aplicación

Para los ataques DoS a nivel de aplicación, la mitigación generalmente la maneja el propietario del sitio, y no el ISP o el proveedor de alojamiento. Generalmente, el atacante enviará un gran volumen de solicitudes, a menudo de naturaleza inusual, a un punto final específico del sitio. Este punto final (es decir, la página web) consumirá una gran cantidad de recursos, lo que ralentizará o bloqueará el sitio.

El mejor lugar para empezar a buscar el punto final de destino son los registros de acceso del servidor web. Si puede conectarse al servidor web a través de algo como SSH, intente descargar (por ejemplo, a través de rsync o scp) algunos registros de acceso actuales y algunos anteriores a que comenzara el ataque. Busque páginas que reciban acceso con más frecuencia, páginas que devuelvan una gran cantidad de datos o páginas que tarden mucho tiempo en terminar de procesarse. Tenga en cuenta que una buena configuración de registro (como se describe en la subsección 2) puede hacer que todo esto sea mucho más fácil.

Si no puede acceder a los registros pero tiene acceso a una copia de desarrollo del sitio, puede intentar encontrar el punto final de destino usted mismo. Explore el sitio en busca de páginas que puedan consumir muchos recursos. Los ejemplos pueden incluir páginas que realizan consultas complejas a bases de datos, leen archivos del sistema de archivos, cambian el tamaño de las imágenes, realizan solicitudes a otros sitios web, etc. Una discusión completa sobre esto está fuera del alcance de esta ruta de aprendizaje, pero podría incluir un vistazo a algunas vulnerabilidades incluidas como parte de la Ruta de Aprendizaje de Evaluación de Seguridad Web.

Si logra encontrar el punto final probable, ya sea leyendo registros o simulando un atacante, el siguiente paso es descubrir cómo frustrar el ataque. La forma más rápida es simplemente reemplazar esa página del sitio con una página web estática. Esto detendrá el ataque pero desactivará parte del sitio. Además, si el ataque aprovecha algo que se encuentra en muchas o todas las páginas del sitio, esa solución puede dañar el sitio.

Una mejor opción sería poner límites al punto final de destino para evitar que consuma tantos recursos. Si es una página que cambia el tamaño de las imágenes, establezca un tamaño de imagen máximo. Si se trata de una operación de búsqueda y el atacante está utilizando una consulta de búsqueda muy larga y compleja, limite la longitud de la consulta. Si se trata de una búsqueda y el atacante ha realizado una búsqueda que devuelve muchísimos resultados, cambie la consulta para que esté en una subselección que limite el número de filas antes de realizar cualquier clasificación, etc. Con suerte, un simple cambio puede hacer que el ataque sea ineficaz sin cambiar el funcionamiento del sitio para usuarios no malintencionados.

#### Si el sitio está cerrado

Si el ataque DoS logra cerrar el sitio web (por ejemplo, el proveedor de alojamiento apaga el sitio), la recuperación del sitio puede ocurrir de varias maneras diferentes. Si los propietarios del sitio tienen buenas prácticas de desarrollo e implementación (consulte la subsección 1 de esta ruta de aprendizaje), es posible que tengan una copia de desarrollo del sitio lista para implementarse en otro proveedor de alojamiento. De lo contrario, usted y los propietarios del sitio podrán negociar con el proveedor de alojamiento actual del sitio para obtener acceso a los servidores de producción y copiar los datos del sitio.

El siguiente paso más sencillo puede ser generar una copia completamente estática del sitio y alojarla en algo como GitHub Pages, Amazon S3 o depósitos GCP GCS. Para generar una copia estática del sitio a partir de una versión de desarrollo, puede utilizar una herramienta como [HTTrack](https://www.httrack.com/) para "rastrear" el sitio web y descargar el HTML. Los servicios de alojamiento de sitios estáticos mencionados anteriormente son gratuitos o económicos (aunque TLS puede tener un costo), [son resistentes a DoS](https://www.wired.com/story/github-ddos-memcached/), y se pueden configurar en cuestión de minutos. Si bien tener una copia estática del sitio puede no ser lo ideal, puede ser una buena medida provisional.

### Recuperarse de un Ataque DoS

Una vez que se ha mitigado el ataque, el propietario del sitio puede trabajar en una recuperación completa. Generalmente, esto implica pasar por los procesos de preparación del sitio descritos en las subsecciones 1 y 2 de esta ruta de aprendizaje. A menudo, una vez que un sitio es blanco de un ataque DoS, es probable que vuelva a enfrentar ataques similares en el futuro. Por ello, una preparación cuidadosa es muy importante. Especialmente si se utilizó un ataque a nivel de aplicación, es una buena idea revisar el sitio y su código para encontrar cualquier aspecto que pueda consumir una gran cantidad de recursos y modificarlos para limitar los recursos que podrían consumir. Además, tener una manera fácil de generar una copia estática del sitio y un procedimiento ensayado para cambiar el sitio a alojamiento de sitios estáticos podría ser útil para los sitios a los que se dirige con frecuencia.

## Otras Lecturas

Los siguientes recursos adicionales brindan más información sobre los ataques DoS. Los siguientes recursos se centran principalmente en la mecánica de los ataques de bajo nivel:

- [https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf](https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf)
- [https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks](https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks)
- [https://www.byos.io/blog/denial-of-service-attack-prevention](https://www.byos.io/blog/denial-of-service-attack-prevention)

Este minisitio es una buena descripción general sobre cómo elaborar un plan de respuesta DoS para un sitio específico. Es un gran recurso si tiene el lujo de realizar una planificación previa o consultar cuando se recupera de un ataque:

- [https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan](https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan)


## Verificación de Habilidades

### Preguntas de respuestas múltiples

Los ataques DDoS (Negación de Servicio Distribuido) plantean amenazas importantes a la infraestructura digital moderna y tienen como objetivo interrumpir los servicios abrumando los sistemas o redes objetivo con una avalancha de tráfico. En respuesta a tales ataques, las medidas de respuesta a incidentes son esenciales para minimizar los daños y restablecer rápidamente las operaciones normales. Este conjunto de preguntas de opción múltiple profundiza en varios aspectos de los ataques DDoS, incluidos sus tipos, objetivos, estrategias de mitigación y las fases de respuesta a incidentes involucradas para abordar dichas amenazas. Pruebe sus conocimientos sobre ataques DDoS y respuesta a incidentes con las siguientes preguntas. Si es posible, discuta sus respuestas a esas preguntas con un compañero o mentor que lo ayudará a verificar que haya entendido correctamente el tema.

1\. ¿Cuál de los siguientes NO es un tipo común de ataque DDoS?

A) Inundación SYN\
B) Inundación Ping\
C) Suplantación DNS\
D) Inundación UDP

{{< question title="Respuesta" >}}
C) Suplantación DNS
{{< /question >}}

2\. ¿Cuál es el objetivo principal de un ataque DDoS?

A) Para robar datos sensibles\
B) Obtener acceso no autorizado a un sistema\
C) Abrumar un sistema o red objetivo\
D) Para cifrar archivos y exigir rescate

{{< question title="Respuesta" >}}
C) Abrumar un sistema o red objetivo
{{< /question >}}

3\. ¿Qué técnica se utiliza habitualmente para mitigar los ataques DDoS de Amplificación de DNS?

A) Implementar filtrado de ingreso para bloquear el tráfico con direcciones IP falsificadas\
B) Utilizar la limitación de velocidad para controlar el volumen de paquetes de respuesta DNS que salen de servidores autorizados\
C) Implementar Sistemas de Prevención de Intrusiones (IPS) para detectar y bloquear el tráfico malicioso en el perímetro de la red\
D) Realizar análisis de vulnerabilidades periódicos para identificar y parchear las vulnerabilidades del servidor DNS

{{< question title="Respuesta" >}}
B) Utilizar la limitación de velocidad para controlar el volumen de paquetes de respuesta DNS que salen de servidores autorizados\
{{< /question >}}

4\. ¿Qué fase de la respuesta a incidentes implica identificar la naturaleza y el alcance de un ataque DDoS?

A) Preparación\
B) Detección y Análisis\
C) Contención, Erradicación y Recuperación\
D) Actividad Posterior al Incidente

{{< question title="Respuesta" >}}
B) Detección y Análisis\
{{< /question >}}

5\. ¿Cuál es el objetivo principal durante la fase de contención de la respuesta a un incidente ante un ataque DDoS?

A) Apagado completo del sistema\
B) Eliminar el acceso del atacante\
C) Identificar vulnerabilidades para futuros ataques\
D) Restaurar los servicios afectados evitando daños mayores

{{< question title="Respuesta" >}}
D) Restaurar los servicios afectados evitando daños mayores
{{< /question >}}

6\. En el contexto de la respuesta a incidentes, ¿qué implica la fase de "Erradicación" con respecto a los ataques DDoS?

A) Restaurar datos a partir de copias de seguridad\
B) Investigar el origen del ataque\
C) Implementar soluciones a largo plazo para prevenir ataques similares\
D) Reiniciar los sistemas afectados

{{< question title="Respuesta" >}}
C) Implementar soluciones a largo plazo para prevenir ataques similares
{{< /question >}}

7\. ¿Qué acción se realiza normalmente durante la fase de recuperación de la respuesta a incidentes después de un ataque DDoS?

A) Realización de un análisis post mortem\
B) Aplicar parches de seguridad a sistemas vulnerables\
C) Identificar nuevos vectores de ataque\
D) Iniciar acciones legales contra el atacante

{{< question title="Respuesta" >}}
B) Aplicar parches de seguridad a sistemas vulnerables
{{< /question >}}

8\. ¿Cómo pueden las redes de entrega de contenido (CDN) ayudar a proteger los sitios web de ataques de denegación de servicio (DoS)?

A) Cifrando todo el tráfico entrante para evitar ataques\
B) Bloqueando directamente todo el tráfico entrante sospechoso\
C) Distribuyendo el contenido del sitio web en múltiples servidores y centros de datos\
D) Aumentando la potencia de procesamiento del sitio web

{{< question title="Respuesta" >}}
C) Distribuyendo el contenido del sitio web en múltiples servidores y centros de datos
{{< /question >}}


## Recursos de Aprendizaje

{{% resource title="DDoS: el incómodo visitante de negocios" description="Una mirada a cómo algunos proveedores de alojamiento web podrían querer abandonar a los clientes objetivo de ataques DDoS" languages="Inglés" cost="Gratis" url="https://www.qurium.org/alerts/azerbaijan/ddos-the-inconvenient-business-visitor/" %}}

{{% resource title="GitHub sobrevivió al mayor ataque DDoS Jamás Registrado" description="Un artículo de 2018 sobre cómo Github asumió un ataque DDoS masivo y continuó operando a partir de entonces." languages="Inglés" cost="Los primeros artículos en WIRED son gratuitos, los siguientes pueden requerir una suscripción" url="https://www.wired.com/story/github-ddos-memcached/" %}}

{{% resource title="Comprender y Responder a los Ataques Distribuidos de Negación de Servicio" description="Una guía CISA 2022 sobre el tema, que analiza los pasos a seguir antes, durante y después de un ataque" languages="Inglés" cost="Gratis" url="https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf" %}}

{{% resource title="Guía MS-ISAC para Ataques DDoS" description="Una guía que proporciona una descripción general de los tipos comunes de ataques DDoS, junto con recomendaciones generales sobre mitigaciones." languages="Inglés" cost="Gratis" url="https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks" %}}

{{% resource title="Prevención de Ataques de Negación de Servicio (DoS): La Guía Definitiva" description="Este artículo describe algunos pasos que los administradores pueden seguir para prevenir o mitigar el impacto de los ataques DoS." languages="Inglés" cost="Gratis" url="https://www.byos.io/blog/denial-of-service-attack-prevention" %}}

{{% resource title="Guía de Negación de Servicio (DoS)" description="Guías del Centro Cibernético de Seguridad Nacional del Reino Unido sobre ataques DoS y cómo defender a las organizaciones contra ellos" languages="Inglés" cost="Gratis" url="https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan" %}}
