---
style: module
title: Bac à sable et analyse dynamique
description: "L'analyse dynamique est le processus d'exécution d'un programme malveillant et d'observation de son comportement. La manière la plus simple de le faire est de faire fonctionner le logiciel dans un environnement sécurisé et isolé appelé bac à sable."
weight: 3
---
## Cas d'utilisation

L'analyse dynamique consiste à exécuter un logiciel malveillant et à observer ce qu'il permet d'effectuer. La façon la plus simple d'effectuer une analyse dynamique consiste à exécuter un logiciel dans un bac à sable. Un bac à sable est un environnement sûr et isolé qui permet d'ouvrir un fichier, une URL ou un programme potentiellement malveillant et de générer une énorme quantité de données. Ce sous-thème examine l'analyse du bac à sable, ce que le programme peut et ne peut pas faire, et comment le faire.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre le cas d'utilisation et les limites de l'analyse dynamique
- Comprendre les avantages et les limites des bacs à sable
- Ouvrir un fichier, une URL ou un programme suspect dans un bac à sable
- Effectuer une analyse dynamique de base sur les binaires Windows ou Android à l'aide d'outils standard

---
## Section Principale

### Analyse dynamique

Lorsque vous effectuez une analyse dynamique d'un fichier potentiellement suspect, vous ouvrez et exécutez le fichier dans un outil spécialisé et observez ce que fait ce fichier, s'il tente d'accéder à d'autres fichiers, s'il établit des connexions réseau, etc. L'analyse statique, décrite dans le sous-thème 4, désassemble le fichier plutôt que de l'ouvrir ou de l'exécuter.

Selon la situation, l'analyse dynamique peut s'avérer plus facile ou plus difficile que l'analyse statique, et elle peut également être plus ou moins précise. En pratique, une combinaison de l'analyse statique et de l'analyse dynamique produira probablement les meilleurs résultats. La plupart des analyses dynamiques impliquent également une analyse statique, de sorte que la ligne qui sépare les deux techniques est souvent floue.

La configuration générale pour l'analyse dynamique comprend un bac à sable dans lequel le logiciel malveillant est exécuté, un débogueur pour contrôler et surveiller l'exécution du programme, une surveillance du système pour surveiller les modifications apportées à l'état du système du bac à sable, et un élément permettant de faciliter l'accès à Internet pour bloquer, observer et/ou modifier le trafic réseau. Ceux-ci peuvent tous exister sur un même système, ou ils peuvent être des périphériques virtuels ou physiques séparés. Par exemple, vous pouvez utiliser un iPhone débridé comme bac à sable, un outil pour le débogage à distance et la surveillance du système, et un autre outil pour la médiation Internet. Tous les systèmes ne peuvent pas être utilisés dans toutes les situations, par exemple, vous pouvez simplement capturer le trafic réseau et surveiller les modifications du système sans utiliser de débogueur.

Il existe de nombreuses méthodes différentes pour effectuer une analyse dynamique, notamment en ouvrant l'exécutable dans un bac à sable et en vérifiant les connexions réseau qu'il établit. Pour obtenir une excellente ressource sur la détection des logiciels malveillants à travers le trafic réseau qu'il génère, consultez [ce guide](https://malware-traffic-analysis.net/).

En théorie, l'analyse dynamique pourrait indiquer à un auteur de menaces que vous analysez son logiciel malveillant. En pratique, les cybercriminels s'attendent souvent à ce que leurs logiciels malveillants soient analysés et il sera très rare de rencontrer des logiciels malveillants complètement nouveaux au fil de votre carrière. À l'exception de certains cas très sensibles, nous ne nous inquiéterions pas de ce risque.

### Bacs à sable

Un bac à sable (pour logiciels malveillants) est un environnement sûr dans lequel vous pouvez ouvrir et exécuter des fichiers ou des URL. Il s'agit essentiellement d'une machine virtuelle conçue sur mesure qui est lancée avant l'ouverture du fichier ou de l'URL, puis arrêtée après un certain temps.

Toutes les activités dans le bac à sable, telles que les fichiers ouverts ou créés ainsi que les connexions réseau effectuées, sont enregistrées et accessibles via un rapport d'activité. Le rapport d'activité peut vous aider à comprendre si le fichier ou l'URL était malveillant. Il peut également vous aider à lier des logiciels malveillants à des activités précédemment vues, par exemple en fonction de connexions réseau spécifiques ou des fichiers créés.

L'exécution de logiciels malveillants connus dans un bac à sable peut également être très utile, car cela vous permet d'en apprendre plus sur les logiciels malveillants. Cela vous aide à comprendre ce que font les logiciels malveillants et les changements qu'ils apportent au système. Par exemple, de nombreux logiciels malveillants lors de leur exécution initiale tentent de garantir leur persistance afin de toujours s'exécuter après un redémarrage. Ces méthodes de persistance sont un élément que vous pouvez rechercher lorsque vous effectuez une investigation manuelle sur un dispositif éventuellement infecté.

De nombreux logiciels malveillants disposent de fonctionnalités anti-bac à sable intégrées : lorsque le logiciel malveillant détecte qu'il fonctionne dans un environnement de bac à sable, il s'arrête ou exécute parfois quelque chose d'inoffensif pour brouiller l'analyse. De plus, certains logiciels malveillants sont conçus pour fonctionner uniquement si des conditions spécifiques sont remplies, par exemple une version spécifique du système d'exploitation ou une adresse IP située dans un pays spécifique. Les bacs à sable sont souvent mis à jour pour répondre aux méthodes anti-bac à sable et de nombreux bacs à sable vous permettent de choisir certaines propriétés.

Il est important de garder à l'esprit lors de la lecture d'un rapport de bac à sable qu'un manque d'activité malveillante ne signifie pas automatiquement que le fichier ou l'URL n'est pas malveillant. D'autre part, si une activité malveillante est détectée, vous pouvez être certain que le fichier ou l'URL est de nature malveillante.

Consultez le [chapitre 10 du Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) pour obtenir une introduction plus approfondie aux bacs à sable.

Il est possible d'exécuter un bac à sable localement. [Cuckoo](https://cuckoosandbox.org/) est un bac à sable open source qui existe depuis de nombreuses années. Une [nouvelle version](https://github.com/cert-ee/cuckoo3) est en cours de développement, mais n'est pas encore disponible au moment de la rédaction (février 2024).

Bien que l'exécution d'un bac à sable au niveau local vous donne un contrôle total de l'environnement et signifie que vous pouvez garder vos fichiers et URL entièrement privés, elle peut être laborieuse et compliquée à maintenir. Heureusement, il existe de nombreux bacs à sable en ligne tels que [ANY.RUN](https://any.run/), [Hybrid Analysis](https://www.hybrid-analysis.com/), [Joe Sandbox](https://www.joesandbox.com/), [Triage](https://tria.ge/) et même une version en ligne de [Cuckoo](https://cuckoo.cert.ee/). Tous ces outils ont des versions gratuites qui vous permettent de télécharger des logiciels malveillants et des URL, bien que certains nécessitent une inscription. Gardez à l'esprit que si vous utilisez une version gratuite, tout ce que vous exécutez dans un bac à sable sera accessible au public. Cela peut être préoccupant si vous ne voulez pas alerter un cybercriminel ou si vous traitez avec des données très privées, telles que des documents confidentiels potentiellement infectés.

### Analyse dynamique des binaires Windows

Nous vous recommandons de commencer avec une classe d'aperçu, cette fois à partir d'[OpenSecurityTraining](https://opensecuritytraining.info/Training.html). Leur classe [Malware Dynamic Analysis](https://opensecuritytraining.info/MalwareDynamicAnalysis.html) comprend des diapositives, du matériel d'exercice et des vidéos, et couvre la configuration, l'analyse et la création d'IoC.

### Analyse dynamique des binaires Android

De nombreux outils peuvent être utilisés pour analyser dynamiquement les binaires Android. Ceux-ci incluent certains des bacs à sable décrits ci-dessus et [Frida](https://frida.re/docs/android/) (consultez [cet outil](https://github.com/nccgroup/house) pour obtenir une interface graphique pour Frida).

PiRogue Tool Suite (décrit dans le parcours d'apprentissage de détection des logiciels malveillants) peut également [effectuer une excellente analyse](https://pts-project.org/guides/g8/) dynamique des binaires Android, bien que certaines de ces méthodes d'analyse nécessitent que vous rootiez d'abord votre appareil.

## Contrôle de compétence

### Général

1. Accédez à la section « Bac à sable » du chapitre 10 du [Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) et faites les exercices 10.2 à 10.4. Lors du dernier exercice, assurez-vous d'exécuter au moins un exemple de logiciel malveillant macOS et Android.
2. Dans le même chapitre, passez à la sous-section « Analyse des liens » et faites l'exercice 10.12.

#### Spécifique à Windows

Effectuez une analyse dynamique sur un morceau de logiciel Windows non malveillant. Il comprend probablement un programme d'installation, qui effectuera des actions similaires aux logiciels malveillants. Quels fichiers crée-t-il ? Quelles clés de registre crée-t-il ? Quel trafic réseau envoie-t-il ?

## Ressources d'apprentissage

{{% resource title="Chapitre 10, Guide d'intervention sur le terrain pour la société civile et les médias" description="Les premières pages de ce chapitre fournissent un aperçu détaillé de la façon dont nous pouvons utiliser des bacs à sable pour analyser les charges utiles des e-mails." languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}
{{% resource title="Any.run" description="Un bac à sable commercial" languages="Anglais" cost="Gratuit uniquement pour un usage non commercial" url="https://any.run/" %}}
{{% resource title="Joe Sandbox" description="Un autre bac à sable commercial" languages="Anglais" cost="Gratuit pour les comptes publics (les résultats de l'analyse seront publiés sur le site Web)" url="https://www.joesandbox.com/#windows" %}}
{{% resource title="Cuckoo Sandbox" description="Un service de bac à sable géré par le CERT (Computer Emergency Response Team) estonien" languages="Anglais" cost="Gratuit" url="https://cuckoo.cert.ee/" %}}
{{% resource title="Cuckoo Sandbox, tableau de bord des données" description="Le tableau de bord des données pour la ressource ci-dessus" languages="Anglais" cost="Gratuit" url="https://cuckoo-hatch.cert.ee/" %}}
{{% resource title="Hybrid Analysis" description="Un service de bac à sable de CrowdStrike qui mélange analyse statique et analyse dynamique" languages="Anglais" cost="Gratuit" url="https://www.hybrid-analysis.com/" %}}
{{% resource title="Bac à sable de triage" description="Bac à sable orienté par la communauté" languages="Anglais" cost="Inscription obligatoire" url="https://tria.ge/" %}}
{{% resource title="Cours en ligne sur l'analyse dynamique des logiciels malveillants" description="Un cours de trois jours qui fournit une entrevue de l'analyse dynamique des logiciels malveillants. Bien que la classe puisse être basée sur Windows XP, tout ce qui compte à ce stade de l'analyse des logiciels malveillants est le format binaire du programme. Les bases de celui-ci n'ont pas changé au cours de la dernière décennie, ce qui rend la classe toujours pertinente." languages="Anglais" cost="Gratuit" url="https://opensecuritytraining.info/MalwareDynamicAnalysis.html" %}}
{{% resource title="Étude de cas 1 : analyse dynamique d'un binaire malveillant à propagation automatique dans Windows" description="Cet article de blog, d'une durée de 15 minutes, démontre l'analyse dynamique d'un binaire Windows, y compris le trafic réseau, et le trafic de commande et de contrôle." languages="Anglais" cost="Gratuit" url="https://www.keysight.com/blogs/tech/nwvs/2022/06/10/dynamic-analysis-of-a-windows-malicious-self-propagating-binary" %}}
{{% resource title="Étude de cas 2 : configuration d'un domaine Windows pour analyser dynamiquement un outil de mouvement latéral brouillé" description="Étudie les logiciels malveillants qui ont des mécanismes de dissimulation assez puissants et explique comment les analystes de sécurité peuvent utiliser l'analyse dynamique pour en savoir plus à ce sujet. Il comprend des éléments sur la façon de construire un environnement de test et de procéder à une analyse dynamique sur un domaine spécifique." languages="Anglais" cost="Gratuit" url="https://www.real-sec.com/2020/07/configuring-a-windows-domain-to-dynamically-analyze-an-obfuscatedlateral-movement-tool/" %}}
{{% resource title="Étude de cas 3 : démarrage de l'analyse dynamique sur un rootkit Windows x64" description="Un examen approfondi de l'analyse dynamique des rootkits Windows, y compris un aperçu de la façon de configurer une machine virtuelle spécifiquement pour collecter des données à son sujet. Montre également comment combiner l'analyse statique et l'analyse dynamique." languages="Anglais" cost="Gratuit" url="https://medium.com/@0x4ndr3/starting-dynamic-analysis-on-a-windows-x64-rootkit-8c7a74871fda" %}}
{{% resource title="Analyse du trafic de logiciels malveillants" description="Une excellente ressource qui examine comment utiliser les paquets réseau capturés pour détecter et analyser les logiciels malveillants." languages="Anglais" cost="Gratuit" url="https://malware-traffic-analysis.net/" %}}
{{% resource title="Cours Hack The Box sur les tests d'intrusion mobile, Ressource 1" description="Les outils et techniques utilisés pour l'analyse dynamique des logiciels malveillants mobiles sont en grande partie les mêmes que ceux utilisés pour les tests d'intrusion des applications mobiles. Cet article (et les exercices associés) fournit une solide introduction à la pratique." languages="Anglais" cost="Gratuit" url="https://www.hackthebox.com/blog/intro-to-mobile-pentesting" %}}
{{% resource title="Cours Hack The Box sur les tests d'intrusion mobile, Ressource 2" description="Les outils et techniques utilisés pour l'analyse dynamique des logiciels malveillants mobiles sont en grande partie les mêmes que ceux utilisés pour les tests d'intrusion des applications mobiles. Cet article (et les exercices associés) fournit une solide introduction à la pratique." languages="Anglais" cost="Gratuit" url="https://app.hackthebox.com/tracks/Intro-to-Android-Exploitation" %}}
{{% resource title="Frida et House pour Android: Frida" description="Frida est un framework de débogage multiplateforme et open source. Bien qu'il n'ait pas d'interface graphique, il est assez puissant et vous permet de surveiller dynamiquement le comportement de l'application. Pour le rendre un peu plus facile à utiliser, il existe un outil appelé House qui est une interface pour Frida." languages="Anglais" cost="Gratuit" url="https://frida.re/docs/android/" %}}
{{% resource title="Frida et House pour Android: House" description="Frida est un framework de débogage multiplateforme et open source. Bien qu'il n'ait pas d'interface graphique, il est assez puissant et vous permet de surveiller dynamiquement le comportement de l'application. Pour le rendre un peu plus facile à utiliser, il existe un outil appelé House qui est une interface pour Frida." languages="Anglais" cost="Gratuit" url="https://github.com/nccgroup/house" %}}
{{% resource title="Guide avancé : comment utiliser PiRogue pour intercepter le trafic TLS d'une application mobile" description="Une série d'instructions sur la façon d'utiliser PiRogue Tool Suite afin d'effectuer une analyse dynamique sur les binaires Android potentiellement malveillants" languages="Anglais" cost="Gratuit" url="https://pts-project.org/guides/g8/" %}}