---
style: introduction
title: Introduction
description: Lisez la présentation du parcours d'apprentissage, les objectifs, les menaces associées et les prérequis.
weight: 1
---

## Présentation

Les applications Web sont des infrastructures essentielles utilisées par les organisations de médias et la société civile pour assurer la libre circulation de l'information et fournir des fonctionnalités à leurs parties prenantes. Les cybercriminels attaquent ces applications Web à diverses fins, y compris l'arrêt de la libre circulation de l'information, les dommages à la réputation, l'accès aux systèmes privés, le vol d'informations sensibles, la surveillance et la compromission des appareils. En identifiant de manière proactive les vulnérabilités des applications Web utilisées par vos clients et partenaires, vous pouvez éviter les compromissions potentielles avant qu'elles se produisent.

Ce parcours d'apprentissage couvre les connaissances intermédiaires et avancées nécessaires pour comprendre et identifier en profondeur les vulnérabilités des applications Web. Cela peut être utilisé pour trouver des vulnérabilités dans une application avant les auteurs de menaces, pour guider les pratiques de développement sécurisé ou pour corriger plus efficacement les vulnérabilités dans les applications Web. Dans ce parcours d'apprentissage, nous aborderons :

- Les raisons d'effectuer une évaluation de sécurité d'application Web
- Les types d'évaluations efficaces à effectuer
- La façon d'identifier les différents types de vulnérabilités des applications Web
- La façon d'exploiter ces vulnérabilités
- La façon de tester systématiquement et efficacement une application Web afin de détecter les vulnérabilités

### Lecture complémentaire

Les cybercriminels, en particulier les rivaux politiques, ont toujours tenté de pirater les sites Web de groupes de la société civile. Voici quelques exemples documentés :

- Mars 2020 <https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/>
- Octobre 2019 <https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/>
- Août 2019 <https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/>
- Septembre 2018 <https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/>

En outre, tout site sur Internet est sujet à des attaques opportunistes et ciblées par des acteurs de menace motivés financièrement. Ces cybercriminels ont des objectifs tels que le vol des mots de passe des utilisateurs, des informations de cartes de paiement, etc. pour la revente, la modification du contenu du site pour la manipulation du classement des recherches ou la fraude par clic, ou l'utilisation de l'infrastructure du site elle-même pour le minage de cryptomonnaie, l'envoi de courriers indésirables ou le lancement d'attaques par déni de service. Bien que bon nombre de ces attaques ne soient pas ciblées pour des motifs politiques, elles présentent néanmoins des risques importants pour la réputation et la confidentialité de toute organisation. Pour obtenir plus d'informations sur les attaques opportunistes et automatisées sur les applications Web, consultez [ce rapport de l'OWASP](https://owasp.org/www-project-automated-threats-to-web-applications/).

## Objectif

Le titulaire du badge devrait être en mesure d'effectuer efficacement des évaluations de sécurité complètes des applications Web, y compris l'identification des vulnérabilités dans le top 10 de l'OWASP.

## Quelles menaces cette compétence permet-elle d'atténuer ou de gérer ?

Les compétences en évaluation d'applications Web peuvent contribuer à répondre aux menaces de piratage par :

- Les pirates vigilants motivés par un État
- Les cybercriminels motivés financièrement

## Quels sont les prérequis ?

- Avant de commencer ce parcours d'apprentissage, les apprenants doivent d'abord suivre le parcours d'apprentissage sur les principes fondamentaux de la sécurité des sites Web s'ils ne sont pas familiers avec les serveurs Web et les vulnérabilités de base des applications Web. S'ils sont déjà familiers avec le sujet plus large, nous leur recommandons tout de même de réviser le sous-thème 6 du parcours d'apprentissage des principes fondamentaux, qui met l'accent sur les compétences interpersonnelles nécessaires pour soutenir les autres.
- Une connaissance de base du HTML, comme la mise en page de base d'un document HTML et la capacité de lire du HTML simple. Pour obtenir une excellente introduction, consultez [MDN](https://developer.mozilla.org/en-US/docs/Learn).
- Concepts de base du langage de programmation et la capacité de lire du JavaScript simple. Nous recommandons l'[introduction de MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) à ce sujet.
- Compréhension de base du fonctionnement de HTTP, de la façon dont un navigateur communique avec un site Web et à quoi ressemblent les requêtes et les réponses HTTP. Pour une introduction de ces sujets, nous recommandons [cet article](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) et [celui-ci](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data).
- Une compréhension de base de SQL, juste assez pour savoir de quoi il s'agit et la façon de formuler une commande simple. Pour obtenir une introduction, consultez [sqlzoo](https://sqlzoo.net/wiki/SQL_Tutorial).
- Connaissances de base du fonctionnement de la ligne de commande sur un système d'exploitation de votre choix et de la façon d'y exécuter des commandes. Pour obtenir une bonne introduction, consultez [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line).

## De quels appareils ou logiciels avez-vous besoin pour réaliser les exercices ?

- Vous aurez besoin d'un ordinateur capable d'exécuter des applications Java et Docker. N'importe quel appareil macOS, Windows ou Linux avec 8 Go de RAM et un peu d4espace disque libre devrait faire l'affaire. Tous les exercices pratiques ont également été testés sur des appareils exécutant Apple Silicon, et fonctionnent.
- La plupart des outils de ce parcours d'apprentissage fonctionnent mieux sur des systèmes d'exploitation de type Unix. Cela signifie qu'il est plus facile d'utiliser des périphériques Linux, macOS ou Windows avec WSL (Windows Subsystem pour Linux) installé dessus.
- Si vous utilisez macOS, il peut être judicieux d'installer [Homebrew](https://brew.sh/) ou [Macports](https://www.macports.org/). Il s'agit de gestionnaires de paquets qui peuvent automatiser le processus d'installation de certains des outils décrits tout au long du parcours d'apprentissage.
- Alternativement, si vous avez une installation de Kali Linux (vous pouvez utiliser le même que celui que vous avez utilisé pour le parcours d'apprentissage sur les principes fondamentaux de la sécurité des applications Web), la plupart des outils décrits ci-dessous devraient déjà être préinstallés.
- Si vous utilisez Windows, nous vous recommandons d'installer WSL (Windows Subsystem for Linux) pour exécuter certains des outils décrits ci-dessous. Bien que beaucoup d'entre eux puissent fonctionner dans Docker, ceux qui nécessitent Python pourraient être beaucoup plus faciles à exécuter dans WSL, ce qui nécessitera moins de manipulation des dépendances.
  - Voici la documentation fournie par Microsoft avec tous les détails sur la façon d'installer WSL 2 : [https://docs.microsoft.com/fr-fr/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
  - Ouvrez « Activer ou désactiver des fonctionnalités Windows » dans le panneau de configuration de Windows et assurez-vous que « Plateforme de machine virtuelle » et « Sous-système Windows pour Linux » sont cochés.
  - Téléchargez et installez WSL 2 à partir du [Microsoft Store](https://apps.microsoft.com/store/detail/windows-subsystem-for-linux-preview/9P9TQF7MRM4R). Une fois l'outil installé, redémarrez votre ordinateur pour appliquer les modifications.
  - Ouvrez une invite de commande ou Windows PowerShell en mode administrateur en cliquant avec le bouton droit de la souris et en sélectionnant « Exécuter en tant qu'administrateur » et exécutez la commande  \
        `wsl --set-default-version 2`
  - Le résultat de cette commande ressemblera à ceci :

```
Pour obtenir plus d'informations sur les principales différences avec WSL 2, veuillez visiter <https://aka.ms/wsl2>
L'opération s'est terminée avec succès.
```

- - Une fois que l'outil WSL 2 est installé, vous pouvez installer votre distribution Linux préférée à partir du Microsoft Store ou en utilisant la ligne de commande. Recherchez simplement « Linux » dans le Microsoft Store, sélectionnez la distribution souhaitée (par exemple, Ubuntu, Debian ou autre) et cliquez sur « Installer ». Vous pouvez également installer une distribution Linux en utilisant PowerShell ou l'invite de commande. Ouvrir un Powershell Windows ou une invite de commande et obtenez la liste des distributions disponibles :

```
wsl --list --online
```

Installez une distribution à partir de cette liste à l'aide de la commande wsl --install -d &lt;nom de la distribution&gt;.

```
wsl --install -d Ubuntu
```

Après l'installation, chaque distribution Linux aura une icône dans le menu de l'application Windows. Une fois que vous aurez installé WSL, vous devrez créer un compte utilisateur et un mot de passe pour votre distribution Linux nouvellement installée.

Une nouvelle fenêtre devrait s'ouvrir avec un shell Linux.

- Voici un rapide examen des options de ligne de commande WSL.

Imprimez les informations d'utilisation et consultez les arguments de la ligne de commande :

```
wsl --help
```

Lister les distributions installées :

```
wsl --list
```

Lister uniquement les distributions en cours d'exécution :

```
wsl --list --running
```

Mettre fin à une distribution en cours d'exécution :

```
wsl --terminate Ubuntu-22.04
```

Arrêter toutes les distributions en cours d'exécution :

```
wsl --shutdown
```

Annuler la distribution Linux et supprimer le système de fichiers :

```
wsl --unregister Ubuntu-22.04
```

Mettre à jour WSL vers la dernière version :

```
wsl --update
```

Démarrer la distribution par défaut :

```
wsl
```

## Parcours d'apprentissage connexes

Après avoir terminé ce parcours d'apprentissage, nous recommandons aux apprenants de travailler sur le renforcement des applications Web, l'investigation et l'intervention en cas d'incident.
