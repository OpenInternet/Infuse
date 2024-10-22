---
style: module
title: Response - Infrastructure takedown
description:ظنظرنا في الموضوعات الفرعية السابقة في كيفية كشف البنية التحتية التي تقدم المحتوى الضار سواء كان ذلك محتوى غير مرغوب فيه أو برمجيات ضارة أو تصيد احتيالي. بمجرد الانتهاء من ذلك بنجاح، يحين وقت  تحذير الآخرين منها وفي هذا الموضوع الفرعي نغطي الإبلاغ عن الإساءة وآليات التصفح الآمن الأخرى وآليات الثقب. يشمل ذلك الاتصال بمزود البنية التحتية للإبلاغ عن البنية التحتية الضارة بحيث يمكن إزالتها.
weight: 9
---

## حالة استخدام

نظرنا في الموضوعات الفرعية السابقة في كيفية كشف البنية التحتية التي تقدم المحتوى الضار سواء كان ذلك محتوى غير مرغوب فيه أو برمجيات ضارة أو تصيد احتيالي. بمجرد الانتهاء من ذلك بنجاح، يحين وقت تحذير الآخرين منها وفي هذا الموضوع الفرعي نغطي الإبلاغ عن الإساءة وآليات التصفح الآمن الأخرى وآليات الثقب. يشمل ذلك الاتصال بمزود البنية التحتية للإبلاغ عن البنية التحتية الضارة بحيث يمكن إزالتها.
قم بإقران هذا الجهد بأنشطة أوسع للاستجابة للحوادث بما في ذلك مشاركة التهديدات والتواصل مع المجتمعات التي ربما تكون قد استهدفت أيضًا بالهجمات الناشئة عن البنية التحتية ذاتها.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم أساسي لكيفية عمل الإبلاغ عن الإساءة وقواعد البيانات.
تحديد قواعد بيانات إساءة الاستخدام التي تدرج عناوين مواقع ويب والنطاقات المشتبه بأنها ضارة.
طلب البيانات من قواعد البيانات هذه والكتابة فيها.
تحديد واستخدام آليات الإبلاغ عن إساءة الاستخدام لدى موفري البنية التحتية الأكبر.






In the previous sub-topics, we looked at how you can identify infrastructure that serves malicious content, be it spam, malware, or phishing. Once you have successfully done so, it’s time to warn others about it. In this subtopic, we cover **abuse-reporting and other safe browsing and sinkhole mechanisms**. This includes contacting the infrastructure provider to report malicious infrastructure so that it can be taken down.

Pair this effort with broader incident response activities including threat sharing and reaching out to communities which may have also been targeted by the attacks originating from the same infrastructure.



---
## العرض

### الإبلاغ عن الإساءة في مقدمي خدمات الاستضافةs
 
تعمل العديد من نُسخ البنية التحتية الضارة على مزودي خدمات تجارية رئيسية تُعنى بالحفاظ على سلامة نظامهم واستقراره وسمعته ومواجهة التهديدات السيبرانية. يقدم موفرو الخدمات المسؤولون آليات فعالة للإبلاغ عن الإساءة وقد يؤدي استخدام هذه الآليات إلى الإزالة البنية التحتية النشطة على الفور. 

تعلّم كيفية تحديد واستخدام آليات الإبلاغ عن سوء المعاملة هذه حيث تتوفر جهات اتصال إساءة بشأن المعاملة من خلال آليات عديدة:

- ستوفر سجلات النطاق على هو إز بريدًا إلكترونيًا لجهة اتصال معنية بإساءة الاستخدام ورقم هاتف.
- ابحث عن جهة اتصال إساءة الاستخدام ذات الصلة بعنوان بروتوكول إنترنت معين في رايب ستات [RIPEstat](https://stat.ripe.net/app/launchpad).
- تتوفر أداة مساعدة برمجية على صفحة البدءبالعمل لقاعدة بيانات إساءة استخدام من أبيوزكس (Abusix Abuse Contacts Database)[Getting Started](https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee) والتي تشرح كيفية استخدام أداة بايثون (Python) أو بحث مضيف بسيط للحصول على جهات الاتصال المعنية بإساءة الاستخدام.
- استخدم البحث على الويب للحصول على تفاصيل الإبلاغ عن إساءة الاستخدام لأنواع أخرى من مقدمي الخدمات التي قد لا تكون متاحة من خلال الطرق المذكورة أعلاه، مثل إساءة الاستخدام على منصات مثل تويليو [Twilio](https://www.twilio.com/help/abuse وميل تشيمب [Mailchimp](https://mailchimp.com/contact/abuse/).

تذكر أنه قد يكون هناك العديد من مقدمي الخدمات المعنيين، على سبيل المثال يمكن الإبلاغ عن صفحة تهدف إلى التصيد الاحتيالي إلى كل من مزود استضافة الويب ومسجل النطاق.

تعرف على كيفية كتابة تقرير إساءة باستخدام المعلومات التقنية التي جمعتها، علمًا أن تقريرك يجب أن يتضمن تفاصيل كافية حتى يتمكن مزود الخدمة من تحديد الحساب المعين على منصته الذي يقدم محتوى ضارًا، ويمكن أن يشمل ذلك:

- عناوين مواقع ويب للمحتوى
- عناوين بروتوكول الإنترنت للمحتوى المستضاف
- أي معرّف آخر ذي صلة بالخدمة
- أي أرشيفات/لقطات مأخوذة من المحتوى
- لقطات الشاشة
- رؤوس البريد الإلكتروني إذا كانت ذات صلة
- مسح أمني إيجابي أو مؤشرات للتهديدات
- كيفية إساءة استخدام الخدمة/المورد
- 
أثناء تقديم لقطات الشاشة أو المرفقات، تأكد من عدم كشفك عن المعلومات الحساسة خاصتك أو الخاصة بعملائك المستهدفين بالمحتوى الضار.

في حين أنه من غير المحتمل أن يقدم مقدمو الخدمة معلومات إضافية عن حساب المستخدم الذي ينشر محتوى مسيئًا، يمكنك محاولة طلب هذه المعلومات في حال كانت مفيدة لتحقيقاتك.

في بعض الحالات، تبذل شركات خدمات الإنترنت والتكنولوجيا جهدًا خاصًا للتنسيق مع المجتمع المدني بشأن الهجمات المستهدفة وقد تقدم دعمًا إضافيًا. قد يكون من المفيد العمل مع أحد أعضاء منظمة سيفي سيرت[CiviCERT member](https://www.civicert.org) للبحث عن جهة اتصال للشركة لأغراض التحقيقات والاستجابة السريعة.

لاحظ أنه في كثير من الحالات تُستضاف البنية التحتية الضارة على حسابات أو خوادم مخترقة لأطراف ليس لها علاقة بالهجوم (على سبيل المثال، حساب غوغل مخترق أو موقع ويب مخترق أو جهاز مصاب مُنسق ضمن شبكات روبوتات). 
إذا كنت تسعى إلى الإلهام حول كيفية كتابة رسالة بريد إلكتروني إلى موفر البنية التحتية، راجع القوالب التالية التي أنشأها خط مساعدة آكسس ناو (Access Now):

- قالب بريد إلكترونيإلى مسجل نطاق ضار [to a registrar of a malicious domain](https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html)
- نموذج بريد إلكتروني إلى موفر خدمة استضافة [to a hosting provider](https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html
- نموذج بريد إلكتروني إلى عميل، يطلب الإذن منه لمشاركة مؤشرات الاختراق مع المجتمع [to a client](https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html)


### التصفح الآمن وآلية الثقب وقوائم الحظر

بالإضافة إلى التواصل مع جهات الاتصال المعنية بإساءة الاستخدام لإزالة المحتوى، توجد آليات مختلفة لإضافة البنية التحتية الضارة أو المؤشرات الضارة الأخرى إلى قوائم الحظر وقواعد البيانات المدمجة في الأدوات والخدمات المستخدمة على نطاق واسع.

ينطبق المبدأ نفسه على وسائل التواصل الاجتماعي ومنصات المراسلة ويعتمد على إجراءات إساءة الاستخدام أو الإبلاغ عن المحتوى على تلك المنصات (أو خدمات السلامة التكميلية).
تعرف على بعض قوائم الحظر هذه والأماكن المدرجة فيها وكيفية الإبلاغ عنها مثل:

- غوغل سيف براوزنع [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_general/)
- فيش تانك [PhishTank](https://phishtank.org/)
- أبيوس آي ب دي بي [Abuse IP DB](https://www.abuseipdb.com/)
- قاعدة بيانات التصيد الاحتيالي[Phishing Database](https://github.com/mitchellkrogza/Phishing.Database#additions) (إرسال إضافات من خلال غيت هب)
- تُقدم قواعد بيانات تقارير وتهديدات أكثر تحديدًا بواسطة أبيوس دوت سي إتش [abuse.ch](https://abuse.ch) وتتطلب المصادقة من أجل الإرسال مثل يو آر إل هاوس [URLhaus](https://urlhaus.abuse.ch/) وثريت فوكس [ThreatFox](https://threatfox.abuse.ch/) وإس إس إل بلاك ليست[SSL Blacklist](https://sslbl.abuse.ch/).
- لإبلاغ عن التصيد الاحتيالي على ديسكورد (Discord) إلى فيش دوت جي جي [phish.gg ](https://docs.phish.gg/) (أو إضافة خادم إلى خدمتهم).

## Practice

- Find the abuse contacts for 3 web hosting companies, including at least one major platform (use as AWS, GCP, Azure, Oracle Cloud, and Alibaba Cloud). Look for any additional information they offer on their abuse reporting process.
- Investigate how abuse databases and Google Safe Browsing work. Lists several tools and services that they are integrated with.
- Build your own incident-response flowchart and checklist containing relevant links and actions to take in case of an incident of malicious online infrastructure.


[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة
اعثر على جهات اتصال إساءة الاستخدام لثلاث شركات استضافة مواقع، بما في ذلك منصة رئيسية واحدة على الأقل (مثل إيه دبليو إس (AWS) وجي سي ب (GCP) وأزور (Azure) وأوراكل كلاود (Oracle Cloud) وعلي بابا كلاود (Alibaba Cloud)، وابحث عن أي معلومات إضافية يقدمونها حول عملية الإبلاغ عن الإساءة.
تحقق من كيفية عمل قواعد بيانات إساءة الاستخدام والتصفح الآمن من غوغل واطلّع على عدد من الأدوات والخدمات المدمجة معها.
جهّز مخطط سير عمل للاستجابة للحوادث وقائمة مرجعية تحتوي على الروابط والإجراءات ذات الصلة التي يجب اتخاذها في حالة وقوع حادث بنية تحتية ضارة على الإنترنت.
اختبار مهارة

تعاون مع مُرشِد أو نظير لديه بعض الخبرة في إزالة البنية التحتية الضارة لأداء المهام التالية:
حضّر جميع الأدلة (عناوين بروتوكول الإنترنت وشفرات التجزئة والنطاقات وأي أدلة أخرى) ستحتاجها لتقديم تقرير إساءة الاستخدام. إذا كان لديك مثال على بنية تحتية ضارة في متناول اليد اجمع هذه الأدلة عنها وإذا لم تكن لديك فقم بجمع الأدلة من صفحة ويب سليمة (ولكن دون تقديم تقرير إساءة استخدام بالطبع). ناقش الأدلة مع نظيرك أو مرشدك الذي سيتحقق من أنك جمعت الأدلة الصحيحة ووثقتها بشكل صحيح.
اشرح كيفية عمل التصفح الآمن وقاعدة بيانات إساءة الاستخدام ومقدمي قوائم الحظر. إذا كان لديك مثال على بنية تحتية ضارة في متناول اليد، أرسله إلى قاعدة بيانات أو موفر الخدمة. إذا لم يكن لديك مثال، انتقل إلى صفحة الويب الخاصة بمزود الخدمة وجرب عملية الإرسال مع نظير أو مُرشِد (اشرح المعلومات التي ستقوم بتحضيرها ولكن دون إرسالها).
اطلب من مرشدك أو نظيرك إدراج ثلاثة من مقدمي خدمات استضافة الويب أو مقدمي الخدمات السحابية أو المسجلين أو غيرهم من مقدمي الخدمات، وبالنسبة لكل واحد من هؤلاء ابحث عن آلية الاتصال أو الإبلاغ عن الإساءة ذات الصلة.
تحدث إلى مُرشِد أو النظير حول المخاطر الاستراتيجية والشخصية لبدء الإزالة والإفصاح المحتمل عن بيانات العميل واحتمال إعلام المهاجم بأن هجومه يخضع لفحص تحليلي. جرّب تمرين تمثيل الأدوار حيث تقوم بالإبلاغ عن هذه الاعتبارات إلى هدف الهجوم.

العنوان | الوصف | اللغة | التكلفة | رابط عنوان موقع الويب
سير عمل مكتب المساعدة: يتلقى العميل بريدًا إلكترونيًا مشبوهًا/تصيد احتيالي | وثائق المجتمع لخط مساعدة وثائق آكسس ناو للاستجابة إلى رسائل البريد الإلكتروني المشبوهة/الاحتيالية | الإنجليزية | مجانًا | يتلقى العميل بريدًا إلكترونيًا مشبوهًا/تصيدًا احتياليًا | وثائق عامة خط مساعدة الأمن الرقمي من آكسس ناو (accessnowhelpline.gitlab.io)
قائمة بجميع أنواع سجلات نظام أسماء النطاقات | يتضمن (تقريبًا؟) جميع أنواع سجلات نظام أسماء النطاقات. | الإنجليزية والصينية واليابانية والكورية والروسية والصربية والأوكرانية والإسبرانتو والهنغارية والفيتنامية والإيطالية والإسبانية والفرنسية | مجانًا | https://en.wikipedia.org/wiki/List_of_DNS_record_types
تقارير منظمة العفو الدولية عن حملات التصيد الاحتيالي | قائمة بأمثلة على حملات التصيد الاحتيالي المستهدفة ضد المدافعين عن حقوق الإنسان والناشطين والصحفيين | متعددة، حسب التقرير | مجانًا | https://www.amnesty.org/en/search/phishing/

## Skill Check

Work with a mentor or peer who has some experience in taking down malicious infrastructure. Do the following tasks with them:

- Prepare all of the evidence (IP addresses, hashes, domains, and any other evidence) you would need to submit an abuse report. If you have an example of malicious infrastructure at hand, collect that evidence for this infrastructure. If you do not, collect the evidence from a legitimate web page (but without submitting an abuse report, of course). Discuss the evidence with your peer or mentor who will verify that you collected the right evidence and have correctly documented it.
- Explain how safe browsing, abuse database, and blocklist providers work. If you have an example of malicious infrastructure on hand, submit it to such a database or provider. If you do not, go to the provider’s web page and do a dry run of the submission process with your peer or mentor (explain what information you would prepare, without submitting it).
- Ask your mentor or peer to list three web hosting providers, cloud providers, registrars, or other service providers. For each of those, find the relevant abuse contact or reporting mechanism.
- Talk to your mentor or peer about the strategic and personal risks of initiating takedown, potentially disclosing client’s data, and potentially indicating to an attacker that their attack is being critically examined. Do a draft role-play in which you communicate these considerations to the target of the attack.

## موارد التعلّم

{{% resource title="(RIPEstat)  منصة إطلاق رايب ستات" description="خدمة تسمح لك بالبحث عن آليات الإبلاغ عن الإساءة ذات الصلة وإدراجها" languages="الإنجليزية والإسبانية والعربية والروسية والفرنسية والفارسية والإيطالية والتركية" cost="مجانًا" url="https://stat.ripe.net/app/launchpad" %}}

{{% resource title="(Abusix)  الشروع في العمل - أبيوزكس" description="دليل الشروع في العمل لقاعدة بيانات جهة اتصال إساءة الاستخدام" languages="الإنجليزية" cost="مجانًا" url="https://docs.abusix.com/abuse-contact-db/5BScLdS3SxHV1giQYpXpKm/getting-started/rGzH6UQZpzjXBhqtjNqRee" %}}

{{% resource title="(Twilio)  تقارير إساءة الاستخدام على تويليو" description="يمكنك الإبلاغ عن المكالمات الهاتفية غير المرغوب فيها أو الرسائل النصية القصيرة من أرقام الهواتف المستضافة على تويليو هنا" languages="الإنجليزية" cost="مجانًا" url="https://www.twilio.com/en-us/help/abuse" %}}

{{% resource title="(Mailchimp)  تقارير إساءة الاستخدام على ميل تشيمب" description="يمكنك الإبلاغ عن أي إساءة تحدث على منصة ميل تشيمب هنا" languages="الإنجليزية" cost="مجانًا" url="https://mailchimp.com/contact/abuse/" %}}

{{% resource title="(CiviCERT)  سيفي سيرت" description="شبكة من المتخصصين في مجال الأمن الذين يساعدون المجتمع المدني في معالجة قضايا الأمن السيبراني" languages="الإنجليزية" cost="مجانًا" url="https://www.civicert.org/" %}}

{{% resource title="قوالب رسائل البريد الإلكتروني التي يمكننا إرسالها للإبلاغ عن النشاط الضار" description="ثلاثة قوالب بريد إلكتروني تسمح لك بصياغة بريد إلكتروني بسهولة إلى مسجل النطاق أو مزود الاستضافة أو العميل لإبلاغهم بوجود بنية تحتية ضارة" languages="الإنجليزية" cost="مجانًا" url="https://accessnowhelpline.gitlab.io/community-documentation/259-Disable_Malicious_Server_registrar.html" %}}

{{% resource title="قوالب رسائل البريد الإلكتروني التي يمكننا إرسالها للإبلاغ عن النشاط الضار" description="ثلاثة قوالب بريد إلكتروني تسمح لك بصياغة بريد إلكتروني بسهولة إلى مسجل النطاق أو مزود الاستضافة أو العميل لإبلاغهم بوجود بنية تحتية ضارة" languages="الإنجليزية" cost="مجانًا" url="https://accessnowhelpline.gitlab.io/community-documentation/260-Disable_Malicious_Server_hosting_provider.html" %}}

{{% resource title="قوالب رسائل البريد الإلكتروني التي يمكننا إرسالها للإبلاغ عن النشاط الضار" description="ثلاثة قوالب بريد إلكتروني تسمح لك بصياغة بريد إلكتروني بسهولة إلى مسجل النطاق أو مزود الاستضافة أو العميل لإبلاغهم بوجود بنية تحتية ضارة" languages="الإنجليزية" cost="مجانًا" url="https://accessnowhelpline.gitlab.io/community-documentation/261-Disable_Malicious_Server_client.html" %}}

{{% resource title="(SafeBrowsing) إرسال تقرير التصفح الآمن" description="يمكنك هنا إرسال تقارير التصفح الآمن إلى قاعدة بيانات تخص غوغل والتي تضم عددًا كبيرًا من المستخدمين" languages="الإنجليزية" cost="مجانًا" url="https://safebrowsing.google.com/safebrowsing/report_general/" %}}

{{% resource title="(PhishTank)  فيش تانك" description="قائمة تعاونية لعمليات إرسال موقع التصيد الاحتيالي تسمح للمستخدمين بالبحث عن عناوين مواقع الويب وإرسالها" languages="الإنجليزية" cost="مجانًا" url="https://phishtank.org/" %}}

{{% resource title="(AbusiveIP)  أبيوسف آي ب" description="تسمح للمستخدمين بالبحث عن عناوين بروتوكول الإنترنت المرتبطة بالسلوك الضار والإبلاغ عنها" languages="الإنجليزية" cost="مجانًا" url="https://www.abuseipdb.com/" %}}

{{% resource title="قاعدة بيانات التصيد الاحتيالي" description="قاعدة بيانات أخرى من مصادر جماعية لنطاقات وروابط التصيد الاحتيالي المشتبه بها" languages="الإنجليزية" cost="مجانًا" url="https://github.com/mitchellkrogza/Phishing.Database#additions" %}}

{{% resource title="(Abuse ch)  أبيوس سي إتش" description="الوصف : منصة مجتمعية تركز على المعلومات المتعلقة بالتهديدات فيما يتعلق بالبرمجيات الضارة وشبكات الروبوتات" languages="الإنجليزية" cost="مجانًا" url="https://abuse.ch/" %}}

{{% resource title="(Phish.gg)  وثائق فيش دوت جي جي" description="خدمة يمكنك من خلالها الإبلاغ عن التصيد الاحتيالي على خدمات مثل ديسكورد" languages="الإنجليزية" cost="مجانًا" url="https://docs.phish.gg/docs/get-started/welcome/" %}}

{{% resource title="سير عمل مكتب المساعدة: يتلقى العميل بريدًا إلكترونيًا مشبوهًا/تصيد احتيالي" description="وثائق المجتمع لخط مساعدة وثائق آكسس ناو للاستجابة إلى رسائل البريد الإلكتروني المشبوهة/الاحتيالية" languages="الإنجليزية" cost="مجانًا" url="https://accessnowhelpline.gitlab.io/" %}}

{{% resource title="قائمة بجميع أنواع سجلات نظام أسماء النطاقات" description="يتضمن (تقريبًا؟) جميع أنواع سجلات نظام أسماء النطاقات" languages="الإنجليزية والصينية واليابانية والكورية والروسية والصربية والأوكرانية والإسبرانتو والهنغارية والفيتنامية والإيطالية والإسبانية والفرنسية" cost="مجانًا" url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="تقارير منظمة العفو الدولية عن حملات التصيد الاحتيالي" description="قائمة بأمثلة على حملات التصيد الاحتيالي المستهدفة ضد المدافعين عن حقوق الإنسان والناشطين والصحفيين" languages="متعددة، حسب التقرير" cost="مجانًا" url="https://www.amnesty.org/en/search/phishing/" %}}



