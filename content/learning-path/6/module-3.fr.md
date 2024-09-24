+++
style = "module"
weight = 3
title = "Intervention en cas de refus de service"
description = "Si un site web subit une attaque par déni de service prolongée, il peut être crucial d'agir rapidement pour rétablir le site. Ce sous-thème décrit certaines pratiques permettant aux propriétaires de sites de se remettre d'une attaque par déni de service (DoS)."
+++

## Cas d'utilisation

Si un site Web fait l'objet d'une attaque par déni de service soutenue, il peut être essentiel d'agir rapidement pour le remettre en service. Ce parcours d'apprentissage décrit certaines pratiques permettant aux propriétaires de sites de récupérer le contrôle après une attaque DoS.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Déterminer le type d'attaque DoS infligé à un site Web
- Atténuer ou neutraliser une attaque en cours

---
## Section Principale

Pour certains sites (par exemple, les sites de jeu), même un bref DoS peut constituer une menace existentielle pour la survie du site. Les cybercriminels sont généralement motivés financièrement et utiliseront les attaques DoS comme une menace d'extorsion. Pour les sites axés sur la société civile, le modèle de menace est généralement très différent. Les attaques sont généralement contrôlées par des rivaux politiques (souvent des acteurs issus d'États-nations, ou des acteurs liés à eux ou soutenus par eux) et se divisent en deux catégories :

- Attaques brèves (de quelques heures à plusieurs jours) destinées à intimider les propriétaires du site
- Attaques soutenues visant à réduire définitivement le site au silence

Au début de l'attaque, il est impossible de savoir de quel type il s'agit. Heureusement, la réponse technique et opérationnelle est la même. La réponse de base se divise en trois étapes :

1. Déterminer le type de l'attaque qui est infligée au site
2. Atténuer cette attaque (le site devrait être opérationnel à ce stade)
3. Renforcer de façon anticipative le site contre de futures attaques

### Détermination du type d'attaque

En général, une attaque DoS sera remarquée lorsque les utilisateurs noteront que le site devient indisponible ou présente des performances dégradées. Dans certains cas, les systèmes de surveillance des performances du site peuvent informer de manière proactive les propriétaires du site. Dans tous les cas, la première étape consiste à déterminer pourquoi le site subit cette dégradation de performance. Notez que les performances dégradées du site ou son indisponibilité peuvent ne pas être dues à une attaque, mais à des pannes d'équipement, une mauvaise configuration, des modifications du site mal conçues ou un [élément du site devenant viral](https://en.wikipedia.org/wiki/Slashdot_effect). Lorsque vous enquêtez sur la dégradation du site, gardez à l'esprit les types d'attaques DoS et leurs symptômes :

- Niveau du réseau
  - Volumétrique : les outils de diagnostic du réseau tels que ping afficheront une perte de paquets élevée et de longs délais d'aller-retour. Si le site Web est hébergé par un FSI ou un service d'hébergement Web, les autres sites hébergés par ce FSI/service d'hébergement seront également indisponibles.
  - Basée sur une faille : les outils de diagnostic du réseau auront tendance à montrer une perte de paquets élevée, mais montreront souvent des délais d'aller-retour normaux. Si le site Web est hébergé chez un fournisseur de services Internet/d'hébergement, les autres sites hébergés par eux seront également indisponibles.
- Niveau du protocole
  - Volumétrique : les outils de diagnostic du réseau indiquent généralement une perte de paquets élevée et des délais d'aller-retour élevés. En général, les requêtes du navigateur vers le site prendront beaucoup de temps et expireront. Si le site Web est hébergé chez un fournisseur d'hébergement Web, les autres sites hébergés sur le même serveur seront probablement indisponibles, tandis que ceux hébergés sur d'autres serveurs fonctionneront normalement. Notez que les attaques DoS volumétrique au niveau du protocole trouveront n'importe quel goulot d'étranglement, que ce soit dans le réseau ou sur le serveur. Par exemple, une attaque au niveau du protocole contre un serveur puissant sur un réseau sous-alimenté affectera le réseau plus que le serveur.
  - Basée sur une faille : les outils de diagnostic du réseau indiquent généralement une perte de paquets normale et des délais d'aller-retour normaux. Les requêtes du navigateur sur le site peuvent être très lentes ou renvoyer rapidement une erreur. Si le site Web est hébergé chez un fournisseur d'hébergement Web, les autres sites hébergés sur le même serveur seront probablement indisponibles, tandis que ceux hébergés sur d'autres serveurs fonctionneront normalement.
- Niveau de l'application
  - Les outils de diagnostic du réseau indiquent généralement une perte de paquets normale et des délais d'aller-retour normaux. Le contenu statique servi par le site peut se comporter normalement ou peut également être dégradé. Si le site Web est hébergé chez un fournisseur d'hébergement Web, les autres sites hébergés sur le même serveur seront probablement indisponibles, tandis que ceux hébergés sur d'autres serveurs fonctionneront normalement.

Le fait de savoir quel type d'attaque se produit contribuera à orienter la réponse des propriétaires du site. En cas de soupçon d'attaque au niveau du réseau ou du protocole, il est important de contacter le fournisseur de services Internet/d'hébergement du site pour diagnostiquer le problème. Il aura généralement accès à de meilleurs outils de diagnostic et de réponse contre les attaques au niveau du réseau ou du protocole.

Un mot d'avertissement : une attaque DoS contre un site Web est généralement et nécessairement une attaque contre le FSI/fournisseur d'hébergement de ce site. En particulier pour les attaques au niveau du réseau, le FSI peut être impacté tout autant que le site cible. Pour cette raison, [les FSI ou les fournisseurs d'hébergement fermeront parfois les sites Web qui sont ciblés par des attaques DoS](https://www.qurium.org/alerts/azerbaijan/ddos-the-inconvenient-business-visitor/), afin de protéger le fournisseur lui-même. L'engagement précoce avec le FSI/fournisseur d'hébergement du site peut vous fournir des possibilités de négociation ou de coordination si celui-ci décide de fermer le site.

### Atténuer la menace

Selon le type d'attaque et le service d'hébergement du site, les mesures d'atténuation peuvent être variées.

#### Attaques basées sur une faille

Pour les exploitations de faille de déni de service au niveau du réseau et du protocole, une mise à jour logicielle doit généralement être appliquée. Comme mesure d'atténuation à court terme, le FSI du site peut bloquer les sources de trafic malveillant jusqu'à ce que les mises à jour logicielles nécessaires puissent être appliquées.

#### Attaques volumétriques

Pour les attaques volumétriques au niveau du réseau et du protocole, la réponse est généralement effectuée au niveau du FSI. Habituellement, le FSI analyse le trafic réseau entrant et identifie les sources de trafic malveillant. Il bloquera ensuite ces sources au niveau du réseau et travaillera avec son FAI en amont pour bloquer ces sources également. Finalement, les FAI en amont qui bloqueront le trafic malveillant sont suffisamment importants pour pouvoir gérer facilement le niveau de trafic malveillant généré, et les FSI en aval (et le site cible) seront en mesure de reprendre les opérations normales.

#### Attaques au niveau de l'application

Pour les attaques DoS au niveau de l'application, l'atténuation est généralement gérée par le propriétaire du site, par opposition au FSI ou au fournisseur d'hébergement. Généralement, le cybercriminel enverra un grand volume de requêtes, souvent de nature inhabituelle, à un point de terminaison spécifique sur le site. Ce point de terminaison (c'est-à-dire la page Web) consommera une énorme quantité de ressources en ralentissant ou en faisant planter le site.

Les journaux d'accès du serveur Web sont le meilleur élément sur lequel commencer la recherche du point de terminaison ciblé. Si vous pouvez vous connecter au serveur Web via quelque chose comme le SSH, essayez de télécharger (par ex., via rsync ou scp) certains journaux d'accès actuels et certains journaux antérieurs au début de l'attaque. Recherchez les pages qui sont touchées plus fréquemment, les pages qui renvoient beaucoup de données ou les pages qui prennent beaucoup de temps pour terminer le traitement. Notez qu'une bonne configuration de journalisation (comme décrit dans le sous-thème 2) peut rendre tout cela beaucoup plus facile.

Si vous ne pouvez pas accéder aux journaux, mais que vous avez accès à une copie de développement du site, vous pouvez essayer de trouver vous-même le point de terminaison ciblé. Parcourez le site à la recherche de pages qui pourraient consommer beaucoup de ressources. Les exemples peuvent inclure des pages qui effectuent des requêtes complexes de base de données, lisent des fichiers du système de fichiers, redimensionnent des images, font des requêtes à d'autres sites Web, etc. Une discussion complète à ce sujet sort du cadre de ce parcours d'apprentissage, mais pourrait inclure un examen de certaines vulnérabilités incluses dans le cadre du [parcours d'apprentissage sur l'évaluation de la sécurité Web](fr/learning-path/5).

Si vous parvenez à trouver le point de terminaison le plus probablement ciblé, que ce soit en lisant les journaux ou en simulant un cybercriminel, l'étape suivante consiste à déterminer comment contrecarrer l'attaque. Le plus rapide est de remplacer cette page du site par une page Web statique. Cela arrêtera l'attaque, mais désactivera aussi une partie du site. En outre, si l'attaque tire parti d'un élément qui se trouve sur plusieurs ou sur toutes les pages du site, ce correctif risque de faire planter le site.

Une meilleure option serait de mettre des limites sur le point de terminaison cible pour l'empêcher de consommer autant de ressources. S'il s'agit d'une page qui redimensionne les images, mettez une taille d'image maximale. S'il s'agit d'une opération de recherche et que le cybercriminel utilise une requête de recherche très longue et complexe, limitez la longueur de la requête. S'il s'agit d'une recherche placée par le cybercriminel qui renvoie de très nombreux résultats, modifiez la requête pour qu'elle se trouve dans une sous-sélection qui limite le nombre de lignes avant tout tri, etc. Avec un peu de chance, un simple changement pourra rendre l'attaque inefficace sans modifier le fonctionnement du site pour les utilisateurs non malveillants.

#### Si le site est fermé

Si l'attaque DoS parvient à fermer le site Web (par exemple, le fournisseur d'hébergement désactive le site), la sauvegarde du site peut se produire de plusieurs façons différentes. Si les propriétaires du site ont de bonnes pratiques de développement et de déploiement (voir le sous-thème 1 de ce parcours d'apprentissage), ils peuvent avoir une copie de développement du site prêt à être déployée chez un autre fournisseur d'hébergement. Sinon, vous et les propriétaires du site pouvez être en mesure de négocier avec le fournisseur d'hébergement actuel du site pour obtenir l'accès aux serveurs de production afin de copier les données du site.

L'étape suivante la plus simple peut consister à générer une copie complètement statique du site et de l'héberger sur une plateforme telle que GitHub Pages, Amazon S3 ou les compartiments GCS GCP. Pour générer une copie statique du site à partir d'une version de développement, vous pouvez utiliser un outil comme [HTTrack](https://www.httrack.com/) pour « spider » le site Web et télécharger le code HTML. Les services d'hébergement de sites statiques mentionnés ci-dessus sont tous gratuits ou peu coûteux (bien qu'il puisse y avoir un coût pour TLS), [sont résistants aux attaques DoS](https://www.wired.com/story/github-ddos-memcached/) et peuvent être configurés en quelques minutes. Bien qu'une copie statique du site ne soit pas idéale, elle peut constituer une bonne mesure provisoire.

### Récupération après une attaque DoS

Une fois l'attaque atténuée, le propriétaire du site peut travailler sur une récupération complète. En général, cela implique de passer par les processus de préparation du site décrit dans les sous-thèmes 1 et 2 de ce parcours d'apprentissage. Souvent, une fois qu'un site est ciblé par une attaque DoS, il est susceptible de faire face à des attaques similaires à l'avenir. Une préparation minutieuse s'avère donc très importante. Surtout si une attaque au niveau de l'application a été utilisée, il peut être judicieux de parcourir le site et son code pour trouver tous les aspects qui pourraient consommer une grande quantité de ressources, et de les modifier pour limiter les ressources qu'ils pourraient consommer. En outre, il peut être utile pour les sites fréquemment ciblés d'avoir un moyen facile de générer une copie statique du site et une procédure éprouvée pour basculer le site vers l'hébergement de site statique.

Lectures complémentaires

Les ressources supplémentaires suivantes fournissent plus d'informations sur les attaques DoS. Les ressources suivantes se concentrent principalement sur la mécanique des attaques de bas niveau :

- <https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf>
- <https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks>
- <https://www.byos.io/blog/denial-of-service-attack-prevention>

Ce minisite est un bon aperçu de l'élaboration d'un plan de réponse aux attaques DoS pour un site spécifique. Il s'agit d'une excellente ressource si vous avez le luxe de planifier au préalable ou de consulter lorsque vous vous remettez d'une attaque :

- <https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan>


## Contrôle de compétence

### Questions à choix multiples

Les attaques DDoS (Distributed Denial of Service) constituent une menace importante pour l'infrastructure numérique moderne et visent à perturber les services en écrasant les systèmes cibles ou les réseaux avec un flux de trafic élevé. En réponse à de telles attaques, les mesures de réponse aux incidents sont essentielles pour minimiser les dommages et rétablir rapidement les opérations normales. Cet ensemble de questions à choix multiples explore divers aspects des attaques DDoS, y compris leurs types, leurs objectifs, leurs stratégies d'atténuation et les phases de réponse aux incidents impliquées dans la lutte contre ces menaces. Testez vos connaissances concernant les attaques DDoS et les réponses aux incidents en répondant aux questions suivantes. Si possible, discutez de vos réponses à ces questions avec un pair ou un mentor qui vous aidera à vérifier que vous avez bien compris le sujet.

1. Lequel des éléments suivants n'est PAS un type courant d'attaque DDoS ?

A) SYN Flood\
B) Ping Flood\
C) DNS Spoofing\
D) UDP Flood

{{< question title="Réponse" >}}
1. C) DNS Spoofing
{{< /question >}}

2. Quel est l'objectif principal d'une attaque DDoS ?

A) Voler des données sensibles\
B) Obtenir un accès non autorisé à un système\
C) Surcharger un système ou un réseau cible\
D) Chiffrer des fichiers et demander une rançon

{{< question title="Réponse" >}}
C) Surcharger un système ou un réseau cible
{{< /question >}}

3. Quelle technique est couramment utilisée pour atténuer les attaques DDoS d'amplification DNS ?

A) Implémenter un filtrage d'entrée pour bloquer le trafic avec des adresses IP usurpées\
B) Utiliser la limitation de débit pour contrôler le volume de paquets de réponse DNS quittant des serveurs faisant autorité\
C) Déployer des systèmes de prévention des intrusions (IPS) pour détecter et bloquer le trafic malveillant en périphérie du réseau\
D) Effectuer régulièrement des analyses de vulnérabilité pour identifier et corriger les vulnérabilités du serveur DNS

{{< question title="Réponse" >}}
B) Utiliser la limitation de débit pour contrôler le volume de paquets de réponse DNS quittant des serveurs faisant autorité
{{< /question >}}

4. Quelle phase de l'intervention en cas d'incident implique d'identifier la nature et la portée de l'attaque DDoS ?

A) La préparation\
B) La détection et l'analyse\
C) Le confinement, l'éradication et le rétablissement\
D) Activité post-incident

{{< question title="Réponse" >}}
B) La détection et l'analyse
{{< /question >}}

5. Quel est l'objectif principal pendant la phase de confinement de l'intervention en cas d'attaque DDoS ?

A) L'arrêt complet du système\
B) Éliminer l'accès du cybercriminel\
C) Identifier les vulnérabilités pour les attaques futures\
D) Restaurer les services affectés tout en évitant d'autres dommages

{{< question title="Réponse" >}}
D) Restaurer les services affectés tout en évitant d'autres dommages
{{< /question >}}

6. Dans le contexte de l'intervention en cas d'incident, qu'est-ce que la phase « d'éradication » implique concernant les attaques DDoS ?

A) Restaurer les données à partir de sauvegardes\
B) Enquêter sur l'origine de l'attaque\
C) Mettre en œuvre des solutions à long terme pour prévenir les attaques similaires\
D) Redémarrer les systèmes concernés

{{< question title="Réponse" >}}
C) Mettre en œuvre des solutions à long terme pour prévenir les attaques similaires
{{< /question >}}

7. Quelle action est généralement effectuée pendant la phase de récupération de l'intervention en cas d'attaque DDoS ?

A) Effectuer une analyse post-mortem\
B) Appliquer des correctifs de sécurité aux systèmes vulnérables\
C) Identifier de nouveaux vecteurs d'attaque\
D) Engager une action en justice contre le cybercriminel

{{< question title="Réponse" >}}
B) Appliquer des correctifs de sécurité aux systèmes vulnérables
{{< /question >}}

8. Comment les réseaux de diffusion de contenu (CDN) peuvent-ils contribuer à protéger les sites Web contre les attaques par déni de service (DoS) ?

A) En chiffrant tout le trafic entrant pour prévenir les attaques\
B) En bloquant directement tout trafic entrant suspect\
C) En distribuant le contenu du site Web sur plusieurs serveurs et centres de données\
D) En augmentant la puissance de traitement du site

{{< question title="Réponse" >}}
C) En distribuant le contenu du site Web sur plusieurs serveurs et centres de données
{{< /question >}}

## Ressources d'apprentissage

{{% resource title="DDoS : le visiteur commercial gênant" description="Un regard sur la façon dont certains fournisseurs d'hébergement Web pourraient vouloir abandonner les clients ciblés par les attaques DDoS" languages="Anglais" cost="Gratuit" url="https://www.qurium.org/alerts/azerbaijan/ddos-the-inconvenient-business-visitor/" %}}
{{% resource title="GitHub a survécu à la plus grande attaque DDoS jamais enregistrée" description="Un article de 2018 sur la façon dont Github a subi une attaque DDoS massive et a poursuivi ses opérations par la suite" languages="Anglais" cost="Les premiers articles sur WIRED sont gratuits, d'autres peuvent nécessiter un abonnement" url="https://www.wired.com/story/github-ddos-memcached/" %}}
{{% resource title="Comprendre et réagir aux attaques par déni de service distribué" description="Un guide CISA de 2022 sur le sujet, qui examine les mesures à prendre avant, pendant et après une attaque" languages="Anglais" cost="Gratuit" url="https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf" %}}
{{% resource title="Guide MS-ISAC sur les attaques DDoS" description="Un guide qui fournit une vue d'ensemble des types courants d'attaques DDoS, ainsi que des recommandations générales sur les mesures d'atténuation" languages="Anglais" cost="Gratuit" url="https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks" %}}
{{% resource title="Prévention des attaques par déni de service (DoS) : le guide définitif" description="Cet article décrit quelques mesures que les administrateurs peuvent prendre pour prévenir ou atténuer l'impact des attaques DoS" languages="Anglais" cost="Gratuit" url="https://www.byos.io/blog/denial-of-service-attack-prevention" %}}
{{% resource title="Guide sur le déni de service (DoS)" description="Les guides du UK National Security Cyber Centre sur les attaques DoS et comment défendre les organisations contre elles" languages="Anglais" cost="Gratuit" url="https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection" %}}