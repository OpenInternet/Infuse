+++
style = "module"
weight = 4
title = "Intervention en cas d'incident de piratage"
description = "Nous examinons certaines méthodes permettant d'enquêter sur une attaque ayant ciblé notre site web et de s'en remettre."
+++

## Cas d'utilisation

Si un site Web est piraté, il est essentiel de comprendre les actions et les méthodes du cybercriminel. Au minimum, les propriétaires du site doivent identifier la façon dont le site a été initialement compromis afin de pouvoir corriger les vulnérabilités associées. Il peut également être important de savoir quelles données les cybercriminels peuvent avoir consultées ou modifiées. Ce parcours d'apprentissage décrit certaines pratiques pour aider à enquêter et à effectuer une récupération après un incident de piratage d'un site Web.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Identifier le point de compromission initiale du site Web
- Identifier les actions d'un cybercriminel après la compromission initiale

---
## Section Principale

### Identifier un incident de piratage

Pour la plupart des victimes d'un incident de piratage, le délai entre la compromission initiale et la détection peut être de plusieurs mois, voire des années. La faille est souvent détectée lorsqu'un intervenant trouve quelque chose qui « semble étrange ». Voici quelques signes de compromission :

- Modifications du contenu du site. Celles-ci peuvent être subtiles (par exemple, des changements invisibles de JavaScript) comme évidentes (dégradation).
- Comptes d'utilisateurs apparaissant dans des bases de données de mots de passe ou d'autres dumps de données
- Fichiers inexpliqués sur le serveur Web
- Trafic réseau inhabituel dans ou hors du Web ou d'autres serveurs
- Petites pointes de trafic, associées à des requêtes étranges dans les journaux d'accès ou d'erreurs

Lorsque des signes de compromission potentielle se manifestent, il est tout à fait naturel de vouloir les expliquer. Personne ne veut faire face à la perspective d'un piratage de son site Web. À vrai dire, la plupart des sites Web ne sont jamais piratés. Il y a donc probablement une explication parfaitement raisonnable. Cependant, il est important de détecter et d'enquêter sur les compromissions le plus rapidement possible.

### Passer d'un IoC à une compromission initiale

Une fois que vous avez établi que le site a été piraté par un ou plusieurs IoC (indicateurs de compromission), l'étape suivante consiste à revenir en arrière pour trouver la source de compromission initiale. Cela sert deux objectifs :

- Cela permet d'identifier quelle vulnérabilité a permis au cybercriminel de compromettre le site, en permettant au propriétaire du site de corriger la vulnérabilité avant de restaurer le site.
- Une fois que la compromission initiale est trouvée, vous pouvez poursuivre le travail pour trouver les activités effectuées par le cybercriminel.

Une compromission de site Web ne commence pas toujours par une vulnérabilité du site en lui-même. Bien que cela puisse être le moyen le plus courant, vous ne devriez pas disqualifier les éléments comme les [comptes de développeur compromis](https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/) permettant au cybercriminel de simplement téléverser une porte dérobée, ou une [dépendance dérobée](https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/) utilisée dans le cadre d'une attaque de la chaîne d'approvisionnement.

Passer d'un IoC à l'étape précédente de la chaîne de l'attaque consiste à connecter les données et les métadonnées de l'IoC à la source de l'IoC. Par exemple, si un fichier inattendu se trouve sur le serveur Web, quand le fichier a-t-il été créé ? Quel compte a créé le fichier (p. ex., le système de déploiement, le serveur Web lui-même, un compte de développeur) ? Si le serveur Web a créé le fichier, vérifiez les journaux d'accès pour consulter les requêtes au moment de la création et un peu avant. Si le compte d'un développeur a créé le fichier, vérifiez les journaux SSH et autres journaux d'accès à distance au moment et un peu avant l'heure de création de ce fichier. Si le système de déploiement a créé le fichier, vérifiez si le fichier a été ajouté au référentiel de code source. Pour chacun de ces cas, si vous trouvez quelque chose, cela peut vous donner un autre IoC à partir duquel travailler. Vous trouverez peut-être quelque chose dans les journaux Web : y a-t-il des requêtes préalables de cette adresse IP ou netblock avec cet agent utilisateur ? Si un fichier malveillant a été ajouté au contrôle des sources, quel compte l'a ajouté et d'où s'est-il authentifié ?

Gardez à l'esprit que même les cybercriminels peu compétents tenteront généralement de couvrir leurs traces. Voici quelques techniques qu'ils peuvent utiliser :

- Se connecter à partir de différentes adresses IP en utilisant différentes chaînes utilisateur-agent
- Téléverser une porte dérobée initiale, puis utiliser cette porte dérobée pour télécharger une porte dérobée différente, et enfin supprimer la première porte dérobée
- Supprimer des fichiers journaux qu'ils trouvent sur le serveur
- Ralentir leurs outils de piratage (par ex., [sqlmap](https://sqlmap.org/)) afin de ne pas provoquer de pic de trafic important

Pour ces raisons et d'autres, vous ne serez peut-être pas en mesure de créer un ensemble clair d'étapes liant un IoC à une compromission initiale. Dans certains cas (comme trouver des dumps de données sur le Dark Web), il peut y avoir très peu de choses à faire. Notez que l'examen des journaux est grandement facilité si le site Web utilise une plateforme de journalisation centrale de haute sécurité, car avec un peu de chance, le cybercriminel n'a pas été en mesure de modifier ou de supprimer ces journaux. Les journaux qui se trouvent sur un hôte compromis peuvent ne pas être entièrement fiables. Un autre écueil concerne les horodatages de journaux qui ne sont pas alignés. Les différents systèmes peuvent utiliser différents fuseaux horaires, ou peuvent avoir des horloges système inexactes. Lors de la comparaison des horodatages sur différents systèmes, il est utile d'essayer de trouver des journaux pour un seul événement, puis de les utiliser pour trouver le décalage entre les horodatages.

En l'absence d'IoC non informatifs, vous devez essayer une recherche ouverte des journaux du serveur Web. Le principal problème est que les journaux d'accès au serveur Web ne donnent pas beaucoup d'informations sur les résultats de ces requêtes. Si les propriétaires du site ont configuré la journalisation de sécurité client, cela peut évidemment s'avérer beaucoup plus utile. Si vous devez effectuer une recherche dans les journaux d'accès au serveur, voici quelques conseils :

- Envisagez d'analyser les journaux et de les stocker dans un format plus structuré pour faciliter la recherche
- Les cybercriminels essaient souvent de cacher leurs attaques grâce à l'encodage. Parcourez donc rapidement les journaux pour trouver des signes de pourcentage (%) afin de détecter s'il y a des données encodées dans l'URL.
- Recherchez les chaînes associées aux modèles d'attaques. Notez que les scanners de vulnérabilité automatisés analysent constamment et sans discernement l'ensemble d'Internet, vous devriez donc vous attendre à obtenir beaucoup de résultats. Si vous obtenez beaucoup de résultats, essayez d'y détecter des modèles. Les modèles qui apparaissent constamment dans les journaux sont probablement moins intéressants. Les plus intéressants sont les groupes de modèles différents qui partagent une adresse IP, un netblock et/ou un agent utilisateur. Cela est révélateur d'un contact humain sur le site. Quelques modèles utiles à rechercher :
  - Les requêtes avec des crochets (&lt; et >), en particulier la chaîne `<script`.
  - Les requêtes avec des sélecteurs JavaScript comme `onClick`, `onMouseOver`, etc.
  - Les requêtes avec la chaîne `../` à l'intérieur.
  - Les requêtes comprenant des guillemets simples et/ou mots-clés SQL (`select`, `and`, `where`, `update`, `delete`)
  - Les requêtes qui génèrent une réponse anormalement importante pour leur point de terminaison. (Par exemple, un index d'article génère généralement une page Web de 30 k générant une page de 300 k.)

Si vous trouvez une entrée de journal intéressante qui peut indiquer une source de compromission ou d'exploitation de faille, un moyen rapide de la vérifier est d'essayer d'envoyer vous-même une requête similaire. Le parcours d'apprentissage sur l'évaluation de la sécurité des applications Web vous aidera à comprendre ces attaques. Une autre approche consiste à travailler avec le propriétaire du site pour parcourir le code qui traite cette requête et voir s'il pourrait déclencher une vulnérabilité dans le code.

Grâce à un mélange de recherche moins directionnelle à travers les journaux et en essayant de connecter les liens d'une chaîne d'attaque, nous espérons que vous pourrez trouver la source initiale de la compromission. Notez que la plupart des cybercriminels ne font pas beaucoup d'efforts pour cacher leurs traces. Il peut être judicieux et stratégique de commencer par la recherche d'éléments évidents d'abord, puis de rechercher des techniques d'évasion plus intelligentes si cela s'avère infructueux. Par exemple, si vous trouvez des requêtes HTTP provenant du cybercriminel, la recherche de plusieurs requêtes provenant de la même adresse IP et/ou du même agent utilisateur est susceptible de réussir.

### Suivre les traces du cybercriminel

Une fois que vous avez trouvé la compromission initiale, l'étape suivante évidente consiste à suivre le cybercriminel pour voir ce qu'il a fait. Les objectifs de ce processus sont de déterminer quelles informations le cybercriminel a probablement compromises et de vous préparer à l'expulser. Le processus de traçage du cybercriminel est similaire, mais plus facile que de tracer leurs pas rétroactivement. Assurez-vous de rechercher des artefacts sur le disque et leurs métadonnées, en plus des journaux. La comparaison des fichiers sur le serveur Web avec ce qui se trouve dans le référentiel de code source peut être utile à cet égard. Gardez également à l'esprit que les cybercriminels tenteront fréquemment d'étendre leur accès à d'autres serveurs. Faites donc preuve de vigilance aux tentatives de mouvement horizontal. Enfin, assurez-vous de rechercher des mécanismes de persistance tels que les modifications apportées aux fichiers cron et autres.

### Expulser le cybercriminel

Une fois que vous avez identifié les systèmes auxquels le cybercriminel a accès (par exemple, via des exploitations de failles, des portes dérobées, etc.), vous pouvez essayer de couper son accès. C'est quelque chose que vous devriez essayer de faire rapidement. Vous devriez corriger les vulnérabilités et supprimer les portes dérobées dont vous avez connaissance. Notez également que la plupart des cybercriminels, en particulier les acteurs issus des États-nations, travaillent selon un calendrier régulier. Surtout si le cybercriminel ignore qu'il a été détecté, il est préférable de l'expulser pendant qu'il dort.

Le moyen idéal d'expulser le cybercriminel est de détruire tous les serveurs auxquels il aurait pu accéder et de les reconstruire à partir de zéro. Cela, bien sûr, nécessite d'avoir une version propre de la source du site et des sauvegardes fiables des données du site (par exemple, des bases de données). Si cela s'avère impossible, essayez de reconstruire autant que possible, plutôt que d'essayer de retirer chirurgicalement l'accès du cybercriminel.

Dans le pire des cas, si l'infrastructure du site est complètement dépassée, ou s'il semble que le cybercriminel est sur le point d'obtenir un niveau d'accès dévastateur, il peut être judicieux de simplement désactiver les serveurs et de remplacer le site par une page statique.

### Récupération après un piratage

Si vous pensez que le cybercriminel a été expulsé, dites-vous que vous avez peut-être tort. Même si le cybercriminel a été expulsé, il cherchera probablement un autre moyen d'entrer. Il est important de rechercher activement les attaques. En outre, si le cybercriminel a exploité une vulnérabilité du site Web pour entrer, il y a probablement d'autres vulnérabilités exploitables sur le site. Il peut être judicieux d'effectuer une évaluation de sécurité du site. Pour en savoir plus, consultez le parcours d'apprentissage sur l'évaluation de la sécurité des applications Web. Il peut également s'avérer judicieux d'effectuer les processus de renforcement du site décrits dans le sous-thème 1 de ce parcours d'apprentissage. Enfin, vous avez probablement identifié des problèmes liés au site, à l'infrastructure, à la journalisation, etc. Le moment est peut-être venu de dresser un plan pour régler ces problèmes.

Si les données de l'utilisateur ont été compromises, le propriétaire du site peut être légalement et/ou moralement tenu de divulguer la violation. Cette gestion dépasse la portée de ce parcours d'apprentissage, mais [voici un article permettant d'en savoir plus](https://discernibleinc.com/blog/-mailbag-reader-question-truthful-communication-legal-exposure).

## Exercice pratique

Offre une collection d'exercices qui permettent au participant d'utiliser les outils et de pratiquer les compétences décrites ci-dessus. Le cas échéant, cette section renvoie également à des exemples de logiciels malveillants ou de contenus malveillants avec lesquels le participant peut interagir tout en pratiquant la compétence.

- Effectuez l'[analyse des journaux : compromission de WordPress](https://blueteamlabs.online/home/challenge/log-analysis-compromised-wordpress-ce000f5b59) dans Blue Team Labs Online (compte gratuit requis). Si vous rencontrez des difficultés, un [article](https://cyberjunnkie.medium.com/log-analysis-wordpress-incidentresponse-blueteamlabsonline-fdf211899782) est disponible.
- Complétez le [défi WebStrike Blue Team](https://cyberdefenders.org/blueteam-ctf-challenges/149#nav-overview) sur CyberDefenders (compte gratuit requis). Bien que ce défi implique l'utilisation de fichiers PCAP au lieu de journaux Web, les principes sont les mêmes.

### Contrôle de compétence

De manière indépendante (ou avec un mentor), participez au défi [Tomcat Takeover Blue Team](https://cyberdefenders.org/blueteam-ctf-challenges/135#nav-overview) de CyberDefenders (compte gratuit requis). Bien que ce défi implique l'utilisation de fichiers PCAP au lieu de journaux Web, il représente un scénario d'attaque de bout en bout.

## Ressources d'apprentissage

{{% resource title="L'éruption d'attaques de la chaîne d'approvisionnement contre les solutions open source s'aggrave" description="Un regard sur les attaques de la chaîne d'approvisionnement contre les logiciels open source, dans lesquelles les cybercriminels compromettent les dépendances logicielles" languages="Anglais" cost="Gratuit" url="https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/" %}}
{{% resource title="Comment gérez-vous et conciliez-vous les communications authentiques au sujet d'un incident ou d'une violation tout en atténuant l'exposition légale ?" description="Un bref guide, rédigé par un intervenant plutôt que par un avocat, sur les diverses préoccupations (juridiques, éthiques ou autres) que pourraient avoir les protecteurs numériques lorsqu'ils divulguent des violations et sur la façon de les gérer." languages="Anglais" cost="Gratuit" url="https://discernibleinc.com/blog/-mailbag-reader-question-truthful-communication-legal-exposure" %}}