+++
style = "module"
weight = 8
title = "Sample-based detection and determination"
description = "You have a sample of a file and need to determine if it is malicious. This may have been sent to the target by email, social media, or instant messenger, or transferred over removable media or otherwise. Here, we learn how to view this sample in analysis platforms or sandboxes"
+++

## Use Case

You have a sample of a file and need to determine if it is malicious. This may have been sent to the target by email, social media, or instant messenger, or transferred over removable media or otherwise. The file itself may be a binary, a compressed archive, a captured web page, or other file formats. The primary objective is to determine whether the file is malicious. In addition, you may be able to determine some additional useful characterizing information about the file, however for more guidance see the [Malware Analysis Learning Path](/en/learning-path/3/).

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Investigate suspicious files using malware platforms
- Utilize sandboxes to assist in determining whether a sample is malicious and what it does

---
## Main Section
If you require more in-depth evaluation of a few specific files, there are online services that will scan a specific file or set of files for malware. If you have a file that you suspect to be malicious, you can upload the file to the scanning service. Note that these services do not keep confidential the contents of the files you upload. You should not upload any files that contain sensitive information. These files may come from email attachments, or be recently downloaded files on the victim’s device. Note that in many cases, the initial download may be a dropper (executable that installs the actual malware, often easier to customize than the “real” malware), and may not be known to anti-malware software. If possible, analyze file creation/modification/download dates to identify files that might have been downloaded by the initial dropper.

If you would prefer not to share a full file with an online service but still want to check if it has ever been submitted, you can simply upload a hash of the file. A hash is like a short fingerprint of a file—it can be used to identify a unique file without revealing its contents. For more information on hashes, go through the “Hashes” section in Chapter 7 of the [Field Guide to Incident Response for Civil Society and Media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/). The guide activity assumes the user is learning on a Linux operating system, so you will need to look up the command line utility to use to obtain a SHA sum on your chosen platform, for instance using \_shasum \_or \_openssl \_on MacOS or using Get-FileHash or certutil in PowerShell.

A popular malware intelligence service is Google’s [VirusTotal](https://www.virustotal.com/). VirusTotal will scan a file with a number of antimalware scanners, and report the results back. It can also scan for file hashes or URLs. VirusTotal is free to use, subject to volume constraints. For a detailed description and activity, complete the “Using VirusTotal” section in Chapter 7 of Internews’ [Field Guide to Incident Response for Civil Society and Media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/).

‼️ After reading the above chapter, you should be able to:

- Understand what uploading a sample to VirusTotal does (shares your sample with paying VirusTotal customers), and be able to decide if it is appropriate to do so
- Submit a file or check a record by hash and read the Detections, Details, Relations, Behavior, and Community tabs on VirusTotal

### Sandboxes

Sandboxes provide a virtual environment simulating an ordinary computer which captures detailed logs of activities which occur in memory and on disk. This generally allows a safe and automated way to bootstrap malware analysis and understand the actions and intentions of a file.

Several freely available commercial sandbox services include [Hybrid Analysis](https://www.hybrid-analysis.com/), [Any.Run](https://any.run/), [Joe Sandbox](https://www.joesandbox.com/), and [Triage](https://tria.ge/). These services run files that you send it and perform dynamic analysis. This has great advantages in being able to heuristically detect new malware, and also being able to evaluate multiple malware stages. Note that samples submitted will be collected and become available to paying customers and analysts.

Cuckoo Sandbox is a free and open source malware analysis sandbox tool which you can self-host. CERT-EE in Estonia offers a free hosted version online: [Cuckoo V2](https://cuckoo.cert.ee/), [Cuckoo V3 (Beta)](https://cuckoo-hatch.cert.ee/).

To learn more about using Sandboxes for detection of samples, complete the “Sandboxes” section in Chapter 10 of Internews’ [Field Guide to Incident Response for Civil Society and Media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/), which uses the Triage sandbox as an example

After completing the activity, you should be able to:

- Submit a file into a sandbox
- Selecting or configure an appropriate operating environment for the sandbox
- Decide whether networking should be disabled or emulated
- Read the overview of results including automated detections
- Have a general understanding of the other categories of information being presented in the sandbox analysis. For the purpose of detection detailed understanding is not necessary but for Malware Analysis or threat hunting you will need to understand these further.

You can find a deeper dive on Sandboxes in the Infuse Malware Analysis learning path.

Note that advanced malware may initiate checks to discover if it is in a virtualized/sandboxed environment thus may behave differently depending on the environment, therefore no sandbox environment will be 100% reliable.

To learn more about the kinds of techniques that Hybrid Analysis uses, you can learn to do your own hybrid (static and dynamic) malware analysis in the Malware Analysis learning path.

## Practice

1. Find or create a plain text file on your system, and then calculate its sha256 hash. After you have done that, change the file by editing it in a plain text editor and appending a single character to it. Calculate its sha256 hash again.
2. Grab an obscure Windows executable from something like download.cnet.com. Upload it to VirusTotal or analyze it with Hybrid Analysis. Note that installers may be incorrectly flagged as malicious due to the nature of their operation. Think about why this might be happening, and, if possible, discuss it with a peer or mentor.
3. Find the hash of a well-known piece of malware (you can do so by browsing a site that contains malware hashes, no need to download the sample and hash it yourself!) and upload it to VirusTotal. Explain what you see and what happened.

## Skill Check

Independently (or with a mentor)

1. Browse through recently submitted malware samples on Malware Bazaar. Copy the hashes of 3-5 samples you detected and paste them into VirusTotal search. What are the results? Each one of those hashes should be detected as malicious by at least a couple of VirusTotal malware detection engines. If none of the hashes are detected as malicious or recognized by VirusTotal, then it’s likely you’ve made a mistake somewhere and it’s worth taking a moment to retrace your steps!

With a Peer or a Mentor

1. Ask a peer or mentor to select around 10 random files, which could, for example, be images. They will then take the sha256 hash of 3 randomly selected files and send you both the files and the hashes. Figure out which of those 10 files map to the hashes, and ask the peer or mentor to check your work.

الموضوع الفرعي 7: الكشف والتحديد القائم على العينات
حالة استخدام
لديك عينة ملف وتحتاج إلى تحديد ما إذا كان ضارًا وربما يكون قد تم إرساله إلى الهدف عن طريق البريد الإلكتروني أو وسائل التواصل الاجتماعي أو المراسلة الفورية أو تم نقله عبر الوسائط القابلة للإزالة أو غير ذلك. قد يكون الملف نفسه ملفًا ثنائيًا أو أرشيفًا مضغوطًا أو صفحة ويب تم التقاطها أو تنسيقات ملفات أخرى. يتمثل الهدف الأساسي في تحديد ما إذا كان الملف ضارًا أم لا. بالإضافة إلى ذلك، قد تتمكن من تحديد بعض المعلومات الإضافية المفيدة التي تُميز الملف ولكن لمزيد من الإرشادات راجع مسار تعلم تحليل البرمجيات الضارة.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فحص الملفات المشبوهة باستخدام منصات البرمجيات الضارة
استخدام بيئات الاختبار المعزولة للمساعدة في تحديد ما إذا كانت العينة ضارة وما تفعله
العرض 
إذا كنت بحاجة إلى تقييم متعمّق لعدد من الملفات المعينة، فهناك خدمات عبر الإنترنت ستقوم بفحص ملف معين أو مجموعة من الملفات بحثًا عن البرمجيات الضارة. إذا كان لديك ملف تشتبه أنه ضار، يمكنك تحميله إلى خدمة فحص ولاحظ أن هذه الخدمات لا تحافظ على سرية محتويات الملفات التي تقوم بتحميلها. يجب عدم تحميل أي ملفات تحتوي على معلومات حساسة فقد تأتي هذه الملفات من مرفقات البريد الإلكتروني، أو يتم تنزيلها مؤخرًا على جهاز الضحية. لاحظ أنه في كثير من الحالات، قد يكون التنزيل الأولي عبارة عن حامل فيروس حصان طروادة (ملف قابل للتنفيذ يُثبّت البرمجيات الضارة الفعلية، وغالبًا ما يكون من الأسهل تخصيصه مقارنة بالبرمجيات الضارة "الحقيقية") وقد لا تعرفه أدوات مكافحة البرمجيات الضارة. إذا كان ذلك ممكنًا، قم بتحليل تواريخ إنشاء/تعديل/تنزيل الملف لتحديد الملفات التي ربما تم تنزيلها بواسطة حامل فيروس حصان طروادة الأولي.
إذا كنت تفضل عدم مشاركة ملف كامل على خدمة عبر الإنترنت ولكنك لا تزال ترغب في التحقق مما إذا كان قد تم إرساله سابقًا، فيمكنك ببساطة تحميل شفرة تجزئة الملف. تُشبه شفرة التجزئة بصمة إصبع صغيرة للملف ويمكن استخدامها لتحديد ملف فريد دون الكشف عن محتوياته. لمزيد من المعلومات حول شفرة التجزئة، انتقل إلى قسم "شفرات التجزئة" في الفصل 7 من الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام. يُفترض نشاط الدليل أن المستخدم يتعلم على نظام تشغيل لينوكس، ولذلك ستحتاج إلى البحث عن الأداة المساعدة لسطر الأوامر لاستخدامها للحصول على مجموع SHA على المنصة التي اخترتها، على سبيل المثال باستخدام shasum أو openssl على ماك أو إس أو باستخدام Get-FileHash أو certutil في باور شل (PowerShell).
 إحدى الخدمات الشائعة لجمع المعلومات عن البرمجيات الضارة الشائعة هي فايروستوتال من Google والتي تقوم بفحص الملف باستخدام عدد من أدوات مكافحة البرمجيات الضارة وثم الإبلاغ عن النتائج. يمكنها أيضًا أن تفحص باستخدام شفرة تجزئة الملفات أو عناوين مواقع الويب وهي مجانية للاستخدام وتخضع لقيود الحجم. للحصول على وصف ونشاط مفصلين أكمل قسم "استخدام فايروستوتال" في الفصل 7 من دليل إنترنيوز الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام. 
‼️ بعد الانتهاء من الفصل أعلاه، ستكون قادرًا على:
فهم ما ينجم عن تحميل عينتك إلى فايروستوتال (تتم مشاركة عينتك مع عملاء فايروستوتال الذين يدفعون لقاء الاشتراك)، والتمكن من تقرير ما إذا كان من المناسب القيام بذلك
أرسل ملفًا أو تحقق من سجل عن شفرة التجزئة واقرأ علامات التبويب الاكتشافات والتفاصيل والعلاقات والسلوك والمجتمع على فايروستوتال
بيئات الاختبار المعزولة
تُوفر بيئات الاختبار المعزولة بيئة ظاهرية تحاكي جهاز كمبيوتر عادي يُسجل سجلات مفصلة للأنشطة التي تحدث في الذاكرة وعلى القرص. يسمح هذا عمومًا بطريقة آمنة وآلية لتمهيد بدء تحليل البرمجيات الضارة وفهم إجراءات ونوايا الملف. 
تشمل العديد من خدمات بيئة الاختبار المعزولة التجارية المتاحة مجانًا هايبرد أناليسس (Hybrid Analysis) وأني دوت رن (Any.Run) وجو ساندبوكس (Joe Sandbox) وترياج. تُشغل هذه الخدمات الملفات التي ترسلها وتُجري تحليلًا ديناميكيًا ولهذا مزايا كبيرة في القدرة على كشف البرمجيات الضارة الجديدة بشكل إرشادي وكذلك القدرة على تقييم مراحل البرمجيات الضارة المتعددة. لاحظ أنه سيتم جمع العينات المقدمة وستُصبح متاحة للعملاء والمحللين الذين يدفعون رسوم الاشتراك. 
تعد كوكو ساندبوكس (Cuckoo Sandbox) أداة تحليل برمجيات ضارة مجانية ومفتوحة المصدر يمكنك استضافتها بنفسك. تُقدم سي إي آر تي إي إي في إستونيا نسخة مستضافة مجانية عبر الإنترنت: كوكو الإصدار 2، كوكو الإصدار 3 (بيتا).
لمعرفة المزيد حول استخدام بيئات الاختبار المعزولة للكشف عن العينات، أكمل قسم "بيئات الاختبار المعزولة" في الفصل 10 من دليل إنترنيوز الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام والذي يستخدم بيئة اختبار معزولة التصنيف كمثال
بعد إكمال هذا الفصل ستصبح لديك القدرة على القيام بما يلي:
إرسال ملف إلى بيئة اختبار معزولة
تحديد أو تكوين بيئة تشغيل مناسبة لبيئة اختبار معزولة
قرر ما إذا كان ينبغي تعطيل الشبكات أو محاكاتها
قراءة نظرة عامة على النتائج بما في ذلك الاكتشافات الآلية
فهم عام لفئات المعلومات الأخرى التي يتم تقديمها في تحليل وضع بيئة الاختبار المعزولة. لغرض الكشف ليس الفهم التفصيلي ضروريًا ولكن لتحليل البرمجيات الضارة أو مطاردة التهديدات وستحتاج إلى فهمها بشكل أكبر.
يمكنك التعمّق أكثر في بيئات الاختبار المعزولة في مسار تعلم إنفيوز (Infuse) لتحليل البرمجيات الضارة.
لاحظ أن البرمجيات الضارة المتقدمة قد تبدأ عمليات فحص لاكتشاف ما إذا كانت في بيئة ظاهرية/بيئة اختبار معزولة، وبالتالي قد تتصرف بشكل مختلف اعتمادًا على البيئة مما يعني أنه لا توجد بيئة اختبار معزولة موثوقة بنسبة 100٪.
لمعرفة المزيد حول أنواع التقنيات التي تستخدمها أداة هايبرد أناليسس، يمكنك تعلم إجراء تحليل البرمجيات الضارة الهجين (الثابت والديناميكي) الخاص بك في مسار تعلّم تحليل البرمجيات الضارة.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة 
ابحث عن ملف نصي عادي أو قم بإنشائه على نظامك ثم احسب شفرة تجزئته sha256. بعد القيام بذلك، غيّر الملف عن طريق تحريره في محرر نص عادي وإلحاق حرف واحد به، ثما عاود حساب تجزئة sha256 مرة أخرى.
احصل على ملف غامض قابل للتنفيذ على ويندوز من شيء مثل download.cnet.com. قم بتحميله إلى فايروستوتال أو قم بتحليله باستخدام هايبرد أناليسس. لاحظ أن المثبتات قد تُحدد بشكل غير صحيح على أنها ضارة بسبب طبيعة طريقة عملها وفكر في سبب حدوث ذلك وناقشه إذا أمكن مع نظير أو مُرشِد.
ابحث عن شفرة التجزئة لبرمجية ضارة معروفة (يمكنك القيام بذلك عن طريق تصفح موقع يحتوي على شفرة تجزئة البرمجيات الضارة، ولا حاجة لتنزيل العينة وحساب تجزئتها بنفسك!) وقم بتحميلها إلى فايروستوتال، ثم اشرح ما تراه وما حدث.
اختبار مهارة

بشكل مستقل (أو مع مُرشِد)
تصفح عينات البرمجيات الضارة التي تم إرسالها مؤخرًا إلى مالوير بازار وانسخ شفرة تجزئة 3-5 عينات اكتشفتها إلى مربع بحث فايروستوتال. ما النتائج التي تحصل عليها؟ يجب أن تُكتشف كل واحدة من شفرات التجزئة على أنها ضارة من قبل اثنين على الأقل من محركات كشف البرمجيات الضارة لدى فايروستوتال. إذا لم تُكتشف أي من شفرات التجزئة على أنها ضارة أو لم يتعرف عليها فايروستوتال، فمن المحتمل أنك ارتكبت خطأ في مكان ما ويستحق الأمر قضاء بعض الوقت لمراجعة خطواتك!

مع نظير أو مُرشِد
اطلب من أحد النظراء أو مُرشِد تحديد حوالي 10 ملفات عشوائية التي يمكن أن تكون صورًا على سبيل المثال. يأخذون بعد ذلك شفرة تجزئة sha256 لثلاث ملفات تم اختيارها عشوائيًا ويرسلون لك كلًا من الملفات وشفرة التجزئة. اكتشف أي من هذه الملفات العشرة يرتبط بشفرة التجزئة، واطلب من النظير أو المرشد التحقق من عملك.

## Learning Resources

{{% resource title="Verify SHA256 checksum" languages="English" cost="Free" description="Quick guide on using the command line to verify sha256 checksums for files." url="https://techdocs.akamai.com/download-ctr/docs/verify-checksum" %}}

{{% resource title="VirusTotal" languages="English" cost="Free, with rate limits" description="Web service to check files or hashes against known malware using multiple detection engines." url="https://www.virustotal.com/gui/home/upload" %}}

{{% resource title="Hybrid Analysis" languages="English" cost="Free, with premium features" description="Service similar to VirusTotal, offering dynamic analysis capabilities." url="https://www.hybrid-analysis.com/" %}}

{{% resource title="Any.run" languages="English" cost="Free for non-commercial use" description="Commercial sandbox service for analyzing malware behavior." url="https://any.run/" %}}

{{% resource title="Joe Sandbox" languages="English" cost="Free for public accounts (results published)" description="Commercial sandbox service for analyzing malware." url="https://www.joesandbox.com/#windows" %}}

{{% resource title="Cuckoo Sandbox" languages="English" cost="Free" description="Sandbox service provided by the Estonian CERT for malware analysis." url="https://cuckoo.cert.ee/" %}}

{{% resource title="Windows Sandbox" languages="Requires Windows Pro, Education, or Enterprise" cost="Free" description="Built-in sandbox tool in Windows for safely running applications." url="https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview" %}}
