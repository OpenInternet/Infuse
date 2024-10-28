---
style: module
title: OPSEC prerequisites for detecting malware
weight: 2
description: When you set up your malware detection environment, it's a good idea to create some rules and processes to reduce the risk of any security breaches
---

## Use Case

This subtopic will allow the practitioner to ensure the security of the process and the individuals involved and implement a security policy within the computing environment the practitioner uses for malware detection.

## Objectives

After completing this subtopic, the practitioner should be able to ensure the confidentiality and integrity of data, which includes:

- Encryption during storage and transfer
- Doing checksums after data acquisitions
- Not using devices suspected of being compromised
- Using air-gapped environments
- Ensuring security of the devices and servers used in the process
- Threat modeling and risk assessment
- Conducting backups and disk imaging

---
## Main Section
Operational security for detecting malware can be divided into concerns related to specific scenarios:

- Directly interacting with a device of unknown status
- Using a separate ‘good’ device to interact with a device of unknown status
- Interacting with files or links of unknown status

### Using a device of unknown status

In many cases you will be handed a device and asked to inspect it for malware (or you may need to do this to your own device).

Be aware that in case the device is compromised, your activities may be monitored, which may impact risk and safety for your client. Any keystrokes including access to online accounts or communications may be captured. External storage devices such as hard drives or USB flash drives may become targets for transfer of malicious code, and any network connections may be used to further spread or exfiltrate malicious code.

Note as well that introducing analysis tools can trigger a ‘kill switch’ on some malware which has been designed to evade detection and analysis. In such cases, capturing a disk image and other forensic records may be necessary for further analysis. This is not covered in this learning path but is covered in [Analyzing Malware](/en/learning-path/3/).

### Using a separate ‘good’ device during the malware detection process

If you suspect that a device is infected with malware, you should do as little as possible with it until you learn more about its status. For this reason, you should always use a device where you do not suspect any malware infections to handle any sensitive information.

If, for example, a person you are supporting suspects that their laptop or desktop might have been compromised, ask them to just use their mobile phone to communicate with you. It’s usually a good idea to shut down the potentially compromised laptop or desktop or at least disconnect it from the internet. If your beneficiary has tied their Signal, WhatsApp, and other accounts to the potentially compromised device, it might be a good idea to unlink those (doing so from a device that you do not suspect to be compromised) while the detection process is ongoing.

### Interacting with files or links of unknown status

When going through the malware detection process, you might encounter links or files (either ordinary files or executable files) you are unsure about and which you suspect might be delivering malware payloads. If you are copying those links or files from a potentially compromised device to an analysis device, there’s always a risk that they could also infect your analysis device. In order to reduce the chances of this happening, we recommend:

- Using a virtual machine on your analysis device and only opening the files there. This way, even if you open a malicious link or file and it infects your system, the damage will be contained to your virtual machine
- Using web-based services and sandboxes (we will cover them more later on in this learning path)
- Defanging all URLs (see the relevant section under Subtopic 3 in the malicious infrastructure learning path)
- Storing all potentially suspicious files in compressed and password protected folders. This prevents them from being opened by accident or scanned by operating system tools when they, for example, index folders. The password does not need to be complex; it can literally be “ABC.” All it needs to do is prevent automated or accidental opens of the file.

For a deeper look at the topic, review the guide by Defensive Lab Agency on how to [handle a potentially compromised device](https://pts-project.org/guides/g6/), in particular:

- Isolating Android and iOS devices
- Procedures for physically sending and receiving compromised devices for analysis in case you are working with (or yourself serving as) a remote technical analysis team
- Introductory tips on chain of custody during device analysis

This last term on chain of custody refers to best practice in digital forensics and incident response to record the handling of a device in order to preserve evidence and allow evidence collected to be used in any potential legal proceedings. The linked article provides a good introduction to general-purpose best practices you can follow in case you are in a position to be handling evidence which might be used in a scenario with a higher burden of proof on evidence.

## Practice

Set up a VM running REmnux, with [the steps outlined in the Field Guide to incident response for civil society and media (chapter 6, starting on page 30).](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf)

## Skill Check

After you have set up your REmnux VM, install and then connect to a reputable VPN. Make sure that your main system is either not connected to a VPN or to a different server than your REmnux instance. Ask your peer or mentor to send you a web bug canary token which will be opened just in REmnux, through a web browser of your choice. (If you are not yet familiar with canary tokens, [check out this guide](https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/) we created on how you could use them in security trainings.)

Which IP address did it trigger? What user agent?

Talk to your peer / mentor about what data stays on your VM and what doesn’t. If you ran a piece of malware in your VM which contacted a server, would this go through your VPN or home/ office network connection?

الموضوع الفرعي 2: متطلبات الأمان التشغيلي للكشف عن البرمجيات الضارة
حالة استخدام
سيسمح هذا الموضوع الفرعي للممارس بضمان أمن العملية والأفراد المعنيين وتنفيذ سياسة أمنية داخل بيئة الحوسبة التي يستخدمها الممارس للكشف عن البرمجيات الضارة.
الأهداف 
بعد الانتهاء من هذا الموضوع الفرعي، يجب أن يكون الممارس قادرًا على ضمان سرية وسلامة البيانات ويشمل ذلك: 
التشفير أثناء التخزين والنقل
إجراء المجموع الاختباري بعد الحصول على البيانات
عدم استخدام أجهزة يشتبه في تعرضها للاختراق
استخدام بيئات غير متصلة
ضمان أمن الأجهزة والخوادم المستخدمة في العملية
تقدير التهديدات والمخاطر
إجراء النسخ الاحتياطي وتصوير الأقراص
العرض 
يمكن تقسيم الأمن التشغيلي للكشف عن البرمجيات الضارة إلى مخاوف تتعلق بسيناريوهات محددة تشمل:
التفاعل المباشر مع جهاز مجهول الحالة 
استخدام جهاز "سليم" منفصل للتفاعل مع جهاز غير معروف الحالة
التفاعل مع الملفات أو الروابط ذات الحالة غير المعروفة
استخدام جهاز غير ذو حالة غير معروفة
في كثير من الحالات، سيتم تسليمك جهازًا ويطلب منك فحصه بحثًا عن البرمجيات الضارة (أو قد تحتاج إلى القيام بذلك على جهازك الخاص).
مراعاة أنه في حالة تعرض الجهاز للخطر، قد تتم مراقبة أنشطتك مما قد يؤثر على المخاطر والسلامة لعميلك. قد تُلتقط أي ضغطات على المفاتيح بما في ذلك الوصول إلى الحسابات أو المراسلات عبر الإنترنت. قد تُصبح أجهزة التخزين الخارجية مثل محركات الأقراص الثابتة أو محركات أقراص يو إس بي المحمولة أهدافًا لنقل التعليمات البرمجية الضارة ويمكن استخدام أي اتصالات شبكة لزيادة نشر التعليمات البرمجية الضارة أو سحبها. 
لاحظ أيضًا أن إدخال أدوات التحليل يمكن أن يؤدي إلى تشغيل "مفتاح الإيقاف" على بعض البرمجيات الضارة التي تم تصميمها للتهرب من الكشف والتحليل وفي مثل هذه الحالات قد تكون صورة القرص وسجلات التحليل الجنائية الأخرى ضرورية لإجراء التحاليل الإضافية. لا يُغطى ذلك في مسار التعلّم هذا ولكنه مشمول في تحليل البرمجيات الضارة.
استخدام جهاز "سليم" منفصل أثناء عملية كشف البرمجيات الضارة
إذا كنت تشك في إصابة جهاز ببرمجيات ضارة، فيجب أن تقلل تفاعلك معه إلى أقل قدر ممكن معه حتى تعرف المزيد عن حالته. لهذا السبب يجب عليك دائمًا استخدام جهاز لا تشك في وجود أي إصابة برمجيات ضارة عليه للتعامل مع أي معلومات حساسة. 
على سبيل المثال، إذا كان الشخص الذي تدعمه يشتبه بأن جهاز كمبيوتره المحمول أو المكتبي قد تعرض للاختراق، فاطلب منه فقط استخدام هاتفه المحمول للتواصل معك. عادة ما تكون فكرة جيدة أن يتم إيقاف تشغيل الكمبيوتر المحمول أو سطح المكتب الذي يُحتمل تعرضه للاختراق أو على الأقل فصله عن الإنترنت. إذا كان المستفيد قد ربط حساباته على سيغنال (Signal) ووتسآب (WhatsApp) وغيرها بالجهاز الذي يحتمل أن يكون قد تعرض للاختراق، فقد يكون من الجيد إلغاء ربطها (القيام بذلك من جهاز لا تشك في تعرضه للاختراق) أثناء عملية الكشف جارية.
التفاعل مع الملفات أو الروابط ذات الحالة غير المعروفة
عند المرور بعملية كشف البرمجيات الضارة، قد تواجه روابط أو ملفات (إما ملفات عادية أو ملفات قابلة للتنفيذ) لست متأكدًا منها وتشتبه في أنها قد تقدم حمولات برمجيات ضارة. إذا كنت تنسخ هذه الروابط أو الملفات من جهاز يحتمل أن يكون مخترقًا إلى جهاز تحليل، هناك دائمًا خطر بأن يصيب أيضًا جهاز التحليل الخاص بك، ولتقليل فرص حدوث ذلك، نوصي بما يلي:
استخدام جهاز افتراضي على جهاز التحليل الخاص بك وفتح الملفات هناك فقط. وبهذه الطريقة حتى لو فتحت رابطًا أو ملفًا ضارًا وأصاب نظامك، فسيتم احتواء الضرر الذي يلحق بجهازك الافتراضي.
استخدام الخدمات المستندة إلى الويب وبيئات الاختبار المعزولة التي سنغطيها أكثر لاحقًا في مسار التعلّم هذا.
إزالة الضرر من جميع عناوين مواقع الويب (انظر القسم ذي الصلة تحت الموضوع الفرعي 3 في مسار تعلّم التحتية الأساسية الضارة).
تخزين جميع الملفات التي يحتمل أن تكون مشبوهة في مجلدات مضغوطة ومحمية بكلمة مرور. يمنع ذلك فتحها عن طريق الصدفة أو مسحها بواسطة أدوات نظام التشغيل عندما تقوم على سبيل المثال بفهرسة المجلدات. لا داعي لتكون كلمة المرور معقدة ويمكن أن تكون بسيطة مثل "ABC". كل ما عليك فعله هو منع الفتح التلقائي للملف أو فتحه مصادفة.
لإلقاء نظرة أعمق على الموضوع، راجع دليل وكالة المختبرات الدفاعية (Defensive Lab Agency) حول كيفية التعامل مع جهاز يحتمل أن يكون مخترقًا، وعلى وجه الخصوص:
عزل أجهزة أندرويد وآي أو إس.
إجراءات إرسال واستقبال الأجهزة المخترقة فعليًا للتحليل في حال كنت تعمل مع فريق تحليل فني عن بُعد أو كنت أنت من يقوم بالتحليل.
نصائح تمهيدية حول تسلسل العُهدة أثناء تحليل الجهاز
يشير هذا المصطلح الأخير في سلسلة العُهدة إلى أفضل الممارسات في التحليل الجنائي الرقمي والاستجابة للحوادث لتسجيل التعامل مع الجهاز من أجل الحفاظ على الأدلة والسماح باستخدام الأدلة التي تم جمعها في أي إجراءات قانونية محتملة. تُوفر المقالة الموفر رابطها مقدمة جيدة إلى أفضل الممارسات للأغراض العامة التي يمكنك اتباعها في حال كنت في وضع يسمح لك بالتعامل مع الأدلة التي يمكن استخدامها في سيناريو مع عبء إثبات أعلى على الأدلة.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة 

إعداد جهاز افتراضي يعمل بنظام ريمنوكس، مع الخطوات الموضحة في الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام (الفصل 6، بدءًا من الصفحة 30).
اختبار مهارة

بعد إعداد الجهاز الظاهري وعليه توزيعة ريمنوكس، ثبّت تطبيق شبكة ظاهرية خاصة ذات سمعة طيبة واتصل من خلاله، وتأكد من أن نظامك الرئيسي إما غير متصل بشبكة ظاهرية خاصة أو بخادم مختلف عن مثيل ريمنوكس خاصتك. اطلب من نظيرك أو مرشِدك أن يرسل لك الرمز المميز لقيمة الكاناري لخطأ الويب والذي ستفتحه فقط في ريمنوكس من خلال متصفح ويب تختاره. (إذا لم تكن على دراية بالرمز المميز لقيمة الكاناري بعد، راجع هذا الدليل الذي أنشأناه حول كيفية استخدامها في التدريبات الأمنية.)

ما عنوان بروتوكول الإنترنت (IP) الذي ظهر؟ وأي وكيل مستخدم؟

تحدث إلى نظيرك / مرشِدك حول أي بيانات تبقى أو لا تبقى على جهازك الافتراضي. وإذا قمت بتشغيل برمجية ضارة في جهازك الظاهري الذي اتصل بخادم، فهل سيتصل من خلال شبكة ظاهرية خاصة أو اتصال شبكة منزلية/مكتبية؟




## Learning Resources

{{% resource title="Intermediate guide - How to handle a potentially compromised device" languages="English" cost="Free" description="A step-by-step guide on how to handle devices with iOS or Android which you suspect might have malware on them prior to starting detection work" url="https://pts-project.org/guides/g6/" %}}

{{% resource title="Virtual machine chapter of the Field Guide to incident response for civil society and media (chapter 6)" languages="English" cost="Free" description="An introductory overview of how malware analysts can start working with virtual machines and an installation of the Linux distribution" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

{{% resource title="Technical simulation with canary tokens" languages="English" cost="Free" description="A guide on how to use canary tokens, an offensive security tool, to simulate malware trackers. Can be very useful in teaching defenders what data can be easily exfiltrated" url="https://internews.org/resource/guide-to-facilitating-a-technical-simulation-with-canary-tokens/" %}}

{{% resource title="دليل متوسط - كيفية التعامل مع جهاز يُحتمل أنه مُخترق" description="دليل خطوة بخطوة حول كيفية التعامل مع الأجهزة التي تعمل بنظام آي أو إس أو أندرويد والتي يُشتبه بإصابتها ببرمجيات ضارة قبل بدء أعمال الكشف" languages="اللغة الإنجليزية" cost="مجاني" url="https://pts-project.org/guides/g6/" %}}
{{% resource title="فصل الجهاز الظاهري من الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام (الفصل 6)" description="نظرة عامة تمهيدية حول كيفية بدء محللي البرمجيات الضارة في العمل على الأجهزة الافتراضية وتثبيت توزيعة لينوكس" languages="اللغة الإنجليزية" cost="مجاني" url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}
{{% resource title="محاكاة فنية باستخدام الرمز المميز لقيمة الكاناري" description="دليل حول كيفية استخدام الرمز المميز لقيمة الكاناري، وهي أداة أمان هجومية تحاكي متتبعات البرمجيات الضارة. يمكن أن تكون مفيدة جدًا في تثقيف المدافعين حول البيانات التي يمكن تسريبها بسهولة" languages="اللغة الإنجليزية" cost="مجاني" url="https://docs.google.com/document/d/14YViryXq2id2PaLeT91KxS-u67-26BDuLPTP\_O5BHTM/edit?usp=sharing*](https://docs.google.com/document/d/14YViryXq2id2PaLeT91KxS-u67-26BDuLPTP_O5BHTM/edit?usp=sharing" %}}


