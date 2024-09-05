+++
style = "module"
weight = 2
title = "Análisis básico de archivos"
description = "Al evaluar los archivos de malware, debemos realizar un análisis más profundo de los tipos de archivos y su contenido. Además de las extensiones de archivo básicas, examinaremos los encabezados y las firmas de los archivos, así como el contenido de las cadenas."
+++

## Caso práctico

Una vez que tenga una pieza de malware en su máquina virtual de análisis, el siguiente paso es averiguar qué hay en ella. Una pieza de malware puede usar varios archivos; en este caso, usaría las técnicas de esta sección para cada archivo. Hay algunas formas diferentes de hacerse una idea del tipo de archivo con el que está tratando. Tenga en cuenta que algunos programas maliciosos son complicados al respecto, ya que ocultan contenido malicioso en archivos inocuos o crean archivos que son varios tipos válidos a la vez (un ejemplo clásico es el GIFAR, que es un archivo que es a la vez una imagen válida y también un applet Java válido). Debido a esto, al evaluar los archivos de malware, debemos realizar un análisis más profundo de los tipos y contenidos de los archivos. Más allá de las extensiones de archivo básicas, examinaremos los headers y las firmas de los archivos, así como el contenido de las strings.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Comprender las extensiones de archivo, los headers y los metadatos
- Utilizar herramientas listas para usar que detecten tipos de archivos

---
## Sección Principal
### File Extension

Para muchos sistemas operativos, las extensiones de archivo son muy importantes para la forma en que el sistema trata el archivo. Los nombres de archivo (y, por lo tanto, las extensiones) no son en realidad parte del archivo, sino parte de los metadatos del archivo en el sistema de archivos. Como tales, se cambian fácilmente y en realidad no revelan nada crítico sobre el contenido del archivo. Dicho esto, son un buen primer paso en el análisis. Hay un conjunto prácticamente ilimitado de extensiones de archivo (son solo letras al final de un nombre de archivo) y no hay un registro obligatorio. No puede haber una lista exhaustiva de extensiones, y muchas extensiones tienen múltiples significados posibles. Dicho esto, aquí hay algunas listas:

- [Extensiones de archivo comunes de Microsoft](https://support.microsoft.com/es-es/windows/extensiones-de-nombre-de-archivo-comunes-en-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01) (varios idiomas, gratis)
- [Gran lista de extensiones de archivo de Wikipedia](https://en.wikipedia.org/wiki/List_of_filename_extensions) (inglés, japonés y coreano, gratis)
- [Gran lista de extensiones de archivos del fabricante de TrID](https://mark0.net/soft-trid-deflist.html), un programa de identificación de archivos (en inglés, gratis)


### Headers

Muchos formatos de archivo tienen estructuras de datos distintivas que son exclusivas de su formato de archivo. Por lo general, esto se encuentra al comienzo del archivo, pero a veces aparece en otros lugares. Por ejemplo, los archivos GIF comienzan con la string "GIF89a" (o, menos comúnmente, "GIF87a"), mientras que los ejecutables de Windows (formato PE) comienzan con "MZ". Estos headers son críticos, ya que la mayoría (si no todos) los softwares que utilizan un archivo no procesarán el archivo sin las firmas correctas. Por ejemplo, si intenta ejecutar un archivo que termina en ".exe" en Windows, pero el archivo no contiene un header de archivo PE adecuado, Windows no ejecutará el archivo.

### Más allá de los headers estándar

En muchos casos, es posible determinar más sobre un formato de archivo observando el contenido adicional del archivo. Por ejemplo, tanto los archivos ZIP normales como los archivos Java (JAR) están en formato ZIP. Si cambias el nombre de un archivo .jar a .zip, las herramientas ZIP estándar lo extraerán perfectamente. Sin embargo, todos los archivos JAR tendrán strings (como "MANIFEST.MF") que no todos los archivos ZIP tendrán.

En algunos casos, los archivos ni siquiera tendrán el mismo formato básico, pero será difícil distinguirlos. Por ejemplo, tanto el código de bytes de Java como los binarios Mach-O comienzan con la secuencia de bytes 0xCAFEBABE. [Este es el código](https://github.com/file/file/blob/master/magic/Magdir/cafebabe) que utiliza el comando file para diferenciarlos: como puede ver, requiere muchas heurísticas.

### Herramientas

Dado que la cantidad de tipos de archivos es inmensa, tiene sentido usar una herramienta con una base de datos de tipos de archivos. El más común de estos es el comando "file" en linux. [Dado que es de código abierto](https://github.com/file/file), puedes ver cómo se llegó a una decisión particular sobre un archivo en particular. Una herramienta similar es [TrID](https://mark0.net/soft-trid-e.html). Si bien no es de código abierto, es posible que pueda obtener mejores resultados en ciertos archivos,

Otra herramienta útil para el análisis de archivos es el comando "strings". Esta utilidad de Unix imprimirá todas las strings ASCII en un archivo, lo que puede ser increíblemente útil para detectar patrones como las URL. Si bien esto no funcionará bien con datos cifrados, comprimidos o codificados, puede ser útil.

Por último, un editor hexadecimal mostrará archivos binarios en un formato legible por humanos. Por lo general, mostrarán una representación hexadecimal y ascii de los datos del archivo, lo que puede ser útil para detectar patrones. Hay muchos editores hexadecimales, [Wikipedia tiene una comparación de algunos](https://es.wikipedia.org/wiki/Anexo:Comparaci%C3%B3n_de_editores_hexadecimales) y REMnux viene con un editor hexadecimal llamado [wxHexEditor](https://www.wxhexeditor.org/home.php).

Para obtener una guía más avanzada sobre cómo capturar y hacer análisis preliminares en una aplicación de Android, recomendamos consultar [esta excelente guía](https://pts-project.org/guides/g3/) de la suite de herramientas PiRogue.

### Formatos de archivo de ingeniería inversa

Aquí hay [un artículo rápido sobre ingeniería inversa estática de formatos de archivo](https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats). Léelo y asegúrate de haberlo entendido. Si es posible, discuta este artículo con un mentor u otra persona con un profundo conocimiento de la ingeniería inversa de formatos de archivo.

## Práctica

Completa los ejercicios [Introductorios de Malware](https://tryhackme.com/room/malmalintroductory) (gratuitos) en TryHackMe.

## Verificación de Habilidades

Abra la máquina virtual REMNux que configuró en los ejercicios de práctica del subtema anterior.

Realice las siguientes tareas:

1. Transfiera un archivo no malicioso no ejecutable directamente desde el sistema operativo host.
2. Además de eso, descarga un archivo malicioso de [Malware Bazaar](https://bazaar.abuse.ch/) o un archivo exe (esperemos que no malicioso) de otro lugar. Identifique el formato tanto del archivo no ejecutable que descargó en el paso anterior como del archivo ejecutable actual mediante el comando file.
3. Abra los dos archivos en los que acaba de ejecutar el comando file en un editor hexadecimal. ¿Ve alguna diferencia importante entre ellos, especialmente en la forma en que comienzan los archivos?
4. Descargue un archivo .docx de Internet (de nuevo, Malware Bazaar debería funcionar aquí). Ábrelo en un editor hexadecimal para confirmar que comienza con ‘PK’. A continuación, utilice el comando unzip en él y confirme que en realidad es un archivo zip.
5. Haga lo mismo con un archivo .apk (este es un archivo de paquete de Android).

Muestre el trabajo anterior a un mentor o compañero que confirmará que ha realizado correctamente los ejercicios.

## Recursos de aprendizaje

{{% resource title="Extensiones de nombre de archivo comunes en Windows" description="Una guía creada por Microsoft que describe algunas de las extensiones de archivo más comunes en el sistema operativo Windows" languages="Inglés" cost="Gratis" url="https://support.microsoft.com/es-es/windows/extensiones-de-nombre-de-archivo-comunes-en-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01" %}}

{{% resource title="Lista de nombres extensiones de archivo | Wikipedia" description="Una lista más larga y completa de extensiones de archivo utilizadas por varias piezas de software" languages="Inglés, japonés, coreano" cost="Gratis" url="https://en.wikipedia.org/wiki/List_of_filename_extensions" %}}

{{% resource title="TrID" description="Un programa de Windows y Linux que puede averiguar los tipos de archivo de varios archivos en función de sus firmas binarias" languages="Inglés" cost="Gratis" url="https://mark0.net/soft-trid-e.html" %}}

{{% resource title="Extensiones de archivo y definiciones de tipo de archivo" description="La lista de extensiones de archivo conocidas de TrID, que ahora cuenta con más de 16.000" languages="Inglés" cost="Gratis" url="https://mark0.net/soft-trid-deflist.html" %}}

{{% resource title="Archivo" description="Un programa de línea de comandos para sistemas tipo Unix, que identifica archivos por tipo" languages="Inglés" cost="Gratis" url="https://github.com/file/file" %}}

{{% resource title="Comparación de editores hexadecimales" description="Una lista y comparación de editores hexadecimales, o programas que le permiten editar directamente archivos binarios" languages="Inglés, chino simplificado, croata, español" cost="Gratis" url="https://es.wikipedia.org/wiki/Anexo:Comparaci%C3%B3n_de_editores_hexadecimales" %}}

{{% resource title="wxHexEditor" description="La página web oficial del editor hexadecimal suministrado con cada instalación de REMnux" languages="Inglés" cost="Gratis" url="https://www.wxhexeditor.org/home.php" %}}

{{% resource title="Formatos de archivo de ingeniería inversa" description="Una guía completa para los formatos de archivo de ingeniería inversa. Asegúrate de entenderlo antes de pasar a otras secciones de esta ruta de aprendizaje" languages="Inglés" cost="Gratis" url="https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats" %}}

{{% resource title="Guía para principiantes: cómo manejar una aplicación móvil potencialmente maliciosa" description="Una introducción al manejo de una aplicación Android sospechosa y todos los pasos iniciales de recopilación y análisis de datos que podríamos tomar" languages="Inglés" cost="Gratis" url="https://pts-project.org/guides/g3/" %}}