+++
style = "module"
weight = 1
title = "Vulnerabilidades de la Infraestructura"
+++

## Caso de Uso

Si bien esta Ruta de Aprendizaje se centra en la seguridad de las aplicaciones web, las aplicaciones web se ejecutan sobre numerosas piezas de infraestructura de software. Cualquier vulnerabilidad en la infraestructura subyacente de la aplicación pondrá en peligro la aplicación. Por lo tanto, comprender cierta seguridad de la infraestructura es parte de comprender la seguridad de las aplicaciones.

Al inspeccionar una aplicación web, ya sea con fines de evaluación de vulnerabilidades, monitoreo de seguridad o para investigar un compromiso, el profesional debe comprender la tecnología subyacente que proporciona el entorno necesario para que la aplicación se ejecute mientras busca vulnerabilidades en esa pila.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de hacer lo siguiente:

- Comprender los tipos comunes de vulnerabilidades del software de infraestructura
- Comprender los impactos potenciales de esos tipos de vulnerabilidades.
- Comprender los aspectos esenciales de las estructuras de vulnerabilidad

---
## Sección Principal
### Conocimiento Fundamental

Los sitios web no existen sin algún software y hardware subyacente que se encargue de las operaciones de bajo nivel de manejo de solicitudes que sirven el contenido web. Esto incluye el hardware y el firmware subyacentes, el sistema operativo, el software del servidor web, los marcos de las aplicaciones web e incluso el software no relacionado que se ejecuta en la máquina. La seguridad de una aplicación web depende de la seguridad de esta infraestructura, incluso si los desarrolladores del sitio web pueden tener poca visibilidad o control sobre esta infraestructura. Las vulnerabilidades de infraestructura generalmente afectan a una gran cantidad de sitios web (posiblemente cientos de millones) y, a menudo, se les asignan identificadores como CVE (para obtener una introducción más general a lo que son los CVE, consulte este [artículo](https://www.redhat.com/es/topics/security/what-is-cve)). Estas vulnerabilidades podrían pertenecer a casi cualquier clase técnica, pero desde el punto de vista de un operador de sitio web, sólo nos preocupamos por su impacto, no por los detalles técnicos subyacentes. Esto se debe a que no mantenemos el software de infraestructura, simplemente lo implementamos y configuramos.

El impacto de una vulnerabilidad en el software de infraestructura puede ser casi cualquier cosa, pero algunos problemas e impactos que probablemente surjan incluyen los siguientes tipos.

### Denial of service (DoS)

Negación de servicio (DoS)

Una vulnerabilidad puede permitir que un atacante bloquee un servidor web o haga que no responda debido al consumo excesivo de recursos. Estas vulnerabilidades generalmente se explotan para desconectar un sitio web o para extorsionar a los operadores de sitios web como parte de una funda de protección. Tenga en cuenta que un atacante decidido y financiado con frecuencia puede alquilar tiempo en una botnet de computadoras comprometidas para simplemente abrumar un sitio web con una gran cantidad de solicitudes; no se requiere vulnerabilidad. Algunos ejemplos de vulnerabilidades DoS incluyen:

- [CVE-2011-3192](https://nvd.nist.gov/vuln/detail/CVE-2011-3192): Una vulnerabilidad en Apache donde el cliente puede solicitar múltiples subsecciones de una página web, lo que genera un gran uso de memoria en el servidor.
- [MS ADV190005](https://msrc.microsoft.com/update-guide/vulnerability/ADV190005): Una vulnerabilidad en Microsoft IIS permite a un atacante enviar una gran cantidad de variables de configuración en una solicitud HTTP/2, provocando un consumo de CPU del 100% en el servidor.

## Fugas de información

Ocasionalmente, se puede obligar a un servidor web a devolver datos excesivos en una respuesta. Normalmente, esto se debe a que el servidor asigna una gran cantidad de memoria, luego escribe datos solo parcialmente en esa parte y envía la parte completa al cliente. Esta memoria no inicializada podría contener datos de otras solicitudes o respuestas, o incluso de la memoria interna del servidor web. La más famosa de estas vulnerabilidades es probablemente [Heartbleed (CVE-2014-0160)](https://en.wikipedia.org/wiki/Heartbleed). Estas vulnerabilidades se pueden utilizar para robar tokens de sesión (que permiten a los atacantes hacerse pasar por otros usuarios), identidades de máquinas en entornos de nube (que permiten a los atacantes acceder a otros servicios en la nube como el servidor web), claves SSL privadas (que permiten a los atacantes hacerse pasar por el servidor web y ejecutar ataques de intermediarios) y cualquier otro dato que resida en la memoria del proceso del servidor web.

## Ejecución remota de código

Este es el tipo más arquetípico de vulnerabilidad de infraestructura. Ocurre con mayor frecuencia cuando la solicitud de un atacante puede sobrescribir las estructuras de control de flujo de datos en la memoria del servidor, lo que hace que el objetivo ejecute código de máquina especificado por el atacante. Afortunadamente, años de pruebas y correcciones posteriores y mejoras en las prácticas de codificación segura han hecho que estas vulnerabilidades se clasifiquen en las configuraciones predeterminadas de software de infraestructura de servidor extremadamente obsoleto como Apache e IIS. Sin embargo, son mucho más comunes en configuraciones no predeterminadas de software común y en software menos obsoleto. Aquí hay dos ejemplos de 2023 ([ejemplo 1](https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices/), [ejemplo 2](https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html)). Tenga en cuenta que, si bien los desbordamientos del búfer pueden ser la forma clásica de lograr la ejecución remota de código, también existen otras formas de hacerlo. Como ocurre con todas las vulnerabilidades de infraestructura, en su mayor parte lo que más nos preocupa es cuál es el impacto y si hay una solución disponible, y menos los detalles técnicos.

## Mitigar las vulnerabilidades del software de infraestructura

El software de infraestructura con vulnerabilidades generalmente se descubre mediante software de escaneo de vulnerabilidades (hay muchos ejemplos de dicho software, [consulte esta lista](https://owasp.org/www-community/Vulnerability_Scanning_Tools)), notificaciones de proveedores o sistemas de gestión de configuración, o mediante inspección manual del software implementado en un servidor. Dependiendo del entorno del servidor, este software puede ser administrado completamente por un tercero, actualizado automáticamente mediante agentes de software o procesos de implementación, o administrado manualmente. Normalmente, si se parchea una vulnerabilidad, los atacantes pueden realizar ingeniería inversa al parche para descubrir el mecanismo de la vulnerabilidad subyacente, por lo que es importante mantener actualizado el software de la infraestructura.

## Learning Resources

{{% resource title="El concepto de CVE" description="Una buena introducción a qué son las CVE (vulnerabilidades y exposiciones comunes) y por qué son importantes" languages="Inglés" cost="Gratis" url="https://www.redhat.com/es/topics/security/what-is-cve" %}}

{{% resource title="CVE con una puntuación de vulnerabilidad de 9.8, recurso 1" description="A continuación se muestran dos ejemplos de CVE que tenían puntuaciones de vulnerabilidad muy altas, lo que significa que los atacantes que las explotaran podrían causar mucho daño" languages="Inglés" cost="Gratis" url="https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices" %}}

{{% resource title="CVE con una puntuación de vulnerabilidad de 9.8, recurso 2" description="A continuación se muestran dos ejemplos de CVE que tenían puntuaciones de vulnerabilidad muy altas, lo que significa que los atacantes que las explotaran podrían causar mucho daño" languages="Inglés" cost="Gratis" url="https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html" %}}

{{% resource title="OpenCVE" description="Un sitio web (y una herramienta independiente) que le permite suscribirse a CVE que afectan a diferentes proveedores. Tenga en cuenta que no todas las vulnerabilidades reciben CVE." languages="Inglés" cost="Gratis" url="https://www.opencve.io/welcome" %}}

{{% resource title="Escaneo de vulnerabilidades SAFETAG" description="Una guía para el escaneo de vulnerabilidades que utiliza la metodología SAFETAG y contiene muchas actividades discretas." languages="Inglés" cost="Gratis" url="https://safetag.org/methods/vulnerability_scanning" %}}

{{% resource title="Herramientas de Escaneo de Vulnerabilidades" description="Una lista de herramientas automatizadas que los protectores digitales pueden utilizar para buscar vulnerabilidades dentro de las aplicaciones web. Diferentes herramientas funcionan para diferentes casos de uso y tienen diferentes modelos de precios, siendo muchas de ellas fuente abierta." languages="Inglés" cost="Gratis" url="https://owasp.org/www-community/Vulnerability_Scanning_Tools" %}}

## Verificación de Habilidades

Busque 2 CVE que figuran en [https://www.cve.org/](https://www.cve.org/) u otra base de datos CVE. Elija aquellos que se describan con cierta profundidad (las bases de datos CVE generalmente enlazan con artículos externos que contienen dichos detalles) y que tengan una clasificación de vulnerabilidad. Dado que los CVE a menudo pueden ser muy técnicos, seleccione aquellos que aborden un tema o tecnología con el que se sienta cómodo. Responde las siguientes preguntas:  

- A grandes rasgos ¿de qué se trata el CVE? ¿Cuál es la falla o vulnerabilidad que podría aprovechar el atacante?
- ¿Conoce alguna persona u organización cuyos sistemas un adversario podría explotar utilizando este CVE? ¿Qué pasa si este CVE se combina con otras vulnerabilidades?
- ¿Por qué cree que el CVE tiene la puntuación que tiene?

Después de haber buscado dos CVE que le parecieron interesantes, realice una búsqueda en una base de datos de CVE de un producto tecnológico que usted o las personas a las que brinda soporte estén ejecutando, vea qué CVE recientes tenía y una vez más responda las preguntas enumeradas anteriormente.

Si usted mismo aloja un servidor web, busque vulnerabilidades recientes. Si está ejecutando algo como Drupal o Wordpress a través de un proveedor externo, verifique también las vulnerabilidades en esos servicios y, a través del panel de control de su proveedor (cada proveedor tendrá uno ligeramente diferente), asegúrese de estar ejecutando las últimas versiones de esas herramientas.

Si es posible, discuta sus respuestas a esas preguntas con un compañero o mentor que lo ayudará a verificar que haya entendido correctamente el tema.
