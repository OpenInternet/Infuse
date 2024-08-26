+++
style = "module"
weight = 3
title = "Autenticación"
+++

## Caso de Uso

En cualquier sitio web que tenga inicios de sesión de usuarios, es importante que el sitio proteja las cuentas de usuario del acceso no autorizado y también que las credenciales de la cuenta estén protegidas. Este subtema describe las áreas más comunes de autenticación donde aparecen fallas en las aplicaciones web.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de hacer lo siguiente:

- Comprender los tipos comunes de vulnerabilidades de autenticación
- Comprender los impactos potenciales de esos tipos de vulnerabilidades.
- Comprender los mecanismos mediante los cuales funcionan esas vulnerabilidades.
- Comprender, a grandes rasgos, cómo se pueden prevenir esas vulnerabilidades.


---

## Sección Principal

La autenticación es el proceso mediante el cual un usuario de un sistema demuestra que es quien dice ser. Es la base sobre la que se construye el control de acceso. Normalmente, un usuario proporcionará una información que lo identifica (nombre de usuario, dirección de correo electrónico, número de teléfono, etc.) y una información secreta que valida esa identidad (comúnmente una contraseña o frase de contraseña, aunque se utilizan métodos alternativos o adicionales como claves de seguridad, WebAuthn y Passkeys están ganando popularidad). Este subtema cubrirá algunas clases de vulnerabilidad que son comunes y de alto impacto en las aplicaciones web.

## Almacenamiento de contraseñas inseguro

Si los usuarios deben iniciar sesión en un sitio con un nombre de usuario y una contraseña, el sitio debe poder validar que el usuario ingresó la contraseña correcta. Además, las contraseñas deben almacenarse de forma segura en la base de datos de autenticación de la aplicación, porque esa base de datos podría verse comprometida debido a una inyección SQL, pérdida de copias de seguridad o incluso miembros maliciosos o comprometidos de la organización que ejecuta el sitio. Existen varios métodos para almacenar contraseñas:

- **Texto sin formato**  
    Obviamente, esta es la peor forma de almacenar contraseñas. Significa almacenar los caracteres exactos que el usuario escribió al configurar la contraseña. Si la base de datos de contraseñas se ve comprometida, los atacantes tendrán acceso completo a todas las contraseñas de los usuarios. Estas contraseñas no solo se pueden utilizar para acceder al sitio web en sí, sino que también se pueden utilizar en [ataques de reutilización de contraseñas](https://es.wikipedia.org/wiki/Credential_stuffing) contra otros sitios o aplicaciones.
- **Cifrado**  
    La solución obvia para el almacenamiento de contraseñas en texto plano es cifrar las contraseñas. Sin embargo, esto ofrece sólo una protección modesta contra muchas amenazas. La aplicación misma debe conocer la clave de cifrado y, por lo tanto, la clave debe almacenarse en algún lugar. Es casi seguro que personas internas malintencionadas o comprometidas con acceso a la base de datos tendrán acceso a la clave de cifrado. Además, existe una variedad de vulnerabilidades comunes en el servidor web que podrían permitir a atacantes remotos obtener acceso a la clave. Una vez que alguien obtenga la clave de cifrado, podrá descubrir las contraseñas.
- **Fragmentado**  
    Resulta que el servidor web nunca necesita recuperar la contraseña de un usuario del almacenamiento, simplemente necesita saber si la contraseña que el usuario ingresó era la misma que la contraseña real del usuario. Existe una clase de algoritmos denominados como [hashes criptográficos](https://es.wikipedia.org/wiki/Funci%C3%B3n_hash_criptogr%C3%A1fica) que realizan una transformación unidireccional de los datos. Ejemplos de estos algoritmos incluyen MD5 y SHA. Es efectivamente imposible, dado un hash, determinar qué datos de origen generaron el hash. Desafortunadamente, las contraseñas tienden a ser bastante cortas y las funciones hash criptográficas tienden a ser bastante rápidas. Para una función hash determinada, es posible aplicar hash a todas las contraseñas posibles de una longitud determinada y almacenar la contraseña y el hash resultantes. Luego, dado un hash de contraseña particular, uno puede simplemente buscar la contraseña que generó este hash. A mediados de la década de 2000, era factible calcular, almacenar y distribuir estas bases de datos, llamadas [tablas rainbow](https://es.wikipedia.org/wiki/Tabla_arco%C3%ADris), para uso general.  
    Una solución al problema de la tabla rainbow es agregar un poco de datos ([llamado sal](https://es.wikipedia.org/wiki/Sal_(criptograf%C3%ADa))) a la contraseña antes de aplicar hash en ella. Estos datos no necesitan ser secretos ni tener una entropía particularmente alta, solo deben ser diferentes según el usuario. Un enfoque común es combinar el nombre de usuario y la contraseña. Una tabla rainbow para hashes de contraseñas NTLM de Microsoft Windows de hasta 9 caracteres ocupa 6,7 ​​TB. Si esos hashes de contraseñas tuvieran incluso 5 caracteres alfanuméricos, esa tabla rainbow crecería a más de 6.000.000.000 TB. El problema con este enfoque es que los hashes siguen siendo bastante rápidos y las tarjetas gráficas modernas son esencialmente supercomputadoras masivamente paralelas. Una Nvidia RTX 4090 (una tarjeta de video de alta gama de 2022) puede calcular casi 400.000.000.000 hashes SHA salados por segundo, lo que permite a particulares descifrar la mayoría de las contraseñas en minutos u horas.

**Algoritmos especiales de almacenamiento de contraseñas**  
El problema con los hashes criptográficos es que están diseñados para ser rápidos y eficientes. La mayor parte de su uso es para verificar que los datos no hayan sido manipulados. Este problema se había solucionado ya en 1976, con una [función de cifrado de Unix](https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html) que salaba y cifraba la contraseña varias veces para ralentizar la fuerza bruta. Como era de esperar, este algoritmo no resistirá los recursos informáticos modernos, pero la idea general todavía se utiliza hoy en día con algoritmos especiales diseñados para almacenar derivados de contraseñas. Estos algoritmos están diseñados para utilizar recursos de memoria y CPU ajustables, para lograr un buen equilibrio entre rendimiento y resistencia a la fuerza bruta. Los buenos algoritmos de manejo de contraseñas incluyen (en orden decreciente de preferencia) [scrypt, argon2, bcrypt y PBKDF2](https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/). Como medida de defensa en profundidad, es una buena práctica combinar la contraseña del usuario con un secreto que no esté almacenado en la propia base de datos. Por ejemplo, el secreto puede estar codificado en la propia aplicación. Es probable que esto impida la recuperación de la contraseña si solo se pierde la base de datos de contraseñas.

## ¡Inténtalo tú mismo

Inicia sesión en tu DVWA y asegúrate de que el nivel de seguridad esté bajo. Navegue a la sección Inyección SQL e ingrese lo siguiente en el cuadro de texto

`​​999' union all select user, password from users where '1'='1`

Esto devolverá el nombre y apellido de todos los usuarios que tienen un ID de usuario de 999 (no hay ninguno), y también el hash de nombre de usuario y contraseña de todos los usuarios. Utilice un sitio de búsqueda de hash en línea (por ejemplo, <https://www.whatsmyip.org/hash-lookup/>) para buscar el hash de contraseña del usuario administrador. ¿Qué tipo de hash se utiliza para almacenar las contraseñas de los usuarios de DVWA? ¿Cuál es la contraseña del usuario llamado “1337”?

Para obtener más información sobre el manejo de contraseñas, consulte la [hoja de referencia sobre almacenamiento de contraseñas de OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

## Restablecimiento de contraseña

Si el usuario de un sitio web olvida su contraseña, la mayoría de los sitios proporcionan una forma automatizada para que el usuario verifique su identidad para establecer una nueva contraseña. Idealmente, estos métodos son aproximadamente tan seguros como el proceso de verificación de contraseña estándar en el que el usuario ingresa una contraseña secreta que conoce en una página web, pero son significativamente menos convenientes.

La mayoría de los sitios asumirán que la cuenta de correo electrónico del usuario es razonablemente segura y le enviarán por correo electrónico un enlace que le permitirá restablecer su contraseña. Esta suposición probablemente sea correcta para la gran mayoría de cuentas de usuario en la gran mayoría de sitios web. Los enlaces para restablecer contraseña (y, además, los enlaces de "inicio de sesión mágico") deben tener las siguientes propiedades para minimizar el riesgo del usuario:

- Los enlaces deben dirigirse a la versión cifrada TLS del sitio. (Tenga en cuenta que no existe una forma factible de garantizar que el correo electrónico en sí esté cifrado en tránsito, pero es más probable que se intercepte el tráfico de red del usuario final, como un usuario que accede a una página web, que el tráfico entre servidores, como los correos electrónicos enviados desde un servidor a otro.)
- El enlace debe tener un token de acceso que contenga alrededor de 128 bits de datos generados aleatoriamente a partir de un generador de números aleatorios criptográficamente sólido. Tenga en cuenta que 128 bits de datos ocuparán 172 o más caracteres cuando se codifiquen en una URL. No existe ninguna ventaja real en utilizar más de 128 bits de datos, y utilizar 128 bits significa que no se requiere protección adicional de fuerza bruta.
- El token de acceso debe tener un límite de tiempo (por ejemplo, caducar después de una hora) y ser de un solo uso. La naturaleza de un solo uso no sólo limita la capacidad de un atacante para cambiar la contraseña de un usuario, sino que también puede alertar al usuario en el caso de que un atacante logre obtener el token y cambiar la contraseña del usuario.
- El token en sí debe estar vinculado a la cuenta del usuario, evitando que los usuarios utilicen el token para cambiar la contraseña de otro usuario.

Los enlaces de reinicio también se pueden enviar por SMS. Es menos probable que los piratas informáticos normales intercepten los SMS que los correos electrónicos, pero son vulnerables a la interceptación por parte de los gobiernos del país en el que se encuentra el usuario. Si se envía un token más corto (por ejemplo, un PIN) por SMS, entonces es importante tener una fuerte protección de fuerza bruta en la página que acepta el PIN, por ejemplo, un PIN de 10 minutos de duración y limitación de velocidad. Tenga en cuenta también que existen ataques [DoS simples y rentables](https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/) que implican hacer que un servidor envíe mensajes SMS a un número de teléfono elegido por el atacante. Al realizar una gran cantidad de restablecimientos de contraseñas por SMS, un atacante puede generar altos costos para el operador del sitio web y potencialmente ganar dinero en el proceso.

Un método alternativo para realizar restablecimientos de contraseña implica hacer preguntas al usuario cuyas respuestas tanto el sitio web como el usuario conocen, pero que un atacante tal vez no. Estos tienden a ser métodos extremadamente débiles o sólidos para verificar la identidad del usuario. Las “preguntas secretas” estándar, como preguntar dónde nació el usuario, el apellido de soltera de su madre, la marca de su primer automóvil, etc., son bastante débiles. En primer lugar, un atacante puede encontrar fácilmente la respuesta a esas preguntas. En segundo lugar, la mayoría de ellos son imposibles de cambiar, por lo que, en caso de que un atacante descubra una respuesta (incluso comprometiendo otro sitio web), podrá utilizarlos una y otra vez. Por último, la mayoría de estas preguntas sólo tienen un puñado de respuestas comunes. Por ejemplo, si le preguntas a un coreano el apellido de soltera de su madre, una proporción significativa de las respuestas será "Kim" o "Lee". El otro tipo de pregunta secreta, más seguro, implica comunicaciones fuera de línea entre el sitio web y el usuario. Ejemplos de esto son cosas como facturas de servicios públicos y extractos bancarios. Para que el usuario restablezca su contraseña, deberá ingresar, por ejemplo, los montos de la tercera y quinta transacción en su extracto bancario. Al usuario solo se le permitirían unos pocos intentos y luego tendría que realizar un proceso de reinicio aún menos conveniente con el servicio de atención al cliente. Este proceso de reinicio puede ser muy seguro, aunque en la época de los estados de cuenta en línea, probablemente sea menos seguro que enviar un token por correo electrónico.

Para obtener más información sobre el restablecimiento seguro de contraseña, consulte [la hoja de referencia de OWASP en Olvidé mi Contraseña](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html). Para una exploración en profundidad de las vulnerabilidades de autenticación y autorización, consulte la [Ruta de Aprendizaje de Evaluación de Seguridad de Aplicaciones Web](/es/learning-path/5/).

## Fortaleza de la credencial

La mayoría de las aplicaciones web utilizan contraseñas para la autenticación, aunque están ganando popularidad técnicas como la autenticación web que utiliza claves de seguridad y sesiones de autenticación de duración extremadamente prolongada combinadas con enlaces de inicio de sesión por correo electrónico. Si un sitio web utiliza contraseñas, es importante que esas contraseñas sean seguras. Sin embargo, la definición de contraseña "segura" ha cambiado a lo largo de los años. Hay tres métodos principales que utilizan los atacantes para atacar directamente las contraseñas de los usuarios:

1. **Adivinación en línea mediante la reutilización de contraseñas** En este ataque, un atacante utiliza contraseñas conocidas asociadas con el usuario y simplemente prueba esas contraseñas en el formulario de inicio de sesión del sitio. Dado que muchas personas utilizan las mismas contraseñas en varios sitios web, este ataque puede resultar devastadoramente eficaz. Los nombres de usuario y contraseñas de sitios comprometidos están ampliamente disponibles en la web pública, la web oscura y a la venta en sitios web privados. Los atacantes pueden simplemente ingresar todas las contraseñas conocidas de un usuario determinado; Si el atacante se dirige a un pequeño número de usuarios, este ataque ni siquiera requiere automatización.
2. **Fuerza bruta en línea mediante relleno de credenciales** El "relleno de credenciales" es un tipo de ataque en el que un cliente de software (ya sea un navegador web con script a través de algo como [Selenium](https://www.selenium.dev/) o un script personalizado) intentará iniciar sesión automáticamente en el sitio de destino. Además, estos ataques pueden utilizar un conjunto distribuido de servidores proxy que parecen provenir de una variedad de computadoras diferentes. La tasa de estos ataques generalmente está limitada por la velocidad del servidor web y la latencia de la red, por lo que los atacantes generalmente tendrán cuidado de elegir solo las credenciales más probables para probar. Por ejemplo, a menudo limitarán los nombres de usuario a un conjunto específico, o a nombres de usuario buenos y conocidos si hay una [vulnerabilidad de enumeración de nombres de usuario](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account) [y](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account) en el sitio. (Tenga en cuenta que, en la mayoría de los casos, evitar la enumeración de nombres de usuarios es una defensa en profundidad y no debería ser una alta prioridad para las aplicaciones web). Además, el atacante intentará priorizar las contraseñas probables, utilizando volcados de contraseñas para probar contraseñas reutilizadas y probando contraseñas de uso común.
3. **Fuerza bruta fuera de línea** Si el atacante logró adquirir una copia de la base de datos de contraseñas de la aplicación (por ejemplo, mediante inyección SQL), probablemente intentará aplicar fuerza bruta a las credenciales almacenadas. Dependiendo de cómo se almacenen las credenciales y de las capacidades del hardware del atacante, los atacantes pueden probar cientos de billones de contraseñas por segundo, o cientos. En cualquier caso, una vez que el atacante tiene la base de datos de contraseñas, la aplicación no puede detectar ni detener el ataque. Los atacantes generalmente darán prioridad a las contraseñas probables en este ataque, pero si están muy bien financiados o si el algoritmo de almacenamiento de contraseñas es débil, el atacante puede comenzar a enumerar todas las contraseñas posibles.

De estos ataques, los ataques en línea son mucho más comunes. Idealmente, las aplicaciones no serían vulnerables a las inyecciones de SQL, los usuarios internos no se verían comprometidos ni actuarían maliciosamente y las copias de seguridad de las bases de datos nunca se perderían. Sin embargo, sería irresponsable ignorar la posibilidad de un ataque fuera de línea. Ante esto, las prioridades de una aplicación web deberían ser (en orden):

1. **Evite la reutilización de contraseñas, especialmente con contraseñas comprometidas conocidas**. Esto es imposible de hacer por completo y también puede presentar problemas en la interfaz de usuario. Sin embargo, existen servicios como los de [Have I Been Pwned](https://haveibeenpwned.com/) (inglés, [las suscripciones para el uso de API comienzan en 40 dólares al año](https://haveibeenpwned.com/API/Key)), [Hold Security](https://holdsecurity.com/solutions/credential-integrity-service/), [SpyCloud](https://spycloud.com/products/consumer-ato-prevention/), etc, que pueden indicarle si un nombre de usuario y una contraseña concretos han aparecido en un volcado de contraseñas. [Las compilaciones de volcado de contraseñas](https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/) también se pueden descargar y verificar localmente.
2. **Evite el uso de contraseñas comunes** Las páginas que permiten a los usuarios establecer su contraseña deben comparar la contraseña del usuario con una lista de las contraseñas más comunes (generalmente obtenidas de volcados de contraseñas). Algunas de esas listas están disponibles en [GitHub](https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials). Tenga en cuenta que los atacantes utilizarán las mismas listas, por lo que es poco probable que simplemente bloquear las 100 o 1000 contraseñas más comunes sea muy eficaz.
3. **Asegúrese de que las contraseñas tengan suficiente entropía para resistir ataques de fuerza bruta**. Aunque algo como “w)\*l3” no es una contraseña común, se descubrirá rápidamente en un ataque de fuerza bruta. Establecer una longitud mínima de contraseña puede ayudar a mitigar los ataques de fuerza bruta.

Por supuesto, estas prioridades deben equilibrarse con los requisitos del usuario de utilizar un administrador de contraseñas o recordar su contraseña. Además, las contraseñas como método de autenticación son bastante problemáticas; la siguiente sección cubre la autenticación multifactor y las alternativas de contraseña.

Para obtener más información sobre la seguridad de la contraseña, consulte [este resumen de las pautas de autenticación NIST del gobierno de EE. UU.](https://blog.netwrix.com/2022/11/14/nist-password-guidelines/).

## Autenticación Multifactor

Como habrás deducido de la sección anterior, la seguridad de las contraseñas es muy difícil. La situación empeora cuando se consideran los ataques de ingeniería social como el phishing.

### Phishing y Ataques Relacionados

El [Phishing](https://es.wikipedia.org/wiki/Phishing) pertenece a una clase de ataques de ingeniería social que los atacantes utilizan para atacar a individuos. Aunque el phishing puede tener muchos objetivos (como convencer a los usuarios para que instalen malware en sus computadoras o transfieran dinero a los atacantes), el objetivo que nos importa es robar las contraseñas de los usuarios. Aunque el phishing suele referirse a ataques lanzados por correo electrónico, se pueden utilizar técnicas similares a través de una variedad de medios de comunicación, como SMS, WhatsApp, Signal e incluso códigos QR.

En una campaña típica de phishing de credenciales, los atacantes envían correos electrónicos a sus víctimas supuestamente enviados desde un sitio web legítimo. El correo electrónico contendrá una llamada a la acción (como solicitar un cambio de contraseña o confirmar una notificación) con un enlace a un sitio web controlado por un atacante que tiene una página de inicio de sesión de apariencia legítima. Si una víctima hace clic en el enlace y luego ingresa su contraseña en el sitio web, el sitio envía su contraseña al atacante. (Para obtener más información sobre el phishing, consulte la [Ruta de Aprendizaje sobre la Investigación de Infraestructuras Maliciosas](https://docs.google.com/document/d/13if8JvR_TsGxja0Il48NBM-S1LKs29w_R_3LxxiLxS4/edit).)

Los ataques de phishing tienen un costo extremadamente bajo para los atacantes y tienden a ser extremadamente efectivos. Una vez que el atacante tiene la contraseña de la víctima, puede iniciar sesión en el sitio web objetivo como víctima. Con preparación, el atacante puede utilizar la automatización para realizar acciones inmediatas en la cuenta de la víctima, incluido cambiar la dirección de correo electrónico y la contraseña del usuario para bloquear a la víctima fuera de su propia cuenta.

Dado el peligro de los ataques de phishing y la total incapacidad de la autenticación con contraseña para detener el phishing, cualquier esquema de autenticación multifactor debe evaluarse frente a su resistencia al phishing.

### Descripción General de la Autenticación Multifactor

Tradicionalmente, existen tres tipos de elementos (llamados factores) que se pueden utilizar para la autenticación:

- **Algo que sabes**. La forma más común de esto es la contraseña; es algo que usted (y con suerte sólo usted) sabe. Esto es muy popular porque es muy fácil generar una contraseña secreta y, en general, fácil de cambiar.
- **Algo que tienes**. La forma más común de esto es una clave; es algo que tienes y que es difícil de reproducir. Esto es menos popular porque es fácil de perder, difícil de configurar inicialmente y difícil de cambiar.
- **Algo que eres** La forma más conocida de esto es la huella digital, pero el reconocimiento facial es cada vez más popular; es algo intrínseco a ti. Estos son sorprendentemente fáciles de "perder" (como una quemadura que daña las huellas dactilares), extremadamente difíciles de cambiar intencionalmente y la verificación tiende a ser propensa a errores.

MFA (autenticación multifactor) combina dos o más de estos factores para fortalecer el sistema de autenticación de un sistema. Hay muchos ejemplos de autenticación multifactor en la vida cotidiana. Usar un cajero automático requiere algo que tienes (la tarjeta) y algo que sabes (tu PIN). Muchos sistemas de control de acceso a edificios tienen una tarjeta para abrir una puerta, pero esa tarjeta también muestra la cara del titular de la tarjeta en una pantalla que un guardia puede ver, combinando algo que usted tiene (la tarjeta) con algo que es (su cara).

En el resto de esta subsección, analizaremos una variedad de métodos comunes de MFA web.

### Preguntas Secretas

Aunque técnicamente esto no es MFA (combina varias cosas que el usuario sabe), fue muy popular en el pasado y todavía se usa en muchos contextos. El uso de preguntas secretas como parte de la autenticación proporciona cierto grado de defensa contra la reutilización de contraseñas y los ataques de adivinación de contraseñas. Más allá de eso, proporciona muy poca protección. Es casi inútil contra el phishing. El sitio web del atacante puede simplemente intentar iniciar sesión en el sitio web real y luego darse la vuelta y hacerle al usuario las preguntas secretas. Además, como se analizó en la subsección anterior Restablecimiento de contraseña, las respuestas a las preguntas secretas con frecuencia se pueden adivinar. Por estas razones, las preguntas secretas no son un método eficaz de MFA.

### Códigos SMS

Un método MFA real de uso común es enviar un mensaje de texto al usuario con un código cuando inicia sesión y luego solicitar ese código para completar el proceso de inicio de sesión. Esto combina algo que el usuario sabe (su contraseña) con algo que tiene (el teléfono que recibe mensajes en un número determinado). Desafortunadamente, los códigos SMS son casi inútiles contra el phishing. Cuando el usuario inicia sesión en el sitio web falso controlado por el atacante, el sitio web falso iniciará sesión en el sitio web real. El sitio web real enviará un mensaje de texto al usuario y el usuario luego ingresará el código en el sitio web falso. Luego, el sitio falso utiliza el código del sitio real y luego inicia sesión como víctima. Además, [los ataques de intercambio de SIM](https://es.wikipedia.org/wiki/SIM_swapping) pueden permitir a los atacantes hacerse cargo del número de teléfono de la víctima, lo que les permite recibir mensajes SMS destinados a la víctima. Por estos motivos, los códigos SMS no son un método MFA sólido para sitios web sensibles o importantes.

### TOTP

TOTP significa Contraseña de Un Solo Uso basada en tiempo. Para iniciar el sistema, el servidor y un dispositivo controlado por el usuario intercambian un secreto criptográfico (la "semilla") y sincronizan sus relojes. Luego, cuando un usuario desea autenticarse en un sitio web, el dispositivo del usuario realiza una operación criptográfica en la semilla y la hora actual, generando un código que solo es válido por segundos o minutos. El servidor realiza la misma operación y la utiliza para verificar el código del usuario. En el pasado, el sistema TOTP más común eran los RSA SecureID, que eran caros. Ahora, la mayoría de los sistemas TOTP se ejecutan en teléfonos inteligentes. Los ejemplos incluyen Google Authenticator y Authy. De todos modos, TOTP funciona como algo que usted tiene (la semilla TOTP) para fines de autenticación.

Al igual que los códigos SMS, TOTP también es vulnerable al phishing. El sitio falso controlado por el atacante puede simplemente pedirle al usuario su código TOTP y utilizarlo para iniciar sesión en el sitio real. Por esta razón, TOTP no es un método MFA sólido para sitios web sensibles o importantes. También tenga en cuenta que si un usuario pierde o borra su teléfono, es poco probable que pueda autenticarse en el sitio, ya que ha perdido su semilla TOTP.

### Claves de Seguridad

Las claves de seguridad (a veces denominadas U2F, FIDO, WebAuthentication, Yubikeys, etc.) son dispositivos que implementan un [protocolo de autenticación criptográfica](https://developers.yubico.com/U2F/Protocol_details/Overview.html). Cuando registra una clave de seguridad en un sitio web, el sitio y la clave intercambian la clave pública. Para la autenticación posterior, el servidor presenta un desafío firmado al dispositivo. El dispositivo verifica la firma del sitio y luego responde con una respuesta firmada. Finalmente, el servidor verifica la firma del dispositivo. Esto le demuestra al servidor que usted está en posesión de la clave que se registró inicialmente, lo que la convierte en algo que tiene. Tradicionalmente, las llaves de seguridad eran dispositivos independientes que se comunicaban con una computadora o dispositivo móvil a través de USB o NFC, aunque en algunas configuraciones está disponible el soporte para el uso de teléfonos inteligentes y computadoras.

A diferencia de las otras MFA analizadas aquí, las claves de seguridad son resistentes al phishing. La clave aquí es que el desafío firmado incluya la identidad del sitio web que solicita la autenticación. Para un sitio válido, coincidirá con una clave de sitio existente en el dispositivo. Para un sitio similar controlado por un atacante, el sitio no coincidirá con ninguna clave de sitio existente, por lo que no se realizará ninguna MFA. Por lo tanto, el atacante puede tener la contraseña del usuario, pero no podrá completar la autenticación en el sitio web de destino, ya que no hay forma de que el atacante complete el proceso MFA. El lado negativo es que las llaves de seguridad se pueden perder. Generalmente, los sitios que utilizan claves de seguridad permitirán a los usuarios registrar varias claves, de modo que si una se pierde o se daña, se pueda utilizar una copia de seguridad.

### Contraseñas de un solo uso

Las contraseñas de un solo uso pregeneradas a veces se utilizan como respaldo para otros métodos MFA y se [usaban para aplicaciones de alta seguridad](https://www.researchgate.net/figure/A-typical-one-time-password-OTP-scheme-used-by-European-banks-Stahlberg-2007-p-2_fig3_49279643) antes del uso generalizado de los teléfonos inteligentes. Los sitios web modernos frecuentemente se refieren a estos como "códigos de respaldo". El servidor generará una lista de códigos, los almacenará y los presentará al usuario. El usuario generalmente los imprimiría y guardaría el papel en un lugar seguro. Cada vez que se utiliza un código, el servidor lo marca como no válido. Estos están sujetos a las mismas debilidades que TOTP, pero tienen la ventaja perversa de ser muy inconvenientes. Como tales, se utilizan con frecuencia como respaldo para otros métodos MFA. La esperanza es que su uso sea lo suficientemente raro como para que, si se le solicita a un usuario que ingrese un código de respaldo, se detenga y examine minuciosamente el sitio web solicitante, lo que hace que sea menos probable que un ataque de phishing tenga éxito. Ejemplos de sitios que utilizan códigos de respaldo son [Gmail](https://support.google.com/accounts/answer/1187538?hl=es) y [GitHub](https://docs.github.com/es/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods).

Para obtener un poco más de autenticación, consulte [la hoja de referencia de autenticación OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) y [la hoja de referencia de OWASP MFA](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html). Para una exploración en profundidad, consulte la Ruta de Aprendizaje sobre [Evaluación de Seguridad de Aplicaciones Web](/en/learning-path/5/).

## Reparación de sesión

La [reparación de sesión](https://owasp.org/www-community/attacks/Session_fixation#:~:text=Session%20Fixation%20is%20an%20attack,specifically%20the%20vulnerable%20web%20application.) es un concepto importante en la seguridad web. Se refiere a un ataque en el que un atacante establece el identificador de sesión de un usuario (ID de sesión) en un valor conocido por el atacante. Esto puede ocurrir a través de varios medios, como ataques de phishing o explotando vulnerabilidades en la aplicación web. El ataque implica adquirir una ID de sesión válida, persuadir a un usuario para que se autentique con ella y luego hacerse cargo de la sesión aprovechando la ID de sesión conocida. Esto requiere que el atacante proporcione una ID de sesión de aplicación web genuina y manipule el navegador de la persona objetivo para que la utilice. Luego pueden secuestrar la sesión del usuario y obtener acceso no autorizado a la cuenta del usuario.

La reparación de sesiones aprovecha las debilidades en la forma en que una aplicación web gestiona las ID de sesión. Básicamente, la aplicación vulnerable no puede asignar una nueva ID de sesión durante la autenticación del usuario, lo que permite al atacante utilizar una ID de sesión existente. A diferencia del secuestro de sesión, que ocurre después de iniciar sesión el usuario, la reparación de sesión establece control sobre una sesión antes de la autenticación del usuario.

Se pueden utilizar varias técnicas para ejecutar este ataque, dependiendo de cómo la aplicación web maneje los tokens de sesión:

1. Token de sesión en el argumento de la URL: El atacante envía el ID de sesión a la víctima a través de un hipervínculo, lo que lleva a la víctima a acceder al sitio a través de la URL maliciosa.
2. Token de sesión en un campo de formulario oculto: El atacante engaña a la persona objetivo para que se autentique en el servidor web de destino mediante un formulario de inicio de sesión desarrollado por el atacante, potencialmente alojado en un servidor ilegítimo o en un correo electrónico con formato HTML.
3. ID de sesión en una cookie:

- Guión del lado del cliente: Utiliza secuencias de comandos del lado del cliente para inyectar código malicioso, a menudo mediante ataques de secuencias de comandos entre sitios (XSS), en un hipervínculo, reparando un ID de sesión en la cookie de la persona objetivo mediante la función document.cookie.
- Etiqueta &lt;meta&gt;: Otra forma de ataque de inyección de código, que es más potente que XSS, ya que los navegadores no pueden desactivarlo ni rechazarlo fácilmente.
- Respuesta del encabezado HTTP: Explota las respuestas del servidor para incrustar el ID de sesión en el navegador de la víctima incluyendo el parámetro "Set-Cookie" en la respuesta del encabezado HTTP.

Muchas estructuras y bibliotecas web ofrecen funciones para ayudar a los desarrolladores a implementar una gestión segura de sesiones, lo que ayuda a mitigar las vulnerabilidades de reparación de sesiones. Estas estructuras suelen incluir mecanismos integrados para generar, almacenar y validar ID de sesión. Pueden permitir configurar la caducidad de la sesión, regenerar los ID de la sesión tras la autenticación y garantizar la transmisión segura de los datos de la sesión. Sin embargo, podría ser útil para los desarrolladores implementar de manera efectiva estas prácticas dentro del código de su aplicación, asegurando una configuración y uso adecuados para mitigar la reparación de sesiones y otras vulnerabilidades. Las actualizaciones periódicas de bibliotecas y estructuras son cruciales, ya que pueden contener parches o mejoras relacionadas con la seguridad de la gestión de sesiones.

### Prevención de Vulnerabilidades de Reparación de Sesiones

Para la mayoría de los administradores de servidores web, la mejor manera de mitigar las vulnerabilidades de reparación de sesiones es asegurarse de que la pila de software que utiliza para la autenticación contenga mitigaciones contra dichos ataques y también esté actualizada. Si está utilizando una biblioteca que tiene una vulnerabilidad que permite la reparación de sesiones, asegúrese de actualizarla lo antes posible.

Las aplicaciones web, bibliotecas y marcos toman varias medidas para mitigar los ataques de reparación de sesiones. Entre ellas se incluyen la generación de ID de sesión aleatorias para cada sesión de usuario, la caducidad de sesiones después de un período de inactividad y la implementación de medidas como la regeneración de ID de sesión tras la autenticación. Su aplicación web siempre debe utilizar HTTPS por motivos de seguridad y privacidad, y también ofrece una capa adicional de protección contra ataques de reparación de sesión: Es mucho más difícil interceptar las ID de sesión en tránsito si la comunicación entre el cliente y el servidor está cifrada. Finalmente, su aplicación web también debería rechazar los tokens de sesión impuestos externamente, lo que también ayudará a proteger contra este tipo de ataque.

Si va a codificar una aplicación web con capacidades de autenticación, le recomendamos que lea [este artículo](https://secureteam.co.uk/2018/11/25/understanding-session-fixation-attacks/) e implemente las siguientes medidas que recomienda, que ayudan a proteger la aplicación web contra ataques de reparación de sesión:

1. Evite aceptar ID de sesión mediante parámetros GET o POST, ya que esto mitiga el riesgo de explotación al minimizar la dependencia de las vulnerabilidades del navegador. Además, todas las ID de sesión deben ser generadas por el servidor, lo que elimina la necesidad de ID de sesión propuesta por el cliente.
2. Después de iniciar sesión, inicie un cambio de ID de sesión generando una nueva en el servidor y actualizándola como una cookie. Al mismo tiempo, invalide cualquier sesión existente asociada con el usuario.
3. Incorporar una función de cierre de sesión que permita a los usuarios finalizar sus sesiones rápidamente, garantizando así la terminación inmediata de la sesión del lado del servidor en lugar de simplemente eliminar la cookie del navegador. Además, implemente mecanismos de caducidad de sesiones para invalidar automáticamente los datos de la sesión después de un lapso de tiempo predefinido, limitando así la ventana de oportunidad para que los atacantes aprovechen las sesiones comprometidas.

## Práctica

### Ejercicio 1: Controles de acceso rotos

Vaya al sitio web Try Hack Me, cree una cuenta, pase por la sala llamada [Control de Acceso Roto OWASP](https://tryhackme.com/room/owaspbrokenaccesscontrol) y siga las instrucciones.

### Ejercicio 2: Uso de tablas rainbow para comprender mejor los mecanismos inseguros de almacenamiento de contraseñas (opcional)

Nota: _Si bien este ejercicio brinda una gran oportunidad de aprendizaje sobre cómo los adversarios pueden descifrar contraseñas mal protegidas, requiere bastante espacio libre en el disco y utiliza una herramienta que solo está disponible en Windows y Linux. Dado que es posible que no todos los alumnos puedan realizar este ejercicio de práctica, lo hemos marcado como claramente opcional. Alentamos a los estudiantes que quieran aprender más sobre las tablas Rainbow y el almacenamiento seguro de contraseñas, tanto aquellos que pueden como aquellos que no pueden realizar el siguiente ejercicio, a consultar más lecturas a través de publicaciones como_ [_esta_](https://cybr.com/certifications-archives/hash-tables-rainbow-table-attacks-and-salts/)_._

Al autenticar a los usuarios, necesitamos una forma de verificar si ingresaron las credenciales correctas. La forma más sencilla de hacerlo es almacenar la contraseña en una base de datos. Esto es inseguro, ya que cualquier persona con acceso a esa base de datos podría conocer las contraseñas en texto plano de los usuarios y serían reveladas en caso de una filtración o vulnerabilidad de la aplicación. En su lugar, se puede implementar una protección simple almacenando un [valor hash](https://es.wikipedia.org/wiki/Funci%C3%B3n_hash_criptogr%C3%A1fica) de la contraseña. Este ejercicio demostrará lo fácil que es romper dicha protección y aprender contraseñas en texto plano a partir de valores hash. **El objetivo de este ejercicio no es hacer creer a los alumnos que todos los mecanismos de autenticación se pueden romper fácilmente, sino más bien demostrar lo fácil que es romper contraseñas que sólo han sido codificadas sin ningún mecanismo de seguridad adicional como el salting.**

Las [tablas rainbow](https://es.wikipedia.org/wiki/Tabla_arco%C3%ADris) son una forma inteligente de reducir el tiempo de cálculo a cambio de espacio en disco cuando se intenta aplicar fuerza bruta a una contraseña hash. Consisten en cadenas de hashes precalculadas que se pueden utilizar para descubrir un valor hash (la contraseña en texto plano).

####  El ejercicio

Dado el valor hash de `168f3c743786fea2e04aeeee33e112da` , intente descubrir la contraseña utilizando tablas rainbow. 🌈 Use RainbowCrack (<http://project-rainbowcrack.com/>). La forma más sencilla de ejecutar RainbowCrack podría ser utilizar Kali Linux (<https://www.kali.org/>) en una VM o arrancado desde un LiveUSB (consulte los enlaces en la sección Información básica al comienzo de esta ruta de aprendizaje para obtener más información). El algoritmo hash es MD5 y el hash no tiene salting.

_Pista:_ la contraseña es alfanumérica en minúsculas, máx. 6 caracteres. Una vez que haya instalado RainbowCrack, puede usar el siguiente comando para generar la tabla requerida:

```
rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```

_(Opcional)_ Intente utilizar la tabla generada para romper otro hash: `feadfd87d487818698d63aedf385c4e2`.

_Pista:_ Si eso falla, puede intentar generar más tablas para aumentar la tasa de éxito de su conjunto de tablas (cobertura). Simplemente cambie el quinto parámetro del comando `rtgen` a valores diferentes (intente 1-5).

Intente romper el siguiente hash con salting: `93e99d25dd6e8f524f23814908b6c039`

#### El tutorial

Generar una tabla rainbow requiere especificar un algoritmo hash a usar, la longitud máxima de los valores de texto sin formato que interesan y su conjunto de caracteres. Esos parámetros solo influyen en el tiempo que lleva generar una tabla (cantidad de cálculo requerido).

Las tablas para contraseñas más cortas con conjuntos de caracteres más pequeños (por ejemplo, solo letras minúsculas) tardarán menos en generarse que las tablas para contraseñas largas con números y caracteres especiales.

Además, debe elegir cuántas cadenas generar y de qué longitud. Esos parámetros son más complejos de explicar (consulte [el documento técnico de Philippe Oechslin](https://www.iacr.org/archive/crypto2003/27290615/27290615.pdf) para obtener más información), pero tienen efectos en la cobertura de la tabla. En cada tabla rainbow solo se incluye un subconjunto de todos los valores de texto sin formato posibles.

Cuanto mayores sean los valores de estos parámetros, más grande y costosa (en términos de tiempo de CPU) será la tabla, pero también se podrán descubrir más valores de texto sin formato al utilizarla.

Las tablas precalculadas para diferentes funciones hash, longitudes de contraseñas y juegos de caracteres se pueden descargar de Internet (por ej., <https://freerainbowtables.com/>) u obtenido en conferencias de seguridad de TI y campamentos de hackers (consulte <https://dcddv.org/>). ¡Para los propósitos de este ejercicio, generaremos el nuestro propio!

Puede instalar Rainbowcrack en su sistema o usar Kali Linux Live. Para Kali, abra una ventana de terminal y ejecute:

```
sudo apt update
sudo apt install rainbowcrack
```

Esto instalará el software. Puede utilizar el comando rtgen para generar tablas. Según [su manual](http://project-rainbowcrack.com/generate.htm) el comando toma bastantes parámetros:

```
rtgen hash_algorithm charset plaintext_len_min plaintext_len_max table_index chain_len chain_num part_index
```

Usaremos MD5 como nuestro algoritmo hash. Buscaremos contraseñas con una longitud de 1 a 6 caracteres. Usaremos el conjunto de caracteres \` loweralpha-numeric\`, que incluye letras minúsculas y números únicamente. Usaremos 3800 para la longitud de la cadena, 1000000 para la cantidad de cadenas.

Para generar nuestra primera ejecución de tabla:

```
sudo rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```

Este comando puede tardar un poco en ejecutarse, dependiendo de la configuración de su sistema.

Después de la generación, se requiere un paso más antes de que podamos usar nuestras nuevas tablas:

```
sudo rtsort
```

Esto ordenará los datos para que el uso de la tabla sea más rápido. `rtcrack` se negará a trabajar con tablas sin clasificar.

Echemos un vistazo a nuestro primer hash:

```
rcrack . -h 168f3c743786fea2e04aeeee33e112da
```

Esto debería tomar solo un momento y revelar nuestra contraseña en texto plano:

```
1 rainbow tables found
memory available: 11361376665 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


plaintext of 168f3c743786fea2e04aeeee33e112da is 1nfus3


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.33 s
time of chain traverse:                      0.22 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4133612
number of alarm:                             3194
performance of chain traverse:               32.80 million/s
performance of alarm check:                  36.91 million/s


result
----------------------------------------------------------------
168f3c743786fea2e04aeeee33e112da  1nfus3  hex:316e66757333
```

¡Éxito! Ahora probemos nuestro segundo hash:

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

El resultado:

```
1 rainbow tables found
memory available: 11236982784 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


statistics
----------------------------------------------------------------
plaintext found:                             0 of 1
total time:                                  0.31 s
time of chain traverse:                      0.20 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4238786
number of alarm:                             3324
performance of chain traverse:               36.08 million/s
performance of alarm check:                  37.18 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  <not found>  hex:<not found>
```

No encontramos nuestro hash en esta tabla. Generemos algunas tablas más con la esperanza de aumentar nuestra cobertura. Usaremos el mismo comando `rtgen`, solo cambiando el parámetro `table_index` :

```
sudo rtgen md5 loweralpha-numeric 1 6 1 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 2 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 3 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 4 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 5 3800 1000000 0
sudo rtsort .
```

Intentémoslo de nuevo:

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

El resultado:

```
6 rainbow tables found
memory available: 10784174899 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 6 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_1_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_2_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_3_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_4_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_5_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files
plaintext of feadfd87d487818698d63aedf385c4e2 is trolo0


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.54 s
time of chain traverse:                      0.41 s
time of alarm check:                         0.13 s
time of disk read:                           0.02 s
hash & reduce calculation of chain traverse: 14432400
hash & reduce calculation of alarm check:    4766264
number of alarm:                             4606
performance of chain traverse:               35.46 million/s
performance of alarm check:                  36.66 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  trolo0  hex:74726f6c6f30
```

¡Entiendo! Tablas adicionales aumentaron la cobertura y se descubrió el hash.

Una mejora en el uso de hash simple para la protección con contraseña se llama "salting" los hashes, es decir, agregar un secreto específico de la aplicación al valor de texto sin formato. Esto aumenta la longitud y el conjunto de caracteres del valor hash, lo que hace que un enfoque de tabla rainbow sea inviable. Probar el tercer hash (salting) proporcionado en este ejercicio fallará con este método, ya que requeriría tablas rainbow más grandes de las que se pueden generar (y almacenar) actualmente.

## Verificación de Habilidades

### Ejercicio 1: resumen

Complete el ejercicio que describimos anteriormente: realice una inyección SQL en DVWA y compare los hashes que descubrió con los que encontró en un sitio de búsqueda de hash.

### Ejercicio 2: cuestionario de opción múltiple

La autenticación rota representa una amenaza importante para la seguridad de las aplicaciones web, ya que permite a los atacantes comprometer las credenciales de los usuarios, secuestrar sesiones y obtener acceso no autorizado a información confidencial. En este conjunto de preguntas de opción múltiple, puede explorar el concepto de autenticación rota y profundizar en los diversos riesgos asociados con esta vulnerabilidad. Además, si tiene un mentor o un colega, puede examinar diferentes tipos de fallas que pueden llevar a mecanismos de autenticación comprometidos y discutir estrategias de mitigación específicas diseñadas para abordar cada una de estas vulnerabilidades de manera efectiva.

Mejore su comprensión de la seguridad de las aplicaciones web y aprenda cómo mitigar los riesgos que plantea la autenticación rota con estas preguntas:

**Pregunta 1.** ¿Qué es la autenticación rota en el contexto de la seguridad de las aplicaciones web?

A) Una vulnerabilidad que permite a los atacantes ejecutar código arbitrario en el servidor.
B) Una exploración que otorga acceso no autorizado a partes restringidas de una aplicación web.
C) Una debilidad en el mecanismo de autenticación de una aplicación web, lo que lleva a que las credenciales de suario se vean comprometidas.
D) Una falla de seguridad que permite a los atacantes interceptar la comunicación entre el cliente y el servidor.

{{< question title="Respuesta correcta" >}}
1. C) Una debilidad en el mecanismo de autenticación de una aplicación web, lo que lleva a que las credenciales de suario se vean comprometidas.
{{< /question >}}

**Pregunta 2.** ¿Cuáles son los riesgos potenciales asociados con las vulnerabilidades de autenticación rota?

A) Acceso no autorizado a datos sensibles y cuentas de usuarios.
B) Exposición de tokens de sesión, lo que lleva a ataques de secuestro de sesión.
C) Compromiso de las credenciales de usuario, incluidas contraseñas y tokens de autenticación.
D) Todo lo anterior.

{{< question title="Respuesta correcta" >}}
2. D) Todo lo anterior.
{{< /question >}}

**Pregunta 3.** ¿Cuál de los siguientes NO es un ejemplo de un mecanismo de mitigación para vulnerabilidades de autenticación rotas?

A) Implementación de autenticación multifactor (MFA) para cuentas de usuario.
B) Hacer cumplir políticas de contraseñas sólidas, incluida la rotación regular de contraseñas.
C) Deshabilitar HTTPS para evitar la interceptación de credenciales de autenticación.
D) Implementar mecanismos de bloqueo de cuentas para prevenir ataques de fuerza bruta.

{{< question title="Respuesta correcta" >}}
3. C) Deshabilitar HTTPS para evitar la interceptación de credenciales de autenticación.
{{< /question >}}

**Pregunta 4.** ¿Qué tipo de falla puede comprometer los mecanismos de autenticación al permitir a los atacantes adivinar o descifrar las contraseñas de los usuarios?

A) Reparación de Sesión
B) Falsificación de Solicitudes entre Sitios (CSRF)
C) Complejidad de Contraseña Insuficiente
D) Secuencias de Comandos entre Sitios (XSS)

{{< question title="Respuesta correcta" >}}
4. C) Complejidad de Contraseña Insuficiente
{{< /question >}}

**Pregunta 5.** ¿Cuál es un ejemplo específico de una estrategia de mitigación para abordar el problema de la complejidad insuficiente de las contraseñas?

A) Implementar desafíos CAPTCHA durante el proceso de inicio de sesión.
B) Hacer cumplir los requisitos de longitud y complejidad de la contraseña.
C) Cifrar tokens de autenticación para evitar la interceptación.
D) Incluir en la lista blanca direcciones IP confiables para acceder a la página de inicio de sesión.

{{< question title="Respuesta correcta" >}}
5. B) Hacer cumplir los requisitos de longitud y complejidad de la contraseña.
{{< /question >}}

**Pregunta 6.** ¿Qué estrategia de mitigación tiene como objetivo evitar que los atacantes aprovechen las vulnerabilidades de fijación de sesiones?

A) Implementar mecanismos de tiempo de espera de sesión.
B) Cifrar las cookies de sesión mediante HTTPS.
C) Regenerar identificadores de sesión después de una autenticación exitosa.
D) Aplicar políticas de contraseñas seguras para las cuentas de usuario.

{{< question title="Respuesta correcta" >}}
6. C) Regenerar identificadores de sesión después de una autenticación exitosa.
{{< /question >}}

**Pregunta 7.** ¿Qué tipo de falla puede llevar a que los mecanismos de autenticación se vean comprometidos al permitir a los atacantes secuestrar sesiones de usuarios activos?

A) Caducidad de Sesión Insuficiente
B) Almacenamiento de Tokens Inseguro
C) Secuencias de Comandos entre Sitios (XSS)
D) Falsificación de Solicitudes entre Sitios (CSRF)

{{< question title="Respuesta correcta" >}}
7. A) Caducidad de Sesión Insuficiente
{{< /question >}}

**Pregunta 8.** ¿Qué estrategia de mitigación aborda la falla del almacenamiento inseguro de tokens mediante la gestión segura de tokens de autenticación?

A) Almacenar tokens en texto sin formato dentro de las cookies del lado del cliente.
B) Cifrar tokens utilizando un algoritmo de cifrado simétrico.
C) Implementar algoritmos seguros de hash de contraseñas.
D) Uso de encabezados HTTP para transmitir tokens de autenticación.

{{< question title="Respuesta correcta" >}}
8. B) Cifrar tokens utilizando un algoritmo de cifrado simétrico.
{{< /question >}}

**Pregunta 9.** ¿Cuál es un ejemplo específico de una estrategia de mitigación para prevenir ataques de fijación de sesiones?

A) Identificadores de sesión rotativos después de un inicio de sesión exitoso.
B) Implementación de autenticación multifactor (MFA).
C) Usar desafíos CAPTCHA para verificar la autenticidad del usuario.
D) Hacer cumplir una estricta validación de entrada en el formulario de inicio de sesión.

{{< question title="Respuesta correcta" >}}
9. A) Identificadores de sesión rotativos después de un inicio de sesión exitoso.
{{< /question >}}

**Pregunta 10.** ¿Qué tipo de falla puede llevar a que los mecanismos de autenticación se vean comprometidos al permitir a los atacantes falsificar solicitudes a la aplicación web mientras están autenticados como otro usuario?

A) Caducidad de Sesión Insuficiente
B) Protección Insuficiente de la Capa de Transporte
C) Secuencias de Comandos entre Sitios (XSS)
D) Falsificación de Solicitudes entre Sitios (CSRF)

{{< question title="Respuesta correcta" >}}
10. D) Falsificación de Solicitudes entre Sitios (CSRF)
{{< /question >}}




## Learning Resources

{{% resource title="Relleno de credenciales" description="Una descripción general de un ataque en el que el adversario prueba muchas combinaciones de inicio de sesión, por ejemplo aquellas que provienen de una violación de datos." languages="Inglés, árabe, chino, español, francés" cost="Gratis" url="https://es.wikipedia.org/wiki/Credential_stuffing" %}}
{{% resource title="Función hash criptográfica" description="Una descripción general de qué son las funciones hash criptográficas y por qué son tan importantes para la seguridad" languages="31 idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Funci%C3%B3n_hash_criptogr%C3%A1fica" %}}
{{% resource title="Tabla rainbow" description="Una lista de funciones hash precalculadas que se pueden utilizar al intentar forzar contenido cifrado por fuerza bruta" languages="21 idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Tabla_arco%C3%ADris" %}}
{{% resource title="Salt" description="Un salt consiste en un dato agregado a una contraseña u otra información antes de cifrarlo. Usarlo hace que sea mucho más difícil para un adversario usar tablas rainbow." languages="23 idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Sal_(criptograf%C3%ADa)" %}}
{{% resource title="Cifrado tradicional" description="Un vistazo rápido a los primeros algoritmos utilizados para cifrar contraseñas en la década de 1970. Ya no se usa" languages="Inglés" cost="Gratis" url="https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html" %}}
{{% resource title="Respuestas criptográficas correctas" description="Una lista de las soluciones criptográficas que sería prudente utilizar en la actualidad" languages="Inglés" cost="Gratis" url="https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/" %}}
{{% resource title="Búsqueda de hash" description="Una herramienta que realiza búsquedas inversas de hashes; podría ser útil para trabajar con DVWA y herramientas similares" languages="Inglés" cost="Gratis" url="https://www.whatsmyip.org/hash-lookup/" %}}
{{% resource title="Hoja de trucos para almacenar contraseñas y hoja de trucos para olvidar contraseña, recurso 1" description="Una serie de mejores prácticas sobre cómo almacenar contraseñas cifradas y cómo gestionar la recuperación de contraseñas" languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" %}}
{{% resource title="Hoja de trucos para almacenar contraseñas y hoja de trucos para olvidar contraseña, recurso 2" description="Una serie de mejores prácticas sobre cómo almacenar contraseñas cifradas y cómo gestionar la recuperación de contraseñas" languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html" %}}
{{% resource title="Fraude de SMS internacionales" description="Un ejemplo de cómo los adversarios pueden abusar de los mensajes SMS y un buen estudio de caso sobre por qué no deberíamos responder por SMS para autenticación" languages="Inglés" cost="Gratis" url="https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/" %}}
{{% resource title="Selenio" description="Una herramienta para automatizar las tareas del navegador web que se puede utilizar para realizar pruebas." languages="Inglés" cost="Gratis" url="https://www.selenium.dev/" %}}
{{% resource title="Prueba de Enumeración de Cuentas y Cuenta de Usuario Adivinable" description="Otro flujo de trabajo de prueba de seguridad de aplicaciones web; esta vez para ver si es posible obtener una aplicación para enumerar nombres de usuario" languages="Inglés" cost="Gratis" url="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account" %}}
{{% resource title="¿Me Han Engañado?" description="Un servicio fantástico y de buena reputación para ver si un determinado nombre de usuario ha aparecido en alguna violación de datos." languages="Inglés" cost="Gratis para volúmenes reducidos de consultas" url="https://haveibeenpwned.com/" %}}
{{% resource title="Presentamos 306 Millones de Contraseñas Ingresadas Descargables Gratuitamente" description="Una publicación de blog de Troy Hunt, fundador de Me Han Engañado, sobre cómo encontró millones de contraseñas filtradas y para qué podría usarse la base de datos filtrada." languages="Inglés" cost="Gratis" url="https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/" %}}
{{% resource title="Credenciales comunes" description="Listas de credenciales de uso común, como contraseñas" languages="Inglés" cost="Gratis" url="https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials" %}}
{{% resource title="Directrices de contraseña del NIST" description="Una publicación de blog que describe algunas de las pautas de contraseñas del NIST y las razones detrás de ellas." languages="Inglés" cost="Gratis" url="https://blog.netwrix.com/2022/11/14/nist-password-guidelines/" %}}
{{% resource title="Suplantación de identidad" description="Una descripción general rápida de los ataques de Suplantación de identidad, su historial y los métodos utilizados frecuentemente por los adversarios." languages="76 idiomas" cost="Gratis" url="https://es.wikipedia.org/wiki/Phishing" %}}
{{% resource title="Estafa de intercambio de SIM" description="Un tipo de estafa en la que un atacante obtiene el control de la tarjeta SIM de una persona objetivo; una razón clave para no confiar en la autenticación basada en SMS" languages="Inglés, chino, japonés, malayalam, alemán, español" cost="Gratis" url="https://es.wikipedia.org/wiki/SIM_swapping" %}}
{{% resource title="Descripción general técnica de U2F" description="Una mirada más profunda a cómo funciona U2F, un método de autenticación popular que se basa en herramientas como llaves de seguridad físicas." languages="Inglés" cost="Gratis" url="https://developers.yubico.com/U2F/Protocol_details/Overview.html" %}}
{{% resource title="Códigos de respaldo de autenticación de dos factores: Google" description="Hay ocasiones en las que el método principal de autenticación de dos factores se pierde o se destruye. En tal caso, el usuario deberá utilizar un método de respaldo. Esos artículos demuestran cómo Google y GitHub administran dichas copias de seguridad." languages="Inglés" cost="Gratis" url="https://support.google.com/accounts/answer/1187538?hl=es" %}}
{{% resource title="Códigos de respaldo de autenticación de dos factores: Github" description="Hay ocasiones en las que el método principal de autenticación de dos factores se pierde o se destruye. En tal caso, el usuario deberá utilizar un método de respaldo. Esos artículos demuestran cómo Google y GitHub administran dichas copias de seguridad." languages="Inglés" cost="Gratis" url="https://docs.github.com/es/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods" %}}
{{% resource title="Hoja de trucos de la autenticación multifactor" description="Una descripción general de qué es la autenticación multifactor y qué mejores prácticas debemos adoptar al implementarla" languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html" %}}