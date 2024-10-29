+++
style = "module"
weight = 5
title = "Forensic methods on live Windows and macOS systems"
description = "Sometimes, it's necessary to dig deeper into a system to figure out what's wrong. We can do this by investigating processes, persistence mechanisms, and network traffic"
+++

## Use Case

Direct inspection of a device can be necessary to understand what is happening on it and to identify suspicious processes, artifacts, or traffic. Go beyond scanning tools by using methods to take a deeper look at what is happening on a device.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand ways of inspecting running processes and methods to sort out potentially suspicious processes
- Understand common persistence mechanisms and ways of checking for them
- Inspect network traffic for suspicious communications

---
## Main Section 
Forensic methods require more knowledge about the internal operations of an operating system as well as developing an instinct for what is normal vs abnormal findings.

### Windows

The [Guide to Quick Forensics](https://pellaeon.gitbook.io/mobile-forensics/) provides a good introduction to forensic approaches to device inspection. The guide includes an introduction to the important suite of Sysinternals tools made available from Microsoft. Complete the guide sections on [Autoruns](https://pellaeon.gitbook.io/mobile-forensics/windows/autoruns), [Process Explorer](https://pellaeon.gitbook.io/mobile-forensics/windows/processes), and [TCPView](https://pellaeon.gitbook.io/mobile-forensics/windows/network).[^1]

After completing the guided activities, you should be able to:

- Understand what the [SysInternals suite](https://learn.microsoft.com/en-us/sysinternals/) is, and how to use some of the tools useful for forensic examination.
- Read and understand results from Sysinternals Autoruns tool and understand what are the different locations and methods for persistence (by understanding the different tabs displayed in the tool)
- Read and filter results from SysInternals Autoruns tools to identify only non-Microsoft, unsigned binaries, and how to check file hashes against VirusTotal
- Know how to read and understand results from Process Explorer, including how to check for running processes with unverified file signatures and how to check process hashes against VirusTotal.

Microsoft’s SysInternal tools are widely used and you will be able to find additional tutorials using them around the web, however the [Guide to Quick Forensics](https://pellaeon.gitbook.io/mobile-forensics/) gives a good targeted introduction.

### MacOS

There are [some macOS tools](https://objective-see.org/tools.html) created by Objective-See which can help detect potentially suspicious activity on a system. Many of the Objective-See tools have an integrated VirusTotal search; this is a tool we will also mention more later on in this learning path. For a quick tutorial on VirusTotal, check out [chapter 7 of the field guide](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf). We recommend that any learners who want to become more familiar with macOS look at the following tools:

- LuLu: a free and feature-rich firewall application for macOS. It can list all outgoing network connections, and, therefore, detect any attempts by malware to communicate with a server. Check out the whole [LuLu manual](https://objective-see.org/products/lulu.html), which shows how you can look up specific processes which try to make a network connection. If you are unsure about specific processes, you can also look it up on VirusTotal (LuLu has a built-in search) or search for it in your favorite search engine and see what others say about it.
- OverSight: A tool which alerts the user every time the microphone or webcam are enabled. If malware attempts to capture information through the microphone or camera, then the tool should alert a user or analyst thereof.
- KnockKnock and BlockBlock: Those two applications detect software which starts up when the user logs in to the system. It can therefore alert the user or analyst to malware which has persistence--or starts to run again on every restart. KnockKnock can provide a list of persistent software, while BlockBlock sends an alert every time a new persistent component is installed.
- KextViewer: A tool to review and inspect kernel extensions, packages which extend the core operating system code and run at the highest privilege level.

## Practice

### Windows and macOS

1. Open your operating system’s process manager and read through its outputs. Do you notice any processes which look out of place or which consume a weirdly high or low amount of resources? Note them down and search the web for them to learn more about them.
2. While tracking network connections as described in the Mobile Forensics Guide (articles for [Windows](https://pellaeon.gitbook.io/mobile-forensics/windows/network) and [macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network)), open one or two apps which connect to the internet and note which IP addresses they connect to. Is there anything surprising about any of those connections or IP addresses?
3. Look through startup items and separate them between those which come from your operating system vendor, those which come from other vendors. Look up three of them online to learn more about what they do. If you are working with a peer or mentor, discuss the findings with them.

### Android

Read through this guide: [Beginner guide - How to handle a potentially malicious mobile app - PiRogue tool suite (pts-project.org)](https://pts-project.org/guides/g3/)

## Skill Check

1. Download a recent piece of malware from Malware Bazaar. Upload it to a public sandbox (such as Triage) and check what it does on the system. \
   Write down your findings and then discuss them with a mentor or a peer who will make sure that you have performed the exercise correctly. \
   (Note: it may happen that the malware appears to ‘do nothing’. In that case, discuss this with a mentor and peer and try a different kind of malware.)
2. (Optional, additional exercise) Check out [this analysis](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html) from security company Trend Micro and compare it with [this report](https://tria.ge/240207-qlmmrahhgr/behavioral1) on Triage. Discuss those two with a mentor or peer, focusing on issues such as the ways in which both reports label TTPs and try to explain the malware. Talk about which format you find more readable and why. (Note: this malware, that Trend Micro calls ‘Earth Preta’, is also known as ‘Mustang Panda’, and has targeted media organizations and NGOs, most notably in Myanmar.)

الموضوع الفرعي 5أ: طرق التحليل الجنائي على أنظمة ويندوز وماك أو إس قيد التشغيل
حالة استخدام
قد يكون الفحص المباشر للجهاز ضروريًا لفهم ما يحدث عليه وتحديد العمليات المشبوهة أو آثارها أو حركة المرور.  لا تعتمد على أدوات الفحص فقط واستخدم طرقًا لإلقاء نظرة أعمق على ما يحدث على الجهاز.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم طرق فحص العمليات الجارية وطرق كشف العمليات التي يحتمل أن تكون مشبوهة
فهم آليات البقاء الشائعة وطرق التحقق منها
فحص حركة مرور الشبكة بحثًا عن الاتصالات المشبوهة
العرض 
تتطلب طرق التحليل الجنائي معرفة إضافية بالعمليات ضمن لنظام التشغيل بالإضافة إلى تطوير حدس يدلّك على ما هو طبيعي مقابل النتائج غير الطبيعية.
ويندوز
يوفر دليل التحليل الجنائي السريع مقدمة جيدة لمناهج التحليل الجنائي لفحص الجهاز  ويتضمن الدليل مقدمة إلى المجموعة المهمة من أدوات سيس إنترنالز(Sysinternals) المتاحة من مايكروسوفت. أكمل أقسام الدليل حول أوتورنز (Autoruns) وبروسس اكسبلورر (Process Explorer) وتي سي ب فيو (TCPView).
بعد الانتهاء من الأنشطة في هذا الفصل، يجب أن تكون قادرًا:
فهم ماهية مجموعة سيس إنترنالز وكيفية استخدام بعض الأدوات المفيدة لإجراء تحليل جنائي.
قراءة وفهم النتائج من أداة أوتورنز من سيس إنترنالز وفهم مختلف المواقع وطرق البقاء (من خلال فهم علامات التبويب المختلفة المعروضة في الأداة)
قراءة وتصفية النتائج من أداة أوتورنز من سيس إنترنالز لتحديد الثنائيات غير الموقّعة من مايكروسوفت فقط، وكيفية التحقق من شفرة تجزئة الملفات مقابل فايروستوتال
معرفة كيفية قراءة وفهم النتائج من بروسس إكسبلورر، بما في ذلك كيفية التحقق من العمليات الجارية ذات توقيعات الملفات التي لم يتم التحقق منها وكيفية التحقق من شفرة تجزئة العملية مقابل فايروستوتال.
تُستخدم أدوات مايكروسوفت إنترنتالز على نطاق واسع وستتمكن من العثور على برامج تعليمية إضافية تستخدمها عبر الويب ولكن يُقدم دليل التحليل الجنائي السريعمقدمة مستهدفة جيدة.
نظام ماك أو إس
هناك بعض أدوات ماك أو إس التي أنشأتها أوبجكتف سي (Objective-See) والتي يمكن أن تساعد في اكتشاف النشاط المشبوه المحتمل على النظام. تحتوي العديد من أدوات أوبجكتف سي على بحث فايروستوتال متكامل وهذه أداة سنذكرها أيضًا لاحقًا في مسار التعلّم هذا. يمكن الاطلاع على دليل تعليمي سريع حول فايروستوتال في الفصل 7 من الدليل الميداني. نوصي أي متعلمين يرغبون بتعلم المزيد عن نظام ماك أو إس بإلقاء نظرة على الأدوات التالية:
لولو (LuLu): تطبيق جدار حماية مجاني ويتمتع بالعديد من الميزات لنظام ماك أو إس. يمكنه سرد جميع اتصالات الشبكة الصادرة، وبالتالي اكتشاف أي محاولات من قبل البرمجيات الضارة للتواصل مع خادم. تحقق من دليل لولو الكامل الذي يوضح كيف يمكنك البحث عن عمليات محددة تحاول إجراء اتصال بالشبكة. إذا لم تكن متأكدًا من عمليات محددة، فيمكنك أيضًا البحث عنها على فايروستوتال (لدى لولو ميزة بحث مضمّنة) أو البحث عنها في محرك البحث المفضل لديك لتعرف ما يقوله الآخرون عنها.
أوفرسايت (OverSight): أداة تُنبه المستخدم في كل مرة يتم فيها تفعيل الميكروفون أو كاميرا الويب وإذا حاولت البرمجيات الضارة التقاط المعلومات من خلال الميكروفون أو الكاميرا، من المفترض أن تقوم الأداة بتنبيه المستخدم أو المحلل.
نوك نوك (KnockKnock) وبلوكبلوك (BlockBlock): يكتشف هذان التطبيقات التي يبدأ تشغيلها عندما تسجيل المستخدم الدخول إلى النظام وبالتي يمكنها تنبيه المستخدم أو المحلل إلى البرمجيات الضارة ذات ميزات البقاء أو تعاود بدء عملها مرة أخرى عند كل إعادة تشغيل. يمكن أن يوفر نوك نوك قائمة بالبرمجيات التي تحاول البقاء بينما يرسل بلوكبلوك تنبيهًا في كل مرة يتم فيها تثبيت مكون ذو ميزة بقاء جديد.
كيكست فيوور (KextViewer): أداة لمراجعة وفحص ملحقات النواة وهي حزم تعمل على توسيع التعليمات البرمجية لنظام التشغيل الأساسي وتعمل بأعلى مستوى امتيازات.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة 

ويندوز وماك أو إس
افتح مدير عمليات نظام التشغيل الخاص بك واقرأ معطياته، هل تلاحظ أي عمليات تبدو غير طبيعية أو تستهلك كمية عالية أو منخفضة من الموارد بشكل غريب؟ سجّل أسمائها وابحث عنها على الويب لمعرفة المزيد عنها.
أثناء تتبع اتصالات الشبكة كما هو موضح في دليل الأدلة الجنائية للجوال (مقالات لنظامي التشغيل ويندوز وماك أو إس)، افتح تطبيقًا أو تطبيقين يتصلان بالإنترنت وسجّل عناوين بروتوكول الإنترنت التي يتصلان بها. هل هناك أي شيء يثير العجب حول أي من هذه الاتصالات أو عناوين بروتوكول إنترنت؟
ابحث في عناصر بدء التشغيل وافصلها بين تلك التي تأتي من مورّد نظام التشغيل الخاص بك وتلك التي تأتي من مورّدين آخرين. ابحث عن ثلاثة منها على الإنترنت لمعرفة المزيد حول ما تفعله وإذا كنت تعمل مع زميل أو مرشِد، ناقش النتائج معهم.

نظام أندرويد
اقرأ هذا الدليل: دليل المبتدئين - كيفية التعامل مع تطبيق جوال يحتمل أن يكون ضارًا - مجموعة أدوات باي روغ (PiRogue) (pts-project.org)
اختبار مهارة
نزّل برمجية ضارة حديثة من مالوير بازار وحملّه إلى بيئة اختبار معزولة عامة (مثل ترياج (Triage)) وتحقق مما يفعله على النظام.
اكتب النتائج التي توصلت إليها ثم ناقشها مع مرشِد أو زميل يتأكد من أنك قد أجريت التمرين بشكل صحيح.
(ملاحظة: قد يبدو أن البرمجية الضارة "لا تفعل شيئًا" وفي هذه الحالة، ناقش هذا مع المرشِد والنظير وجرب نوعًا مختلفًا من البرمجيات الضارة.)
(تمرين إضافي اختياري) اطلّع على هذا التحليل من شركة الأمن تريند مايكرو (Trend Micro) وقارنه مع هذا التقرير على ترياج. ناقش هذين الأمرين مع مرشِد أو نظير مع تركيز على قضايا مثل الطرق التي يصف بها كلا التقريرين التكتيكات والتقنيات والإجراءات ومحاولتهما لشرح البرمجيات الضارة. تحدث عن التنسيق الذي تجد أنه من الأسهل قراءته ولماذا. (ملاحظة: هذا البرمجية الضارة المسماه "إيرث بريتا" على تريند مايكرو تُعرف أيضًا باسم "مستانغ باندا" (Mustang Panda) وقد استهدفت المؤسسات الإعلامية والمنظمات غير الحكومية على الأخص في ميانمار.)


## Learning Resources

{{% resource title="Mobile forensics" languages="English" cost="Free" description="A comprehensive guide on how to conduct forensics and triage for many leading operating systems." url="https://pellaeon.gitbook.io/mobile-forensics/" %}}

{{% resource title="Sysinternals" languages="English" cost="Free" description="A series of excellent tools analysts can use to better understand what is happening on a Windows system." url="https://learn.microsoft.com/en-us/sysinternals/" %}}

{{% resource title="Objective-see tools" languages="English" cost="Free" description="Excellent security tools for macOS which can help detect malware infections or attempts to gather/ exfiltrate data." url="https://objective-see.org/tools.html" %}}

## Notes

[^1]: Crowdstrike’s CrowdInspect tool is not actively maintained and may not have full functionality, thus we recommend focusing on the Microsoft tools referenced in the guide for this section. However you may still be able to obtain useful information using the tool and can gain similar types of insights as obtained from tools such as Process Explorer and TCPView
