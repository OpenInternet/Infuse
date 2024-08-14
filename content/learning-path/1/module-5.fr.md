---
style: module
title: "Enquête passive : analyser les en-têtes d'e-mail"
description: Le sous-thème vous apprendra comment analyser les métadonnées
  détaillées qui documentent l'origine d'un e-mail, les serveurs qu'il a
  parcourus, les informations sur les contrôles de spam possibles et bien plus
  encore. Ces métadonnées peuvent constituer un élément crucial de toute enquête
  approfondie sur les e-mails potentiellement malveillants.
weight: 5
---

## Cas d'utilisation

Il y a beaucoup plus de choses dans les e-mails qu'il n'y paraît. Le sous-thème vous apprendra comment **analyser les métadonnées détaillées** qui documentent l'origine d'un e-mail, les serveurs qu'il a parcourus, les informations sur les contrôles de spam possibles et bien plus encore. Ces métadonnées peuvent constituer un élément crucial de toute enquête approfondie sur les e-mails potentiellement malveillants.

Utilisez cette compétence après ou en parallèle au sous-thème.

Triage dans ce parcours d'apprentissage. Certaines de ces compétences peuvent être nécessaires dans le cadre du processus de triage afin de décider si un message est suspect.

Étant donné que les en-têtes d'e-mails peuvent contenir des références à d'autres domaines et infrastructures, les participants doivent d'abord se familiariser avec le sous-thème 4, qui examine l'analyse du domaine et des informations IP, avant de s'attaquer à celui-ci.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Extraire les en-têtes complets d'un e-mail reçu ou qu'ils analysent ;
- Analyser les en-têtes extraits, en accordant une attention particulière à :
  - L'identité du ou des serveurs qui ont envoyé l'e-mail ;
  - Toute information sur les données SPF ou DKIM que ces en-têtes contiennent ;
  - La possibilité que l'une des informations de l'en-tête ait été usurpée

---

Chaque e-mail a des en-têtes, qui contiennent des métadonnées cruciales concernant l'expéditeur, le destinataire et l'e-mail en lui-même. Dans cette section, nous examinerons les en-têtes d'e-mails, la façon dont vous pouvez les analyser et la façon dont les e-mails peuvent être usurpés. Cela nécessite des connaissances de base

## Connaissances de base

Lisez les ressources et documents ci-dessous pour vous familiariser avec (ou récapituler vos connaissances sur) les en-têtes d'e-mails, SPF et DKIM.

- Comprendre [ce que sont les en-têtes d'e-mails](https://support.google.com/mail/answer/29436?hl=en) et comment nous pouvons les consulter dans plusieurs systèmes
- Comprendre les bases de l'usurpation d'adresse e-mail et utiliser SPF et DKIM pour la combattre
  - En savoir plus sur l'usurpation d'adresse e-mail/apprendre à identifier les e-mails usurpés
    - [https://docs.sendgrid.com/glossary/spoofing](https://docs.sendgrid.com/glossary/spoofing)
  - En savoir plus sur le cadre de la politique de l'expéditeur et sur la façon dont il vise à empêcher la falsification de l'adresse de l'expéditeur.
    - Utilisez dig/doggo pour rechercher un enregistrement SPF valide (vous pouvez le faire en [exécutant la commande dig avec l'argument txt](https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool)), analyser son contenu (vous pouvez consulter un guide [ici](https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain)) et répondre aux questions suivantes.
      - Quelle est la version SPF utilisée?
      - Quels domaines sont des expéditeurs autorisés pour le domaine?
      - Quel mécanisme (ou politique) a été utilisé pour tous les « autres » expéditeurs?
      - Y a-t-il d'autres mécanismes (ou politiques) définis dans l'enregistrement?
    - Utilisez [https://mxtoolbox.com/spf.aspx](https://mxtoolbox.com/spf.aspx) pour effectuer une recherche et un test sur un domaine protégé SPF. Vous pouvez rechercher les enregistrements de votre propre organisation, par exemple, en vérifiant son domaine principal.
  - Découvrez DomainKeys Identified Mail (DKIM) et comment, en tant que norme d'authentification, elle est utilisée pour empêcher l'usurpation d'adresses e-mail.
    - [https://docs.sendgrid.com/ui/account-and-settings/dkim-records](https://docs.sendgrid.com/ui/account-and-settings/dkim-records)
    - Utilisez [https://mxtoolbox.com/dkim.aspx](https://mxtoolbox.com/dkim.aspx) pour effectuer une recherche sur un domaine authentifié DKIM. Vous pouvez rechercher les enregistrements de votre propre organisation, par exemple, en vérifiant son domaine principal.
- **(Avancé)** Familiarisez-vous avec les diverses techniques et mécanismes que les filtres antispam utilisent pour repérer les courriers indésirables et les adresses e-mail falsifiées.
  - Consultez la liste des modules disponibles (et des sélecteurs) pris en charge par RSPAMD [https://rspamd.com/doc/modules/](https://rspamd.com/doc/modules/)

## Section Principale
###  Analyse des en-têtes

[L'équipe GenCyber du Nebraska a créé un cours rapide et relativement complet sur les en-têtes d'e-mails](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers) : nous le recommandons à tous ceux qui veulent en savoir plus sur le sujet.

En analysant les en-têtes, vous en apprendrez beaucoup sur les différents domaines impliqués dans la configuration de l'e-mail. Une fois que vous avez une liste de ces domaines, vous pouvez utiliser les mêmes outils que nous avons utilisés dans la section précédente (dig, whois, geoIP et autres) pour en savoir plus à leur sujet.

Les administrateurs de systèmes qui utilisent des domaines de travail tels que Google Workspace et Microsoft 365 ont souvent accès à de puissants outils de journalisation et de recherche de journaux : ils peuvent les utiliser pour rechercher dans leurs systèmes des identifiants trouvés dans les en-têtes d'e-mails (tels que des domaines suspects), ce qui peut les aider à déterminer qui, le cas échéant, a été ciblé au sein de leur organisation. Consultez la documentation de [Google](https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA) et de [Microsoft](https://learn.microsoft.com/en-us/exchange/monitoring/monitoring) sur la recherche dans les journaux. Notez que ces fonctionnalités de recherche sont généralement limitées aux comptes professionnels ou d'entreprise.

## Pratique

Après avoir lu tous les documents du cours d'[analyse des en-têtes d'e-mails de l'équipe GenCyber du Nebraska](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/), faites les exercices qui y sont liés. Le site a un problème de lien, les exercices étant souvent indisponibles directement, mais ils peuvent également être téléchargés [ici](https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers).

## Contrôle de compétence

Cherchez un e-mail dans votre boîte de réception ou dossier spam. Vous pouvez également demander à un pair ou à un mentor de vous envoyer les en-têtes d'e-mails qu'il a récemment reçus. Analysez les en-têtes de l'e-mail en utilisant les mêmes techniques que celles décrites dans l'exercice pratique, y compris en les chargeant dans l'[outil d'en-tête d'e-mail Google Admin Toolbox](https://toolbox.googleapps.com/apps/messageheader/). Ensuite, répondez aux questions 1, 2, 3 et 5 décrites dans la [section d'enquête](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#investigation) du cours d'analyse des en-têtes d'e-mails de l'équipe GenCyber du Nebraska, cette fois en utilisant les en-têtes de l'e-mail que vous avez trouvé, plutôt que l'e-mail joint au cours.

## Ressources d'apprentissage

{{% resource title="Que sont les en-têtes d'e-mails ?" description="Une bonne introduction aux en-têtes d'e-mails. Met en évidence trois groupes importants d'en-têtes d'e-mails. Comprend une liste de guides étape par étape pour différents MUA (agent utilisateur de messagerie)" languages="Anglais" cost="Gratuit" url="https://mailtrap.io/blog/email-headers/" %}}
{{% resource title="Affichage des en-têtes d'e-mails complets" description="Comment afficher les en-têtes d'e-mails dans plusieurs systèmes de messagerie (Gmail, Outlook, Apple Mail, Thunderbird, etc.)" languages="Multiple" cost="Gratuit" url="https://support.google.com/mail/answer/29436?hl=en" %}}
{{% resource title="Vérification des en-têtes SPF à l'aide de l'outil dig" description="Cet article offre un guide rapide sur la façon de vérifier les en-têtes SPF à l'aide de dig, un outil installé sur la plupart des systèmes de type Unix." languages="Anglais" cost="Gratuit" url="https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool" %}}
{{% resource title="Comment consulter et lire un enregistrement Sender Policy Framework pour un domaine" description="Cet article montre comment consulter les en-têtes SPF en utilisant nslookup, un outil alternatif à dig, et décrit comment interpréter les résultats." languages="Anglais" cost="Gratuit" url="https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain" %}}
{{% resource title="Cours de l'équipe GenCyber du Nebraska sur les en-têtes d'e-mails" description="Un cours complet sur la façon d'analyser les en-têtes d'e-mails lors des enquêtes sur les cas potentiels d'hameçonnage" languages="Anglais" cost="Gratuit" url="https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers" additional_urls="Des exemples d'exercices sont également présentés ici : https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers" %}}
{{% resource title="Vérification des en-têtes d'e-mails dans Proton Mail" description="Anglais" languages="Anglais" cost="Gratuit" url="https://proton.me/support/check-email-headers" %}}
{{% resource title="Affichage des en-têtes d'e-mails sur Zoho" description="Anglais" languages="Anglais" cost="Gratuit" url="https://www.zoho.com/mail/help/mail-options.html#alink1" %}}
{{% resource title="Outils pour analyser les en-têtes d'e-mails" description="Nous établissons des liens vers quelques outils qui peuvent extraire et disséquer les en-têtes d'e-mails, ce qui s'avère essentiel pour toute analyse des e-mails potentiellement malveillants." languages="Anglais" cost="Gratuit" url="https://mxtoolbox.com/EmailHeaders.aspx additional_urls="https://github.com/keraattin/EmailAnalyzer, https://github.com/umair9747/headmail, https://github.com/cyberdefenders/email-header-analyzer" %}}
{{% resource title="Introduction à l'usurpation d'adresses e-mail" description="Plusieurs articles décrivant les bases de l'usurpation d'adresses e-mail" languages="Multiple" cost="Gratuit" url="https://en.wikipedia.org/wiki/Email_spoofing" additional_urls="https://docs.sendgrid.com/glossary/spoofing, https://www.fortinet.com/resources/cyberglossary/email-spoofing" %}}
{{% resource title="Évaluation des en-têtes « reçus »" description="Comment utiliser les en-têtes d'e-mails pour trouver le serveur qui a envoyé l'e-mail" languages="Anglais" cost="Gratuit" url="https://www.techlicious.com/how-to/how-to-tell-if-email-has-been-spoofed/" %}}
{{% resource title="Analyse des en-têtes « reçus » potentiellement falsifiés" description="Comment repérer les faux en-têtes « reçus »" languages="Anglais" cost="Gratuit" url="https://luxsci.com/blog/analyzing-forged-email-message.html" additional_urls="https://www.linkedin.com/pulse/anatomy-phishing-email-whats-header-penelope-raquel-bise-" %}}
{{% resource title="Trouver des messages avec Email Log Search" description="Décrit comment les administrateurs de comptes d'entreprise et d'entreprise Google peuvent surveiller les journaux de messagerie" languages="Anglais" cost="Documentation gratuite, outils uniquement disponibles pour les utilisateurs professionnels et d'entreprise" url="https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA" %}}
{{% resource title="Surveillance, rapports et suivi des messages dans Exchange Online" description="Décrit comment les administrateurs de comptes d'entreprise Microsoft peuvent surveiller les journaux de messagerie" languages="Anglais" cost="Documentation gratuite, outils uniquement disponibles pour les utilisateurs professionnels" url="https://learn.microsoft.com/en-us/exchange/monitoring/monitoring" %}}
