---
style: module
title: "Enquête active : analyser les pages Web malveillantes"
description: Ce module vous apprendra à examiner les sites web contrôlés par les
  attaquants afin de comprendre leurs actions et de potentiellement découvrir
  d'autres infrastructures contrôlées par les attaquants ou des vecteurs
  d'attaque utilisés dans les attaques.
weight: 7
---
## Cas d'utilisation

Les e-mails d'hameçonnage ne sont généralement que la première étape d'une attaque. La plupart essaient de pousser la personne ciblée à visiter une page Web avec un objectif d'attaque spécifique. Ce module de compétences vous apprendra à **examiner les sites Web contrôlés par le cybercriminel pour comprendre ses actions** et potentiellement **découvrir d'autres infrastructures contrôlées par le cybercriminel** ou des vecteurs d'attaque utilisés dans les attaques. Notez que les sites Web peuvent être extrêmement compliqués, avec des comportements allant de simples pages d'usurpation d'identité à des attaques complexes contre le navigateur Web ou le dispositif de navigation lui-même.

Notez que l'interaction avec des sites Web malveillants peut mettre l'analyste lui-même en danger. Assurez-vous de configurer et d'utiliser un environnement isolé ([voir le sous-thème 3](#_heading=h.2szc72q)), et de collecter et de stocker en toute sécurité toutes les pages Web. Enfin, cette compétence recoupe et mène au parcours d'apprentissage de l'analyse des logiciels malveillants.


## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Analysez les sites Web appartenant à des cybercriminels en regardant leur code source à l'aide des fonctionnalités d'inspection des navigateurs Web et en utilisant éventuellement des outils tels que des proxys d'interception ou des débogueurs JavaScript
- Découvrez à quelle infrastructure supplémentaire ces sites Web pourraient être liés en recherchant des URL, des redirections, des domaines liés et d'autres actifs ou identifiants

- - -
## Section Principale
### Connaissances de base


Cela sera beaucoup plus facile à pratiquer si vous connaissez les bases de JavaScript et HTML, bien qu'il ne s'agisse pas de prérequis strictement nécessaires.

Il convient de souligner quelques différences fondamentales entre un e-mail et une page Web :

- Les pages Web peuvent être dynamiques, de sorte que le serveur peut générer une page Web différente en fonction de variables telles que l'adresse IP du demandeur, le type de navigateur, l'heure de la journée et bien d'autres facteurs.
- Les navigateurs Web traiteront plus de types de HTML que les clients de messagerie, avec moins de protections. Plus important encore, les navigateurs Web exécutent JavaScript, ce que les clients de messagerie ne font pas.
- Les e-mails HTML sont générés lorsque le courrier est envoyé, l'action est donc initiée par le cybercriminel. Avec les pages Web, l'action est initiée par le visiteur. Lorsque vous affichez une page Web malveillante, le cybercriminel peut toujours être au courant de vos actions. Alors que des mécanismes tels que les VPN ou Tor pourraient empêcher l'administrateur de la page Web de voir votre adresse IP, le site lui-même pourrait contenir des référents liés à l'e-mail d'hameçonnage ou être personnalisé pour chaque destinataire. De cette façon, le cybercriminel saura avec un haut degré de certitude que seules les personnes ayant accès à l'e-mail d'hameçonnage visiteront la page Web.

Pour cette raison, nous vous recommandons d'analyser uniquement les pages Web dans un environnement sécurisé spécialement conçu pour ouvrir des fichiers potentiellement suspects, tels qu'une machine virtuelle ou un bac à sable. De plus, discutez du modèle de menace spécifique au destinataire de l'e-mail pour vous assurer qu'il est sûr pour vous de mener une activité d'analyse supplémentaire qui pourrait être visible par le cybercriminel.

### Études de cas

Lisez deux études de cas qui analysent les attaques d'hameçonnage ciblant des groupes de la société civile. Ces deux attaques ont partiellement réussi :

- Human Rights Watch : [Iran : piratage soutenu par l'État des militants, des journalistes, des politiciens](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) (La section d'introduction est un contexte utile sur les tactiques et les motivations des cybercriminels ; cependant, concentrez-vous sur la section _Analyse technique de la campagne d'hameçonnage_ à des fins d'apprentissage.)
- Bellingcat : [ascension de Guccifer ? Une campagne d'hameçonnage de plusieurs mois sur ProtonMail cible des dizaines de journalistes et d'ONG russes](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/)

En mettant l'accent sur l'[étude de cas HRW](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) ci-dessus, notez certaines fonctions clés de l'analyse utilisées dans chaque enquête. Certaines d'entre elles nécessitent des compétences techniques, tandis que d'autres nécessitent des recherches, une pensée critique et des compétences interpersonnelles. Voici quelques-unes des méthodes identifiées dans l'étude de cas :

- Les cybercriminels ont utilisé un service de raccourcissement d'URL. Ceci est commun pour les e-mails légitimes et non légitimes. Vous devriez être capable de reconnaître les raccourcisseurs d'URL et de savoir comment développer ces URL si possible (par exemple en utilisant le mécanisme intégré du raccourcisseur tel que l'ajout d'un + à la fin de l'URL, ou en utilisant un outil d'extension comme [Urlex](https://urlex.org/)) ou les étapes de suivi des redirections HTTP. Dans ce cas, il semble que le cybercriminel a créé son propre service de raccourcisseur d'URL qu'il a fait passer pour un autre raccourcisseur d'URL connu (par un petit changement de frappe dans le domaine).
- Plusieurs domaines ont été enregistrés qui étaient destinés à confondre la cible (p. ex. sharefilesonline\[.\]live, qui joue sur les noms de produits Microsoft SharePoint et Live.com).
- Liens uniques envoyés à des cibles individuelles avec un identifiant à cinq caractères (cela peut être obtenu par n'importe quelle chaîne unique dans une URL, généralement dans le chemin d'URL ou transmis dans un paramètre, par exemple après un « ? »).
- En utilisant la force brute pour essayer toutes les combinaisons possibles d'identifiants à cinq caractères et d'URL, les analystes ont pu découvrir plusieurs autres pages de destination utilisées par la campagne d'hameçonnage. Ils se sont fait passer pour des fournisseurs de messagerie populaires et ont utilisé un kit d'hameçonnage qui permet de contourner les techniques MFA.
- Les analystes ont contacté d'autres personnes qui auraient pu être ciblées par la même campagne pour mieux partager les renseignements au sujet des menaces et mieux comprendre les techniques des cybercriminels.
- Les cybercriminels ont utilisé des tactiques telles que l'accès aux données et l'utilisation de [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) (un outil qui permet aux utilisateurs de télécharger toutes les données de leur compte Google).
- Les auteurs du rapport ont examiné l'historique Google Takeout et d'autres journaux des personnes ciblées. Cela a permis de révéler l'activité après l'attaque, les noms des appareils du cybercriminels et les adresses IP des connexions du cybercriminel.
- Les auteurs ont également signalé d'autres travaux de recherche et d'attribution qu'ils ont menés :
  - Ils ont fait référence à des recherches menées par des groupes de renseignements sur les menaces persistantes avancées (APT) (consultez et mettez en favori cette fiche Google participative du [groupe et des opérations APT](https://docs.google.com/spreadsheets/d/1H9_xaxQHpWaa4O_Son4Gx0YOIzlcBWMsdvePFX68EKU/htmlview)).
  - Ils ont examiné le code source pour identifier les blocs de code réutilisés ou similaires parmi les menaces précédemment étudiées.
  - Ils ont écrit sur d'autres tactiques d'attaque telles que se faire passer pour des organisateurs de conférence/sommet ou des personnalités clés d'ONG.
- Enfin, le rapport présente également des indicateurs techniques d'attaque.

### Inspection automatisée d'un site Web dans un bac à sable

La première étape à suivre lorsque vous vous préparez à inspecter un site Web lié à partir d'un message d'hameçonnage peut consister à examiner en toute sécurité le site Web. Cela implique un certain degré d'interaction avec le site Web. Pour le traitement direct d'un site Web potentiellement malveillant, vous devriez avoir mis en place des précautions pour vous assurer un environnement de travail sûr, comme abordé dans le [sous-thème 3](#_heading=h.2szc72q). Toutefois, vous pouvez également utiliser des outils en ligne pour inspecter un site Web dans un bac à sable en respectant une distance sécuritaire :

- 🧰 Les outils tels que [UrlScan](https://urlscan.io/) permettent l'exécution d'une analyse d'une URL. Notez quelques-unes des principales caractéristiques nécessaires pour interpréter les résultats :
  - Lorsque vous exécutez une analyse, choisissez Public, Non répertorié ou Privé. Lisez leur [explication](https://urlscan.io/docs/api/) de la différence, mais sachez qu'une analyse publique (l'option par défaut) listera l'URL sur la page d'accueil.
  - Image en direct du site Web (cela peut être la première étape du triage simple si le modèle de menace vous permet de lancer cette analyse)
  - Domaine et informations IP
  - Ressources chargées, y compris les scripts et AJAX (onglet HTTP)
  - Éléments dynamiques, cookies, variables (onglet Comportement)
  - Redirections (le cas échéant)
  - Indicateurs tels que les domaines, les adresses IP, les chaînes, les hachages (onglet Indicateurs)
    - Un hachage est comme une courte empreinte digitale d'un fichier, il peut être utilisé pour identifier un fichier unique sans révéler son contenu. Vous pouvez calculer un hachage à l'aide [de la ligne de commande sous Windows, macOS et Linux](https://techdocs.akamai.com/download-ctr/docs/verify-checksum).
  - Contenu tel que les formulaires (onglet Contenu)
  - Technologies utilisées (telles que CMS)
  - Verdicts (au cas où d'autres utilisateurs auraient signalé l'URL comme étant malveillante)
  - Bouton de recherche pour vérifier le site dans d'autres moteurs d'analyse  

- 🧰[Hybrid Analysis](https://www.hybrid-analysis.com/) est un bac à sable hébergé qui peut charger une page Web dans un environnement de test et faire correspondre le comportement du site Web contre diverses heuristiques d'activité malveillante et vérifier les indicateurs internes contre les menaces connues. Notez certaines des caractéristiques clés et les compétences nécessaires pour interpréter les résultats :
  - Après avoir soumis une URL, sélectionnez l'environnement à utiliser comme bac à sable. Si vous sélectionnez « Analyse rapide », une exécution de bac à sable complète n'aura pas lieu, mais plutôt un plus petit ensemble d'analyses statiques et de vérifications des indicateurs.
- [VirusTotal](https://www.virustotal.com/) peut également vérifier une URL pour détecter l'utilisation éventuelle de contenu malveillant. Notez que Hybrid Analysis inclut les recherches VirusTotal et prend en compte un plus large éventail de questions pour déterminer sa notation.

Notez qu'une application Web sophistiquée pourrait détecter qu'une requête provient des plages d'adresses IP de ces outils et servir différentes données ou aucune donnée à la requête, tout en fournissant un contenu malveillant à d'autres adresses IP.

### Manuel et outils spécifiques pour l'inspection d'un site Web

L'un des moyens les plus simples d'analyser un site Web est d'[utiliser l’outil d’inspection intégré de notre navigateur Web](https://blog.hubspot.com/website/how-to-inspect), qui décompose généralement le site Web en différentes sous-parties, peut parfois illustrer quel code le site Web demande à partir de quel serveur, et nous permet de modifier le code du site et de voir comment cela change la mise en page et la fonctionnalité.

#### Force brute

Comme dans le rapport de Human Rights Watch ci-dessus, l'utilisation d'approches programmatiques pour forcer les URL constitue une technique couramment utilisée pendant l'OSINT. Plusieurs outils et approches peuvent être appris :

- OWASP [DirBuster](https://gitlab.com/kalilinux/packages/dirbuster)
- Générateurs de listes de mots : souvent utilisés pour le déchiffrement de mots de passe, les listes de mots de passe sont également utilisées pour la découverte de force brute de dossiers et de sous-domaines. Ces listes de mots fonctionneront conjointement avec les outils énumérés au point précédent. Voir les outils comme Crunch ([Tutoriel 1](https://www.hackers-arise.com/post/creating-a-custom-wordlist-with-crunch) | [Tutoriel 2](https://null-byte.wonderhowto.com/how-to/tutorial-create-wordlists-with-crunch-0165931/))

#### Analyse du kit d'hameçonnage

La plupart des attaques que vous rencontrerez utiliseront un kit d'hameçonnage préfabriqué ou modifié, une collection de code et de modèles qui permettent aux cybercriminels de créer facilement un site Web d'hameçonnage convaincant. Certains kits d'hameçonnage présentent des signes révélateurs ; beaucoup d'entre eux, par exemple, utilisent certains mécanismes pour éviter d'être [détectés et indexés par les moteurs de recherche](https://arxiv.org/pdf/2210.08273.pdf). Ils pourraient même refuser le chargement à partir des [adresses IP des moteurs de recherche ou des entreprises de sécurité](https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html).

Certains kits d'hameçonnage ont également la capacité de contourner l'authentification multifactorielle, par exemple en capturant un code qu'une personne ciblée a saisi et en l'utilisant immédiatement pour se connecter à la page Web réelle en son nom. [Cet article est une excellente synthèse](https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/) sur la façon dont un kit d'hameçonnage open source utilisé par les équipes de sécurité qui testent les mécanismes de sécurité peut capturer et utiliser des données d’authentification à deux facteurs (et ce qui pourrait être fait pour l'éviter). Vous pouvez également [consulter un autre article sur un kit d'hameçonnage](https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/) (ce kit a été écrit par des cybercriminels plutôt que des chercheurs en sécurité), qui a utilisé un contournement MFA et des techniques fascinantes pour entraver la détection.

## Pratique

- Trouvez les contacts en cas d'abus pour 3 sociétés d'hébergement Web, y compris au moins une plateforme majeure comme AWS, GCP, Azure, Oracle Cloud et Alibaba Cloud. Recherchez toute information supplémentaire qu'ils offrent sur leur processus de signalement des abus.
- Étudiez le fonctionnement des bases de données d'abus et de Google Safe Browsing. Répertorie plusieurs outils et services avec lesquels ils sont intégrés.
- Créez votre propre organigramme de réponse aux incidents et votre liste de contrôle contenant les liens pertinents et les actions à prendre en cas d'incident d'infrastructure en ligne malveillante.

## Contrôle de compétence

Travaillez avec un mentor ou un pair qui a une certaine expérience dans la suppression d'infrastructures malveillantes. Effectuez les tâches suivantes avec son aide :

- Préparez toutes les preuves (adresses IP, hachages, domaines et toute autre preuve) dont vous auriez besoin pour soumettre un rapport d'abus. Si vous avez un exemple d'infrastructure malveillante à portée de main, recueillez ces preuves concernant cette infrastructure. Si ce n'est pas le cas, recueillez les preuves à partir d'une page Web légitime (sans soumettre un rapport d'abus, bien sûr). Discutez des preuves avec votre pair ou votre mentor, qui vérifiera que vous avez recueilli les bonnes preuves et que vous les avez correctement documentées.
- Expliquez comment la navigation sécurisée, la base de données d'abus et les fournisseurs de listes de blocage fonctionnent. Si vous avez un exemple d'infrastructure malveillante sous la main, envoyez-le à une base de données ou à un fournisseur. Si ce n'est pas le cas, rendez-vous sur la page Web du fournisseur et faites un essai du processus de soumission avec votre pair ou votre mentor (expliquez les informations que vous prépareriez, sans les soumettre).
- Demandez à votre mentor ou à votre pair de lister trois fournisseurs d'hébergement Web, fournisseurs de services cloud, registraires de domaines ou autres fournisseurs de services. Pour chacun d'eux, trouvez le mécanisme de contact ou de signalement d'abus pertinent.
- Parlez à votre mentor ou à votre pair des risques stratégiques et personnels liés au retrait, à la divulgation éventuelle des données du client et à l'indication à un cybercriminel que son attaque fait l'objet d'un examen critique. Faites un projet de jeu de rôle dans lequel vous communiquez ces considérations à la cible de l'attaque.


## Ressources d'apprentissage

{{% resource title="Iran : piratage d'activistes, de journalistes et de politiciens soutenu par l'État" description="Un bon article et une bonne analyse d'une campagne d'hameçonnage très sophistiquée ciblant des groupes de la société civile. Comprend des discussions approfondies sur l'infrastructure et l'attribution" languages="Anglais" cost="Gratuit" url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}
{{% resource title="Ascension de Guccifer ? Une campagne d'hameçonnage de plusieurs mois sur ProtonMail cible des dizaines de journalistes et d'ONG russes" description="Un article concernant une précédente campagne d'hameçonnage qui ciblait spécifiquement les groupes civils travaillant sur la Russie. L'attaque elle-même comprenait un contournement de la MFA." languages="Anglais" cost="Gratuit" url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}
{{% resource title="VirusTotal" description="" languages="Un outil pour évaluer les URL et les pièces jointes pour détecter tout contenu malveillant connu éventuel. Notez que les URL et les fichiers soumis peuvent être consultés par d'autres utilisateurs." cost="Gratuit, avec certaines limitations de taux et des fonctionnalités professionnelles supplémentaires" url="https://www.virustotal.com/gui/home/url" %}}
{{% resource title="UrlScan" description="" languages="Un outil où vous saisissez une URL et qui analyse le site Web résultant, à la recherche de logiciels malveillants ou d'autres comportements suspects" cost="Gratuit, avec des fonctionnalités Premium supplémentaires" url="https://urlscan.io/" %}}
{{% resource title="Hybrid Analysis" description="Un outil qui peut analyser les fichiers et les liens à la recherche de contenus ou de comportements malveillants. Contrairement à UrlScan, il peut également ouvrir des échantillons de logiciels malveillants ou des fichiers exécutables." languages="" cost="Gratuit" url="https://www.hybrid-analysis.com/" %}}
{{% resource title="Apprendre JavaScript" description="En plus de HTML, la plupart des pages Web utilisent JavaScript. Bien qu'il ne soit pas nécessaire de devenir un expert en la matière, l'apprentissage de JavaScript est important pour comprendre ce qu'effectuent les sites Web." languages="Anglais" cost="Gratuit" url="https://www.codecademy.com/learn/introduction-to-javascript" %}}
{{% resource title="Comment utiliser Inspect Element dans Chrome, Safari et Firefox" description="Chaque navigateur Web majeur contient maintenant une fonctionnalité d'élément d'inspection, qui vous permet d'étudier et de modifier soigneusement les composants de code qui composent une page Web. Cet article fournit un bref aperçu de cette fonctionnalité (bien que la documentation de chaque navigateur soit encore plus complète) et montre comment l'activer sur les principaux navigateurs." languages="Anglais" cost="Gratuit" url="https://blog.hubspot.com/website/how-to-inspect" %}}
{{% resource title="Exemples d'analyses de sites Web malveillants, ressource 1" description="Un bon guide sur la façon d'effectuer une analyse initiale et un triage sur un site Web pour déterminer s'il est malveillant et s'il a été étiqueté par d'autres comme tel" languages="Anglais" cost="Gratuit" url="https://infosecwriteups.com/analyzing-a-malicious-site-9fb8730be51b" %}}
{{% resource title="Exemples d'analyses de sites Web malveillants, ressource 2" description="Un autre bon guide sur la façon d'effectuer une analyse initiale et un triage sur un site Web pour déterminer s'il est malveillant et s'il a été étiqueté par d'autres comme tel" languages="Anglais" cost="Gratuit" url="https://www.linkedin.com/pulse/security-analyst-skills-pt-2-techniques-analyzing-web-craig-smith" %}}
{{% resource title="Classification des kits d'hameçonnage Web pour assurer une détection précoce par les fournisseurs de plateformes" description="Un article académique qui examine les kits d'hameçonnage, les mécanismes utilisés par certains d'entre eux et la façon dont nous pouvons utiliser des outils tels que l'apprentissage automatique pour les détecter" languages="Anglais" cost="Gratuit" url="https://arxiv.org/pdf/2210.08273.pdf" %}}
{{% resource title="Protection des pages d'hameçonnage via .htaccess" description="Il existe de nombreuses façons dont les pages d'hameçonnage peuvent tenter d'éviter la détection. L'une d'elles consiste à utiliser .htaccess, un fichier contenant des instructions pour les serveurs Web, pour inclure ou exclure des plages IP spécifiques." languages="Anglais" cost="Gratuit" url="https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html" %}}
{{% resource title="StalkPhish" description="Un outil conçu pour automatiser la découverte et l'identification des kits d'hameçonnage" languages="Anglais" cost="Gratuit" url="https://github.com/t4d/StalkPhish" %}}
{{% resource title="Contournement de l'authentification multifactorielle : un examen judiciaire du kit d'hameçonnage Evilginx2" description="Cet article examine un kit d'hameçonnage qui a trouvé un moyen de contourner certaines formes de MFA et fournit une analyse de base de la façon dont il y parvient et des mesures d'atténuation que nous pourrions prendre." languages="Anglais" cost="Gratuit" url="https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/" %}}
{{% resource title="Le kit d'hameçonnage W3LL détourne des milliers de comptes Microsoft 365 et contourne la MFA" description="Cet article analyse un kit d'hameçonnage conçu et vendu par des cybercriminels, qui contient plusieurs mécanismes qui entravent l'analyse et utilise également des techniques de contournement de la MFA." languages="Anglais" cost="Gratuit" url="https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/" %}}
