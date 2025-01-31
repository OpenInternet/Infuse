---
style: module
title: طرق التحليل الجنائي على أنظمة ويندوز وماك أو إس قيد التشغيل
description: قد يكون الفحص المباشر للجهاز ضروريًا لفهم ما يحدث عليه وتحديد
  العمليات المشبوهة أو آثارها أو حركة المرور.
weight: 5
---
## حالة استخدام

قد يكون الفحص المباشر للجهاز ضروريًا لفهم ما يحدث عليه وتحديد العمليات المشبوهة أو آثارها أو حركة المرور.  لا تعتمد على أدوات الفحص فقط واستخدم طرقًا لإلقاء نظرة أعمق على ما يحدث على الجهاز.

## الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:

- فهم طرق فحص العمليات الجارية وطرق كشف العمليات التي يحتمل أن تكون مشبوهة
- فهم آليات البقاء الشائعة وطرق التحقق منها
- فحص حركة مرور الشبكة بحثًا عن الاتصالات المشبوهة

---
## العرض 
تتطلب طرق التحليل الجنائي معرفة إضافية بالعمليات ضمن لنظام التشغيل بالإضافة إلى تطوير حدس يدلّك على ما هو طبيعي مقابل النتائج غير الطبيعية.

### ويندوز

يوفر دليل التحليل الجنائي السريعGuide to Quick Forensics](https://pellaeon.gitbook.io/mobile-forensics/ar)  مقدمة جيدة لمناهج التحليل الجنائي لفحص الجهاز  ويتضمن الدليل مقدمة إلى المجموعة المهمة من أدوات سيس إنترنالز(Sysinternals) المتاحة من مايكروسوفت. أكمل أقسام الدليل حول أوتورنز [Autoruns](https://pellaeon.gitbook.io/mobile-forensics/ar/windows/autoruns) وبروسس اكسبلورر [Process Explorer](https://pellaeon.gitbook.io/mobile-forensics/ar/windows/processes) وتي سي ب فيو [TCPView](https://pellaeon.gitbook.io/mobile-forensics/ar/windows/network).

بعد الانتهاء من الأنشطة في هذا الفصل، يجب أن تكون قادرًا:

- فهم ماهية مجموعة سيس إنترنالز[SysInternals suite](https://learn.microsoft.com/en-us/sysinternals/) وكيفية استخدام بعض الأدوات المفيدة لإجراء تحليل جنائي.
- قراءة وفهم النتائج من أداة أوتورنز من سيس إنترنالز وفهم مختلف المواقع وطرق البقاء (من خلال فهم علامات التبويب المختلفة المعروضة في الأداة)
- قراءة وتصفية النتائج من أداة أوتورنز من سيس إنترنالز لتحديد الثنائيات غير الموقّعة من مايكروسوفت فقط، وكيفية التحقق من شفرة تجزئة الملفات مقابل فايروستوتال
- معرفة كيفية قراءة وفهم النتائج من بروسس إكسبلورر، بما في ذلك كيفية التحقق من العمليات الجارية ذات توقيعات الملفات التي لم يتم التحقق منها وكيفية التحقق من شفرة تجزئة العملية مقابل فايروستوتال.
  
تُستخدم أدوات مايكروسوفت إنترنتالز على نطاق واسع وستتمكن من العثور على برامج تعليمية إضافية تستخدمها عبر الويب ولكن يُقدم دليل التحليل الجنائي السريع [Guide to Quick Forensics](https://pellaeon.gitbook.io/mobile-forensics/ar) مقدمة مستهدفة جيدة.


### نظام ماك أو إس

هناك بعض أدوات ماك أو إس [some macOS tools](https://objective-see.org/tools.html)التي أنشأتها أوبجكتف سي (Objective-See) والتي يمكن أن تساعد في اكتشاف النشاط المشبوه المحتمل على النظام. تحتوي العديد من أدوات أوبجكتف سي على بحث فايروستوتال متكامل وهذه أداة سنذكرها أيضًا لاحقًا في مسار التعلّم هذا. يمكن الاطلاع على دليل تعليمي سريع حول فايروستوتال في الفصل [7 من الدليل الميداني](https://internews.org/wp-content/uploads/2024/12/Field-Guide-to-Incident-Response-for-Civil-Society-and-Media-Chapter-7-AR.pdf). نوصي أي متعلمين يرغبون بتعلم المزيد عن نظام ماك أو إس بإلقاء نظرة على الأدوات التالية:

- لولو (LuLu): تطبيق جدار حماية مجاني ويتمتع بالعديد من الميزات لنظام ماك أو إس. يمكنه سرد جميع اتصالات الشبكة الصادرة، وبالتالي اكتشاف أي محاولات من قبل البرمجيات الضارة للتواصل مع خادم. تحقق من دليل لولو[LuLu manual](https://objective-see.org/products/lulu.html) الكامل الذي يوضح كيف يمكنك البحث عن عمليات محددة تحاول إجراء اتصال بالشبكة. إذا لم تكن متأكدًا من عمليات محددة، فيمكنك أيضًا البحث عنها على فايروستوتال (لدى لولو ميزة بحث مضمّنة) أو البحث عنها في محرك البحث المفضل لديك لتعرف ما يقوله الآخرون عنها.
- أوفرسايت (OverSight): أداة تُنبه المستخدم في كل مرة يتم فيها تفعيل الميكروفون أو كاميرا الويب وإذا حاولت البرمجيات الضارة التقاط المعلومات من خلال الميكروفون أو الكاميرا، من المفترض أن تقوم الأداة بتنبيه المستخدم أو المحلل.
- نوك نوك (KnockKnock) وبلوكبلوك (BlockBlock): يكتشف هذان التطبيقات التي يبدأ تشغيلها عندما تسجيل المستخدم الدخول إلى النظام وبالتي يمكنها تنبيه المستخدم أو المحلل إلى البرمجيات الضارة ذات ميزات البقاء أو تعاود بدء عملها مرة أخرى عند كل إعادة تشغيل. يمكن أن يوفر نوك نوك قائمة بالبرمجيات التي تحاول البقاء بينما يرسل بلوكبلوك تنبيهًا في كل مرة يتم فيها تثبيت مكون ذو ميزة بقاء جديد.
- كيكست فيوور (KextViewer): أداة لمراجعة وفحص ملحقات النواة وهي حزم تعمل على توسيع التعليمات البرمجية لنظام التشغيل الأساسي وتعمل بأعلى مستوى امتيازات.


## الممارسة

### ويندوز وماك أو إس

1. Open your operating system’s process manager and read through its outputs. Do you notice any processes which look out of place or which consume a weirdly high or low amount of resources? Note them down and search the web for them to learn more about them.
2. While tracking network connections as described in the Mobile Forensics Guide (articles for [Windows](https://pellaeon.gitbook.io/mobile-forensics/ar/windows/network) and [macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network)), open one or two apps which connect to the internet and note which IP addresses they connect to. Is there anything surprising about any of those connections or IP addresses?
3. Look through startup items and separate them between those which come from your operating system vendor, those which come from other vendors. Look up three of them online to learn more about what they do. If you are working with a peer or mentor, discuss the findings with them.
1.افتح مدير عمليات نظام التشغيل الخاص بك واقرأ معطياته، هل تلاحظ أي عمليات تبدو غير طبيعية أو تستهلك كمية عالية أو منخفضة من الموارد بشكل غريب؟ سجّل أسمائها وابحث عنها على الويب لمعرفة المزيد عنها.
2.أثناء تتبع اتصالات الشبكة كما هو موضح في دليل الأدلة الجنائية للجوال (مقالات لنظامي التشغيل ويندوز[Windows](https://pellaeon.gitbook.io/mobile-forensics/ar/windows/network) وماك أو إس[macOS](https://pellaeon.gitbook.io/mobile-forensics/mac/network))، افتح تطبيقًا أو تطبيقين يتصلان بالإنترنت وسجّل عناوين بروتوكول الإنترنت التي يتصلان بها. هل هناك أي شيء يثير العجب حول أي من هذه الاتصالات أو عناوين بروتوكول إنترنت؟
3.ابحث في عناصر بدء التشغيل وافصلها بين تلك التي تأتي من مورّد نظام التشغيل الخاص بك وتلك التي تأتي من مورّدين آخرين. ابحث عن ثلاثة منها على الإنترنت لمعرفة المزيد حول ما تفعله وإذا كنت تعمل مع زميل أو مرشِد، ناقش النتائج معهم.

### نظام أندرويد

اقرأ هذا الدليل: دليل المبتدئين - كيفية التعامل مع تطبيق جوال يحتمل أن يكون ضارًا - مجموعة أدوات باي روغ [Beginner guide - How to handle a potentially malicious mobile app - PiRogue tool suite (pts-project.org)](https://pts-project.org/guides/g3/)


## Skill Check
1.نزّل برمجية ضارة حديثة من مالوير بازار وحملّه إلى بيئة اختبار معزولة عامة (مثل ترياج (Triage)) وتحقق مما يفعله على النظام.اكتب النتائج التي توصلت إليها ثم ناقشها مع مرشِد أو زميل يتأكد من أنك قد أجريت التمرين بشكل صحيح.
(ملاحظة: قد يبدو أن البرمجية الضارة "لا تفعل شيئًا" وفي هذه الحالة، ناقش هذا مع المرشِد والنظير وجرب نوعًا مختلفًا من البرمجيات الضارة.)
2.(تمرين إضافي اختياري) اطلّع على هذا التحليل[this analysis](https://www.trendmicro.com/en_us/research/22/k/earth-preta-spear-phishing-governments-worldwide.html) من شركة الأمن تريند مايكرو (Trend Micro) وقارنه مع هذا التقرير على ترياج[this report](https://tria.ge/240207-qlmmrahhgr/behavioral1). ناقش هذين الأمرين مع مرشِد أو نظير مع تركيز على قضايا مثل الطرق التي يصف بها كلا التقريرين التكتيكات والتقنيات والإجراءات ومحاولتهما لشرح البرمجيات الضارة. تحدث عن التنسيق الذي تجد أنه من الأسهل قراءته ولماذا. (ملاحظة: هذا البرمجية الضارة المسماه "إيرث بريتا" على تريند مايكرو تُعرف أيضًا باسم "مستانغ باندا" (Mustang Panda) وقد استهدفت المؤسسات الإعلامية والمنظمات غير الحكومية على الأخص في ميانمار.)


## موارد التعلّم

{{% resource title="التحليل الجنائي للأجهزة المحمولة" description="أنشأ هذا الدليل الشامل في البداية منظمة أمن بلا حدود (Security Without Borders) ويبحث في كيفية القيام بالأدلة الجنائية الأساسية وجمع البيانات على كل منصة رئيسية." languages="اللغة الإنجليزية" cost="مجانًا" url="https://pellaeon.gitbook.io/mobile-forensics/" %}}

{{% resource title="Sysinternals" languages="English" cost="Free" description="A series of excellent tools analysts can use to better understand what is happening on a Windows system." url="https://learn.microsoft.com/en-us/sysinternals/" %}}

{{% resource title="Objective-see tools" languages="English" cost="Free" description="Excellent security tools for macOS which can help detect malware infections or attempts to gather/ exfiltrate data." url="https://objective-see.org/tools.html" %}}

## Notes

[^1]: Crowdstrike’s CrowdInspect tool is not actively maintained and may not have full functionality, thus we recommend focusing on the Microsoft tools referenced in the guide for this section. However you may still be able to obtain useful information using the tool and can gain similar types of insights as obtained from tools such as Process Explorer and TCPView
