---
style: introduction
title: Introducción
description: Lea la descripción general de la ruta de aprendizaje, los objetivos, las amenazas asociadas y los requisitos previos.
weight: 1
---


## Descripción general

Las aplicaciones web son una infraestructura crítica utilizada por las organizaciones de medios y la sociedad civil para difundir el libre flujo de información, así como para proporcionar funcionalidades a sus partes interesadas. Los adversarios atacan estas aplicaciones web con diversos fines, incluido el cierre del libre flujo de información, daños a la reputación, acceso a sistemas privados, robo de información confidencial, vigilancia y comprometer la seguridad de dispositivos. Al identificar de forma proactiva las vulnerabilidades en las aplicaciones web utilizadas por sus clientes y asociados, puede evitar posibles vulneraciones antes de que ocurran.

Esta ruta de aprendizaje cubre los conocimientos intermedios y avanzados necesarios para comprender e identificar en profundidad las vulnerabilidades en las aplicaciones web. Esto se puede utilizar para encontrar vulnerabilidades en una aplicación antes de que lo hagan los actores de amenazas, para guiar prácticas de desarrollo seguras o para corregir vulnerabilidades en aplicaciones web de manera más efectiva. En esta ruta de aprendizaje cubriremos:

- Los motivos para realizar una evaluación de seguridad de una aplicación web
- Los tipos de evaluación que son eficaces
- Cómo identificar varios tipos de vulnerabilidades de aplicación web
- Cómo explotar esas vulnerabilidades
- Cómo probar sistemáticamente, de forma eficaz y eficiente una aplicación web en busca de vulnerabilidades

### Lectura de historiales

Los adversarios, especialmente los rivales políticos, tienen un historial de intentos de piratear los sitios web de grupos de la sociedad civil. Algunos ejemplos documentados incluyen:

- Marzo 2020 <https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/>
- Octubre 2019 <https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/>
- Agosto 2019 <https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/>
- Septiembre 2018 <https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/>

Además, cualquier sitio en Internet está sujeto a ataques oportunistas y dirigidos por parte de agentes de amenazas con motivación financiera. Estos adversarios tienen objetivos como robar contraseñas de usuarios, información de tarjetas de pago, etc. para revenderlos, modificar el contenido del sitio para manipular el ranking de búsqueda o hacer fraude de clicks, utilizar la propia infraestructura del sitio para minar criptomonedas, enviar spam o lanzar ataques de denegación de servicio. Aunque es posible que muchos de estos ataques no estén dirigidos a motivaciones políticas, plantean importantes riesgos para la reputación y la confidencialidad de cualquier organización. Para obtener más información sobre ataques oportunistas y automatizados a aplicaciones web, consulte [este informe de OWASP](https://owasp.org/www-project-automated-threats-to-web-applications/).

## Objetivo

El titular de la Credencial debe poder realizar de manera eficiente evaluaciones de seguridad integrales de las aplicaciones web, incluida la identificación de las vulnerabilidades en el top 10 de OWASP.

## ¿Qué amenazas mitiga o responde esta habilidad?

Las habilidades de evaluación de aplicaciones web pueden ayudar a responder a las amenazas de piratería mediante:

- Ciberdelincuentes vigilantes motivados por el Estado
- Atacantes motivados financieramente

## ¿Cuáles son los prerrequisitos?

- Antes de comenzar esta ruta de aprendizaje, los estudiantes primero deben completar la Ruta de Aprendizaje de Fundamentos de Seguridad de Sitios Web si no están familiarizados con los servidores web y las vulnerabilidades básicas de las aplicaciones web. Si ya están familiarizados con el tema en general, les recomendamos que repasen el subtema 6 de la Ruta de Aprendizaje de Fundamentos, que se centra en las habilidades interpersonales necesarias para dar asistencia a los demás.
- Una familiaridad básica con HTML, como el diseño básico de un documento HTML y la capacidad de leer HTML simple. Para una excelente introducción, consulte [MDN](https://developer.mozilla.org/es/docs/Learn).
- Conceptos básicos del lenguaje de programación y capacidad de leer JavaScript simple. Recomendamos la [introducción al tema](https://developer.mozilla.org/es/docs/Learn/JavaScript) MDN.
- Comprensión básica de cómo funciona HTTP, cómo se comunica un navegador con un sitio web y cómo son las solicitudes y respuestas HTTP. Para una introducción a esos temas, recomendamos [este artículo](https://www.cloudflare.com/es-la/learning/ddos/glossary/hypertext-transfer-protocol-http/) y [este](https://developer.mozilla.org/es/docs/Learn/Forms/Sending_and_retrieving_form_data).
- Un conocimiento básico de SQL, lo suficiente para saber qué es y cómo formular un comando simple. Para obtener una introducción, consulte [sqlzoo](https://sqlzoo.net/wiki/SQL_Tutorial).
- Familiaridad básica con el funcionamiento de la línea de comandos en un sistema operativo de su elección y cómo ejecutar comandos allí. Para una buena introducción, consulte [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line).

## ¿Qué dispositivos o software necesitas para los ejercicios?

- Necesitará una computadora capaz de ejecutar aplicaciones Java y Docker. Cualquier dispositivo macOS, Windows o Linux con 8GM de RAM y algo de espacio libre en disco debería funcionar. Todos los laboratorios aquí también se probaron en dispositivos que ejecutan Apple Silicon y funcionan.
- Muchas de las herramientas de esta ruta de aprendizaje funcionan mejor en sistemas operativos tipo Unix. Esto significa que es más fácil usar dispositivos Linux, macOS o Windows con WSL (Subsistema de Windows para Linux) instalado.
- Si está ejecutando macOS, es una buena idea instalar [Homebrew](https://brew.sh/) o [Macports](https://www.macports.org/); estos son administradores de paquetes que pueden automatizar el proceso de instalación de algunas de las herramientas descritas a lo largo de la ruta de aprendizaje.
- Alternativamente, si tiene una instalación de Kali Linux (puede usar la misma que usó para la Ruta de Aprendizaje de Fundamentos de Seguridad de Aplicación Web), la mayoría de las herramientas que se describen a continuación ya deberían venir preinstaladas.
- Si está ejecutando Windows, le recomendamos que instale WSL (Subsistema de Windows para Linux) para ejecutar algunas de las herramientas que se describen a continuación. Si bien muchos de ellos pueden ejecutarse en Docker, aquellos que requieren Python pueden ser mucho más fáciles de ejecutar dentro de WSL, lo que requerirá menos manipulación de dependencias.
  - Aquí está la documentación proporcionada por Microsoft con todos los detalles sobre cómo instalar WSL 2: <https://learn.microsoft.com/es-es/windows/wsl/install>
  - Abra "Activar o desactivar las funciones de Windows" en el panel de control de Windows y asegúrese de que "Plataforma de Máquina Virtual" y "Subsistema de Windows para Linux" estén marcados.
  - Descargue e instale WSL 2 desde [Microsoft Store](https://apps.microsoft.com/detail/9p9tqf7mrm4r?hl=es-es). Una vez instalado, reinicie su computadora para aplicar los cambios.
  - Abra Windows PowerShell o símbolo del sistema en modo administrador haciendo clic con el botón derecho y seleccionando "Ejecutar como administrador" y ejecute el comando  
        `wsl --set-default-version 2`
  - El resultado de este comando se verá así:

```
For information on key differences with WSL 2 please visit https://aka.ms/wsl2
The operation completed successfully.
```

Una vez que WSL 2 esté instalado, puede instalar su distribución de Linux preferida desde Microsoft Store o usando la línea de comando. Simplemente busque "Linux" en Microsoft Store, seleccione la distribución que desee (por ejemplo, Ubuntu, Debian u otras) y haga clic en "Instalar". Alternativamente, puede instalar una distribución de Linux usando PowerShell o el Símbolo de Comando. Abra Windows Powershell o Símbolo de Comando y enumere las distribuciones disponibles:

  ```
  wsl --list --online
  ```
Instale una distribución de esta lista usando el comando wsl --install -d &lt;nombre de distribución de Linux&gt;.

  ```
  wsl --install -d Ubuntu
  ```
Después de la instalación, cada distribución de Linux tendrá un icono en el menú de la aplicación de Windows. Una vez que haya instalado WSL, deberá crear una cuenta de usuario y una contraseña para su distribución de Linux recién instalada.

Debería abrirse una nueva ventana con un shell de Linux.

**Aquí hay una revisión rápida de las opciones de la línea de comandos de WSL**

Imprima la información de uso y vea los argumentos de la línea de comando:


  ```
  wsl --help
  ```
  Lista las distribuciones instaladas:

  ```
  wsl --list
  ```

  Enumere solo las distribuciones en ejecución:

  ```
  wsl --list --running
  ```
  Terminar una distribución en ejecución:

  ```
  wsl --terminate Ubuntu-22.04
  ```

  Apague todas las distribuciones en ejecución:

  ```
  wsl --shutdown
  ```

  Anule el registro de la distribución de Linux y elimine el sistema de archivos:

  ```
  wsl --unregister Ubuntu-22.04
  ```

  Actualice WSL a la última versión:

  ```
  wsl --update
  ```
  Inicie la distribución predeterminada:

  ```
  wsl
  ```  

## Rutas de Aprendizaje relacionadas

Después de completar esta ruta de aprendizaje, recomendamos que los estudiantes trabajen en [Fortalecimiento de Aplicación Web, Análisis Forense y Respuesta a Incidentes](/es/learning-path/6/).
