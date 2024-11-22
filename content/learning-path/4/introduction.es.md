+++
style = "introduction"
weight = 1
title = "Introducción"
description = "Lea la descripción general de la ruta de aprendizaje, los objetivos, las amenazas asociadas y los requisitos previos."
+++


**Con agradecimiento a**

Michał "czesiek" Czyżewski (<https://czesiek.net>)

Yana Ghahramanyan


## Descripción general

Hay muchas formas en que los adversarios podrían intentar atacar sitios web, incluyendo:

- Negación de expresión: eliminación de sitios web, destrucción de sitios web, denegación de servicio
- Acceso a datos confidenciales: explotar controles de acceso u otras vulnerabilidades para acceder a información, por ejemplo, en bases de datos de aplicaciones, archivos o sistemas privados, bandejas de entrada privadas o áreas de miembros
- Implantación de malware (ataques de “abrevadero”): utilizar el acceso a un sitio web para colocar código malicioso o engañoso con el fin de lograr objetivos en los dispositivos de los visitantes
- Movimiento lateral (comprometiendo otros sistemas): obtener acceso a servidores completos, infraestructura en la nube o infraestructura de oficina o hogar
- Vigilancia de visitantes: obtener información sobre la IP o identidades de los visitantes de un sitio web o de los usuarios de una aplicación web
- Compromiso de la cadena de suministro: comprometer los servicios de distribución de software, los procesos de creación de software o las bibliotecas de componentes de software para lograr objetivos maliciosos en los usuarios del software objetivo
- Suplantación de sitios web: con fines de phishing, enturbiamiento de la reputación y distribución de malware/spyware
- Inyección de tráfico (ataques de degradación): explotar las debilidades de la infraestructura o la configuración de las comunicaciones con el fin de insertar contenido malicioso en un tráfico que de otro modo sería bueno

La seguridad de las aplicaciones web es un dominio de conocimiento técnico avanzado con muchas áreas de especialización. Esta Ruta de Aprendizaje le proporcionará una comprensión general de las vulnerabilidades de las aplicaciones web y cómo funcionan algunas de las más comunes. Debería ayudarle a comprender los tipos de vulnerabilidades que existen comúnmente en las aplicaciones web, las capacidades que estas vulnerabilidades brindan a los atacantes y cómo, en general, eliminar o mitigar estas vulnerabilidades.

**¿Qué es una aplicación web?**

Las aplicaciones web se refieren a una categoría más amplia de software que ejecuta servicios dinámicos disponibles a través de la web. Una página web es un tipo de aplicación web, aunque una página HTML estática generalmente no se considera como tal. Las aplicaciones web normalmente implican algún tipo de procesamiento, almacenamiento y recuperación de datos del lado del cliente y/o del servidor, con contenido dinámico. Generalmente dependen de infraestructura, como bases de datos, servidores adicionales o servicios en la nube (incluido el "código sin servidor"). Las plataformas CMS comunes, como WordPress o Drupal, son aplicaciones web. Muchas organizaciones despliegan varias aplicaciones para brindar funcionalidades internas o externas, como una base de datos de miembros, una herramienta de gestión de relaciones con los contactos, un sistema de información de salud, un sistema de emisión de tickets, herramientas operativas internas y muchas más. Algunas organizaciones desarrollarán sus propias aplicaciones web personalizadas que se ajusten a sus propios fines. Las principales plataformas de servicios de Internet como MailChimp, Slack, Canva, X, etc., también son aplicaciones web y su seguridad también afecta a sus usuarios; sin embargo, entidades tan grandes tienen sus propios equipos de seguridad y programas de recompensas por errores que realiza o fomenta revisiones profesionales de seguridad de aplicaciones web para ellos. Por otro lado, las organizaciones más pequeñas, para las que puerde que ustedestetrabajando a menudo, no tienen los recursos para realizar revisiones de seguridad de aplicaciones web y usted puede ser el primero en hacerlo.

**¿Qué son las vulnerabilidades?**

Hay muchos tipos de fallas que pueden aparecer en cualquier sistema complicado. Normalmente los consideramos errores habituales en los que el sistema permite a sus usuarios hacer menos de lo previsto. Algo así como "cuando hago clic en 'agregar al carrito', el sitio web simplemente devuelve una página de error". Sin embargo, algunas fallas permiten a los usuarios hacer más de lo previsto. Cuando estas fallas impactan negativamente al sistema o a sus otros usuarios, las consideramos vulnerabilidades. Ejemplos de vulnerabilidades incluyen fallas que permitirían a un usuario leer o modificar los datos de otros usuarios, tomar el control de la infraestructura subyacente de un sitio web, negar el uso de un sistema a otros usuarios, etc. Al pensar en las vulnerabilidades, resulta útil agruparlas por tipo. Esta Ruta de Aprendizaje proporciona una descripción general de las clases de vulnerabilidades comunes de las aplicaciones web y cómo un atacante podría usarlas para dañar un sitio web o a sus usuarios.


## Objetivo

Los profesionales aprenderán los conceptos fundamentales de la seguridad de las aplicaciones web, proporcionando la experiencia necesaria para profundizar en temas relacionados con la seguridad de las aplicaciones web. Los profesionales podrán comprender los conceptos clave de la seguridad de las aplicaciones web, que incluyen:

- Vulnerabilidades de la infraestructura
- Validación de datos
- Autenticación
- Autorización
- Vulnerabilidades de la lógica de negocio

## ¿Qué amenazas mitiga o responde esta habilidad?

- Brechas de seguridad en una aplicación web
- Apropiación de cuentas de una aplicación web
- Denegación de servicio de una aplicación web
- Ataques de “abrevadero”

## ¿Cuáles son los prerrequisitos?

- Familiaridad básica con HTML, como el diseño básico de un documento HTML y la capacidad de leer HTML simple. Para una excelente introducción, consulte [MDN](https://developer.mozilla.org/en-US/docs/Learn) .
- Conceptos básicos del lenguaje de programación y capacidad de leer JavaScript simple. Recomendamos la [introducción](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) de MDN al tema.
- Comprensión básica de cómo funciona HTTP, cómo se comunica un navegador con un sitio web y cómo son las solicitudes y respuestas HTTP. Para una introducción a esos temas, recomendamos [este artículo](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) y [este](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data).
- Un conocimiento básico de SQL, lo suficiente para saber qué es y cómo formular un comando simple. Para obtener una introducción, consulte [sqlzoo](https://sqlzoo.net/wiki/SQL_Tutorial).
- Familiaridad básica con el funcionamiento de la línea de comandos en un sistema operativo de su elección y cómo ejecutar comandos allí. Para una buena introducción, consulte [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line).
- Hay un ejercicio de verificación de habilidades en el subtema de autorización que requiere conocimientos básicos del lenguaje de programación Python (aunque es un código muy simple que también debería ser legible para quienes dominan otros lenguajes). Si no está familiarizado con los lenguajes de programación, puede omitir ese ejercicio.

## ¿Qué dispositivos o software necesitas para los ejercicios?

Para completar esta Ruta de Aprendizaje, utilizaremos un sitio web llamado DVWA (Damn Vulnerable Web App). DVWA es una aplicación web que es intencionalmente vulnerable a varios tipos de ataque. Requiere una configuración mínima para su uso y está disponible en línea para una experiencia sin configuración.

Hay varias formas de ejecutar DVWA. Las mejores instrucciones de instalación actuales se pueden encontrar en el [repositorio DVWA GitHub](https://github.com/digininja/DVWA). Como se destaca en la sección _Advertencia_ de esa página, DVWA no debe instalarse de manera que lo exponga a Internet abiertamente. Las opciones para ejecutarlo incluyen:

- El método más sencillo, si prefiere o no puede instalar DVWA localmente, es acceder a él en la instancia alojada [en línea en TryHackMe](https://tryhackme.com/room/dvwa). Si se registra para obtener una cuenta gratuita, inicia una máquina DVWA en el enlace y luego inicia un [AttackBox,](https://help.tryhackme.com/en/articles/6721845-the-attackbox-explained) puede completar todos los ejercicios directamente desde su navegador.
- Usar un servidor web alojado localmente en su propia máquina o en una máquina virtual. DVWA utiliza un PHP/MySQL (o MariaDB), por lo que la aplicación puede ejecutarse en cualquier dispositivo con esos servicios web. Eso se puede lograr mediante:
  - Utilice una Máquina Virtual para crear un sistema operativo Linux desde el cual (A) instalar una pila de servidor web local y configurar DVWA como lo haría con cualquier aplicación PHP/MySQL siguiendo las instrucciones de [este video](https://youtu.be/Yzksa_WjnY0), (B) utilizar el [script de instalación en Linux](https://github.com/digininja/DVWA?tab=readme-ov-file#automated-installation-%EF%B8%8F) proporcionado en el archivo Léame del repositorio, o C) si usa Kali Linux, instalar DVWA desde el repositorio fuente de Kali usando _sudo apt-get install dvwa_.
    - La virtualización en dispositivos x86 se puede realizar con un hipervisor como Virtualbox
    - Los dispositivos MacOS Apple Silicon (M1/M2/M3) pueden ejecutar máquinas virtuales utilizando [UTM](https://mac.getutm.app/) o VMWare Fusion Player (con la [licencia de uso personal gratuita](https://www.vmware.com/products/fusion/fusion-evaluation.html)) y la versión Apple Silicon Installer del sistema operativo deseado (por ejemplo [Kali Linux](https://www.kali.org/get-kali/#kali-installer-images)). Utilice los [pasos de solución de problemas](https://docs.getutm.app/guides/kali/) de la Guía UTM en caso de que experimente un problema de pantalla negra.
    - Para obtener una guía sobre cómo configurar máquinas virtuales, siga el capítulo 6 de la [Guía de campo para la respuesta a incidentes para la sociedad civil y los medios](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf), pero descargue un Kali Linux imagine en lugar de uno REMNux (o use otros tutoriales escritos para su plataforma)
  - Convirtiendo su computadora en un servidor web usando [XAMPP](https://www.apachefriends.org/) (Windows o Linux) o [MAMP](https://www.mamp.info/en/windows/) (macOS incluido Apple Silicon) y siguiendo las instrucciones de configuración que se muestran [en este video](https://youtu.be/Yzksa_WjnY0).
- Alternativamente, si está familiarizado con Docker u otras tecnologías de contenerización, siga las [instrucciones de Docker](https://github.com/digininja/DVWA) en el repositorio de DVWA

Antes de comenzar cualquiera de los ejercicios, recuerde iniciar sesión en DVWA (las credenciales predeterminadas son administrador/contraseña) y asegurese de que el nivel de seguridad esté configurado en "Bajo".

![DVWA con configuración de nivel de seguridad bajo](/media/uploads/dvwa-setting1.png)

Un ejercicio de práctica requiere que instale y utilice una herramienta conocida como rainbowcrack. Debido a los altos requisitos del sistema y al hecho de que la herramienta solo funciona en Linux y Windows, hemos optado por hacer que este ejercicio sea opcional. Dado que el objetivo principal de este ejercicio es ilustrar un concepto de seguridad, los estudiantes que no puedan o no quieran completarlo aún podrán terminar toda la ruta de aprendizaje.

Un ejercicio opcional requiere conocimientos prácticos de Python básico y una instalación de Python. Los y las estudiantes que no estén familiarizados con Python o que no lo tengan instalado en sus sistemas pueden omitir este ejercicio.

## Rutas de Aprendizaje relacionadas

Esta Ruta de Aprendizaje proporciona una guía autónoma y coherente internamente sobre la seguridad de las aplicaciones web. Está pensado para leerse en unas cuantas sesiones breves y proporcionarle los conocimientos básicos necesarios para lograr un aprendizaje más profundo sobre la seguridad de las aplicaciones web. Las rutas de aprendizaje de seguimiento sugeridas incluyen:

- Ruta de Aprendizaje sobre **Evaluación de Seguridad de Aplicaciones Web:** Esta Ruta de Aprendizaje le enseñará el conocimiento detallado y las habilidades prácticas necesarias para probar un sitio web en busca de vulnerabilidades. Esta es la forma más eficaz de identificar las debilidades de una aplicación web antes de que lo hagan los atacantes. Esta Ruta de Aprendizaje de Fundamentos de Seguridad de Aplicaciones Web lo preparará para participar de manera efectiva con el conocimiento especializado requerido.
- Ruta de Aprendizaje sobre **Endurecimiento de Aplicaciones Web, Análisis Forense y Respuesta a Incidentes**: Esta Ruta de Aprendizaje lo prepara para responder a ataques contra una aplicación web. Para prepararse y responder a los ataques, necesita un conocimiento práctico de cuáles podrían ser esos ataques. Esta Ruta de Aprendizaje de Fundamentos de Seguridad de Aplicaciones Web debería brindarle la información suficiente para comprender qué información necesitará para detectar ataques contra un sitio web y cómo reconocer y responder a los ataques en curso.
