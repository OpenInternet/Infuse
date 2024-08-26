+++
style = "introduction"
weight = 1
title = "Introduction"
description = "Read the learning path overview, objectives, associated threats, and prerequisites"
+++

## Overview

There are many ways in which adversaries could try to attack websites, including:

- Denial of expression: website takedown, website defacement, denial of service
- Accessing sensitive data: exploiting access controls or other vulnerabilities to access information for instance in application databases, private files or systems, private inboxes or members’ areas
- Implanting malware ( ‘watering hole’ attacks): using access to a website to place malicious or misleading code for the purpose of achieving objectives on visitor devices
- Lateral movement (compromising other systems): gaining access to whole servers, cloud infrastructure, or office or home infrastructure
- Surveillance of visitors: obtaining information on IPs or identities of visitors to a website or users of a web application
- Supply chain compromise: compromising distribution services for software, building processes of software, or for component libraries of software in order to achieve malicious objectives on users of the targeted software
- Impersonation of websites: for purposes of phishing, muddying of reputation, and malware/spyware distribution
- Traffic injection (downgrading attacks): exploiting infrastructure or communications configuration weaknesses for the purpose of inserting malicious content into otherwise good traffic

Web application security is a deep domain of technical knowledge with many areas of specialization. This learning path will provide you with a general understanding of web application vulnerabilities and how some of the more common ones work. It should help you understand the types of vulnerabilities that commonly exist in web applications, capabilities that these vulnerabilities give to attackers, and how, in general, to eliminate or mitigate these vulnerabilities.

**What is a web application?**

Web applications refer to a broader category of software which runs dynamic services available through the web. A web page is a type of web application, though a static HTML page would not generally be considered one. Web applications typically involve some kind of client-side and/or server side data processing, storage, retrieval, with dynamic content. They generally rely on infrastructure, such as databases, additional servers, or cloud services (including ‘serverless code’). Common CMS platforms such as WordPress or Drupal are web applications. Many organizations deploy various applications to serve internal or external functionalities such as a members database, a constituent relationship management tool, a health information system, a ticketing system, internal operational tools, and many more. Some organizations will develop their own custom web applications fit for their own purposes. Major internet service platforms like MailChimp, Slack, Canva, X, etc, are all web applications as well, and their security affects their users as well, however such large entities have their own security teams and bug bounty programs which conducts or encourages professional web application security reviews for them. Smaller organizations which you may be working for, on the other hand, often do not have the resources to conduct web application security reviews and you may be the first to do so.

**What are vulnerabilities?**

There are many sorts of flaws that can appear in any complicated system. Typically we think of these as regular bugs where the system allows its users to do less than was intended. Something like “when I click ‘add to cart,’ the website just returns an error page.” However, some flaws allow users to do more than was intended. When these flaws negatively impact the system or its other users, we consider these flaws to be vulnerabilities. Examples of vulnerabilities include flaws that would allow one user to read or modify other users’ data, take control of a website’s underlying infrastructure, deny use of a system for other users, etc. In thinking about vulnerabilities, it’s helpful to group them by type. This learning path provides an overview of common web application vulnerabilities classes and how an attacker might use them to harm a website or its users.

## Objective

Practitioners will learn the fundamental concepts of web application security, providing the background required to pursue further topics in web application security. Practitioners will be able to understand the key concepts of web application security, including:

- Infrastructure vulnerabilities
- Data validation
- Authentication
- Authorization
- Business logic vulnerabilities

## What threats does this skill mitigate or respond to?

- Web application compromise
- Web application account takeover
- Web application denial of service
- ‘Watering hole’ attacks

## What are the prerequisites?

- A basic familiarity with HTML such as the basic layout of an HTML document and the ability to read simple HTML. For a great introduction, check out [MDN](https://developer.mozilla.org/en-US/docs/Learn).
- Basic programming language concepts and the ability to read simple JavaScript. We recommend the [MDN introduction](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) to the topic.
- Basic understanding of how HTTP works, how a browser communicates with a website, and what HTTP requests and responses look like. For an introduction of those topics, we recommend [this piece](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) and [this one](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data).
- A basic understanding of SQL, just enough to know what it is and how to formulate a simple command. For an introduction, see [sqlzoo](https://sqlzoo.net/wiki/SQL_Tutorial).
- Basic familiarity with how the command line works on an operating system of your choice and how to run commands therein. For a good introduction, see [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line).
- There is one skill check exercise in the authorization subtopic which requires basic knowledge of the Python programming language (though it is very simple code which should be readable by those who command other languages, too). If you are not familiar with coding languages, you can skip that exercise.

## What devices or software do you need for the exercises?

To complete this learning path, we’ll be using a website called DVWA (Damn Vulnerable Web App). DVWA is a web application that’s intentionally vulnerable to various vulnerabilities. It requires minimal setup to use and is available online for a zero-setup experience.

There are several ways of running DVWA. The best current installation instructions can be found on the[ DVWA GitHub repository](https://github.com/digininja/DVWA). As is highlighted in the \_Warning \_section on that page, DVWA should not be installed in a way which exposes it to the open internet. Options for running it include:

- The simplest approach, if you prefer not to or cannot install DVWA locally, is to access it in the hosted instance [online at TryHackMe](https://tryhackme.com/room/dvwa). If you sign up for a free account, start a DVWA machine at the link, and then start an Attack Box, you can complete all the exercises right from your browser.
- Using a locally-hosted web server on your own machine or in a virtual machine. DVWA uses a PHP/MySQL (or MariaDB) stack thus the application can run on any device with those web services. That can be accomplished by:
  - Use a Virtual Machine to to create a Linux operating system from which to either (A) install a local webserver stack and set up DVWA as you would any PHP/MySQL application following instructions in [this video](https://youtu.be/Yzksa_WjnY0) , (B) utilize the [Linux installation script](https://github.com/digininja/DVWA?tab=readme-ov-file#automated-installation-%EF%B8%8F) provided in the repository readme, or C) if using Kali Linux, install DVWA from Kali’s source repository using _sudo apt-get install dvwa_.
    - Virtualization on x86 devices can be done with a hypervisor such as Virtualbox
    - Apple Silicon (M1/M2/M3) MacOS devices can run virtual machines using [UTM](https://mac.getutm.app/) or VMWare Fusion Player (with the [free personal use license](https://www.vmware.com/products/fusion/fusion-evaluation.html)) and the Apple Silicon Installer version of the desired operating system (for instance [Kali Linux](https://www.kali.org/get-kali/#kali-installer-images)). Use the [troubleshooting steps ](https://docs.getutm.app/guides/kali/)in the UTM Guide in case you experience a black screen issue.
    - For a guide on how to set up virtual machines, follow chapter 6 of the [Field Guide to incident response for civil society and media](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf), but download a Kali Linux imagine instead of a REMNux one (or use other tutorials written for your platform)
  - Turning your computer into a web server using [XAMPP](https://www.apachefriends.org/) (Windows or Linux) or [MAMP ](https://www.mamp.info/en/windows/)(macOS including Apple Silicon) and following the setup instructions shown in [this video](https://youtu.be/Yzksa_WjnY0).
- Alternatively, if you’re familiar with Docker or other containerization technologies, follow the [Docker instructions](https://github.com/digininja/DVWA) at the DVWA repository

Before starting any of the exercises, remember to log into DVWA (the default credentials are admin / password) and make sure that the security level is set to “Low”.

![DVWA with Low security level configuration](/media/uploads/dvwa-setting1.png)

One practice exercise requires you to install and use a tool known as rainbowcrack. Due to its high system requirements and the fact that the tool only works on Linux and Windows, we have opted to make this exercise optional. Since the main purpose of this exercise is to illustrate a security concept, learners who cannot or do not want to complete it will still be able to finish the whole learning path.

One optional exercise requires working knowledge of basic Python and a Python installation. This exercise can be skipped for learners who are not familiar with Python or who do not have it installed on their systems.

## Related learning paths

This learning path provides an internally-consistent, self-contained guide to web application security. It is meant to be read in a few short sittings, and provide you the background required to pursue deeper learning into web application security. Suggested follow-on learning paths include:

- **Web Application Security Assessment** learning path: This learning path will teach you the detailed knowledge and hands-on skills required to test a website for vulnerabilities. This is the most effective way to identify weaknesses in a web application before attackers do. This Web Application Security Fundamentals learning path will prepare you to effectively engage with the specialized knowledge required.
- **Web Application Hardening, Forensics & Incident Response** learning path: This learning path prepares you to respond to attacks against a web application. In order to prepare for and respond to attacks, you need a working knowledge of what those attacks might be. This Web Application Security Fundamentals learning path should give you just enough background to understand what information you will need to detect attacks against a website, and how to recognize and respond to attacks in progress.
