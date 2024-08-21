---
style: introduction
title: "Introducción"
description: "Read the learning path overview, objectives, associated threats and prerequisites."
weight: 1
---

## Visión general

Esta ruta de aprendizaje cubre conocimientos y habilidades de nivel intermedio necesarios para detectar e identificar malware a partir de una muestra u operando activamente en un dispositivo, en una variedad de plataformas de dispositivos. La distinción entre malware y software puede ser muy imperceptible, y un análisis detallado de procesos y binarios para determinar en definitiva qué es malware a veces requiere experiencia de nivel avanzado. Sin embargo, las habilidades que se cubren aquí te darán una iniciación en los esfuerzos de detección. Esta ruta de aprendizaje cubre:

- Las habilidades blandas y las consideraciones éticas para interactuar con personas que son potenciales objetivos de ataque malware.
- Proteger la privacidad y los datos del cliente.
- Herramientas de detección de malware listas para usar.
- Métodos estáticos y dinámicos para investigar una muestra para determinar si es maliciosa.
- Métodos basados ​​en red para investigar una muestra para determinar si es maliciosa.
- Recopilación de datos para análisis de un dispositivo que se puede infectar y retención segura de muestras para análisis más a fondo.
- Qué hacer después de descubrir el malware: Investigación, limpieza y gestión de riesgo.
- Limpieza de malware de sistemas infectados.

## Lectura de fondo

📕 Los atacantes, especialmente aquellos relacionados o parte del estado, llevan mucho tiempo utilizando malware para atacar a grupos de la sociedad civil. Estos ataques lograron [derribar un sitio web de noticias](https://www.amnesty.org/en/latest/research/2016/12/how-a-hacking-campaign-helped-shut-down-an-award-winning-news-site/), con grupos de hackeo por encargo, obteniendo importantes contratos estatales, como lo muestran los artículos sobre los mercenarios cibernéticos de la India publicados por [The New Yorker](https://www.newyorker.com/news/annals-of-crime/a-confession-exposes-indias-secret-hacking-industry), [Reuters](https://www.reuters.com/investigates/special-report/usa-hackers-litigation/), y [Citizen Lab](https://citizenlab.ca/2020/06/dark-basin-uncovering-a-massive-hack-for-hire-operation/).

A principios de la década de 2020, el spyware producido comercialmente, como [Predator](https://eic.network/projects/predator-files.html) y [especialmente Pegasus](https://www.amnesty.org/en/latest/news/2022/03/the-pegasus-project-how-amnesty-tech-uncovered-the-spyware-scandal-new-video/) dominaba los titulares, y ambos atacaban regularmente a periodistas, activistas y políticos. Si bien la mayoría del malware es mucho más rutinaria y se utiliza para entregar anuncios o la minería de criptomonedas, la existencia de malware sofisticado, patrocinado por el Estado significa que muchos activistas de la sociedad civil probablemente están preocupados por cualquier infección potencial.

## Objetivo

Profesionales aprenderán como:

- Practicar las habilidades blandas y las consideraciones éticas para interactuar con personas que son potenciales objetivos de ataque malware.
- Tomar medidas para proteger la privacidad y los datos de los clientes.
- Utilizar provechosamente herramientas de detección de malware listas para usar.
- Utilizar métodos estáticos y dinámicos para investigar una muestra y determinar si es maliciosa.
- Utilizar métodos basados ​​en red para investigar una muestra para determinar si es maliciosa.
- Investigar Documentos de Microsoft Office para determinar si son potencialmente maliciosos.
- Recopilar datos de un dispositivo que se puede infectar para análisis y, posteriormente retener de forma segura muestras para análisis más a fondo.
- Realizar trabajos posteriores a la detección, incluida la planificación de la investigación, la limpieza y la gestión del riesgo.

¿Qué amenazas mitiga o a cuáles responde esta habilidad?

Las habilidades de detección de malware pueden ayudar a responder a:

- Dispositivo, sitio web, cuenta comprometida.
- Infecciones de malware (ransomware, spyware, adware, etc.).
- Investigando la posibilidad de comprometimiento.

¿Cuáles son los prerrequisitos?

- Habilidades básicas de TI: Comprender conceptos como imágenes de disco, archivos ejecutables y diferentes tipos de malware.
- Comprensión de las prácticas comunes de protección/fortificación del Sistema Operativo y el uso por parte de "usuarios avanzados" de la plataforma del sistema operativo elegido.
- Conocimientos básicos de línea de comando: Ser capaz de ejecutar comandos desde la línea de comandos y comprender cuál es la sintaxis de los argumentos de la línea de comandos.

¿Qué dispositivos o software necesitas para los ejercicios?

Dependiendo del escenario, es posible que estés implementando pasos para la detección directamente en el dispositivo en cuestión, mientras que en otros casos tal vez necesite una máquina configurada separada para el análisis, en cuyo caso se recomienda lo siguiente:

- Primer dispositivo (dispositivo afectado): Al menos un dispositivo que ejecute Windows, macOS, Linux, Android o iOS en el que buscarás malware.
- Segundo dispositivo (dispositivo de análisis): Otro dispositivo que ejecute Windows, macOS o Linux que puedas utilizar para ejecutar escaneo en el primer dispositivo. Escanear dispositivos iOS utilizando el conjunto de herramientas solo es posible (en el momento de escribir) vía macOS o Linux.
- Suficiente espacio de almacenamiento en el segundo dispositivo o en un disco duro externo/unidad de estado sólido para realizar una copia de seguridad de la totalidad del primer dispositivo (en caso de que se requieran imágenes y análisis forenses)

(Opcional) Solo para la sección 5b, necesitarás acceso a una Raspberry Pi.

## Rutas de aprendizaje relacionadas

Como toda en seguridad, esta ruta de aprendizaje beneficia y se ve beneficiada por el conocimiento en áreas relacionadas. En particular, las siguientes rutas de aprendizaje tienen una buena sinergia:

- [Analizando el Malware](/es/learning-path/3/): Analizar el malware para entender cómo funciona y qué hace. Además, esta ruta de aprendizaje contiene enfoques para personas principiantes hasta intermedios, para determinar de forma estática, dinámica y basada en red si una muestra determinada es maliciosa; en caso de que dichos métodos no sean suficientes para una determinación, las habilidades de análisis adicionales se cubren en una ruta de aprendizaje subsecuente.
- [Investigación, Seguimiento y Detección de Infraestructura Maliciosa](/es/learning-path/1/): El malware dirigido generalmente se comunica con la infraestructura de comando y control, exfiltración o entrega. Esta ruta de aprendizaje ayudará a investigar y comprender esta infraestructura.

Fundamentos de Seguridad de Aplicaciones Web: un malware se entrega como aplicación web o exploit de navegador. Algunas de las habilidades que se cubren en esta ruta de aprendizaje te ayudarán con la detección y análisis de malware basado en navegador.
