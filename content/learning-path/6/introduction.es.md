---
style: introduction
title: Introducción
description: Lea la descripción general de la ruta de aprendizaje, los objetivos, las amenazas asociadas y los requisitos previos.
weight: 1
---

**Colaboradores**

Ninoslava Bogdanović

Michał "czesiek" Czyżewski <https://czesiek.net>

Yana Ghahramanyan

## Descripción general

Los sitios web son una infraestructura crítica utilizada por las organizaciones de medios y la sociedad civil para difundir información libremente, así como para proporcionar funcionalidades a sus partes interesadas. Los adversarios atacan estas aplicaciones web con diversos fines, incluido el cierre del libre flujo de información, daños a la reputación, acceso a sistemas privados, robo de información confidencial, vigilancia y vulneración de dispositivos. Al prepararse eficazmente para este tipo de ataques, puede reducir su impacto o, en algunos casos, prevenirlos por completo.

Los ataques contra sitios web generalmente se dividen en dos categorías: DoS (denegación de servicio) y diversas formas de piratería. Los ataques DoS tienen como objetivo impedir que las personas puedan acceder al sitio y generalmente se realizan inundando el sitio con tráfico. Los ataques DoS suelen ser lanzados por extorsionadores criminales que desean recibir un pago por detener el ataque, o por rivales políticos que desean negar a sus objetivos una plataforma. Los ataques de piratería manipulan las vulnerabilidades y debilidades de una aplicación web, por lo que generalmente requieren más habilidad, pero pueden tener un mayor impacto en el sitio objetivo. Los perfiles y objetivos del atacante varían ampliamente, pero los objetivos comunes de piratería incluyen recuperar datos privados de un sitio, desfigurar u otros cambios de contenido, apoderarse de la infraestructura subyacente del sitio, pivotando hacia otros objetivos o atacar a los usuarios del sitio.

Esta ruta de aprendizaje cubre conocimientos intermedios y avanzados necesarios para prepararse y responder a ataques contra aplicaciones web. Una preparación eficaz es extremadamente importante para responder a cualquier tipo de ataque. La mayoría de las técnicas de respuesta cubiertas en esta ruta de aprendizaje son difíciles o imposibles de llevar a cabo sin la preparación adecuada. Sin embargo, con la preparación adecuada, es posible hacer que algunas formas de ataques DoS sean ineficaces, mitigar los ataques DoS de manera rápida y efectiva, y detener y recuperarse de los ataques de piratería antes de que se cause demasiado daño. En esta ruta de aprendizaje cubriremos:

- Fortalecimiento del sitio web
- Registros del servidor web
- Respuesta a incidentes DoS
- Respuesta a incidentes de hacking y análisis forense

Tenga en cuenta que, si bien los ataques DoS son más comunes que los ataques de piratería, la respuesta a incidentes de hacking ocupa la mayor parte de esta ruta de aprendizaje. Esto se debe a que los ataques DoS son casi siempre más simples que los ataques de piratería y a que prepararse y responder a los ataques DoS implica principalmente trabajar con proveedores externos que hacen la mayor parte del trabajo. En comparación, los ataques de piratería suelen ser más complicados y responder a ellos requiere un trabajo profundo y práctico con el sitio mismo.

Si bien algunos actores estatales (como Estados Unidos, China, Corea del Norte, Rusia, etc.) están bien financiados y cuentan con agentes altamente calificados, la mayoría de los actores estatales tienen financiamiento, pero carecen de habilidades técnicas profundas. Para suprimir el discurso de sus rivales políticos, con frecuencia utilizan ataques DoS a gran escala para evitar que la gente vea los sitios web de esos rivales. Las organizaciones criminales alquilarán gustosamente sus botnets (redes de computadoras comprometidas) a personas para que las utilicen en ataques DoS. Aquí hay unos ejemplos:

- Septiembre 2022 <https://www.qurium.org/alerts/nacionale-under-ddos/>
- Mayo 2022 <https://www.qurium.org/alerts/the-tip-of-the-iceberg/>
- Marzo 2022 <https://www.qurium.org/alerts/philippines/forensic-analysis-of-the-multiple-distributed-denial-of-service-attacks-in-the-philippines/>
- Septiembre 2021 <https://www.qurium.org/alerts/switzerland/gotham-city-under-denial-of-service/>
- Agosto 2021 <https://www.qurium.org/alerts/philippines/human-rights-alliance-karapatan-under-long-lasting-ddos-attack/> & <https://www.qurium.org/alerts/philippines/israeli-firm-bright-data-luminati-networks-enabled-the-attacks-against-karapatan/>
- Junio 2021 <https://www.qurium.org/alerts/philippines/attacks-against-media-in-the-philippines-continue/>
- Julio 2020 <https://www.qurium.org/alerts/colombia/la-nueva-prensa-attacked-for-operacion-jaque-documentary/>
- Mayo 2020 <https://www.qurium.org/alerts/philippines/attacks-against-websites-in-the-philippines-during-covid-19/>
- Abril 2020 <https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/>
- Marzo 2020 <https://www.qurium.org/alerts/el-salvador/ddos-attacks-against-salvadoran-revista-factum-attributed-to-university-infrastructure/>

Los adversarios, especialmente los rivales políticos, tienen un historial de intentos de piratear los sitios web de grupos de la sociedad civil. Ejemplos incluyen:

- Marzo 2020 <https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/>
- Octubre 2019 <https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/>
- Agosto 2019 <https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/>
- Septiembre 2018 <https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/>

Además, cualquier sitio en Internet está sujeto a ataques oportunistas y dirigidos por parte de agentes de amenaza con motivación financiera. Estos adversarios tienen objetivos como robar contraseñas de usuarios, información de tarjetas de pago, etc. para revenderlos, modificar el contenido del sitio para manipular el ranking de búsqueda o hacer clic en fraude, o utilizar la propia infraestructura del sitio para extraer criptomonedas, enviar spam o lanzar ataques de denegación de servicio. Para obtener más información sobre ataques oportunistas y automatizados a aplicaciones web, consulte [este informe de OWASP](https://owasp.org/www-project-automated-threats-to-web-applications/).


## Objetivo

Los profesionales aprenderán como:

- Realizar un refuerzo básico de los sitios web contra piratería y ataques DoS.
- Agregue registros de seguridad efectivos a sus aplicaciones web
- Responder a DoS y ataques de piratería

## ¿Qué amenazas mitiga o responde esta habilidad?

- Vulneración del sitio web
- Denegación de servicio del sitio web

## ¿Cuáles son los prerrequisitos?

Esta ruta de aprendizaje requiere un conocimiento práctico de los servidores web, posibles exploits y vulnerabilidades básicas. Por esta razón, recomendamos que todos los estudiantes que lo sigan primero y no tengan un buen conocimiento de las arquitecturas y vulnerabilidades de servidores web primero completen la Ruta de Aprendizaje de Fundamentos de Seguridad de Aplicaciones Web de Infuse.

Si bien el conocimiento de las pruebas y evaluaciones de seguridad de sitios web no es un requisito previo estricto para esta ruta de aprendizaje, a algunas personas les puede resultar más fácil seguir primero la Ruta de Aprendizaje de Evaluación de Seguridad de Aplicaciones Web antes de emprender esta ruta, especialmente si desean actualizar sus conocimientos de vulnerabilidades clave de aplicaciones web.

Además de lo anterior, los y las estudiantes deben tener un conocimiento básico de la línea de comandos de Unix, incluidos conceptos como comandos de canalización. Esta ruta de aprendizaje también utilizará la herramienta awk y ofrecerá una introducción a ella. Si los y las estudiantes prefieren practicar la herramienta antes de emprender la ruta, recomendamos [esta introducción](https://www.tutorialspoint.com/awk/index.htm) o [este libro electrónico completo](https://learnbyexample.github.io/learn_gnuawk/).

## ¿Qué dispositivos o software necesitas para los ejercicios?

Para completar muchos de los ejercicios prácticos recomendados en esta ruta de aprendizaje, necesitará una computadora capaz de ejecutar herramientas básicas de línea de comandos como awk, cat, y grep. Están instalados en todos los sistemas macOS, prácticamente en todos los sistemas Linux.

Si está ejecutando Windows, le recomendamos que instale WSL (Subsistema de Windows para Linux) para ejecutar algunas de las herramientas en esta ruta de aprendizaje. Si bien puede haber otras formas de ejecutar dichas herramientas, esto requerirá mucho menos manipulación de dependencias.

Aquí está la documentación proporcionada por Microsoft con todos los detalles sobre cómo instalar WSL 2: <https://docs.microsoft.com/en-us/windows/wsl/install-win10>
Abra "Activar o desactivar funciones de Windows" en el panel de control de Windows y asegúrese de que "Plataforma de Máquina Virtual" y "Subsistema de Windows para Linux" estén marcados.
Descargue e instale WSL 2 desde [Microsoft Store](https://apps.microsoft.com/store/detail/windows-subsystem-for-linux-preview/9P9TQF7MRM4R). Una vez instalado, reinicie su computadora para aplicar los cambios.
Abra Windows PowerShell o símbolo del sistema en modo administrador haciendo clic con el botón derecho y seleccionando "Ejecutar como administrador" y ejecute el comando

```
wsl --set-default-version 2
```

El resultado de este comando se verá así:

```
For information on key differences with WSL 2 please visit https://aka.ms/wsl2
The operation completed successfully.
```

Una vez que WSL 2 esté instalado, puede instalar su distribución de Linux preferida desde Microsoft Store o usando la línea de comando. Simplemente busque "Linux" en Microsoft Store, seleccione la distribución que desee (por ejemplo, Ubuntu, Debian u otras) y haga clic en "Instalar". Alternativamente, puede instalar una distribución de Linux usando PowerShell o el Símbolo de Sistema (cmd). Abra Windows Powershell o Símbolo de Sistema y enumere las distribuciones disponibles:

```
wsl --list --online
```

Instale una distribución de esta lista usando el comando wsl --install -d &lt;Distribution Name&gt;.

```
wsl --install -d Ubuntu
```

Después de la instalación, cada distribución de Linux tendrá un icono en el menú de la aplicación de Windows. Una vez que haya instalado WSL, deberá crear una cuenta de usuario y una contraseña para su distribución de Linux recién instalada.

Debería abrirse una nueva ventana con un shell de Linux.

**Aquí hay una revisión rápida de las opciones de la línea de comandos de WSL.**

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

[Fundamentos de Seguridad de Aplicaciones Web](/es/learning-path/4/): Esta ruta de aprendizaje sobre Fortalecimiento, Análisis Forense y Respuesta a Incidentes supone un cierto nivel de familiaridad con la seguridad de las aplicaciones web. Si esta área de la seguridad es nueva para usted, debe seguir la Ruta de Aprendizaje de Fundamentos de Seguridad para obtener información básica que le permita participar de manera efectiva en esta.

[Evaluación de Seguridad de Aplicación Web](/es/learning-path/5/): Para los defensores y defensoras digitales, atacar y defender son dos partes importantes de un todo. Como alguien que ayuda a sus clientes a proteger sus sitios, saber cómo defenderse de manera integral contra los ataques le permite brindarles mejores recomendaciones. Esta Ruta de Aprendizaje proporciona una comprensión más profunda de los tipos de ataques de piratería a los que pueden estar sujetos los sitios web.