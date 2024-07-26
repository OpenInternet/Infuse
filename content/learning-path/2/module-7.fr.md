+++
style = "module"
weight = 7
title = "Détection de logiciels malveillants par acquisition d'images (iOS, Android)"
+++

## Cas d'utilisation

La première étape pour détecter les logiciels malveillants sur un appareil consiste à collecter des données à partir de l'appareil lui-même pour leur analyse. Idéalement, les données seront récupérées de l'appareil vers un espace sûr avec une perturbation minimale de l'appareil lui-même. Les logiciels malveillants plus avancés peuvent tenter de détecter l'activité d'investigation et de se supprimer pour entraver leur détection et leur analyse.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Effectuer la copie de sauvegarde d'un appareil iOS ou Android pour vérifier la présence de logiciels malveillants potentiels
- Vérifier les données collectées dans cette sauvegarde, par exemple en recherchant des horodatages et des métadonnées ou artefacts similaires
- Analyser les sauvegardes iOS et Android en utilisant MVT

## Section Principale

Pour une vision plus large des méthodes de détection des logiciels malveillants et des défis possibles, nous recommandons à tous les apprenants de jeter un coup d'œil à [cette conférence](https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik) (elle est à l'origine en allemand, mais également traduite en français et en anglais), qui constitue une excellente introduction au sujet et dure environ 50 minutes (plus la séance de questions-réponses).

### Acquisition d'image iOS/Android

Les systèmes d'exploitation mobiles sont généralement plus limités/verrouillés que les ordinateurs de bureau. Il est donc moins simple de créer et de travailler avec une sauvegarde complète et vous ne pourrez peut-être pas obtenir facilement toutes les informations de l'appareil. Le [Mobile Verification Toolkit](https://mvt.re) (MVT) d'Amnesty International Security Lab est un outil multiplateforme complet pour l'extraction de données mobiles. La documentation complète est disponible sur leur site Web, mais des parcours sont également disponibles, par exemple [celui-ci](https://www.youtube.com/watch?v=iLOSlHhGI9U) (anglais, vidéo de 6 minutes). Notez que cette dernière présentation comprend également des documents que nous aborderons dans le sous-thème suivant. Vous pouvez également utiliser [ce guide](https://pts-project.org/guides/g4/) qui vous montrera comment effectuer des sauvegardes sur iOS et Android.

En ce qui concerne le système d'exploitation, vous pouvez utiliser un outil appelé [libimobiledevice](https://libimobiledevice.org/) ou iTunes pour effectuer des sauvegardes. Vous pouvez ensuite analyser ces sauvegardes en utilisant MVT.

La détection de logiciels malveillants sur Android est un peu plus compliquée. Vous pouvez utiliser un outil appelé [androidqf](https://github.com/botherder/androidqf) pour capturer les journaux. Consultez [cet article](https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/) pour obtenir plus de détails sur androidqf et sur les raisons pour lesquelles il est difficile d'effectuer une sauvegarde sans d'abord connecter l'appareil Android à un autre ordinateur.

Vous pouvez installer MVT sur Linux ou macOS. La plupart des systèmes Linux utilisent pip3, un outil utilisé pour installer des paquets Python, ce qui rend l'installation de MVT assez simple. Sur macOS, vous devrez généralement installer deux outils : XCode et Homebrew avant de pouvoir installer MVT. Vous pouvez suivre les instructions de [ce guide](https://docs.mvt.re/en/latest/install/) pour installer MVT.

### Analyse d'images avec MVT

🧰 Pour les appareils mobiles, l'architecture du système rend le logiciel antimalware moins efficace. Cependant, le [Mobile Verification Toolkit](https://mvt.re) (MVT) analyse les données extraites de l'appareil Android ou iOS à la recherche de divers logiciels malveillants.

Dans la section précédente, nous avons envisagé la copie de sauvegarde d'un appareil avec MVT. Une fois qu'elle est faite, vous pouvez analyser la sauvegarde à l'aide de l'outil de ligne de commande.

Notez toutefois que MVT a certaines limites :

- MVT vérifie la sauvegarde du périphérique par rapport aux IoC connus. Cela signifie qu'il ne peut vérifier que les logiciels malveillants qui ont des IoC spécifiques. Il ne recherche pas d'autres heuristiques (comme un système débridé, ou des automatisations ou scripts suspects) qui pourraient suggérer une infection.
- Pour iOS, la meilleure approche consiste à [accéder à une sauvegarde de l'appareil, puis à extraire les données de la sauvegarde](https://docs.mvt.re/en/latest/ios/backup/itunes/). Cela devrait fournir la plupart des données disponibles sur l'appareil. (D'autres travaux d'analyse pourraient être effectués sur un appareil iOS débridé, bien que cela tombe en dehors de la portée de ce parcours d'apprentissage). Il convient également de noter qu'une sauvegarde chiffrée contient beaucoup plus de données qu'une sauvegarde non chiffrée. Nous recommandons de toujours travailler avec la première option, si possible.
- Pour Android, à moins que l'appareil soit rooté, vous ne pourrez pas tout extraire. Cependant, vous pouvez obtenir une grande partie des données de l'appareil sans accès root.

Pour obtenir un aperçu rapide sur les IoC que MVT recherche, sur la façon de télécharger et de donner à MVT de nouvelles données IoC, et une liste d'IoC potentiels que vous pourriez utiliser dans vos efforts de détection, consultez [cette sous-page dans la documentation de MVT.](https://docs.mvt.re/en/latest/iocs/)


## Pratique

Pour les exercices pratiques de ce sous-thème, effectuez d'abord une copie de sauvegarde de votre appareil (les instructions pour chaque plateforme sont décrites ci-dessous), puis répondez aux questions reprises sous l’étiquette « tous les systèmes ».

### iOS

Installez MVT sur le système d'exploitation de votre ordinateur. Suivez les instructions décrites dans [cette section](https://docs.mvt.re/en/latest/ios/install/) pour effectuer une copie de sauvegarde, soit en utilisant iTunes ou en installant d'abord [libimobiledevice](https://docs.mvt.re/en/latest/ios/install/).

### Android

Installez MVT sur le système d'exploitation de votre ordinateur. Installez [Androidqf](https://github.com/botherder/androidqf) et utilisez-le pour effectuer une copie de sauvegarde.

### Windows, macOS, Linux

Effectuez une copie de sauvegarde du système d'exploitation de votre ordinateur à l'aide d'un outil de votre choix. Vous pouvez utiliser l'un des outils décrits dans la section des ressources d'apprentissage ci-dessus.

### Tous les systèmes

Vérifiez ce qui suit dans votre sauvegarde :

- Quelles données avez-vous obtenues de l'appareil ? Quelles données n'avez-vous pas obtenues ?
- Quelles sont les données qui ont été modifiées le plus récemment ?
- Les horodatages sont-ils conservés dans la copie d'acquisition de données ?

## Contrôle de compétence

Avant de réaliser la partie de l'exercice consacrée à la vérification des compétences, assurez-vous d'avoir d'abord sauvegardé vos fichiers (comme décrit dans la section pratique). Une fois que vous avez terminé, procédez comme suit :

### Windows, macOS, Linux

Vous avez effectué une copie de sauvegarde du système d'exploitation de votre ordinateur. Ouvrez-la et cherchez-y :

- Le dossier des téléchargements
- Au moins un fichier exécutable
- Au moins un paramètre système ou un fichier de configuration

Il est parfaitement correct d'utiliser votre moteur de recherche favori pour déterminer où ces fichiers et dossiers sont généralement situés sur le disque, puis de les rechercher au même endroit à l'intérieur de votre copie de sauvegarde.

### iOS

Si votre copie de sauvegarde iOS a été chiffrée, utilisez MVT pour la déchiffrer en suivant [ces instructions](https://docs.mvt.re/en/latest/ios/backup/check/#decrypting-a-backup). Lisez le résultat de la commande pour vous assurer que le déchiffrement a réussi.

Après avoir déchiffré la sauvegarde, demandez à MVT de télécharger les derniers IoC, puis utilisez l'outil pour analyser la sauvegarde à la recherche de logiciels malveillants.

### Android

Demandez à MVT de télécharger les derniers IoC, puis utilisez-le pour analyser la sauvegarde que vous avez effectuée en utilisant androidqf.

## Ressources d'apprentissage

{{% resource title="Investigation des logiciels malveillants sur les smartphones : introduction" description="Une conférence de deux chercheurs sur les logiciels malveillants mobiles travaillant avec des journalistes où ils décrivent les bases de l'investigation des logiciels malveillants sur smartphone, comment elle diffère de l'investigation sur ordinateur, et quels en sont les principaux outils et méthodes" languages="La conférence est à l'origine en allemand, mais elle a été traduite en français et en anglais. Les diapositives sont en anglais" cost="Gratuit" url="https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik" %}}
{{% resource title="Investigation mobile" description="Ce guide complet a été initialement créé par Sécurité sans frontières. Il examine comment effectuer l'investigation de base et la collecte de données sur chaque plateforme majeure." languages="Anglais" cost="Gratuit" url="https://pellaeon.gitbook.io/mobile-forensics/" %}}
{{% resource title="Comment effectuer une image de sauvegarde sur Windows 10/11" description="Afin d'analyser un système pour y détecter les éventuels logiciels malveillants, nous devons d'abord effectuer une copie des fichiers et des dossiers présents sur ce système. Ce guide nous montre comment procéder sur Windows." languages="Anglais" cost="Gratuit" url="https://www.computerworld.com/article/3655693/how-to-make-image-backup-windows-10-windows-11.html" %}}
{{% resource title="Comment faire une copie de sauvegarde sur Mac ou Macbook" description="Cet article se concentre sur les images disque sur macOS." languages="Anglais" cost="Gratuit" url="https://www.macworld.com/article/671336/how-to-back-up-a-mac-or-macbook.html" %}}
{{% resource title="Comment faire une copie de sauvegarde de votre système Linux entier en utilisant Rsync" description="Cet article se concentre sur rsync, un utilitaire en ligne de commande très puissant qui peut également être utilisé pour cloner un système Linux afin d'en analyser l'image disque." languages="Anglais" cost="Gratuit" url="https://ostechnix.com/backup-entire-linux-system-using-rsync/" %}}
{{% resource title="MVT : Mobile Verification Toolkit" description="Un outil gratuit qui peut analyser les copies de sauvegarde des systèmes iOS et Android pour rechercher les IoC associés à des infections de logiciels malveillants ou espions. Largement utilisé dans l'investigation des appareils pour la société civile" languages="Anglais" cost="Gratuit" url="https://docs.mvt.re/en/latest/" %}}
{{% resource title="Copie de sauvegarde avec iTunes" description="Cet article de la documentation de MVT montre comment utiliser iTunes pour créer une copie de sauvegarde qui peut ensuite être analysée avec MVT." languages="Anglais" cost="Gratuit" url="https://docs.mvt.re/en/latest/ios/backup/itunes/" %}}
{{% resource title="J’ai analysé mon téléphone pour détecter le logiciel espion Pegasus" description="Une vidéo étape par étape qui illustre comment utiliser MVT afin de trouver les IoC associés à Pegasus sur iOS" languages="Anglais" cost="Gratuit" url="https://www.youtube.com/watch?v=iLOSlHhGI9U" %}}
{{% resource title="Guide du débutant : comment faire une copie de sauvegarde d'un appareil mobile à des fins d'analyse" description="Un guide d'introduction sur la façon d'utiliser des outils communs pour effectuer une copie de sauvegarde des appareils iOS et Android afin de les analyser pour y détecter d'éventuels logiciels malveillants" languages="Anglais" cost="Gratuit" url="https://pts-project.org/guides/g4/" %}}
{{% resource title="libimobiledevice" description="La page d'accueil d'une bibliothèque logicielle qui peut être utilisée pour accéder et effectuer des copies de sauvegarde d'appareils iOS à partir d'un appareil Windows, macOS ou Linux" languages="Anglais" cost="Gratuit" url="https://libimobiledevice.org/" %}}
{{% resource title="Simplification de l'investigation sur Android" description="Un article écrit par un membre d'Amnesty Tech sur les outils actuels qui peuvent être utilisés pour effectuer des copies de sauvegarde d'appareils Android à des fins d'analyse et certaines de leurs limites" languages="Anglais" cost="Gratuit" url="https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/" %}}
{{% resource title="Installer libimobiledevice" description="Un guide rapide sur la façon d'installer libimobiledevice afin de réaliser une investigation" languages="Anglais" cost="Gratuit" url="https://docs.mvt.re/en/latest/ios/install/" %}}
{{% resource title="androidqf" description="Android Quick Forensics est un outil qui peut être utilisé pour accéder facilement aux données à partir d'un appareil Android afin de mener de futures investigations et analyses de logiciels malveillants." languages="Anglais" cost="Gratuit" url="https://github.com/botherder/androidqf" %}}
{{% resource title="Cours SANS sur l'acquisition numérique et le triage rapide" description="Un cours très complet, long et coûteux sur l'acquisition et l'analyse de données à partir d'appareils mobiles" languages="Anglais" cost="Plus de 8 000 USD" url="https://www.sans.org/cyber-security-courses/digital-acquisition-rapid-triage/" %}}