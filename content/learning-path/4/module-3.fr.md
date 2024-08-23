+++
style = "module"
weight = 3
title = "Authentification"
description = "Dans tout site web avec des connexions utilisateur, il est important que le site protège les comptes utilisateurs contre tout accès non autorisé. Nous décrivons les domaines les plus courants d'authentification où apparaissent des failles dans les applications web."
+++

## Cas d'utilisation

Dans tout site Web qui possède des identifiants d'utilisateur, il est important que le site protège les comptes d'utilisateur contre tout accès non autorisé, et que les informations d'identification du compte elles-mêmes soient protégées. Ce sous-thème décrit les domaines les plus courants de l'authentification où les failles des applications Web apparaissent.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre les types courants de vulnérabilités d'authentification
- Comprendre les impacts potentiels de ces types de vulnérabilités
- Comprendre les mécanismes par lesquels ces vulnérabilités fonctionnent
- Comprendre dans les grandes lignes comment ces vulnérabilités peuvent être évitées

---
## Section Principale

L'authentification est le processus par lequel un utilisateur d'un système prouve qu'il est qui il prétend être. C'est le fondement sur lequel repose le contrôle des accès. En règle générale, un utilisateur fournit une information qui l'identifie (nom d'utilisateur, adresse électronique, numéro de téléphone, etc.) et une information secrète qui valide cette identité (généralement un mot de passe ou une phrase d'accès, bien que des méthodes alternatives ou supplémentaires telles que les clés de sécurité, WebAuthn et Passkeys gagnent en popularité). Ce sous-thème couvrira quelques classes de vulnérabilités courantes et à fort impact dans les applications Web.

### Stockage non sécurisé des mots de passe

Si les utilisateurs doivent se connecter à un site avec un nom d'utilisateur et un mot de passe, le site doit être en mesure de valider que l'utilisateur a saisi le mot de passe correct. Les mots de passe doivent en outre être stockés en toute sécurité dans la base de données d'authentification de l'application, car cette base de données peut être compromise en raison d'une injection SQL, de sauvegardes perdues ou même de membres de l'organisation malveillants ou compromis présents sur le site. Il existe plusieurs approches pour stocker les mots de passe :

- **Texte brut**  \
    C'est évidemment la pire façon de stocker les mots de passe. Cela signifie stocker les caractères exacts que l'utilisateur a saisis lors de la configuration du mot de passe. Si la base de données de mots de passe est compromise, les cybercriminels auront un accès complet à tous les mots de passe des utilisateurs. Non seulement ces mots de passe peuvent être utilisés pour accéder au site Web lui-même, mais ils peuvent être utilisés dans les [attaques de réutilisation de mots de passe](https://fr.wikipedia.org/wiki/Credential_stuffing) contre d'autres sites ou applications.
- **Chiffré**  \
    La solution évidente au stockage de mots de passe en texte brut consiste à chiffrer les mots de passe. Cependant, cela n'offre qu'une protection modeste contre de nombreuses menaces. L'application elle-même doit connaître la clé de chiffrement, et celle-ci doit donc être stockée quelque part. Les initiés malveillants ou compromis ayant accès à la base de données auront presque certainement accès à la clé de chiffrement. En outre, il existe diverses vulnérabilités communes des serveurs Web qui pourraient permettre aux cybercriminels distants d'accéder à la clé. Une fois que quelqu'un obtient la clé de chiffrement, il sera en mesure de déchiffrer les mots de passe.
- **Hachage**  \
    Il s'avère que le serveur Web n'a jamais besoin de récupérer un mot de passe utilisateur, il lui suffit de savoir si le mot de passe que l'utilisateur a saisi est le même que le mot de passe réel de l'utilisateur. Il existe une classe d'algorithmes appelés [hachages cryptographiques](https://fr.wikipedia.org/wiki/Fonction_de_hachage_cryptographique) qui effectuent une transformation unidirectionnelle des données. Ces algorithmes incluent par exemple MD5 et SHA. Il est effectivement impossible, compte tenu du hachage, de déterminer quelles données source ont généré le hachage. Malheureusement, les mots de passe ont tendance à être assez courts et les fonctions de hachage cryptographique assez rapides. Pour une fonction de hachage donnée, il est possible de hacher chaque mot de passe possible d'une longueur donnée et de stocker le mot de passe et le hachage résultant. Ensuite, étant donné un hachage de mot de passe particulier, il est possible de simplement rechercher le mot de passe qui a généré ce hachage. Au milieu des années 2000, il était possible de calculer, de stocker et de distribuer ces bases de données, appelées rainbow table ou [tables arc-en-ciel](https://fr.wikipedia.org/wiki/Rainbow_table), pour un usage général.  \
    Une solution au problème des tables arc-en-ciel consiste à ajouter un peu de données (appelées [salage](https://fr.wikipedia.org/wiki/Salage_(cryptographie))) au mot de passe avant de le hacher. Ces données n'ont pas besoin d'être secrètes ou particulièrement complexes, elles doivent juste être différentes pour chaque utilisateur. Une approche courante consiste à hacher le nom d'utilisateur et le mot de passe ensemble. Une table arc-en-ciel pour les hachages de mots de passe Microsoft Windows NTLM jusqu'à 9 caractères prend jusqu'à 6,7 To. Si ces hachages de mots de passe étaient salés avec ne serait-ce que 5 caractères alphanumériques, cette table arc-en-ciel passerait à plus de 6 000 000 000 To. Le problème avec cette approche est que les hachages sont encore assez rapides et les cartes graphiques modernes sont essentiellement des superordinateurs massivement parallèles. Une Nvidia RTX 4090 (une carte vidéo haut de gamme sortie en 2022) peut calculer près de 400 000 000 000 de hachages SHA salés par seconde, et permet aux particuliers de déchiffrer la plupart des mots de passe en quelques minutes ou heures.

**Algorithmes spéciaux de stockage des mots de passe**\
Le problème avec les hachages cryptographiques est qu'ils sont conçus pour être rapides et efficaces. Ils servent surtout à vérifier que les données n'ont pas été falsifiées. Ce problème avait été résolu dès 1976, avec une [fonction de chiffrement Unix](https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html) qui salait et chiffrait le mot de passe plusieurs fois pour ralentir le forçage brut. Sans surprise, cet algorithme ne résistera pas aux ressources informatiques modernes, mais l'idée générale est encore utilisée aujourd'hui avec des algorithmes spéciaux conçus pour stocker des dérivés de mots de passe. Ces algorithmes sont conçus pour prendre des ressources réglables du processeur et de la mémoire, pour obtenir un bon compromis entre la performance et la résistance à la force brute. Les bons algorithmes de gestion des mots de passe comprennent (par ordre décroissant de préférence) [scrypt, argon2, bcrypt, and PBKDF2](https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/). Comme mesure de défense en profondeur, il est recommandé de combiner le mot de passe de l'utilisateur avec un code secret qui n'est pas stocké dans la base de données elle-même. Par exemple, le code secret peut être codé en dur dans l'application elle-même. Cela empêchera probablement la récupération du mot de passe si seule la base de données des mots de passe est perdue.

#### Essayez par vous-même

Connectez-vous à votre DVWA et assurez-vous que le niveau de sécurité est faible. Accédez à la section Injection SQL et saisissez ce qui suit dans la zone de texte : \
`​​999` union all select user, password from users where '1'='1

Cela retournera les noms et prénoms de tous les utilisateurs qui ont un userid de 999 (il n'y en a aucun), ainsi que les noms d'utilisateur et les hachages de mots de passe de tous les utilisateurs. Utilisez un site de recherche de hachage en ligne (p. ex., <https://www.whatsmyip.org/hash-lookup/>) pour rechercher le hachage du mot de passe de l'utilisateur administrateur. Quel type de hachage est utilisé pour stocker les mots de passe des utilisateurs DVWA ? Quel est le mot de passe de l'utilisateur nommé « 1337 » ?

Pour obtenir plus d'informations sur la gestion des mots de passe, consultez [l'aide-mémoire sur le stockage des mots de passe de l'OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

### Réinitialisation du mot de passe

En général, lorsqu'un utilisateur d'un site Web oublie son mot de passe, le site lui fournit des moyens automatisés de vérifier son identité afin de définir un nouveau mot de passe. Idéalement, ces méthodes sont à peu près aussi sécurisées que le processus standard de vérification des mots de passe dans lequel l'utilisateur saisit un mot de passe secret dans une page Web, mais sont beaucoup moins pratiques.

La plupart des sites supposent que le compte de messagerie de l'utilisateur est raisonnablement sécurisé et envoient à l'utilisateur un lien qui lui permettra de réinitialiser son mot de passe. Cette hypothèse est probablement correcte pour la grande majorité des comptes utilisateurs sur la grande majorité des sites Web. Les liens de réinitialisation de mot de passe (et les liens « Magic Login ») devraient avoir les propriétés suivantes afin de minimiser le risque pour l'utilisateur :

- Les liens doivent être dirigés vers la version chiffrée TLS du site. (Notez qu'il n'y a aucun moyen de garantir que le courrier électronique lui-même est chiffré dans le cadre de l'envoi, mais le trafic réseau de l'utilisateur final, tel qu'un utilisateur accédant à une page Web, est plus susceptible d'être intercepté que le trafic entre serveurs, tel que les e-mails envoyés d'un serveur à un autre.)
- Le lien doit avoir un jeton d'accès qui contient environ 128 bits de données générées aléatoirement à partir d'un générateur de nombres aléatoires à chiffrement complexe. Notez que 128 bits de données prendront 172 caractères ou plus lorsqu'ils seront encodés dans une URL. Il n'y a pas d'avantage réel à utiliser plus de 128 bits de données, et l'utilisation de 128 bits signifie qu'aucune protection supplémentaire contre la force brute n'est requise.
- Le jeton d'accès doit être limité dans le temps (p. ex., expiration après une heure) et à usage unique. La nature à usage unique limite non seulement la capacité d'un cybercriminel à modifier le mot de passe d'un utilisateur, mais peut également alerter l'utilisateur dans le cas où un cybercriminel parvient à obtenir le jeton et à modifier le mot de passe de l'utilisateur.
- Le jeton lui-même doit être lié au compte de l'utilisateur, afin d'empêcher les utilisateurs d'utiliser le jeton pour modifier le mot de passe d'un autre utilisateur.

Les liens de réinitialisation peuvent également être envoyés par SMS. Les SMS sont moins susceptibles d'être interceptés que les e-mails par des pirates informatiques normaux, mais sont vulnérables à l'interception par les gouvernements du pays où se trouve l'utilisateur. Si un jeton plus court (p. ex., un code PIN) est envoyé par SMS, il est important d'avoir une forte protection contre la force brute sur la page qui accepte le code PIN, p. ex., une durée de vie du code PIN de 10 minutes et une limite de taux. Notez également qu'il existe des [attaques par déni de service simples et rentables](https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/) qui impliquent qu'un serveur envoie des SMS à un numéro de téléphone choisi par un cybercriminel. En effectuant un grand nombre de réinitialisations de mot de passe SMS, un cybercriminel peut encourir des coûts élevés pour l'opérateur du site Web, ce qui peut lui rapporter de l'argent.

Une autre méthode de réinitialisation de mot de passe consiste à poser à l'utilisateur des questions dont les réponses sont connues par le site Web et l'utilisateur, et ignorées par le cybercriminel potentiel. Celles-ci ont tendance à être extrêmement faibles, ou devenir des méthodes extrêmement fortes de vérification de l'identité de l'utilisateur. Les « questions secrètes » habituelles comme demander où l'utilisateur est né, le nom de jeune fille de sa mère, la marque de sa première voiture, etc. sont assez faibles. Tout d'abord, un cybercriminel peut être en mesure de trouver facilement les réponses à ces questions. Deuxièmement, la plupart d'entre elles sont impossibles à modifier, donc si un cybercriminel découvre une réponse (même en compromettant un autre site Web), il pourra l'utiliser encore et encore. Enfin, la plupart de ces questions n'ont qu'une poignée de réponses communes. Par exemple, si vous demandez à un utilisateur coréen le nom de jeune fille de sa mère, une proportion importante des réponses sera « Kim » ou « Lee ». L'autre type de question secrète, plus sécurisé, implique des communications hors ligne entre le site Web et l'utilisateur. Par exemple, les factures de services publics et les relevés bancaires. Pour que l'utilisateur réinitialise son mot de passe, il saisira, par exemple, les montants des 3e et 5e transactions de son relevé bancaire. L'utilisateur ne serait autorisé qu'à quelques essais, puis aurait besoin d'effectuer un processus de réinitialisation encore moins pratique avec le service d'assistance à la clientèle. Ce processus de réinitialisation peut être très sécurisé, bien qu'à l'époque des relevés en ligne, il soit probablement moins sécurisé que d'envoyer un jeton par e-mail.

Pour en savoir plus sur la réinitialisation sécurisée des mots de passe, consultez [l'aide-mémoire de l'OWASP sur l'oubli de mot de passe](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html). Pour obtenir une exploration approfondie des vulnérabilités d'authentification et d'autorisation, consultez le parcours d'apprentissage [Évaluation de la sécurité des applications Web](/fr/learning-path/5/).

### Robustesse des identifiants

La plupart des applications Web utilisent des mots de passe pour l'authentification, bien que des techniques telles que WebAuthentication utilisant des clés de sécurité et des sessions d'authentification extrêmement longues combinées à des liens de connexion par e-mail gagnent en popularité. Si un site Web utilise des mots de passe, il est important que ces mots de passe soient forts. Cependant, la définition d'un mot de passe « fort » a changé au fil des ans. Les cybercriminels utilisent trois méthodes principales pour attaquer directement les mots de passe des utilisateurs :

1. **Deviner en ligne en exploitant la réutilisation du mot de passe** Dans cette attaque, le cybercriminel utilise des mots de passe connus associés à l'utilisateur et tente simplement ces mots de passe dans le formulaire de connexion du site. Étant donné que de nombreuses personnes utilisent les mêmes mots de passe sur plusieurs sites Web, cette attaque peut être extrêmement efficace. Les noms d'utilisateur et les mots de passe des sites compromis sont largement disponibles sur le Web public, le Dark Web et à la vente sur des sites Web privés. Les cybercriminels peuvent simplement entrer tous les mots de passe connus pour un utilisateur donné. Si le cybercriminel cible un petit nombre d'utilisateurs, cette attaque ne nécessite même pas d'automatisation.
2. **Force brute en ligne via le bourrage d'informations d'identification** Le « bourrage d'informations d'identification » est un type d'attaque où un client logiciel (soit un navigateur Web scripté via un outil comme [Selenium](https://www.selenium.dev/) ou un script personnalisé) tentera automatiquement de se connecter au site cible. En outre, ces attaques peuvent utiliser un ensemble distribué de serveurs proxy pour sembler provenir d'une variété d'ordinateurs différents. Le taux de ces attaques est généralement limité par la vitesse du serveur Web et la latence du réseau, de sorte que les cybercriminels auront généralement la prudence de choisir uniquement les informations d'identification les plus susceptibles de fonctionner. Par exemple, ils limiteront souvent les noms d'utilisateur à un ensemble ciblé, ou à des noms d'utilisateur connus s'il existe une [vulnérabilité d'énumération de noms d’utilisateur](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account) sur le site. (Notez que dans la plupart des cas, empêcher l'énumération des noms d'utilisateur est une défense en profondeur et ne devrait pas être une priorité élevée pour les applications Web.) En outre, le cybercriminel tentera de prioriser les mots de passe probables, en utilisant des dumps de mots de passe pour essayer de réutiliser ceux-ci et d'autres mots de passe couramment utilisés.
3. **Force brute hors ligne** Si le cybercriminel a réussi à acquérir une copie de la base de données de mots de passe de l'application (p. ex., via une injection SQL), il tentera probablement d'obtenir par force brute les informations d'identification stockées. Selon la façon dont les informations d'identification sont stockées et les capacités matérielles du cybercriminel, il pourra être en mesure d'essayer des centaines de milliards de mots de passe par seconde, ou des centaines. Dans tous les cas, une fois que le cybercriminel aura la base de données de mots de passe, l'application ne pourra pas détecter ou arrêter l'attaque. Les cybercriminels prioriseront généralement les mots de passe probables dans ces attaques, mais s'ils sont très bien financés ou si l'algorithme de stockage des mots de passe est faible, ils pourraient également procéder à l'énumération de tous les mots de passe possibles.

Parmi ces attaques, les attaques en ligne sont beaucoup plus courantes. Idéalement, les applications ne devraient pas être vulnérables aux injections SQL, les utilisateurs ne seraient pas compromis et n'agiraient pas de manière malveillante, et les sauvegardes de base de données ne seraient jamais perdues. Cependant, il serait irresponsable d'ignorer la possibilité d'une attaque hors ligne. Compte tenu de cela, les priorités d'une application Web devraient être (dans l'ordre) :

1. **Empêcher la réutilisation des mots de passe, en particulier avec des mots de passe compromis connus** C'est impossible à effectuer complètement et peut également présenter des problèmes d'interface utilisateur. Cependant, il existe des services tels que ceux de [Have I Been Pwned](https://haveibeenpwned.com/) (en anglais, [les abonnements pour l'utilisation de l'API commencent à 40 USD/an](https://haveibeenpwned.com/API/Key)), [Hold Security](https://holdsecurity.com/solutions/credential-integrity-service/), [SpyCloud](https://spycloud.com/products/consumer-ato-prevention/), etc., qui peuvent vous dire si un nom d'utilisateur et un mot de passe particulier sont apparus dans un dump de mots de passe. Les [compilations de dumps de mots de passe](https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/) peuvent également être téléchargées et vérifiées localement.
2. **Empêcher l'utilisation de mots de passe courants** Les pages qui permettent aux utilisateurs de définir leur mot de passe doivent comparer le mot de passe de l'utilisateur à une liste des mots de passe les plus courants (généralement obtenus à partir de dumps de mots de passe). Certaines de ces listes sont disponibles sur [GitHub](https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials). Notez que les cybercriminels utiliseront les mêmes listes, il est donc peu probable que le simple blocage des 100 ou 1000 mots de passe les plus courants soit très efficace.
3. **S'assurer que les mots de passe ont une complexité suffisante pour résister aux attaques par force brute** Même si un mot de passe comme « w)\*l3 » n'est pas courant, il sera rapidement découvert en cas d'attaque par force brute. Définir une longueur de mot de passe minimale peut contribuer à atténuer les attaques par force brute.

Bien sûr, ces priorités doivent être équilibrées avec les exigences pour l'utilisateur d'utiliser un gestionnaire de mots de passe ou de se souvenir de son mot de passe. En outre, les mots de passe en tant que méthode d'authentification sont assez problématiques. La section suivante couvre l'authentification multifactorielle et les alternatives aux mots de passe.

Pour obtenir plus d'informations sur la complexité du mot de passe, consultez [ce résumé des directives d'authentification NIST du gouvernement des États-Unis](https://blog.netwrix.com/2022/11/14/nist-password-guidelines/).

### Authentification multifactorielle

Comme vous l'avez peut-être deviné dans la section précédente, la sécurité des mots de passe est très difficile. La situation s'aggrave lorsque vous envisagez des attaques d'ingénierie sociale telles que l'hameçonnage.

#### Hameçonnage et attaques connexes

[L'hameçonnage](https://fr.wikipedia.org/wiki/Hame%C3%A7onnage) est une classe d'attaques d'ingénierie sociale que les cybercriminels utilisent pour s'en prendre à des individus. Bien que l'hameçonnage puisse avoir de nombreux objectifs (comme convaincre l'utilisateur d'installer des logiciels malveillants sur son ordinateur ou de transférer de l'argent aux cybercriminels), l'objectif qui nous tient à cœur est de voler les mots de passe des utilisateurs. Bien que l'hameçonnage fasse généralement référence à des attaques lancées par e-mail, des techniques similaires peuvent être utilisées sur divers supports de communication, tels que les SMS, WhatsApp, Signal et même les codes QR.

Dans une campagne typique d'hameçonnage d'informations d'identification, les cybercriminels enverront à leurs victimes des e-mails supposés être envoyés à partir d'un site Web légitime. L'e-mail contiendra un appel à l'action (p. ex., demander un changement de mot de passe ou accuser réception d'une notification) avec un lien vers un site Web contrôlé par le cybercriminel qui présentera une page de connexion d'apparence légitime. Si une victime clique sur le lien, puis saisit son mot de passe sur le site Web, le site envoie son mot de passe au cybercriminel. (Pour en savoir plus sur l'hameçonnage, consultez le parcours d'apprentissage [Détection, enquête et suivi des infrastructures malveillantes](https://docs.google.com/document/d/13if8JvR_TsGxja0Il48NBM-S1LKs29w_R_3LxxiLxS4/edit).)

Les attaques d'hameçonnage sont extrêmement peu coûteuses pour les cybercriminels et sont en général extrêmement efficaces. Une fois que le cybercriminel détient le mot de passe de la victime, il peut se connecter au site Web cible sous son identifiant. Avec de la préparation, le cybercriminel peut utiliser l'automatisation pour effectuer immédiatement des actions sur le compte de la victime, y compris la modification de l'adresse e-mail et du mot de passe de l'utilisateur pour verrouiller la victime hors de son propre compte.

Compte tenu du danger des attaques d'hameçonnage et de l'incapacité totale de l'authentification par mot de passe pour arrêter cette technique, tout système d'authentification multifactorielle doit être évalué par rapport à sa résistance à l’hameçonnage.

#### Aperçu de l'authentification multifactorielle

Traditionnellement, trois types de facteurs peuvent être utilisés pour l'authentification :

- **Quelque chose que vous savez** La forme la plus courante est le mot de passe. C'est une chose que vous (et j'espère seulement vous) savez. Ce facteur est très populaire, car il est très facile de générer et de modifier un mot de passe secret.
- **Quelque chose que vous avez** La forme la plus courante concerne les clés. Ce sont des choses que vous avez et qui sont difficiles à reproduire. Elles sont moins populaires, car elles sont faciles à perdre, difficiles à mettre en œuvre au départ et difficiles à modifier.
- **Quelque chose que vous êtes** La forme la plus connue est l'empreinte digitale, bien que la reconnaissance faciale soit de plus en plus populaire. C'est quelque chose d'intrinsèque à vous. Elles sont étonnamment faciles à « perdre » (p. ex., la perte d'une empreinte digitale à cause d'une brûlure, extrêmement difficiles à modifier intentionnellement, et leur vérification est parfois sujette aux erreurs).

La MFA (authentification multifactorielle) combine deux ou plusieurs de ces facteurs pour renforcer le système d'authentification d'un système. Il existe de nombreux exemples d'authentification multifactorielle dans la vie quotidienne. L'utilisation d'un guichet automatique nécessite quelque chose que vous avez (la carte) et quelque chose que vous connaissez (votre code PIN). De nombreux systèmes de contrôle d'accès aux bâtiments nécessitent un badge pour ouvrir les portes, mais ce badge fait également apparaître le visage du titulaire sur un écran qu'un gardien peut voir, ce qui combine ainsi quelque chose que vous avez (le badge) avec quelque chose que vous êtes (votre visage).

Dans le reste de cette sous-section, nous discuterons d'une variété de méthodes communes de MFA sur le Web.

#### Questions secrètes

Bien qu'il ne s'agisse pas techniquement d'une MFA (elles combinent plusieurs choses que l'utilisateur sait), elles étaient très populaires dans le passé et sont encore utilisées dans de nombreux contextes. L'utilisation de questions secrètes dans le cadre de l'authentification fournit un certain degré de défense contre la réutilisation des mots de passe et les attaques de devinettes de mots de passe. Au-delà de cela, elle offre très peu de protection. Elle est presque inutile contre l'hameçonnage. Le site Web d'un cybercriminel peut simplement tenter de se connecter au site réel, puis poser à l'utilisateur les questions secrètes. De plus, comme indiqué dans la sous-section « Réinitialisation du mot de passe » ci-dessus, les réponses aux questions secrètes peuvent souvent être devinées. Pour ces raisons, les questions secrètes ne sont pas une méthode MFA robuste.

#### Codes par SMS

Une méthode MFA courante consiste à envoyer un code à l'utilisateur lorsqu'il se connecte, puis à exiger ce code pour terminer le processus de connexion. Cela combine quelque chose que l'utilisateur sait (son mot de passe) avec quelque chose qu'il a (le téléphone qui reçoit les messages d'un certain numéro). Malheureusement, les codes SMS sont presque sans valeur contre l'hameçonnage. Lorsque l'utilisateur se connecte au faux site Web contrôlé par le cybercriminel, le faux site se connecte au site Web authentique. Le site authentique Web envoie un message texte à l'utilisateur, qui saisit ensuite le code dans le faux site Web. Le faux site utilise ensuite le code sur le site authentique et se connecte sous l'identifiant de la victime. En outre, les attaques [d'échange de carte SIM](https://en.wikipedia.org/wiki/SIM_swap_scam) peuvent permettre aux cybercriminels de prendre le contrôle du numéro de téléphone d'une victime afin de recevoir les messages SMS qui lui sont destinés. Pour ces raisons, les codes SMS ne sont pas une méthode MFA robuste pour les sites Web sensibles ou importants.

#### TOTP

TOTP signifie Time-based One-Time Password. Pour lancer le système, le serveur et un dispositif contrôlé par l'utilisateur échangent un secret cryptographique (la « graine ») et synchronisent leurs horloges. Ensuite, lorsque l'utilisateur souhaite s'authentifier sur un site Web, l'appareil de l'utilisateur effectue une opération cryptographique sur la graine et l'heure actuelle, en générant un code qui n'est valable que pour quelques secondes ou minutes. Le serveur effectue la même opération et l'utilise pour vérifier le code de l'utilisateur. Dans le passé, le système TOTP le plus courant était RSA SecureIDs, qui était coûteux. Maintenant, la plupart des systèmes TOTP fonctionnent sur des smartphones. Par exemple, Google Authenticator et Authy. Quoi qu'il en soit, la méthode TOTP fonctionne comme quelque chose que vous avez (la graine TOTP) à des fins d'authentification.

Comme les codes SMS, les mots de passe TOTP sont également vulnérables à l’hameçonnage. Le faux site contrôlé par le cybercriminel peut simplement demander à l'utilisateur son code TOTP et l'utiliser pour se connecter au site réel. Pour cette raison, le mot de passe TOTP n'est pas une méthode MFA robuste pour les sites sensibles ou importants. Notez également que si un utilisateur perd ou efface son téléphone, il est peu probable qu'il puisse à nouveau s'authentifier sur le site, car il aura perdu sa graine TOTP.

#### Clés de sécurité

Les clés de sécurité (parfois appelées U2F, FIDO, WebAuthentication, Yubikeys, etc.) sont des dispositifs qui implémentent un [protocole d'authentification cryptographique](https://developers.yubico.com/U2F/Protocol_details/Overview.html). Lorsque vous enregistrez une clé de sécurité avec un site Web, le site et la clé échangent une clé publique. Pour les authentifications ultérieures, le serveur présente un défi signé à l'appareil. L'appareil vérifie la signature du site, puis répond par une réponse signée. Enfin, le serveur vérifie la signature de l'appareil. Cela prouve au serveur que vous êtes en possession de la clé qui a été enregistrée initialement, ce qui en fait quelque chose que vous avez. Traditionnellement, les clés de sécurité étaient des appareils autonomes qui parlaient à un ordinateur ou à un appareil mobile via USB ou NFC, bien que la prise en charge des smartphones et des ordinateurs soit disponible dans certaines configurations.

Contrairement aux autres MFA discutées ici, les clés de sécurité sont résistantes à l’hameçonnage. La clé ici est que le défi signé inclut l'identité du site Web demandant l'authentification. Pour un site valide, cela correspondra à une clé de site existante sur l'appareil. Pour un site similaire contrôlé par un cybercriminel, le site ne correspondra à aucune clé de site existante, et donc aucune MFA n'aura lieu. Ainsi, même si le cybercriminel détient le mot de passe de l'utilisateur, il n'aura aucun moyen de terminer le processus d'authentification MFA. Du côté des inconvénients, les clés de sécurité peuvent être perdues. En général, les sites qui utilisent des clés de sécurité permettront aux utilisateurs d'enregistrer plusieurs clés, de sorte que si l'une d'elles est perdue ou endommagée, une sauvegarde peut être utilisée.

#### Mots de passe à usage unique

Les mots de passe à usage unique prégénérés sont parfois utilisés comme sauvegarde pour d'autres méthodes MFA et étaient [utilisés pour des applications de haute sécurité](https://www.researchgate.net/figure/A-typical-one-time-password-OTP-scheme-used-by-European-banks-Stahlberg-2007-p-2_fig3_49279643) avant l'utilisation généralisée des smartphones. Les sites Web modernes les appellent souvent des « codes de sauvegarde ». Le serveur générera une liste de codes, les stockera et les présentera à l'utilisateur. L'utilisateur les imprimera généralement et stockera le document dans un endroit sécurisé. Chaque fois qu'un code sera utilisé, il sera marqué comme non valable par le serveur. Ceux-ci sont soumis aux mêmes faiblesses que les TOTP, mais ont l'inconvénient d'être très peu pratiques. À ce titre, ils sont fréquemment utilisés comme sauvegarde pour d'autres méthodes MFA. Leur utilisation est si rare que si un utilisateur est invité à saisir un code de sauvegarde, il prendra le temps de scruter minutieusement le site Web demandeur en rendant toute attaque d'hameçonnage peu moins susceptible de réussir. Des exemples de sites utilisant des codes de sauvegarde sont [Gmail](https://support.google.com/accounts/answer/1187538?hl=en&co=GENIE.Platform%3DDesktop) et [GitHub](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods).

Pour en savoir un peu plus sur l'authentification, consultez [l'aide-mémoire sur l'authentification de l'OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) et [l'aide-mémoire de l'OWASP sur la MFA](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html). Pour obtenir une exploration approfondie, consultez le parcours d'apprentissage Évaluation de la sécurité des applications Web.

### Fixation de session

La [fixation de session](https://owasp.org/www-community/attacks/Session_fixation#:~:text=Session%20Fixation%20is%20an%20attack,specifically%20the%20vulnerable%20web%20application.) est un concept important dans la sécurité Web. Elle concerne une attaque où un cybercriminel définit l'identifiant de session (ID de session) d'un utilisateur sur une valeur qui lui est connue. Cela peut se produire par divers moyens, tels que des attaques d'hameçonnage ou en exploitant les vulnérabilités de l'application Web. L'attaque consiste à acquérir un ID de session valide, à persuader un utilisateur de s'authentifier avec, puis à prendre en charge la session en utilisant l'ID de session connu. Cela nécessite que le cybercriminel fournisse un véritable ID de session d'application Web et manipule le navigateur de la personne ciblée pour l'utiliser. Il peut ensuite détourner la session de l'utilisateur pour obtenir un accès non autorisé au compte de l'utilisateur.

La fixation de session exploite les faiblesses dans la façon dont une application Web gère les identifiants de session. Essentiellement, l'application vulnérable ne parvient pas à affecter un nouvel ID de session lors de l'authentification de l'utilisateur, ce qui permet au cybercriminel d'utiliser un ID de session existant. Contrairement au détournement de session, qui se produit après la connexion de l'utilisateur, la fixation de session établit le contrôle sur une session avant l'authentification de l'utilisateur.

Diverses techniques peuvent être utilisées pour exécuter cette attaque, selon la façon dont l'application Web gère les jetons de session :

1. Jeton de session dans l'argument URL : le cybercriminel envoie l'ID de session à la victime via un lien hypertexte, ce qui l'amène à accéder au site via l'URL malveillante.
2. Jeton de session dans un champ de formulaire caché : le cybercriminel trompe la personne ciblée en l'authentifiant sur le serveur Web cible à l'aide d'un formulaire de connexion développé par ses soins, et potentiellement hébergé sur un serveur illégitime ou dans un e-mail au format HTML.
3. ID de session dans un cookie :

- Script côté client : utilise un script côté client pour injecter du code malveillant, souvent via des attaques XSS (Cross-Site Scripting), dans un lien hypertexte, en corrigeant un ID de session dans le cookie de la personne ciblée à l'aide de la fonction document.post.
- Balise &lt;meta&gt; : une autre forme d'attaque par injection de code, qui est plus puissante que le XSS, car elle ne peut pas être facilement désactivée ou refusée par les navigateurs.
- Réponse d'en-tête HTTP : exploite les réponses du serveur pour intégrer l'ID de session dans le navigateur de la victime en incluant le paramètre « Set-Cookie » dans la réponse d'en-tête HTTP.

De nombreux frameworks Web et bibliothèques offrent des fonctionnalités pour aider les développeurs à implémenter la gestion sécurisée des sessions, ce qui contribue à atténuer les vulnérabilités de fixation de session. Ces frameworks incluent souvent des mécanismes intégrés pour générer, stocker et valider les identifiants de session. Ils peuvent permettre de configurer l'expiration de la session, de régénérer les identifiants de session lors de l'authentification et d'assurer la transmission sécurisée des données de session. Cependant, il pourrait être utile pour les développeurs de mettre en œuvre efficacement ces pratiques dans leur code d'application, en assurant ainsi une configuration et une utilisation appropriées pour atténuer la fixation de session et d'autres vulnérabilités. Les mises à jour régulières des bibliothèques et des frameworks sont cruciales, car elles peuvent contenir des correctifs ou des améliorations liées à la sécurité de la gestion des sessions.

#### Prévention des vulnérabilités de fixation de session

Pour la plupart des administrateurs de serveurs Web, la meilleure façon d'atténuer les vulnérabilités de fixation de session est de s'assurer que la pile logicielle que vous utilisez pour l'authentification est également à jour et contient des mesures d'atténuation contre de telles attaques. Si vous utilisez une bibliothèque qui comprend une vulnérabilité qui permet la fixation de session, assurez-vous de la mettre à niveau dès que possible.

Les applications Web, les bibliothèques et les frameworks prennent plusieurs mesures pour atténuer les attaques de fixation de session. Celles-ci incluent la génération d'ID de session aléatoires pour chaque session d'utilisateur, l'expiration des sessions après une période d'inactivité et la mise en œuvre de mesures telles que la régénération des ID de session lors de l'authentification. Votre application Web devrait toujours utiliser le protocole HTTPS pour la sécurité et la confidentialité, et elle offre également une couche supplémentaire de protection contre les attaques de fixation de session : il est beaucoup plus difficile d'intercepter les identifiants de session en transit si la communication entre le client et le serveur est chiffrée. Enfin, votre application Web devrait également rejeter les jetons de session imposés en externe, ce qui contribuera également à vous protéger contre ce type d'attaque.

Si vous voulez coder une application Web avec des capacités d'authentification, nous vous recommandons de lire [cet article](https://secureteam.co.uk/2018/11/25/understanding-session-fixation-attacks/) et de mettre en œuvre les mesures suivantes qui vous aideront à protéger l'application Web contre les attaques de fixation de session :

1. Évitez d'accepter les identifiants de session via les paramètres GET ou POST, car cela atténue le risque d'exploitation en minimisant l'exposition aux vulnérabilités du navigateur. De plus, tous les ID de session doivent être générés par le serveur, ce qui élimine tout besoin d'ID de session proposé par le client.
2. Après la connexion, lancez un changement d'ID de session en générant un nouvel ID sur le serveur et en le mettant à jour en tant que cookie. Simultanément, invalidez toute session existante associée à l'utilisateur.
3. Incorporez une fonctionnalité de déconnexion permettant aux utilisateurs de terminer leurs sessions rapidement, en assurant ainsi la résiliation immédiate de la session côté serveur au lieu de simplement supprimer le cookie du navigateur. En outre, implémentez des mécanismes d'expiration de session pour invalider automatiquement les données de session après un laps de temps prédéfini, en limitant ainsi la fenêtre d'opportunité pour les cybercriminels de tirer parti des sessions compromises.


### Exercice pratique

#### Exercice 1 : contrôles des accès violés

Accédez au site Web Try Hack Me, créez un compte, visitez le salon appelé [OWASP Broken Access Control](https://tryhackme.com/room/owaspbrokenaccesscontrol) et suivez les instructions.

#### Exercice 2 : utilisation de tables arc-en-ciel pour mieux comprendre les mécanismes de stockage de mots de passe non sécurisés (facultatif)

Remarque : _bien que cet exercice offre une excellente occasion d'apprentissage sur la façon dont les cybercriminels pourraient violer des mots de passe mal sécurisés, il nécessite un peu d'espace disque libre et utilise un outil qui n'est disponible que sur Windows et Linux. Étant donné que tous les apprenants ne seront pas en mesure de réaliser cet exercice pratique, nous l'avons marqué comme étant clairement facultatif. Nous encourageons les apprenants qui veulent en savoir plus sur les tables arc-en-ciel et le stockage sécurisé des mots de passe, autant ceux qui peuvent et ceux qui ne peuvent pas faire l'exercice ci-dessous, à consulter d'autres publications comme_ [_celle-ci_](https://cybr.com/certifications-archives/hash-tables-rainbow-table-attacks-and-salts/)_._

Lors de l'authentification des utilisateurs, nous avons besoin d'un moyen de vérifier s'ils ont saisi les informations d'identification correctes. La façon la plus simple de le faire est de stocker le mot de passe lui-même dans une base de données. Cette méthode n'est pas sûre, car toute personne ayant accès à cette base de données pourrait obtenir les mots de passe en clair des utilisateurs et les révéler en cas de fuite ou de vulnérabilité de l'application. Une protection simple peut être mise en œuvre en stockant [une valeur de hachage](https://en.wikipedia.org/wiki/Cryptographic_hash_function) du mot de passe à la place. Cet exercice démontrera à quel point il est facile de briser cette protection et d'obtenir des mots de passe en clair à partir de valeurs hachées. **Le but de cet exercice n'est pas de faire croire aux apprenants que tous les mécanismes d'authentification peuvent être facilement violés, mais plutôt de démontrer à quel point il est facile de découvrir des mots de passe qui ont seulement été hachés sans aucun mécanisme de sécurité supplémentaire comme le salage.**

Les [tables arc-en-ciel](https://en.wikipedia.org/wiki/Rainbow_table) sont un moyen intelligent de réduire le temps de calcul en échange de l'espace disque lorsque vous essayez de forcer un mot de passe haché. Ils se composent de chaînes de hachages précalculées qui peuvent être utilisées pour découvrir une valeur hachée (le mot de passe en clair).

##### L'exercice

En considérant la valeur de hachage de `168f3c743786fea2e04aeeee33e112da` , Essayez de découvrir le mot de passe en utilisant des tables arc-en-ciel. 🌈 Utilisez RainbowCrack (<http://project-rainbowcrack.com/>). La façon la plus simple d'exécuter RainbowCrack est peut-être d'utiliser Kali Linux (<https://www.kali.org/>) dans une machine virtuelle ou de démarrer à partir d'un LiveUSB (voir les liens dans la section _Informations de base_ au début de ce parcours d'apprentissage pour en savoir plus). L'algorithme de hachage est MD5 et le hachage est effectué sans salage.

_Conseil :_ le mot de passe est en minuscules alphanumériques, max. 6 caractères. Une fois que vous avez installé RainbowCrack, vous pouvez utiliser la commande suivante pour générer la table requise :

```
rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```

_(Facultatif)_ Essayez d'utiliser la table générée pour casser un autre hachage : `feadfd87d487818698d63aedf385c4e2`.

_Conseil :_ si cela échoue, vous pouvez essayer de générer plus de tables pour augmenter le taux de réussite de votre ensemble de tables (couverture). Il suffit de changer le cinquième paramètre de la commande rtgen à différentes valeurs (essayez 1-5).

Essayez de casser le hachage avec salage suivant : `93e99d25dd6e8f524f23814908b6c039`

##### La procédure à suivre

La génération d'une table arc-en-ciel nécessite de spécifier un algorithme de hachage à utiliser, la longueur maximale des valeurs de texte en clair qu'il s'agit de découvrir et leur jeu de caractères. Ces paramètres n'influencent que le temps nécessaire à la génération d'une table (quantité de calcul nécessaire).

Les tables pour les mots de passe plus courts avec des jeux de caractères plus petits (p. ex., seulement des lettres minuscules) prendront moins de temps à générer que les tables pour les mots de passe plus longs comprenant des chiffres et des caractères spéciaux.

En outre, vous devez choisir combien de chaînes générer et leur longueur. Ces paramètres sont plus complexes à expliquer (voir le [livre blanc de Philippe Oechslin](https://www.iacr.org/archive/crypto2003/27290615/27290615.pdf) pour obtenir plus de contexte), mais ont des effets sur la couverture de la table. Seul un sous-ensemble de toutes les valeurs possibles en clair est inclus dans chaque table arc-en-ciel.

Plus les valeurs de ces paramètres sont grandes, plus la table est grande et coûteuse (en termes de temps CPU), mais aussi plus les valeurs en clair peuvent être découvertes en l'utilisant.

Des tables précalculées pour différentes fonctions de hachage, longueurs de mots de passe et jeux de caractères peuvent être téléchargées depuis Internet (p. ex., <https://freerainbowtables.com/>) ou obtenues lors de conférences sur la sécurité informatique et de camps de pirates informatiques (voir <https://dcddv.org/>). Aux fins de cet exercice, nous allons générer notre propre table !

Vous pouvez installer Rainbowcrack sur votre système ou utiliser Kali Linux Live. Pour Kali, ouvrez une fenêtre de terminal et exécutez :

```
sudo apt update

sudo apt install rainbowcrack
```

Cela permettra d'installer le logiciel. Vous pouvez utiliser la commande rtgen pour générer des tables. Selon [son manuel](http://project-rainbowcrack.com/generate.htm), la commande prend plusieurs paramètres :

```
rtgen hash_algorithm charset plaintext_len_min plaintext_len_max table_index chain_len chain_num part_index
```

Nous utiliserons MD5 comme algorithme de hachage. Nous chercherons des mots de passe de 1 à 6 caractères. Nous utiliserons le jeu de caractères « lower alpha-numeric », qui comprend uniquement des lettres minuscules et des chiffres. Nous utiliserons 3 800 pour la longueur de la chaîne et 1 000 000 pour le nombre de chaînes.

Pour générer notre première table, exécutez :

```
sudo rtgen md5 loweralpha-numeric 1 6 0 3800 1000000 0
```

Cette commande peut prendre un certain temps à exécuter, selon la configuration de votre système.

Une fois la génération terminée, une étape supplémentaire est nécessaire avant de pouvoir utiliser nos nouvelles tables :

```
sudo rtsort
```

Cela triera les données pour accélérer l'utilisation de la table. rtcrack refusera de s'exécuter sur des tables non triées.

Jetons un coup d'œil à notre premier hachage :

```
rcrack . -h 168f3c743786fea2e04aeeee33e112da
```

Cela devrait prendre un instant et révéler notre mot de passe en clair :

```
1 rainbow tables found
memory available: 11361376665 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


plaintext of 168f3c743786fea2e04aeeee33e112da is 1nfus3


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.33 s
time of chain traverse:                      0.22 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4133612
number of alarm:                             3194
performance of chain traverse:               32.80 million/s
performance of alarm check:                  36.91 million/s


result
----------------------------------------------------------------
168f3c743786fea2e04aeeee33e112da  1nfus3  hex:316e66757333
```

Success! Maintenant, essayons notre deuxième hachage :

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

Le résultat :

```
1 rainbow tables found
memory available: 11236982784 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 2 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files


statistics
----------------------------------------------------------------
plaintext found:                             0 of 1
total time:                                  0.31 s
time of chain traverse:                      0.20 s
time of alarm check:                         0.11 s
time of disk read:                           0.00 s
hash & reduce calculation of chain traverse: 7216200
hash & reduce calculation of alarm check:    4238786
number of alarm:                             3324
performance of chain traverse:               36.08 million/s
performance of alarm check:                  37.18 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  <not found>  hex:<not found>
```

Nous n'avons pas trouvé notre hachage dans cette table. Générons quelques tables supplémentaires dans l'espoir d'augmenter notre couverture. Nous utiliserons la même commande rtgen en modifiant uniquement le paramètre « table_index » :

```
sudo rtgen md5 loweralpha-numeric 1 6 1 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 2 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 3 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 4 3800 1000000 0
sudo rtgen md5 loweralpha-numeric 1 6 5 3800 1000000 0
sudo rtsort .
```

Réessayons :

```
rcrack . -h feadfd87d487818698d63aedf385c4e2
```

Le résultat :


```
6 rainbow tables found
memory available: 10784174899 bytes
memory for rainbow chain traverse: 60800 bytes per hash, 60800 bytes for 1 hashes
memory for rainbow table buffer: 6 x 16000016 bytes
disk: ./md5_loweralpha-numeric#1-6_0_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_1_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_2_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_3_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_4_3800x1000000_0.rt: 16000000 bytes read
disk: ./md5_loweralpha-numeric#1-6_5_3800x1000000_0.rt: 16000000 bytes read
disk: finished reading all files
plaintext of feadfd87d487818698d63aedf385c4e2 is trolo0


statistics
----------------------------------------------------------------
plaintext found:                             1 of 1
total time:                                  0.54 s
time of chain traverse:                      0.41 s
time of alarm check:                         0.13 s
time of disk read:                           0.02 s
hash & reduce calculation of chain traverse: 14432400
hash & reduce calculation of alarm check:    4766264
number of alarm:                             4606
performance of chain traverse:               35.46 million/s
performance of alarm check:                  36.66 million/s


result
----------------------------------------------------------------
feadfd87d487818698d63aedf385c4e2  trolo0  hex:74726f6c6f30
```

C'est bon ! Les tables supplémentaires ont augmenté la couverture et le hachage a été découvert.

Une amélioration de l'utilisation du hachage simple pour la protection par mot de passe est appelée « salage » des hachages. Il s'agit d'ajouter à la valeur en clair un secret propre à l'application Web. Cela augmente la longueur et le jeu de caractères de la valeur hachée, et rend l'approche de table arc-en-ciel infaisable. L'essai du troisième hachage (avec salage) fourni dans cet exercice échouera avec cette méthode, car elle nécessiterait des tables arc-en-ciel plus grandes que celles qui peuvent être actuellement générées (et stockées).

## Contrôle de compétence

### Exercice 1 : récapitulatif

Terminez l'exercice décrit ci-dessus : effectuez une injection SQL sur DVWA et comparez les hachages que vous avez découverts à ceux que vous avez trouvés sur un site de recherche de hachage.

### Exercice 2 : questionnaire à choix multiples

L'authentification compromise représente une menace importante pour la sécurité des applications Web, car elle permet aux cybercriminels de compromettre les informations d'identification des utilisateurs, de détourner des sessions et d'obtenir un accès non autorisé à des informations sensibles. Dans cet ensemble de questions à choix multiples, vous pouvez explorer le concept d'authentification compromise et explorer les différents risques associés à cette vulnérabilité. De plus, si vous avez un mentor ou un pair, vous pouvez examiner différents types de failles pouvant mener à des mécanismes d'authentification compromis et discuter de stratégies d'atténuation spécifiques adaptées pour traiter efficacement chacune de ces vulnérabilités.

Améliorez votre compréhension de la sécurité des applications Web et apprenez comment atténuer les risques posés par l'authentification compromise grâce aux questions suivantes :

**Question 1**. Qu'est-ce qu'une authentification compromise dans le contexte de la sécurité des applications Web ?

A) Une vulnérabilité qui permet aux cybercriminels d'exécuter du code arbitraire sur le serveur.\
B) Une faille qui accorde un accès non autorisé à des parties restreintes d'une application Web.\
C) Une faiblesse dans le mécanisme d'authentification d'une application Web, conduisant à la compromission des informations d'identification des utilisateurs.\
D) Une faille de sécurité qui permet aux cybercriminels d'intercepter les communications entre le client et le serveur.

**Question 2**. Quels sont les risques potentiels associés aux failles d'authentification ?

A) L'accès non autorisé aux données sensibles et aux comptes d'utilisateur.\
B) L'exposition des jetons de session, conduisant à des attaques de détournement de session.\
C) La compromission des informations d'identification des utilisateurs, y compris les mots de passe et les jetons d'authentification.\
D) Tout ce qui précède.

**Question 3**. Lequel des éléments suivants n'est PAS un exemple de mécanisme d'atténuation des vulnérabilités d'authentification compromise ?

A) Mise en œuvre de l'authentification multifactorielle (MFA) pour les comptes d'utilisateurs.\
B) Mise en œuvre de politiques de mot de passe solides, y compris la modification régulière des mots de passe.\
C) Désactivation de HTTPS pour empêcher l'interception des informations d'authentification.\
D) Mise en œuvre des mécanismes de verrouillage des comptes pour prévenir les attaques par force brute.

**Question 4**. Quel type de faille peut conduire à des mécanismes d'authentification compromis en permettant aux cybercriminels de deviner ou de pirater les mots de passe des utilisateurs ?

A) Fixation de session\
B) Falsification de requête intersite (CSRF)\
C) Complexité insuffisante des mots de passe\
D) Cross-Site Scripting (XSS)

**Question 5**. Parmi les options suivantes, quel est l'exemple précis d'une stratégie d'atténuation pour corriger la faille de complexité insuffisante des mots de passe ?

A) Implémenter des défis CAPTCHA lors du processus de connexion.\
B) Appliquer des exigences de longueur et de complexité des mots de passe.\
C) Chiffrer des jetons d'authentification pour empêcher les interceptions.\
D) Mettre en liste blanche des adresses IP de confiance pour accéder à la page de connexion.

**Question 6**. Quelle stratégie d'atténuation vise à empêcher les cybercriminels d'exploiter les vulnérabilités de fixation de session ?

A) Mettre en œuvre des mécanismes de temporisation des sessions.\
B) Chiffrer des cookies de session en utilisant HTTPS.\
C) Générer à nouveau les identifiants de session après une authentification réussie.\
D) Appliquer des politiques de mots de passe complexes pour les comptes d'utilisateur

**Question 7**. Quel type de faille peut conduire à des mécanismes d'authentification compromise en permettant aux cybercriminels de détourner des sessions d'utilisateur actives ?

A) Expiration de session insuffisante\
B) Stockage non sécurisé des jetons\
C) Cross-Site Scripting (XSS)\
D) Falsification de requête intersite (CSRF)

**Question 8**. Quelle stratégie d'atténuation résout le problème du stockage non sécurisé des jetons en gérant de manière sécurisée les jetons d'authentification ?

A) Stockage des jetons en texte brut dans les cookies côté client.\
B) Chiffrement des jetons à l'aide d'un algorithme de chiffrement symétrique.\
C) Implémentation d'algorithmes de hachage de mots de passe sécurisés.\
D) Utilisation d'en-têtes HTTP pour transmettre des jetons d'authentification.

**Question 9**. Parmi les options suivantes, quel est l'exemple spécifique de stratégie d'atténuation visant à prévenir les attaques de fixation de session ?

A) Modification des identifiants de session après une connexion réussie.\
B) Mise en place de l'authentification multifactorielle (MFA).\
C) Utilisation des défis CAPTCHA pour assurer l'authentification des utilisateurs.\
D) Mise en œuvre d'une validation stricte des entrées sur le formulaire de connexion.

**Question 10**. Quel type de faille peut conduire à des mécanismes d'authentification compromise en permettant aux cybercriminels de falsifier des requêtes vers l'application Web tout en étant authentifiés sous l'identifiant d'un autre utilisateur ?

A) Expiration de session insuffisante\
B) Protection insuffisante de la couche Transport\
C) Cross-Site Scripting (XSS)\
D) Falsification de requête intersite (CSRF)

**Corrigé**
{{< question title="Corrigé" >}}

1. B) Une faiblesse dans le mécanisme d'authentification d'une application Web, conduisant à la compromission des informations d'identification des utilisateurs.
2. D) Tout ce qui précède.
3. C) Désactivation de HTTPS pour empêcher l'interception des informations d'authentification.
4. C) Complexité insuffisante des mots de passe
5. B) Appliquer des exigences de longueur et de complexité des mots de passe.
6. C) Générer à nouveau les identifiants de session après une authentification réussie.
7. A) Expiration de session insuffisante
8. B) Chiffrement des jetons à l'aide d'un algorithme de chiffrement symétrique.
9. A) Modification des identifiants de session après une connexion réussie.
10. D) Falsification de requête intersite (CSRF)
{{< /question >}}


## Ressources d'apprentissage

{{% resource title="Bourrage d'informations d'identification" description="Un aperçu d'une attaque dans laquelle le cybercriminel teste de nombreuses combinaisons de connexions, par exemple celles qui proviennent d'une violation de données" languages="Anglais, arabe, chinois, espagnol, français" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Credential_stuffing" %}}
{{% resource title="Fonction de hachage cryptographique" description="Un aperçu de ce que sont les fonctions de hachage cryptographique et pourquoi elles sont si importantes pour la sécurité" languages="31 langues" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Fonction_de_hachage_cryptographique" %}}
{{% resource title="Table arc-en-ciel" description="Une liste de fonctions de hachage précalculées qui peuvent être utilisées lors de la tentative de contenu chiffré par force brute" languages="21 langues" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Rainbow_table" %}}
{{% resource title="Salage" description="Un salage se compose d'une donnée ajoutée à un mot de passe ou à une autre information avant d'être chiffrée. Son utilisation complique énormément la tâche des cybercriminels qui tentent d'utiliser des tables arc-en-ciel" languages="23 langues" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Salage_(cryptographie)" %}}
{{% resource title="Chiffrement traditionnel" description="Un aperçu des premiers algorithmes utilisés pour chiffrer les mots de passe dans les années 1970. Ils ne sont plus utilisés" languages="Anglais" cost="Gratuit" url="https://www.usenix.org/legacy/publications/library/proceedings/usenix99/full_papers/provos/provos_html/node9.html" %}}
{{% resource title="Bonnes réponses cryptographiques" description="Une liste des solutions cryptographiques qu'il serait prudent d'utiliser aujourd'hui" languages="Anglais" cost="Gratuit" url="https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/" %}}
{{% resource title="Recherche de hachage" description="Un outil qui effectue des recherches inversées de hachages, et qui pourrait être utile pour travailler avec DVWA et des outils similaires" languages="Anglais" cost="Gratuit" url="https://www.whatsmyip.org/hash-lookup/" %}}
{{% resource title="Aide-mémoire sur le stockage des mots de passe et aide-mémoire sur l'oublie des mots de passe" description="Une série de bonnes pratiques sur la façon de stocker des mots de passe chiffrés et sur la façon de gérer la récupération de mot de passe" languages="Anglais" cost="Gratuit" url="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html <br> https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html" %}}
{{% resource title="Fraude par SMS internationale" description="Un exemple de la façon dont les messages SMS peuvent être utilisés abusivement par les cybercriminels et une bonne étude de cas sur les raisons pour lesquelles nous ne devrions pas répondre aux SMS pour l'authentification" languages="Anglais" cost="Gratuit" url="https://www.openmindnetworks.com/blog/international-sms-fraud-by-brian-kelly-cto-and-co-founder/" %}}
{{% resource title="Selenium" description="Un outil permettant d'automatiser les tâches du navigateur Web qui peut être utilisé pour les tests" languages="Anglais" cost="Gratuit" url="https://www.selenium.dev/" %}}
{{% resource title="Test d'énumération des comptes et des comptes d'utilisateurs devinables" description="Un autre processus de test de sécurité d'application Web permettant de voir s'il est possible d'obtenir une application pour énumérer les noms d'utilisateur" languages="Anglais" cost="Gratuit" url="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account" %}}
{{% resource title="Have I Been Pwned" description="Un service fantastique et de bonne réputation permettant de vérifier si un certain nom d'utilisateur a été utilisé dans une quelconque violation de données" languages="Anglais" cost="Gratuit pour les petits volumes de requêtes" url="https://haveibeenpwned.com/" %}}
{{% resource title="Présentation de 306 millions de mots de passe pwned téléchargeables gratuitement" description="Un article de blog de Troy Hunt, le fondateur de Have I Been Pwned, sur la façon dont il a trouvé des millions de mots de passe divulgués et à quoi pourrait servir la base de données divulguée" languages="Anglais" cost="Gratuit" url="https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/" %}}
{{% resource title="Identifiants communs" description="Listes d'identifiants couramment utilisés, comme les mots de passe" languages="Anglais" cost="Gratuit" url="https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials" %}}
{{% resource title="Directives relatives aux mots de passe NIST" description="Un article de blog décrivant certaines des directives de mot de passe NIST et les raisons qui les soutiennent" languages="Anglais" cost="Gratuit" url="https://blog.netwrix.com/2022/11/14/nist-password-guidelines/" %}}
{{% resource title="Hameçonnage" description="Un aperçu rapide des attaques d'hameçonnage, de leur historique et des méthodes fréquemment utilisées par les cybercriminels" languages="76 langues" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Hame%C3%A7onnage" %}}
{{% resource title="Escroquerie de changement de SIM" description="Un type d'escroquerie dans lequel un cybercriminel prend le contrôle de la carte SIM d'une personne ciblée. Une raison clé pour laquelle il convient de ne pas compter sur l'authentification par SMS" languages="Anglais, chinois, japonais, malayalam, allemand, espagnol" cost="Gratuit" url="https://en.wikipedia.org/wiki/SIM_swap_scam" %}}
{{% resource title="Présentation technique de l'authentification U2F" description="Un examen plus approfondi du fonctionnement d'U2F, une méthode d'authentification populaire qui repose sur des outils tels que les clés de sécurité physique" languages="Anglais" cost="Gratuit" url="https://developers.yubico.com/U2F/Protocol_details/Overview.html" %}}
{{% resource title="Codes de sauvegarde d'authentification à deux facteurs" description="Il peut arriver que la méthode principale d'authentification à deux facteurs soit perdue ou détruite. Dans ce cas, l'utilisateur devra utiliser une méthode de sauvegarde. Ces articles montrent comment Google et GitHub gèrent ces sauvegardes." languages="Anglais" cost="Gratuit" url="Google : https://support.google.com/accounts/answer/1187538?hl=fr&sjid=12510407045846653435-EU <br> Github : https://docs.github.com/fr/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods" %}}
{{% resource title="Aide-mémoire sur l'authentification multifactorielle" description="Un aperçu de ce qu'est l'authentification multifactorielle et des meilleures pratiques à adopter lors de sa mise en œuvre" languages="Anglais" cost="Gratuit" url="https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html" %}}