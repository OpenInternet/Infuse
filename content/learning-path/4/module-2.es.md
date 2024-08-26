+++
style = "module"
weight = 2
title = "Subtema 2: Validación de Datos"
description = "Observamos una clase muy común de vulnerabilidades, en la que un sitio web analiza datos creados con fines malintencionados enviados por un usuario."
+++

## Caso de Uso

Una clase común de vulnerabilidades de aplicaciones web se relaciona con la forma en que la aplicación procesa los datos proporcionados por los usuarios del sitio. Los atacantes suelen utilizar esta clase de vulnerabilidades para apoderarse por completo de los sitios web de destino y, a menudo, pueden descubrirse mediante técnicas automatizadas. Comprender los mecanismos de las vulnerabilidades de validación de datos también es extremadamente útil para desmitificar temas de seguridad complejos.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de hacer lo siguiente:

- Comprender los tipos comunes de vulnerabilidades de validación de datos
- Comprender los impactos potenciales de esos tipos de vulnerabilidades.
- Comprender los mecanismos mediante los cuales funcionan esas vulnerabilidades.
- Comprender, a grandes rasgos, cómo se pueden prevenir esas vulnerabilidades.

---
## Sección Principal

Nuestra primera clase de vulnerabilidades específicas de aplicaciones web abarca aquellas relacionadas con la validación de datos. Existen muchos tipos diferentes de vulnerabilidades de validación de datos y pueden ocurrir en cualquier sistema que procese entradas. Generalmente, estas vulnerabilidades ocurren cuando la aplicación hace suposiciones implícitas sobre la longitud y/o el contenido de los datos que envía. Cuando se recibe y/o procesa la entrada, los datos "escapan" de su contexto previsto y se convierten en código en su nuevo contexto. Hablaremos sobre cómo funciona esto, sus consecuencias y cómo solucionar la vulnerabilidad para cada tipo específico. Asegúrese de leer en orden, ya que las secciones se basan en las anteriores.

## Secuencias de comandos entre sitios (XSS)

El nombre “secuencias de comandos entre sitios” es un artefacto de cómo funcionaban los primeros exploits XSS. Un mejor nombre podría ser "inyección de JavaScript", pero el nombre antiguo se mantiene por razones históricas. XSS ocurre cuando un navegador interpreta la entrada del usuario como JavaScript. Esto permite a un atacante controlar, hasta cierto punto, el navegador web de la persona objetivo en el contexto del sitio web objetivo. El atacante puede robar las cookies de la persona objetivo, lo que le permite hacerse pasar por ella en el sitio. Más que eso, sin embargo, el atacante puede extraer automáticamente cualquier dato de la persona objetivo del sitio web objetivo y puede realizar acciones similares en el sitio objetivo como el usuario. Finalmente, el atacante puede cambiar la apariencia del sitio web para la persona objetivo, por ejemplo, mostrando una página de reautenticación falsa que envía las credenciales del usuario al atacante o solicitándole que descargue malware que supuestamente proviene de un sitio confiable.

Si bien este ataque es poderoso, existen límites. El atacante se limita a controlar el contenido del sitio web objetivo dentro del contexto del navegador del usuario. El atacante no puede interactuar con otros sitios web y sus acciones están limitadas por las funciones de seguridad del navegador.

Mecánicamente, este ataque funciona mediante una aplicación web que recibe datos del usuario y luego los integra directamente en una página web. Considere un sitio de foro de discusión que permita a los usuarios elegir un nombre para mostrar:

![Un cuadro de texto vacío en un sitio web donde el usuario puede ingresar texto, con un botón en el que se puede hacer clic denominado "Submit" debajo](/media/uploads/web_fundamentals_empty_box.png)

Esta página web bastante poco elegante tiene el siguiente código HTML:

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Cuando recibe un nombre del usuario, lo muestra en el formulario:

![El mismo cuadro de texto, pero ahora contiene el texto "Alice"](/media/uploads/web_fundamentals_Alice_box.png)

utilizando el siguiente HTML:

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Hasta ahora, todo bien. Ahora, qué sucede si el usuario ingresa alguna entrada más complicada, como:

{{< highlight html >}}
Alice"><script>alert("Owned by Alice")</script><i q="
{{< / highlight >}}

Cuando se genera la página web, se ve un poco diferente:

![Una alerta en una página web que dice "owned by Alice"](/media/uploads/web_fundamentals_owned_by_Alice_alert.png)

¿Cómo pasó esto?

{{< highlight html >}}
Alice"><script>alert("Owned by Alice")</script><i q="
{{< / highlight >}}

La aplicación simplemente toma la entrada del usuario y la coloca palabra por palabra en el HTML que genera; desde el punto de vista de la aplicación web y del navegador web, todo es simplemente texto indiferenciado.

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice"><script>alert("Owned by
    Alice")</script><i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Tenga en cuenta el `">` después de `value="Alice"`. Eso le dice al navegador que el atributo de valor de entrada HTML está completo y luego que la etiqueta de entrada está completa. A continuación, el texto es una etiqueta de secuencia de comandos que ejecuta JavaScript y muestra un cuadro de alerta. Finalmente, el `<i q="` es solo una limpieza que evita que la página web muestre los restos de la etiqueta de entrada original. Podemos usar diferentes colores de resaltado y formato para mostrar cómo el navegador interpreta la página web generada:

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice"><script>alert("Owned by
    Alice")</script>
  <i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Tal como están las cosas, esta demostración de XSS no hace nada malicioso y la única persona afectada es la propia Alice. Sin embargo, si nuestra atacante Alice puede hacer que otra persona vea su nombre para mostrar y su JavaScript hace algo malicioso, entonces tiene un ataque real que realizar.

### ¡Inténtalo tú mismo

Inicia sesión en tu DVWA y asegúrate de que el nivel de seguridad esté configurado en bajo (consulte la sección "Configuración" en la introducción de esta Ruta de Aprendizaje para obtener más información al respecto). Navega a la sección "XSS (Reflejado)". El mensaje de entrada "¿Cómo te llamas?" es vulnerable a XSS. Intente ingresar un nombre que haga que aparezca un cuadro de alerta de JavaScript cuando haga clic en el botón "Enviar".

![Una captura de pantalla de DVWA, con la página "Vulnerabilidad: Secuencias de comandos entre sitios reflejadas (XSS)" actualmente cargada](/media/uploads/web_fundamentals_reflected_XSS_screenshot.png)

### Prevención XSS

Para evitar XSS, la mejor técnica a utilizar se llama codificación de salida. Tenga en cuenta que en el ejemplo anterior, el ataque se habilitó mediante el uso de los caracteres `"` y `>`. En el contexto de una página web, esos caracteres controlan la estructura de la página. En HTML, todos estos caracteres se pueden codificar, de modo que el navegador web sepa que debe mostrar comillas dobles o corchetes angulares, en lugar de modificar la estructura de la página. En este caso, si los datos de Alice se codificaran antes de integrarse en la página web, se generaría el siguiente HTML

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice&quot;&gt;&lt;script&gt;alert(&quot;Owned by Alice&quot;)&lt;/script&gt;&lt;i q=&quot;"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

que se mostraría así

![A text box that says Alice"><script>alert("Ov](/media/uploads/web_fundamentals_Alice_script_box.png)

La codificación de salida depende del contexto en el que se utilizarán los datos. Para HTML, codificaría entidades HTML en los datos. Para los datos que se iban a incluir en un bloque de JavaScript, se utilizaría una codificación diferente. Si los datos del usuario fueran a usarse en una consulta de base de datos, se usaría otro tipo de codificación. Las estructuras web y las bibliotecas deben tener funciones para realizar la codificación de salida por usted; es mejor utilizar esas funciones (con suerte) obsoletas que intentar escribirlas usted mismo desde los primeros principios.

Para obtener más información sobre XSS, consulte la [guía OWASP sobre XSS](https://owasp.org/www-community/attacks/xss/). Para una exploración en profundidad, consulte la [Ruta de Aprendizaje sobre Evaluación de Seguridad de Aplicaciones Web](/es/learning-path/5).

## Inyección SQL (SQLi)

Mientras que XSS permite que los datos del usuario escapen de su contexto y se interpreten como HTML y JavaScript en el navegador web de la víctima, la inyección SQL permite que los datos del usuario escapen de su contexto y se interpreten como SQL en la base de datos de la aplicación web. La mayoría de las aplicaciones web utilizan una base de datos back-end para almacenar y recuperar datos. Normalmente, utilizarán SQL para realizar este acceso a los datos. La inyección SQL puede ocurrir cuando los datos del usuario se interpolan en una consulta.

Dado que el SQL controlado por el atacante se ejecuta en el entorno del servidor, las vulnerabilidades de inyección de SQL son generalmente mucho más peligrosas que XSS. Si bien una vulnerabilidad XSS permite a un atacante apuntar a otros usuarios, tal vez mediante algún tipo de ingeniería social, la inyección SQL puede brindarle al atacante acceso de lectura y escritura a todos los datos del usuario en el sitio web. El atacante también puede leer y escribir cualquier otro dato almacenado en la base de datos que la aplicación web pueda evaluar. Con frecuencia, el atacante puede utilizar el acceso SQL para obtener la capacidad de ejecutar comandos en el servidor de la base de datos, obteniendo acceso remoto completo a la infraestructura back-end del sitio web.

¿Cómo funciona la inyección SQL? Considere una aplicación web, donde hay una plataforma de venta de entradas que enumera el nombre, la descripción y la versión de cada herramienta en una categoría. El usuario también enviaría un parámetro de identificación; esto podría incluso estar contenido en la URL de la página que realiza la solicitud. Quizás el código que genera el SQL que recupera estos datos se vea así:

{{< highlight sql >}}
$sql = 'select productid, name, description, version from products where categoryid='+request_params['id']
{{< / highlight >}}

Cuando un usuario envía un parámetro de id como 1 o 32, todo está bien, obtenemos una consulta como:

{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where categoryid=32
{{< / highlight >}}

Sin embargo, el problema comienza cuando un usuario curioso envía una id de 2-1, y observa que obtiene los mismos resultados que con una id de 1:

{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where categoryid=2-1
{{< / highlight >}}

Esto le muestra al atacante que la aplicación es vulnerable a la inyección SQL. Está interpretando su entrada como código (ejecutando la expresión 2-1) en lugar de datos (buscando una categoría cuya ID sea literalmente “2-1”). Después de investigar un poco, envían una id de -1 union all select 1, username, password, 1.0 from admin_users. Esto da como resultado una consulta SQL de

{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where toolid=-1
union all
 select 1, username, password, 1.0
   from admin_users
{{< / highlight >}}

Lo que hace esta consulta es buscar todas las herramientas que tienen una id de categoría de -1 (que probablemente no sea ninguna de ellas) y luego agregar a esa lista los nombres de usuario y contraseñas de los usuarios administradores de la plataforma de venta de entradas. Luego, la aplicación lo formatea como una tabla HTML agradable y legible y la envía de vuelta al usuario que solicita los datos. Esto no sólo permitirá al atacante simplemente iniciar sesión en el sistema de tickets, sino que si alguno de esos usuarios reutiliza sus contraseñas, entonces el atacante podrá acceder a otros sistemas de la misma organización.

## ¡Inténtalo tú mismo

Inicia sesión en tu DVWA y asegúrate de que el nivel de seguridad esté bajo. Navega a la página "Inyección SQL" y experimenta con la entrada. ¿Puedes hacer que la página devuelva la lista de todas las cuentas de usuario? ¿Puedes utilizar la técnica de “unir todo” para recuperar datos de otras tablas, como la tabla llamada “information_schema.tables”?

## Prevención SQLi

A diferencia de XSS, la codificación de salida no es una forma confiable de evitar la inyección de SQL. Tenga en cuenta que en los ejemplos anteriores, el atacante utiliza caracteres como espacios y - para cambiar el contexto de sus datos del de los datos de la consulta SQL al de la estructura de la consulta misma. Alguna combinación de filtrado de entrada con reconocimiento de tipos y codificación de salida puede evitar la inyección de SQL en teoría, pero en la práctica este enfoque es muy poco confiable.

En su lugar, podemos utilizar una característica de cada motor de base de datos que omita por completo parte del análisis inicial de la consulta. Este tipo de consulta se denomina consulta parametrizada y su uso se denomina frecuentemente vinculación de parámetros. En lugar de enviar a la base de datos una cadena de texto que contiene tanto la estructura de la consulta como los datos del usuario, enviamos una cadena que contiene la estructura de la consulta con marcadores de posición para los datos. Junto con esa cadena, enviamos los datos de cada marcador de posición. De esta manera, los datos del usuario nunca se analizan en un contexto SQL; no importa lo que envíen, será tratado exclusivamente como dato. Esto no sólo protege contra la inyección de SQL, sino que también hace que las consultas de la base de datos sean un poco más rápidas.

Para obtener más información sobre la inyección SQL, consulte [la guía OWASP al respecto](https://owasp.org/www-community/attacks/SQL_Injection). Para una exploración en profundidad, consulte la [Ruta de Aprendizaje sobre Evaluación de Seguridad de Aplicaciones Web](/es/learning-path/5/).

## Inyección de Path/recorrido de directorio/inclusión de archivos locales

Esta clase de vulnerabilidad implica que el usuario envíe una aplicación web que subvierte las interacciones de la aplicación con el sistema de archivos. Con este tipo de vulnerabilidad, el atacante puede influir o controlar la ruta de acceso de un archivo que la aplicación web lee o escribe, lo que potencialmente le otorga al atacante acceso completo a cualquier archivo que el servidor web pueda leer o escribir. Dependiendo de lo que esté almacenado en el servidor web, esto puede otorgar diferentes habilidades a un atacante. Sin embargo, los objetivos populares son los archivos de configuración, que a menudo contienen credenciales para bases de datos y otros servicios de red externos, y el código fuente de la propia aplicación.  

Considere una aplicación que mantiene algunos datos en el sistema de archivos en lugar de una base de datos. Por ejemplo, un sitio multilingüe que guarda las localizaciones en archivos. Quizás el código de la página de inicio se vea así:

{{< highlight html >}}
<?
function localize($content, $lang) {
	return fread("../config/lang/"+$lang+"/"+$content);
}
?>
<html>
<head><title><?= localize($_GET("pg")+".title",$_GET("hl"))?></title></head>
<body><?= localize($_GET("pg"), $_GET("hl"))?></body>
</html>
{{< / highlight >}}

Note that it takes parameters from the URL string and uses them to read files off the filesystem, including their content in the page.

Tenga en cuenta que toma parámetros de la cadena URL y los usa para leer archivos del sistema de archivos, incluido su contenido en la página.

Cuando cargas [http://www.example.com/?hl=en-us&pg=main](http://www.example.com/?hl=en-us&pg=main), el servidor busca `../config/lang/en-us/main.title` y `../config/lang/en-us/main`. Quizás el HTML resultante se vea así:

{{< highlight html >}}
<html>
<head><title>Cool site: Main</title></head>
<body><h1>Hello, world!</h1></body>
</html>
{{< / highlight >}}

Ahora bien, ¿qué pasa si en cambio visitamos [http://www.example.com/?hl=../../../../../../../../&pg=../etc/passwd](http://www.example.com/?hl=../../../../../../../../&amp;amp;pg=../etc/passwd)? El sitio buscará ../config/lang/../../../../../../../../&pg=../etc/passwd.title and ../config/lang/../../../../../../../../&pg=../etc/passwd. Es poco probable que encontremos el primero, pero suponiendo que el servidor ignoró el error, es posible que obtengamos una página web similar a la siguiente:

{{< highlight html >}}
<html>
<head><title></title></head>
<body>nobody:*:-2:-2:Unprivileged User:/var/empty:/usr/bin/false
root:*:0:0:System Administrator:/var/root:/bin/sh
daemon:*:1:1:System Services:/var/root:/usr/bin/false
</body>
</html>
{{< / highlight >}}

En cualquier sistema moderno tipo Unix, capturar `/etc/passwd` no es un gran problema, pero si el atacante logró forzar otros archivos en el sistema (tal vez un archivo de configuración o algo como `/home/dev/vpn-credentials.txt`), los resultados podrían ser bastante malos. Peor aún sería un sitio que permita a los usuarios cargar archivos, pero el usuario puede manipular la ubicación del archivo para que sea código (por ejemplo, .php, .asp, etc.) dentro de la raíz web. En este caso, el atacante puede cargar un [web shell](https://en.wikipedia.org/wiki/Web_shell) y ejecutar comandos en el servidor web.

## ¡Inténtalo tú mismo

Inicia sesión en tu DVWA y asegúrate de que el nivel de seguridad esté bajo. Navegue a la página "Inclusión de Archivos" y experimente con la URL que visita cuando hace clic en un archivo. ¿Puedes recuperar el archivo `/etc/passwd`?

## Prevención de inyección de ruta

En gran medida, el mejor consejo para prevenir este tipo de ataques es "no utilizar el sistema de archivos en el código de su aplicación". Si bien este consejo es eficaz, no siempre es práctico. Una opción híbrida sería almacenar nombres de archivos en una base de datos y aceptar índices de bases de datos del usuario. En el ejemplo anterior, quizás la base de datos se vería así:

<table>
  <tr>
   <td>lang
   </td>
   <td>page
   </td>
   <td>type
   </td>
   <td>location
   </td>
  </tr>
  <tr>
   <td><code>en-us</code>
   </td>
   <td><code>main</code>
   </td>
   <td><code>title</code>
   </td>
   <td><code>../config/lang/en-us/main.title</code>
   </td>
  </tr>
  <tr>
   <td><code>en-us</code>
   </td>
   <td><code>main</code>
   </td>
   <td><code>body</code>
   </td>
   <td><code>../config/lang/en-us/main</code>
   </td>
  </tr>
</table>

Si esto no es posible, el sitio sólo debería utilizar y aceptar un conjunto muy limitado de caracteres (como letras y números) para los componentes del nombre de archivo especificados por el usuario. Es probable que esto aún permita a los usuarios leer o escribir archivos arbitrarios dentro de un directorio específico, por lo que los desarrolladores de aplicaciones deben asegurarse de que los archivos en ese directorio no sean ejecutables por el servidor web y que no haya datos confidenciales o información de configuración importante en ese directorio.

Para obtener más información sobre la inyección de ruta, consulte [la guía OWASP al respecto](https://owasp.org/www-community/attacks/Path_Traversal). Para una exploración en profundidad, consulte la [Ruta de Aprendizaje sobre Evaluación de Seguridad de Aplicaciones Web](/es/learning-path/5/).

## Inyección de shell/inyección de comando

La inyección de shell es similar a la inyección de ruta, en el sentido de que implica las interacciones de la aplicación con el sistema operativo. Sin embargo, en este caso, la aplicación ejecuta directamente un comando de shell o varios comandos, y es posible que un atacante cambie los comandos que se ejecutan. El impacto de una inyección de shell es extremadamente alto, lo que permite al atacante ejecutar sus propios comandos en el hardware del servidor web subyacente. El compromiso total de la aplicación web está casi asegurado. Con el tiempo, es probable que se comprometa otra infraestructura en el entorno del servidor.

Considere una aplicación que permita a los usuarios verificar la conectividad de la red con otros sistemas desde el servidor web. Aquí hay un código para una página PHP mínima que hace esto:

{{< highlight html >}}
<html>
<head><title>Network connectivity check</title></head>
<body>
	<h1>Network connectivity check</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<?
	if ($_GET("host")) {
		print("	<h2>Results</h2>\r<pre>".shell_exec("ping -c 3 ".$_GET("host"))."</pre>");
	}
?>
</body>
</html>
{{< / highlight >}}

Si los usuarios ingresan “8.8.8.8”, la página usa la función shell_exec para ejecutar el comando `ping -c 3 8.8.8.8`, y el HTML resultante se parece a este:

{{< highlight html >}}
<html>
<head><title>Network connectivity check</title></head>
<body>
	<h1>Network connectivity check</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2>Results</h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=7.266 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=8.681 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=12.481 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.266/9.476/12.481/2.202 ms</pre>
</body>
</html>
{{< / highlight >}}

¡Súper útil! Sin embargo, ¿qué pasará si el usuario ingresa “`8.8.8.8; ¿Es -1 /`” en su lugar? La ejecución del comando shell será `ping -c 3 8.8.8.8; Es -1 /`, y la página web resultante se verá así:

{{< highlight html >}}
<html>
<head><title>Network connectivity check</title></head>
<body>
	<h1>Network connectivity check</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2>Results</h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=5.611 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=11.918 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=9.519 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 5.611/9.016/11.918/2.599 ms
Applications
Library
System
Users
Volumes
bin
cores
dev
etc
home
opt
private
sbin
tmp
usr
var</pre>
</body>
</html>
{{< / highlight >}}

¿Qué pasó? El shell vio el comando ping a 8.8.8.8 y luego un punto y coma. En la mayoría de los shells tipo Unix, el comando de punto y coma separa los comandos individuales que se ejecutan juntos en una línea. Entonces, el shell ejecutó el comando ping, luego ejecutó el siguiente comando para enumerar el contenido del directorio raíz. Reunió el resultado de ambos comandos y luego devolvió esos resultados al servidor web.

Obviamente, algo como esto podría usarse para recuperar casi cualquier archivo del servidor web (por ejemplo, usando el comando "cat"). El atacante podría hacer que el servidor web descargue archivos (incluidos ejecutables) de otros servidores y luego ejecute esos comandos. Esos ejecutables descargados podrían ser exploits que permitan al atacante escalar privilegios del usuario del servidor web a un usuario administrativo (por ejemplo, sistema o raíz), dándole al atacante control total sobre el servidor web.

## ¡Inténtalo tú mismo

Inicia sesión en tu DVWA y asegúrate de que el nivel de seguridad esté bajo. Navega a la página "Inyección de Comando" y experimenta con la entrada. ¿Puede enumerar el contenido del directorio raíz del servidor web?

## Prevención de inyección de shell

Al igual que con la inyección de ruta, la mejor manera de evitar la inyección de shell es "no hacer eso". A diferencia de la inyección de ruta, no se debe prestar completa atención al consejo de no ejecutar comandos de shell desde el servidor web. Las otras alternativas (como la validación de datos de entrada) son difíciles de implementar correctamente y pueden resultar imposibles si la aplicación necesita permitir cualquier tipo de entrada no trivial.

Para obtener más información sobre la inyección de shell, consulte [la guía OWASP a respecto](https://owasp.org/www-community/attacks/Command_Injection) y [la guía OWASP para prevenirla](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html). Para una exploración en profundidad, consulte la [Ruta de Aprendizaje sobre Evaluación de Seguridad de Aplicaciones Web](/es/learning-path/5/).

## Verificación de Habilidades

### Ejercicio 1: resumen

(Este es un resumen del ejercicio descrito anteriormente en el subtema)

Accede a tu instalación de DVWA. Establece el nivel de dificultad en "bajo" y completa las siguientes secciones:

- XSS (reflejado)
- inyección SQL
- Inclusión de archivos
- Inyección de Comando

Para cada una de las siguientes secciones, su tarea es encontrar y explotar la vulnerabilidad como se describe en la página DVWA respectiva. Dado que es posible que no tenga mucha experiencia con JavaScript, SQL o líneas de comando, está bien utilizar tutoriales (hay muchos en línea que miran DVWA) o guías para ayudarlo con los ejercicios. Solo asegúrese de que, en lugar de simplemente copiar y pegar comandos de los tutoriales, pueda explicar _qué_ hace cada página DVWA y cuál es la vulnerabilidad.

### Ejercicio 2: cuestionario de opción múltiple

La validación de datos es un aspecto crítico de la seguridad de las aplicaciones web, ya que garantiza que los datos de entrada estén seguros, formateados correctamente y libres de intenciones maliciosas. No implementar una validación de datos adecuada puede dejar las aplicaciones web vulnerables a diversas exploraciones. Las siguientes preguntas exploran la importancia de la validación de datos en aplicaciones web y técnicas para prevenir vulnerabilidades de validación de datos.

Si es posible, discuta sus respuestas a esas preguntas con un compañero o mentor que lo ayudará a verificar que haya entendido correctamente el tema.

**Pregunta 1**

¿Cuál es una consecuencia común de no implementar una validación de datos adecuada en una aplicación web?

A) Mayor rendimiento del servidor  
B) Experiencia de usuario mejorada  
C) Vulnerabilidad a ataques de inyección SQL  
D) Integridad de datos mejorada

{{< question title="Respuesta correcta y explicación" >}}
**Question 1 correct answer**: **Pregunta 1 respuesta correcta:** C) Vulnerabilidad a ataques de inyección SQL

Explicación:

A) Incorrecta. No implementar una validación de datos adecuada normalmente no conduce a un mayor rendimiento del servidor.
B) Incorrecta. Si bien una validación de datos adecuada contribuye a una mejor experiencia del usuario al prevenir errores, su ausencia no mejora la experiencia del usuario.
C) Correcta. Sin una validación de datos adecuada, las aplicaciones web son vulnerables a ataques de inyección SQL, donde los atacantes pueden manipular consultas de bases de datos inyectando código SQL malicioso.
D) Incorrecta. La validación de datos ayuda a mantener la integridad de los datos, pero su ausencia no mejora la integridad de los datos.
{{< /question >}}

**Pregunta 2**

¿Cuál de los siguientes es un mecanismo eficaz para prevenir ataques de secuencias de comandos entre sitios (XSS) en aplicaciones web?

A) Uso de texto sin formato para almacenar datos confidenciales  
B) Escapar de la entrada del usuario antes de mostrarla  
C) Almacenamiento de contraseñas de usuario en texto sin formato  
D) Deshabilitar el cifrado HTTPS

{{< question title="Respuesta correcta y explicación" >}}
**Question 2 Correct Answer**: B) Escapar de la entrada del usuario antes de mostrarla

Explicación:
A) Incorrecta. El uso de texto sin formato para almacenar datos confidenciales no previene los ataques XSS; de hecho, aumenta el riesgo de exposición de datos.
B) Correcta. Escapar de la entrada del usuario antes de mostrarla ayuda a mitigar los ataques XSS al hacer que cualquier script potencialmente malicioso sea inofensivo, evitando así que se ejecute en los navegadores de los usuarios.
C) Incorrecta. Almacenar contraseñas de usuario en texto sin formato es un riesgo para la seguridad y no está relacionado con la prevención de ataques XSS.
D) Incorrecta. Deshabilitar el cifrado HTTPS expone los datos confidenciales a la interceptación y no previene los ataques XSS.
{{< /question >}}


**Pregunta 3**

¿Qué técnica es eficaz para prevenir ataques de inyección SQL en aplicaciones web?

A) Uso de consultas SQL dinámicas  
B) Emplear desinfección de entradas y consultas parametrizadas  
C) Almacenamiento de datos confidenciales en texto sin formato  
D) Deshabilitar mensajes de error

{{< question title="Respuesta correcta y explicación" >}}
**Pregunta 3 Respuesta Correcta:** B) Emplear desinfección de entradas y consultas parametrizadas

Explicación:

A) Incorrecta. El uso de consultas SQL dinámicas sin una validación y desinfección de entrada adecuadas aumenta el riesgo de ataques de inyección SQL.
B) Correcta. El uso de desinfección de entradas y consultas parametrizadas ayuda a prevenir ataques de inyección SQL al garantizar que las entradas del usuario se traten como datos en lugar de código ejecutable, neutralizando así los intentos maliciosos de inyección SQL.
C) Incorrecta. El almacenamiento de datos confidenciales en texto sin formato aumenta el riesgo de exposición de los datos, pero no previene directamente los ataques de inyección SQL.
D) Incorrecta. Deshabilitar los mensajes de error puede ocultar vulnerabilidades potenciales a los atacantes, pero no aborda la causa raíz de las vulnerabilidades de inyección SQL.
{{< /question >}}

**Pregunta 4**

¿Cuál de las siguientes afirmaciones explica mejor cómo la validación adecuada de los datos ayuda a prevenir ataques de inyección de comandos en la seguridad de las aplicaciones web?

A) La validación de datos restringe la entrada a caracteres y patrones predefinidos, minimizando así la probabilidad de que se inyecten comandos maliciosos en la aplicación.
B) Las técnicas de validación adecuadas, como la desinfección de entradas y las consultas parametrizadas, ayudan a neutralizar los comandos maliciosos incrustados en las entradas del usuario, mitigando así las vulnerabilidades de inyección de comandos.
C) La implementación de métodos de validación, como comprobaciones de longitud de entrada y listas blancas de caracteres aceptables, reduce la superficie de ataque y evita la ejecución de comandos no autorizados dentro de la aplicación web.
D) Todo lo anterior.

{{< question title="Respuesta" >}}
**Pregunta 4 Respuesta Correcta:** D) Todo lo anterior.
{{< /question >}}


## Learning Resources

{{% resource title="Guías OWASP sobre vulnerabilidades: Inyección SQL" description="Grandes descripciones generales de diferentes vulnerabilidades, incluidos ejemplos." languages="Inglés" cost="Gratis" url="Inyección SQL: https://owasp.org/www-community/attacks/SQL_Injection" %}}
{{% resource title="Guías OWASP sobre vulnerabilidades: XSS" description="Grandes descripciones generales de diferentes vulnerabilidades, incluidos ejemplos." languages="Inglés" cost="Gratis" url="XSS: https://owasp.org/www-community/attacks/xss/" %}}
{{% resource title="Guías OWASP sobre vulnerabilidades: Recorrido de ruta" description="Grandes descripciones generales de diferentes vulnerabilidades, incluidos ejemplos." languages="Inglés" cost="Gratis" url="Recorrido de ruta: https://owasp.org/www-community/attacks/Path_Traversal" %}}
{{% resource title="Guías OWASP sobre vulnerabilidades: Inyección de comando" description="Grandes descripciones generales de diferentes vulnerabilidades, incluidos ejemplos." languages="Inglés" cost="Gratis" url="Inyección de comando: https://owasp.org/www-community/attacks/Command_Injection" %}}
{{% resource title="Hoja de trucos para la inyección de comandos del Sistema Operativo" description="Una descripción general rápida de los diferentes comandos del sistema operativo de los que se podría abusar para la inyección" languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html" %}}
{{% resource title="Shells web" description="Una descripción general rápida de qué es un shell web y cómo podría usarse en ataques" languages="Inglés, kurdo, chino, coreano, francés, lombardo, hindi, malayalam" cost="Gratis" url="https://en.wikipedia.org/wiki/Web_shell" %}}