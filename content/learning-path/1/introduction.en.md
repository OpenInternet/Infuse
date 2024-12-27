---
style: introduction
title: Introduction
description: Read the learning path overview, objectives, associated
  threats, and prerequisites
weight: 1
---

## Overview

Phishing messages are usually tied to malicious infrastructure that either seeks to capture login credentials and use them to access an organization’s or individual's systems, or otherwise seeks to deliver a socially-engineered compromise such as a browser or device exploit. They are one of the most common techniques used by malicious actors who aim to compromise NGOs. Very often, an NGO that receives such a message might find it difficult to tell with certainty whether it was suspicious, much less what the identity and goal of the attacker were. Checking with the presumed sender through another channel might be the easiest way to verify whether a message was legitimate. If the sender cannot be contacted or if the message was not legitimate, it might be important to analyze it in more depth. This could allow us to stop such attacks before they compromise an NGO’s systems, prevent them from doing so in the future, and alert others within the community to such attackers and their tactics, techniques, and procedures (TTPs). The results of such investigations are then often shared, either through formal reports or networks, or informal discussions between NGO security professionals.

There have been several cases in which NGOs conducted excellent investigations of malicious infrastructure. These include a joint effort between Bellingcat and several private sector groups [investigating phishing attacks against organizations focusing on Russia-related affairs](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/), as well as [an HRW-Amnesty project](https://www.hrw.org/the-day-in-human-rights/2022/12/05) which [tracked down phishing attempts](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) attributed to the Iranian government.

The attacks that this section investigates generally start with a phishing message. The targeted person receives a message (on email, WhatsApp, or another medium) which tries to convince them to click a link. Sometimes, the targeted person will be working for a civil society group and be targeted because of their ties to it, with attackers hoping to dig deeper into the organization’s systems. At other times, attackers will directly target individual researchers or freelancers.

A phishing message will often try to trick the targeted person to enter their credentials such as usernames and passwords (as happened with the attacks documented by Bellingcat and HRW), download malware, or in some cases bypass browser security to directly access information in the browser or automatically install malware. The sections “Passive investigation: Analyze URLs, hostnames, and IP addresses” and “Passive investigation: Analyze email headers” cover these phases of an attack.

When someone receives a credible phishing message, or otherwise is attacked by malicious software, they may need to try to identify the infrastructure (servers, websites, etc.) used by the attackers. Targeted attacks using dedicated or compromised infrastructure are relatively rare, so the section on “Triage” will help you determine whether it is worth spending time on analysis. It’s a good idea to have a solid understanding of incident management in general prior to starting this learning path.

Before you visit any attacker-controlled websites, or download any malware, it is important that you learn to do so safely. This learning path looks at both passive investigation techniques, which do not contact the attacker’s server and are therefore unlikely to alert them of an investigation in progress, and active techniques, which do contact servers. Once you have learned how to do passive investigation, you can move on to active techniques to visit the websites linked to in phishing messages, and analyze them to discover further attacker-controlled infrastructure. This is covered in the “Active investigation: Analyze malicious web pages” section.

If the attacker manages to get malware onto the device of the targeted person or organization, that malware will usually communicate with a command-and-control (C&C) server. Discovering what the attacker’s C&C servers are and how they work is covered in the Malware Analysis learning path. Analyzing malware is another skill you can use to discover more attacker infrastructure.

To better support both the person you’re helping and the greater community, it is important to document and share your findings. This is covered in the “Documenting findings” section. There are several threat and information sharing communities within the wider NGO space, but listing those lies outside of the scope of this learning path.

Lastly, it is important to recognize up-front that many of the investigation techniques in this learning path can alert an attacker that they are being investigated, or even place the investigator—or the wider community— at risk. We divide the techniques into passive and active methods. Use caution when considering active methods of investigation, and first talk to the recipient individual/organization before doing so in order to discuss their threat model and allow them to make an informed choice about proceeding with investigations.

Passive (appropriate in all cases)

- Uses information that has already been delivered to the targeted person
- Does not involve communication with the attacker’s infrastructure
- Generally easier
- Does not generally alert the attacker that they are under investigation
- Safer

Active

- Generally only used for malware delivery and command-and-control servers
- Investigator will interact with the attacker’s infrastructure
- Often requires more skill and deeper investigation
  - “Cat-and-mouse game” with the attacker
- May alert the attacker that they are being investigated
- Risk that the investigator may become compromised or targeted

## Objective

Practitioners will learn how to:

- Triage email messages to understand if they are malicious/worth investigating in depth
- Understand attacker and attack methods
- Analyze email headers to identify attacker infrastructure
- Analyze malicious web landing pages
- Document and report investigation findings
- Initiate takedown actions to reduce harm

## What threats does this skill mitigate or respond to?

Skills in investigating, tacking, and detecting malicious infrastructure can help respond to the following:

- Targeted phishing attacks
- Messenger-based phishing
- Phishing-related infrastructure

## What are the prerequisites?

- Basic command line knowledge on a major OS of your choice. If you want to learn or brush up on some command line basics, we recommend [this guide](https://www.git-tower.com/blog/command-line-cheat-sheet/) and [this one](https://github.com/jlevy/the-art-of-command-line). If you are looking for a general beginners’ introduction to the command line, we recommend completing Chapter 4 of the [Field Guide to Threat Labs](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) guide on the topic.
- A basic understanding of HTML and JavaScript. Whether you need to learn about them from scratch or want to refresh your knowledge, we recommend the [MDN Developer docs](https://developer.mozilla.org/en-US/docs/Learn)
- A basic understanding of how Git repositories work and how to interact with them. While detailed knowledge of Git and Git-based platforms such as GitHub and GitLab is not a must, it can be useful for all learning paths, since many tools and resources are hosted there and in time you may end up updating local repositories or even creating your own branches. If you have not worked much with such platforms in the past, we recommend starting with any of these resources:
  - [Pro Git Book](https://book.git-scm.com/book/en/v2) (available in 17 languages) - A study of chapters 1-3 plus selected topics in other chapters will give an excellent introduction
  - [git - the simple guide](https://rogerdudler.github.io/git-guide/index.html) (Available in 16 languages) is a cheatsheet of Git commands. Useful for when you have a general concept of git but need reference on commands and syntax
  - [A Visual Git Reference ](https://marklodato.github.io/visual-git-guide/index-en.html) (available in 14 languages) - More advanced visual reference to understand Git workflows and commands
- [GitHub Skills ](https://skills.github.com/)(English Only)
- [GitLab Git Essentials](https://levelup.gitlab.com/courses/gitlab-with-git-essentials-s2) (English Only)

## What devices or software do you need for the exercises?

- You do not need any specialized or powerful hardware for this learning path. Any modern computer should work. While the tools in this learning path have only been tested on x86-based systems, most if not all should also work on ARM systems like the Raspberry Pi or Apple Silicon computers
- Many of the tools in this learning path run best on Unix-like operating systems. This means that it’s easiest to use Linux, macOS devices, or Windows devices with WSL (Windows Subsystem for Linux) installed on them.
- If you are running Windows, you will need to install WSL (Windows Subsystem for Linux) to be able to run some of the tools outlined below
- If you are running macOS, it’s a good idea to install [Homebrew](https://brew.sh/) or [Macports](https://www.macports.org/); those are package managers which can automate the process of installing some of the tools outlined throughout the learning path.
- WSL and Linux should both have built-in package managers which you can use to install the tools outlined below.
- It is best to analyze malicious infrastructure on a separate device which you do not use for other sensitive work and where you are not logged into any sensitive or work accounts. If you cannot use a discrete device, you could also run the analysis within a virtual machine. If you’re just starting out with virtual machines, check out [this quick guide](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview) on how to run the user-friendly Ubuntu Linux within one.

## Related learning paths

This learning path offers a fantastic introduction to other ones. After completing this one, we would recommend that learners work on either [Detecting Malware](/en/learning-path/2/) or [Web Security Fundamentals](/en/learning-path/4/).

## Other resources and links

{{% resource title="Helpdesk Workflow: Client Receives a Suspicious/Phishing Email" languages="English" cost="Free" description="Access Now helpline community documentation for responding to suspicious/phishing emails" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.html#" %}}

{{% resource title="List of all DNS record types" languages="English, Chinese, Japanese, Korean, Russian, Serbian, Ukrainian, Esperanto, Hungarian, Vietnamese, Italian, Spanish, French" cost="Free" description="Includes (almost?) all DNS record types." url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="Amnesty reports on phishing campaigns" languages="Multiple depending on the report" cost="Free" description="A list of examples of how a targeted phishing campaign against human right defenders, activists and journalists looks" url="https://www.amnesty.org/en/search/phishing/" %}}
