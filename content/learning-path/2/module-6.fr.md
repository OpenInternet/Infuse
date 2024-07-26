+++
style = "module"
weight = 6
title = "Détection de logiciels malveillants par l'analyse du trafic"
+++


## Cas d'utilisation

La plupart des logiciels malveillants établissent une sorte de connexion réseau, que ce soit pour se connecter à un serveur de commande et de contrôle pour obtenir des instructions supplémentaires ou exfiltrer des données à partir d'un ordinateur. Bien que diverses tactiques puissent être utilisées par les logiciels malveillants pour éviter d'être détectés par les scanners antivirus, dans de nombreux cas, un analyste ayant accès à l'ensemble du trafic réseau de l'appareil peut repérer ces connexions réseau suspectes et les analyser pour rechercher des signes d'activité malveillante.

Utilisez cette solution lorsque vous êtes en mesure de mettre en place une solution d'analyse de trafic en ligne, par exemple en utilisant un périphérique de point d'accès Wi-Fi fonctionnant sur un Raspberry Pi, comme avec certains des outils abordés ici. D'autres options pourraient inclure l'utilisation de ports TAP ou SPAN pour capturer le trafic pour tous les utilisateurs d'un réseau local, par exemple dans un espace de bureau.

_Remarque pour les apprenants : ce sous-thème suppose que vous avez accès à un Raspberry Pi. Si ce n'est pas le cas, vous pouvez passer au sous-thème suivant._

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Discuter avec le client de l'approche suggérée pour l'analyse du trafic, y compris en expliquant le processus, les risques et les limites de l'action
- Sélectionner un outil d'analyse du trafic réseau approprié et l'implémenter en utilisant la configuration matérielle ou logicielle appropriée
- Étudier et comprendre quels ensembles de règles ou heuristiques sont utilisés par chaque approche d'analyse du trafic réseau donnée, et comprendre leurs forces ou faiblesses
- Lire les résultats des flux réseau signalés et être en mesure de trier les résultats nécessitant une enquête plus approfondie ou des mesures correctives des risques

---
## Section Principale

Plutôt que d'examiner les fichiers et les processus exécutés sur un appareil, les logiciels malveillants peuvent également être identifiés par les communications réseau qu'ils initient ou auxquelles ils répondent. Cette approche présente plusieurs avantages par rapport à l'analyse basée sur l'appareil, car il est difficile pour les logiciels malveillants d'éviter de réaliser des communications réseau à un moment donné et, dans certains cas, cela vous permet d'enquêter sur plusieurs appareils à la fois.

### Capture de trafic avec un Raspberry Pi

Dans cette section, nous examinerons deux outils : PiRogue Tool Suite et SpyGuard. Ces deux outils nécessitent du matériel supplémentaire (un petit ordinateur peu coûteux appelé Raspberry Pi et une carte SD).

‼️ Après avoir acquis des compétences sur l'un ou l'autre des deux outils, vous devriez pouvoir :

- Installer l'outil sélectionné sur la carte SD du Raspberry Pi et effectuer la configuration initiale
- Accéder au panneau de contrôle de l'outil
- Connecter des appareils au point d'accès Wi-Fi
- Identifier les appareils connectés au point d'accès (si vous connectez plusieurs appareils à la fois)
- Lire et interpréter les constatations suspectes et trier celles qui nécessitent une correction des risques ou une enquête plus approfondie
- Avancé : configurer la journalisation et les notifications sur l'outil sélectionné
- Avancé : effectuer la capture du trafic pour assurer une enquête plus approfondie

#### PiRogue Tool Suite

PiRogue Tools Suite est un ensemble d'outils logiciels qui transforme le Raspberry Pi en une station d'analyse de logiciels malveillants. Il est développé par Defensive Lab Agency. Il sert de routeur intermédiaire, qui se trouve entre un appareil que vous soupçonnez d'être infecté et Internet, et capture et analyse tous les serveurs et services avec lesquels l'appareil infecté tente de communiquer. Cela peut être utilisé pour détecter les activités malveillantes potentielles.

Si vous souhaitez utiliser ces outils, consultez l'[excellente documentation](https://pts-project.org/docs/prologue/introduction/) de l’auteur. Nous vous recommandons de commencer par le guide du débutant, qui explique [comment configurer un PiRogue](https://pts-project.org/guides/g1/) et [comment effectuer vos premières analyses](https://pts-project.org/guides/g2/).

#### SpyGuard

Un outil alternatif, appelé SpyGuard, peut également fonctionner sur le Raspberry Pi ou d'autres appareils Linux et faire office de routeur intermédiaire. Contrairement à PiRogue Tool Suite, qui se concentre principalement sur l'analyse de réseau plus avancée, SpyGuard se concentre sur l'analyse du trafic réseau à la recherche d'IoC connus et de [comportements potentiellement suspects](https://github.com/SpyGuard/SpyGuard/wiki/Detection-methods-and-IOCs) tels que les contacts avec des domaines récemment enregistrés ou l'utilisation de ports inhabituels. SpyGuard est dérivé d'un autre projet appelé TinyCheck qui a été conçu à l'origine pour un refuge pour femmes français afin de détecter les traces de stalkerware (logiciels malveillants utilisés pour espionner des personnes sans leur consentement, et souvent installés par des partenaires abusifs) sur les appareils mobiles. Ses capacités se sont toutefois étendues et il peut maintenant être utilisé pour tester de nombreux autres types de logiciels malveillants. Vous pouvez en apprendre davantage sur SpyGuard [sur sa page github](https://github.com/SpyGuard/SpyGuard/).

### Autres approches

#### Pare-feux sortants

L'utilisation d'un pare-feu « bruyant » qui demande la permission pour chaque processus sollicitant l'envoi d'informations vers le trafic Internet est un moyen utile, et fastidieux, d'identifier les processus qui établissent des connexions réseau et potentiellement d'identifier les communications suspectes. Cela nécessite un niveau de familiarité avec les processus habituels de votre plateforme afin d'identifier les processus non suspects, ainsi que la capacité à rechercher des blocs IP et des recherches DNS. Laisser cette option active sur l'ordinateur d'un client n'est pas toujours une approche idéale, car il est difficile d'enquêter correctement sur chaque processus, cependant, en tant que praticien de la sécurité numérique, il est utile de pouvoir effectuer ce travail et cela peut valoir la peine de le faire sur votre propre appareil ou lors d'une enquête sur l'appareil d'un client. Voici quelques pare-feux de point de terminaison de cette catégorie :

- MacOS
  - [LuLu](https://objective-see.org/products/lulu.html) (open source, gratuit)
  - [Little Snitch](https://www.obdev.at/products/littlesnitch) (payant) ou [Little Snitch Mini](https://www.obdev.at/products/index.html) (propriétaire, gratuit)
- Windows
  - [PortMaster](https://safing.io/) (open source, version gratuite/payante disponible avec fonction d'historique/d'enquête sur le réseau)
  - [GlassWire](https://www.glasswire.com/) (version propriétaire gratuite/payante disponible)
- Android
  - [NetGuard](https://github.com/M66B/NetGuard) (version open source gratuite/freemium disponible avec capture/historique de trafic)
  - [AFWall+](https://github.com/ukanth/afwall) (open source, gratuit)
- Linux
  - [OpenSnitch](https://github.com/evilsocket/opensnitch) (open source, gratuit)

Les pare-feux sortants peuvent être difficiles à maîtriser au premier abord. Le rapport signal sur bruit est loin d'être optimal et nous recommandons de travailler d'abord avec d'autres personnes ayant de l'expérience avec ces outils avant de vous y fier dans votre propre analyse.

#### Analyse du trafic tiers

Le trafic peut être capturé et filtré ou analysé par des tiers. L'un de ces services semi-automatisés est [Emergency VPN](https://www.civilsphereproject.org/emergency-vpn), géré par le projet Civilsphere de l'Université technique tchèque. Un profil VPN peut être généré et installé sur n'importe quelle plateforme. Après s'être connecté au VPN et avoir géré le trafic de l'appareil pendant 24 heures, le service Emergency VPN envoie automatiquement une analyse générée par la machine afin de signaler les éventuelles découvertes initiales. Par la suite, le trafic provenant de l'appareil sera conservé et analysé manuellement par un analyste du personnel et un rapport manuel sera envoyé en cas de découverte de logiciel malveillant. C'est un moyen d'externaliser les compétences d'analyse lorsque cela s'avère nécessaire. Assurez-vous que vous ou votre client comprenez les répercussions sur la vie privée et êtes à l'aise avec les risques associés à la capture du trafic externe.

Si vous avez du temps pour le faire et que vous acceptez les implications en matière de confidentialité du partage de vos données avec l'équipe d'Emergency VPN, nous vous recommandons d'en apprendre un peu plus sur le service, de l'exécuter pendant quelques jours et d'analyser les données que vous recevez par la suite. Une fois que vous l'aurez fait, vous devriez être en mesure de :

- Comprendre le fonctionnement du service d'Emergency VPN
- Demander un profil Emergency VPN et l'installer sur votre plateforme spécifique
- Lire et comprendre le premier rapport d'Emergency VPN automatisé et analyser les résultats pour identifier toute découverte suspecte afin de prévoir des enquêtes plus approfondies

Dans d'autres cas, si vous travaillez avec un analyste externe, il peut vous demander de passer par un processus VPN similaire ou d'exécuter un utilitaire pour capturer le trafic réseau, le plus souvent dans un fichier PCAP (Packet CAPture) pour en assurer le partage et l'examen externe.

#### Analyse manuelle du trafic et surveillance organisationnelle

Si vous souhaitez développer cette compétence, vous devrez d'abord développer les compétences concernant la capture de trafic, le filtrage et l'analyse à l'aide d'outils tels que Suricata, Zeek et Wireshark. Voici quelques ressources suggérées pour votre apprentissage :

- [Malware-traffic-analysis.net](https://www.malware-traffic-analysis.net/) : contient des années d'articles de blog et de tutoriels, y compris des fichiers PCAP pour pratiquer les compétences de détection et d'analyse
- Cours : [Surveillance de la sécurité du réseau avec Suricata](https://www.pluralsight.com/courses/network-security-monitoring-suricata) (Pluralsight, gratuit)
- Cours : [Formation sur la détection des menaces](https://www.activecountermeasures.com/hunt-training/) (Active Countermeasures, utilise AC-Hunter CE, proposé en direct mensuellement)

Envisagez également d'apprendre les déploiements organisationnels de ces outils dans diverses catégories, par exemple en utilisant [Security Onion](https://github.com/Security-Onion-Solutions/securityonion), [pfsense](https://www.pfsense.org/)/[Opensense](https://opnsense.org/), [AC-Hunter CE](https://www.activecountermeasures.com/ac-hunter-community-edition/), [RITA](https://github.com/activecm/rita) et [Wazuh](https://wazuh.com/).

### Comprendre : limites et confidentialité

Comme pour toutes les approches de ce parcours d'apprentissage, chaque méthode de détection de logiciels malveillants présente des forces et des faiblesses et ne sera efficace que si elle est utilisée avec les compétences et l'expérience appropriées, et nécessite parfois l'accès aux flux de menaces appropriés ou aux ensembles de règles adéquats. L'analyse du réseau est similaire.

Les approches d'analyse du trafic combinent des règles strictes telles que _« cette adresse IP est connue pour être malveillante »_ et des règles heuristiques telles que _« quantité inhabituelle de trafic sortant vers une nouvelle adresse IP »_ ou _« utilisation inattendue de port/protocole »_. Étant donné que la première approche repose sur les IoC, elle ne permet de détecter que les logiciels malveillants connus et bien documentés. Bien que ces dernières approches heuristiques puissent détecter de nouveaux logiciels malveillants, elles nécessitent souvent des compétences d'analyse supplémentaires pour capturer et examiner manuellement le trafic dans un outil comme Wireshark tout en utilisant des règles supplémentaires et des IoC pour détecter des menaces spécifiques. Plusieurs ressources permettant d'acquérir des compétences supplémentaires en analyse sont référencées dans le tableau ci-dessous.

Certains logiciels malveillants sophistiqués peuvent exfiltrer les données ou contacter les serveurs de manière très subtile ou brouillée, ce qui complique davantage l'analyse.

Comprenez également que l'interception du trafic de l'appareil d'un client peut exposer des activités en ligne ou d'autres informations privées concernant la personne. La plupart du trafic de l'appareil sera chiffré TLS, ce qui signifie que l'analyste ne sera pas en mesure de capturer les messages privés ou mots de passe. Néanmoins, il reste une quantité importante d'informations privées qui pourraient être capturées, y compris les services sollicités par l'utilisateur, les domaines qu'il visite et les pages potentiellement sensibles qu'il parcourt ou les services qu'il utilise. Certains outils affichent les flux de trafic en direct sur un tableau de bord lors de l'utilisation de l'outil, ce qui pourrait potentiellement faire apparaître des informations privées dans un contexte de groupe. Assurez-vous que votre client comprend le processus que vous lui proposez et traite toute information recueillie avec la plus grande confidentialité dans le respect des principes OPSEC.

## Contrôle de compétence

Configurez PiRogue sur un Raspberry Pi et vérifiez le trafic à partir d'un appareil. Idéalement, il s'agira d'un appareil de test sur lequel vous avez installé beaucoup d'applications aléatoires. Essayez de comprendre les résultats et les alertes que PiRogue fournit. Notez au moins trois types de résultats différents, expliquez ce que vous pensez qu'ils signifient et discutez-en avec un mentor ou un pair.

## Ressources d'apprentissage

{{% resource title="Documentation de Pirogue Tool Suite" description="La documentation de Pirogue Tool Suite" languages="Anglais" cost="Gratuit" url="https://pts-project.org/docs/prologue/introduction/" %}}
{{% resource title="Guides de PiRogue Tool Suite" description="Ensemble de guides supplémentaires pour PiRogue Tool Suite" languages="Anglais" cost="Gratuit" url="https://pts-project.org/docs/" %}}
{{% resource title="Wiki SpyGuard" description="La documentation de SpyGuard" languages="Anglais" cost="Gratuit" url="https://github.com/SpyGuard/SpyGuard/wiki" %}}
{{% resource title="Malware Traffic Analysis" description="Ressource avancée comprenant des exemples de fichiers PCAP pour ceux qui souhaitent aller plus loin dans leur parcours et développer des compétences d'analyse de trafic" languages="" cost="" url="malware-traffic-analysis.net" %}}
{{% resource title="Emergency VPN" description="Un projet de CivilSphere qui vous permet de vous connecter à un VPN spécialisé qui recueille les données de connectivité à Internet de votre appareil afin de compiler des rapports détaillés à ce sujet" languages="Anglais" cost="Gratuit" url="https://www.civilsphereproject.org/emergency-vpn" %}}
{{% resource title="Cours de formation sur la détection des menaces" description="Un cours gratuit d'une journée sur l'analyse et l'interprétation des données du réseau pour permettre la détecter des menaces" languages="Anglais" cost="Gratuit" url="https://www.activecountermeasures.com/hunt-training/" %}}
{{% resource title="Cours sur la surveillance de la sécurité du réseau avec Suricata" description="Un cours gratuit sur l'utilisation de Suricata, un outil de détection de menaces open source couramment utilisé" languages="Anglais" cost="Gratuit" url="https://www.pluralsight.com/courses/network-security-monitoring-suricata" %}}
{{% resource title="Pare-feux sortants" description="Un pare-feu sortant est un programme installé sur un ordinateur qui analyse tout le trafic qui en sort et tous les serveurs auxquels il se connecte. Bien qu'il puisse recueillir de nombreuses données, le rapport signal/bruit peut également être plus encombrant qu'avec d'autres outils." languages="Divers" cost="La plupart sont gratuits ou ont des versions gratuites disponibles" url="MacOS<br>LuLu (open source, gratuit)<br>Little Snitch (payant) ou Little Snitch Mini (propriétaire, gratuit)<br>Windows<br>PortMaster (open source, version gratuite/payante disponible avec fonction d'historique/d'enquête sur le réseau)<br>GlassWire (version propriétaire gratuite/payante disponible)<br><br>Android<br>NetGuard (version open source gratuite/freemium disponible avec capture/historique de trafic)<br>AFWall+ (open source, gratuit)<br><br>Linux<br>OpenSnitch (open source, gratuit)" %}}
{{% resource title="Plateformes de détection des menaces" description="Nous présentons ici plusieurs plateformes qui utilisent les données du réseau afin de détecter les menaces possibles au sein d'un système" languages="Plusieurs liens" cost="" url="https://github.com/Security-Onion-Solutions/securityonion<br>https://www.pfsense.org/<br>https://opnsense.org/<br>https://www.activecountermeasures.com/ac-hunter-community-edition/<br>https://github.com/activecm/rita<br>https://wazuh.com/<br>https://suricata.io/features/" %}}
