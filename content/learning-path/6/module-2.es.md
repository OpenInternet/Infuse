+++
style = "module"
weight = 2
title = " Registro de Sitios Web para Mayor Seguridad"
description = "Los registros de sitios web pueden ser cruciales para identificar posibles ataques y atacantes. Analizamos cómo utilizarlos de manera eficaz"
+++

## Caso de Uso

Cualquier sitio web que esté expuesto a Internet está bajo ataque constante. Como mínimo, está siendo inundado por ataques no dirigidos por hordas de robots operados por agentes criminales. Más preocupantes son los ataques dirigidos; incluso los atacantes no cualificados, con perseverancia y suerte, pueden encontrar vulnerabilidades en un sitio web.

Idealmente, la persona propietaria del sitio web debería poder ser consciente de las amenazas a las que se enfrenta. Especialmente los propietarios de sitios querrán saber si un atacante está cerca de encontrar, o ha encontrado recientemente, una vulnerabilidad en su sitio. Finalmente, si se explota una vulnerabilidad, los propietarios del sitio querrán saber dónde está y durante cuánto tiempo ha estado explotada. Los registros del sitio web pueden respaldar todos estos deseos.

Por otro lado, el registro excesivo puede representar un riesgo para los usuarios de los sitios web. Si un sitio registra información confidencial y esos registros son adquiridos por un adversario (por ejemplo, incautación por parte de las autoridades o piratería informática), entonces la información confidencial podría terminar fácilmente en las manos equivocadas.

Este subtema cubrirá enfoques para el registro de sitios web para maximizar la utilidad para los propietarios de sitios web y minimizar el riesgo para los usuarios del sitio.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Comprender el registro integrado para los principales servidores web
- Comprender qué registros específicos de la aplicación agregar para detectar ataques
- Saber cómo minimizar la información confidencial en los registros

---
## Sección Principal
Incluso con las mejores habilidades, dedicación, procesos e intenciones posibles, es casi imposible desarrollar un sitio web que sea completamente resistente a cualquier tipo de ataque. Con suficiente tiempo y mala suerte, cada sitio tendrá un incidente de seguridad. Cuando eso sucede, es importante contar con un registro que respalde la detección e investigación de eventos de seguridad. Al mismo tiempo, es importante que los registros de un sitio web no representen riesgos adicionales por sí mismos. Este subtema le enseñará cómo abordar el registro para maximizar la seguridad de un sitio. Se discutirá:

- Registros integrados para plataformas populares
- Agregar registros para detectar eventos de seguridad importantes
- Minimizar los riesgos asociados con el registro

### Registro Incorporado

Varias plataformas web tienen sus propios sistemas de registro. Se puede confiar en que registrarán datos sobre cada solicitud y respuesta, pero generalmente no son suficientes para todas las necesidades de respuesta a incidentes. Repasemos lo que está disponible en los registros de algunos framworks comunes.

#### Apache

Apache es el servidor web con todas las funciones más popular de Internet y ofrece más sitios activos que cualquier otro. De forma predeterminada, registra eventos para archivarlos en el sistema de archivos del servidor web. Hay dos archivos: `access_log` y `error_log`. El registro de acceso contiene información estructurada sobre cada solicitud, mientras que el registro de errores contiene más datos semiestructurados sobre cosas que salieron mal.

El registro de acceso tiene una línea por entrada, con un formato configurable. El formato predeterminado son los siguientes campos, cada uno separado por un espacio:

- La dirección IP del solicitante
- El usuario que inició sesión en el dispositivo solicitante. Esto casi nunca se envía, por lo que casi siempre es solo un guión.
- El usuario con la sesión iniciada si el sitio web utiliza autenticación HTTP básica. Esto también será casi siempre un guión.
- La fecha y hora de la solicitud, entre corchetes. Tenga en cuenta que este campo normalmente tendrá espacios.
- La línea de solicitud HTTP enviada desde el cliente, entre comillas (por ej. `"GET / HTTP/1.1"`). Estos campos siempre tendrán espacios.
- El código de respuesta HTTP del servidor, por ej. 200, 404, 500, etc.
- El tamaño de la respuesta devuelta por el servidor.

Hay aquí un ejemplo:

```
127.0.0.1 - - [13/Dec/2023:13:55:36 -0700] "GET / HTTP/1.1" 200 2326
```

Tenga en cuenta que cada servidor Apache se puede configurar para registrar más o menos datos. Para obtener más información, consulte [la documentación de Apache](https://httpd.apache.org/docs/2.4/logs.html#accesslog). Para obtener más información sobre el registro de acceso de Apache y cómo usarlo, consulte [este artículo.](https://www.keycdn.com/support/apache-access-log)

El registro de errores consta de una combinación de mensajes de Apache que están en un formato semiestructurado y mensajes de error de sitios web que se ejecutan en el servidor, sin ninguna estructura obligatoria. La estructura predeterminada de las entradas del registro de errores del propio Apache es una línea por entrada, con los siguientes campos, nuevamente separados por espacios:

- La fecha y hora de la solicitud, entre corchetes. Tenga en cuenta que este campo normalmente tendrá espacios.
- El nivel de error (por ejemplo, aviso, error) entre corchetes.
- Si el error está asociado con una solicitud, la palabra “cliente” y la dirección IP del solicitante, todo entre corchetes.
- El mensaje de error en sí, que casi siempre contendrá varios espacios.

[Este artículo](https://www.dataset.com/blog/apache-error-log-detail/) proporciona más información sobre el uso del registro de errores de Apache.

#### IIS

IIS es el servidor web predeterminado de Windows y también es un servidor web muy popular. Al igual que Apache, IIS también, de forma predeterminada, registra las solicitudes en el sistema de archivos del servidor web. Hay varios formatos de registro disponibles, pero el predeterminado es el formato W3C, que registra lo siguiente, separado por espacios:

- Hora de la petición
- La dirección IP del solicitante
- Método HTTP (por ejemplo, `GET`, `POST`, `HEAD`, etc.)
- URI (por ejemplo, `/`, `/index.htm`, `/posts/34/reply`, etc.)
- Código de respuesta del servidor (por ejemplo, `200`, `404`, `500`, etc.)
- Versión del protocolo HTTP (por ejemplo, `HTTP/1.1`)

Tenga en cuenta que los registros predeterminados no registran la cadena de consulta, por ejemplo, una solicitud a <http://example.com/profile?profileID=34> solo registrará /profile. Para obtener más información sobre los registros de acceso de IIS, consulte la [documentación de Microsoft](https://learn.microsoft.com/es-es/windows/win32/http/server-side-logging-in-http-version-2-0).

Los registros de errores en IIS son un poco más complicados. Dependiendo del error, pueden ir al archivo de registro HTTP.SYS HTTPERR o al registro de eventos de Windows.

El archivo HTTPERR contiene errores a nivel de protocolo y está en un formato estructurado, con los siguientes campos separados por espacios:

- Fecha de solicitud
- Hora de solicitud
- La dirección IP del solicitante
- Puerto del solicitante (no el puerto del servidor)
- Dirección de IP del servidor
- Puerto de servidor
- Protocolo HTTP (por ejemplo, `HTTP/1.1`)
- Método HTTP (por ejemplo, `GET`, `POST`, `HEAD`, etc.)
- La URL y la cadena de consulta.
- Código de respuesta del servidor (por ejemplo, `200`, `404`, `500`, etc.)
- Un guión (-)
- Una cadena de tipo de error (sin espacios)

Para obtener más información sobre el registro de errores, consulte la [documentación de Microsoft](https://learn.microsoft.com/es-es/windows/win32/http/error-logging-in-the-http-server-api).

El registro de eventos de Windows contiene errores generados desde el servidor de aplicaciones (por ejemplo, ASP.NET) o la aplicación. Están disponibles en el Visualizador de Eventos de Windows y están semiestructurados:

- Nivel de error (por ejemplo, `Information`, `Warning`, `Error`)
- Fecha y hora
- El software que registró el error (las entradas de registro pueden provenir de cualquier software del sistema, no solo del servidor web)
- Una identificación única del evento/error
- Categoría
- Información no estructurada específica del error

Para obtener más información sobre cómo buscar registros de errores en Windows, consulte [este artículo](https://stackify.com/beyond-iis-logs-find-failed-iis-asp-net-requests/).

#### nginx

Dependiendo de cómo se cuente, nginx puede ser el servidor web más popular en Internet, sin embargo, es bastante limitado y generalmente actúa como un proxy inverso para un servidor web back-end o sirviendo archivos estáticos.

Los registros de acceso predeterminados son similares a los registros predeterminados de Apache, pero con los siguientes campos al final de cada línea:

- Valor del encabezado de referencia (referer) enviado con la solicitud.
- Agente de usuario (versión de navegador) enviado con la solicitud

Para obtener más información sobre los registros de nginx, consulte [la documentación oficial](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).

Los registros de errores de nginx están semiestructurados, con los siguientes campos, separados por espacios:

- La fecha de solicitud
- La hora de solicitud
- El nivel de error dentro de corchetes
- Información de ID de proceso sobre la instancia de nginx que registró el error
- Un ID de conexión (opcional)
- El mensaje de error en texto de formato libre

Para obtener más información, consulte [este artículo](https://trunc.org/learning/nginx-log-analysis).

#### Registros de la CDN

Si un sitio está protegido por una CDN, suele ser útil ver registros de solicitudes a la CDN en lugar de solicitudes de la CDN al sitio de origen. Cada proveedor de CDN entrega registros de manera diferente y tiene diferentes estructuras de precios para el registro.

#### Configurar el registro del servidor

Al configurar el registro del servidor, hay algunos pasos que se deben seguir para maximizar el valor de seguridad de los registros.

- Asegúrese de que los registros contengan al menos la dirección IP del solicitante, el URI completo solicitado (incluida la cadena de consulta), el tiempo necesario para atender la solicitud, el tamaño de la respuesta, el referente y el agente de usuario. Esta información puede ser extremadamente útil al investigar un incidente.
- Intente eliminar los registros del servidor web lo más rápido posible. Si el servidor en sí está comprometido, los atacantes probablemente intentarán ocultar sus huellas eliminando o modificando los registros del servidor. Algunas formas de lograr esto incluyen:
  - Tenga un proceso que extraiga archivos de registro del servidor periódicamente. Enviar registros desde el servidor web está bien, aunque es importante que el proceso de envío no se pueda utilizar para eliminar los registros respaldados.
  - "Transmitir" registros desde el servidor web a un dispositivo remoto, por ejemplo, con syslog-ng. Esto proporciona una gran protección contra la pérdida de registros. Por lo general, también es una buena idea mantener registros en el servidor web, en caso de interrupción de la red.

#### Limitaciones del registro del servidor

Incluso cuando están completamente configurados, los registros del servidor integrados omiten mucha información importante. Algunos ejemplos:

- La información del parámetro POST no está incluida. Si un atacante realiza ataques a nivel de aplicación contra una página que acepta parámetros POST, no habrá forma de ver esos ataques en los registros.
- Aunque los registros de errores pueden contener información sobre los errores del sistema de archivos y de la base de datos que ocurren cuando los atacantes explotan las vulnerabilidades, generalmente no son suficientes para comprender mucho sobre el ataque. Por ejemplo, los registros de errores elevados pueden indicar un ataque en progreso, pero también pueden indicar un error no relacionado con la seguridad, y puede ser muy difícil distinguir entre los dos.
- No se incluye información de identidad. Si bien todos los registros incluyen la dirección IP, varios usuarios pueden tener la misma IP.

Gran parte de esta información no se incluye por una buena razón. Gran parte de esto puede tener malas implicaciones para la privacidad del usuario. Otros (como el útil registro de errores) requieren información sobre la aplicación en sí, por lo que el servidor web no puede realizarlos.

#### Acercarse al Registro por seguridad

El objetivo principal del registro a nivel de aplicación en una aplicación web es superar las limitaciones del registro del servidor. Existen numerosos artículos que describen las mejores prácticas para el registro; a continuación se muestran algunos:

- [Una descripción general del registro de seguridad](https://www.dnsstuff.com/security-log-best-practices)
- [Un artículo de OWASP sobre el registro de sitios web](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [Un artículo de OWASP sobre cómo tener un formato consistente para los registros](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html)

Estos recursos deberían ayudarlo a obtener el conocimiento que necesita para integrar el registro de seguridad en una aplicación web existente (o nueva).

#### Registro e información confidencial

Al superar las limitaciones del registro integrado del servidor, queremos asegurarnos de no poner en riesgo a los usuarios del sitio. Con frecuencia ocurre que los registros están peor protegidos que las bases de datos de producción. En primer lugar, los registros no son un objetivo tan obvio como una base de datos de producción, por lo que las personas tienden a no centrarse tanto en ellos cuando implementan medidas de seguridad. En segundo lugar, suele ocurrir que a más usuarios de una organización se les concede acceso a los registros que a una base de datos de producción. En tercer lugar, los registros tienden a enviarse a muchos sistemas diferentes, mientras que las bases de datos de producción tienden a permanecer centralizadas. Por este motivo, vale la pena considerar la posibilidad de redactar información confidencial en los registros.

[Este artículo](https://www.skyflow.com/post/how-to-keep-sensitive-data-out-of-your-logs-nine-best-practices) previene algunas mejores prácticas generales para manejar datos confidenciales durante el registro. A continuación se presentan algunos enfoques a considerar para tipos específicos de datos:

##### Parámetros POST

Es una práctica recomendada no incluir información confidencial en los parámetros GET, por lo tanto, se registran los parámetros GET, pero no los parámetros POST. Sin embargo, puede resultar extremadamente útil tener acceso a información sobre los parámetros POST al responder a un ataque. Algunas cosas para implementar:

- Ciertas páginas (por ejemplo, la página de inicio de sesión) y/o parámetros (número de tarjeta de crédito, campos de contraseña) deben estar exentos del registro.
- Para los parámetros POST que se registrarán, considere redactarlos para ocultar información potencialmente confidencial y, al mismo tiempo, poder identificar el tráfico malicioso. El siguiente código Python puede servir de inspiración:

  {{< highlight python >}}
  import re

  keep = ['select', 'where', 'from', 'and', 'script', 'on', 'src', '../', '<', '>']
  output = ''

  i = 0
  while i < len(target):
  	matched = False
  	for j in keep:
  		if target[i:i+len(j)].lower() == j.lower():
  			output = output + target[i:i+len(j)]
  			i=i+len(j)
  			matched = True
  	if not matched:
  		if ' ' == target[i:i+1]:
  			output = output + ' '
  		elif re.search('\w', target[i:i+1]):
  			output = output + "A"
  		elif re.search('\d', target[i:i+1]):
  			output = output + "1"
  		else:
  			output = output + "*"
  		i = i+1

  {{< / highlight >}}

##### Errores relacionados con la seguridad

Si una solicitud provoca un error que parece un intento de piratear o eludir los controles, el sitio web debe registrar agresivamente la información de la solicitud. Ejemplos incluyen:

- Consultas a la base de datos que desencadenan un error.
- Solicitudes de un elemento de datos al que el usuario no tiene acceso
- Errores o datos vacíos al intentar leer un archivo

Si sucede algo de esto, es una buena idea registrar la solicitud, así como la información interna (por ejemplo, consulta de base de datos, nombre de archivo, etc.). En el buen caso, hay un error simple en el sitio. En ese caso, hay mucha información de depuración. En el peor de los casos, el sitio está siendo comprometido. En ese caso, es más fácil encontrar dónde ocurrió el compromiso, por lo que la investigación forense es más efectiva.

##### Información de identidad

Registrar la identidad de un usuario que ha iniciado sesión puede ser peligroso, pero existen medidas que se pueden tomar para mitigar el peligro. Es cuestionable registrar cookies de sesión, pero se puede utilizar un hash de una ID de sesión para rastrear la actividad de un usuario en el sitio. Además, si el servidor web tiene un directorio consultable de sesiones de usuarios activas, entonces se puede utilizar una ID interna en los registros o se pueden aplicar hash a las ID de sesión existentes para identificar las entradas de registro de un usuario que ha iniciado sesión. Esto permitirá a los propietarios de sitios identificar a un atacante activo, al tiempo que hará que las identidades en los registros sean inútiles para un actor de amenazas por sí solo.

## Práctica

Lea los siguientes comandos de ejemplo que utilizan herramientas comunes de Unix como `awk`, `sort`, `uniq`, y `grep` t para realizar el análisis en los registros de Apache y Nginx.

### Una breve introducción a las herramientas de análisis de texto de Unix

A continuación se muestran comandos de ejemplo que utilizan herramientas comunes de Unix como `awk`, `sort`, `uniq`, y `grep` para realizar el análisis en los registros de Apache y Nginx.

`awk` es una poderosa herramienta de línea de comandos para manipular archivos de texto en sistemas operativos tipo Unix. Tiene una sintaxis simple. La estructura básica de un comando `awk` es la siguiente:

{{< highlight awk >}}
awk 'pattern { action }' file
{{< / highlight >}}

Por ejemplo, consideremos el siguiente archivo de texto (lo llamaremos ejemplo.txt):

```
apple red 5
banana yellow 10
pear green 15
Orange orange 20
```

`awk` escanea el archivo de entrada línea por línea y realiza una acción específica para cada línea si el estándar coincide. `awk` divide automáticamente cada línea de entrada en campos basados ​​en espacios en blanco (de forma predeterminada). Se puede hacer referencia a los campos usando $1, $2, etc., donde $1 se refiere al primer campo, $2 al segundo, y así sucesivamente.

Por ejemplo, para imprimir la primera columna con el comando `awk` necesitamos usar

{{< highlight awk >}}
awk '{ print $1 }' example.txt
{{< / highlight >}}

Podemos utilizar el Filtrado Condicional. Por ejemplo, queremos imprimir líneas donde la tercera columna sea mayor que 10

{{< highlight awk >}}
awk '$3 > 10 {print $1, $3}' example.txt
{{< / highlight >}}

Para usar un delimitador personalizado con `awk`, use la opción -F seguida del carácter delimitador. Por ejemplo, si tenemos un archivo delimitado por comas, podemos usar -F',' (encierre el carácter delimitador entre comillas simples) para especificar una coma (,) como delimitador.

{{< highlight awk >}}
awk -F',' '{print $1, $3}' comma-delimited.txt
{{< / highlight >}}

Podemos hacer cálculos usando `awk`. Este comando calcula la suma de los valores en el tercer campo en todas las líneas e imprime el total al final. "END" es un estándar especial que se utiliza para ejecutar declaraciones después de que se procesa el último registro

{{< highlight awk >}}
awk '{total += $3} END {print "Total:", total}' example.txt
{{< / highlight >}}

Hay algunas variables integradas en `awk`. Por ejemplo, NR es una variable incorporada en `awk` que representa el número de registro actual. NR aumenta en uno por cada línea leída de los archivos de entrada.

Si desea imprimir números de línea además del contenido de la línea, puede utilizar lo siguiente:

{{< highlight awk >}}
awk '{print NR, $0}' example.txt
{{< / highlight >}}

### Ejercicio de práctica 1: Análisis del Registro de Acceso de Apache

Dedique algún tiempo a jugar con los siguientes comandos awk. Puede utilizar un registro de su propio servidor web o utilizar registros de práctica, como [esta colección](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip).

Identifique el número total de solicitudes registradas en el registro de acceso.

{{< highlight bash >}}
cat apache_access.log | wc -l
{{< / highlight >}}

Determine las URL solicitadas con más frecuencia.

{{< highlight bash >}}
awk '{print $7}' apache_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Este comando awk imprimirá la séptima columna de cada línea del registro y luego canalizará la salida del comando awk anterior al comando de clasificación. ordenar se utiliza para ordenar las líneas de texto alfabética o numéricamente. De forma predeterminada, ordena en orden ascendente. Después de ordenar la salida con sort, el comando `uniq -c` se usa para contar las apariciones de cada línea única en la salida ordenada. El comando `sort -nr` se utiliza para ordenar la salida numéricamente (-n) en orden inverso (-r). Esto significa que las líneas se ordenan según sus valores numéricos, apareciendo primero los valores más altos. El comando `head -5` se utiliza para mostrar las primeras 5 líneas de la entrada.

Descubra las 5 principales direcciones IP que realizan solicitudes al servidor.

{{< highlight bash >}}
awk '{print $1}' apache_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Analizar la distribución de los métodos de solicitud.

{{< highlight bash >}}
awk '{print $6}' apache_access.log | sort | uniq -c
{{< / highlight >}}

### Ejercicio de práctica 2: Análisis del Registro de Acceso de Nginx

Cuente el número total de solicitudes en un registro de acceso de Nginx.

{{< highlight bash >}}
cat nginx_access.log | wc -l
{{< / highlight >}}

Identifique las URL más solicitadas y sus correspondientes códigos de estado.

{{< highlight bash >}}
awk '{print $7, $9}' nginx_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Calcule el tamaño promedio de las solicitudes (en bytes).

{{< highlight awk >}}
awk '{sum+=$10} END {print "Average request size:", sum/NR, "bytes"}' nginx_access.log
{{< / highlight >}}

Este comando `awk` calcula el tamaño promedio de la solicitud sumando los valores en la décima columna (presumiblemente que representa los tamaños de la solicitud) para todas las líneas del archivo `nginx_access.log`. Luego, divide la suma total por el número de líneas (NR), que representa el tamaño promedio de la solicitud en bytes. Finalmente, imprime el resultado junto con un mensaje descriptivo.

Asegúrese de que la décima columna realmente represente el tamaño de la solicitud en bytes en su archivo `nginx_access.log`, ya que la precisión del cálculo depende de la exactitud de la indexación de la columna.  

Determine los 5 principales agentes de usuario que acceden al servidor.

{{< highlight bash >}}
awk -F'"' '{print $6}' nginx_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Este comando usa `awk` para establecer el separador de campo (-F) en comillas dobles ("), luego extrae el sexto campo de cada línea del archivo `nginx_access.log`. Esto supone que las entradas del registro están formateadas de tal manera que la URL o la ruta de solicitud estén entre comillas dobles. Las URL extraídas o las rutas de solicitud se canalizan para ordenarlas alfabéticamente. `uniq -c` se utiliza para contar las apariciones de cada URL única o ruta de solicitud. La salida se canaliza nuevamente a `sort -nr` para ordenar los resultados numéricamente en orden descendente según el recuento.

Finalmente, `head -5` se usa para mostrar las 5 URL principales o rutas de solicitud con el mayor número de ocurrencias.

Analizar la distribución de solicitudes por hora del día.

{{< highlight bash >}}
awk '{print $4}' nginx_access.log | cut -c 14-15 | sort | uniq -c
{{< / highlight >}}

`awk` se utiliza para extraer el cuarto campo ($4) de cada línea del archivo `access.log`, que normalmente contiene la marca de tiempo.

Luego, el comando `cut` se aplica para extraer los caracteres 14 a 15 de cada marca de tiempo, que corresponden a la porción de hora.

Los valores de hora extraídos se canalizan para ordenarlos en orden ascendente. `uniq -c` se utiliza para contar las apariciones de cada valor de hora único.

El resultado mostrará el recuento de entradas de registro para cada hora en el archivo de registro.


### Ejercicio de práctica 3: Análisis de Registros de Errores (tanto Apache como Nginx)

Cuente el número total de entradas de error en el registro.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | wc -l
cat nginx_error.log | grep 'error' | wc -l
{{< / highlight >}}


Identificar los tipos de errores más comunes. `awk '{print $NF}'` lee cada línea de datos de entrada, la divide en campos (separados por espacios en blanco de forma predeterminada) y luego imprime el valor del último campo de cada línea.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}


El número al principio de cada línea muestra cuántas veces se produjo un error en particular en el registro. En este caso, “`2047`” significa que el error con el último campo “`757`” ocurrió 2047 veces.

El último campo representa diferentes cosas en cada línea. Puede ser una ruta de archivo, una acción específica o algún otro identificador relacionado con el error. Por ejemplo, “`757`” o “`154`” pueden ser códigos de error o identificadores únicos, mientras que “`/home/mysite/public_html/new/wp-content/plugins/woocommerce/includes/data-stores/abstract-wc-order-data-store-cpt.php:100`” puede ser una ruta de archivo y un número de línea donde ocurrió el error.

Nginx: Determine las 5 principales direcciones IP que generan errores.

{{< highlight bash >}}
cat nginx_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Apache: Analizar la distribución de errores por fecha u hora.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{print $1}' | sort | uniq -c
{{< / highlight >}}

Apache: Investigue cualquier estándar de error recurrente y proponga posibles soluciones. {$1=""; $2=""; $3="";}: Esta parte del comando awk establece los primeros tres campos (fecha, hora e información de zona horaria) en cadenas vacías.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{$1=""; $2=""; $3=""; print}' | sort | uniq -c | sort -nr | head -10
{{< / highlight >}}

### Una introducción a las expresiones regulares y su uso para analizar un registro

Para este ejercicio, utilizamos archivos de registro de [esta colección](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip) (la misma colección que los otros archivos en esta sección de práctica)

En esta tarea vamos a utilizar expresiones regulares. Las expresiones regulares (regex) son como potentes herramientas de búsqueda que le ayudan a encontrar patrones específicos en los datos. Por ejemplo, si está investigando tráfico de red sospechoso y sabe que las solicitudes maliciosas a menudo contienen ciertos patrones de caracteres, puede usar expresiones regulares para buscar registros o capturas de tráfico para encontrar esas solicitudes. Regex le permite definir estándares de búsqueda flexibles. Por ejemplo:

    **Rango \[a-z\]**: coincide con un carácter en el rango "a" a "z". Distingue mayúsculas y minúsculas.

    Es decir, \[g-s\] coincide con un carácter entre g y s inclusive

    abcdef**ghijklmnopqrs**tuvwxyz

    **Rango \[A-Z\]**: coincide con un carácter en el rango "A" a "Z". Distingue mayúsculas y minúsculas.

    **Rango \[0-9\]**: coincide con un carácter en el rango "0" a "9". Distingue mayúsculas y minúsculas.

    También podemos usar **cuantificadores** para hacer coincidir la cantidad especificada del token anterior. {1,3} coincidirá con 1 y 3. {3} coincidirá exactamente con 3. {3,} coincidirá con 3 o más.

\[a-d\]{3} coincide con cualquier secuencia de exactamente tres caracteres dentro del rango dado, cada uno de los cuales puede ser cualquier letra minúscula desde la 'a' hasta la 'd'. Entonces, coincidiría con cadenas como 'abc', 'bda', 'cad', etc. Algunos caracteres tienen significados especiales dentro de las regexes, estos caracteres son:

| Símbolo| Nombre                                | Descripción                                                    |
|--------|---------------------------------------|----------------------------------------------------------------|
| \      | Barra invertida                       | Se utiliza para escapar de un carácter especial                |
| ^      | Signo de intercalación                | Principio de una cadena                                        |
| $      | Signo de dólar                        | Fin de una cadena                                              |
| .      | Período o punto                       | Coincide con cualquier carácter                                |
| \|     | Símbolo de barra vertical o tubería   | Coincide con el carácter/grupo anterior O siguiente            |
| ?      | Signo de interrogación                | Coincide con cero o uno de los anteriores                      |
| *      | Asterisco o estrella                  | Coincidir cero, uno o más de los anteriores                    |
| +      | Signo de más                          | Coincidir uno o más de los anteriores                          |
| ( )    | Paréntesis de apertura y cierre       | Caracteres de grupo                                            |
| [ ]    | Corchete de apertura y cierre         | Coincide con una variedad de caracteres                        |
| { }    | Llave rizada de apertura y cierre     | Coincide con un número específico de ocurrencias del anterior  |


En nuestra tarea usaremos barra invertida para escapar del carácter especial \\.

Puedes leer más sobre expresiones regulares [aquí](https://es.wikipedia.org/wiki/Expresi%C3%B3n_regular)

Si consulta el registro de acceso de nginx proporcionado, podrá ver este tipo de líneas:

```
181.214.166.113 - - [15/Feb/2024:15:05:19 -0500] "[L\x9E\x804\xD9-\xFB&\xA3\x1F\x9C\x19\x95\x12\x8F\x0C\x89\x05\x81" 400 181 "-" "-"
45.95.169.184 - - [15/Feb/2024:15:49:27 -0500] "\x10 \x00\x00BBBB\xBA\x8C\xC1\xABDAAA" 400 181 "-" "-"
```

Como puede ver, ambas líneas contienen \\x seguido de exactamente dos caracteres que se asignan a notación hexadecimal (por lo que usan los números del 0 al 9 y las letras de la A a la F), como \\x9C, \\x10, \\xBA, etc. Para filtrar todas las líneas necesitamos usar el estándar '`\\x\[a-fA-F0-9\]{3}`' donde `\\x\[a-fA-F0-9\]` es nuestro token, `{3}` es un cuantificador.

Usaremos el comando `grep` para buscar el estándar especificado en el texto. Por ejemplo:

`grep 'abcd'` filtrará todas las líneas que contengan la cadena “abcd”.

La opción “`-E`” en el comando grep permite el uso de expresiones regulares extendidas para la coincidencia de estándares `grep -E 'abcd\\[0-9\]{2}'` para filtrar texto como `abcd\34, abcd\47` etc.

### Ejercicio de práctica 4: usando expresiones regulares (regexes)

Para esos ejercicios, utilizamos archivos de registro de [esta colección](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip) (la misma colección que los otros archivos en esta sección de práctica)

1\. Utilice grep y la regex ['\\x[a-fA-F0-9]{3}'](https://en.wikipedia.org/wiki/Regular_expression) para filtrar solicitudes de nginx access.log que contienen una carga sospechosa. La regex '\\x[a-fA-F0-9]{3}' coincide con una secuencia que comienza con '\x' seguida de exactamente tres caracteres hexadecimales (0-9, a-f, o A-F). ¿Cuántas líneas hay?

{{< question title="Respuesta" >}}
Respuesta correcta: 131 líneas

Comando(s) a ejecutar: `grep -E '\\x[a-fA-F0-9]{3}' nginx_access.log|wc|awk '{print $1}' `
{{< /question >}}

2\. Usando el mismo filtro, determine qué dirección IP realiza la mayor cantidad de solicitudes.

{{< question title="Respuesta" >}}
Respuesta correcta: 222.186.13.131 19 líneas

Comando(s) a ejecutar: `grep -E '\\x[a-fA-F0-9]{3}' nginx_access.log|sort|awk '{print $1}'| sort | uniq -c | sort -nr`
{{< /question >}}

3\. Examine `error.log` ejecutando `more error.log`. Puede salir de este comando con Ctrl+c o presionar la tecla "q" para regresar al símbolo del sistema. Excluyendo errores de "Aviso PHP". ¿Qué tipo de errores críticos puedes encontrar en el registro?

{{< question title="Respuesta" >}}
Respuesta correcta: Errores de protocolo de enlace SSL

Comando(s) a ejecutar:

{{< highlight bash >}}
more nginx_error.log
cat nginx_error.log|grep -v "PHP"|grep crit
{{< / highlight >}}
{{< /question >}}

4\. Excluya los errores de PHP del archivo error.log y busque las líneas donde se rechazan las solicitudes debido a reglas de seguridad. ¿Qué archivo sensible se ha solicitado?

{{< question title="Respuesta" >}}
Respuesta correcta: .`git/config`

Comando(s) a ejecutar: `cat nginx_error.log|grep -v "PHP"|grep forbidden`
{{< /question >}}


## Verificación de Habilidades

Esta prueba de habilidades será mucho más fácil si primero completa el ejercicio de práctica anterior.

Se le proporciona un registro de acceso nginx de un sitio web atacado para que lo investigue, que puede [descargar aquí](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/web-app-hardening-skill-check.log).

Localice una ruta sospechosa a la que se dirige, extraiga las direcciones IP que envían solicitudes sospechosas y descubra en qué países se encuentran esas IP (para esto, puede utilizar bases de datos geoIP, que se describen con más detalle en la ruta de aprendizaje de infraestructura maliciosa). Puede utilizar herramientas CLI estándar como `awk`, `grep`, `sort`, `uniq`. Para conocer los números de AS y los países, recomendamos utilizar los servicios de búsqueda en línea relevantes.

_Pista:_ ipinfo.io proporciona una manera conveniente de buscar detalles de IP; puede usar curl para recuperarlos.


## Recursos de Aprendizaje

{{% resource title="WP2Static" description="Un complemento de WordPress para generar sitios estáticos" languages="Inglés" cost="Gratis" url="https://wp2static.com/" %}}

{{% resource title="Archivos de Registro - Apache" description="Una descripción general de cómo leer archivos de registro en el servidor web Apache" languages="Inglés" cost="Gratis" url="https://httpd.apache.org/docs/2.4/logs.html#accesslog" %}}

{{% resource title="Comprensión del Registro de Errores y Acceso de Apache, Recurso 1" description="Dos artículos más sobre cómo leer los registros del servidor web Apache" languages="Inglés" cost="Gratis" url="https://www.keycdn.com/support/apache-access-log" %}}

{{% resource title="Comprensión del Registro de Errores y Acceso de Apache, Recurso 2" description="Dos artículos más sobre cómo leer los registros del servidor web Apache" languages="Inglés" cost="Gratis" url="https://www.dataset.com/blog/apache-error-log-detail/" %}}

{{% resource title="Registro del lado del servidor" description="Un análisis de registros dentro del servidor Microsoft IIS" languages="Inglés" cost="Varios idiomas" url="https://learn.microsoft.com/es-es/windows/win32/http/server-side-logging-in-http-version-2-0" %}}

{{% resource title="Registros de Errores de IIS y Otras Formas de Encontrar Solicitudes Fallidas de ASP.Net" description="Otra mirada a los registros de IIS y cómo podemos buscar errores de aplicación en ellos" languages="Inglés" cost="Gratis" url="https://stackify.com/beyond-iis-logs-find-failed-iis-asp-net-requests/" %}}

{{% resource title="Configurar el registro en nginx" description="Documentación del servidor web NGINX sobre cómo configurar y trabajar con registros." languages="Inglés" cost="Gratis" url="https://docs.nginx.com/nginx/admin-guide/monitoring/logging/" %}}

{{% resource title="Una guía para los registros de NGINX" description="Una descripción general de los diferentes registros NGINX y sus formatos" languages="Inglés" cost="Gratis" url="https://trunc.org/learning/nginx-log-analysis" %}}

{{% resource title="Registro de Seguridad: Mejores Prácticas para el Registro y la Gestión" description="Un análisis de cuándo son útiles los registros, cómo podemos analizarlos y qué políticas podemos crear en torno a ellos." languages="Inglés" cost="Gratis" url="https://www.dnsstuff.com/security-log-best-practices" %}}

{{% resource title="Hoja de trucos y vocabulario de registro de OWASP, Recurso 1" description="Una guía de OWASP sobre para qué deberían servir los registros y cómo debemos analizarlos, así como un vocabulario estándar para ellos." languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html" %}}

{{% resource title="Hoja de trucos y vocabulario de registro de OWASP, Recurso 2" description="Una guía de OWASP sobre para qué deberían servir los registros y cómo debemos analizarlos, así como un vocabulario estándar para ellos." languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html" %}}

{{% resource title="DDoS: el incómodo visitante de negocios" description="Una mirada a cómo algunos proveedores de alojamiento web podrían querer abandonar a los clientes objetivo de ataques DDoS" languages="Inglés" cost="Gratis" url="https://www.qurium.org/alerts/azerbaijan/ddos-the-inconvenient-business-visitor/" %}}

{{% resource title="GitHub sobrevivió al mayor ataque DDoS Jamás Registrado" description="Un artículo de 2018 sobre cómo Github asumió un ataque DDoS masivo y continuó operando a partir de entonces." languages="Inglés" cost="Los primeros artículos en WIRED son gratuitos, los siguientes pueden requerir una suscripción" url="https://www.wired.com/story/github-ddos-memcached/" %}}

{{% resource title="Comprender y Responder a los Ataques Distribuidos de Negación de Servicio" description="Una guía CISA 2022 sobre el tema, que analiza los pasos a seguir antes, durante y después de un ataque" languages="Inglés" cost="Gratis" url="https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf" %}}

{{% resource title="Guía MS-ISAC para Ataques DDoS" description="Una guía que proporciona una descripción general de los tipos comunes de ataques DDoS, junto con recomendaciones generales sobre mitigaciones." languages="Inglés" cost="Gratis" url="https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks" %}}

{{% resource title="Prevención de Ataques de Negación de Servicio (DoS): La Guía Definitiva" description="Este artículo describe algunos pasos que los administradores pueden seguir para prevenir o mitigar el impacto de los ataques DoS." languages="Inglés" cost="Gratis" url="https://www.byos.io/blog/denial-of-service-attack-prevention" %}}

{{% resource title="Guía de Negación de Servicio (DoS)" description="Guías del Centro Cibernético de Seguridad Nacional del Reino Unido sobre ataques DoS y cómo defender a las organizaciones contra ellos" languages="Inglés" cost="Gratis" url="https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection" %}}

{{% resource title="La ola de ataques a la cadena de suministro contra el código abierto que dura un año está empeorando" description="Una mirada a los ataques a la cadena de suministro contra software de código abierto, en los que los atacantes comprometen las dependencias del software" languages="Inglés" cost="Gratis" url="https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/" %}}

{{% resource title="¿Cómo gestiona/equilibra las comunicaciones veraces sobre un incidente/incumplimiento y al mismo tiempo mitiga la exposición legal?" description="Una breve guía, escrita por un respondedor de incidentes en lugar de un abogado, sobre las diversas preocupaciones (legales/éticas/otras) que los protectores digitales podrían tener al revelar infracciones y cómo gestionarlas." languages="Inglés" cost="Gratis" url="https://discernibleinc.com/blog/-mailbag-reader-question-truthful-communication-legal-exposure" %}}

{{% resource title="Mantenga los Datos Confidenciales Fuera de Sus Registros: 9 Mejores Prácticas" description="Un registro exhaustivo también puede terminar incluyendo datos confidenciales, lo que podría poner a los usuarios en riesgo. Esta guía analiza cómo podemos adaptar nuestras prácticas de registro para excluir datos confidenciales de los registros." languages="Inglés" cost="Gratis" url="https://www.skyflow.com/post/how-to-keep-sensitive-data-out-of-your-logs-nine-best-practices" %}}