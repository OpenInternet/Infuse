+++
style = "module"
weight = 5
title = "Lógica de Aplicación"
description = "Aquí aprendemos sobre las vulnerabilidades de la lógica de la aplicación, qué son y cómo proteger nuestro sitio web contra ellas."
+++

## Caso de Uso

En cualquier sitio web interactivo que imponga restricciones a los tipos de acciones que los usuarios pueden realizar, es importante que el sitio aplique adecuadamente esas restricciones para evitar acciones no intencionadas (y potencialmente) dañinas por parte de usuarios malintencionados.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de hacer lo siguiente:

- Comprender el concepto de vulnerabilidades lógicas de aplicaciones
- Identifique y comprenda subclases comunes de vulnerabilidades lógicas de aplicaciones, que incluyen:
  - Controles del lado del cliente
  - Falta de limitación de velocidad/envíos múltiples
  - Inconsistencias de redondeo
  - Saltarse pasos del proceso
  - Falsificación de solicitudes entre los sitios

---
## Sección Principal

Las vulnerabilidades de lógica de aplicaciones (frecuentemente denominadas vulnerabilidades de lógica de negocios) son una clase de vulnerabilidades vagamente agrupadas que se relacionan con los procesos que realiza la aplicación en sí, a diferencia de las vulnerabilidades subyacentes en las tecnologías que utiliza la aplicación. Si esta definición le resulta confusa, está en buena compañía. Lo que constituye una vulnerabilidad de lógica de negocios frente a alguna otra clase es un asunto muy discutido. Infuse adopta la posición de que la definición real no importa mucho y que la conveniencia es más importante que las definiciones precisas. Lo alentamos a mantener un enfoque en las vulnerabilidades en sí, desarrollar una visión de las clases de vulnerabilidad que tenga sentido para usted y mantener flexibilidad en la taxonomía al discutir las vulnerabilidades con otros.

Este subtema cubrirá una serie de ejemplos de vulnerabilidades que posiblemente caen dentro de la lógica de aplicación. Como cada aplicación es ligeramente diferente, existe una cantidad infinita de tipos potenciales de vulnerabilidades lógicas de aplicaciones, pero estos ejemplos cubren varias de las más comunes.

### Controles del lado del cliente

A veces, las aplicaciones web imponen restricciones a lo que los usuarios pueden hacer en la aplicación, pero esas restricciones las impone el navegador, ya sea mediante JavaScript o funciones integradas de elementos HTML. Es importante que los desarrolladores del sitio se den cuenta de que un atacante moderadamente capacitado puede ver, modificar o ignorar cualquier cosa que se envíe al navegador. A continuación se muestran algunos ejemplos de controles comunes del lado del cliente que se pueden omitir fácilmente:

#### Tamaño de entrada

Los elementos de entrada HTML tienen un atributo longitud máxima que pretende limitar la cantidad de caracteres escritos en un campo de entrada, por ej., `&lt;input type="text" name="firstname" maxlength="20"&gt`;. En este ejemplo, si un usuario intenta introducir más de 20 caracteres en el campo de entrada, el navegador le impedirá hacerlo. Sin embargo, esto es en realidad sólo una petición cortés, en lugar de una restricción real. Por ejemplo:

- El usuario puede utilizar la función de inspección web de su navegador para modificar el DOM y eliminar la restricción de longitud.
- El usuario puede guardar la página web localmente, modificar el HTML para eliminar la restricción y luego volver a cargar la página en su navegador.
- El usuario podría leer el HTML y crear manualmente una solicitud equivalente en `curl` (una herramienta de línea de comandos para descargar recursos y transferir datos usando una variedad de protocolos diferentes) a la que genera el formulario, solo que sin la restricción de longitud.
- El usuario podría utilizar una herramienta especializada llamada proxy de interceptación para capturar la página web del servidor antes de enviarla al navegador y eliminar la restricción antes de enviarla al navegador. O el usuario podría usar la misma herramienta para capturar la solicitud del navegador antes de enviarla al servidor, luego editar la solicitud para incluir un valor más largo y enviarla al servidor.

Estas técnicas de derivación generalmente funcionan para todos los controles del lado del cliente. Téngalas en cuenta mientras cubrimos otros controles.

#### Validación del contenido de los datos

Algunos desarrolladores usarán JavaScript para restringir los valores que se pueden ingresar en un formulario, o usarán controles HTML como botones de opción o menús desplegables para restringir posibles opciones. Ninguno de estos controles es efectivo. Utilizando las mismas técnicas descritas anteriormente, los atacantes pueden eliminar las restricciones de su navegador o eludirlas para enviar los datos que deseen.

Una subclase común de este tipo de vulnerabilidad tiene que ver con el cambio de tamaño de la imagen. Ocasionalmente, los desarrolladores tendrán una función en un sitio web que cambia el tamaño de las imágenes en el lado del servidor para una visualización óptima en una resolución determinada. Generalmente la URL se verá así [http://example.com/image?imgname=file.gif&width=640&height=480](http://example.com/image?imgname=file.gif&amp;amp;width=640&amp;amp;height=480). La forma en que funcionan casi siempre estos scripts es asignar almacenamiento en memoria para contener la imagen redimensionada, escalar el archivo especificado al nuevo tamaño y luego devolver los datos de la imagen al navegador. En el ejemplo anterior, la memoria asignada normalmente sería de unos modestos 1,2 megabytes. Sin embargo, si un usuario envía una solicitud con un ancho y un alto cada uno de 100000, el servidor intentará asignar 10 gigabytes. Al enviar repetidamente este tipo de solicitudes, un atacante puede saturar fácilmente incluso un servidor web potente. Los desarrolladores deberían al menos imponer un tamaño máximo en el lado del servidor y considerar descargar el proceso de cambio de tamaño a un servidor aislado, de modo que sobrecargar ese servidor no afecte al servidor principal.

#### Desactivar controles

A veces, los desarrolladores utilizan JavaScript para desactivar ciertos controles en una página web hasta que se cumplan ciertas restricciones. Por ejemplo, quizás un usuario necesite resolver un CAPTCHA o esperar un cierto tiempo antes de enviar un formulario o hacer clic en un enlace. Utilizando las técnicas anteriores, un atacante puede simplemente eliminar o eludir estos controles.

#### Datos confidenciales almacenados en el lado del cliente

A veces, los desarrolladores incluyen datos confidenciales en una página web que es secreta o controla algo que no debería estar bajo el control del usuario. Un ejemplo de lo primero podría ser intentar restringir los datos que ve un usuario ocultando datos secretos usando el atributo CSS visualizar=ninguno, encerrándolos en comentarios HTML u otros mecanismos. El usuario puede ver estos datos simplemente viendo el código fuente HTML de la página web. Un ejemplo de cómo otorgar control del lado del cliente al incluir datos que no deben editarse en campos de formulario ocultos. Por ejemplo, en los primeros días del comercio electrónico, las tiendas web frecuentemente incluían el precio de un artículo en una entrada de formulario HTML oculta, que luego se enviaba a un carrito de compras de un tercero. Utilizando las técnicas analizadas en "tamaño de entrada", los usuarios podrían modificar fácilmente el valor en ese campo oculto y comprarlo al precio que quisieran. (Quizás recuerde que se analizó otro ejemplo de este tipo de vulnerabilidad en el apartado "escalada de privilegios horizontal" más arriba).

#### Prevención de vulnerabilidades de control del lado del cliente

No hay nada intrínsecamente malo en realizar la validación de entradas en el sitio del cliente, pero los desarrolladores deben comprender que son simplemente comodidades de la interfaz de usuario. Todas las validaciones y cálculos confidenciales deben realizarse en el servidor, no en el cliente.

### Falta de limitación de velocidad/envíos múltiples

Una clase de vulnerabilidad de la lógica de la aplicación es una restricción implícita en la cantidad de veces o frecuencia con la que se puede enviar una solicitud. A menudo se abusa del primero cuando el servidor realiza operaciones costosas o de las que se puede abusar, como la inserción de datos en una base de datos con muchos índices, el envío de correos electrónicos o mensajes SMS o, en general, la manipulación de grandes cantidades de datos. La vulnerabilidad de cambio de tamaño de imagen discutida anteriormente sería otro ejemplo de esto. Los desarrolladores generalmente no consideran que la velocidad a la que los usuarios envían dichas solicitudes sea una restricción lógica de la aplicación que deba aplicarse y, sin embargo, podría decirse que encaja en la clase de vulnerabilidad.

Existen muchos métodos para limitar la velocidad de las solicitudes, pero los únicos que son realmente efectivos son aquellos que se aplican en el sitio del servidor. Para operaciones costosas, se pueden utilizar varios sistemas de colas para garantizar que sólo se pueda realizar una pequeña cantidad de dichas operaciones a la vez. Es posible que se requieran sistemas más complejos que incluyan CAPTCHA y limitación de velocidad por cuenta y por dirección IP para operaciones de las que se abusa con frecuencia.

Un caso relacionado son las solicitudes que deben enviarse sólo una o varias veces. Un ejemplo podría ser un sitio de asistencia técnica que permite a los usuarios generar un número de ticket. Si un usuario puede, por ejemplo, registrar 20 tickets y vincularlos todos a un caso/intervención específico, ¡eso tendrá un efecto negativo en los propietarios del sitio!

### Inconsistencias de redondeo

Una clase interesante de vulnerabilidades tiene que ver con cómo las distintas operaciones manejan las facciones. Esta clase de vulnerabilidad ha aparecido en películas como _Superman 3_ y _Office Space_, pero todavía ocurre en numerosas aplicaciones financieras. Si dos aplicaciones admiten la transferencia de dinero entre sí, puede ser importante cómo manejar las fracciones de centavo. Si una aplicación redondea centavos fraccionarios y otra los trunca, entonces un atacante puede transferir repetidamente 1,9 centavos de la aplicación de truncamiento a la aplicación de redondeo. Cada transferencia le costará al usuario 1 centavo (1,9 truncado) y le dará 2 centavos (1,9 redondeado)

Hay muchas formas de prevenir vulnerabilidades en el redondeo. La más sencilla es rechazar transacciones con valores fraccionarios. Alternativamente, se pueden respaldar totalmente las monedas fraccionarias. Finalmente, si es necesario redondear/truncar/etc., hay que trabajar duro para garantizar que el manejo de las fracciones sea coherente.

### Saltarse pasos del proceso

A menudo, los sitios web tendrán procesos que se presentan a los usuarios como una serie de pasos. Si bien la intención de los desarrolladores puede ser que el usuario siga cada paso, a menudo la aplicación permitirá a los usuarios completar el proceso sin seguir cada paso. Considere un sitio de compras en línea que permita a los usuarios agregar artículos a su carrito, especificar sus opciones de entrega, especificar su información de pago y finalmente completar la transacción. No es raro que los sitios reales realicen la transacción si el usuario simplemente realiza los dos primeros pasos y luego va directamente a la página de transacción completa. Si bien esto es poco común en los sitios de comercio electrónico reales, no es raro en varias plataformas de aprendizaje electrónico, donde el usuario puede omitir los videos aburridos e ir directamente a la página que marca su asistencia como completa.

### Falsificación de solicitudes entre los sitios

Nuestra última vulnerabilidad de lógica de aplicación a menudo se considera su propia clase de vulnerabilidad, pero la incluimos aquí por conveniencia. La esencia de CSRF (falsificación de solicitudes entre sitios) es que, en algunas situaciones, los navegadores web enviarán a un sitio web las cookies del usuario para cada solicitud a ese sitio, independientemente del sitio que generó la solicitud. Si un sitio malicioso, cuando un usuario visita el sitio, genera una solicitud fraudulenta a un sitio de destino y el usuario inicia sesión en el sitio de destino, entonces el sitio de destino realizará la acción solicitada como el usuario, aunque el usuario no lo haya hecho. desencadenar intencionalmente la solicitud.

Como ejemplo, considere un sitio donde el mecanismo de restablecimiento de contraseña es que el sitio le envía por correo electrónico un enlace que le permite cambiar su contraseña. Esto es bastante normal. Imagine que el mismo sitio tiene una página que le permite cambiar su dirección de correo electrónico y, si simplemente visita [example.com/changeemail?new=123@attacker.com](http://example.com/changeemail?new=123@attacker.com), cambiará su dirección de correo electrónico a la dirección especificada. Finalmente, imagine que attacker.com está configurado para mostrar página tras página de fotografías de animales adorables. Sin embargo, hay un truco. El botón "siguiente" en la parte inferior de la página es en realidad el enlace de arriba. Si un usuario inicia sesión en example.com, visita attacker.com y hace clic en el botón "siguiente", su dirección de correo electrónico cambiará y el atacante podrá restablecer inmediatamente la contraseña del usuario, obteniendo el control de su cuenta.

### ¡Inténtalo tú mismo

Inicia sesión en tu DVWA y asegúrate de que el nivel de seguridad esté bajo. Navegue a la página "CSRF" e intente generar una página web que cambie la contraseña del usuario que inició sesión. Tenga en cuenta que, si tiene un navegador web actualizado, es posible que restrinja automáticamente los atributos de las cookies de sesión de SameSite y que el laboratorio no funcione allí. Si esto sucede, no se preocupe y omita este ejercicio; este es un comportamiento normal y deseado por parte del navegador web.

### Prevención de CSRF

La forma más sencilla de evitar CSRF es establecer explícitamente el atributo SameSite de las cookies de sesión en Lax o Strict y garantizar que cualquier solicitud que cambie datos solo cambie esos datos si se envía con HTTP POST. Otros métodos pueden funcionar, pero son más complejos.

Para obtener más información sobre CSRF, consulte [la página de OWASP al respecto](https://owasp.org/www-community/attacks/csrf) y la [hoja de trucos de protección CSRF de OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

Para una exploración en profundidad de CSRF y otras vulnerabilidades lógicas de aplicaciones, consulte la [Ruta de Aprendizaje de Evaluación de Seguridad de Aplicaciones web](/es/learning-path/5/).

## Verificación de Habilidades

Para esta sección, hemos decidido omitir la prueba de habilidad por una razón muy sencilla: actualmente, los navegadores web están cambiando sus políticas para que las políticas de cookies de SameSite sean ahora Laxas de forma predeterminada, lo que debería detener automáticamente el funcionamiento de muchos ataques CSRF. Debido a esto, es posible que los ejercicios que sugerimos ya no funcionen en el futuro.

Si aún desea realizar algún tipo de ejercicio de verificación de habilidades, pruebe el laboratorio DVWA vinculado anteriormente para ver si funciona. Si no es así, mantenga una breve conversación con un compañero o mentor sobre por qué los cambios en la configuración predeterminada de los navegadores web significan que el laboratorio ya no funciona y pídale que verifique que haya entendido correctamente el tema.

## Recursos de Aprendizaje

{{% resource title="Falsificación de solicitudes entre los sitios" description="Una guía OWASP sobre la vulnerabilidad, cómo funciona y qué medidas preventivas funcionan y qué no funcionan" languages="Inglés" cost="Gratis" url="https://owasp.org/www-community/attacks/csrf" %}}
{{% resource title="Hoja de Truco para la Prevención de Falsificación de Solicitudes entre Sitios" description="Una lista de posibles mitigaciones del CSRF, que se recomiendan y cuáles no se recomiendan" languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" %}}
