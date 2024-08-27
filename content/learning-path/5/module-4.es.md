+++
style = "module"
weight = 4
title = "Lógica de Aplicación y Vulnerabilidades Relacionadas"
description = "Existen otros tipos de vulnerabilidades que no se tratan en los subtemas anteriores y que, no obstante, podrían usarse para dañar u obtener acceso no autorizado a una aplicación web. A continuación analizamos varios de ellos"
+++

## Caso de Uso

Existen otros tipos de vulnerabilidades que no se tratan en los subtemas anteriores y que, no obstante, podrían usarse para dañar u obtener acceso no autorizado a una aplicación web. A continuación analizamos varios de ellos. Este es el último subtema que describe las clases de vulnerabilidad: Una vez que haya aprendido sobre todos ellos, puede pasar a los siguientes temas, que analizan cómo escanear sus aplicaciones web en busca de vulnerabilidades potenciales y garantizar que no tengan agujeros de seguridad graves.

## Objetivos

Después de completar este subtema, los y las profesionales podrán encontrar debilidades en las aplicaciones web relacionadas con la subversión de los mecanismos de la aplicación misma. Estos pueden estar relacionados con el mecanismo de la aplicación en sí, los mecanismos del servidor o incluso las peculiaridades de los navegadores web.

También deberían poder encontrar y explotar los siguientes tipos de vulnerabilidades de:

- Vulnerabilidades de la lógica de negocio
- Condiciones de carrera
- Divulgación excesiva de información
- Falsificación de solicitudes entre los sitios
- Vulnerabilidades de carga de archivos

---
## Sección Principal
### ¿Qué son las vulnerabilidades de la lógica de la aplicación?

Las vulnerabilidades de la lógica de la aplicación a menudo se describen como errores que permiten al usuario de una aplicación subvertir los mecanismos del diseño de un sistema de aplicación, en lugar de atacar la implementación de la aplicación. Si bien esto es cierto, la categoría también se utiliza con frecuencia como un todo para clases de vulnerabilidad que no encajan claramente en otra categoría. Algunas vulnerabilidades explotan muy claramente la lógica de la aplicación. Por ejemplo, si tiene una función de transferencia de dinero que trunca fracciones de centavo al retirar dinero de la cuenta de origen, pero deposita esas fracciones de centavo en la cuenta de destino, puede generar dinero transfiriendo fondos de un lado a otro. Otros son mucho más tenues, como proporcionar un archivo PHP a un formulario que se supone debe aceptar una imagen de perfil y luego ejecutar ese PHP cuando visitas la página de la foto de perfil.

En cualquier caso, todas las vulnerabilidades de este subtema están presentes con frecuencia en aplicaciones web y deberían completar su comprensión de las vulnerabilidades comunes.

#### Vulnerabilidades de la Lógica de Negocio

El nombre “vulnerabilidades de lógica de negocios” obviamente se originó en el área de prueba de aplicaciones relacionadas con el comercio, pero se puede simplemente omitir la palabra “negocios” del nombre. Lo incluimos porque el término es popular entre los recursos que hablan sobre pruebas de aplicaciones. En cualquier caso, estas vulnerabilidades se agrupan en el sentido de que se relacionan más con los mecanismos abstractos de procesamiento de datos dentro de una aplicación.

Diríjase al [tema Vulnerabilidades de la Lógica de Negocio de PortSwigger Academy](https://portswigger.net/web-security/logic-flaws) y complete la lectura y los laboratorios.

#### Condiciones de Carrera

Las vulnerabilidades de condición de carrera se refieren a errores que permiten a un atacante iniciar algún proceso y luego realizar alguna acción o acciones que normalmente no están permitidas antes de que se complete el proceso. Por ejemplo, considere un sitio para compartir archivos que le permita cargar archivos y duplicarlos. Para proteger a sus usuarios y usuarias, el sitio escanea los archivos cargados para ver si contienen malware y los elimina si lo contienen. Obviamente, no es necesario escanear las copias de los archivos, porque todos los archivos cargados han sido escaneados, ¿verdad? Bueno, digamos que, para mejorar la capacidad de respuesta del sitio, el proceso que escanea (y elimina) los archivos cargados se ejecuta en segundo plano en el servidor web. Un atacante podría cargar un archivo que contenga malware y luego copiarlo inmediatamente en el sitio. Como el análisis no se ha completado, el archivo seguirá existiendo en el servidor, por lo que la copia funcionará. Una vez que se complete el escaneo, el archivo original se eliminará, pero la copia permanecerá. Hay muchos más tipos de vulnerabilidades en condiciones de carrera; este subtema explora algunos de ellos.

Diríjase al [tema Condiciones de Carrera de PortSwigger Academy](https://portswigger.net/web-security/race-conditions) y complete la lectura y los laboratorios.

#### Divulgación Excesiva de Información

Las vulnerabilidades de divulgación de información ocurren cuando una aplicación o su infraestructura envía información confidencial al navegador. Esta información puede mostrarse en la ventana del navegador u ocultarse en HTML no renderizado. Los lugares comunes donde esta información puede filtrarse son a través de mensajes de error, comentarios HTML o campos ocultos, archivos extraños en el servidor web, etc. Si bien en la mayoría de los casos estas filtraciones de información no son graves, en algunos casos la información revelada puede tener impactos catastróficos en la seguridad de la aplicación web, como si se revela una clavesecreta de una API de un tercero.

Diríjase al [tema de Divulgación de Información de PortSwigger Academy](https://portswigger.net/web-security/information-disclosure) y complete la lectura y los laboratorios.

#### Falsificación de Solicitudes entre los sitios

CSRF (Falsificación de Solicitudes entre los Sitios) es una vulnerabilidad interesante que surge de la interacción entre sitios web y navegadores. Considere un servicio de pago entre pares. Acepta solicitudes GET como [http://victim.com/transfer?to-account=xyz&amount=123](http://victim.com/transfer?to-account=xyz&amp;amp;amount=123). Solo permite a los usuarios autenticados transferir dinero verificando las cookies de su sesión. Sin embargo, si un atacante publica un mensaje en un foro en línea que contiene un enlace de imagen como &lt;img src="<http://victim.com/transfer?to-account=xyz&amount=123>"&gt;, ¿qué pasaría? Cada vez que alguien veía la publicación, su navegador veía la etiqueta de la imagen e intentaba cargar la imagen. Enviaría una solicitud a victim.com, incluyendo por supuesto las cookies del sitio. Si el usuario ya inició sesión en el sitio de pago, esto tendría el efecto de transferir dinero a la cuenta XYZ. El problema aquí es que HTML y JavaScript permiten que los sitios web hagan que los navegadores de los usuarios envíen solicitudes a otros sitios, que de forma predeterminada incluyen las cookies de ese otro sitio.

Diríjase al [tema Falsificación de Solicitudes entre Sitios (CSRF) de PortSwigger Academy](https://portswigger.net/web-security/csrf) y complete la lectura y los laboratorios.

#### Vulnerabilidades de Carga de Archivos

Este subtema cubre el caso en el que un atacante puede cargar archivos a un sitio web, tal vez para una imagen de perfil, pero el archivo se interpreta como código en el lado del cliente (lo que provoca XSS) o en el lado del servidor (lo que provoca la ejecución de código). Una técnica común que utilizan los atacantes cuando explotan este último tipo es cargar un [webshell](https://en.wikipedia.org/wiki/Web_shell), un pequeño script que toma un comando shell de un usuario (normalmente a través de un parámetro URL), ejecuta el comando shell en el servidor y luego devuelve los resultados.

Si está probando un sitio y desea cargar un shell web, es muy importante que le ponga una contraseña. El hecho de que pueda cargar un archivo en el servidor no significa que pueda eliminarlo. Es posible que se encuentre en una situación en la que tenga que depender del propietario del sitio para eliminar el archivo. Agregar una contraseña puede ser simple. Hay[webshells disponibles en muchos lenguajes de programación](https://www.kali.org/tools/webshells/), pero aquí hay un ejemplo sencillo de PHP:

{{< highlight php >}}

<?php echo system($_GET['command']);?>
{{< / highlight >}}

Para agregar una contraseña a esto, simplemente la cambiamos a esto:

{{< highlight php >}}
<?php
_if_ (_$\_GET_['password'] _==_ 'Password super secreta que solo yo conozco.') {
    _echo_ system(_$_GET_['command']);
} _else_ {
    http_response_code(404);
}
?>
{{< / highlight >}}
Esto garantizará que cualquiera que se tope con su shell web centrado en pruebas no podrá utilizarlo para sus propios propósitos nefastos.

Asegúrese de leer y comprender cómo funciona un shell web antes de cargarlo. Desea estar seguro de que el shell solo ejecutará lo que usted le solicite y no se comunicará con ningún otro servidor.

## Verificación de Habilidades

PortSwigger academy contiene una serie de laboratorios que puede utilizar para probar y validar sus habilidades. Para cada uno de los siguientes temas, complete 1-3 de los laboratorios de nivel "profesional":

- [Vulnerabilidades de la lógica de negocios](https://portswigger.net/web-security/all-labs#business-logic-vulnerabilities)
- [Condiciones de carrera](https://portswigger.net/web-security/all-labs#race-conditions)
- [Divulgación de información](https://portswigger.net/web-security/all-labs#information-disclosure)

Si está trabajando con un compañero o mentor o mentora, explíquele cómo funciona cada ataque y cómo encontraría y demostraría la explotabilidad de vulnerabilidades similares en un sitio que estuviera probando.

## Learning Resources

{{% resource title="Webshell" description="Una descripción general rápida de qué es un shell web y cómo podría usarse en ataques" languages="Inglés, kurdo, chino, coreano, francés, lombardo, hindi, malayalam" cost="Gratis" url="https://en.wikipedia.org/wiki/Web_shell" %}}

{{% resource title="Webshells | Herramientas de Kali Linux" description="Un vistazo a los shells web disponibles en una instalación predeterminada de Kali Linux" languages="Inglés" cost="Gratis" url="https://www.kali.org/tools/webshells/" %}}