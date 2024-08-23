+++
style = "module"
weight = 6
title = "Compétences interpersonnelles pour la sécurité des applications Web"
description = "Lorsqu'on travaille sur la sécurité des applications web (ou sur toute forme de sécurité !), il est important de vérifier la nature de la relation avec le protecteur numérique, de fournir des conseils utiles sans semer la peur, et de donner des évaluations de risques solides."
+++

## Cas d'utilisation

Lorsque vous interagissez avec des personnes et des organisations qui exploitent des applications Web, la conscience de soi est nécessaire pour vérifier la nature de la relation de protection numérique, fournir des conseils ou des services utiles et non alarmistes. Il est essentiel de cadrer votre travail technique dans une bonne évaluation des risques de la réalité de l'application Web et de ses utilisateurs.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Effectuer une réflexion personnelle sur la relation de protection numérique avec un client dans le cadre du travail d'évaluation et de production de rapports concernant les applications Web
- Simplifier et filtrer les résultats et les expliquer d'une manière qui correspond aux besoins et aux modèles de menaces de l'organisation et de ses parties prenantes
- Assurer la conscience des limites de vos propres connaissances et capacités
- Communiquer de manière non alarmiste sur les vulnérabilités et les failles
- Effectuer une analyse plus large des risques d'une application Web en fonction des réalités politiques, sociales, économiques et techniques qui l'entourent.

---
## Section Principale

Votre travail dans l'évaluation de la sécurité des applications Web doit rester contextualisé dans le cadre de l'organisation qui exploite ou héberge l'application, des personnes qui l'utilisent (et de leurs appareils), des relations interpersonnelles que vous entretenez avec ces personnes, de la nature de l'application web elle-même, des données qui y sont stockées ou traitées, des réalités juridiques qui prévalent sur l'application, et d'une solide évaluation des risques de tous ces éléments. Décomposons ces éléments et considérons une autocritique de votre rôle en tant que protecteur numérique.

### Le rôle du protecteur numérique dans l'évaluation de la sécurité des applications Web

L'évaluation de la sécurité des applications Web (et en particulier de nombreux éléments de ce parcours d'apprentissage et des parcours d'apprentissage connexes qui vont au-delà de l'analyse des vulnérabilités de base, de l'énumération des versions et des vérifications de configuration erronée) est un ensemble de compétences hautement techniques et raréfiées avec une terminologie qui est inaccessible et difficile à comprendre à la fois par les utilisateurs profanes et même les administrateurs de sites Web technophiles. Prenez un moment pour réfléchir à votre propre niveau de connaissance et à vos sentiments personnels au sujet de la réalisation de cette évaluation et de ce que vous espérez communiquer à votre client. Une des règles d'or du travail en tant que protecteur numérique efficace : _le but n'est pas d'impressionner les autres et de vous sentir supérieur, il s'agit de fournir une assistance efficace qui réduit les dommages et les risques tout en soutenant les objectifs de défense des intérêts de votre client_.

Il est donc important de filtrer et d'expliquer vos résultats dans le contexte d'une analyse des risques de l'application Web elle-même. Même si trouver de nombreuses vulnérabilités et failles peut vous procurer une certaine satisfaction en tant qu'analyste, le fait de les partager avec le client peut potentiellement générer chez lui beaucoup de stress. Atteindre le bon équilibre peut être plus difficile qu'il y paraît : toutes les conclusions de sécurité ne sont pas égales. Il est nécessaire de comprendre la nature de la vulnérabilité, la chaîne d'attaque qui la rend significative et le potentiel de préjudice que son exploitation peut avoir.

Par exemple, lorsque vous utilisez un outil d'évaluation de la sécurité automatisé tel que ZAP (mentionné plus en détail dans le parcours d'apprentissage sur l'évaluation des sites Web) et votre analyse d'un site Web peut révéler des dizaines, voire des centaines de failles et de vulnérabilités. Il est peu utile de fournir cette liste à votre client, à moins que vous soyez en mesure d'expliquer _l'importance_ de certaines de ces constatations pour ses intervenants, et leurs objectifs opérationnels et de défense de leurs intérêts. Comprenez-vous suffisamment les conclusions pour pouvoir fournir ce filtrage et ces explications ? Vous devez également avoir conscience des limites de votre propre compréhension sur le terrain. Dans le cas où vous ne pouvez pas évaluer correctement si une vulnérabilité ou une faille donnée est importante, vous pouvez laisser une recommandation avec votre meilleure interprétation et des conseils que le client pourra utiliser pour examiner le sujet plus en détail.

### Évaluation des risques avec les applications Web

Les organisations utilisent des applications Web à diverses fins. Dans certains cas, il s'agira de diffuser des informations simples de la marque où les données sensibles seront limitées. Même dans ces cas, les fuites d'informations sur le trafic et les visiteurs, et les risques d'implantation de contenu malveillant sur le site peuvent nuire réellement aux visiteurs ou à la réputation de l'organisation.

Dans d'autres cas, des données confidentielles et critiques peuvent être traitées par l'application. Au fur et à mesure que vous progressez dans ces parcours d'apprentissage qui mettent l'accent sur les compétences techniques, vérifiez continuellement les modèles de menace qui prévalent sur l'application elle-même, l'organisation et les personnes qui l'exploitent ainsi que sur ceux qui l'utilisent, notamment en prenant en compte les dispositifs qu'ils utilisent pour interagir avec l'application.

### Signaler et parler des vulnérabilités

Il peut être difficile de signaler les vulnérabilités que vous découvrez, surtout si vous débutez. Nous avons créé un bref aperçu du processus de production de rapports dans le [sous-thème 5 du parcours d'apprentissage sur l'évaluation de la sécurité des applications Web](https://docs.google.com/document/d/19v34droskAFgkp_qqcwiQLpc1hI1W-FjzHNV2QRBsaA/edit#heading=h.3b8ncrmhhmwt) et nous encourageons tous les apprenants qui doivent rédiger des rapports pour les clients à le consulter.

## Contrôle de compétence

Connectez-vous à nouveau à DVWA et ouvrez l'une de ses pages. Réglez-la sur une sécurité faible ou moyenne. Imaginez que cette page appartient à l'un de vos clients et que vous devez l'informer de ses vulnérabilités, de leur impact potentiel et des mesures d'atténuation nécessaires. Vous pouvez faire cet exercice :

1. Par vous-même, en écrivant une ébauche d'e-mail que vous enverriez au client. Si possible, partagez cette ébauche avec un pair ou un mentor plus tard, qui vérifiera qu'il s'agit d'une réponse appropriée et mesurée.
2. Avec un pair ou un mentor, en jouant le rôle de la conversation que vous auriez avec le client. Faites un compte rendu après la conversation, en demandant à vos pairs ce qui s'est bien passé et ce que vous pourriez améliorer.