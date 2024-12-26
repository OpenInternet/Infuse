---
style: module
title: تمرين "التقط العلم"(Catch The Flag)
description: لقد صممنا أيضاً تمرين التقاط العلم حيث يمكن للمتعلمين تحليل رسالة بريد إلكتروني للتصيد الاحتيالي والبنية التحتية التي ترتبط بها. يمكن استخدام التمرين كتدريب إضافي أو تمرين إضافي للتحقق من المهارات، ويمكن الاطلاع عليه هنا
weight: 10
---
لقد صممنا أيضاً تمرين التقاط العلم حيث يمكن للمتعلمين تحليل رسالة بريد إلكتروني للتصيد الاحتيالي والبنية التحتية التي ترتبط بها. يمكن استخدام التمرين كتدريب إضافي أو تمرين إضافي للتحقق من المهارات، ويمكن الاطلاع عليه هنا.

تجلس/ تجلسين في غرفة الأخبار الصحفية  حيث  تعمل/ تعملين كمسؤول/ مسؤولة عن تكنولوجيا المعلومات، وتجلس/ تجلسين مركز/مركزة تماماً على واجباتك محاط/ محاطة بشاشات مختلفة. يهرع إليك زميلتك علياء من قسم المحاسبة وعلى وجهها نظرة قلق، وتخبرك أنه أرسل لها رسالة بريد إلكتروني يدّعي أنه من PayPal يحثها على اتخاذ إجراء فوري بسبب نشاط مشبوه في الحساب. تعتمد المؤسسة الصحفية على PayPal لمعالجة مدفوعات الاشتراكات. يثار اهتمامك على الفور لأنك/أنكي تدرك/تدركين احتمال وجود هجوم خبيث، وتبدأ/تبدئين في إجراء تحقيق.

*يستخدم هذا النشاط نموذج البريد الإلكتروني والصفحة المقصودة اللازمة لهذا النشاط. قم بتنزيل الملف هنا {{< fontawesome "solid/download" >}} [CTF Materials](/files/ctf-materials.zip)*

### السؤال 1: ما هو عنوان المرسل للبريد الإلكتروني؟

{{< question title="التعليمات" open="true" >}}
اكتشف كيف سيظهر عنوان المرسل في عميل البريد الإلكتروني إذا تم فتح البريد الإلكتروني.
{{< /question >}}

{{< question title="الإرشادات" >}}

هناك عدة طرق لعرض شكل البريد الإلكتروني على المستلم. الطريقة الأكثر وضوحًا هي فتح الملف في عميل البريد، وهو ما قمنا به في الأمثلة أدناه. ولكن في سياق التهديد المستهدف، قد تكون هذه فكرة سيئة، في حالة احتواء الملف على نصوص برمجية يمكنها استغلال عملاء البريد الإلكتروني، أو جمع معلومات عن الجهاز، أو تحميل موارد خارجية (مثل الصور/بكسلات التتبع) التي تكشف عنوان IP الخاص بك للمهاجم. في حالة هذه الإرشادات، من الآمن فتح ملف EML في عميل البريد الإلكتروني الخاص بك، ولكن للعمل المباشر، فكر في بعض البدائل:
* استخدم عميل بريد إلكتروني في جهاز افتراضي يمكن استرجاعه إلى لقطة آمنة
* افتح الملف في محرر نصوص واقرأ محتوى HTML مباشرةً
* إعادة تسمية الملف إلى .mht وفتحه في متصفح ويب (ضع في اعتبارك استخدام جهاز محميّ والاتصال بشبكة افتراضية خاصة لتجنب جمع عناوين IP من وحدات بكسل التتبع)
* استخدم خدمة عبر الإنترنت مثل<https://www.emlreader.com/> أو <https://www.encryptomatic.com/viewer/> لعرض البريد الإلكتروني. سيعرض محلل رؤوس البريد الإلكتروني في https://mxtoolbox.com/EmailHeaders.aspx> MXToolBox> (يُستخدم لاحقًا في هذه الإرشادات التفصيلية) محتوى HTML أيضًا إذا قمت بتضمينه في الرؤوس الملصقة.
* استخدام أداة eDiscovery التي يمكنها عرض ملفات EML
* استضافة الخدمة الخاصة بك ذاتيًا لعرض ملفات EML، مثل <https://github.com/xme/emlrender>
* 
في هذه الإرشادات التفصيلية سنقوم فقط بفتح البريد الإلكتروني (paypal.eml) في برنامج بريد إلكتروني



![Windows Right-Click menu showing Open With -> Outlook Option](/media/uploads/CTF1_open_in_mail_program.png)

عندما ننظر إلى البريد الإلكتروني، نرى عنوان مرسل البريد الإلكتروني

![Image of an ostensible email from Paypal indicating suspicious account activity with a link to verify the account. The email is from paypal@service.com](/media/uploads/CTF2_sender_address.png)
{{< /question >}}

{{< question title="الإجابة" >}}
البريد الإلكتروني للمرسل هو : [paypal@service.com](mailto:paypal@service.com)
{{< /question >}}

### السؤال 2: ما هو موضوع هذا البريد الإلكتروني؟

{{< question title="التعليمات" open="true" >}}
بينما نستمر في مراجعة البريد الإلكتروني، نبحث عن المزيد من الخصائص التي يمكن أن تكون مؤشراً على رسائل غير مرغوب فيها أو رسائل خبيثة. لننظر إلى الموضوع وبعض العلامات الأخرى داخل النص! إذا كنت تقرأ البريد الإلكتروني في محرر نصوص، فستجده في سطر : الموضوع.
{{< /question >}}

{{< question title="الإرشادات" >}}
![A screenshot of the email in question, highlighting the subject line thereof](/media/uploads/CTF3_email_subject.png)

فيما يلي بعض النقاط الرئيسية التي يجب الانتباه إليها في رسائل التصيد الاحتيالي:
* الإحساس بالإلحاح
* افتتاحية غريبة، لا تخاطبك بالاسم
* أخطاء نحوية
* عنوان المرسل أو عناوين URL داخل البريد الإلكتروني مشوشة أو لا تتطابق مع الموقع الإلكتروني الذي يدعي البريد الإلكتروني أنه من
{{< /question >}}

{{< question title="الإجابة" >}}
We called you and you didn't answer:سطر موضوع البريد الإلكتروني هو 
{{< /question >}}

### السؤال 3: ما هو الإجراء المطلوب؟

{{< question title="التعليمات" open="true" >}}
عندما ننظر إلى رسالة بريد إلكتروني يُحتمل أن تكون خبيثة، نحتاج أيضًا إلى معرفة ما أراد المرسل أن نفعله. ما الإجراء الذي تفترض أن المرسل أراد من المستلم القيام به؟

{{< /question >}}

{{< question title="الإرشادات" >}}
![A screenshot of the email with "detected suspicious activity", "payments have been suspended", "complete account verification" and the call to action link saying "resume payments" all underlined](/media/uploads/CTF4_email_actions.png)
{{< /question >}}

{{< question title="الإجابة" >}}
Click on one of the two links within the email: الجواب هو
{{< /question >}}

## التعرّف على التهديد

###  ؟"Confirm" السؤال 4: فكك رابط

{{< question title="التعليمات" open="true" >}}

عندما نتعمق في التحليل، فإن الخطوة الأولى التي يجب القيام بها هي فهم الفرق بين الروابط المشبوهة. عندما نحلل الروابط التي يُحتمل أن تكون مشبوهة، فإننا عادةً ما نقوم بإلغاء تشفيرها أو تفكيكها - وهذا يعني استبدال بعض الأحرف بحيث لا يمكن النقر على الرابط عن طريق الخطأ أو لا يؤدي إلى تشغيل أي آليات آلية لفحص الروابط أو الفيروسات. يعتبر إلغاء تغيير الروابط من أفضل الممارسات في التحقيقات الأمنية. لن تتحول الروابط التي تم إلغاء تغييرها تلقائيًا إلى روابط قابلة للنقر، ولكنها ستظل تحتفظ بمعلومات الرابط الأصلي، على سبيل المثال hxxp[://] www[.] google[.] com.

{{< /question >}}

{{< question title="الإرشادات" >}}
يمكنك إلغاء تشفير رابط في محرر النصوص. سنستخدم هنا[CyberChef](gchq.github.io/CyberChef) لإلغاء تشفير عنوان URL كما سنستخدم CyberChef لخطوات أخرى أيضًا. CyberChef هو تطبيق ويب يحتوي على عدد كبير من الوظائف التي يمكن أن تساعدك في تحليل البيانات المتعلقة بالأمان. إليك [مقدمة موجزة جداً](https://udel.codes/cyberchef.html) عن تصميمه ووظائفه. 

كجزء من هذا التمرين، استخدم CyberChef وقم بإلغاء رابط "please confirm" من البريد الإلكتروني المرفق

![A screenshot of how to right click on an email and then press "copy link"](/media/uploads/CTF5_copylink.png)
أولاً، نقوم بنسخ الرابط التشعبي (hyperlink) من البريد الإلكتروني.

![A screenshot of CyberChef, with "defang" being typed into its search bar](/media/uploads/CTF6_defang.png)
بعد ذلك، نأخذ مدخل "عنوان URL الخاص بـ "Defang URL" من CyberChef ونسحبه إلى قسم “Recipe”

![A screenshot of CyberChef successfully defanging an email](/media/uploads/CTF7_defanged.png)

بمجرد أن نقوم بلصق عنوان URL في قسم الإدخال في CyberChef، سيُخرج تلقائيًا نسخة غير منقوصة منه.
{{< /question >}}

{{< question title="الإجابة" >}}
hxxps[://]d[.]pr/mUxkOm: الإجابة

{{< /question >}}

### السؤال 5: استخدم CyberChef لاستخراج جميع الروابط الموجودة في البريد الإلكتروني وإلغاء تشفيرها.

{{< question title="التعليمات" open="true" >}}
يمكنك استخدام CyberChef لتنفيذ الكثير من مهام التحليل المختلفة. في هذه المرة، ابحث عن سير عمل لاستخراج جميع الروابط من البريد الإلكتروني وإلغاء تحديدها بسهولة.
{{< /question >}}

{{< question title="الإجابة" >}}
يمكنك استخدام "وصفة" - أو سلسلة من الخطوات المتصلة - في CyberChef لإجراء تحليل أكثر تعقيدًا. للحصول على جميع عناوين URL الموجودة في الرسالة وإلغاء تشفيرها، كل ما عليك فعله هو تشغيل وصفة باستخدام "استخراج عناوين URL" و "إلغاء تشفير عناوين URL" ولصق المحتوى الكامل للبريد الإلكتروني (المنسوخ من محرر نص عادي) كمدخلات. إذا كنت ستضع علامة اختيار "فريد" ضمن خانة الاختيار "فريد" تحت "استخراج عناوين URL"، فسترى أن النتائج ستختلف عن تلك الموجودة في لقطة الشاشة، وستخرج عنوان URL واحد فقط، وهو نفس العنوان الذي قمت بإلغاء تحديده أعلاه. حقيقة أن هناك عنوان URL واحد فقط، يتكرر عدة مرات، داخل البريد الإلكتروني هو خبر رائع بالنسبة لنا - سيجعل تحليلنا أكثر وضوحًا.

![A screenshot of a CyberChef recipe which first extracts all the URLs from a text file and then defangs them](/media/uploads/CTF9_cyberchef.png)
{{< /question >}}

## التحقيق المجرد"Passive" من عناوين URL وأسماء المضيفين وعناوين IP

### السؤال 6: متى تم إرسال عنوان URL الذي تم تفكيكه في السؤال 4 إلى VirusTotal؟

{{< question title="الإرشادات" >}}
 فكر في الأمر كمفتش رقمي. يمكنك تحميل ملف أو توفير عنوان URL، ويقوم [VirusTotal](https://www.virustotal.com/) بفحصه باستخدام محركات مكافحة الفيروسات وأدوات فحص المواقع الإلكترونية من عشرات الشركات الأمنية المختلفة. كما يقوم أيضاً بإجراء بعض التحليلات الإضافية. يمنحك هذا نظرة عامة سريعة حول ما إذا كان الملف أو الموقع الإلكتروني من المحتمل أن يكون خبيثاً. إنها أداة قيّمة لمساعدتك في تحديد التهديدات المحتملة قبل فتح مرفق أو النقر على رابط. كما أنه يحتوي على بيانات وصفية حول الملفات التي قد تكون مفيدة. سنستخدم هنا سجل الإدخال لمعرفة متى تم رصد مؤشر ضار لأول مرة.


{{< question title="التعليمات" open="true" >}}
قم بلصق عنوان URL من السؤال 4 في VirusTotal (هذه المرة، تحتاج إلى لصق عنوان URL الكامل، وليس النسخة المنقوصة). انتقل إلى علامة التبويب "التفاصيل" وألقِ نظرة على سجل التقاط عناوين URL.
{{< /question >}}
![A screenshot of VirusTotal history, showing three dates: first submission, last submission, last analysis](/media/uploads/CFT9_VirusTotal.png)
{{< /question >}}

{{< question title="الإجابة" >}}
 الإجابة :  08/20/2018
{{< /question >}}

### السؤال 7: ما الذي يقدمه موقع VirusTotal كعنوان IP الخاص بعنوان URL الذي تم تفكيكه في السؤال 4؟

{{< question title="الإرشادات" >}}

ابحث أيضًا في علامة التبويب "details" في VirusTotal، وابحث عن عنوان IP الذي يقدم الخدمة

![A screenshot of VirusTotal showing an HTTP response, with the final URL and serving IP address given](/media/uploads/CTF10_VirusTotalIP.png)
{{< /question >}}

{{< question title="الإجابة" >}}
الإجابة: 52.89.102.146
{{< /question >}}

### السؤال 8: كم عدد المزودين على موقع VirusTotal الذين اكتشفوا أن عنوان URL هذا خبيث؟ 

{{< question title="التعليمات" open="true" >}}
عند عرض عنوان URL في VirusTotal، ابحث عن جميع التفاصيل تحت علامة التبويب "detection". للتعمق في ما يعنيه VirusTotal بالكشف وما هي منهجياته، راجع [وثائقه](https://docs.virustotal.com/).
{{< /question >}}

{{< question title="الإجابة" >}}
5 Vendors: الإجابة
{{< /question >}}

### السؤال 9: في أي مسجّل تم تسجيل النطاق الذي تم تغييره في السؤال 4؟

{{< question title="التعليمات" open="true" >}}
من أجل البحث عن المعلومات المتعلقة بتسجيل النطاق، يمكننا استخدام البحث عن whois. يمكنك إجراء مثل هذا البحث إما من خلال أداة سطر الأوامر على جهازك أو من خلال تطبيق مخصص.
{{< /question >}}

{{< question title="الإرشادات" >}}
هنا نستخدم موقع whois لاستخراجها. 

![A screenshot of a WHOIS lookup of the d.pr domain](/media/uploads/CTF11_whois.png "image_tooltip")
{{< /question >}}

{{< question title="الإجابة" >}}
Internet Technology Solutions: الإجابة
{{< /question >}}

### السؤال 10: أين يقع عنوان IP المستهدف الذي حددته من خلال VirusTotal جغرافياً؟

{{< question title="التعليمات" open="true" >}}
ترتبط عناوين IP بشكل عام بالمواقع الجغرافية، مثل المدن أو المقاطعات. هناك العديد من الخدمات عبر الإنترنت حيث يمكنك إدخال عنوان IP ومعرفة المزيد عن المكان الذي يُرجّح أن يكون موقعه. على الرغم من أن هذا النوع من الفحص ليس مثاليًا ويمكن أن يخطئ في بعض الأحيان، إلا أنه يمكن أن يكون جزءًا مهمًا من تحقيقات البنية التحتية الخبيثة.
من المفيد مقارنة المعلومات التي تتلقاها من البحث عن هوز مع تلك التي تتلقاها من عمليات البحث عن موقع بروتوكول الإنترنت. قد تعلم أن عنوان بروتوكول الإنترنت الذي تحاول التحري عنه ينتمي إلى مزود شبكة افتراضية خاصة أو شركة تقنية كبيرة مثل جوجل - إذا كان هذا هو الحال، فلن تتعلم الكثير من تلك التحقيقات؛ من المحتمل أن يتوافق موقع بروتوكول الإنترنت مع إحدى مزارع خوادم تلك الشركات وقد لا يكون له علاقة كبيرة بموقع الشخص أو الكيان الذي تحاول التحري عنه.


![A screenshot of a geoIP lookup of an IP address, showing that it originated in Portland, Oregon](/media/uploads/CTF12_geoIP.png "image_tooltip")
{{< /question >}}

{{< question title="الإجابة" >}}
Portland, Oregon, United State: الإجابة
{{< /question >}}

## التحقيق المجرد"Passive" في رؤوس البريد الإلكتروني

### السؤال 11: ما هو مسار إرجاع البريد الإلكتروني الأساسي الذي بحثت عنه؟ 

{{< question title="التعليمات" open="true" >}}
بالنسبة للأسئلة المقبلة، سنستخدم أداة تسمى[MxToolbox](https://mxtoolbox.com/). إنها أداة يمكنها تحليل رؤوس البريد الإلكتروني وأسماء المضيفين وحالة البريد التطفلي "spam" وغير ذلك. سنركز على خاصية محلل الرؤوس[header analyzer](https://mxtoolbox.com/EmailHeaders.aspx)، حيث يمكنك نسخ ولصق جميع رؤوس البريد الإلكتروني (أو حتى البريد الإلكتروني بأكمله!) وإجراء بعض التحليلات الأساسية عليها.
{{< /question >}}

{{< question title="الإرشادات" >}}
First, open the email using a plain text editor of your choice and copy its content. Then, paste them into the MxToolbox’s “Analyze Headers” tool

![A screenshot of email headers being pasted into MX Toolbox Analyser](/media/uploads/CTF8_MX_analyzer.png)

Once you press “Analyze Header”, you can see the return path

![A screenshot of MX Toolbox giving a complex Return-Path based on the headers it analyzed](/media/uploads/CTF13_return_path.png)
{{< /question >}}

{{< question title="Answer" >}}
paparazi@rjttznyzjjzydnillquh.designclub.uk.com
{{< /question >}}

### السؤال 12: ما هي القفزة الأولى First hop وعنوان خادم SMTP لهذا البريد الإلكتروني؟

{{< question title="التعليمات" open="true" >}}
انتقل إلى الملف "mx-toolbox-oolbox-header-ananalysis"، وانظر إلى قسم معلومات الترحيل.

![Another screenshot of the MX Toolbox analytics, with an initial relay highlighted](/media/uploads/CTF14_relay.png)
عنوان خادم البريد الإلكتروني

![Another screenshot of the MX Toolbox analytics, with the relay address highlighted](/media/uploads/CTF15_address.png)
{{< /question >}}

{{< question title="الإجابة" >}}
First hop: efianalytics.com 216.244.76.116

SMTP: `2002:a59:ce05:0:b0:2d3:3de5:67a9`
{{< /question >}}

## التحقيق النشط "Active"  في صفحات الويب الخبيثة

### السؤال 13: ما هو معرّف الضحية الموجود في كود الموقع الإلكتروني؟

{{< question title="التعليمات" open="true" >}}
إذا قام مستلم البريد الإلكتروني بالنقر على الرابط، فسيصل إلى صفحة مقصودة. انتقل إلى الملف الموجود في حزمة النشاط لفتح "paypal.html"، وابحث في الشيفرة المصدرية وابحث عن معرّف الضحية. استخدم CyberChef لفك تشفيرها للعثور على سلسلة نصية.
{{< /question >}}

{{< question title="الإرشادات" >}}
في هذا التمرين، ستواجه في هذا التمرين سلسلة نصية مشفرة في Base64. Base64 هي تقنية لتحويل النص لها العديد من الأغراض، لكنها في هذه الحالة تهدف إلى تشويش "obfuscation" سلسلة نصية: السلسلة لا تزال موجودة، لكنها محفوظة بطريقة لا يمكن رصدها بسهولة بالعين البشرية أو بالبحث البسيط عن النص. إذا كانت هذه هي المرة الأولى التي تصادف فيها Base64 في عملك، فمن المفيد أن تقرأ المزيد عنها وعن غيرها من صيغ التشويش[a little more about it and other obfuscation formats](https://anithaana3.medium.com/common-text-encoding-methods-for-code-obfuscation-9399757eb5c3) . يحب مؤلفو البرمجيات الخبيثة تشويش بعض السلاسل النصية داخل برامجهم باستخدام تقنية مثل Base64 من أجل جعل تحليلها أكثر صعوبة.
يستطيع CyberChef تشفير وفك تشفير نص Base64.

نفتح مرة أخرى الكود المرفق لصفحة التصيد الاحتيالي (.html)

![A screenshot of an html file being right clicked in Windows Explorer, and then opened in Notepad](/media/uploads/CTF16_open_webpage_notepad.png)

نبحث عن معرّف الضحية victimID في الكود المصدري source code
![A screenshot of someone searching through the plain text file opened in Notepad and finding a data item called "victimID"](/media/uploads/CTF17_searchID.png)

ثم يمكننا لصق القيمة التي اكتشفناها في CyberChef. تحتوي الأداة على خاصية العصا السحرية "magic wand" التي تكتشف التشفير وتحوّله تلقائيًا - يمكننا استخدام ذلك!

![A screenshot of CyberChef decoding Base64 input into plain text](/media/uploads/CTF18_cyberchef_result.png)

حسناً! اكتشفت العصا السحرية أن المدخلات مشفرة باستخدام Base64 وفكت تشفيرها تلقائيًا، مما أعطانا الإجابة!

![A screenshot of CyberChef's magic wand feature](/media/uploads/CTF19_cyberchef_wand.png)
{{< /question >}}

{{< question title="الإجابة" >}}
Th1s_1s_pH1sh1ng_Em3il
{{< /question >}}

## Other resources and links

{{% resource title="Access Now helpline community documentation for responding to suspicious/phishing emails" languages="English" cost="Free" description="Client Receives a Suspicious/Phishing Email" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.html#" %}}

{{% resource title="List of all DNS record types" languages="English, Chinese, Japanese, Korean, Russian, Serbian, Ukrainian, Esperanto, Hungarian, Vietnamese, Italian, Spanish, French" cost="Free" description="Includes (almost?) all DNS record types." url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="Amnesty reports on phishing campaigns" languages="Multiple, depending on the report" cost="Free" description="A list of examples of how a targeted phishing campaign against human right defenders, activists and journalists looks" url="https://www.amnesty.org/en/search/phishing/" %}}
