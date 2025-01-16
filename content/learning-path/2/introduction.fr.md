---
style: introduction
title: Introduction
description: Lisez la présentation du parcours d'apprentissage, les objectifs,
  les menaces associées et les prérequis.
weight: 1
---

## Présentation

Ce parcours d'apprentissage aborde les connaissances et les compétences de niveau intermédiaire nécessaires pour détecter et identifier les logiciels malveillants présents dans un échantillon donné ou exécutés activement sur un appareil sur diverses plateformes. La distinction entre les logiciels malveillants et les logiciels ordinaires peut être très subtile, et une analyse détaillée des processus et des exécutables visant à déterminer la nature d'un logiciel malveillant nécessite parfois une expertise de niveau avancé. Cependant, les compétences abordées ici vous donneront un point de départ dans vos efforts de détection. Ce parcours d'apprentissage couvre :

- Les compétences générales et considérations éthiques pour interagir avec des personnes potentiellement ciblées par des logiciels malveillants
- La protection de la vie privée et des données des clients
- Les outils de détection de logiciels malveillants disponibles sur le marché
- Les méthodes statiques et dynamiques d'enquête sur un échantillon pour déterminer s'il est de nature malveillante
- Les méthodes d'enquête en réseau pour déterminer si un échantillon est de nature malveillante
- La collecte de données pour permettre l'analyse à partir d'un dispositif potentiellement infecté et la conservation sécurisée des échantillons pour permettre une analyse ultérieure
- Que faire après la découverte d'un logiciel malveillant : enquête, nettoyage et gestion des risques
- Nettoyage des logiciels malveillants sur les systèmes infectés

##Lecture complémentaire

📕 Les cybercriminels, en particulier ceux basés sur un État, utilisent depuis longtemps des logiciels malveillants pour attaquer les groupes de la société civile. De telles attaques ont réussi à [fermer un site d'information](https://www.amnesty.org/en/latest/research/2016/12/how-a-hacking-campaign-helped-shut-down-an-award-winning-news-site/), avec des entreprises de piratage acceptant des contrats d'État majeurs, comme le montrent les articles sur les cyber-mercenaires indiens de [The New Yorker](https://www.newyorker.com/news/annals-of-crime/a-confession-exposes-indias-secret-hacking-industry), [Reuters](https://www.reuters.com/investigates/special-report/usa-hackers-litigation/) et [Citizen Lab](https://citizenlab.ca/2020/06/dark-basin-uncovering-a-massive-hack-for-hire-operation/).

Au début des années 2020, les logiciels espions produits commercialement tels que [Predator](https://eic.network/projects/predator-files.html) et surtout [Pegasus](https://www.amnesty.org/en/latest/news/2022/03/the-pegasus-project-how-amnesty-tech-uncovered-the-spyware-scandal-new-video/) ont fait les gros titres, les deux programmes ciblant régulièrement les journalistes, les militants et les politiciens. Bien que la plupart des logiciels malveillants soient beaucoup plus banals et utilisés pour diffuser des annonces ou miner des cryptomonnaies, l'existence de logiciels malveillants sophistiqués parrainés par les États signifie que de nombreux militants de la société civile doivent probablement se préoccuper des infections potentielles.

## Objectif

Les participants apprendront à :

- Mettre en pratique les compétences générales et les considérations éthiques pour interagir avec les personnes potentiellement ciblées par les logiciels malveillants
- Prendre des mesures pour protéger la vie privée et les données des clients
- Utiliser utilement les outils de détection de logiciels malveillants disponibles sur le marché
- Utiliser des méthodes statiques et dynamiques d'enquête sur un échantillon pour déterminer s'il est de nature malveillante
- Utiliser des méthodes d'enquête en réseau pour examiner un échantillon afin de déterminer s'il est de nature malveillante
- Examiner les documents Microsoft Office pour déterminer s'ils sont potentiellement malveillants
- Recueillir des données pour permettre l'analyse d'un appareil potentiellement infecté et conserver en toute sécurité des échantillons pour permettre une analyse ultérieure
- Effectuer des travaux post-détection, y compris la planification des enquêtes, le nettoyage et la gestion des risques

## Quelles menaces cette compétence permet-elle d'atténuer ou de gérer ?

Les compétences de détection de logiciels malveillants peuvent contribuer à réagir aux circonstances suivantes :

- Appareil, site Web ou compte compromis
- Infections de logiciels malveillants (ransomware, spyware, adware, etc.)
- Examen des possibilités de failles de sécurité

## Quels sont les prérequis ?

- Compétences informatiques de base : compréhension de concepts tels que les images de disques, les fichiers exécutables et les différents types de logiciels malveillants
- Compréhension des pratiques courantes de protection et de renforcement du système d'exploitation et de l'utilisation par les utilisateurs avertis de la plateforme du système d'exploitation choisi.
- Connaissance de base de la ligne de commande : pouvoir exécuter des commandes à partir de la ligne de commande et comprendre ce que sont les arguments des commandes.

De quels appareils ou logiciels avez-vous besoin pour réaliser les exercices ?

Selon le scénario, vous pouvez implémenter des étapes de détection directement sur l'appareil concerné, tandis que dans d'autres cas, vous pouvez avoir besoin d'une machine séparée configurée pour l'analyse, auquel cas les éléments suivants sont conseillés :

- Premier appareil (appareil concerné) : au moins un appareil exécutant Windows, macOS, Linux, Android ou iOS sur lequel vous recherchez des logiciels malveillants
- Deuxième appareil (appareil d'analyse) : un autre appareil exécutant Windows, macOS ou Linux que vous pouvez utiliser pour exécuter des analyses sur le premier appareil. L'analyse des appareils iOS à l'aide du jeu d'outils présenté est uniquement possible (au moment de la rédaction) via macOS ou Linux
- Un espace de stockage suffisant sur le deuxième périphérique ou sur un disque dur externe/disque SSD pour sauvegarder l'intégralité du premier appareil (dans le cas où l'imagerie et la criminalistique sont nécessaires)

(Facultatif) Pour la module 6 uniquement, vous devrez accéder à un Raspberry Pi.

## Parcours d'apprentissage connexes

Comme pour tous les sujets de sécurité, ce parcours d'apprentissage est avantagé si vous disposez de connaissances dans des domaines connexes. Notamment, les parcours d'apprentissage suivants s'harmonisent facilement avec celui-ci :

- [Analyse des logiciels malveillants](/fr/learning-path/3/) : démonter les logiciels malveillants pour comprendre comment ils fonctionnent et ce qu'ils font. En outre, ce parcours d'apprentissage contient des approches de débutant à intermédiaire pour déterminer si un échantillon donné est malveillant. Dans les cas où ces méthodes ne sont pas suffisantes pour assurer une détermination exacte, des compétences supplémentaires en analyse sont abordées ultérieurement dans ce parcours d'apprentissage.
- [Détection, enquête et suivi des infrastructures malveillantes](/fr/learning-path/1/) : les logiciels malveillants ciblés communiquent généralement avec l'infrastructure de commande et de contrôle, d'exfiltration ou de livraison. Ce parcours d'apprentissage aidera à étudier et à comprendre cette infrastructure.
- [Principes fondamentaux de la sécurité des applications Web](/fr/learning-path/4/): certains logiciels malveillants sont fournis sous forme d'application Web ou d'exploitation de failles des navigateurs. Certaines des compétences abordées dans ce parcours d'apprentissage vous aideront à détecter et à analyser les logiciels malveillants sur les navigateurs.
