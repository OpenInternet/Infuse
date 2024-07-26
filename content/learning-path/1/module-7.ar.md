---
style: module
title: Active Investigation - Analyze malicious webpages
description: Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
  turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
  fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
  risus.
weight: 7
---

## Use Case

Phishing emails are usually just the first step in an attack. Most try to get the targeted person to visit a web page with a specific attack objective. This skill module will teach you to **look at attacker-controlled websites to understand their actions** and potentially **uncover further attacker-controlled infrastructure** or attack vectors used in the attacks. Note that websites can be extremely complicated, with behavior ranging from simple credential-stealing impersonation pages to complex attacks against the web browser or browsing device itself.

Note that interacting with malicious websites can put the analyst themself at risk. Make sure to set up and use an isolated environment ([see Subtopic 3](#subtopic-3-operational-security-safe-handling-of-links-and-infrastructure)), and to collect and safely store all web pages. Lastly, this skill intersects with and leads into the Malware Analysis learning path.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Analyze attacker-owned websites by looking at their source code using inspect features of web browsers and optionally using tools such as intercepting proxies or JavaScript debuggers
- Uncover what further infrastructure such websites could link to by looking for URLs, redirects, linked domains, and other assets or identifiers

---

## Foundation Knowledge

This will be significantly easier to practice if you know the basics of JavaScript and HTML, though those are not strictly necessary prerequisites.

It’s worth highlighting some basic differences between an email and a web page:

- Web pages can be dynamic, so the server can generate a different web page based on variables such as the requester’s IP address, browser type, time of day, and many others.
- Web browsers will process more types of HTML than email readers, with fewer protections. Most significantly, web browsers will run JavaScript, which email clients will not.
- HTML emails are generated when the mail is sent; the action is initiated by the attacker. With web pages, the action is initiated by the visitor. When you view a malicious web page, the attacker can always be aware of your actions. While mechanisms such as VPNs or Tor could prevent the webpage administrator from viewing your IP address, the site itself could contain referrers linked to the phishing email or be custom to each recipient. That way, the attacker will know with a high degree of certainty that only those who had access to the phishing email would visit the webpage.

Because of this, we recommend only analyzing web pages in a safe environment specifically designed for opening potentially suspicious files, such as a virtual machine or a sandbox. In addition, discuss the threat model specific to the recipient of the email to ensure it is safe for them for you to conduct further analysis activity which could be visible to the attacker.

## Case studies

Read through two case studies which analyze phishing attacks that targeted civil society groups. Both of those attacks were partially successful:

- Human Rights Watch: [Iran: State-Backed Hacking of Activists, Journalists, Politicians](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) (The introductory section is useful context on attacker tactics and motivations; however, focus on the _Technical Analysis of the Phishing Campaign_ section for learning purposes.
- Bellingcat: [Guccifer Rising? Months-Long Phishing Campaign on ProtonMail Targets Dozens of Russia-Focused Journalists and NGOs](https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/)

Focusing on the[ HRW case study](https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians) above, note some key features of analysis used in each investigation. Some of these require technical skills to complete, while others require research, critical thinking, and interpersonal skills. Some of the methods identified in the case study include:

- The attackers used an URL shortener service. This is common for legitimate and non-legitimate emails alike. You should be able to recognize URL shorteners and know how to expand these URLs where possible (for instance by using the shortener’s inbuilt mechanism such as adding a + to the end of the URL, or by using an expander tool like [Urlex](https://urlex.org/)) or track stages of HTTP redirects. Notably the attacker created their own URL shortener service in this case which impersonated (through a small typing change in the domain) another known URL shortener.
- Multiple domains were registered which were intended to confuse the target (e.g. sharefilesonline[.]live, which plays on Microsoft’s product names SharePoint and Live.com.
- Unique links sent to individual targets with a five-character identifier (this could be achieved by any unique string in an URL, usually within the URL path or passed in a parameter for instance after a ‘?’).
- By using brute force to try out all possible five character identifiers and URL combinations, the analysts were able to discover several other landing pages used by the phishing campaign. They impersonated popular email providers and used a phishing kit which allows for MFA bypass techniques.
- The analysts reached out to others who might have been targeted by the same campaign to further share threat intelligence and better understand the adversary’s techniques.
- Attackers used tactics such as accessing data and using [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) (a tool which allows users to download all of the data on their Google account).
- The authors of the report looked into the targeted persons’ Google Takeout history and other logs. This helped reveal post-compromise activity, the names of attacker devices, and IP addresses of the attacker's connections.
- The authors also flagged up other research and attribution work they conducted:
  - They referred to research from threat intelligence groups on advanced persistent threat (APT) groups (see and bookmark this crowdsourced [APT Group and Operations](https://docs.google.com/spreadsheets/d/1H9_xaxQHpWaa4O_Son4Gx0YOIzlcBWMsdvePFX68EKU/htmlview#) Google Sheet).
  - They reviewed source code to identify re-used or similar code blocks across previously researched threats.
  - They wrote about other attacker tactics such as impersonating conference/summit organizers or NGO key figures.
- Finally, the report also shares out technical indicators of compromise.

## Automated sandboxed inspection of a website

The first step when you are ready to inspect a website linked to from a phishing message may be to safely look at the website. This entails some degree of interaction with the website. For direct handling of a potentially malicious website, you should have implemented precautions to give yourself a safe working environment, as covered in [Subtopic 3](#subtopic-3-operational-security-safe-handling-of-links-and-infrastructure). However you can also use online tools to inspect a website in a safe remote sandbox:

- 🧰 Tools such as[ UrlScan](https://urlscan.io/) allow the performance of a scan of an URL. Note some of the key features needed to interpret the results:

  - When you run a scan, choose either Public, Unlisted, or Private. Read their [explanation ](https://urlscan.io/docs/api/)of the difference, but know that a Public scan (the default option) will list the URL on their front page.
  - Live image of the website (this may be the first step of simple triage if the threat model allows you to initiate this scan)
  - Domain and IP information
  - Resources loaded including scripts and AJAX (HTTP tab)
  - Dynamic elements, cookies, variables (Behavior tab)
  - Redirects (if any)
  - Indicators such as domains, IPs, strings, hashes (Indicators tab)
    - A hash is like a short fingerprint of a file—it can be used to identify a unique file without revealing its contents. You can calculate a hash by using [the command line on Windows, macOS, and Linux](https://techdocs.akamai.com/download-ctr/docs/verify-checksum).
  - Content such as forms (Content tab)
  - Technologies used (such as a CMS)
  - Verdicts (in case others have flagged the URL as malicious)
  - Lookup button to check site in other analysis engines \

- 🧰 [Hybrid Analysis](https://www.hybrid-analysis.com/) is a hosted sandbox which can load a web page within a test environment and match website behavior against various heuristics of malicious activity and checking internal indicators against known threats. Note some of the key features and the skills needed to interpret the results:
  - After submitting an URL, select the environment to be used as a sandbox. In case you select ‘Quick Scan’, a full sandbox execution will not take place, but rather a smaller set of static analysis and indicator checks.
- [VirusTotal ](https://www.virustotal.com/)can also check an URL for malicious content using . Note that Hybrid Analysis includes VirusTotal lookups and considers a broader range of issues in determining its rating.

Note that a sophisticated web application could detect that a request comes from the IP ranges of these tools and serve different data or no data to the request, while delivering malicious content to other IPs.

## Manual and specific tools for inspection of a website

One of the easiest ways in which we could analyze a website is by [using our web browser’s built-in inspection tool](https://blog.hubspot.com/website/how-to-inspect), which usually breaks the website down into different sub-parts, can sometimes illustrate what code the website requests from which server, and allows us to modify the site’s code and see how this changes the layout and functionality.

## Brute force

As in the Human Rights Watch report linked above, using programmatic approaches to brute forcing URLs is a commonly used technique during OSINT. Several tools and approaches can be learned:

- OWASP [DirBuster](https://gitlab.com/kalilinux/packages/dirbuster)
- Wordlist Generators: Often used for password cracking, wordlists are also used for brute forcing discovery of folders and sub-domains. These wordlists will work in conjunction with the tools listed in the previous point. See tools such as Crunch ([Tutorial 1](https://www.hackers-arise.com/post/creating-a-custom-wordlist-with-crunch) | [Tutorial 2](https://null-byte.wonderhowto.com/how-to/tutorial-create-wordlists-with-crunch-0165931/))

## Phishing kit analysis

Most attacks you will encounter will use a pre-made or modified phishing kit, a collection of code and templates that allow attackers to easily build a convincing phishing website. Some phishing kits have tell-tale signs; many of them, for example, use certain mechanisms to avoid being [detected and indexed by search engines](https://arxiv.org/pdf/2210.08273.pdf). They might even refuse to load from [the IP addresses of search engines or security companies](https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html).

Some phishing kits also have the ability to bypass multi-factor authentication, for example by capturing a code that a targeted person typed in and immediately using it to log on to the real web page on their behalf. [This article is a great write-up](https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/) on how an open source phishing kit used by security teams who test out security mechanisms can capture and use two-factor authentication data (and what could be done to prevent this). You can also [check out another writeup of a phishing kit](https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/) (this kit was written by cybercriminals rather than security researchers), which used some MFA bypass and fascinating techniques to frustrate detection.

## Learning Resources

{{% resource title="Iran: State-Backed Hacking of Activists, Journalists, Politicians" languages="English" cost="Free" description="A good write-up and analysis of a highly sophisticated phishing campaign which targeted civil society groups. Includes extensive discussions on infrastructure and attribution." url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}

{{% resource title="Guccifer Rising? Months-Long Phishing Campaign on ProtonMail Targets Dozens of Russia-Focused Journalists and NGOs" languages="English" cost="Free" description="A write-up of an earlier phishing campaign which specifically targeted civil groups working on Russia. The attack itself included an MFA bypass." url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}

{{% resource title="UrlScan" languages="English" cost="Free, with additional premium features" description="A tool where you input a URL and which analyzes the resulting website, looking out for malware or other suspicious behavior." url="https://urlscan.io/" %}}

{{% resource title="Hybrid Analysis" languages="English" cost="Free" description="A tool which can scan files and links for malicious content or behavior. In contrast to UrlScan, it can also open up malware samples or executable files." url="https://www.hybrid-analysis.com/" %}}

{{% resource title="Learn JavaScript" languages="English" cost="Free" description="In addition to HTML, most web pages use JavaScript. Although you don’t need to be an expert, learning some JavaScript is important to understand what websites are doing." url="https://www.codecademy.com/learn/introduction-to-javascript" %}}

{{% resource title="How to use Inspect Element in Chrome, Safari, and Firefox" languages="English" cost="Free" description="Every major web browser now contains an inspect element feature, which allows you to carefully study and modify the code components which make up a web page. This article provides a brief overview of that feature and shows how to activate it on major browsers." url="https://blog.hubspot.com/website/how-to-inspect" %}}

{{% resource title="Example analyses of malicious websites" languages="English" cost="Free" description="A good guide on how to do some initial analysis and triage on a website to figure out whether it is malicious and has been labeled by others as such." url="https://infosecwriteups.com/analyzing-a-malicious-site-9fb8730be51b" additional_urls="https://www.linkedin.com/pulse/security-analyst-skills-pt-2-techniques-analyzing-web-craig-smith" %}}

{{% resource title="Classification of Web Phishing Kits for early detection by platform providers" languages="English" cost="Free" description="An academic paper which looks at phishing kits, what mechanisms some of them use, and how we can use tools such as machine learning to detect them." url="https://arxiv.org/pdf/2210.08273.pdf" %}}

{{% resource title="Protecting Phishing Pages via .htaccess" languages="English" cost="Free" description="There are many ways in which phishing pages can try to avoid detection. One of them is to use .htaccess, a file containing instructions for web servers, to include or exclude specific IP ranges." url="https://blog.sucuri.net/2017/07/protecting-phishing-pages-via-htaccess.html" %}}

{{% resource title="StalkPhish" languages="English" cost="Free" description="A tool designed to automate the discovery and identification of phishing kits." url="https://github.com/t4d/StalkPhish" %}}

{{% resource title="Bypassing MFA: A Forensic Look At Evilginx2 Phishing Kit" languages="English" cost="Free" description="This article looks at a phishing kit which has found a way to bypass some forms of MFA and provides a basic analysis of how it does that and what mitigations we could take." url="https://www.aon.com/cyber-solutions/aon_cyber_labs/bypassing-mfa-a-forensic-look-at-evilginx2-phishing-kit/" %}}

{{% resource title="W3LL phishing kit hijacks thousands of Microsoft 365 accounts, bypasses MFA" languages="English" cost="Free" description="This piece analyzes a phishing kit designed and sold by cybercriminals, which contains multiple mechanisms which frustrate analysis and also uses MFA bypass techniques." url="https://www.bleepingcomputer.com/news/security/w3ll-phishing-kit-hijacks-thousands-of-microsoft-365-accounts-bypasses-mfa/" %}}

## Practice

- [Read through](https://www.linkedin.com/pulse/security-analyst-skills-pt-1-qualifying-domains-craig-smith) the following article, which shows you how to use urlscan.io to analyze a page. Conduct the same searches and analyses as the article, and consider how the author came to the conclusions he did.
- [Peruse a second analysis](https://www.linkedin.com/pulse/security-analyst-skills-pt-2-techniques-analyzing-web-craig-smith) by the same author. Follow the links he gave to VirusTotal, UrlScan, and Hybrid Analysis, and see if you understand how he reached the conclusions he did.

## Skill Check

Complete this room by TryHackMe: [Walking An Application](https://tryhackme.com/room/walkinganapplication)

- Check out [task two](https://tryhackme.com/room/activerecon) in this TryHackMe room
- Analyze a malicious website (for example, a domain listed on [PhishTank](https://phishtank.org/)) by using a mix of passive and active analysis, making sure to do the active analysis in a sandbox or using a tool such as UrlScan. Answer the following questions about the site and discuss your answers to the above questions with a peer or a mentor:
  - Who owns the infrastructure that’s serving the website?
  - What other domains does this side load or link to? What do they do?
  - When was this domain registered?
  - (optional) What software is being used to serve the site?
  - Have others listed the site as malicious?
