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

In the Detecting, Investigating and Tracking Malicious Infrastructure learning path, we’ve also[ created a section on write-ups and reports](/en/learning-path/1/module-8/) that could be of help.

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

الموضوع الفرعي 5: إنشاء ومشاركة مؤشرات الاختراق
حالة استخدام
بمجرد تحليل البرمجية الضار، يمكنك مساعدة المجتمع (وأيضًا نفسك وبقية العالم) من خلال مشاركة النتائج التي توصلت إليها. تُعدّ البرمجيات الضارة الجديدة نادرة نسبيًا وبمجرد استخدامها عادة ما يتم إعادة استخدامها على نطاق واسع، ومن خلال مشاركة النتائج التي توصلت إليها، يمكنك مساعدة الجميع بعدة طرق:
إذا تم استهداف أحد أفراد المجتمع من قبل ممثل تهديد، فمن المحتمل أن يستهدف ممثل التهديد أعضاء آخرين في المجتمع. ومن خلال مشاركة النتائج التي توصلت إليها، يمكنك المساعدة في زيادة الوعي ونأمل أن تساعد المدافعين الرقميين على منع الهجمات الأخرى أو التخفيف من حدتها.
يُعدّ تحليل البرمجيات الضارة الجديدة إنجازًا مهمًا ويجب أن تفخر بذلك وأن تكافأ أيضًا على جهودك. من خلال مشاركة عمليتك ونتائجك من المرجح أن يتم تقديرك لخبرتك مما يزيد من فرصك للعمل والتعاون لاهتمامك في هذا المجال.
أخيرًا من خلال إنشاء ومشاركة مؤشرات الاختراق، يمكنك المساعدة في الكشف التلقائي عن البرمجيات الضارة قيد البحث. إذا قام منشئ برامج الكشف والوقاية بدمج مؤشرات الاختراق هذه في قواعد بياناتهم سيجعل ذلك البرمجيات الضارة أقل فائدة بكثير لممثلي التهديد ويعزز أمن الناس في جميع أنحاء العالم.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يتوقع من الممارسين أن يكونوا قادرين على:
فهم الأنواع المختلفة لمؤشرات الاختراق وكيفية مشاركتها
فهم قواعد يارا (YARA) وسنورت (Snort)
إنشاء ومشاركة تقرير موجز عن البرمجيات الضارة التي عثروا عليها
العرض 
أنواع مؤشرات الاختراق
يمكننا تقسيم مؤشرات الاختراق على نطاق واسع إلى مقروءة من قبل الإنسان ومقروءة من قبل الآلة، ويمكن أن تكون مؤشرات الاختراق المقروءة من قبل الآلة أي شيء يمكن أن يستخدمه الكمبيوتر للكشف عن البرمجيات الضارة، وهناك العديد من التنسيقات التي تحاول إظهار تمثيل فعلي لتعقيد سلوك البرمجيات الضارة. لكن هناك العديد من التنسيقات البسيطة التي يسهل إنشاؤها واستخدامها والتي تحظى بشعبية كبيرة:
شفرات تجزئة MD5 أو خوارزمية التجزئة الآمنة لملفات البرمجيات الضارة
قواعد يارا للتعرّف على ملفات البرمجيات الضارة من خلال كشف سلاسل نصية أو سلاسل ثنائية محددة داخل ملف
مواصفات الخادم (عناوين بروتوكول الإنترنت أو أسماء المضيف مع أو بدون أرقام المنافذ وعناوين مواقع الويب وما إلى ذلك) للتعرّف على حركة مرور البرمجيات الضارة على الشبكة
قواعد سنورت للتعرّف على حركة مرور البرمجيات الضارة على الشبكة

شفرات تجزئة الملفات ومواصفات الخادم هي الأسهل من حيث الإنشاء والاستخدام. ولكن في بعض الأحيان يكون التعقيد الإضافي لقواعد يارا أو سنورت مطلوبًا للتعرّف على البرمجيات الضارة. على سبيل المثال، قد تتصل البرمجيات الضارة بخادم الأوامر والتحكم الخاص بها على أي مضيف ومنفذ، ولكنها ترسل رسالة محددة إلى الخادم وبالتالي ستحتاج إلى شيء مثل قاعدة سنورت. وبالمثل، قد يحتوي ملف البرمجيات الضارة على محتوى مختلف مع كل إصابة ولكنه يحتوي دائمًا على سلسلة نصية فريدة محددة وبالتالي تحتاج إلى شيء مثل قاعدة يارا.

تُعدّ مؤشرات الاختراق المقروءة من قبل الإنسان وصفًا للأشياء التي تقوم بها البرمجيات الضارة والتي تكون مفيدة للأشخاص الذين يحققون في اختراق محتمل ولكن أقل من ذلك بالنسبة لأجهزة الكمبيوتر، وهي تأتي بشكل أوصاف سردية لأنشطة البرمجيات الضارة وتتميز هذه بأنها عادة ما تكون أسهل من حيث الإنشاء والفهم، ويمكن تحويلها إلى مؤشرات اختراق مقروءة من قبل الآلة لمجموعة متنوعة من أنظمة الكشف.

يحتوي تقرير تحليل البرمجيات الضارة الجيد عمومًا على وصف يمكن أن يقرأه البشر حول البرمجيات الضارة وقدراتها، إلى جانب بعض مؤشرات الاختراق التي يمكن أن تقرأها الآلة في ملحق مما يضمن أن يكون التقرير مفيدًا لأوسع جمهور.
إنشاء مؤشرات الاختراق
تُقلل مؤشرات الاختراق الجيدة من كل من النتائج الإيجابية الخاطئة والنتائج السببية الخاطئة. نظرًا لأن البرمجيات الضارة نادرة على الأرجح في معظم الأنظمة، فإن كشف الملفات السليمة على أنها ضارة (نتائج إيجابيات خاطئة) يمكن أن تولد إحساسًا زائفًا بوجود خطر وتفضي إلى حذف الملفات السليمة. وبالمثل يمكن أن تكون مؤشرات الاختراق التي تفشل في اكتشاف جزء كبير من تلك البرمجيات الضارة (النتائج السلبية الخاطئة) خطيرة لأنها تولد شعورًا زائفًا بالأمان لدى المدافعين. 
لكن مع مراعاة هذه الأمور، دعونا نتناول بعض تنسيقات مؤشرات الاختراق البسيطة الشائعة.
شفرات تجزئة الملفات
تُعدّ شفرات تجزئة الملفات هي من بين أبسط مؤشرات الاختراق حيث كل ما عليك القيام به هو حساب شفرة التجزئة التشفيرية (أو اثنتين) الخاصة بملف والتي تكون فريدة في البرمجيات الضارة. تقليديًا تُستخدم شفرات تجزئة MD5 وخوارزمية التجزئة الآمنة 256 وعلى الرغم من وجود العديد من نقاط الضعف في MD5، ليست ذات أهمية بشكل عام في سياق مؤشرات الاختراق. تتمثل الجوانب السلبية الرئيسية لشفرات تجزئة الملفات في أن أي تغيير في الملف سيسمح للبرمجيات الضارة بتجاوز الكشف القائم على مؤشرات الاختراق. ومن السهل جدًا في معظم الحالات إلحاق بايت بالملف مما يتسبب في توليد شفرات تجزئة مختلفة تمامًا لكن لا تزال شفرات تجزئة الملفات فعالة بشكل مدهش في اكتشاف البرمجيات الضارة.
قواعد يارا (YARA)
تُعدّ قواعد يارا هي الخطوة متطورّة من حيث التعقيد بعد شفرة تجزئة الملفات حيث تجمع قواعد يارا معًا معلومات حول البرمجيات الضارة، وقائمة بالتسلسلات الثنائية أو السلاسل النصية في الملف وقواعد حول السلاسل النصية/التسلسلات التي يجب أن تكون في الملف (على سبيل المثال، السلسلة النصية 1 أو السلسلة النصية 2، وكذلك السلسلة النصية 3). تحافظ هذه القواعد على توازن جيد بين البساطة والمرونة. لمزيد من المعلومات حول يارا، راجع الموقع الرسمي، وأيضًا منشور المدونة هذا الذي يشرح إنشاء قواعد يارا لملف البرمجيات الضارة.
إحدى الأشياء التي يجب مراعاته عند العمل مع يارا هو التأكد من أن قاعدتك خالية من النتائج الإيجابية الخاطئة. على سبيل المثال، يمكن لقاعدة تنص على أنه "لا يمكن تشغيل هذا البرنامج في وضع دوس (DOS)" أن توافق كل ملف قابل للتنفيذ في نظام ويندوز.ما بعد إنشاء قواعد يارا الخاصة بك لبعض البرمجيات الضارة، من المحبذ تشغيلها على عدة أنظمة نأمل أن تكون غير مصابة للتأكد من أنها لا تُحدد الملفات غير الضارة. هناك أدوات للمساعدة في إنشاء قواعد يارا مثل يارجن (yarGen) التي تُحلل ملف البرمجيات الضارة وتنشئ نقطة بداية لقاعدة يارا التي لا تتضمن سلاسل نصية جيدة معروفة. تأكد من قراءة ريد مي (README) ومنشورات المدونة المرفقة قبل استخدام الأداة.
معرّفات الخادم
غالبًا ما تتصل البرمجيات الضارة بخادم القيادة والتحكم عن بُعد لتلقي التعليمات وتنزيل مراحل البرمجيات الضارة اللاحقة وما إلى ذلك. إذا كان من الممكن التنبؤ بالخوادم التي ستتصل بها البرمجيات الضارة (على سبيل المثال، موجودة في التعليمات البرمجية في الملف الثنائي)، فمن الممكن إنشاء مؤشرات الاختراق التي تتعرف على حركة مرور الشبكة الضارة ويمكن أن تشمل على (على سبيل المثال):
عنوان بروتوكول الإنترنت لخادم أو لبعض الخوادم
اسم مضيف خادم واحد أو أكثر
أرقام المنافذ التي تستخدمها البرمجيات الضارة عند الاتصال بالخادم (ثمانية منها بمفردها أو بالاقتران مع عناوين بروتوكول الإنترنت أو أسماء المضيف)
عناوين مواقع الويب أو أجزاء عناوين مواقع الويب التي تطلبها البرمجيات الضارة
تتشابه معرّفات الخادم مع شفرات تجزئة الملفات من حيث أنها بسيطة للغاية ولكنها أيضًا هشة للغاية ولكن مثل شفرات تجزئة الملفات تُعدّ أيضًا فعّالة جدًا.
قواعد سنورت (Snort)
إذا كانت معرّفات الخادم تشبه شفرات تجزئة الملفات لحركة مرور الشبكة، فإن قواعد سنورت تُشبه قواعد يارا لحركة المرور. تُعد قواعد سنورت نظامًا مفتوح المصدر للكشف عن التطفل ولديها محرك قواعد متطور ومستعمل على نطاق واسع. قواعد سنورت أكثر تعقيدًا من قواعد يارا ولكن لا يزال من الممكن التعامل معها إلى حد ما. يمكن أن تكون وثائق المستخدم الرسمية مُضنية إلى حد ما ولكن معظم قواعدها بسيطة إلى حد ما. تصف هذه الصفحة بنية قواعد سنورت وتُقدم بعض الأمثلة البسيطة. أخيرًا، إليك مجموعة من قواعد سنورت لبعض البرمجيات الضارة الحقيقية.

كما هو الحال مع قواعد يارا يمكن أن يكون من السهل جدًا توليد نتائج إيجابية خاطئة عن طريق الخطأ. يمكنك تسجيل بيانات بضعة أيام من حركة مرور شبكتك وتشغيل أي قواعد سنورت تُنشئها لفحص لقطات الحزمة هذه.
اختيار مؤشرات الاختراق المناسبة
عند التفكير في إنشاء مؤشرات الاختراق، عليك البحث عن المكون الجوهري في البرمجيات الضارة بشكل عام مقابل ما يخص العينة التي قمت بتحليلها وفيما يلي بعض الأمثلة:
إذا كانت المرحلة الأولى من البرمجيات الضارة هي ملف PDF يحتوي على محتوى مخصص للضحية ولكن يحوي أيضًا ثغرة لتنزيل وتثبيت مرحلة ثانية، فسيكون من غير المناسب استخدام شفرة تجزئة ملف PDF وقد ترغب بدلاً من ذلك في إنشاء قاعدة يارا تُحدد التعليمات البرمجية للثغرة في ملف PDF.
إذا قامت برمجية ضارة بإعادة استخدام أجزاء من بعض البرمجيات الضارة الموجودة مسبقًا والمعروفة ولكن أيضًا مع تضمين مكون جديد، فستحتاج إلى إنشاء مؤشرات الاختراق تضم ذلك المكون الجديد، وسيساهم ذلك في منع التصنيف الخاطئ.
إذا أتت البرمجية الضارة مع إعدادات تكوين للخادم الذي تتصل به، فسيكون من غير المناسب إنشاء مؤشرات اختراق باستخدام هذا الخادم لأنه من المحتمل أن تستخدم حملات الهجمات المختلفة خوادم مختلفة. 
وفي حال تحديد خادم الأوامر والتحكم للبرمجيات الضارة من خلال اسم المضيف في البرمجية الضارة، فإن إنشاء قاعدة اكتشاف على الشبكة بناءً على عنوان بروتوكول الإنترنت سيؤدي إلى نتائج إيجابية خاطئة ونتائج سلبية خاطئة ويجب بدلاً من ذلك أن تستخدم قاعدة الشبكة اسم المضيف.
إنشاء تقرير
في هذه المرحلة، يجب أن تعرف كيف تلقيت البرمجيات الضارة وماذا تفعله وكيفية كشفها. تُفصّل هذه المقالة بعض الأشياء التي يجب أن يحتوي عليها تقرير تحليل البرمجيات الضارة، ويُقدم منشور المدونة هذا من قبل مدرب معهد سانز التكنولوجي (SANS) بعض النصائح للتقرير العام. من المفيد أيضًا أن تشرح سلسلة أفكارك في الأقسام السردية، حيث يمكن لذلك أن يُعلّم متعلمي تحليل البرمجيات الضارة وأن يساعد أيضًا محللي البرمجيات الضارة الأكثر خبرة في مساعدتك في حالة فاتك شيء ما. 

يُعدّ تنسيب البرمجيات الضارة إلى ممثل تهديد معين نشاطًا شائعًا بين محللي البرمجيات الضارة ولكن من الصعب الحصول على نتائج دقيقة. لا تشعر بالحاجة إلى تنسيب الملفات إذا لم تكن متأكدًا فإن أهم شيء هو نشر مؤشرات الاختراق. 

في مسار تعلّم فحص البنية الأساسية الضارة وتتبعها وكشفها، أنشأنا أيضًا قسمًا حول عمليات الكتابة والتقارير التي يمكن أن تكون مفيدة.

يمكن لمنشورات المدوّنات العلنية التالية أن تلهمك في كتابة تقاريرك الخاصة، حيث تستخدم جميعها أشكال وتنسيقات مختلفة ولكنها تحتوي جميعها أيضًا على مؤشرات الاختراق. 
مؤشرات الاختراق الخاصة بمنظمة العفو الدولية للبرمجيات الضارة الجديدة التي تعمل بنظام أندرويد
منشور سيتيون لاب (Citizen Lab) حول ثغرات كوادريم (QuaDream)
تقرير تحقيق هيومن رايتس ووتش (Human Rights Watch) حول حملة تصيد احتيالي
تحقيق بيلنغكات (Bellingcat) في حملة تصيد تستهدف مستخدمي بروتون ميل (ProtonMail)
تقرير مؤسسة الحدود الإلكترونية Electronic Frontier) Foundation) حول إصدار باندوك (Bandook) جديد
تحليل برمجية الفدية الضارة ميراج فوكس (MirageFox)
تحليل البرنامج السارق لبيانات ويندوز المسمى نون (Krown)
مشاركة التقرير
بمجرد إنشاء تقرير، هناك عدة الأشياء يمكنك القيام بها:
مشاركته مع زملائك من المدافعين الرقميين من المجتمع المدني
نشره بصورة علنية
مشاركة عينات البرمجيات الضارة مع شركات مكافحة البرمجيات الضارة
يمكنك القيام بواحد من هذه الأشياء أو جميعها أو يمكنك حتى ألا تقوم بأي منها. إذا كنت تعمل مع عميل تعرض جهازه للاختراق، فستحتاج بالطبع إلى التأكد من أنه لا يمانع بمشاركة التقرير ومن الأفضل الحصول على موافقته كتابيًا.
إذا كنت عضوًا في منظمة مثل سيفيسيرت فهي من الأمكنة الرائعة لمشاركة النتائج التي توصلت إليها ومن المرجح أن يقرأ الأعضاء الآخرون تقريرك ويقدموا ملاحظات ويتخذوا إجراءات بناء عليه. 
يمكنك أيضًا نشر النتائج التي توصلت إليها على مدونتك أو في مكان ما مثل غيت هاب (GitHub)، وهو أمر يتطلب القليل من الجهد ولكن يمكن أيضًا أن يكون محدودًا في تأثيره. لكن قد يكون تقريرك لا يقدر بثمن لشخص يبحث في الإنترنت عن شفرة تجزئة خوارزمية التجزئة الآمنة للملف أو معرّف خادم.
أخيرًا، إذا كان لديك عينات من البرمجيات الضارة، فيمكنك إرسالها إلى كبرى شركات مكافحة الفيروسات. من غير المرجح أن يقرؤوا تقريرًا ولكنهم قد يحللون البرمجيات الضارة ويدرجون توقيعاتها في منتجهم. لمزيد من المعلومات حول إرسال البرمجيات الضارة، تُوفر هذه الصفحة روابط تضم معلومات الإرسال لمختلف الشركات.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة
أجب عن السؤال 7.3 وأكمل التمرين 7.3 من الدليل الميداني للاستجابة للحوادث.
اختبار مهارة
ناقش مع مُرشِدك أو نظيرك كيف ستتعامل مع كل عنوان من عناوين بروتوكول الإنترنت هذه في تقريرك حول البرمجيات الضارة. هل يمكن أن تكون بعضها مؤشرات اختراق أفضل من غيرها؟
عنوان بروتوكول الإنترنت على موقع خدمات أمازون Amazon) Web Services) يستضيف برمجيات ضارة
عنوان بروتوكول إنترنت لعقدة خروج Tor
عنوان بروتوكول إنترنت سكني يبحث عن نقاط الضعف في موقع ويب
عنوان بروتوكول إنترنت على شبكة تسليم محتوى (CDN) مثل كلاود فلير (Cloudflare)



## Learning Resources

{{% resource title="What is hashing and how does it work?" languages="English" cost="Free" description="Introduction to file hashes and their role in malware detection." url="https://www.sentinelone.com/cybersecurity-101/hashing/" %}}

{{% resource title="YARA" languages="English" cost="Free" description="Official homepage of YARA, used for pattern matching in malware research." url="https://virustotal.github.io/yara/" %}}

{{% resource title="Threat hunting 101 with Yara rules" languages="English" cost="Free" description="Using YARA rules to detect malicious files." url="https://medium.com/@laroshkhanpk/threat-hunting-101-hunting-with-yara-rules-82aff0898674" %}}

{{% resource title="yarGen" languages="English" cost="Free" description="Tool to automate string generation for YARA rules." url="https://github.com/Neo23x0/yarGen" %}}

{{% resource title="Snort rules" languages="English" cost="Free" description="Introduction to Snort rules for network intrusion detection." url="https://docs.snort.org/start/rules" %}}

{{% resource title="Snort rules examples and usage" languages="English" cost="Free" description="Examples of Snort rules for beginners." url="https://www.sapphire.net/security/snort-rules-examples/" %}}

{{% resource title="What to include in a malware analysis report" languages="English" cost="Free" description="Guide on essential elements for a malware analysis report." url="https://zeltser.com/malware-analysis-report/" %}}

{{% resource title="Writing malware reports" languages="English" cost="Free" description="Guide on best practices for writing malware reports." url="https://www.sans.org/blog/writing-malware-reports/" %}}
