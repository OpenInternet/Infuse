+++
style = "module"
weight = 1
title = "Fortificación del Sitio Web"
description = "Exploramos algunos pasos iniciales que puede seguir para que su sitio web sea más resistente a los ataques."
+++

## Caso de Uso

Hay una serie de pasos que se pueden seguir en un sitio web en su conjunto para hacerlo más resistente a los ataques. Por lo general, requieren menos esfuerzo que revisar el sitio página por página y pueden tener un gran impacto, por lo que, en general, es una buena idea realizar estas acciones primero.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Utilice procesos de desarrollo y mantenimiento que garanticen que su sitio pueda recrearse si los servidores de alojamiento de producción no están disponibles.
- Utilice CDN (redes de entrega de contenido) para proteger su sitio web de ataques DoS
- Utilice generadores de sitios estáticos para hacer que su sitio sea más resistente a DoS y piratería
- Utilice refuerzos de configuración y WAF para hacer que su sitio sea más resistente a la piratería.

---
## Sección Principal

Esta sub-skill cubre actividades fundamentales en todo el sitio que deben realizarse en casi cualquier sitio que desee estar protegido contra ataques. Si bien es posible que no todas las acciones se apliquen a todos los sitios, algunas se aplican a todos los sitios y todas se aplican a algunos.

### Cómo funcionan los ataques DoS a sitios web

Uno de los temas clave de esta Ruta de Aprendizaje son los ataques DoS. Para entender cómo defendernos y responder a estos ataques, debemos entender cómo funcionan.

#### Tipos de Ataque

Los ataques DoS se pueden desglosar en términos generales según la capa de la aplicación a la que se dirige el ataque y si el ataque es volumétrico o si explota errores en el software objetivo.

###### Ataques a nivel de red

El tipo de ataque DoS de nivel más bajo opera a nivel de red. El objetivo de estos ataques son las conexiones de red entre computadoras, equipos de enrutamiento y/o el sistema operativo del objetivo. En un ataque volumétrico, el atacante simplemente enviará toneladas de tráfico de red al objetivo, tratando de abrumar la red o la capacidad de conmutación/enrutamiento de los dispositivos de red que conectan el objetivo a Internet. Ejemplos de este tipo de ataques son las [inundaciones de ping](https://en.wikipedia.org/wiki/Ping_flood), [los ataques smurf](https://es.wikipedia.org/wiki/Ataque_pitufo), y los [ataques de amplificación NTP](https://www.cloudflare.com/es-la/learning/ddos/ntp-amplification-ddos-attack/).

De vez en cuando se encuentra un error en un dispositivo de red o sistema operativo de servidor que permite ataques DoS más eficientes. Estos van desde el clásico “[ping de la muerte](https://es.wikipedia.org/wiki/Ping_de_la_muerte)” de los años 90, donde un solo paquete podía provocar la caída de un servidor, hasta los más modernos [problemas de colisión de hash](https://www.enyo.de/fw/security/notes/linux-dst-cache-dos.html) .

###### Ataques a nivel de protocolo

Un paso adelante en la pila de red son los ataques a nivel de protocolo. Para los sitios web, todos estos ataques utilizarán HTTP para intentar saturar el servidor web o su infraestructura de backend. Los ataques volumétricos son similares a los ataques a nivel de red; los atacantes simplemente provocan una gran avalancha de tráfico.

También existen ataques DoS basados ​​en exploits a nivel de protocolo; generalmente atacando el software del servidor web. Un ejemplo es el [ataque HTTP POST lento](https://www.educative.io/answers/what-is-slow-http-post-dos-attack).

###### Ataques a nivel de aplicación

La última clase de ataque DoS es el que ataca una característica del sitio web objetivo que consume muchos recursos. Dado que es específico del sitio objetivo, este tipo de ataque requiere más habilidades técnicas que los otros tipos, pero puede ser extremadamente efectivo y difícil de detener. En estos ataques, el actor de amenaza identificará una función en el sitio web que consume muchos recursos del lado del servidor. Los ejemplos pueden incluir una página que cambia el tamaño de una imagen (puede consumir mucha memoria del servidor), envía correos electrónicos (puede consumir recursos de red desproporcionados y afectar la reputación del servidor de correo), realiza una búsqueda complicada (puede consumir una gran cantidad de CPU y caché de la base de datos), etc.

Estos ataques suelen servir para reducir drásticamente el coste de un ataque DoS para el atacante. En lugar de enviar decenas o cientos de miles de solicitudes por segundo, el atacante puede hacer que un servidor web no responda con solo cientos de solicitudes por segundo. Esto no solo reduce el costo del atacante en términos de solicitudes enviadas, sino que el atacante puede ocultar su tráfico más fácilmente, ya que el volumen de tráfico general puede no ser significativo. Además, detener estos ataques suele requerir cambios en el propio sitio, que en algunos casos pueden ser bastante extensos.

#### DoS frente a DDoS

Un ataque DDoS (denegación de servicio distribuido) es un tipo de ataque DoS en el que el tráfico malicioso proviene de una gran cantidad de fuentes. Esto es lo opuesto a un ataque convencional, donde una pequeña cantidad de computadoras envían tráfico malicioso. A medida que los defensores han adquirido habilidades y destrezas, los ataques efectivos generalmente son ataques DDoS, ya que los ataques convencionales son fáciles de bloquear y frecuentemente no generan suficiente tráfico. La mayoría de los ataques DDoS implican que los atacantes alquilen tiempo en una [botnet](https://es.wikipedia.org/wiki/Botnet) existente o contraten un [servicio DDoS dedicado](https://krebsonsecurity.com/category/ddos-for-hire/), aunque algunas bandas de extorsión tendrán sus propias botnets.

### Prácticas de Desarrollo y Mantenimiento del Sitio

Lo más fundamental para ayudar a prepararse y responder a los ataques es poder reconstruir el sitio desde cero. Esto es importante en los ataques DoS, ya que es posible que el sitio no sólo no esté disponible para los usuarios finales, sino también para los propietarios del sitio. En algunos casos, los proveedores de alojamiento cerrarán un sitio que esté bajo ataque para evitar que sus sistemas se sobrecarguen. En un ataque de piratería informática, tener una copia "limpia" del sitio suele ser esencial para los análisis forenses y también para la limpieza posterior al ataque.

#### Control de Versiones

El código del sitio y el contenido estático deben almacenarse en un sistema de control de versiones basado en servidor. Los desarrolladores de sitios suelen ser ellos mismos el objetivo de los ataques. Por ejemplo, el [propietario de un sitio web azerbaiyano fue víctima de un ataque de phishing y el atacante utilizó su acceso para colocar una puerta trasera en el sitio web de la víctima](https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/). Tener un sistema de control de versiones, especialmente uno administrado externamente, puede limitar el impacto de comprometer a un mantenedor del sitio. Además, tener el código y el contenido almacenados de forma remota tiene otras ventajas si ocurre un accidente, como la pérdida de una computadora portátil. Servicios como [GitHub](https://docs.github.com/es) y [GitLab](https://about.gitlab.com/resources/) tienen niveles gratuitos que satisfacen las necesidades de individuos y pequeñas organizaciones.

#### Configuración de Desarrollo Replicado

Si es posible, los encargados del mantenimiento del sitio deben tener un entorno aislado y de acceso controlado donde puedan realizar y probar cambios en su sitio web. Esto puede ser tan simple como un sitio no publicado y protegido con contraseña en un proveedor como Wordpress.com o Wix, o una configuración Docker completa de múltiples contenedores que permita a un desarrollador tener un entorno completo en su computadora portátil. En cualquier caso, realizar cambios en la producción durante un ataque puede resultar difícil o imposible, y es muy fácil cometer errores en una situación de mucho estrés. Tener un entorno de desarrollo independiente permitirá a los mantenedores del sitio realizar y probar cambios en un lugar seguro antes de implementar esos cambios en producción.

#### Copias de seguridad de bases de datos

Si el sitio web tiene una base de datos, es importante que se haga una copia de seguridad de esa base de datos y que se prueben esas copias de seguridad. Lo ideal es que las copias de seguridad se realicen automáticamente y se almacenen las copias de seguridad antiguas. De esa manera, si un atacante logra utilizar una vulnerabilidad como la inyección SQL para dañar la base de datos, se puede restaurar una versión limpia, incluso si el ataque no se detecta de inmediato. Si la base de datos es pequeña, se puede almacenar en el sistema de control de versiones del sitio. Las copias de seguridad más grandes se pueden almacenar de forma segura y económica en sistemas como [AWS S3](https://aws.amazon.com/es/s3/) o [Cloud Storage de GCP.](https://cloud.google.com/storage?hl=es#backups-and-archives). El sistema de almacenamiento, por supuesto, debe tener habilitado el control de acceso. Idealmente, los procesos que realizan copias de seguridad de los datos solo deberían tener permisos para agregar nuevos archivos al almacenamiento, no para leer, escribir ni eliminar datos existentes.

### Uso de CDN o hosting resistentes a DoS

Dado que los ataques de denegación de servicio son la amenaza más común que enfrentan los sitios web de la sociedad civil, la próxima prioridad de la persona propietaria de un sitio debería ser establecer defensas básicas contra los ataques DoS. Hay dos formas de hacer esto: usando una CDN con protección DoS o usando un proveedor de alojamiento resistente a DoS.

#### CDN resistentes a DoS

Las CDN (redes de entrega de contenidos) sirvieron originalmente como una forma de ofrecer recursos web estáticos de forma más rápida y con menores costos de servidor. Generalmente eran utilizados por sitios web de mucho tráfico. Por lo general, el propietario del sitio web utilizará un nombre de host especial (por ejemplo, imágenes.ejemplo.com) y otorgará el control DNS de ese nombre de host al proveedor de CDN. El proveedor de CDN tiene una gran red de servidores web, idealmente ubicados cerca (en términos de topología de red) de los usuarios finales. Estos servidores se denominan servidores "permitrales". Cuando un usuario final realiza una búsqueda de DNS para ese nombre de host, los servidores del proveedor de CDN responden con la dirección IP del servidor perimetral de CDN "más cercano". Cuando el usuario final solicita un recurso (página web, imagen, archivo de sonido, etc.) del servidor perimetral, el servidor perimetral primero ve si tiene el recurso en su caché. De lo contrario, solicita el recurso del sitio web original (llamado servidor "origen") y lo almacena en la memoria caché. Una vez que tiene el recurso en su caché, puede devolverlo al usuario final. En solicitudes posteriores, responderá inmediatamente con el recurso almacenado en caché. En un sitio web de uso intensivo, esto reduce la carga en el servidor de origen y también da como resultado una menor latencia de la red.

Con el tiempo, la utilidad de las CDN para la protección DoS se hizo evidente. Las CDN tienen mucha capacidad de ancho de banda y software de servidor web especializado, por lo que pueden resistir avalancha de tráfico de los ataques DoS. Esto detiene los ataques a nivel de red y la mayoría de los ataques a nivel de protocolo contra contenido web estático. Para protegerse contra ataques a nivel de protocolo contra cualquier página, los sitios web ofrecerán todo el contenido a través de la CDN, en lugar de solo contenido estático. Dado que las CDN ofrecen protección a múltiples clientes, pueden desarrollar herramientas, técnicas y experiencia especializadas para detectar y bloquear ataques DoS.

Ejemplos de soluciones CDN resistentes a DoS incluyen [Deflect](https://deflect.ca/non-profits/), [Project Shield](https://projectshield.withgoogle.com/landing?hl=es-419), [Fastly](https://www.fastly.com/es/fast-forward/), y [CloudFlare]https://www.cloudflare.com/es-la/galileo/).

Una advertencia importante al utilizar una CDN para proteger su sitio web de ataques DoS es que es imperativo que restrinja el tráfico a sus servidores web de origen. Digamos que su sitio web, servido a través de una CDN, usa el nombre de host [www.example.com](http://www.example.com), y usted usa origin.example.com para su servidor web de origen "real". Si un atacante lanza un ataque DoS contra origin.example.com, omitirá por completo la CDN y su sitio no recibirá ningún beneficio. En cambio, los servidores web de origen deberían tener restricciones de dirección IP a nivel de red (por ejemplo, a través de un firewall) o, idealmente, estar completamente aislados de Internet y solo ser accesibles a través de una VPN.

Además, existen ciertas configuraciones erróneas que pueden hacer que un servidor perimetral CDN no reconozca el contenido estático frente al dinámico. Por ejemplo, si un sitio web tiene una página como [www.example.com/profile](http://www.example.com/profile), la CDN no sabe automáticamente que la página contiene información privada. La forma más estándar de solucionar este problema es configurar la CDN para que almacene en caché en función de los encabezados de respuesta y luego establecer un encabezado Cache-Control cuyo valor sea private o similar. Esto le indicará a la CDN que la página contiene información privada y que no debe brindar el mismo contenido a diferentes usuarios. Los detalles específicos de cómo se configura y utiliza variarán entre los proveedores de CDN, así que asegúrese de consultar la documentación de su proveedor antes de configurar una CDN. También es una buena idea tener un sitio de prelanzamiento que esté configurado con la misma CDN y configuración que el sitio de producción. De esta manera, los administradores del sitio pueden verificar los cambios importantes antes de publicarlos.

#### Alojamiento resistente a DoS

Algunos proveedores combinan alojamiento web con resistencia DoS. Generalmente tienen el mismo tipo de tecnologías y prácticas que utilizan los proveedores de CDN, pero incluidas con el alojamiento web. Esto evita el problema anterior de proteger los servidores de origen, pero depende de que el proveedor proporcione tanto la protección como los servicios de alojamiento que necesita. Ejemplos de proveedores de hosting resistentes a DoS incluyen [Qurium](https://www.qurium.org/secure-hosting/) y [Greenhost](https://greenhost.net/internet-freedom/).

#### Limitaciones de los proveedores de alojamiento y CDN resistentes a DoS

Es posible que haya notado que la protección proporcionada por los proveedores de alojamiento y CDN resistentes a DoS cubre la mayoría de los ataques, pero el material anterior omitió los ataques a nivel de aplicación. Puede haber fallas en un sitio web que permitan ataques DoS con volúmenes muy pequeños. Las defensas estándar contra ataques DoS no son efectivas en este caso. Dicho esto, el personal de soporte y respuesta rápida de CDN y los proveedores de alojamiento pueden ayudar a los propietarios de sitios web en caso de que haya un ataque DoS activo a nivel de aplicación contra su sitio web.

La defensa contra ataques a nivel de aplicación se trata con más profundidad en el subtema Respuesta a Incidentes DoS (subtema 3 en esta ruta de aprendizaje).

### Uso de Firewalls de Aplicaciones Web

Los WAF (firewalls de aplicaciones web) son dispositivos de red que se encuentran entre un usuario final y el servidor de origen de un sitio web, como una CDN. Mientras que una CDN brinda protección contra ataques DoS, un WAF intenta proteger contra ataques de piratería. Inspeccionarán las solicitudes entrantes y bloquearán las que parezcan maliciosas, por ejemplo, parámetros que contengan cosas como `' or 1=1;--` (Inyección SQL), `">&lt;script src="<http://attacker.com/payload.js>"&gt;<z a="` (XSS), o `../../../../../../etc/passwd` (recorrido de directorio). Si bien ningún WAF puede brindar una protección perfecta contra la piratería, pueden ser lo suficientemente efectivos para proteger un sitio contra vulneraciones y casi siempre dificultan la tarea del atacante de identificar vulnerabilidades. En la mayoría de los casos, un buen WAF no alterará el contenido legítimo, pero es posible que lo haga. Por ejemplo, si un sitio fuera un foro de discusión sobre desarrollo web seguro, un WAF probablemente bloquearía publicaciones legítimas sobre técnicas de ataque. Al igual que con las CDN, es una muy buena idea tener un sitio de prelanzamiento donde se puedan probar los cambios antes de su publicación.

La mayoría de las CDN resistentes a DoS también tienen funciones WAF. También hay proveedores WAF dedicados que brindan servicios adicionales, que generalmente incluyen protección DoS. Por ejemplo, [Sucuri](https://sucuri.net/website-firewall/) es un proveedor de WAF que también brinda protección DoS y algunas capacidades de respaldo y respuesta a incidentes. [WordFence](https://www.wordfence.com/products/pricing/) es un proveedor de WAF que se especializa en proteger sitios creados en WordPress. Además de intentar bloquear intentos de piratería genéricos y ataques DoS, intenta bloquear ataques dirigidos específicamente a sitios de WordPress.

También hay WAF que deben ejecutarse en el mismo servidor o red que el sitio web que están protegiendo. Como ejemplos podemos incluir productos costosos desarrollados por Barracuda y F5, así como soluciones de código abierto como [ModSecurity](https://github.com/SpiderLabs/ModSecurity). Tenga en cuenta que estos sistemas generalmente no brindan protección DoS por sí solos.

### Fortificadores de Configuración

Los sitios web casi universalmente se construyen sobre algún tipo de framework que maneja la mayor parte del trabajo de servir páginas web. Podría ser un framework de bajo nivel, como nginx, que solo maneja redes y HTTP básico, o una estructura de muy alto nivel como WordPress, que maneja todo excepto el contenido del sitio. En la gran mayoría de los casos, el framework proporciona un conjunto de características, capacidades y otras opciones de configuración, la mayoría de las cuales no son necesarias para el sitio web. Estas características y configuraciones innecesarias exponen al sitio web a riesgos adicionales a través de una mayor superficie de ataque (y la posibilidad de errores expuestos) o configuraciones inseguras en sí mismas.

Si bien es posible estudiar manualmente las capacidades de un framework y decidir cómo habilitar funciones y configuraciones por su cuenta, generalmente es mucho más fácil y efectivo usar una herramienta o un conjunto de líneas base predeterminadas. Estos fortalecedores de configuración suelen representar miles de horas de trabajo para bloquear un sistema tanto como sea posible sin dejarlo inutilizable.

Al igual que con cualquier cambio en el sistema, es bueno, tal vez necesario, tener un entorno separado en el que probar los cambios, así como un proceso de prueba para asegurarse de que todo funcione correctamente antes de implementar los cambios en producción. Un sitio puede depender de una configuración insegura o de una característica poco utilizada para funcionar correctamente. En ese caso, es mejor detectarlo antes de poner en uso un sitio reconfigurado.

[DevSec Hardening Framework](https://dev-sec.io/baselines/) proporciona un conjunto de líneas base de seguridad para reforzar una amplia variedad de software de infraestructura de uso común, como Linux, MySQL, Apache, Docker, etc. Sus líneas de base están documentadas en el sitio web y proporcionan recetas para administradores de configuración como Chef, Puppet y Ansible.

Otros fortificadores de configuración profundizan mucho más en los frameworks que protegen. Un ejemplo es [Snuffleupagus](https://snuffleupagus.readthedocs.io/), que protege las instalaciones de PHP. Además de proporcionar cambios de configuración, cambia el comportamiento de las funciones para hacerlas menos peligrosas. Por ejemplo, cambia la función `system()` para eliminar caracteres potencialmente peligrosos de su entrada, y la función `mail()` para no permitir funciones que puedan usarse para escribir archivos arbitrarios.

Si bien los fortificadores de configuración no pueden eliminar todas las vulnerabilidades de un sitio web y su uso requiere pruebas cuidadosas del sitio posteriormente, son una de las formas más fáciles de cerrar o ralentizar la explotación de un sitio.

### Generadores de Sitios Estáticos

Muchos sitios web utilizan un sistema de gestión de contenidos para gestionar el sitio, aunque el contenido del sitio no cambia para cada visitante. Si bien hay sitios que deben actualizarse varias veces por minuto o personalizar el contenido para cada visitante, la mayoría son sitios esencialmente estáticos. En este caso, "estático" significa que normalmente se actualiza cada pocas horas o menos. Para mayor comodidad, la mayoría de estos sitios se generan dinámicamente en cada visita. Para un uso normal, está absolutamente bien. Sin embargo, para un sitio siendo atacado, esto presenta algunos problemas.

En primer lugar, ese comportamiento dinámico expone más superficie de ataque a los adversarios. En lugar de ser simplemente un servidor web y algunos archivos, el sitio es un complicado conjunto de comportamiento dinámico respaldado por una combinación de archivos y bases de datos. Es mucho más probable que esta última contenga una vulnerabilidad que podría ser aprovechada por un atacante.

En segundo lugar, ese complejo conjunto de bases de datos y scripts tarda mucho más en generar una respuesta HTTP que un sitio estático. Esta complejidad de procesamiento adicional hace que los ataques de denegación de servicio sean mucho más efectivos.

En resumen, si un sitio web puede funcionar como sitio estático, será mucho más resistente como sitio estático que como sitio dinámico. También amplía las opciones de alojamiento del sitio y reduce los costos de alojamiento, ya que el sitio puede recibir servicios como depósitos de almacenamiento de proveedores de servicios en la nube, páginas de GitHub, etc.

Algunos generadores de sitios estáticos tienen su propia estructura simple para el contenido del sitio, y generalmente se basan en un montón de archivos Markdown, algunas plantillas de estilo HTML y algunos archivos de configuración. Sin embargo, muchos sistemas de gestión de contenidos utilizarán un generador de sitios estáticos en el backend para producir el sitio web final. Por supuesto, también es posible mantener simplemente los archivos fuente en git o algo similar. En cualquier caso, los propietarios del sitio realizarán cambios en la configuración del sitio web y luego generarán, probarán y cargarán el sitio estático completo para cada cambio. Ejemplos de algunos generadores de sitios estáticos independientes populares incluyen [Hugo](https://gohugo.io/) y [Jekyll](https://jekyllrb.com/). Para la gestión de contenidos, ejemplos de CMS que utilizan generadores de sitios estáticos incluyen [Cloud Cannon](https://cloudcannon.com/jamstack-ecosystem/static-site-generators/) o [Static CMS](https://www.staticcms.org/docs/add-to-your-site).

La desventaja de migrar a un generador de sitios web estáticos como Hugo o Jekyll es que tienes que migrar tu contenido existente. Para sitios web que utilizan un CMS diferente, esto puede suponer mucho trabajo. Sin embargo, es posible utilizar un generador de sitios estáticos para su plataforma existente. Un ejemplo popular es [WP2Static](https://wp2static.com/), un complemento de WordPress de [fuente abierta](https://github.com/elementor/wp2static) que convertirá un sitio de WordPress en uno estático. Todavía es posible que sea necesaria una migración, los [formularios de contacto](https://wp2static.com/docs/basics/contact-forms-for-static-sites/) deberán cambiarse y deberán migrarse a un servicio de terceros como [Disqus](https://help.disqus.com/en/articles/1717131-importing-comments-from-wordpress), [ReplyBox](https://getreplybox.com/docs/importing-wordpress-comments/), o muchos otros. Tenga en cuenta que el uso de un servicio de comentarios de terceros permitirá que otra parte tenga el control de los comentarios de los usuarios de su sitio.

## Verificación de Habilidades

El fortalecimiento de sitios web desempeña un papel fundamental en la protección de los activos en línea contra diversas amenazas cibernéticas. Este conjunto de desafiantes preguntas de opción múltiple explora los conceptos centrales del fortalecimiento de sitios web, centrándose en estrategias y tecnologías clave destinadas a mejorar la resiliencia de las aplicaciones web frente a vulnerabilidades comunes. Desde los procesos de desarrollo y mantenimiento que garantizan la disponibilidad del sitio hasta la implementación de redes de entrega de contenido (CDN) y generadores de sitios estáticos, estas preguntas profundizan en las complejidades de fortalecer los sitios web contra los intentos de piratería.

Pruebe sus conocimientos sobre las prácticas de protección de sitios web y obtenga información sobre las medidas esenciales para reforzar la postura de seguridad de sus plataformas en línea. Si es posible, analice sus respuestas a esas preguntas con un compañero o mentor que le ayudará a verificar que haya comprendido correctamente el tema.

1. ¿Qué proceso de desarrollo y mantenimiento garantiza que se pueda recrear un sitio web si los servidores de alojamiento de producción no están disponibles?

A) Actualizar periódicamente los complementos y temas del sitio web\
B) Implementación de autenticación multifactor para cuentas de administrador\
C) Utilizar sistemas de control de versiones y copias de seguridad automatizadas\
D) Hacer cumplir políticas estrictas de contraseñas para las cuentas de usuario

{{< question title="Respuesta correcta" >}}
C) Utilizar sistemas de control de versiones y copias de seguridad automatizadas

Explicación: El uso de sistemas de control de versiones (como Git) y copias de seguridad automatizadas garantiza que el código base y los datos del sitio web se almacenen de forma segura y puedan restaurarse fácilmente en caso de fallas del servidor o pérdida de datos. Esta práctica ayuda a mantener la integridad del sitio web y minimiza el tiempo de inactividad.
{{< /question >}}

2. ¿Cómo puede una CDN (Red de entrega de contenidos) ayudar a proteger un sitio web de ataques de denegación de servicio (DoS)?

A) Distribuyendo el contenido del sitio web en múltiples servidores para manejar los picos de tráfico.\
B) Cifrando todos los datos transmitidos entre el servidor y el cliente.\
C) Proporcionando capas adicionales de autenticación para los inicios de sesión de los usuarios\
D) Bloqueando automáticamente el acceso a direcciones IP sospechosas

{{< question title="Respuesta correcta" >}}
A) Distribuyendo el contenido del sitio web en múltiples servidores para manejar los picos de tráfico.

Explicación: Una CDN (Red de Entrega de Contenido) ayuda a proteger un sitio web de ataques DoS al distribuir su contenido en múltiples servidores ubicados en varias ubicaciones geográficas. Esta distribución ayuda a distribuir la carga de tráfico entrante, reduciendo el impacto de los ataques DoS y garantizando que el sitio web permanezca accesible para los usuarios incluso durante períodos de mucho tráfico.
{{< /question >}}

3. ¿Qué tecnología puede mejorar la resistencia de un sitio web a DoS (denegación de servicio) y a la piratería al ofrecer páginas HTML pre-renderizadas a los usuarios?

A) Plataformas informáticas sin servidor\
B) Estructuras dinámicas de aplicaciones web\
C) Sistemas de Gestión de Contenidos (CMS)\
D) Generadores de sitios estáticos


{{< question title="Respuesta correcta" >}}
D) Generadores de sitios estáticos

Explicación: Los generadores de sitios estáticos crean sitios web generando páginas HTML a partir de archivos fuente durante el proceso de construcción. Dado que los sitios estáticos no dependen del procesamiento del lado del servidor ni de bases de datos, son inherentemente más resistentes a la piratería y los ataques DoS. Los sitios estáticos también suelen ser más rápidos de cargar y más fáciles de almacenar en caché, lo que mejora aún más su resistencia a los ataques.
{{< /question >}}

4. ¿Cómo contribuyen los fortalecedores de configuración y los WAF (Web Application Firewalls) a hacer que un sitio web sea más resistente a la piratería?

A) Optimizando el rendimiento del servidor y el uso de recursos\
B) Implementando capas adicionales de autenticación para los inicios de sesión de los usuarios\
C) Detectando y bloqueando automáticamente patrones de ataque conocidos y tráfico sospechoso\
D) Cifrando todos los datos transmitidos entre el servidor y el cliente

{{< question title="Respuesta correcta" >}}
C) Detectando y bloqueando automáticamente patrones de ataque conocidos y tráfico sospechoso

Explicación: Los fortalecedores de configuración y los WAF (Cortafuegos de Aplicaciones Web) ayudan a que un sitio web sea más resistente a la piratería al detectar y bloquear automáticamente patrones de ataque conocidos y tráfico sospechoso. Estas medidas de seguridad actúan como una barrera entre el sitio web y los posibles atacantes, filtrando las solicitudes entrantes y el tráfico para evitar actividades maliciosas y accesos no autorizados.
{{< /question >}}

## Recursos de Aprendizaje

{{% resource title="Inundación de ping" description="Una descripción de un ataque común de denegación de servicio" languages="Inglés, chino, japonés, ruso, ucraniano, griego, indonesio, catalán, español, francés, italiano, holandés, polaco, portugués, turco, checo" cost="Gratis" url="https://es.wikipedia.org/wiki/Ping_flood" %}}

{{% resource title="Ataque Smurf" description="Una descripción de otro ataque común de denegación de servicio, incluye ejemplos y mitigaciones." languages="Inglés, árabe, farsi, japonés, coreano, griego, indonesio, catalán, alemán, español, euskera, francés, italiano, lombardo, holandés, polaco, portugués, esloveno, finlandés, checo" cost="Gratis" url="https://es.wikipedia.org/wiki/Ataque_pitufo" %}}

{{% resource title="Ataque de amplificación NTP" description="Una descripción general de cómo se podría abusar del protocolo de tiempo de red (NTP) para ataques de denegación de servicio" languages="Inglés, alemán, español, francés, italiano, japonés, coreano, portugués, chino, taiwanés" cost="Gratis" url="https://www.cloudflare.com/es-la/learning/ddos/ntp-amplification-ddos-attack/" %}}

{{% resource title="Ping de la muerte" description="Un ataque en el que una computadora se ve abrumada por un ping malicioso." languages="Inglés, árabe, farsi, chino, japonés, coreano, búlgaro, ruso, ucraniano, griego, azerí, indonesio, alemán, español, francés, italiano, holandés, polaco, portugués, rumano, checo, hebreo" cost="Gratis" url="https://es.wikipedia.org/wiki/Ping_de_la_muerte" %}}

{{% resource title="Ataques de complejidad algorítmica y el Código de Red de Linux" description="Una mirada a cómo Linux maneja las redes y un ataque específico que podría dirigirse contra él" languages="Inglés" cost="Gratis" url="https://www.enyo.de/fw/security/notes/linux-dst-cache-dos.html" %}}

{{% resource title="¿Qué es un ataque DOS de HTTP post lento?" description="Una descripción general de un ataque de denegación de servicio que explota algunas características de las solicitudes HTTP POST (las solicitudes se envían lo suficientemente lento como para que el servidor tenga que procesarlas, pero no lo suficientemente lento como para activar tiempos de espera)." languages="Inglés" cost="Gratis" url="https://www.educative.io/answers/what-is-slow-http-post-dos-attack" %}}

{{% resource title="Botnet" description="Una descripción general de lo que utiliza una botnet o un grupo de dispositivos conectados a Internet administrados automáticamente con fines maliciosos" languages="48 idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Botnet" %}}

{{% resource title="DDoS para contratar" description="Una colección de publicaciones de blog de Brian Krebs sobre la industria de contratación de DDoS" languages="Inglés" cost="Gratis" url="https://krebsonsecurity.com/category/ddos-for-hire/" %}}

{{% resource title="Los ataques de phishing sofisticados y dirigidos contra disidentes en Azerbaiyán son tendencia" description="Un informe de Qurium de 2020 sobre un atacante que irrumpió en un sitio web y luego utilizó los datos para realizar phishing a disidentes." languages="Inglés" cost="Gratis" url="https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/" %}}

{{% resource title="Deflect para organizaciones sin fines de lucro" description="Deflect es un programa de protección DDoS que permite a las organizaciones sin fines de lucro registrarse de forma gratuita" languages="Inglés" cost="Gratis" url="https://deflect.ca/non-profits/" %}}

{{% resource title="Google Project Shield" description="Un servicio gratuito de protección DDoS para sitios de noticias, derechos humanos y relacionados con las elecciones" languages="Inglés" cost="Gratis" url="https://projectshield.withgoogle.com/landing?hl=es-419" %}}

{{% resource title="Proyecto de Cloudflare Galileo" description="Protección previa a DDoS y otras medidas de seguridad para sitios en riesgo, incluidos grupos artísticos, organizaciones humanitarias y disidentes políticos." languages="Inglés, alemán, español, francés, italiano, japonés, coreano, portugués, chino, taiwanés" cost="Gratis" url="https://www.cloudflare.com/es-la/galileo/" %}}

{{% resource title="Alojamiento seguro para sitios en riesgo: Qurium" description="Qurium y Greenhost ofrecen alojamiento para grupos que podrían estar en riesgo de sufrir ataques debido a su trabajo en materia de derechos humanos y medios de comunicación." languages="Inglés" cost="Variado, dependiendo del paquete de alojamiento" url="Qurium: https://www.qurium.org/secure-hosting/" %}}

{{% resource title="Alojamiento seguro para sitios en riesgo: Greenhost" description="Qurium y Greenhost ofrecen alojamiento para grupos que podrían estar en riesgo de sufrir ataques debido a su trabajo en materia de derechos humanos y medios de comunicación." languages="Inglés" cost="Variado, dependiendo del paquete de alojamiento" url="Greenhost: https://greenhost.net/internet-freedom/" %}}

{{% resource title="Firewalls de aplicaciones web: Sucuri" description="Dispositivos de red que se encuentran entre un usuario final y el servidor de origen de un sitio web, como una CDN, lo que proporciona una capa adicional de seguridad." languages="Inglés" cost="Variado" url="Sucuri: https://sucuri.net/website-firewall/" %}}

{{% resource title="Firewalls de aplicaciones web: Wordfence" description="Dispositivos de red que se encuentran entre un usuario final y el servidor de origen de un sitio web, como una CDN, lo que proporciona una capa adicional de seguridad." languages="Inglés" cost="Variado" url="Wordfence: https://www.wordfence.com/products/pricing/" %}}

{{% resource title="Firewalls de aplicaciones web: ModSecurity" description="Dispositivos de red que se encuentran entre un usuario final y el servidor de origen de un sitio web, como una CDN, lo que proporciona una capa adicional de seguridad." languages="Inglés" cost="Variado" url="ModSecurity: https://github.com/SpiderLabs/ModSecurity" %}}

{{% resource title="Fortalecedores de aplicaciones web" description="Un framework de fortificación" languages="Inglés" cost="Gratis" url="https://dev-sec.io/baselines/" %}}

{{% resource title="Fortalecedores de aplicaciones web: Snuffleupagus" description="Herramientas automatizadas que encuentran posibles vulnerabilidades en aplicaciones web." languages="Inglés" cost="Gratis" url="https://snuffleupagus.readthedocs.io/" %}}

{{% resource title="Generadores de sitios estáticos" description="Una descripción general de los principales generadores de sitios estáticos" languages="Inglés" cost="Gratis" url="https://cloudcannon.com/jamstack-ecosystem/static-site-generators/" %}}

{{% resource title="WP2Static" description="Un complemento de WordPress para generar sitios estáticos" languages="Inglés" cost="Gratis" url="https://wp2static.com/" %}}