+++
style = "module"
weight = 7
title = "Détection automatique des vulnérabilités"
description = "Dans les sous-thèmes précédents, nous avons vu comment découvrir les vulnérabilités manuellement. Ici, nous explorons les outils qui peuvent aider à automatiser ce processus."
+++

## Cas d'utilisation

Ce parcours d'apprentissage se concentre sur la découverte manuelle des vulnérabilités dans les applications Web. Cette compétence est essentielle pour comprendre les vulnérabilités et vous donne également les outils permettant de les trouver sur n'importe quel site. Cependant, il existe de nombreux outils qui peuvent contribuer à la découverte et à l'exploitation des vulnérabilités dans les applications Web. Ces outils ont à la fois des avantages et des inconvénients, et sont mieux utilisés en conjonction avec des tests manuels. Ce sous-thème passe en revue un certain nombre d'outils disponibles gratuitement et la façon de les utiliser efficacement.

## Objectifs

Après avoir terminé ce sous-thème, les formateurs et formatrices sauront comment et quand utiliser adéquatement divers scanners de vulnérabilité d'applications Web, notamment :

- ZAP scanner
- sqlmap
- WPScan CLI

---
### Section Principale

Ce sous-thème explore trois classes d'outils d'automatisation d'applications Web. Il discutera de ce qu'ils permettent de réaliser, de ce qu'ils font efficacement, de ce qu'ils ne font pas efficacement, et de la façon d'en tirer le meilleur parti. Nous allons diviser l'espace en trois grandes catégories :

- Testeurs automatiques d'applications Web
- Outils d'exploitation
- Scanners de vulnérabilités des applications Web

### Testeurs automatiques d'applications Web

Cette première catégorie est constituée d'outils qui réalisent la même chose que les humains pour trouver de nouvelles vulnérabilités dans les applications Web. Ils parcourent le site, trouvent des entrées, envoient des données malveillantes dans ces entrées et tentent de détecter si ces données ont déclenché une vulnérabilité. Un exemple de ce type de scanner d'applications Web est ZAP de SSP, mais il en existe de nombreux autres, y compris le scanner Burp Pro, HCL AppScan, etc.

En règle générale, ces outils fonctionnent en effectuant d'abord une indexation « [spidering](https://en.wikipedia.org/wiki/Web_crawler) » sur le site Web cible, où ils suivront chaque lien sur chaque page et tenteront de construire une carte complète du site. Ensuite, ils trouveront chaque paramètre qui sera envoyé au serveur, et remplaceront ce paramètre par diverses substitutions « [fuzz](https://en.wikipedia.org/wiki/Fuzzing) ». Lorsque chaque réponse revient, le scanner recherche les fonctionnalités qui indiquent une attaque réussie. Par exemple, le moteur d'analyse peut remplacer un paramètre par <code>&lt;script><em>var</em> xyz<em>=</em>"abc";&lt;/script></code>. Lorsque la réponse HTTP est renvoyée, le scanner analyse le code HTML des pages et s'il voit cet élément de script comme un bloc JavaScript dans la page, il sait que l'entrée est vulnérable au XSS.

#### Points forts du scanner

Les utilisateurs utilisent des scanners d'applications Web pour de bonnes raisons. Ils permettent de trouver des vulnérabilités rapidement et efficacement. Les testeurs de sécurité d'applications Web expérimentés utiliseront des scanners dans le cadre de leurs évaluations, malgré leurs années d'expérience. Il y a certaines choses pour lesquelles les scanners d'applications Web sont très utiles.

Le principal atout de ces outils est de trouver des vulnérabilités liées à la validation des données. Les scanners sont excellents pour trouver des problèmes de validation de données courants comme XSS et SQLi, mais aussi des problèmes plus obscurs comme les injections LDAP, XSLT, etc. Les raisons sont simples :

- Les scanners ne se fatiguent pas et ne s'ennuient pas, ils peuvent soumettre des milliers de requêtes et ne pas « perdre le fil ».
- Les scanners peuvent essayer toutes les entrées possibles pour lesquelles ils sont programmés, y compris les en-têtes de référent HTTP, les cookies, les paramètres supplémentaires ajoutés arbitrairement aux extrémités des URL, etc.
- Les scanners disposent d'énormes bibliothèques de tests pour essayer de nombreuses permutations de chaque attaque potentielle
- Les vulnérabilités de validation des données sont généralement assez faciles à reconnaître, avec une simple correspondance de modèle ou une analyse comportementale facile à détecter par programme.

Certains scanners utilisent même des chaînes de fuzz uniques pour chaque entrée, de sorte qu'ils peuvent détecter les entrées saisies à un endroit et affichées à un autre. Généralement, un scanner correctement configuré devrait trouver plus de problèmes de validation de données en moins de temps qu'un humain hautement qualifié.

Un autre domaine dans lequel les scanners excellent est celui de trouver des problèmes de configuration, en particulier ceux qui existent dans un petit sous-ensemble du site. Si un site utilise des jetons CSRF sur tous ses formulaires, mais que les développeurs les ont oubliés dans une section du site, un testeur humain sera susceptible de négliger l'erreur. En revanche, un scanner trouvera et signalera certainement le jeton manquant. Comme dans le cas de la validation des données, les scanners disposent d'énormes batteries de tests qu'ils exécutent à chaque requête et réponse.

#### Faiblesses des scanners

Malgré leurs atouts, les scanners ont également de multiples faiblesses. Dans certains cas, ils peuvent même être inappropriés pour tester certains sites. Voici quelques-uns des plus gros problèmes liés aux scanners d'applications Web.

##### Exhaustivité de l'analyse

Il existe de nombreux problèmes potentiels liés au fonctionnement des scanners qui peuvent les empêcher de réaliser un test complet sur le site en temps opportun.

Le premier est que de nombreux sites exigent que les utilisateurs se connectent. Les scanners peuvent être configurés avec un ID de session connecté, avec un script qui soumet le formulaire de connexion ou d'autres moyens d'authentification. Ils peuvent également être configurés pour détecter s'ils ont été déconnectés du site. Cependant, cette configuration est souvent sujette à des erreurs. Si le scanner n'est pas configuré correctement, il risque de ne pas complètement indexer le site, ou de ne pas détecter s'il a été déconnecté et ne pas effectuer correctement les tests. Dans les cas extrêmes, les sites peuvent avoir des fonctionnalités anti-automatisation qui rendent l'analyse presque impossible.

D'autre part, les scanners ne font pas toujours la distinction entre les pages qui sont complètement différentes et les pages qui sont quelque peu différentes. Par exemple, dans un forum en ligne, il est facile pour un humain de voir que chaque fil de discussion du forum est en fait la même page sous-jacente avec des données différentes. Cependant, un scanner automatique peut déterminer que deux fils de discussion sont des pages Web entièrement différentes et qu'elles doivent être testées séparément. Sur les sites de grande envergure, les scanners peuvent parfois rester bloqués en testant une page qui semble être différente de celle du scanner, et passer des heures ou des jours à effectuer des tests redondants.

D'autre part, il peut y avoir des pages ou des paramètres que le robot d'indexation ne détecte pas pour une raison ou une autre. Si le scanner n'a pas détecté un paramètre ou a manqué des sections du site, il est évidemment susceptible de manquer des vulnérabilités liées à ces pages ou paramètres.

Tous ces problèmes peuvent être résolus en observant de près le comportement du scanner et en modifiant les configurations d'analyse. Bien qu'il soit tout à fait possible de pointer un scanner sur un site Web et de lancer une analyse, il est important de réaliser au moins des tests de découverte et d'authentification avant de lancer une analyse afin d'obtenir les meilleurs résultats.

##### Destructivité du scanner

L'une des forces d'un scanner est qu'il fonctionne très rapidement. Cet atout peut cependant causer des problèmes.

Si l'envoi d'une requête aboutit à l'exécution d'une action à l'extérieur du site, le scanner peut provoquer l'exécution de cette action des milliers de fois. Des exemples d'effets externes peuvent inclure l'envoi d'un SMS (qui peut coûter de l'argent au propriétaire du site), l'envoi d'un e-mail (imaginez que quelqu'un ouvre sa boîte de réception pour trouver des dizaines de milliers d'e-mails), l'impression d'un ticket de commande dans un entrepôt, etc.

De même, certains sites n'ont pas les ressources pour suivre le rythme d'un scanner. Étant donné que les médias indépendants et les sites de la société civile font souvent l'objet d'attaques par déni de service, cela pourrait être une chose importante à découvrir. Cependant, la panne du site empêchera d'effectuer les autres tests de vulnérabilité.

Ces deux facteurs peuvent être partiellement atténués par des discussions avec le propriétaire du site, et en faisant attention lors des tests de découverte et de la configuration du scanner. Par exemple, tous les principaux scanners ont des moyens d'exclure certaines pages des analyses et de contrôler la vitesse de l'analyse. Cependant, le risque qu'un scanner impacte le site ou ses systèmes associés ne peut jamais être éliminé.

##### Vulnérabilités pour lesquelles les scanners ne sont pas utiles

Bien que les scanners soient excellents pour découvrir certaines sortes de vulnérabilités, il en existe d'autres types qui sont presque impossibles à découvrir.

Les principales d'entre elles sont les véritables vulnérabilités de la logique opérationnelle. Les scanners exécutent simplement des scripts, mais ils ne « comprennent » pas comment les sites sont censés fonctionner. Aucun scanner ne comprendra l'importance d'une erreur d'arrondissement dans les transferts d'argent ou l'importance d'omettre un champ supposément requis dans un formulaire.

Parallèlement, les outils automatisés ne détectent pas correctement les vulnérabilités d'autorisation. Bien qu'il existe une variété d'outils pour faciliter les tests d'autorisation, les scanners ne détectent généralement pas automatiquement ces types de vulnérabilités.

##### Faux positifs et non-problèmes

Les scanners peuvent également produire beaucoup de résultats qui ne sont pas utiles. Dans certains cas, le script permettant de détecter une vulnérabilité peut être imparfait, ce qui entraîne le signalement par le scanner d'un problème qui n'en est pas un. Dans d'autres cas, le scanner peut signaler des choses que l'auteur de l'outil peut penser intéressantes ou utiles, mais qui ne sont pas significatives dans le contexte du site que vous testez.

Dans tous les cas, vous devez reproduire manuellement et comprendre parfaitement les résultats du scanner avant de les ajouter à votre rapport.

##### Utilisation efficace des scanners

En général, les praticiens de l'évaluation de la sécurité des applications Web trouvent que les tests sont plus efficaces en utilisant un scanner. Leurs atouts sont si intéressants qu'il vaut la peine de configurer et de surveiller les analyses.

Dans tous les cas, vous devez effectuer la découverte et l'authentification avant d'utiliser un scanner. Puisque vous débutez dans le domaine, vous devriez vous exercer à utiliser un scanner sur différents sites Web, et à lire et comprendre les options de configuration et les indicateurs de progression de votre scanner. Essayez de comprendre comment le site fonctionne avant de lancer un scanner.

Certains praticiens analysent les pages individuellement en sautant l'étape d'indexation (« spidering ») de l'analyse. Cela a l'avantage d'atténuer de nombreux problèmes d'analyse, mais empêche également la capacité du robot d'indexation à trouver du contenu que vous avez peut-être manqué. Ce choix s'avère également plus laborieux. Cela peut toutefois s'avérer très efficace sur les sites qui sont difficiles à indexer pour le scanner et sur les sites qui sont plus fragiles.

Une autre option consiste à analyser l'ensemble du site en une fois. Il est généralement utile d'utiliser un utilisateur d'application Web distinct pour cette analyse, afin que les données inutiles de l'analyse n'interfèrent pas avec vos tests habituels. Assurez-vous également que le compte que vous utilisez a un accès complet au site. Pendant que l'analyse est en cours d'exécution, vous devez essayer de trouver un équilibre entre une surveillance de l'analyse suffisamment étroite pour remarquer les éventuels et le temps passé à effectuer des tests manuels.

Dans les deux cas, vous ne devez pas vous fier entièrement au scanner pour les tests de validation des données ou toute autre classe de vulnérabilité. Vous devriez au moins faire quelques tests sur chaque entrée d'un site et faire quelques tests approfondis sur d'autres. Le scanner peut comprendre des problèmes subtils qui ne sont pas évidents.

### Exercice pratique : utilisation de ZAP

ZAP (Zed Attack Proxy de SSP) est une alternative open source à Burp. Bien que la plupart des professionnels préfèrent Burp Professional, ZAP est un proxy tout à fait capable et comprend un scanner d'application Web. À ce stade, vous devriez être à l'aise avec l'utilisation de Burp Suite. Les concepts sont les mêmes pour ZAP, bien que l'interface utilisateur soit différente.

Pour cet exercice pratique, nous utiliserons le module de scanner de ZAP. Pour vous faire une idée, assurez-vous d'abord d'avoir une instance de DIWA en cours d'exécution, puis ouvrez simplement ZAP et cliquez sur « Analyse automatisée », saisissez l'URL de votre page d'accueil DIWA et cliquez sur « Attaque ».

![A screenshot of ZAP as it opens](/media/uploads/web_security_assessment_ZAP1.png)

![A screenshot of ZAP as the user selects an automated scan. The URL to attack is 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP2.png)

Vu que DIWA est une petite application, cette analyse devrait se terminer assez rapidement. Si tout se passe bien, vous remarquerez que le scanner de ZAP a trouvé des problèmes. Cependant, à moins que ZAP ait changé de manière significative, les résultats de ZAP peuvent être quelque peu décevants. Il peut y avoir quelques petits problèmes que ZAP a trouvés et que vous avez omis, mais ZAP devrait avoir manqué la plupart des gros problèmes que vous avez trouvés.

Voyons si nous pouvons améliorer ça. Cliquez sur le bouton « Démarrage rapide » dans la barre d'outils secondaire, puis sur le bouton « < » dans le volet ci-dessous. À partir de là, cliquez sur « Exploration manuelle », saisissez l'URL de votre DIWA, puis cliquez sur « Lancer le navigateur ».

![A screenshot of ZAP and the "alerts" box that the service displays at the bottom](/media/uploads/web_security_assessment_ZAP3.png)

![A screenshot of ZAP as it manually explores the page for vulnerable JS libraries](/media/uploads/web_security_assessment_ZAP4.png)

Cliquez sur le site et assurez-vous que lorsque vous avez terminé, vous êtes connecté(e) au site en tant qu'utilisateur administrateur. Maintenant, revenez à ZAP et lancez une analyse en cliquant avec le bouton droit sur le site DIWA dans la barre de gauche et en lançant une analyse active avec la configuration par défaut.

![A screenshot of ZAP as the user rights clicks on a site, and selects "attack" and "active scan"](/media/uploads/web_security_assessment_ZAP5.png)

![A screenshot of ZAP as the user gets ready to run an active scan on 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP6.png)

Cette analyse devrait prendre beaucoup plus de temps et donner de meilleurs résultats significativement différents. À quoi est-ce dû ? Le lancement de l'analyse à partir d'un site que vous avez visité dans la section « Sites » donne au scanner beaucoup plus d'informations que l'analyse entièrement automatisée. En fait, les résultats que vous obtenez du scanner peuvent différer considérablement en fonction de la façon dont vous explorez manuellement le site avant d'exécuter l'analyse.

Pratiquez manuellement en utilisant le site et en exécutant des analyses, puis comparez les résultats de ZAP à ceux que vous avez obtenus lors des tests manuels.

- Quels problèmes ZAP a-t-il trouvés que vous avez omis ?
- Quels problèmes avez-vous trouvés que ZAP a omis ?

Réfléchissez-y. Dans le cadre de la validation des compétences, nous reviendrons à ces listes.

### Outils d'exploitation

La prochaine classe d'automatisation que nous couvrirons dans le sous-thème concerne les outils qui contribuent à l'exploitation après la découverte d'une vulnérabilité. Bien qu'il existe plusieurs outils pour cela, celui le plus couramment utilisé dans les évaluations de sécurité des applications Web est [sqlmap](https://sqlmap.org/). sqlmap est capable de détecter l'injection SQL de sites Web, mais il se distingue vraiment en ce qui concerne l'exploitation. Certaines techniques d'extraction de données par injection SQL peuvent prendre plusieurs secondes pour extraire un seul bit d'information d'une base de données. sqlmap peut automatiser et optimiser la plupart des formes d'exploitation SQLi en vous faisant gagner beaucoup de temps.

L'utilisation autonome typique de sqlmap consiste à enregistrer la requête que vous avez utilisée pour identifier l'injection SQL dans un fichier texte, puis d'[exécuter sqlmap avec ce fichier texte](https://github.com/sqlmapproject/sqlmap/wiki/Usage#load-http-request-from-a-file) en utilisant l'indicateur -r. Vous devez ensuite spécifier le paramètre à tester avec l'option -p, puis choisir les données que vous souhaitez extraire. Généralement, il est préférable de commencer par l'option -b pour simplement récupérer les informations de la base de données. sqlmap tentera de confirmer que le paramètre spécifié est vulnérable à SQLi, puis choisira une technique d'extraction de données qui lui permettra d'extraire les données aussi efficacement que possible. Il se peut que l'extraction des données soit assez lente, auquel cas vous devez faire attention à la quantité de données que vous essayez d'extraire.

Il convient de noter que si vous trouvez plusieurs vulnérabilités SQLi dans un site, elles peuvent présenter des vitesses d'extraction de données très différentes. Toute vulnérabilité SQLi qui entraîne l'inclusion de données de la base de données dans la réponse HTTP sera beaucoup plus rapide que celle qui ne se traduit que par un succès ou un échec (comme dans une page de connexion).

Une alternative à l'utilisation de sqlmap autonome est d'utiliser une intégration proxy pour exécuter sqlmap directement à partir de votre proxy, comme avec l'extension [SQLiPy pour Burp](https://portswigger.net/support/using-burp-with-sqlmap). Cela accélère généralement la configuration sqlmap et vous évite quelques allers-retours depuis la documentation sqlmap.

#### Utilisation de sqlmap

Depuis le sous-thème de configuration, vous devriez avoir installé sqlmap ainsi qu'une version de DIWA. Vous devriez avoir déjà identifié une ou plusieurs vulnérabilités SQLi dans DIWA. En utilisant sqlmap, exploitez l'une de ces vulnérabilités pour extraire la structure de base de données DIWA, puis extrayez la base de données utilisateur DIWA.

Notez que sqlmap comprend des capacités et des options de configuration qui dépassent ce qui est discuté ici. Assurez-vous de consulter [la documentation](https://github.com/sqlmapproject/sqlmap/wiki/) pour connaître les options d'utilisation.

### Scanners de vulnérabilités spécifiques aux applications Web

Aux fins de ce sous-thème, nous utilisons les mots « scanner de vulnérabilités » pour désigner un outil qui découvre des vulnérabilités précédemment connues plutôt qu'un outil qui découvre automatiquement de nouvelles vulnérabilités. Les premiers exemples incluent des outils tels que Nessus et OpenVAS, tandis que les derniers incluent le scanner intégré à Burp Pro et ZAP.

Alors que Nessus et OpenVAS tentent de détecter un large éventail de vulnérabilités, d'autres se spécialisent. Par exemple, Nikto est un outil qui tente de trouver des erreurs de configuration de serveurs Web spécifiquement. Bien que Nikto n'ait pas été mis à jour depuis des années et ait généralement été remplacé par des scanners de vulnérabilité à usage général, il reste un scanner de vulnérabilités d'applications Web spécifique remarquable. Il s'appelle WP Scan et il est axé sur la recherche de vulnérabilités dans les sites WordPress. Dans la mesure où WordPress jouit d'une grande popularité parmi la société civile et les sites de journalisme indépendants, il est utile de le couvrir dans ce parcours d'apprentissage.

WPScan a commencé comme un logiciel open source, et la [version en ligne de commande](https://github.com/wpscanteam/wpscan) l'est toujours, bien qu'il existe des [options commerciales](https://wpscan.com/pricing/) pour ceux qui veulent d'autres fonctionnalités. WPScan fonctionne essentiellement de la même manière que les autres scanners de vulnérabilités. Pour faire simple, il envoie des requêtes à un serveur et tente de déterminer quelles versions de logiciels sont installées sur ce serveur. Il compare ensuite ces versions à une base de données de vulnérabilités.

🛠️ Téléchargez [DVWP](https://github.com/vavkamil/dvwp) (vous devriez utiliser Docker pour le déployer). Si vous utilisez un Mac Apple Silicon, vous devrez peut-être ajouter « platform : linux/amd64 » à chaque service dans le fichier docker-compose.yml.

Ensuite, utilisez le CLI WPScan pour trouver des vulnérabilités sur le site. Si vous avez installé WPScan via Docker sur Mac ou Windows, vous ne pourrez pas utiliser 127.0.0.1:31337 pour référencer DVWP pour WPScan. Cela est dû au fait que Docker s'exécute dans une MV, et l'adresse 127.0.0.1 désigne la MV, pas votre ordinateur. Cherchez plutôt l'adresse IP du réseau local de votre ordinateur (p. ex., 196.168.0.xxx, 10.xxx.xxx.xxx, etc.) et utilisez-la.

Bien que ce ne soit pas obligatoire, vous voudrez probablement [vous inscrire pour obtenir une clé API sur le site Web WPScan](https://wpscan.com/register/) et utiliser la clé lors de l'analyse. Si vous ne spécifiez pas de clé API, WPScan identifiera les versions de WordPress et ses extensions, et vous indiquera celles qui sont obsolètes. Si vous utilisez la clé API, elle vous indiquera quelles vulnérabilités existent sur le site.

## Contrôle de compétence

Discutez de votre utilisation du scanner ZAP et de sqlmap sur DIWA avec votre mentor. Pourquoi avez-vous trouvé des choses que ZAP a omises, et vice versa ? Expliquez-lui comment vous comptez utiliser l'automatisation pour vous aider à tester les sites Web à l'avenir.

## Ressources d'apprentissage

{{% resource title="Robot d'indexation" description="Un aperçu de ce que sont les robots d'indexation et de ce qu'ils permettent de faire" languages="47 langues" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Robot_d%27indexation" %}}
{{% resource title="Utilisation" description="Un guide d'utilisation de sqlmap" languages="Anglais" cost="Gratuit" url="https://github.com/sqlmapproject/sqlmap/wiki/Usage" %}}
{{% resource title="Utiliser Burp avec sqlmap" description="Instructions sur la façon d'intégrer sqlmap avec Burp aux fins des tests de sécurité des applications Web" languages="Anglais" cost="Gratuit" url="https://portswigger.net/support/using-burp-with-sqlmap" %}}
{{% resource title="WPScan" description="Un outil automatisé pour analyser les sites WordPress à la recherche de failles de sécurité" languages="Anglais" cost="Gratuit" url="https://github.com/wpscanteam/wpscan" %}}
{{% resource title="Damn Vulnerable WordPress" description="Une installation spéciale de WordPress qui inclut intentionnellement de nombreuses vulnérabilités de sécurité , à utiliser pour les tests" languages="Anglais" cost="Gratuit" url="https://github.com/vavkamil/dvwp" %}}