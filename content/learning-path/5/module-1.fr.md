+++
style = "module"
weight = 1
title = "Configuration"
description = "Nous présentons et configurons certains des principaux outils d'évaluation de la sécurité web."
+++

## Cas d'utilisation

Le test efficace des applications Web pour détecter les vulnérabilités de sécurité nécessite des outils spécialisés, que ce sous-thème examine.

Le plus important de ces outils est un serveur proxy d'interception, qui vous permettra d'interagir directement avec les données HTTP lorsqu'elles circulent entre votre navigateur et le serveur Web cible. Cela vous permettra d'observer quelles données sont échangées et de les manipuler sans l'interférence de votre navigateur ou des contrôles côté client qui sont en place.

Il existe des outils supplémentaires qui peuvent tester automatiquement les sites Web pour certains types de vulnérabilités. Ceux-ci peuvent à la fois accélérer les tests et détecter certaines vulnérabilités que vous avez peut-être manquées.

Enfin, certains outils seront nécessaires pour les activités pratiques de ce parcours d'apprentissage.

## Objectifs

Après avoir terminé ce sous-thème, les participants auront mis en place le logiciel et les comptes pour terminer le reste de ce parcours d'apprentissage et sauront comment les utiliser, y compris les logiciels et les solutions SaaS suivants :

- Burp Suite Community Edition
- Compte gratuit PortSwigger Academy
- ZAP
- WPScan CLI
- Docker

---
## Section Principale

### Types d'évaluations

Il existe trois approches principales pour l'évaluation de la sécurité des applications Web :

1. Test en boîte blanche : nous avons un accès complet au code source, à l'infrastructure et à la documentation de l'application. Cet accès complet permet un examen approfondi pour identifier les vulnérabilités, et nécessite des compétences en révision de code source et en compréhension de la logique d'application. Il s'agit de la méthode la plus complète, mais la plus laborieuse.

2. Test en boîte noire : nous commençons sans aucune connaissance de l'application, en nous concentrant sur la découverte d'informations par le biais du dénombrement. Cette approche est courante dans les programmes de bug bounty et nécessite des efforts importants dans les étapes initiales pour identifier les vulnérabilités potentielles.

3. Test en boîte grise : cette méthode nous fournit des informations limitées sur l'application, telles que les méthodes d'authentification ou les détails du cadre, en offrant un équilibre entre l'analyse approfondie et l'exploration externe.

Chaque méthode est choisie en fonction du contexte particulier de l'évaluation, y compris les informations disponibles et les objectifs de la mission.

### Burp Suite

#### Qu'est-ce qu'un serveur proxy Web d'interception ?

Le principal outil utilisé dans les évaluations de sécurité des applications Web est un [serveur proxy](https://fr.wikipedia.org/wiki/Proxy) d'interception. Vous connaissez peut-être d'autres types de proxys, comme :

- [squid](http://www.squid-cache.org/), qui est principalement utilisé pour la mise en cache et le contrôle d'accès au réseau,
- [BlueCoat](https://en.wikipedia.org/wiki/Blue_Coat_Systems), qui est populaire pour la surveillance de la conformité de l'entreprise (ou d'autres concurrents), ou
- les proxys inverse CDN tels que ceux utilisés par [Fastly](https://www.fastly.com/), [CloudFlare](https://www.cloudflare.com/fr-fr/) ou [AWS CloudFront](https://aws.amazon.com/fr/cloudfront/).

Les proxys Web se trouvent sur le réseau entre une application Web et un serveur Web, et agissent sur ce trafic réseau.

Les proxys Web sont généralement configurés comme des proxys avant ou arrière (transparents). Dans un proxy de transfert, le navigateur est configuré pour utiliser explicitement le serveur proxy. Le navigateur enverra alors une requête CONNECT au proxy, pour lui demander de transmettre sa requête au serveur réel. Étant donné que le navigateur Web indique au proxy à quel site il essaie de se connecter, les proxys de transfert peuvent établir des connexions à de nombreux sites Web back-end (origine). Cela contraste avec les proxys inverses (ci-dessous). Les proxys inverses ne ressemblent pas à un serveur proxy pour le navigateur, mais se font passer pour le serveur lui-même. Cela peut constituer un avantage pour les clients ou les applications qui ne prennent pas en charge les serveurs proxy. La configuration d'un proxy inverse est généralement plus impliquée qu'un proxy direct, avec une configuration par site et des modifications DNS. Étant donné que le navigateur ne sait pas que le proxy inverse est un serveur proxy, chaque proxy inverse ne peut se connecter qu'à un seul site Web back-end (origine).

Pour obtenir plus d'explications sur les proxys inverses, consultez [ce guide](https://www.cloudflare.com/fr-fr/learning/cdn/glossary/reverse-proxy/).

Le type de proxy utilisé pour les tests d'applications Web fonctionne généralement sur le même ordinateur que le navigateur Web du testeur, bien que cela ne soit pas nécessaire. C'est le type de proxy que nous utiliserons dans ce parcours d'apprentissage. Le proxy effectuera également l'interception TLS, pour déchiffrer le trafic réseau. La principale caractéristique de ces proxys est de permettre à l'utilisateur de visualiser, de mettre en pause et de modifier manuellement le trafic réseau entre le navigateur et le serveur. Par exemple, si le testeur soumet un formulaire, ce qui oblige son navigateur à envoyer une requête POST au serveur, le proxy permettra au testeur de voir et de modifier la requête complète avant qu'elle soit réellement envoyée au serveur. Différents serveurs proxy peuvent avoir beaucoup plus de fonctionnalités, telles que les fonctionnalités de script et d'automatisation, le catalogage de sites et les outils pour effectuer un [fuzz test](https://owasp.org/www-community/Fuzzing) automatique des applications Web.

Deux proxys Web d'interception populaires utilisés pour les évaluations de sécurité sont [Burp Suite](https://portswigger.net/burp) de Portswigger et [ZAP](https://www.zaproxy.org/) de [SSP](https://softwaresecurityproject.org/). Burp Suite est un logiciel payant qui est livré avec une édition communautaire limitée, tandis que ZAP est open source. La majorité des exercices pratiques de ce parcours d'apprentissage sont fournis par Portswigger, et sont donc écrits dans l'optique de l'utilisation de Burp Suite. Cependant, vous pouvez utiliser le proxy (ou les deux). Nous vous recommandons d'utiliser Burp Suite Community Edition pour la plupart des sous-thèmes, mais il existe un sous-thème dédié à l'utilisation de ZAP pour les tests de sécurité automatiques.

#### Configuration de Burp Suite Community Edition

Pour commencer avec Burp, vous devez d'abord [le télécharger](https://portswigger.net/burp/releases/community/latest). Une fois que vous avez téléchargé et installé l'application, ouvrez-la. Avant de commencer à utiliser Burp, il vous sera demandé de spécifier un projet et une configuration. Les projets vous permettent de suivre vos progrès en testant un site entre les sessions, mais ne sont pas pris en charge dans l'édition gratuite, alors sélectionnez simplement « Projet temporaire ». Vous pouvez également spécifier différents ensembles de configurations. Pour l'instant, sélectionnez simplement « Utiliser les valeurs par défaut de Burp ».

![A screenshot of one of Burp Suite's first screens, with "Temporary Project in Memory" selected](/media/uploads/web_security_assessment_burp1.png)

![A screenshot of the next Burp Suite screen, with "Use Burp defaults" selected](/media/uploads/web_security_assessment_burp2.png)

Cela vous mènera à la fenêtre principale de Burp. Les onglets principaux que vous utiliserez sont les onglets « Proxy » et « Intrus ». Pour l'instant, passez à l'onglet Proxy et cliquez sur le bouton « Ouvrir le navigateur ». Cela ouvrira une instance Chromium entièrement configurée pour utiliser Burp. Ce navigateur intégré est configuré pour utiliser Burp comme proxy et sa configuration TLS a été modifiée pour permettre à Burp d'intercepter le trafic chiffré. Vous pouvez utiliser cette instance de navigateur pour tester des applications Web pendant que vous utilisez votre navigateur normal pour la navigation générale.

![A screenshot of Burp Suite, with proxy and intercept enabled](/media/uploads/web_security_assessment_burp3.png)

![A screenshot of the Burp Suite intercept. A web browser has loaded the Internews web page, and the intercept is listing all the requests it makes](/media/uploads/web_security_assessment_burp4.png)

Pour l'instant, saisissez l'URL de n'importe quel site Web dans le navigateur intégré de Burp et appuyez sur Entrée. Vous remarquerez que rien ne se passe dans le navigateur. Revenez à Burp et vous verrez la requête HTTP envoyée par le navigateur, et un bouton mis évidence indiquant « L'interception est activée ». Ce qui s'est passé, c'est que Burp a reçu la demande de votre navigateur, mais ne l'a pas transmise au serveur Web. Au lieu de cela, il vous permet d'inspecter et de modifier la requête. Pour l'instant, cliquez sur le bouton « L'interception est activée » pour désactiver l'interception. Si vous regardez l'instance Chromium intégrée à Burp, vous devriez voir la page Web chargée. Revenez à Burp et cliquez sur le sous-onglet « Historique HTTP » de l'onglet Proxy. Vous verrez un journal de toutes les requêtes HTTP envoyées par votre navigateur. Si vous cliquez sur l'une de ces requêtes, vous obtiendrez ses détails ainsi que la réponse du serveur.

![A screenshot of the Burp Suite proxy, collecting HTTP history. The Internews website is in the foreground](/media/uploads/web_security_assessment_burp5.png)

Si vous voulez modifier une requête qui a déjà été envoyée, cliquez avec le bouton droit sur cette requête et sélectionnez « Envoyer au répéteur ». Passez à l'onglet Répéteur et vous verrez la requête à gauche. Une bonne pratique consiste à cliquer immédiatement sur le bouton « Envoyer » pour obtenir une réponse normale. Vous pouvez ensuite modifier la requête et envoyer la requête modifiée. Vous pouvez utiliser les boutons « &lt; » et « &gt; » pour voir les requêtes et les réponses précédentes. L'utilisation de l'onglet Répéteur est extrêmement importante lors des évaluations de sécurité, comme vous le verrez dans les sous-thèmes ultérieurs.

![A screenshot of the Burp Suite proxy, as it has collected an item of HTTP history and is sending that item to the intruder feature](/media/uploads/web_security_assessment_burp6.png)

Une caractéristique importante de l'interface du répéteur est la fonction « URL-encode as you type ». Cela encodera automatiquement les caractères au fur et à mesure que vous les saisirez, en vous évitant de nombreuses erreurs et en vous faisant économiser beaucoup de temps. Selon ce que vous modifiez, vous devrez activer ou désactiver cette fonctionnalité. Pour modifier le paramètre, cliquez avec le bouton droit sur le volet Requête et sélectionnez l'élément de menu.

![A screenshot of the Burp Suite proxy, as it has collected an item of HTTP history and is sending that item to the repeater feature](/media/uploads/web_security_assessment_burp7.png)

Cela vous permettra de commencer avec Burp Suite. L'édition communautaire gratuite est suffisante pour ce parcours d'apprentissage, bien que la plupart des utilisateurs payés pour effectuer des évaluations de sécurité des sites Web choisissent de s'abonner à l'édition professionnelle. La version gratuite et payante comprennent un grand nombre de fonctionnalités qui sont documentées sur le [site Web de Portswigger](https://portswigger.net/burp/documentation). Vous irez beaucoup plus en profondeur dans Burp dans la plupart des sous-thèmes suivants (bien que vous puissiez utiliser n'importe quel proxy de votre préférence).

### PortSwigger Academy

Pour tous les sous-thèmes portant sur les classes de vulnérabilité, la grande majorité des cours et des exercices sont hébergés sur la PortSwigger Academy. La PortSwigger Academy est un site Web gratuit qui comprend des cours et des exercices pratiques couvrant la grande majorité des sujets de sécurité Web courants. La structure de ces sujets est constituée d'un certain nombre de pages Web qui comprennent des liens vers des exercices pratiques dans les pages. Vous devrez utiliser Burp Suite comme décrit ci-dessus pour résoudre ces exercices pratiques. (La plupart des exercices peuvent être résolus avec n'importe quel proxy d'interception, mais certains nécessitent Burp spécifiquement.)

Dans les sous-thèmes ci-dessous, chaque sous-thème attribuera une section de lecture et de laboratoires de la PortSwigger Academy. Lorsque vous terminez ces tâches, assurez-vous de parcourir toutes les pages et de remplir tous les exercices pratiques de niveau « apprenti ». Vous devriez également essayer tous les exercices pratiques de niveau « praticien », mais essayer de ne pas vous fixer sur un exercice en particulier. Si vous êtes coincé(e) dans un exercice de praticien particulier, passez à autre chose et revenez-y avant de terminer l'exercice final de validation des compétences du parcours d'apprentissage.

![A screenshot of PortSwigger academy, demonstrating an XSS proof of concept](/media/uploads/web_security_assessment_PortSwigger_screenshot1.png)

Le sujet XSS de la PortSwigger Academy. Assurez-vous de passer en revue tous les sous-thèmes. « Qu'est-ce que le XSS » par les « tests » constitue une page Web, mais chaque sous-thème a sa propre page.

![A screenshot of PortSwigger academy, demonstrating reflected XSS](/media/uploads/web_security_assessment_PortSwigger_screenshot2.png)

Sous-thème des Reflected XSS de PortSwigger Academy. Notez l'exercice pratique en lien dans le bas de la capture d'écran.

![A screenshot of PortSwigger academy, demonstrating three labs in the reflected XSS subtopic](/media/uploads/web_security_assessment_PortSwigger_screenshot3.png)

Après avoir terminé un thème (p. ex., XSS), revérifiez l'achèvement de votre exercice pratique en cochant le lien « Afficher tous les exercices du _thème_ ». Cela vous permettra de voir tous les exercices pratiques que vous avez manqués.

**Essayez par vous-même**

Accédez à la [PortSwigger Academy](https://portswigger.net/web-security) et ouvrez un compte.

**‼️** Si vous vous sentez coincé(e) dans un exercice pratique, vous pouvez accéder à un certain nombre de guides et de tutoriels sur [YouTube](https://www.youtube.com/results?search_query=portswigger+lab+walkthrough) et les blogs. Notez qu'il est peu probable que le suivi d'un guide soit très bénéfique pour votre apprentissage. Si vous avez besoin de plusieurs guides pour résoudre les exercices, vous pourriez peut-être prendre du recul, relire le contenu, puis essayer de refaire soigneusement certains des exercices que vous avez précédemment terminés en utilisant les guides.

### ZAP

ZAP est une alternative open source à Burp Suite. Bien qu'il ne soit pas aussi favorisé parmi les professionnels, il a l'avantage distinct d'être gratuit et d'inclure un scanner de sécurité d'applications Web. Bien que les interfaces utilisateur soient différentes sur ZAP et Burp, les outils proposent les mêmes fonctionnalités de base.

**Essayez par vous-même**

[Téléchargez ZAP](https://www.zaproxy.org/download/), puis parcourez la section Installation, Interface utilisateur sur ordinateur et Exploration manuelle d'une application du [guide de démarrage de ZAP](https://www.zaproxy.org/getting-started/). Nous aborderons ZAP plus en profondeur dans le sous-thème relatif à l'automatisation.

#### Docker

Docker est un système qui vous permet d'exécuter des applications linux dans un environnement semi-autonome, appelé conteneurs. Bien qu'ils ne soient pas aussi sécurisés qu'une machine virtuelle à part entière, les conteneurs sont beaucoup plus légers et flexibles. Sous Windows et Mac, Docker inclut une machine virtuelle Linux. Aux fins du présent parcours d'apprentissage, nous utiliserons Docker pour vous permettre d'exécuter facilement des sites Web complets sur votre ordinateur.

**Essayez par vous-même**

[Installez Docker pour ordinateur](https://docs.docker.com/desktop/). Vous ne devriez pas avoir besoin de créer un compte ou d'acquérir une licence commerciale pour suivre ce parcours d'apprentissage. Veuillez noter que vous avez probablement terminé cette étape dans le cadre du parcours d'apprentissage sur les principes fondamentaux de la sécurité des applications Web.

#### sqlmap

Bien que les humains puissent être très doués pour détecter des vulnérabilités d'injection SQL, l'exploitation de ces vulnérabilités implique souvent un travail extrêmement répétitif. sqlmap est un outil d'injection SQL qui excelle dans l'exploitation. Il comprend des scripts qui détermineront comment énumérer la structure d'une base de données et extraire le contenu de cette base de données en utilisant l'injection SQL. Cela est très utile à la fois pour démontrer la gravité des vulnérabilités d'injection SQL et pour trouver d'autres vulnérabilités liées au stockage de données.

**Essayez par vous-même**

Installez sqlmap. Vous pouvez soit [le télécharger](https://sqlmap.org/) (il est basé sur Python) ou utiliser quelque chose comme un [paquet de Kali](https://www.kali.org/tools/sqlmap/).

#### WPScan CLI

Dans le domaine du journalisme indépendant et de la société civile, de nombreux médias utilisent WordPress pour partager leur contenu. WordPress est un logiciel compliqué comprenant de nombreuses extensions et options de configuration qui peuvent avoir un impact important sur la sécurité. Dans le cadre du sous-thème sur l'automatisation, nous utiliserons un outil open source appelé WPScan pour trouver des faiblesses de sécurité dans un site WordPress.

**Essayez par vous-même**

[Installez le CLI de WPScan](https://github.com/wpscanteam/wpscan). Notez que cela peut être obtenu à partir de la source, d'un gestionnaire de paquets (comme homebrew ou rubygems), en tant que conteneur Docker ou en utilisant la version incluse dans de nombreuses distributions de MV de test d'intrusion telles que Kali Linux. Le choix n'appartient qu'à vous. Nous aborderons WPScan dans le sous-thème sur l'automatisation.

## Exercice pratique

Assurez-vous d'avoir installé et configuré les outils suivants, que nous avons également énumérés ci-dessus :

- Burp Suite (Community Edition)
- ZAP
- Docker Desktop
- sqlmap
- WPScan CLI

## Contrôle de compétence

- Aucun contrôle de compétence

## Ressources d'apprentissage

{{% resource title="PortSwigger Academy" description="Un ensemble d'explications et d'exercices pratiques sur la sécurité des applications Web sera utilisé comme ressource tout au long de ce parcours d'apprentissage" languages="Anglais" cost="Gratuit" url="https://portswigger.net/web-security/all-topics" %}}
{{% resource title="Qu'est-ce qu'un proxy inverse ?" description="Un aperçu rapide de ce qu'est un proxy inverse et de ce qui le distingue d'un proxy conventionnel" languages="Allemand, espagnol, français, italien, japonais, coréen, portugais, chinois, taïwanais" cost="Gratuit" url="https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/" %}}
{{% resource title="Serveur proxy" description="Introduction au concept de serveur proxy" languages="54 langues" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Proxy" %}}
{{% resource title="Fuzzing" description="Une explication simple du fuzzing à partir de la documentation de l'OWASP" languages="Anglais" cost="Gratuit" url="https://owasp.org/www-community/Fuzzing" %}}
{{% resource title="Squid Cache" description="Logiciel proxy que tout le monde peut déployer" languages="Anglais" cost="Gratuit" url="http://www.squid-cache.org/" %}}
{{% resource title="Proxys commerciaux et réseaux de diffusion de contenu: Fastly" description="Plusieurs entreprises fournissent des services proxy et CDN" languages="Nombreuses langues, dépend du produit" cost="Varié" url="https://www.fastly.com/" %}}
{{% resource title="Proxys commerciaux et réseaux de diffusion de contenu: CloudFlare" description="Plusieurs entreprises fournissent des services proxy et CDN" languages="Nombreuses langues, dépend du produit" cost="Varié" url="https://aws.amazon.com/fr/cloudfront/" %}}
{{% resource title="Proxys commerciaux et réseaux de diffusion de contenu: Amazon CloudFront" description="Plusieurs entreprises fournissent des services proxy et CDN" languages="Nombreuses langues, dépend du produit" cost="Varié" url="https://aws.amazon.com/fr/cloudfront/" %}}
{{% resource title="Fuzzing" description="Un aperçu du fuzzing, une technique de test de logiciel qui peut être utilisée à toutes sortes de fins, y compris le test de sites Web et d'applications Web" languages="Anglais" cost="Gratuit" url="https://owasp.org/www-community/Fuzzing" %}}
{{% resource title="Burp Suite" description="Un outil de test de sécurité Web populaire" languages="Anglais" cost="La version communautaire est gratuite, l'édition Pro coûte 449 $ par utilisateur" url="https://portswigger.net/burp" %}}
{{% resource title="ZAP" description="Un outil de test de sécurité très populaire pour les applications Web" languages="Anglais" cost="Gratuit" url="https://www.zaproxy.org/" %}}
{{% resource title="Docker Desktop" description="Un outil pour installer des conteneurs contenant des applications exécutables , crucial pour lancer et tester rapidement de nouveaux outils ou exécuter du code dans un environnement contrôlé" languages="Anglais" cost="Gratuit" url="https://docs.docker.com/desktop/" %}}
{{% resource title="sqlmap" description="Un outil de test d'intrusion open source qui teste l'injection SQL" languages="Anglais" cost="Gratuit" url="https://sqlmap.org/" %}}
{{% resource title="WPScan" description="Un scanner de sécurité pour WordPress" languages="Anglais" cost="Gratuit" url="https://github.com/wpscanteam/wpscan" %}}
