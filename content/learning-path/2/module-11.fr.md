+++
style = "module"
weight = 11
title = "Nettoyage, suivi, gestion des risques après incident et partage des informations"
+++

## Cas d'utilisation

Si des logiciels malveillants ou du trafic malveillant sont détectés sur l'appareil d'une personne ciblée, nous devons fournir des correctifs ou des recommandations ciblées pour permettre au client de déterminer les prochaines étapes appropriées.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Déterminer la méthode de nettoyage appropriée pour le type de logiciel malveillant ou l'indicateur de compromission découvert
- Effectuer ou guider les étapes de nettoyage correctif, y compris la suppression des mécanismes de persistance, les outils de suppression des logiciels malveillants, les redémarrages, les réinitialisations d'usine
- Identifier les situations dans lesquelles le nettoyage peut s'avérer impossible et où d'autres conseils ou mesures peuvent s'avérer nécessaires
- Documenter et partager les résultats

---
## Section Principale

Lorsque vous découvrez une infection par un logiciel malveillant ou un autre indicateur de compromission sur un appareil, vous devrez travailler avec le propriétaire de l'appareil concerné pour résoudre la situation. Pour fournir la meilleure assistance possible, il convient de tenir compte des objectifs de la personne et de comprendre la nature de la menace présente sur son appareil. La personne concernée pourrait vouloir se débarrasser du logiciel malveillant le plus rapidement possible afin de reprendre sa vie et son travail, ou elle pourrait préférer utiliser un autre appareil tout en conservant l'appareil infecté afin d'enquêter sur ce qui s'est passé et peut-être découvrir les responsables de l'infection.

### Suppression de logiciels malveillants

#### Réactivation des fonctions de sécurité du système d'exploitation

Plus tôt dans ce parcours d'apprentissage, nous avons mentionné [certaines protections intégrées du système d'exploitation](/fr/learning-path/2/module-4/#triagelistes-de-contrôle-pour-vérifier-les-protections-manquantes). Si un logiciel malveillant a pu s'exécuter sur le système d'une personne ciblée simplement parce que certaines de ces protections ont été désactivées, la réactivation de celles-ci peut permettre d'empêcher le logiciel malveillant de s’exécuter ou de causer d'autres dommages. Certains logiciels malveillants moins sophistiqués peuvent donc cesser de fonctionner ou même être supprimés simplement en accédant aux paramètres du système d'exploitation et en réactivant les protections. Si vous ne parvenez pas à réactiver ces protections ou si elles sont à nouveau désactivées après un certain temps, cela indique que le processus malveillant empêche le bon fonctionnement du système d'exploitation et que d'autres travaux de nettoyage ou de réinitialisation d'usine sont nécessaires. Notez que dans certains cas, vous découvrirez que les protections du système d'exploitation ont été désactivées afin d'installer un logiciel piraté, que l'utilisateur peut éviter de mentionner immédiatement. Il est utile de connaître ce scénario et de guider le client dans les décisions de gestion des risques et de trouver des alternatives plus sûres qui préservent l'intégrité du système d'exploitation.

#### Réinitialisations d'usine

Les réinitialisations d'usine sont souvent le moyen le plus simple et le plus propre d'éliminer les logiciels malveillants sur un appareil donné. Si l'utilisateur a sauvegardé toutes les données qu'il souhaite conserver dans un emplacement cloud ou un lecteur de sauvegarde, et qu'il est en mesure de réinstaller ses applications les plus utilisées après une réinitialisation d'usine, cette option est préférable pour traiter les infections de logiciels malveillants. S'il n'est pas certain d'avoir sauvegardé ses données importantes, vous pouvez l'aider à effectuer une copie de sauvegarde locale ou via le cloud. Notez que les fichiers malveillants peuvent se trouver dans les fichiers sauvegardés (bien qu'ils soient inertes jusqu'à leur exécution). Il est donc conseillé d'analyser les dossiers de sauvegarde avec un moteur antivirus réputé. Notez que les applications et autres configurations de périphériques ne sont pas souvent sauvegardées, en fonction de l'utilitaire de sauvegarde utilisé. Il est toujours judicieux de tester les sauvegardes, par exemple en essayant de restaurer l'ensemble du système ou certains fichiers clés, avant d'effectuer une réinitialisation d'usine.

De nombreux analystes de logiciels malveillants préfèrent utiliser des réinitialisations d'usine plutôt que d'autres types de suppression, car cela leur donne une bien meilleure certitude qu'aucune trace du logiciel malveillant ne persistera sur le système de la personne ciblée. Il y a toujours un risque que les programmes antivirus ou les protections intégrées aux systèmes d'exploitation n'éliminent pas tous les logiciels malveillants, surtout s'ils sont nouveaux ou rares. Une réinitialisation d'usine sera beaucoup plus efficace à cet égard. La seule exception à cela pourrait être les rootkits UEFI et les logiciels malveillants qui affectent le micrologiciel de l'appareil plutôt que le système d'exploitation. Nous avons joint certains articles à ce sujet ci-dessous.

#### Suppression de logiciels malveillants (et lorsque ce n'est pas possible)

Il est parfois impossible d'effectuer une réinitialisation d'usine en raison de contraintes de temps, de contraintes technologiques ou de confort de l'utilisateur. Selon la nature du logiciel malveillant et sa compréhension, il peut être possible de le supprimer par des moyens automatisés ou manuels. Consultez la liste des conseils spécifiques à la plateforme ci-dessous pour obtenir des conseils généraux.

Dans certains cas, les efforts de suppression des logiciels malveillants peuvent s'avérer inefficaces. Les logiciels malveillants Android intégrés ou les versions craquées ou débridées d'un système d'exploitation en sont un exemple (voir la section Android ci-dessous pour en savoir plus). Les attaques visant le matériel ou le micrologiciel sont une autre classe de logiciels malveillants qui résisteraient aux efforts de nettoyage et de réinitialisation d'usine. Ceux-ci sont relativement rares mais ils existent, principalement sur PC (Windows/Linux). Il convient donc de les connaître. Certains sont détectables par les antivirus, par exemple consultez [ESET sur le thème d'un rootkit UEFI découvert dans la nature en 2018](https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/). Des conseils supplémentaires de Microsoft sur la chasse aux menaces du rootkit UEFI sont disponibles sur [BleepingComputer ici](https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/).

### Conseils spécifiques à la plateforme

#### Android

- La réinitialisation d'usine est disponible à partir du menu Paramètres ou du mode de démarrage de récupération.
- Certains logiciels malveillants/publicitaires/espions sont intégrés dans le système d'exploitation Android fourni en usine, comme dans le cas de certains appareils Android bon marché et sans marque. Un exemple est détaillé dans le rapport technique de [HUMAN Security sur le botnet de fraude publicitaire BADBOX](https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf). Malheureusement, dans la plupart des cas, ces appareils ne peuvent pas être nettoyés par réinitialisation d'usine et sont irrécupérables par l'utilisateur moyen, et doivent être remplacés par des appareils de marque réputée, hélas à un prix plus élevé.
- Vérifiez si les sources d'applications non protégées ont été activées en vérifiant si des applications ont reçu l'autorisation d'installer des APK à partir de sources inconnues dans la section Paramètres. Si oui, recherchez les applications suspectes ou inconnues.
- Les applications suspectes ou malveillantes peuvent être supprimées.
- Sécurisez tous les comptes Google utilisés pour accéder à l'appareil.
- Assurez-vous que Google Play Protect est activé et vérifiez les résultats de l'analyse (à partir de Google Play -> Menu -> Play Protect).
- Assurez-vous que les composants du système sont à jour et que des mises à jour de sécurité sont installées. Vous pouvez vérifier la date des mises à jour de sécurité de l'appareil en regardant dans Paramètres -> À propos du téléphone -> Informations sur le logiciel (ou version Android) -> Niveau de correctif de sécurité Android. Vérifiez les mises à jour en appuyant sur Mise à jour du système Google Play. Notez que les anciens appareils peuvent recevoir des mises à jour de sécurité limitées.

#### iOS/iPadOS

- Des recherches publiées indiquent que les exploitations de failles contre les systèmes iOS (y compris des cas tels que Pegasus) ne survivent pas à une réinitialisation de l'appareil (pas une réinitialisation d'usine, mais un simple redémarrage). Il peut donc être judicieux d'effectuer un simple redémarrage. Comme l'auteur de la menace peut réinfecter l'appareil en utilisant une faille zero-click, un redémarrage régulier est probablement de rigueur, tout comme le mode de verrouillage, dont le lien se trouve ci-dessous. Gardez à l'esprit que ce niveau d'attaque est encore rare et coûteux. Notez que les applications configurées ou installées de manière malveillante (p. ex., stalkerware, la fonctionnalité de localisation du téléphone) ou un compte Apple ID compromis peuvent toujours affecter la sécurité de l'appareil, alors lisez la suite pour découvrir d'autres actions ci-dessous.
- Désinstallez les applications suspectes ou malveillantes.
- Envisagez d'activer le [mode de verrouillage](https://support.apple.com/en-us/105120).
- Assurez-vous que le compte Apple iCloud est privé et qu'aucune autre personne n'y a accès. Tout utilisateur iOS peut utiliser [le Contrôle de sécurité d'Apple](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0) pour vérifier si d'autres personnes ont accès à l'un de ses comptes.
- Vérifiez si l'appareil est débridé. [Certains conseils fournis](https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/) par Certo Software comprennent la vérification de Cydia ou Sileo, ou consistent à utiliser leur application gratuite Certo Mobile Security.
- Vérifiez l'inscription (indésirable) dans Mobile Device Management (vérifiez sous Réglages -> Général -> Profils).
- Effectuez une réinitialisation d'usine en suivant [ce guide](https://support.apple.com/en-gb/HT201274) (cela supprimera toutes les photos, les messages et les fichiers présents sur le téléphone. S'ils n'ont pas été sauvegardés, ils seront irrémédiablement perdus).

#### Windows

- La réinitialisation d'usine est la solution à privilégier. La plupart des appareils qui ont été achetés avec un système Windows préinstallé auront une partition de récupération à partir de laquelle vous pourrez effectuer une réinitialisation d'usine ou une actualisation du système d'exploitation
- L'exécution d'un antivirus dans le mode sans échec de Windows peut être plus efficace pour mettre en quarantaine les infections découvertes. Cependant, cette technique peut également passer à côté de logiciels malveillants sans fichiers qui sont actifs pendant le fonctionnement normal du système d'exploitation.
- Vérifiez les mécanismes de persistance des logiciels malveillants à l'aide de SysInternals AutoRuns, désactivez-les et confirmez après le nettoyage que les activités sont désactivées.
- Certains créateurs d'antivirus fournissent un « disque de secours » qui vous permet de démarrer dans un système temporaire à partir duquel vous pouvez effectuer des analyses et des activités de suppression de logiciels malveillants. Une liste d'options fiables est fournie [ici par TechRadar](https://www.techradar.com/best/best-antivirus-rescue-disk).
- Méfiez-vous des nombreux guides de suppression des logiciels malveillants de Windows qui semblent être personnalisés pour des variantes spécifiques de logiciels malveillants. Beaucoup d'entre eux sont des guides génériques promouvant l'utilisation d'un outil propriétaire qui peut être lui-même un logiciel indésirable.

#### MacOS

- La réinitialisation d'usine est conseillée, voir les [instructions d'Apple ici](https://support.apple.com/en-ug/HT212749).
- Les antivirus commerciaux auront une fonction de nettoyage et de quarantaine.
- Utilisez les outils [Objective-See](https://objective-see.org/tools.html) tels que Knock Knock et Kext Viewer pour vérifier et désactiver les processus inconnus et persistants, et les extensions du noyau.

### Gestion des risques après les incidents et partage des informations

Partager vos conclusions avec votre client et travailler avec lui pour comprendre comment l'infection par un logiciel malveillant a pu se produire constituent une étape importante qui lui permettra de mettre à jour son approche de la gestion des risques et de comprendre l'importance (ou l'absence d'importance) de l'incident de sécurité.

Prenez des notes techniques détaillées, des captures d'écran et des échantillons (ou, plus probablement, des hachages), et discutez avec votre client de son modèle de menace et de la mesure dans laquelle vous pourriez partager vos conclusions avec la communauté. Le partage de vos résultats est particulièrement utile si vous avez découvert une nouvelle menace ou une menace qui cible les membres d'une communauté spécifiquement sur la base de certains travaux qu'ils réalisent. Dans ce cas, le partage avec d'autres intervenants des hachages de logiciels malveillants, des vecteurs d'infection et des mécanismes d'atténuation permettra de protéger les personnes les plus exposées au risque. Vous pouvez utiliser certaines informations de la section [Documentation des résultats](/fr/learning-path/1/module-8/) du parcours d'apprentissage _Détection, enquête et suivi des infrastructures malveillantes_ lorsque vous créez un bref rapport et lorsque vous envisagez de le diffuser.

## Contrôle de compétence

* Créez un organigramme ou une liste de contrôle qui pourrait vous aider à supprimer les logiciels malveillants d'un appareil et à vous assurer que vous ne manquez aucune étape. Discutez de cet organigramme ou de cette liste de contrôle avec un pair ou un mentor pour vous assurer qu'il est exact et que vous n'avez rien oublié.  

* Écrivez un bref paragraphe détaillant dans quelles situations vous recommanderiez que les personnes qui ont été ciblées par une infection de logiciel malveillant changent les mots de passe de leurs comptes principaux (e-mail, iCloud, réseaux sociaux, travail) et comment vous l'expliqueriez à une personne que vous assistez. Présentez ce paragraphe à un pair ou un mentor qui vérifiera si votre explication est exacte.

## Ressources d'apprentissage

{{% resource title="Découverte d'une cyberattaque du rootkit UEFI" description="Une analyse réalisée en 2018 par une société de sécurité qui décrit un rootkit UEFI : un logiciel malveillant embarqué à un niveau inférieur au système d'exploitation, afin de ne pas être détruit par une simple réinstallation du système d'exploitation" languages="Anglais" cost="Gratuit" url="https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/" %}}
{{% resource title="Microsoft partage des conseils pour détecter les attaques du bootkit BlackLotus UEFI" description="Un aperçu d'un autre logiciel malveillant, plus récent, qui fonctionne à un niveau inférieur au système d'exploitation, ainsi que des mesures que les analystes peuvent prendre pour le détecter" languages="Anglais" cost="Gratuit" url="https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/" %}}
{{% resource title="Examen approfondi des chevaux de Troie : BADBOX et PEACHPIT" description="Un rapport approfondi examinant les logiciels malveillants qui sont préinstallés sur les appareils, très probablement en usine, et donc extrêmement difficiles à supprimer. Un bon exemple de la raison pour laquelle les appareils utilisés pour les travaux sensibles doivent provenir de fabricants réputés" languages="Anglais" cost="Gratuit" url="https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf" %}}
{{% resource title="Comment le Contrôle de sécurité sur iPhone fonctionne pour vous protéger" description="Une fonctionnalité iOS qui permet à n'importe quel utilisateur d'examiner les informations qu'il partage avec d'autres utilisateurs et, au besoin, d'arrêter ce partage" languages="Anglais" cost="Gratuit" url="https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0" %}}
{{% resource title="Comment savoir si votre iPhone est débridé" description="Un aperçu de quelques heuristiques initiales que vous pouvez effectuer pour vérifier si votre appareil iOS a été débridé" languages="Anglais" cost="Gratuit" url="https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/" %}}
{{% resource title="Comment effectuer la réinitialisation d'usine de votre iPhone, iPad ou iPod touch" description="Un guide rapide sur la façon d'effacer complètement un appareil iOS, qui fournit une assurance supplémentaire que tous les logiciels malveillants ou profils malveillants ont été supprimés" languages="Anglais" cost="Gratuit" url="https://support.apple.com/fr-fr/HT201274" %}}
{{% resource title="Les meilleurs disques de secours antivirus de 2024" description="Une liste d'outils que vous pouvez utiliser pour analyser et nettoyer un système d'exploitation infecté lors du démarrage à partir d'un lecteur externe" languages="Anglais" cost="Gratuit" url="https://www.techradar.com/best/best-antivirus-rescue-disk" %}}
{{% resource title="Effacez votre Mac et réinitialisez-le aux réglages d'usine" description="Un guide rapide sur la façon d'effacer complètement un appareil macOS, qui devrait fournir une assurance supplémentaire que tous les logiciels malveillants ou profils malveillants ont été supprimés" languages="Anglais" cost="Gratuit" url="https://support.apple.com/fr-fr/102664" %}}
{{% resource title="Outils Objective-See" description="Une série d'outils de sécurité pour macOS, développés par un chercheur en sécurité très réputé, qui peuvent être utilisés pour détecter les logiciels malveillants" languages="Anglais" cost="Gratuit" url="https://objective-see.org/tools.html" %}}