---
style: introduction
title: Introduction
description: Lisez la présentation du parcours d'apprentissage, les objectifs,
  les menaces associées et les prérequis.
weight: 1
---

## Présentation

Les messages d'hameçonnage sont généralement liés à une infrastructure malveillante qui cherche soit à capturer des informations de connexion et à les utiliser pour accéder aux systèmes d'une organisation ou d'un individu, soit à exécuter une transaction d'ingénierie sociale ou d'exploiter une faille de sécurité d'un navigateur ou d'un appareil. Ils constituent l'une des techniques les plus courantes utilisées par les acteurs malveillants qui visent à compromettre les ONG. Très souvent, les ONG qui reçoivent de tels messages peuvent avoir du mal à déterminer avec certitude s'il s'agit de messages suspects, et encore moins à connaître l'identité et le but du cybercriminel. La vérification auprès de l'expéditeur présumé par un autre canal pourrait être le moyen le plus simple de vérifier si un message est légitime. Si l'expéditeur ne peut pas être contacté ou si le message ne semble pas légitime, il peut être important de l'analyser plus en profondeur. Cela pourrait nous permettre d'arrêter de telles attaques avant qu'elles compromettent les systèmes de l'ONG, de les empêcher de le faire à l'avenir et d'alerter les autres intervenants au sein de la communauté au sujet de ces cybercriminels et de leurs tactiques, techniques et procédures (TTP). Les résultats de ces enquêtes sont ensuite souvent partagés, soit par le biais de rapports formels ou de réseaux, soit de discussions informelles entre les professionnels de la sécurité des ONG.

Dans plusieurs cas, des ONG ont mené d'excellentes enquêtes sur des infrastructures malveillantes. Celles-ci comprennent notamment un effort conjoint de Bellingcat et de plusieurs groupes du secteur privé qui [enquêtent sur des attaques d'hameçonnage contre des organisations se concentrant sur des affaires liées à la Russie](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/), ainsi qu'[un projet HRW-Amnesty](https://www.hrw.org/the-day-in-human-rights/2022/12/05) visant à [traquer les tentatives d'hameçonnage](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) attribuées au gouvernement iranien.

Les attaques examinées dans cette section commencent généralement par un message d'hameçonnage. La personne ciblée reçoit un message (par e-mail, WhatsApp ou un autre moyen de communication) qui tente de la convaincre de cliquer sur un lien. Parfois, la personne ciblée travaille pour un groupe de la société civile et est ciblée en raison de ses liens avec celui-ci, les cybercriminels espérant ainsi creuser plus profondément dans les systèmes de l'organisation. À d'autres moments, les cybercriminels cibleront directement les chercheurs individuels ou les travailleurs indépendants.

Un message d'hameçonnage tentera souvent de tromper la personne ciblée pour qu'elle saisisse ses identifiants tels que son nom d'utilisateur et son mot de passe (comme cela s'est produit avec les attaques documentées par Bellingcat et HRW), télécharge des logiciels malveillants ou, dans certains cas, contournera la sécurité du navigateur pour accéder directement aux informations du navigateur ou pour installer automatiquement des logiciels malveillants. Les sections « Enquête passive : analyser les URL, les noms d'hôte et les adresses IP » et « Enquête passive : analyser les en-têtes des e-mails » abordent ces phases d'une attaque.

Lorsqu'une personne reçoit un message d'hameçonnage crédible ou est attaquée par un logiciel malveillant, elle pourrait devoir tenter d'identifier l'infrastructure (serveurs, sites Web, etc.) utilisée par les cybercriminels. Bien que les attaques ciblées utilisant une infrastructure dédiée ou compromise soient relativement rares, la section sur le « triage » vous aidera à déterminer s'il vaut la peine de consacrer du temps à l'analyse. Il peut être judicieux d'avoir une solide compréhension de la gestion des incidents en général avant de commencer ce parcours d'apprentissage.

Avant de visiter un site Web contrôlé par un cybercriminel ou de télécharger un logiciel malveillant, il est important que vous appreniez à le faire en toute sécurité. Ce parcours d'apprentissage examine à la fois les techniques d'investigation passive, qui ne contactent pas le serveur du cybercriminel et sont donc peu susceptibles de les alerter au sujet d'une enquête en cours, et les techniques actives, qui contactent les serveurs. Une fois que vous avez appris à mener une enquête passive, vous pouvez passer à des techniques actives pour visiter les sites Web liés aux messages d'hameçonnage et les analyser pour découvrir une infrastructure contrôlée par les cybercriminels. Cette question est abordée dans la section « Enquête active : analyser les pages Web malveillantes ».

Si le cybercriminel parvient à introduire un logiciel malveillant sur l'appareil de la personne ou de l'organisation ciblée, ce logiciel malveillant communiquera généralement avec un serveur de commande et de contrôle (C&C). La manière d'identifier les serveurs C&C du cybercriminel et la façon dont ils fonctionnent est abordée dans le parcours d'apprentissage Analyse des logiciels malveillants. L'analyse des logiciels malveillants est une autre compétence que vous pouvez utiliser pour découvrir plus d'infrastructures de cybercriminels.

Pour mieux soutenir la personne que vous aidez et l'ensemble de la communauté, il est important de documenter et de partager vos conclusions. Cela est abordé dans la section « Documenter les constatations ». Il existe plusieurs communautés de partage d'informations et de menaces au sein de l'espace plus large des ONG, mais la liste de ces communautés dépasse le cadre de ce parcours d'apprentissage.

Enfin, il est important de reconnaître dès le départ que bon nombre des techniques d'enquête utilisées dans ce parcours d'apprentissage peuvent alerter le cybercriminel qu'il fait l'objet d'une enquête ou même mettre l'enquêteur (ou la collectivité en général) en danger. Nous divisons les techniques en méthodes passives et actives. Faites preuve de prudence lorsque vous envisagez des méthodes d'enquête actives et parlez d'abord à la personne ou à l'organisation destinataire avant de le faire afin de discuter de son modèle de menace et de lui permettre de faire un choix éclairé au sujet de la poursuite des enquêtes.

- Méthode passive (appropriée dans tous les cas)
  - Utilise les informations qui ont déjà été transmises à la personne ciblée
  - N'implique pas de communication avec l'infrastructure du cybercriminel
  - Généralement plus facile
  - Ne prévient généralement pas le cybercriminel qu'il fait l'objet d'une enquête
  - Plus sûr
- Méthode active
  - Généralement utilisée uniquement pour la livraison de logiciels malveillants et les serveurs de commande et de contrôle
  - L'enquêteur interagira avec l'infrastructure du cybercriminel
  - Cela nécessite souvent plus de compétences et une investigation plus approfondie
    - « Jeu du chat et de la souris » avec le cybercriminel
  - Peut alerter le cybercriminel qu'il fait l'objet d'une enquête
  - Risque que l'enquêteur soit compromis ou ciblé

## Objectif

Les participants apprendront à :

- Effectuer un triage des e-mails pour déterminer s'ils sont malveillants ou s'ils méritent une enquête approfondie
- Comprendre les cybercriminels et les méthodes d'attaque
- Analyser les en-têtes de messagerie pour identifier l'infrastructure des cybercriminels
- Analyser les pages de renvoi Web malveillantes
- Documenter et signaler les conclusions de l'enquête
- Prendre des mesures de retrait pour réduire les dommages

## Quelles menaces cette compétence permet-elle d'atténuer ou de gérer?

Des compétences en matière d'enquête, de suivi et de détection de l'infrastructure malveillante peuvent contribuer à répondre aux besoins suivants :

- Attaques d'hameçonnage ciblées
- Hameçonnage par messagerie
- Infrastructure liée à l'hameçonnage

## Quels sont les prérequis?

- Connaissances de base en ligne de commande sur un système d'exploitation majeur de votre choix. Si vous voulez apprendre ou réviser certaines bases des lignes de commande, nous vous recommandons [ce guide](https://www.git-tower.com/blog/command-line-cheat-sheet/) et [celui-ci](https://github.com/jlevy/the-art-of-command-line). Si vous cherchez une introduction générale pour débutants à l'utilisation des lignes de commande, nous vous recommandons de terminer le chapitre 4 du [Guide de terrain des laboratoires sur les menaces](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) sur le sujet.
- Une compréhension de base des langages HTML et JavaScript. Que vous ayez besoin d'apprendre à leur sujet à partir de zéro ou que vous souhaitiez actualiser vos connaissances, nous vous recommandons de consulter les [documents MDN Developer](https://developer.mozilla.org/en-US/docs/Learn)
- Une compréhension de base du fonctionnement des dépôts Git et de la façon d'interagir avec eux. Bien que la connaissance détaillée des plateformes Git et de celles basées sur Git telles que GitHub et GitLab ne soit pas indispensable, elle peut s'avérer utile pour tous les parcours d'apprentissage, car de nombreux outils et ressources y sont hébergés et, à terme, vous risquez de mettre à jour les référentiels locaux ou même de créer vos propres branches. Si vous n'avez pas beaucoup travaillé avec de telles plateformes dans le passé, nous vous recommandons de commencer par l'une de ces ressources :
  - [Pro Git Book](https://book.git-scm.com/book/en/v2) (disponible dans 17 langues) : l'étude des chapitres 1 à 3 en plus de sujets sélectionnés dans d'autres chapitres vous procurera une excellente introduction
  - [git - le guide simple](https://rogerdudler.github.io/git-guide/index.html) (disponible dans 16 langues) est un aide-mémoire des commandes Git. Utile lorsque vous avez un concept général de git, mais que vous avez besoin de références sur les commandes et la syntaxe
  - [Une référence Git visuelle](https://marklodato.github.io/visual-git-guide/index-en.html) (disponible dans 14 langues) : référence visuelle plus avancée pour comprendre les flux de travail et les commandes Git
- [GitHub Skills ](https://skills.github.com/)(anglais uniquement)
- [GitLab Git Essentials](https://levelup.gitlab.com/courses/gitlab-with-git-essentials-s2) (anglais uniquement)

## De quels appareils ou logiciels avez-vous besoin pour les exercices?

Vous n'avez pas besoin de matériel spécialisé ou puissant pour ce parcours d'apprentissage. Tout ordinateur moderne devrait faire l'affaire. Bien que les outils de ce parcours d'apprentissage n'aient été testés que sur des systèmes x86, la plupart, sinon tous, devraient également fonctionner sur des systèmes ARM tels que les ordinateurs Raspberry Pi ou Apple Silicon

- La plupart des outils de ce parcours d'apprentissage fonctionnent mieux sur des systèmes d'exploitation de type Unix. Cela signifie qu'il est plus facile d'utiliser des périphériques Linux, macOS ou Windows avec WSL (Windows Subsystem pour Linux) installé dessus.
- Si vous utilisez Windows, vous devrez installer WSL (Windows Subsystem for Linux) pour pouvoir exécuter certains des outils décrits ci-dessous
- Si vous utilisez macOS, il peut être judicieux d'installer [Homebrew](https://brew.sh/) ou [Macports](https://www.macports.org/). Il s'agit de gestionnaires de paquets qui peuvent automatiser le processus d'installation de certains des outils décrits tout au long du parcours d'apprentissage.
- WSL et Linux devraient être dotés de gestionnaires de paquets intégrés que vous pouvez utiliser pour installer les outils décrits ci-dessous.
- Il est préférable d'analyser l'infrastructure malveillante sur un appareil distinct que vous n'utilisez pas pour d'autres travaux sensibles et sur lequel vous n'êtes pas connecté(e) à des comptes sensibles ou professionnels. Si vous ne pouvez pas utiliser un périphérique discret, vous pouvez également exécuter l'analyse dans une machine virtuelle. Si vous débutez avec les machines virtuelles, consultez ce [guide rapide](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview) sur la façon d'exécuter Ubuntu Linux dans une machine virtuelle.

## Parcours d'apprentissage connexes

Ce parcours d'apprentissage constitue une introduction fantastique aux autres parcours. Après avoir terminé celui-ci, nous recommandons aux apprenants de travailler sur la [détection de logiciels malveillants](/fr/learning-path/2/) ou sur [les principes fondamentaux de la sécurité Web](/fr/learning-path/4/).

## Autres ressources et liens

{{% resource title="Flux de travail du service d'assistance : le client reçoit un e-mail suspect ou d'hameçonnage" description="Documentation communautaire de la ligne d'assistance Access Now pour répondre aux e-mails suspects / d'hameçonnage" languages="Anglais" cost="Gratuit" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.html" %}}
{{% resource title="Liste de tous les types d'enregistrements DNS" description="Inclut (presque ?) tous les types d'enregistrements DNS." languages="Anglais, chinois, japonais, coréen, russe, serbe, ukrainien, espéranto, hongrois, vietnamien, italien, espagnol, français" cost="Gratuit" url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}
{{% resource title="Rapports d'Amnesty sur les campagnes d'hameçonnage" description="Une liste d'exemples illustrant une campagne d'hameçonnage ciblée contre les défenseurs des droits de l'homme, les militants et les journalistes" languages="Multiple, selon le rapport" cost="Gratuit" url="https://www.amnesty.org/en/search/phishing/" %}}
