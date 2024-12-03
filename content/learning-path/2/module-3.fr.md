+++
style = "module"
weight = 3
title = "Fonctionnement des logiciels malveillants et différents types de logiciels malveillants"
+++

## Cas d'utilisation

Avant de commencer à travailler avec les logiciels malveillants, nous devons d'abord en apprendre davantage sur leurs différents types. Les virus, les logiciels espions (spyware), les portes dérobées (backdoors), les rançongiciels (ransomware) et les logiciels publicitaires (adware) ont des comportements différents et sont inspirés de différentes motivations. Cette connaissance aidera le protecteur à classer le type de logiciel malveillant détecté.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Différencier les différents types de logiciels malveillants
- Comprendre ce que les logiciels malveillants peuvent faire
- Comprendre comment commencent les infections de logiciels malveillants
- Expliquer quels sont les indicateurs de failles

---
## Section Principale

En général, un logiciel malveillant est un logiciel qui est utilisé pour faire des choses non autorisées sur l'ordinateur ou l'appareil mobile d'un utilisateur. Wikipédia propose une bonne [introduction aux logiciels malveillants en général.](https://fr.wikipedia.org/wiki/Logiciel_malveillant)

### Que font les logiciels malveillants ?

Les logiciels malveillants peuvent faire tout ce que les autres logiciels peuvent faire, mais il existe plusieurs capacités communes aux logiciels malveillants. Bien que certains logiciels malveillants soient à usage unique, d'autres auront de multiples capacités. Les capacités fréquemment utilisées comprennent :

- L'effacement ou le chiffrement de données (rançongiciel). Il s'agit de capacités souvent exécutées par des cybercriminels dont les motivations sont d'ordre financier. Ce type de logiciel malveillant prendra le contrôle de l'ordinateur de la personne ciblée et lui refusera l'accès à ses données jusqu'à ce qu'une rançon soit payée.
- Le vol de données. Les logiciels malveillants peuvent envoyer sélectivement ou sans discrimination des données de l'appareil de la personne ciblée vers un ordinateur contrôlé par le cybercriminel. Ils sont utilisés seuls ou en conjonction avec un rançongiciel.
- L'utilisation non autorisée des ressources. Les cybercriminels aux motivations financières utiliseront fréquemment des collections d'ordinateurs compromis pour effectuer des actions, telles que l'extraction de cryptomonnaies, l'envoi de spam ou l'exécution d'attaques par déni de service.
- Le détournement du navigateur Web d'un utilisateur. Certains logiciels malveillants peuvent insérer des annonces dans les pages Web pendant qu'un utilisateur navigue sur le Web, et collecter des revenus publicitaires. D'autres peuvent voler des mots de passe ou des cookies de session (le cookie qui vous authentifie lorsque vous êtes connecté(e) à votre compte), en permettant aux cybercriminels d'accéder aux comptes de la personne ciblée sur les sites Web. Certains logiciels malveillants de vol exfiltrent les mots de passe, les cookies et d'autres types de données sensibles à partir d'un appareil, puis se suppriment automatiquement, en veillant à effacer toute trace de leur méfait.
- La collecte des activités des utilisateurs. Des logiciels malveillants plus sophistiqués peuvent tenter de capturer les activités de la personne ciblée, telles que l'enregistrement vidéo ou audio, la saisie de la frappe de l'utilisateur, l'enregistrement de l'emplacement d'un appareil mobile, etc. Ils sont souvent utilisés pour l'espionnage/la surveillance ou l'extorsion.
- Contrôle interactif ou semi-interactif. Les logiciels malveillants plus sophistiqués auront des capacités générales qui permettront au cybercriminel d'utiliser l'appareil de la personne ciblée pour des activités non scriptées. Un cybercriminel peut envoyer des commandes générales via un serveur de commande et de contrôle ou une connexion directe, et le logiciel malveillant exécutera les commandes sur l'appareil de la personne ciblée et retournera les résultats au cybercriminel. Cette technique est souvent utilisée sur des cibles de grande valeur ou pour lancer d'autres attaques à l'intérieur d'un réseau.

La liste ci-dessus n'est pas exhaustive, mais décrit les capacités de logiciels malveillants les plus courantes. Pour obtenir un aperçu des principaux logiciels malveillants découverts l'année précédente, consultez l'article de Patrick Wardle [The Mac Malware of 2023](https://objective-see.org/blog/blog_0x77.html). Bien que cet article décrive de nombreux concepts que nous aborderons plus tard tout au long de ce parcours d'apprentissage (tels que les analyses VirusTotal), il s'agit d'une introduction fantastique et d'une vue d'ensemble du monde des logiciels malveillants.

L'un des logiciels malveillants les plus connus est peut-être le pack NSO Group Pegasus, spécialement conçu pour la surveillance secrète. Ses capacités sont énumérées dans ce [document de vente du NSO Group](https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html).

Nous vous recommandons fortement de lire le [chapitre 5](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) du Guide d'intervention sur le terrain pour la société civile et les médias afin d'obtenir un aperçu thématique pertinent des logiciels malveillants et des concepts connexes, notamment :

- Brouillage de code
- Types de logiciels malveillants
- Persistance
- Chaînes d'infection
- Communication de commandement et de contrôle
- Programmes antivirus
- Vulnérabilités et failles

### Comment les appareils ciblés sont-ils infectés ?

Les logiciels malveillants doivent se trouver sur l'appareil d'une personne ciblée. Les méthodes pour ce faire vont des utilisateurs piégés dans l'exécution de logiciels malveillants à l'exploitation de logiciels et de services vulnérables, y compris de véritables attaques 0-click.

#### Méthodes d'infection de Windows, macOS et Linux

1. Exécution directe de programmes malveillants reçus via des attaques d'ingénierie sociale
    1. Hameçonnage via e-mail, SMS, WhatsApp, etc.
    2. Logiciels malveillants déguisés en logiciels légitimes, tels que les logiciels piratés
    3. Logiciels malveillants copiés à partir de clés USB, etc.
2. Les documents qui contiennent des logiciels malveillants, le plus souvent des documents hérités de Microsoft Office, mais aussi des formats tels que les PDF, les pages Web, etc.
3. Documents et pages Web qui exploitent des bugs dans les logiciels pour installer des logiciels malveillants. Ils contournent les contrôles de sécurité intégrés aux applications et aux systèmes d'exploitation
4. Les [attaques « zero-click »](https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html) qui ne nécessitent aucune interaction de l'utilisateur, mais qui permettent au cybercriminel d'attaquer directement une application ou un système d'exploitation. Ils affectent à la fois les systèmes d'exploitation des ordinateurs et des appareils mobiles.

Une fois la faille initiale exploitée, la plupart des logiciels malveillants passeront par [plusieurs étapes d'infection](https://community.fireeye.com/s/article/000002205).

#### Méthodes d'infection iOS et Android

Les systèmes d'exploitation mobiles ont une architecture légèrement différente de celle des ordinateurs de bureau. Ils sont généralement plus verrouillés et limitent le code qui peut être exécuté. Cela signifie que les logiciels malveillants ont également des chemins d'infection et des méthodes légèrement différents. Consultez la section sur [l'architecture des systèmes de smartphones](https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture) du Guide de criminalistique mobile pour obtenir un aperçu.

Les configurations iOS et Android standard permettent uniquement à l'utilisateur d'exécuter des logiciels téléchargés à partir des boutiques d'applications officielles. Les logiciels malveillants pour ces plateformes sont soit installés via un tel magasin d'applications (ce qui signifie qu'ils n'ont pas été découverts lors des audits de sécurité d'Apple ou de Google), soit en exploitant des failles dans iOS et Android qui permettent à du code non autorisé de s'exécuter. Alternativement, certains créateurs de logiciels malveillants utilisent également l'ingénierie sociale pour convaincre les personnes ciblées d'installer des profils malveillants ou d'autres configurations d'appareils.

### Persistance

La plupart des logiciels malveillants que vous rencontrerez dans votre travail seront persistants, ou capables de fonctionner automatiquement chaque fois que la personne ciblée se connecte ou redémarre son système. Chaque système d'exploitation dispose de mécanismes qui exécutent automatiquement certains logiciels lors de la connexion, à des moments programmés ou lorsque quelque chose se produit (par exemple, lorsqu'une nouvelle connexion réseau est établie ou qu'un programme est lancé).

Les logiciels malveillants peuvent utiliser un large éventail de techniques de persistance. Certains d'entre eux sont raisonnablement simples (ils peuvent s'ajouter à la liste des programmes qui s'exécutent automatiquement à l'ouverture du système), d'autres beaucoup plus complexes et tirent parti des fonctionnalités spécialisées du système d'exploitation. Si vous voulez en savoir plus sur ces logiciels, consultez [cette plongée profonde dans le sujet](https://github.com/Karneades/malware-persistence/blob/master/README.md) et [cette liste avancée et complète](https://github.com/Karneades/awesome-malware-persistence) des techniques de persistance. Beaucoup de ces techniques comprennent une analyse avancée qui sort légèrement du cadre de ce parcours d'apprentissage. Toutefois, il est judicieux pour vous d'avoir une idée générale de ce qu'est la persistance et des mécanismes qu'elle pourrait utiliser.

Certains logiciels malveillants ne visent pas la persistance. Au lieu de cela, ils s'exécuteront, extrairont des données, puis disparaîtront après une déconnexion ou un redémarrage. Si les attaquants veulent utiliser à nouveau les capacités du logiciel malveillant, ils le réinstallent simplement sur le système de la personne ciblée. Bien que cela puisse limiter la période pendant laquelle le logiciel malveillant est actif sur un système et donc les données qu'il collecte, cela rend également le logiciel malveillant plus difficile à détecter, car il laisse moins de traces sur le système.

### Indicateurs d'infection

Dans le processus d'installation et d'exécution d'activités malveillantes, les logiciels malveillants laissent des IoC, ou des indicateurs de compromission (IoC). Ceux-ci sont fréquemment utilisés pour identifier des éléments particuliers de logiciels malveillants. Les IoC peuvent inclure des hachages cryptographiques (nous les abordons plus tard dans ce parcours d'apprentissage) qui représentent des fichiers exécutables spécifiques, mais ils peuvent également être des connexions à des services réseau ou un trafic réseau particulier, des modèles d'exécution, etc.

Pour obtenir un bref résumé de ce que sont les IoC et à quoi ils pourraient ressembler, [consultez les pages 37 à 40](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) (des indicateurs d'infection à la neutralisation) du Guide d'intervention sur le terrain pour la société civile et les médias.

Pour obtenir une longue discussion sur les IoC et leurs utilisations dans les interventions en cas d'incident, consultez [ce webinaire de la CISA](https://www.youtube.com/watch?v=zs-AEaSd2vk) (en anglais, 46 minutes).

Jetez un coup d'œil aux IoC décrits à la page 52 [de ce rapport d'Amnesty](https://www.amnesty.org/en/documents/act10/7245/2023/fr/) d'un puissant logiciel espion commercial : il s'agit principalement des noms de domaines qui ont été utilisés comme infrastructure lors de cette campagne de logiciels malveillants. Ensuite, jetez un œil à [cette page](https://github.com/AmnestyTech/investigations), qui recueille des IoC de diverses enquêtes menées par Amnesty Tech.

Il existe de nombreuses façons de repérer les indicateurs de compromission. Ils incluent la recherche dans les journaux réseau pour voir si un périphérique a essayé de contacter un domaine spécifique et la vérification des fichiers présents sur un périphérique pour voir s'ils correspondent à certains hachages. Si vous souhaitez en savoir un peu plus sur eux, nous vous recommandons de consulter ces articles de [Microsoft](https://www.microsoft.com/fr-fr/security/business/security-101/what-are-indicators-of-compromise-ioc) et de [Fortinet](https://www.fortinet.com/fr/resources/cyberglossary/indicators-of-compromise).

### Logiciels malveillants connus et inconnus

La grande majorité des infections de logiciels malveillants que vous rencontrerez dans votre carrière auront été causées par des logiciels malveillants que la communauté connaît. Cela signifie que quelqu'un d'autre a déjà trouvé ce logiciel malveillant et partagé les IoC ou des échantillons avec les moteurs d'analyse de logiciels malveillants. Pourtant, les cybercriminels continuent d'écrire de nouveaux logiciels malveillants et d'adapter les programmes existants. Il y a donc toujours une petite chance que les appareils sur lesquels vous enquêtez aient été infectés par des logiciels malveillants qui n'ont pas encore été documentés. Si vous craignez que cela puisse être le cas, nous vous recommandons de consulter le parcours d'apprentissage de l'analyse des logiciels malveillants, qui vous guide dans la façon d'analyser des échantillons inconnus pour déterminer s'ils sont de nature malveillante.

Tous les logiciels malveillants reconnus n'ont pas non plus été largement documentés. La plupart des échantillons qui peuvent être trouvés sur des sites Web comme Malware Bazaar peuvent avoir des IoC qui leur sont associés et être reconnus comme malveillants, mais les analystes peuvent, par exemple, avoir omis de décrire ce que fait exactement ce logiciel malveillant. Si vous trouvez un échantillon que d'autres utilisateurs ont signalé comme malveillant, mais qui est sous-documenté et que vous souhaitez en savoir plus sur son fonctionnement, suivez certains des guides du parcours d'apprentissage de l'analyse.

## Pratique

Prenez un moment pour parcourir la liste des [logiciels malveillants récemment envoyés](https://bazaar.abuse.ch/browse/) par Malware Bazaar. Lisez les descriptions et les commentaires de plusieurs échantillons de logiciels malveillants et notez quelle forme ils prennent, quel mécanisme de diffusion ils utilisent et d'autres informations similaires. Certains des échantillons de logiciels malveillants sont accompagnés de commentaires. N'hésitez pas à les consulter. Notez que tous les échantillons de logiciels malveillants ne contiendront pas de détails tels que les IoC ou les mécanismes de diffusion.

Notez que Malware Bazaar contient également certains détails tels que les hachages qui ne sont couverts que dans les phases ultérieures de ce parcours d'apprentissage.

Ne téléchargez aucun échantillon pour le moment. À ce stade, il suffit de jeter un coup d'œil aux descriptions des échantillons.

## Contrôle de compétence

En travaillant avec un pair ou un mentor, trouvez deux ou trois rapports décrivant les infections de logiciels malveillants pour une plateforme de votre choix. Assurez-vous que ces rapports incluent les IoC. Si vous ne trouvez aucun rapport, vous pouvez simplement lire l'un des suivants :

- [HotRat : les risques des téléchargements de logiciels illégaux et les scripts AutoHotkey qui s'y cachent](https://decoded.avast.io/martinchlumecky/hotrat-the-risks-of-illegal-software-downloads-and-hidden-autohotkey-script-within/)
- [Earth Preta Spear - hameçonnage des gouvernements du monde entier](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html)
- [Le nouveau SugarGh0st RAT cible le gouvernement ouzbek et la Corée du Sud](https://blog.talosintelligence.com/new-sugargh0st-rat/)
- (ce rapport est long, ne le lisez que si vous vous sentez particulièrement ambitieux) [Rapport d’Amnesty Tech sur Predator](https://www.amnesty.org/en/documents/act10/7245/2023/en/)

Répondez aux questions suivantes pour l'un de ces rapports :

- Que fait ce logiciel malveillant ?
- Comment ce logiciel malveillant est-il installé sur un système ? Exploite-t-il un bug existant pour être installé ? L'installation nécessite-t-elle une intervention de l'utilisateur ?
- Quels sont les IoC de ce logiciel malveillant ? Quelles mesures pourrions-nous prendre pour repérer ces IoC sur un système ou un réseau infecté ?

Discutez de vos réponses à toutes ces questions avec votre pair ou votre mentor.

## Ressources d'apprentissage

{{% resource title="Chapitre sur les logiciels malveillants du Guide de terrain des laboratoires sur les menaces (chapitre 5)" description="Bonne introduction aux logiciels malveillants du point de vue d'un protecteur numérique qui doit les comprendre" languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}
{{% resource title="Logiciel malveillant - Wikipédia" description="Une bonne introduction fondamentale sur le sujet qui explique certains des concepts de base et modérément avancés nécessaires" languages="Multiple" cost="Gratuit" url="https://fr.wikipedia.org/wiki/Logiciel_malveillant" %}}
{{% resource title="Le logiciel malveillant Mac de 2023" description="Un aperçu important des logiciels malveillants macOS repérés en 2023. Il comprend les types de logiciels malveillants, les vecteurs d'infection, les mécanismes de persistance et les objectifs." languages="Anglais" cost="Gratuit" url="https://objective-see.org/blog/blog_0x77.html" %}}
{{% resource title="Document de vente Pegasus du NSO Group" description="Ce document divulgué décrit certaines des capacités de Pegasus, un logiciel espion qui cible entre autres les militants des droits humains. Il fournit une bonne introduction à la façon dont les logiciels espions sont vendus et commercialisés" languages="Anglais" cost="Gratuit" url="https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html" %}}
{{% resource title="Explication des attaques zero-click" description="Décrit ce que sont les attaques zero-click, pourquoi les cybercriminels pourraient être intéressés de les utiliser et pourquoi elles sont si dangereuses" languages="Anglais" cost="Gratuit" url="https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html" %}}
{{% resource title="Comprendre les indicateurs de compromission pour l'intervention en cas d'incident" description="Une vidéo de la CISA des États-Unis qui donne un bon aperçu et une introduction aux IoC, et indique comment ils pourraient être utilisés par les intervenants en cas d'incident" languages="Anglais" cost="Gratuit" url="https://www.youtube.com/watch?v=zs-AEaSd2vk" %}}
{{% resource title="Guide de prévention et de traitement des incidents liés aux logiciels malveillants pour les ordinateurs de bureau et portables" description="Un guide plus ancien (2013) par le NIST des États-Unis qui couvre de manière exhaustive le sujet" languages="Anglais" cost="Gratuit" url="https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-83r1.pdf" %}}
{{% resource title="Architecture des systèmes de smartphones" description="Un regard sur le fonctionnement des systèmes d'exploitation mobiles et sur la façon dont les logiciels malveillants peuvent s'y propager" languages="Anglais" cost="Gratuit" url="https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture" %}}
{{% resource title="Les dossiers Predator" description="Une enquête sur les logiciels malveillants menée par Amnesty Tech qui comprend des listes d'IoC à la page 52" languages="Anglais" cost="Gratuit" url="https://www.amnesty.org/en/documents/act10/7245/2023/en/" %}}
{{% resource title="Indicateurs tirés des enquêtes d'Amnesty International" description="Une liste des IoC recueillis par Amnesty au cours de ses enquêtes" languages="Aucune (ensemble de données)" cost="Gratuit" url="https://github.com/AmnestyTech/investigations" %}}
{{% resource title="Microsoft Security : explication des indicateurs de compromission" description="Un résumé de ce que sont les IoC et des formes qu'ils peuvent avoir" languages="Anglais" cost="Gratuit" url="https://www.microsoft.com/fr-fr/security/business/security-101/what-are-indicators-of-compromise-ioc" %}}
{{% resource title="Glossaire Fortinet : indicateurs de compromission" description="Un résumé de plus, très utile, des IoC" languages="Multiple" cost="Gratuit" url="https://www.fortinet.com/fr/resources/cyberglossary/indicators-of-compromise" %}}
{{% resource title="Linux Engineering de détection - Un guide sur les mécanismes de persistance" languages="Français" cost="Gratuit" description="Un aperçu de la manière dont les acteurs malveillants établissent la persistance sur les systèmes Linux et comment traquer ces techniques." url="https://www.elastic.co/security-labs/primer-on-persistence-mechanisms" %}}
