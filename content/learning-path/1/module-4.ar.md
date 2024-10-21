---
style: module
title: "Passive Investigation - Analyze URLs, hostnames, and IP addresses"
description: "يمكن للممارس استخدام المهارات الموضحة في هذا الموضوع الفرعي لبدء فحص غير نشط ضد الخوادم على الإنترنت. الفحص غير النشط هو فحص لا يقوم بتحميل أي مواقع ويب ولكنه يبحث فقط عن البيانات المتاحة للعامة عليها، وبالتالي لن يتم تنبيه المهاجم إلى أن موقعه على الويب تلقى زيارات إضافية مما قد ينبهه إلى وجود فحص جارٍ.  من خلال تقييم معلومات النطاق والملكية الفكرية، يمكن للمحقق العمل على توليد معلومات تقنية غنية حول الهجوم مفيدة لتثقيف المجتمع، ومشاركة معلومات التهديد، واكتشاف البنية التحتية للمهاجمين المرتبطين، ووضع الهجمات في سياق أنماط هجوم أوسع. 
قد تكون بعض هذه المهارات ضرورية كجزء ضمن عملية التصنيف الأولية، على سبيل المثال لمساعدة المحلل على تحديد ما إذا كان الرابط مشبوهًا، وسيثبت أنها مفيدة للغاية أثناء التحليل المتعمق لرؤوس البريد الإلكتروني الموضحة في القسم التالي."
weight: 4
---

## حالة استخدام

يمكن للممارس استخدام المهارات الموضحة في هذا الموضوع الفرعي **لبدء فحص غير نشط ضد الخوادم على الإنترنت**. الفحص غير النشط هو فحص لا يقوم بتحميل أي مواقع ويب ولكنه يبحث فقط عن البيانات المتاحة للعامة عليها، وبالتالي لن يتم تنبيه المهاجم إلى أن موقعه على الويب تلقى زيارات إضافية مما قد ينبهه إلى وجود فحص جارٍ.  من خلال تقييم معلومات النطاق والملكية الفكرية، يمكن للمحقق العمل على توليد معلومات تقنية غنية حول الهجوم مفيدة لتثقيف المجتمع، ومشاركة معلومات التهديد، واكتشاف البنية التحتية للمهاجمين المرتبطين، ووضع الهجمات في سياق أنماط هجوم أوسع.

قد تكون بعض هذه المهارات ضرورية كجزء ضمن عملية التصنيف الأولية، على سبيل المثال لمساعدة المحلل على تحديد ما إذا كان الرابط مشبوهًا، وسيثبت أنها مفيدة للغاية أثناء التحليل المتعمق لرؤوس البريد الإلكتروني الموضحة في القسم التالي.


## الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:

- فهم هيكل عنوان موقع الويب.
- فهم أنواع سجلات أنواع سجلات نظام أسماء المجالات وهو إز (WHOIS) والفرق بين بروتوكول الإنترنت الإصدار 4 والإصدار 6.
- إجراء استكشاف أساسي للمجالات.
- التعرف على الوكلاء العكسيين الشائعين التي تحمي عناوين بروتوكول الإنترنت الأصلية لأغراض الحماية من حجب الخدمة الموزع أو تحسين توصيل المحتوى، مثل كلاود فلير (CloudFlare) وأكاماي (Akamai) وفاستلي (Fastly).
- اكتشاف أو تعداد النطاقات الفرعية المرتبطة بنطاق.
 
---

## العرض
يستخدم الفحص غير النشط أدوات وموارد استخبارات المصادر المفتوحة التي يمكن أن تعطينا العديد من التفاصيل حول البصمة الرقمية للبنية التحتية للهجوم دون أن يلاحظ المهاجم أننا نجري تحقيقًا. 


### المعرفة الأساسية 

يتعمق هذا القسم في أساسيات عناوين مواقع الويب ونظام أسماء المجالات وبروتوكول الإنترنت الإصدار 4  (IPv4) وبروتوكول الإنترنت الإصدار 6 (IPv6). إذا كنت تشعر بأنك تعرف هذه المفاهيم فهذا رائع، ويمكنك الانتقال إلى قسم "سير العمل". خلاف ذلك تحقق من المستندات والموارد أدناه:

- هيكل عنوان موقع ويب
  - يجب أن تكون قادرًا على قراءة عنوان موقع ويب وفهم أهمية أجزائه، بما في ذلك تحديد المخطط والنطاقات الفرعية والنطاق الأساسي ونطاقات المستوى الأعلى وأي ميزات تعريف للمسار أو المعلمات في عنوان موقع الويب. إذا كنت بحاجة إلى مراجعة هذه الأمور، اطلّع على هذا [المستند من إم دي إن](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL).
    
- أدوات اختصار عناوين موقع الويب
  - قد تستخدم بعض الرسائل الضارة أداة اختصار عناوين موقع الويب لإخفاء الرابط الضار الفعلي. إذا كنت ترغب في رؤية الوجهة النهائية للرابط، يمكنك استخدام خدمة عبر الإنترنت مثل [unshorten.me](https://unshorten.me/) لعرض عنوان موقع الويب الكامل. لكن لاحظ أن إلغاء تقصير عنوان موقع ويب قد ينبه المهاجم إلى أنك تجري تحقيقًا ويجب اعتباره تحليلًا نشطًا.
- نظام أسماء المجالات 
   - [ مقدمةّ إلى نظام أسماء المجالات ](https://aws.amazon.com/route53/what-is-dns/)
   -  [أنواع سجلات نظام أسماء المجالات](https://www.cloudflare.com/learning/dns/dns-records/)
   -  موقع هو إز - يجب أن تفهم كيفية توليد سجلات هو إز وتخزينها وقراءتها والاستعلام عن سجلاتها لأي نطاق [استبدال بمورد]. إذا كنت بحاجة إلى مزيد من المعلومات حول ذلك، اطلّع علىهذا [الدليل](https://www.domain.com/blog/what-is-whois-and-how-is-it-used/).
- بروتوكول الإنترنت الإصدار 4/بروتوكول الإنترنت الإصدار 6 
ما هو بروتوكول الإنترنت الإصدار 4
 [https://bluecatnetworks.com/glossary/what-is-ipv4/](https://bluecatnetworks.com/glossary/what-is-ipv4/)
   - فهم الاختلافات بين بروتوكول الإنترنت الإصدار 4 والإصدار 6.
 [https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6](https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/)
   - فهم عناوين بروتوكول الإنترنت
[https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/](https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/)
   - بالإضافة إلى عناوين بروتوكول الإنترنت، من المفيد التعرّف على  [أرقام المنافذ port numbers](https://www.techtarget.com/searchnetworking/definition/port-number).


### مسارات العمل: الأدوات والقدرات

يمكن تقسيم الفحوص غير النشطة لبروتوكول الإنترنت/نظام أسماء المجالات إلى عدة فئات.

الحصول على المعلومات الأساسية حول بروتوكول الإنترنت/نظام أسماء المجالات
إحدى أولى الأمور التي يجب علينا القيام بها في فحصنا هو الحصول على بعض المعلومات الأولية حول النطاقات والمضيفين وهناك عدد من الأدوات وفئات الأدوات التي يمكن أن تساعد في ذلك.

- موقع هو إز WHOIS
سجلات هو إز متاحة للعامة وتحتوي على معلومات مفيدة عن النطاق ويمكنك التعرف على كيفية استخدام الأدوات المساعدة المستندة إلى الويب (على سبيل المثال [ARIN whois](https://search.arin.net/rdap/) أو [who.is](https://who.is/)) أو أدوات سطر الأوامر لعرض سجلات هو إز وتعلّم قراءة معلومات المسجَّل (إذا تم الكشف عنها) والمسجِّل وتاريخ التسجيل وخوادم أسماء نظام أسماء المجالات التي تشير إلى مكان استضافة السجلات الرسمية لمنطقة نظام أسماء المجالات هذه.

يمكن أيضًا تشغيل هو إز على عنوان بروتوكول إنترنت من أجل محاولة تحديد الشركة المسؤولة عن عنوان بروتوكول إنترنت، وبالتالي من المحتمل أن تخبرك بشركة الاستضافة التي تقدم الخدمة لموقع إلكتروني.

- أمرا dig وhost:
سجلات هو إز متاحة للعامة وتحتوي على معلومات مفيدة عن النطاق ويمكنك التعرف على كيفية استخدام الأدوات المساعدة المستندة إلى الويب (على سبيل المثال [ARIN whois](https://search.arin.net/rdap/) أو [who.is](https://who.is/)) أو أدوات سطر الأوامر لعرض سجلات هو إز وتعلّم قراءة معلومات المسجَّل (إذا تم الكشف عنها) والمسجِّل وتاريخ التسجيل وخوادم أسماء نظام أسماء المجالات التي تشير إلى مكان استضافة السجلات الرسمية لمنطقة نظام أسماء المجالات هذه.
تُعد **dig** أداة سطر أوامر إما مثبتة مسبقًا أو متوفرة لأنظمة التشغيل الرئيسية. تسمح لك بالبحث بسهولة ([اتبع الدليل التعليمي هنا](https://phoenixnap.com/kb/linux-dig-command-examples)) عن سجلات نظام أسماء المجالات لأي نطاق ويميز بين أنواع السجلات المختلفة. في حين أن الدليل التعليمي الموجود رابطه يحتوي على العديد من عناصر بناء جملة dig، يُعدّ الاستخدام الأكثر شيوعًا هو البحث في أنواع سجلات A وMX. يحظى dig بشعبية كبيرة بين المحللين لأنه بسيط وسهل الأتمتة. تُعدّ host (انظر [رابط الدليل التعليمي](https://www.geeksforgeeks.org/host-command-in-linux-with-examples/)) أداة سطر أوامر بديلة تقوم بتحويل اسم المضيف بسرعة إلى عنوان بروتوكول إنترنت مع بناء جملة أبسط. هناك أيضًا الكثير من البدائل لأداة dig تتمتع بميزات أكثر أو من الأسهل قراءتها، مثل [doggo](https://github.com/mr-karan/doggo).
انتبه إلى خوادم أسماء الوكيل العكسي الشائعة التي تستخدم لتوزيع المحتوى مثل تلك التي تقدمها أكاماي (على سبيل المثال a1-64.akam.net) وكلاودفلير (على سبيل المثال eve.ns.cloudflare.com) وفاستلي (على سبيل المثال ns3.fastly.net) لأن ستحجب عنوان بروتوكول إنترنت الأصلي للخادم. بعد قضاء القليل من الوقت في الاطلاع على خوادم الأسماء، ستتمكن بسهولة من التعرف على العديد من هؤلاء الوكلاء. إذا قمت على سبيل المثال بتشغيل أمر dig للبحث عن theguardian.com، فسترى أنه يوجهك إلى خوادم فاستلي (Fastly) (على الأقل في وقت كتابة هذا التقرير).

- قاعدة بيانات جيو آي بي (geoIP)
ترتبط عناوين بروتوكول الإنترنت تقريبًا بجغرافيات فعلية، وهذا يعني أنه إذا كنت تعرف عنوان بروتوكول إنترنت، فيمكنك أن تستنج (MaxMind GeoIP searchup demo linked)[you can figure out](https://www.maxmind.com/en/geoip-demo)) بدرجة معينة من اليقين مكان وجود الشخص الذي يستخدم هذا العنوان في العالم (البلد أو المنطقة). توجد العديد من قواعد البيانات المعروفة باسم جيو آي بي والتي تسمح لك بالبحث عن هذا الأمر. لاحظ أن دقة عمليات البحث المستندة إلى بروتوكول الإنترنت يمكن أن تكون متنوعة للغاية ففي بعض الأحيان من الممكن تعقب عنوان بروتوكول إنترنت لمؤسسة معينة، بينما في أحيان أخرى تحصل فقط على التفاصيل على مستوى البلد. 

🛠️ خصص بعض الوقت للتدرب على استخدام هذه الخدمات. يمكنك على سبيل المثال استخدامها لفحص موقع الويب الخاص بك أو موقع مؤسستك.


#### الحصول على المعلومات الأساسية حول بروتوكول الإنترنت/نظام أسماء المجالات


#### Discovering Hidden DNS/IP Information

There are a variety of ways that one can obtain additional information about hosts in a domain. Do note, however, that most of those techniques only work some of the time and often fail. If one of them does not work, do not be discouraged. Some of these methods include:

- Using DNS Zone Transfers. A feature (usually disabled over the internet) of authoritative DNS servers is to give out their entire set of DNS records for a given domain. Its intended use is to synchronize replica servers to the primary server. Check [out this guide](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) on how to use dig and other tools to figure out subdomains based on DNS zone transfers.
- Brute-forcing subdomains. One can simply guess subdomains using a list of common subdomain prefixes and ask the DNS server for those servers’ IP addresses. (e.g. webmail.attacker.com, vpn.attacker.com, remoteaccess.attacker.com, etc.) So long as the server gives a NXDOMAIN (no such domain) response for non-existent hostnames, one can often find hidden domains this way. This [guide on enumerating subdomains](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) also lists some brute forcing tools.
- Reverse-lookup of adjacent IP addresses. Some DNS servers will let you look up the hostname for an IP address. It is common for self-hosted infrastructure to exist in a small block of IP addresses. Given this, it’s sometimes possible to, given one hostname's IP address (e.g. 127.0.0.5), look up the hostnames of nearby IP addresses (e.g. 127.0.0.1-127.0.0.254).

There exist tools that use these and other techniques to try to discover additional network resources. One of the first of these, still under development, is called [Fierce](https://www.kali.org/tools/fierce/). Another popular tool is [DNS Recon](https://securitytrails.com/blog/dnsrecon-tool). This [blog post describing DNSRecon](https://securitytrails.com/blog/dnsrecon-tool#content-alternatives-to-dnsrecon) also includes a list of other popular DNS enumeration tools.

#### Enriching IP/DNS information using Internet Scanner Services

Once you have obtained identifier information (domains and IPs) you can search this data in greater depth using some services which allow you to investigate additional information about the host and any associated activity around it.

Learn how to view open ports, active services, and service banners from a given IP by using one of numerous web intelligence scanning services. Note that this is still a passive investigation technique as these services repeatedly scan the web for their data sets and you will not be initiating new activity on the infrastructure of interest:

- Use [Censys Search](https://search.censys.io/) to observe open ports, running services, TLS certificates, and more for a given IP.
- Use [Shodan ](https://www.shodan.io/)(subscription required for some features, and requires utilization of Shodan filters in queries, see [reference](https://www.shodan.io/search/filters) and [examples](https://www.shodan.io/search/examples)) to search for information on services running on a server by IP address. Shodcan can also search for all servers running a service with a particular banner.
- Use [DNS Dumpster](https://dnsdumpster.com/) to look up the potential attack surfaces of internet facing services.

These and similar services and databases can help you identify the activities and history of a specified server/service.

Other scanner services also collect **DNS history**, allowing you to peer back in time to learn what other domain _resolutions_ have appeared for a given IP, when they appeared/disappeared, as well as subdomains for a given domain.

- [Security Trails](https://securitytrails.com/)
- [Microsoft Defender XDR](https://www.microsoft.com/en-us/security/business/solutions/extended-detection-response-xdr)(formerly RiskIQ) provides limited DNS history and resolutions data to free-tier customers.

#### Enriching IP/DNS information using threat intelligence databases

Several services will collect indicators of threats and history of malicious behavior. If you need to ensure that no new scanning activity is initiated (which would be active investigation), ensure that you are not initiating a new scan with your search (for instance, while VirusTotal allows you to check a URL, it will launch a new scan against the URL, thereby initiating activity which could be detected as an investigation).

- [Alienvault OTX](https://otx.alienvault.com/) is a community-driven open resource for malicious indicators. Searching for an IP or host name will display useful OSINT information as well as records of any malicious activity previously obtained.
- [Mandiant Advantage](https://www.mandiant.com/multi-vendor-security-platform-free-access) (owned by Google) provides search limited functionality on their free tier.

#### Using Certificate Search

Almost every website a user will encounter now uses HTTPS, which uses a technology known as TLS (Transport Layer Security). Malicious websites use it too, in part playing on users' beliefs that HTTPS and a lock appearing in the browser's URL bar means that the website is therefore safe, regardless of other factors.

As TLS certificates must be signed by a trusted Certificate Authority (CA) in order to be trusted by the browser, a substantial amount of data about the domain may be available for your investigation as you look for shared infrastructure, subdomains, identifiers, and other assets.

Rich certificate data is publicly available thanks to the practice of Certificate Transparency, in which Certificate Authorities add all certificates issued to a tamper-resistant public log. It can be helpful to understand this system - see a brief overview at the [Certificate Transparency website](https://certificate.transparency.dev/) or take a deeper dive in their technical overview at [How CT Works](https://certificate.transparency.dev/howctworks/). It’s useful for learners who want to learn more about tracking and detecting malicious infrastructure to have a broad understanding of this system.

Making practice use of certificate search involves searching for domains, subdomains, IPs, identifying interesting information such as dates of issue, and correlating information found in issued certificates.

Read through the guide at [Certificates: The OSINT Gift that Keeps on Giving…](https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/) which describes key investigative fields and searches using Censys and Shodan, and watch the accompanying [10-minute video on YouTube](https://www.youtube.com/watch?v=XHltHamQVoA) which carries out the same search using [crt.sh](https://crt.sh/). It is useful to be able to use all three search utilities. In particular, ensure you understand:

- What are some of the ‘interesting’ fields within a certificate when conducting an investigation
- How to search within those fields on the various platforms
- How to identify subdomains, host IPs, alternative domains issued for a certificate.

Note that the Censys search API syntax changed in 2021 and some of the searches in the above tutorials will not work. For instance instead of “parsed.names:” simply use “names:” in the new syntax.

Many tools have been built around certificate transparency logs. For instance, try enumerating for subdomains using [MassDNS ](https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains)(see instructions for using scripts/ct.py on the READMe page).

Censys offers further reading on advanced techniques for tracking and hunting for threat actors using their platform at [Advanced Persistent Infrastructure Tracking](https://censys.com/advanced-persistent-infrastructure-tracking/).

**Things to note**

When you use a tool such as WHOIS, you will find many addresses which are hidden behind Cloudflare or similar services. This means that the administrators of this address are partially hosting it using a major third party service, for example to maintain greater anonymity or for DDoS protection. Similarly, many domains use privacy services to make sure that their data does not show up in WHOIS. Some people also put fake data into WHOIS. If this is the case, then analyzing the address through WHOIS will not yield a lot of good information (save perhaps for the creation date of the domain) and you'll need to use alternative forms of analysis.

Many malicious URLs used in phishing emails utilize (sometimes multiple) redirects, meaning the initial URL may be less relevant for analysis. Identifying redirects and other IPs involved will require active interaction with the URL, which is covered in Active Investigation skill.

Attackers can host their own DNS server and track requests. In this case, DNS requests may not be "passive" and may alert the attacker of the investigation. Especially look out for hostnames that might have identifiers in them, like r2378r233yr39wjwr.example.com.


## Practice

Choose a random-ish domain name, making sure that it is not hosted behind a content distribution/reverse-proxy service such as Cloudflare (you can figure it out by quickly searching for it using a tool such as dig and using the NS option to look for name servers). Using the above tool categories, investigate the domain and try to explain:

- Where is the domain registered, and if available, who registered the domain?
- What is the domain’s IP address?
- Who manages that IP address?
- Where is that server located?
- (If practitioners have access to Shodan or Censys) What services are running on that server?
- What other domains are hosted at the same IP?
- Can you find any sub-domains for that domain?

## Skill Check

Sit down with a peer or a mentor who has significant experience in passive investigation against servers on the internet. Then:

- Complete the [passive reconnaissance room](https://tryhackme.com/room/passiverecon) on TryHackMe.
- Carry out the above Practice Exercises, ideally on a different domain, and go through your process and findings with your peer or mentor. Have them review your work and provide feedback on both the process and results. It might be a good exercise to discuss specifically how to find subdomains running on that domain and to discuss the accuracy of geoIP lookups concerning those domains. As an optional extra, sit down with the mentor or peer to run through some advanced dig settings and set up a basic automation together, for example asking dig to load a list of domains from a text file and provide information on them.
- If you have a real-world phishing message (or alternatively, take a phishing domain from [PhishTank](https://phishtank.org/) and analyze that, note that the website collects domains rather than messages), carry out the passive investigation outlined in the practice exercise (carefully!) while conferring with a peer or mentor. Document your findings and your process. Have them review your work and provide feedback on both the process and results.



 

اكتشاف المعلومات المخفية من نظام أسماء المجالات/بروتوكول الإنترنت
توجد مجموعة متنوعة من الطرق التي يمكن للمرء من خلالها الحصول على معلومات إضافية حول المضيفين في النطاق. لكن لاحظ أن معظم هذه التقنيات لا تعمل إلا في بعض الأحيان وغالبًا ما تفشل، ولكن لا تدع عزيمتك تثبط في حال عدم عمل إحداها، وتشمل بعض هذه الطرق ما يلي:
استخدام عمليات نقل منطقة نظام أسماء المجالات. تتمثل إحدى ميزات خوادم نظام أسماء المجالات الموثوقة (عادةً ما يتم تعطيلها عبر الإنترنت) في تقديم مجموعة كاملة من سجلات نظام أسماء المجالات لنطاق معين. الغرض من استخدامها في مزامنة خوادم النسخة المتماثلة مع الخادم الأساسي. اطلّع على هذا الدليل حول كيفية استخدام dig والأدوات الأخرى لمعرفة النطاقات الفرعية بناءً على عمليات نقل منطقة نظام أسماء المجالات.
استخدام القوة العمياء لمعرفة نطاقات فرعية. يمكن للمرء ببساطة تخمين النطاقات الفرعية باستخدام قائمة من بادئات النطاقات الفرعية الشائعة وسؤال خادم نظام أسماء المجالات عن عناوين بروتوكول الإنترنت لتلك الخوادم. (على سبيل المثال webmail.attacker.com وvpn.attacker.com وremoteaccess.attacker.com، إلخ.) طالما أن الخادم يعطي استجابة NXDOMAIN (هذا النطاق غير موجود) لأسماء المضيف غير الموجودة، يمكن للمرء في كثير من الأحيان العثور على النطاقات المخفية بهذه الطريقة. يسرد هذا الدليل حول تعداد النطاقات الفرعية أيضًا بعض أدوات القوة العمياء.
إجراء بحث عكسي لعناوين بروتوكول الإنترنت المجاورة، حيث ستتيح لك بعض خوادم نظام أسماء المجالات البحث عن اسم المضيف لعنوان بروتوكول إنترنت. من الشائع وجود البنية التحتية المستضافة ذاتيًا في مجموعة صغيرة من عناوين بروتوكول الإنترنت. بالنظر إلى ذلك، من الممكن أحيانًا بالنظر إلى عنوان بروتوكول إنترنت لاسم مضيف واحد (على سبيل المثال 127.0.0.5)، البحث عن أسماء المضيف لعناوين بروتوكول الإنترنت القريبة (على سبيل المثال 127.0.0.1-127.0.0.254).
توجد أدوات تستخدم هذه التقنيات وغيرها لمحاولة اكتشاف موارد الشبكة الإضافية، وإحدى أولى هذه الأدوات التي لا تزال قيد التطوير هي فيرس (Fierce) وإحدى الأدوات الشائعة الأخرى هي دي إن إس ريكون (DNS Recon). يتضمن منشور المدونة هذا الذي يصف دي إن إس ريكون (DNSRecon) أيضًا قائمة بأدوات تعداد نظام أسماء المجالات الشائعة الأخرى.
إثراء معلومات بروتوكول الإنترنت/نظام أسماء المجالات باستخدام خدمات ماسح الإنترنت 
بمجرد حصولك على معلومات المعرّف (النطاقات وعناوين بروتوكول الإنترنت)، يمكنك البحث في هذه البيانات بعمق أكبر باستخدام بعض الخدمات التي تسمح لك بالتحقيق في معلومات إضافية حول المضيف وأي نشاط مرتبط به. 
تعرّف على كيفية عرض المنافذ المفتوحة والخدمات النشطة وشرائط الخدمة من عنوان بروتوكول إنترنت معين باستخدام واحدة من العديد من خدمات المسح الذكي للويب. لاحظ أن هذا لا يزال أسلوب فحص غير نشط لأن هذه الخدمات تفحص الويب بشكل متكرر بحثًا عن مجموعات بياناتها ولن تبدأ نشاطًا جديدًا على البنية التحتية قيد الدراسة:
استخدم سينسيس سيرش (Censys Search) لمراقبة المنافذ المفتوحة، وتشغيل الخدمات، وشهادات بروتوكول أمان طبقة النقل، والمزيد حول عنوان بروتوكول إنترنت معين.
استخدم شودان (Shodan)(تتطلب الاشتراك لبعض الميزات وتتطلب استخدام فلاتر شودان في الاستعلامات، انظر المرجع والأمثلة) للبحث عن معلومات حول الخدمات التي تعمل على الخادم حسب عنوان بروتوكول إنترنت. يمكن لشودان أيضًا البحث عن جميع الخوادم التي تدير خدمة ذات شعار معين.
استخدم دي إن إس دمبستر (DNS Dumpster) للبحث عن الأجزاء المعرضة للهجوم المحتملة للخدمات التي تواجه الإنترنت.
يمكن أن تساعدك هذه الخدمات وقواعد البيانات المماثلة في تحديد أنشطة وتاريخ خادم/خدمة محددة.
تجمع خدمات المسح الأخرى أيضًا سجل نظام أسماء النطاقات مما يسمح لك بالرجوع في الوقت المناسب لمعرفة تحليلات النطاق الأخرى التي ظهرت لعنوان بروتوكول إنترنت معين ومتى ظهرت أو اختفت، بالإضافة إلى النطاقات الفرعية لنطاق معين.
المسارات الأمنية (Security Trails)
 يوفر تحليل مايكروسوفت ديفندر الذكي للمخاطر (Microsoft Defender Threat Intelligence) (المعروف سابقًا باسم ريسك آي كيو) تاريخًا محدودًا لنظام أسماء النطاقات والتحليلات لعملاء درجتاه المجانية.
إثراء معلومات بروتوكول الإنترنت/نظام أسماء المجالات باستخدام قواعد بيانات معلومات التهديد
ستقوم عدة خدمات بجمع مؤشرات التهديدات وتاريخ السلوك الضار. إذا كنت بحاجة إلى التأكد من عدم بدء أي نشاط مسح جديد (والذي سيكون تحقيقًا نشطًا)، تأكد من أنك لا تبدأ فحصًا جديدًا باستخدام بحثك (على سبيل المثال، بينما يسمح لك فايروس توتال (VirusTotal) بالتحقق من عنوان موقع ويب، فسيطلق فحصًا جديدًا مقابل عنوان موقع ويب، وبالتالي بدء النشاط الذي يمكن كشف أنه تحقيق). 
ألين فولت أو تي إكس (Alienvault OTX) هو مورد مفتوح يوجهه المجتمع متعلق بالمؤشرات الضارة، وسيعرض البحث عن عنوان بروتوكول إنترنت أو اسم مضيف معلومات مفيدة عن استخبارات المصادر المفتوحة بالإضافة إلى سجلات أي نشاط ضار تم الحصول عليه مسبقًا.
توفر مانديانت أدفنتيج (Mandiant Advantage) (التي تملكها شركة غوغل (Google)) وظائف بحث محدودة على درجتها المجانية. 
استخدام البحث عن الشهادات
يستخدم كل موقع ويب تقريبًا يواجهه المستخدم الآن بروتوكول نقل نص تشعبي (HTTPS)، والذي يستخدم تقنية تعرف باسم بروتوكول أمان طبقة النقل (Transport Layer Security واختصارًا TLS). تستخدمه مواقع الويب الضارة أيضًا مما يؤدي جزئيًا إلى اعتقاد المستخدمين بأن بروتوكول نقل نص تشعبي والقفل الذي يظهر في شريط عناوين مواقع ويب للمتصفح يعني أن موقع الويب آمن بغض النظر عن العوامل الأخرى.

نظرًا لأنه يجب توقيع شهادات بروتوكول أمان طبقة النقل من قبل هيئة شهادات موثوقة (Certificate Authority) حتى يثق بها المتصفح، قد تتوفر كمية كبيرة من البيانات حول النطاق لتحقق فيه أثناء البحث عن البنية التحتية المشتركة والنطاقات الفرعية والمعرفات والأصول الأخرى. 

تتوفر كمية كبيرة من بيانات الشهادات للعامة بفضل ممارسة شفافية الشهادات حيث تضيف سلطات الشهادات جميع الشهادات الصادرة إلى سجل عام مقاوم للتلاعب. قد يكون من المفيد فهم هذا النظام، لذا اطلّع على نظرة عامة موجزة على موقع شفافية الشهادات أو تعمّق في نظرة عامة فنية حول كيفية عمل شفافية الشهادات ومن المفيد للمتعلّمين الذين يرغبون في معرفة المزيد حول تتبع واكتشاف البنية التحتية الضارة أن يكون لديهم فهم واسع لهذا النظام.

يمكن التمرّن على استخدام البحث عن الشهادات للنطاقات والنطاقات الفرعية وعناوين بروتوكول الإنترنت وتحديد المعلومات المثيرة للاهتمام مثل تواريخ الإصدار والمعلومات المرتبطة الموجودة في الشهادات الصادرة.

اقرأ الدليل في الشهادات: هدية استخبارات المصادر المفتوحة التي تتابع العطاء... والتي تصف مجالات الفحص الرئيسية وعمليات البحث باستخدام سينسيس وشودان، وشاهد الفيديو المرفق الذي مدته 10 دقائق على يوتيوب  والذي ينفذ البحث ذاته باستخدام سي آر تي دوت إس إش (crt.sh). من المفيد أن تكون قادرًا على استخدام جميع أدوات البحث الثلاثة وعلى وجه الخصوص تأكد من فهمك لما يلي:
ماهية بعض الحقول "المثيرة للاهتمام" ضمن الشهادة عند إجراء تحقيق
كيفية البحث ضمن تلك الحقول على المنصات المختلفة
كيفية تحديد النطاقات الفرعية وعناوين بروتوكول الإنترنت المضيفة والنطاقات البديلة الصادرة لشهادة.

لاحظ أن بناء جملة واجهة برمجة تطبيقات البحث لسينسيس قد تغير في عام 2021 وأن بعض عمليات البحث في الأدلة التعليمية المذكورة أعلاه لن تعمل. على سبيل المثال، بدلًا من "parsed.names :" استخدم ببساطة ":names" في بناء الجملة الجديد.

بُنيت العديد من الأدوات حول سجلات شفافية الشهادة، وعلى سبيل المثال حاول تعداد النطاقات الفرعية باستخدام ماس دي إن إس (MassDNS) (انظر تعليمات استخدام scripts/ct.py على صفحة READMe).

تُقدم سينسيس مقالات إضافية القراءة حول التقنيات المتقدمة لتتبع ممثلي التهديد ومطاردتهم باستخدام منصتها في التتبع المتقدم للبنية التحتية التي تستمر في البقاء.
موارد التعلّم



## Learning Resources

{{% resource title="What is a URL?" languages="Chinese, English, French, Japanese, Korean, Russian, Spanish" cost="Free" description="A brief overview of what URLs are, how they are constructed, and what additional features (anchors and the like) they might have." url="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL" %}}

{{% resource title="Introduction to DNS" languages="Video in English, text in Arabic, Bahasa Indonesian, German, Spanish, French, Italian, Portuguese, Vietnamese, Turkish, Russian, Thai, Japanese, Korean, Chinese, Taiwanese" cost="Free" description="A basic overview of how DNS works." url="https://aws.amazon.com/route53/what-is-dns/" %}}

{{% resource title="Overview of DNS record types" languages="English, German, Spanish, French, Italian, Japanese, Korean, Portuguese, Taiwanese, Mandarin" cost="Free" description="Includes the most common record types, and some less common ones." url="https://www.cloudflare.com/learning/dns/dns-records/" %}}

{{% resource title="Using the dig command" languages="English" cost="Free" description="How to query for information about IP addresses." url="https://phoenixnap.com/kb/linux-dig-command-examples" %}}

{{% resource title="doggo" languages="English" cost="Free" description="An alternative to the dig command, with very similar functionality but differently formatted output." url="https://github.com/mr-karan/doggo" %}}

{{% resource title="host command in Linux with examples" languages="English" cost="Free" description="A guide on how to use the host command in Linux, another commonly used tool to analyze servers and other types of infrastructure." url="https://www.geeksforgeeks.org/host-command-in-linux-with-examples/" %}}

{{% resource title="Further DNS reconnaissance: DNSRecon" languages="English" cost="Free" description="Various tools to automate searching for related servers." url="https://securitytrails.com/blog/dnsrecon-tool" %}}

{{% resource title="Further DNS reconnaissance: Fierce (resoucrce 1)" languages="English" cost="Free" description="Various tools to automate searching for related servers." url="https://www.kali.org/tools/fierce/" %}}

{{% resource title="Further DNS reconnaissance: Fierce (resource 2)" languages="English" cost="Free" description="Various tools to automate searching for related servers." url="https://salsa.debian.org/pkg-security-team/fierce" %}}

{{% resource title="Further DNS reconnaissance: VirusTotal" languages="English" cost="Free" description="Various tools to automate searching for related servers." url="https://docs.virustotal.com/docs/how-it-works" %}}

{{% resource title="GeoIP" languages="English" cost="Free for limited quantities" description="Look up the (likely) physical location of a server by IP address." url="https://www.maxmind.com/en/geoip-demo" %}}

{{% resource title="whois/RDAP: who.is search" languages="English" cost="Free" description="Shows ownership information for a domain or IP address." url="https://who.is/" %}}

{{% resource title="whois/RDAP: ARIN RDAP search" languages="English" cost="Free" description="Shows ownership information for a domain or IP address." url="https://search.arin.net/rdap/" %}}

{{% resource title="whois/RDAP: ICANN lookup" languages="English" cost="Free" description="Shows ownership information for a domain or IP address." url="https://lookup.icann.org/en" %}}

{{% resource title="What is whois and how is it used" languages="English" cost="Free" description="A quick summary of what a whois database is and what its potential limitations are." url="https://www.domain.com/blog/what-is-whois-and-how-is-it-used/" %}}

{{% resource title="The ultimate guide to the whois database" languages="English" cost="Free" description="Offers a look at what whois can (and cannot) be used for." url="https://domainnamestat.com/blog/the-ultimate-guide-to-the-whois-database" %}}

{{% resource title="What is an IPv4 address?" languages="English" cost="Free" description="There are two types of IP addresses, IPv4 and IPv6. This guide provides an introduction to the former." url="https://bluecatnetworks.com/glossary/what-is-ipv4/" %}}

{{% resource title="Differences between IPv4 and IPv6" languages="English" cost="Free" description="Outlines the key differences between the two types of IP addresses." url="https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/" %}}

{{% resource title="Understanding IP addresses" languages="English" cost="Free" description="A quick introduction to what IP addresses are, what the different types thereof are." url="https://www.enterprisenetworkingplanet.com/standards-protocols/understanding-ip-addresses/" %}}

{{% resource title="What are port numbers and how do they work?" languages="English" cost="Free" description="A quick introduction to port numbers, includes a list of some key ones." url="https://www.techtarget.com/searchnetworking/definition/port-number" %}}

{{% resource title="Subdomain enumeration: the ultimate guide" languages="English" cost="Free" description="A guide which contains several techniques on enumerating (figuring out) which subdomains a specific domain contains. It’s worth remembering that not all techniques will work on all domains/servers." url="https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/" %}}

{{% resource title="Threat intelligence services with DNS history: Security Trails" languages="English" cost="Free with premium features (security trails) / Free (Microsoft Defender)" description="Those services perform DNS scans and add history; analysts who use them can therefore see whether certain websites or addresses moved or changed." url="https://securitytrails.com/" %}}

{{% resource title="Threat intelligence services with DNS history: Microsoft XDR" languages="English" cost="Free with premium features (security trails) / Free (Microsoft Defender)" description="Those services perform DNS scans and add history; analysts who use them can therefore see whether certain websites or addresses moved or changed." url="https://www.microsoft.com/en-us/security/business/solutions/extended-detection-response-xdr" %}}

{{% resource title="Alienvault OTX" languages="English" cost="Free" description="A service that compiles threat intelligence and indicators put forward by the community." url="https://otx.alienvault.com/" %}}

{{% resource title="Mandiant Advantage" languages="English" cost="Some features are available on the free tier" description="Another threat intelligence service, currently owned by Google." url="https://www.mandiant.com/multi-vendor-security-platform-free-access" %}}

{{% resource title="Shodan" languages="English" cost="Free tier\nBasic $49\nMore volume available as monthly subscriptions\n(Free basic for academic emails, occasionally has great discounts, e.g. membership for $5 when they got 5 million users in July 2022, and $4 when they hit 4 million users in March of 2021)" description="Shows information on services running on a server by IP address, can also search for all servers running a service with a particular banner." url="https://www.shodan.io/" %}}

{{% resource title="Censys Search" languages="English" cost="Free" description="A tool which can observe open ports, running services, TLS certificates, and more for a given IP." url="https://search.censys.io/" %}}

{{% resource title="DNS Dumpster" languages="English" cost="Free" description="A tool used to look up the potential attack surfaces of internet facing services." url="https://dnsdumpster.com/" %}}

{{% resource title="DNS Checker" languages="English" cost="Free" description="‘Swiss Army Knives’ of DNS and IP lookups - allows various fast searches on domain/DNS, IP, and email records." url="https://dnschecker.org/all-tools.php" %}}

{{% resource title="MXToolbox" languages="English" cost="Free" description="‘Swiss Army Knives’ of DNS and IP lookups - allows various fast searches on domain/DNS, IP, and email records." url="https://mxtoolbox.com/SuperTool.aspx" %}}

{{% resource title="How certificate transparency works" languages="English" cost="Free" description="A quick introduction to what certificate transparency is, what issues it addresses, and how it functions." url="https://certificate.transparency.dev/howctworks/" %}}

{{% resource title="Certificates: the OSINT Gift that keeps on giving (text version)" languages="English" cost="Free" description="A guide for analysts on how to use tools like Shodan to search for certificates and get good data on web servers they are investigating." url="https://www.osintcurio.us/2019/03/12/certificates-the-osint-gift-that-keeps-on-giving/" %}}

{{% resource title="Certificates: the OSINT Gift that keeps on giving (video version)" languages="English" cost="Free" description="A guide for analysts on how to use tools like Shodan to search for certificates and get good data on web servers they are investigating." url="https://www.youtube.com/watch?v=XHltHamQVoA" %}}

{{% resource title="crt.sh" languages="English" cost="Free" description="A search engine which focuses specifically on certificate search." url="https://crt.sh/" %}}

{{% resource title="massdns" languages="English" cost="Free" description="A tool which can be used to brute force searches for subdomains." url="https://github.com/blechschmidt/massdns#reconnaissance-by-brute-forcing-subdomains" %}}

{{% resource title="Advanced Persistent Infrastructure Tracking" languages="English" cost="Free" description="A guide on various methods which could be used to track attacker infrastructure, which also looks at certificate searches." url="https://cobaltstrike.com/downloads/csmanual38.pdf" %}}
