+++
style = "module"
weight = 6
title = "Peaufiner votre processus de test des applications Web"
description = "Une fois que vous avez compris les bases de la recherche de vulnérabilités sur les sites web, ce sous-thème vous apprendra un processus pour les trouver plus rapidement et efficacement."
+++

## Cas d'utilisation

Le sous-thème 5 est une condition préalable à celui-ci et les apprenants sont fortement encouragés à le lire attentivement avant de continuer.

Si vous Il est fort probable que vous ayez éprouvé des difficultés lors du dernier exercice pratique. Il vous a probablement pris beaucoup de temps et vous avez probablement manqué de nombreuses vulnérabilités. Ne vous découragez pas ! Avant de commencer, vous en auriez trouvé beaucoup moins en beaucoup plus de temps. Ce n'est peut-être pas génial, mais il est très difficile de passer de l'apprentissage des vulnérabilités isolément à leur découverte dans un environnement ouvert. C'est pourquoi les difficultés et l'absence de réussite absolue font partie du processus.

Une fois que vous avez compris les bases de la recherche de vulnérabilités au sein des sites Web, ce sous-thème vous enseignera un processus permettant de trouver ces vulnérabilités plus rapidement et plus efficacement.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de mettre en œuvre une approche méthodique de l'évaluation de la sécurité des applications Web qui permette de trouver plus de vulnérabilités en moins de temps.

---
## Section Principale

Il existe quelques pièges courants qui surprennent les nouveaux testeurs d'applications Web. Demandez-vous si vous avez été victime de l'une ou l'autre de ces situations pendant que vous faisiez le test de Juice Shop :

- Parcourir le site
- Se concentrer d'abord sur la détection de vulnérabilités particulières, plutôt que de tester entièrement certaines sections
- Faire une fixation sur certaines pages/entrées et passer beaucoup de temps à chercher des vulnérabilités inexistantes
- Ne pas signaler les vulnérabilités dès qu'elles sont trouvées, et devoir revenir en arrière pour les tester à nouveau afin de les documenter
- Manquer des sections du site et/ou des classes de vulnérabilité entières

Ne vous inquiétez pas si vous reconnaissez l'un de ces écueils. La plupart des intervenants sont concernés par ces problèmes, souvent dans le cadre de carrières complètes en tant que testeurs d'applications Web professionnels. Ce que vous pouvez faire est de développer des stratégies pour éviter ces (et d'autres) problèmes qui rendent votre test plus lent et peu fiable. Ce sous-thème vous montrera quelques stratégies permettant de vous aider à démarrer.

### Stratégie 1 : processus de test

Dans le dernier sous-thème, nous avons introduit le concept d'une méthodologie pour les évaluations de sécurité des applications Web, une façon d'organiser et de penser les tests. Maintenant, nous allons recadrer cela dans un processus. Le problème avec un cadre de travail, c'est qu'il risque d'être trop général. Vous pouvez tester n'importe quelle application Web en utilisant le cadre de travail, mais dans le cas des applications plus spécifiques, vous aurez plus de succès si vous vous donnez plus de structure.

#### Premiers pas

Lorsque vous testez un site Web, vous devriez généralement avoir deux utilisateurs à chaque niveau d'accès, bien que cela puisse varier. Envisagez un forum en ligne. Vous devriez avoir deux utilisateurs enregistrés, un ou deux modérateurs et un ou deux utilisateurs administrateurs. Cela vous permettra de tester pleinement les contrôles d'autorisation du site. Dans l'exemple ci-dessus, les éléments à tester sont les suivants :

- Les utilisateurs peuvent-ils modifier les publications des autres ?
- Les utilisateurs peuvent-ils voir les messages privés des autres ?
- Les utilisateurs qui ne sont pas administrateurs ou modérateurs peuvent-ils effectuer des fonctions de modération ?
- Les utilisateurs ou modérateurs qui ne sont pas administrateurs peuvent-ils effectuer des fonctions administratives ?

Si vous testez un site Web de forum qui autorise plusieurs sous-forums, vous pourriez avoir besoin de 3 utilisateurs normaux (deux affectés au sous-forum A et un au sous-forum B), de deux modérateurs et administrateurs (un pour chaque sous-forum) et d'un super-administrateur.

Une fois que vous avez les comptes d'utilisateur dont vous avez besoin, vous pouvez commencer à créer un plan du site. La carte du site guidera vos tests et servira de liste de contrôle pour les tests. À titre d'exemple, vous pourriez produire quelque chose comme ceci :

![A big table which lists every item on a webpage that can be accessed by a user, along with its URL and a checklist for who can access it--unauthenticated users, particular authenticated users, moderators, or admins](/media/uploads/web_security_assessment_testing_table1.png)

Cela montre chaque page que vous avez trouvée dans l'application (colonne « URL »), sa navigation logique, si le contenu de la page change en fonction de ses paramètres (colonne « propre à l'utilisateur »), puis si chaque type d'utilisateur a accès à l'URL. Il y a également une colonne « notes » pour recueillir des renseignements importants sur la page, p. ex., si la page de profil affiche un contenu très différent selon l'utilisateur de la personne qui consulte la page ou si les données saisies sur une page s'affichent sur une autre. Certains sites peuvent ne pas s'intégrer dans cette structure particulière. Ce n'est pas un problème, la structure doit être spécifique au site, alors n'hésitez pas à la modifier. Cela devrait toutefois fonctionner pour la plupart des sites.

Lors de la construction de cette feuille de calcul, vous devez parcourir toutes les pages du site et tous les rôles d'utilisateur du site. Il s'agit de la majeure partie de la section Découverte de la méthodologie Web utilisée dans le sous-thème précédent. Donc, évidemment, lorsque vous construisez le plan du site, vous devez vous assurer de compléter tous les tests de Découverte.

⚠️ Cette partie du processus est extrêmement importante, mais peut s'avérer très ennuyeuse. Pour l'adoucir, faites _un petit_ test ad-hoc pendant que vous parcourez le site. Par exemple, vérifiez certaines entrées contre le XSS et faites des vérifications d'autorisation. Cela vous aidera à rester actif(ve) pendant que vous parcourez le site.

#### Test par site

Certaines parties de la méthodologie s'appliquent à l'ensemble du site ou à quelques endroits sur le site. Chaque serveur Web a une certaine configuration et la plupart des sites Web ont 1 à quelques serveurs logiques (p. ex., [www.exemple.com](http://www.example.com), api.exemple.com, static.exemple.com). La plupart des sites ont une (ou peut-être deux) sections de connexion/enregistrement/gestion de compte et des mécanismes de gestion de session. Vous devriez faire ces tests ensuite. Cela vous permettra de vous sentir productif(ve) en remplissant rapidement plusieurs sections de la méthodologie, et vous donnera une chance de comprendre les fondements structurels du site Web. Au fur et à mesure que vous faites ces tests, vous pourriez trouver d'autres pages Web que vous avez manquées à l'origine. Si c'est le cas, ne vous inquiétez pas et assurez-vous de les ajouter à votre feuille de calcul !

La plupart des gens choisissent de conserver leurs notes de test dans un fichier texte, par opposition à leur feuille de calcul de test, mais faites ce qui vous semble naturel.

#### Test par page

Maintenant que vous comprenez le site, vous pouvez vous plonger dans la plus grande partie du test du site : tester chaque page (et chaque entrée) pour appliquer l'ensemble des tests du reste de la méthodologie. Cela comprendra de nombreux éléments à suivre, et si vous ne restez pas concentré(e) et que vous perdez le fil, vous risquez de manquer des choses. Heureusement, vous avez préparé une feuille de calcul. Il vous suffit d'étendre cette feuille de calcul et vous obtenez une liste de contrôle complète :

![A screenshot of a similar table to the one above except that there are not more columns which allow the person filling it in to check boxes for various authorization, authentication, XSS, and other vulnerabilities they might encounter](/media/uploads/web_security_assessment_testing_table2.png)

Cela peut sembler intimidant, mais chaque cellule de cette feuille est un petit morceau de travail isolé qui devrait prendre un temps limité. Il est généralement plus efficace de parcourir le site en remplissant d'abord les lignes. Choisissez une page et passez en revue toute la méthodologie, plutôt que d'effectuer un test sur l'ensemble du site. Ajoutez une marque comme « √ » dans les cellules à mesure que vous les remplissez, ou quelque chose comme « n/a » si les tests ne sont pas applicables. Au fil des heures et des jours, votre liste de contrôle se remplira et vous serez assuré(e) d'avoir effectué des tests complets.

⚠️ Il peut être judicieux de conserver des notes séparées dans votre document de notes régulières pendant que vous faites ce test, vous voudrez garder une feuille de calcul propre et claire.

### Stratégie 2 : tests limités dans le temps

Faire une fixation sur une page/entrée/etc. particulière pendant les tests et y passer des heures est une erreur quasi universelle chez les personnes qui testent des applications Web. Ils pensent qu'ils sont sur le point de faire une découverte et qu'ils auront terminé dans 10 minutes. Mais deux heures plus tard, ils ont oublié de déjeuner. (Ce n'est pas le cas de tout le monde. Mais si vous vous reconnaissez, bienvenue au club.) Si vous aviez un temps infini pour tester un site, cela ne serait pas vraiment un problème (mis à part les repas oubliés). La plupart du temps, cependant, votre temps est limité. Si vous manquez de temps parce que vous avez fait une fixation sur une page, vous risquez de négliger des parties entières du site criblées de vulnérabilités non testées.

Si vous vous retrouvez coincé(e) fréquemment, réglez une minuterie chaque fois que vous démarrez une cellule dans la feuille de calcul de test. Assurez-vous de ne pas regarder la minuterie. La conscience d'un compte à rebours peut s'avérer stressant. Avec l'expérience, vous serez en mesure de deviner combien de temps chaque cellule devrait vous prendre. Accordez-vous un tampon confortable (environ 50 % ou plus). Ainsi, si vous pensez pouvoir terminer une cellule en 10 minutes, réglez la minuterie sur 15 ou 20 minutes. L'idée du minuteur est de vous avertir lorsque vous vous obstinez, pas de vous motiver à avancer plus vite. Si le minuteur se déclenche avant que vous ayez terminé la cellule, arrêtez-vous et procédez à l'évaluation. Si vous avez trouvé une vulnérabilité et que vous progressez en créant une exploitation de faille de démonstration (par exemple, vous trouvez une injection SQL et vous configurez une requête pour extraire des informations de la base de données), réinitialisez le minuteur et continuez. En revanche, si vous trouvez que vous courez après une vulnérabilité qui n'existe peut-être pas réellement, alors prenez note de vos progrès et passez à la cellule suivante. Vous pourrez y revenir à la fin des tests s'il vous reste du temps.

Cette stratégie présente également de bons avantages en termes de santé. Le processus de réinitialisation de la minuterie à chaque cellule vous donne également l'occasion de vous lever et de vous étirer, de prendre une boisson, de vous assurer de prendre vos repas, etc.

### Stratégie 3 : documenter au fur et à mesure

Cette stratégie a été discutée dans la section précédente, mais la plupart des participants ignorent ce conseil au début. J'espère qu'après avoir terminé la section précédente, vous avez suivi le conseil ou vous avez appris que la rédaction du rapport à la fin des tests n'est pas une stratégie efficace. Beaucoup de gens doivent apprendre cette leçon à plusieurs reprises tout au long de leur carrière au fil des tests de sécurité, alors ne vous inquiétez pas si vous tombez dans le piège de temps en temps.

Par ailleurs, vous devriez veiller à prendre des notes efficaces. Beaucoup de gens gardent un fichier de notes prises en cours de route qui inclut tout ce qu'ils pensent et les choses étranges qu'ils remarquent pendant les tests, et un autre fichier de notes qui comprend plus de détails sur les vulnérabilités qu'ils trouvent et les conclusions relatives au site qui sont trop détaillées ou inadaptées au rapport.

Ces stratégies devraient vous permettre de réussir vos tests de sites Web. Nous les mettrons en pratique dans la prochaine sous-section de ce sous-thème.

#### Envisager les vulnérabilités à travers le prisme du modèle OSI

Le modèle [OSI](https://tryhackme.com/room/introtonetworking) (Open Systems Interconnection) sert de cadre normalisé pour la compréhension de la théorie des réseaux informatiques, bien que les réseaux du monde réel soient principalement basés sur le modèle TCP/IP plus concis. Néanmoins, le modèle OSI reste utile pour acquérir une compréhension initiale des concepts de mise en réseau. Ces couches permettent collectivement le bon fonctionnement des réseaux informatiques, en assurant une transmission efficace et fiable des données des applications au niveau matériel physique.

Étant donné que le modèle OSI est l'une des principales façons dont nous pensons à la mise en réseau, il est utile de le connaître lorsque vous réfléchissez à des vulnérabilités potentielles et que vous les recherchez.


| Couche   | Nom                          |
|----------|-----------------------------|
| couche 7 | APPLICATION                  |
| couche 6 | PRÉSENTATION                 |
| couche 5 | SESSION                      |
| couche 4 | TRANSPORT                    |
| couche 3 | RÉSEAU                       |
| couche 2 | LIAISON DE DONNÉES           |
| couche 1 | PHYSIQUE                     |


Le modèle OSI comprend sept couches :

1. **Application** : fournit des capacités de mise en réseau aux programmes informatiques, en facilitant la transmission des données entre les applications. Les données reçues dans cette couche sont ensuite transmises à la couche de présentation.
2. **Présentation** : reçoit les données de la couche d'application, souvent dans un format spécifique à l'application. Elle normalise le format des données et gère des tâches telles que le chiffrement et la compression avant de les transmettre à la couche de session.
3. **Session** : tente d'établir et de maintenir une connexion avec un autre ordinateur sur le réseau. Elle gère les sessions de communication et synchronise les échanges de données entre l'hôte et les ordinateurs distants.
4. **Transport** : sélectionne le protocole de transmission (TCP ou UDP) et décompose les données en segments ou datagrammes gérables. TCP offre une transmission fiable basée sur la connexion, tandis qu'UDP privilégie la vitesse.
5. **Réseau** : détermine la destination de la transmission des données en utilisant l'adressage logique (par exemple, les adresses IP) pour identifier le meilleur itinéraire à travers le réseau. Les formats d'adressage logique couramment utilisés incluent IPV4.
6. **Liaison des données** : se concentre sur l'adressage physique en ajoutant l'adresse MAC (Media Access Control) du point de terminaison de réception au paquet de transmission. Elle assure également l'intégrité de la transmission des données et prépare les données pour la transmission.
7. **Physique** : gère les aspects matériels du transfert de données, en convertissant les données binaires en signaux pour permettre leur transmission sur le réseau. Elle est responsable de l'envoi et de la réception des impulsions électriques qui constituent le transfert de données.

Les cybercriminels peuvent violer chaque couche du modèle OSI [en raison de vulnérabilités propres](https://www.pynetlabs.com/various-kinds-of-osi-layer-attacks/). Ces vulnérabilités peuvent provenir de bugs logiciels, de défauts de conception et de configurations incorrectes, qui donnent collectivement aux cybercriminels la possibilité d'exploiter les faiblesses des sept couches.

- Application : les attaques courantes ciblant cette couche incluent le Cross-Site Scripting (XSS), où des scripts malveillants sont injectés dans des applications Web pour compromettre les données des utilisateurs ou détourner des sessions.
- Présentation : les cybercriminels peuvent cibler cette couche avec des techniques telles que les attaques de chaînes de format ou l'exploitation des vulnérabilités dans les algorithmes de chiffrement.
- Session : les attaques de couche de session incluent le détournement de session, où un cybercriminel intercepte et prend le contrôle de la session d'un utilisateur pour obtenir un accès non autorisé.
- Transport : les attaques de la couche de transport peuvent impliquer un flooding TCP SYN ou des attaques de flood UDP, qui submergent les ressources du réseau en envoyant de nombreuses demandes de connexion.
- Réseau : les attaques de la couche réseau incluent le spoofing IP, où les cybercriminels falsifient l'adresse IP source des paquets pour contourner les mesures de sécurité ou lancer des attaques par déni de service.
- Liaison des données : les attaques ciblant la couche de liaison des données peuvent inclure des attaques de flooding MAC ou des attaques d'usurpation du protocole de résolution d'adresses (ARP), qui perturbent la connectivité réseau ou facilitent les attaques « man-in-the-middle ».
- Physique : les attaques de la couche physique impliquent une altération physique, telle qu'un branchement de câble ou une interférence de signal, pour perturber la communication réseau ou intercepter des données.

## Exercice pratique

Cet exercice pratique est similaire à celui de la sous-section précédente, sauf que cette fois, vous suivrez le processus de test décrit ci-dessus. De plus, le site Web que vous allez tester est un peu plus réaliste. Il a été conçu comme un site comprenant des vulnérabilités, par opposition à un site contenant de nombreux défis. À ce titre, il devrait vous donner l'impression de tester un véritable site Web.

1. [Installer DIWA](https://github.com/snsttr/diwa) (Docker est généralement la méthode la plus simple)
2. Préparez votre environnement de test comme dans le cas du sous-thème précédent. Assurez-vous d'avoir un rapport vierge, un ou plusieurs fichiers de notes et une feuille de calcul de test. Concernant cette dernière (et vos travaux futurs), n'hésitez pas à copier [ce modèle](https://docs.google.com/spreadsheets/d/1NPDA-CI5t_X0krw2qMwcOOupIWXhMCfYiTZFeyv-A08/edit#gid=0).
3. Commencez les tests ! Suivez le processus décrit dans ce sous-thème et comparez vos impressions par rapport au test de Juice Shop. Comme précédemment, le but est de s'exercer. Ne cherchez pas de réponses ou d'explications avant d'avoir terminé.

## Contrôle de compétence

Si vous avez un mentor, passez en revue votre rapport avec lui. Vous trouverez probablement utile de consulter [une liste des vulnérabilités présentes dans DIWA](https://github.com/jeremiahblatz/diwa-answers/wiki/) (n'hésitez pas à soumettre les ajouts éventuels). Si vous avez trouvé la majorité d'entre eux dans un délai raisonnable (1 à 2 jours), nous vous félicitons !

Si vous n'avez pas de mentor, vous pouvez vous autoévaluer à l'aide de la liste ci-dessus.