+++
style = "module"
weight = 7
title = "Detecting malware through image acquisition (iOS, Android)"
description = "تتمثل الخطوة الأولى في كشف البرمجيات الضارة على الجهاز في جمع البيانات من الجهاز نفسه لتحليلها ومن الناحية المثالية يمكن نقل البيانات من الجهاز إلى مساحة آمنة مع أدنى حد من التعطيل للجهاز نفسه."
+++
## حالة استخدام

تتمثل الخطوة الأولى في كشف البرمجيات الضارة على الجهاز في جمع البيانات من الجهاز نفسه لتحليلها ومن الناحية المثالية يمكن نقل البيانات من الجهاز إلى مساحة آمنة مع أدنى حد من التعطيل للجهاز نفسه. قد تحاول البرمجيات الضارة الأكثر تقدمًا اكتشاف نشاط التحليل الجنائي وحذف نفسها لعرقلة الكشف والتحليل.

## الأهداف 
بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:

- أجر نسخة احتياطية لجهاز آي أو إس أو أندرويد للتحقق من البرمجيات الضارة المحتملة
- تحقق من البيانات التي تم جمعها في تلك النسخة الاحتياطية، على سبيل المثال من خلال البحث عن الطوابع الزمنية والبيانات الوصفية أو الآثار
- تحليل النسخ الاحتياطية لنظامي آي أو إس وأندرويد باستخدام موبايل فيريفيكيشن تولكيت (MVT)

---
## العرض
 
للحصول على رؤية أوسع لطرق كشف البرمجيات الضارة والتحديات المحتملة، نوصي جميع المتعلمين بإلقاء نظرة على هذه [المحادثة](https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik)  (أصلها باللغة الألمانية ولكنها مترجمة أيضًا إلى الفرنسية والإنجليزية) وهي مقدمة رائعة حول الموضوع وتستمر حوالي 50 دقيقة (بالإضافة إلى الأسئلة والأجوبة).

### آي أو إس وأندرويد

عادةً ما تكون أنظمة تشغيل الأجهزة المحمولة أكثر محدودية/تأمينًا مقارنة بأنظمة سطح المكتب، لذا فإن إنشاء نسخة احتياطية كاملة والعمل عليها ليس بالأمر السهل وقد لا تتمكن من الحصول على جميع المعلومات بسهولة من الجهاز. إحدى الأدوات متعددة المنصات كاملة الميزات لاستخراج البيانات المتنقلة هي مجموعة أدوات موبايل فيريفيكيشن تولكيت Mobile Verification Toolkit](https://mvt.re) الخاصة بمختبر الأمن التابع لمنظمة العفو الدولية. تتوفر كامل الوثائق على موقعهم على شبكة الإنترنت ولكن هناك أيضًا أدلة توجيهية على سبيل المثال[ هذا](https://www.youtube.com/watch?v=iLOSlHhGI9U) (بالإنجليزية، فيديو طوله 6 دقائق). لاحظ أن هذه الجولة الأخيرة تتضمن أيضًا مواد سنغطيها في الموضوع الفرعي التالي وبدلًا من ذلك يمكنك أيضًا استخدام هذا  [الدليل](https://pts-project.org/guides/g4/)الذي سيوضح كيفية إجراء النسخ الاحتياطي على كل من آي أو إس وأندرويد.

عندما يتعلق الأمر بنظام التشغيل يمكنك استخدام أداة تسمى ليبي موبايل ديفايس [libimobiledevice](https://libimobiledevice.org/)  أو آي تونز (iTunes) لإجراء نسخة احتياطية. يمكنك بعد ذلك تحليل هذه النسخة الاحتياطية باستخدام موبايل فيريفيكيشن تولكيت.

يُعدّ كشف البرمجيات الضارة على أندرويد أكثر تعقيدًا ولكن يمكنك استخدام أداة تسمى أندرويد كيو إف [androidqf](https://github.com/botherder/androidqf)  لتخزين السجلات. راجع هذه [المقالة](https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/) للحصول على مزيد من التفاصيل حول أندرويد كيو إف ولماذا يصعب إجراء نسخ احتياطي دون توصيل جهاز أندرويد أولًا بجهاز كمبيوتر آخر.

يمكنك تثبيت موبايل فيريفيكيشن تولكيت على لينوكس أو ماك أو إس. تحتوي معظم أنظمة لينوكس على pip3، وهي أداة تستخدم لتثبيت حزم بايثون (Python) مما يجعل تثبيت موبايل فيريفيكيشن تولكيت بسيطًا إلى حد ما، بينما ستحتاج على ماك أو إس عادةً إلى تثبيت أداتين هما إكس كود (XCode) وهومبرو (Homebrew) أولًا قبل التمكن من تثبيت موبايل فيريفيكيشن تولكيت ويمكنك اتباع التعليمات الواردة في هذا [الدليل](https://docs.mvt.re/en/latest/install/) لتثبيتها.


### آي أو إس وأندرويد

🧰 بالنسبة للأجهزة المحمولة، تجعل بنية النظام برامج مكافحة البرمجيات الضارة على الجهاز أقل فعالية ولكن ستقوم موبايل فيريفيكيشن تولكيت[Mobile Verification Toolkit](https://mvt.re) بفحص البيانات المستخرجة من جهاز أندرويد أو آي أو إس بحثًا عن البرمجيات الضارة المختلفة.

في القسم السابق، راجعنا النسخ الاحتياطي لجهاز باستخدام موبايل فيريفيكيشن تولكيت وبمجرد الانتهاء من ذلك يمكنك فحص النسخة الاحتياطية باستخدام أداة سطر الأوامر.

لكن لاحظ أن موبايل فيريفيكيشن تولكيت تعاني من بعض القيود:

- تتحقق موبايل فيريفيكيشن تولكيت من النسخ الاحتياطي للجهاز مقابل مؤشرات الاختراق المعروفة. وهذا يعني أنه لا يمكنها التحقق إلا من البرمجيات الضارة التي تحتوي على مؤشرات الاختراق المحددة تلك. لا يبحث عن استدلالات أخرى (مثل نظام مُخترق الحماية أو الأتمتة أو البرمجيات النصية المشبوهة) التي قد تشير إلى وجود إصابة.
- بالنسبة لنظام التشغيل آي أو إس[gain access to a device backup, and then extract the data from the backup](https://docs.mvt.re/en/latest/ios/backup/itunes/)، تُعدّ أفضل طريقة هي الوصول إلى نسخة احتياطية من الجهاز، ثم استخراج البيانات من النسخة الاحتياطية. يجب أن يوفر القيام بذلك معظم البيانات المتوفرة على الجهاز. (توجد المزيد من أعمال التحليل التي يمكن إجراؤها على جهاز آي أو إس مُخترق الحماية على الرغم من أن هذا يقع خارج نطاق مسار التعلّم هذا). تجدر الإشارة أيضًا إلى أن النسخة الاحتياطية المشفرة تحتوي على بيانات أكثر بكثير من البيانات غير المشفرة ونوصي دائمًا باستخدام الأولى إن أمكن.
بالنسبة لنظام أندرويد ما لم يكن الجهاز متاحًا عليه الوصول إلى الجذر فلن تتمكن من استخراج كل شيء، ولكن يمكنك الحصول على الكثير من بيانات الجهاز دون الوصول إلى الجذر.
لأجل مقالة سريعة حول مؤشرات الاختراق التي تتحقق منها موبايل فيريفيكيشن تولكيت، وكيفية تنزيل بيانات مؤشرات الاختراق الجديدة وتقديمها وقائمة بمؤشرات الاختراق المحتملة التي يمكنك استخدامها في جهود الكشف خاصتك، تحقق من هذه الصفحة الفرعية في وثائق موبايل فيريفيكيشن تولكيت[this sub-page in the MVT documentation.](https://docs.mvt.re/en/latest/iocs/).



## الممارسة

بالنسبة لتمارين التدريب في هذا الموضوع الفرعي، قم أولًا بإجراء نسخة احتياطية من جهازك (التعليمات الخاصة بكل منصة موضّحة أدناه) ثم أجب عن الأسئلة تحت علامة "جميع الأنظمة".

### نظام آي أو إس
ثبّت موبايل فيريفيكيشن تولكيت على نظام تشغيل سطح المكتب. اتبع الإرشادات الموضّحة في هذا [القسم](https://docs.mvt.re/en/latest/ios/install/) لإجراء نسخة احتياطية، إما باستخدام آي تونز أو عن طريق تثبيت ليبي موبايل ديفايسأولًا[libimobiledevice](https://docs.mvt.re/en/latest/ios/install/).. 

### نظام أندرويد
ثبّت موبايل فيريفيكيشن تولكيت على نظام تشغيل سطح المكتب. ثم ثبّت أندرويد كيو[Androidqf](https://github.com/botherder/androidqf)  إف واستخدمه لإجراء نسخة احتياطية.

### ويندوز وماك أو إس ولينوكس
أجر نسخة احتياطية من نظام تشغيل سطح المكتب الخاص بك باستخدام أداة من اختيارك ويمكنك استخدام إحدى الأدوات الموضحة في قسم مصادر التعلّم أعلاه.

### جميع الأنظمة

تحقق مما يلي في نسختك الاحتياطية:

- ما هي البيانات التي حصلت عليها من الجهاز؟ ما هي البيانات التي لم تحصل عليها؟
- ما الذي تم تعديله مؤخرًا؟
- هل الطوابع الزمنية محفوظة في نسخة الاستحواذ على البيانات؟

## اختبار مهارة

قبل القيام بقسم اختبار المهارة من التمرين، تأكد من أنك قمت أولًا بإجراء نسخة احتياطية من ملفاتك كما هو موضح في قسم الممارسة،  وبمجرد الانتهاء من ذلك قم بما يلي:

### ويندوز وماك أو إس ولينوكس

لقد أكملت النسخ الاحتياطي لنظام تشغيل سطح المكتب، قم بفتحها وستجد داخلها:

- مجلد التنزيلات
- ملفًا واحدًا قابل للتنفيذ على الأقل
- ملف إعدادات أو تكوين نظام واحد على الأقل
 
لا بأس تمامًا باستخدام محرك البحث المفضل لديك لمعرفة مكان وجود هذه الملفات والمجلدات على القرص ثم البحث عنها في نفس الموقع داخل نسختك الاحتياطية فقط.

### نظام آي أو إس

إذا تم تشفير النسخة الاحتياطية لنظام آي أو إس، استخدم موبايل فيريفيكيشن تولكيت لفك تشفيرها باتباع هذه التعليمات[these instructions](https://docs.mvt.re/en/latest/ios/backup/check/#decrypting-a-backup) ثم اقرأ معطيات الأمر للتأكد من أن فك التشفير قد تم بنجاح.

بعد فك تشفير النسخة الاحتياطية، اطلب من موبايل فيريفيكيشن تولكيت تنزيل أحدث مؤشرات الاختراق ثم استخدم الأداة لفحص النسخة الاحتياطية بحثًا عن البرمجيات الضارة.

### نظام أندرويد

طلب من موبايل فيريفيكيشن تولكيت تنزيل أحدث مؤشرات الاختراق ثم استخدامه لفحص النسخة الاحتياطية التي قمت بإنشائها باستخدام أندرويد كيو إف.


## موارد التعلّم

{{% resource title="Smartphone malware forensics: An introduction" languages="Original talk is in German, translated into French and English. Slides are in English." cost="Free" description="A talk by two mobile malware researchers outlining smartphone malware forensics basics, tools, and methods." url="https://media.ccc.de/v/37c3-11874-einfuhrung_in_smartphone_malware_forensik" %}}

{{% resource title="Mobile forensics" languages="English" cost="Free" description="Comprehensive guide by Security Without Borders on mobile forensics across major platforms." url="https://pellaeon.gitbook.io/mobile-forensics/" %}}

{{% resource title="How to make a Windows 10/11 image backup" languages="English" cost="Free" description="Guide on creating a system backup for malware analysis on Windows." url="https://www.computerworld.com/article/3655693/how-to-make-image-backup-windows-10-windows-11.html" %}}

{{% resource title="How to back up a Mac or Macbook" languages="English" cost="Free" description="Article focusing on disk images for macOS backups." url="https://www.macworld.com/article/671336/how-to-back-up-a-mac-or-macbook.html" %}}

{{% resource title="How To Backup Your Entire Linux System Using Rsync" languages="English" cost="Free" description="Guide on using rsync to clone a Linux system for forensic analysis." url="https://ostechnix.com/backup-entire-linux-system-using-rsync/" %}}

{{% resource title="MVT, mobile verification toolkit" languages="English" cost="Free" description="Tool to analyze iOS and Android backups for malware IoCs." url="https://docs.mvt.re/en/latest/" %}}

{{% resource title="Backing up with iTunes" languages="English" cost="Free" description="Using iTunes to create iOS backups for analysis with MVT." url="https://docs.mvt.re/en/latest/ios/backup/itunes/" %}}

{{% resource title="I analyzed my phone for Pegasus spyware" languages="English" cost="Free" description="Video guide using MVT to find IoCs related to Pegasus on iOS." url="https://www.youtube.com/watch?v=iLOSlHhGI9U" %}}

{{% resource title="Beginner guide - How to backup a mobile device for forensic analysis purpose" languages="English" cost="Free" description="Introductory guide on using tools to backup iOS and Android devices for malware scanning." url="https://pts-project.org/guides/g4/" %}}

{{% resource title="libimobiledevice" languages="English" cost="Free" description="Software library to access and backup iOS devices from Windows, macOS, or Linux." url="https://libimobiledevice.org/" %}}

{{% resource title="Simplifying Android Forensics" languages="English" cost="Free" description="Write-up on tools for Android device backups and their limitations." url="https://securitylab.amnesty.org/latest/2023/09/fellowship-apkqf-simplifying-android-forensics/" %}}

{{% resource title="Install libimobiledevice" languages="English" cost="Free" description="Guide on installing libimobiledevice for forensic investigations." url="https://docs.mvt.re/en/latest/ios/install/" %}}

{{% resource title="androidqf" languages="English" cost="Free" description="Tool for accessing data from Android devices for forensic analysis." url="https://github.com/botherder/androidqf" %}}

{{% resource title="SANS Course on Digital Acquisition and Rapid Triage" languages="English" cost="around 8000+ USD" description="Comprehensive course on acquiring and analyzing data from mobile devices." url="https://www.sans.org/cyber-security-courses/digital-acquisition-rapid-triage/" %}}







ا

