---
style: introduction
title: Introduction
description: Lisez la présentation du parcours d'apprentissage, les objectifs, les menaces associées et les prérequis.
weight: 1
---

**Avec les remerciements à**

- Michał "czesiek" Czyżewski <https://czesiek.net>
- Yana Ghahramanyan


## Présentation

Les sites Web sont des infrastructures essentielles utilisées par les organisations de médias et la société civile pour assurer la libre circulation de l'information et fournir des fonctionnalités à leurs parties prenantes. Les cybercriminels attaquent ces applications Web à diverses fins, y compris l'arrêt de la libre circulation de l'information, les dommages à la réputation, l'accès aux systèmes privés, le vol d'informations sensibles, la surveillance et la compromission des appareils. En vous préparant efficacement à ces types d'attaques, vous pouvez réduire leur impact ou, dans certains cas, les prévenir entièrement.

Les attaques contre les sites Web tombent généralement dans deux catégories : DoS (déni de service) et diverses formes de piratage. Les attaques DoS visent à empêcher les gens d'accéder au site et sont généralement effectuées en inondant le site de trafic. Les attaques DoS sont souvent lancées par des extorqueurs criminels qui souhaitent recevoir un paiement pour arrêter l'attaque, ou par des rivaux politiques qui souhaitent empêcher à leurs cibles d'accéder à une plateforme. Les attaques de piratage manipulent les vulnérabilités et les faiblesses d'une application Web, ce qui nécessite généralement plus de compétences, mais peut avoir un impact plus important sur le site cible. Les profils et les objectifs des cybercriminels varient considérablement, mais les objectifs communs de piratage comprennent la récupération de données privées d'un site, la dégradation ou d'autres changements de contenu, la reprise de l'infrastructure sous-jacente du site, le pivotement vers d'autres cibles ou le ciblage des utilisateurs du site.

Ce parcours d'apprentissage couvre les connaissances intermédiaires et avancées nécessaires pour se préparer et répondre aux attaques contre les applications Web. Une préparation efficace est extrêmement importante pour répondre à toute attaque. La plupart des techniques de réponse abordées dans ce parcours d'apprentissage sont difficiles ou impossibles à réaliser sans une préparation adéquate. Cependant, avec une préparation appropriée, il est possible de rendre certaines formes d'attaques DoS inefficaces, d'atténuer les attaques DoS rapidement et efficacement, et d'arrêter et de récupérer les attaques de piratage avant que des dommages trop importants soient causés. Dans ce parcours d'apprentissage, nous aborderons :

- Le renforcement des sites Web
- La journalisation des serveurs Web
- Les réponses aux incidents DoS
- Réponse aux incidents de piratage et investigations

Notez que, bien que les attaques DoS soient plus courantes que les attaques de piratage, la réponse de piratage occupe la majeure partie de ce parcours d'apprentissage. Cela est justifié par le fait que les attaques DoS sont presque toujours plus simples que les attaques de piratage, et parce que la préparation et la réponse aux attaques DoS impliquent principalement de travailler avec des fournisseurs tiers qui font la plupart du travail. En comparaison, les attaques de piratage sont souvent plus compliquées, et y répondre nécessite un travail approfondi et pratique avec le site lui-même.

Alors que certains acteurs des États-nations (les États-Unis, la Chine, la Corée du Nord, la Russie, etc.) sont bien financés et ont des agents hautement qualifiés, la plupart des acteurs des États-nations disposent de fonds, mais manquent de compétences techniques approfondies. Pour réprimer le discours de leurs rivaux politiques, ils utiliseront fréquemment des attaques DoS à grande échelle pour empêcher les gens de consulter les sites Web de ces rivaux. Les organisations criminelles loueront volontiers leurs botnets (réseaux d'ordinateurs compromis) à des personnes pour qu'ils les utilisent dans le cadre d'attaques DoS. Voici quelques exemples :

- Septembre 2022 <https://www.qurium.org/alerts/nacionale-under-ddos/>
- Mai 2022 <https://www.qurium.org/alerts/the-tip-of-the-iceberg/>
- Mars 2022 <https://www.qurium.org/alerts/philippines/forensic-analysis-of-the-multiple-distributed-denial-of-service-attacks-in-the-philippines/>
- Septembre 2021 <https://www.qurium.org/alerts/switzerland/gotham-city-under-denial-of-service/>
- Août 2021 <https://www.qurium.org/alerts/philippines/human-rights-alliance-karapatan-under-long-lasting-ddos-attack/> & <https://www.qurium.org/alerts/philippines/israeli-firm-bright-data-luminati-networks-enabled-the-attacks-against-karapatan/>
- Juin 2021 <https://www.qurium.org/alerts/philippines/attacks-against-media-in-the-philippines-continue/>
- Juillet 2020 <https://www.qurium.org/alerts/colombia/la-nueva-prensa-attacked-for-operacion-jaque-documentary/>
- Mai 2020 <https://www.qurium.org/alerts/philippines/attacks-against-websites-in-the-philippines-during-covid-19/>
- Avril 2020 <https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/>
- Mars 2020 <https://www.qurium.org/alerts/el-salvador/ddos-attacks-against-salvadoran-revista-factum-attributed-to-university-infrastructure/>

Les cybercriminels, en particulier les rivaux politiques, ont toujours tenté de pirater les sites Web de groupes de la société civile. Voici quelques exemples :

- Mars 2020 <https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/>
- Octobre 2019 <https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/>
- Août 2019 <https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/>
- Septembre 2018 <https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/>

En outre, tout site sur Internet est sujet à des attaques opportunistes et ciblées par des acteurs de menace motivés financièrement. Ces cybercriminels ont des objectifs tels que le vol des mots de passe des utilisateurs, des informations de cartes de paiement, etc. pour la revente, la modification du contenu du site pour la manipulation du classement des recherches ou la fraude par clic, ou l'utilisation de l'infrastructure du site elle-même pour le minage de cryptomonnaie, l'envoi de courriers indésirables ou le lancement d'attaques par déni de service. Pour obtenir plus d'informations sur les attaques opportunistes et automatisées sur les applications Web, consultez [ce rapport de l'OWASP](https://owasp.org/www-project-automated-threats-to-web-applications/).

## Objectif

Les participants apprendront à :

- Effectuer un renforcement de base des sites Web contre le piratage et les attaques DoS
- Ajouter une journalisation de sécurité efficace à leurs applications Web
- Répondre aux attaques DoS et de piratage

## Quelles menaces cette compétence permet-elle d'atténuer ou de gérer ?

- Compromis sur le site Web
- Déni de service du site Web

## Quels sont les prérequis ?

Ce parcours d'apprentissage nécessite une connaissance pratique des serveurs Web, des exploitations de failles possibles et des vulnérabilités de base. Pour cette raison, nous recommandons que tous les apprenants qui le poursuivent en premier et qui n'ont pas de connaissances suffisantes concernant les architectures de serveurs Web et les vulnérabilités terminent d'abord le parcours d'apprentissage Principes fondamentaux de sécurité des applications Web d'Infuse.

Bien que la connaissance des tests et de l'évaluation de la sécurité des sites Web ne soit pas un préalable strict à ce parcours d'apprentissage, certains apprenants pourraient trouver plus facile de parcourir d'abord le parcours d'apprentissage de l'évaluation de la sécurité des applications Web avant d'entreprendre celui-ci. Surtout s'ils souhaitent actualiser leurs connaissances sur les principales vulnérabilités des applications Web.

En plus de ce qui précède, les apprenants doivent avoir une compréhension de base de la ligne de commande Unix, y compris des concepts comme les commandes piping. Ce parcours d'apprentissage utilisera également l'outil awk et offrira une introduction. Si les apprenants préfèrent mettre l'outil en pratique avant de se lancer dans le parcours, nous recommandons [cette introduction](https://www.tutorialspoint.com/awk/index.htm) ou [ce livre électronique complet](https://learnbyexample.github.io/learn_gnuawk/).

## De quels appareils ou logiciels avez-vous besoin pour réaliser les exercices ?

Pour compléter la plupart des exercices pratiques recommandés dans ce parcours d'apprentissage, vous aurez besoin d'un ordinateur capable d'exécuter des outils de ligne de commande Unix de base, tels qu'awk, cat et grep. Ceux-ci sont installés sur tous les systèmes macOS et à peu près tous les systèmes Linux.

Si vous utilisez Windows, nous vous recommandons d'installer WSL (Windows Subsystem for Linux) pour exécuter certains des outils de ce parcours d'apprentissage. Bien qu'il puisse y avoir d'autres façons d'exécuter de tels outils, cela nécessitera beaucoup moins de manipulation des dépendances.

- - Voici la documentation fournie par Microsoft avec tous les détails sur la façon d'installer WSL 2 : [https://docs.microsoft.com/fr-fr/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
    - Ouvrez « Activer ou désactiver des fonctionnalités Windows » dans le panneau de configuration de Windows et assurez-vous que « Plateforme de machine virtuelle » et « Sous-système Windows pour Linux » sont cochés.
    - Téléchargez et installez WSL 2 à partir du [Microsoft Store](https://apps.microsoft.com/store/detail/windows-subsystem-for-linux-preview/9P9TQF7MRM4R). Une fois l'outil installé, redémarrez votre ordinateur pour appliquer les modifications.
    - Ouvrez une invite de commande ou Windows PowerShell en mode administrateur en cliquant avec le bouton droit de la souris et en sélectionnant « Exécuter en tant qu'administrateur » et exécutez la commande  

```
wsl --set-default-version 2
```

Le résultat de cette commande ressemblera à ceci :

```
Pour obtenir plus d'informations sur les principales différences avec WSL 2, veuillez visiter <https://aka.ms/wsl2>

L'opération s'est terminée avec succès.
```

- Une fois que l'outil WSL 2 est installé, vous pouvez installer votre distribution Linux préférée à partir du Microsoft Store ou en utilisant la ligne de commande. Recherchez simplement « Linux » dans le Microsoft Store, sélectionnez la distribution souhaitée (par exemple, Ubuntu, Debian ou autre) et cliquez sur « Installer ». Vous pouvez également installer une distribution Linux en utilisant PowerShell ou l'invite de commande. Ouvrir un Powershell Windows ou une invite de commande et obtenez la liste des distributions disponibles :

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

[Principes fondamentaux de la sécurité des applications Web](/fr/learning-path/4/) : ce parcours d'apprentissage de renforcement des applications Web, investigation et intervention en cas d'incident suppose un certain niveau de familiarité avec la sécurité des applications Web. Si vous venez de débuter dans ce domaine de la sécurité, vous devriez commencer par le parcours d'apprentissage sur les principes fondamentaux de la sécurité Web pour obtenir les informations de base nécessaires pour compléter efficacement ce parcours.

[Évaluation de la sécurité des applications Web](/fr/learning-path/5/) : pour les défenseurs numériques, l'attaque et la défense sont deux parties importantes d'un tout. En tant que personne aidant vos clients à sécuriser leurs sites, savoir vous défendre de manière holistique contre les attaques vous permet de leur fournir de meilleures recommandations. Ce parcours d'apprentissage permet de mieux comprendre les types d'attaques de piratage auxquelles les sites Web peuvent être soumis.