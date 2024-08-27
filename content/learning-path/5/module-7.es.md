+++
style = "module"
weight = 7
title = "Descubrimiento Automático de Vulnerabilidades"
description = "En subtemas anteriores, analizamos cómo descubrir vulnerabilidades de forma manual. Aquí, exploramos herramientas que pueden ayudar a automatizar ese proceso."
+++

## Caso de Uso

Esta ruta de aprendizaje se ha centrado en el descubrimiento manual de vulnerabilidades en aplicaciones web. Esta habilidad es vital para comprender las vulnerabilidades y también le brinda las herramientas para encontrarlas en cualquier sitio. Sin embargo, existen numerosas herramientas que pueden ayudar a descubrir y explotar vulnerabilidades en aplicaciones web. Estas herramientas tienen ventajas y desventajas y es mejor utilizarlas junto con pruebas manuales. Este subtema analiza una serie de herramientas disponibles gratuitamente y cómo utilizarlas de forma eficaz.

## Objetivos

Después de completar este subtema, los profesionales sabrán cómo y cuándo utilizar adecuadamente varios escáneres de vulnerabilidades de aplicaciones web, incluidos:

- Escáner ZAP
- sqlmap
- WPScan CLI

---
## Sección Principal

Este subtema explora tres clases de herramientas de automatización de aplicaciones web. Se discutirá lo que hacen, en qué son buenos, en qué no son buenos y cómo aprovecharlos al máximo. Dividiremos el espacio en tres categorías amplias:

- Probadores automáticos de aplicaciones web
- Herramientas de explotación
- Escáneres de vulnerabilidades de aplicaciones web

### Probadores automáticos de aplicaciones web

Esta primera categoría son herramientas que hacen las mismas cosas que hacen los humanos para encontrar nuevas vulnerabilidades en las aplicaciones web. Recorren el sitio, encuentran entradas, envían datos maliciosos a esas entradas e intentan detectar cuándo esos datos han desencadenado una vulnerabilidad. Un ejemplo de este tipo de escáner de aplicaciones web es el ZAP de SSP, pero hay muchos otros, incluido el escáner Burp Pro, HCL AppScan, etc.

Por lo general, estas herramientas funcionan primero “[rastreando](https://es.wikipedia.org/wiki/Ara%C3%B1a_weber)” el sitio web de destino, donde seguirán cada enlace en cada página e intentarán construir un mapa completo del sitio. Luego, encuentra todos los parámetros que se envían al servidor y se reemplazan con varios reemplazos “[fuzz](https://es.wikipedia.org/wiki/Fuzzing)”. Cuando llegue cada respuesta, el escáner buscará características que indiquen un ataque exitoso. Por ejemplo, el motor de exploración podría reemplazar un parámetro con `&lt;script&gt;_var_ xyz_\=_"abc";&lt;/script&gt;`. Cuando llega la respuesta HTTP, el escáner analizará el HTML de las páginas y, si ve ese elemento de secuencia de comandos como un bloque de JavaScript en la página, entonces sabrá que la entrada es vulnerable a XSS.

#### Puntos Fuertes del Escáner

La gente utiliza escáneres de aplicaciones web por una buena razón. Encuentran vulnerabilidades de forma rápida y eficaz. Los evaluadores de seguridad de aplicaciones web experimentados utilizarán escáneres como parte de sus evaluaciones, a pesar de sus años de experiencia. Hay algunas cosas en las que los escáneres de aplicaciones web son muy buenos.

La mayor fortaleza de estas herramientas es encontrar vulnerabilidades relacionadas con la validación de datos. Los escáneres son excelentes para encontrar problemas de validación de datos convencionales como XSS y SQLi, pero también problemas oscuros como inyecciones LDAP, XSLT, etc. Las razones de esto son simples:

- Los escáneres no se cansan ni se aburren, pueden enviar miles de solicitudes y no “perder el foco”
- Los escáneres pueden probar todas las entradas posibles para las que están programados, incluidos encabezados de referencia HTTP, cookies, parámetros adicionales agregados arbitrariamente al final de las URL, etc.
- Los escáneres tienen enormes bibliotecas de pruebas para probar muchas permutaciones de cada ataque potencial.
- Las vulnerabilidades de validación de datos son generalmente bastante fáciles de reconocer, con una simple coincidencia de patrones o un análisis de comportamiento que es fácil de detectar mediante programación.

Algunos escáneres incluso utilizan cadenas de fuzz únicas para cada entrada, de modo que puedan detectar la entrada que se ingresa en un lugar y se muestra en otro. Generalmente, un escáner configurado correctamente debería encontrar más problemas de validación de datos en menos tiempo que un humano altamente capacitado.

Otra área en la que destacan los escáneres es en la búsqueda de problemas de configuración, especialmente aquellos que existen sólo en un pequeño subconjunto del sitio. Si un sitio utiliza tokens CSRF en todas sus formularios, pero los desarrolladores o desarrolladoras lo olvidaron en una sección del sitio, es probable que un evaluador humano pase por alto el error. Sin embargo, es casi seguro que un escáner encontrará e informará del token faltante. Al igual que con la validación de datos, los escáneres tienen enormes baterías de pruebas que ejecutan en cada solicitud y respuesta.

#### Debilidades del Escáner

A pesar de sus puntos fuertes, los escáneres también tienen múltiples puntos débiles. En algunos casos, puede que ni siquiera sea apropiado utilizar un escáner para probar determinados sitios. Estos son algunos de los mayores problemas con los escáneres de aplicaciones web.

##### Completitud del Escaneo

Existen numerosos problemas potenciales con la forma en que funcionan los escáneres que pueden hacer que no realicen una prueba completa en el sitio de manera oportuna.

La primera es que muchos sitios requieren que los usuarios inicien sesión. Los escáneres se pueden configurar con una ID de sesión iniciada, con un script que envía el formulario de inicio de sesión u otras formas de autenticación. También se pueden configurar para detectar cuándo se ha cerrado sesión en el sitio. Sin embargo, esta configuración suele ser propensa a errores. Si el escáner está configurado incorrectamente, es posible que no rastree completamente el sitio o que no detecte cuándo se cerró la sesión y no complete las pruebas correctamente. En casos extremos, los sitios pueden tener funciones contra laautomatización que hacen que el escaneo sea casi imposible.

Otro problema es que los escáneres no siempre distinguen entre páginas que son completamente diferentes y páginas que simplemente parecen diferentes. Por ejemplo, en un foro en línea, es fácil para un humano ver que cada hilo del foro es en realidad la misma página subyacente con datos diferentes. Sin embargo, un escáner automático podría determinar que dos subprocesos son páginas web completamente diferentes y que deben probarse por separado. En sitios grandes, a veces los escáneres pueden quedarse atascados al probar una página que parece ser diferente para el escáner y pasar horas o días realizando pruebas redundantes.

Por otro lado, puede haber páginas o parámetros que el rastreador no detecta por un motivo u otro. Si el escáner no ha detectado un parámetro o ha omitido secciones del sitio, entonces obviamente es probable que omita vulnerabilidades relacionadas con esas páginas o parámetros.

Todos estos problemas se pueden solucionar observando de cerca el comportamiento del escáner y cambiando las configuraciones de escaneo. Si bien es completamente posible apuntar un escáner a un sitio web e iniciar un escaneo, para obtener los mejores resultados, es importante al menos completar las pruebas de descubrimiento y autenticación antes de iniciar un escaneo.

#### Destructividad del Escáner

Uno de los puntos fuertes de un escáner es que funciona muy rápido. Sin embargo, esta fuerza puede causar problemas.

Si al enviar una solicitud se termina realizando alguna acción fuera del sitio, entonces el escáner puede hacer que esa acción suceda miles de veces. Ejemplos de efectos externos podrían incluir el envío de un SMS (que puede costarle dinero al propietario o propietaria del sitio), el envío de un correo electrónico (imagine que alguien abre su bandeja de entrada y encuentra decenas de miles de correos electrónicos), la impresión de un ticket de pedido en un almacén, etc.

En relación con esto, algunos sitios no tienen los recursos suficientes para atender todas las peticiones que genera un un escáner. Dada la frecuencia con la que los medios independientes y los sitios de la sociedad civil son objeto de ataques de denegación de servicio, podría ser importante descubrir esto. Sin embargo, la caída del sitio impedirá realizar más pruebas de vulnerabilidad.

Ambos problemas se pueden mitigar parcialmente mediante conversaciones con el propietario o propietaria del sitio y prestando atención durante las pruebas de Descubrimiento y configurando el escáner correctamente. Por ejemplo, todos los escáneres principales tienen formas de excluir ciertas páginas de los escaneos y de controlar la velocidad a la que escanean. Sin embargo, nunca se puede eliminar el riesgo de que un escáner afecte el sitio o sus sistemas relacionados.

#### Vulnerabilidades que los Escáneres no Descubren Bien

Si bien los escáneres son excelentes para descubrir algunos tipos de vulnerabilidades, hay otros tipos que les resulta casi imposible descubrir.

Las principales son las verdaderas vulnerabilidades de la lógica empresarial. Los escáneres simplemente ejecutan scripts y no "entienden" cómo deben funcionar los sitios. Ningún escáner comprenderá la importancia de un error de redondeo en las transferencias de dinero o la importancia de omitir un campo supuestamente obligatorio en un formulario.

En relación con esto, las herramientas automatizadas no suelen hacer un buen trabajo a la hora de detectar vulnerabilidades de autorización. Si bien existe una variedad de herramientas para ayudar con las pruebas de autorización, generalmente los escáneres no detectan automáticamente este tipo de vulnerabilidades.

#### Falsos Positivos y resultados poco significativos

Los escáneres también pueden producir muchos resultados que no son útiles. En algunos casos, el script para detectar una vulnerabilidad puede ser imperfecto, lo que hace que el escáner informe de un problema que no existe. En otros casos, el escáner puede informar cosas que el autor de la herramienta puede considerar interesantes o valiosas, pero que no son significativas en el contexto del sitio que está probando.

En todos los casos, debe reproducir manualmente y comprender completamente los resultados del escáner antes de agregarlos a su informe.

#### Uso Eficaz de los Escáneres

Generalmente, los y las profesionales de la evaluación de la seguridad de las aplicaciones web descubren que son más eficaces utilizando un escáner que no hacerlo. Dado que sus puntos fuertes son tan convincentes, vale la pena dedicar tiempo a configurar y monitorear los escaneos.

En todos los casos, debe completar el Descubrimiento y la Autenticación antes de utilizar un escáner. Como este campo es nuevo para usted, debe practicar el uso de un escáner en diferentes sitios web y leer y comprender las opciones de configuración y los indicadores de progreso de su escáner. Intente comprender cómo funciona el sitio antes de utilizar un escáner.

Hay profesionales que escanean las páginas individualmente, omitiendo la etapa de "araña" del escaneo. Esto tiene la ventaja de mitigar muchos de los problemas del escaneo, pero también pierde la capacidad del rastreador para encontrar contenido que usted podría haber pasado por alto. También requiere más mano de obra. Sin embargo, puede ser muy eficaz en sitios que son difíciles de rastrear para el escáner y en sitios que son más frágiles.

Otra opción es escanear todo el sitio a la vez. En general, es bueno utilizar un usuario de aplicación web independiente para este análisis, de modo que los datos basura del análisis no interfieran con sus pruebas habituales. También asegúrese de que la cuenta que utiliza tenga acceso completo al sitio. Mientras se ejecuta el análisis, debe intentar lograr un equilibrio entre monitorear el análisis lo suficientemente de cerca como para detectar problemas, pero también dedicar la mayor parte de su tiempo a realizar pruebas manuales.

En cualquier caso, no debe confiar completamente en el escáner para las pruebas de validación de datos o cualquier otra clase de vulnerabilidad. Al menos debería hacer algunas pruebas en cada entrada del sitio y algunas pruebas exhaustivas en otras. El escáner puede tener problemas sutiles al probar el sitio que no son obvios.

### Práctica: Usando ZAP

ZAP (Zed Attack Proxy de SSP) es una alternativa de código abierto a Burp. Aunque la mayoría de los profesionales prefieren Burp Professional, ZAP es un proxy bastante capaz e incluye un escáner de aplicaciones web. En este punto ya deberías estar familiarizado con Burp Suite; los conceptos son los mismos para ZAP, aunque la interfaz de usuario es bastante diferente.

Para esta práctica, usaremos el módulo de escáner de ZAP. Para tener una idea, primero asegúrese de tener una instancia de DIWA ejecutándose, luego simplemente abra ZAP y haga clic en "Escaneo Automatizado", ingrese la URL de su página de inicio de DIWA y haga clic en "Atacar".

![Una captura de pantalla de ZAP cuando se abre](/media/uploads/web_security_assessment_ZAP1.png)

![Captura de pantalla de ZAP cuando el usuario selecciona un escaneo automático. La URL del ataque es 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP2.png)

Dado que DIWA es una aplicación pequeña, este escaneo debería completarse bastante rápido. Si nada salió terriblemente mal, notarás que el escáner de ZAP encontró algunos problemas. Sin embargo, a menos que ZAP haya cambiado significativamente, los resultados de ZAP pueden ser algo decepcionantes. Puede haber algunos problemas pequeños que ZAP encontró y usted no, pero ZAP debería haber pasado por alto la mayoría de los problemas importantes que encontró.

Veamos si podemos mejorar esto. Haga clic en el botón "Inicio Rápido" en la barra de herramientas secundaria y luego en "<" en el panel siguiente. Desde allí, haga clic en "Exploración Manual", ingrese la URL de su DIWA y luego haga clic en "Iniciar Navegador".

![Una captura de pantalla de ZAP y el cuadro de "alerts" que el servicio muestra en la parte inferior](/media/uploads/web_security_assessment_ZAP3.png)

![Una captura de pantalla de ZAP mientras explora manualmente la página en busca de bibliotecas JS vulnerables](/media/uploads/web_security_assessment_ZAP4.png)

Haga clic un poco en el sitio y asegúrese de que cuando haya terminado haya iniciado sesión en el sitio como usuario administrativo. Ahora, regrese a ZAP e inicie un escaneo haciendo clic derecho en el sitio DIWA en la barra izquierda e iniciando un escaneo activo con la configuración predeterminada.

![Una captura de pantalla de ZAP cuando el usuario hace clic derecho en un sitio y selecciona "attack" y "active scan"](/media/uploads/web_security_assessment_ZAP5.png)

![Una captura de pantalla de ZAP mientras el usuario se prepara para ejecutar un escaneo activo en 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP6.png)

Esta exploración debería tardar mucho más y dar resultados significativamente diferentes y mejores. ¿Por qué pasó esto? Iniciar el escaneo desde un sitio que haya visitado en la sección "Sitios" le brinda al escáner mucha más información que la que obtiene el escaneo totalmente automatizado. De hecho, los resultados que obtenga del escáner pueden diferir mucho según cómo explore manualmente el sitio antes de ejecutar el escaneo.

Pruebe manualmente usando el sitio y ejecutando escaneos un poco, y luego compare los resultados de ZAP con los que obtuvo de las pruebas manuales.

- ¿Qué problemas encontró ZAP y usted no?
- ¿Qué problemas encontró usted que ZAP no encontró?

Piensa en esto. Como parte de la validación de habilidades, volveremos a estas listas.

### Herramientas de Explotación

La siguiente clase de automatización que cubriremos en el subtema son las herramientas que ayudan en la explotación después de haber encontrado una vulnerabilidad. Si bien existen varias herramientas para esto, la que se usa más comúnmente en las evaluaciones de seguridad de aplicaciones web es [sqlmap](https://sqlmap.org/). sqlmap es capaz de detectar la inyección SQL de sitios web, pero realmente brilla en su explotación. Algunas técnicas de extracción de datos de inyección SQL ciega pueden tardar varios segundos en extraer un solo bit de información de una base de datos. sqlmap puede automatizar y optimizar la mayoría de las formas de explotación de SQLi, ahorrándole mucho tiempo.

El uso independiente típico de sqlmap es guardar la solicitud que utilizó para identificar la inyección SQL en un archivo de texto y luego [ejecutar sqlmap con ese archivo de texto](https://github.com/sqlmapproject/sqlmap/wiki/Usage#load-http-request-from-a-file) usando la opción -r. Luego especificaría el parámetro a probar con la opción -p y luego elegiría qué datos desea extraer. Generalmente, es mejor comenzar con la opción -b para simplemente recuperar la información de la base de datos. sqlmap intentará confirmar que el parámetro especificado es vulnerable a SQLi y luego elegirá una técnica de extracción de datos que le permita extraer datos de la manera más eficiente posible. Puede ser que la extracción de datos sea bastante lenta, en cuyo caso debes tener cuidado con la cantidad de datos que intentas extraer.

Vale la pena señalar que si encuentra varias vulnerabilidades SQLi en un sitio, es posible que permitan velocidades de extracción de datos muy diferentes. Cualquier vulnerabilidad de SQLi que dé como resultado que se incluyan datos de la base de datos en la respuesta HTTP será mucho más rápida que una que solo resulte en un éxito o un fracaso (como en una página de inicio de sesión).

Una alternativa al uso de sqlmap independiente es utilizar una integración de proxy para ejecutar sqlmap directamente desde su proxy, como con la [extensión SQLiPy para Burp](https://portswigger.net/support/using-burp-with-sqlmap). Esto generalmente acelera la configuración de sqlmap y le ahorra algunos viajes de ida y vuelta a la documentación de sqlmap.

#### Usando sqlmap

Desde el subtema de configuración, debería tener instalado sqlmap y también una copia de DIWA. Ya debería haber identificado una o más vulnerabilidades SQLi en DIWA. Usando sqlmap, aproveche una de esas vulnerabilidades para extraer la estructura de la base de datos DIWA y luego extraiga la base de datos de usuarios de DIWA.

Tenga en cuenta que sqlmap tiene capacidades y opciones de configuración más allá de lo que se analiza aquí. Asegúrese de consultar [la documentación](https://github.com/sqlmapproject/sqlmap/wiki/) para conocer las opciones de uso.

### Escáneres de vulnerabilidades específicos de aplicaciones web

Para los fines de este subtema, utilizamos las palabras "escáner de vulnerabilidades" para referirnos a una herramienta que descubre vulnerabilidades previamente conocidas en lugar de una herramienta que descubre automáticamente nuevas vulnerabilidades. Ejemplos de los primeros incluyen herramientas como Nessus y OpenVAS, mientras que los segundos incluyen el escáner integrado en Burp Pro y ZAP.

Mientras Nessus y OpenVAS intentan detectar una amplia gama de vulnerabilidades, otros se especializan. Por ejemplo, Nikto es una herramienta que intenta encontrar específicamente errores de configuración de servidores web. Si bien Nikto no se ha actualizado en años y, en general, ha sido reemplazado por escáneres de vulnerabilidades de uso general, hay un escáner de vulnerabilidades de aplicaciones web específico que se destaca. Se llama WP Scan y se centra en encontrar vulnerabilidades en sitios de WordPress. Dado que WorsPress goza de gran popularidad entre la sociedad civil y los sitios web de periodismo independiente, es útil cubrirlo en esta ruta de aprendizaje.

WPScan comenzó como un software de código abierto y la [versión de línea de comandos](https://github.com/wpscanteam/wpscan) todavía lo es, aunque existen [opciones comerciales](https://wpscan.com/pricing/) para quienes desean otras funciones. WPScan funciona esencialmente de la misma manera que otros escáneres de vulnerabilidades. Simplificado, envía solicitudes a un servidor e intenta determinar qué versiones de software están instaladas en ese servidor. Luego compara esas versiones con una base de datos de vulnerabilidades.

🛠️ Descargue [DVWP](https://github.com/vavkamil/dvwp) (querrá usar Docker para implementarlo). Si tiene una Mac Apple Silicon, es posible que tenga que agregar “platform: linux/amd64” a cada servicio en el archivo docker-compose.yml.

Luego use la línea de comandos de WPScan para encontrar vulnerabilidades en el sitio. Si instaló WPScan a través de Docker en Mac o Windows, no podrá usar 127.0.0.1:31337 para hacer referencia a DVWP para WPScan. Esto se debe a que Docker se ejecuta en una máquina virtual y el 127.0.0.1 de la VM es la máquina virtual, no su computadora. En su lugar, busque la dirección IP LAN de su computadora (por ejemplo, 196.168.0.xxx, 10.xxx.xxx.xxx, etc.) y úsela.

Aunque no es obligatorio, probablemente desee registrarse para obtener una [clave API en el sitio web de WPScan](https://wpscan.com/register/) y utilizarla al escanear. Si no especifica una clave API, WPScan identificará las versiones de WordPress y sus complementos y le informará cuáles están desactualizadas. Si utiliza la clave API, le indicará qué vulnerabilidades existen en el sitio.

## Verificación de Habilidades

Discuta su uso del escáner de ZAP y sqlmap en DIWA con su mentor o mentora. ¿Por qué encontraste cosas que ZAP no encontró y viceversa? Explíquele cómo planea utilizar la automatización para ayudarle a probar sitios web en el futuro.

## Learning Resources

{{% resource title="Rastreador Web" description="Una descripción general de qué es un rastreador web y qué hace" languages="47 idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Ara%C3%B1a_web" %}}

{{% resource title="Uso" description="Una guía sobre cómo usar sqlmap" languages="Inglés" cost="Gratis" url="https://github.com/sqlmapproject/sqlmap/wiki/Usage" %}}

{{% resource title="Usando Burp con sqlmap" description="Instrucciones sobre cómo integrar sqlmap con Burp para fines de pruebas de seguridad de aplicaciones web" languages="Inglés" cost="Gratis" url="https://portswigger.net/support/using-burp-with-sqlmap" %}}

{{% resource title="WPScan" description="Una herramienta automatizada para escanear sitios de WordPress en busca de fallas de seguridad" languages="Inglés" cost="Gratis" url="https://github.com/wpscanteam/wpscan" %}}

{{% resource title="Damn Vulnerable WordPress" description="Una instalación especial de WordPress que incluye intencionadamente muchas vulnerabilidades de seguridad; para ser utilizado para pruebas" languages="Inglés" cost="Gratis" url="https://github.com/vavkamil/dvwp" %}}