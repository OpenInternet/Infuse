+++
style = "module"
weight = 8
title = "Próximos Pasos"
description = "Cómo seguir practicando y perfeccionando sus habilidades de evaluación de seguridad web"
+++

## Caso de Uso

En este punto, debería poder realizar evaluaciones de seguridad de sitios web de calidad profesional. Sin embargo, todavía tiene mucho que aprender en términos de gestión y perfeccionamiento del trabajo de prueba y también en términos de técnicas de prueba más oscuras y avanzadas. Este subtema cubre algunas rutas que puede tomar para continuar practicando y desarrollando sus habilidades.

## Objetivos

Después de completar este subtema, los profesionales deben saber cómo pueden continuar practicando y desarrollando sus habilidades de evaluación de seguridad de aplicaciones web.

---
## Sección Principal

Existen algunas rutas complementarias que puede utilizar para desarrollar y practicar las habilidades que ha adquirido en esta ruta de aprendizaje. Estas rutas no deberían impedirle realizar el trabajo real de evaluar la seguridad de los sitios web, pero pueden utilizarse durante el tiempo de inactividad.

### Ganando Profundidad

Como recordará, esta ruta de aprendizaje utilizó laboratorios de Portswigger Academy, pero no utilizó todos los laboratorios para los temas tratados. Si lo desea, puede regresar y probar suerte en los [laboratorios calificados como "expertos"](https://portswigger.net/web-security/all-labs). Tenga en cuenta que estas prácticas de laboratorio representan situaciones muy raras y, a menudo, resultan difíciles para los expertos y expertas en evaluación de seguridad de aplicaciones web.

### Ganando Amplitud

Esta Ruta de Aprendizaje cubrió los aspectos más importantes de la seguridad de las aplicaciones web, pero hay muchas más áreas.

Portswigger Academy tiene [temas](https://portswigger.net/web-security/all-topics) y [laboratorios](https://portswigger.net/web-security/all-labs) que no se incluyeron en esta Ruta de Aprendizaje. Si está interesado, no dude en examinarlos. Tenga en cuenta que si se registró para obtener una cuenta en Portswigger Academy, ésta realiza un seguimiento de las prácticas de laboratorio que ha realizado. Esto puede ayudarle a encontrar fácilmente nuevos laboratorios y áreas que no haya realizado.

Además, la [guía de pruebas OWASP](https://github.com/OWASP/wstg/tree/master/document) es una guía muy completa para las evaluaciones de seguridad de aplicaciones web y las vulnerabilidades que se pueden encontrar. Si dispone de unos minutos, suele ser interesante echar un vistazo al contenido en busca de temas que no reconoce y leer sobre ellos.

También es una gran idea leer periódicamente los informes de vulnerabilidad publicados por otros investigadores e investigadoras para comprender tanto sus metodologías como las debilidades que encontraron en los sitios web y las aplicaciones web. [Este informe](https://eaton-works.com/2024/01/17/ttibi-email-hack/) es un gran comienzo, ya que señala errores muy básicos cometidos en aplicaciones web y al mismo tiempo explica en profundidad cuánto daño podría causar un adversario que explotara esas vulnerabilidades. Sin embargo, tenga en cuenta que se centra en un sitio web que contiene errores particularmente atroces; la mayoría de las vulnerabilidades que usted u otros investigadores e investigadoras de seguridad encuentren no serán tan básicas.

### Adquirir Práctica y Experiencia

Lo más impactante que puede hacer para mejorar sus habilidades de prueba de aplicaciones web es probar aplicaciones web. Hay dos formas principales de hacerlo por su cuenta. La primera es verificar las aplicaciones web intencionalmente vulnerables en el [directorio de aplicaciones web vulnerables de OWASP](https://owasp.org/www-project-vulnerable-web-applications-directory/). Juice Shop y DIWA se encuentran entre ellos, y hay muchos más. Si tuvo dificultades para encontrar la mayoría de las vulnerabilidades en DIWA, este es un buen lugar para comenzar. Puedes descargar y practicar en estos sitios; [algunos de ellos incluso están alojados en línea](https://owasp.org/www-project-vulnerable-web-applications-directory/#div-online) para que no tengas que pasar por la molestia de descargar algo.

Una vez que esté seguro de encontrar vulnerabilidades en sitios intencionalmente inseguros, una buena forma de practicar es participar en programas de recompensas por errores (bug bounty program). En las recompensas por errores, los propietarios y propietarias de sitios dan permiso a las personas para probar sus sitios web y, por lo general, lo compensarán si les informa sobre una nueva vulnerabilidad. Con frecuencia, estos sitios ya cuentan con programas de seguridad maduros, por lo que las vulnerabilidades son pocas y espaciadas. Sin embargo, en lugar de intentar ser realistas, estos son sitios web reales, por lo que estás creando una experiencia del mundo real. Tenga en cuenta que algunas personas pueden ganarse la vida con programas de recompensas por errores, pero las técnicas que utilizan no son las mismas que las que se utilizan en las evaluaciones integrales de seguridad de aplicaciones web. Si su objetivo es practicar y desarrollar sus habilidades, lo mejor es realizar evaluaciones exhaustivas de los sitios con recompensas por errores y considerar cualquier compensación que reciba como una bonificación.

Las dos plataformas de recompensas por errores más importantes son [HackerOne](https://www.hackerone.com/hackers) y [Bugcrowd](https://www.bugcrowd.com/hackers/faqs/). Ambos servicios permiten a los propietarios y propietarias de sitios conectarse con "hackers" que desean probar sitios web. Ambos tienen listas de titularesde sitios participantes; generalmente, la mejor práctica es elegir un programa más nuevo que tenga pagos modestos. Esto debería ayudarle a encontrar un sitio donde sea más probable que encuentre vulnerabilidades. Por supuesto, al realizar pruebas, asegúrese de cumplir con las reglas del programa de recompensas por errores.

## Verificación de Habilidades

Esta verificación de habilidades aborda la ruta de aprendizaje de manera más amplia. Comprender el modelo OSI (Interconexión de Sistemas Abiertos) es crucial para comprender las capas de comunicación de la red y las vulnerabilidades que se pueden explotar en cada nivel. Puedes aprender un poco más sobre el modelo [aquí](https://www.cloudflare.com/es-la/learning/ddos/glossary/open-systems-interconnection-model-osi/) y en el [subtema 6 de esta ruta de aprendizaje](/en/learning-path/5/module-6/).

En una arquitectura de aplicación web típica, varias capas OSI desempeñan funciones distintas, desde gestionar la transmisión de datos hasta proteger los canales de comunicación. Este conjunto de preguntas de opción múltiple explora las capas OSI involucradas en la arquitectura de aplicaciones web, junto con las vulnerabilidades potenciales y los vectores de ataque correspondientes. Pruebe sus conocimientos sobre seguridad de redes y obtenga información sobre las capas donde comúnmente escudriñan las amenazas. Si es posible, discuta sus respuestas a esas preguntas con un compañero, compañera, mentor o mentora que lo ayudará a verificar que haya entendido correctamente el tema.  

1. ¿En qué capa OSI opera el protocolo TCP, que suele ser el objetivo de los atacantes para diversos tipos de ataques a la red?

A) Capa de Aplicación \
B) Capa de Transporte \
C) Capa de Red \
D) Capa de Enlace de Datos

{{< question title="Respuesta correcta" >}}
B) Capa de Transporte
{{< /question >}}

2. ¿Qué vulnerabilidad se asocia comúnmente con la capa de transporte (Capa 4) del modelo OSI, donde los atacantes intentan saturar los recursos de la red con un gran volumen de tráfico?

A) Secuencias de Comandos entre Sitios (XSS) \
B) Inyección SQL \
C) Denegación de Servicio (DoS) \
D) Autenticación Rota

{{< question title="Respuesta correcta" >}}
C) Denegación de Servicio (DoS)
{{< /question >}}

3. ¿En qué capa OSI normalmente operan los protocolos HTTP y HTTPS, lo que los convierte en un objetivo común para ataques como Secuencias de Comandos entre Sitios (XSS) e Inyección SQL?

A) Capa de Enlace de Datos \
B) Capa de Transporte \
C) Capa de Aplicación \
D) Capa de Presentación

{{< question title="Respuesta correcta" >}}
C) Capa de Aplicación
{{< /question >}}

4. ¿Qué vulnerabilidad se explota a menudo en la Capa de Aplicación (Capa 7) del modelo OSI, lo que permite a los atacantes inyectar código malicioso en aplicaciones web y comprometer los datos de los usuarios?

A) Denegación de Servicio (DoS) \
B) Secuencias de Comandos entre Sitios (XSS) \
C) Ataque de Hombre en el Medio (MitM) \
D) Ataque de Inundación SYN

{{< question title="Respuesta correcta" >}}
B) Secuencias de Comandos entre Sitios (XSS)
{{< /question >}}

5. ¿En qué capa OSI operan los enrutadores y conmutadores, y dónde pueden ocurrir vulnerabilidades como la suplantación de IP y la suplantación de ARP?

A) Capa Física \
B) Capa de Red \
C) Capa de Transporte \
D) Capa de Sesión  

{{< question title="Respuesta correcta" >}}
B) Capa de Red
{{< /question >}}

6. ¿Qué vulnerabilidad implica que los atacantes intercepten la comunicación entre dos partes, permitiéndoles escuchar información confidencial o modificar paquetes de datos?

A) Secuencias de Comandos entre Sitios (XSS) \
B) Ataque de Hombre en el Medio (MitM) \
C) Inyección SQL \
D) Desbordamiento de Búfer

{{< question title="Respuesta correcta" >}}
B) Ataque de Hombre en el Medio (MitM)
{{< /question >}}

7. ¿En qué capa OSI normalmente operan los firewalls y los sistemas de detección de intrusos (IDS), con el objetivo de filtrar y monitorear el tráfico de la red en busca de actividades sospechosas?

A) Capa de Aplicación \
B) Capa de Transporte \
C) Capa de Red \
D) Capa de Enlace de Datos  

{{< question title="Respuesta correcta" >}}
C) Capa de Red
{{< /question >}}

8. ¿Qué vulnerabilidad implica que los atacantes aprovechen las debilidades en la capa de red para redirigir el tráfico a destinos maliciosos o interceptar información confidencial?

A) Secuencias de Comandos entre Sitios (XSS) \
B) Suplantación de ARP \
C) Inyección SQL \
D) Falsificación de Solicitudes entre Sitios (CSRF)

{{< question title="Respuesta correcta" >}}
B) Suplantación de ARP
{{< /question >}}

9. ¿En qué capa OSI operan los protocolos de cifrado SSL/TLS, protegiendo los datos transmitidos a través de la red contra la interceptación y la manipulación?

A) Capa de Presentación \
B) Capa de Aplicación \
C) Capa de Transporte \
D) Capa de Red

{{< question title="Respuesta correcta" >}}
C) Capa de Transporte
{{< /question >}}

10. ¿Qué vulnerabilidad implica que los atacantes manipulen campos de entrada dentro de formularios web o URL para inyectar comandos SQL maliciosos, lo que podría conducir a un acceso no autorizado a la base de datos subyacente?

A) Secuencias de Comandos entre Sitios (XSS) \
B) Inyección SQL \
C) Denegación de Servicio (DoS) \
D) Ataque de Hombre en el Medio (MitM)

{{< question title="Respuesta correcta" >}}
B) Inyección SQL
{{< /question >}}


## Recursos de Aprendizaje

{{% resource title="Todos los Laboratorios | Portswigger academy" description="Durante esta ruta de aprendizaje, solo completó algunos de los laboratorios de Portswigger. Volver atrás y completar más, especialmente los difíciles, será una excelente práctica." languages="Inglés" cost="Gratis" url="https://portswigger.net/web-security/all-labs" %}}

{{% resource title="Guía de pruebas OWASP" description="Un documento muy completo sobre la seguridad de las aplicaciones web y las vulnerabilidades que puedes encontrar" languages="Inglés" cost="Gratis" url="https://github.com/OWASP/wstg/tree/master/document" %}}

{{% resource title="Hackear una compañía de seguros Toyota/Eicher Motors explotando su sitio web de calculadora de primas" description="Un buen artículo sobre un sitio web con errores de seguridad particularmente atroces que podrían brindarle a un atacante acceso de alto nivel y pasos básicos que podrían haber mitigado esas vulnerabilidades." languages="Inglés" cost="Gratis" url="https://eaton-works.com/2024/01/17/ttibi-email-hack/" %}}

{{% resource title="Programas de Recompensas por Errores: HackerOne" description="Esos programas le permiten ganar dinero mientras encuentran vulnerabilidades de seguridad y una excelente manera de probar aplicaciones de manera ética y verificar legalmente sus habilidades." languages="Inglés" cost="Gratis" url="HackerOne: https://www.hackerone.com/hackers" %}}

{{% resource title="Esos programas le permiten ganar dinero mientras encuentran vulnerabilidades de seguridad y una excelente manera de probar aplicaciones de manera ética y verificar legalmente sus habilidades." description="Programas de Recompensas por Errores: Bugcrowd" languages="Inglés" cost="Gratis" url="HackerOne: https://www.hackerone.com/hackers" %}}