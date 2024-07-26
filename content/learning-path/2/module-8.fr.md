+++
style = "module"
weight = 8
title = "Détection et détermination sur la base d'un échantillon"
+++

## Cas d'utilisation

Vous avez l'échantillon d'un fichier et vous devez déterminer s'il est malveillant. Il peut avoir été envoyé à la cible par e-mail, via les réseaux sociaux ou une messagerie instantanée, ou transféré à partir d'un support amovible ou autre. Le fichier lui-même peut être un binaire, une archive compressée, une page Web capturée ou d'autres formats de fichiers. L'objectif principal est de déterminer si le fichier est malveillant. En outre, vous êtes peut-être en mesure de déterminer des informations de caractérisation supplémentaires utiles sur le fichier, mais pour en savoir plus, consultez le [parcours d'apprentissage consacré à l'analyse des logiciels malveillants](fr/learning-path/3/).

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Enquêter sur les fichiers suspects à l'aide de plateformes de logiciels malveillants
- Utiliser des bacs à sable pour contribuer à déterminer si un échantillon est malveillant et ce qu'il fait

---
## Section Principale

Si vous avez besoin d'une évaluation plus approfondie de quelques fichiers spécifiques, il existe des services en ligne qui permettant d'analyser un fichier ou un ensemble de fichiers spécifiques à la recherche de logiciels malveillants. Si vous avez un fichier que vous soupçonnez d'être malveillant, vous pouvez l'importer dans le service d'analyse. Notez que ces services n'assurent pas la confidentialité du contenu des fichiers que vous y importez. Vous ne devez pas envoyer de fichiers contenant des informations sensibles. Ces fichiers peuvent provenir de pièces jointes à des e-mails ou être des fichiers récemment téléchargés sur l'appareil de la victime. Notez que dans de nombreux cas, le téléchargement initial peut être un injecteur (un fichier exécutable qui installe le logiciel malveillant réel, souvent plus facile à personnaliser que le « véritable » logiciel malveillant) et peut ne pas être reconnu par les logiciels anti-malware. Si possible, analysez les dates de création/modification/téléchargement des fichiers pour identifier les fichiers qui ont pu être téléchargés par l'injecteur initial.

Si vous préférez ne pas partager l'entièreté du fichier avec le service en ligne, mais que vous souhaitez tout de même vérifier s'il a déjà été envoyé, vous pouvez simplement téléverser un hachage du fichier. Un hachage est comme une courte empreinte digitale d'un fichier, il peut être utilisé pour identifier un fichier unique sans révéler son contenu. Pour en savoir plus sur les hachages, consultez la section « Hachages » du chapitre 7 du [Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/). L'activité du guide suppose que l'utilisateur apprend sur un système d'exploitation Linux, vous devrez donc rechercher l'utilitaire de ligne de commande à utiliser pour obtenir une somme SHA sur la plateforme choisie, par exemple en utilisant _shasum_ ou _openssl_ sur MacOS ou en utilisant Get-FileHash ou certutil dans PowerShell.

[VirusTotal](https://www.virustotal.com/) de Google est un service populaire de renseignements sur les logiciels malveillants. VirusTotal analysera un fichier avec un certain nombre de scanners anti-malware et vous fournira les résultats. Il peut également rechercher des hachages de fichiers ou des URL. L'utilisation de VirusTotal est gratuite, sous réserve de contraintes de volume. Pour obtenir une description et une activité détaillées, veuillez parcourir la section « Utilisation de VirusTotal » du chapitre 7 du [Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) d'Internews.

‼️ Après avoir lu le chapitre ci-dessus, vous devriez être en mesure de faire ce qui suit :

- Comprendre en quoi consiste le téléversement d'un échantillon sur VirusTotal (partage de votre échantillon avec les clients payants de VirusTotal), et être en mesure de décider s'il est approprié de le faire
- Soumettre un fichier ou vérifier un enregistrement par hachage et lire les onglets Détections, Détails, Relations, Comportement et Communauté sur VirusTotal

### Bacs à sable

Les bacs à sable fournissent un environnement virtuel simulant un ordinateur ordinaire qui consigne en mémoire et sur disque des journaux détaillés concernant les activités qui se produisent. Cela procure généralement un moyen sûr et automatisé de démarrer l'analyse des logiciels malveillants et de comprendre les actions et les intentions des fichiers.

Il existe plusieurs services de bacs à sable commerciaux disponibles gratuitement, notamment [Hybrid Analysis](https://www.hybrid-analysis.com/), [Any.Run](https://any.run/), [Joe Sandbox](https://www.joesandbox.com/) et [Triage](https://tria.ge/). Ces services exécutent les fichiers que vous envoyez et effectuent une analyse dynamique. Cela offre le grand avantage d'être en mesure de détecter heuristiquement de nouveaux logiciels malveillants, et également d'être en mesure d'évaluer les différentes étapes des logiciels malveillants. Notez que les échantillons soumis seront recueillis et mis à la disposition des clients payants et des analystes.

Cuckoo Sandbox est un outil gratuit et open source d'analyse de malware en bac à sable que vous pouvez autohéberger. CERT-EE en Estonie propose une version gratuite hébergée en ligne : [Cuckoo V2](https://cuckoo.cert.ee/), [Cuckoo V3 (Bêta)](https://cuckoo-hatch.cert.ee/).

Pour en savoir plus sur l'utilisation des bacs à sable pour la détection d'échantillons, parcourez la section « Bacs à sable » du chapitre 10 du [Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) d'Internews, qui utilise le bac à sable Triage à titre d'exemple.

Après avoir terminé l'activité, vous devriez être en mesure de :

- Soumettre un fichier dans un bac à sable
- Sélectionner ou configurer un environnement d'exploitation approprié pour le bac à sable
- Décider si le réseau doit être désactivé ou émulé
- Lire l'aperçu des résultats, y compris les détections automatisées
- Avoir une compréhension générale des autres catégories d'information présentées dans l'analyse du bac à sable. Pour les besoins de la détection, une compréhension détaillée n'est pas nécessaire, mais pour l'analyse des logiciels malveillants ou la détection des menaces, vous devrez en avoir une compréhension approfondie.

Vous pouvez obtenir plus de détails sur les bacs à sable dans le parcours d'apprentissage sur l'analyse des logiciels malveillants d'Infuse.

Notez que certains logiciels malveillants avancés peuvent lancer des vérifications pour découvrir s'ils se trouvent dans un environnement virtualisé ou bac à sable, afin de se comporter différemment en fonction de l'environnement en question. Aucun environnement de bac à sable n'est donc fiable à 100 %.

Pour en savoir plus sur les types de techniques utilisées par Hybrid Analysis, vous pouvez apprendre à effectuer votre propre analyse hybride (statique et dynamique) des logiciels malveillants dans le parcours d'apprentissage sur l'analyse des logiciels malveillants.

## Pratique

1. Cherchez ou créez un fichier texte brut sur votre système, puis calculez son hachage sha256. Ensuite, modifiez le fichier dans un éditeur de texte brut en y ajoutant un seul caractère. Calculez à nouveau son hachage sha256.
2. Prenez un fichier exécutable Windows obscur d'un endroit tel que download.cnet.com. Téléversez-le sur VirusTotal ou analysez-le avec Hybrid Analysis. Notez que les installateurs peuvent être incorrectement signalés comme étant malveillants en raison de la nature de leur fonctionnement. Réfléchissez aux raisons pour lesquelles cela pourrait se produire et, si possible, discutez-en avec un pair ou un mentor.
3. Cherchez le hachage d'un logiciel malveillant bien connu (vous pouvez le faire en parcourant un site qui contient des hachages de logiciels malveillants, pas besoin de télécharger l'échantillon et de le hacher vous-même) et téléversez-le sur VirusTotal. Expliquez ce que vous voyez et ce qui s'est passé.

## Contrôle de compétence

Par vous-même (ou avec un mentor)

1. Parcourez les échantillons de logiciels malveillants récemment soumis sur Malware Bazaar. Copiez les hachages de 3 à 5 échantillons que vous avez détectés et collez-les dans la recherche de VirusTotal. Quels sont les résultats ? Chacun de ces hachages doit être détecté comme étant malveillant par au moins deux moteurs de détection de logiciels malveillants VirusTotal. Si aucun des hachages n'est détecté comme étant malveillant ou reconnu par VirusTotal, il est probable que vous avez commis une erreur quelque part et il peut être judicieux de prendre le temps de revenir sur vos pas !

Avec un pair ou un mentor

1. Demandez à un pair ou à un mentor de sélectionner environ 10 fichiers aléatoires, qui pourraient, par exemple, être des images. Il prendra alors le hachage sha256 de 3 fichiers sélectionnés au hasard et vous enverra à la fois les fichiers et les hachages. Déterminez parmi ces 10 fichiers ceux qui correspondent aux hachages et demandez au pair ou au mentor de vérifier votre travail.

## Ressources d'apprentissage

{{% resource title="Vérifier la somme de contrôle SHA256" description="Un guide rapide sur la façon d'utiliser la ligne de commande afin de vérifier les sommes de contrôle sha256 des fichiers" languages="Anglais" cost="Gratuit" url="https://techdocs.akamai.com/download-ctr/docs/verify-checksum" %}}
{{% resource title="VirusTotal" description="Un service Web permettant aux utilisateurs de téléverser des fichiers ou des hachages pour les vérifier face aux logiciels malveillants connus d'un large éventail de moteurs de détection de logiciels malveillants. Propriété d'Alphabet/Google" languages="Anglais" cost="Gratuit, avec limites de volume" url="https://www.virustotal.com/gui/home/upload" %}}
{{% resource title="Hybrid Analysis" description="Un service similaire à celui de VirusTotal, mais qui peut également effectuer une analyse dynamique (exécution du fichier et observation de ce qui se passe)" languages="Anglais" cost="Gratuit, avec des fonctionnalités Premium" url="https://www.hybrid-analysis.com/" %}}
{{% resource title="Any.run" description="Un bac à sable commercial" languages="Gratuit uniquement pour un usage non commercial" cost="Anglais" url="https://any.run/" %}}
{{% resource title="Joe Sandbox" description="Un bac à sable commercial" languages="Gratuit pour les comptes publics (les résultats de l'analyse seront publiés sur le site Web)" cost="Anglais" url="https://www.joesandbox.com/#windows" %}}
{{% resource title="Cuckoo Sandbox" description="Un service de bac à sable géré par le CERT (Computer Emergency Response Team) estonien" languages="Gratuit" cost="Anglais" url="https://cuckoo.cert.ee/" %}}
{{% resource title="Windows Sandbox" description="Un puissant outil de bac à sable intégré à Windows" languages="Nécessite la version Pro, Education ou Enterprise de Windows" cost="Nombreuses langues" url="https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview" %}}