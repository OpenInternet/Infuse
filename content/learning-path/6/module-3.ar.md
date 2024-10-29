+++
style = "module"
weight = 3
title = "Denial of Service Incident Response"
description = "If a website comes under a sustained denial of service attack, it may be vital to act quickly to get the site back up and running. This subtopic describes some practices to allow site owners to recover from a DoS attack"
+++

## Use Case

If a website comes under a sustained denial of service attack, it may be vital to act quickly to get the site back up and running. This subtopic describes some practices to allow site owners to recover from a DoS attack.

## Objectives

After completing this subtopic, the practitioner should be able to do the following:

- Determine what sort of DoS attack a website is under
- Mitigate or neutralize an attack in process

---
## Main Section
For some sites (e.g., gambling sites), even a brief DoS can be an existential threat to the site’s survival. Attackers are typically financially motivated, and will use DoS as an extortion threat. For civil society focused sites, the threat model is typically quite different. Attacks are typically controlled by political rivals (often nation-state actors or those linked to or supported by them), and fall into two categories:

- Brief (hours to days) attacks meant to intimidate the site owners
- Sustained attacks designed to permanently silence the site

At the start of an attack, it’s impossible to know which type of attack the site is under. Fortunately, the technical and operational response is the same. The basic response breaks down to three steps:

1. Determine what kind of attack the site is under
2. Mitigate that attack (the site should be operational at this point)
3. Proactively harden the site against future attacks

### Determining Attack Type

Generally, a DoS attack will be noticed when users note that the site becomes unavailable or shows degraded performance. In some cases, performance monitoring systems for the site may proactively notify site owners. In any case, the first step is to determine why the site is down. Note that degraded site performance or a site being unavailable may not be due to an attack, but due to equipment failures, misconfiguration, ill-conceived site changes, and [something on the site going viral](https://en.wikipedia.org/wiki/Slashdot_effect). When investigating site degradation, keep in mind the types of DoS attacks, and their symptoms:

- Network-Level
  - Volumetric - Network diagnostic tools such as ping will show high packet loss and long round trip times. If the website is hosted at an ISP or web hosting service, other sites hosted by that ISP/hosting service will also be unavailable.
  - Exploit-based - Network diagnostic tools will tend to show high packet loss, but often will show normal round trip times. If the website is hosted at an ISP/hosting provider, other sites hosted by them will also be unavailable.
- Protocol-Level
  - Volumetric - Network diagnostic tools will typically show elevated packet loss and round trip times. Browser requests to the site will typically take a long time, and usually time out. If the website is hosted at a web hosting provider, other sites hosted on the same server will likely be unavailable, while ones hosted on other servers will typically work. Note that volumetric protocol level DoS attacks will find any bottleneck, be it in the network or server. For instance, a protocol-level attack against a powerful server on an underpowered network will affect the network more than the server.
  - Exploit-based - Network diagnostic tools will typically show normal packet loss and round trip times. Browser requests to the site may either be very slow, or may quickly return an error. If the website is hosted at a web hosting provider, other sites hosted on the same server will likely be unavailable, while ones hosted on other servers will typically work.
- Application-Level
  - Network diagnostic tools will typically show normal packet loss and round trip times. Static content served by the site may behave normally, or may also be degraded. If the website is hosted at a web hosting provider, other sites hosted on the same server will likely be unavailable, while ones hosted on other servers will typically work.

Knowing what kind of attack is happening will help guide site owners’ response. If any sort of network or protocol level attack is suspected, it’s important to reach out to the sites’ ISP/hosting provider to help diagnose the problem. They will usually have access to better diagnostic and response tools for network and protocol level attacks.

A word of warning, a DoS attack against a website is usually necessarily an attack against that site’s ISP/hosting provider as well. Especially for network level attacks, the ISP may be impacted just as much as the target website. For this reason, [ISPs or hosting providers will sometimes shut down websites that are targeted by DoS attacks](https://www.qurium.org/alerts/azerbaijan/ddos-the-inconvenient-business-visitor/), so as to protect the provider itself. Engaging with the site’s ISP/hosting provider early may hopefully provide you with some negotiation possibilities or coordination if the provider does decide to shut a site down.

### Mitigating the threat

Depending on the type of attack, and the hosting service for the site, mitigations can be varied.

#### Exploit-based attacks

For network and protocol level denial of service exploits, generally a software update will need to be applied. As a short-term mitigation, the site’s ISP may block sources of malicious traffic until software updates can be applied.

#### Volumetric attacks

For network and protocol level volumetric attacks, the response is generally carried out at the ISP level. Usually, the ISP will analyze incoming network traffic and identify sources of malicious traffic. They will then block those sources at the network level and work with their upstream ISP to block those sources as well. Eventually, the upstream ISPs that are blocking malicious traffic are large enough that they can easily handle the level of malicious traffic being generated, and the downstream ISPs (and target site) are able to resume normal operations.

#### Application-level attacks

For application-level DoS attacks, mitigation is generally handled by the site owner, as opposed to the ISP or hosting provider. Generally, the attacker will be sending a large volume of requests, often of an unusual nature, to a specific endpoint on the site. This endpoint (i.e., web page) will be consuming a huge amount of resources, slowing down or crashing the site.

The best place to start looking for the targeted endpoint is the web server’s access logs. If you can connect to the web server via something like SSH, try to download (e.g. via rsync or scp) some current access logs, and some from before the attack started. Look for pages that are being hit more frequently, pages that are returning a lot of data, or pages that are taking a lot of time to finish processing. Note that a good logging setup (as described in subsection 2) can make all of this much easier.

If you can’t get access to the logs but have access to a development copy of the site, you can try to find the targeted endpoint yourself. Go through the site, looking for pages that could consume a lot of resources. Examples might include pages that perform complex database queries, read files off the filesystem, resize images, make requests to other websites, etc. A full discussion of this is outside the scope of this learning path, but might include a look at some vulnerabilities included as part of the Web Security Assessment learning path.

If you do manage to find the likely target endpoint, whether by reading logs or simulating an attacker, the next step is to figure out how to thwart the attack. The quickest is to just replace that page on the site with a static web page. This will stop the attack but will disable part of the site. Also, if the attack leverages something that’s on many or all pages on the site, that fix may break the site.

A better option would be to put limits on the target endpoint to prevent it from consuming so many resources. If it’s a page that resizes images, put in a maximum image size. If it’s a search operation and the attacker is using a very long and complex search query, limit the length of the query. If it’s a search and the attacker has put in a search that returns lots and lots of results, change the query to be in a sub-select that limits the number of rows before any sorting etc is done. Hopefully, a simple change can render the attack ineffective without changing how the site works for non-malicious users.

#### If the site is shut down

If the DoS attack is successful in shutting down the web site (e.g., the hosting provider turns off the site), getting the site back up may happen several different ways. If the site owners have good development and deployment practices (see subsection 1 of this learning path), they may have a development copy of the site ready to be deployed at another hosting provider. If not, you and the site owners may be able to negotiate with the site’s current hosting provider to get access to the production servers and copy the site data off.

The easiest next step may be to generate a completely static copy of the site and host it on something like GitHub Pages, Amazon S3, or GCP GCS buckets. To generate a static copy of the site from a development version, you can use a tool like [HTTrack](https://www.httrack.com/) to “spider” the web site and download the HTML. The static site hosting services mentioned above are all free or inexpensive (though there may be a cost for TLS), [are DoS resistant](https://www.wired.com/story/github-ddos-memcached/), and can be set up in a matter of minutes. While having a static copy of the site up may not be ideal, it can be a good stopgap measure.

### Recovering from a DoS Attack

Once the attack has been mitigated, the site owner can work on a full recovery. Generally this involves going through the processes of preparing the site described in subsections 1 and 2 of this learning path. Often, once a site is targeted by a DoS attack, it is likely to face similar attacks again in the future. As such, careful preparation is very important. Especially if an application-level attack was used, it’s a good idea to go through the site and its code to find any aspects that could consume a large amount of resources, and modify them to limit the resources they could consume. Also, having an easy way to generate a static copy of the site and a rehearsed procedure to switch the site to static site hosting, could be useful for frequently-targeted sites.

Further Reading

The following additional resources provide more information on DoS attacks. The following resources mostly focus on the mechanics of low-level attacks:

- [https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf](https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf)
- [https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks](https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks)
- [https://www.byos.io/blog/denial-of-service-attack-prevention](https://www.byos.io/blog/denial-of-service-attack-prevention)

This mini-site is a good overview of making a DoS response plan for a specific site. It’s a great resource if you have the luxury of prior planning or to consult when recovering from an attack:

- [https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan](https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan)


## Skill Check

### Multiple choice questions

DDoS (Distributed Denial of Service) attacks pose significant threats to modern digital infrastructure, aiming to disrupt services by overwhelming target systems or networks with a flood of traffic. In response to such attacks, incident response measures are essential for minimizing damage and restoring normal operations swiftly. This set of multiple-choice questions delves into various aspects of DDoS attacks, including their types, objectives, mitigation strategies, and the incident response phases involved in addressing such threats. Test your knowledge on DDoS attacks and incident response with the following questions. If possible, discuss your answers to those questions with a peer or mentor who will help verify that you’ve correctly understood the topic.

1. Which of the following is NOT a common type of DDoS attack?

A) SYN Flood\
B) Ping Flood\
C) DNS Spoofing\
D) UDP Flood

{{< question title="Answer" >}}
1. C) DNS Spoofing
{{< /question >}}

2. What is the main objective of a DDoS attack?

A) To steal sensitive data\
B) To gain unauthorized access to a system\
C) To overwhelm a target system or network\
D) To encrypt files and demand ransom

{{< question title="Answer" >}}
2. C) To overwhelm a target system or network
{{< /question >}}

3. Which technique is commonly used to mitigate DNS Amplification DDoS attacks?

A) Implementing ingress filtering to block traffic with spoofed IP addresses\
B) Utilizing rate limiting to control the volume of DNS response packets leaving authoritative servers\
C) Deploying Intrusion Prevention Systems (IPS) to detect and block malicious traffic at the network perimeter\
D) Conducting regular vulnerability scans to identify and patch DNS server vulnerabilities

{{< question title="Answer" >}}
3. B) Utilizing rate limiting to control the volume of DNS response packets leaving authoritative servers
{{< /question >}}

4. Which phase of incident response involves identifying the nature and scope of a DDoS attack?

A) Preparation\
B) Detection and Analysis\
C) Containment, Eradication, and Recovery\
D) Post-Incident Activity

{{< question title="Answer" >}}
4. B) Detection and Analysis
{{< /question >}}

5. What is a primary goal during the containment phase of incident response for a DDoS attack?

A) Complete system shutdown\
B) Eliminating the attacker's access\
C) Identifying vulnerabilities for future attacks\
D) Restoring affected services while preventing further damage

{{< question title="Answer" >}}
5. D) Restoring affected services while preventing further damage
{{< /question >}}

6. In the context of incident response, what does the "Eradication" phase involve regarding DDoS attacks?

A) Restoring data from backups\
B) Investigating the attack's origin\
C) Implementing long-term solutions to prevent similar attacks\
D) Rebooting affected systems

{{< question title="Answer" >}}
6. C) Implementing long-term solutions to prevent similar attacks
{{< /question >}}

7. Which action is typically performed during the recovery phase of incident response following a DDoS attack?

A) Conducting a post-mortem analysis\
B) Applying security patches to vulnerable systems\
C) Identifying new attack vectors\
D) Initiating legal action against the attacker

{{< question title="Answer" >}}
7. B) Applying security patches to vulnerable systems
{{< /question >}}

8. How can Content Delivery Networks (CDNs) help protect websites from Denial of Service (DoS) attacks?

A) By encrypting all incoming traffic to prevent attacks\
B) By directly blocking all suspicious incoming traffic\
C) By distributing website content across multiple servers and data centers\
D) By increasing the website's processing power

{{< question title="Answer" >}}
8. C) By distributing website content across multiple servers and data centers
{{< /question >}}

الموضوع الفرعي 3: الاستجابة لحادث حجب الخدمة
حالة استخدام
إذا تعرض موقع ويب لهجوم حجب خدمة مستمر فقد يكون من الضروري التصرف بسرعة لإعادة تشغيل الموقع وتفعيله. يصف مسار التعلّم هذا بعض الممارسات التي تسمح لمالكي الموقع التعافي من هجوم حجب الخدمة.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارس قادرًا على القيام بما يلي:
تحديد نوع هجوم حجب الخدمة الذي يتعرض له موقع الويب
تخفيف أو تحييد هجوم قيد التنفيذ
العرض 
بالنسبة لبعض المواقع (على سبيل المثال، مواقع المقامرة) يمكن حتى لحجب الخدمة لفترة وجيزة أن يشكل تهديدًا لبقاء الموقع وعادة ما يكون للمهاجمين دوافع مالية وسيستخدمون حجب الخدمة كتهديد للابتزاز. بالنسبة للمواقع التي تركز على المجتمع المدني، عادة ما يكون نموذج التهديد مختلفًا تمامًا، وعادة ما يتم التحكم في الهجمات من قبل المنافسين السياسيين (غالبًا ما تكون جهات فاعلة في الدولة القومية أو تلك المرتبطة بها أو التي تدعمها)، وتندرج تحت فئتين:
هجمات قصيرة (تدون ساعات أو أيام) تهدف إلى تخويف مالكي الموقع
هجمات مستمرة مصممة لإسكات الموقع بشكل دائم
يستحيل في بداية الهجوم معرفة النوع الذي يتعرض له الموقع، لكن لحسن الحظ تكون الاستجابة الفنية والتشغيلية هي ذاتها. وتنقسم الاستجابة الأساسية إلى ثلاث خطوات:
تحديد نوع الهجوم الذي يتعرض له الموقع
التخفيف من هذا الهجوم (يجب أن يكون الموقع قيد التشغيل في هذه المرحلة)
تعزيز حماية الموقع بشكل استباقي ضد الهجمات المستقبلية
تحديد نوع الهجوم
بشكل عام، يُلحظ هجوم حجب الخدمة عندما يلاحظ المستخدمون أن الموقع يصبح غير متاحًا أو يكونه أدائه متدهورًا، وفي بعض الحالات قد تقوم أنظمة مراقبة الأداء للموقع بإخطار مالكي الموقع بشكل استباقي. على أي حال تتمثل الخطوة الأولى في تحديد سبب تعطل الموقع. لاحظ أن أداء الموقع المتدهور أو عدم توفر الموقع قد لا يكون بسبب هجوم، ولكن بسبب أعطال المعدات والتكوين الخاطئ وتغييرات الموقع غير المدروسة أو عندما يصبح شيء ما على الموقع أمرًا سريع الانتشار. عند التحقيق في تدهور الموقع، يجب أن تراعي أنواع هجمات حجب الخدمة وأعراضها:
على مستوى الشبكة
حجمي: ستظهر أدوات تشخيص الشبكة مثل بينغ فقدان حزم كبير وأوقات إرسال ورد طويلة. إذا تمت استضافة موقع الويب في مزود خدمة الإنترنت أو خدمة استضافة الويب، فلن تكون المواقع الأخرى التي يستضيفها مزود خدمة الإنترنت/خدمة الاستضافة متاحة أيضًا.
مستندة إلى الثغرات: تميل أدوات تشخيص الشبكة إلى إظهار فقدان حزم كبير ولكنها غالبًا ما تظهر أوقات إرسال ورد طويلة. إذا تمت استضافة موقع الويب لدى مزود خدمة إنترنت/مزود استضافة، فستصبح المواقع الأخرى التي يستضيفها غير متاحة أيضًا.
على مستوى البروتوكول
حجمي: عادةً ما تُظهر أدوات تشخيص الشبكة زيادة في فقدان الحزمة وأوقات الإرسال والرد. عادةً ما تستغرق طلبات المتصفح المرسلة إلى الموقع وقتًا طويلًا وعادةً ما تصل إلى نهاية فترات الانتظار. إذا تمت استضافة موقع الويب على مزود استضافة ويب، فمن المحتمل ألا تكون المواقع الأخرى المستضافة على نفس الخادم متاحة، في حين أن المواقع المستضافة على خوادم أخرى ستعمل عادةً. لاحظ أن هجمات حجب الخدمة على مستوى البروتوكول الحجمي ستصل إلى أي اختناق سواء كان ذلك في الشبكة أو الخادم. على سبيل المثال، سيؤثر الهجوم على مستوى البروتوكول ضد خادم قوي على شبكة ضعيفة على الشبكة أكثر من الخادم.
مستندة إلى الثغرات: عادةً ما تُظهر أدوات تشخيص الشبكة فقدان حزم كبير وأوقات إرسال ورد طويلة. قد تكون طلبات المتصفح إلى الموقع بطيئة للغاية، أو قد ترد بوجود خطأً بسرعة. إذا تمت استضافة موقع الويب على مزود استضافة ويب، فمن المحتمل ألا تكون المواقع الأخرى المستضافة على نفس الخادم متاحة، في حين أن المواقع المستضافة على خوادم أخرى ستعمل عادةً. 
على مستوى التطبيق
عادةً ما تُظهر أدوات تشخيص الشبكة فقدان حزمات عادية وأوقات إرسال ورد طويلة. وقد يعمل المحتوى الثابت الذي يقدمه الموقع بشكل طبيعي أو قد يتدهور أيضًا. إذا تمت استضافة موقع الويب على مزود استضافة ويب، فمن المحتمل ألا تكون المواقع الأخرى المستضافة على نفس الخادم متاحة، في حين أن المواقع المستضافة على خوادم أخرى ستعمل عادةً. 
ستساعد معرفة نوع الهجوم الذي يحدث في توجيه استجابة مالكي الموقع، وفي حالة الاشتباه في أي نوع من الهجمات على مستوى الشبكة أو البروتوكول، من المهم التواصل مع مزود خدمة الإنترنت/مزود الاستضافة الخاص بالمواقع للمساعدة في تشخيص المشكلة. سيكون لديهم عادة إمكانية الوصول إلى أدوات تشخيص واستجابة أفضل للهجمات على مستوى الشبكة والبروتوكول. 
لكن ينبغي التحذير من أن هجوم حجب الخدمة على موقع ويب عادة يكون بالضرورة هجومًا ضد مزود خدمة الإنترنت/مزود الاستضافة لهذا الموقع أيضًا، وبالأخص بالنسبة للهجمات على مستوى الشبكة، قد يتأثر مزود خدمة الإنترنت بنفس القدر الذي يتأثر به موقع الويب المستهدف. لهذا السبب، سيقوم مقدمو خدمات الإنترنت أو مقدمو خدمات الاستضافة في بعض الأحيان بإغلاق مواقع الويب التي تستهدفها هجمات حجب الخدمة وذلك لحماية مقدم الخدمة نفسه. نأمل أن يوفر لك التعامل مبكرًا مع مزود خدمة الإنترنت/مزود الاستضافة في الموقع بعض إمكانيات التفاوض أو التنسيق إذا قرر مزود الخدمة إغلاق الموقع.
تخفيف التهديد
حسب نوع الهجوم وخدمة الاستضافة للموقع يمكن أن تختلف طرق التخفيف. 
الهجمات المستندة إلى الثغرات
بالنسبة لاستغلال حجب الخدمة على مستوى الشبكة والبروتوكول، بشكل عام ستدعو الحاجة إلى تطبيق تحديث للبرمجيات، ولأجل التخفيف قصير الأجل قد يقوم مزود خدمة الإنترنت الخاص بالموقع بحظر مصادر حركة المرور الضارة حتى يكون من الممكن تطبيق تحديثات البرامج.
الهجمات الحجمية
بالنسبة للهجمات الحجمية على مستوى الشبكة والبروتوكول، تُنفذ الاستجابة بشكل عام على مستوى مزود خدمة الإنترنت، وعادةً ما يقوم مزود خدمة الإنترنت بتحليل حركة مرور الشبكة الواردة وتحديد مصادر حركة المرور الضارة. يقوم بعد ذلك بحظر تلك المصادر على مستوى الشبكة والعمل مع مزود خدمة الإنترنت الخاص بهم لحظر تلك المصادر أيضًا. في نهاية المطاف، يتمتع مقدمو خدمات الإنترنت الأوليين (التمهيديين) الذين يمنعون حركة المرور الضارة الكبيرة بحجم يكفي لتمكينهم بسهولة من التعامل مع مستوى حركة المرور الضارة التي يتم إنشاؤها، وبالتالي يتمكن مقدمو خدمات الإنترنت النهائيين (التنفيذيين) (والموقع المستهدف) من استئناف العمليات العادية.
الهجمات على مستوى التطبيق
بالنسبة لهجمات حجب الخدمة على مستوى التطبيق، يتعامل مالك الموقع بشكل عام مع التخفيف بدلًا من مزود خدمة الإنترنت أو مزود الاستضافة، وبشكل عام، سيرسل المهاجم كمية كبيرة من الطلبات غالبًا ما تكون ذات طبيعة غير عادية إلى نقطة نهاية محددة على الموقع. ستستهلك نقطة النهاية هذه (أي صفحة الويب) كمية هائلة من الموارد التي تؤدي إلى إبطاء الموقع أو تعطيله. 
أفضل مكان لبدء البحث عن نقطة النهاية المستهدفة هو سجلات وصول خادم الويب، وإذا كان بإمكانك الاتصال بخادم الويب بطريقة مثل بروتوكول النقل الآمن (SSH)، حاول تنزيل (على سبيل المثال باستخدام برمجيات rsync أو SCP) بعض سجلات الوصول الحالية وبعض سجلات الوصول قبل بدء الهجوم. ابحث عن الصفحات التي تتعرض للهجمات بشكل أكثر تكرارًا أو الصفحات التي توفر الكثير من البيانات أو الصفحات التي تستغرق الكثير من الوقت لتنهي المعالجة، ولاحظ أن إعداد تسجيل الأحداث الجيد (كما هو موضح في القسم الفرعي 2) يمكن أن يجعل كل هذا أسهل بكثير. 
إذا لم تتمكن من الوصول إلى السجلات ولكن يمكنك الوصول إلى نسخة تطوير الموقع فيمكنك محاولة العثور على نقطة النهاية المستهدفة بنفسك، واطلّع على الموقع وابحث عن الصفحات التي يمكن أن تستهلك الكثير من الموارد. تشمل الأمثلة الصفحات التي تقوم بإجراء استعلامات قاعدة بيانات معقدة، وقراءة الملفات من نظام الملفات، وتغيير حجم الصور، وتقديم طلبات إلى مواقع ويب أخرى، وما إلى ذلك. إن المناقشة الكاملة لهذا الأمر في خارج نطاق مسار التعلم هذا، ولكنها قد تتضمن نظرة على بعض الثغرات الأمنية المضمنة كجزء من مسار تعلم تقييم أمان الويب. 
إذا تمكنت من العثور على نقطة النهاية المستهدفة المحتملة سواء عن طريق قراءة السجلات أو محاكاة المهاجم تتمثل الخطوة التالية في معرفة كيفية إحباط الهجوم، وأسرع طريقة هي استبدال تلك الصفحة على الموقع بصفحة ويب ثابتة. سيؤدي هذا إلى إيقاف الهجوم ولكنه سيؤدي إلى تعطيل جزء من الموقع. وكذلك إذا اعتمد الهجوم على شيء موجود على العديد من الصفحات أو جميعها على الموقع فقد يؤدي هذا الإصلاح إلى تعطيل الموقع.
سيكون الخيار الأفضل هو وضع قيود على نقطة النهاية المستهدفة لمنعها من استهلاك الكثير من الموارد. إذا كانت صفحة تُغير حجم الصور، حدد حدًا أقصى لحجم الصورة، وإذا كانت عملية بحث وكان المهاجم يستخدم استعلام بحث طويلًا ومعقدًا للغاية، ضع حدًا لطول الاستعلام. إذا كانت عملية بحث وأدخل المهاجم بحثًا يعرض الكثير والعديد من النتائج، غيّر الاستعلام ليكون ضمن نطاق اختيار فرعي يحد من عدد الصفوف قبل إجراء أي فرز وما إلى ذلك، ولكن قد يمكن لتغيير بسيط أن يجعل الهجوم غير فعال دون تغيير كيفية عمل الموقع للمستخدمين غير الخبيثين.
إذا تم إيقاف الموقع
إذا نجح هجوم حجب الخدمة في إيقاف موقع الويب (على سبيل المثال، يقوم مزود الاستضافة بإيقاف الموقع) فقد يكون من الممكن إعادة تشغيل الموقع بعدة طرق مختلفة. إذا كان لدى مالكي الموقع ممارسات تطوير ونشر جيدة (انظر القسم الفرعي 1 من مسار التعلّم هذا)، فقد يكون لديهم نسخة تطوير من الموقع جاهزة للنشر في مزود استضافة آخر، وإذا لم يكن الأمر كذلك فقد تتمكن أنت ومالكو الموقع من التفاوض مع مزود الاستضافة الحالي للموقع للوصول إلى خوادم الإنتاج ونسخ بيانات الموقع. 
قد تكون أسهل خطوة تالية هي إنشاء نسخة ثابتة تمامًا من الموقع واستضافته على صفحات مثل غيت هب أو أمازون إس 3 أو مساحات تخزين غوغل السحابي (GCS) من منصة سحابة غوغل (GCP). لإنشاء نسخة ثابتة من الموقع من إصدار المطوّر، يمكنك استخدام أداة مثل HTTrack لتتبع ارتباطات موقع الويب وتنزيل لغة تمييز النص التشعبي. جميع خدمات استضافة المواقع الثابتة المذكورة أعلاه مجانية أو غير مكلفة (على الرغم من أنه قد تكون هناك تكلفة لبروتوكول أمان طبقة النقل)، وهي مقاومة حجب الخدمة ويمكن إعدادها في غضون دقائق. وعلى الرغم من أن وجود نسخة ثابتة من الموقع قد لا يكون مثاليًا إلا أنه قد يكون تدبيرًا مؤقتًا جيدًا.
التعافي من هجوم حجب الخدمة
بمجرد التخفيف من حدة الهجوم، يمكن لمالك الموقع العمل على التعافي الكامل، ويتضمن ذلك بشكل عام المرور بعمليات إعداد الموقع الموصوفة في القسمين الفرعيين 1 و2 من مسار التعلّم هذا. في كثير من الأحيان، بمجرد استهداف الموقع بهجوم حجب الخدمة من المرجح أن يواجه هجمات مماثلة مرة أخرى في المستقبل. على هذا النحو فإن التحضير الدقيق مهم جدًا وبالأخص إذا تم استخدام هجوم على مستوى التطبيق، لأنه من المستحسن أن تمر على الموقع وتعليماته البرمجية للعثور على أي جوانب يمكن أن تستهلك كمية كبيرة من الموارد وتعديلها للحد من الموارد التي يمكن أن تستهلكها. كما أن وجود طريقة سهلة لإنشاء نسخة ثابتة من الموقع وعملية تمرنّت عليها لتحويل الموقع إلى نمط الاستضافة الثابتة قد يكون مفيدًا للمواقع التي يتم استهدافها بشكل متكرر.
موارد إضافية للقراءة
توفر الموارد الإضافية التالية مزيدًا من المعلومات حول هجمات حجب الخدمة وتركز في الغالب على آليات الهجمات منخفضة المستوى:
https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf 
https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks 
https://www.byos.io/blog/denial-of-service-attack-prevention 
يُقدم هذا الموقع المصغّر لمحة عامة جيدة حول وضع خطة استجابة حجب الخدمة لموقع معين، وهو مورد رائع إذا استطعت التخطيط مسبقًا أو التشاور عند التعافي من هجوم:
https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan
موارد التعلّم
اختبار مهارة
أسئلة اختيار من متعدد

تُشكل الهجمات الموزّعة لحجب الخدمة تهديدات كبيرة للبنية التحتية الرقمية الحديثة، بهدف تعطيل الخدمات من خلال إغراق أنظمة أو شبكات الهدف بتدفق حركة المرور. واستجابة لمثل هذه الهجمات، تُعد تدابير الاستجابة للحوادث ضرورية لتقليل الضرر وإعادة العمليات الطبيعية بسرعة وتتعمق هذه المجموعة من الأسئلة متعددة الخيارات في جوانب مختلفة من الهجمات الموزّعة لحجب الخدمة، بما في ذلك أنواعها وأهدافها واستراتيجيات التخفيف ومراحل الاستجابة للحوادث التي تنطوي عليها معالجة مثل هذه التهديدات. اختبر معلوماتك حول الهجمات الموزّعة لحجب الخدمة والاستجابة للحوادث من خلال الأسئلة التالية. إذا كان ذلك ممكنًا، ناقش إجاباتك على هذه الأسئلة مع زميل أو مرشد يساعد في التحقق من فهمك للموضوع بشكل صحيح.
1. أي مما يلي ليس نوعًا شائعًا من الهجمات الموزّعة لحجب الخدمة؟
   أ) الفلود المتزامن
   ب) بينغ فلود
   ج) انتحال نظام أسماء المجالات
   د) فلود بروتوكول مخطط بيانات المستخدم

2. ما الهدف الرئيسي من الهجوم الموزّع لحجب الخدمة؟
   أ) سرقة البيانات الحساسة
   ب) الوصول غير المصرّح به إلى النظام
   ج) غمر نظام أو شبكة مستهدفة
   د) تشفير الملفات وطلب فدية

3. ما هي التقنية الشائعة الاستخدام للتخفيف من هجمات تضخيم نظام أسماء المجالات الموزّعة لحجب الخدمة؟
   أ) تنفيذ تصفية الدخول لمنع حركة المرور باستخدام عناوين بروتوكول الإنترنت التي تمت سرقتها
   ب) استخدام تقييد المعدّل للتحكم في حجم حزم استجابة نظام أسماء المجالات التي تترك الخوادم موثوقة
   ج) نشر أنظمة منع التسلل لاكتشاف ومنع حركة المرور الضارة في محيط الشبكة
   د) إجراء عمليات فحص منتظمة للثغرات الأمنية لتحديد ثغرات خادم نظام اسم المجال وتصحيحها

4. ما هي مرحلة الاستجابة للحوادث التي تنطوي على تحديد طبيعة ونطاق الهجوم الموزّع لحجب الخدمة؟
   أ) التحضير
   ب) الكشف والتحليل
   ج) الاحتواء والإزالة والتعافي
   د) نشاط ما بعد الحادث

5. ما الهدف الأساسي خلال مرحلة احتواء الاستجابة لحوادث الهجمات الموزّعة لحجب الخدمة؟
   أ) إيقاف تشغيل النظام بالكامل
   ب) القضاء على وصول المهاجم
   ج) تحديد نقاط الضعف للهجمات المستقبلية
   د) استعادة الخدمات المتضررة في حين منع الضرر الإضافي

6. في سياق الاستجابة للحوادث، ما الذي تتضمنه مرحلة "الإزالة" فيما يتعلق بالهجمات الموزّعة لحجب الخدمة؟
   أ) استعادة البيانات من النسخ الاحتياطية
   ب) التحقيق في أصل الهجوم
   ج) تنفيذ حلول طويلة الأجل لمنع هجمات مماثلة
   د) إعادة تشغيل الأنظمة المتأثرة

7. ما الإجراء الذي يتم تنفيذه عادةً خلال مرحلة التعافي من الاستجابة للحوادث بعد الهجمات الموزّعة لحجب الخدمة؟
   أ) إجراء تحليل ما بعد الحادثة
   ب) تطبيق تصحيحات الأمان على الأنظمة المعرضة للخطر
   ج) تحديد نواقل الهجوم الجديدة
   د) بدء الإجراءات القانونية ضد المهاجم

8. كيف يمكن لشبكات توصيل المحتوى المساعدة في حماية مواقع الويب من هجمات حجب الخدمة؟
   أ) عن طريق تشفير كامل حركة المرور الواردة لمنع الهجمات
   ب) عن طريق حجب كامل حركة المرور الواردة المشبوهة مباشرة
   ج) من خلال توزيع محتوى الموقع عبر خوادم ومراكز بيانات متعددة
   د) عن طريق زيادة قوة المعالجة لدى الموقع



إجابات صحيحة:
1. ج) انتحال نظام أسماء المجالات؛
2. ج) غمر نظام أو شبكة مستهدفة؛
3. ب) استخدام تقييد المعدّل لضبط حجم حزم استجابة نظام أسماء المجالات التي تترك الخوادم موثوقة؛ 
4. ب) الكشف والتحليل؛
5. د) استعادة الخدمات المتضررة مع الوقاية من الضرر الإضافي؛
6. ج) تنفيذ حلول طويلة الأجل للوقاية من هجمات مماثلة؛ 
7. ب) تطبيق تصحيحات الأمان على الأنظمة المعرضة للخطر؛
8. ج) من خلال توزيع محتوى الموقع عبر خوادم ومراكز بيانات متعددة


## Learning Resources

{{% resource title="DDoS: the inconvenient business visitor" languages="English" cost="Free" description="A look at how some web hosting providers might want to abandon clients targeted by DDoS attacks" url="https://www.qurium.org/alerts/azerbaijan/ddos-the-inconvenient-business-visitor/" %}}

{{% resource title="GitHub Survived the Biggest DDoS Attack Ever Recorded" languages="English" cost="First articles on WIRED are free, further ones might require a subscription" description="A 2018 piece on how Github took on a massive DDoS attack and continued to operate thereafter" url="https://www.wired.com/story/github-ddos-memcached/" %}}

{{% resource title="Understanding and Responding to Distributed Denial-of-Service Attacks" languages="English" cost="Free" description="A 2022 CISA guide on the topic, looking at what steps to take before, during, and after an attack" url="https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf" %}}

{{% resource title="MS-ISAC Guide to DDoS Attacks" languages="English" cost="Free" description="A guide which provides an overview of common types of DDoS attacks, along with general recommendations on mitigations" url="https://learn.cisecurity.org/ms-isac-guide-to-ddos-attacks" %}}

{{% resource title="Denial-of-Service (DoS) Attack Prevention: The Definitive Guide" languages="English" cost="Free" description="This piece outlines a few steps that admins can take to prevent or mitigate the impact of DoS attacks" url="https://www.byos.io/blog/denial-of-service-attack-prevention" %}}

{{% resource title="Denial of Service (DoS) guidance" languages="English" cost="Free" description="The UK National Security Cyber Centre’s guides on DoS attacks and how to defend organizations against them" url="https://www.ncsc.gov.uk/collection/denial-service-dos-guidance-collection/a-minimal-denial-of-service-response-plan" %}}
