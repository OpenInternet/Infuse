+++
style = "module"
weight = 5
title = "Méthodes d'investigation sur les systèmes Windows et macOS"
+++

## Cas d'utilisation

L'inspection directe d'un appareil peut être nécessaire pour comprendre ce qui s'y passe et pour identifier les processus, artefacts ou trafics suspects. Allez au-delà des outils d'analyse et utilisez d'autres méthodes pour examiner plus en profondeur ce qui se passe sur l'appareil.

## Objectifs

Après avoir terminé ce sous-thème, les participants devraient être en mesure de faire ce qui suit :

- Comprendre les moyens d'inspecter les processus en cours d’exécution et les méthodes permettant de trier les processus potentiellement suspects
- Comprendre les mécanismes de persistance communs et les moyens de les vérifier
- Inspecter le trafic réseau pour détecter les communications suspectes

---
## Section Principale

Les méthodes d'investigation nécessitent plus de connaissances sur les opérations internes du système d'exploitation ainsi que de développer un certain instinct pour détecter ce qui est normal ou anormal.

### Windows

Le [Guide d'investigation rapide](https://pellaeon.gitbook.io/mobile-forensics/fr) fournit une bonne introduction aux approches d'analyse pour l'inspection des appareils. Le guide comprend une introduction à l'importante suite d'outils Sysinternals mis à disposition par Microsoft. Remplissez les sections du guide sur [Autoruns](https://pellaeon.gitbook.io/mobile-forensics/fr/windows/autoruns), [Process Explorer](https://pellaeon.gitbook.io/mobile-forensics/fr/windows/processes) et [TCPView](https://pellaeon.gitbook.io/mobile-forensics/fr/windows/network)[^1]

Après avoir terminé les activités guidées, vous devriez être en mesure de :

- Comprendre ce qu'est la [suite SysInternals](https://learn.microsoft.com/en-us/sysinternals/) et comment utiliser certains des outils utiles pour l'examen d'investigation.
- Lire et comprendre les résultats de l'outil Sysinternals Autoruns, et comprendre quels sont les différents emplacements et méthodes de persistance (en comprenant les différents onglets affichés dans l'outil)
- Lire et filtrer les résultats des outils SysInternals Autoruns pour identifier uniquement les binaires non Microsoft et non signés, et vérifier les hachages de fichiers par rapport à VirusTotal
- Lire et comprendre les résultats de Process Explorer, notamment en vérifiant l'exécution de processus avec des signatures de fichiers non vérifiées, et vérifier les hachages de processus par rapport à VirusTotal.

Les outils SysInternal de Microsoft sont largement utilisés et vous pourrez trouver des tutoriels supplémentaires sur le Web, mais le [Guide d'investigation rapide](https://pellaeon.gitbook.io/mobile-forensics/fr) fournit une bonne introduction ciblée.

### MacOS

Il existe [des outils macOS](https://objective-see.org/tools.html) créés par Objective-See qui peuvent contribuer à détecter les activités potentiellement suspectes sur un système. Beaucoup d’outils Objective-See disposent d'une recherche VirusTotal intégrée. Nous mentionnerons encore cet outil plus tard dans ce parcours d'apprentissage. Pour un tutoriel rapide sur VirusTotal, consultez le [chapitre 7 du guide de terrain](https://internews.org/wp-content/uploads/2024/12/Field-Guide-to-Incident-Response-for-Civil-Society-and-Media-Chapter-7-FR.pdf). Nous recommandons aux apprenants qui souhaitent se familiariser avec macOS de consulter les outils suivants :

- LuLu : une application de pare-feu gratuite et riche en fonctionnalités pour macOS. Elle peut répertorier toutes les connexions réseau sortantes et, par conséquent, détecter toute tentative de communication avec un serveur par un logiciel malveillant. Consultez l'ensemble du [manuel de LuLu](https://objective-see.org/products/lulu.html), qui indique comment vous pouvez rechercher des processus spécifiques qui tentent d'établir une connexion réseau. Si vous avez des doutes concernant des processus spécifiques, vous pouvez également les rechercher sur VirusTotal (LuLu comprend une recherche intégrée) ou les rechercher dans votre moteur de recherche préféré et voir ce que d'autres en disent.
- OverSight : un outil qui alerte l'utilisateur chaque fois que le microphone ou la webcam est activée. Si un logiciel malveillant tente de capturer des informations via le microphone ou la caméra, l'outil doit en avertir l'utilisateur ou un analyste.
- KnockKnock et BlockBlock : ces deux applications détectent les logiciels qui démarrent lorsque l'utilisateur se connecte au système. Elles peuvent donc alerter l'utilisateur ou l'analyste au sujet des logiciels malveillants persistants ou qui sont exécutés à chaque redémarrage. KnockKnock peut fournir une liste de logiciels persistants, tandis que BlockBlock envoie une alerte chaque fois qu'un nouveau composant persistant est installé.
- KextViewer : un outil permettant d'examiner et d'inspecter les extensions du noyau, des paquets qui étendent le code du système d'exploitation principal et qui s'exécutent au niveau de privilège le plus élevé.

## Pratique

### Windows et macOS

1. Ouvrez le gestionnaire de processus de votre système d'exploitation et lisez ses résultats. Remarquez-vous des processus qui semblent déplacés ou qui consomment une quantité anormalement élevée ou faible de ressources ? Notez-les et recherchez-les sur le Web pour en savoir plus à leur sujet.
2. Lors du suivi des connexions réseau tel que décrit dans le Guide d'investigation mobile (articles pour [Windows](https://pellaeon.gitbook.io/mobile-forensics/fr/windows/network) et [macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network)), ouvrez une ou deux applications qui se connectent à Internet et notez les adresses IP auxquelles elles se connectent. Y a-t-il des éléments curieux concernant ces connexions ou adresses IP ?
3. Parcourez les éléments de démarrage et divisez-les entre ceux qui proviennent de votre fournisseur de système d'exploitation et ceux qui proviennent d'autres fournisseurs. Consultez trois d'entre eux en ligne pour en savoir plus sur leur utilisation. Si vous travaillez avec un pair ou un mentor, discutez-en ensemble.

### Android

Lisez ce guide : [Guide pour débutants : comment gérer une application mobile potentiellement malveillante - PiRogue Tool Suite (pts-project.org)](https://pts-project.org/guides/g3/)

## Contrôle de compétence

1. Téléchargez un logiciel malveillant récent de Malware Bazaar. Téléversez-le dans un bac à sable public (tel que Triage) et vérifiez ce qu'il fait sur le système.  
    Notez vos conclusions et discutez-en avec un mentor ou un pair qui s'assurera que vous avez effectué l'exercice correctement.  
    (Remarque : il peut arriver que le logiciel malveillant semble ne rien faire. Dans ce cas, discutez-en avec un mentor ou un pair et essayez un autre type de logiciel malveillant.)
2. (Facultatif, exercice supplémentaire) Consultez [cette analyse](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html) de la société de sécurité Trend Micro et comparez-la avec [ce rapport](https://tria.ge/240207-qlmmrahhgr/behavioral1) sur le triage. Discutez-en avec un mentor ou un pair, en vous concentrant sur des questions telles que la façon dont les deux rapports étiquettent les TTP et tentez d'expliquer la fonction du logiciel malveillant. Parlez du format que vous trouvez le plus lisible et justifiez votre choix. (Remarque : ce logiciel malveillant, que Trend Micro appelle « Earth Preta », est également connu sous le nom de « Mustang Panda », et a ciblé des organisations de médias et des ONG, notamment au Myanmar.)


## Ressources d'apprentissage

{{% resource title="Investigation mobile" description="Un guide complet sur la façon de procéder à l'investigation et au triage pour de nombreux systèmes d'exploitation de premier plan" languages="Anglais" cost="Gratuit" url="https://pellaeon.gitbook.io/mobile-forensics/" %}}
{{% resource title="Sysinternals" description="Une série d'excellents outils que les analystes peuvent utiliser pour mieux comprendre ce qui se passe sur un système Windows" languages="Anglais" cost="Gratuit" url="https://learn.microsoft.com/fr-fr/sysinternals/" %}}
{{% resource title="Outils Objective-See" description="Excellents outils de sécurité pour macOS qui peuvent aider à détecter les infections de logiciels malveillants ou les tentatives de collecte/d'exfiltration des données" languages="Anglais" cost="Gratuit" url="https://objective-see.org/tools.html" %}}

## Notes

[^1]: L'outil CrowdInspect de Crowdstrike n'est pas activement actualisé et peut ne pas proposer toutes les fonctionnalités, nous vous recommandons donc de vous concentrer sur les outils Microsoft référencés dans le guide pour cette section. Cependant, vous pouvez toujours obtenir des informations utiles à l'aide de l'outil et obtenir des types d'informations similaires à celles obtenues à partir d'outils tels que Process Explorer et TCPView.
