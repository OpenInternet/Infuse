+++
style = "module"
weight = 2
title = "Validation des données"
description = "Nous examinons une catégorie très courante de vulnérabilités, dans laquelle un site web analyse des données malveillantes soumises par un utilisateur."
+++

## Cas d'utilisation

Une classe commune de vulnérabilités d'applications Web concerne la façon dont l'application traite les données fournies par les utilisateurs du site. Cette classe de vulnérabilités est couramment utilisée par les cybercriminels pour prendre en charge complètement les sites Web cibles et peut souvent être découverte via des techniques automatisées. La compréhension des mécanismes des vulnérabilités de validation des données est également utile pour démystifier des sujets de sécurité complexes.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre les types courants de vulnérabilités de validation des données
- Comprendre les impacts potentiels de ces types de vulnérabilités
- Comprendre les mécanismes par lesquels ces vulnérabilités fonctionnent
- Comprendre dans les grandes lignes comment ces vulnérabilités peuvent être évitées

---
## Section Principale

Notre première classe de vulnérabilités spécifiques aux applications Web comprend celles liées à la validation des données. Il existe de nombreux types de vulnérabilités de validation des données, et elles peuvent se produire dans n'importe quel système qui traite les entrées. Généralement, ces vulnérabilités se produisent lorsque l'application fait des hypothèses implicites sur la longueur et/ou le contenu des données qu'elle envoie. Lorsque la saisie est reçue et/ou traitée, les données « échappent » au contexte prévu et deviennent du code dans le nouveau contexte. Nous aborderons la façon dont cela fonctionne, des conséquences associées et de la façon de corriger la vulnérabilité pour chaque type spécifique. Assurez-vous de lire dans l'ordre, car chaque section s'appuie sur les précédentes.

### Cross-Site Scripting (XSS)

Le nom « cross site scripting » est un artefact de la façon dont les premières exploitations de failles XSS ont fonctionné. Il serait plus judicieux de nommer ces vulnérabilités « injections JavaScript », mais l'ancien nom est conservé pour des raisons historiques. Le XSS se produit lorsqu'un navigateur interprète l'entrée de l'utilisateur comme étant du JavaScript. Cela permet à un cybercriminel, dans une mesure limitée, de contrôler le navigateur Web de la personne ciblée dans le contexte du site Web cible. Le cybercriminel peut voler les cookies de la personne ciblée et permettre au cybercriminel de les usurper sur le site. De plus, le cybercriminel peut automatiquement extraire toutes les données de la personne ciblée du site Web cible et peut également effectuer des actions sur le site cible en tant qu'utilisateur. Enfin, le cybercriminel peut modifier l'apparence du site Web pour la personne ciblée, par exemple en faisant apparaître une fausse page d'authentification qui envoie les informations d'identification de l'utilisateur au cybercriminel ou en invitant l'utilisateur à télécharger un logiciel malveillant censé provenir d'un site de confiance.

Bien que cette attaque soit puissante, elle comporte des limites. Le cybercriminel est limité au contrôle du contenu du site cible dans le contexte du navigateur de l'utilisateur. Le cybercriminel ne peut pas interagir avec d'autres sites Web et ses actions sont limitées par les fonctionnalités de sécurité du navigateur.

Mécaniquement, cette attaque fonctionne par une application Web recevant des données utilisateur, puis intégrant ces données utilisateur directement dans une page Web. Envisagez un site de forum de discussion qui permet aux utilisateurs de choisir un nom d'affichage :

![alt_text](/media/uploads/web_fundamentals_empty_box.png "image_tooltip")

Cette page Web un peu banale aura le code HTML suivant :

{{< highlight html >}}
<html><body><form>
  Name: <input name="nom_affiché"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Lorsqu'il reçoit un nom de l'utilisateur, il l'affiche dans le formulaire :

![alt_text](/media/uploads/web_fundamentals_Alice_box.png "image_tooltip")

en utilisant le code HTML suivant :

{{< highlight html >}}
<html><body><form>
  Name: <input name="nom_affiché" value="Alice"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Jusqu'ici tout va bien. Maintenant, que se passe-t-il si l'utilisateur saisit des données plus délicates, comme :

{{< highlight html >}}
Alice"><script>alert("0wné par Alice")</script><i q="
{{< / highlight >}}

Lorsque la page Web est générée, elle semble un peu différente :

![alt_text](/media/uploads/web_fundamentals_owned_by_Alice_alert.png "image_tooltip")

Que s'est-il passé ? 
<!-- Original (see English):  Utilisons un peu de couleur pour mettre en évidence ce qui se passe. Souvenez-vous, l'application Web traite simplement l'entrée de l'utilisateur comme du texte, elle n'a aucune idée des couleurs. -->

{{< highlight html >}}
Alice"><script>alert("0wné par Alice")</script><i q="
{{< / highlight >}}

L'application prend simplement l'entrée de l'utilisateur et la place mot pour mot dans le code HTML qu'elle génère, du point de vue de l'application Web, et du navigateur Web, il s'agit simplement de texte indifférencié.

{{< highlight html >}}
<html><body><form>
  Name: <input name="nom_affiché" value="Alice"><script>alert("0wné par Alice")</script><i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Notez le `">` après `value="Alice"`. Cela indique au navigateur que l'attribut de valeur de l'entrée HTML est terminé, puis que la balise d'entrée est terminée. Ensuite, le texte en bleu est une balise de script qui exécute le JavaScript qui affiche une zone d'alerte. Finalement, le `<i q="` n'est qu'un nettoyage qui empêche la page Web d'afficher les restes de la balise d'entrée d'origine. 

<!-- Nous pouvons utiliser une mise en surbrillance et une mise en forme de couleurs différentes pour montrer comment le navigateur interprète la page Web générée : -->

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice"><script>alert("Owned by
    Alice")</script>
  <i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

En l'état, cette démonstration de XSS ne fait rien de malveillant et la seule personne affectée est Alice elle-même. Cependant, si notre cybercriminelle Alice peut amener quelqu'un d'autre à voir son nom affiché et que son JavaScript fait quelque chose de malveillant, elle aura effectué une véritable attaque.

#### Essayez par vous-même

Connectez-vous à votre DVWA et assurez-vous que le niveau de sécurité est faible (voir la section « Configuration » dans l'introduction de ce parcours d'apprentissage pour en savoir plus à ce sujet). Accédez à la section « XSS (Reflected) ». L'entrée « Quel est votre nom ? » est vulnérable au XSS. Essayez de saisir un nom qui fait apparaître une boîte d'alerte JavaScript lorsque vous cliquez sur le bouton « Envoyer ».

![alt_text](/media/uploads/web_fundamentals_reflected_XSS_screenshot.png "image_tooltip")

### Prévention du XSS

Pour empêcher le XSS, la meilleure technique à utiliser est appelée le codage de sortie. Notez que dans l'exemple ci-dessus, l'attaque a été activée par l'utilisation des caractères “ et >. Dans le contexte d'une page Web, ces caractères contrôlent la structure de la page. En HTML, tous ces caractères peuvent être encodés, de sorte que le navigateur Web sait afficher un guillemet ou un chevron, plutôt que de modifier la structure de la page. Dans ce cas, si les données d'Alice ont été encodées avant d'être intégrées à la page Web, elles généreront le code HTML suivant : 

{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice&quot;&gt;&lt;script&gt;alert(&quot;0wné par Alice&quot;)&lt;/script&gt;&lt;i q=&quot;"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

qui s'afficherait comme ceci
![alt_text](/media/uploads/web_fundamentals_Alice_script_box.png "image_tooltip")

L'encodage de sortie dépend du contexte dans lequel les données seront utilisées. Pour HTML, vous devez encoder des entités HTML dans les données. Pour les données qui doivent être incluses dans un bloc de JavaScript, un codage différent sera utilisé. Si les données de l'utilisateur doivent être utilisées dans une requête de base de données, un autre type d'encodage sera utilisé. Les frameworks Web et les bibliothèques devraient avoir des fonctions pour effectuer l'encodage de sortie pour vous ; il est préférable d'utiliser ces fonctions (espérons-le) matures plutôt que d'essayer de les écrire vous-même à partir des premiers principes.

Pour en savoir plus sur XSS, consultez [le guide de l'OWASP sur XSS](https://owasp.org/www-community/attacks/xss/). Pour obtenir une exploration approfondie, consultez le [parcours d'apprentissage Évaluation de la sécurité des applications Web](https://docs.google.com/document/d/19v34droskAFgkp_qqcwiQLpc1hI1W-FjzHNV2QRBsaA/edit?usp=sharing).

### Injection SQL (SQLi)

Là où un XSS permet aux données de l'utilisateur d'être extraites de leur contexte et d'être interprétées comme HTML et JavaScript dans le navigateur Web de la victime, l'injection SQL permet aux données de l'utilisateur d'être extraites de leur contexte et d'être interprétées comme SQL dans la base de données de l'application Web. La plupart des applications Web utilisent une base de données back-end pour stocker et récupérer les données. Généralement, elles utilisent SQL pour effectuer cet accès aux données. L'injection SQL peut se produire lorsque les données utilisateur sont interpolées dans une requête.

Étant donné que le SQL contrôlé par le cybercriminel est exécuté dans l'environnement du serveur, les vulnérabilités d'injection SQL sont généralement beaucoup plus dangereuses qu'un XSS. Alors qu'une vulnérabilité XSS permet à un cybercriminel de cibler d'autres utilisateurs, par exemple par une sorte d'ingénierie sociale, l'injection SQL peut donner au cybercriminel un accès en lecture-écriture à toutes les données des utilisateurs du site. Le cybercriminel peut également lire et écrire toutes les autres données stockées dans la base de données auxquelles l'application Web peut accéder. Fréquemment, les cybercriminels peuvent utiliser l'accès SQL pour avoir la possibilité d'exécuter des commandes sur le serveur de base de données lui-même, en obtenant un accès à distance complet à l'infrastructure back-end du site Web.

Comment fonctionne l'injection SQL ? Considérez une application Web où une plateforme de billetterie répertorie le nom, la description et la version de chaque outil dans une catégorie. L'utilisateur soumettrait également un paramètre id qui pourrait même être contenu dans l'URL de la page qui fait la requête. Le code qui génère le SQL qui récupère ces données pourrait ressembler à ceci :

{{< highlight sql >}}
$sql = 'select productid, nom, description, version from produits where categoryid='+request_params['id']
{{< / highlight >}}

Lorsqu'un utilisateur envoie un paramètre id comme 1 ou 32, tout va bien et nous obtenons une requête comme :

{{< highlight sql >}}
 select toolid, nom, description, version
   from tools
  where categoryid=32
{{< / highlight >}}

Toutefois, le problème commence lorsqu'un utilisateur curieux envoie un id de 2-1, et note qu'il obtient les mêmes résultats que pour un id de 1:
{{< highlight sql >}}
 select toolid, nom, description, version
   from tools
  where categoryid=2-1
{{< / highlight >}}

Cela montre au cybercriminel que l'application est vulnérable à l'injection SQL. Elle interprète son entrée comme du code (en exécutant l'expression 2-1) au lieu de données (à la recherche d'une catégorie dont l'ID est littéralement « 2-1 »). Après un peu de recherche, il envoie un id de -1 union all select 1, username, password, 1.0 from admin_users. Il en résulte cette requête SQL :
{{< highlight sql >}}
 select toolid, nom, description, version
   from tools
  where toolid=-1
union all
 select 1, username, password, 1.0
   from admin_users
{{< / highlight >}}

Cette requête recherche tous les outils qui ont un id de catégorie de -1 (il n'en existe probablement aucun), puis ajoute à cette liste les noms d'utilisateur et mots de passe des utilisateurs administrateurs de la plateforme de billetterie. L'application formate ensuite ces données sous forme de tableau HTML agréable et lisible et le renvoie à l'utilisateur qui demande les données. Non seulement cela permettra au cybercriminel de simplement se connecter au système de billetterie, mais si l'un de ces utilisateurs réutilise ses mots de passe, le cybercriminel pourra peut-être accéder à d'autres systèmes de la même organisation.

#### Essayez par vous-même

Connectez-vous à votre DVWA et assurez-vous que le niveau de sécurité est faible. Accédez à la page « Injection SQL » et expérimentez la saisie. Pouvez-vous faire en sorte que la page renvoie la liste de tous les comptes utilisateur ? Pouvez-vous utiliser la technique « union all » pour récupérer des données d'autres tables, comme la table appelée « information_schema.tables » ?

#### Prévention du SQLi

Contrairement au XSS, l'encodage de sortie n'est pas un moyen fiable d'empêcher l'injection SQL. Notez que dans les exemples ci-dessus, le cybercriminel utilise des caractères tels que l'espace et - pour changer le contexte de ses données en passant du contexte des données de la requête SQL à celui de la structure de la requête elle-même. Une combinaison de filtrage d'entrée sensible au type et d'encodage de sortie peut empêcher l'injection SQL en théorie, mais en pratique, cette approche est très peu fiable.

Au lieu de cela, nous pouvons utiliser une fonctionnalité de chaque moteur de base de données qui permet de sauter entièrement une partie de l'analyse initiale de la requête. Ce type de requête est appelé une requête paramétrée et son utilisation est fréquemment appelée liaison de paramètres. Au lieu d'envoyer à la base de données une chaîne de texte qui contient à la fois la structure de la requête et les données de l'utilisateur, nous envoyons une chaîne qui contient la structure de la requête avec des espaces réservés pour les données. Avec cette chaîne, nous envoyons les données pour chaque espace réservé. De cette façon, les données de l'utilisateur ne sont jamais analysées dans un contexte SQL, peu importe ce qu'elles envoient, elles seront traitées exclusivement comme des données. Non seulement cela protège contre l'injection SQL, mais cela rend les requêtes de base de données légèrement plus rapides.

Pour en savoir plus sur l'injection SQL, consultez [le guide de l'OWASP](https://owasp.org/www-community/attacks/SQL_Injection). Pour obtenir une exploration approfondie, consultez le [parcours d'apprentissage Évaluation de la sécurité des applications Web](https://docs.google.com/document/d/19v34droskAFgkp_qqcwiQLpc1hI1W-FjzHNV2QRBsaA/edit?usp=sharing).

### L'injection de chemin d'accès/traversée de répertoire/inclusion de fichier local

Cette classe de vulnérabilités implique que l'utilisateur envoie une application Web qui subvertit les interactions de l'application avec le système de fichiers. Avec ce type de vulnérabilité, le cybercriminel peut influencer ou contrôler le chemin d'accès d'un fichier que l'application Web lit ou écrit, en donnant potentiellement au cybercriminel un accès complet à tout fichier que le serveur Web peut lire ou écrire. Selon ce qui est stocké sur le serveur Web, cela peut donner différentes capacités au cybercriminel. Cependant, les cibles populaires sont les fichiers de configuration, qui contiennent souvent des informations d'identification pour les bases de données et autres services réseau externes, ainsi que le code source de l'application elle-même.  

Considérez une application qui conserve certaines données sur le système de fichiers au lieu d'une base de données. Par exemple, un site multilingue qui conserve les emplacements géographiques dans des fichiers. Le code de la page d'accueil pourrait ressembler à ceci :

{{< highlight html >}}
<?
function localize($content, $lang) {
	return fread("../config/lang/"+$lang+"/"+$content);
}
?>
<html>
<head><title><?= localize($_GET("pg")+".title",$_GET("hl"))?></title></head>
<body><?= localize($_GET("pg"), $_GET("hl"))?></body>
</html>
{{< / highlight >}}

Notez qu'il prend les paramètres de la chaîne d'URL et les utilise pour lire les fichiers du système de fichiers, y compris leur contenu dans la page.

Lorsque vous lancerez [http://www.exemple.com/?hl=en-us&pg=main](http://www.example.com/?hl=en-us&pg=main), le serveur recherchera ../config/lang/en-us/main.title et ../config/lang/en-us/main. Le code HTML résultant pourrait ressembler à ceci :

{{< highlight html >}}
<html>
<head><title>Site Cool: Principal</title></head>
<body><h1>Bonjour le monde !</h1></body>
</html>
{{< / highlight >}}

Mais que se passe-t-il si à la place, nous visitons `<http://www.example.com/?hl=../../../../../../../../&pg=../etc/passwd>`? Le site recherchera `../config/lang/../../../../../../../../&pg=../etc/passwd.title` et `../config/lang/../../../../../../../../&pg=../etc/passwd`. Il est peu probable de trouver le premier, mais en supposant que le serveur a ignoré l'erreur, nous pourrions obtenir une page Web qui ressemble à ceci :

{{< highlight html >}}
<html>
<head><title></title></head>
<body>nobody:*:-2:-2:Unprivileged User:/var/empty:/usr/bin/false
root:*:0:0:System Administrator:/var/root:/bin/sh
daemon:*:1:1:System Services:/var/root:/usr/bin/false
</body>
</html>
{{< / highlight >}}

Sur n'importe quel système moderne de type Unix, la saisie de `/etc/passwd` ne présente aucun problème, mais si le cybercriminel parvient à forcer brutalement d'autres fichiers sur le système (par exemple, un fichier de configuration ou quelque chose comme `/home/dev/vpn-credentials.txt)`, les résultats pourraient être assez préoccupants. Pire encore, il pourrait s'agir d'un site qui permet aux utilisateurs de téléverser des fichiers, et où l'utilisateur peut manipuler l'emplacement du fichier pour en faire du code (par ex., .php, .asp, etc.) à l'intérieur de la racine Web. Dans ce cas, le cybercriminel peut téléverser un [web shell](https://en.wikipedia.org/wiki/Web_shell) et exécuter des commandes sur le serveur Web.

#### Essayez par vous-même

Connectez-vous à votre DVWA et assurez-vous que le niveau de sécurité est faible. Accédez à la page « Inclusion de fichiers » et essayez avec l'URL que vous visitez lorsque vous cliquez sur un fichier. Pouvez-vous récupérer le fichier /etc/passwd ?

### Prévention de l'injection de chemin d'accès

Dans une large mesure, le meilleur conseil pour prévenir ce genre d'attaque est de ne pas utiliser le système de fichiers dans le code de votre application. Bien que ce conseil soit efficace, il n'est pas toujours pratique. Une option hybride consisterait à stocker les noms de fichiers dans une base de données et d'accepter les index de base de données de l'utilisateur. Dans l'exemple ci-dessus, la base de données pourrait ressembler à ceci :

<table>
  <tr>
   <td>langue
   </td>
   <td>page
   </td>
   <td>type
   </td>
   <td>emplacement
   </td>
  </tr>
  <tr>
   <td><code>fr-sn</code>
   </td>
   <td><code>principale</code>
   </td>
   <td><code>titre</code>
   </td>
   <td><code>../config/lang/fr-sn/principale.title</code>
   </td>
  </tr>
  <tr>
   <td><code>fr-sn</code>
   </td>
   <td><code>principale</code>
   </td>
   <td><code>corps</code>
   </td>
   <td><code>../config/lang/fr-sn/principale</code>
   </td>
  </tr>
</table>

Si cela n'est pas possible, le site ne doit utiliser et accepter qu'un ensemble très limité de caractères (tels que des lettres et des chiffres) pour les composants de nom de fichier spécifiés par l'utilisateur. Cela permettra probablement aux utilisateurs de lire ou d'écrire des fichiers arbitraires dans un répertoire spécifié, de sorte que les développeurs d'applications doivent s'assurer que les fichiers de ce répertoire ne sont pas exécutables par le serveur Web, et qu'il n'y a pas de données sensibles ou d'informations de configuration importantes dans ce répertoire.

Pour en savoir plus sur l'injection de chemin d'accès, consultez [le guide de l'OWASP](https://owasp.org/www-community/attacks/Path_Traversal). Pour obtenir une exploration approfondie, consultez le [parcours d'apprentissage Évaluation de la sécurité des applications Web](https://docs.google.com/document/d/19v34droskAFgkp_qqcwiQLpc1hI1W-FjzHNV2QRBsaA/edit?usp=sharing).

### Injection de shell/injection de commande

L'injection de shell est similaire à l'injection de chemin d'accès, en ce sens qu'elle implique les interactions de l'application avec le système d'exploitation. Dans ce cas, cependant, l'application exécute directement une commande shell ou plusieurs commandes, et il est possible pour un cybercriminel de modifier les commandes exécutées. L'impact d'une injection de shell est extrêmement élevé, car elle permet au cybercriminel d'exécuter ses propres commandes sur le matériel du serveur Web sous-jacent. La compromission complète de l'application Web est presque assurée. Avec le temps, la compromission d'autres infrastructures dans l'environnement du serveur est probable.

Envisagez une application qui permet aux utilisateurs de vérifier la connectivité réseau à d'autres systèmes à partir du serveur Web. Voici du code pour une page PHP minimale qui fait ceci :

{{< highlight html >}}
<html>
<head><title>Vérification de la connectivité réseau</title></head>
<body>
	<h1>Vérification de la connectivité réseau</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<?
	if ($_GET("host")) {
		print("	<h2>Résultats</h2>\r<pre>".shell_exec("ping -c 3 ".$_GET("host"))."</pre>");
	}
?>
</body>
</html>
{{< / highlight >}}

Si les utilisateurs saisissent « 8.8.8.8 », la page utilise la fonction shell_exec pour exécuter la commande ping -c 3 8.8.8.8, et le code HTML qui en résulte ressemble à ceci :

{{< highlight html >}}
<html>
<head><title>Vérification de la connectivité réseau</title></head>
<body>
	<h1>Vérification de la connectivité réseau</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2>Résultats</h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=7.266 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=8.681 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=12.481 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.266/9.476/12.481/2.202 ms</pre>
</body>
</html>
{{< / highlight >}}

Super pratique ! Toutefois, que se passera-t-il si l'utilisateur saisit  `8.8.8.8; ls -1 /` à la place ? L'exécution de la commande shell sera `ping -c 3 8.8.8.8; ls -1 /`, et la page Web résultante ressemblera à ceci :

{{< highlight html >}}
<html>
<head><title>Vérification de la connectivité réseau</title></head>
<body>
	<h1>Vérification de la connectivité réseau</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2>Résultats</h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=5.611 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=11.918 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=9.519 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 5.611/9.016/11.918/2.599 ms
Applications
Library
System
Users
Volumes
bin
cores
dev
etc
home
opt
private
sbin
tmp
usr
var</pre>
</body>
</html>
{{< / highlight >}}

Que s'est-il passé ? Le shell a vu la commande ping 8.8.8.8, puis un point-virgule. Dans la plupart des interpréteurs de type Unix, la commande point-virgule sépare les commandes individuelles qui sont exécutées ensemble sur une même ligne. Ainsi, l'interpréteur a exécuté la commande ping, puis la commande suivante, pour lister le contenu du répertoire racine. Il a rassemblé la sortie des deux commandes, puis a renvoyé ces résultats au serveur Web.

Évidemment, cela pourrait être utilisé pour récupérer presque n'importe quel fichier du serveur Web (par exemple, en utilisant la commande « cat »). Le cybercriminel peut amener le serveur Web à importer des fichiers (y compris des exécutables) à partir d'autres serveurs, puis à exécuter ces commandes. Ces exécutables importés peuvent être des exploitations de failles qui permettent au cybercriminel de faire passer les privilèges de l'utilisateur du serveur Web à un utilisateur administrateur (p. ex., système ou racine), ce qui lui donnerai un contrôle total sur le serveur Web.

#### Essayez par vous-même

Connectez-vous à votre DVWA et assurez-vous que le niveau de sécurité est faible. Accédez à la page « Injection de commande » et expérimentez la saisie. Pouvez-vous lister le contenu du répertoire racine du serveur Web ?

### Prévention de l'injection de shell

Comme pour l'injection de chemin d'accès, la meilleure façon de prévenir l'injection de shell est de « d'interdire de le faire ». Contrairement à l'injection de chemin d'accès, le conseil de ne pas exécuter les commandes shell à partir du serveur Web ne doit pas être pris en compte. Les autres alternatives (telles que la validation des données d'entrée) sont difficiles à mettre en œuvre correctement et peuvent être impossibles si l'application doit autoriser toute sorte d'entrée non triviale.

Pour en savoir plus sur l'injection de shell, consultez le [guide de l'OWASP à ce sujet](https://owasp.org/www-community/attacks/Command_Injection) et le [guide de l'OWASP sur la prévention](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html). Pour obtenir une exploration approfondie, consultez le [parcours d'apprentissage Évaluation de la sécurité des applications Web](https://docs.google.com/document/d/19v34droskAFgkp_qqcwiQLpc1hI1W-FjzHNV2QRBsaA/edit?usp=sharing).

## Contrôle de compétence

### Exercice 1 : récapitulatif

(Voici un résumé de l'exercice décrit ci-dessus dans le sous-thème)

Accédez à votre installation de DVWA. Réglez le niveau de difficulté sur « faible » et remplissez les sections suivantes :

- XSS (reflected)
- Injection SQL
- Inclusion de fichier
- Injection de commandes

Pour chacune des sections suivantes, votre tâche est de trouver et d'exploiter la vulnérabilité comme décrit sur la page DVWA respective. Comme vous n'avez peut-être pas beaucoup d'expérience avec JavaScript, SQL ou les lignes de commande, il est tout à fait correct d'utiliser des tutoriels (il y en a beaucoup en ligne au sujet de DVWA) ou des guides pour vous aider dans les exercices. Assurez-vous simplement que, plutôt que de simplement copier et coller des commandes à partir des tutoriels, vous pouvez réellement expliquer _ce que fait_ chaque page DVWA et quelle est la vulnérabilité.

### Exercice 2 : questionnaire à choix multiples

La validation des données est un aspect essentiel de la sécurité des applications Web. Elle garantit que les données d'entrée sont sûres, correctement formatées et exemptes d'intentions malveillantes. Si vous omettez de mettre en œuvre une validation adéquate des données, vous rendez les applications Web vulnérables à diverses exploitations de failles. Les questions suivantes explorent l'importance de la validation des données dans les applications Web et les techniques pour prévenir les vulnérabilités de validation des données.

Si possible, discutez de vos réponses à ces questions avec un pair ou un mentor qui vous aidera à vérifier que vous avez bien compris le sujet.

**Question 1**

Quelle est la conséquence courante de l'échec de la validation des données dans une application Web ?

A) Amélioration de la performance du serveur\
B) Amélioration de l'expérience\
C) Vulnérabilité aux attaques d'injection SQL\
D) Amélioration de l'intégrité des données

{{< question title="Réponse et explication" >}}
**Réponse correcte à la question 1**: C) Vulnérabilité aux attaques d'injection SQL

Explication :

A) Incorrect. Le fait de ne pas mettre en œuvre une validation appropriée des données n'entraîne généralement pas une augmentation des performances du serveur.\
B) Incorrect. Bien qu'une bonne validation des données contribue à une meilleure expérience utilisateur en prévenant les erreurs, son absence n'améliore pas l'expérience utilisateur.\
C) Correct. Sans validation des données appropriée, les applications Web sont vulnérables aux attaques par injection SQL, dans lesquelles les cybercriminels peuvent manipuler les requêtes de base de données en injectant du code SQL malveillant.\
D) Incorrect. La validation des données aide à maintenir l'intégrité des données, mais son absence n'améliore pas l'intégrité des données_.  
{{< /question >}}

**Question 2**

Lequel des mécanismes suivants est un mécanisme efficace pour prévenir les attaques XSS (cross-site scripting) dans les applications Web ?

A) Utiliser du texte brut pour stocker des données sensibles\
B) Extraire la saisie de l'utilisateur avant de l'afficher\
C) Stocker les mots de passe des utilisateurs en texte brut\
D) Désactiver le chiffrement HTTPS

{{< question title="Réponse et explication" >}}
**Réponse correcte à la question 2**: B) Extraire la saisie de l'utilisateur avant de l'afficher

Explication :

A) Incorrect. L'utilisation de texte brut pour stocker des données sensibles n'empêche pas les attaques XSS. En fait, elle augmente le risque d'exposition des données.\
B) Correct. Extraire la saisie de l'utilisateur avant de l'afficher contribue à atténuer les attaques XSS en rendant les scripts potentiellement malveillants inoffensifs et en les empêchant de s'exécuter dans les navigateurs des utilisateurs.\
C) Incorrect. Le stockage des mots de passe des utilisateurs en texte brut est un risque de sécurité et n'est pas lié à la prévention des attaques XSS.\
D) Incorrect. La désactivation du chiffrement HTTPS expose les données sensibles à l'interception et n'empêche pas les attaques XSS.
{{< /question >}}

**Question 3**

Quelle technique est efficace pour prévenir les attaques par injection SQL dans les applications Web ?

A) Utiliser des requêtes SQL dynamiques\
B) Utiliser le nettoyage des entrées et des requêtes paramétrées\
C) Stocker les données sensibles en texte brut\
D) Désactiver les messages d'erreur

{{< question title="Réponse et explication" >}}
**Réponse correcte à la question 3**: B) Utiliser le nettoyage des entrées et des requêtes paramétrées

Explication :

A) Incorrect. L'utilisation de requêtes SQL dynamiques sans validation et nettoyage des entrées appropriés augmente le risque d'attaques par injection SQL.\
B) Correct. L'utilisation du nettoyage des entrées et des requêtes paramétrées contribue à prévenir les attaques par injection SQL en veillant à ce que les entrées de l'utilisateur soient traitées comme des données plutôt que comme du code exécutable, en neutralisant ainsi les tentatives d'injection SQL malveillantes.\
C) Incorrect. Le stockage de données sensibles en texte brut augmente le risque d'exposition des données, mais n'empêche pas directement les attaques par injection SQL.\
D) Incorrect. La désactivation des messages d'erreur peut masquer les vulnérabilités potentielles des cybercriminels, mais ne traite pas la cause fondamentale des vulnérabilités d'injection SQL.
{{< /question >}}

**Question 4**

Lequel des énoncés suivants explique le mieux comment une bonne validation des données aide à prévenir les attaques par injection de commandes dans la sécurité des applications Web ?

A) La validation des données limite l'entrée aux caractères et aux modèles prédéfinis, en minimisant ainsi la probabilité que des commandes malveillantes soient injectées dans l'application.\
B) Des techniques de validation appropriées, telles que le nettoyage des entrées et les requêtes paramétrées, contribuent à neutraliser les commandes malveillantes intégrées aux entrées utilisateur, en atténuant ainsi les vulnérabilités d'injection de commandes.\
C) La mise en œuvre de méthodes de validation telles que les contrôles de longueur d'entrée et de liste blanche des caractères acceptables réduit la surface d'attaque et empêche l'exécution de commandes non autorisées dans l'application Web.\
D) Tout ce qui précède.

{{< question title="Answer" >}}
**Réponse correcte à la question**: D) Tout ce qui précède.
{{< /question >}}

### Ressources d'apprentissage

{{% resource title="Guides de l'OWASP sur les vulnérabilités" description="Excellents aperçus des différentes vulnérabilités, y compris des exemples" languages="Anglais" cost="Gratuit" url="Injection SQL : https://owasp.org/www-community/attacks/SQL_Injection <br> XSS : https://owasp.org/www-community/attacks/xss/ <br> Traversée de répertoire : https://owasp.org/www-community/attacks/Path_Traversal <br> Injection de commande : https://owasp.org/www-community/attacks/Command_Injection" %}}
{{% resource title="Aide-mémoire sur l'injection de commande OS" description="Un aperçu rapide des différentes commandes du système d'exploitation qui pourraient être utilisées à mauvais escient pour permettre l'injection" languages="Anglais" cost="Gratuit" url="https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html" %}}
{{% resource title="Web shells" description="Un aperçu rapide de ce qu'est un shell web et comment il pourrait être utilisé dans le cadre d'attaques" languages="anglais, kurde, chinois, coréen, français, lombard, hindi, malayalam" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Code_encoquill%C3%A9" %}}