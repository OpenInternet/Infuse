---
style: introduction
title: Introduction
description: Read the learning path overview, objectives, associated threats, and prerequisites
weight: 1
---

**With thanks to**

Ninoslava Bogdanović

## Overview

Web applications are critical infrastructure used by media organizations and civil society to disseminate free flow of information as well as to provide functionalities to their stakeholders. Adversaries attack these web applications for various purposes, including shutting down the free flow of information, reputational damage, access to private systems, theft of sensitive information, surveillance, and device compromise. By proactively identifying vulnerabilities in web applications used by your clients and partners, you can head off potential compromises before they occur.

This learning path covers intermediate and advanced knowledge needed to deeply understand and identify vulnerabilities in web applications. This can be used to find vulnerabilities in an application before threat actors do, to guide secure development practices, or to more effectively fix vulnerabilities in web applications. In this learning path we will cover:

- The reasons for performing a web application security assessment
- The types of assessment that are effective to perform
- How to identify various types of web application vulnerabilities
- How to exploit those vulnerabilities
- How to effectively and efficiently systematically test a web application for vulnerabilities

### Background reading

Adversaries, especially political rivals, have a history of attempting to hack into the websites of civil society groups. Some documented examples include:

- March 2020 [https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/](https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/)
- October 2019 [https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/](https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/)
- August 2019 [https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/](https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/)
- September 2018 [https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/](https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/)

Additionally, any site on the internet is subject to opportunistic and targeted attacks by financially-motivated threat actors. These adversaries have goals such as stealing user passwords, payment card information, etc. for resale, modifying site content for search ranking manipulation or click fraud,using the site’s infrastructure itself for cryptocurrency mining, sending spam, or launching denial of service attacks. Although many of these attacks may not be targeted based on political motivations, they nonetheless pose significant reputational and confidentiality risks to any organization. For more information on opportunistic and automated attacks on web applications, see [this report by OWASP](https://owasp.org/www-project-automated-threats-to-web-applications/).

## Objective

The Badge-holder should be able to efficiently perform comprehensive security assessments of web applications, including identifying the vulnerabilities in the OWASP top 10.

## What threats does this skill mitigate or respond to?

Web application assessment skills can help respond to hacking threats by:

- State-motivated vigilante hackers
- Financially motivated attackers

## What are the prerequisites?

- Prior to starting this learning path, learners should first complete the Website Security Fundamentals learning path if they are not familiar with web servers and basic web application vulnerabilities. If they already are familiar with the wider topic, we still recommend that they brush up on the Fundamentals learning path’s subtopic 6, which focuses on interpersonal skills needed when supporting others.
- A basic familiarity with HTML such as the basic layout of an HTML document and the ability to read simple HTML. For a great introduction, check out [MDN](https://developer.mozilla.org/en-US/docs/Learn).
- Basic programming language concepts and the ability to read simple JavaScript. We recommend the [MDN introduction](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) to the topic.
- Basic understanding of how HTTP works, how a browser communicates with a website, and what HTTP requests and responses look like. For an introduction of those topics, we recommend [this piece](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) and [this one](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data).
- A basic understanding of SQL, just enough to know what it is and how to formulate a simple command. For an introduction, see [sqlzoo](https://sqlzoo.net/wiki/SQL_Tutorial).
- Basic familiarity with how the command line works on an operating system of your choice and how to run commands therein. For a good introduction, see [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line).

## What devices or software do you need for the exercises?

- You will need a computer capable of running Java applications and Docker. Any macOS, Windows, or Linux device with 8GM of RAM and some free disk space should work. All of the labs here were also tested on devices running Apple Silicon, and work.
- Many of the tools in this learning path run best on Unix-like operating systems. This means that it’s easiest to use Linux, macOS devices, or Windows devices with WSL (Windows Subsystem for Linux) installed on them.
- If you are running macOS, it’s a good idea to install [Homebrew](https://brew.sh/) or [Macports](https://www.macports.org/); those are package managers which can automate the process of installing some of the tools outlined throughout the learning path.
- Alternatively, if you have an installation of Kali Linux (you can use the same one you used for the Web Application Security Fundamentals learning path), most of the tools outlined below should already come pre-installed.
- If you are running Windows, we recommend you install WSL (Windows Subsystem for Linux) to run some of the tools outlined below. While many of them can run in Docker, those which require Python might be much easier to run within WSL, which will require less fiddling with dependencies.
  _ Here is the documentation provided by Microsoft with full details on how to install WSL 2: [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
  _ Open “Turn Windows features on or off” in the Windows control panel and make sure “Virtual Machine Platform” and “Windows Subsystem for Linux” are checked.
  _ Download and install WSL 2 from the [Microsoft Store](https://apps.microsoft.com/store/detail/windows-subsystem-for-linux-preview/9P9TQF7MRM4R). Once installed, restart your computer to apply the changes.
  _ Open a Windows PowerShell or Command Prompt in administrator mode by right-clicking and selecting "Run as administrator" and run the command \
  `wsl --set-default-version 2` \* The output from this command will look like:

  ```
  For information on key differences with WSL 2 please visit https://aka.ms/wsl2
  The operation completed successfully.
  ```

  Once WSL 2 is installed, you can install your preferred Linux distribution from the Microsoft Store or by using the command line. Simply search for "Linux" in the Microsoft Store, select your desired distribution (e.g., Ubuntu, Debian, or others), and click "Install". Alternatively, you can install a Linux distribution using PowerShell or Command Prompt. Open a Windows Powershell or Command Prompt and list the distributions available:

  ```
  wsl --list --online
  ```
  Install a distribution from this list using wsl --install -d &lt;Distribution Name> command.

  ```
  wsl --install -d Ubuntu
  ```
  After installation, each Linux distribution will have an icon on the Windows application menu. Once you have installed WSL, you will need to create a user account and password for your newly installed Linux distribution.

  A new window should open with a Linux shell.

**Here is a quick review of the WSL command line options**

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

After completing this learning path, we would recommend that learners work on [Web Application Hardening, Forensics, and Incident Response](/en/learning-path/6/).