+++
style = "module"
weight = 4
title = "Authorisation"
description = "Les utilisateurs connectés n'ont pas accès aux données des autres utilisateurs. Ici, nous examinons comment garantir qu'aucun utilisateur ne dépasse son niveau d'accès ou ses capacités."
+++

## Cas d'utilisation

Dans tout site Web dont les utilisateurs ont différents niveaux de capacités (p. ex., spectateurs et éditeurs) ou qui détient des renseignements confidentiels pour les utilisateurs, il est important que le site protège ces fonctionnalités et/ou ces données des personnes qui n'ont pas la permission d'utiliser ces fonctionnalités et/ou d'interagir avec ces données.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre les types courants de vulnérabilités d'autorisation
- Comprendre les impacts potentiels de ces types de vulnérabilités
- Comprendre les mécanismes par lesquels ces vulnérabilités fonctionnent
- Comprendre dans les grandes lignes comment ces vulnérabilités peuvent être évitées

---
## Section Principale

### Connaissances de base

L'autorisation est le processus qui consiste à s'assurer qu'un utilisateur d'un système a la permission d'effectuer une action ou de créer/lire/modifier/supprimer un élément de données dans ce système, et d'empêcher ces actions si l'utilisateur n'a pas la permission correspondante. En général, ce sont les types de contrôles de sécurité les plus simples à mettre en œuvre et le type de vulnérabilité le plus simple à trouver. Cependant, même si elles sont conceptuellement simples, la sécurisation et la compromission des contrôles sont généralement très fastidieuses et sujettes aux erreurs.

Chaque fois qu'une application Web charge une page contrôlée par accès ou effectue une action contrôlée par accès, elle doit d'abord vérifier que l'utilisateur actuel s'est authentifié avec succès, puis vérifier que cet utilisateur dispose des autorisations appropriées. Généralement, la logique d'autorisation est très spécifique à l'application, de sorte que les frameworks Web fournissent une assistance limitée à cet égard, de sorte que la logique d'autorisation doit être ajoutée manuellement à chaque page. Elle est parfois implémentée dans la logique de la page et parfois implémentée dans les API que les pages Web appellent en interne. Dans tous les cas, si elle est manquante, les utilisateurs non autorisés peuvent faire des choses qu'ils ne sont pas censés pouvoir faire.

Pour faciliter la communication concernant les vulnérabilités, les vulnérabilités d'autorisation sont généralement divisées en trois catégories.

### Authentification manquante

Parfois, les développeurs ne parviennent même pas à vérifier qu'un utilisateur est connecté à une page ou à un ensemble de pages. Tout utilisateur sur Internet peut afficher les pages de post-authentification ou effectuer des actions de post-authentification. Cette classe de vulnérabilité est parfois appelée « navigation forcée » ou « référence directe à un objet ». Ce genre de vulnérabilité se manifeste de plusieurs façons.

L'un des modèles pour cette vulnérabilité consiste à ce qu'un site affiche un ensemble de liens vers des utilisateurs qui ne sont pas connectés, et un autre ensemble de liens vers des utilisateurs qui sont connectés. Cependant, aucune page qui affiche des données spécifiques à l'utilisateur ou effectue des actions ne vérifie réellement que l'utilisateur est connecté.

Un autre modèle courant est que les pages qui rendent des données dans le navigateur comprennent des contrôles d'authentification, contrairement aux pages qui traitent simplement des données (p. ex., via un HTTP POST). Cela est généralement dû au fait que les développeurs n'ont pas une compréhension approfondie du fonctionnement du Web et ne réalisent pas qu'il est assez facile de générer des requêtes HTTP arbitraires. Avec ce modèle, les utilisateurs ne peuvent généralement voir que les données qu'ils sont autorisés à voir, mais peuvent effectuer toute action sur le site et modifier les données des autres utilisateurs. Notez que puisque les utilisateurs peuvent voir et modifier leurs propres données, il est très facile pour les cybercriminels ayant un compte de découvrir l'authentification manquante.

Un troisième modèle commun est que les pages individuelles ou les actions, ou peut-être des sections du site, échoueront simplement à vérifier l'authentification. En général, cela résulte de la négligence des développeurs.

### Escalade verticale des privilèges

L'escalade verticale des privilèges se produit lorsque des utilisateurs aux droits restreints peuvent effectuer des actions de droits étendus sur le site Web. Ceci est généralement causé par l'incapacité du site à vérifier les autorisations, malgré qu'il puisse vérifier le statut d'authentification. Nous avons mentionné ci-dessus que les frameworks n'incluent généralement pas de fonctions intégrées pour l'autorisation, mais beaucoup effectuent des vérifications pour l'authentification. Si une page (ou un site entier) effectue correctement des vérifications d'authentification, mais n'effectue pas de vérifications des autorisations, cela entraîne généralement une escalade verticale des privilèges.

Un exemple d'escalade verticale des privilèges peut avoir lieu dans un forum en ligne qui comprend à la fois des utilisateurs ordinaires et des modérateurs. Lorsque les utilisateurs ordinaires se connectent, ils peuvent créer des publications et modifier leurs propres publications. Lorsque les modérateurs se connectent, ils peuvent également créer des messages et modifier leurs propres messages, mais peuvent également masquer les messages des autres utilisateurs et bannir ces utilisateurs. Si les utilisateurs ordinaires peuvent modifier l'URL ou modifier les paramètres du formulaire pour masquer également les publications des autres utilisateurs ou bannir ces utilisateurs, il s'agirait d'une escalade verticale des privilèges.

Les modèles qui conduisent à une escalade verticale des privilèges sont essentiellement les mêmes que ceux qui conduisent à une authentification manquante, sauf que les utilisateurs doivent être connectés.

#### Essayez par vous-même

Connectez-vous à votre DVWA et assurez-vous que le niveau de sécurité est faible et que vous êtes connecté(e) en tant qu'administrateur (il est préférable de vous déconnecter et de vous reconnecter en utilisant les informations d'identification « admin:password ». Accédez à la page « Contournement de l'autorisation ». Si vous ne pouvez pas voir cette page dans la barre de gauche et que vous avez la version la plus à jour de DVWA, cela signifie que vous n'êtes pas connecté(e) en tant qu'administrateur.

Après cela, ouvrez une fenêtre de navigation privée ou un autre navigateur et connectez-vous à votre DVWA en tant qu'utilisateur « gordonb » et notez que le contournement d'autorisation n'apparaît pas dans la barre de navigation de gordonb. Pouvez-vous trouver comment accéder au contournement d'autorisation en tant que gordonb ? (Si vous rencontrez des problèmes, rappelez-vous que les vulnérabilités d'autorisation sont généralement très simples. Ne cherchez rien de trop compliqué.)

### Escalade horizontale des privilèges

L'escalade horizontale des privilèges se produit lorsque les utilisateurs peuvent afficher ou effectuer des actions sur les données d'autres utilisateurs, lorsque ces autres utilisateurs ont le même niveau d'accès.

Un exemple d'escalade horizontale des privilèges peut avoir lieu dans le forum en ligne ci-dessus. Si un utilisateur ordinaire peut modifier les publications des autres utilisateurs, il s'agirait d'une escalade horizontale des privilèges.

Avec l'escalade horizontale des privilèges, trois grands schémas de développement conduisent à la vulnérabilité. Dans le premier, les pages vérifient que les utilisateurs sont connectés et qu'ils ont le niveau d'accès adéquat, mais échouent complètement à vérifier les autorisations au niveau des données. Généralement, cela se traduira par la vulnérabilité du site entier ou d'une section entière du site. Dans le deuxième, les pages individuelles ou les actions ne parviennent pas à vérifier les autorisations au niveau des données en raison de la négligence des développeurs. Enfin, à l'occasion, les sites Web transmettront l'ID d'utilisateur dans un paramètre d'URL ou un champ de formulaire masqué, au lieu de le lire à partir de la session côté serveur. L'utilisateur final peut facilement modifier ces paramètres, ce qui entraîne généralement une escalade des privilèges.

### Prévention des vulnérabilités d'autorisation

Comme nous l'avons mentionné ci-dessus, les deux causes fondamentales des vulnérabilités d'autorisation ont tendance à être le manque d'attention des développeurs (d'où l'absence de contrôles appropriés pour des sites entiers ou des sections de sites) ou le manque de cohérence dans la mise en œuvre des contrôles. Étant donné que l'assistance du framework est généralement médiocre, les développeurs doivent souvent implémenter leurs propres contrôles à partir de zéro. Voici quelques conseils à prendre en considération :

- Essayez de superposer et de simplifier le processus de vérification des autorisations utilisateur. Si votre framework comprend des fonctions pour assurer les autorisations, utilisez-les. Les fonctions cohérentes pour vérifier les autorisations des utilisateurs sont moins sujettes aux erreurs que la logique complexe.
- Pour les utilisateurs dont les droits sont très étendus, envisagez d'utiliser un site Web entièrement distinct. Par exemple, <www.exemple.com> pour les utilisateurs ordinaires et admin.exemple.com pour les utilisateurs administrateurs.
- Pour les vérifications des autorisations au niveau des données, des directives cohérentes pour les développeurs peuvent réduire les erreurs. Par exemple, une règle selon laquelle tous les accès aux données doivent passer par des appels d'API, chaque fonction d'API doit inclure un paramètre d'ID d'utilisateur, et chaque API qui prend un ID d'utilisateur doit l'utiliser dans les appels de base de données. La mise en œuvre de règles cohérentes comme celle-ci permet d'éviter et de trouver plus facilement les erreurs d'autorisation.

Pour en savoir un peu plus sur l'authentification, consultez [l'aide-mémoire de l'OWASP sur l'autorisation](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). Pour obtenir une exploration approfondie, consultez le [parcours d'apprentissage Évaluation de la sécurité des applications Web](https://docs.google.com/document/d/19v34droskAFgkp_qqcwiQLpc1hI1W-FjzHNV2QRBsaA/edit?usp=sharing).

## Ressources d'apprentissage


## Exercice pratique

Lisez ce [rapport de vulnérabilité](https://eaton-works.com/2023/06/06/honda-ecommerce-hack/) et assurez-vous que vous avez compris les vulnérabilités d'authentification ou d'autorisation qui sont exploitées ici.

## Contrôle de compétence

### Exercice 1 : récapitulatif

Effectuez l'exercice de contournement de l'autorisation DVWA, comme indiqué ci-dessus.

### Exercice 2 : questionnaire à choix multiples

**Question 1**. Quel est le but principal de l'autorisation au sein d'un système ?

A) Authentifier les utilisateurs\
B) Garantir l'intégrité des données\
C) Vérifier les permissions des utilisateurs\
D) Chiffrer les informations sensibles

{{< question title="Corrigé" >}}
C) Vérifier les permissions des utilisateurs
{{< /question >}}

**Question 2**. Quelle catégorie de vulnérabilité implique que les développeurs ne vérifient pas si un utilisateur est connecté à certaines pages ?

A) Escalade verticale des privilèges\
B) Escalade horizontale des privilèges\
C) Authentification manquante\
D) Navigation forcée

{{< question title="Corrigé" >}}
C) Authentification manquante
{{< /question >}}

**Question 3**. Parmi les options suivantes, quel est le modèle courant de vulnérabilité d'authentification manquante mentionnée dans le texte du sous-thème ?

A) Échec de la vérification des autorisations sur les actions au niveau des données\
B) Passage des ID d'utilisateur dans les paramètres de l'URL\
C) Possibilité pour les utilisateurs de modifier leurs propres données\
D) Affichage de différents liens en fonction du statut de connexion de l'utilisateur

{{< question title="Corrigé" >}}
D) Affichage de différents liens en fonction du statut de connexion de l'utilisateur
{{< /question >}}

**Question 4**. Quel est le résultat de la vulnérabilité d'escalade verticale des privilèges ?

A) Les utilisateurs peuvent accéder à des données non autorisées\
B) Les utilisateurs aux droits plus restreints peuvent effectuer des actions de droits étendus qu'ils ne sont pas censés pouvoir faire\
C) Les utilisateurs peuvent modifier les données des autres utilisateurs sans autorisation\
D) L'ensemble du site devient vulnérable aux attaques

{{< question title="Corrigé" >}}
B) Les utilisateurs aux droits plus restreints peuvent effectuer des actions de droits étendus
{{< /question >}}

**Question 5**. Dans le contexte de l'escalade horizontale des privilèges, quelle est l'une des causes communes de vulnérabilité selon le texte du sous-thème ?

A) Manque d'attention des développeurs\
B) Mise en œuvre incohérente des contrôles\
C) Passage des ID d'utilisateur dans les paramètres de l'URL\
D) Protocoles de chiffrement insuffisants

{{< question title="Corrigé" >}}
B) Mise en œuvre incohérente des contrôles
{{< /question >}}

**Question 6**. Comment les développeurs peuvent-ils prévenir les vulnérabilités d'autorisation selon le texte du sous-thème ?

A) Utiliser une logique complexe pour les vérifications d'autorisation\
B) Compter uniquement sur l'assistance du framework\
C) Mettre en œuvre leurs propres contrôles de manière cohérente\
D) Ignorer les vérifications des autorisations au niveau des données

{{< question title="Corrigé" >}}
C) Mettre en œuvre leurs propres contrôles de manière cohérente
{{< /question >}}

**Question 7**. Lequel des éléments suivants n'est PAS un conseil mentionné dans le texte pour prévenir les vulnérabilités d'autorisation ?

A) Superposer et simplifier le processus de vérification des autorisations des utilisateurs\
B) Utiliser des sites Web distincts pour les utilisateurs ordinaires et les administrateurs\
C) Se fier uniquement aux fonctions du framework pour l'autorisation\
D) Établir des directives cohérentes pour l'accès aux données

{{< question title="Corrigé" >}}
C) Se fier uniquement aux fonctions du framework pour l'autorisation
{{< /question >}}

**Question 8**. Quelle est l'importance de la cohérence dans la mise en œuvre des contrôles d'autorisation ?

A) Elle augmente la complexité du système\
B) Elle réduit la probabilité d'erreurs\
C) Elle limite l'accès à certains utilisateurs\
D) Elle rend les contrôles d'autorisation plus difficiles

{{< question title="Corrigé" >}}
B) Elle réduit la probabilité d'erreurs
{{< /question >}}

**Question 9**. Parmi les options suivantes, quel est l'exemple fourni dans le texte du sous-thème de vulnérabilité en d'escalade verticale des privilèges ?

A) Modifier les paramètres des URL pour passer les privilèges\
B) Permettre aux utilisateurs de voir les données des autres utilisateurs\
C) Passer les ID des utilisateurs dans des champs de formulaire masqués\
D) Donner aux utilisateurs ordinaires un accès aux fonctionnalités d'administration

{{< question title="Corrigé" >}}
D) Donner aux utilisateurs ordinaires un accès aux fonctionnalités d'administration
{{< /question >}}

**Question 10**. Quelle catégorie de vulnérabilité implique que les utilisateurs peuvent effectuer des actions sur les données d'autres utilisateurs avec le même niveau d'accès ?

A) Authentification manquante\
B) Escalade verticale des privilèges\
C) Escalade horizontale des privilèges\
D) Navigation forcée

{{< question title="Corrigé" >}}
C) Escalade horizontale des privilèges
{{< /question >}}

### Exercice 3 (facultatif, seulement pour ceux qui ont des connaissances de base de Python)

Le code simule une application Web vulnérable avec une vulnérabilité d'escalade horizontale des privilèges. La vulnérabilité réside dans le fait que la fonction delete_profile ne vérifie que l'autorisation d'écriture de l'utilisateur actuel, mais ne vérifie pas si l'utilisateur actuel est autorisé à supprimer les profils des autres utilisateurs. Cela permet à tout utilisateur disposant d'une autorisation d'écriture de supprimer les profils des autres utilisateurs, indépendamment de ses propres autorisations.

{{< highlight python >}}
# Instruction d'importation pour la fonction d'impression (Python 3.x)
from __future__ import print_function

# Données de l'utilisateur (remplacer par vos propres données de test)
users = {
    "admin": {"id": 1, "username": "admin", "permissions": ["read", "write", "delete"]},
    "user1": {"id": 2, "username": "user1", "permissions": ["read", "write"]},
    "user2": {"id": 3, "username": "user2", "permissions": ["read", "write"]},
}

# Fonction pour simuler la récupération du profil d'un utilisateur
def get_profile(username):
    if username not in users:
        return None
    return users[username]

# Fonction pour simuler la suppression du profil d'un utilisateur (vulnérable)
def delete_profile(username, current_user):
    if "write" in current_user["permissions"]:
        if username in users:
            del users[username]
            return f"User '{username}' deleted successfully."
        else:
            return f"User '{username}' not found."
    else:
        return "Autorisation refusée : vous n'avez pas l'autorisation de supprimer des utilisateurs.."

# Cas de test (modifier au besoin)
current_user = users["user1"]  # Simuler un utilisateur avec une autorisation d'écriture
target_username = "user2"  # Simuler l'utilisateur cible

# Tenter de supprimer le profil de la victime
result = delete_profile(target_username, current_user)

# Afficher le résultat (sortie attendue : "Autorisation refusée : vous n'avez pas l'autorisation de supprimer des utilisateurs.")
print(result)
{{< / highlight >}}

**Trouvez et corrigez la vulnérabilité dans la fonction « delete_profile ».**

{{< question title="Corrigé et explication" >}}
La vulnérabilité réside dans le fait que la fonction `delete_profile` ne vérifie que l'autorisation d'écriture de l'utilisateur actuel, mais ne vérifie pas si l'utilisateur actuel est autorisé à supprimer les profils des autres utilisateurs. Cela permet à tout utilisateur disposant d'une autorisation d'écriture de supprimer les profils des autres utilisateurs, indépendamment de ses propres autorisations.

**Pour corriger la vulnérabilité, vous pouvez :**

1. Vérifier si l'utilisateur actuel a l'autorisation « supprimer » spécifique.
2. Implémenter le contrôle d'accès basé sur les rôles (RBAC) pour restreindre la suppression en fonction des rôles des utilisateurs.
3. Ajouter des vérifications supplémentaires pour vérifier la légitimité de la requête de suppression.
{{< /question >}}

## Ressources d'apprentissage

{{% resource title="Fiche pratique sur l'autorisation" languages="Anglais" cost="Gratuit" description="Meilleures pratiques pour l'autorisation dans les applications web." url="https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" %}}

{{% resource title="Hack de Honda eCommerce" languages="Anglais" cost="Gratuit" description="Démonstration de vulnérabilités dans des sites web avec de mauvaises pratiques d'authentification ou d'autorisation." url="https://eaton-works.com/2023/06/06/honda-ecommerce-hack/" %}}
