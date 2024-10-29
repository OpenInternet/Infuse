+++
style = "module"
weight = 6
title = "Interpersonal Skills for Web Application Security"
description = "When working on web application security (or any security!), it's important to check the nature of the digital protector relationship, provide useful advice, not fear-monger, and give solid risk assessments"
+++

## Use Case

When interacting with individuals and organizations who operate web applications, self-awareness is necessary to check the nature of the digital protector relationship, provide useful and not fear-mongering advice or services. It is critical to frame your technical work within a sound risk assessment of the reality of the web application and its users.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Self reflect on the digital protector relationship with a client within web application assessment work and reporting
- Simplify and filter findings and explain them in a way which makes sense to the needs and threat models of the organization and its stakeholders
- Maintain an awareness of the limits of your own knowledge and ability
- Communicate in a non fear-mongering way about vulnerabilities and weaknesses
- Conduct a broader risk analysis of a web application based on the political, social, economic, and technical realities which surround it.

---
## Main Section
Your work in web application security assessment must remain contextualized within the frame of the organization which operates or hosts the application, the people who utilize it (and of their devices), the interpersonal relationships you have with these people, the nature of the web application itself, the data stored or processed on it, the legal realities which prevail over the application, and a solid risk assessment of all these elements. Let’s unpack these elements and consider a self-critique of your role as a digital protector.

### The Role of digital protector in web application security assessment

Web application security assessment – and especially many of the elements of this and and subsequent linked learning paths which go beyond basic vulnerability scanning, version enumeration, and misconfiguration checks - is a highly technical and rarified skill set with a terminology which is inaccessible and difficult to understand both by lay users and even tech-savvy website administrators. Take a moment to reflect on your own knowledge level and your personal feelings about conducting this assessment and what you hope to communicate with your client. One of the golden rules of working as an effective digital protector: _the goal is not to impress others and make yourself appear superior - it is to provide effective assistance which reduces harm and risk while supporting the advocacy goals of your client_.

As such, it is important to filter and explain your findings within the context of a risk analysis of the web application itself. While finding many vulnerabilities and weaknesses may make you feel good as an analyst, sharing all of those with the client may create a lot of noise and potential stress for your client. Achieving the right balance can be more difficult than it first appears to achieve - not all security findings are equal to each other. It takes an understanding of the nature of the vulnerability, the attack chain which renders it meaningful, and the potential for harm which an exploitation of the vulnerability could have.

As an example, when using an automated security assessment tool such as ZAP (mentioned in more detail in the Website Assessment Learning Path), your scan of a website may reveal dozens or even hundreds of weaknesses and vulnerabilities. Providing this list to your client is less helpful unless you can explain how some of these findings _matter_ to their stakeholders and their operational and advocacy objectives. Do you understand the findings enough to be able to provide that filtering and explanation? It is also necessary to be cognizant of the limitations of our own understanding in the field. In case you can not properly assess whether a given vulnerability or weakness is important, you may leave a recommendation with your best interpretation and advice that they may need to look into it further.

### Risk Assessment with Web Applications

Organizations use web applications for various purposes. In some cases these will be straightforward information or brand dissemination purposes and have limited sensitive data involved. Even in these cases, leaked information about traffic and visitors and risks of implanting malicious content on the site can pose real harm to the visitors or the reputation of the organization.

In other cases confidential and mission-critical data may be processed by the application. As you proceed through these learning paths which focus heavily on technical skills, continually do a sense-check on the threat models which prevail over the application itself, the organization and people who operate it as well as those who utilize it, including consideration for the devices which they use to interact with it.

### Reporting and talking about vulnerabilities

Reporting vulnerabilities you’ve discovered can be difficult, especially if you’re new to it. We have created a brief overview of the reporting process in [Subtopic 5 of the Web Application Security Assessment learning path](/en/learning-path/5/module-5/) and encourage all learners who need to write up reports to clients to look through it.

## Skill Check

Log in to DVWA again and open one of its pages. Set it to either low or medium security. Imagine that this page belongs to a client of yours and you need to brief them on the vulnerabilities, their potential impact, and necessary mitigations. You can do this exercise either:

1. By yourself, by writing a draft of an email which you would send to the client. If possible, share that draft with a peer or mentor later on, who will verify that it’s an appropriate and measured response.
2. With a peer or mentor, by role-playing the conversation you would have with the client. Debrief after the conversation, asking the peer for feedback on what you did well and where you could improve.

الموضوع الفرعي 6: المهارات الشخصية لأمن تطبيقات الويب
حالة استخدام
عند التفاعل مع الأفراد والمنظمات الذين يقومون بتشغيل تطبيقات الويب يكون الوعي الذاتي ضروريًا للتحقق من طبيعة علاقة المدافع الرقمي وتقديم نصائح أو خدمات مفيدة وليست مثيرة للخوف، ومن الأهمية بمكان تأطير عملك الفني ضمن تقييم سليم للمخاطر لواقع تطبيق الويب ومستخدميه.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
التفكير الذاتي في علاقة المدافع الرقمي مع العميل ضمن أعمال تقييم تطبيقات الويب وإعداد التقارير
تبسيط النتائج وتصفيتها وشرحها بطريقة منطقية لاحتياجات المنظمة ونماذج التهديد الخاصة بها وأصحاب المصلحة فيها
الحفاظ على الوعي بحدود معرفتك وقدرتك
التواصل بطريقة لا تتسبب بالتخويف حول الثغرات والضعف
إجراء تحليل أوسع للمخاطر لتطبيق ويب بناءً على الحقائق السياسية والاجتماعية والاقتصادية والتقنية المحيطة به.
العرض 
يجب أن يظل عملك في تقييم أمان تطبيقات الويب في سياقه ضمن إطار المنظمة التي تدير التطبيق أو تستضيفه والأشخاص الذين يستخدمونه (وأجهزتهم)، والعلاقات الشخصية التي تربطك بهؤلاء الأشخاص، وطبيعة تطبيق الويب نفسه، والبيانات المخزنة أو المعالجة عليه، والحقائق القانونية التي تسود على التطبيق وتقييم قوي للمخاطر لجميع هذه العناصر. وسنحلل هذه العناصر ونفكر في النقد الذاتي لدورك بصفتك مدافعًا رقميًا.
دور المدافع الرقمي في تقييم أمان تطبيقات الويب
يُعد تقييم أمان تطبيقات الويب وخاصة العديد من عناصر هذا المسار ومسارات التعلّم ذات الصلة اللاحقة التي تتجاوز مسح الثغرات الأمنية الأساسية وتعداد الإصدارات وفحوصات التكوين الخاطئ مجموعة مهارات فنية ونادرة للغاية مع مصطلحات لا يمكن الوصول إليها ويصعب فهمها من قبل المستخدمين العاديين وحتى مسؤولي مواقع الويب البارعين في استخدام التكنولوجيا.  اقض لحظة للتفكير في مستوى معرفتك ومشاعرك الشخصية حول إجراء هذا التقييم وما تأمل أن تخبر عميلك به، وإحدى القواعد الذهبية للعمل بصفة مدافع رقمي ذو كفاءة: ليس الهدف إثارة إعجاب الآخرين وجعل نفسك تبدو متفوقًا بل تقديم مساعدة فعالة تقلل من الضرر والمخاطر وتدعم أهداف مناصرة عميلك.

على هذا النحو من المهم تصفية وشرح النتائج التي توصلت إليها في سياق تحليل مخاطر تطبيق الويب نفسه، وفي حين أن العثور على العديد من الثغرات ونقاط الضعف قد يجعلك تشعر بالرضا كمحلل فإن مشاركة كل ذلك مع العميل قد يُنشئ الكثير من الضوضاء والضغوط المحتملة لعميلك. قد يكون تحقيق التوازن الصحيح أكثر صعوبة مما يبدو في البداية فليست كل النتائج الأمنية متساوية مع بعضها البعض، ويتطلب الأمر فهمًا لطبيعة الضعف وسلسلة الهجوم التي تجعله ذا مغزى واحتمال حدوث ضرر يمكن أن يحدثه استغلال ثغرة. 

على سبيل المثال، عند استخدام أداة تقييم أمان آلية مثل زد أتاك بروكسي (ZAP) (مذكورة بمزيد من التفصيل في مسار تعلّم تقييم موقع الويب) وقد يكشف فحصك لموقع الويب عن العشرات أو حتى المئات من الثغرات ونقاط ضعف. يُعدّ تقديم هذه القائمة إلى عميلك أقل فائدة ما لم تتمكن من شرح سبب أهمية بعض هذه النتائج لأصحاب المصلحة وأهداف التشغيل والدعوة خاصتهم، فهل تفهم النتائج بما يكفي لتكون قادرًا على تقديم هذا التصفية والشرح؟ من الضروري أيضًا أن نُدرك قيود فهمنا الخاص في هذا المجال، وفي حالة عدم تمكنك بشكل صحيح من تقييم ما إذا كانت نقطة ضعف أو ثغرة معينة مهمة يمكنك ترك توصية مع أفضل تفسير ونصائح حول ما يجب مراعاته بتفصيل أكبر.

تقييم المخاطر باستخدام تطبيقات الويب

تُستخدم المنظمات تطبيقات الويب لأغراض مختلفة، وفي بعض الحالات سيكون ذلك لمعلومات مباشرة أو أغراض نشر العلامة التجارية ولها بيانات حساسة محدودة. حتى في هذه الحالات يمكن أن تُشكل المعلومات المسربة حول حركة المرور والزوار ومخاطر زرع محتوى ضار على الموقع ضررًا حقيقيًا للزوار أو سمعة المؤسسة.

في حالات أخرى قد تتم معالجة البيانات السرية والجوهرية للمهمة من خلال التطبيق، وأثناء استكمالك لمسارات التعلّم هذه التي تركز بشكل كبير على المهارات التقنية، تحقق باستمرار من نماذج التهديد التي تسود على التطبيق نفسه والمؤسسة والأشخاص الذين يشغلونه وأولئك الذين يستخدمونه بما في ذلك دراسة الأجهزة التي يستخدمونها للتفاعل معه.

الإبلاغ عن الثغرات والتحدث عنها

قد يكون الإبلاغ عن الثغرات الأمنية التي اكتشفتها أمرًا صعبًا خاصة إذا كنت جديدًا عليها، ولقد أنشأنا نظرة عامة موجزة على عملية إعداد التقارير في الموضوع الفرعي 5 من مسار تعلّم تقييم أمان تطبيقات الويب ونشجع جميع المتعلّمين الذين يحتاجون إلى كتابة تقارير للعملاء ليطلعوا عليها.
اختبار مهارة
سجّل الدخول إلى دي في دبليو إيه مرة أخرى وافتح إحدى صفحاته. اضبط خياراته لتكون بمستوى أمان منخفض أو متوسط، وتخيل أن هذه الصفحة تخص عميلك وتحتاج إلى اطلاعه على ثغرات وتأثيرها المحتمل والتخفيفات اللازمة، علمًا أنه يمكنك القيام بهذا التمرين إما:
بنفسك من خلال كتابة مسودة بريد إلكتروني سترسلها إلى العميل، وإذا كان ذلك ممكنًا شارك هذه المسودة مع زميل أو مرشد في وقت لاحق ليتحقق من أنها استجابة مناسبة ومدروسة.
مع نظير أو مرشد ومن خلال تمثيل أدوار في محادثة ستجريها مع العميل، واستخلص المعلومات بعد المحادثة واطلب من الأقران تقديم ملاحظات حول ما أحسنت القيام به وأين يمكنك تحسينه.

