+++
style = "module"
weight = 3
title = "Autenticación y Autorización"
description = "Muchas aplicaciones web solo permiten que determinados usuarios vean determinados fragmentos de contenido y les exigen que inicien sesión o demuestren su identidad de otras formas. Este subtema analiza la autenticación y la autorización, y las posibles vulnerabilidades que conllevan."
+++

## Caso de Uso

Muchas aplicaciones web solo permitirán que usuarios concretos vean determinados contenidos y les exigirán que inicien sesión o demuestren su identidad de otras formas. Los adversarios que desean acceder a datos confidenciales a menudo intentarán eludir esas restricciones e intentarán ver información que no pueden ver. Este subtema analiza la idea de autenticación y autorización, y sus posibles vulnerabilidades.

## Objetivos

Después de completar este subtema, los profesionales podrán encontrar debilidades en las aplicaciones web que les permitan eludir parcial o completamente los sistemas de autenticación de esas aplicaciones o abusar de la autenticación para revelar información sobre los usuarios de un sitio.

También deberían poder encontrar y explotar los siguientes tipos de vulnerabilidades de:

- Autenticación
- Autorización

---
## Sección Principal

### ¿Qué son las vulnerabilidades de autenticación y autorización?

La autenticación y la autorización son dos caras de una misma moneda y son las principales responsables de proteger la confidencialidad y la integridad de los datos en una aplicación. La autenticación es el proceso de validar que un usuario es quien dice ser, mientras que la autorización garantiza que el usuario solo tenga acceso a los datos y capacidades que debe tener. Si bien los ataques de validación de datos pueden permitir a un atacante eludir los mecanismos de control de acceso de una aplicación (por ejemplo, descargar una base de datos completa con SQLi), las funciones de autenticación y autorización implementan directamente controles de acceso.

#### Autenticación

Para las aplicaciones que no dependen de un tercero (por ejemplo, iniciar sesión con Google/Facebook/etc.) para la autenticación, generalmente implementan sus propios sistemas de autenticación. Desafortunadamente, la autenticación del usuario es bastante sutil y también muy importante. Por lo tanto, es probable que haya debilidades sutiles y/o catastróficas en los sistemas de autenticación, ya que los desarrolladores y desarrolladoras cometen los mismos errores una y otra vez. Aunque la posible gama de vulnerabilidades es ilimitada, existen algunas comunes que exploraremos en este subtema.

Diríjase al [tema Autenticación de PortSwigger Academy](https://portswigger.net/web-security/authentication) y complete la lectura y los laboratorios.

#### Autorización

Es muy raro que las estructuras de aplicaciones web proporcionen automáticamente servicios de autorización a los desarrolladores y desarrolladoras, por lo que deben implementar sus propios sistemas de manera consistente. Aunque los controles de autorización suelen ser muy simples, en algunos lugares es muy fácil pasarlos por alto. Al igual que la implementación de controles de autorización, las pruebas de controles de autorización son simples en concepto, pero requieren una coherencia muy alta.

Generalmente, los controles de autorización se dividen en controles verticales y horizontales. La autorización vertical garantiza que los usuarios solo tengan las capacidades para las que están autorizados. Un ejemplo de esto podría ser que los remitentes de un sistema de emisión de boletos en línea no deberían poder acceder a la interfaz de administración. La autorización horizontal garantiza que los usuarios solo puedan acceder a los datos para los que están autorizados. Un ejemplo podría ser que los remitentes de un sistema de emisión de tickets deberían ver su propio historial de tickets pero no el de los demás.

Mientras se prueba la autorización, es muy eficaz tener varios perfiles de navegador (o incluso diferentes navegadores) abiertos a la vez, cada uno con un usuario diferente que ha iniciado sesión. De esa manera, si desea ver si el Usuario A tiene acceso a una página que solo el Usuario B debería poder ver, simplemente puede pegar la URL en la sesión del navegador del Usuario A. Es posible que estén involucradas otras comprobaciones (como solicitudes POST), pero siguen siendo mucho más rápidas con múltiples perfiles de navegador.

Diríjase al [tema Control de accesos de PortSwigger Academy](https://portswigger.net/web-security/access-control) y complete la lectura y los laboratorios.

## Verificación de Habilidades

PortSwigger academy contiene una serie de laboratorios que puede utilizar para probar y validar sus habilidades. Para cada uno de los siguientes temas, complete 1-3 de los laboratorios de nivel "profesional":

- [Autenticación](https://portswigger.net/web-security/all-labs#authentication)
- [Vulnerabilidades del control de acceso](https://portswigger.net/web-security/all-labs#access-control-vulnerabilities)

Si está trabajando con un compañero o mentor o mentora, explíquele cómo funciona cada ataque y cómo encontraría y demostraría la explotabilidad de vulnerabilidades similares en un sitio que estuviera probando.
