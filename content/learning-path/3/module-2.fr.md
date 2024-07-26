+++
style = "module"
weight = 2
title = "Analyse de base des fichiers"
description = "Lors de l'évaluation des fichiers malveillants, nous devons effectuer une analyse plus approfondie des types de fichiers et de leur contenu. Au-delà des extensions de fichiers de base, nous examinerons les en-têtes et les signatures de fichiers, ainsi que le contenu des chaînes de caractères."
+++

## Cas d'utilisation

Une fois que vous avez un logiciel malveillant sur votre machine virtuelle d'analyse, l'étape suivante consiste à déterminer ce qu'il contient. Un logiciel malveillant peut utiliser plusieurs fichiers. Dans ce cas, vous utiliserez les techniques de cette section pour chaque fichier. Il y a plusieurs façons de vous faire une idée du type de fichier que vous traitez. Notez que certains logiciels malveillants sont délicats à ce sujet et cachent le contenu malveillant dans des fichiers inoffensifs ou créent des fichiers qui ont plusieurs types valides à la fois (un exemple classique étant le GIFAR, qui est un fichier qui est à la fois une image valide et aussi une applet Java valide). Pour cette raison, nous devons effectuer une analyse plus approfondie des types de fichiers et du contenu lors de l'évaluation des fichiers malveillants. Au-delà des extensions de fichiers de base, nous examinerons les en-têtes et les signatures de fichiers, ainsi que le contenu des chaînes.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre les extensions de fichiers, les en-têtes et les métadonnées
- Utiliser des outils standard qui détectent les types de fichiers

---
## Section Principale

### Extension de fichier

Pour de nombreux systèmes d'exploitation, les extensions de fichiers sont très importantes pour la façon dont le système doit traiter le fichier. Les noms de fichiers (et donc les extensions) ne font pas réellement partie du fichier, mais font partie des métadonnées du fichier dans le système de fichiers. À ce titre, ils peuvent facilement être modifiés et ne révèlent rien de critique sur le contenu du fichier. Cela dit, il s'agit d'une première étape valable dans le processus d'analyse. Il y a un ensemble pratiquement illimité d'extensions de fichiers (ce ne sont que des lettres ajoutées à la fin d'un nom de fichier), et il n'y a aucun registre imposé. Il n'existe aucune liste exhaustive des extensions et de nombreuses extensions ont plusieurs significations possibles. Cela dit, voici quelques listes :

- [Extensions de fichiers courantes de Microsoft](https://support.microsoft.com/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01) (plusieurs langues, gratuit)
- [Grande liste d'extensions de fichiers de Wikipédia](https://en.wikipedia.org/wiki/List_of_filename_extensions) (anglais, japonais et coréen, gratuit)
- [Grande liste d'extensions de fichiers du fabricant de TrID](https://mark0.net/soft-trid-deflist.html), un programme d'identification de fichiers (anglais, gratuit)

### En-têtes

De nombreux formats de fichiers ont des structures de données distinctes qui sont exclusives à leur format de fichier. Habituellement, elles se trouvent au début du fichier, mais elles peuvent parfois apparaître à d'autres endroits. Par exemple, les fichiers GIF commencent par la chaîne « GIF89a » (ou, moins souvent, « GIF87a »), tandis que les exécutables Windows (format PE) commencent par « MZ ». Ces en-têtes sont critiques, car la plupart des logiciels (sinon tous) qui utilisent un fichier ne procéderont pas à son traitement sans les signatures correctes. Par exemple, si vous essayez d'exécuter un fichier qui se termine par « .exe » dans Windows, mais que le fichier ne contient pas un en-tête de fichier PE approprié, Windows n'exécutera pas le fichier.

### Au-delà des en-têtes standard

Dans de nombreux cas, il est possible d'en savoir plus sur un format de fichier en regardant le contenu du fichier supplémentaire. Par exemple, les archives ZIP ordinaires et les fichiers d'archives Java (JAR) sont au format ZIP. Si vous renommez un fichier .jar en .zip, les outils ZIP standard pourront très bien l'extraire. Cependant, tous les fichiers JAR contiennent des chaînes (telles que « MANIFEST.MF ») que tous les fichiers ZIP ne contiennent pas.

Dans certains cas, les fichiers n'auront même pas le même format de base, mais il sera difficile de les distinguer. Par exemple, les binaires de bytecode Java et Mach-O commencent avec la séquence d'octets 0xCAFEBABE. [Voici le code](https://github.com/file/file/blob/master/magic/Magdir/cafebabe) que la commande « file » utilise pour distinguer les deux : comme vous pouvez le voir, cela nécessite beaucoup d'heuristiques.

### Outils

Étant donné le nombre immense de types de fichiers, il est logique d'utiliser un outil avec une base de données de types de fichiers. La plus courante est la commande « file » sous linux. [Vu qu'il s'agit d'un outil source](https://github.com/file/file), vous pouvez voir comment il parvient à une décision particulière au sujet d'un fichier particulier. [TrID](https://mark0.net/soft-trid-e.html) est un outil similaire. Bien qu'il ne soit pas open source, il peut vous permettre d'obtenir de meilleurs résultats sur certains fichiers.

Un autre outil utile pour l'analyse des fichiers est la commande « strings ». Cet utilitaire Unix imprimera toutes les chaînes ASCII dans un fichier, ce qui peut être incroyablement utile pour repérer des modèles tels que les URL. Bien que cela ne soit pas très efficace sur les données chiffrées, compressées ou codées, l'outil peut tout de même s'avérer utile.

Enfin, les éditeurs hexadécimaux afficheront les fichiers binaires dans un format lisible par l'homme. Généralement, ils afficheront une représentation hexadécimale et ascii des données du fichier, ce qui peut être utile pour détecter les modèles. Il existe de nombreux éditeurs hexadécimaux, [Wikipédia propose une comparaison de certains d'entre eux](https://en.wikipedia.org/wiki/Comparison_of_hex_editors), et REMnux est livré avec un éditeur hexadécimal appelé [wxHexEditor](https://www.wxhexeditor.org/home.php).

Pour obtenir un guide plus avancé sur la façon de capturer et de faire une analyse préliminaire sur une application Android, nous vous recommandons de consulter [cet excellent guide](https://pts-project.org/guides/g3/) de la suite d'outils PiRogue.

### Rétro-ingénierie des formats de fichiers

Voici un [article rapide sur la rétro-ingénierie statique des formats de fichiers](https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats). Parcourez-le et assurez-vous que vous l'avez compris. Si possible, discutez de cet article avec un mentor ou quelqu'un d'autre ayant une connaissance approfondie de la rétro-ingénierie des formats de fichiers.

## Exercice pratique

Complétez les exercices d'[introduction aux logiciels malveillants](https://tryhackme.com/room/malmalintroductory) (gratuits) sur TryHackMe

## Contrôle de compétence

Ouvrez la MV REMNux que vous avez configurée dans les exercices pratiques du sous-thème précédent.

Effectuez les tâches suivantes :

1. Transférez un fichier non exécutable non malveillant directement à partir du système d'exploitation hôte.
2. En plus de cela, téléchargez un fichier malveillant de [Malware Bazaar](https://bazaar.abuse.ch/) ou un fichier exe (de préférence non malveillant) à partir d'un autre endroit. Identifiez le format du fichier non exécutable que vous avez téléchargé à l'étape précédente et le fichier exécutable actuel à l'aide de la commande file.
3. Ouvrez les deux fichiers sur lesquels vous venez d'exécuter la commande file dans un éditeur hexadécimal. Voyez-vous des différences majeures entre eux, en particulier dans la façon dont les fichiers commencent ?
4. Téléchargez un fichier .docx sur Internet (encore une fois, Malware Bazaar devrait être utile ici). Ouvrez-le dans un éditeur hexadécimal pour confirmer qu'il commence par « PK ». Ensuite, utilisez la commande unzip et confirmez qu'il s'agit bien d'un fichier zip.
5. Faites de même pour un fichier .apk (il s'agit d'un fichier de package Android).

Montrez le travail ci-dessus à un mentor ou un pair qui confirmera que vous avez correctement effectué les exercices.

## Ressources d'apprentissage

{{% resource title="Extensions de noms de fichiers courantes dans Windows" description="Un guide créé par Microsoft décrivant certaines des extensions de fichiers les plus couramment rencontrées dans le système d'exploitation Windows" languages="Anglais" cost="Gratuit" url="https://support.microsoft.com/fr-fr/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01" %}}
{{% resource title="Liste des extensions de noms de fichiers | Wikipédia" description="Une liste plus longue et plus complète des extensions de fichiers utilisées par divers logiciels" languages="Anglais, japonais, coréen" cost="Gratuit" url="https://en.wikipedia.org/wiki/List_of_filename_extensions" %}}
{{% resource title="TrID" description="Un programme Windows et Linux qui peut comprendre les types de fichiers différents en fonction de leurs signatures binaires" languages="Anglais" cost="Gratuit" url="https://mark0.net/soft-trid-e.html" %}}
{{% resource title="Extensions et définitions de types de fichiers" description="La liste des extensions de fichiers connues de TrID, qui compte désormais plus de 16 000 entrées" languages="Anglais" cost="Gratuit" url="https://mark0.net/soft-trid-deflist.html" %}}
{{% resource title="Fichier" description="Un programme de ligne de commande pour les systèmes de type Unix, qui permet d'identifier les fichiers par type" languages="Anglais" cost="Gratuit" url="https://github.com/file/file" %}}
{{% resource title="Comparaison des éditeurs hexadécimaux" description="Une liste et une comparaison des éditeurs hexadécimaux, ou des programmes qui vous permettent d'éditer directement des fichiers binaires" languages="Anglais, chinois simplifié, croate, espagnol" cost="Gratuit" url="https://en.wikipedia.org/wiki/Comparison_of_hex_editors" %}}
{{% resource title="wxHexEditor" description="La page Web officielle de l'éditeur hexadécimal fourni avec chaque installation REMnux" languages="Anglais" cost="Gratuit" url="https://www.wxhexeditor.org/home.php" %}}
{{% resource title="Wikilivres/Rétro-ingénierie des formats de fichiers" description="Un guide complet sur la rétro-ingénierie des formats de fichiers. Assurez-vous de bien le comprendre avant de passer aux autres sections de ce parcours d'apprentissage." languages="Anglais" cost="Gratuit" url="https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats" %}}
{{% resource title="Guide du débutant : comment gérer une application mobile potentiellement malveillante" description="Une introduction à la gestion d'une application Android suspecte et toutes les étapes initiales de collecte et d'analyse des données que nous pourrions prendre" languages="Anglais" cost="Gratuit" url="https://pts-project.org/guides/g3/" %}}
