---
style: introduction
title: Introduction
description: Lisez la présentation du parcours d'apprentissage, les objectifs, les menaces associées et les prérequis.
weight: 1
---

## Overview

Websites are critical infrastructure used by media organizations and civil society to disseminate free flow of information as well as to provide functionalities to their stakeholders. Adversaries attack these web applications for various purposes, including shutting down the free flow of information, reputational damage, access to private systems, theft of sensitive information, surveillance, and device compromise. By preparing effectively for these sorts of attacks, you can reduce their impact, or in some cases prevent them entirely.

Attacks against websites generally fall into two categories: DoS (denial of service) and various forms of hacking. DoS attacks are intended to prevent people from being able to access the site and are usually performed by flooding the site with traffic. DoS attacks are often launched by criminal extortionists who wish to receive payment for stopping the attack, or by political rivals who wish to deny their targets a platform. Hacking attacks manipulate vulnerabilities and weaknesses in a web application, thereby generally requiring more skill, but can have a greater impact on the target site. The attacker profiles and goals vary widely, but common hacking goals include retrieving private data from a site, defacement or other content changes, taking over the site’s underlying infrastructure, pivoting to other targets, or targeting users of the site.

This learning path covers intermediate and advanced knowledge needed to prepare for and respond to attacks against web applications. Effective preparation is extremely important to respond to any sort of attack. Most of the response techniques covered in this learning path are difficult or impossible to carry out without the proper preparation. However, with proper preparation, it’s possible to render some forms of DoS attacks ineffective, mitigate DoS attacks quickly and effectively, and stop and recover from hacking attacks before too much damage is done. In this learning path we will cover:

- Website hardening
- Web server logging
- DoS incident response
- Hacking incident response and forensics

Note that, while DoS attacks are more common than hacking attacks, hacking response takes up the majority of this learning path. This is because DoS attacks are almost always simpler than hacking attacks, and because preparing for and responding to DoS attacks mostly involves working with 3rd party providers who do most of the work. In comparison, hacking attacks are often more complicated, and responding to them requires deep, hands-on work with the site itself.

While some nation-state actors (famously the United States, China, North Korea, Russia, etc.) are both well-funded and have highly skilled agents, most nation-state actors have funding, but lack deep technical skills. To suppress the speech of their political rivals, they will frequently use large-scale DoS attacks to prevent people from viewing those rivals’ websites. Criminal organizations will happily rent out their botnets (networks of compromised computers) to people for use in DoS attacks. Here are some examples:

- September 2022 [https://www.qurium.org/alerts/nacionale-under-ddos/](https://www.qurium.org/alerts/nacionale-under-ddos/)
- May 2022 [https://www.qurium.org/alerts/the-tip-of-the-iceberg/](https://www.qurium.org/alerts/the-tip-of-the-iceberg/)
- March 2022 [https://www.qurium.org/alerts/philippines/forensic-analysis-of-the-multiple-distributed-denial-of-service-attacks-in-the-philippines/](https://www.qurium.org/alerts/philippines/forensic-analysis-of-the-multiple-distributed-denial-of-service-attacks-in-the-philippines/)
- September 2021 [https://www.qurium.org/alerts/switzerland/gotham-city-under-denial-of-service/](https://www.qurium.org/alerts/switzerland/gotham-city-under-denial-of-service/)
- August 2021 [https://www.qurium.org/alerts/philippines/human-rights-alliance-karapatan-under-long-lasting-ddos-attack/](https://www.qurium.org/alerts/philippines/human-rights-alliance-karapatan-under-long-lasting-ddos-attack/) & [https://www.qurium.org/alerts/philippines/israeli-firm-bright-data-luminati-networks-enabled-the-attacks-against-karapatan/](https://www.qurium.org/alerts/philippines/israeli-firm-bright-data-luminati-networks-enabled-the-attacks-against-karapatan/)
- June 2021 [https://www.qurium.org/alerts/philippines/attacks-against-media-in-the-philippines-continue/](https://www.qurium.org/alerts/philippines/attacks-against-media-in-the-philippines-continue/)
- July 2020 [https://www.qurium.org/alerts/colombia/la-nueva-prensa-attacked-for-operacion-jaque-documentary/](https://www.qurium.org/alerts/colombia/la-nueva-prensa-attacked-for-operacion-jaque-documentary/)
- May 2020 [https://www.qurium.org/alerts/philippines/attacks-against-websites-in-the-philippines-during-covid-19/](https://www.qurium.org/alerts/philippines/attacks-against-websites-in-the-philippines-during-covid-19/)
- April 2020 [https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/](https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/)
- March 2020 [https://www.qurium.org/alerts/el-salvador/ddos-attacks-against-salvadoran-revista-factum-attributed-to-university-infrastructure/](https://www.qurium.org/alerts/el-salvador/ddos-attacks-against-salvadoran-revista-factum-attributed-to-university-infrastructure/)

Adversaries, especially political rivals, have a history of attempting to hack into the websites of civil society groups. Examples include:

- March 2020 [https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/](https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/)
- October 2019 [https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/](https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/)
- August 2019 [https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/](https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/)
- September 2018 [https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/](https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/)

Additionally, any site on the internet is subject to opportunistic and targeted attacks by financially-motivated threat actors. These adversaries have goals such as stealing user passwords, payment card information, etc. for resale, modifying site content for search ranking manipulation or click fraud, or using the site’s infrastructure itself for cryptocurrency mining, sending spam, or launching denial of service attacks. For more information on opportunistic and automated attacks on web applications, see [this report by OWASP](https://owasp.org/www-project-automated-threats-to-web-applications/).

### Background reading

Adversaries, especially political rivals, have a history of attempting to hack into the websites of civil society groups. Some documented examples include:

- March 2020 [https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/](https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/)
- October 2019 [https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/](https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/)
- August 2019 [https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/](https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/)
- September 2018 [https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/](https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/)

Additionally, any site on the internet is subject to opportunistic and targeted attacks by financially-motivated threat actors. These adversaries have goals such as stealing user passwords, payment card information, etc. for resale, modifying site content for search ranking manipulation or click fraud,using the site’s infrastructure itself for cryptocurrency mining, sending spam, or launching denial of service attacks. Although many of these attacks may not be targeted based on political motivations, they nonetheless pose significant reputational and confidentiality risks to any organization. For more information on opportunistic and automated attacks on web applications, see [this report by OWASP](https://owasp.org/www-project-automated-threats-to-web-applications/).

## Objective

Practitioners will learn how to:

- Perform basic hardening of websites against hacking and DoS attacks
- Add effective security logging to their web applications
- Respond to DoS and hacking attacks

## What threats does this skill mitigate or respond to?

- Website compromise
- Website denial of service

## What are the prerequisites?

This learning path requires a working knowledge of web servers, possible exploits, and basic vulnerabilities. For this reason, we recommend that all learners who pursue it first and do not have good knowledge of web server architectures and vulnerabilities first complete the Infuse Web Application Security Fundamentals learning path.

While knowledge of website security testing and assessment is not a strict prerequisite to this learning path, some learners might find it easier to first go through the Web Application Security Assessment learning path prior to undertaking this one, especially if they would like to refresh their knowledge of key web application vulnerabilities.

In addition to the above, learners should have a basic understanding of the Unix command line, including concepts like piping commands. This learning path will also utilize the awk tool and will offer an introduction to it. If learners would prefer to practice the tool prior to embarking on the path, we recommend [this introduction](https://www.tutorialspoint.com/awk/index.htm) or [this comprehensive ebook](https://learnbyexample.github.io/learn_gnuawk/).

## What devices or software do you need for the exercises?

To complete many of the hands-on practice exercises recommended in this learning path, you will need a computer capable of running basic Unix command line tools, such as awk, cat, and grep. Those are installed on every macOS system, pretty much every Linux system.

If you are running Windows, we recommend you install WSL (Windows Subsystem for Linux) to run some of the tools in this learning path. While there might be other ways of running such tools, this will require much less fiddling with dependencies.

- Here is the documentation provided by Microsoft with full details on how to install WSL 2: [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
- Open “Turn Windows features on or off” in the Windows control panel and make sure “Virtual Machine Platform” and “Windows Subsystem for Linux” are checked.
- Download and install WSL 2 from the [Microsoft Store](https://apps.microsoft.com/store/detail/windows-subsystem-for-linux-preview/9P9TQF7MRM4R). Once installed, restart your computer to apply the changes.
- Open a Windows PowerShell or Command Prompt in administrator mode by right-clicking and selecting "Run as administrator" and run the command

`wsl --set-default-version 2` 

The output from this command will look like:

```
For information on key differences with WSL 2 please visit https://aka.ms/wsl2
The operation completed successfully.
```

- Once WSL 2 is installed, you can install your preferred Linux distribution from the Microsoft Store or by using the command line. Simply search for "Linux" in the Microsoft Store, select your desired distribution (e.g., Ubuntu, Debian, or others), and click "Install". Alternatively, you can install a Linux distribution using PowerShell or Command Prompt. Open a Windows Powershell or Command Prompt and list the distributions available:

```
wsl --list --online
```

Install a distribution from this list using wsl --install -d &lt;Distribution Name> command.

```
wsl --install -d Ubuntu
```

After installation, each Linux distribution will have an icon on the Windows application menu. Once you have installed WSL, you will need to create a user account and password for your newly installed Linux distribution.

A new window should open with a Linux shell.

- Here is a quick review of the WSL command line options.

Print the usage information and see the command line arguments:

```
wsl --help
```

List the installed distributions:

```
wsl --list
```

List only the running distributions:

```
wsl --list --running
```

Terminate a running distribution:

```
wsl --terminate Ubuntu-22.04
```

Shutdown all running distributions:

```
wsl --shutdown
```

Unregister the Linux distribution and delete the filesystem:

```
wsl --unregister Ubuntu-22.04
```

Update WSL to the latest version:

```
wsl --update
```

Start the default distribution:

```
wsl
```

## Related learning paths

_Web Application Security Fundamentals:_ This Hardening, Forensics, and Incident Response learning path assumes a certain level of familiarity with web application security. If you are new to this area of security, then you should go through the Security Fundamentals learning path to gain the background information to effectively engage with this one.

_Web Application Security Assessment:_ For digital defenders, attacking and defending are two important parts of a whole. As someone helping your clients secure their sites, knowing how to holistically defend against attacks allows you to provide them with better recommendations. This Learning Path provides a deeper understanding of the types of hacking attacks that websites may be subject to.
