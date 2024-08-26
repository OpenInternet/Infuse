+++
style = "module"
weight = 4
title = "Autorización"
description = "Los usuarios que han iniciado sesión no tienen acceso a los datos de los demás usuarios. Aquí veremos cómo asegurarnos de que ningún usuario exceda su nivel de acceso o capacidad."
+++

## Caso de Uso

En cualquier sitio web que tenga usuarios con diferentes niveles de capacidades (por ejemplo, espectadores versus editores) o que contenga información confidencial para los usuarios, es importante que el sitio proteja estas funciones y/o estos datos de personas que no tienen permiso para usar estas funciones. y/o interactuar con estos datos.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de hacer lo siguiente:

- Comprender los tipos comunes de vulnerabilidades de autorización
- Comprender los impactos potenciales de esos tipos de vulnerabilidades.
- Comprender los mecanismos mediante los cuales funcionan esas vulnerabilidades.
- Comprender, a grandes rasgos, cómo se pueden prevenir esas vulnerabilidades.

---
## Sección Principal

### Conocimiento Fundamental

La autorización es el proceso de asegurarse de que un usuario de un sistema tenga permiso para realizar una acción o crear/leer/editar/eliminar un dato en ese sistema, y ​​evitar estas acciones si el usuario no tiene permiso. Generalmente, estos son los tipos de controles de seguridad más simples de implementar y el tipo de vulnerabilidad más simple de encontrar. Sin embargo, aunque son conceptualmente simples, tanto asegurar como romper los controles son generalmente muy tediosos y propensos a errores.

Cada vez que una aplicación web carga una página de acceso controlado o realiza una acción de acceso controlado, primero debe verificar que el usuario actual se haya autenticado correctamente y luego verificar que el usuario tenga los permisos correctos. Generalmente, la lógica de autorización es altamente específica de la aplicación, por lo que los marcos web brindan soporte limitado para esto, por lo que la lógica de autorización debe agregarse manualmente a cada página. A veces se implementa en la lógica de la página, a veces se implementa en las API a las que las páginas web llaman internamente. En cualquier caso, si falta, los usuarios no autorizados pueden hacer cosas que se supone que no deberían poder hacer.

Para facilitar la comunicación sobre las vulnerabilidades, las vulnerabilidades de autorización generalmente se dividen en tres categorías.

### Autenticación faltante

A veces, los desarrolladores ni siquiera comprueban que un usuario haya iniciado sesión en una página o conjunto de páginas. Cualquier usuario de Internet puede ver las páginas de autenticación posterior o realizar acciones de autenticación posterior. Esta clase de vulnerabilidad a veces se ha denominado "navegación forzada" o "referencia directa a objeto". Hay varias formas en que se manifiesta este tipo de vulnerabilidad.

Un patrón de esta vulnerabilidad es que un sitio mostrará un conjunto de enlaces a los usuarios que no han iniciado sesión y otro conjunto de enlaces a los usuarios que sí han iniciado sesión. Sin embargo, ninguna página que muestra datos específicos del usuario o realiza acciones realmente verifica que el usuario haya iniciado sesión.

Otro patrón común es que las páginas que muestran datos en el navegador tienen controles de autenticación, pero las páginas que simplemente procesan datos (por ejemplo, a través de HTTP POST) no lo hacen. Esto generalmente se debe a que los desarrolladores no tienen un conocimiento profundo de cómo funciona la web y no se dan cuenta de que es bastante fácil generar solicitudes HTTP arbitrarias. Con este estándar, los usuarios generalmente solo pueden ver los datos para los que están autorizados a ver, pero pueden realizar cualquier acción en el sitio y modificar los datos de otros usuarios. Tenga en cuenta que, dado que los usuarios pueden ver y modificar sus propios datos, es muy fácil para los atacantes con una cuenta descubrir la autenticación faltante.

Un tercer estándar común es que las páginas o acciones individuales, o quizás secciones del sitio, simplemente no verifican la autenticación. Generalmente esto es el resultado de la supervisión del desarrollador.

### Escalada de Privilegios Verticales

La escalada de privilegios vertical ocurre cuando los usuarios menos poderosos pueden realizar acciones más poderosas en el sitio web. Esto comúnmente se debe a que el sitio verifica el estado de autenticación pero no verifica los permisos. Se mencionó anteriormente que los marcos en general no incluyen funciones integradas de autorización, pero muchos realizan comprobaciones de autenticación. Si una página (o un sitio completo) realiza correctamente verificaciones de autenticación pero no verifica los permisos, esto generalmente resulta en una escalada de privilegios vertical.

Un ejemplo de escalada de privilegios vertical podría ser un foro en línea que tenga usuarios habituales y moderadores. Cuando los usuarios habituales inician sesión, pueden crear publicaciones y editar sus propias publicaciones. Cuando los moderadores inician sesión, también pueden crear publicaciones y editar sus propias publicaciones, pero también pueden ocultar las publicaciones de otros usuarios y prohibir a los usuarios. Si los usuarios habituales pueden editar la URL o cambiar los parámetros del formulario para ocultar también las publicaciones de los usuarios o prohibir a los usuarios, eso sería una escalada de privilegios vertical.

Los patrones que conducen a una escalada vertical de privilegios son esencialmente los mismos que conducen a la falta de autenticación, excepto que los usuarios deben iniciar sesión.

### ¡Inténtalo tú mismo

Inicie sesión en su DVWA y asegúrese de que el nivel de seguridad esté configurado en bajo y de haber iniciado sesión como administrador (es mejor cerrar sesión y volver a iniciarla con las credenciales "admin:contraseña". Navegue a la página "Omisión de Autorización". Si no puede ver esta página en la barra izquierda y tiene la versión más actualizada de DVWA, significa que no ha iniciado sesión como administrador.

Después de eso, abra una ventana de navegación privada u otro navegador e inicie sesión en su DVWA como usuario "gordonb" y tenga en cuenta que la Omisión de Autorización no aparece en la barra de navegación de gordonb. ¿Puedes descubrir cómo acceder a la Omisión de Autorización como gordonb? (Si tiene problemas, recuerde que las vulnerabilidades de autorización generalmente son muy sencillas. No lo pienses demasiado.)

### Escalada de Privilegios Horizontal

La escalada de privilegios horizontal ocurre cuando los usuarios pueden ver o realizar acciones con los datos de otros usuarios, cuando esos otros usuarios tienen el mismo nivel de acceso.

Un ejemplo de escalada de privilegios horizontal podría encontrarse en el foro en línea anterior. Si un usuario normal puede editar las publicaciones de otros usuarios, eso sería una escalada de privilegios horizontal.

Con la escalada horizontal de privilegios, hay tres patrones de desarrollo principales que conducen a la vulnerabilidad. La primera es que las páginas verifican que los usuarios hayan iniciado sesión y que tengan el nivel de acceso correcto, pero no verifican en absoluto los permisos a nivel de datos. Normalmente, esto hará que todo el sitio o una sección entera del sitio sea vulnerable. La segunda es que las páginas o acciones individuales no verifican los permisos a nivel de datos debido a la supervisión del desarrollador. Finalmente, ocasionalmente los sitios web pasan la identificación del usuario en un parámetro de URL o en un campo de formulario oculto, en lugar de leerlo desde la sesión del lado del servidor. El usuario final puede modificar fácilmente estos parámetros, lo que normalmente resulta en una escalada de privilegios.

### Prevención de Vulnerabilidades de Autorización

Como se señaló anteriormente, las dos causas fundamentales de las vulnerabilidades de autorización tienden a ser la falta de conocimiento de los desarrolladores (por lo tanto, sitios enteros o secciones del sitio carecen de los controles adecuados) o la falta de coherencia en la implementación de controles. Dado que el soporte del marco es generalmente deficiente, los desarrolladores a menudo necesitan implementar sus propios controles desde cero. Aquí hay algunos consejos a considerar:

- Intente superponer y simplificar el proceso de verificación de permisos de usuario. En la medida en que su marco tenga funciones para admitir la autorización, úselas. Las funciones consistentes para verificar la autorización del usuario son menos propensas a errores que la lógica compleja.
- Para usuarios extremadamente poderosos, considere usar un sitio web completamente separado. Por ejemplo, <www.example.com> para usuarios habituales y admin.example.com para usuarios administrativos.
- Para las comprobaciones de permisos a nivel de datos, contar con pautas coherentes para los desarrolladores puede reducir los errores. Por ejemplo, una regla según la cual todo el acceso a los datos debe realizarse a través de llamadas API, cada función API debe incluir un parámetro de identificación de usuario y cada API que toma una identificación de usuario debe usarlo en llamadas a bases de datos. Tener reglas consistentes como esta hace que sea más fácil evitar y encontrar errores de autorización.

Para obtener un poco más de autenticación, consulte [la hoja de referencia de autorización de OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). Para una exploración en profundidad, consulte la [Ruta de Aprendizaje sobre Evaluación de Seguridad de Aplicaciones Web](/es/learning-path/5/).

## Práctica

Lea este [informe de vulnerabilidad](https://eaton-works.com/2023/06/06/honda-ecommerce-hack/) y asegúrese de comprender qué vulnerabilidades de autenticación o autorización se están explotando aquí.

## Verificación de Habilidades

### Ejercicio 1: resumen

Complete el ejercicio de omisión de autorización de la DVWA, como se describe anteriormente.

### Ejercicio 2: cuestionario de opción múltiple

**Pregunta 1.** ¿Cuál es el propósito principal de la autorización en un sistema?

A) Autenticar usuarios
B) Garantizar la integridad de los datos
C) Verificar los permisos de los usuarios
D) Cifrar información confidencial

{{< question title="Respuesta correcta" >}}
C) Verificar los permisos de los usuarios
{{< /question >}}

**Pregunta 2.** ¿Qué categoría de vulnerabilidad implica que los desarrolladores no verifican si un usuario ha iniciado sesión en determinadas páginas?

A) Escalada de Privilegios Verticales
B) Escalada de Privilegios Horizontales
C) Autenticación Faltante
D) Navegación Forzada

{{< question title="Respuesta correcta" >}}
C) Autenticación Faltante
{{< /question >}}

**Pregunta 3.** ¿Cuál es un patrón común de vulnerabilidad de autenticación faltante mencionado en el texto del subtema?

A) No verificar los permisos en acciones a nivel de datos
B) Pasar ID de usuario en parámetros de URL
C) Permitir a los usuarios modificar sus propios datos
D) Mostrar diferentes enlaces según el estado de inicio de sesión del usuario

{{< question title="Respuesta correcta" >}}
D) Mostrar diferentes enlaces según el estado de inicio de sesión del usuario
{{< /question >}}

**Pregunta 4.** ¿Cuál es el resultado de la vulnerabilidad de escalada de privilegios vertical?

A) Los usuarios pueden acceder a datos no autorizados
B) Los usuarios menos poderosos pueden realizar acciones poderosas para las que no estaban autorizados
C) Los usuarios pueden editar los datos de otros usuarios sin permiso
D) Todo el sitio se vuelve vulnerable a los ataques

{{< question title="Respuesta correcta" >}}
B) Los usuarios menos poderosos pueden realizar acciones poderosas para las que no estaban autorizados
{{< /question >}}

**Pregunta 5.** En el contexto de la escalada horizontal de privilegios, ¿cuál es una causa común de vulnerabilidad según el texto del subtema?

A) Falta de conciencia de los desarrolladores
B) Implementación inconsistente de controles
C) Pasar ID de usuario en parámetros de URL
D) Protocolos de cifrado insuficientes

{{< question title="Respuesta correcta" >}}
B) Implementación inconsistente de controles
{{< /question >}}

**Pregunta 6.** ¿Cómo pueden los desarrolladores prevenir las vulnerabilidades de autorización según el texto del subtema?

A) Utilice una lógica compleja para las comprobaciones de autorización
B) Depender únicamente del soporte de la estructura
C) Implementar sus propios controles de manera consistente
D) Ignorar las comprobaciones de permisos a nivel de datos

{{< question title="Respuesta correcta" >}}
C) Implementar sus propios controles de manera consistente
{{< /question >}}

**Pregunta 7.** ¿Cuál de los siguientes NO es un consejo mencionado en el texto para prevenir vulnerabilidades de autorización?

A) Intente superponer y simplificar el proceso de verificación de permisos de usuario.
B) Utilice sitios web separados para usuarios habituales y administradores
C) Depender únicamente de las funciones de la estructura para la autorización
D) Establecer pautas coherentes para los desarrolladores para el acceso a los datos

{{< question title="Respuesta correcta" >}}
C) Depender únicamente de las funciones de la estructura para la autorización
{{< /question >}}

**Pregunta 8.** ¿Cuál es la importancia de la coherencia en la implementación de controles de autorización?

A) Aumenta la complejidad del sistema.
B) Reduce la probabilidad de errores
C) Limita el acceso a determinados usuarios
D) Dificulta los controles de autorización

{{< question title="Respuesta correcta" >}}
B) Reduce la probabilidad de errores
{{< /question >}}

**Pregunta 9.** ¿Cuál es un ejemplo proporcionado en el texto del subtema sobre la vulnerabilidad de escalada de privilegios vertical?

A) Modificar los parámetros de la URL para escalar privilegios
B) Permitir a los usuarios ver los datos de otros usuarios
C) Pasar ID de usuario en campos de formulario ocultos
D) Usuarios habituales que obtienen acceso a funciones administrativas

{{< question title="Respuesta correcta" >}}
D) Usuarios habituales que obtienen acceso a funciones administrativas
{{< /question >}}

**Pregunta 10.** ¿Qué categoría de vulnerabilidad implica que los usuarios realicen acciones sobre los datos de otros usuarios con el mismo nivel de acceso?

A) Autenticación Faltante
B) Escalada de Privilegios Verticales
C) Escalada de Privilegios Horizontales
D) Navegación Forzada

{{< question title="Respuesta correcta" >}}
C) Escalada de Privilegios Horizontales
{{< /question >}}

### Exercise 3 (optional, only for those comfortable with basic python): code bug finding challenge

#### Ejercicio 3 (opcional, solo para aquellos que se sienten cómodos con python básico): desafío de búsqueda de errores de código

El código simula una aplicación web vulnerable con una vulnerabilidad de escalada de privilegios horizontal. La vulnerabilidad radica en el hecho de que la función eliminar_perfil solo verifica el permiso de escritura del usuario actual pero no verifica que el usuario actual esté autorizado a eliminar los perfiles de otros usuarios. Esto permite que cualquier usuario con permiso de escritura elimine el perfil de cualquier otro usuario, independientemente de sus propios permisos.

{{< highlight python >}}
# Declaración de importación para la función de print (Python 3.x)
from __future__ import print_function

# Datos de usuario (reemplace con sus propios datos de prueba)
users = {
    "admin": {"id": 1, "username": "admin", "permissions": ["read", "write", "delete"]},
    "user1": {"id": 2, "username": "user1", "permissions": ["read", "write"]},
    "user2": {"id": 3, "username": "user2", "permissions": ["read", "write"]},
}

# Función para simular la búsqueda del perfil de un usuario.
def get_profile(username):
    if username not in users:
        return None
    return users[username]

# Función para simular la eliminación del perfil de un usuario (vulnerable)
def delete_profile(username, current_user):
    if "write" in current_user["permissions"]:
        if username in users:
            del users[username]
            return f"User '{username}' deleted successfully."
        else:
            return f"User '{username}' not found."
    else:
        return "Permiso negado: No tienes permiso para eliminar usuarios.."

# Casos de prueba (modificar según sea necesario)
current_user = users["user1"]  # Simular un usuario con permiso de escritura
target_username = "user2"  # Simulate the target user

# Intenta eliminar el perfil de la víctima
result = delete_profile(target_username, current_user)

# Imprime el resultado (salida esperada: "Permiso negado: No tienes permiso para eliminar usuarios.")
print(result)
{{< / highlight >}}

**Encuentre y corrija la vulnerabilidad en la función `delete_profile`.**

### Clave de respuestas y explicación

La vulnerabilidad radica en el hecho de que la función \`delete_profile\` solo verifica el permiso de escritura del usuario actual pero no verifica que el usuario actual esté autorizado a eliminar los perfiles de otros usuarios. Esto permite que cualquier usuario con permiso de escritura elimine el perfil de cualquier otro usuario, independientemente de sus propios permisos.

**Para corregir la vulnerabilidad, podrías:**

1. Compruebe si el usuario actual tiene específicamente el permiso "delete".
2. Implemente control de acceso basado en roles (RBAC) para restringir la eliminación según los roles de los usuarios.
3. Agregue comprobaciones adicionales para verificar la legitimidad de la solicitud de eliminación.



## Learning Resources

{{% resource title="Hoja de trucos de autorización" description="Una mirada a algunas de las mejores prácticas de autorización" languages="Inglés" cost="Gratis" url="https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" %}}
{{% resource title="Truco de comercio electrónico de Honda" description="Un artículo que demuestra cómo encontrar ciertas vulnerabilidades en sitios web con autenticación o autorización deficientes" languages="Inglés" cost="Gratis" url="https://eaton-works.com/2023/06/06/honda-ecommerce-hack/" %}}