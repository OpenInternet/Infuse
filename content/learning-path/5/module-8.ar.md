+++
style = "module"
weight = 8
title = "Next Steps"
description = "How to continue practicing and honing your web security assessment skills"
+++

## Use Case

At this point, you should be able to perform professional-quality security assessments of websites. However, you still have a lot to learn in terms of managing and refining the work of testing and also in terms of more obscure and advanced testing techniques. This subtopic covers some paths you can take to continue to practice and build your skills.

## Objectives

After completing this subtopic, practitioners should know how they can continue to practice and develop their web application security assessment skills.

---
## Main Section
There are a few complementary paths that you can use to develop and practice the skills you have gained in this learning path. These paths should not prevent you from doing the actual work of assessing the security of websites but can be used during idle time.

### Gaining Depth

As you may recall, this learning path used labs from the Portswigger Academy, but did not use all of the labs for the topics covered. If you want, you can go back and try your hand at the [“expert”-rated labs](https://portswigger.net/web-security/all-labs). Do note that these labs represent very rare situations and are often difficult for experienced web application security assessment experts.

### Gaining Breadth

This Learning Path covered the most important aspects of web application security, but there are many more areas.

The Portswigger Academy has [topics](https://portswigger.net/web-security/all-topics) and [labs](https://portswigger.net/web-security/all-labs) that were not included in this Learning Path. If you’re interested, feel free to peruse them. Note that if you signed up for an account on the Portswigger Academy, it tracks which labs you’ve done. This can help you easily find new labs and areas you’ve not done.

Also, the [OWASP testing guide](https://github.com/OWASP/wstg/tree/master/document) is a very thorough guide to web application security assessments and the vulnerabilities that one might find. If you have a few minutes, it’s often interesting to skim the contents for topics you don’t recognize and read up on them.

It’s also a great idea to regularly read vulnerability reports published by other researchers to understand both their methodologies and the weaknesses they found within websites and web applications. [This report](https://eaton-works.com/2024/01/17/ttibi-email-hack/) is a great start, since it points out both very basic errors made in web applications while also explaining in depth just how much damage could be caused by an adversary exploiting those vulnerabilities. Do keep in mind, however, that it focuses on a website which contains particularly egregious errors; most of the vulnerabilities you or other security researchers find will not be as basic.

### Gaining Practice & Experience

The most impactful thing you can do to improve your web application testing skills is to test web applications. There are two primary ways you can do this on your own. The first is to check out the intentionally vulnerable web applications in the [OWASP vulnerable web applications directory](https://owasp.org/www-project-vulnerable-web-applications-directory/). Juice Shop and DIWA are among these, and there are many more. If you struggled to find most of the vulnerabilities in DIWA, this is a good place to start. You can download and practice on these sites; [some of them are even hosted online](https://owasp.org/www-project-vulnerable-web-applications-directory/#div-online) so that you don’t need to go through the hassle of downloading something.

Once you’re confident that you find vulnerabilities in intentionally insecure sites, a good way to get practice is to participate in bug bounty programs. In bug bounties, site owners give people permission to test their websites and usually will compensate you if you report a new vulnerability to them. Frequently, these sites already have mature security programs, so vulnerabilities are few and far between. However, rather than trying to be realistic, these are real websites, so you’re building real-world experience. Note that some people are able to make a living through bug bounty programs, but the techniques they use are not the same as those used in comprehensive web application security assessments. If your goal is to practice and develop your skills, it’s best to perform comprehensive assessments of sites with bug bounties, and view any compensation you receive as a bonus.

The two largest bug bounty platforms are [HackerOne](https://www.hackerone.com/hackers) and [Bugcrowd](https://www.bugcrowd.com/hackers/faqs/). Both of these services allow site owners to connect with “hackers” who wish to test websites. Both have lists of participating site owners, generally the best practice is to pick a newer program that has modest payouts. This should help you find a site where you’re more likely to actually find vulnerabilities. Of course, when testing, be sure to comply with the rules of the bug bounty program.

## Skill Check

This skill check addresses the whole learning path more broadly. Understanding the OSI (Open Systems Interconnection) model is crucial for comprehending the layers of network communication and the vulnerabilities that can be exploited at each level. You can learn a little more about the model [here](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) and in [subtopic 5 of this learning path](#heading=h.ebcoi73gxfy1).

In a typical web application architecture, various OSI layers play distinct roles, from managing data transmission to securing communication channels. This set of multiple-choice questions explores the OSI layers involved in web application architecture, alongside potential vulnerabilities and corresponding attack vectors. Test your knowledge of network security and gain insight into the layers where threats commonly lurk. If possible, discuss your answers to those questions with a peer or mentor who will help verify that you’ve correctly understood the topic. \

1. At which OSI layer does the TCP protocol operate, which is commonly targeted by attackers for various types of network attacks?

A) Application Layer\
B) Transport Layer\
C) Network Layer\
D) Data Link Layer

2. Which vulnerability is commonly associated with the Transport Layer (Layer 4) of the OSI model, where attackers attempt to overwhelm network resources with a high volume of traffic?

A) Cross-Site Scripting (XSS)\
B) SQL Injection\
C) Denial of Service (DoS)\
D) Broken Authentication

3. At which OSI layer do HTTP and HTTPS protocols typically operate, making it a common target for attacks like Cross-Site Scripting (XSS) and SQL Injection?

A) Data Link Layer\
B) Transport Layer\
C) Application Layer\
D) Presentation Layer

4. Which vulnerability is often exploited at the Application Layer (Layer 7) of the OSI model, allowing attackers to inject malicious code into web applications and compromise users' data?

A) Denial of Service (DoS)\
B) Cross-Site Scripting (XSS)\
C) Man-in-the-Middle (MitM) Attack\
D) SYN Flood Attack

5. At which OSI layer do routers and switches operate, and where vulnerabilities like IP spoofing and ARP spoofing can occur?

A) Physical Layer\
B) Network Layer\
C) Transport Layer\
D) Session Layer

6. Which vulnerability involves attackers intercepting communication between two parties, allowing them to eavesdrop on sensitive information or modify data packets?

A) Cross-Site Scripting (XSS)\
B) Man-in-the-Middle (MitM) Attack\
C) SQL Injection\
D) Buffer Overflow

7. At which OSI layer do firewalls and intrusion detection systems (IDS) typically operate, aiming to filter and monitor network traffic for suspicious activities?

A) Application Layer\
B) Transport Layer\
C) Netwok Layer\
D) Data Link Layer 

8. Which vulnerability involves attackers exploiting weaknesses in the network layer to redirect traffic to malicious destinations or intercept sensitive information?

A) Cross-Site Scripting (XSS)\
B) ARP Spoofing\
C) SQL Injection\
D) Cross-Site Request Forgery (CSRF)

9. At which OSI layer do SSL/TLS encryption protocols operate, protecting data transmitted over the network from interception and tampering?

A) Presentation Layer\
B) Application Layer\
C) Transport Layer\
D) Network Layer

10. Which vulnerability involves attackers manipulating input fields within web forms or URLs to inject malicious SQL commands, potentially leading to unauthorized access to the underlying database?

A) Cross-Site Scripting (XSS)\
B) SQL Injection\
C) Denial of Service (DoS)\
D) Man-in-the-Middle (MitM) Attack

_Correct answers:_

_1. B) Transport Layer_\
_2. C) Denial of Service (DoS)_\
_3. C) Application Layer_\
_4. B) Cross-Site Scripting (XSS)_\
_5. B) Network Layer_\
_6. B) Man-in-the-Middle (MitM) Attack_\
_7. C) Network Layer_\
_8. B) ARP Spoofing_\
_9. C) Transport Layer_\
_10. B) SQL Injection_


الموضوع الفرعي 8: الخطوات التالية
حالة استخدام
يجب أن تكون في هذه المرحلة قادرًا على إجراء تقييمات أمنية عالية الجودة لمواقع الويب، لكن لا يزال لديك الكثير لتتعلمه من حيث إدارة وصقل عمل الاختبار وأيضًا من حيث تقنيات الاختبار الأكثر غموضًا وتطورًا. يُغطي هذا الموضوع الفرعي بعض المسارات التي يمكنك اتباعها لمواصلة التدريب وبناء مهاراتك.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يعرف الممارسون كيف يمكنهم الاستمرار في التمرن وتطوير مهارات تقييم أمن تطبيقات الويب الخاصة بهم.
العرض 
هناك بعض المسارات التكميلية التي يمكنك استخدامها لتطوير والتمرن على المهارات التي اكتسبتها في مسار التعلّم هذا، ويجب ألا تمنعك هذه المسارات من القيام بالعمل الفعلي لتقييم أمان مواقع الويب ولكن يمكن استخدامها أثناء وقت الخمول.
التعمّق
كما تتذكر استخدم مسار التعلّم هذا مخابر من أكاديمية بورت سويغر لكنه لم يستخدم جميع مخابر المواضيع التي تمت تغطيتها. في حال رغبتك بذلك يمكنك العودة وتجربة المخابر المصنّفة على أنها "للخبراء". لاحظ أن هذه المخابر تمثل حالات نادرة جدًا وغالبًا ما تكون صعبة على خبراء تقييم أمن تطبيقات الويب ذوي الخبرة. 
التوسّع
غطّى مسار التعلّم هذا أهم جوانب أمن تطبيقات الويب ولكن هناك العديد من المجالات الأخرى. 
تحتوي أكاديمية بورت سويغر على مواضيع ومخابر لم يتم تضمينها في مسار التعلّم هذا، وإذا كنت مهتمًا لا تتردد في الاطلاع عليها. لاحظ أنه إذا قمت بالتسجيل للحصول على حساب في أكاديمية بورت سويغر سيسمح ذلك بتتبع المخابر التي أنهيتها. يمكن أن يساعدك هذا في العثور بسهولة على مخابر ومناطق جديدة لم تستكملها.
كما أن دليل اختبار مشروع أمان تطبيق الويب المفتوح هو دليل شامل للغاية لتقييمات أمان تطبيقات الويب والثغرات التي قد يجدها المرء، وإذا كان لديك بضع دقائق فغالبًا ما يكون من المثير للاهتمام الاطلاع بسرعة على محتويات المواضيع التي لا تتعرف عليها وتقرأها.
من المحبذ أيضًا قراءة تقارير الثغرات التي ينشرها باحثون آخرون بانتظام لفهم كل من منهجياتهم والثغرات التي وجدوها داخل مواقع الويب وتطبيقات الويب. يُمثل هذا التقرير بداية رائعة لأنه يشير إلى كل من الأخطاء الأساسية التي ارتكبت في تطبيقات الويب مع شرح متعمّق لمدى الضرر الذي يمكن أن يحدثه المتطفل الذي يستغل هذه الثغرات، ولكن يجب أن تراعي أنه يركز على موقع ويب يحتوي على أخطاء فادحة بشكل خاص حيث لن تكون معظم الثغرات التي تجدها أنت أو باحثون أمنيون آخرون بسيطة.
الممارسة واكتساب الخبرة
الشيء الأكثر تأثيرًا الذي يمكنك القيام به لتحسين مهارات اختبار تطبيقات الويب هو اختبار تطبيقات الويب، وهناك طريقتان أساسيتان تسمحان لك بالقيام بذلك بنفسك. تشمل الأولى التحقق من تطبيقات الويب التي تحوي ثغرات عمدًا في دليل تطبيقات الويب الضعيفة ضمن مشروع أمان تطبيق الويب المفتوح، من بينها جوس شوب ودي آي دبليو إيه وأيضًا الكثير غيرها. إذا كنت تواجه صعوبة في العثور على معظم الثغرات في دي آي دبليو إيه فهذا مكان من الجيد أن تبدأ به، حيث يمكنك التنزيل والتدرب على هذه المواقع وبعضها مستضاف عبر الإنترنت  حتى لا تضطر إلى مواجهة متاعب في تنزيل شيء ما.
بمجرد أن تتأكد من أنك قد وجدت ثغرات في المواقع غير الآمنة عن قصد، فإن إحدى الطرق الجيدة للحصول على التدريب هي المشاركة في برامج مكافأة اكتشاف الثغرات، لأن مالكي المواقع يمنحون الأشخاص الإذن باختبار مواقع الويب الخاصة بهم وعادةً ما يُعوضونك إذا أبلغت عن ثغرة أمنية جديدة لهم. في كثير من الأحيان تحتوي هذه المواقع بالفعل على برامج أمان متقدمة ولذلك تكون الثغرات قليلة ومتفرقة. لكن بدل أن تحاول محاكاة الواقع يمكنك استخدام مواقع الويب الحقيقية هذه وبالتالي ستبني تجربة حقيقية. لاحظ أن بعض الأشخاص قادرون على كسب العيش من خلال برامج مكافآت الأخطاء والثغرات ولكن التقنيات التي يستخدمونها ليست هي نفسها المستخدمة في تقييمات أمان تطبيقات الويب الشاملة. إذا كان هدفك هو ممارسة مهاراتك وتطويرها فمن الأفضل إجراء تقييمات شاملة للمواقع التي تحتوي على مكافآت لاكتشاف الثغرات واعتبار أي تعويض تتلقاه مجرد أمر إضافي. 
أكبر منصتي مكافآت لقاء اكتشاف الثغرات هما هاكر ون (HackerOne) وبغ كراود، ويسمح كلاهما لمالكي المواقع بالتواصل مع "المخترقين" الذين يرغبون باختبار مواقع الويب، كما يحتوي كلاهما على قوائم بمالكي المواقع المشاركين وعادةً ما يكون من المستحسن اختيار برنامج حديث ذو أجور متواضعة. من المفترض أن يساعدك هذا في العثور على موقع يكون من المرجح أكثر أن تعثر فيه على ثغرات، وبالطبع خلال الاختبار تأكد من الامتثال لقواعد برنامج مكافآت اكتشاف الثغرات.
موارد التعلّم
اختبار مهارة
يتناول اختبار المهارات هذا مسار التعلّم بأكمله على نطاق أوسع، حيث يُعد فهم نموذج الربط البيني للأنظمة المفتوحة أمرًا بالغ الأهمية لفهم طبقات اتصال الشبكة والثغرات التي يمكن استغلالها في كل مستوى. يمكنك معرفة المزيد عن النموذج هنا وفي الموضوع الفرعي 5 من مسار التعلّم هذا.

في بنية تطبيقات الويب النموذجية، تؤدي طبقات نموذج الربط البيني للأنظمة المفتوحة المختلفة أدوارًا متميزة من إدارة نقل البيانات حتى تأمين قنوات الاتصال. تستكشف هذه المجموعة من الأسئلة متعددة الخيارات طبقات نموذج الربط البيني للأنظمة المفتوحة المشاركة في بنية تطبيقات الويب إلى جانب الثغرات المحتملة وقنوات الهجوم المقابلة. اختبر معرفتك بأمن الشبكة واكتسب نظرة متعمّقة بالطبقات التي تكمن فيها التهديدات بشكل شائع، وإذا كان ذلك ممكنًا ناقش إجاباتك على هذه الأسئلة مع زميل أو مرشد يساعد في التحقق من فهمك للموضوع بشكل صحيح.

1. في أي طبقات نموذج الربط البيني للأنظمة المفتوحة يعمل بروتوكول تحكم الإرسال الذي يستهدفه المهاجمون عادة في أنواع مختلفة من هجمات الشبكة؟
أ) طبقة التطبيق
ب) طبقة النقل
ج) طبقة الشبكة
د) طبقة رابط البيانات

2. ما هي الثغرة الأمنية المرتبطة عادة بطبقة النقل (الطبقة 4) من نموذج الربط البيني للأنظمة المفتوحة، حيث يحاول المهاجمون إنهاك موارد الشبكة من خلال حجم كبير من حركة المرور؟
أ) البرمجة النصية عبر المواقع
ب) حقن لغة الاستعلامات البنيوية
ج) حجب الخدمة
د) مشكلة في المصادقة

3. في أي طبقات نموذج الربط البيني للأنظمة المفتوحة يعمل بروتوكول نقل النص التشعبي وبروتوكول نقل النص التشعبي الآمن عادةً، مما يجعلهما هدفًا شائعًا للهجمات مثل البرمجة النصية عبر المواقع وحقن لغة الاستعلامات البنيوية؟
أ) طبقة رابط البيانات
ب) طبقة النقل
ج) طبقة التطبيقات
د) طبقة العرض

4. ما هي الثغرة الأمنية التي يتم استغلالها غالبًا في طبقة التطبيق (الطبقة 7) من نموذج الربط البيني للأنظمة المفتوحة بما يسمح للمهاجمين حقن التعليمات البرمجية الضارة في تطبيقات الويب واختراق بيانات المستخدمين؟
أ) حجب الخدمة
ب) البرمجة النصية عبر الموقع
ج) هجوم الوسيط
د) هجمة فيضان بروتوكول المزامنة

5. في أي طبقات نموذج الربط البيني للأنظمة المفتوحة تعمل الموجهات والمبدلات وأين يمكن أن تحدث الثغرات مثل تزييف بروتوكول الإنترنت وتزييف بروتوكول تحليل العنوان؟
1) الطبقة المادية
2) طبقة الشبكة
3) طبقة النقل
4) طبقة الجلسة

6. ما الثغرة الأمنية التي تنطوي على اعتراض المهاجمين للاتصال بين طرفين، بما يسمح لهم بالتنصت على المعلومات الحساسة أو تعديل حزم البيانات؟
أ) البرمجة النصية عبر المواقع
ب) هجوم الوسيط
ج) حقن لغة الاستعلامات البنيوية
د) تجاوز سعة المخزن المؤقت

7. في أي طبقات نموذج الربط البيني للأنظمة المفتوحة تعمل جدران الحماية وأنظمة الكشف عن التسلل عادةً بهدف تصفية ومراقبة حركة مرور الشبكة بحثًا عن الأنشطة المشبوهة؟
أ) طبقة التطبيق
ب) طبقة النقل
ج) طبقة الشبكة
د) طبقة رابط البيانات

8. ما هي الثغرة الأمنية التي تنطوي على استغلال المهاجمين لثغرات في طبقة الشبكة لإعادة توجيه حركة المرور إلى وجهات ضارة أو اعتراض المعلومات الحساسة؟
أ) البرمجة النصية عبر المواقع
ب) تزييف بروتوكول تحليل العنوان
ج) حقن لغة الاستعلامات البنيوية
د) تزييف طلب المواقع المشتركة

9. في أي طبقات نموذج الربط البيني للأنظمة المفتوحة تعمل بروتوكولات تشفير طبقة مآخذ توصيل آمنة وبرتوكول أمن طبقة النقل، مما يحمي البيانات المنقولة عبر الشبكة من الاعتراض والعبث؟
أ) طبقة العرض
ب) طبقة التطبيقات
ج) طبقة النقل
د) طبقة الشبكة

10. ما هي الثغرة الأمنية التي تنطوي على تلاعب المهاجمين بحقول الإدخال داخل نماذج الويب أو عناوين مواقع الويب لحقن أوامر لغة الاستعلامات البنيوية الضارة بما يؤدي إلى الوصول دون تخويل إلى قاعدة البيانات الأساسية؟
أ) البرمجة النصية عبر المواقع
ب) حقن لغة الاستعلامات البنيوية
ج) حجب الخدمة
د) هجوم الوسيط


الإجابات الصحيحة:
1. ب) طبقة النقل
2. ج) حجب الخدمة
3. ج) طبقة التطبيقات
4. ب) البرمجة النصية عبر الموقع
5. ب) طبقة الشبكة
6. ب) هجوم الوسيط
7. ج) طبقة الشبكة
8. ب) تزييف بروتوكول تحليل العنوان
9. ج) طبقة النقل
10. ب) حقن لغة الاستعلامات البنيوية


## Learning Resources

{{% resource title="All Labs | Portswigger academy" languages="English" cost="Free" description="During this learning path, you only completed some of the Portswigger labs. Going back and completing more, especially the difficult ones, will be excellent practice." url="https://portswigger.net/web-security/all-labs" %}}

{{% resource title="OWASP testing guide" languages="English" cost="Free" description="A very thorough document about web application security and the vulnerabilities you can find." url="https://github.com/OWASP/wstg/tree/master/document" %}}

{{% resource title="Hacking into a Toyota/Eicher Motors insurance company by exploiting their premium calculator website" languages="English" cost="Free" description="A good writeup of a website with particularly egregious security errors which could give an attacker high-level access, and basic steps which could have mitigated those vulnerabilities." url="https://eaton-works.com/2024/01/17/ttibi-email-hack/" %}}

{{% resource title="Bug bounty programs" languages="English" cost="Free" description="Bug bounty programs allow you to make money while finding security vulnerabilities and are a great way of ethically testing applications and legally verifying your skills." url="HackerOne: https://www.hackerone.com/hackers" url2="Bugcrowd: https://www.bugcrowd.com/hackers/faqs/" %}}
