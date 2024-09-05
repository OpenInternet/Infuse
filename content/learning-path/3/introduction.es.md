---
style: introduction
title: Introducción
description: Lea la descripción general del camino de aprendizaje, los objetivos, las amenazas asociadas y los requisitos previos.
weight: 1
---

## Descripción general

Esta ruta de aprendizaje te preparará para comenzar el camino del análisis de malware. Tenga en cuenta que esta es una de las áreas de seguridad más difíciles de dominar, pero el progreso incremental dará resultados. El objetivo general del análisis de malware es caracterizar nuevos malwares, tanto malwares nuevos como variantes de los existentes. El resultado final deseado es una caracterización de las capacidades del malware, una conjetura sobre qué actores de amenazas lo están utilizando y un conjunto de IoC (indicadores de compromiso) que permitirán a otros detectar el malware.

Algunas cosas que debes tener en cuenta a medida que avanzas en esta ruta de aprendizaje:

- Tómese en serio los requisitos previos. Debes tener una base sólida de conocimientos sobre la que construir.
- Esta ruta de aprendizaje abarca dos plataformas (Windows, Android). Probablemente sea mejor centrarse en una plataforma a la vez. Aunque los conceptos generales se aplican en todas las plataformas, las técnicas y herramientas específicas pueden diferir mucho. Si no tiene mucha experiencia en ingeniería inversa y depuración de bajo nivel, le recomendamos que comience con Windows, ya que hay muchos más recursos para el análisis de programas de Windows.
- No tenga miedo de pedir ayuda. Organizaciones como CiviCERT pueden ayudarte a conectarte con otras personas que pueden colaborar contigo en el análisis de malware novedoso.

## Objetivo

Los profesionales aprenderán a:

- Configurar un entorno de análisis de malware
- Distinguir entre diferentes tipos de archivos
- Realizar análisis dinámicos básicos en un entorno aislado
- Realizar análisis estáticos básicos
- Escriba los hallazgos y comparta los indicadores de compromiso

## ¿A qué amenazas mitiga o responde esta habilidad?

Compromisos de dispositivos y exfiltración de datos a través de malware de desktop y móvil

## ¿Cuáles son los requisitos previos?

Esta ruta de aprendizaje es avanzada. Antes de emprenderla, los alumnos deben:

- Completar la ruta de aprendizaje _Detección de Malware_, que cubre los fundamentos del malware. Por lo general, solo usaría la información que aprenderá a continuación para realizar un análisis adicional sobre el malware sospechoso que no se detectó utilizando los IoC existentes, por lo que esta ruta de aprendizaje se puede ver como una continuación de Detección de Malware.
- Completar la _ruta de aprendizaje_ [_Investigación, Seguimiento y Detección de Infraestructura Maliciosa_](/es/learning-path/1/), que enseña los fundamentos sobre DNS, correo electrónico y HTTP que necesitará para comprender el comportamiento del malware
- Basándote tanto en la plataforma como en el malware que estés analizando, es probable que necesites algunos conocimientos de programación y sistema operativo. Además de las habilidades básicas de línea de comandos, necesitará saber un poco sobre los lenguajes de programación y las arquitecturas de seguridad presentes en los principales sistemas operativos. Los ejemplos pueden incluir C/C++ y assembly x86 para Windows, Java o Kotlin para Android, etc.
- (opcional) Dependiendo del malware, es posible que también necesite poder leer lenguajes de scripting como Perl, PowerShell, bash, etc. Las secciones de cada plataforma deben incluir enlaces a algunos recursos para respaldar esto, pero es posible que debas investigar y estudiar fuera de la ruta de aprendizaje, dependiendo de lo que estés analizando.

## ¿Qué dispositivos o software necesitas para los ejercicios?

Necesitará un dispositivo que sea lo suficientemente potente como para ejecutar una máquina virtual. Recomendamos usar una máquina con un procesador x86 y al menos 8 GB de RAM.

Necesitará suficiente espacio libre en disco y ancho de banda para poder ejecutar e instalar una máquina virtual Linux. Si bien REMNux y Kali Linux son ideales, otras distribuciones también podrían funcionar, aunque podrían requerir trabajo adicional con la instalación manual de herramientas.

Si ya tiene configurado su propio entorno de máquina virtual de análisis de malware, puede usarlo. Si no es así, te guiaremos a través del proceso de configuración en el subtema 1.

## Rutas de aprendizaje relacionadas

Recomendamos encarecidamente tratar las rutas de aprendizaje [Detección de Malware](/es/learning-path/2/) y [Detección, Seguimiento e Investigación de Infraestructura maliciosa](/es/learning-path/1/) como requisitos previos para esta.

Algunos programas maliciosos se entregan como una aplicación web o un exploit del navegador. Algunas de las habilidades cubiertas en la ruta de aprendizaje de [Fundamentos de Seguridad Web](/es/learning-path/4) te ayudarán con el análisis de malware basado en la web.
