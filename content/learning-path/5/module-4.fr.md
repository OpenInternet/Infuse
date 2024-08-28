+++
style = "module"
weight = 4
title = "Logique d'application et vulnérabilités connexes"
description = "Il existe d'autres types de vulnérabilités qui ne sont pas couvertes dans les sous-sujets précédents mais qui pourraient néanmoins être utilisées pour endommager ou obtenir un accès non autorisé à une application web. Nous examinons plusieurs de ces vulnérabilités."
+++

## Cas d'utilisation

Il existe d'autres types de vulnérabilités non couvertes dans les sous-thèmes ci-dessus qui pourraient néanmoins être utilisées pour endommager ou obtenir une entrée non autorisée dans une application Web. Nous en examinons plusieurs ci-dessous. Il s'agit du dernier sous-thème qui décrit les classes de vulnérabilités : une fois que vous les aurez toutes apprises, vous pourrez passer aux sujets suivants, qui examinent vos applications Web pour détecter les vulnérabilités potentielles et s'assurer qu'elles ne comprennent aucune faille de sécurité grave.

## Objectifs

Après avoir terminé ce sous-thème, les participants seront en mesure de trouver des faiblesses dans les applications Web qui reviennent à subvertir les mécanismes de l'application elle-même. Ceux-ci peuvent concerner le mécanisme de l'application elle-même, les mécanismes du serveur ou même les bizarreries des navigateurs Web.

Ils devraient également être en mesure de trouver et d'exploiter les types de vulnérabilités suivants :

- Vulnérabilités de la logique opérationnelle
- Conditions de course
- Divulgation excessive d'informations
- Falsification de requête intersite
- Vulnérabilités de téléversement de fichiers

---
## Section Principale

### Quelles sont les vulnérabilités de la logique d'application ?

Les vulnérabilités de la logique d'application sont souvent décrites comme des bugs qui permettent à un utilisateur d'une application de subvertir les mécanismes de la conception d'un système d'application, plutôt que d'attaquer l'implémentation de l'application. En parallèle, la catégorie est également fréquemment utilisée comme un fourre-tout pour les classes de vulnérabilité qui ne correspondent pas parfaitement à une autre catégorie. Certaines vulnérabilités exploitent très clairement la logique de l'application. Par exemple, si vous avez une fonction de transfert d'argent qui tronque les fractions de centimes lors du retrait d'argent du compte source, mais dépose ces fractions de centimes dans le compte cible, vous pouvez générer de l'argent en transférant des fonds de façon circulaire. D'autres vulnérabilités sont beaucoup plus ténues, comme fournir un fichier PHP à un formulaire censé accepter une image de profil, puis exécuter ce code PHP lorsque vous visitez la page pour consulter la photo de profil.

Dans tous les cas, les vulnérabilités de ce sous-thème sont fréquemment présentes dans les applications Web et devraient résumer votre compréhension des vulnérabilités courantes.

#### Vulnérabilités de la logique opérationnelle

Le nom « vulnérabilités de la logique opérationnelle » provient évidemment du domaine de test des applications liées au commerce, mais il est possible d'omettre le mot « opérationnelle » du nom. Nous l'incluons parce que le terme est populaire parmi les ressources qui parlent de tests d'applications. Dans tous les cas, ces vulnérabilités peuvent être regroupées, car elles se rapportent davantage aux mécanismes abstraits du traitement des données au sein d'une application.

Accédez au thème [Vulnérabilités de la logique opérationnelle de PortSwigger Academy](https://portswigger.net/web-security/logic-flaws) et complétez la lecture et les exercices pratiques.

#### Conditions de course

Les vulnérabilités de condition de course font référence à des bugs qui permettent à un cybercriminel d'initier un processus, puis d'effectuer certaines actions qui ne sont normalement pas autorisées avant la fin du processus. Par exemple, envisagez un site de partage de fichiers qui vous permet de téléverser des fichiers et de dupliquer les fichiers téléversés. Pour protéger ses utilisateurs, le site analyse les fichiers téléversés pour vérifier qu'ils ne contiennent aucun logiciel malveillant, et les supprime dans le cas contraire. Évidemment, les copies de fichiers n'ont pas besoin d'être scannées, car tous les fichiers téléversés l'ont déjà été, n'est-ce pas ? Eh bien, disons que pour améliorer la réactivité du site, le processus qui analyse (et supprime) les fichiers téléversés est exécuté en arrière-plan sur le serveur Web. Un cybercriminel pourrait téléverser un fichier contenant un logiciel malveillant, puis le copier immédiatement sur le site. Tant que l'analyse ne sera pas terminée, le fichier existera toujours sur le serveur et la copie fonctionnera. Lorsque l'analyse sera terminée, le fichier original sera supprimé, mais la copie restera. Il existe de nombreux autres types de vulnérabilités liées aux conditions de course. Ce sous-thème en explore quelques-unes.

Accédez au thème [Conditions de course de PortSwigger Academy](https://portswigger.net/web-security/race-conditions) et complétez la lecture et les exercices pratiques.

#### Divulgation excessive d'informations

Les vulnérabilités de divulgation d'informations se produisent lorsqu'une application ou son infrastructure renvoie des informations sensibles au navigateur. Ces informations peuvent être affichées dans la fenêtre du navigateur ou masquées dans du code HTML non rendu. Les endroits courants d'où ces informations peuvent fuir sont les messages d'erreur, les commentaires HTML ou les champs cachés, les fichiers étrangers sur le serveur Web, etc. Bien que dans la plupart des cas ces fuites d'informations ne soient pas graves, dans certains cas, les informations révélées peuvent avoir un impact catastrophique sur la sécurité de l'application Web, comme lorsqu'une clé API tierce secrète est révélée.

Accédez au thème [Divulgation d'informations de PortSwigger Academy](https://portswigger.net/web-security/information-disclosure) et complétez la lecture et les exercices pratiques.

#### Falsification de requête intersite

La falsification de requête intersite (Cross-Site Request Forgery, ou « CSRF ») est une vulnérabilité intéressante résultant de l'interaction entre les sites Web et les navigateurs. Envisagez un service de paiement entre pairs. Il accepte les demandes GET comme <http://victim.com/transfer?to-account=xyz&amount=123>. Il permet uniquement aux utilisateurs authentifiés de transférer de l'argent en vérifiant leurs cookies de session. Cependant, si un cybercriminel publiait un message dans un forum en ligne qui contenait un lien d'image comme &lt;img src="<http://victim.com/transfer?to-account=xyz&amount=123>"&gt;, que se passerait-il ? Every time someone viewed the post, their browser would see the image tag and try to load the image. Cela enverrait une requête à victim.com, en incluant les cookies du site. Si l'utilisateur est déjà connecté au site de paiement, cela aurait pour effet de transférer de l'argent sur le compte XYZ. Le problème ici est que le langage HTML et JavaScript permettent aux sites Web d'inciter les navigateurs des utilisateurs à envoyer des requêtes à d'autres sites, ce qui inclut par défaut les cookies de ces autres sites.

Accédez au thème [Falsification de requête intersite de PortSwigger Academy](https://portswigger.net/web-security/csrf) et complétez la lecture et les exercices pratiques.

#### Vulnérabilités de téléversement de fichiers

Ce sous-thème couvre le cas où un cybercriminel peut téléverser des fichiers sur un site Web, par exemple une photo de profil, mais où le fichier est interprété comme du code soit côté client (en provoquant un XSS) ou côté serveur (provoquant une exécution du code). Une technique courante utilisée par les cybercriminels lors de l'exploitation de ce dernier type consiste à téléverser un [web shell](https://en.wikipedia.org/wiki/Web_shell), un petit script qui prend une commande shell d'un utilisateur (généralement via un paramètre URL), exécute la commande shell sur le serveur, puis retourne les résultats.

Si vous testez un site et souhaitez téléverser un shell web, il est très important que vous y ajoutiez un mot de passe. Ce n'est pas parce que vous pouvez téléverser un fichier sur le serveur que vous pouvez le supprimer. Vous pourriez vous retrouver dans une situation où vous comptez sur le propriétaire du site pour supprimer le fichier. L'ajout d'un mot de passe peut être simple. Il existe des [web shells disponibles dans de nombreuses langues](https://www.kali.org/tools/webshells/), mais voici un exemple PHP simple :

{{< highlight php >}}
<?php echo system($_GET['command']);?>
{{< / highlight >}}

Pour y ajouter un mot de passe, nous le modifions simplement comme ceci :

{{< highlight php >}}
<?php
_if_ (_$\_GET_['password'] _==_ 'Un mot de passe super secret que personne d'autre ne connait.') {
    _echo_ system(_$_GET_['command']);
} _else_ {
    http_response_code(404);
}
?>
{{< / highlight >}}


Cela garantira que toute personne qui tombe sur votre shell web axé sur les tests ne pourra pas l'utiliser à ses propres fins malveillantes.

Assurez-vous de lire et de comprendre comment fonctionne un shell web avant de le téléverser. Vous devriez vérifier que le shell exécutera uniquement ce que vous lui demanderez et ne communiquera avec aucun autre serveur.

## Contrôle de compétence

PortSwigger Academy propose une série d'exercices pratiques que vous pouvez utiliser pour tester et valider vos compétences. Pour chacun des sujets suivants, remplissez un ou trois des exercices pratiques de niveau « praticien » :

- [Vulnérabilités de la logique opérationnelle](https://portswigger.net/web-security/all-labs#business-logic-vulnerabilities)
- [Conditions de course](https://portswigger.net/web-security/all-labs#race-conditions)
- [Divulgation d'informations](https://portswigger.net/web-security/all-labs#information-disclosure)

Si vous travaillez avec un pair ou un mentor, expliquez-lui comment chaque attaque fonctionne et comment vous pourriez trouver et démontrer l'exploitabilité de vulnérabilités similaires sur un site que vous avez testé.

## Ressources d'apprentissage

{{% resource title="Web shells" description="Un aperçu rapide de ce qu'est un shell web et comment il pourrait être utilisé dans le cadre d'attaques" languages="anglais, kurde, chinois, coréen, français, lombard, hindi, malayalam" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Code_encoquill%C3%A9" %}}
{{% resource title="Webshells | Kali Linux Tools" description="Un regard sur les webshells disponibles dans une installation par défaut de Kali Linux" languages="Anglais" cost="Gratuit" url="https://www.kali.org/tools/webshells/" %}}