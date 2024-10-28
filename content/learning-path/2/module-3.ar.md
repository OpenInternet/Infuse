+++
style = "module"
weight = 3
title = "How malware works and different types of malware"
description = "Viruses, spyware, backdoors, ransomware, and adware all behave differently. Here, we study different types of malware and understand how infections begin"
+++

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

We highly recommend reading [Chapter 5](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) of the Field Guide to incident response for civil society and media for thematically relevant overview of malware and related concepts, including:

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

For a short summary of what IoCs are and how they could look like, [check out pp. 37-40](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf) (from indicators of compromise to defanging) of the Field Guide to Incident Response for Civil Society and Media.

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

الموضوع الفرعي 3: كيف تعمل البرمجيات الضارة وأنواعها المختلفة
حالة استخدام
كي نبدأ في العمل على البرمجيات الضارة، نحتاج أولًا إلى التعرف على أنواعها المختلفة. حيث تتصرف الفيروسات وبرمجيات التجسس والأبواب الخلفية وبرمجيات الفدية والبرمجيات الدِعائية بشكل مختلف وتُمثل دوافع مختلفة، وتساعد المعرفة هذه المدافع على تصنيف نوع البرمجيات الضارة المكتشفة.
الأهداف 
بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارس قادرًا على القيام بما يلي:
التفريق بين مختلف أنواع البرمجيات الضارة
فهم ما يمكن أن تفعله البرمجيات الضارة
فهم كيف تبدأ إصابات البرمجيات الضارة
شرح ماهية مؤشرات الاختراق
العرض 
بشكل عام تُعدّ البرمجيات الضارة هي أي برنامج يستخدم للقيام بأشياء غير مصرّح بها على كمبيوتر المستخدم أو جهازه المحمول. تحتوي ويكيبيديا على مقدمة جيدة إلى البرمجيات الضارة بشكل عام. 
ماذا تفعل البرمجيات الضارة؟ 
ويمكن للبرمجيات الضارة أن تفعل أي شيء يمكن لأي برنامج سليم القيام به ولكن يوجد عدد من القدرات المشتركة بين البرمجيات الضارة وتوجد أنواع برمجيات ضارة أحادية الغرض برمجيات أخرى متعددة القدرات. تشمل القدرات المستخدمة بشكل متكرر ما يلي.
مسح البيانات أو تشفيرها (برمجيات الفدية): غالبًا ما يكون مسؤولًا عنها مهاجمون لديهم دوافع مالية وتقوم هذه البرمجيات الضارة بالاستحواذ على جهاز الكمبيوتر الخاص بالشخص المستهدف وتحرمه من الوصول إلى بياناته حتى يدفع فدية.
سرقة البيانات: يمكن للبرمجيات الضارة إرسال البيانات بشكل انتقائي أو عشوائي من جهاز الشخص المستهدف إلى جهاز كمبيوتر يتحكم فيه المهاجم، ويمكن أن تستخدم من تلقاء نفسها أو بالاقتران مع برمجيات الفدية. 
استخدام الموارد غير المصرح به: غالبًا ما يستخدم المهاجمون ذوو الدوافع المالية مجموعات من أجهزة الكمبيوتر المخترقة لتنفيذ إجراءات تشمل تعدين العملات المشفرة أو إرسال رسائل غير مرغوب فيها أو تنفيذ هجمات حجب الخدمة.
السيطرة على متصفح الويب الخاص بالمستخدم: يمكن لبعض البرمجيات الضارة إدراج الإعلانات في صفحات الويب أثناء تصفح المستخدم لها وجمع إيرادات الإعلانات. يمكن لغيرها سرقة كلمات المرور أو ملفات تعريف ارتباط الجلسة (ملف تعريف الارتباط الذي يصادق هويتك عند تسجيل الدخول إلى حسابك) مما يسمح للمهاجمين بالوصول إلى حسابات الشخص المستهدف على مواقع الويب. ستقوم بعض البرمجيات الضارة المخصصة للسرقة بتسريب كلمات المرور وملفات تعريف الارتباط وأنواع البيانات الحساسة الأخرى من الجهاز ثم تقوم بحذف ذاتها في محاولة لمحو أي آثار إصابة.
جمع معلومات حول نشاط المستخدم: ستحاول البرمجيات الضارة الأكثر تطورًا بجمع معلومات حول أنشطة الشخص المستهدف، مثل تسجيل الفيديو أو الصوت، والتقاط كتابة المستخدم وتسجيل موقع الجهاز المحمول وما إلى ذلك. غالبًا ما يستخدم هذا للتجسس أو المراقبة أو الابتزاز.
التحكم التفاعلي أو شبه التفاعلي: تتمتع البرمجيات الضارة الأكثر تطورًا بقدرات ذات أغراض العامة تسمح للمهاجم باستخدام جهاز الشخص المستهدف لأنشطة غير كتابية. يمكن للمهاجم إرسال أوامر عامة عبر خادم الأوامر والتحكّم أو الاتصال المباشر وستقوم البرمجية الضارة بتشغيل الأوامر على جهاز الشخص المستهدف وإرجاع النتائج إلى المهاجم، وغالبًا ما يُستخدم هذا على أهداف عالية القيمة أو لشن المزيد من الهجمات داخل الشبكة.
هذه القائمة أعلاه ليست شاملة، ولكنها تحدد قدرات البرمجيات الضارة الأكثر شيوعًا. للاطلاع على نظرة عامة شاملة عن أهم البرمجيات الضارة التي اكتشفت في العام السابق، راجع منشور مدونة باتريك واردل (Patrick Wardle) على ذا ماك مالوير (The Mac Malware) لعام 2023. في حين يصف هذا المنشور العديد من المفاهيم التي سنغطيها لاحقًا خلال مسار التعلّم هذا (مثل عمليات فحص فايرستوتال (VirusTotal)) يوفر مقدمة رائعة ونظرة عامة حول عالم البرمجيات الضارة.
تُعدّ حزمة بيغاسوس (Pegasus) من إن إس أو غروب (NSO Group) المصممة خصيصًا للمراقبة السرية إحدى أكثر البرمجيات الضارة شُهرة، وتُسرد قدراتها في وثيقة المبيعات هذه من مجموعة إن إس أو.
نُوصي بشدة بقراءة الفصل 5 من الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام للحصول على نظرة عامة ذات صلة بموضوع البرمجيات الضارة والمفاهيم ذات الصلة، بما في ذلك:
طمس التعليمات البرمجية
أنواع البرمجيات الضارة
البقاء
سلاسل الإصابة
اتصالات الأوامر والتحكم
برامج مكافحة الفيروسات
الثغرات والاختراقات
كيف تُصاب الأجهزة المستهدفة؟ 
يجب أن تصل البرمجيات الضارة إلى جهاز الشخص المستهدف بطريقة أو بأخرى، وتتراوح طرق القيام بذلك من خداع المستخدمين لتشغيل البرمجيات الضارة حتى اختراق البرامج والخدمات المعرضة للخطر، بما في ذلك الهجمات الفعلية التي لا تحتاج تفاعل المستخدم. 
طرق إصابة أنظمة تشغيل ويندوز وماك أو إس ولينوكس
تشغيل (أو تنفيذ) البرمجيات الضارة التي يتم تلقيها مباشرة عبر هجمات الانتحال بالهندسة الاجتماعية
التصيد الاحتيالي عبر البريد الإلكتروني والرسائل النصية القصيرة وواتسآب وما إلى ذلك.
البرمجيات الضارة المخفية بشكل برمجيات مشروعة، مثل البرمجيات المقرصنة
نسخ البرمجيات الضارة من أقراص تخزين يو إس بي وما شابهها
المستندات التي تحتوي على برمجيات ضارة مضمّنة فيها، في الغالب تكون مستندات مايكروسوفت أوفيس القديمة ولكن تشمل أيضًا على تنسيقات مثل ملفات بي دي إف وصفحات الويب وما إلى ذلك.
المستندات وصفحات الويب التي تستغل الأخطاء في البرامج لتثبيت البرمجيات الضارة: تتحايل على الضوابط الأمنية المضمّنة في التطبيقات ونظام التشغيل
الهجمات التي لا تحتاج إلى تفاعل المستخدم (مجانًا، باللغة الإنجليزية) التي لا تتطلب أي تفاعل من المستخدم على الإطلاق، ولكنها تسمح للمهاجم بمهاجمة تطبيق أو نظام تشغيل بشكل مباشر وتؤثر على كل من أنظمة تشغيل سطح المكتب والهاتف المحمول.
بمجرد حدوث الاختراق الأولي، ستمر معظم البرمجيات الضارة بعدة مراحل إصابة (مجانًا، باللغة الإنجليزية).
طرق إصابة آي أو إس وأندرويد
تتميز أنظمة تشغيل الأجهزة المحمولة ببنية مختلفة قليلًا عن أنظمة سطح المكتب عادة ما تكون أكثر تأمينًا وتقييدًا لنوع التعليمات البرمجية التي يمكن تشغيلها عليها. يعني ذلك أن البرمجيات الضارة أيضًا تسلك مسارات وتُطبق طرق إصابة مختلفة قليلًا. تحقق من قسم بنية أنظمة الهواتف الذكية في دليل التحليل الجنائي للجوال للاطلاع على نظرة عامة جيدة.
تسمح تكوينات آي أو إس وأندرويد القياسية للمستخدم فقط بتشغيل البرامج التي تم تنزيلها من متاجر التطبيقات الرسمية، وتُثبت البرمجيات الضارة لتلك المنصات إما من خلال متجر التطبيقات ذلك (مما يعني أنه لم يتم اكتشافها أثناء عمليات تدقيق أمان آبل أو غوغل (Google)) أو من خلال استغلال الثغرات في آي أو إس وأندرويد التي تمنع تشغيل التعليمات البرمجية غير المصرح بها. خلاف ذلك يستخدم بعض منشئي البرمجيات الضارة أيضًا الانتحال بالهندسة الاجتماعية لإقناع الأشخاص المستهدفين بتثبيت ملفات التعريف الضارة أو تكوينات الأجهزة الأخرى.
البقاء
ستكون معظم البرمجيات الضارة التي تصادفها في عملك من النوع الذي يحاول البقاءأو قادرة على بدء التشغيل تلقائيًا في كل مرة يقوم فيها الشخص المستهدف بتسجيل الدخول أو إعادة تشغيل نظامه. ويحتوي كل نظام تشغيل على آليات تقوم تلقائيًا بتشغيل برنامج معين عند تسجيل الدخول أو في الأوقات المجدولة أو عند حدوث شيء ما (على سبيل المثال، عند إجراء اتصال شبكة جديد أو إطلاق برنامج). 
يمكن أن تستخدم البرمجيات الضارة مجموعة واسعة من تقنيات البقاء بعضها بسيط إلى حد ما (مثل إضافة نفسها إلى قائمة البرامج التي تعمل تلقائيًا عند تسجيل الدخول)، وغيرها أكثر تعقيدًا تستغل ميزات نظام التشغيل المتخصصة. إذا كنت ترغب في معرفة المزيد عنها يمكنك قراءة هذه الدراسة المتعمّقة في الموضوع و هذه القائمة المتقدمة والشاملة لتقنيات البقاء. تتضمن العديد من هذه التقنيات تحليلًا متقدمًا يخرج قليلًا عن نطاق مسار التعلّم هذا، وفي الوقت نفسه من الجيد أن يكون لديك فكرة عامة عن ماهية البقاء والآليات التي يمكن استخدامها.
لن تهدف بعض البرمجيات الضارة إلى البقاء وتقوم بدلًا من ذلك بالعمل واستخراج البيانات ثم الاختفاء بعد تسجيل الخروج أو إعادة التشغيل. إذا أراد المهاجمون استخدام قدرات البرمجيات الضارة مرة أخرى، فما عليهم سوى إعادة تثبيتها على نظام الشخص المستهدف.  في حين أن هذا يمكن أن يحد من الفترة التي تكون فيها البرمجيات الضارة نشطة على النظام وبالتالي البيانات التي تجمعها، إلا أنه يجعل كشف البرمجيات الضارة أكثر صعوبة لأنه يترك آثارًا أقل على النظام.
مؤشرات الاختراق
أثناء عملية التثبيت وتنفيذ الأنشطة الضارة، تترك البرمجيات الضارة مؤشرات اختراق التي في الغالب تُستخدم لتحديد أنواع معينة من البرمجيات الضارة، ويمكن أن تتضمن مؤشرات اختراق شفرة التجزئة التشفيرية التي سنغطيها لاحقًا في مسار التعلّم هذا والتي تُمثل ملفات قابلة للتنفيذ محددة ويمكن أن تكون أيضًا اتصالات بخدمات شبكة أو حركة مرور شبكة معينة أو أنماط تنفيذ وما إلى ذلك.
للاطلاع على ملخص قصير لماهية مؤشرات الاختراق وما تبدو عليه راجع الصفحات 37-40 من مؤشرات الاختراق من الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام.
للاطلاع على مناقشة مطوّلة حول مؤشرات الاختراق واستخداماتها في الاستجابة للحوادث، تابع هذه الندوة عبر الإنترنت التي تقدمها سي آي إس إيه (الإنجليزية، 46 دقيقة).
تحقق من مؤشرات الاختراق الموضّحة في الصفحة 52 من تقرير منظمة العفو الدولية هذا في مقالة حول برمجيات التجسس التجارية القوية والتي تتكون في الغالب من أسماء النطاقات التي تم استخدامها كبنية أساسية خلال حملة البرمجيات الضارة هذه. بعد القيام بذلك، ألقِ نظرة على هذه الصفحة التي تجمع مؤشرات الاختراق من مختلف الفحوص التي أجراها برنامج التكنولوجيا لدى منظمة العفو الدولية.
هناك العديد من الطرق المختلفة لتحديد مؤشرات الاختراق: وتشمل البحث في سجلات الشبكة لمعرفة ما إذا كان أي جهاز قد حاول الاتصال بمجال معين، والتحقق مما إذا كانت أي ملفات على الجهاز تتطابق مع شفرات تجزئة معينة. إذا كنت ترغب في معرفة المزيد عنها، فإننا نوصي بالاطلاع على تلك المقالات من مايكروسوفت وفورتينيت (Fortinet).
البرمجيات الضارة المعروفة مقابل غير المعروفة
ستكون الغالبية العظمى من إصابات البرمجيات الضارة التي ستواجهها في حياتك المهنية ناتجة عن برمجيات ضارة يعرفها المجتمع، ويعني ذلك أن شخصًا آخر قد عثر بالفعل على هذه البرمجيات الضارة وشارك مؤشرات الاختراق أو عينات منها مع محركات فحص البرمجيات الضارة. لكن يواصل المجرمون الإلكترونيين كتابة برمجيات ضارة جديدة وتكييف البرامج الحالية. لذلك توجد دائمًا فرصة ضئيلة لأن تكون الأجهزة التي تفحصها مصابة ببرمجيات ضارة لم يتم توثيقها بعد. إذا كنت تشعر بالقلق بأن هذا قد يكون هو الحال، فإننا نوصي بالتحقق من مسار تعلم تحليل البرمجيات الضارة والذي يرشدك حول كيفية تحليل العينات غير المعروفة لمعرفة ما إذا كانت ضارة.
كما أنه لم تُوثق جميع البرمجيات الضارة التي تم التعرف عليها على نطاق واسع. قد تحتوي العديد من العينات التي يمكن العثور عليها على مواقع الويب مثل مالوير بازار (MalwareBazaar) على مؤشرات اختراق مرتبطة بها وتعرف بأنها ضارة، ولكن قد لا يكون المحللون قد كتبوا ما تفعله هذه البرمجيات الضارة بالضبط. إذا وجدت عينة أشار إليها الآخرون على أنها ضارة ولكنها مع ذلك غير موثّقة بشكل كافٍ وترغب في معرفة المزيد حول كيفية عملها وما تفعله، فاتبع بعض الأدلة على مسار تعلّم التحليل.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة
خصص بعض الوقت لإلقاء نظرة على قائمة البرمجيات الضارة التي قُدمت مؤخرًا إلى مالوير بازار. اقرأ أوصاف وتعليقات عدد من عينات البرمجيات الضارة ولاحظ الشكل الذي تتخذه وآلية التسليم التي تستخدمها وما شابه ذلك. تحتوي بعض عينات البرمجيات الضارة على تعليقات مرفقة بها، تحقق منها أيضًا. لاحظ أنه لن تحتوي جميع عينات البرمجيات الضارة على تفاصيل مثل مؤشرات الاختراق أو آليات التسليم.
لاحظ أن مالوير بازار يحتوي أيضًا على بعض التفاصيل مثل شفرات التجزئة التي تغطى فقط في المراحل اللاحقة من مسار التعلّم هذا.
لا تُنزل أي عينات في هذه اللحظة ويكفي فقط إلقاء نظرة سريعة على أوصاف العينة في هذه المرحلة.
اختبار مهارة
من خلال العمل مع نظير أو مُرشِد، ابحث عن تقريرين أو ثلاثة تقارير تصف إصابات البرمجيات الضارة لمنصة تختارها، وتأكد من أن هذه التقارير تتضمن مؤشرات الاختراق. إذا لم تتمكن من العثور على أي تقارير، يمكنك فقط قراءة أحد ما يلي:
هترات (HotRat): مخاطر تنزيل البرامج غير القانونية والبرنامج النصي المكتوب بلغة أوتو هوت كي (AutoHotkey) المخفي داخلها
إيرث بريتا (Earth Preta) والتصيد الاحتيالي الموجّه إلى الحكومات في جميع أنحاء العالم
فيروس حصان طروادة الذي يتيح الوصول عن بُعد الجديد المسمى شوغر غوست (SugarGh0st) يستهدف حكومة أوزبكستان وكوريا الجنوبية
(هذا تقرير طويل ولكن يمكنك الاطلاع عليه فقط إذا كان لديك الصبر الكافي) تقرير برنامج التكنولوجيا لدى منظمة العفو الدولية التقني عن ملفات المفترس
 أجب عن الأسئلة التالية لأحد تلك التقارير:
ماذا تفعل هذه البرمجيات الضارة؟
كيف لا تزال البرمجيات الضارة تصل إلى النظام؟ هل يستغل خطأ موجود ليتم تثبيته؟ هل يتطلب الأمر تدخل المستخدم للتثبيت؟
ما هي مؤشرات الاختراق لهذا البرمجية الضارة؟ ما الخطوات التي يمكن أن نتخذها لتحديد مؤشرات الاختراق تلك على نظام أو شبكة مصابة؟
ناقش إجاباتك على كل هذه الأسئلة مع نظيرك أو مرشدك.

## Learning Resources

{{% resource title="Malware chapter on Field Guide for Threat Labs (Chapter 5)" languages="English" cost="Free" description="Good introduction to malware from the perspective of a digital protector needing to understand" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

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

{{% resource title="(فصل البرمجيات الضارة في الدليل الميداني لمختبرات التهديدات (الفصل 5" description="مقدمة جيدة إلى البرمجيات الضارة من منظور الحامي الرقمي الذي يرغب بفهم ما يحصل" languages="اللغة الإنجليزية" cost="مجاني" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

{{% resource title="البرمجيات الضارة - ويكيبيديا (Wikipedia)" description="مقدمة أساسية جيدة حول الموضوع تشرح بعض المفاهيم الأساسية المطلوبة والمتقدمة إلى حد ما" languages="عدة" cost="مجاني" url="https://en.wikipedia.org/wiki/Malware" %}}

{{% resource title="البرمجيات الضارة لنظام تشغيل ماك في عام 2023" description="نظرة عامة مهمة على البرمجيات الضارة لنظام التشغيل ماك أو إس المكتشفة عام 2023 تشمل أنواع البرمجيات الضارة وناقلات الإصابة وآليات البقاء والأهداف." languages="اللغة الإنجليزية" cost="مجاني" url="https://objective-see.org/blog/blog\_0x77.html" %}}
{{% resource title="وثيقة مبيعات بيغاسوس من مجموعة إن إس أو" description="اتصف هذه الوثيقة المسربة بعض قدرات بيغاسوس برمجية التجسس التي تستهدف نشطاء حقوق الإنسان من بين آخرين. يقدم مقدمة جيدة حول كيفية بيع برمجيات التجسس وتسويقها" languages="اللغة الإنجليزية" cost="مجاني" url="https://www.documentcloud.org/documents/4599753-NSO-Pegasus.html" %}}
{{% resource title="شرح الهجمات التي لا تحتاج تفاعل المستخدم" description="تصف الهجمات التي لا تحتاج تفاعل المستخدمين وسبب اهتمام المهاجمين باستخدامها وسبب كونها خطيرة جدًا" languages="اللغة الإنجليزية" cost="مجاني" url="https://www.csoonline.com/article/572727/zero-click-attacks-explained-and-why-they-are-so-dangerous.html" %}}
{{% resource title="فهم مؤشرات الاختراق للاستجابة للحوادث" description="فيديو من يو إس سي آي إس إيه (US CISA) يقدم نظرة عامة جيدة ويعرف بمؤشرات الاختراق وكيف يمكن استخدامها من قبل المستجيبين للحوادث" languages="اللغة الإنجليزية" cost="مجاني" url="https://www.youtube.com/watch?v=zs-AEaSd2vk" %}}
{{% resource title="دليل إلى الوقاية من حوادث البرمجيات الضارة والتعامل معها لأجهزة سطح المكتب وأجهزة الكمبيوتر المحمولة" description="دليل أقدم (2013) من المعهد الوطني للمعايير والتكنولوجيا في الولايات المتحدة (US NIST) والذي يغطي الموضوع بشكل شامل" languages="اللغة الإنجليزية" cost="مجاني" url="https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-83r1.pdf" %}}
{{% resource title="بنية أنظمة الهواتف الذكية" description="نظرة حول كيفية عمل أنظمة تشغيل الأجهزة المحمولة وكيف يمكن أن تنتشر البرمجيات الضارة عليها" languages="اللغة الإنجليزية" cost="مجاني" url="https://pellaeon.gitbook.io/mobile-forensics/smartphones/smartphone-system-architecture" %}}
{{% resource title="الملفات المفترسة" description="تحقيق في البرمجيات الضارة أجراه برنامج التكنولوجيا لدى منظمة العفو الدولية يتضمن قوائم بمؤشرات الاختراق في الصفحة 52" languages="اللغة الإنجليزية" cost="مجاني" url="https://www.amnesty.org/en/documents/act10/7245/2023/en/" %}}
{{% resource title="مؤشرات من تحقيقات منظمة العفو الدولية" description="قائمة مؤشرات الاختراق التي جمعتها منظمة العفو الدولية في سياق تحقيقاتها" languages="لا يوجد( مجموعة بيانات" cost="مجاني" url="https://github.com/AmnestyTech/investigations" %}}
{{% resource title="أمان مايكروسوفت: شرح مؤشرات الاختراق" description="ملخص لماهية مؤشرات الاختراق والأشكال التي يمكن أن تتخذها" languages="اللغة الإنجليزية" cost="مجاني" url="https://www.microsoft.com/en-us/security/business/security-101/what-are-indicators-of-compromise-ioc" %}}
{{% resource title="مسرد فورتينيت: مؤشرات الاختراق" description="ملخص إضافي آخر مفيد جدًا لمؤشرات الاختراق" languages="اللغة الإنجليزية" cost="مجاني" url="https://www.fortinet.com/resources/cyberglossary/indicators-of-compromise" %}}
{{% resource title="ويندوز ديفندر" description="حل لمكافحة البرمجيات الضارة أنشأته مايكروسوفت متاح لجميع مستخدمي ويندوز مجانًا" languages="عدة" cost="مجانًا مع ترخيص ويندوز نشط" url="https://apps.microsoft.com/detail/microsoft-defender/9P6PMZTM93LR?hl=en-us&gl=US" %}}
{{% resource title="مالوير بايتس" description="برنامج مكافحة فيروسات غالبًا ما يستخدم ضمن المجتمع المدني" languages="عدة" cost="مجانًا مع ميزات مدفوعة" url="https://www.malwarebytes.com/" %}}
{{% resource title="مالوير بايتس" description="برنامج مكافحة فيروسات غالبًا ما يستخدم ضمن المجتمع المدني" languages="عدة" cost="مجانًا مع ميزات مدفوعة" url="https://support.malwarebytes.com/hc/en-us/articles/360038523194" %}}
{{% resource title="أفاست" description="فاحص آخر لمكافحة الفيروسات مع مستوى خالٍ من الفيروسات" languages="عدة" cost="مجانًا مع ميزات مدفوع" url="https://www.avast.com/en-us/free-antivirus-download#pc" %}}
{{% resource title="كلام إيه في" description="فاحص فيروسات مفتوح المصدر" languages="عدة" cost="مجانًا" url="https://www.clamav.net/" %}}
{{% resource title="لوك آوت" description="شركة معروفة تُقدم خدمات أمان لنظام أندرويد" languages="عدة" cost="مستويات تسعير متعددة" url="https://www.lookout.com/" %}}
{{% resource title="هيباشيا" description="فاحص برمجيات ضارة مفتوح المصدر لنظام أندرويد مستند إلى كلام إيه في" languages="اللغة الإنجليزية" cost="مجانًا" url="https://f-droid.org/en/packages/us.spotco.malwarescanner/" %}}
{{% resource title="خدمة غوغل بلاي للحماية" description="وثائق مستخدم سريعة حول غوغل بلاي للحماية وهي أداة أمان إضافية موصى بها بشدة لنظام أندرويد" languages="عدة" cost="مجانًا" url="https://support.google.com/googleplay/answer/2812853?hl=en" %}}
{{% resource title="التعرف على الأجهزة المخترقة: دليل متوسط المستوى" description="بعض العلامات السريعة التي يمكننا البحث عنها عند محاولة معرفة ما إذا كان الجهاز قد تعرض للاختراق بسبب البرمجيات الضارة. لاحظ أن هذه الخطوات ليست سوى البداية ولا تحل محل عمليات الفحص والتحليل الأعمق." languages="اللغة الإنجليزية" cost="مجانًا" url="https://pts-project.org/guides/g6/#identifying-compromised-devices" %}}
{{% resource title="أمان ويندوز (Windows Security)" description="جزء جوهري من نظام تشغيل ويندوز حيث يمكنك التحقق في لمحة من التدابير الأمنية التي تم تمكينها وأيها لم يتم تمكينها" languages="عدة" cost="مجانًا مع كل تثبيت ويندوز" url="https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/windows-defender-security-center/windows-defender-security-center" %}}

