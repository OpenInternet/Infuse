---
style: module
title: Journalisation du site Web pour la sécurité
description: Les journaux de site web peuvent être essentiels pour identifier
  des attaques potentielles et les attaquants. Nous examinons comment les
  utiliser efficacement.
weight: 2
---

## Cas d'utilisation

Tout site Web exposé à Internet est constamment attaqué. Au minimum, il est inondé par des attaques non dirigées par des hordes de robots exploités par des acteurs criminels. Les attaques ciblées sont plus préoccupantes. Même les cybercriminels non qualifiés, s'ils font preuve de persévérance et de chance, peuvent découvrir des vulnérabilités sur un site Web.

Idéalement, le propriétaire du site Web devrait avoir conscience des menaces auxquelles le site est confronté. Les propriétaires de sites en particulier voudront savoir si un cybercriminel est proche de trouver, ou a récemment trouvé, une vulnérabilité dans leur site. Enfin, si une vulnérabilité est exploitée, les propriétaires de sites voudront savoir où se trouve la vulnérabilité et pendant combien de temps elle a été exploitée. Les journaux de site Web peuvent soutenir tous ces désirs.

D'autre part, une journalisation excessive peut présenter un risque pour les utilisateurs des sites Web. Si un site enregistre des informations sensibles et que ces journaux sont acquis par un cybercriminel (par exemple, une saisie par les forces de l'ordre ou une compromission par des pirates informatiques), les informations sensibles pourraient facilement se retrouver entre de mauvaises mains.

Ce sous-thème couvrira les approches de journalisation des sites Web afin de maximiser l'utilité pour les propriétaires de sites Web et de minimiser les risques pour les utilisateurs du site.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre la journalisation intégrée pour les principaux serveurs Web
- Comprendre les journaux spécifiques aux applications à ajouter pour détecter les attaques
- Savoir comment minimiser les informations sensibles dans les journaux

---
## Section Principale

Même avec les meilleures compétences, intentions et procédures possible, il est presque impossible de développer un site Web qui résiste complètement à tout type d'attaque. Avec suffisamment de temps et de malchance, chaque site présentera un incident de sécurité. Lorsque cela se produit, il est important d'avoir mis en place une journalisation qui prend en charge la détection et l'investigation des événements de sécurité. En même temps, il est important que les journaux d'un site Web ne posent pas de risques supplémentaires. Ce sous-thème vous apprendra comment aborder la journalisation pour maximiser la sécurité d'un site. Nous aborderons :

- Les journaux intégrés pour les plateformes populaires
- L'ajout de journaux pour capturer des événements de sécurité importants
- La minimisation des risques associés à la journalisation

### La journalisation intégrée

Les diverses plateformes Web ont leurs propres systèmes de journalisation. Nous pouvons compter sur eux pour enregistrer des données sur chaque requête et réponse, mais ils ne sont généralement pas suffisants pour tous les besoins d'intervention en cas d'incident. Passons en revue ce qui est disponible dans les registres de certains frameworks.

#### Apache

Apache est le serveur Web complet le plus populaire sur Internet et sert les sites les plus actifs. Par défaut, il enregistre les événements sur le système de fichiers du serveur Web. Cela comprend deux fichiers : access_log et error_log. Le journal d'accès contient des informations structurées sur chaque requête, tandis que le journal d'erreurs contient plus de données semi-structurées sur les problèmes qui se sont présentés.

Le journal d'accès comprend une ligne par entrée, avec un format configurable. Le format par défaut est le suivant, chacun séparé par un espace :

- L'adresse IP du demandeur
- L'utilisateur connecté sur l'appareil demandeur. Cette information n'est presque jamais envoyée et se limite presque toujours à un simple tiret.
- L'utilisateur se connecte si le site Web utilise l'authentification HTTP de base. Il s'agit s'agira presque toujours d'un tiret.
- La date et l'heure de la requête, entourées de crochets. Notez que ce champ contient généralement des espaces.
- La ligne de requête HTTP envoyée depuis le client, entourée de guillemets (p. ex., "GET / HTTP/1.1"). Ces champs auront toujours des espaces.
- Le code de réponse HTTP du serveur, p. ex., 200, 404, 500, etc.
- La taille de la réponse retournée par le serveur

Voici un exemple :

```
127.0.0.1 - - \[13/Dec/2023:13:55:36 -0700\] "GET / HTTP/1.1" 200 2326
```

Notez que chaque serveur Apache peut être configuré pour enregistrer plus de données. Pour obtenir plus d'informations, consultez [la documentation Apache](https://httpd.apache.org/docs/2.4/logs.html#accesslog). Pour en savoir plus sur le journal d'accès Apache et la façon de l'utiliser, consultez [cet article](https://www.keycdn.com/support/apache-access-log).

Le journal d'erreurs se compose d'un mélange de messages d'Apache qui sont dans un format semi-structuré et de messages d'erreur provenant de sites Web exécutés sur le serveur, sans aucune structure imposée. La structure par défaut des entrées du journal des erreurs d'Apache est une ligne par entrée, avec les champs suivants, séparés à nouveau par des espaces :

- La date et l'heure de la requête, entourées de crochets. Notez que ce champ contient généralement des espaces.
- Le niveau d'erreur (p. ex., avis, erreur) entouré de crochets.
- Si l'erreur est associée à une requête, le mot « client » et l'adresse IP du demandeur, le tout entre crochets.
- Le message d'erreur lui-même, qui contiendra presque toujours un certain nombre d'espaces

[Cet article](https://www.dataset.com/blog/apache-error-log-detail/) fournit plus d'informations sur l'utilisation du journal d'erreurs Apache.

#### IIS

IIS est le serveur Web Windows par défaut et également un serveur Web très populaire. Comme Apache, IIS enregistre également, par défaut, les requêtes vers le système de fichiers du serveur Web. Plusieurs formats de journaux sont disponibles, mais le format par défaut est le format W3C, qui enregistre les éléments suivants, séparés par des espaces :

- Heure de la requête
- Adresse IP du demandeur
- Méthode HTTP (p. ex., `GET`, `POST`, `HEAD`, etc.)
- URL (p. ex., `/`, `/index.htm`, `/posts/34/reply`, etc.)
- Code de réponse du serveur (p. ex., `200`, `404`, `500`, etc.)
- Version du protocole HTTP (p. ex., `HTTP/1.1`)

Notez que les journaux par défaut n'enregistrent pas la chaîne de la requête, par exemple une requête <http://example.com/profile?profileID=34> n'enregistrera que /profile. Pour obtenir plus d'informations sur les journaux d'accès IIS, consultez la [documentation Microsoft](https://learn.microsoft.com/en-us/windows/win32/http/server-side-logging-in-http-version-2-0).

Les journaux d'erreurs sous IIS sont légèrement plus compliqués. Selon l'erreur, ils peuvent être consignés dans le fichier journal HTTP.SYS HTTPERR ou dans le journal des événements Windows.

Le fichier HTTPERR contient des erreurs au niveau du protocole et est structuré, les champs suivants étant séparés par des espaces :

- Date de la requête
- Heure de la requête
- Adresse IP du demandeur
- Port du demandeur (pas le port du serveur)
- Adresse IP du serveur
- Port du serveur
- Protocole HTTP (p. ex., `HTTP/1.1`)
- Méthode HTTP (p. ex., `GET`, `POST`, `HEAD`, etc.)
- L'URL et la chaîne de la requête
- Code de réponse du serveur (p. ex., `200`, `404`, `500`, etc.)
- Un trait littéral
- Une chaîne de type erreur (pas d'espaces)

Pour obtenir plus d'informations sur le journal des erreurs, consultez la [documentation Microsoft](https://learn.microsoft.com/en-us/troubleshoot/developer/webapps/aspnet/site-behavior-performance/error-logging-http-apis).

Le journal des événements Windows contient des erreurs générées par le serveur d'applications (p. ex., ASP.NET) ou l'application. Ils sont disponibles dans l'Observateur d'événements Windows et sont semi-structurés :

- Niveau d'erreur (p. ex., `Information`, `Avertissement`, `Erreur`)
- Date et heure
- Le logiciel qui a enregistré l'erreur (les entrées de journal peuvent provenir de n'importe quel logiciel sur le système, pas seulement du serveur Web)
- Un ID unique de l'événement/erreur
- Catégorie
- Informations non structurées spécifiques à l'erreur

Pour obtenir plus d'informations sur la recherche des journaux d'erreurs sur Windows, consultez [cet article](https://stackify.com/beyond-iis-logs-find-failed-iis-asp-net-requests/).

#### nginx

Selon la façon dont vous comptez, nginx peut être le serveur Web le plus populaire sur Internet, mais il est assez limité et agit généralement comme un proxy inverse à un serveur Web back-end ou servant des fichiers statiques.

Les journaux d'accès par défaut sont similaires aux journaux Apache par défaut, mais avec les champs suivants à la fin de chaque ligne :

- Valeur de l'en-tête référant envoyé avec la requête
- Agent utilisateur (version du navigateur) envoyé avec la requête

Pour obtenir plus d'informations sur les journaux nginx, consultez la [documentation officielle](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).

Les journaux d'erreurs nginx sont semi-structurés, avec les champs suivants, séparés par des espaces :

- La date de la requête
- L'heure de la requête
- Le niveau d'erreur entre crochets
- Les informations d'ID du processus sur l'instance nginx qui a enregistré l'erreur
- Un ID de connexion (facultatif)
- Le message d'erreur en texte libre

Pour obtenir plus d'informations, consultez [cet article](https://trunc.org/learning/nginx-log-analysis).

#### Journaux CDN en amont

Si un site est derrière un CDN, il est souvent utile de voir les journaux des requêtes au CDN, par opposition aux requêtes du CDN envoyées au site d'origine. Chaque fournisseur de CDN fournit des journaux différemment et a des structures de prix différentes pour la journalisation.

#### Configuration de la journalisation du serveur

Lors de la configuration de la journalisation du serveur, quelques étapes doivent être réalisées pour maximiser la valeur de sécurité des journaux.

- Assurez-vous que les journaux contiennent au moins l'adresse IP du demandeur, l'URL complète demandée (y compris la chaîne de la requête), le temps nécessaire pour servir la requête, la taille de la réponse, le référent et l'agent utilisateur. Ces informations peuvent être extrêmement utiles lors d'une enquête sur un incident.
- Essayez d'obtenir les journaux hors du serveur Web aussi rapidement que possible. Si le serveur lui-même est compromis, les cybercriminels tenteront probablement de cacher leurs traces en supprimant ou en modifiant les journaux du serveur. Voici quelques façons d'y parvenir :
  - Avoir un processus qui extrait les fichiers journaux du serveur périodiquement. L'envoi de journaux à partir du serveur Web est correct, mais il est important que le processus d'envoi ne puisse pas être utilisé pour supprimer les journaux sauvegardés.
  - Les journaux « Stream » du serveur Web vers un serveur distant, par exemple, avec syslog-ng. Cela offre une grande protection contre la perte de journaux. Il est généralement judicieux de conserver les journaux sur le serveur Web, en cas d'interruption du réseau.

#### Limitations de la journalisation du serveur

Même lorsqu'ils sont entièrement configurés, les journaux de serveur intégrés manquent beaucoup d'informations importantes. À titre d'exemples :

- Les informations du paramètre POST ne sont pas incluses. Si un cybercriminel effectue des attaques au niveau de l'application contre une page qui accepte les paramètres POST, il n'y aura aucun moyen de voir ces attaques dans les journaux.
- Bien que les journaux d'erreurs puissent contenir des informations sur les erreurs de système de fichiers et de base de données qui se produisent lorsque les cybercriminels exploitent des vulnérabilités, ils ne sont généralement pas suffisants pour comprendre beaucoup de choses sur l'attaque. P. ex., des journaux d'erreurs élevés peuvent indiquer une attaque en cours, mais peuvent également indiquer un bug non lié à la sécurité, et il peut s'avérer très difficile de distinguer les deux.
- Aucune information d'identité n'est incluse. Bien que tous les journaux incluent l'adresse IP, plusieurs utilisateurs peuvent avoir la même adresse IP.

La plupart de ces informations ne sont pas incluses pour de bonnes raisons. Une grande partie peut avoir de mauvaises implications pour la vie privée des utilisateurs. D'autres (comme la journalisation des erreurs utiles) nécessitent un aperçu de l'application elle-même, et ne peuvent donc pas être effectuées par le serveur Web.

#### Approche de la journalisation pour la sécurité

L'objectif principal de la journalisation au niveau de l'application dans une application Web est de surmonter les limites de la journalisation du serveur. Il existe de nombreux articles décrivant les bonnes pratiques en matière de journalisation, en voici quelques-uns :

- [Un aperçu de la journalisation de sécurité](https://www.dnsstuff.com/security-log-best-practices)
- [Un article de l'OWASP sur la journalisation des sites Web](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [Un article de l'OWASP sur le fait d'avoir un format cohérent pour les journaux](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html)

Ces ressources devraient vous fournir les connaissances dont vous avez besoin pour intégrer la connexion de sécurité dans une application Web existante (ou nouvelle).

#### Journalisation et informations sensibles

Lorsque nous surmontons les limites de la journalisation serveur intégrée, nous voulons nous assurer de ne pas mettre les utilisateurs du site en danger. Il arrive fréquemment que les journaux soient moins bien protégés que les bases de données de production. Tout d'abord, les journaux ne sont pas une cible aussi évidente qu'une base de données de production, de sorte que les utilisateurs ont tendance à ne pas se concentrer sur eux lors de la mise en place de mesures de sécurité. Deuxièmement, il arrive souvent qu'un plus grand nombre d'utilisateurs d'une organisation aient accès aux journaux qu'à une base de données de production. Troisièmement, les journaux ont tendance à être envoyés à de nombreux systèmes différents, tandis que les bases de données de production ont tendance à rester centralisées. Pour cette raison, il convient d'envisager de caviarder les informations sensibles dans les journaux.

[Cet article](https://www.skyflow.com/post/how-to-keep-sensitive-data-out-of-your-logs-nine-best-practices) empêche certaines bonnes pratiques générales pour le traitement des données sensibles lors de la journalisation. Voici quelques approches à envisager pour certains types de données :

##### Paramètres POST

Il est recommandé de ne pas inclure d'informations sensibles dans les paramètres GET, c'est pourquoi les paramètres GET sont enregistrés, mais pas les paramètres POST. Cependant, il peut être extrêmement utile d'avoir accès à des informations sur les paramètres POST lors de la réponse à une attaque. Voici quelques mesures à prendre :

- Certaines pages (p. ex., la page d'ouverture de session) et/ou certains paramètres (numéro de carte de crédit, champs de mot de passe) devraient être exemptés de journalisation
- Pour les paramètres POST qui seront enregistrés, envisagez de les supprimer pour masquer les informations potentiellement sensibles, tout en restant en mesure d'identifier le trafic malveillant. Le code Python suivant peut vous inspirer :

  {{< highlight python "linenos=table" >}}
  import re

  keep = ['select', 'where', 'from', 'and', 'script', 'on', 'src', '../', '<', '>']
  output = ''

  i = 0
  while i < len(target):
  	matched = False
  	for j in keep:
  		if target[i:i+len(j)].lower() == j.lower():
  			output = output + target[i:i+len(j)]
  			i=i+len(j)
  			matched = True
  	if not matched:
  		if ' ' == target[i:i+1]:
  			output = output + ' '
  		elif re.search('\w', target[i:i+1]):
  			output = output + "A"
  		elif re.search('\d', target[i:i+1]):
  			output = output + "1"
  		else:
  			output = output + "*"
  		i = i+1

  {{< / highlight >}}

##### Erreurs liées à la sécurité

Si une requête provoque une erreur qui ressemble à une tentative de piratage ou de contournement des contrôles, le site Web doit consigner agressivement les informations de la requête. Voici quelques exemples :

- Requêtes de base de données qui déclenchent une erreur
- Requêtes pour un élément de données auquel l'utilisateur n'a pas accès
- Erreurs ou données vides lors de la tentative de lecture d'un fichier

Si l'un de ces cas se produit, il est conseillé de consigner la requête, ainsi que les informations internes (par exemple, requête de base de données, nom de fichier, etc.). Dans le scénario optimiste, il y a un simple bug dans le site. Dans ce cas, il y a beaucoup d'informations de débogage. Dans le scénario pessimiste, le site est compromis. Dans ce cas, il est plus facile de trouver où la faille s'est produite, de sorte que l'investigation soit plus efficace.

##### Informations d'identité

La journalisation de l'identité d'un utilisateur connecté peut être dangereuse, mais des mesures peuvent être prises pour atténuer le danger. Il est douteux de journaliser des cookies de session, mais un hachage d'un ID de session peut être utilisé pour suivre l'activité d'un utilisateur sur le site. En outre, si le serveur Web dispose d'un répertoire interrogeable des sessions utilisateur actives, un ID interne peut être utilisé dans les journaux ou les ID de session existants peuvent être hachés pour identifier les entrées de journal d'un utilisateur connecté. Cela permettra aux propriétaires du site d'identifier un cybercriminel actif, tout en rendant les identités dans les journaux inutiles pour un acteur de menace.

## Exercice pratique

Lisez les commandes d'exemple suivantes qui utilisent des outils Unix courants comme awk, sort, uniq et grep pour effectuer l'analyse sur les journaux Apache et Nginx.

### Une brève introduction aux outils d'analyse de texte Unix

Voici des exemples de commandes utilisant des outils Unix courants comme `awk`, `sort`, `uniq` et `grep` pour effectuer l'analyse sur les journaux Apache et Nginx.

`awk` est un puissant outil de ligne de commande pour manipuler des fichiers texte dans des systèmes d'exploitation de type Unix. Sa syntaxe est simple. La structure de base d'une commande `awk` est la suivante :

{{< highlight awk >}}
awk 'pattern { action }' file
{{< / highlight >}}

Prenons par exemple le fichier texte suivant (nous l'appellerons exemple.txt) :

```
apple red 5
banana yellow 10
pear green 15
Orange orange 20
```

`awk` analyse le fichier d'entrée ligne par ligne et effectue une action spécifiée pour chaque ligne si le motif correspond. awk divise automatiquement chaque ligne de saisie en champs en fonction des espaces (par défaut). Les champs peuvent être référencés en utilisant $1, $2, etc., où $1 fait référence au premier champ, $2 au second, et ainsi de suite.

Par exemple, pour imprimer la première colonne avec la commande `awk`, nous devons utiliser

{{< highlight awk >}}
awk '{ print $1 }' example.txt
{{< / highlight >}}

Nous pouvons utiliser le filtrage conditionnel. Par exemple, nous voulons imprimer des lignes où la troisième colonne est supérieure à 10

{{< highlight awk >}}
awk '$3 > 10 {print $1, $3}' example.txt
{{< / highlight >}}

Pour utiliser un délimiteur personnalisé avec `awk`, utilisez l'option `-F` suivie du caractère délimiteur. Par exemple, si nous avons un fichier délimité par des virgules, nous pouvons utiliser `-F','` (joindre le caractère délimiteur dans des guillemets simples) pour spécifier une virgule (,) comme délimiteur.

{{< highlight awk >}}
awk -F',' '{print $1, $3}' délimité-par-des-virgules.txt
{{< / highlight >}}


Nous pouvons faire des calculs en utilisant `awk`. Cette commande calcule la somme des valeurs dans le troisième champ sur toutes les lignes et imprime le total à la fin. « END » est un modèle spécial utilisé pour exécuter des instructions une fois que le dernier enregistrement est traité

{{< highlight awk >}}
awk '{total += $3} END {print "Total:", total}' exemple.txt
{{< / highlight >}}

Il y a quelques variables intégrées dans `awk`. Par exemple, `NR` est une variable intégrée dans awk qui représente le numéro d'enregistrement courant. `NR` incrémente de 1 pour chaque ligne lue à partir du fichier ou des fichiers d'entrée.

Si vous souhaitez imprimer des numéros de ligne en plus du contenu de la ligne, vous pouvez utiliser ce qui suit :

{{< highlight awk >}}
awk '{print NR, $0}' example.txt
{{< / highlight >}}

### Exercice pratique 1 : analyse des journaux d'accès Apache

Passez du temps à jouer avec les commandes awk suivantes. Vous pouvez utiliser un journal à partir de votre propre serveur Web ou utiliser des journaux d'exercice, telles que [cette collection](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip).

Indiquez le nombre total de requêtes enregistrées dans le journal d'accès.

{{< highlight bash >}}
cat apache_access.log | wc -l
{{< / highlight >}}

Déterminez les URL les plus fréquemment demandées.

{{< highlight bash >}}
awk '{print $7}' apache_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Cette commande `awk` imprimera la septième colonne de chaque ligne du journal, puis acheminera le résultat de la commande awk précédente dans la commande de tri. La commande sort est utilisée pour trier les lignes de texte par ordre alphabétique ou numérique. Par défaut, la commande effectue le tri par ordre croissant. Après avoir trié le résultat avec la commande sort, la commande `uniq -c` est utilisée pour compter les occurrences de chaque ligne unique dans le résultat trié. La commande `sort -nr` est utilisée pour trier le résultat numériquement (-n) dans l'ordre inverse (-r). Cela signifie que les lignes sont triées en fonction de leurs valeurs numériques, les valeurs les plus élevées apparaissant en premier. La commande `head -5` est utilisée pour afficher les 5 premières lignes de l'entrée.

Découvrez les 5 principales adresses IP faisant des requêtes au serveur.

{{< highlight bash >}}
awk '{print $1}' apache_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Analysez la distribution des méthodes de requête.

{{< highlight bash >}}
awk '{print $6}' apache_access.log | sort | uniq -c
{{< / highlight >}}

### Exercice pratique 2 : analyse des journaux d'accès Nginx

Comptez le nombre total de requêtes dans un journal d'accès Nginx.

{{< highlight bash >}}
cat nginx_access.log | wc -l
{{< / highlight >}}

Identifiez les URL les plus demandées et leurs codes de statut correspondants.

{{< highlight bash >}}
awk '{print $7, $9}' nginx_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Calculez la taille moyenne des requêtes (en octets).

{{< highlight awk >}}
awk '{sum+=$10} END {print "Average request size:", sum/NR, "bytes"}' nginx_access.log
{{< / highlight >}}

Cette commande `awk` calcule la taille moyenne des requêtes en additionnant les valeurs de la 10e colonne (représentant probablement les tailles des requêtes) pour toutes les lignes du fichier `nginx_access.log`. Ensuite, elle divise la somme totale par le nombre de lignes (NR), représentant la taille moyenne de la requête en octets. Enfin, elle imprime le résultat avec un message descriptif.

Assurez-vous que la 10e colonne représente réellement la taille de la requête en octets dans votre fichier `nginx_access.log`, car l'exactitude du calcul dépend de l'exactitude de l'indexation des colonnes.  

Déterminez les 5 principaux agents utilisateurs accédant au serveur.

{{< highlight bash >}}
awk -F'"' '{print $6}' nginx_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Cette commande utilise `awk` pour définir le séparateur de champs (-F) à guillemets doubles ("), puis extrait le 6e champ de chaque ligne du fichier `nginx_access.log`. Cela suppose que les entrées du journal sont formatées de telle manière que l'URL ou le chemin de requête est inclus dans des guillemets doubles. Les URL extraites ou les chemins de requête sont ensuite filtrés pour les trier par ordre alphabétique. `uniq -c` est utilisé pour compter les occurrences de chaque URL ou chemin de requête unique. Le résultat est à nouveau canalisé avec `sort -nr` pour trier les résultats numériquement en ordre décroissant en fonction du nombre.

Enfin, `head -5` est utilisé pour afficher les 5 URL ou chemins de requête les plus fréquents.

Analysez la répartition des requêtes par heure de la journée.

{{< highlight bash >}}
awk '{print $4}' nginx_access.log | cut -c 14-15 | sort | uniq -c
{{< / highlight >}}

La commande `awk` est utilisée pour extraire le 4e champ ($4) de chaque ligne du fichier `access.log`, qui contient généralement l'horodatage.

La commande `cut` est ensuite appliquée pour extraire les caractères 14 à 15 de chaque horodatage, qui correspondent à la portion de l'heure.

Les valeurs de l'heure extraites sont canalisées pour les trier afin de les classer par ordre croissant. `uniq -c` est utilisé pour compter les occurrences de chaque valeur d'heure unique.

Le résultat affiche le nombre d'entrées de journal pour chaque heure dans le fichier journal.

### Exercice pratique 3 : analyse du journal des erreurs (Apache et Nginx)

1. Apache et nginx : Comptez le nombre total d'entrées d'erreur dans le journal.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | wc -l
cat nginx_error.log | grep 'error' | wc -l
{{< / highlight >}}

2. Apache : Identifiez les types d'erreurs les plus courants. `awk '{print $NF}'` lit chaque ligne de données de l'entrée, la divise en champs (séparés par des espaces par défaut), puis imprime la valeur du dernier champ de chaque ligne.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Le nombre au début de chaque ligne indique combien de fois une erreur particulière s'est produite dans le journal. Dans ce cas, "`2047`" signifie que l'erreur avec le dernier champ "`757`" s'est produite 2047 fois.

Le dernier champ représente différentes choses dans chaque ligne. Il pourrait s'agir d'un chemin de fichier, d'une action spécifique ou d'un autre identifiant lié à l'erreur. Par exemple, "`757`" ou "`154`" pourraient être des codes d'erreur ou des identifiants uniques, tandis que "`/home/mysite/public_html/new/wp-content/plugins/woocommerce/includes/data-stores/abstract-wc-order-data-store-cpt.php:100`" pourrait être un chemin de fichier et un numéro de ligne où l'erreur s'est produite.

3. nginx : Déterminez les 5 principales adresses IP qui génèrent des erreurs.

{{< highlight bash >}}
cat nginx_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

4. Apache : Analysez la distribution des erreurs par date ou heure.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{print $1}' | sort | uniq -c
{{< / highlight >}}

5. Apache : Examinez les erreurs récurrentes et proposez des solutions potentielles. {$1=""; $2=""; $3="";} : cette partie de la commande awk définit les trois premiers champs (date, heure et informations de fuseau horaire) sur des chaînes vides.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{$1=""; $2=""; $3=""; print}' | sort | uniq -c | sort -nr | head -10
{{< / highlight >}}

### Une introduction aux expressions rationnelles et leur utilisation pour analyser un journal

Pour cet exercice, nous utilisons des fichiers journaux de [cette collection](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip) (même collection que les autres fichiers de cette section d'exercice)

Dans cette tâche, nous allons utiliser des expressions régulières. Les expressions régulières (regex) sont de puissants outils de recherche qui vous aident à trouver des modèles spécifiques dans les données. Par exemple, si vous enquêtez sur un trafic réseau suspect et que vous savez que les requêtes malveillantes contiennent souvent certains modèles de caractères, vous pouvez utiliser regex pour rechercher dans les journaux ou les captures de trafic pour trouver ces requêtes. Regex vous permet de définir des modèles de recherche flexibles. Par exemple :


**\[a-z\] range** - Correspond à un caractère dans la plage « a » à « z ». Sensible à la casse.


Par ex., \[g-s\] correspond à un caractère compris entre « g » et « s »


abcdef**ghijklmnopqrs**tuvwxyz


**\[A-Z\] range** - Correspond à un caractère dans la plage « A » à « Z ». Sensible à la casse.

**\[0-9\] range** - Correspond à un caractère dans la plage « 0 » à « 9 ». Sensible à la casse.


Nous pouvons également utiliser des **quantificateurs** pour correspondre à la quantité spécifiée du jeton précédent. {1,3} correspondra à 1 à 3. {3} correspondra exactement à 3. {3,} correspondra à 3 ou plus.


\[a-d\]\{3\} correspond à n'importe quelle séquence de trois caractères exactement dans la plage donnée, chacun pouvant être une lettre minuscule de « a » à « d ». Donc, cela correspondrait à des chaînes comme « abc », « bda », « cad », etc. 


Certains caractères ont une signification particulière dans les regex :

| Symbole | Nom                            | Description                                      |
|---------|--------------------------------|--------------------------------------------------|
| \       | Barre oblique inversée         | Utilisé pour échapper (faire passer) un caractère spécial        |
| ^       | Accent circonflexe             | Début d'une chaîne                               |
| $       | Signe dollar                   | Fin d'une chaîne                                 |
| .       | Point                          | Correspond à n'importe quel caractère unique     |
| \|      | Barre verticale ou pipe        | Correspond au caractère/groupe précédent OU suivant |
| ?       | Point d'interrogation          | Correspond à zéro ou un du précédent             |
| *       | Astérisque ou étoile           | Correspond à zéro, un ou plusieurs du précédent  |
| +       | Signe plus                     | Correspond à un ou plusieurs du précédent        |
| ( )     | Parenthèses ouvrantes et fermantes | Regroupe des caractères                    |
| [ ]     | Crochets ouvrants et fermants  | Correspond à une plage de caractères             |
| { }     | Accolades ouvrantes et fermantes | Correspond à un nombre spécifié d'occurrences du précédent |

Dans notre tâche, nous utiliserons la barre oblique inverse pour faire passer des caractères spéciaux.

Pour en savoir plus sur les regex : [https://fr.wikipedia.org/wiki/Expression_r%C3%A9guli%C3%A8re](https://en.wikipedia.org/wiki/Regular_expression)

Si vous vérifiez le journal d'accès nginx fourni, vous pouvez voir ces types de lignes :

```
181.214.166.113 - - [15/Feb/2024:15:05:19 -0500] "[L\x9E\x804\xD9-\xFB&\xA3\x1F\x9C\x19\x95\x12\x8F\x0C\x89\x05\x81" 400 181 "-" "-"
45.95.169.184 - - [15/Feb/2024:15:49:27 -0500] "\x10 \x00\x00BBBB\xBA\x8C\xC1\xABDAAA" 400 181 "-" "-"
```

Comme vous pouvez le voir, les deux lignes contiennent `\x` suivi exactement de deux caractères qui correspondent à la notation hexadécimale (ils utilisent donc les chiffres 0-9 et les lettres A à F), comme \\x9C, \\x10, \\xBA, etc. Pour filtrer toutes les lignes, nous devons utiliser le modèle '`\\x[a-fA-F0-9]{3}`' où `\\x[a-fA-F0-9]` est notre jeton, `{3}` est un quantificateur.

Nous utiliserons la commande `grep` pour rechercher le motif spécifié dans le texte. Par exemple :

`grep 'abcd'` filtrera toutes les lignes contenant la chaîne « abcd ».

L'option « `-E` » de la commande `grep` permet d'utiliser des expressions régulières étendues pour la correspondance de modèle `grep -E 'abcd\\[0-9]{2}'` pour le filtrage de texte comme `abcd\34, abcd\47`, etc.

#### Exercice pratique 4 : utiliser des expressions régulières (regex)

Pour ces exercices, nous utilisons les fichiers journaux nginx de [cette collection](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip) (même collection que les autres fichiers de cette section d'exercice)

1. Utilisez grep et l'expression régulière ` '\\x[a-fA-F0-9]{32}'` [regex](https://en.wikipedia.org/wiki/Regular_expression) pour filtrer les requêtes de nginx access.log contenant une charge utile suspecte. L'expression régulière `'\x[a-fA-F0-9]{3}'` correspond à une séquence commençant par '`\x`' suivie exactement de trois caractères hexadécimaux (0-9, a-f, ou A-F). Combien y a-t-il de lignes ?

{{< question title="Réponse" >}}
Bonne réponse : 131 lignes

Commande(s) à exécuter : `grep -E '\\x[a-fA-F0-9]{3}' nginx_access.log|wc|awk '{print $1}' `
{{< /question >}}

2. En utilisant le même filtre, déterminez quelle adresse IP fait le plus de requêtes

{{< question title="Réponse" >}}
Bonne réponse : 222.186.13.131 19 lignes

Commande(s) à exécuter : `grep -E '\\x[a-fA-F0-9]{3}' nginx_access.log|sort|awk '{print $1}'| sort | uniq -c | sort -nr`
{{< /question >}}

3. Examinez `error.log` en exécutant `more error.log`. Vous pouvez quitter cette commande avec ctrl+c ou appuyer sur la touche « q » pour retourner à l'invite de commande. Exclusion des erreurs « PHP Notice ». Quels types d'erreurs critiques pouvez-vous trouver dans le journal ?

{{< question title="Réponse" >}}
Bonne réponse : erreur d'établissement de liaison SSL

Commande(s) à exécuter :

{{< highlight bash >}}
more nginx_error.log
cat nginx_error.log|grep -v "PHP"|grep crit
{{< / highlight >}}
{{< /question >}}

4. Excluez les erreurs PHP du fichier error.log et trouvez les lignes où les requêtes sont refusées en raison des règles de sécurité. Quel fichier sensible a été demandé ?

{{< question title="Réponse" >}}
Bonne réponse : `.git/config`

Commande(s) à exécuter : `cat nginx_error.log|grep -v "PHP"|grep forbidden`
{{< /question >}}

## Contrôle de compétence

Ce contrôle de compétences sera beaucoup plus facile si vous avez d'abord terminé l'exercice ci-dessus.

Vous recevez un journal d'accès nginx à partir d'un site Web attaqué que devez examiner, que vous pouvez {{< fontawesome "solid/download" >}} [télécharger ici](https://github.com/OpenInternet/Infuse/blob/main/web-app-hardening-skill-check.log).

Localisez un chemin d'accès suspect qui est ciblé, extrayez les adresses IP qui envoient des requêtes suspectes et découvrez dans quels pays se trouvent ces adresses IP (vous pouvez utiliser les bases de données geoIP décrites plus en détail dans le parcours d'apprentissage sur les infrastructures malveillantes). Vous pouvez utiliser des outils CLI standard comme awk, grep, sort et uniq. Pour connaître les numéros AS et les pays, nous vous recommandons d'utiliser les services de recherche en ligne appropriés.

_Conseil :_ ipinfo.io fournit un moyen pratique de rechercher les détails des adresses IP, vous pouvez utiliser curl pour les récupérer.

## Ressources d'apprentissage

{{% resource title="Fichiers journaux - Apache" description="Aperçu de la lecture des fichiers journaux dans le serveur Web Apache" languages="Anglais" cost="Gratuit" url="https://httpd.apache.org/docs/2.4/logs.html#accesslog" %}}
{{% resource title="Comprendre le journal d'accès et d'erreurs Apache, Ressource 1" description="Deux autres articles sur la façon de lire les journaux du serveur Web Apache" languages="Anglais" cost="Gratuit" url="https://www.keycdn.com/support/apache-access-log" %}}
{{% resource title="Comprendre le journal d'accès et d'erreurs Apache, Ressource 2" description="Deux autres articles sur la façon de lire les journaux du serveur Web Apache" languages="Anglais" cost="Gratuit" url="https://www.dataset.com/blog/apache-error-log-detail/" %}}
{{% resource title="Journalisation côté serveur" description="Une analyse des journaux dans le serveur Microsoft IIS" languages="Anglais" cost="Gratuit" url="https://learn.microsoft.com/fr-fr/windows/win32/http/server-side-logging-in-http-version-2-0" %}}
{{% resource title="Journaux d'erreurs IIS et autres moyens de trouver les requêtes ASP.Net ayant échoué" description="Un autre regard sur les journaux IIS et comment nous pouvons rechercher des erreurs d'application" languages="Anglais" cost="Gratuit" url="https://stackify.com/beyond-iis-logs-find-failed-iis-asp-net-requests/" %}}
{{% resource title="Configuration de la journalisation sur nginx" description="Documentation par le serveur web NGINX sur la façon de configurer et de travailler avec les journaux" languages="Anglais" cost="Gratuit" url="https://docs.nginx.com/nginx/admin-guide/monitoring/logging/" %}}
{{% resource title="Un guide des journaux NGINX" description="Un aperçu des différents journaux NGINX et de leurs formats" languages="Anglais" cost="Gratuit" url="https://trunc.org/learning/nginx-log-analysis" %}}
{{% resource title="Journal de sécurité : meilleures pratiques de journalisation et de gestion" description="Une analyse des moments où les journaux sont utiles, comment nous pouvons les analyser et quelles politiques nous pouvons créer autour d'eux" languages="Anglais" cost="Gratuit" url="https://www.dnsstuff.com/security-log-best-practices" %}}
{{% resource title="Aide-mémoire et vocabulaire de l'OWASP sur la journalisation, Ressource 1" description="Un guide de l'OWASP sur l'utilité des journaux et sur la façon dont nous devrions les analyser ainsi qu'un vocabulaire standard à leur sujet" languages="Anglais" cost="Gratuit" url="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html" %}}
{{% resource title="Aide-mémoire et vocabulaire de l'OWASP sur la journalisation, Ressource 2" description="Un guide de l'OWASP sur l'utilité des journaux et sur la façon dont nous devrions les analyser ainsi qu'un vocabulaire standard à leur sujet" languages="Anglais" cost="Gratuit" url="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html" %}}
{{% resource title="Gardez les données sensibles hors de vos journaux : 9 meilleures pratiques" description="Une journalisation approfondie peut également inclure des données sensibles, ce qui pourrait exposer les utilisateurs à des risques. Ce guide examine comment nous pouvons adapter nos pratiques de journalisation pour exclure les données sensibles des journaux." languages="Anglais" cost="Gratuit" url="https://www.skyflow.com/post/how-to-keep-sensitive-data-out-of-your-logs-nine-best-practices" %}}
