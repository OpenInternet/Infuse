+++
style = "module"
weight = 9
title = "Analyse de documents malveillants"
+++

## Cas d'utilisation

Bien que la plupart des gens savent se méfier des fichiers binaires exécutables, les formats de documents Office tels que PDF, DOC, DOCX, XLSX et ODT, qui sont utilisés quotidiennement, sont malheureusement connus pour être utilisés comme des armes par le biais de contenu dynamique malveillant ou par l'exploitation de failles dans les applications.

Ce sous-sujet enseigne aux apprenants comment trier et analyser des documents potentiellement malveillants.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Configurer une machine virtuelle REMNux pour effectuer l'analyse de documents
- Désassembler et analyser les documents PDF
- Désassembler et analyser les documents Microsoft Office

---
## Section Principale

De nombreux auteurs de menaces peuvent utiliser des documents contenant des charges utiles malveillantes comme vecteur d'attaque. Consultez [cette page](https://cyberhub.am/en/blog/2023/10/25/technical-writeup-malware-campaigns-targeting-armenian-infrastructure-and-users/) pour obtenir une étude de cas.

_Greater Internet Freedom_, un projet d'Internews, a récemment créé un petit cours sur l'analyse de documents malveillants. Lisez les quatre parties du cours (énumérées ci-dessous) pour terminer ce sous-thème.

Veuillez noter que certains des outils inclus dans ce guide nécessitent l'installation de Python sur votre système. Les systèmes MacOS et Linux peuvent comprendre une installation de Python par défaut. Si vous utilisez Windows, nous vous recommandons de configurer [WSL (Windows Subsystem pour Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) et d'exécuter les outils à partir de là.

[Partie 1 : Introduction et MV, Greater Internet Freedom d'Internews](https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-1-FR.pdf)

[Partie 2 : Documents PDF](https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-2-FR.pdf)

[Partie 3 : Documents Microsoft Office](https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-3-FR.pdf)

[Partie 4 : Mesures défensives et étapes suivantes](https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-4-FR.pdf)

## Contrôle de compétence

Complétez tous les défis du cours lié ci-dessus.

## Ressources d'apprentissage

{{% resource title="Analyse de documents malveillants (Partie 1) : Introduction et MV" description="Présente le sujet de l'analyse des documents malveillants et montre aux apprenants comment configurer une machine virtuelle appropriée pour réaliser cette tâche" languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-1-FR.pdf" %}}
{{% resource title="Analyse de documents malveillants (Partie 2) : Documents PDF" description="Montre comment des outils tels que des éditeurs de texte et des désassembleurs PDF spécialisés peuvent être utilisés pour analyser des fichiers dans ce format afin de rechercher des éléments tels que des scripts exécutables" languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-2-FR.pdf" %}}
{{% resource title="Analyse de documents malveillants (Partie 3) : Documents Microsoft Office" description="Examine la structure des documents Microsoft Office et la façon dont ils peuvent intégrer du contenu actif" languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-3-FR.pdf" %}}
{{% resource title="Analyse de documents malveillants (Partie 4) : Mesures défensives, étapes suivantes et conclusion" description="Démontre certaines mesures et contre-mesures que nous pouvons prendre lorsque nous travaillons avec des documents provenant de sources inconnues ou de fichiers potentiellement malveillants" languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2024/12/Analyse-de-documents-malveillants-partie-4-FR.pdf" %}}
{{% resource title="Analyse de fichiers PDF malveillants" description="Une série d'outils que nous pouvions utiliser pour effectuer une analyse encore plus approfondie des fichiers PDF" languages="Anglais" cost="Gratuit" url="https://resources.infosecinstitute.com/topics/hacking/analyzing-malicious-pdf/" %}}
{{% resource title="Comment analyser les fichiers Microsoft Office malveillants" description="Une ressource supplémentaire qui examine comment les fichiers Microsoft Office pourraient servir des charges utiles malveillantes et comment nous pouvons les détecter" languages="Anglais" cost="Gratuit" url="https://intezer.com/blog/malware-analysis/analyze-malicious-microsoft-office-files/" %}}