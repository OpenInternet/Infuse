+++
style = "module"
weight = 9
title = "Análisis de documentos maliciosos"
description = "Aprendemos a analizar documentos sospechosos y potencialmente maliciosos"
+++

## Estudio de caso

Si bien muchas personas saben que deben sospechar de los archivos binarios ejecutables, desafortundamente los formatos de documentos de office como PDF, DOC, DOCX, XLSX y ODT, que se utilizan a diario, también son manipulados para infiltrarles contenido dinámico malicioso o *exploits* de aplicaciones.

En este módulo aprenderá cómo puede hacer un triaje o clasificación y analizar documentos potencialmente maliciosos.


## Objetivos

Después de completar este módulo, el profesional debe ser capaz de:

- Configura una máquina virtual REMNux para el análisis del documento.
- Desensamblar y analizar documentos PDF.
- Desmontar y analizar documentos de Microsoft Office.

---
## Sección Principal

Muchos agentes de amenazas pueden utilizar documentos con cargas útiles (*payloads*) como vector de ataque. Lea toda [esta página](https://cyberhub.am/en/blog/2023/10/25/technical-writeup-malware-campaigns-targeting-armenian-infrastructure-and-users/) para conocer un estudio de caso al respecto.

_Greater Internet Freedom_, un proyecto de Internews, creó recientemente un pequeño curso sobre análisis de documentos maliciosos. Lea las cuatro partes del curso (enumeradas a continuación) para completar este módulo.

Tenga en cuenta que algunas de las herramientas incluidas en esta guía requieren que Python esté instalado en su sistema. Los sistemas MacOS y Linux pueden tener Python instalado de forma predeterminada. Si está ejecutando Windows, le recomendamos configurar [WSL (Windows Subsystem para Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) y ejecutar las herramientas desde allí.

[Parte 1 - Introducción y las VM - Internews Greater Internet Freedom](https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-1-ES.pdf)

[Parte 2 - PDF Documents](https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-2-ES.pdf)

[Parte 3 - Documentos de Microsoft Office](https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-3-ES.pdf)

[Parte 4 Medidas Defensivas y Próximos Pasos](https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-4-ES.pdf)

## Verificación de habilidades

Completa todos los desafíos contenidos en el curso cuyo enlace verá arriba.

## Recursos de Aprendizaje

{{% resource title="Análisis de documentos maliciosos – Parte 01 – Introducción y VM" description="Introduce el tema del análisis de documentos maliciosos y muestra a los estudiantes cómo configurar una VM adecuada para la tarea." languages="Inglés" cost="Gratis" url="https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-1-ES.pdf" %}}
{{% resource title="Análisis de documentos maliciosos – Parte 02 – Documentos PDF" description="Muestra cómo se pueden utilizar herramientas como editores de texto y desensambladores de PDF especializados para analizar archivos en ese formato y buscar elementos como *scripts* ejecutables." languages="Inglés" cost="Gratis" url="https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-2-ES.pdf" %}}
{{% resource title="Análisis de documentos maliciosos – Parte 03 – Documentos de Microsoft Office" description="Analiza la estructura de los documentos de Microsoft Office y cómo pueden integrar contenido activo" languages="Inglés" cost="Gratis" url="https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-3-ES.pdf" %}}
{{% resource title="Análisis de documentos maliciosos – Parte 04 – Medidas defensivas, próximos pasos y cierre" description="Demuestra algunos pasos y contramedidas que podemos tomar cuando trabajamos con documentos de fuentes desconocidas o archivos potencialmente maliciosos" languages="Inglés" cost="Gratis" url="https://internews.org/wp-content/uploads/2024/12/Analisis-de-documentos-maliciosos-parte-4-ES.pdf" %}}
{{% resource title="Análisis de archivos PDF maliciosos" description="Una serie de herramientas que podríamos usar para un análisis aún más profundo de archivos PDF" languages="Inglés" cost="Gratis" url="https://resources.infosecinstitute.com/topics/hacking/analyzing-malicious-pdf/" %}}
{{% resource title="Cómo analizar archivos maliciosos de Microsoft Office" description="Un recurso adicional que analiza cómo los archivos de Microsoft Office podrían servir como payloads maliciosos y cómo podemos detectarlos" languages="Inglés" cost="Gratis" url="https://intezer.com/blog/malware-analysis/analyze-malicious-microsoft-office-files/" %}}