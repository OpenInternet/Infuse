+++
style = "module"
weight = 6
title = "Perfeccionando el Proceso de Prueba de su Aplicación Web"
description = "Una vez que haya descubierto los fundamentos para encontrar vulnerabilidades en sitios web, este subtema le enseñará un proceso para encontrar esas vulnerabilidades de manera más rápida y eficiente."
+++

## Caso de Uso

El subtema 5 es un requisito previo para este y se recomienda encarecidamente a los alumnos que lo lean detenidamente antes de continuar.

Si eres como la mayoría de las personas, la última práctica te costó. Probablemente le tomó mucho tiempo y probablemente pasó por alto un montón de vulnerabilidades. ¡No se desanime! Antes de comenzar con esto, habría encontrado muchos menos en mucho más tiempo. Puede que no se sienta muy bien, pero es muy difícil pasar de aprender sobre las vulnerabilidades de forma aislada a encontrarlas en un entorno abierto. Entonces, luchar y no tener mucho éxito es parte del proceso.

Una vez que haya descubierto los fundamentos para encontrar vulnerabilidades en sitios web, este subtema le enseñará un proceso para encontrar esas vulnerabilidades de manera más rápida y eficiente.

## Objetivos

Después de completar este subtema, los y las profesionales deberían poder comprender un enfoque metódico para la evaluación de la seguridad de las aplicaciones web que permita encontrar más vulnerabilidades en menos tiempo.

---
## Sección Principal

Existen algunos errores comunes que atrapan a las nuevas personas evaluadoras de aplicaciones web. Piensa si fuiste víctima de alguno de estos problemas mientras probabas Juice Shop:

- Saltando de un lado a otro por el sitio
- Centrarse primero en encontrar vulnerabilidades particulares, en lugar de probar completamente ciertas secciones.
- Obsesionarse con ciertas páginas/entradas y pasar mucho tiempo buscando vulnerabilidades fantasmas
- No informar las vulnerabilidades tan pronto como se encuentran y tener que volver atrás y volver a realizar pruebas para documentarlas.
- Secciones faltantes del sitio y/o clases de vulnerabilidad completas

Si hizo alguna de estas cosas, no se sienta mal. La mayoría de las personas luchan con esto, a menudo durante carreras completas como probadores y probadoras profesionales de aplicaciones web. Lo que puede hacer es desarrollar estrategias para evitar estos (y otros) problemas que hacen que sus pruebas sean lentas y poco confiables. Este subtema le mostrará algunas estrategias para comenzar.

### Estrategia 1: Proceso de Prueba

En el último subtema, introdujimos el concepto de una metodología para evaluaciones de seguridad de aplicaciones web, una forma de organizar y pensar en las pruebas. Ahora vamos a replantear esta estructura en un proceso. El problema con una estructura es que es demasiado general. Puede probar cualquier aplicación web utilizando la estructura, pero para cualquier aplicación específica, tendrá más éxito si se da más estructura.

#### Empezando

Al probar un sitio web, normalmente querrás dos usuarios en cada nivel de acceso, aunque esto puede variar. Considere un foro en línea. Querrá dos usuarios registrados, uno o dos moderadores y uno o dos usuarios administradores. Esto le permitirá probar completamente los controles de autorización del sitio. En el ejemplo anterior, las cosas que quizás quieras probar incluyen:

- ¿Pueden los usuarios editar las publicaciones de los demás?
- ¿Pueden los usuarios ver los mensajes privados de los demás?
- ¿Pueden los usuarios que no sean administradores ni moderadores realizar funciones de moderación?
- ¿Pueden los usuarios o moderadores que no sean administradores realizar funciones administrativas?

Si estaba probando un foro web que permitía múltiples subforos, es posible que necesite 3 usuarios normales (dos asignados al subforo A y uno al subforo B), dos moderadores y administradores (uno para cada subforo) y un superadministrador.

Una vez que tenga las cuentas de usuario que necesita, puede comenzar a crear un mapa del sitio. El mapa del sitio guiará sus pruebas y funcionará como su lista de verificación para las pruebas. Como ejemplo, podría producir algo como esto:

![Una tabla grande que enumera todos los elementos de una página web a los que puede acceder un usuario, junto con su URL y una lista de quién puede acceder a ellos: usuarios no autenticados, usuarios autenticados particulares, moderadores o administradores.](/media/uploads/web_security_assessment_testing_table1.png)

Esto muestra cada página que ha encontrado en la aplicación (columna “URL”), su navegación lógica, si el contenido de la página cambia dependiendo de sus parámetros (“¿Específico del usuario?”) y luego si cada tipo de usuario tiene acceso a la URL. También hay una columna de "notas" para que pueda recopilar información importante sobre la página, por ejemplo, si la página de perfil muestra contenido muy diferente dependiendo del usuario de la persona que ve la página o si la entrada de datos en una página aparece en otra. Es posible que algunos sitios no encajen bien en esta estructura particular. Lo cual está bien, la estructura debe ser específica del sitio, así que no dude en cambiarla. Sin embargo, algo como esto debería funcionar para la mayoría de los sitios.

Al crear esta hoja de cálculo, debe revisar todas las páginas del sitio y todos los roles de usuario del sitio. Esta es la mayor parte de la sección Descubrimiento de la metodología web utilizada en el subtema anterior. Entonces, obviamente, mientras crea el mapa del sitio, debe asegurarse de completar todas las pruebas de Descubrimiento.

⚠️ Esta parte del proceso es sumamente importante, pero puede resultar muy aburrida. Para animarlo, realice _algunas_ pruebas ad hoc mientras navega por el sitio. Tal vez verifique una entrada para XSS aquí, haga una pequeña verificación de autorización allí. Esto le ayudará a mantenerse interesado mientras navega por el sitio.

#### Pruebas por Sitio

Ciertas partes de la metodología se aplican a todo el sitio o a algunas partes del sitio. Cada servidor web tiene una configuración y la mayoría de los sitios web tienen entre uno y varios servidores lógicos (por ejemplo, [www.example.com](http://www.example.com), api.example.com, static.example.com). La mayoría de los sitios tienen una (o tal vez dos) secciones de inicio de sesión/registro/administración de cuentas y mecanismos de gestión de sesiones. Debería hacer estas pruebas a continuación. Hacerlo le permitirá sentirse productivo al completar rápidamente varias secciones de metodología y le dará la oportunidad de comprender los fundamentos estructurales del sitio web. A medida que realiza estas pruebas, es posible que encuentre más páginas web que originalmente se perdió. Si es así, está bien, ¡pero asegúrese de agregarlos a su hoja de cálculo!

La mayoría de las personas optan por guardar sus notas de estas pruebas en un archivo de texto, en lugar de en su hoja de cálculo de pruebas, pero haga lo que le parezca más natural.

#### Pruebas por Página

Ahora que comprende el sitio, puede sumergirse en la parte más importante de las pruebas del sitio: probar cada página (y cada entrada) para la batería completa de pruebas en el resto de la metodología. Habrá mucho a lo que seguir la pista, y si no se mantiene concentrado y no realiza un seguimiento, se perderá cosas. Afortunadamente, ha preparado una hoja de cálculo. Todo lo que necesita hacer es expandir esa hoja de cálculo y tendrá una lista de verificación completa:

![Una captura de pantalla de una tabla similar a la anterior, excepto que no hay más columnas que permitan a la persona que la completa marcar casillas para diversas autorizaciones, autenticación, XSS y otras vulnerabilidades que pueda encontrar.](/media/uploads/web_security_assessment_testing_table2.png)

Esto puede parecer desalentador, pero cada celda de esa hoja es una pequeña y discreta porción de trabajo que debería llevar una cantidad de tiempo limitada. Por lo general, es más efectivo recorrer el sitio completando las filas primero; elija una página y siga toda la metodología, en lugar de realizar una prueba en todo el sitio. A medida que avanza, coloque algo como "√" en las celdas a medida que las completa, o algo como "n/a" si las pruebas no aplican. Con el paso de las horas y los días, su lista de verificación se completará y podrá estar seguro de haber realizado pruebas completas.

⚠️ Es una buena idea mantener notas separadas en su documento de notas habitual mientras realiza esta prueba; desea mantener su hoja de cálculo limpia y clara.


### Strategy 2: Time-box tests

Obsesionarse con una página/entrada/etc en particular durante la prueba y pasar horas en ella es un error casi universal entre las personas que prueban aplicaciones web. Se dicen a sí mismas que están en la cúspide de un gran avance y que terminarán en 10 minutos. Lo siguiente que saben es que han pasado dos horas y se olvidaron de almorzar. (No todo el mundo hace esto. Pero si lo haces, estás en buena compañía). Si tiene tiempo infinito para probar un sitio, entonces esto no es un gran problema (a pesar de omitir comidas). Sin embargo, la mayoría de las veces tienes un tiempo limitado. Si se le acaba el tiempo porque se obsesionó con una página, puede dejar zonas enteras del sitio, plagadas de vulnerabilidades, sin probar. 

Si se queda atascado con frecuencia, configure un temporizador cada vez que inicie una celda en la hoja de cálculo de prueba. Asegúresate de no poder ver el cronómetro, mirar la cuenta regresiva del reloj es estresante. Con experiencia podrás adivinar cuánto tiempo debería durar una celda. Date un buen margen (alrededor del 50% o más). Entonces, si crees que puedes completar una celda en 10 minutos, configura un cronómetro para 15 o 20 minutos. La idea es que el cronómetro lte avise que tal vez estás obsesionado, no que lte motive a ir rápido. Si el cronómetro suena antes de que termines la celda, detengasete y evalúea. Si encontró una vulnerabilidad y está progresando en la creación de un exploit de demostración (por ejemplo, encuentra una inyección SQL y está configurando algo para extraer la base de datos), reinicie el temporizador y continúe. Sin embargo, si descubre que está persiguiendo alguna vulnerabilidad que quizás en realidad no exista, tome nota de su progreso hasta la fecha y pase a la siguiente celda. Si tienes tiempo al final de la prueba, podrás regresar.

Esta estrategia también tiene buenos beneficios para la salud. El proceso de restablecer el temporizador por celda también le brinda la oportunidad de levantarse y estirarse, tomar una bebida, asegurarse de hacer una pausa para comer, etc.




### Estrategia 3: Documente sobre el progreso

Esta estrategia se analizó en la sección anterior, pero la mayoría de la gente ignora el consejo al principio. Con suerte, en el proceso de completar la sección anterior, siguió los consejos o descubrió que escribir el informe al final no es una estrategia eficaz. Muchas personas tienen que aprender esta lección repetidamente a lo largo de toda su carrera realizando pruebas de seguridad, así que no se sienta tan mal si comete un error de vez en cuando.

En relación con esto, desea mantener notas efectivas. Muchas personas mantienen un archivo de notas en ejecución que incluye todo lo que piensan y las cosas raras que notan durante las pruebas, y otro archivo de notas que incluye más detalles sobre las vulnerabilidades que encuentran y conclusiones sobre el sitio que son demasiado detalladas o no están precisas para el informe.

Estas estrategias deberían prepararlo para el éxito en las pruebas de sitios web. Laos pondremos en práctica en la siguiente subsección de este subtema.


### Pensar en las vulnerabilidades a través de la lente del modelo OSI

El modelo OSI (interconexión de sistemas abiertos) sirve como estructura estandarizada para comprender la teoría de las redes informáticas, aunque las redes del mundo real se basan predominantemente en el modelo TCP/IP, más conciso. No obstante, el modelo OSI sigue siendo valioso para obtener una comprensión inicial de los conceptos de redes. Estas capas en conjunto permiten el buen funcionamiento de las redes informáticas, asegurando una transmisión de datos eficiente y confiable desde la aplicación hasta el nivel de hardware físico.

Dado que el modelo OSI es una de las formas principales en que pensamos sobre las redes, también es útil estar familiarizado con él cuando pensamos y buscamos vulnerabilidades potenciales.

| Número | Nombre            |
|--------|-------------------|
| capa 1 | APLICACIÓN        |
| capa 2 | PRESENTACIÓN      |
| capa 3 | SESIÓN            |
| capa 4 | TRANSPORTE        |
| capa 5 | RED               |
| capa 6 | ENLACE DE DATOS   |
| capa 7 | FÍSICO            |


El modelo OSI consta de siete capas:

1. **Aplicación:** Proporciona capacidades de red a programas informáticos, facilitando la transmisión de datos entre aplicaciones. Los datos recibidos en esta capa luego se pasan a la capa de presentación.
2. **Presentación**: Recibe datos de la capa de aplicación, a menudo en un formato específico de la aplicación. Estandariza el formato de los datos y maneja tareas como el cifrado y la compresión antes de pasarlos a la capa de sesión.
3. **Sesión**: Intenta establecer y mantener una conexión con otra computadora a través de la red. Gestiona sesiones de comunicación y sincroniza los intercambios de datos entre el host y las computadoras remotas.
4. **Transporte**: Selecciona el protocolo de transmisión (TCP o UDP) y descompone los datos en segmentos o datagramas manejables. TCP ofrece una transmisión confiable basada en conexión, mientras que UDP prioriza la velocidad.
5. **Red**: Determina el destino de la transmisión de datos utilizando direccionamiento lógico (por ejemplo, direcciones IP) para identificar la mejor ruta a través de la red. Los formatos de direccionamiento lógico comúnmente utilizados incluyen IPv4.
6. **Enlace de Datos**: Se centra en el direccionamiento físico agregando la dirección MAC (Control de acceso a medios) del punto final receptor al paquete de transmisión. También garantiza la integridad de la transmisión de datos y prepara los datos para la transmisión.
7. **Físico**: Maneja los aspectos a nivel de hardware de la transferencia de datos, convirtiendo datos binarios en señales para su transmisión a través de la red. Se encarga de enviar y recibir impulsos eléctricos que constituyen la transferencia de datos.

Los atacantes pueden violar cada capa del modelo [OSI debido a vulnerabilidades inherentes](https://www.pynetlabs.com/various-kinds-of-osi-layer-attacks/). Estas vulnerabilidades pueden surgir de errores de software, fallas de diseño y configuraciones incorrectas, que en conjunto brindan a los atacantes oportunidades para explotar las debilidades en las siete capas.

- Aplicación: Los ataques comunes dirigidos a esta capa incluyen Secuencias de Comandos entre Sitios (XSS), donde se inyectan scripts maliciosos en aplicaciones web para comprometer los datos del usuario o secuestrar sesiones.
- Presentación: Los atacantes pueden apuntar a esta capa con técnicas como ataques de formato de cadena o explotar vulnerabilidades en algoritmos de cifrado.
- Sesión: Los ataques a la capa de sesión incluyen el secuestro de sesión, donde un atacante intercepta y toma el control de la sesión de un usuario para obtener acceso no autorizado.
- Transporte: Los ataques a la capa de transporte pueden implicar inundaciones TCP SYN o inundaciones UDP, que abruman los recursos de la red al enviar muchas solicitudes de conexión.
- Red: Los ataques a la capa de red incluyen la suplantación de IP, donde los atacantes falsifican la dirección IP de origen de los paquetes para eludir las medidas de seguridad o lanzar ataques de denegación de servicio.
- Enlace de Datos: Los ataques dirigidos a la capa de enlace de datos pueden incluir inundaciones de MAC( MAC flooding) o ataques de suplantación del Protocolo de resolución de direcciones (ARP spoofing), que interrumpen la conectividad de la red o facilitan los ataques de hombre en el medio (Man-in-the-Middle, MitM).
- Físico: Los ataques a la capa física implican manipulación física, como escuchas de cables o interferencias de señales, para interrumpir la comunicación de la red o interceptar datos.

## Práctica

Esta práctica es similar a la de la subsección anterior, excepto que esta vez seguirá el proceso de prueba descrito anteriormente. Además, el sitio web que probarás es un poco más realista; fue creado para ser un sitio web con vulnerabilidades, en lugar de un sitio que contiene muchos desafíos. Como tal, debería sentirse más como probar un sitio web real.

1. [Instale DIWA](https://github.com/snsttr/diwa) (Docker es generalmente el método más sencillo)
2. Prepare su entorno de prueba como en el subtema anterior. Asegúrese de tener un informe en blanco, uno o más archivos de notas y una hoja de cálculo de prueba. Para esto último (y su trabajo futuro), no dude en copiar [esta plantilla](https://docs.google.com/spreadsheets/d/1NPDA-CI5t_X0krw2qMwcOOupIWXhMCfYiTZFeyv-A08/edit#gid=0).
3. ¡Empieza a probar! Siga el proceso descrito en este subtema y compare cómo se siente cuando estaba probando Juice Shop. Como antes, el objetivo es practicar. No busque respuestas ni tutoriales hasta que haya terminado.

## Verificación de Habilidades

Si tiene un mentor o mentora, revise su informe de con él o ella. Probablemente le resulte útil consultar [una lista de las vulnerabilidades presentes en DIWA](https://github.com/jeremiahblatz/diwa-answers/wiki/) disponibles (por favor, envíe adiciones si encuentra nuevas vulnerabilidades). Si ha encontrado la mayoría de ellas en un período de tiempo razonable (1 o 2 días), ¡felicidades!

Si no tiene un mentor o mentora, puede realizar una autoevaluación utilizando la lista anterior.
