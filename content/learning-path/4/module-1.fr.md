+++
style = "module"
weight = 1
title = "Vulnérabilités de l'infrastructure"
description = "Nous présentons différents types de vulnérabilités d'infrastructure et l'impact qu'elles pourraient avoir."
+++

## Cas d'utilisation

Bien que ce parcours d'apprentissage se concentre sur la sécurité des applications Web, les applications Web reposent sur de nombreux éléments de l'infrastructure logicielle. Toute vulnérabilité constatée dans l'infrastructure sous-jacente de l'application compromettra également l'application. La sécurité de certaines infrastructures est donc reprise dans la sécurité des applications.

Lors de l'inspection d'une application Web à des fins d'évaluation de la vulnérabilité, de surveillance de la sécurité ou d'enquête sur une compromission, le participant doit comprendre la technologie sous-jacente qui fournit l'environnement nécessaire à l'exécution de l'application tout en recherchant les vulnérabilités dans cette pile technologique.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre les types courants de vulnérabilités logicielles de l'infrastructure
- Comprendre les impacts potentiels de ces types de vulnérabilités
- Comprendre les principes fondamentaux des cadres de vulnérabilité

---
## Section Principale

### Connaissances de base

Les sites Web n'existent pas sans certains logiciels et matériels sous-jacents qui prennent en charge les opérations de bas niveau, du traitement des requêtes au service du contenu Web. Cela comprend le matériel et le micrologiciel sous-jacents, le système d'exploitation, le logiciel du serveur Web, le ou les cadres d'application Web et même les logiciels non apparentés exécutés sur la machine. La sécurité d'une application Web dépend de la sécurité de cette infrastructure, même si les développeurs du site Web peuvent avoir peu de visibilité ou de contrôle sur cette infrastructure. Les vulnérabilités de l'infrastructure affectent généralement un grand nombre de sites Web (peut-être des centaines de millions) et sont souvent associées à des identifiants tels que les CVE (pour une introduction plus générale à ce que sont les CVE, consultez cet [article](https://www.redhat.com/en/topics/security/what-is-cve)). Ces vulnérabilités pourraient appartenir à presque n'importe quelle classe technique, mais du point de vue de l'opérateur de site Web, nous ne nous soucions que de leur impact, et non des détails techniques sous-jacents. Cela s'explique par le fait que nous n'assurons pas la maintenance du logiciel d'infrastructure, nous nous contentons de le déployer et de le configurer.

L'impact d'une vulnérabilité dans les logiciels d'infrastructure peut prendre presque n'importe quelle forme, mais certains problèmes et impacts qui sont susceptibles de surgir comprennent les types ci-dessous.

### Déni de service (DoS)

Une vulnérabilité peut permettre à un cybercriminel de planter un serveur Web ou de le rendre non réactif en raison d'une consommation excessive de ressources. Ces vulnérabilités sont généralement exploitées pour frapper un site Web hors ligne ou pour extorquer de l'argent aux opérateurs de sites Web dans le cadre d'une extorsion contre une protection. Notez qu'un cybercriminel déterminé et financé peut souvent louer du temps sur un botnet d'ordinateurs compromis pour simplement submerger un site Web avec un grand nombre de requêtes, aucune vulnérabilité n'est requise dans ce cas. Voici quelques exemples de vulnérabilités DoS :

- [CVE-2011-3192](https://nvd.nist.gov/vuln/detail/CVE-2011-3192) : une vulnérabilité dans Apache permettant à un client de demander plusieurs sous-sections d'une page Web, entraînant une grande utilisation de la mémoire sur le serveur.
- [MS ADV190005](https://msrc.microsoft.com/update-guide/vulnerability/ADV190005) : une vulnérabilité dans Microsoft IIS permettant à un cybercriminel d'envoyer un grand nombre de variables de paramètres dans une requête HTTP/2, provoquant une consommation du processeur de 100 % sur le serveur.

### Fuites d'informations

Parfois, un serveur Web peut être contraint de renvoyer des données excessives dans une réponse. Généralement, cela sera dû au fait que le serveur allouera une grande partie de la mémoire, puis n'écrira que partiellement les données dans cette partie pour finalement envoyer la portion entière au client. Cette mémoire non initialisée pourrait contenir des données provenant d'autres requêtes ou réponses, ou même de la mémoire interne du serveur Web. La plus célèbre de ces vulnérabilités est probablement [Heartbleed (CVE-2014-0160)](https://en.wikipedia.org/wiki/Heartbleed). Ces vulnérabilités peuvent être utilisées pour voler des jetons de session (permettant aux cybercriminels d'usurper l'identité d'autres utilisateurs), des identités de machines dans des environnements cloud (permettant aux cybercriminels d'accéder à d'autres services cloud en tant que serveur Web), des clés SSL privées (permettant aux cybercriminels d'usurper l'identité du serveur Web et de lancer des attaques de personnes intermédiaires) et toute autre donnée résidant dans la mémoire du processus du serveur Web.

### Exécution de code à distance

Il s'agit du type de vulnérabilité d'infrastructure le plus typique. Cela se produit le plus souvent lorsque la requête d'un cybercriminel peut écraser des structures de contrôle de flux de données dans la mémoire du serveur, ce qui provoque l'exécution du code machine spécifié par le cybercriminel par la cible. Heureusement, des années de tests et de corrections ultérieures et d'amélioration des pratiques de programmation sécurisée ont rendu ces vulnérabilités peu fréquentes dans les configurations par défaut de logiciels d'infrastructure serveur extrêmement matures comme Apache et IIS. Cependant, elles sont très courantes dans les configurations personnalisées des logiciels communs et dans les logiciels moins matures. Voici deux exemples de 2023 ([exemple 1](https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices/), [exemple 2](https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html)). Notez que si les dépassements de mémoire tampon peuvent être le moyen classique d'exécuter du code à distance, il existe d'autres moyens de le faire également. Comme pour toutes les vulnérabilités de l'infrastructure, nous sommes principalement préoccupés par l'impact et la disponibilité d'un correctif, et moins par les détails techniques.

### Atténuation des vulnérabilités logicielles de l'infrastructure

Les logiciels d'infrastructure comprenant des vulnérabilités sont généralement découverts via un logiciel de détection de vulnérabilités (il existe de nombreux exemples de tels logiciels, [consultez cette liste](https://owasp.org/www-community/Vulnerability_Scanning_Tools)), des notifications des fournisseurs ou des systèmes de gestion de configuration ou via une inspection manuelle du logiciel déployé sur un serveur. Selon l'environnement du serveur, ce logiciel peut être entièrement géré par un tiers, mis à jour automatiquement par des agents logiciels ou des processus de déploiement, ou géré manuellement. En règle générale, si une vulnérabilité est corrigée, les cybercriminels peuvent inverser l'ingénierie du correctif pour découvrir le mécanisme de la vulnérabilité sous-jacente, il est donc important de garder le logiciel d'infrastructure à jour.

## Contrôle de compétence

Recherchez 2 CVE qui sont répertoriées sur [https://www.cve.org/](https://www.cve.org/) ou une autre base de données CVE. Choisissez celles qui sont décrites en profondeur (les bases de données CVE sont généralement liées à des articles externes qui contiennent de tels détails) et ont une cote de vulnérabilité. Étant donné que les CVE peuvent souvent être très techniques, sélectionnez celles qui traitent d'un sujet ou d'une technologie que vous connaissez. Répondez aux questions suivantes :  

- De façon générale, de quoi parle les CVE ? Quelle est la faille ou la vulnérabilité que les cybercriminels pourraient exploiter ?
- Connaissez-vous des personnes ou des organisations dont un cybercriminel pourrait exploiter les systèmes en utilisant cette CVE ? Et si cette CVE est combinée avec d'autres vulnérabilités ?
- Pourquoi pensez-vous que l'on ait attribué ce score à cette CVE ?

Après avoir consulté deux CVE que vous avez trouvé intéressantes, effectuez une recherche dans une base de données CVE pour un produit technologique que vous ou les personnes que vous assistez exécutez, consultez les CVE récentes associées et répondez de nouveau aux questions énumérées ci-dessus.

Si vous hébergez vous-même un serveur Web, recherchez les vulnérabilités récentes. Si vous utilisez quelque chose comme Drupal ou WordPress via un fournisseur tiers, vérifiez également les vulnérabilités de ces services et, via le tableau de bord de votre fournisseur (chaque fournisseur en aura un légèrement différent), assurez-vous que vous exécutez les dernières versions de ces outils.

Si possible, discutez de vos réponses à ces questions avec un pair ou un mentor qui vous aidera à vérifier que vous avez bien compris le sujet.

## Ressources d'apprentissage
{{% resource title="Qu'est-ce qu'une CVE ?" description="Une bonne introduction à ce que sont les CVE (vulnérabilités et expositions courantes) et pourquoi elles sont importantes" languages="Anglais" cost="Gratuit" url="https://www.redhat.com/en/topics/security/what-is-cve" %}}
{{% resource title="CVE avec un score de vulnérabilité de 9,8, Ressource 1" description="Voici deux exemples de CVE qui avaient des scores de vulnérabilité très élevés, ce qui signifie que les cybercriminels qui les exploitent pourraient faire beaucoup de dégâts" languages="Anglais" cost="Gratuit" url="https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaw-in-fortios-fortiproxy-devices" %}}
{{% resource title="CVE avec un score de vulnérabilité de 9,8, Ressource 2" description="Voici deux exemples de CVE qui avaient des scores de vulnérabilité très élevés, ce qui signifie que les cybercriminels qui les exploitent pourraient faire beaucoup de dégâts" languages="Anglais" cost="Gratuit" url="https://thehackernews.com/2023/05/critical-flaws-in-cisco-small-business.html" %}}
{{% resource title="CVE.org" description="Un site Web (et un outil autonome) qui vous permet de vous abonner aux CVE affectant différents fournisseurs. Notez que toutes les vulnérabilités ne reçoivent pas de CVE." languages="Anglais" cost="Gratuit" url="https://www.cve.org/" %}}
{{% resource title="Analyse de vulnérabilité SAFETAG" description="Un guide d'analyse des vulnérabilités qui utilise la méthodologie SAFETAG et contient de nombreuses activités spécifiques" languages="Anglais" cost="Gratuit" url="https://safetag.org/methods/vulnerability_scanning" %}}
{{% resource title="Outils d'analyse des vulnérabilités" description="Une liste d'outils automatisés que les protecteurs numériques peuvent utiliser pour rechercher des vulnérabilités dans les applications Web. Les différents outils fonctionnent selon les différents cas d'utilisation et ont différents modèles de prix, beaucoup d'entre eux étant open source." languages="Anglais" cost="Gratuit" url="https://owasp.org/www-community/Vulnerability_Scanning_Tools" %}}

