+++
style = "module"
weight = 5
title = "Détection des vulnérabilités des applications Web"
description = "Une fois que vous avez appris à connaître les différents types de vulnérabilités, il est temps de les rechercher dans les applications web que vous testez ! Pour commencer et obtenir une première expérience, vous allez tester une application web délibérément vulnérable."
+++

## Cas d'utilisation

D'une manière ou d'une autre, chaque application Web accepte et traite des entrées non fiables. Ces entrées proviennent généralement des utilisateurs finaux et de leurs navigateurs, mais peuvent également provenir d'autres sites Web ou systèmes backend. Selon l'endroit où ces informations circulent, le traitement des données peut avoir des effets indésirables sur le site Web ou ses utilisateurs.

## Objectifs

Après avoir terminé ce sous-thème, les participants seront en mesure de trouver des vulnérabilités dans un site Web réel, plutôt que de comprendre les vulnérabilités individuelles de manière isolée.

---
## Section Principale

Après avoir terminé les sous-thèmes précédents, vous devriez avoir une bonne compréhension des vulnérabilités individuelles. Bien que cela puisse être suffisant pour vous guider dans la résolution des vulnérabilités ou pour effectuer des analyses d'investigation dans une violation d'application Web, cela sera insuffisant si vous souhaitez trouver ces vulnérabilités dans une application Web. Tandis que les exercices pratiques précédents étaient des puzzles ciblés vous mettant au défi d'activer une vulnérabilité dans une seule entrée, la plupart des entrées ne seront vulnérables à rien dans les applications Web réelles. Votre défi consistera à trouver ces entrées rares qui présentent une vulnérabilité.

Pour vous assister dans cette tâche, il est utile de disposer d'un cadre mental pour guider vos tests. Cela servira à organiser vos pensées et vos notes sur ce que vous testez, et pourra également servir de liste de contrôle. Ne sous-estimez pas la puissance des listes de contrôle ! Les listes de contrôle sont la raison pour laquelle le transport aérien est sûr, et [l'introduction de listes de contrôle dans les unités de soins intensifs des hôpitaux d'un État des États-Unis a réduit les taux d'infection de ⅓ et a permis de sauver plus de 1 500 vies en plus d'un an et demi](https://www.newyorker.com/magazine/2007/12/10/the-checklist). Toute tâche complexe et sujette aux erreurs bénéficiera grandement d'une liste de contrôle, et le contrôle des applications Web est extrêmement complexe et sujet aux erreurs.

### Cibles de pratique

Dans ce sous-thème, vous allez tester une application Web délibérément vulnérable. Vous tenterez de trouver toutes les vulnérabilités dans l'application et de documenter ces vulnérabilités.

Pour commencer, vous aurez besoin d'une application à tester. Une (mauvaise) option consisterait à trouver un site Web aléatoire sur Internet afin de tenter de vous y introduire. Ce n'est pas une bonne idée pour deux raisons. La première est que c'est une pratique contraire à l'éthique (même si vos intentions sont bonnes, que se passera-t-il si vous endommagez accidentellement le site) et, selon l'endroit où vous vivez, probablement illégal. La deuxième est que, surtout au début, il est impossible de déterminer de façon fiable si un site est sécurisé ou si vos capacités de test sont insuffisantes.

La solution consiste à vous exercer sur un [site intentionnellement vulnérable](https://owasp.org/www-project-vulnerable-web-applications-directory/). Ces sites sont conçus expressément pour que les apprenants s'entraînent à trouver et à exploiter les vulnérabilités. Ils peuvent être testés sans souci d'éthique ou de légalité (la plupart sont téléchargeables pour vous permettre de les tester sur votre propre ordinateur), et comprennent certaines vulnérabilités connues afin de vous permettre d'évaluer vos capacités. Pour ce sous-thème, nous utiliserons l'application Web vulnérable [Juice Shop de l'OWASP](https://owasp.org/www-project-juice-shop/).

### Organisation de votre test

Ensuite, vous aurez besoin d'une méthodologie pour guider vos tests. À mesure que vous acquerrez de l'expérience, vous commencerez probablement à élaborer votre propre cadre et vos propres procédures qui conviendront à votre style de travail préféré. Cependant, vous aurez besoin de ce guide pour commencer. Dans le cadre de ce parcours d'apprentissage, nous utiliserons [une méthodologie écrite par Tanner Prynn](https://github.com/tprynn/web-methodology), qui est à peu près conforme aux normes utilisées par la plupart des pratiques professionnelles de test d'intrusion d'applications Web. Ce document méthodologique est un bon compromis entre la brièveté (comparez ses 23 pages imprimées aux 465 pages du guide de test de l'OWASP) et l'exhaustivité. Il ne contient pas toutes les vulnérabilités possibles et ne propose pas de directives complètes pour tester les vulnérabilités qu'il couvre, mais il devrait être suffisant pour vous permettre de tirer parti de votre expertise.

En plus d'avoir un cadre et une liste de contrôle de ce que vous avez testé, il est extrêmement important que vous gardiez des notes détaillées. Les notes structurées comme les listes de contrôle montrent rapidement leurs limites. Voici quelques exemples d'utilisation des notes libres :

- Vous êtes au milieu de tests ciblés et remarquez un comportement étrange au sein du site. N'interrompez pas votre test ciblé, prenez une note et examinez le comportement étrange plus tard.
- Vous ne comprenez pas comment fonctionne une partie du site, prenez-en note. Si vous travaillez avec le propriétaire du site, vous pouvez lui poser plusieurs questions en une seule fois au lieu de le déranger tout au long de la journée. Ou peut-être que la façon dont cette partie du site fonctionne deviendra compréhensible à mesure que vous découvrirez le reste du site.
- Vous avez peut-être trouvé un endroit où saisir des données, mais vous ne comprenez pas immédiatement où ces données sont utilisées. Prenez-en note. Vous trouverez peut-être où ces données apparaîtront plus tard. Si c'est le cas, vous devrez examiner les deux pages Web lors du test de cette entrée.
- Gardez toujours des notes concernant les endroits où le site ne fonctionne pas correctement. Vous en aurez besoin pour votre rapport.
- Parfois, vous aurez la _certitude_ qu'une entrée particulière est vulnérable à quelque chose, mais vous aurez des difficultés à déterminer à quoi elle est vulnérable et de quelle façon. Notez ce que vous avez essayé, puis passez à autre chose. Quelques heures ou une nuit de repos peuvent vous procurer une nouvelle perspective.

### Établissement de rapports

Enfin, pour que votre travail acharné soit utile à tout le monde, vous devrez documenter les vulnérabilités que vous trouverez. En général, vous testerez le site Web de quelqu'un d'autre et produirez une sorte de rapport, formel ou informel. Dans tous les cas, les principaux objectifs du rapport devraient être de communiquer :

- Ce qui a été testé
- Ce qui _n'a pas_ été testé, et pourquoi
- Pour chaque vulnérabilité trouvée :
  - L'emplacement de la vulnérabilité
  - La façon de déclencher la vulnérabilité pour pouvoir la reproduire ultérieurement
  - Le risque/l'impact de sécurité associé à la vulnérabilité
  - Recommandations pour corriger la vulnérabilité

En règle générale, les rapports comportent une section d'introduction qui décrit ce qui a été testé et ce qui n'a pas été testé, puis une autre section contenant des détails sur chaque vulnérabilité trouvée. Approfondissons chaque section.

La section d'introduction contient généralement des informations sur l'application testée. Les détails tels que l'URL de l'application, l'environnement dans lequel elle a été testée (p. ex., production vs staging) et la plage de dates dans laquelle les tests ont été effectués sont importants et permettent aux développeurs de contextualiser les tests par rapport à leurs cycles de développement et de publication.

Il est également important d'inclure des informations sur les objectifs des tests. Pour certains tests, l'objectif pourrait être de tester uniquement les vulnérabilités susceptibles d'entraîner une prise de contrôle complète de l'infrastructure du serveur Web. Pour d'autres, l'objectif pourrait être d'effectuer un test très approfondi et complet. Pour la plupart des tests d'applications Web, le test doit être effectué dans un laps de temps donné, et l'objectif consiste à identifier le plus de vulnérabilités et le plus d'impacts possibles dans ce délai. L'inclusion de cette information marque la ligne entre la description de ce qui a été testé et de ce qui n'a pas été testé.

Enfin, si des types de tests ont été exclus, si des parties du site n'ont pas été testées ou si d'autres restrictions ont empêché l'atteinte des objectifs du test, il est important de les consigner dans le rapport. De cette façon, les propriétaires du site ne seront pas au courant des zones qui pourraient contenir des vulnérabilités inconnues.

Les rapports d'évaluation de la sécurité des applications Web comportent généralement une autre section qui énumère les détails de chaque vulnérabilité trouvée. Il s'agit de la partie la plus importante du rapport, et il est important qu'elle soit claire et compréhensible. Elle prend généralement la forme d'une liste pour chaque vulnérabilité, qui comprend des éléments comme :

- Emplacement : une URL et un paramètre, une URL et/ou une ligne de code (si elle est connue). Tout cela aidera les développeurs à trouver le code contenant la vulnérabilité. Notez que certaines vulnérabilités peuvent exister à plusieurs endroits, auquel cas il est généralement possible de documenter plusieurs emplacements. Dans certains cas, une vulnérabilité peut exister sur l'ensemble du site. Dans d'autres, elle peut exister dans un trop grand nombre d'endroits pour pouvoir le documenter, mais pas partout. Dans tous les cas, l'objectif est la clarté. Le lecteur doit comprendre lequel des cas ci-dessus existe.
- Manière de déclencher la vulnérabilité : souvent appelée « étapes de reproduction », il s'agit d'une description de la façon dont la vulnérabilité peut être déclenchée. Cela est inestimable pour les équipes de développement qui tentent de corriger la vulnérabilité. Dans certains cas, il peut simplement s'agir d'une URL (p. ex., quelque chose comme « Visiter [http://victim.com/search?q=&lt;script&gt;alert(‘xss’)&lt;/script&gt;](http://victim.com/search?q=) »), dans d'autres cas, plusieurs étapes de configuration peuvent être nécessaires. Idéalement, les étapes de reproduction doivent être claires et reproductibles.
- Cote de risque : les cotes de risque sont quelque peu subjectives et exigent souvent des données qui ne sont pas facilement accessibles à la personne qui effectue le test (comme l'importance relative de ce site Web particulier pour le propriétaire du site). Cependant, ces cotes devraient au moins être cohérentes dans le cadre du rapport. Une échelle d'évaluation est généralement utilisée, comme :
  - Critique : vulnérabilités extrêmement graves qui peuvent entraîner une compromission facile de l'application, telles que l'exécution de code à distance ou l'injection SQL exploitable par n'importe qui sur Internet. Si, après avoir découvert une vulnérabilité, votre première pensée est « Cette application pourrait miner du Bitcoin ou envoyer des spam. », il y a de fortes chances que le risque soit critique.
  - Élevée : vulnérabilités graves qui entraînent une compromission moins étendue et/ou sont plus difficiles à exploiter. Par exemple, l'injection SQL qui n'est exploitable que par les utilisateurs internes, la plupart des vulnérabilités d'autorisation ou [XSS wormable](https://en.wikipedia.org/wiki/Samy_%28computer_worm%29). Si votre première pensée en trouvant une vulnérabilité est d'informer immédiatement le propriétaire du site, le risque est probablement élevé.
  - Moyenne : vulnérabilités dont l'exploitation n'entraînerait qu'une compromission partielle de l'application ou qui aurait un impact élevé tout en étant très difficiles à exploiter (comme une attaque de synchronisation qui nécessiterait plusieurs milliards de requêtes). La plupart des vulnérabilités XSS et CSRF, et la divulgation partielle d'informations (comme les problèmes d'autorisation mineurs ou la plupart des divulgations de code source) relèvent de cette cote. Il s'agit généralement de vulnérabilités qu'il est important de corriger, sans constituer une urgence.
  - Faible : vulnérabilités qui ont un impact sur l'application, mais dont l'impact est relativement mineur. Il s'agit généralement de choses comme des divulgations d'informations très mineures, des problèmes qui facilitent un peu l'exploitation d'autres vulnérabilités (comme l'absence de limitation des taux), ou une non-conformité aux meilleures pratiques qui n'a pas d'impact réel.
  - Informative : il s'agit à la fois de vulnérabilités qui ne sont pas exploitables, mais qui pourraient potentiellement devenir des problèmes à l'avenir, de bugs fonctionnels sans impact sur la sécurité ou d'autres problèmes non liés à la sécurité.

Parfois, une méthode plus structurée sera utilisée pour obtenir une cote de risque, comme le [CVSS](https://www.ibm.com/docs/en/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss). Notez que ces méthodes sont soit suffisamment rigides pour parfois générer des évaluations de risque qui ne reflètent pas la réalité, soit suffisamment flexibles pour ne pas fournir de cohérence significative. Pour obtenir plus d'informations sur la détermination des cotes de risque, consultez [la méthodologie de cotation de risque de l'OWASP](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology) et les lignes directrices de cotation de risque pour les programmes de bug bounty tels que [Bugcrowd](https://bugcrowd.com/vulnerability-rating-taxonomy).

- Recommandation : en tant qu'intervenant sensé en savoir plus sur la sécurité Web que le propriétaire du site, vous aurez probablement de bons conseils à apporter sur la façon de résoudre les différents problèmes. En général, vous n'en savez pas suffisamment sur les particularités internes de l'application pour fournir des conseils spécifiques, mais dans certains cas, c'est possible. Vous devez toutefois fournir des conseils généraux, par exemple utiliser l'encodage de sortie pour corriger un problème de XSS ou lier des paramètres pour corriger un problème de SQLi. Notez que dans de nombreux cas, les propriétaires des sites ne seront peut-être pas en mesure de suivre vos conseils à la lettre. Il s'agit d'une réalité du développement d'applications que vous ne devriez pas prendre personnellement.

Bien que ce qui précède représente la quantité minimale raisonnable d'informations à inclure dans un rapport, il est acceptable (et souvent conseillé) d'en inclure davantage. Les sociétés professionnelles d'évaluation de la sécurité produisent parfois des rapports qui sont accessibles au public. La lecture de ces rapports peut vous inspirer pour vos propres rapports, ainsi que fournir des informations sur les vulnérabilités existantes et sur leurs cotes de risque. [Ce GitHub](https://github.com/juliocesarfort/public-pentesting-reports/tree/master) contient un large référentiel de rapports publics. Notez que de nombreux rapports publics ne contiennent pas de détails sur les vulnérabilités, contrairement à d'autres tels que les suivants :

- [Bishop Fox - Winston Privacy](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Bishop%20Fox/Bishop%20Fox%20Assessment%20Report%20-%20Winston%20Privacy.pdf)
- [Cure53 - 1Password](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Cure53/Cure53-1PW18-report.pdf)
- [DoyenSec - Gravity Platform](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Doyensec/Doyensec_Gravitational_GravityPlatform_Q22019.pdf)
- [iSEC - phpMyAdmin](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/iSEC/NCC_Group_-_phpMyAdmin.pdf)

Une dernière remarque au sujet des rapports : il est très important que vous consigniez vos conclusions dans votre rapport pendant que vous effectuez les tests. En règle générale, les nouveaux testeurs préféreront poursuivre les tests, en pensant qu'il sera facile de rédiger le rapport plus tard. C'est une erreur. Ils terminent leurs tests, puis ont des difficultés à terminer leur rapport et doivent souvent revenir en arrière et refaire d'autres tests. Cela peut sembler inefficace d'interrompre les tests afin de consigner une vulnérabilité dans votre rapport, surtout si vous devez mettre à jour cette vulnérabilité plus tard. C'est pourtant la méthode la plus efficace à suivre.

## Exercice pratique

La majeure partie de ce parcours d'apprentissage concerne cet exercice pratique. Ici, vous allez rassembler toutes les techniques que vous avez apprises dans les sous-thèmes précédents pour trouver des vulnérabilités dans une application Web réelle. Cela devrait vous prendre un certain temps. En règle générale, il faudrait jusqu'à une semaine à un intervenant qualifié pour évaluer pleinement une application comme Juice Shop, et vous n'avez pas encore ce statut. Si vous vous retrouvez en difficulté, dites-vous que c'est normal. Résistez à la tentation de chercher des explications ou des corrigés, ou de regarder les sections suivantes de ce parcours d'apprentissage. Les difficultés sont une partie naturelle et importante du processus d'apprentissage.

1. [Installer Juice Shop](https://hub.docker.com/r/bkimminich/juice-shop/#docker-container) (l'utilisation de Docker est la méthode la plus simple)
2. Par défaut, les vulnérabilités dangereuses de Juice Shop sont désactivées. Ce sont les vulnérabilités les plus importantes à trouver ! Vous devrez [modifier la configuration](https://pwning.owasp-juice.shop/companion-guide/latest/part4/customization.html) pour définir safetyOverride sur la valeur « true ». Pendant que vous y êtes, incluez également tous les drapeaux de configuration dans [quiet.yml](https://github.com/juice-shop/juice-shop/blob/master/config/quiet.yml).
3. Préparez votre environnement de test :
    - Burp ou le proxy que vous préférez
    - Un ou plusieurs profils de navigateur pour les tests
    - Une méthodologie sur laquelle vous baser
    - Les débuts d'un rapport
    - Vos documents de notes
4. Commencez les tests ! N'oubliez pas d'être méthodique, de prendre des notes détaillées et de documenter les vulnérabilités à mesure que vous les trouvez. Rappelez-vous que certaines vulnérabilités ne seront pas présentes dans le site, que des entrées ne présenteront aucune vulnérabilité et qu'il peut y avoir des instances multiples de certains types de vulnérabilités.

Vous ne devriez pas vous attendre à détecter une instance de chaque vulnérabilité. Essayez, mais ne soyez pas trop déçu(e) si vous n'y arrivez pas. Essayez également de ne pas trop vous demander si vous avez fait suffisamment de tests. Il est [littéralement impossible](https://en.wikipedia.org/wiki/Computability_theory) de savoir avec certitude que vous avez trouvé toutes les vulnérabilités dans toutes les applications, sauf dans les plus limitées.

Au lieu de cela, passez en revue la méthodologie et essayez de tester complètement le site Web. Si vous avez des choses à revoir dans vos notes, revoyez-les brièvement, mais ne consacrez pas trop de temps à ça. N'oubliez pas qu'il s'agit d'un exercice.

## Contrôle de compétence

Si vous avez un mentor, passez en revue votre rapport avec lui. Il vous sera probablement utile de consulter un ou plusieurs des articles concernant des vulnérabilités que d'autres personnes ont trouvées, [en voici un](https://pwning.owasp-juice.shop/companion-guide/latest/part2/README.html). Notez que Juice Shop contient de nombreux défis. Les défis consistent principalement à exploiter les vulnérabilités. La meilleure chose à faire est de demander à votre mentor de vous donner des conseils sur les vulnérabilités que vous avez manquées, par exemple sur quelle page elles se trouvent, puis d'essayer de les trouver par vous-même. Si vous vous retrouvez coincé(e), demandez à votre mentor de vous expliquer la vulnérabilité.

Si vous n'avez pas de mentor, vous pouvez vous auto-encadrer pour ce sous-thème. Vous pouvez simplement effectuer les activités ci-dessus. Au lieu d'obtenir un indice de votre mentor, jetez un coup d'œil aux défis et essayez de comprendre la vulnérabilité associée. Encore une fois, si vous êtes coincé(e), il existe de nombreux guides aux formats écrits et vidéo.

## Ressources d'apprentissage

{{% resource title="La liste de contrôle" description="Un article sur l'importance d'utiliser des listes de contrôle dans de nombreuses professions différentes" languages="Anglais" cost="Gratuit pour les premiers articles de la publication, les suivants nécessitent un abonnement" url="https://www.newyorker.com/magazine/2007/12/10/the-checklist" %}}
{{% resource title="Répertoire des applications Web vulnérables de l'OWASP" description="Une liste d'applications Web comprenant des vulnérabilités connues qui peuvent être utilisées pour tester les compétences d'évaluation Web et de test d'intrusion" languages="Anglais" cost="Gratuit" url="https://owasp.org/www-project-vulnerable-web-applications-directory/" %}}
{{% resource title="Méthodologie pour les tests de sécurité des applications Web de haute qualité" description="Une liste exhaustive (et, pour citer l'auteur, une liste « obstinée ») des questions qu'un protecteur numérique devrait examiner lors de l'évaluation de la sécurité des applications Web" languages="Anglais" cost="Gratuit" url="https://github.com/tprynn/web-methodology/wiki" %}}
{{% resource title="Samy (vers)" description="Exemple de code malveillant exploitant des vulnérabilités XSS" languages="anglais, arabe, chinois, indonésien, lombard" cost="Gratuit" url="https://en.wikipedia.org/wiki/Samy_(computer_worm)" %}}
{{% resource title="Un aperçu du CVSS" description="Un aperçu du système commun de notation des vulnérabilités, une approche structurée utilisée pour évaluer la gravité des vulnérabilités" languages="arabe, bulgare, catalan, tchèque, danois, allemand, grec, anglais, espagnol, finnois, français, croate, hongrois, italien, hébreu, japonais, coréen, kazakh, néerlandais, norvégien, polonais, portugais, roumain, russe, slovaque, slovène, serbe, suédois, thaï, turc, vietnamien, chinois simplifié, chinois traditionnel" cost="Gratuit" url="https://www.ibm.com/docs/fr/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss" %}}
{{% resource title="Méthodologie de notation de risque de l'OWASP" description="Il existe de nombreuses façons d'évaluer les risques de vulnérabilités et d'exploitations de failles, et l'OWASP en propose une qui est décrite ici en détail." languages="Anglais" cost="Gratuit" url="https://owasp.org/www-community/OWASP_Risk_Rating_Methodology" %}}
{{% resource title="Taxonomie des vulnérabilités de Bugcrowd" description="Une autre façon de suivre les risques de vulnérabilités, cette fois par Bugcrowd" languages="Anglais" cost="Gratuit" url="https://bugcrowd.com/vulnerability-rating-taxonomy" %}}
{{% resource title="Rapports publics de tests d'intrusion" description="Une liste publique des rapports de tests d'intrusion produits" languages="Anglais" cost="Gratuit" url="https://github.com/juliocesarfort/public-pentesting-reports/tree/master" %}}