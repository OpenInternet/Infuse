+++
style = "module"
weight = 2
title = "Validación de Datos"
description = "Todas las aplicaciones web aceptan y procesan información no confiable. Aquí aprendemos a descubrir vulnerabilidades comunes que se aprovechan de ello"
+++

## Caso de Uso

De una forma u otra, cada aplicación web acepta y procesa entradas de datos que no son de confianza. Esta información generalmente proviene de los usuarios finales y sus navegadores, pero también puede provenir de otros sitios web o sistemas backend. Dependiendo de dónde fluya esta información, el tratamiento de los datos puede tener efectos no deseados en el sitio web o en sus usuarios.

## Objetivos

Después de completar este subtema, los y las profesionales podrán encontrar formas en que el formato o la estructura de los datos enviados a un sitio web pueden exponer y explotar vulnerabilidades.

También deberían poder encontrar y explotar los siguientes tipos de vulnerabilidades de validación de datos:

- Secuencias de comandos entre sitios (Cross-site scripting)
- Inyección SQL
- Recorrido de ruta (Path traversal)
- Inyección de Comando
- Falsificación de solicitudes por el lado del servidor (Server-side request forgery)
- Inyección XXE
- Inyección NoSQL

---
##  Sección Principal
### ¿Qué son las vulnerabilidades de validación de datos?

Como recordará de la Ruta de Aprendizaje de Fundamentos de Seguridad de Aplicaciones Web, las vulnerabilidades de validación de datos pueden adoptar muchas formas. En las aplicaciones web, suelen desencadenarse por la presencia de ciertos caracteres cuando los datos se interpretan en un contexto cambiante. Por ejemplo, los caracteres &lt; o &gt; pueden ser inofensivos en el código de una aplicación, pero pueden desencadenar una vulnerabilidad de secuencias de comandos entre sitios cuando se colocan en una página web. Las comillas simples o los espacios pueden ser inofensivos en una página web o en el código de una aplicación, pero pueden desencadenar una vulnerabilidad de inyección SQL cuando se incluyen en una consulta de base de datos. Generalmente, para cada sistema involucrado en una aplicación web (HTML, JavaScript, SQL, sistemas de archivos, shell Unix, etc.) existe un tipo diferente de posible vulnerabilidad de validación de datos.

#### Secuencias de Comandos entre Sitios

Las secuencias de comandos entre sitios (generalmente denominadas XSS) son generalmente el tipo de vulnerabilidad de validación de datos más fácil de abordar. Las entradas y salidas son visibles para el evaluador y solo requiere conocimientos de HTML y JavaScript. También es extremadamente común, [y se encuentra en 1 de cada 5 sitios web evaluados por una importante empresa de evaluación de sitios web](https://venturebeat.com/security/report-50-of-all-web-applications-were-vulnerable-to-attacks-in-2021/). Como tal, ahí es donde comenzaremos.

Diríjase al [tema XSS de PortSwigger Academy](https://portswigger.net/web-security/cross-site-scripting) y complete la lectura y los laboratorios.

##### Effective XSS testing

Lo común que hace la gente para las pruebas XSS es poner algo como `"><script>alert('xss')</script>` en diferentes parámetros de solicitud y esperar a que aparezca una ventana emergente de JavaScript cuando regrese la página. Hay dos problemas con esto.

El primer problema es que en un sitio que tiene muchas vulnerabilidades XSS almacenadas, puedes terminar haciendo clic en múltiples ventanas emergentes de JavaScript en cada página que visitas. Esto es molesto, distrae y ralentizará significativamente sus pruebas.

El segundo problema es que si usa la misma cadena para cada entrada, no sabrá inmediatamente qué entradas corresponden a qué salidas. Si tiene un XSS almacenado que aparece en varias partes del sitio, puede toparse con su cadena de prueba XSS en algún lugar del sitio, pero no saber de dónde vino.

En cambio, puedes hacer algo un poco más sutil e informativo. Un enfoque es utilizar una cadena de prueba como `"><i>xss test - pagename - fieldname</i><q z="` donde `pagename` andy `fieldname` son la página y el parámetro que estás probando. Si alguna vez ve esa cadena en cursiva en el sitio, inmediatamente sabrá que existe XSS y de dónde proviene la entrada.

##### CORS

Un tema relacionado con XSS son las vulnerabilidades relacionadas con el intercambio de recursos entre orígenes. Es posible que se haya preguntado por qué JavaScript que se ejecuta en un sitio no puede interactuar con otro sitio que un usuario tiene abierto en su navegador (por ejemplo, en otra ventana, pestaña o incluso en un iframe). La razón es que todo JavaScript en el navegador está asociado con un [_origen_](https://es.wikipedia.org/wiki/Pol%C3%ADtica_del_mismo_origen), que aproximadamente es lo mismo que un sitio web. JavaScript en un origen no puede interactuar con páginas web o datos en otro origen.

Existen excepciones para esto. El más común de ellos se llama [intercambio de recursos entre orígenes](https://es.wikipedia.org/wiki/Intercambio_de_recursos_de_origen_cruzado) (CORS, cross-origin resourcesharing), y permite que un sitio permita que el JavaScript de otros sitios interactúe con el sitio. Algunos ejemplos de esto son muy útiles, por ejemplo, permitir que JavaScript en [www.example.com](http://www.example.com) interactúe con api.example.com. Una configuración incorrecta de CORS puede tener el desafortunado efecto de permitir a los atacantes eludir algunos de los controles de seguridad del sitio Las vulnerabilidades relacionadas con CORS no son vulnerabilidades de validación de datos, pero tiene sentido aprender sobre ellas después de conocer XSS.

Diríjase al [tema CORS de PortSwigger Academy](https://portswigger.net/web-security/cors) y complete la lectura y los laboratorios.

#### Inyección SQL

La inyección SQL (a menudo abreviada como SQLi) tiene las propiedades de ser relativamente común en aplicaciones web y, por lo general, también resulta en una vulneración completa de la aplicación y sus datos. Si bien es un poco más complicado de encontrar y explotar que XSS, existen algunas técnicas que hacen que identificar y demostrar la explotabilidad sea bastante confiable. Dada su importancia, esta es la siguiente clase de vulnerabilidad en la que nos centraremos.

Diríjase al [tema SQLi de PortSwigger Academy](https://portswigger.net/web-security/sql-injection) y complete la lectura y los laboratorios.

Una vez que haya completado las prácticas de laboratorio, le ofrecemos algunos consejos para identificar SQLi de forma segura y confiable.

##### Prueba de parámetros de cadena de caracteres (string)

Una forma común de probar SQLi es visitar un sitio agregando `' or 1=1;--` hasta el final de los parámetros. Esto no es subóptimo por varias razones. La primera son las declaraciones de actualización. Considere el siguiente SQL:

{{< highlight sql >}}
update users set password='Password1!' where username='alice'
{{< / highlight >}}

¿Qué sucede si, para el nombre de usuario, pasas `alice' or 1=1;--` ¿en lugar de `alice`?

{{< highlight sql >}}
update users set password='Password1!' where username='alice' or 1=1;--'
{{< / highlight >}}

¡Oh, no! Ahora todos los usuarios de la base de datos tienen la misma contraseña. Nunca se puede saber (a menos que haya revisado _con mucho cuidado_ el código fuente) dónde van a ir sus entradas de datos, por lo que usar declaraciones `or` al intentar encontrar SQLi puede ser bastante peligroso.

Incluso si no sobrescribe la base de datos con esta cadena de prueba, puede haber otros problemas. Considere una consulta de varias líneas:

{{< highlight sql >}}
select *
  from comments
 where username = 'alice'
   and draft=0
{{< / highlight >}}

Cuando pasas un parámetro de nombre de usuario de `alice' or 1=1;--`, la consulta resultante será:

{{< highlight sql >}}
select *
  from comments
 where username = 'alice' or 1=1;--'
   and draft=0
{{< / highlight >}}

Tenga en cuenta el molesto punto y coma allí. Hace que la base de datos interprete la consulta primero como una consulta de selección (<code><em>select</em> <em>\*</em> <em>from</em> comments <em>where</em> username <em>=</em> 'alice' <em>or</em> 1<em>=</em>1;</code>) y luego <code><em>and</em></code> query (<code><em>and</em> draft<em>=</em>0</code>). El problema con esto es que no existe una consulta and, por lo que generará un error. También podría generar un error por otros motivos, dependiendo de la base de datos. Si la aplicación web da la misma respuesta para un error de base de datos que para ausencia de datos (debería), entonces no sabrá que hay SQLi en el parámetro de nombre de usuario.

Lo correcto al probar SQLi en un parámetro de cadena es crear un parámetro de prueba que funcione independientemente de la consulta en la que se encuentre. Lo mejor que puede hacer es utilizar dos solicitudes, una que dará como resultado que la consulta devuelva los datos originales y otra que no genere datos de la consulta. Luego puede comparar las tres respuestas (original, prueba 1 y prueba 2). Si el original y la prueba 1 devuelven la misma respuesta y la prueba 2 devuelve una respuesta diferente, entonces ha identificado SQLi. Aquí hay un conjunto de cadenas que puedes usar:

Para la prueba 1, agregue lo siguiente al parámetro: `' and 'a' like '%a`

Para la prueba 2, agregue lo siguiente al parámetro: `' and 'a' like '%b`

A continuación se muestran algunos ejemplos de consultas con estos parámetros:

{{< highlight sql >}}
select * from comments where username = 'alice' and 'a' like '%a'
select * from comments where username = 'alice' and 'a' like '%b'
{{< / highlight >}}

Tenga en cuenta que la primera consulta devolverá los mismos resultados que si se pasara alice como parámetro, y la segunda no devolverá ninguna fila. Por lo tanto, no hay riesgo de desastre si hay una inyección SQL en una sentencia de actualización o eliminación. También tenga en cuenta que la estructura de la consulta se altera mínimamente; las pruebas funcionarán incluso en consultas de varias líneas.

Quizás se pregunte por qué los ejemplos utilizan la operación `like` en lugar de `\=`. Esto se debe a que la consulta que está inyectando puede utilizar la operación `like` . Considere una consulta de búsqueda de documentos:

{{< highlight sql >}}
select * from documents where title like '%user text%'
{{< / highlight >}}

La operación `like` permite operadores comodín, normalmente el signo de porcentaje. La consulta anterior coincidirá con cualquier documento que contenga la cadena "texto de usuario" en cualquier parte de su título; el inicio, el medio o el final. Si usáramos algo como `' and 'a'='a` en nuestra inyección, entonces la consulta de la prueba 1 sería:

{{< highlight sql >}}
select * from documents where title like '%user text' and 'a'='a%'
{{< / highlight >}}

Esto no devolverá filas, ya que "a" nunca es _igual_ a "a%". Sin embargo, si utilizamos la prueba 1 anterior, la consulta sería:

{{< highlight sql >}}
select * from documents where title like '%user text' and 'a' like 'a%'
{{< / highlight >}}

Aunque no son iguales, “a” es similar a “a%”. Por lo tanto, las pruebas 1 y 2 anteriores deberían funcionar en casi cualquier situación basada en cadenas de caracteres. Tenga en cuenta que si está probando una función de búsqueda, es posible que también desee probar una cadena de prueba 1 adicional: %' and 'a' like '%a. Tenga en cuenta que en las consultas anteriores la búsqueda original cambia ligeramente; falta el % después de”user text”. Si sospecha que se está utilizando una operación `like`, esta cadena de prueba 1 debería compensarlo.

##### Prueba de parámetros numéricos

A veces, cuando el navegador pasa un valor numérico al servidor web, el servidor lo incluye en una consulta SQL como una cadena. Sin embargo, a veces se incluye como un valor numérico. Normalmente, el SQL para una búsqueda simple de un parámetro numérico será algo como:

{{< highlight sql >}}
select * from stories where story_id=5
{{< / highlight >}}

Obviamente, enviar un story_id de `5' and '1' like '1` no funcionará debido a un error de sintaxis. En su lugar, intente enviar dos solicitudes, una con un story_id de `5`, y otra con un story_id de `6-1`. Si el segundo no da ningún resultado, da un error o una historia diferente a la solicitud con un story_id de 5, entonces no hay evidencia de SQLi. Sin embargo, si pasar un story_id de 6-1 da como resultado la misma respuesta que un story_id de 5, entonces eso es una fuerte evidencia de SQLi. Es probable que la consulta se vea así:

{{< highlight sql >}}
select * from stories where story_id=6-1
{{< / highlight >}}

En este ejemplo, el motor de la base de datos evalúa 6-1 como código y recupera la historia cuyo ID es 5. A partir de ahí, puedes proceder a la explotación.

Por supuesto, nunca se puede saber exactamente qué está haciendo una aplicación con su entrada o cómo se utiliza, pero los consejos anteriores deberían mejorar significativamente la seguridad y eficacia de su búsqueda de SQLi.

#### Recorrido de ruta

El recorrido de ruta (path traversal) generalmente ocurre en sitios web que administran archivos proporcionados por el usuario o interfaces administrativas, pero puede ocurrir en cualquier lugar donde la aplicación web del lado del servidor abra archivos. Dependiendo de lo que haga el servidor con los archivos en cuestión, el impacto puede variar desde la divulgación del código fuente en un extremo hasta la toma completa del servidor web en el otro. Entre las aplicaciones web modernas, los lugares más comunes para encontrar vulnerabilidades de recorrido de ruta son el software de blogging y otros sistemas de gestión de contenidos, lo que pone en especial riesgo a los periodistas independientes y a las pequeñas organizaciones de medios.

Diríjase al [tema Recorrido de ruta de PortSwigger Academy](https://portswigger.net/web-security/file-path-traversal) y complete la lectura y los laboratorios.

#### Inyección de Comando

Aunque la inyección de comandos es relativamente poco común en las aplicaciones web modernas, casi universalmente resulta en un compromiso total de la aplicación web en caso de que se encuentre y explote. Donde sí aparece suele ser en las interfaces de gestión y, en menor medida, en los sistemas de gestión de contenidos.

Diríjase al [tema Inyección de Comando de PortSwigger Academy](https://portswigger.net/web-security/os-command-injection) y complete la lectura y los laboratorios.

#### Falsificación de solicitudes por el lado del servidor

La idea general detrás de la falsificación de solicitudes por el lado del servidor (server-side request forgery,generalmente abreviada como SSRF por sus siglas en inglés) es que un atacante puede hacer que el servidor de la aplicación web envíe una solicitud HTTP a cualquier otro servidor. A veces, la aplicación puede mostrar la respuesta al cliente. Durante años, la falsificación de solicitudes por el lado del servidor se consideró una vulnerabilidad poco interesante. Cuando se encontró, fue difícil explotarlo de alguna manera significativa. Sin embargo, con la llegada de la computación en la nube, la SSRF se ha convertido repentinamente en una cuestión crítica.

En entornos de nube, los administradores pueden asignar permisos a los propios servidores virtuales. Normalmente, esto se utiliza para otorgar acceso a depósitos de almacenamiento de datos, bases de datos, servicios de red, etc. Normalmente se puede acceder a los recursos en cuestión a través de Internet, lo que hace que los permisos del servidor sean el único control de acceso.

La forma en que funcionan estos permisos del servidor (a veces llamados identidad de instancia, claves de máquina, claves de cuenta de servicio, identidades administradas, etc.) es bastante simple. En un entorno de nube, los servidores son máquinas virtuales que se ejecutan en hardware físico. Hay un servicio web que se ejecuta en el servidor físico que solo acepta conexiones de red de VM que se ejecutan en el servidor. Cuando recibe una solicitud, busca la VM por dirección IP y recupera información sobre la VM, incluido el cliente y los roles de permisos asociados con la VM. Luego genera credenciales en la nube para ese rol y las envía de vuelta en la respuesta. Luego, el software de la VM puede usar esas credenciales para autenticarse en otros servicios en la nube.

Si un atacante puede hacer que una aplicación web alojada en la nube envíe solicitudes HTTP arbitrarias y devuelva las respuestas, con frecuencia el atacante puede ver las instancias de la nube del servidor. Si eso sucede, el atacante puede hacerse pasar por el servidor web. Un ejemplo de esto es [la violación de Capital One en 2019](https://blog.appsecco.com/an-ssrf-privileged-aws-keys-and-the-capital-one-breach-4c3c2cded3af), que resultó en el compromiso de información confidencial de más de 100 millones de personas.

Diríjase al [tema SSRF de PortSwigger Academy](https://portswigger.net/web-security/ssrf) y complete la lectura y los laboratorios.

#### Inyección NoSQL

Tradicionalmente, las aplicaciones web utilizaban bases de datos SQL para almacenar y recuperar sus datos. Para muchos usos de aplicaciones web, los desarrolladores prefieren las bases de datos NoSQL (por ejemplo, MongoDB, aunque hay muchas). Estas bases de datos NoSQL utilizan una sintaxis de consulta diferente a la de SQL (no es sorprendente, dado el nombre), pero los conceptos generales de la inyección NoSQL son similares a los de la inyección SQL. Sin embargo, los detalles son bastante diferentes

Diríjase al [tema Inyección NoSQL de PortSwigger Academy](https://portswigger.net/web-security/nosql-injection) y complete la lectura y los laboratorios.

#### Inyección XXE

La inyección XXE utiliza la capacidad de los archivos XML para hacer referencia a otros archivos. Las aplicaciones que permiten a los usuarios controlar los datos XML que la aplicación procesa pueden ser vulnerables. La explotación normalmente permite a los atacantes leer archivos arbitrarios del servidor web y también puede permitir ataques de denegación de servicio y, en casos excepcionales, la ejecución remota de código. Afortunadamente para los defensores, la mayoría de las aplicaciones web no procesan XML controlable por el usuario.

Diríjase al [tema Inyección NoSQL de PortSwigger Academy](https://portswigger.net/web-security/xxe) y complete la lectura y los laboratorios.

## Verificación de Habilidades

PortSwigger academy contiene una serie de laboratorios que puede utilizar para probar y validar sus habilidades. Para cada uno de los siguientes temas, complete 1-3 de los laboratorios de nivel "profesional":

- [Secuencias de comandos entre sitios](https://portswigger.net/web-security/all-labs#cross-site-scripting) (XSS)
- [Intercambio de recursos entre orígenes](https://portswigger.net/web-security/all-labs#cross-origin-resource-sharing-cors) (CORS)
- [Inyección SQL](https://portswigger.net/web-security/all-labs#sql-injection)
- [Recorrido de ruta](https://portswigger.net/web-security/all-labs#path-traversal)
- [Inyección de comando OS](https://portswigger.net/web-security/all-labs#os-command-injection)
- [Inyección NoSQL](https://portswigger.net/web-security/all-labs#nosql-injection)
- [Inyección XXE](https://portswigger.net/web-security/all-labs#xml-external-entity-xxe-injection)

Si está trabajando con un compañero, compañera, mentor o mentora, explíquele cómo funciona cada ataque y cómo encontraría y demostraría la explotabilidad de vulnerabilidades similares en un sitio que estuviera probando.

## Learning Resources

{{% resource title="Informe: El 50% de todas las aplicaciones web fueron vulnerables a ataques en 2021" description="Un resumen de un informe sobre cuántas aplicaciones web importantes eran vulnerables a ataques similares a los que describimos en estas rutas de aprendizaje" languages="Inglés" cost="Gratis" url="https://venturebeat.com/security/report-50-of-all-web-applications-were-vulnerable-to-attacks-in-2021/" %}}

{{% resource title="Una descripción general de la política del mismo origen" description="Introducciones a ambos temas que profundizan bastante moderadamente." languages="Múltiple" cost="Gratis" url="https://es.wikipedia.org/wiki/Pol%C3%ADtica_del_mismo_origen" %}}

{{% resource title="Una descripción general del intercambio de recursos de origen cruzado" description="Introducciones a ambos temas que profundizan bastante moderadamente." languages="Múltiple" cost="Gratis" url="https://es.wikipedia.org/wiki/Intercambio_de_recursos_de_origen_cruzado" %}}

{{% resource title="Una SSRF, claves privilegiadas de AWS y la vulneración de Capital One" description="Una descripción general de 2019 de una vulneración de una importante institución financiera a través de un error de SSRF" languages="Inglés" cost="Gratis" url="https://blog.appsecco.com/an-ssrf-privileged-aws-keys-and-the-capital-one-breach-4c3c2cded3af" %}}