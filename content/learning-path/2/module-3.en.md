---
style: module
title: How malware works and different types of malware
description: Viruses, spyware, backdoors, ransomware, and adware all behave
  differently. Here, we study different types of malware and understand how
  infections begin
weight: 3
---

## Use Case

In order to start working with malware, we first need to learn about its different types. Viruses, spyware, backdoors, ransomware, and adware behave differently and are inspired by different motivations. This knowledge will help the protector to classify the type of malware detected.

## Objectives

After completing this subtopic, the practitioner should be able to do the following:

- Differentiate between various types of malware
- Understand what malware can do
- Understand how malware infections begin
- Explain what indicators of compromise are

---
## Main Section
In general, malware is any software that is used to do unauthorized things on a user’s computer or mobile device. Wikipedia has a good [introduction to malware in general.](https://en.wikipedia.org/wiki/Malware)

### What does malware do?

Malware can do anything that any software can do, but there are several common capabilities that exist in malware. While some malware is single-purpose, other malware will have multiple capabilities. Frequently-used capabilities include:

- Wiping or encrypting data (ransomware). Often run by financially motivated attackers. This malware will take over the targeted person’s computer and deny them access to their data until a ransom is paid.
- Stealing data. Malware can selectively or indiscriminately send data from the targeted person’s device to a computer controlled by the attacker. This is used on its own or in conjunction with ransomware.
- Unauthorized use of resources. Financially motivated attackers will frequently use collections of compromised computers to perform actions, such as mining cryptocurrency, sending spam, or performing denial of service attacks.
- Hijacking a user’s web browser. Some malware can insert ads into web pages while a user browses the web, collecting ad revenue. Others can steal passwords or session cookies (the cookie that authenticates you when you are logged in to your account), allowing attackers to access the targeted person’s accounts on websites. Some malware stealers will exfiltrate passwords, cookies, and other types of sensitive data from a device and then delete themselves, attempting to erase any traces of the infection.
- Collecting user activity. More sophisticated malware will try to capture activities of the targeted person, such as recording video or audio, capturing the user’s typing, recording a mobile device’s location, etc. This is often used for espionage/surveillance or extortion.
- Interactive or semi-interactive control. More sophisticated malware will have general purpose capabilities that allow the attacker to use the targeted person’s device for unscripted activities. An attacker can send general commands via a command-and-control server or direct connection, and the malware will run the commands on the targeted person’s device and return the results to the attacker. This is often used on high-value targets or to launch further attacks inside a network.

This list above is not exhaustive, but outlines the most common malware capabilities. For a great overview of key malware which was discovered in the previous year, check out Patrick Wardle’s blogpost on [The Mac Malware of 2023](https://objective-see.org/blog/blog_0x77.html). While this post describes many concepts we will cover later on throughout this learning path (such as VirusTotal scans), it’s a fantastic introduction and overview to the world of malware.

Perhaps one of the most notoriously capable pieces of malware is the NSO Group Pegasus package, which is purpose-built for covert surveillance. Its capabilities are listed in this [sales document from the NSO Group](https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html).

We highly recommend reading [Chapter 5](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) of the Field Guide to incident response for civil society and media for thematically relevant overview of malware and related concepts, including:

- Code obfuscation
- Types of malware
- Persistence
- Infection chains
- Command and control communication
- Antivirus programs
- Vulnerabilities and exploits

### How do targeted devices get infected?

Malware has to get on a targeted person’s device somehow. The methods to do this range from users being tricked into running malicious software to exploitation of vulnerable software and services, including true 0-click attacks.

#### Methods of infecting Windows, macOS, and Linux

1. Directly running (executing) malicious programs received via social engineering attacks
   1. Phishing via email, SMS, WhatsApp, etc.
   2. Malware disguised as legitimate software, such as pirated software
   3. Malware copied from USB sticks, etc
2. Documents that have malware embedded in them, most frequently legacy Microsoft Office documents, but also such formats as PDFs, web pages, etc.
3. Documents and web pages that exploit bugs in software to install malware. These circumvent the security controls built into applications and the operating system
4. [“Zero-click” attacks](https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html) (Free, English) that don’t require any user interaction at all, but allow the attacker to directly attack an application or operating system. They affect both desktop and mobile operating systems.

Once the initial compromise is made, most malware will go through [multiple stages of infection](https://community.fireeye.com/s/article/000002205) (Free, English).

#### Methods of infecting iOS and Android

Mobile operating systems have a slightly different architecture from desktop ones. They are usually more locked down and restrict what code can be run on them. This means that malware, too, has slightly different infection paths and methods. Check out the [smartphone systems architecture](https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture) section of the Mobile Forensics Guide for a good overview.

Standard iOS and Android configurations only allow the user to run software downloaded from the official app stores. Malware for those platforms is either installed through such an app store (which means that it was not discovered during Apple’s or Google’s security audits) or by exploiting holes in iOS and Android which stop unauthorized code from running. Alternatively, some malware authors also use social engineering to convince targeted persons to install malicious profiles or other device configurations.

### Persistence

Much of the malware you encounter in your work will be persistent, or able to start running automatically every time the targeted person logs in or restarts their system. Each operating system has mechanisms which automatically run certain software at login, at scheduled times, or when something happens (for example, when a new network connection is made or a program is launched).

Malware can use a wide array of persistence techniques; some of them are reasonably simple (such as adding itself to the list of programs which run automatically at login), with others far more complex and taking advantage of specialized operating system features. If you want to learn more about those, check out [this deep dive into the topic](https://github.com/Karneades/malware-persistence/blob/master/README.md) and [this advanced and comprehensive list](https://github.com/Karneades/awesome-malware-persistence) of persistence techniques. Many of those techniques include advanced analysis that goes slightly outside of the scope of this learning path; at the same time, it’s a good idea for you to have a general idea of what persistence is and which mechanisms it could use.

Some malware will not aim for persistence. Instead it will run, extract data, and then disappear following a logout or a restart. If attackers want to use the malware’s capabilities again, they simply re-install it on the targeted person’s system. While this can limit the period for which the malware is active on a system and therefore the data it collects, it also makes the malware more difficult to detect, since it leaves fewer traces on a system.

### Indicators of Compromise

In the process of being installed and performing malicious activities, malware leaves IoCs, or Indicators of Compromise. These are frequently used to identify particular pieces of malware. IoCs could include cryptographic hashes (we cover them later on this learning path) which represent specific executable files, but they can also be connections to network services or particular network traffic, patterns of execution, etc.

For a short summary of what IoCs are and how they could look like, [check out pp. 37-40](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) (from indicators of compromise to defanging) of the Field Guide to Incident Response for Civil Society and Media.

For a long discussion on IoCs and their uses in incident response, see [this webinar by CISA](https://www.youtube.com/watch?v=zs-AEaSd2vk) (English, 46 minutes).

Check out the IoCs outlined on page 52 [of this Amnesty Report](https://www.amnesty.org/en/documents/act10/7245/2023/en/) into a piece of powerful commercial spyware: they mostly consist of the names of domains which were used as infrastructure during this malware campaign. After you’ve done that, take a look at [this page](https://github.com/AmnestyTech/investigations), which collects IoCs from various investigations Amnesty Tech conducted.

There are many different ways to spot indicators of compromise. They include looking through network logs to see if any device tried to contact a specific domain, and checking if any files on a device match certain hashes. If you would like to learn a little more about them, we recommend checking out those articles by [Microsoft](https://www.microsoft.com/en-us/security/business/security-101/what-are-indicators-of-compromise-ioc) and [Fortinet](https://www.fortinet.com/resources/cyberglossary/indicators-of-compromise).

### Known versus unknown malware

The vast majority of malware infections you will encounter in your career will have been caused by malware that the community knows about. This means that somebody else has already found this malware and shared the IoCs or samples thereof with malware scanning engines. Still, cybercriminals continue to write new malware and adapt existing programs. There is therefore always a small chance that the devices you’re investigating have been infected with malware which has not yet been documented. If you worry that this might be the case, we recommend checking out the Malware Analysis Learning Path, which guides you on how to analyze unknown samples to figure out whether they are malicious.

Not all malware that has been recognized has been extensively documented, either. Many of the samples that can be found on websites like MalwareBazaar might have IoCs associated with them and are known to be malicious, but analysts might not have written up what exactly such malware does. If you find a sample that others flagged up as malicious but which is nonetheless under-documented and you would like to learn more about how it functions and what it does, follow some of the guides on the analysis learning path.

## Practice

Take a moment to look through Malware Bazaar’s list of [recently submitted malware](https://bazaar.abuse.ch/browse/). Read through the descriptions and comments of several malware samples and note what form they take, which delivery mechanism they use, and the like. Some of the malware samples have comments attached to them; check those out as well. Note that not all malware samples will contain details such as IoCs or delivery mechanisms.

Do note that Malware Bazaar also contains some details such as hashes which are only covered in later phases of this learning path.

Do not download any samples at this moment. Simply glancing at the sample descriptions is sufficient at this stage.

## Skill Check

Working with a peer or mentor, find two or three reports describing malware infections for a platform of your choice. Make sure that those reports include IoCs. If you cannot find any reports, you can just read through one of those:

- [HotRat: The Risks of Illegal Software Downloads and Hidden AutoHotkey Script Within](https://decoded.avast.io/martinchlumecky/hotrat-the-risks-of-illegal-software-downloads-and-hidden-autohotkey-script-within/)
- [Earth Preta Spear-Phishing Governments Worldwide](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html)
- [New SugarGh0st RAT targets Uzbekistan government and South Korea](https://blog.talosintelligence.com/new-sugargh0st-rat/)
- (this is a long one, only peruse if you feel particularly ambitious) [Amnesty Tech report on Predator](https://www.amnesty.org/en/documents/act10/7245/2023/en/)

Answer the following questions for one of those reports:

- What does this malware do?
- How does still malware get on a system? Does it exploit an existing bug to be installed? Does it require user intervention to install?
- What are the IoCs for this malware? What steps could we take to spot those IoCs on an infected system or network?

Discuss your answers to all those questions with your peer or mentor.

## Learning Resources

{{% resource title="Malware chapter on Field Guide for Threat Labs (Chapter 5)" languages="English" cost="Free" description="Good introduction to malware from the perspective of a digital protector needing to understand" url="https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/" %}}

{{% resource title="Malware - Wikipedia" languages="multiple" cost="Free" description="A good fundamental introduction to the topic which explains some of the basic and moderately advanced concepts needed" url="https://en.wikipedia.org/wiki/Malware" %}}

{{% resource title="The Mac Malware of 2023" languages="English" cost="Free" description="An important overview of macOS malware spotted in 2023. Includes types of malware, infection vectors, persistence mechanisms, and goals." url="https://objective-see.org/blog/blog_0x77.html" %}}

{{% resource title="Pegasus sales document from the NSO group" languages="English" cost="Free" description="This leaked document describes some of the capabilities of Pegasus, a piece of spyware that targets human rights activists among others. It gives a good introduction to how spyware is sold and marketed." url="https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html" %}}

{{% resource title="Zero click attacks explained" languages="English" cost="Free" description="Describes what a zero-click attack is, why attackers might be so interested in using them, and why they are so dangerous." url="https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html" %}}

{{% resource title="Understanding indicators of compromise for incident response" languages="English" cost="Free" description="A video by the US CISA that gives a good overview and introduction to IoCs and how they could be used by incident responders." url="https://www.youtube.com/watch?v=zs-AEaSd2vk" %}}

{{% resource title="Guide to Malware Incident Prevention and Handling for Desktops and Laptops" languages="English" cost="Free" description="An older (2013) guide by the US NIST which comprehensively covers the topic." url="https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-83r1.pdf" %}}

{{% resource title="Smartphone systems architecture" languages="English" cost="Free" description="A look at how mobile operating systems function and how malware can spread on them." url="https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture" %}}

{{% resource title="The Predator Files" languages="English" cost="Free" description="A malware investigation conducted by Amnesty Tech; includes lists of IoCs on page 52." url="https://www.amnesty.org/en/documents/act10/7245/2023/en/" %}}

{{% resource title="Indicators from Amnesty International's investigations" languages="None (dataset)" cost="Free" description="A list of IoCs which Amnesty collected in the course of its investigations." url="https://github.com/AmnestyTech/investigations" %}}

{{% resource title="Microsoft Security: Indicators of compromise explained" languages="English" cost="Free" description="A summary of what IoCs are and which forms they could take." url="https://www.microsoft.com/en-us/security/business/security-101/what-are-indicators-of-compromise-ioc" %}}

{{% resource title="Fortinet glossary: Indicators of compromise" languages="English" cost="Free" description="One more, very useful, summary of IoCs." url="https://www.fortinet.com/resources/cyberglossary/indicators-of-compromise" %}}

{{% resource title="Linux Detection Engineering -  A primer on persistence mechanisms" languages="English" cost="Free" description="A walkthrough on how threat actors establish persistence on Linux systems and how to hunt for these techniques." url="https://www.elastic.co/security-labs/primer-on-persistence-mechanisms" %}}
