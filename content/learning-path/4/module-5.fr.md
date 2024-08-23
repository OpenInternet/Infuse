+++
style = "module"
weight = 5
title = "Logique d'application"
description = "Ici, nous apprenons ce que sont les vulnérabilités de la logique applicative et comment protéger notre site web contre celles-ci."
+++

## Cas d'utilisation

Dans tout site Web interactif qui impose des contraintes sur les types d'actions que les utilisateurs peuvent effectuer, il est important que le site applique correctement ces contraintes pour empêcher les actions involontaires et les actions (potentiellement) dommageables effectuées par des utilisateurs malveillants.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre le concept des vulnérabilités de la logique d'application
- Identifier et comprendre les sous-classes communes de vulnérabilités de logique d'application, notamment :
  - Contrôles côté client
  - Absence de limites de taux/envois multiples
  - Incohérences d'arrondissement
  - Omission d'étapes dans le processus
  - Falsification de requête intersite

---
## Section Principale

Les vulnérabilités de logique d'application (souvent appelées vulnérabilités de logique opérationnelles) sont une classe de vulnérabilités vaguement assemblées qui se rapportent aux processus que l'application elle-même exécute, par opposition aux vulnérabilités sous-jacentes des technologies utilisées par l'application. Si cette définition vous déroute, ne vous en faites pas. Ce qui constitue une vulnérabilité de logique opérationnelle par rapport à une autre classe est vivement contesté. Infuse est d'avis que la définition n'a pas tellement d'importance et que la commodité est plus importante que la précision de la définition. Nous vous encourageons à vous concentrer sur les vulnérabilités elles-mêmes, à développer une vision des classes de vulnérabilités qui vous convient et à maintenir une certaine flexibilité dans la taxonomie lorsque vous discutez des vulnérabilités avec d'autres intervenants.

Ce sous-thème couvrira un certain nombre d'exemples de vulnérabilités qui relèvent sans doute de la logique d'application. Comme chaque application est légèrement différente, il existe un nombre infini de types potentiels de vulnérabilités de logique d'application, mais ces exemples couvrent un certain nombre de vulnérabilités courantes.

### Contrôles côté client

Parfois, les applications Web imposent des contraintes à ce que les utilisateurs peuvent faire dans l'application, mais ces contraintes sont appliquées par le navigateur, soit en utilisant JavaScript ou des fonctionnalités intégrées des éléments HTML. Il est important que les développeurs de sites réalisent que tout ce qui est envoyé au navigateur peut être vu, modifié ou ignoré par un cybercriminel moyennement qualifié. Voici quelques exemples de contrôles courants côté client qui peuvent être facilement contournés :

#### Taille de l'entrée

Les éléments d'entrée HTML ont un attribut maxlength qui prétend limiter le nombre de caractères saisis dans un champ de saisie, p. ex. `<input type="text" name="firstname" maxlength="20">`. Dans cet exemple, si un utilisateur essaie de mettre plus de 20 caractères dans le champ de saisie, le navigateur l'empêchera de le faire. Cependant, il ne s'agit que d'une demande de courtoisie, par opposition à une véritable restriction. Par exemple :

- L'utilisateur peut utiliser la fonction d'inspecteur Web de son navigateur pour modifier le DOM afin de supprimer la restriction de longueur.
- L'utilisateur peut enregistrer la page Web localement, modifier le code HTML pour supprimer la restriction, puis charger la page dans son navigateur.
- L'utilisateur peut lire le code HTML et créer manuellement une requête équivalente dans `curl` (un outil de ligne de commande pour télécharger des ressources et transférer des données en utilisant une variété de protocoles différents) vers celui que le formulaire génère, mais sans restriction de longueur.
- L'utilisateur peut utiliser un outil spécialisé appelé un proxy d'interception pour capturer la page Web du serveur avant qu'elle soit envoyée au navigateur et supprimer la restriction avant de l'envoyer au navigateur. Ou l'utilisateur peut utiliser le même outil pour capturer la requête du navigateur avant qu'elle soit envoyée au serveur, puis modifier la requête pour inclure une valeur plus longue et l'envoyer au serveur.

Ces techniques de contournement fonctionnent généralement pour tous les contrôles côté client. Gardez-les à l'esprit lorsque nous couvrirons d'autres contrôles.

#### Validation du contenu des données

Certains développeurs utilisent JavaScript pour restreindre les valeurs qui peuvent être saisies dans un formulaire ou utilisent des contrôles HTML comme des boutons radio ou des menus déroulants pour limiter les choix possibles. Aucun de ces contrôles n'est efficace. En utilisant les mêmes techniques que celles décrites ci-dessus, les cybercriminels peuvent supprimer les restrictions dans leur navigateur ou les contourner pour soumettre les données qu'ils veulent.

Une sous-classe commune de ce type de vulnérabilité concerne le redimensionnement des images. Parfois, les développeurs auront une fonctionnalité sur un site Web pour redimensionner les images côté serveur et fournir un affichage optimal selon la résolution. Généralement, l'URL ressemblera à quelque chose comme [http://exemple.com/image?imgname=file.gif&width=640&height=480](http://example.com/image?imgname=file.gif&width=640&height=480). La façon dont ces scripts fonctionnent presque toujours consiste à allouer de l'espace en mémoire pour contenir l'image redimensionnée, redimensionner le fichier spécifié à la nouvelle taille, puis renvoyer les données de l'image au navigateur. Dans l'exemple ci-dessus, la mémoire allouée serait généralement de 1,2 Mo. Cependant, si un utilisateur envoie une requête avec une largeur et une hauteur de 100 000 pour chaque valeur, le serveur tentera d'allouer 10 Go. En envoyant de telles requêtes à plusieurs reprises, un cybercriminel peut facilement submerger même un serveur Web puissant. Les développeurs devraient au moins imposer une taille maximale côté serveur et envisager de déléguer le processus de redimensionnement vers un serveur isolé, afin que la surcharge de ce serveur n'affecte pas le serveur principal.

#### Désactivation des contrôles

Parfois, les développeurs utilisent JavaScript pour désactiver certains contrôles sur une page Web jusqu'à ce que certaines contraintes soient respectées. Par exemple, l'utilisateur devra peut-être résoudre un CAPTCHA ou attendre un certain temps avant de soumettre un formulaire ou de cliquer sur un lien. En utilisant les techniques ci-dessus, un cybercriminel peut simplement supprimer ou contourner ces contrôles.

#### Données sensibles stockées côté client

Parfois, les développeurs incluent des données sensibles dans une page Web secrète ou qui contrôle quelque chose qui ne devrait pas être sous le contrôle de l'utilisateur. Un exemple du premier cas pourrait être une tentative de restreindre les données qu'un utilisateur voit en cachant des données secrètes à l'aide de l'attribut CSS display=none, en les enfermant dans des commentaires HTML ou d'autres mécanismes. L'utilisateur peut voir ces données en consultant simplement le code source HTML de la page Web. Exemple de contrôle côté client en incluant des données qui ne doivent pas être modifiées dans des champs de formulaire masqués. Par exemple, aux débuts du commerce électronique, les boutiques en ligne incluaient fréquemment le prix des articles dans un formulaire HTML caché, qui était ensuite envoyé à un panier tiers. À l'aide des techniques décrites dans la section « Taille des entrées », les utilisateurs pourraient facilement modifier la valeur dans ce champ caché et l’acheter au prix qu’ils veulent. (Vous vous souviendrez peut-être qu’un autre exemple de ce type de vulnérabilité a été abordé sous « Escalade horizontale des privilèges » ci-dessus.)

#### Prévention des vulnérabilités de contrôle côté client

Il n'y a rien de mal en soi à effectuer la validation des entrées sur le site client, mais les développeurs doivent comprendre qu'il ne s'agit que de commodités pour l'interface utilisateur. Toutes les validations et tous les calculs sensibles doivent être effectués sur le serveur et non du côté client.

### Absence de limites de taux/envois multiples

Une classe de vulnérabilité de logique d'application concerne la contrainte implicite appliquée au nombre de répétitions ou à la fréquence avec laquelle une requête peut être envoyée. Le premier cas est souvent utilisé abusivement lorsque le serveur effectue des opérations coûteuses ou susceptibles de faire l'objet d'abus, telles que l'insertion de données dans une base de données contenant de nombreux indices, l'envoi d'e-mails ou de messages SMS, ou généralement la manipulation de grandes quantités de données. La vulnérabilité de redimensionnement d'image évoquée ci-dessus en serait un autre exemple. Les développeurs ne pensent généralement pas au taux auquel les utilisateurs soumettent de telles requêtes comme une contrainte de logique d'application à appliquer, et pourtant cela s'intègre sans doute dans la classe de vulnérabilité.

Il existe de nombreuses méthodes de limitation des requêtes, mais les seules qui sont vraiment efficaces sont celles qui sont appliquées du côté serveur. Pour les opérations coûteuses, divers systèmes de file d'attente peuvent être utilisés pour garantir que seul un petit nombre de ces opérations peuvent être effectuées en même temps. Des systèmes plus complexes impliquant des CAPTCHA, et une limitation du débit par compte et par adresse IP peuvent être nécessaires pour les opérations fréquemment sujettes aux abus.

Un autre cas connexe concerne les demandes qui ne doivent être soumises qu'une ou plusieurs fois. En exemple, nous pourrions imaginer un site d'assistance qui permet aux utilisateurs de générer un numéro de ticket. Si un utilisateur peut, par exemple, enregistrer 20 tickets, et les lier tous à un cas/une intervention spécifique, cela aura un effet négatif sur les propriétaires du site !

### Incohérences d'arrondissement

Une classe intéressante de vulnérabilités concerne la façon dont les différentes opérations gèrent les factions. Cette classe de vulnérabilités a été présentée dans des films tels que _Superman 3_ et _Office Space_, mais se produit toujours dans de nombreuses applications financières. Si deux applications prennent en charge le transfert d'argent entre elles, il est important de savoir comment traiter les fractions de centimes. Si une application arrondit des fractions de centimes et qu'une autre les tronque, alors un cybercriminel peut transférer à plusieurs reprises 1,9 centime de l'application tronquée à l'application d'arrondissement. Chaque transfert coûtera à l'utilisateur 1 centime (1,9 tronqué) et lui rapportera 2 centimes (1,9 arrondi)

Il existe de nombreuses façons de prévenir les vulnérabilités en cas d'arrondissement. Le plus simple est de rejeter les transactions présentant des valeurs fractionnaires. Alternativement, il est possible de prendre en charge pleinement les devises fractionnées. Enfin, s'il est nécessaire d'arrondir/tronquer/etc., il convient de s'assurer que le traitement des fractions est uniforme.

### Omission d'étapes dans le processus

Souvent, les sites Web ont des processus qui sont présentés aux utilisateurs comme une série d'étapes. Bien que l'intention des développeurs soit de guider les utilisateurs par chaque étape du processus, il arrivera souvent que l'application permette aux utilisateurs de terminer le processus sans passer par chaque étape. Envisagez un site d'achat en ligne qui permet aux utilisateurs d'ajouter des articles à leur panier, de spécifier leurs options de livraison, de spécifier leurs informations de paiement, puis de finaliser la transaction. Il n'est pas rare que des sites réels effectuent la transaction si l'utilisateur effectue simplement les deux premières étapes, puis accède directement à la page de transaction complète. Bien que cela soit rare dans les cas des sites de commerce électronique réels, il n'est pas rare de l'observer dans les diverses plateformes d'apprentissage en ligne, où l'utilisateur peut ignorer les vidéos ennuyeuses et accéder directement à la page qui marque leur participation comme étant complète

### Falsification de requête intersite

Notre dernière vulnérabilité de logique d'application est souvent considérée comme sa propre classe de vulnérabilité, mais nous l'incluons ici pour plus de commodité. La base de la CSRF (falsification de requête intersite) a lieu lorsqu'un navigateur Web envoie à un site Web les cookies d'un utilisateur pour chaque requête adressée à ce site, quel que soit le site qui a généré la requête. Si un site malveillant, lorsqu'un utilisateur le visite, génère une requête frauduleuse à un site cible et que l'utilisateur est connecté au site cible, le site cible effectuera l'action demandée en tant qu'utilisateur, même si l'utilisateur n'a pas intentionnellement envoyé la requête.

Par exemple, considérez un site où le mécanisme de réinitialisation du mot de passe veut que le site vous envoie un lien qui vous permet de modifier votre mot de passe. Ce qui est tout à fait normal. Imaginez que le même site a une page qui vous permet de modifier votre adresse e-mail et que si vous visitez simplement [exemple.com/changeemail?new=123@cybercriminel.com](http://example.com/changeemail?new=123@attacker.com), votre adresse e-mail sera remplacée par l'adresse indiquée. Enfin, imaginez que cybercriminel.com soit configuré pour afficher page après page des photos d'animaux adorables. Il y a une astuce. Le bouton « suivant » au bas de la page est en fait le lien ci-dessus. Si un utilisateur est connecté à exemple.com, visite le site cybercriminel.com et clique sur le bouton « suivant », son adresse e-mail sera modifiée et le cybercriminel pourra immédiatement réinitialiser le mot de passe de l'utilisateur et prendre le contrôle de son compte.

#### Essayez par vous-même

Connectez-vous à votre DVWA et assurez-vous que le niveau de sécurité est faible. Accédez à la page « CSRF » et essayez de générer une page Web qui changera le mot de passe de l'utilisateur connecté. Notez que, si vous avez un navigateur Web à jour, il peut restreindre automatiquement les attributs SameSite des cookies de session et l'exercice pratique risque alors de ne pas fonctionner. Si c'est le cas, ne vous inquiétez pas et ignorez cet exercice : c'est un comportement normal et souhaité par un navigateur Web.

### Prévention des CSRF

Le moyen le plus simple d'empêcher les CSRF est de définir explicitement l'attribut SameSite des cookies de session sur Lax ou Strict, et de s'assurer que toute demande de modification de données ne modifie ces données que si elle est soumise avec HTTP POST. D'autres méthodes peuvent fonctionner, mais sont plus complexes.

Pour obtenir plus d'informations sur CSRF, consultez la [page de l'OWASP à ce sujet](https://owasp.org/www-community/attacks/csrf) et la [fiche de protection contre les CSRF de l'OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

Pour obtenir une exploration approfondie des vulnérabilités CSRF et de la logique d'application, consultez le [parcours d'apprentissage Évaluation de la sécurité des applications Web](/fr/learning-path/5/).

## Contrôle de compétence

Pour cette section, nous avons décidé d'ignorer le contrôle des compétences pour une raison très simple : les navigateurs Web modifient actuellement leurs politiques afin que les politiques de cookies SameSite soient maintenant Lax par défaut, ce qui devrait automatiquement empêcher de nombreuses attaques CSRF de fonctionner. Pour cette raison, tous les exercices que nous suggérons pourraient ne plus fonctionner à l'avenir.

Si vous souhaitez toujours effectuer un contrôle des compétences, essayez l'exercice pratique DVWA lié ci-dessus pour voir s'il fonctionne. Si ce n'est pas le cas, discutez brièvement avec un pair ou un mentor des raisons pour lesquelles les changements apportés aux paramètres par défaut des navigateurs Web signifient que l'exercice pratique ne fonctionne plus et demandez-lui de vérifier que vous avez bien compris le sujet.

## Ressources d'apprentissage

{{% resource title="Falsification de requête intersite" description="Un guide de l'OWASP sur la vulnérabilité, son fonctionnement et les mesures préventives qui fonctionnent et ne fonctionnent pas" languages="Anglais" cost="Gratuit" url="https://owasp.org/www-community/attacks/csrf" %}}
{{% resource title="Aide-mémoire sur la prévention de la falsification des requêtes intersites" description="Une liste des mesures d'atténuation potentielles des CSRF, qui sont encouragées et découragées" languages="Anglais" cost="Gratuit" url="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" %}}