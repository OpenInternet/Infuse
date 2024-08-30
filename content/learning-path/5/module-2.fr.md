+++
style = "module"
weight = 2
title = "Data Validation"
description = "Chaque application web accepte et traite des entrées non fiables. Ici, nous apprenons comment découvrir les vulnérabilités courantes qui en tirent parti."
+++

## Cas d'utilisation

D'une manière ou d'une autre, chaque application Web accepte et traite des entrées non fiables. Ces entrées proviennent généralement des utilisateurs finaux et de leurs navigateurs, mais peuvent également provenir d'autres sites Web ou systèmes backend. Selon l'endroit où ces informations circulent, le traitement des données peut avoir des effets indésirables sur le site Web ou ses utilisateurs.

## Objectifs

Après avoir terminé ce sous-thème, les participants seront en mesure de trouver des façons dont le format ou la structure des données envoyées à un site Web peut exposer et exploiter les vulnérabilités.

Ils devraient également être en mesure de trouver et d'exploiter les types de vulnérabilités de validation des données suivants :

- Cross-site scripting
- Injection SQL
- Traversée de répertoires
- Injection de commandes
- Falsification de requête côté serveur
- Injection XXE
- Injection NoSQL

--- 
## Section Principale

### Quelles sont les vulnérabilités de validation des données ?

Comme vous vous en souvenez peut-être, les vulnérabilités de validation des données peuvent prendre de nombreuses formes. Dans les applications Web, elles sont généralement déclenchées par la présence de certains caractères lorsque les données sont interprétées dans un contexte changeant. Par exemple, les caractères &lt; ou &gt; peuvent être inoffensifs dans le code d'une application, mais peuvent déclencher une vulnérabilité de script intersite lorsqu'ils sont placés dans une page Web. Les caractères de guillemets simples ou d'espace peuvent être inoffensifs dans une page Web ou dans le code d'une application, mais peuvent déclencher une vulnérabilité d'injection SQL lorsqu'ils sont inclus dans une requête de base de données. Généralement, pour chaque système impliqué dans une application Web (HTML, JavaScript, SQL, systèmes de fichiers, shell unix, etc.), il existe un type différent de vulnérabilité de validation de données.

#### Cross-site scripting

Le cross-site scripting (généralement appelé XSS) est généralement le type de vulnérabilité de validation de données le plus facile à utiliser. Les entrées et les sorties sont visibles pour le testeur qui nécessite uniquement des connaissances en HTML et JavaScript. En outre, ce type également extrêmement commun [et se retrouve dans 1 site Web sur 5 testés par une grande entreprise d'évaluation de sites Web](https://venturebeat.com/security/report-50-of-all-web-applications-were-vulnerable-to-attacks-in-2021/). C'est pourquoi nous allons commencer par là.

Accédez au thème [XSS de PortSwigger Academy](https://portswigger.net/web-security/cross-site-scripting) et complétez la lecture et les exercices pratiques.

##### Test XSS efficace

Le plus commun lorsqu'il s'agit de faire un test XSS consiste à saisir quelque chose comme : `"><script>alert('xss')</script>` dans différents paramètres de requête, et d'attendre une fenêtre contextuelle JavaScript lorsque la page est renvoyée. Cela pose deux problèmes.

Le premier problème est que dans un site qui comprend beaucoup de vulnérabilités XSS stockées, vous pouvez finir par cliquer sur plusieurs fenêtres contextuelles JavaScript sur chaque page que vous visitez. Cela s'avère ennuyeux, gênant et cela ralentira considérablement vos tests.

Le deuxième problème est que si vous utilisez la même chaîne pour chaque entrée, vous ne saurez pas immédiatement quelles entrées correspondent à quelles sorties. Si vous avez un XSS stocké qui apparaît dans plusieurs parties du site, vous pouvez tomber sur votre chaîne de test XSS quelque part sur le site, mais sans savoir d'où il vient.

Au lieu de cela, vous pourriez faire quelque chose d'un peu plus subtil et informatif. Une approche consiste à utiliser une chaîne de test comme : `"><i>xss test - pagename - fieldname</i><q z="` où `pagename` et `fieldname` sont la page et le paramètre que vous testez. Si vous voyez cette chaîne en italique dans le site, cela signifie qu'il y a un XSS et vous saurez d'où vient l'entrée.

##### CORS

Un sujet connexe aux XSS concerne les vulnérabilités liées au partage de ressources d'origine croisée. Vous vous êtes peut-être demandé pourquoi le code JavaScript en cours d'exécution sur un site ne peut pas interagir avec un autre site qu'un utilisateur ouvre dans son navigateur (par exemple, dans une autre fenêtre du navigateur, un autre onglet ou même dans un iframe). La raison est que tout JavaScript dans le navigateur est associé à une [_origine_](https://en.wikipedia.org/wiki/Same-origin_policy#Origin_determination_rules), qui est approximativement similaire à un site Web. Le JavaScript sur une origine ne peut pas interagir avec des pages Web ou des données sur une autre origine.

Il y a des exceptions à cette règle. La plus courante est le [partage de ressources d'origine croisée (cross-origin resource sharing, ou « CORS »)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), qui permet à un site de permettre au JavaScript d'autres sites d'interagir avec lui. Certains exemples sont très utiles, par exemple en permettant à JavaScript sur [www.exemple.com](http://www.example.com) d'interagir avec api.exemple.com. Une configuration incorrecte du CORS peut avoir l'effet regrettable de permettre aux cybercriminels de contourner certains contrôles de sécurité du site. Les vulnérabilités liées au CORS ne sont pas des vulnérabilités de validation de données, mais il est logique d'en apprendre davantage à leur sujet après avoir découvert les XSS.

Accédez au thème [CORS de PortSwigger Academy](https://portswigger.net/web-security/cors) et complétez la lecture et les exercices pratiques.

#### Injection SQL

L'injection SQL (souvent abrégée en SQLi) a la propriété d'être relativement courante dans les applications Web, et entraîne généralement une compromission complète de l'application et de ses données. Bien que l'injection soit un peu plus difficile à trouver et à exploiter que les XSS, quelques techniques permettent de rendre l'identification et la démonstration de l'exploitabilité assez fiables. Compte tenu de son importance, c'est la prochaine classe de vulnérabilité sur laquelle nous nous concentrerons.

Accédez au thème [SQLi de PortSwigger Academy](https://portswigger.net/web-security/sql-injection) et complétez la lecture et les exercices pratiques.

Une fois que vous avez terminé les exercices pratiques, voici quelques conseils pour identifier le SQLi de manière sûre et fiable.

##### Test des paramètres de chaîne

Une façon courante de tester le SQLi est de passer par un site en ajoutant ' or 1=1;-- à la fin des paramètres. Cela s'avère sous-optimal pour un certain nombre de raisons. La première concerne les instructions « update ». Considérez le code SQL suivant :

{{< highlight sql >}}
update users set password='Password1!' where username='alice'
{{< / highlight >}}

Que se passe-t-il si, pour le nom d'utilisateur, vous passez alice' or 1=1;-- au lieu de alice' ?

{{< highlight sql >}}
update users set password='Password1!' where username='alice' or 1=1;--'
{{< / highlight >}}

Oh non ! Maintenant, tous les utilisateurs de la base de données ont le même mot de passe. Vous ne pouvez jamais savoir (sauf si vous avez _très_ soigneusement examiné le code source) où vos entrées vont aller. C'est pourquoi l'utilisation d'instructions _or_ lorsque vous essayez de trouver des SQLi peut s'avérer dangereuse.

Même si vous n'écrasez pas la base de données avec cette chaîne de test, elle peut comprendre d'autres problèmes. Envisagez une requête sur plusieurs lignes :

{{< highlight sql >}}
select *
  from comments
 where username = 'alice'
   and draft=0
{{< / highlight >}}

Si vous passez le paramètre de nom d'utilisateur `alice` or `1=1;--`, la requête résultante sera :

{{< highlight sql >}}
select *
  from comments
 where username = 'alice' or 1=1;--'
   and draft=0
{{< / highlight >}}

Notez le point-virgule embêtant. Il fait en sorte que la base de données interprète d'abord la requête en tant que requête de sélection (_select_ _\*_ _from_ comments _where_ username _\=_ 'alice' _or_ 1_\=_1;), et ensuite en tant que requête _and_ (_and_ draft_\=_0). Le problème est qu'il n'y a aucune requête « and », et cela entraînera donc une erreur. Cela peut également entraîner une erreur pour d'autres raisons, selon la base de données. Si l'application Web donne la même réponse pour une erreur de base de données que pour l'absence de donnée (cela devrait être le cas), alors vous ne saurez pas qu'il y a une SQLi dans le paramètre du nom d'utilisateur.

La bonne chose à faire lorsque vous testez une SQLi dans un paramètre de chaîne est de créer un paramètre de test qui fonctionne indépendamment de la requête dans laquelle il se trouve. La meilleure chose à faire est d'utiliser deux requêtes, une qui entraînera le retour des données d'origine à partir de la requête et une autre qui n'entraînera aucun résultat à partir de la requête. Vous pouvez ensuite comparer les trois réponses (originale, test 1 et test 2). Si l'originale et le test 1 renvoient la même réponse, et que le test 2 renvoie une réponse différente, vous avez identifié une SQLi. Voici un ensemble de chaînes que vous pouvez utiliser :

Pour le test 1, ajoutez ce qui suit au paramètre : `' and 'a' like '%a`

Pour le test 2, ajoutez ce qui suit au paramètre : `' and 'a' like '%b`

Voici quelques exemples de requêtes avec ces paramètres :

{{< highlight sql >}}
select * from comments where username = 'alice' and 'a' like '%a'
select * from comments where username = 'alice' and 'a' like '%b'
{{< / highlight >}}

Notez que la première requête retournera les mêmes résultats que si alice avait été passé comme paramètre, et la seconde ne retournera aucune ligne. Il n'y a donc aucun risque de catastrophe s'il y a une instruction injectable « update » ou « delete ». Notez également que la structure de la requête est peu perturbée, les tests fonctionneront même dans les requêtes de plusieurs lignes.

Vous vous demandez peut-être pourquoi les exemples utilisent l'opérateur _like_ au lieu de _\=_. C'est parce que la requête dans laquelle vous injectez du SQL peut utiliser l'opération « like ». Envisagez une requête de recherche de document :

{{< highlight sql >}}
select * from documents where title like '%user text%'
{{< / highlight >}}

L'opération like permet l'utilisation d'opérateurs génériques, généralement le signe de pourcentage. La requête ci-dessus correspondra à tous les documents qui contiennent la chaîne « user text » n'importe où dans leur titre : le début, le milieu ou la fin. Si nous avions simplement utilisé quelque chose comme ' and 'a'='a dans notre injection, la requête de test 1 serait :

{{< highlight sql >}}
select * from documents where title like '%user text' and 'a'='a%'
{{< / highlight >}}

Cela ne renverra aucune ligne, puisque « a » n'est jamais _égal à_ « a% ». Si nous utilisons la requête de test 1 ci-dessus, la requête serait :

{{< highlight sql >}}
select * from documents where title like '%user text' and 'a' like 'a%'
{{< / highlight >}}

Bien qu'ils ne soient pas égaux, « a » est _similaire_ à « a% ». Ainsi, les requêtes de test 1 et de test 2 ci-dessus devraient fonctionner dans presque toutes les situations basées sur des chaînes. Notez que si vous testez une fonctionnalité de recherche, vous pouvez également essayer une chaîne de test 1 supplémentaire : %' and 'a' like '%a. Notez que dans les requêtes ci-dessus, la recherche originale est légèrement modifiée. Il manque le % après le texte de l'utilisateur. Si vous pensez qu'une opération « like » est en cours d'utilisation, cette chaîne de test 1 devrait la compenser.

##### Test des paramètres numériques

Parfois, lorsque le navigateur transmet une valeur numérique au serveur Web, le serveur l'inclut dans une requête SQL sous forme de chaîne. Cependant, elle est parfois incluse comme une valeur numérique. Généralement, la requête SQL pour une simple recherche d'un paramètre numérique ressemblera à ça :

{{< highlight sql >}}
select * from stories where story_id=5
{{< / highlight >}}

Évidemment, l'envoi d'un story_id de `5' and '1' like '1` ne fonctionnera pas, en raison d'une erreur de syntaxe. Essayez plutôt d'envoyer deux requêtes, une avec un story_id de `5`, et une autre avec un story_id de `6-1`. Si la deuxième ne donne aucun résultat, une erreur ou une histoire différente de celle attendue par la requête avec un story_id de 5, il n'y a aucun signe de SQLi. Cependant, si le passage d'un story_id de 6-1 donne la même réponse qu'un story_id de 5, il s'agit d'un signe évident de SQLi. La requête ressemblera probablement à :

{{< highlight sql >}}
select * from stories where story_id=6-1
{{< / highlight >}}

Dans cet exemple, le moteur de base de données évalue 6-1 en tant que code et récupère l'histoire dont l'ID est égal à 5. À partir de là, vous pouvez procéder à l'exploitation.

Bien sûr, vous ne pouvez jamais savoir exactement ce qu'une application fait avec votre entrée, ou comment celle-ci est utilisée, mais les conseils ci-dessus devraient améliorer considérablement la sécurité et l'efficacité de vos recherches de SQLi.

#### Traversée de répertoires

La traversée de répertoires se produit généralement dans les sites Web qui gèrent des fichiers fournis par l'utilisateur ou des interfaces administratives, mais peut se produire partout où l'application Web côté serveur ouvre elle-même des fichiers. Selon ce que le serveur fait avec les fichiers en question, l'impact peut aller de la divulgation du code source à la prise de contrôle complète du serveur Web par l'autre. Parmi les applications Web modernes, les endroits les plus courants pour trouver des vulnérabilités de traversée de répertoires sont les logiciels de blogs et d'autres systèmes de gestion de contenu, qui exposent particulièrement les journalistes indépendants et les petites organisations de médias à un risque important.

Accédez au thème de la [traversée de répertoires de PortSwigger Academy](https://portswigger.net/web-security/file-path-traversal) et complétez la lecture et les exercices pratiques.

#### Injection de commandes

Bien que l'injection de commande soit relativement rare dans les applications Web modernes, elle résulte presque universellement d'une compromission complète de l'application Web dans le cas où elle est trouvée et exploitée. Elle apparaît généralement dans les interfaces de gestion et, dans une moindre mesure, dans les systèmes de gestion de contenu.

Accédez au thème de l'[injection de commande de PortSwigger Academy](https://portswigger.net/web-security/os-command-injection) et complétez la lecture et les exercices pratiques.

#### Falsification de requête côté serveur

L'idée générale derrière la falsification de requête côté serveur (généralement abrégée en SSRF) veut qu'un cybercriminel peut provoquer l'envoi par le serveur de l'application Web d'une requête HTTP à un autre serveur. L'application peut parfois afficher la réponse au client. Pendant des années, la falsification de requêtes côté serveur a été considérée comme une vulnérabilité peu intéressante. Lorsqu'elle a été découverte, il était difficile de l'exploiter de manière significative. Cependant, avec l'avènement du cloud computing, la SSRF est soudainement devenue un problème critique.

Dans les environnements cloud, les administrateurs peuvent eux-mêmes attribuer des autorisations aux serveurs virtuels. Cela est généralement utilisé pour accorder l'accès aux compartiments de stockage de données, aux bases de données, aux services réseau, etc. Habituellement, les ressources en question sont accessibles sur Internet, ce qui fait des autorisations du serveur le seul contrôle d'accès.

La façon dont ces autorisations de serveur (parfois appelées identité d'instance, clés de machine, clés de compte de service, identités gérées, etc.) fonctionnent est en fait assez simple. Dans un environnement cloud, les serveurs sont des machines virtuelles exécutées sur du matériel physique. Un service Web est exécuté sur le serveur physique pour accepter uniquement les connexions réseau des machines virtuelles exécutées sur le serveur lui-même. Lorsqu'il reçoit une requête, il recherche la machine virtuelle via l'adresse IP et récupère des informations sur la machine virtuelle, y compris le rôle du client et les autorisations associées à la machine virtuelle. Il génère ensuite des informations d'identification cloud pour ce rôle et les renvoie dans la réponse. Les logiciels de la machine virtuelle peuvent ensuite utiliser ces informations d'identification pour s'authentifier auprès d'autres services cloud.

Si un cybercriminel peut faire en sorte qu'une application Web hébergée dans le cloud envoie des requêtes HTTP arbitraires et renvoie les réponses, il arrive fréquemment que le cybercriminel puisse voir les instances cloud du serveur. Si cela se produit, le cybercriminel peut usurper l'identité du serveur Web. La [violation de 2019 de Capital One](https://blog.appsecco.com/an-ssrf-privileged-aws-keys-and-the-capital-one-breach-4c3c2cded3af) qui a entraîné la compromission de renseignements sensibles de plus de 100 millions de personnes en est un exemple.

Accédez au thème [SSRF de PortSwigger Academy](https://portswigger.net/web-security/ssrf) et complétez la lecture et les exercices pratiques.

#### Injection NoSQL

Traditionnellement, les applications Web utilisaient des bases de données SQL pour stocker et récupérer leurs données. Pour de nombreuses applications Web, les développeurs préfèrent les bases de données NoSQL (p. ex., MongoDB, bien qu'il y en ait beaucoup d'autres). Ces bases de données NoSQL utilisent une syntaxe de requête différente de SQL (ce n'est pas surprenant, vu le nom), mais les concepts généraux pour l'injection NoSQL sont similaires à ceux de l'injection SQL. Cependant, les détails sont très différents

Accédez au thème de l'[injection NoSQL de PortSwigger Academy](https://portswigger.net/web-security/nosql-injection) et complétez la lecture et les exercices pratiques.

#### Injection XXE

L'injection XXE utilise la capacité des fichiers XML à faire référence à d'autres fichiers. Les applications qui permettent aux utilisateurs de contrôler les données XML traitées par l'application peuvent s'avérer vulnérables. L'exploitation permet généralement aux cybercriminels de lire des fichiers arbitraires à partir du serveur Web et peut également permettre des attaques par déni de service et, dans de rares cas, l'exécution de code à distance. Heureusement pour les défenseurs, la plupart des applications Web ne traitent pas de contenu XML contrôlable par l'utilisateur.

Accédez au thème de l'[injection XXE de PortSwigger Academy](https://portswigger.net/web-security/xxe) et complétez la lecture et les exercices pratiques.

### Contrôle de compétence

PortSwigger Academy propose une série d'exercices pratiques que vous pouvez utiliser pour tester et valider vos compétences. Pour chacun des sujets suivants, remplissez un ou trois des exercices pratiques de niveau « praticien » :

- [Cross-site scripting](https://portswigger.net/web-security/all-labs#cross-site-scripting)
- [Cross-origin Resource Sharing](https://portswigger.net/web-security/all-labs#cross-origin-resource-sharing-cors)
- [Injection SQL](https://portswigger.net/web-security/all-labs#sql-injection)
- [Traversée de répertoires](https://portswigger.net/web-security/all-labs#path-traversal)
- [Injection de commande OS](https://portswigger.net/web-security/all-labs#os-command-injection)
- [Injection NoSQL](https://portswigger.net/web-security/all-labs#nosql-injection)
- [Injection XXE](https://portswigger.net/web-security/all-labs#xml-external-entity-xxe-injection)

Si vous travaillez avec un pair ou un mentor, expliquez-lui comment chaque attaque fonctionne et comment vous pourriez trouver et démontrer l'exploitabilité de vulnérabilités similaires sur un site que vous avez testé.

## Ressources d'apprentissage

{{% resource title="Rapport : 50 % de toutes les applications Web étaient vulnérables aux attaques en 2021" description="Un résumé d'un rapport sur le nombre d'applications Web majeures vulnérables aux attaques similaires à celles que nous avons décrites dans ces parcours d'apprentissage" languages="Anglais" cost="Gratuit" url="https://venturebeat.com/security/report-50-of-all-web-applications-were-vulnerable-to-attacks-in-2021/" %}}
{{% resource title="Aperçu de la politique de même origine et du partage des ressources entre origines" description="Introduction aux deux sujets qui les aborde de façon modérément approfondie" languages="Multiple" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Same-origin_policy <br> https://fr.wikipedia.org/wiki/Cross-origin_resource_sharing" %}}
{{% resource title="Une SSRF, des clés AWS privilégiées et la faille Capital One" description="Un aperçu d'une violation d'une grande institution financière par un bug SSRF ayant eu lieu en 2019" languages="Anglais" cost="Gratuit" url="https://blog.appsecco.com/an-ssrf-privileged-aws-keys-and-the-capital-one-breach-4c3c2cded3af" %}}