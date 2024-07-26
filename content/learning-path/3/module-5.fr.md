+++
style = "module"
weight = 5
title = "Création et partage d'IoC"
description = "Nous examinons comment créer et partager des Indicateurs de Compromission (IoC) et informer les autres membres de la communauté sur les logiciels malveillants que vous avez trouvés ou analysés."
+++

## Cas d'utilisation

Une fois que vous avez analysé un logiciel malveillant, vous pouvez aider la communauté (ainsi que vous-même et le reste du monde) en partageant vos résultats. Les nouveaux logiciels malveillants sont relativement rares et, une fois qu'ils sont utilisés, ils ont tendance à être largement réutilisés. En partageant vos conclusions, vous pouvez aider tout le monde de plusieurs façons :

- Si un membre de la communauté a été ciblé par un auteur de menaces, il est fort possible que celui-ci cible d'autres membres de la communauté. En partageant vos découvertes, vous pouvez contribuer à sensibiliser et, espérons-le, à aider les défenseurs du monde numérique à prévenir ou à atténuer d'autres attaques.
- L'analyse d'un nouveau logiciel malveillant est une réalisation significative. Vous devriez en tirer de la fierté et recevoir des récompenses pour vos efforts. En partageant votre processus et vos conclusions, vous êtes plus susceptible d'être reconnu(e) pour votre expertise, ce qui augmentera vos possibilités d'obtenir des postes intéressants et des collaborations dans le domaine.
- Enfin, en créant et en partageant des IoC, vous pouvez contribuer à la détection automatique du logiciel malveillant en question. Si les fabricants de logiciels de détection et de prévention intègrent ces IoC dans leurs bases de données, le logiciel malveillant devient beaucoup moins utile pour les acteurs de la menace, en améliorant ainsi la sécurité des utilisateurs partout dans le monde.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre les différents types d'IoC et comment les partager
- Comprendre les règles YARA et Snort
- Créer et partager un bref rapport sur les logiciels malveillants trouvés

---
## Section Principale

### Types d'IoC

Nous pouvons décomposer largement les IoC en classes lisibles par l'humain et lisibles par machine. Les IoC lisibles par machine peuvent être tout ce qu'un ordinateur pourrait utiliser pour détecter les logiciels malveillants, et il existe de nombreux formats qui tentent de représenter en détail la complexité du comportement des logiciels malveillants. Cependant, il existe plusieurs formats simples et faciles à créer et à utiliser qui sont très populaires :

- Hachages MD5 ou SHA des fichiers malveillants
- Règles YARA identifiant les fichiers malveillants. Les règles YARA identifient des séquences ou des chaînes binaires spécifiques dans un fichier
- Spécifications du serveur (adresses IP ou noms d'hôtes, avec ou sans numéros de port, URL, etc.) pour identifier le trafic réseau des logiciels malveillants
- Règles Snort pour identifier le trafic réseau des logiciels malveillants

Les hachages de fichiers et les spécifications du serveur sont les plus simples à créer et à utiliser. Cependant, la complexité supplémentaire des règles YARA ou Snort est parfois nécessaire pour identifier les logiciels malveillants. Par exemple, un logiciel malveillant peut communiquer avec son serveur C&C sur n'importe quel hôte et port, mais envoie un message spécifique au serveur. Dans une telle situation, vous avez besoin d'un outil tel qu'une règle Snort. De même, un fichier malveillant peut contenir un contenu différent à chaque infection, mais contient toujours une chaîne unique spécifique. Dans une telle situation, vous avez besoin d'un outil tel qu'une règle YARA.

Les IoC lisibles par l'homme sont des descriptions de choses que le logiciel malveillant effectue, qui sont utiles pour les personnes qui enquêtent sur une possibilité de compromission, mais moins utiles pour les ordinateurs. Ces IoC prennent la forme de descriptions narratives des activités du logiciel malveillant. Ils ont l'avantage d'être généralement plus faciles à créer et à comprendre, et peuvent être transformés en IoC lisibles par machine pour une variété de systèmes de détection.

Un bon rapport d'analyse de logiciels malveillants contient généralement une description lisible par l'humain du logiciel malveillant et de ses capacités, ainsi que quelques IoC lisibles par machine dans une annexe. Cela garantit que le rapport est utile au public le plus large.

### Création d'IoC

Un bon IoC minimisera à la fois les faux positifs et les faux négatifs. Surtout que les logiciels malveillants sont rares sur la plupart des systèmes, la détection de fichiers inoffensifs comme étant malveillants (faux positifs) peut créer un faux sentiment de risque et conduire à la suppression de fichiers légitimes. De même, un IoC qui ne parvient pas à détecter une partie importante d'un logiciel malveillant (faux négatifs) peut s'avérer dangereux et procurer aux défenseurs un faux sentiment de sécurité.

Dans cette optique, passons en revue certains des formats simples d'IoC courants.

#### Hachages des fichiers

Les hachages de fichiers sont parmi les IoC les plus simples. Vous calculez un [hachage cryptographique](https://www.sentinelone.com/cybersecurity-101/hashing/) (ou deux) d'un fichier qui est exclusif au logiciel malveillant, et c'est tout. En règle générale, les hachages MD5 et SHA256 sont fournis. Bien qu'il existe de nombreuses faiblesses avec MD5, elles ne sont généralement pas significatives dans le contexte des IoC. Les principaux inconvénients des hachages de fichiers reposent sur le fait que toute modification du fichier permettra aux logiciels malveillants de contourner la détection basée sur l'IoC. Il est futile dans la plupart des cas de simplement ajouter un octet au fichier, pour provoquer un hachage complètement différent. Cependant, les hachages de fichiers continuent d'être étonnamment efficaces pour détecter les logiciels malveillants.

#### Règles YARA

Les règles YARA constituent une étape supplémentaire dans la complexité des hachages de fichiers. Les règles YARA regroupent des informations sur le logiciel malveillant, une liste de séquences binaires ou de chaînes dans le fichier et des règles sur les chaînes/séquences qui doivent se trouver dans le fichier (par ex., chaîne 1 ou chaîne 2, et aussi chaîne 3). YARA maintient un bon équilibre entre simplicité et flexibilité. Pour obtenir plus d'informations sur YARA, consultez [le site Web officiel](https://virustotal.github.io/yara/), et aussi [cet article de blog en passant par la création de règles YARA pour un fichier de logiciels malveillants](https://medium.com/@laroshkhanpk/threat-hunting-101-hunting-with-yara-rules-82aff0898674).

Il convient de garder à l'esprit, lorsque vous travaillez avec YARA, que vous devez vous assurer que votre règle est exempte de faux positifs. Par exemple, une règle correspondant à « Ce programme ne peut pas être exécuté en mode DOS » correspondrait à tous les exécutables d'un système Windows. Après avoir créé vos règles YARA pour certains logiciels malveillants, il peut être judicieux de les exécuter dans quelques systèmes (espérons-le) non infectés pour vous assurer qu'ils n'identifient pas les fichiers non malveillants. Il existe des outils permettant de créer des règles YARA, par exemple [yarGen](https://github.com/Neo23x0/yarGen) analysera un fichier de logiciel malveillant et créera un point de départ pour une règle YARA qui n'inclura pas de chaînes connues. Assurez-vous de lire le fichier README et les articles de blog joints avant d'utiliser l'outil.

#### Identifiants de serveur

Souvent, les logiciels malveillants contactent un serveur de commande et de contrôle à distance pour recevoir des instructions, télécharger les étapes ultérieures du logiciel malveillant, etc. S'il est possible de prédire quels serveurs le logiciel malveillant contactera (p. ex., il est codé en binaire), il est alors possible de créer des IoC qui identifient le trafic réseau malveillant. Voici quelques exemples :

- L'adresse IP d'un serveur ou de certains serveurs
- Un ou plusieurs noms d'hôtes de serveur
- Numéros de port utilisés par le logiciel malveillant lors de la connexion au serveur (huit par lui-même ou en conjonction avec des adresses IP ou des noms d'hôtes)
- URL ou fragments d'URL demandés par le logiciel malveillant

Les identifiants de serveur sont similaires aux hachages de fichiers en ce sens qu'ils sont assez simples, mais également fragiles. Cependant, au même titre que les hachages de fichiers, ils sont également étonnamment efficaces.

#### Règles Snort

Si les identifiants de serveur sont comme des hachages de fichiers pour le trafic réseau, alors les règles Snort sont comme les règles YARA pour le trafic. Snort est un système de détection d'intrusion open source qui dispose d'un moteur de règles mature et largement utilisé. Les règles Snort sont plus compliquées que les règles YARA, mais sont toujours assez gérables. La [documentation officielle](https://docs.snort.org/start/rules) peut être assez intimidante, mais la plupart des règles sont assez simples. [Cette page](https://www.sapphire.net/security/snort-rules-examples/) décrit la structure des règles Snort et fournit quelques exemples simples. Enfin, [voici un ensemble de règles Snort](https://github.com/abhinavbom/Snort-Rules/blob/master/malware.rules) pour certains vrais logiciels malveillants.

Comme avec les règles YARA, il peut être assez facile de créer accidentellement de faux positifs. Envisagez de capturer quelques jours de votre trafic réseau et d'exécuter toutes les règles Snort que vous créez par rapport à ces captures de paquets.

### Choisir les IoC appropriés

Lorsque vous envisagez de créer des IoC, vous devez considérer ce qui est intrinsèque au logiciel malveillant en général, par rapport à ce qui est spécifique à l'échantillon que vous avez analysé. Voici quelques exemples :

- Si l'étape 1 du logiciel malveillant est un PDF qui contient du contenu personnalisé pour la victime, mais aussi une exploitation de faille qui télécharge et installe une deuxième étape, il serait inapproprié d'utiliser un hachage de fichier du PDF. Au lieu de cela, vous pourriez créer une règle YARA qui identifie le code d'exploitation dans le PDF.
- Si un logiciel malveillant réutilise des parties de certains logiciels malveillants existants bien connus, mais possède également un nouveau composant, vous devez créer vos IoC, y compris le nouveau composant. Cela évitera les erreurs de classification.
- Si le logiciel malveillant est livré avec un paramètre de configuration pour le serveur auquel il se connecte, il serait inapproprié de créer un IoC à l'aide de ce serveur, car différentes campagnes utiliseront probablement des serveurs différents.
- Si le serveur C&C du logiciel malveillant est identifié par le nom d'hôte dans le logiciel malveillant, la création d'une règle de détection réseau basée sur une adresse IP entraînerait à la fois des faux positifs et des faux négatifs. Au lieu de cela, la règle réseau doit utiliser le nom d'hôte.

### Créer un rapport

À ce stade, vous devez savoir comment vous avez acquis le logiciel malveillant, ce qu'il fait et comment le détecter. [Cet article](https://zeltser.com/malware-analysis-report/) détaille certaines des choses qu'un excellent rapport d'analyse de logiciels malveillants devrait contenir, et [cet article de blog par un instructeur SANS](https://www.sans.org/blog/writing-malware-reports/) fournit quelques conseils pour le rapport global. En outre, il est bon d'expliquer votre processus de pensée dans des sections narratives. Cela peut être à la fois éducatif pour les gens qui commencent à analyser les logiciels malveillants, et également aider les enquêteurs de logiciels malveillants plus expérimentés à vous aider au cas où vous auriez manqué quelque chose.

L'attribution de logiciels malveillants à un acteur de menace particulier est une activité populaire parmi les analystes de logiciels malveillants. Cependant, il est difficile d'obtenir des résultats précis. Ne vous obligez pas à effectuer l'attribution si vous avez des doutes, la chose la plus importante est la publication des IoC.

Dans le parcours d'apprentissage Détection, enquête et suivi des infrastructures malveillantes, nous avons également [créé une section sur les articles et les rapports](https://docs.google.com/document/d/1Qhka7uQYCBye-EQRQrrETo-ptik2yDAGDZg5DrncYF4/edit) qui pourraient être utiles.

Les articles de blog publics suivants pourraient vous inspirer pour vos propres rapports. Tous utilisent des tons et des formats différents, mais tous contiennent également des IoC.

- [Les IoC d'Amnesty Tech pour les nouveaux logiciels malveillants Android](https://github.com/AmnestyTech/investigations/tree/master/2023-03-29_android_campaign)
- [Article de Citizen Lab sur les exploitations de failles de QuaDream](https://citizenlab.ca/2023/04/spyware-vendor-quadream-exploits-victims-customers/)
- [Rapport d'enquête de Human Rights Watch sur une campagne d'hameçonnage](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians)
- [L'enquête de Bellingcat sur une campagne d'hameçonnage ciblant les utilisateurs de ProtonMail](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/)
- [Rapport de l'EFF sur une nouvelle version de Bandook](https://www.eff.org/deeplinks/2023/02/uncle-sow-dark-caracal-latin-america)
- [Analyse du rançongiciel MirageFox](https://github.com/saasthavasan/Malware-Analysis-Reports/tree/master/MirageFox/Report)
- [Analyse du voleur de données Windows appelé Krown](https://github.com/albertzsigovits/malware-notes/tree/master/Stealer-Windows-Krown)

### Partage du rapport

Une fois que vous avez créé un rapport, vous pouvez en faire plusieurs choses :

- Le partager avec vos collègues défenseurs numériques de la société civile
- Le publier dans le domaine public
- Partager des échantillons du logiciel malveillant avec des sociétés de lutte contre les logiciels malveillants

Vous pouvez faire tout, partie ou même aucune de ces choses. Si vous travaillez avec un client dont l'appareil a été compromis, vous devez bien sûr vous assurer qu'il est d'accord avec le partage du rapport. Il est préférable d'obtenir son approbation écrite.

Si vous êtes membre d'une organisation comme [CiviCERT](https://www.civicert.org/), c'est un excellent endroit pour partager vos conclusions. Les autres membres pourront ainsi lire votre rapport, fournir des commentaires et prendre des mesures.

Vous pouvez également publier vos résultats sur votre blog ou sur un autre site comme GitHub. Cela demande peu d'efforts, mais peut aussi être limité dans son impact. Cependant, votre rapport peut s'avérer précieux pour ceux qui cherchent sur Internet le hachage SHA d'un fichier ou d'un identifiant de serveur.

Enfin, si vous avez des échantillons de logiciels malveillants, vous pouvez les soumettre aux principales sociétés d'antivirus. Il est peu probable qu'elles lisent le rapport, mais elles pourront analyser le logiciel malveillant et inclure des signatures dans leurs produits. Pour obtenir plus d'informations sur la soumission de logiciels malveillants, [cette page fournit des liens vers les informations de soumission de diverses entreprises](https://www.thewindowsclub.com/malware-submission-where-to-submit-malware-and-suspicious-files-to-microsoft).

## Exercice pratique

Répondez à la question 7.3 et complétez l'exercice 7.3 du [guide d'intervention sur le terrain](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).

## Contrôle de compétence

Discutez avec votre mentor ou votre pair de la façon dont vous traiteriez chacune de ces adresses IP dans vos rapports sur les logiciels malveillants. Certains d'entre eux font-ils de meilleures IoC que d'autres ?

- Une adresse IP sur Amazon Web Services hébergeant des logiciels malveillants
- Une adresse IP d'un nœud de sortie Tor
- Une adresse IP résidentielle sondant un site Web à la recherche de vulnérabilités
- Une adresse IP sur un réseau de diffusion de contenu (CDN), tel que Cloudflare

## Ressources d'apprentissage

{{% resource title="Qu'est-ce que le hachage et comment fonctionne-t-il ?" description="Une brève introduction au sujet des hachages de fichiers et du rôle qu'ils jouent dans la détection et l'investigation des logiciels malveillants" languages="Anglais" cost="Gratuit" url="https://www.sentinelone.com/cybersecurity-101/hashing/" %}}
{{% resource title="YARA" description="La page d'accueil officielle de l'outil YARA, qui est utilisé pour la correspondance des modèles, principalement lors de la recherche de logiciels malveillants" languages="Anglais" cost="Gratuit" url="https://virustotal.github.io/yara/" %}}
{{% resource title="Détection des menaces 101 avec les règles Yara" description="Cet article explique comment créer et utiliser les règles YARA pour détecter les fichiers malveillants." languages="Anglais" cost="Gratuit" url="https://medium.com/@laroshkhanpk/threat-hunting-101-hunting-with-yara-rules-82aff0898674" %}}
{{% resource title="yarGen" description="Un outil qui peut automatiser la génération de chaînes pour les règles YARA" languages="Anglais" cost="Gratuit" url="https://github.com/Neo23x0/yarGen" %}}
{{% resource title="Règles Snort" description="La meilleure façon d'envisager Snort est de le décrire comme étant similaire à YARA, mais pour les réseaux, en utilisant des modèles pour détecter et arrêter les intrusions. Cet article introduit quelques règles de base à ce sujet." languages="Anglais" cost="Gratuit" url="https://docs.snort.org/start/rules" %}}
{{% resource title="Exemples et utilisation des règles Snort" description="Quelques bonnes règles pour ceux qui débutent avec Snort" languages="Anglais" cost="Gratuit" url="https://www.sapphire.net/security/snort-rules-examples/" %}}
{{% resource title="Éléments à inclure dans un rapport d'analyse de logiciel malveillant" description="Une liste des principales choses à faire que vous devez garder à l'esprit et noter lors de la création d'un rapport d'analyse de logiciel malveillant en vue de son partage avec d'autres utilisateurs" languages="Anglais" cost="Gratuit" url="https://zeltser.com/malware-analysis-report/" %}}
{{% resource title="Rédaction de rapports sur les logiciels malveillants" description="Un guide plus ancien (2012), mais toujours très utile par SANS sur les meilleures pratiques lors de la rédaction de rapports sur les logiciels malveillants" languages="Anglais" cost="Gratuit" url="https://www.sans.org/blog/writing-malware-reports/" %}}

