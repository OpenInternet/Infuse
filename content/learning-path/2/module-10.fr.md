+++
style = "module"
weight = 10
title = "Découvrir l'origine du logiciel malveillant"
+++

## Cas d'utilisation

Aucun logiciel malveillant n'apparaît spontanément sur l'appareil d'une personne ciblée. Il provient toujours de quelque part. Parfois, le piège est plutôt évident : la personne ciblée se rend compte que le lien sur lequel elle a cliqué est malveillant. Dans d'autres cas, le vecteur d'infection peut être moins clair. La détermination de l'origine de l'infection peut s'avérer importante pour gérer les risques futurs. Si la source d'infection initiale n'a pas été ciblée, la personne ciblée a peut-être simplement été victime d'un groupe criminel sans autre but que de gagner de l'argent. D'autre part, si l'infection initiale provient d'une attaque ciblée sophistiquée d'ingénierie sociale, la personne ciblée est susceptible de faire face à des attaques futures continues du même auteur des menaces.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre comment les horodatages fonctionnent sur les ordinateurs et appareils mobiles
- Regarder les métadonnées du système d'exploitation pour savoir où les fichiers malveillants ont été téléchargés

---
## Section Principale

### Horodatages du fichier

La première étape pour retracer l'origine de l'attaque consiste à établir l'heure à laquelle le logiciel malveillant a été installé. Si vous avez identifié le fichier malveillant téléchargé, vous pouvez utiliser les horodatages du fichier. Cette tâche est plus difficile qu'on peut l'imaginer au début, car les horodatages des systèmes de fichiers sont compliqués. La solution rapide consiste à commencer par la date de création du fichier du premier fichier qui a été téléchargé. Notez que les fichiers extraits des archives peuvent avoir des dates de création différentes. Il est important de commencer par le fichier téléchargé.

#### Windows, macOS, Linux

Pour obtenir plus d'informations sur les horodatages du système de fichiers de l'ordinateur, consultez [ce livre blanc de SANS sur Windows](https://www.sans.org/white-papers/36842/), [cette description des horodatages presque infinis sur MacOS](https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/), [cette description des horodatages Linux](https://linuxhandbook.com/file-timestamps/) et [une façon de visualiser la date de création des fichiers sur les systèmes ext4](https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/).

#### iOS, Android

Pour les appareils mobiles, MVT fournit des informations d'horodatage. Pour iOS, cela est [décrit dans la documentation](https://docs.mvt.re/en/latest/ios/records/). Pour Android, moins d'informations sont extraites et vous devrez peut-être effectuer des vérifications sur l'appareil.

L'application [Google Files](https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_US&gl=US) affiche l'heure modifiée d'un fichier dans le menu à trois points pour chaque fichier.

Notez que les logiciels malveillants mobiles laissent généralement beaucoup moins de traces évidentes et facilement accessibles sur le système de fichiers. Les moyens les plus courants pour infecter les appareils mobiles consistent à utiliser de fausses applications chargées en parallèle, des applications malveillantes dans les magasins d'applications d'Apple ou de Google, ou via des exploitations de failles de navigateur sophistiquées qui permettent d'obtenir un accès approfondi à l'appareil avant de télécharger des fichiers. Dans les derniers cas, les fichiers malveillants peuvent ne pas apparaître dans les répertoires de téléchargement courants.

### Messages et téléchargements suspects

Que vous trouviez ou non un fichier malveillant, l'étape suivante consiste à découvrir d'où il provient. Il y a plusieurs informations que vous pouvez collecter et rechercher.

Sur certains systèmes d'exploitation, les téléchargements sont associés à leur source. Cela signifie que les fichiers peuvent contenir des métadonnées qui indiquent depuis quel serveur ils ont été téléchargés. [Ce guide](https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/#:~:text=To%20Find%20Origin%20URL%20For%20File%20Downloaded%20with,the%20following%20command%3A%20Get-Content%20%22file%20name%22%20-Stream%20Zone.Identifier.) montre comment vérifier ces informations sur Windows et Linux, tandis que [celui-ci](https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/) propose la même chose pour macOS. Ces métadonnées vous indiqueront le serveur à partir duquel le fichier a été téléchargé, mais pas ce qui a causé le téléchargement.<sup><sup>[\[7\]](#footnote-7)</sup></sup> Notez également que le lien sur lequel la personne ciblée a cliqué peut ne pas contenir l'URL de téléchargement en raison de redirections.

Ensuite, recherchez les e-mails, les messages, etc. qui peuvent avoir déclenché le téléchargement. Vous pouvez utiliser les informations d'horodatage et d'URL que vous avez identifiées précédemment pour vous aider.

## Contrôle de compétence

Pour au moins cinq fichiers dans votre dossier de téléchargements :

- Écrivez tous les horodatages qu'ils contiennent et ce qu'ils pourraient indiquer
- S'ils sont disponibles, trouvez les attributs étendus ou les métadonnées qui décrivent l'URL ou le service à partir duquel les fichiers ont été téléchargés (dans notre test, tous les fichiers ne contenaient pas des informations sur les URL dans leurs métadonnées, ne vous inquiétez donc pas si vous ne pouvez pas les trouver)

Demandez à un pair ou à un mentor de vérifier votre travail et de vérifier que vous avez bien lu toutes les métadonnées.

Sur Android, installez une application (non malveillante) et utilisez le gestionnaire de fichiers pour trouver les propriétés de l'application et voir ce que vous pouvez apprendre sur l'application. Si vous avez accès à un téléphone Android de test, téléchargez une application en dehors de Google Play et faites de même. Demandez à un pair ou à un mentor de vérifier votre travail et de vérifier que vous avez correctement lu toutes les propriétés de l'application.


## Ressources d'apprentissage

{{% resource title="Horodatages des systèmes de fichiers : comment fonctionnent-ils ?" description="Un aperçu sur les horodatages, la mesure dans laquelle ils sont portables et comment ils fonctionnent à un niveau un peu technique. Principalement axé sur Windows" languages="Anglais" cost="Gratuit" url="https://www.sans.org/white-papers/36842/" %}}
{{% resource title="Horodatage macOS à partir d'attributs étendus et de Spotlight" description="Un guide sur l'utilisation des métadonnées de fichiers avancées dans macOS afin de trouver différents horodatages de fichiers, et sur la signification des horodatages" languages="Anglais" cost="Gratuit" url="https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/" %}}
{{% resource title="Explication des horodatages des fichiers sous Linux : atime, mtime, ctime" description="Linux comprend différents types d'horodatages. Cet article explique comment les interpréter." languages="Anglais" cost="Gratuit" url="https://linuxhandbook.com/file-timestamps/" %}}
{{% resource title="Date de création des fichiers sur ext4 Linux" description="Le système de fichiers le plus moderne utilisé par Linux s'appelle ext4. Cet article examine la façon dont le système ext4 gère les horodatages et comment trouver des informations détaillées sur la création des fichiers." languages="Anglais" cost="Gratuit" url="https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/" %}}
{{% resource title="Enregistrements extraits par mvt-ios" description="Examine quels fichiers MVT génère lors de l'analyse des dumps iOS et comment les lire" languages="Anglais" cost="Gratuit" url="https://docs.mvt.re/en/latest/ios/records/" %}}
{{% resource title="Files by Google" description="Une application Android qui donne accès aux métadonnées de fichiers avancées" languages="Multiple" cost="Gratuit" url="https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=fr" %}}
{{% resource title="Mark of the Web du point de vue d'une Red Team" description="Introduction de Mark of the Web, un indicateur présent dans Windows qui suggère qu'un fichier a été téléchargé à partir d'Internet et nécessite des précautions de sécurité spéciales lors de son ouverture" languages="Anglais" cost="Gratuit" url="https://outflank.nl/blog/2020/03/30/mark-of-the-web-from-a-red-teams-perspective/" %}}
{{% resource title="Beward : les navigateurs basés sur Chromium enregistrent l'URL d'origine du téléchargement pour les fichiers" description="Examine comment les systèmes Windows et Linux enregistrent parfois les métadonnées des fichiers téléchargés" languages="Anglais" cost="Gratuit" url="https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/" %}}
{{% resource title="Découvrir dans quel emplacement un fichier a été téléchargé sur Mac OS X" description="Les fichiers macOS qui ont été téléchargés à partir d'une URL ont généralement l'URL de téléchargement intégrée dans leurs métadonnées. Cet article montre comment extraire ladite URL" languages="Anglais" cost="Gratuit" url="https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/" %}}

## Notes

[^1]:Sur Windows, vous verrez également un numéro correspondant à un ID de zone. Les zones associées aux fichiers téléchargés sont les suivantes :

ZoneId=1 : intranet local
ZoneId=2 : sites de confiance
ZoneId=3 : Internet
ZoneId=4 : sites restreints
