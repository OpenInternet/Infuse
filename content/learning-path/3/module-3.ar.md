+++
style = "module"
weight = 3
title = "Sandboxes and dynamic analysis"
description = "يُعدّ التحليل الديناميكي عملية لتشغيل برمجية ضار ومراقبة ما يفعله، وأسهل طريقة لإجراء التحليل الديناميكي هي تشغيل البرنامج في بيئة اختبار معزولة. تُعد بيئة الاختبار المعزولة بيئة آمنة مستقلة لفتح ملف أو عنوان موقع ويب أو برمجية تحتمل أن تكون ضارة وإنشاء كمية هائلة من البيانات عنه."
+++

## حالة استخدام

يُعدّ التحليل الديناميكي عملية لتشغيل برمجية ضار ومراقبة ما يفعله، وأسهل طريقة لإجراء التحليل الديناميكي هي تشغيل البرنامج في بيئة اختبار معزولة. تُعد بيئة الاختبار المعزولة بيئة آمنة مستقلة لفتح ملف أو عنوان موقع ويب أو برمجية تحتمل أن تكون ضارة وإنشاء كمية هائلة من البيانات عنه. يبحث هذا الموضوع الفرعي في تحليل بيئة الاختبار المعزولة وما يمكن وما لا يمكن القيام به وكيفية القيام بذلك.
 

## الأهداف

بعد استكمال هذا الموضوع الفرعي، يتوقع من الممارسين أن يكونوا قادرين على:

- فهم حالة الاستخدام وقيود التحليل الديناميكي
- فهم مزايا وقيود بيئات الاختبار المعزولة
- فتح ملف أو عنوان موقع ويب أو برنامج مشبوه في بيئة اختبار معزولة
- إجراء بعض التحليلات الديناميكية الأساسية على ملفات ثنائية لنظام ويندوز أو أندرويد باستخدام أدوات جاهزة
  
---
## العرض
### تحليل ديناميكي 

عند إجراء تحليل ديناميكي على ملف يحتمل أن يكون مشبوهًا، ستقوم بفتح الملف وتنفيذه باستخدام أداة متخصصة ومراقبة ما يفعله هذا الملف، سواء كان يحاول الوصول إلى ملفات أخرى، أو إذا كان يقوم بإجراء اتصالات بالشبكة، أو ما شابه ذلك. من ناحية أخرى، يقوم تحليل التعليمات البرمجية بحالتها الثابتة الموضح في الموضوع الفرعي 4 بتفكيك الملف بدلاً من فتحه أو تنفيذه.

حسب الموقف، يمكن أن يكون التحليل الديناميكي أسهل أو أصعب من تحليل التعليمات البرمجية بحالتها الثابتة ويمكن أن يكون أيضًا أكثر أو أقل دقة. من الناحية العملية، من المرجح أن يؤدي الجمع بين التحليلين الثابت والديناميكي إلى أفضل النتائج. يشتمل معظم التحليل الديناميكي أيضًا على القليل من تحليل التعليمات البرمجية بحالتها الثابتة ولذلك غالبًا ما يكون الخط الفاصل بين التقنيتين غير ثابت.

يتضمن الإعداد العام للتحليل الديناميكي بيئة اختبار معزولة تُشغل فيه البرمجيات الضارة ومصحح أخطاء للتحكم في تنفيذ البرمجية ومراقبتها ومراقبة النظام للانتباه إلى التغييرات في حالة نظام بيئة الاختبار المعزولة، بالإضافة إلى الأداة التي تتحكم في الوصول إلى الإنترنت لحظر حركة المرور على الشبكة ومراقبتها و/أو تعديلها. يمكن أن تكون جميعها موجودة على نظام واحد أو قد تكون أجهزة ظاهرية أو مادية منفصلة. على سبيل المثال، يمكنك استخدام iPhone مكسور الحماية ليكون بيئة الاختبار المعزولة الخاصة بك مع أداة واحدة لتصحيح الأخطاء عن بُعد ومراقبة النظام وأداة أخرى للتحكم في الوصول إلى الإنترنت. لا يمكن استخدام جميع الأنظمة في كل حالة، على سبيل المثال قد تلتقط فقط حركة مرور الشبكة وتراقب تغييرات النظام دون استخدام مصحح أخطاء.

هناك العديد من الطرق المختلفة التي يمكننا من خلالها إجراء تحليل ديناميكي بما فيها فتح الملف التنفيذي في بيئة اختبار معزولة والتحقق من اتصالات الشبكة التي يقوم بها. وللحصول على مورد رائع حول اكتشاف البرمجيات الضارة من خلال حركة مرور الشبكة التي تولدها، راجع هذا [الدليل](https://malware-traffic-analysis.net/).

من الناحية النظرية، يمكن للتحليل الديناميكي أن يُحذر ممثل تهديد من أنك تقوم بتحليل برمجياته الضارة، ولكن من الناحية العملية غالبًا ما يتوقع المخترقون تحليل برمجياتهم الضارة ومن النادر جدًا مواجهة برمجيات ضارة جديدة تمامًا في حياتك المهنية، وباستثناء بعض الحالات الحساسة للغاية لا داعي للقلق بشأن هذا الخطر.

### بيئات الاختبار المعزولة


بيئة الاختبار المعزولة (للبرمجيات الضارة) هي بيئة آمنة يمكنك من خلالها فتح وتشغيل ملف أو عنوان موقع ويب، وهي في الأساس جهاز ظاهري مصمم خصيصًا يتم تشغيله قبل فتح الملف أو عنوان موقع الويب، ثم يتم إيقاف تشغيله بعد فترة زمنية معينة. 

تُسجل جميع الأنشطة في بيئة الاختبار المعزولة مثل الملفات التي يتم فتحها أو إنشاؤها وكذلك اتصالات الشبكة التي يتم إجراؤها ويمكن الوصول إليها من خلال تقرير النشاط. يمكن أن يساعدك تقرير النشاط في فهم ما إذا كان الملف أو عنوان موقع الويب ضارًا. يمكن أن يساعدك أيضًا في ربط البرمجيات الضارة بالأنشطة التي سبق أن شهدتها، على سبيل المثال، استنادًا إلى اتصالات شبكة محددة أو ملفات تم إنشاؤها.

يمكن أن يكون تشغيل البرمجيات الضارة المعروفة داخل بيئة الاختبار المعزولة مفيدًا جدًا أيضًا لأنك تتعلم المزيد عن البرمجيات الضارة. ويساعدك على فهم ما تفعله البرمجيات الضارة والتغييرات التي تجريها على النظام. على سبيل المثال، تحاول الكثير من البرمجيات الضارة عند تشغيلها في البداية ضمان البقاء بحيث تستمر في العمل بعد إعادة التشغيل، وطرق البقاء هذه هي شيء يمكنك البحث عنه عند إجراء التحليل الجنائي اليدوي على جهاز تشك بأنه مخترق.

تحتوي الكثير من البرمجيات الضارة على ميزات مضمّنة لمكافحة بيئات الاختبار المعزولة: حيث عندما تكتشف البرمجيات الضارة أنها تعمل داخل بيئة اختبار معزولة ستقوم بالتوقف عن العمل أو في بعض الأحيان تفعل شيئًا غير ضار للعبث بالتحليل. كما تُصمم بعض البرمجيات الضارة لتعمل فقط إذا تم استيفاء شروط محددة، على سبيل المثال وجود إصدار معين من نظام التشغيل أو عنوان بروتوكول الإنترنت موجود في بلد معين. غالبًا ما تُحدث بيئات الاختبار المعزولة للرد على طرق مكافحتها وتتيح لك العديد من بيئات الاختبار المعزولة اختيار خصائص معينة.
وهذا أمر مهم يجب مراعاته عند قراءة تقرير بيئة الاختبار المعزولة حيث إن عدم وجود نشاط ضار لا يعني تلقائيًا أن الملف أو عنوان موقع الويب غير ضار. ومن ناحية أخرى، إذا ظهر نشاط ضار يمكنك التأكد من أن الملف أو عنوان موقع الويب ضار.

راجع الفصل 10 من الدليل الميداني للاستجابة للحوادث للمجتمع المدني ووسائل الإعلام للتعرّف بتعمّق أكبر على بيئات الاختبار المعزولة[Chapter 10 of the Field Guide to incident response for civil society and media](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).

من الممكن تشغيل بيئة الاختبار المعزولة محليًا ومن بينها[Cuckoo](https://cuckoosandbox.org/) مفتوحة المصدر الموجود منذ سنوات عديدة ويجري حاليًا تطوير نسخة جديدة ولكنها غير متوفرة اعتبارًا من وقت الكتابة (فبراير 2024).
في حين أن تشغيل بيئة الاختبار المعزولة محليًا يمنحك التحكم الكامل في البيئة ويعني أنه يمكنك الحفاظ على الخصوصية التامة لملفاتك وعناوين مواقع الويب الخاصة بك، قد يتطلب إعدادها وصيانتها الكثير من العمل. لحسن الحظ، تُتاح العديد من بيئات الاختبار المعزولة عبر الإنترنت مثل إني ران [ANY.RUN](https://any.run/) وهايبرد اناليسيس [Hybrid Analysis](https://www.hybrid-analysis.com/) وجو ساندبوكس [Joe Sandbox](https://www.joesandbox.com/) و تصنيف الترياج[Triage](https://tria.ge/) وحتى إصدار على الإنترنت من كوكو [Cuckoo](https://cuckoo.cert.ee/). وتحتوي جميعها على إصدارات مجانية تسمح لك بتحميل البرمجيات الضارة وعناوين مواقع الويب ولكن بعضها يتطلب التسجيل. يجب مراعاة أنك إذا كنت تستخدم إصدارًا مجانيًا فإن أي شيء تقوم بتشغيله داخل بيئة الاختبار المعزولة سيكون متاحًا للعامة وقد يكون هذا مصدر قلق إذا كنت لا ترغب في إعلام المتطفل أو في حال كنت تتعامل مع بيانات خاصة للغاية مثل المستندات السرية التي يحتمل أن تكون مصابة. 

### التحليل الديناميكي للملفات الثنائية على ويندوز

نوصي بالبدء بفصل يُقدم نظرة عامة هذه المرة من [OpenSecurityTraining](https://opensecuritytraining.info/Training.html) يتضمن فصل التحليل الديناميكي للبرمجيات الضارة[Malware Dynamic Analysis](https://opensecuritytraining.info/MalwareDynamicAnalysis.html) شرائح ومواد مختبرية ومقاطع فيديو ويغطي الإعداد والتحليل وإنشاء مؤشرات الاختراق.

### التحليل الديناميكي للملفات الثنائية لنظام أندرويد

يمكن استخدام العديد من الأدوات لإجراء تحليل ديناميكي للملفات الثنائية لنظام أندرويد وتشمل هذه بعض بيئات الاختبار المعزولة الموضحة أعلاه و[Frida](https://frida.re/docs/android/)  (اطلّع على هذه [الأداة](https://github.com/nccgroup/house) التي توفر واجهة مستخدم رسومية لاستخدام Frida).
يمكن لمجموعة أدوات بيروج (الموضحة في مسار تعلّم اكتشاف البرمجيات الضارة) أيضًا إجراء  [تحليل ديناميكي ممتاز](https://pts-project.org/guides/g8/)للملفات الثنائية لنظام أندرويد ولكن بعض طرق التحليل هذه تتطلب منك أولاً الحصول على صلاحيات الجذر في جهازك (الروت).

## اختبار مهارة

### عام

1- انتقل إلى قسم "بيئة الاختبار المعزولة" في الفصل 10 من الدليل الميداني للاستجابة للحوادث للمجتمع المدني ووسائل الإعلامField Guide to incident response for civil society and media](https://internews.org/resource/field-guide-to-incident-response-for-civil-society-and-media/) وأكمل التمارين 10.2 حتى 10.4. في التمرين الأخير، تأكد من تشغيل عينة واحدة على الأقل من ر الضارة لنظامي التشغيل ماك أو إس (macOS) وأندرويد. 
2- في نفس الفصل، انتقل إلى القسم الفرعي "تحليل الروابط" وأكمل التمرين 10.12.
   
### خاص بنظام ويندوز

أجر تحليلًا ديناميكيًا على برنامج ويندوز غير ضار الذي ربما يتضمن برنامج تثبيت يقوم بتنفيذ إجراءات مماثلة البرمجيات الضارة. ما هي الملفات التي ينشئها؟ ما هي مُدخلات السجل التي ينشئها؟ ما هي حركة مرور الشبكة التي يرسلها؟

## موارد التعلّم

{{% resource title="Chapter 10, Field Guide to incident response for civil society and media" languages="English" cost="Free" description="In-depth look at using sandboxes to analyze email payloads." url="https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf" %}}

{{% resource title="Any.run" languages="English" cost="Free only for non-commercial use" description="Commercial sandbox for analyzing malware." url="https://any.run/" %}}

{{% resource title="Joe Sandbox" languages="English" cost="Free for public accounts (results published on website)" description="Commercial sandbox service for malware analysis." url="https://www.joesandbox.com/#windows" %}}

{{% resource title="Cuckoo Sandbox" languages="English" cost="Free" description="Sandbox service by Estonian CERT for malware analysis." url="https://cuckoo.cert.ee/" %}}

{{% resource title="Hybrid Analysis" languages="English" cost="Free" description="Sandbox service by CrowdStrike mixing static and dynamic analysis." url="https://www.hybrid-analysis.com/" %}}

{{% resource title="Triage sandbox" languages="English" cost="Registration required" description="Community-driven sandbox for analyzing malware." url="https://tria.ge/" %}}

{{% resource title="Online class on malware dynamic analysis" languages="English" cost="Free" description="Three-day class on dynamic malware analysis." url="https://opensecuritytraining.info/MalwareDynamicAnalysis.html" %}}

{{% resource title="Case study 1: Dynamic Analysis of a Windows Malicious Self-Propagating Binary" languages="English" cost="Free" description="Blogpost demonstrating dynamic analysis of a Windows binary." url="https://www.keysight.com/blogs/tech/nwvs/2022/06/10/dynamic-analysis-of-a-windows-malicious-self-propagating-binary" %}}

{{% resource title="Case study 2: Configuring a Windows Domain to Dynamically Analyze an Obfuscated Lateral Movement Tool" languages="English" cost="Free" description="Case study on dynamic analysis of obfuscated malware in a Windows domain." url="https://www.real-sec.com/2020/07/configuring-a-windows-domain-to-dynamically-analyze-an-obfuscatedlateral-movement-tool/" %}}

{{% resource title="Case study 3: Starting dynamic analysis on a Windows x64 rootkit" languages="English" cost="Free" description="In-depth look at dynamic analysis of Windows rootkits." url="https://medium.com/@0x4ndr3/starting-dynamic-analysis-on-a-windows-x64-rootkit-8c7a74871fda" %}}

{{% resource title="Malware traffic analysis" languages="English" cost="Free" description="Guide on using captured network packets to analyze malware." url="https://malware-traffic-analysis.net/" %}}

{{% resource title="Hack The Box course on mobile penetration testing" languages="English" cost="Free" description="Introduction to mobile malware dynamic analysis." url="https://www.hackthebox.com/blog/intro-to-mobile-pentesting" %}}

{{% resource title="Hack The Box: Intro to Android Exploitation" languages="English" cost="Free" description="Exercises on mobile application penetration testing." url="https://app.hackthebox.com/tracks/Intro-to-Android-Exploitation" %}}

{{% resource title="Frida and House for Android" languages="English" cost="Free" description="Tools for dynamic monitoring and debugging of Android apps." url="https://frida.re/docs/android/" %}}

{{% resource title="House" languages="English" cost="Free" description="Interface to Frida for Android app analysis." url="https://github.com/nccgroup/house" %}}

{{% resource title="Advanced guide - How to use PiRogue to intercept the TLS traffic of a mobile app" languages="English" cost="Free" description="Instructions on using PiRogue Tool Suite for dynamic analysis of Android binaries." url="https://pts-project.org/guides/g8/" %}}
