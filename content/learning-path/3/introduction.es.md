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

## Objective

Practitioners will learn how to:

- Set up a malware analysis environment
- Distinguish between different types of files
- Conduct basic dynamic analysis in a sandbox
- Conduct basic static analysis
- Write up findings and share indicators of compromise

## What threats does this skill mitigate or respond to?

Device compromises and data exfiltration through desktop and mobile malware

## What are the prerequisites?

This learning path is an advanced one. Prior to undertaking it, learners should:

- Complete the _Detecting Malware_ learning path, which covers the fundamentals of malware. Typically, you would only use the information you will learn below to perform further analysis on suspected malware that was not detected using existing IoCs, so this learning path can be viewed as a continuation of Detecting Malware.
- Complete the _[Investigating, Tracking, Detecting Malicious Infrastructure](/es/learning-path/1/) learning path_, which teaches fundamentals about DNS, email, and HTTP that you will need to understand malware behavior
- Based on both the platform and malware you’re analyzing, you are likely to need some programming and operating system knowledge. In addition to basic command line skills, you will need to know a bit about the programming languages and security architectures present on major operating systems. Examples may include C/C++ and x86 assembly for Windows, Java or Kotlin for Android, etc.
- (optional) Depending on the malware, you might also need to be able to read scripting languages such as Perl, PowerShell, bash, etc. The sections for each platform should include links to some resources to support this, but you may need to do research and study outside of the learning path depending on what you’re analyzing.

## What devices or software do you need for the exercises?

You will require a device which is powerful enough to run a virtual machine. We recommend using a machine with an x86 processor and at least 8GB of RAM.

You will require sufficient free disk space and bandwidth to be able to run and install a Linux virtual machine. While REMNux and Kali Linux are ideal, other distributions could also work, though they might require additional work with manually installing tools.

If you already have your own malware analysis virtual machine environment set up, you can use it. If not, we will guide you through the setup process in subtopic 1.

## Related learning paths

We strongly recommend treating the Detecting Malware and Detecting, Tracking, Investigating Malicious Infrastructure learning paths as prerequisites to this one.
Some malware is delivered as a web application or a browser exploit. Some of the skills covered in the Web Security Fundamentals learning path will help you with web-based malware analysis.
