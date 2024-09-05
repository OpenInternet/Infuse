+++
style = "module"
weight = 1
title = "Configuración"
description = "Presentamos y configuramos algunas herramientas clave de evaluación de seguridad web"
+++

## Caso de Uso

Probar eficazmente aplicaciones web en busca de vulnerabilidades de seguridad requiere herramientas especializadas, que se analizan en este subtema.

La más importante de estas herramientas es un servidor proxy de interceptación, que le permitirá interactuar directamente con los datos HTTP a medida que fluyen entre su navegador y el servidor web de destino. Esto le permitirá observar qué datos se intercambian y manipularlos sin la interferencia de su navegador o de cualquier control que exista del lado del cliente .

Existen herramientas adicionales que pueden probar automáticamente los sitios web para detectar ciertos tipos de vulnerabilidades. Estos pueden acelerar las pruebas y detectar ciertas vulnerabilidades que quizás haya pasado por alto.

Finalmente, hay algunas herramientas que serán necesarias para las actividades prácticas en esta ruta de aprendizaje.

## Objetivos

Después de completar este subtema, los y las profesionales tendrán el software y las cuentas configurados para completar el resto de esta ruta de aprendizaje y sabrán cómo usarlos, incluido el siguiente software y soluciones SaaS:

- Edición Comunitaria de Burp Suite
- Cuenta gratuita de la Academia PortSwigger
- ZAP
- WPScan CLI
- Docker

---
## Sección Principal
### Tipos de evaluación

Hay tres enfoques principales para la evaluación de la seguridad de la aplicación web:

1. Pruebas de caja blanca: Tenemos acceso completo al código fuente, la infraestructura y la documentación de la aplicación. Este acceso integral permite un examen en profundidad para identificar vulnerabilidades, lo que requiere habilidades en la revisión del código fuente y la comprensión de la lógica de la aplicación. Es el método más completo pero que requiere más tiempo.

2. Pruebas de Caja negra: Comenzamos sin ningún conocimiento sobre la aplicación, enfocándonos en descubrir información a través de la enumeración. Este enfoque es común en los programas de recompensas por errores y requiere un esfuerzo significativo en las etapas iniciales para identificar vulnerabilidades potenciales.

3. Pruebas de caja gris: Este método nos proporciona información limitada sobre la aplicación, como métodos de autenticación o detalles de la estructura, ofreciendo un equilibrio entre análisis en profundidad y exploración externa.

Cada método se elige en función del contexto específico de la evaluación, incluida la información disponible y los objetivos del compromiso.

### Burp Suite

#### ¿Qué es un servidor proxy web de interceptación?

La herramienta principal utilizada en las evaluaciones de seguridad de aplicaciones web es un [servidor proxy](https://es.wikipedia.org/wiki/Servidor_proxy) de interceptación. Es posible que esté familiarizado con otros tipos de proxies, como:

- [squid](http://www.squid-cache.org/), que se utiliza principalmente para almacenamiento en caché y control de acceso a la red,
- [BlueCoat](https://en.wikipedia.org/wiki/Blue_Coat_Systems), que es popular para la vigilancia del cumplimiento corporativo (u otros competidores), o
- Proxies inversos de CDN como los utilizados por [Fastly](https://www.fastly.com/es/), [CloudFlare](https://www.cloudflare.com/es-la/) o [AWS CloudFront](https://aws.amazon.com/es/cloudfront/.

Los servidores proxy web se ubican en la red, entre una aplicación web y un servidor web, y actúan sobre el tráfico de esa red.

Los servidores proxy web generalmente se configuran como servidores proxy directos o inversos (transparentes). En un proxy de reenvío, el navegador está configurado para utilizar explícitamente el servidor proxy. Luego, el navegador enviará una solicitud CONNECT al proxy, pidiéndole que reenvíe su solicitud al servidor real. Dado que el navegador web le dice al proxy a qué sitio está intentando conectarse, los proxy directos pueden establecer conexiones con muchos sitios web de back-end (origen). Esto contrasta con los proxies inversos (abajo). Los proxies inversos no parecen ser un servidor proxy para el navegador, sino que se hacen pasar por el servidor mismo. Esto puede ser una ventaja para clientes o aplicaciones que no admiten servidores proxy. La configuración de un proxy inverso suele ser más complicada que un proxy directo, con configuración por sitio y cambios de DNS. Dado que el navegador no sabe que el proxy inverso es siquiera un servidor proxy, cada proxy inverso solo puede conectarse a un sitio web de back-end (origen).

Para obtener más explicaciones sobre los proxies inversos, consulte [esta guía](https://www.cloudflare.com/es-la/learning/cdn/glossary/reverse-proxy/).

El tipo de proxy utilizado para las pruebas de aplicaciones web comúnmente se ejecuta en la misma computadora que el navegador web del evaluador, aunque esto no es obligatorio. Ese es el tipo de proxy que usaremos en esta ruta de aprendizaje. El proxy también realizará la interceptación TLS, descifrando el tráfico de la red. La característica clave de estos servidores proxy es permitir al usuario visualizar, pausar y modificar manualmente el tráfico de red entre el navegador y el servidor. Por ejemplo, si el evaluador envía un formulario, lo que hace que su navegador envíe una solicitud POST al servidor, el proxy le permitirá ver y modificar la solicitud completa antes de que se envíe al servidor. Los diferentes servidores proxy pueden tener muchas más funciones, como funciones de automatización y secuencias de comandos, catalogación de sitios y herramientas para realizar [pruebas automáticas](https://owasp.org/www-community/Fuzzing) (fuzzing) de aplicaciones web.

Dos servidores proxy web de interceptación populares utilizados para evaluaciones de seguridad son [Burp Suite de Portswigger](https://portswigger.net/burp), y [ZAP](https://softwaresecurityproject.org/) de [SSP](https://www.zaproxy.org/). Burp Suite es un software pago que viene con una Edición Comunitaria con funciones limitadas, mientras que ZAP es de código abierto. Portswigger proporciona la mayoría de los ejercicios de práctica en esta ruta de aprendizaje, por lo que están escritos teniendo en cuenta el uso de Burp Suite. Sin embargo, puede utilizar cualquiera de los dos proxy (o ambos). Recomendamos usar Edición Comunitaria de Burp Suite para la mayoría de los subtemas, pero hay un subtema dedicado al uso de ZAP para pruebas de seguridad automáticas.

#### Configurar la Edición Comunitaria de Burp Suite

Para comenzar con Burp, primero debes [descargarlo](https://portswigger.net/burp/releases/community/latest). Una vez que lo haya descargado e instalado, abra la aplicación. Antes de comenzar a usar Burp, le pedirá que especifique un proyecto y una configuración. Los proyectos le permiten realizar un seguimiento de su progreso probando un sitio entre sesiones, pero no son compatibles con la edición gratuita, así que simplemente seleccione "Proyecto temporal". También puede especificar diferentes conjuntos de configuraciones; por ahora, simplemente seleccione "Usar Burp predeterminado".

![Una captura de pantalla de una de las primeras pantallas de Burp Suite, con "Temporary Project in Memory" seleccionado](/media/uploads/web_security_assessment_burp1.png)

![Una captura de pantalla de la siguiente pantalla de Burp Suite, con la opción "Use Burp defaults" seleccionada](/media/uploads/web_security_assessment_burp2.png)

Esto lo llevará a la ventana principal de Burp. Las pestañas principales que utilizará son las pestañas "Proxy" e "Intruder"(Intruso). Por ahora, cambie a la pestaña Proxy y haga clic en el botón "Abrir navegador". Esto abrirá una instancia de Chromium que está completamente configurada para usar Burp. Este navegador integrado está configurado para utilizar Burp como proxy y se ha cambiado su configuración TLS para permitir que Burp intercepte el tráfico cifrado. Puede utilizar esta instancia del navegador para probar aplicaciones web mientras utiliza su navegador normal para la navegación general.

![Una captura de pantalla de Burp Suite, con proxy e intercepción habilitados](/media/uploads/web_security_assessment_burp3.png)

![Una captura de pantalla de la intercepción de Burp Suite. Un navegador web ha cargado la página web de Internews y la intercepción muestra todas las solicitudes que realiza](/media/uploads/web_security_assessment_burp4.png)

Por ahora, escriba la URL de cualquier sitio web en el navegador integrado de Burp y presione Intro. Notará que no sucede nada en el navegador. Vuelva a Burp y verá la solicitud HTTP que envió el navegador y se ilumina un botón que dice "Intercept is on " (Intercepción está activada) . Lo que sucedió es que Burp recibió la solicitud de su navegador pero no la reenvió al servidor web. En cambio, le permite inspeccionar y modificar la solicitud. Por ahora, haga clic en el botón "intercept is ona" para desactivar la intercepción. Si observa el Chromium integrado de Burp, debería ver la página web cargada. Vuelva a Burp y haga clic en la subpestaña "HTTP History" (Historial HTTP) de la pestaña Proxy. Verá un registro de todas las solicitudes HTTP que ha enviado su navegador. Si hace clic en uno, podrá ver la solicitud completa y también la respuesta del servidor.

![Captura de pantalla del proxy Burp Suite, que recopila el historial HTTP. El sitio web de Internews aparece en primer plano](/media/uploads/web_security_assessment_burp5.png)

Si desea modificar una solicitud que ya se ha enviado, haga clic con el botón derecho en esa solicitud y seleccione "Send to Repeater” (Enviar a Repetidor). Cambie a la pestaña “Repeater”(Repetidor) y verá la solicitud a la izquierda. Una buena práctica es hacer clic inmediatamente en el botón "Send” (Enviar) para obtener una respuesta normal. Luego puede editar la solicitud y enviar la solicitud editada. Puede utilizar los botones “&lt;” y “&gt;” para ver solicitudes y respuestas anteriores. El uso de la pestaña “Repeater” es extremadamente importante al realizar evaluaciones de seguridad, como verá en los subtemas posteriores.

![Una captura de pantalla del proxy Burp Suite, ya que ha recopilado un elemento del historial HTTP y está enviando ese elemento a la función de intrusos](/media/uploads/web_security_assessment_burp6.png)

Una característica importante de la interfaz del Repetidor es la función “URL-encode as you type”(Codificar URL mientras escribe). Esto codificará automáticamente los caracteres a medida que los escriba, ahorrándole muchos errores y mucho tiempo. Dependiendo de lo que esté modificando, querrá activar o desactivar esta función. Para cambiar la configuración, haga clic con el botón derecho en el panel “Request” (Solicitud)” y seleccione el elemento del menú.

![Una captura de pantalla del proxy Burp Suite, ya que ha recopilado un elemento del historial HTTP y está enviando ese elemento a la función de repetidor](/media/uploads/web_security_assessment_burp7.png)

Esto le ayudará a empezar a utilizar Burp Suite. La Edición Comunitaria gratuita es suficiente para esta ruta de aprendizaje, aunque la mayoría de las personas a las que se les paga por realizar evaluaciones de seguridad de sitios web optan por suscribirse a la Edición Profesional. Tanto la versión gratuita como la de pago incluyen una gran cantidad de funciones, que están documentadas en el [sitio web de Portswigger](https://portswigger.net/burp/documentation). Profundizará mucho más en Burp en la mayoría de los siguientes subtemas (aunque puede usar cualquier proxy que desee, si lo prefiere).

### PortSwigger Academy

Para todos los subtemas sobre las clases de vulnerabilidad, la gran mayoría de las lecturas y los ejercicios están alojados en la Academia PortSwigger. PortSwigger Academy es un sitio web gratuito que incluye lecturas y ejercicios de laboratorio que cubren la gran mayoría de los temas comunes de seguridad web. La estructura de esos temas es una serie de páginas web que tienen enlaces a ejercicios de laboratorio dentro de las páginas. Deberá utilizar Burp Suite como se describe anteriormente para resolver estas prácticas de laboratorio. (La mayoría de los laboratorios se pueden resolver con varios servidores proxy de interceptación, pero algunos requieren Burp específicamente).

En los subtemas siguientes, a cada subtema se le asignará una sección de lectura y laboratorios de PortSwigger Academy. Cuando esté completando esas tareas, asegúrese de revisar todas las páginas y completar todos los laboratorios de nivel "apprentice” (aprendiz). También debe intentar todas las prácticas de laboratorio de nivel “practicioner” (profesional), pero trate de no obsesionarse con ninguna de ellas. Si se queda atascado en un laboratorio profesional en particular, simplemente continúe y vuelva a él antes de completar el ejercicio final de validación de habilidades de la ruta de aprendizaje.

![Una captura de pantalla de la academia PortSwigger, que muestra una prueba de concepto XSS](/media/uploads/web_security_assessment_PortSwigger_screenshot1.png)

El tema XSS de PortSwigger Academy. Asegúrese de revisar todos los subtemas. Desde "Qué es XSS" hasta "Pruebas" son todas una página web, pero cada subtema es su propia página.

![Una captura de pantalla de la academia PortSwigger, que muestra XSS reflejado](/media/uploads/web_security_assessment_PortSwigger_screenshot2.png)

El subtema XSS Reflejado de PortSwigger Academy. Tenga en cuenta el laboratorio vinculado hacia la parte inferior de la captura de pantalla.

![Una captura de pantalla de la academia PortSwigger, que muestra tres laboratorios en el subtema XSS reflejado](/media/uploads/web_security_assessment_PortSwigger_screenshot3.png)

Después de completar un tema (por ejemplo, XSS), verifique que haya completado su laboratorio marcando el enlace "Ver todos los laboratorios de _temas_". Esto le permitirá ver los laboratorios que se perdieron.

**¡Inténtelo usted!**

Dirígete a [PortSwigger Academy](https://portswigger.net/web-security) y regístrese para obtener una cuenta.

**‼️** Si se siente atrapado en un laboratorio, hay varios tutoriales [en YouTube](https://www.youtube.com/results?search_query=portswigger+lab+walkthrough) y blogs. Tenga en cuenta que es poco probable que seguir un tutorial sea muy beneficioso para su aprendizaje. Si necesita varios tutoriales para realizar las prácticas de laboratorio, es posible que desee dar un paso atrás, volver a leer el material y luego intentar volver a realizar cuidadosamente algunas de las prácticas de laboratorio que completó anteriormente mediante tutoriales.

### ZAP

ZAP es una alternativa de código abierto a Burp Suite. Si bien no es tan popular entre los profesionales, tiene la clara ventaja de ser gratuito e incluir un escáner de seguridad de aplicaciones web. Aunque la interfaz de usuario es diferente entre ZAP y Burp, existen las mismas características básicas en ambos.

**¡Inténtelo usted!**

[Descargue ZAP](https://www.zaproxy.org/download/), y consulte la sección Instalación, interfaz de usuario de escritorio y Manual de Aplicación de la [guía de introducción a ZAP](https://www.zaproxy.org/getting-started/). Cubriremos ZAP con más profundidad en el subtema de automatización.

### Docker

Docker es un sistema que le permite ejecutar aplicaciones de Linux en entornos semiautónomos, llamados contenedores. Aunque no son tan seguros como una máquina virtual completa, los contenedores son mucho más livianos y flexibles. En Windows y Mac, Docker incluye una Máquina Virtual Linux. A los efectos de esta Ruta de Aprendizaje, utilizaremos Docker para permitirle ejecutar cómodamente sitios web completos en su computadora.

**¡Inténtelo usted!**

[Instale Docker](https://docs.docker.com/desktop/) Desktop. No debería necesitar registrarse para obtener una cuenta ni adquirir una licencia comercial para completar esta Ruta de Aprendizaje. Tenga en cuenta que probablemente haya completado esto como parte de la Ruta de Aprendizaje de los Fundamentos de Seguridad de Aplicaciones Web

### sqlmap

Si bien los humanos pueden ser muy buenos para encontrar vulnerabilidades de inyección SQL, explotar esas vulnerabilidades a menudo implica un trabajo extremadamente repetitivo. sqlmap es una herramienta de inyección SQL que destaca en la explotación. Tiene scripts que descubrirán cómo enumerar la estructura de una base de datos y extraer contenido de esa base de datos mediante inyección SQL. Esto es muy útil tanto para demostrar la gravedad de las vulnerabilidades de inyección SQL como para encontrar otras vulnerabilidades relacionadas con el almacenamiento de datos.

**¡Inténtelo usted!**

Instale sqlmap. Puedes [descargarlo](https://sqlmap.org/) (está basado en Python) o usar algo como el [paquete de Kali](https://www.kali.org/tools/sqlmap/).

### WPScan CLI

Dentro del periodismo independiente y la sociedad civil, muchos medios de comunicación utilizan WordPress para compartir su contenido. WordPress es un software complicado con muchos complementos y opciones de configuración que pueden tener grandes impactos en la seguridad. Como parte del subtema de automatización, usaremos una herramienta de código abierto llamada WPScan para encontrar debilidades de seguridad en un sitio de WordPress.

**¡Inténtelo usted!**

[Instale WPScan CLI](https://github.com/wpscanteam/wpscan). Tenga en cuenta que esto se puede hacer desde el código fuente, desde un administrador de paquetes (como homebrew o rubygems), como un contenedor Docker o utilizando la versión incluida en muchas distribuciones de VM de prueba de penetración, como Kali Linux. Lo que elijas depende de ti. Cubriremos WPScan en el subtema de automatización.

## Práctica

Asegúrese de haber instalado y configurado las siguientes herramientas, que también enumeramos anteriormente:

- Burp Suite (Edición Comunitaria funciona)
- ZAP
- Escritorio de Docker
- sqlmap
- WPScan CLI

## Verificación de Habilidades

- Sin Verificación de Habilidades

## Learning Resources

{{% resource title="PortSwigger Academy" description="Se utilizará una colección de explicadores y laboratorios sobre seguridad de aplicaciones web como recurso a lo largo de esta ruta de aprendizaje" languages="Inglés" cost="Gratis" url="https://portswigger.net/web-security/all-topics" %}}

{{% resource title="¿Qué es un proxy inverso?" description="Una descripción general rápida de qué es un proxy inverso y en qué se diferencia de uno directo" languages="Alemán, español, francés, italiano, japonés, coreano, portugués, chino, taiwanés" cost="Gratis" url="https://www.cloudflare.com/es-la/learning/cdn/glossary/reverse-proxy/" %}}

{{% resource title="Servidor proxy" description="Una introducción al concepto de servidor proxy." languages="54 idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Servidor_proxy" %}}

{{% resource title="Fuzzing" description="Una explicación sencilla del fuzzing de la documentación de OWASP." languages="Inglés" cost="Gratis" url="https://owasp.org/www-community/Fuzzing" %}}

{{% resource title="Squid cache" description="Software proxy que cualquiera puede implementar" languages="Inglés" cost="Gratis" url="https://www.squid-cache.org/" %}}

{{% resource title="Proxys comerciales y redes de distribución de contenidos: Fastly" description="Varias empresas ofrecen servicios de proxy y CDN" languages="Muchos idiomas, depende del producto" cost="Variado" url="https://www.fastly.com/es/" %}}

{{% resource title="Proxys comerciales y redes de distribución de contenidos: Cloudflare" description="Varias empresas ofrecen servicios de proxy y CDN" languages="Muchos idiomas, depende del producto" cost="Variado" url="https://www.cloudflare.com/es-la/" %}}

{{% resource title="Proxys comerciales y redes de distribución de contenidos: Amazon CloudFront" description="Varias empresas ofrecen servicios de proxy y CDN" languages="Muchos idiomas, depende del producto" cost="Variado" url="https://aws.amazon.com/es/cloudfront/" %}}

{{% resource title="Fuzzing" description="Una descripción general de fuzzing, una técnica de prueba de software que se puede utilizar para todo tipo de propósitos, incluidas pruebas de sitios web y aplicaciones web." languages="Inglés" cost="Gratis" url="https://owasp.org/www-community/Fuzzing" %}}

{{% resource title="Burp Suite" description="Una popular herramienta de prueba de seguridad web" languages="Inglés" cost="La versión comunitaria es gratuita, la edición Pro cuesta $449 por usuario" url="https://portswigger.net/burp" %}}

{{% resource title="ZAP" description="Una herramienta de prueba de seguridad muy popular para aplicaciones web" languages="Inglés" cost="Gratis" url="https://www.zaproxy.org/" %}}

{{% resource title="Escritorio de Docker (Docker Desktop)" description="Una herramienta para instalar contenedores que contienen aplicaciones ejecutables; crucial para lanzar y probar rápidamente nuevas herramientas o ejecutar código en un entorno controlado" languages="Inglés" cost="Gratis" url="https://docs.docker.com/desktop/" %}}

{{% resource title="sqlmap" description="Una herramienta de prueba de penetración de código abierto que prueba la inyección de SQL" languages="Inglés" cost="Gratis" url="https://sqlmap.org/" %}}

{{% resource title="WPScan" description="Un escáner de seguridad para WordPress" languages="Inglés" cost="Gratis" url="https://github.com/wpscanteam/wpscan" %}}