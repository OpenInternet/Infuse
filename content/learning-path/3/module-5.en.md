+++
style = "module"
weight = 5
title = "Creating and sharing IoCs"
description = "We look at how you can create and share Indicators of Compromise (IoCs) and tell others in the community about the malware you found or analyzed"
+++

## Use Case

Once you have analyzed a piece of malware, you can help the community (and also yourself and the rest of the world) by sharing your findings. Novel malware is reasonably rare, and once used, it tends to be re-used extensively. By sharing your findings, you can help everyone in several ways:

- If a member of the community has been targeted by a threat actor, it’s quite possible that the threat actor is targeting other members of the community. By sharing your findings, you can help raise awareness and hopefully help digital defenders prevent or mitigate other attacks.
- Analyzing a novel piece of malware is a significant achievement. You should be proud of it and also be rewarded for your efforts. By sharing your process and findings, you are more likely to be recognized for your expertise, increasing your opportunities for interesting work and collaboration in the field.
- Finally, by creating and sharing IoCs, you can help automatic detection of the malware in question. If makers of detection and prevention software integrate those IoCs into their databases, that renders the malware significantly less useful to threat actors and enhances the security of people all over the world.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand different types of IoCs and how to share them
- Understand YARA and Snort rules
- Create and share out a brief report on malware they found

---
## Main Section
### IoC Types

We can break IoCs down broadly into human-readable and machine-readable. Machine-readable IoCs can be anything that a computer could use to detect malware, and there are many formats that attempt to richly represent the complexity of malware behavior. However, there are several simple formats that are easy to create and use and which are quite popular:

- MD5 or SHA hashes of malware files
- YARA rules identifying malware files. YARA rules identify specific binary sequences or strings within a file
- Server specifications (IP addresses or host names, with or without port numbers, URLs, etc.) for identifying malware’s network traffic
- Snort rules for identifying malware’s network traffic

File hashes and server specifications are the simplest to create and use. However, sometimes the additional complexity of YARA or Snort rules are required to identify malware. For example, malware might communicate to its C&C server on any host and port, but sends a specific message to the server; for that, you need something like a Snort rule. Likewise, a malware file might contain different content with every infection but always contain a specific unique string. For that, you need something like a YARA rule.

Human-readable IoCs are descriptions of things that the malware does that are useful for people investigating a possible compromise, but less so for computers. These take the form of narrative descriptions of the malware’s activities. These have the advantage of usually being easier to create and understand, and can be turned into machine-readable IoCs for a variety of detection systems.

A good malware analysis report will generally contain a human readable description of the malware and its capabilities, along with some machine-readable IoCs in an appendix. This ensures that the report is useful to the widest audience.

*Creating IoCs*

A good IoC will minimize both false positives and false negatives. Especially since malware is hopefully rare on most systems, detecting good files as malicious (false positives) can create a false sense of risk and lead to the deletion of legitimate files. Similarly, an IoC that fails to detect a significant portion of that malware (false negatives) can be dangerous, luring defenders into a false sense of security.

With that in mind, let’s go through some of the common IoC simple formats.

#### File Hashes

File hashes are among the simplest IoCs. You compute a [cryptographic hash](https://www.sentinelone.com/cybersecurity-101/hashing/) (or two) of a file that is unique to the malware, and that’s it. Conventionally, MD5 and SHA256 hashes are provided. Although there are numerous weaknesses with MD5, they are generally not significant in the context of IoCs. The main downsides to file hashes is that any change to the file will allow malware to bypass IoC based detection. It is trivial in most cases to just append a byte to the file, causing a completely different hash. However, file hashes continue to be surprisingly effective in detecting malware.

#### YARA Rules

A step up in complexity from file hashes is YARA rules. YARA rules package together information about the malware, a list of binary sequences or strings in the file and rules about which strings/sequences need to be in the file (e.g. string 1 or string 2, and also string 3). YARA keeps a good balance between simplicity and flexibility. For more information on YARA, see [the official website](https://virustotal.github.io/yara/), and also [this blog post walking through creating YARA rules for a malware file](https://medium.com/@laroshkhanpk/threat-hunting-101-hunting-with-yara-rules-82aff0898674).

One thing to bear in mind when working with YARA is to be sure that your rule is free of false positives. For example, a rule matching “This program cannot be run in DOS mode” would match every executable in a Windows system. After you create your YARA rules for some malware, it’s a good idea to run them against a couple of (hopefully) non-infected systems to make sure they don’t identify non-malicious files. There are tools to help create YARA rules, for example [yarGen](https://github.com/Neo23x0/yarGen) will analyze a malware file and create a starting point for a YARA rule that doesn’t include known-good strings. Be sure to read the README and attached blog posts before using the tool.

#### Server Identifiers

Often malware will contact a remote command and control server to receive instructions, download later malware stages, etc. If it’s possible to predict what servers the malware will contact (for example, it’s coded into the binary), then it’s possible to create IoCs that identify malicious network traffic. Some examples might be:

- The IP address of a server or of some servers
- One or more server hostnames
- Port numbers that the malware uses when connecting to the server (eight by themselves or in conjunction with IP addresses or host names)
- URLs or URL fragments that the malware requests

Server identifiers are similar to file hashes in that they’re quite simple but also quite brittle. However, like file hashes, they’re also surprisingly effective.

#### Snort Rules

If server identifiers are like file hashes for network traffic, then Snort rules are like YARA rules for traffic. Snort is an open-source intrusion detection system, and has a mature and widely used rules engine. Snort rules are more complicated than YARA rules, but are still fairly manageable. [The official documentation](https://docs.snort.org/start/rules) can be fairly daunting, but most rules are fairly simple. [This page](https://www.sapphire.net/security/snort-rules-examples/) describes the structure of Snort rules and provides some simple examples. Finally, [here’s a set of Snort rules](https://github.com/abhinavbom/Snort-Rules/blob/master/malware.rules) for some real malware.

As with YARA rules, it can be quite easy to accidentally create false positives. Consider capturing a few days worth of your network traffic and running any Snort rules you create against those packet captures.

### Choosing appropriate IoCs

When thinking about creating IoCs, you want to consider what’s intrinsic to the malware in general, versus what’s specific to the sample that you analyzed. Here are a few examples:

- If the stage 1 of the malware is a PDF that contains personalized content for the victim but then also an exploit that downloads and installs a second stage, then it would be inappropriate to use a file hash of the PDF. Instead, you’d want to create a YARA rule that identifies the exploit code in the PDF.
- If a piece of malware re-uses parts of some existing, well-known malware but then also has a novel component, you’d want to create your IoCs including the new component. This will prevent misclassification.
- If the malware ships with a configuration setting for what server it connects to, it would be inappropriate to create an IoC using that server, as different campaigns will likely use different servers.
- If the malware’s C&C server is identified by hostname in the malware, then creating a network detection rule based on an IP address would lead to both false positives and false negatives. Instead, the network rule should use the hostname.

### Creating a Report

At this point, you should know how you acquired the malware, what it does, and how to detect it. [This article](https://zeltser.com/malware-analysis-report/) breaks down some of the things that a great malware analysis report should contain, and [this blog post by a SANS instructor](https://www.sans.org/blog/writing-malware-reports/) provides some advice for the overall report. Also, it’s great to explain your thought process in narrative sections. This can both be both educational for folks getting started in malware analysis, and also help more experienced malware investigators help you in case you missed something.

Attributing malware to a particular threat actor is a popular activity among malware analysts. However, it is difficult to get accurate results. Don’t feel as if you need to perform attribution if you’re not sure, the most important thing is publishing IoCs.

In the Detecting, Investigating and Tracking Malicious Infrastructure learning path, we’ve also[ created a section on write-ups and reports](https://docs.google.com/document/d/1Qhka7uQYCBye-EQRQrrETo-ptik2yDAGDZg5DrncYF4/edit) that could be of help.

The following public blog posts might give you some inspiration for your own reports. All of them use different tones and formats but all also contain IoCs.

- [Amnesty Tech's IoCs for novel Android malware](https://github.com/AmnestyTech/investigations/tree/master/2023-03-29_android_campaign)
- [Citizen Lab's post on QuaDream’s Exploits](https://citizenlab.ca/2023/04/spyware-vendor-quadream-exploits-victims-customers/)
- [Human Rights Watch's investigation report of a phishing campaign](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians)
- [Bellingcat's investigation into a phishing campaign targeting ProtonMail users](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/)
- [EFF's report on a new Bandook version](https://www.eff.org/deeplinks/2023/02/uncle-sow-dark-caracal-latin-america)
- [Analysis of the MirageFox ransomware](https://github.com/saasthavasan/Malware-Analysis-Reports/tree/master/MirageFox/Report)
- [Analysis of the Windows data stealer called Krown](https://github.com/albertzsigovits/malware-notes/tree/master/Stealer-Windows-Krown)

### Sharing the Report

Once you’ve created a report, there are a few things you can do with it:

- Share it with your fellow civil society digital defenders
- Publish it to the world
- Share malware samples with anti-malware companies

You can do any, all, or even none of these things. If you were working with a client whose device was compromised, you will of course need to ensure that they’re comfortable with you sharing the report. It is best to get their approval in writing.

If you are a member of an organization like [CiviCERT](https://www.civicert.org/), that’s a great place to share your findings. The other members are likely to read your report, provide feedback, and take action on it.

You can also publish your findings on your blog or somewhere like GitHub. This requires little effort, but also can be limited in its impact. However, your report may be invaluable to someone who searches the internet for a file’s SHA hash or a server identifier.

Lastly, if you have malware samples, you can submit them to the major antivirus companies. They are unlikely to read a report, but they may analyze the malware and include signatures in their product. For more information on submitting malware, [this page provides links to the submission information for various companies](https://www.thewindowsclub.com/malware-submission-where-to-submit-malware-and-suspicious-files-to-microsoft).

## Practice

Answer question 7.3 and complete exercise 7.3 from [the field guide to incident response](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).

## Skill Check

Discuss with your mentor or peer how you would handle each of those IP addresses in your malware reports. Do some of them make for better IoCs than others?

- An IP address on Amazon Web Services hosting malware
- An IP address of a Tor exit node
- A residential IP address probing a website for vulnerabilities
- An IP address on a content-delivery network (CDN), such as Cloudflare

## Learning Resources

{{% resource title="What is hashing and how does it work?" languages="English" cost="Free" description="Introduction to file hashes and their role in malware detection." url="https://www.sentinelone.com/cybersecurity-101/hashing/" %}}

{{% resource title="YARA" languages="English" cost="Free" description="Official homepage of YARA, used for pattern matching in malware research." url="https://virustotal.github.io/yara/" %}}

{{% resource title="Threat hunting 101 with Yara rules" languages="English" cost="Free" description="Using YARA rules to detect malicious files." url="https://medium.com/@laroshkhanpk/threat-hunting-101-hunting-with-yara-rules-82aff0898674" %}}

{{% resource title="yarGen" languages="English" cost="Free" description="Tool to automate string generation for YARA rules." url="https://github.com/Neo23x0/yarGen" %}}

{{% resource title="Snort rules" languages="English" cost="Free" description="Introduction to Snort rules for network intrusion detection." url="https://docs.snort.org/start/rules" %}}

{{% resource title="Snort rules examples and usage" languages="English" cost="Free" description="Examples of Snort rules for beginners." url="https://www.sapphire.net/security/snort-rules-examples/" %}}

{{% resource title="What to include in a malware analysis report" languages="English" cost="Free" description="Guide on essential elements for a malware analysis report." url="https://zeltser.com/malware-analysis-report/" %}}

{{% resource title="Writing malware reports" languages="English" cost="Free" description="Guide on best practices for writing malware reports." url="https://www.sans.org/blog/writing-malware-reports/" %}}
