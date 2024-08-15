+++
style = "introduction"
weight = 1
title = "Introduction"
description = "COMMENCEZ ICI. Lisez la présentation du parcours d'apprentissage, les objectifs, les menaces associées et les prérequis."
+++

## Présentation

Il existe de nombreuses façons pour les cybercriminels de tenter d'attaquer des sites Web, notamment :

- Déni d'expression : retrait du site Web, diffamation du site Web, déni de service
- Accès aux données sensibles : exploitation des contrôles d'accès ou d'autres vulnérabilités pour accéder aux informations, par exemple dans les bases de données d'applications, les fichiers ou systèmes privés, les boîtes de réception privées ou les zones réservées aux membres
- Implantation de logiciels malveillants (attaques de « point d'eau ») : utilisation de l'accès à un site Web pour placer du code malveillant ou trompeur dans le but d'atteindre des objectifs sur les appareils des visiteurs
- Déplacement latéral (compromettant d'autres systèmes) : accès à des serveurs entiers, à une infrastructure en cloud, ou à une infrastructure de bureau ou à domicile
- Surveillance des visiteurs : obtention d'informations sur les adresses IP ou l'identité des visiteurs d'un site Web ou des utilisateurs d'une application Web
- Compromission de la chaîne d'approvisionnement : compromission des services de distribution de logiciels, des processus de construction de logiciels ou des bibliothèques de composants de logiciels afin d'atteindre des objectifs malveillants affectant les utilisateurs du logiciel ciblé
- Usurpation d'identité de sites Web : à des fins d'hameçonnage, de ternissement de la réputation et de distribution de logiciels malveillants/espions
- Injection de trafic (attaques de déclassement) : exploitation des faiblesses de configuration de l'infrastructure ou des communications dans le but d'insérer du contenu malveillant dans un trafic autrement correct

La sécurité des applications Web est un domaine de connaissances techniques approfondies avec de nombreux domaines de spécialisation. Ce parcours d'apprentissage vous fournira une compréhension générale des vulnérabilités des applications Web et du fonctionnement de certaines des plus courantes. Il devrait vous aider à comprendre les types de vulnérabilités qui existent généralement dans les applications Web, les capacités que ces vulnérabilités donnent aux cybercriminels et comment, en général, éliminer ou atténuer ces vulnérabilités.

**Qu'est-ce qu'une application Web ?**

Les applications Web font référence à une catégorie plus large de logiciels qui exécutent des services dynamiques disponibles sur le Web. Une page Web est un type d'application Web, bien qu'une page HTML statique ne soit généralement pas considérée comme telle. Les applications Web impliquent généralement une sorte de traitement de données côté client et/ou côté serveur, de stockage, de récupération, avec un contenu dynamique. Elles s'appuient généralement sur l'infrastructure, comme les bases de données, les serveurs supplémentaires ou les services cloud (y compris le « code sans serveur »). Les plateformes CMS courantes telles que WordPress ou Drupal sont des applications Web. De nombreuses organisations déploient diverses applications pour servir des fonctionnalités internes ou externes telles qu'une base de données de membres, un outil de gestion des relations constitutives, un système d'information sur la santé, un système de billetterie, des outils opérationnels internes et bien d'autres. Certaines organisations développeront leurs propres applications Web personnalisées adaptées à leurs propres besoins. Les principales plateformes de services Internet comme MailChimp, Slack, Canva, X, etc., sont toutes des applications Web, et leur sécurité affecte également leurs utilisateurs. Cependant, ces grandes entités ont leurs propres équipes de sécurité et programmes de bug bounty qui mènent ou encouragent des examens professionnels de sécurité des applications Web pour eux. Les petites organisations pour lesquelles vous travaillez, en revanche, n'ont souvent pas les ressources nécessaires pour effectuer des examens de sécurité des applications Web et vous pourriez la première personne à le faire.

## Que sont les vulnérabilités ?

Il existe de nombreuses sortes de défauts qui peuvent apparaître dans tout système compliqué. En général, nous les considérons comme des bugs normaux, où le système permet à ses utilisateurs de faire moins de choses que prévu. Par exemple, « lorsque je clique sur "Ajouter au panier", le site Web renvoie simplement une page d'erreur. » Cependant, certains défauts permettent aux utilisateurs de faire plus que prévu. Lorsque ces failles impactent négativement le système ou les autres utilisateurs, nous considérons ces failles comme des vulnérabilités. Des exemples de vulnérabilités comprennent des failles qui permettraient à un utilisateur de lire ou de modifier les données d'autres utilisateurs, de prendre le contrôle de l'infrastructure sous-jacente du site Web, de refuser l'utilisation d'un système à d'autres utilisateurs, etc. Lorsque nous envisageons les vulnérabilités, il est utile de les regrouper par type. Ce parcours d'apprentissage fournit un aperçu des classes de vulnérabilités d'applications Web courantes et de la façon dont un cybercriminel peut les utiliser pour nuire à un site Web ou à ses utilisateurs.

## Objectif

Les participants apprendront les concepts fondamentaux de la sécurité des applications Web, fournissant l'arrière-plan nécessaire pour poursuivre d'autres sujets dans la sécurité des applications Web. Les participants seront en mesure de comprendre les concepts clés de la sécurité des applications Web, notamment :

- Vulnérabilités de l'infrastructure
- Validation des données
- Authentification
- Autorisation
- Vulnérabilités de la logique opérationnelle

## Quelles menaces cette compétence permet-elle d'atténuer ou de gérer ?

- Compromission de l'application Web
- Prise de contrôle d'un compte d'application Web
- Déni de service d'une application Web
- Attaques de « point d'eau »

## Quels sont les prérequis ?

- Une connaissance de base du HTML, comme la mise en page de base d'un document HTML et la capacité de lire du HTML simple. Pour obtenir une excellente introduction, consultez [MDN](https://developer.mozilla.org/en-US/docs/Learn).
- Concepts de base du langage de programmation et la capacité de lire du JavaScript simple. Nous recommandons l'[introduction de MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) à ce sujet.
- Compréhension de base du fonctionnement de HTTP, de la façon dont un navigateur communique avec un site Web et à quoi ressemblent les requêtes et les réponses HTTP. Pour une introduction de ces sujets, nous recommandons [cet article](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) et [celui-ci](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data).
- Une compréhension de base de SQL, juste assez pour savoir de quoi il s'agit et la façon de formuler une commande simple. Pour obtenir une introduction, consultez [sqlzoo](https://sqlzoo.net/wiki/SQL_Tutorial).
- Connaissances de base du fonctionnement de la ligne de commande sur un système d'exploitation de votre choix et de la façon d'y exécuter des commandes. Pour obtenir une bonne introduction, consultez [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line).
- Il y a un exercice de vérification des compétences dans le sous-thème sur l'autorisation qui nécessite des connaissances de base du langage de programmation Python (bien que ce soit un code très simple qui devrait être lisible par ceux qui maîtrisent d'autres langages). Si vous n'avez pas de connaissances concernant les langages de programmation, vous pouvez ignorer cet exercice.

De quels appareils ou logiciels avez-vous besoin pour réaliser les exercices ?

Pour compléter ce parcours d'apprentissage, nous utiliserons un site Web appelé DVWA (Damn Vulnerable Web App). DVWA est une application Web qui est intentionnellement vulnérable à diverses vulnérabilités. Elle nécessite une configuration minimale à utiliser et elle est disponible en ligne pour fournir une expérience sans aucune configuration.

Il existe plusieurs façons d'exécuter DVWA. Les meilleures instructions d'installation actuelles peuvent être trouvées sur le [référentiel DVWA de GitHub](https://github.com/digininja/DVWA). Comme cela est souligné dans la section _Avertissement_ de cette page, DVWA ne doit pas être installée d'une manière qui l'expose à Internet. Les options pour l'exécuter comprennent :

- L'approche la plus simple (si vous préférez ne pas ou ne pouvez pas installer DVWA localement) est d'y accéder dans l'instance hébergée en ligne sur [TryHackMe](https://tryhackme.com/room/dvwa). Si vous vous inscrivez pour créer un compte gratuit, démarrez une machine DVWA sur le lien, puis démarrez une Attack Box, vous pouvez effectuer tous les exercices directement à partir de votre navigateur.
- Utiliser un serveur Web hébergé localement sur votre propre machine ou dans une machine virtuelle. DVWA utilise une PHP/MySQL (ou MariaDB) de sorte que l'application peut fonctionner sur n'importe quel appareil comprenant ces services Web. Pour ce faire, vous pouvez :
  - Utiliser une machine virtuelle pour créer un système d'exploitation Linux à partir duquel soit (A) installer une pile de serveur Web local et configurer DVWA comme vous le feriez pour toute application PHP/MySQL en suivant les instructions fournies dans [cette vidéo](https://youtu.be/Yzksa_WjnY0), (B) utiliser le [script d'installation Linux](https://github.com/digininja/DVWA?tab=readme-ov-file#automated-installation-%EF%B8%8F) fourni dans le fichier readme du dépôt, ou C) si vous utilisez Kali Linux, installer DVWA à partir du dépôt source de Kali en utilisant _sudo apt-get install dvwa_.
    - La virtualisation sur les périphériques x86 peut être effectuée avec un hyperviseur tel que Virtualbox
    - Les appareils MacOS Apple Silicon (M1/M2/M3) peuvent exécuter des machines virtuelles en utilisant [UTM](https://mac.getutm.app/) ou VMWare Fusion Player (avec la [licence d'utilisation personnelle gratuite](https://www.vmware.com/products/fusion/fusion-evaluation.html)) et la version Apple Silicon Installer du système d'exploitation souhaité (par exemple [Kali Linux](https://www.kali.org/get-kali/#kali-installer-images)). Suivre les [étapes de dépannage](https://docs.getutm.app/guides/kali/) du guide UTM si vous rencontrez un problème d'écran noir.
    - Pour obtenir un guide sur la façon de configurer des machines virtuelles, suivez le chapitre 6 du [Guide d'intervention sur le terrain pour la société civile et les médias](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf), mais téléchargez un Kali Linux au lieu d'un REMNux (ou utilisez d'autres tutoriels écrits pour votre plateforme)
  - Transformer votre ordinateur en serveur Web en utilisant [XAMPP](https://www.apachefriends.org/) (Windows ou Linux) ou [MAMP](https://www.mamp.info/en/windows/) (macOS y compris Apple Silicon) et en suivant les instructions de configuration présentées dans [cette vidéo](https://youtu.be/Yzksa_WjnY0).
- Si vous connaissez Docker ou d'autres technologies de conteneurisation, suivez les [instructions Docker](https://github.com/digininja/DVWA) dans le référentiel DVWA

Avant de commencer l'un des exercices, n'oubliez pas de vous connecter à DVWA (les identifiants par défaut sont admin/mot de passe) et assurez-vous que le niveau de sécurité est défini sur « Faible ».

![alt_text](/media/uploads/dvwa-setting11.png "DVWA with Low security level configuration")


Un exercice pratique vous oblige à installer et à utiliser un outil appelé rainbowcrack. En raison de sa configuration requise élevée et du fait que l'outil ne fonctionne que sur Linux et Windows, nous avons choisi de rendre cet exercice facultatif. Puisque l'objectif principal de cet exercice est d'illustrer un concept de sécurité, les apprenants qui ne peuvent pas ou ne veulent pas le compléter seront toujours en mesure de terminer l'ensemble du parcours d'apprentissage.

Un exercice en option nécessite une connaissance pratique de base de Python et une installation de Python. Cet exercice peut être ignoré par les apprenants qui ne sont pas familiers avec Python ou qui ne l'ont pas installé sur leurs systèmes.

## Parcours d'apprentissage connexes

Ce parcours d'apprentissage fournit un guide interne cohérent et autonome sur la sécurité des applications Web. Il est destiné à être lu en quelques courtes séances et à vous fournir le contexte nécessaire pour poursuivre un apprentissage approfondi de la sécurité des applications Web. Les parcours d'apprentissage de suivi suggérés comprennent :

- Parcours d'apprentissage sur **l'évaluation de la sécurité des applications Web** : ce parcours d'apprentissage vous enseignera les connaissances détaillées et les compétences pratiques nécessaires pour tester un site Web à la recherche de vulnérabilités. C'est le moyen le plus efficace d'identifier les faiblesses d'une application Web avant que les cybercriminels ne le fassent. Ce parcours d'apprentissage sur les principes fondamentaux de la sécurité des applications Web vous préparera à vous engager efficacement avec les connaissances spécialisées requises.
- Parcours d'apprentissage **Renforcement des applications Web, investigation et intervention en cas d'incident** : ce parcours d'apprentissage vous prépare à répondre aux attaques contre les applications Web. Afin de vous préparer et de répondre aux attaques, vous avez besoin d'une connaissance pratique de la nature possible de ces attaques. Ce parcours d'apprentissage sur les principes fondamentaux de la sécurité des applications Web devrait vous donner juste assez d'informations pour comprendre les informations dont vous aurez besoin pour détecter les attaques contre les sites Web, et savoir reconnaître et répondre aux attaques en cours.
