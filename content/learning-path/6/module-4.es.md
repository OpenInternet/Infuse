+++
style = "module"
weight = 4
title = "Respuesta a Incidentes de Piratería"
description = "Analizamos algunas formas en las que podemos investigar y recuperarnos de un ataque que tuvo como objetivo nuestro sitio web."
+++

## Caso de Uso

Si un sitio web es pirateado, es vital comprender las acciones y métodos del atacante. Como mínimo, los propietarios del sitio deben identificar cómo se vio comprometido inicialmente para poder corregir cualquier vulnerabilidad que lo haya permitido. También puede ser importante saber a qué datos pueden haber accedido o modificado los atacantes. Esta ruta de aprendizaje describe algunas prácticas para ayudar a investigar y recuperarse de un incidente de piratería de un sitio web.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Identificar el punto de compromiso inicial de un sitio web
- Identificar las acciones que tomó un atacante después del compromiso inicial

---
## Sección Principal

### Identificar un incidente de piratería

Para la mayoría de las víctimas de un incidente de piratería informática, el retraso entre el compromiso inicial y la detección puede ser de meses o incluso años. A menudo, un ingeniero detecta un compromiso pensando que algo “parece extraño”. Algunas señales de compromiso pueden incluir:

- Cambios en el contenido del sitio. Estos pueden variar desde sutiles (por ejemplo, cambios invisibles en JavaScript) hasta muy poco sutiles (deformación).
- Cuentas de usuario que aparecen en bases de datos de contraseñas u otros volcados de datos
- Archivos inexplicables en el servidor web.
- Tráfico de red inusual dentro o fuera de la web u otros servidores
- Pequeños picos de tráfico, asociados con solicitudes extrañas en los registros de acceso o errores

Cuando aparecen señales de posible compromiso, es bastante natural querer explicarlas. Nadie quiere afrontar la posibilidad de que su sitio web haya sido pirateado. Para ser justos, la mayoría de los sitios web nunca son pirateados, por lo que probablemente exista una explicación perfectamente razonable. Sin embargo, es importante detectar e investigar un compromiso lo más rápido posible.

### Pasar de un COI a un compromiso inicial

Una vez que haya establecido que el sitio ha sido pirateado a través de uno o más IoC (indicadores de compromiso), el siguiente paso es trabajar hacia atrás para encontrar la fuente del compromiso inicial. Esto tiene dos propósitos:

- Identifica qué vulnerabilidad permitió al atacante comprometer el sitio, lo que permite al propietario del sitio corregir la vulnerabilidad antes de restaurarlo.
- Una vez que se encuentra un compromiso inicial, puede trabajar para encontrar las actividades realizadas por el atacante.

No siempre se da el caso de que el compromiso de un sitio web comience con una vulnerabilidad en el propio sitio web. Si bien esta puede ser la forma más común de ingresar, no debes descalificar algo como una [cuenta de desarrollador comprometida](https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/) que permite a un atacante simplemente cargar una puerta trasera, o una [dependencia con puerta trasera](https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/) que se utiliza como parte de un ataque a la cadena de suministro.

Trabajar hacia atrás desde un IoC hasta el paso anterior en la cadena de ataque es una cuestión de conectar datos y metadatos del IoC a la fuente del IoC. Por ejemplo, si hay un archivo inesperado en el servidor web, ¿cuándo se creó el archivo? ¿Qué cuenta creó el archivo (por ejemplo, el sistema de implementación, el propio servidor web, la cuenta de un desarrollador)? Si el servidor web creó el archivo, verifique los registros de acceso para ver las solicitudes alrededor y justo antes de ese momento. Si la cuenta de un desarrollador creó el archivo, verifique el SSH y otros registros de acceso remoto alrededor y justo antes del momento de creación de ese archivo. Si el sistema de implementación creó el archivo, verifique si el archivo se agregó al repositorio de código fuente. Para cada uno de estos casos, si encuentra algo, es posible que le brinde otro IoC desde el cual trabajar. Quizás encuentres algo en los registros web; ¿Existen solicitudes previas de esa dirección IP o bloque de red con ese agente de usuario? Si se agregó un archivo malicioso al control de fuente, ¿qué cuenta lo agregó y desde dónde se autenticó?

Tenga en cuenta que incluso los atacantes mínimamente competentes normalmente intentarán cubrir sus huellas. Algunas técnicas que pueden utilizar incluyen:

- Conexión desde diferentes direcciones IP y uso de diferentes cadenas de agente de usuario
- Cargar una puerta trasera inicial, luego usar esa puerta trasera para descargar una puerta trasera diferente y, finalmente, eliminar la primera puerta trasera.
- Eliminar cualquier archivo de registro que encuentren en el servidor
- Reducir la velocidad de sus herramientas de piratería (por ejemplo [sqlmap](https://sqlmap.org/)) para no provocar un gran pico de tráfico

Por estas y otras razones, es posible que no pueda crear un conjunto claro de pasos desde un IoC hasta un compromiso inicial. En algunos casos (como encontrar un volcado de datos del sitio en la web oscura), es posible que tenga muy poco con qué continuar. Tenga en cuenta que al revisar los registros, lo ideal es que el sitio web utilice una plataforma de registro central de alta seguridad, ya que es de esperar que el atacante no haya podido modificar ni eliminar esos registros. Es posible que los registros que se encuentran en un host comprometido no sean completamente confiables. Otro problema son las marcas de tiempo de registro que no están alineadas. Diferentes sistemas pueden usar diferentes zonas horarias o pueden tener relojes de sistema inexactos. Al comparar marcas de tiempo entre diferentes sistemas, es útil intentar encontrar registros para un solo evento y luego usarlo para encontrar el desplazamiento entre marcas de tiempo.

Si, debido a que faltan IoC que no son informativos, necesita intentar una búsqueda abierta en los registros del servidor web. El principal problema con esto es que los registros de acceso al servidor web no brindan mucha información sobre los resultados de esas solicitudes. Si los propietarios del sitio han configurado un registro de seguridad para el cliente, obviamente eso puede ser mucho más útil. Si tiene que buscar en los registros de acceso al servidor, aquí tiene algunos consejos:

- Considere analizar los registros y almacenarlos en un formato más estructurado para facilitar la búsqueda.
- Los atacantes a menudo intentan ocultar sus ataques mediante codificación, así que busque rápidamente en los registros signos de porcentaje (%) para ver si hay datos codificados en URL.
- Busque cadenas asociadas con estándares de ataque. Tenga en cuenta que los escáneres de vulnerabilidades automatizados están constantemente de forma indiscriminada en todo Internet, por lo que debe esperar muchos resultados. Si tiene muchos resultados, intente encontrar estándares entre ellos. Los estándares que aparecen constantemente a lo largo de los registros probablemente sean menos interesantes. Los más interesantes son grupos de diferentes estándares que comparten una dirección IP, netblock y/o agente de usuario. Esto es indicativo de un humano husmeando en el sitio. Algunos estándares útiles para buscar:
  - Solicitudes con corchetes angulares (&lt; y &gt;), especialmente la cadena `<script`.
  - Solicitudes con selectores de JavaScript como `onClick`, `onMouseOver`, etc.
  - Solicitudes con la cadena `../` en ellas.
  - Solicitudes con comillas simples y/o palabras clave SQL (`select`, `and`, `or`, `where`, `update`, `delete`) en ellas
  - Solicitudes que generan una respuesta inusualmente grande para su punto final. (Por ejemplo, el índice de un artículo generalmente genera una página web de 30k y una página de 300k).

Si encuentra una entrada de registro interesante que pueda indicar una fuente de compromiso o explotación, una forma rápida de comprobarla es intentar enviar una solicitud similar usted mismo. Completar la Ruta de Aprendizaje de Evaluación de Seguridad de Aplicaciones Web le ayudará a comprender estos ataques. Otro enfoque es trabajar con el propietario del sitio para revisar el código que procesa esa solicitud y ver si podría desencadenar una vulnerabilidad en el código.

A través de una combinación de búsquedas menos dirigidas en los registros y de intentar conectar los enlaces de una cadena de ataque, es de esperar que se pueda encontrar la fuente inicial de un compromiso. Tenga en cuenta que la mayoría de los atacantes no hacen grandes esfuerzos para ocultar sus huellas. Es una buena estrategia comenzar buscando lo más obvio primero y solo después dejar de buscar técnicas de evasión inteligentes. Por ejemplo, si encuentra solicitudes HTTP del atacante, es probable que la búsqueda de más solicitudes desde la misma dirección IP y/o el mismo agente de usuario tenga éxito.

### Seguimiento de un atacante hacia adelante

Una vez que haya encontrado el compromiso inicial, el siguiente paso obvio es seguir al atacante para ver qué ha hecho. Los objetivos de este proceso son determinar qué información probablemente haya comprometido el atacante y prepararse para desalojarlo. El proceso de rastrear los pasos hacia adelante del atacante es similar, pero más fácil, que rastrear sus pasos hacia atrás. Asegúrese de buscar artefactos en el disco y sus metadatos, además de los registros. Comparar los archivos en el servidor web con lo que hay en el repositorio de código fuente puede resultar útil para esto. También tenga en cuenta que los atacantes con frecuencia intentarán ampliar su acceso a otros servidores, por lo que debe mantenerse alerta ante intentos de movimiento horizontal. Finalmente, asegúrese de buscar mecanismos de persistencia, como cambios en archivos cron y similares.

### Desalojar al atacante

Una vez que esté bastante seguro de a qué sistemas tiene acceso el atacante (por ejemplo, mediante exploits, puertas traseras, etc.), puede intentar cortar su acceso. Esto es algo que debes intentar hacer rápidamente y de una sola vez. Querrá corregir cualquier vulnerabilidad y eliminar las puertas traseras que conozca. Tenga en cuenta también que la mayoría de los atacantes, especialmente los actores de estados-nación, trabajan en un horario regular. Especialmente si el atacante no sabe que ha sido detectado, lo mejor es desalojarlo mientras duerme.

La forma ideal de desalojar al atacante es derribar todos los servidores a los que haya accedido y reconstruirlos desde cero. Esto, por supuesto, depende de tener una versión limpia de la fuente del sitio y copias de seguridad confiables de los datos del sitio (por ejemplo, bases de datos). Si esto no es posible, intente realizar la mayor reconstrucción posible, en lugar de intentar eliminar quirúrgicamente el acceso del atacante.

En el peor de los casos, si la infraestructura del sitio está completamente invadida, o parece que el atacante está a punto de obtener un nivel de acceso devastador, puede ser sensato simplemente apagar los servidores y reemplazar el sitio con una página estática.

### Recuperarse del hack

Si cree que el atacante ha sido desalojado, es posible que esté equivocado. Incluso si el atacante ha sido desalojado, probablemente buscará otra forma de entrar. Es importante buscar activamente la actividad de los atacantes. Además, si el atacante aprovechó una vulnerabilidad del sitio web para ingresar, es probable que existan otras vulnerabilidades explotables en el sitio. Es una buena idea realizar una evaluación de seguridad en el sitio. Consulte la Ruta de Aprendizaje sobre Evaluación de Seguridad de Aplicaciones Web para obtener más información al respecto. Probablemente también sea una buena idea realizar los procesos de refuerzo del sitio descritos en el subtema 1 de esta ruta de aprendizaje. Por último, probablemente haya identificado algunos problemas con el sitio, la infraestructura, el registro, etc. Ahora sería un buen momento para elaborar un plan para abordar esas cuestiones.

Si los datos del usuario se vieron comprometidos, el propietario del sitio puede verse obligado legal y/o moralmente a revelar la violación. Gestionar eso está más allá del alcance de esta ruta de aprendizaje, pero [aquí hay un artículo para comenzar](https://discernibleinc.com/blog/-mailbag-reader-question-truthful-communication-legal-exposure).

## Práctica

Ofrece una colección de ejercicios que permiten al practicante utilizar las herramientas y practicar las habilidades descritas anteriormente. Si es relevante, esta sección también vincula a muestras de malware o contenido malicioso con el que el practicante puede interactuar mientras practica la habilidad.

- Complete el [Análisis de Registros - WordPress Comprometido](https://blueteamlabs.online/home/challenge/log-analysis-compromised-wordpress-ce000f5b59) en Blue Team Labs Online (se requiere una cuenta gratuita). Si tiene problemas, hay [un artículo](https://cyberjunnkie.medium.com/log-analysis-wordpress-incidentresponse-blueteamlabsonline-fdf211899782) disponible.
- Complete el [Desafío WebStrike Blue Team](https://cyberdefenders.org/blueteam-ctf-challenges/149#nav-overview) en CyberDefenders (se requiere una cuenta gratuita). Aunque este desafío implicó el uso de archivos PCAP en lugar de registros web, los principios son los mismos.

## Verificación de Habilidades

De forma independiente (o con un mentor), complete el [Desafío Tomcat Takeover Blue Team](https://cyberdefenders.org/blueteam-ctf-challenges/135#nav-overview) en CyberDefenders (se requiere una cuenta gratuita). Aunque este desafío implicó el uso de archivos PCAP en lugar de registros web, representa un escenario de ataque de un extremo a otro.

## Recursos de Aprendizaje

{{% resource title="The year-long rash of supply chain attacks against open source is getting worse" languages="English" cost="Free" description="A look at supply chain attacks against open source software, in which attackers compromise software dependencies" url="https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/" %}}

{{% resource title="How do you manage/balance truthful communications about an incident/breach while mitigating legal exposure?" languages="English" cost="Free" description="A short guide, written by an incident responder rather than a lawyer on what the various concerns (legal/ ethical/ other) digital protectors might have when disclosing breaches and how to manage those" url="https://discernibleinc.com/blog/-mailbag-reader-question-truthful-communication-legal-exposure" %}}