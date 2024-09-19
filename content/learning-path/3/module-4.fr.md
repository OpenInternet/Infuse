---
style: module
title: Analyse statique
description: L'analyse statique est le processus de désassemblage d'un fichier
  binaire afin de comprendre ce qu'il contient. C'est un travail assez laborieux
  et nécessite des connaissances en ingénierie logicielle.
weight: 4
---

## Cas d'utilisation

L'analyse statique est le processus de désassemblage d'un fichier binaire afin de comprendre ce qu'il contient. Il est assez exigeant en main-d'œuvre et nécessite des connaissances en génie logiciel. Pour cette raison, la plupart des analystes préfèrent effectuer une analyse dynamique (sur laquelle nous nous concentrons dans le sous-thème 3). Il y a plusieurs raisons pour lesquelles vous pourriez vouloir faire une analyse statique, y compris lorsque l'analyse dynamique ne donne pas de bons résultats ou si vous ne voulez pas qu'un cybercriminel potentiel sache que vous êtes en possession et que vous analysez le fichier.

Ce sous-thème examine une compétence très avancée et les guides qu'il relie prendront beaucoup de temps pour être complétés. Si vous n'avez pas actuellement le temps de vous concentrer sur ce sujet et que vous voulez plutôt savoir quoi faire avec les résultats de l'analyse dynamique, passez au sous-thème 5.

### Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre dans quels cas l'analyse statique peut être plus appropriée que l'analyse dynamique
- Être capable d'effectuer une analyse statique de base dans Windows ou Android à l'aide d'outils disponibles sur le marché

---
## Section Principale

L'analyse statique est le processus de détermination d'informations au sujet d'un logiciel malveillant sans l'exécuter. Techniquement, l'analyse de base des fichiers que vous avez effectuée ci-dessus est une forme d'analyse statique. Cependant, nous nous référons généralement à l'analyse statique des logiciels malveillants comme l'apprentissage des actions que le logiciel malveillant effectuera. Cela implique généralement de prendre un programme binaire compilé, de le décompiler, puis de lire le code résultant. Une alternative est l'analyse dynamique, qui consiste à exécuter le logiciel malveillant pour observer son comportement.

L'analyse statique présente certains avantages par rapport à l'analyse dynamique. Tout d'abord, puisque vous n'exécutez pas le logiciel malveillant, vous êtes moins susceptible d'être infecté(e) (et les cas des logiciels malveillants capables d'échapper à une machine virtuelle ou à un bac à sable sont rares). En outre, si vous n'exécutez pas le logiciel malveillant, il est peu probable que vous alertiez les auteurs de la menace que leur logiciel malveillant a été découvert. En outre, les logiciels malveillants sophistiqués peuvent tenter de découvrir s'ils sont analysés lors de leur exécution. S'ils déterminent qu'ils sont en cours d'analyse, ils peuvent modifier leur comportement et aboutir à une analyse incorrecte.

D'autre part, l'analyse statique peut s'avérer très longue et difficile, et les auteurs de logiciels malveillants peuvent utiliser une variété de techniques de brouillage (telles que le chiffrement, l'emballage et le téléchargement dynamique des étapes ultérieures) pour rendre l'analyse statique encore plus difficile.

Bien que l'accent dans ce parcours d'apprentissage soit mis sur l'analyse statique des programmes binaires compilés, gardez à l'esprit que de nombreux logiciels malveillants sont plus faciles à analyser, étant écrits en HTML/JavaScript, langages de script shell, etc.

### Windows

Pour commencer avec l'analyse statique de Windows, nous allons mettre de côté REMnux et parcourir un ensemble de tutoriels sur la rétro-ingénierie des logiciels malveillants Windows. Ce tutoriel inclut un peu d'analyse dynamique, mais s'oriente fortement sur l'analyse statique. Par souci de cohérence, vous devriez passer en revue les exercices décrits ci-dessous. N'oubliez pas que si vous trouvez des outils que vous appréciez et qui ne font pas partie de REMnux, vous pouvez les ajouter à votre MV REMnux. (Vous pouvez également recommencer à tout moment avec une MV vierge, si vous le souhaitez.)

#### Windows : ressources d'apprentissage
{{% resource title="Ingénierie inverse des logiciels malveillants Windows 101" description="Un cours excellent et complet sur la rétro-ingénierie des logiciels malveillants Windows. Notez que ces exercices sont une introduction non-gentle, vous devrez peut-être mener des études supplémentaires (ressources ci-dessous) afin de comprendre certains exercices. Cela peut prendre plusieurs jours." languages="Anglais" cost="Gratuit" url="https://malwareunicorn.org/workshops/re101.html" %}}
{{% resource title="Ingénierie inverse des logiciels malveillants Windows 102" description="Un cours excellent et complet sur la rétro-ingénierie des logiciels malveillants Windows. Notez que ces exercices sont une introduction non-gentle, vous devrez peut-être mener des études supplémentaires (ressources ci-dessous) afin de comprendre certains exercices. Cela peut prendre plusieurs jours." languages="Anglais" cost="Gratuit" url="https://malwareunicorn.org/workshops/re102.html" %}}
{{% resource title="Cours OpenSecurityTraining2" description="Cours qui fournissent une plongée très approfondie sur l'architecture de système de bas niveau et l'inversion." languages="Anglais" cost="Gratuit, payé avec assistance d'un instructeur" url="https://p.ost2.fyi/courses" %}}
{{% resource title="OpenSecurity Training" description="Parcours d'apprentissage OpenSecurity pour l'analyse des logiciels malveillants" languages="Anglais" cost="Gratuit" url="https://opensecuritytraining.info/Malware%20Analysis.html" %}}
{{% resource title="Rétro-ingénierie Windows en utilisant x64dbg" description="Cette série de vidéos se concentre spécifiquement sur l'utilisation de x64dbg, un outil de débogage open source, pour l'ingénierie inverse des logiciels malveillants sur Windows" languages="Espagnol" cost="Gratuit" url="https://www.youtube.com/watch?v=Af5pvCl0CBE&list=PLn__CHOEZR1Ymxi2n4Q9G9I9kBYr6B4Ft" %}}

### Android

Bien que les logiciels Windows soient généralement écrits en assembleur x86 ou x64, les binaires sur Android ciblent généralement une machine virtuelle appelée Android Runtime (ART), qui est similaire à la machine virtuelle Java. Ce bytecode ART peut généralement être automatiquement inversé en Java, par opposition au bytecode x86/x64, qui ne peut généralement être inversé que par assembleur. Avant de vous réjouir, notez qu'il existe de nombreux outils de brouillage qui peuvent facilement rendre le code Java obtenu par rétro-ingénierie presque illisible, et qu'Android prend également en charge le code natif via la [bibliothèque NDK](https://developer.android.com/ndk/guides?hl=fr). Notez que la plupart des appareils Android ont des architectures basées sur ARM, pas x86/x64. Vous devrez donc apprendre l'assembleur ARM pour obtenir par rétro-ingénierie la plupart du code natif Android que vous trouverez.

Vous pouvez également rencontrer le langage de programmation Kotlin lors de l'apprentissage sur Android. Kotlin et Java compilent sur le même bytecode et sont très similaires à un niveau de base. Lors d'une analyse statique sur une application Android, le langage de programmation d'origine ne devrait pas être significatif. Nous vous recommandons de vous concentrer sur Java, car les décompilateurs disponibles transforment ART en Java, pas en Kotlin.

Comme pour la section d'analyse statique Windows, cette section sur l'analyse statique Android est ancrée dans un cours excellent et complet, mais peu agréable. Vous aurez probablement besoin de mener des études supplémentaires afin de comprendre le contenu du cours principal.

#### Android : ressources d'apprentissage

{{% resource title="ngénierie Inverse des Applications Android 101" languages="Anglais" cost="Gratuit" description="Cours complet sur l'ingénierie inverse des applications Android." url="https://www.ragingrock.com/AndroidAppRE/" %}}

{{% resource title="Comment analyser statiquement une application Android suspecte" languages="Anglais" cost="Gratuit" description="Introduction intermédiaire à l'analyse statique des applications Android." url="https://pts-project.org/guides/g5/" %}}

{{% resource title="Cours Codecademy 'Learn Java'" languages="Anglais" cost="Gratuit" description="Introduction de base à la programmation Java." url="https://www.codecademy.com/enrolled/courses/learn-java" %}}

{{% resource title="Créez votre première application Android en Java" languages="Anglais, Chinois, Indonésien, Japonais, Coréen, Portugais, Espagnol" cost="Gratuit" description="Cours de base sur la création d'applications Android en utilisant Java." url="https://developer.android.com/courses/android-basics-compose/course?hl=fr" %}}

## Contrôle de compétence

Asseyez-vous avec un pair ou un mentor qui a une expérience significative dans les enquêtes passives contre les serveurs sur Internet. Puis :

- Complétez les exercices [Logiciel malveillant de base RE](https://tryhackme.com/room/basicmalwarere) (gratuits) sur TryHackMe
- (Android uniquement) Effectuez les exercices dans [Rétro-ingénierie des applications Android 101](https://www.ragingrock.com/AndroidAppRE/)
- (Windows seulement) À ce stade, vous devriez avoir certaines connaissances concernant le désassemblage des binaires Windows, la lecture de l'assemblage x86, et l'utilisation de ces connaissances pour comprendre ce qu'un programme réalise. Revenez à votre MV REMnux et analysez le logiciel malveillant Windows que vous avez téléchargé précédemment. N'hésitez pas à revenir sur le matériel de formation ci-dessus et à faire des recherches supplémentaires !
