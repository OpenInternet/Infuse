+++
style = "module"
weight = 8
title = "Étapes suivantes"
description = "Comment continuer à pratiquer et à perfectionner vos compétences en évaluation de la sécurité des applications web"
+++



## Sous-thème 7 : Détection automatique des vulnérabilités





## Sous-thème 8 : Étapes suivantes

## Cas d'utilisation

À ce stade, vous devriez être en mesure d'effectuer des évaluations de sécurité de qualité professionnelle des sites Web. Cependant, vous avez encore beaucoup à apprendre en termes de gestion et d'amélioration du travail de test, et aussi en termes de techniques de test plus obscures et avancées. Ce sous-thème couvre certains parcours que vous pouvez emprunter pour continuer à pratiquer et à développer vos compétences.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient savoir comment poursuivre la pratique et le développement de leurs compétences en matière d'évaluation de la sécurité des applications Web.

---
## Section Principale

Vous pouvez suivre quelques parcours complémentaires pour développer et pratiquer les compétences que vous avez acquises dans ce parcours d'apprentissage. Ces parcours ne doivent pas vous empêcher de faire le travail réel d'évaluation de la sécurité des sites Web, mais peuvent être utilisés pendant les périodes d'inactivité.

### Gagner en profondeur

Comme vous vous en souvenez peut-être, ce parcours d'apprentissage utilisait des exercices pratiques de la Portswigger Academy, mais n'utilisait pas tous les exercices pour les sujets abordés. Si vous le souhaitez, vous pouvez vous essayer aux [exercices pratiques classés « experts »](https://portswigger.net/web-security/all-labs). Notez que ces exercices pratiques représentent des situations très rares et sont souvent difficiles pour les experts expérimentés dans le domaine de l'évaluation de la sécurité des applications Web.

### Prendre de l'ampleur

Ce parcours d'apprentissage couvrait les aspects les plus importants de la sécurité des applications Web, mais cela comprend beaucoup plus de domaines.

La Portswigger Academy propose des [sujets](https://portswigger.net/web-security/all-topics) et des [laboratoires](https://portswigger.net/web-security/all-labs) qui n'étaient pas inclus dans ce parcours d'apprentissage. Si cela vous intéresse, n'hésitez pas à les consulter. Notez que si vous vous êtes inscrit(e) à un compte sur la Portswigger Academy, celui-ci suivra les exercices pratiques que vous avez effectués. Cela peut vous aider à trouver facilement de nouveaux exercices et domaines que vous n'avez pas effectués.

En outre, le [guide de test de l'OWASP](https://github.com/OWASP/wstg/tree/master/document) est un guide très complet pour les évaluations de sécurité des applications Web et les vulnérabilités que vous pourriez trouver. Si vous avez quelques minutes, il est souvent intéressant de parcourir le contenu de sujets que vous ne reconnaissez pas et de les lire.

Il est également très judicieux de lire régulièrement les rapports de vulnérabilités publiés par d'autres chercheurs pour comprendre à la fois leurs méthodologies et les faiblesses qu'ils ont trouvées dans les sites Web et les applications Web. [Ce rapport](https://eaton-works.com/2024/01/17/ttibi-email-hack/) est un excellent début, car il souligne à la fois les erreurs très basiques commises dans les applications Web tout en expliquant en profondeur les dommages qui pourraient être causés par un cybercriminel exploitant ces vulnérabilités. Gardez toutefois à l'esprit qu'il se concentre sur un site Web qui contient des erreurs particulièrement flagrantes. La plupart des vulnérabilités que vous ou d'autres chercheurs en sécurité trouverez ne seront pas aussi simples.

### Acquérir de la pratique et de l'expérience

La chose la plus importante que vous pouvez faire pour améliorer vos compétences en matière de test d'applications Web est de tester des applications Web. Il y a deux façons principales de le faire par vous-même. La première consiste à vérifier les applications Web intentionnellement vulnérables dans le [répertoire des applications Web vulnérables de l'OWASP](https://owasp.org/www-project-vulnerable-web-applications-directory/). Juice Shop et DIWA en font partie, et il y en a beaucoup d'autres. Si vous avez eu du mal à trouver la plupart des vulnérabilités dans DIWA, il peut s'agir d'un bon point de départ. Vous pouvez télécharger et vous exercer sur ces sites. [Certains d'entre eux sont même hébergés en ligne](https://owasp.org/www-project-vulnerable-web-applications-directory/#div-online) de sorte que vous n'avez pas besoin de passer par les tracas du téléchargement.

Une fois que vous êtes sûr(e) de trouver les vulnérabilités dans les sites intentionnellement non sécurisés, la meilleure façon de vous entraîner est de participer à des programmes de bug bounty. Dans ces programmes, les propriétaires de site donnent aux gens la permission de tester leurs sites Web et rémunèrent généralement les personnes qui leur signalent de nouvelles vulnérabilités. Souvent, ces sites ont déjà des programmes de sécurité matures et les vulnérabilités sont rares. Cependant, plutôt que de simuler un certain réalisme, ces sites Web sont authentiques et vous permettent de vous construire une expérience du monde réel. Notez que certaines personnes sont capables de gagner leur vie grâce à des programmes de bug bounty, mais les techniques qu'ils utilisent ne sont pas les mêmes que celles utilisées dans les évaluations complètes de sécurité des applications Web. Si votre objectif est de pratiquer et de développer vos compétences, le mieux est d'effectuer des évaluations complètes des sites dans le cadre de programmes de bug bounty, et de voir les éventuelles rémunérations que vous pouvez recevoir en bonus.

Les deux plus grandes plateformes de bug bounty sont [HackerOne](https://www.hackerone.com/hackers) et [Bugcrowd](https://www.bugcrowd.com/hackers/faqs/). Ces deux services permettent aux propriétaires de sites de communiquer avec des « pirates informatiques » qui souhaitent tester des sites Web. Les deux proposent des listes de propriétaires de sites participants. En général, la meilleure pratique consiste à choisir un nouveau programme qui présente des gains modestes. Cela devrait vous aider à trouver un site sur lequel vous êtes plus susceptible de trouver des vulnérabilités. Bien sûr, lors de vos tests, assurez-vous de respecter les règles du programme de bug bounty.


## Contrôle de compétence

Ce contrôle de compétence aborde l'ensemble du parcours d'apprentissage de façon plus générale. La compréhension du modèle OSI (Open Systems Interconnection) est cruciale pour comprendre les couches de communication du réseau et les vulnérabilités qui peuvent être exploitées à chaque niveau. Vous pouvez en apprendre un peu plus sur le modèle [ici](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) et dans le [sous-thème 5 de ce parcours d'apprentissage](#_ebcoi73gxfy1).

Dans une architecture d'application Web typique, différentes couches OSI jouent des rôles distincts, de la gestion de la transmission des données à la sécurisation des canaux de communication. Cet ensemble de questions à choix multiples explore les couches OSI impliquées dans l'architecture des applications Web, ainsi que les vulnérabilités potentielles et les vecteurs d'attaque correspondants. Testez vos connaissances sur la sécurité du réseau et découvrez les couches où les menaces se cachent généralement. Si possible, discutez de vos réponses à ces questions avec un pair ou un mentor qui vous aidera à vérifier que vous avez bien compris le sujet.  

1\. Dans quelle couche du modèle OSI le protocole TCP fonctionne-t-il, qui est généralement ciblé par les cybercriminels dans le cadre de divers types d'attaques de réseau ?

A) La couche Application

B) La couche Transport

C) La couche Réseau

D) La couche Liaison des données

2\. Quelle vulnérabilité est généralement associée à la couche de transport (couche 4) du modèle OSI, dans laquelle les cybercriminels tentent de submerger les ressources du réseau avec un volume de trafic élevé ?

A) Cross-Site Scripting (XSS)

B) Injection SQL

C) Déni de service (DoS)

D) Faille d'authentification

3\. Dans quelle couche du modèle OSI les protocoles HTTP et HTTPS fonctionnent-ils généralement, ce qui en font une cible commune pour les attaques telles que le Cross-Site Scripting (XSS) et l'injection SQL ?

A) La couche Liaison des données

B) La couche Transport

C) La couche Application

D) La couche Présentation

4\. Quelle vulnérabilité est souvent exploitée dans la couche Application (couche 7) du modèle OSI, permettant aux cybercriminels d'injecter du code malveillant dans les applications Web et de compromettre les données des utilisateurs ?

A) Déni de service (DoS)

B) Cross-Site Scripting (XSS)

C) Attaque Man-in-the-Middle (MitM)

D) Attaque de flood SYN

5\. Dans quelle couche du modèle OSI les routeurs et les switchs fonctionnent-ils, et où des vulnérabilités telles que l'usurpation d'IP et le d'ARP peuvent se produire ?

A) La couche Physique

B) La couche Réseau

C) La couche Transport

D) La couche Session  

6\. Quelle vulnérabilité implique que les cybercriminels interceptent la communication entre deux parties, leur permettant d'espionner des informations sensibles ou de modifier des paquets de données ?

A) Cross-Site Scripting (XSS)

B) Attaque Man-in-the-Middle (MitM)

C) Injection SQL

D) Dépassement de tampon

7\. Dans quelle couche du modèle OSI les pare-feux et les systèmes de détection d'intrusion (IDS) fonctionnent-ils généralement, visant à filtrer et à surveiller le trafic réseau pour détecter les activités suspectes ?

A) La couche Application

B) La couche Transport

C) La couche Réseau

D) La couche Liaison des données  

8\. Quelle vulnérabilité implique que les cybercriminels exploitent les faiblesses de la couche Réseau pour rediriger le trafic vers des destinations malveillantes ou intercepter des informations sensibles ?

A) Cross-Site Scripting (XSS)

B) Usurpation d'ARP

C) Injection SQL

D) Falsification de requête intersite (CSRF)

9\. Dans quelle couche OSI les protocoles de chiffrement SSL/TLS fonctionnent-ils, pour protéger les données transmises sur le réseau contre l'interception et la falsification ?

A) La couche Présentation

B) La couche Application

C) La couche Transport

D) La couche Réseau

10\. Quelle vulnérabilité implique que les cybercriminels manipulent des champs de saisie dans des formulaires Web ou des URL pour injecter des commandes SQL malveillantes, en entraînant potentiellement un accès non autorisé à la base de données sous-jacente ?

A) Cross-Site Scripting (XSS)

B) Injection SQL

C) Déni de service (DoS)

D) Attaque Man-in-the-Middle (MitM)


{{< question title="Bonnes réponses :" >}}

_1\. B) La couche Transport_

_2\. C) Déni de service (DoS)_

_3\. C) La couche Application_

_4\. B) Cross-Site Scripting (XSS)_

_5\. B) La couche Réseau_

_6\. B) Attaque Man-in-the-Middle (MitM)_

_7\. C) La couche Réseau_

_8\. B) Usurpation d'ARP_

_9\. C) La couche Transport_

_10\. B) Injection SQL_

{{< /question >}}

## Ressources d'apprentissage

{{% resource title="Tous les exercices | Portswigger Academy" description="Au cours de ce parcours d'apprentissage, vous n'avez terminé que certains des exercices pratiques de Portswigger. Revenir en arrière et en terminer d'autres, en particulier les plus difficiles, constituera une excellente pratique." languages="Anglais" cost="Gratuit" url="https://portswigger.net/web-security/all-labs" %}}
{{% resource title="Guide de test de l'OWASP" description="Un document très complet sur la sécurité des applications Web et les vulnérabilités que vous pouvez trouver" languages="Anglais" cost="Gratuit" url="https://github.com/OWASP/wstg/tree/master/document" %}}
{{% resource title="Pirater une compagnie d'assurance Toyota/Eicher Motors en exploitant son site Web de calcul de primes" description="Un article utile concernant un site Web comprenant des erreurs de sécurité particulièrement flagrantes qui pourraient donner à cybercriminel un accès de haut niveau, et les étapes de base qui auraient pu atténuer ces vulnérabilités" languages="Anglais" cost="Gratuit" url="https://eaton-works.com/2024/01/17/ttibi-email-hack/" %}}
{{% resource title="Programmes de bug bounty: HackerOne" description="Ces programmes vous permettent de gagner de l'argent tout en trouvant des vulnérabilités de sécurité et offrent un excellent moyen de tester éthiquement les applications et de vérifier légalement vos compétences." languages="Anglais" cost="Gratuit" url="HackerOne : https://www.hackerone.com/hackers <br> Bugcrowd : https://www.bugcrowd.com/hackers/faqs/" %}}
{{% resource title="Programmes de bug bounty: BugCrowd" description="Ces programmes vous permettent de gagner de l'argent tout en trouvant des vulnérabilités de sécurité et offrent un excellent moyen de tester éthiquement les applications et de vérifier légalement vos compétences." languages="Anglais" cost="Gratuit" url="HackerOne : https://www.hackerone.com/hackers <br> Bugcrowd : https://www.bugcrowd.com/hackers/faqs/" %}}

