---
style: module
title: "Enquête passive : analyser les URL, les noms d'hôtes et les adresses IP"
description: "Un praticien peut utiliser les compétences décrites dans ce sous-thème pour commencer une enquête passive contre des serveurs sur Internet. Une enquête passive est une enquête qui ne charge aucun site Web et ne recherche que les données publiquement disponibles à leur sujet. Elle utilise des outils et des ressources de renseignement open source (OSINT) qui peuvent nous donner de nombreux détails sur l'empreinte numérique de l'infrastructure d'attaque sans que l'attaquant ne remarque que nous enquêtons."
weight: 4
---

## Cas d'utilisation

Un participant peut utiliser les compétences décrites dans ce sous-thème pour **commencer une enquête passive contre les serveurs sur Internet**. Une enquête passive est une enquête qui ne charge aucun site Web et ne recherche que les données publiquement disponibles à leur sujet. Ainsi, le cybercriminel ne sera pas averti que son site Web a reçu des visites supplémentaires, ce qui pourrait l'informer qu'une enquête est en cours. En évaluant les informations de domaine et de propriété intellectuelle, un enquêteur peut travailler à **générer des informations techniques enrichies sur l'attaque** qui seront utiles pour la sensibilisation de la communauté, le partage d'informations au sujet des menaces, la découverte de l'infrastructure malveillante associée, et pour placer les attaques dans le contexte de schémas d'attaque plus larges.

Certaines de ces compétences peuvent être nécessaires dans le cadre d'un processus de triage initial, par exemple pour aider un analyste à décider si un lien est suspect. Elles s'avéreront également très utiles lors des analyses approfondies des en-têtes d'e-mail, décrites dans la section suivante.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre la structure d'une URL ;
- Comprendre les types d'enregistrements DNS, WHOIS et la différence entre IPv4 et IPv6 ;
- Effectuer une reconnaissance de base sur les domaines ;
- Reconnaître les proxys inverses courants qui protègent les adresses IP d'origine à des fins de protection DDoS ou d'optimisation de la diffusion de contenu, tels que CloudFlare, Akamai et Fastly ;
- Découvrir ou énumérer les sous-domaines attachés à un domaine.

---

## Section Principale

L'enquête passive utilise des outils et des ressources de renseignement open source (OSINT) qui peuvent nous donner de nombreux détails sur l'empreinte numérique de l'infrastructure malveillante sans que le cybercriminel remarque que nous enquêtons.

### Connaissances de base

Cela nous oriente vers les bases des URL, DNS et IPv4/IPv6. Si vous vous sentez à l'aise avec ces concepts, c'est une très bonne chose ! Vous pouvez poursuivre et passer directement à la section « Flux de travail ». Dans le cas contraire, consultez les documents et les ressources ci-dessous :

- Construction d'une URL
  - Vous devriez être en mesure de lire une URL et de comprendre la signification de ses parties, y compris l'identification du schéma, des sous-domaines, du domaine principal, des domaines de premier niveau et de toute caractéristique d'identification du chemin ou des paramètres dans l'URL. Si vous avez besoin de rafraîchir ces connaissances, consultez [ce document de MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL).
- Raccourcisseurs d'URL
  - Certains messages malveillants peuvent utiliser un raccourcisseur d'URL pour masquer le lien malveillant réel. Si vous souhaitez voir la destination finale du lien, vous pouvez utiliser un service en ligne tel que [unshorten.me](https://unshorten.me/) pour afficher l'URL complète. Notez toutefois que le fait de ne pas raccourcir une URL peut alerter le cybercriminel que vous menez une enquête et doit être considéré comme une analyse active ;
- DNS
  - [Introduction au système de noms de domaine ](https://aws.amazon.com/route53/what-is-dns/)
  - [Types d'enregistrements DNS](https://www.cloudflare.com/learning/dns/dns-records/)
  - WHOIS : vous devriez pouvoir comprendre comment les enregistrements WHOIS sont créés et stockés, lire un enregistrement WHOIS, interroger l'enregistrement WHOIS pour tout domaine [remplacer par une ressource]. Si vous avez besoin de plus d'informations à ce sujet, consultez [ce guide](https://www.domain.com/blog/what-is-whois-and-how-is-it-used/).
- IPv4/IPv6

  - Qu'est-ce que l'IPv4?\
    [https://bluecatnetworks.com/glossary/what-is-ipv4/](https://bluecatnetworks.com/glossary/what-is-ipv4/)

  - Comprendre les différences entre IPv4 et IPv6.\
    [https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6](https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/)

  - Comprendre les adresses IP\
    [https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/](https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/)

- En plus des adresses IP, il est utile de lire les [numéros de port](https://www.techtarget.com/searchnetworking/definition/port-number).

### Flux de travail : outils et capacités

Les enquêtes IP/DNS passives peuvent être divisées en plusieurs catégories.

#### Obtenir des informations IP/DNS essentielles

L'une des premières choses que nous devrions faire dans notre enquête est d'obtenir des informations initiales sur les domaines et les hôtes. Plusieurs outils et catégories d'outils peuvent nous y aider.

- WHOIS

  Les enregistrements WHOIS sont accessibles au public et contiennent des informations utiles sur les domaines. Apprenez à utiliser des utilitaires basés sur le Web (par exemple, [ARIN whois](https://search.arin.net/rdap/) ou [who.is](https://who.is/)) ou des [utilitaires en ligne de commande](https://www.arin.net/resources/registry/whois/rws/cli/) pour afficher un enregistrement WHOIS et apprendre à lire les informations du déclarant (si elles sont divulguées), du registraire, la date du registre et les serveurs de noms DNS qui indiquent où les enregistrements faisant autorité pour cette zone DNS sont hébergés. \

- Le WHOIS peut également être exécuté sur une adresse IP afin de tenter d'identifier la société responsable de l'IP, ce qui indiquera ainsi potentiellement la société d'hébergement desservant le site Web. \

- Commandes dig et host

  **dig** est un outil de ligne de commande préinstallé ou disponible pour les principaux systèmes d'exploitation. Il vous permet de rechercher facilement (suivez le [tutoriel ici](https://phoenixnap.com/kb/linux-dig-command-examples)) les enregistrements DNS de n'importe quel domaine et de différencier les différents types d'enregistrements. Bien que le tutoriel lié contienne de nombreux éléments de syntaxe de la commande **dig**, l'utilisation la plus courante consiste à rechercher des types d'enregistrements A et MX. La commande dig est très populaire parmi les analystes, car elle est simple et facile à automatiser. **host** (voir le [lien du tutoriel](https://www.geeksforgeeks.org/host-command-in-linux-with-examples/)) est un outil de ligne de commande alternatif qui convertit rapidement un nom d'hôte en une adresse IP avec une syntaxe plus simple. Il existe également de nombreuses alternatives pour creuser (dig) avec plus de fonctionnalités ou une meilleure lisibilité, comme [doggo](https://github.com/mr-karan/doggo).

  Recherchez des serveurs de noms reverse-proxy de distribution de contenu courants tels que ceux proposés par Akamai (p. ex., a1-64.akam.net), CloudFlare (p. ex., eve.ns.cloudflare.com), Fastly (p. ex., ns3.fastly.net), car ils masqueront l'adresse IP réelle du serveur d'origine. Après avoir passé un certain temps à rechercher des serveurs de noms, vous serez en mesure de reconnaître facilement bon nombre de ces proxys. Si, par exemple, vous exécutez la commande dig pour rechercher theguardian.com, vous verrez qu'elle se résout sur les serveurs Fastly (en tout cas au moment de la rédaction du présent contenu).

- geoIP

  Les adresses IP sont approximativement liées aux emplacements géographiques physiques. Cela signifie que, si vous connaissez une adresse IP, [vous pouvez déterminer](https://www.maxmind.com/en/geoip-demo) (lien vers la démonstration de recherche MaxMind GeoIP fourni) avec un certain degré de certitude où dans le monde (pays, région) l'appareil qui utilise cette adresse se trouve. Il existe de nombreuses bases de données, connues sous le nom de geoIP, qui vous permettent de les consulter. Notez que la précision des recherches basées sur l'IP peut être extrêmement variée : parfois, il est possible de suivre une adresse IP jusqu'à une organisation spécifique, tandis que dans d'autres cas, vous n'obtiendrez qu'une granularité au niveau du pays.

🛠️ Prenez un moment pour vous exercer à utiliser ces services. Vous pouvez, par exemple, les utiliser pour rechercher votre propre site Web ou celui de votre organisation.

#### Découvrir les informations DNS/IP cachées

Il existe différentes façons d'obtenir des informations supplémentaires sur les hôtes d'un domaine. Notez toutefois que la plupart de ces techniques ne fonctionnent que dans certains cas et échouent souvent. Si l'une d'elles ne fonctionne pas, ne vous découragez pas. Voici quelques-unes de ces méthodes :

- Utiliser des transferts de zone DNS. Une fonctionnalité (généralement désactivée sur Internet) des serveurs DNS faisant autorité consiste à distribuer l'ensemble de leurs enregistrements DNS pour un domaine donné. Son utilisation prévue est de synchroniser les serveurs de réplique avec le serveur principal. Consultez [ce guide](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) sur la façon d'utiliser dig et d'autres outils pour comprendre les sous-domaines basés sur les transferts de zones DNS.
- Sous-domaines de force brute. Il est possible de deviner les sous-domaines en utilisant une liste de préfixes de sous-domaines courants et en demandant au serveur DNS les adresses IP de ces serveurs (p. ex., webmail.attacker.com, vpn.attacker.com, remoteaccess.attacker.com, etc.). Tant que le serveur donne une réponse NXDOMAIN (pas de tel domaine) pour les noms d'hôtes inexistants, il est souvent possible de trouver des domaines cachés de cette façon. Ce [guide sur l'énumération des sous-domaines](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) répertorie également certains outils de forçage brut.
- Recherche inverse des adresses IP adjacentes. Certains serveurs DNS vous permettent de rechercher le nom d'hôte d'une adresse IP. Il est courant que l'infrastructure autohébergée existe dans un petit bloc d'adresses IP. Il est donc parfois possible, compte tenu de l'adresse IP d'un nom d’hôte (p. ex., 127.0.0.5), de rechercher les noms d'hôtes des adresses IP voisines (p. ex., 127.0.0.1-127.0.0.254).

Il existe des outils qui utilisent ces techniques et d'autres pour essayer de découvrir des ressources réseau supplémentaires. L'un de ces outils, encore en cours de développement, s'appelle [Fierce](https://www.kali.org/tools/fierce/). [DNS Recon](https://securitytrails.com/blog/dnsrecon-tool) est un autre outil populaire. Cet [article de blog décrivant DNSRecon](https://securitytrails.com/blog/dnsrecon-tool#content-alternatives-to-dnsrecon) inclut également une liste d'autres outils d'énumération DNS populaires.

#### Enrichir les informations IP/DNS à l'aide des services Internet Scanner

Une fois que vous avez obtenu des informations d'identification (domaines et adresses IP), vous pouvez rechercher ces données plus en profondeur en utilisant certains services qui vous permettent d'enquêter sur des informations supplémentaires concernant l'hôte et toute activité qui lui est associée.

Découvrez comment afficher les ports ouverts, les services actifs et les bannières de service à partir d'une adresse IP donnée en utilisant l'un des nombreux services d'analyse de veille Web. Notez qu'il s'agit toujours d'une technique d'enquête passive, car ces services analysent à plusieurs reprises le Web à la recherche de leurs ensembles de données et vous ne lancerez pas de nouvelle activité sur l'infrastructure d'intérêt :

- Utilisez [Censys Search](https://search.censys.io/) pour observer les ports ouverts, les services en cours d'exécution, les certificats TLS et plus encore pour une adresse IP donnée.
- Utilisez [Shodan](https://www.shodan.io/) (abonnement requis pour certaines fonctionnalités, et nécessite l'utilisation des filtres Shodan dans les requêtes, voir [référence](https://www.shodan.io/search/filters) et [exemples](https://www.shodan.io/search/examples)) pour rechercher des informations sur les services exécutés sur un serveur par adresse IP. Shodan peut également rechercher tous les serveurs exécutant un service avec une bannière particulière.
- Utilisez [DNS Dumpster](https://dnsdumpster.com/) pour rechercher les surfaces d'attaque potentielles des services Internet.

Ces services et bases de données similaires peuvent vous aider à identifier les activités et l'historique d'un serveur/service spécifié.

D'autres services de scanner recueillent également l'**historique DNS**, ce qui vous permet de remonter dans le temps pour savoir quelles autres _résolutions_ de domaine sont apparues pour une adresse IP donnée, quand elles sont apparues ou ont disparu, ainsi que des sous-domaines pour un domaine donné.

- [Traces de sécurité](https://securitytrails.com/)
- [Microsoft XDR](https://www.microsoft.com/fr/security/business/siem-and-xdr/microsoft-defender-xdr) (anciennement RiskIQ) fournit des données d'historique et de résolution DNS limitées aux clients de niveau libre.

#### Enrichir les informations IP/DNS à l'aide de bases de données de renseignements sur les menaces

Plusieurs services recueilleront des indicateurs de menaces et d'antécédents de comportement malveillant. Si vous devez vous assurer qu'aucune nouvelle activité d'analyse n'est amorcée (ce qui constituerait une enquête active), assurez-vous de ne pas effectuer de nouvelle analyse avec votre recherche (p. ex., alors que VirusTotal vous permet de vérifier une URL, il lancera une nouvelle analyse contre l'URL, en lançant ainsi une activité qui pourrait être détectée comme une enquête).

- [Alienvault OTX](https://otx.alienvault.com/) est une ressource ouverte axée sur la communauté pour les indicateurs malveillants. La recherche d'une adresse IP ou d'un nom d'hôte affichera des informations OSINT utiles ainsi que des enregistrements de toute activité malveillante précédemment obtenue.
- [Mandiant Advantage](https://www.mandiant.com/multi-vendor-security-platform-free-access) (propriété de Google) fournit des fonctionnalités de recherche limitées avec son offre gratuite.

#### Utilisation de la recherche de certificats

Presque tous les sites Web qu'un utilisateur rencontrera utilisent maintenant le protocole HTTPS, qui utilise une technologie connue sous le nom de TLS (Transport Layer Security). Les sites Web malveillants l'utilisent également, en partie parce que les utilisateurs croient que HTTPS et un verrou apparaissant dans la barre d'URL du navigateur pour signifier que le site Web est sûr, indépendamment d'autres facteurs.

Comme les certificats TLS doivent être signés par une autorité de certification (CA) de confiance afin d'être approuvés par le navigateur, une quantité substantielle de données sur le domaine peut être disponible pour votre enquête lorsque vous recherchez une infrastructure partagée, des sous-domaines, des identifiants et d'autres actifs.

Les données de certificats riches sont accessibles au public grâce à la pratique de la transparence des certificats, dans laquelle les autorités de certification ajoutent tous les certificats émis à un journal public inviolable. Il peut être utile de comprendre ce système : consultez un bref aperçu sur le site Web [Certificate Transparency](https://certificate.transparency.dev/) ou approfondissez vos connaissances avec leur aperçu technique sur [How CT Works](https://certificate.transparency.dev/howctworks/). Il est utile pour les apprenants qui souhaitent en savoir plus sur le suivi et la détection des infrastructures malveillantes d’avoir une compréhension globale de ce système.

L'utilisation pratique de la recherche de certificats implique la recherche de domaines, de sous-domaines, d'adresses IP, l'identification d'informations intéressantes telles que les dates d'émission et la corrélation d'informations trouvées dans les certificats émis.

Lisez le guide [Certificates: The OSINT Gift that Keeps on Giving…](https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/) qui décrit les principaux champs d'enquête et les recherches à l'aide de Censys et Shodan, et regardez la [vidéo de 10 minutes qui l'accompagne sur YouTube](https://www.youtube.com/watch?v=XHltHamQVoA) et qui effectue la même recherche à l'aide de [crt.sh](https://crt.sh/). Il est utile de pouvoir utiliser les trois utilitaires de recherche. En particulier, assurez-vous de comprendre :

- Quels sont certains des champs « intéressants » d'un certificat lors d'une enquête
- Comment rechercher ces champs sur les différentes plateformes
- Comment identifier les sous-domaines, les adresses IP hôtes et les domaines alternatifs émis pour un certificat.

Notez que la syntaxe de l'API de recherche Censys a changé en 2021 et que certaines des recherches dans les tutoriels ci-dessus ne fonctionneront pas. Par exemple, au lieu de « parsed.names: », utilisez simplement « names: » dans la nouvelle syntaxe.

De nombreux outils ont été construits autour des journaux de transparence des certificats. Par exemple, essayez d'énumérer les sous-domaines à l'aide de [MassDNS](https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains) (voir les instructions pour utiliser scripts/ct.py sur la page READMe).

Censys propose une lecture plus approfondie sur les techniques avancées de suivi et de chasse pour les acteurs de la menace en utilisant leur plateforme sur [Advanced Persistent Infrastructure Tracking](https://censys.com/advanced-persistent-infrastructure-tracking/).

**Choses à noter**

- Lorsque vous utilisez un outil tel que WHOIS, vous trouverez de nombreuses adresses cachées derrière Cloudflare ou des services similaires. Cela signifie que les administrateurs de cette adresse l'hébergent partiellement en utilisant un service tiers majeur, par exemple pour maintenir un plus grand anonymat ou pour la protection DDoS. De même, de nombreux domaines utilisent des services de confidentialité pour s'assurer que leurs données n'apparaissent pas dans l'enregistrement WHOIS. Certaines personnes mettent également de fausses données dans l'enregistrement WHOIS. Si c'est le cas, l'analyse de l'adresse via WHOIS ne donnera pas de bonnes informations (sauf peut-être pour la date de création du domaine) et vous devrez utiliser d'autres formes d'analyse.
- De nombreuses URL malveillantes utilisées dans les e-mails d'hameçonnage utilisent (parfois plusieurs) redirections, ce qui signifie que l'URL initiale peut être moins pertinente pour l'analyse. L'identification des redirections et des autres adresses IP impliquées nécessitera une interaction active avec l'URL, ce qui est couvert dans la compétence d'Enquête active.
- Les cybercriminels peuvent héberger leur propre serveur DNS et suivre les demandes. Dans ce cas, les requêtes DNS peuvent ne pas être « passives » et alerter le cybercriminel au sujet de l'enquête. Faites particulièrement attention aux noms d'hôtes qui pourraient contenir des identificateurs, comme r2378r233yr39wjwr.exemple.com.

## Pratique

Choisissez un nom de domaine plus ou moins aléatoire, en vous assurant qu'il n'est pas hébergé derrière un service de distribution de contenu/reverse-proxy tel que Cloudflare (vous pouvez le déterminer en le recherchant rapidement à l'aide d'un outil tel que dig et en utilisant l'option NS pour rechercher des serveurs de noms). À l'aide des catégories d'outils ci-dessus, examinez le domaine et essayez d'expliquer :

- Où le domaine est-il enregistré et, le cas échéant, qui l'a enregistré?
- Quelle est l'adresse IP du domaine?
- Qui gère cette adresse IP?
- Où ce serveur est-il localisé?
- (Si les participants ont accès à Shodan ou Censys) Quels services fonctionnent sur ce serveur?
- Y a-t-il d'autres domaines hébergés sur la même IP?
- Pouvez-vous trouver des sous-domaines pour ce domaine?

## Contrôle de compétence

Asseyez-vous avec un pair ou un mentor qui a une expérience significative dans les enquêtes passives contre les serveurs sur Internet. Puis :

- Complétez la [salle de reconnaissance passive](https://tryhackme.com/room/passiverecon) sur TryHackMe.
- Effectuez les exercices ci-dessus, idéalement dans un domaine différent, et passez en revue votre processus et vos conclusions avec votre pair ou votre mentor. Demandez-lui d'examiner votre travail et de fournir des commentaires sur le processus et les résultats. Il pourrait être utile de discuter spécifiquement de la façon de trouver des sous-domaines en cours d'exécution sur ce domaine et pour discuter de l'exactitude des recherches de geoIP concernant ces domaines. En option, asseyez-vous avec votre mentor ou pair pour exécuter certains paramètres d'examen avancés et configurer ensemble une automatisation de base, par exemple en demandant à dig de charger une liste de domaines à partir d'un fichier texte et de fournir des informations à leur sujet.
- Si vous avez un message d'hameçonnage réel (ou, alternativement, prenez un domaine d'hameçonnage de [PhishTank](https://phishtank.org/) et analysez-le, notez que le site Web recueille des domaines plutôt que des messages), effectuez l'enquête passive décrite dans l'exercice pratique (avec prudence !) en discutant avec un pair ou un mentor. Documentez vos conclusions et votre processus. Demandez-lui d'examiner votre travail et de fournir des commentaires sur le processus et les résultats.


## Ressources d'apprentissage

{{% resource title="Qu'est-ce qu'une URL ?" description="Un bref aperçu de ce que sont les URL, comment elles sont construites, et quelles fonctionnalités supplémentaires (ancres et similaires) elles peuvent avoir" languages="Chinois, anglais, français, japonais, coréen, russe, espagnol" cost="Gratuit" url="https://developer.mozilla.org/fr/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL" %}}
{{% resource title="Introduction au DNS" description="Une présentation de base du fonctionnement des DNS" languages="Vidéo en anglais, texte en arabe, bahasa indonésien, allemand, espagnol, français, italien, portugais, vietnamien, turc, russe, thaï, japonais, coréen, chinois, taïwanais" cost="Gratuit" url="https://aws.amazon.com/fr/route53/what-is-dns/?nc1=h_ls" %}}
{{% resource title="Aperçu des types d'enregistrements DNS" description="Comprend les types d'enregistrements les plus courants et certains moins courants." languages="Anglais, allemand, espagnol, français, italien, japonais, coréen, portugais, taïwanais, mandarin" cost="Gratuit" url="https://www.cloudflare.com/fr-fr/learning/dns/dns-records/" %}}
{{% resource title="Utilisation de la commande dig" description="Comment rechercher des informations sur les adresses IP" languages="Anglais" cost="Gratuit" url="https://phoenixnap.com/kb/linux-dig-command-examples" %}}
{{% resource title="doggo" description="Une alternative à la commande dig, avec des fonctionnalités très similaires, mais une sortie au format différent" languages="Anglais" cost="Gratuit" url="https://github.com/mr-karan/doggo" %}}
{{% resource title="Commande host sous Linux avec exemples" description="Un guide sur l'utilisation de la commande host sous Linux, un autre outil couramment utilisé pour analyser les serveurs et autres types d'infrastructure" languages="Anglais" cost="Gratuit" url="https://www.geeksforgeeks.org/host-command-in-linux-with-examples/" %}}
{{% resource title="Poursuite de la reconnaissance DNS: DNSRecon, ressource 1" description="Divers outils pour automatiser la recherche de serveurs associés" languages="Anglais" cost="Gratuit" url="https://securitytrails.com/blog/dnsrecon-tool" %}}
{{% resource title="Poursuite de la reconnaissance DNS: Fierce, ressource 1" description="Divers outils pour automatiser la recherche de serveurs associés" languages="Anglais" cost="Gratuit" url="https://www.kali.org/tools/fierce/" %}}
{{% resource title="Poursuite de la reconnaissance DNS: Fierce, ressource 2" description="Divers outils pour automatiser la recherche de serveurs associés" languages="Anglais" cost="Gratuit" url="https://salsa.debian.org/pkg-security-team/fierce" %}}
{{% resource title="geoIP" description="Rechercher l'emplacement physique (probable) d'un serveur par adresse IP" languages="Anglais" cost="Gratuit pour des quantités limitées" url="https://www.maxmind.com/en/geoip-demo" %}}
{{% resource title="who.s" description="Affiche les informations de propriété pour un domaine ou une adresse IP" languages="Anglais" cost="Gratuit" url="https://who.is/" %}}
{{% resource title="RDAP" description="Affiche les informations de propriété pour un domaine ou une adresse IP" languages="Anglais" cost="Gratuit" url="https://search.arin.net/rdap/" %}}
{{% resource title="ICANN Lookup" description="Affiche les informations de propriété pour un domaine ou une adresse IP" languages="Multiple" cost="Gratuit" url="https://lookup.icann.org/fr" %}}
{{% resource title="Qu'est-ce que l'enregistrement whois et comment il est utilisé" description="Un résumé rapide de ce qu'est une base de données whois et de ses limites potentielles" languages="Anglais" cost="Gratuit" url="https://www.domain.com/blog/what-is-whois-and-how-is-it-used/" %}}
{{% resource title="Le guide ultime de la base de données whois" description="Offre un aperçu de ce que whois peut (et ne peut pas) faire pour" languages="Anglais" cost="Gratuit" url="https://domainnamestat.com/blog/the-ultimate-guide-to-the-whois-database" %}}
{{% resource title="Qu'est-ce qu'une adresse IPv4 ?" description="Il existe deux types d'adresses IP : IPv4 et IPv6. Ce guide fournit une introduction à cette dernière" languages="Anglais" cost="Gratuit" url="https://bluecatnetworks.com/glossary/what-is-ipv4/" %}}
{{% resource title="Différences entre IPv4 et IPv6" description="Décrit les principales différences entre les deux types d'adresses IP" languages="Anglais" cost="Gratuit" url="https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/" %}}
{{% resource title="Comprendre les adresses IP" description="Une brève introduction à ce que sont les adresses IP, et quels en sont les différents types" languages="Anglais" cost="Gratuit" url="https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/" %}}
{{% resource title="Que sont les numéros de port et comment fonctionnent-ils ?" description="Une introduction rapide aux numéros de port, qui comprend une liste de certains ports principaux" languages="Anglais" cost="Gratuit" url="https://www.techtarget.com/searchnetworking/definition/port-number" %}}
{{% resource title="Énumération de sous-domaines : le guide ultime" description="Un guide qui contient plusieurs techniques d'énumération (détermination) que les sous-domaines d'un domaine spécifique contiennent. Il convient de rappeler que toutes les techniques ne fonctionneront pas sur tous les domaines/serveurs." languages="Anglais" cost="Gratuit" url="https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/" %}}
{{% resource title="Services de renseignement sur les menaces avec historique DNS: Security Trails" description="Ces services effectuent des analyses DNS et ajoutent un historique ; les analystes qui les utilisent peuvent donc voir si certains sites Web ou adresses ont été déplacées ou modifiées" languages="Anglais" cost="Gratuit avec des fonctionnalités Premium " url="https://securitytrails.com/" %}}
{{% resource title="Services de renseignement sur les menaces avec historique DNS: Microsoft XDR" description="Ces services effectuent des analyses DNS et ajoutent un historique ; les analystes qui les utilisent peuvent donc voir si certains sites Web ou adresses ont été déplacées ou modifiées" languages="Anglais" cost="Gratuit" url="https://www.microsoft.com/fr/security/business/siem-and-xdr/microsoft-defender-xdr" %}}
{{% resource title="Alienvault OTX" description="Un service qui compile les renseignements sur les menaces et les indicateurs mis en avant par la communauté" languages="Anglais" cost="Gratuit" url="https://otx.alienvault.com/" %}}
{{% resource title="Mandiant Advantage" description="Un autre service de renseignement sur les menaces, actuellement détenu par Google" languages="Anglais" cost="Certaines fonctionnalités sont disponibles avec l'abonnement gratuit" url="https://www.mandiant.fr/" %}}
{{% resource title="Shodan" description="Affiche des informations sur les services exécutés sur un serveur par adresse IP, peut également rechercher tous les serveurs exécutant un service avec une bannière particulière" languages="Anglais" cost="Forfait gratuit, Basic 49 USD, Plus de volume disponible sous forme d'abonnements mensuels (Les services de base gratuits pour les e-mails universitaires offrent parfois d'excellentes remises, p. ex., l'abonnement pour 5 USD s'ils obtiennent 5 millions d'utilisateurs en juillet 2022 et 4 USD s'ils atteignent 4 millions d'utilisateurs en mars 2021)" url="https://www.shodan.io//" %}}
{{% resource title="Censys Search" description="Un outil qui peut observer les ports ouverts, les services en cours d'exécution, les certificats TLS et plus pour une adresse IP donnée" languages="Anglais" cost="Gratuit" url="https://search.censys.io/" %}}
{{% resource title="DNS Dumpster" description="Un outil utilisé pour rechercher les surfaces d'attaque potentielles des services Internet" languages="Anglais" cost="Gratuit" url="https://dnsdumpster.com/" %}}
{{% resource title="DNS Checker" description="Le « couteau suisse » des recherches DNS et IP : permet diverses recherches rapides sur les enregistrements de domaine/DNS, IP et e-mail" languages="Anglais" cost="Gratuit" url="https://dnschecker.org/all-tools.php" %}}
{{% resource title="MX ToolBox" description="Le « couteau suisse » des recherches DNS et IP : permet diverses recherches rapides sur les enregistrements de domaine/DNS, IP et e-mail" languages="Anglais" cost="Gratuit" url="https://mxtoolbox.com/SuperTool.aspx" %}}
{{% resource title="Fonctionnement de la transparence des certificats" description="Une brève introduction à ce qu'est la transparence des certificats, aux questions qu'elle aborde et à leur fonctionnement" languages="Anglais" cost="Gratuit" url="https://certificate.transparency.dev/howctworks/" %}}
{{% resource title="Certificats : le cadeau OSINT qui continue à porter ses fruits (versio texte)" description="Un guide pour les analystes sur la façon d'utiliser des outils comme Shodan pour rechercher des certificats et obtenir de bonnes données sur les serveurs Web sur lesquels ils enquêtent" languages="Anglais" cost="Gratuit" url="https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/" %}}
{{% resource title="Certificats : le cadeau OSINT qui continue à porter ses fruits (version video)" description="Un guide pour les analystes sur la façon d'utiliser des outils comme Shodan pour rechercher des certificats et obtenir de bonnes données sur les serveurs Web sur lesquels ils enquêtent" languages="Anglais" cost="Gratuit" url="https://www.youtube.com/watch?v=XHltHamQVoA" %}}
{{% resource title="crt.sh" description="Un moteur de recherche qui se concentre spécifiquement sur la recherche de certificats" languages="Anglais" cost="Gratuit" url="https://crt.sh/" %}}
{{% resource title="massdns" description="Un outil qui peut être utilisé pour la recherche de sous-domaine par force brute" languages="Anglais" cost="Gratuit" url="https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains" %}}
{{% resource title="Suivi avancé de l'infrastructure persistante" description="Un guide sur les différentes méthodes qui pourraient être utilisées pour suivre l'infrastructure malveillante, et qui aborde également les recherches de certificats" languages="Anglais" cost="Gratuit" url="https://censys.com/advanced-persistent-infrastructure-tracking/" %}}