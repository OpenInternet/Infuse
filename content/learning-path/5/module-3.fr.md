+++
style = "module"
weight = 3
title = "Authentication and Authorization"
description = "De nombreuses applications web n'autorisent que certains utilisateurs à accéder à certains contenus spécifiques et leur demandent de se connecter ou de prouver leur identité par d'autres moyens. Ce sous-sujet explore l'authentification et l'autorisation, ainsi que les vulnérabilités potentielles qui y sont liées."
+++

## Cas d'utilisation

De nombreuses applications Web ne permettent qu'à des utilisateurs particuliers de visualiser certains contenus et les obligent à se connecter ou à prouver leur identité par d'autres moyens. Les cybercriminels qui veulent accéder à des données sensibles essaieront souvent de contourner ces restrictions et de consulter les informations qu'ils ne sont pas autorisés à voir. Ce sous-thème examine l'idée d'authentification et d'autorisation, et les vulnérabilités possibles.

## Objectifs

Après avoir terminé ce sous-thème, les participants seront en mesure de trouver des faiblesses dans les applications Web qui leur permettent de contourner partiellement ou complètement les systèmes d'authentification de ces applications ou d'abuser de l'authentification pour divulguer des informations sur les utilisateurs d'un site.

Ils devraient également être en mesure de trouver et d'exploiter les types de vulnérabilités suivants :

- Authentification
- Autorisation

---
## Section Principale

### Que sont les vulnérabilités d'authentification et d'autorisation ?

L'authentification et l'autorisation sont les deux faces d'un même concept et sont principalement responsables de la protection de la confidentialité et de l'intégrité des données dans une application. L'authentification est le processus de validation selon lequel un utilisateur est bien celui qu'il prétend être, ce qui garantit que l'utilisateur n'a accès qu'aux données et aux capacités auxquelles il a droit. Bien que les attaques de validation de données puissent permettre à un cybercriminel de contourner les mécanismes de contrôle d'accès d'une application (par exemple, le téléchargement d'une base de données entière avec SQLi), les fonctionnalités d'authentification et d'autorisation implémentent directement des contrôles d'accès.

#### Authentification

Les applications qui ne dépendent pas d'un tiers (par exemple, se connecter avec Google/Facebook/etc.) pour l'authentification implémentent généralement leurs propres systèmes d'authentification. Malheureusement, l'authentification des utilisateurs est assez subtile et très importante. C'est pourquoi il y aura probablement des faiblesses subtiles et/ou catastrophiques dans les systèmes d'authentification, car les développeurs reproduisent souvent les mêmes erreurs. Bien que la gamme de vulnérabilités possibles soit illimitée, nous allons en explorer quelques-unes dans ce sous-thème.

Accédez au thème [Authentification de PortSwigger Academy](https://portswigger.net/web-security/authentication) et complétez la lecture et les exercices pratiques.

#### Autorisation

Il est très rare que les cadres d'application Web fournissent automatiquement des services d'autorisation aux développeurs, de sorte que ces derniers doivent implémenter leurs propres systèmes de manière cohérente. Bien que les contrôles d'autorisation soient généralement très simples, ils sont extrêmement faciles à ignorer par endroits. Tout comme la mise en œuvre des contrôles d'autorisation, les tests pour les contrôles d'autorisation sont simples dans leur concept, mais nécessitent une très grande cohérence.

En général, les contrôles d'autorisation sont divisés en contrôles verticaux et horizontaux. L'autorisation verticale garantit que les utilisateurs disposent uniquement des capacités pour lesquelles ils sont autorisés. Par exemple, les émetteurs d'un système de billetterie en ligne ne devraient pas pouvoir accéder à l'interface d'administration. L'autorisation horizontale garantit que les utilisateurs ne peuvent accéder qu'aux données qu'ils ont le droit de consulter. Par exemple, les émetteurs d'un système de billetterie devraient voir leur propre historique de billets, mais pas ceux des autres.

Lors des tests d'autorisation, il est très efficace d'avoir plusieurs profils de navigateur (ou même différents navigateurs) ouverts à la fois, chacun avec un utilisateur connecté différent. De cette façon, si vous voulez vérifier si l'utilisateur A a accès à une page que seul l'utilisateur B devrait pouvoir voir, vous pouvez simplement coller l'URL dans la session du navigateur de l'utilisateur A. D'autres vérifications (telles que les requêtes POST) peuvent être impliquées, mais sont encore plus rapides avec plusieurs profils de navigateur.

Accédez au thème [Contrôle des accès de PortSwigger Academy](https://portswigger.net/web-security/access-control) et complétez la lecture et les exercices pratiques.

## Contrôle de compétence

PortSwigger Academy propose une série d'exercices pratiques que vous pouvez utiliser pour tester et valider vos compétences. Pour chacun des sujets suivants, remplissez un ou trois des exercices pratiques de niveau « praticien » :

- [Authentification](https://portswigger.net/web-security/all-labs#authentication)
- [Vulnérabilités du contrôle des accès](https://portswigger.net/web-security/all-labs#access-control-vulnerabilities)

Si vous travaillez avec un pair ou un mentor, expliquez-lui comment chaque attaque fonctionne et comment vous pourriez trouver et démontrer l'exploitabilité de vulnérabilités similaires sur un site que vous avez testé.