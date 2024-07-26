+++
style = "module"
weight = 1
title = "Configuration d'un environnement d'analyse des logiciels malveillants"
description = "Avant d'analyser tout malware, vous devez configurer un environnement sûr pour le faire. Étant donné que les malwares peuvent nuire aux systèmes sur lesquels ils s'exécutent, vous ne voulez pas les exécuter sur votre système principal."
+++

## Cas d'utilisation

Avant de commencer à analyser un logiciel malveillant, vous devez configurer un environnement sûr pour le faire. En définitive, les logiciels malveillants font de mauvaises choses aux systèmes sur lesquels ils fonctionnent. Vous ne voulez pas l'exécuter sur votre système principal. De plus, vous voudrez probablement empêcher le logiciel malveillant de se connecter aux serveurs C&C (commande et contrôle) de l'auteur de la menace. Les deux conditions signifient que vous devez configurer une machine virtuelle à utiliser lors de l'analyse des logiciels malveillants.

## Objectifs

Après avoir terminé ce sous-thème, le participant devrait être en mesure de configurer une machine virtuelle (MV) et de prendre des instantanés.

---
## Section Principale

La configuration exacte dont vous avez besoin dépend de votre méthode d'analyse et du système d'exploitation du logiciel malveillant que vous analysez. Dans la plupart des cas, vous pouvez commencer avec une machine virtuelle Linux préconstruite comme [REMnux](https://remnux.org/). Consultez le [Chapitre 6 du Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) pour obtenir des instructions étape par étape sur la façon de la configurer. Pour des choses plus spécifiques (par exemple, l'analyse dynamique des logiciels malveillants iOS), vous aurez besoin d'outils supplémentaires (par exemple, un iPhone ou un iPad débridé). Les machines virtuelles présentent parfois des vulnérabilités qui permettent aux logiciels exécutés dans la machine virtuelle d'attaquer le système d'exploitation hôte. La plupart des logiciels malveillants ne sont pas sophistiqués à ce point, mais en cas de doute, il est plus sûr d'analyser les logiciels malveillants sur un appareil physique distinct qui est effacé par la suite.

Pour configurer REMnux, nous vous recommandons de suivre les étapes décrites dans le [Chapitre 6 du Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) et de [télécharger la MV](https://docs.remnux.org/install-distro/get-virtual-appliance)[^1]. C'est un moyen facile de commencer qui fournit une excellente isolation entre votre système hôte et l'environnement REMnux. Veillez à ne pas partager de données sensibles de votre système d'exploitation hôte dans la machine virtuelle. Conformément aux instructions ci-dessus, prenez un instantané de votre machine virtuelle une fois qu'elle a été configurée et avant de commencer à travailler sur un logiciel malveillant. Vous pouvez utiliser des instantanés pour rétablir l'état de votre machine virtuelle avant d'analyser différents logiciels malveillants et pour isoler différents clients les uns des autres. Pour obtenir plus d'informations sur les instantanés de MV en général, consultez [cet article](https://www.nakivo.com/blog/vm-snapshot-vs-backup/).

Lors de l'analyse des logiciels malveillants, vous pourriez constater que vous avez besoin d'outils supplémentaires dans votre machine virtuelle d'analyse. Installez-les et configurez-les, mais notez ce que vous faites. Une fois votre analyse terminée, vous pouvez charger votre instantané de machine virtuelle « propre », installer et configurer l'outil, puis créer un nouvel instantané « propre » pour votre prochaine analyse de logiciels malveillants.

Afin de déplacer les fichiers malveillants, la pratique standard consiste à les placer dans des fichiers ZIP chiffrés. Dans ce cas, la qualité du chiffrement n'a pas d'importance. Le but n'est pas de garder le logiciel malveillant secret, mais plutôt de l'empêcher de le déclencher par inadvertance sur d'autres systèmes et d'empêcher les systèmes anti-malware de le détecter ou de le supprimer. N'hésitez pas à inclure le mot de passe dans le nom du fichier ZIP.

## Exercice pratique

1. Téléchargez (si vous ne l'avez pas déjà fait) un logiciel de machine virtuelle (nous recommandons VirtualBox) et installez REMnux.
2. Mettez à jour REMnux et prenez un instantané de la MV.
3. Configurez un seul dossier partagé entre votre hôte et la MV REMnux.
4. Téléchargez un morceau de logiciel Windows aléatoire (probablement non malveillant) à partir de download.cnet.com, et transférez-le vers la MV REMnux à l'aide d'un fichier ZIP chiffré. (Si vous avez récemment terminé le parcours d'apprentissage Détection des logiciels malveillants, vous pouvez réutiliser le même téléchargement).
5. Prenez quelques logiciels malveillants de MalwareBazaar (**AVERTISSEMENT : il s'agit de logiciels malveillants réels ! Ne les exécutez pas.**) et transférez-les sur la MV REMnux. (Si vous avez récemment terminé le chemin d'apprentissage Détection des logiciels malveillants, vous pouvez réutiliser le même téléchargement).

## Contrôle de compétence

Accédez au dossier que votre machine virtuelle utilise pour partager des fichiers entre l'hôte et les systèmes d'exploitation invités. Ajoutez-y un fichier, puis [calculez un hachage cryptographique](https://www.sentinelone.com/cybersecurity-101/hashing/) de ce fichier dans les deux systèmes d'exploitation. Assurez-vous que les hachages correspondent.

## Ressources d'apprentissage

{{% resource title="Guide d'intervention sur le terrain pour la société civile et les médias" description="Un guide sur la façon d'analyser le contenu potentiellement malveillant, de configurer des machines virtuelles, et plus" languages="Anglais" cost="Gratuit" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}
{{% resource title="REMnux" description="La page Web de la distribution REMnux Linux, qui est souvent utilisée pour l'analyse des logiciels malveillants" languages="Le site Web et la documentation pour la distribution sont en anglais. Divers outils dans la distribution elle-même peuvent être localisés dans d'autres langues." cost="Gratuit" url="https://remnux.org/" %}}
{{% resource title="Obtenir la machine virtuelle" description="Guide sur l'installation et l'exécution de REMnux en tant que machine virtuelle" languages="Anglais" cost="Gratuit" url="https://docs.remnux.org/install-distro/get-virtual-appliance" %}}
{{% resource title="La différence entre les instantanés et les copies de sauvegarde" description="Un article qui souligne comment une machine virtuelle peut contenir à la fois des instantanés et des sauvegardes, et la différence entre ces concepts. La compréhension des deux concepts facilitera grandement la gestion et la réinitialisation des machines virtuelles utilisées pour l'analyse des logiciels malveillants." languages="Anglais" cost="Gratuit" url="https://www.nakivo.com/blog/vm-snapshot-vs-backup/" %}}

## Notes

[^1]: REMnux n'est pas disponible sur les processeurs ARM, tels que les ordinateurs Apple Silicon. Bien qu'il soit possible de virtualiser entre les architectures CPU en utilisant des émulateurs tels que QEMU ou UTM (VirtualBox ne prend actuellement pas en charge les architectures ARM), les performances seront lentes et cela n'est pas conseillé. Il serait plus judicieux de choisir une autre distribution Linux qui prend en charge votre matériel et d'installer les paquets logiciels nécessaires pour réaliser les activités, s'ils ne sont pas déjà inclus dans le système d'exploitation. Kali Linux est une distribution Linux populaire qui inclut ou prend en charge de nombreux outils également présents dans REMnux. Si vous avez un appareil Apple Silicon, vous pouvez utiliser [UTM](https://mac.getutm.app/) pour exécuter l'image d'installation Kali pour Apple Silicon (ARM64). Des guides de prise en main sont disponibles à la fois sur les sites de UTM et de Kali. Au moment de la rédaction, un bug affectant le processus d'installation nécessite une étape supplémentaire lors de l'installation consistant à attacher un écran de terminal série virtuel - les deux guides décrivent ce processus. Vous pouvez également obtenir une version ARM de Kali pour le Raspberry Pi, avec la plupart des modèles de Raspberry Pi pris en charge.
