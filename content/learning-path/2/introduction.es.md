---
style: introduction
title: Introducción
description: Lea la descripción general de la ruta de aprendizaje, los
  objetivos, las amenazas asociadas y los requisitos previos.
weight: 1
---

## Visión general

Esta ruta de aprendizaje cubre conocimientos y habilidades de nivel intermedionecesarios para detectar e identificar malware a partir de una muestra o en una variedad de plataformas de dispositivos. Diferenciar entre malware y software puede ser imperceptible. A veces, un análisis detallado de procesos y binarios para determinar qué es malware requiere de una experiencia a nivel avanzado. Sin embargo, las habilidades que se cubren en esta ruta le permitirán iniciarse en el tema de la detección. Los puntos que se tratan aqui incluyen:

-Las habilidades blandas y las consideraciones éticas para interactuar con personas que son potenciales objetivos de ataque malware.
-Proteger la privacidad y los datos del cliente.
-Herramientas de detección de malware listas para usar.
-Métodos estáticos y dinámicos para investigar una muestra y determinar si es maliciosa.
-Métodos basados ​​en red para investigar una muestra y determinar si es maliciosa.
-Recopilación de datos para el análisis de un dispositivo que se puede infectar y retención segura de muestras para realizar análisis más a fondo.
-Qué hacer después de descubrir el malware: investigación, limpieza y gestión de riesgo.
-Limpieza de malware de sistemas infectados.


## Lectura de fondo

📕 Los atacantes, especialmente aquellos relacionados o que forman parte del Estado, llevan mucho tiempo utilizando malware para atacar a grupos de la sociedad civil. Ataques de este tipo, perpetrados por grupos de hackeo por encargo, lograron [desactivar un sitio web de noticias](https://www.amnesty.org/en/latest/research/2016/12/how-a-hacking-campaign-helped-shut-down-an-award-winning-news-site/), obteniendo importantes contratos estatales, como lo muestran los artículos sobre los mercenarios cibernéticos de la India publicados por [The New Yorker](https://www.newyorker.com/news/annals-of-crime/a-confession-exposes-indias-secret-hacking-industry), [Reuters](https://www.reuters.com/investigates/special-report/usa-hackers-litigation/), y [Citizen Lab](https://citizenlab.ca/2020/06/dark-basin-uncovering-a-massive-hack-for-hire-operation/).

A principios de la década de 2020, los programas espía *(spyware)* producidos comercialmente como [Predator](https://eic.network/projects/predator-files.html) y [especialmente Pegasus](https://www.amnesty.org/en/latest/news/2022/03/the-pegasus-project-how-amnesty-tech-uncovered-the-spyware-scandal-new-video/) dominaban los titulares en los medios de comunicación. Estos programas se utilizaban para atacar regularmente a periodistas, activistas y políticos. Si bien la mayoría de los programas maliciosos son mucho más mundanos y se utilizan para distribuir anuncios o generar criptomonedas, la existencia de malware sofisticado patrocinado por el Estado, preocupa a muchos activistas de la sociedad civil por las potenciales infecciones que pueden provocar.

## Objetivo

En este módulo, los profesionales aprenderán como:

- Practicar las habilidades blandas y las consideraciones éticas para interactuar con personas que son potenciales objetivos de ataque malware.
- Tomar medidas para proteger la privacidad y los datos de los clientes.
- Utilizar provechosamente herramientas de detección de malware.
- Utilizar métodos estáticos y dinámicos para investigar una muestra y determinar si es maliciosa.
- Utilizar métodos basados ​​en red para investigar una muestra y determinar si es maliciosa.
- Investigar documentos de Microsoft Office para determinar si son potencialmente maliciosos.
- Recopilar y analizar datos de un dispositivo potencialmente infectado, y guardar muestras de forma segura para realizar un análisis posterior más a fondo.
- Realizar trabajos posteriores a la detección, incluida la planificación de la investigación, la limpieza y la gestión del riesgo.

¿Qué amenazas mitiga o a cuáles responde esta habilidad?

Las habilidades de detección de malware pueden ayudar en estos casos:

- Vulneración de cuentas, dispositivos o sitios web.
- Infecciones de malware (ransomware, spyware, adware, etc.).
- Investigación de posible vulneración.


¿Cuáles son los prerrequisitos?

- Habilidades básicas de TI: Comprender conceptos como imágenes de disco, archivos ejecutables y diferentes tipos de malware.
- Comprensión de las prácticas comunes de protección/fortalecimiento del Sistema Operativo y el uso por parte de “usuarios avanzados” de la plataforma del sistema operativo elegido.
- Conocimientos básicos de línea de comando: Ser capaz de ejecutar comandos desde la línea de comandos y comprender cuál es la sintaxis de los argumentos de dicha línea.

¿Qué dispositivos o software necesitas para los ejercicios?

Dependiendo del escenario, es posible que esté implementando pasos para la detección directamente en el dispositivo en cuestión, mientras que en otros casos tal vez necesite una máquina configurada especialmente para el análisis, en cuyo caso se recomienda lo siguiente:

-Primer dispositivo (dispositivo afectado): Al menos un dispositivo que ejecute Windows, macOS, Linux, Android o iOS en el que buscará el malware.
-Segundo dispositivo (dispositivo de análisis): Otro dispositivo que ejecute Windows, macOS o Linux que pueda utilizar para ejecutar escaneo en el primer dispositivo. Escanear dispositivos iOS utilizando el conjunto de herramientas solo es posible (al momento de escribir este texto ) vía macOS o Linux.
- Suficiente espacio de almacenamiento en el segundo dispositivo o en un disco duro externo/unidad de estado sólido para realizar una copia de seguridad de la totalidad del primer dispositivo (en caso de que se requieran imágenes y análisis forenses)

(Opcional) Solo para la módulo 6, necesitarás acceso a una Raspberry Pi.

## Rutas de aprendizaje relacionadas

Como todo en el tema de seguridad, esta ruta de aprendizaje beneficia y, a su vez, se ve beneficiada por el conocimiento proveniente de otras áreas. En particular, las siguientes rutas de aprendizaje tienen una buena sinergia entre si:

- [Analizando el Malware](/es/learning-path/3/): Analizar el malware para entender cómo funciona y qué hace. Además, esta ruta de aprendizaje ofrece conocimientos básicos y de nivel intermedio para aquellas personas que quieran averiguar de forma estática, dinámica y basada en red si una determinada muestra es maliciosa. En aquellos casos en los que estos métodos no sean suficientes, en otros módulos de esta ruta de aprendizaje se pueden encontrar habilidades de análisis adicionales.
- [Investigación, Seguimiento y Detección de Infraestructura Maliciosa](/es/learning-path/1/): El malware dirigido generalmente se comunica con la infraestructura de comando y control, extracción o entrega. Esta ruta de aprendizaje le ayudará a investigar y comprender esta infraestructura.
- [Fundamentos de Seguridad de Aplicaciones Web](/es/learning-path/4/): un malware se entrega como aplicación web o *exploit* de navegador. Algunas de las habilidades que se cubren en esta ruta de aprendizaje te ayudarán con la detección y análisis de malware basado en navegador.
