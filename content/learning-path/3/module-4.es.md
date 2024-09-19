---
style: module
title: Análisis estático
description: El análisis estático es el proceso de desensamblar un archivo
  binario para comprender qué hay dentro de él. Es bastante laborioso y requiere
  conocimientos de ingeniería de software.
weight: 4
---

## Caso práctico

El análisis estático es el proceso de desensamblar un archivo binario para comprender qué hay dentro de él. Es bastante laborioso y requiere conocimientos de ingeniería de software. Por esta razón, la mayoría de los analistas preferirán hacer un análisis dinámico (en el que nos centramos en el subtema 3) en su lugar. Hay varias razones por las que es posible que desee hacer un análisis estático, incluso cuando el análisis dinámico no está dando buenos resultados o si no desea que un adversario potencial sepa que está en posesión y analizando el archivo.

Este subtema analiza una habilidad muy avanzada y las guías a las que se vincula tomarán un tiempo considerable en completarse. Si actualmente no tiene tiempo para concentrarse en ello y, en cambio, desea averiguar qué hacer con los resultados del análisis dinámico, vaya al Subtema 5.

## Objetivos

Después de completar este subtema, el profesional debe ser capaz de realizar lo siguiente:

- Comprender en qué casos el análisis estático podría ser más apropiado que el análisis dinámico
- Ser capaz de realizar análisis estáticos básicos en Windows o Android utilizando herramientas listas para usar

---
## Sección Principal

El análisis estático es el proceso de determinar información sobre un malware sin ejecutarlo. Técnicamente, el análisis básico de archivos que realizó anteriormente es una forma de análisis estático. Sin embargo, generalmente nos referimos al análisis estático de malware como el aprendizaje sobre las acciones que realizará el malware. Esto generalmente implica tomar un programa binario compilado, descompilarlo y luego leer el código resultante. Una alternativa es el análisis dinámico, cuando se ejecuta el malware y luego se observa su comportamiento.

El análisis estático tiene algunas ventajas sobre el análisis dinámico. En primer lugar, dado que no ejecuta el malware, es menos probable que se infecte (y hay casos raros de malware que pueden escapar de una máquina virtual o sandbox). Además, si no ejecuta el malware, es poco probable que avise a los actores de amenazas de que se ha descubierto su malware. Además, el malware sofisticado puede intentar descubrir si se está analizando cuando se ejecuta. Si determina que se está analizando, puede cambiar su comportamiento, lo que lleva a un posible análisis incorrecto.

Por otro lado, el análisis estático puede llevar mucho tiempo y ser difícil, y los autores de malware pueden utilizar una variedad de técnicas de ofuscación (como el cifrado, el empaquetado y la descarga dinámica de etapas posteriores) para dificultar el análisis estático.

Si bien gran parte del enfoque en esta ruta de aprendizaje está en el análisis estático de programas binarios compilados, tenga en cuenta que mucho malware es más fácil de analizar, ya que está escrito en HTML/JavaScript, lenguajes de scripting de shell, etc.

### Windows

Para comenzar en el análisis estático de Windows, dejaremos de lado REMnux y pasaremos por un conjunto de tutoriales sobre ingeniería inversa de malware de Windows. Este tutorial incluye un poco de análisis dinámico, pero se centra en gran medida en el análisis estático. Para mayor coherencia, debe realizar los ejercicios que se describen a continuación. Recuerde que, si encuentra alguna herramienta que le guste que no forme parte de REMnux, puede agregarla a su REMnux VM. (También puede comenzar de nuevo en cualquier momento con una máquina virtual en blanco, si lo desea.)

{{% resource title="Ingeniería inversa de malware de Windows 101" description="Un curso excelente y completo sobre malware de Windows de ingeniería inversa. Tenga en cuenta que estos ejercicios son una introducción no suave, es posible que tenga que estudiar más (recursos a continuación) para comprender ciertos ejercicios. Pueden tardar varios días en completarse." languages="Inglés" cost="Gratis" url="https://malwareunicorn.org/workshops/re101.html" %}}

{{% resource title="Ingeniería inversa de malware de Windows 102" description="Un curso excelente y completo sobre malware de Windows de ingeniería inversa. Tenga en cuenta que estos ejercicios son una introducción no suave, es posible que tenga que estudiar más (recursos a continuación) para comprender ciertos ejercicios. Pueden tardar varios días en completarse." languages="Inglés" cost="Gratis" url="https://malwareunicorn.org/workshops/re102.html" %}}

{{% resource title="Cursos OpenSecurityTraining2" description="Cursos que proporcionan una inmersión muy profunda en la arquitectura del sistema de bajo nivel y la reversión." languages="Inglés" cost="Gratis, pago con el apoyo del instructor" url="https://p.ost2.fyi/courses" %}}

{{% resource title="Ruta de aprendizaje de OpenSecurity para el análisis de malware" description="" languages="Inglés" cost="Gratis" url="https://opensecuritytraining.info/Malware%20Analysis.html" %}}

{{% resource title="Reversión de Windows con x64dbg" description="Esta serie de videos se centra específicamente en el uso de x64dbg, una herramienta de depuración de código abierto, para revertir el malware de Windows" languages="Español" cost="Gratis" url="https://www.youtube.com/watch?v=Af5pvCl0CBE&amp;amp;list=PLn__CHOEZR1Ymxi2n4Q9G9I9kBYr6B4Ft" %}}

### Android

Mientras que el software de Windows generalmente se escribe en ensamblador x86 o x64, los binarios en Android generalmente se dirigen a una máquina virtual llamada Android Runtime (ART), que es similar a la Máquina Virtual Java. Este bytecode ART generalmente se puede invertir automáticamente en Java, a diferencia del bytecode x86/x64, que generalmente solo se puede invertir en assembly. Antes de entusiasmarte demasiado, ten en cuenta que hay muchas herramientas de ofuscación que pueden hacer que el código Java de ingeniería inversa sea casi ilegible, y también Android admite código nativo a través de la [biblioteca NDK](https://developer.android.com/ndk/guides?hl=es-419). Tenga en cuenta que la mayoría de los dispositivos Android tienen arquitecturas basadas en ARM, no x86/x64, por lo que deberá aprender ARM assembler para realizar ingeniería inversa en la mayoría del código nativo de Android que probablemente encuentre.

También puede encontrar el lenguaje de programación Kotlin cuando aprenda sobre Android. Tanto Kotlin como Java compilan con el mismo bytecode, y son muy similares a bajo nivel. Al realizar un análisis estático en una aplicación Android, el lenguaje de programación original no debe ser significativo. Recomendamos centrarse en Java, porque los descompiladores disponibles convierten el ART en Java, no en Kotlin.

Al igual que con la sección de análisis estático de Windows, esta sección sobre el análisis estático de Android está anclada a un curso excelente y completo, pero no suave. Es probable que deba realizar estudios adicionales para comprender el material en el curso primario.

{{% resource title="Aplicación Android Ingeniería Inversa 101" description="Un curso excelente y completo sobre aplicaciones de ingeniería inversa para Android. Tenga en cuenta que estos ejercicios son una introducción no suave, es posible que tenga que estudiar más (recursos a continuación) para comprender ciertos ejercicios. Pueden tardar varios días en completarse. Los siguientes recursos pueden ayudarlo a desarrollar secciones del curso." languages="Inglés" cost="Gratis" url="https://www.ragingrock.com/AndroidAppRE/" %}}

{{% resource title="Cómo analizar de forma estática una aplicación Android sospechosa" description="Una excelente introducción intermedia al análisis estático de las aplicaciones de Android." languages="Inglés" cost="Gratis" url="https://pts-project.org/guides/g5/" %}}

{{% resource title="Curso Learn Java de Codecademy" description="Una introducción básica a Java. Tendrás que entender Java para poder trabajar con programas Android." languages="Inglés" cost="Gratis" url="https://www.codecademy.com/enrolled/courses/learn-java" %}}

{{% resource title="Crea tu primera aplicación para Android en Java" description="Un curso básico sobre creación de aplicaciones de Google. Esto debería darte una idea de cómo funcionan las aplicaciones de Android y prepararte para aprender sobre las funciones internas de Android." languages="Inglés, chino, indonesio, japonés, coreano, portugués, español" cost="Gratis" url="https://developer.android.com/courses/android-basics-compose/course?hl=es-419" %}}


## Verificación de Habilidades

Siéntese con un compañero o un mentor que tenga una experiencia significativa en la investigación pasiva contra servidores en Internet. A continuación:

- Completa los ejercicios [Básicos de Malware RE](https://tryhackme.com/room/basicmalwarere) (gratis) en TryHackMe
- (Solo para Android) Completa los ejercicios en [Android App Reverse Engineering 101](https://www.ragingrock.com/AndroidAppRE/)
- (Solo Windows) En este punto, deberías estar familiarizado con el desmontaje de binarios de Windows, la lectura del assembly x86 y el uso de ese conocimiento para comprender lo que hace un programa. Vuelva a su máquina virtual REMnux y analice el malware de Windows que descargó anteriormente. ¡Siéntase libre de repasar el material de capacitación anterior y realizar investigaciones complementarias mientras lo hace!
