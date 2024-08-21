---
style: introduction
title: Introduction
description: Lisez la présentation du parcours d'apprentissage, les objectifs, les menaces associées et les prérequis.
weight: 1
---

## Présentation

Ce parcours d'apprentissage vous préparera à vous lancer dans l'aventure de l'analyse des logiciels malveillants. Notez qu'il s'agit de l'un des domaines de sécurité les plus difficiles à maîtriser, mais où vos avancées progressives donneront des résultats. L'objectif général de l'analyse des logiciels malveillants est de caractériser les nouveaux logiciels malveillants et les variantes existantes. Le résultat final souhaité est une caractérisation des capacités du logiciel malveillant, une estimation de l'utilisation qu'en font les acteurs des menaces, et un ensemble d'IoC (indicateurs de compromission) qui permettront aux autres intervenants de détecter le logiciel malveillant.

Voici quelques points à garder à l'esprit au cours de votre parcours d'apprentissage :

- Ne négligez pas les prérequis. Vous devez avoir une base de connaissances solide sur laquelle vous développer.
- Ce parcours d'apprentissage couvre deux plateformes (Windows et Android). Il est probablement préférable de vous concentrer sur une plateforme à la fois. Bien que les concepts généraux s'appliquent à toutes les plateformes, les techniques et les outils spécifiques peuvent différer considérablement. Si vous n'avez pas beaucoup d'expérience en rétro-ingénierie et en débogage de bas niveau, nous vous recommandons de commencer avec Windows, car un plus grand nombre de ressources sont disponibles pour l'analyse de programmes Windows.
- N'ayez pas peur de demander de l'aide. Des organisations comme CiviCERT peuvent vous aider à communiquer avec d'autres personnes qui peuvent collaborer avec vous pour analyser de nouveaux logiciels malveillants.

## Objectif

Les participants apprendront à :

- Configurer un environnement d'analyse de logiciels malveillants
- Distinguer les différents types de fichiers
- Effectuer une analyse dynamique de base dans un bac à sable
- Effectuer une analyse statique de base
- Rédiger les conclusions et partager les indicateurs de compromission

## Quelles menaces cette compétence permet-elle d'atténuer ou de gérer ?

Compromission de l'appareil et exfiltration des données via des logiciels malveillants d'ordinateurs et appareils mobiles

## Quels sont les prérequis ?

Ce parcours d'apprentissage est avancé. Avant de l'entreprendre, les apprenants doivent :

- Terminer le parcours d'apprentissage sur la _Détection des logiciels malveillants_, qui présente les principes fondamentaux des logiciels malveillants. En règle générale, vous utiliserez uniquement les informations que vous apprendrez ci-dessous pour effectuer une analyse plus approfondie des logiciels malveillants suspects qui n'ont pas été détectés à l'aide d'IoC existants, de sorte que ce parcours d'apprentissage peut être considéré comme une continuation de la détection des logiciels malveillants.
- Terminer le parcours d'apprentissage [_Détection, enquête et suivi des infrastructures malveillantes_](/fr/learning-path/1/), qui enseigne les bases du DNS, du courrier électronique et du HTTP dont vous aurez besoin pour comprendre le comportement des logiciels malveillants.
- En fonction de la plateforme et des logiciels malveillants que vous analysez, vous aurez probablement besoin de connaissances en programmation et en système d'exploitation. En plus des compétences de base en ligne de commande, vous devrez avoir certaines connaissances concernant les langages de programmation et les architectures de sécurité utilisées par les principaux systèmes d'exploitation. Les exemples peuvent inclure C/C++ et l'assemblage x86 pour Windows, Java ou Kotlin pour Android, etc.
- (facultatif) Selon le logiciel malveillant, vous devrez peut-être également pouvoir lire des langages de script tels que Perl, PowerShell, bash, etc. Les sections pour chaque plateforme devraient inclure des liens vers certaines ressources de soutien, mais vous devrez peut-être effectuer des recherches et des examens en dehors du cadre du parcours d'apprentissage selon ce que vous analysez.

## De quels appareils ou logiciels avez-vous besoin pour réaliser les exercices ?

Vous aurez besoin d'un appareil suffisamment puissant pour exécuter une machine virtuelle. Nous vous recommandons d'utiliser une machine avec un processeur x86 et au moins 8 Go de mémoire RAM.

Vous aurez besoin de suffisamment d'espace disque libre et de bande passante pour pouvoir exécuter et installer une machine virtuelle Linux. Bien que REMNux et Kali Linux soient des outils idéaux, d'autres distributions pourraient également fonctionner, même si elles peuvent nécessiter un travail supplémentaire avec des outils d'installation manuelle.

Si vous avez déjà configuré votre propre environnement de machine virtuelle pour l'analyse des logiciels malveillants, vous pouvez l'utiliser. Si ce n'est pas le cas, nous vous guiderons à travers le processus de configuration dans le sous-thème 1.

## Parcours d'apprentissage connexes

Nous recommandons fortement de terminer les parcours d'apprentissage _Détection des logiciels malveillants_ et _Détection, enquête et suivi des infrastructures malveillantes_ à titre de conditions préalables à ce parcours.

Certains logiciels malveillants sont livrés comme une application Web ou une exploitation de faille de navigateur. Certaines des compétences couvertes dans le parcours d'apprentissage _Principes fondamentaux de la sécurité sur le Web_ vous aideront à analyser les logiciels malveillants sur le Web.
