+++
style = "module"
weight = 6
title = "Refining Your Web Application Testing Process"
description = "Once you’ve figured out the fundamentals of finding vulnerabilities in websites, this subtopic will teach you a process to find those vulnerabilities more quickly and efficiently"
+++

## Use Case

Subtopic 5 is a prerequisite for this one, and learners are strongly encouraged to thoroughly read it before proceeding.

If you’re like most people, you struggled with the last practice. It probably took you a long time, and you probably missed a bunch of vulnerabilities. Don’t be dispirited! Before you started this, you would’ve found far fewer in far more time. It may not feel great, but it’s very difficult to transition from learning about vulnerabilities in isolation to finding them in an open-ended environment. So, struggling and not being super-successful is part of the process.

Once you’ve figured out the fundamentals of finding vulnerabilities in websites, this subtopic will teach you a process to find those vulnerabilities more quickly and efficiently.

## Objectives

After completing this subtopic, practitioners should be able to understand a methodical approach to web application security assessment that results in finding more vulnerabilities in less time.

---
## Main Section
There are a few common pitfalls that trap new web application testers. Think about whether you fell victim to any of these while testing Juice Shop:

- Hopping around through the site
- Focusing on finding particular vulnerabilities first, as opposed to fully testing certain sections
- Getting fixated on certain pages/input and spending a lot of time looking for phantom vulns
- Not reporting vulnerabilities as soon as they are found, and having to go back and re-test to document them
- Missing sections of the site and/or entire vulnerability classes

If you did any of these things, don’t feel bad. Most people struggle with these, often through full careers as professional web application testers. What you can do is develop strategies to avoid these (and other) issues that make your testing slow and unreliable. This subtopic will show you a few strategies to get you started.

### Strategy 1: Testing Process

In the last subtopic, we introduced the concept of a methodology for web applications security assessments,a way of organizing and thinking about testing. Now, we’re going to reframe that framework into a process. The problem with a framework is that it’s too general. You can test any web application using the framework, but for any specific application, you’ll be more successful if you give yourself more structure.

#### Getting Started

When testing a website, you’ll usually want two users at each level of access, though this can vary. Consider an online forum. You’ll want two registered users, one or two moderators, and one or two admin users. This will let you fully test the site’s authorization controls. In the above example, things you might want to test include:

- Can users edit each others’ posts?
- Can users see each others’ private messages?
- Can users who are not admins or moderators perform moderation functions?
- Can users or moderators who are not admins perform administrative functions?

If you were testing a forum website that allowed multiple sub-forums, you might need 3 normal users (two assigned to sub-forum A and one from sub-forum B), two moderators and admins (one for each sub-forum) and a super-admin.

Once you’ve got the user accounts you need, you can start making a site map. The site map will guide your testing, and will function as your checklist for testing. As as example, you might produce something like this:

![A big table which lists every item on a webpage that can be accessed by a user, along with its URL and a checklist for who can access it--unauthenticated users, particular authenticated users, moderators, or admins](/media/uploads/web_security_assessment_testing_table1.png)

This shows every page you’ve found in the app (“URL” column), its logical navigation, whether the content of the page changes depending on its parameters (“User-specific?” column), and then whether each user type has access to the URL. There’s also a “notes” column for you to collect important info about the page, e.g., if the profile page shows very different content depending on the user of the person viewing the page or if data input on one page shows up on another. Some sites may not fit nicely into this particular structure. That’s fine, the structure should be specific to the site, so feel free to change it. However, something like this should work for most sites.

In building this spreadsheet, you need to go through all the pages on the site and all the site’s user roles. This is most of the Discovery section of the web methodology used in the previous subtopic. So, obviously, while you’re building the site map, you should make sure you complete all of the Discovery tests.

⚠️ This part of the process is extremely important, but can be very dull. To liven it up, do _a little_ ad-hoc testing while you’re going through the site. Maybe check an input for XSS here, do a little authorization check there. This will help keep you engaged while you go through the site.

#### Per Site Testing

Certain parts of the methodology apply to the entire site, or a few places on the site. Every web server has a configuration, and most websites have 1 to a few logical servers (e.g. [www.example.com](http://www.example.com), api.example.com, static.example.com). Most sites have one (or maybe two) login/registration/account management sections and session management mechanisms. You should do these tests next. Doing so will let you feel productive by completing multiple methodology sections quickly, and will give you a chance to understand the structural underpinnings of the website. As you do these tests, you might find more web pages that you originally missed. If so, that’s fine, but be sure to add them to your spreadsheet!

Most people elect to keep their notes from these tests in a text file, as opposed to their testing spreadsheet, but do whatever feels natural to you.

#### Per Page Testing

Now that you understand the site, you can dive into the biggest part of testing the site: testing every page (and every input) for the full battery of tests in the rest of the methodology. This is going to be a lot to keep track of, and if you don’t stay focused and keep track, you will miss things. Fortunately, you’ve prepared a spreadsheet. All you need to do is expand that spreadsheet and you’ve got a full checklist:

![A screenshot of a similar table to the one above except that there are not more columns which allow the person filling it in to check boxes for various authorization, authentication, XSS, and other vulnerabilities they might encounter](/media/uploads/web_security_assessment_testing_table2.png)

This might seem daunting, but every cell in that sheet is a small, discrete chunk of work that should take a bounded amount of time. It’s usually more effective to go through the site filling out rows first; choose a page and go through the entire methodology, rather than performing one test throughout the entire site. As you go, put something like a “√” in cells as you complete them, or something like “n/a” if the tests don’t apply. Over the hours and days, your checklist will get filled in, and you can be confident that you’ve performed complete testing.

⚠️ It’s a good idea to keep separate notes in your regular notes document while you do this testing, you want to keep your spreadsheet clean and clear.

### Strategy 2: Time-box tests

Getting fixated on a particular page/input/etc while testing, and spending hours on it is a near-universal mistake among people who test web applications. They tell themselves that they’re at the cusp of a breakthrough, and they’ll be done in 10 minutes. Next thing they know, it’s two hours later and they forgot to eat lunch. (Not everyone does this. But if you do, you’re in good company.) If you have infinite time to test a site, then this isn’t much of a problem (missed meals notwithstanding). Most of the time, though, you have limited time. If you run out of time because you got fixated on one page, you may leave entire swaths of the site, riddled with vulnerabilities, untested.

If you find yourself getting stuck frequently, set a timer every time you start a cell in the testing spreadsheet. Make sure you can’t see the timer, looking at a clock countdown is stressful. With experience, you will be able to guess how long a cell should take. Give yourself a nice buffer (around 50% or more). So, if you think you can complete a cell in 10 minutes, set a timer for 15 or 20 minutes. The idea is for the timer to warn you that maybe you’re fixated, not to motivate you to go fast. If the timer goes off before you finish the cell, stop and evaluate. If you found a vulnerability and are making progress creating a demonstration exploit (e.g., you find SQL injection and you’re setting up something to extract the database), then reset the timer and keep going. If, however, you find that you’re chasing after some vulnerability that maybe doesn’t actually exist, then take a note about your progress to date, and move on to the next cell. If you have time at the end of testing, you’ll be able to come back.

This strategy also has good health benefits. The process of resetting the timer per cell also gives you an opportunity to get up and stretch, get a beverage, make sure you break for meals, etc.

### Strategy 3: Document as you go

This strategy was discussed in the previous section, but most people ignore the advice at first. Hopefully, in the process of completing the previous section, you either followed the advice, or you learned that writing the report at the end is not an effective strategy. Many people have to learn this lesson repeatedly through an entire career doing security testing, so don’t feel too bad if you mess up from time to time.

Related to this, you want to keep effective notes. Many people keep a running notes file that just includes everything they think of and odd things they notice during testing, and another notes file that includes further details about vulnerabilities that they find and conclusions about the site that are too verbose or unfined to the report.

These strategies should set you up for success in testing websites. We’ll put them into practice in the next subsection of this subtopic.

### Thinking of vulnerabilities through the lens of the OSI model

[The OSI](https://tryhackme.com/room/introtonetworking) (Open Systems Interconnection) Model serves as a standardized framework for understanding computer networking theory, although real-world networking is predominantly based on the more concise TCP/IP model. Nonetheless, the OSI model remains valuable for gaining an initial grasp of networking concepts. These layers collectively enable the smooth functioning of computer networks, ensuring efficient and reliable data transmission from the application to the physical hardware level.

Since the OSI model is one of the main ways in which we think about networking, it’s useful to be familiar with it when thinking of and looking for potential vulnerabilities as well.

| Layer   | Name        |
|---------|-------------|
| layer 1 | APPLICATION |
| layer 2 | PRESENTATION|
| layer 3 | SESSION     |
| layer 4 | TRANSPORT   |
| layer 5 | NETWORK     |
| layer 6 | DATA LINK   |
| layer 7 | PHYSICAL    |


The OSI model comprises seven layers:

1. **Application**: Provides networking capabilities to computer programs, facilitating data transmission between applications. Data received at this layer is then passed down to the presentation layer.
2. **Presentation**: Receives data from the application layer, often in a format specific to the application. It standardizes the data format and handles tasks like encryption and compression before passing it to the session layer.
3. **Session**: Attempts to establish and maintain a connection with another computer across the network. It manages communication sessions and synchronizes data exchanges between the host and remote computers.
4. **Transport**: Selects the transmission protocol (TCP or UDP) and breaks down data into manageable segments or datagrams. TCP offers reliable, connection-based transmission, while UDP prioritizes speed.
5. **Network**: Determines the destination of the data transmission by utilizing logical addressing (e.g., IP addresses) to identify the best route across the network. Commonly used logical addressing formats include IPV4.
6. **Data Link**: Focuses on physical addressing by adding the MAC (Media Access Control) address of the receiving endpoint to the transmission packet. It also ensures the integrity of data transmission and prepares data for transmission.
7. **Physical**: Handles the hardware-level aspects of data transfer, converting binary data into signals for transmission over the network. It is responsible for sending and receiving electrical pulses that constitute data transfer.

Attackers can breach each OSI model layer [due to inherent vulnerabilities](https://www.pynetlabs.com/various-kinds-of-osi-layer-attacks/). These vulnerabilities can arise from software bugs, design flaws, and misconfigurations, which collectively provide attackers with opportunities to exploit weaknesses across all seven layers.

- Application: Common attacks targeting this layer include Cross-Site Scripting (XSS), where malicious scripts are injected into web applications to compromise user data or hijack sessions.
- Presentation: Attackers may target this layer with techniques such as format string attacks or exploiting vulnerabilities in encryption algorithms.
- Session: Session layer attacks include session hijacking, where an attacker intercepts and takes control of a user's session to gain unauthorized access.
- Transport: Transport layer attacks may involve TCP SYN flooding or UDP flood attacks, which overwhelm network resources by sending many connection requests.
- Network: Network layer attacks include IP spoofing, where attackers forge the source IP address of packets to bypass security measures or launch denial-of-service attacks.
- Data Link: Attacks targeting the data link layer may include MAC flooding or Address Resolution Protocol (ARP) spoofing attacks, which disrupt network connectivity or facilitate man-in-the-middle attacks.
- Physical: Physical layer attacks involve physical tampering, such as cable tapping or signal interference, to disrupt network communication or intercept data.

## Practice

This practice is similar to that of the previous subsection, except this time you’ll be following the testing process outlined above. Also, the website you’ll be testing is a bit more realistic; it was built to be a website with vulnerabilities, as opposed to a site containing a bunch of challenges. As such, it should feel more like testing a real website does.

1. [Install DIWA](https://github.com/snsttr/diwa) (Docker is generally the easiest method)
2. Prepare your testing environment as with the previous subtopic. Make sure you have a blank report, one or more notes files and a testing spreadsheet. For the latter (and your future work), feel free to copy [this template](https://docs.google.com/spreadsheets/d/1NPDA-CI5t_X0krw2qMwcOOupIWXhMCfYiTZFeyv-A08/edit#gid=0).
3. Start testing! Follow the process described in this subtopic, and compare how it feels to when you were testing Juice Shop. As before, the goal is to practice. Don’t look for answers or walkthroughs until you’re done.

## Skill Check

If you have a mentor, review your report with them. You will probably find it useful to look [at a list of the vulnerabilities present in DIWA](https://github.com/jeremiahblatz/diwa-answers/wiki/) available (please submit any additions). If you’ve found the majority of those in a reasonable amount of time (1-2 days), then congratulations!

If you don’t have a mentor, you can self-review using the list above.

الموضوع الفرعي 6: تحسين عملية اختبار تطبيق الويب الخاص بك
حالة استخدام
يُعدّ الموضوع الفرعي 5 متطلبًا مسبقًا يجب إكماله قبل هذا الموضوع ونشجع المتعلمين بشدة على قراءته بدقة قبل المتابعة.
إذا كنت مثل معظم الناس ستكون قد واجهت صعوبة في التمرين الآخير، وربما استغرق الأمر منك وقتًا طويلًا أو ربما فاتتك مجموعة من الثغرات - ولكن لا تدع ذلك يُحبطك! قبل أن تبدأ مسار التعلّم هذا كنت ستجد أقل بكثير من الثغرات خلال وقت أطول بكثير. قد لا يُشعرك ذلك بالارتياح ولكن من الصعب جدًا الانتقال من التعلّم عن ثغرات في عزلة إلى العثور عليها في بيئة مفتوحة، ولذلك فإن الوقوف في وجه الصعوبات وعدم النجاح كثيرًا هما جزء من العملية.
بمجرد معرفة أساسيات العثور على ثغرات في مواقع الويب، سيُعلّمك هذا الموضوع الفرعي عملية للعثور على هذه الثغرات بسرعة وكفاءة أكبر.
الأهداف 

بعد الانتهاء من هذا الموضوع الفرعي يجب أن يتمتع الممارسون بفهم منهجي لتقييم أمن تطبيقات الويب يسمح بالعثور على ثغرات أكثر خلال وقت أقل.
العرض 
هناك بعض الهفوات الشائعة التي يمكن أن يقع فيها الحديثون على فحص تطبيقات الويب، تذكّر ما إذا كنت قد وقعت ضحية لأي من هذه الأشياء أثناء اختبار جوس شوب:
التنقل بسرعة خلال الموقع
التركيز على العثور على ثغرات معينة أولاً بدلاً من اختبار أقسام معينة بكاملها
التركيز على صفحات أو مدخلات معينة وقضاء الكثير من الوقت في البحث عن ثغرات وهمية
عدم الإبلاغ عن الثغرات الأمنية بمجرد العثور عليها والاضطرار إلى العودة وإعادة الاختبار لتوثيقها
نسيان أقسام من الموقع و/أو فئات ثغرات بأكملها
لا تشعر بالسوء إذا فعلت أيًا من هذه الأمور؛ حيث يعاني معظم الناس من هذه المشاكل وغالبًا ما يكون ذلك حتى بالنسبة لأشخاص يعملون بدوام كامل بصفتهم فاحصي تطبيقات ويب محترفين. ما يمكنك القيام به هو تطوير استراتيجيات لتجنّب هذه المشكلات وغيرها التي تتسبب بإبطاء عملية الفحص التي تجريها وجعلها غير موثوقة، وسيعرض لك هذا الموضوع الفرعي بعض الاستراتيجيات للبدء.
الاستراتيجية 1: عملية الفحص
في الموضوع الفرعي الأخير قدمنا مفهوم منهجية لتقييمات أمان تطبيقات الويب وهي طريقة للتنظيم والتفكير في الاختبار، والآن سنعيد صياغة هذا الإطار ليصبح عملية، لكن تكمن مشكلة إطار العمل في كونه عامًا للغاية. يمكنك فحص أي تطبيق ويب باستخدام إطار العمل ولكن بالنسبة لأي تطبيق محدد ستكون أكثر نجاحًا إذا كنت أكثر منهجية.
البدء
عند اختبار موقع ويب، ستحتاج عادةً إلى مستخدمين اثنين في كل مستوى من مستويات الوصول ولكن هذا أمر قد يختلف. فكر في منتدى على الإنترنت، حيث ستحتاج إلى حسابات مستخدمين مسجلين اثنين ومدير أو مديرين ومشرف أو مشرفين. سيتيح لك ذلك اختبار عناصر التحكم في تخويل الموقع بشكل كامل، وبالنسبة للمثال أعلاه تشمل الأمور التي قد ترغب في اختبارها ما يلي:
هل يمكن للمستخدمين تحرير منشورات بعضهم البعض؟
هل يمكن للمستخدمين رؤية الرسائل الخاصة التي تخص بعضهم البعض؟
هل يمكن للمستخدمين من غير المديرين أو المشرفين أداء وظائف الإدارة؟ 
هل يمكن للمستخدمين أو المديرين غير المشرفين أداء وظائف الإشراف؟
إذا كنت تفحص موقعًا إلكترونيًا على منتدى يسمح بعدة منتديات فرعية فقد تحتاج إلى 3 مستخدمين عاديين (اثنان مخصصان للمنتدى الفرعي أ وواحد من المنتدى الفرعي ب)، واثنين من المديرين والمشرفين (واحد لكل منتدى فرعي) ومشرف فائق واحد.
بمجرد حصولك على حسابات المستخدمين التي تحتاجها بإمكانك البدء في إنشاء خريطة موقع تسمح لك بتوجيه اختبارك وتكون قائمة تحقق لأجل الاختبار. فعلى سبيل المثال، قد تنتج شيئًا يشابه ما يلي:

يعرض هذا كل صفحة وجدتها في التطبيق (عمود "عنوان موقع الويب")، وإمكانية التنقل المنطقية، وما إذا كان محتوى الصفحة يتغير حسب معلماته ("عمود خاص بالمستخدم؟") وثم إذا ما كان كل نوع من أنواع المستخدمين يتمتع بالوصول إلى عنوان موقع الويب. هناك أيضًا عمود "ملاحظات" يجمع معلومات مهمة حول الصفحة، على سبيل المثال ما إذا كانت صفحة الملف الشخصي تعرض محتوى مختلفًا كثيرًا حسب مستخدم الشخص الذي يشاهد الصفحة أو إذا ظهرت مدخلات بيانات صفحة ما على صفحة أخرى. قد لا يتناسب هذا الهيكل المحدد بشكل جيد مع بعض المواقع، ولكن ليس ذلك بمشكلة لأن الهيكل يجب أن يكون مخصصًا للموقع ولا مانع في تغييره. ولكن يجب أن ينجح شيء مشابه بالنسبة لمعظم المواقع.
خلال بناء جدول البيانات هذا تحتاج إلى تصفح جميع الصفحات على الموقع وجميع أدوار مستخدم الموقع، وهو ما يغطيه غالبية قسم الاكتشاف في منهجية الويب المستخدمة في الموضوع الفرعي السابق. لذلك من الواضح أنه أثناء إنشاء خريطة الموقع، يجب عليك التأكد من إكمال جميع اختبارات قسم الاكتشاف.
⚠️ يمكن أن يكون هذا القسم من العملية مهمًا للغاية ولكن يمكن أن يكون مملًا للغاية أيضًا. ولأجل إدخال بعض الحيوية عليه يمكنك إجراء القليل من الفحوص العشوائية أثناء تصفحك للموقع. يمكنك مثلًا التحقق من إدخال البرمجة النصية عبر المواقع في موضع أو التحقق من التخويل في موضع آخر، وسيساعدك هذا في استمرار عملك أثناء تصفحك للموقع. 
اختبار لكل موقع
تنطبق أجزاء معينة من المنهجية على الموقع بأكمله أو على بعض الأماكن منه، حيث يتمتع كل خادم ويب بتكوين مختلف وتحتوي معظم مواقع الويب على خادم واحد أو عدة خوادم منطقية (على سبيل المثال www.example.com وapi.example.com وstatic.example.com). تحتوي معظم المواقع على قسم واحد (أو ربما قسمين) لتسجيل الدخول/تسجيل حساب/إدارة الحساب وآليات إدارة الجلسة، وعليك إجراء هذه الاختبارات كخطوة تالية. سيتيح لك القيام بذلك أن تشعر بأنك تحقق نتيجة لأنك ستستكمل أقسام منهجية متعددة بسرعة وسيمنحك فرصة لفهم الأسس الهيكلية للموقع. خلال إجراء هذه الاختبارات قد تجد صفحات ويب إضافية فاتتك في المرة الأولى، ولا مشكلة في حال حصل ذلك ولكن تأكد من إضافتها إلى جدول بياناتك!
يقرر معظم الناس إبقاء ملاحظاتهم من هذه الفحوص في ملف نصي بدلاً من جدول بيانات اختبارك ولكن بإمكانك أن تفعل ما تشعر بأنه طبيعي بالنسبة لك.
اختبار لكل صفحة
الآن وبعد أن تعرّفت على الموقع يمكنك التعمّق في الجزء الأكبر من اختباره المتمثل في اختبار كل صفحة وكل إدخال لمجموعة كاملة من الاختبارات في بقية المنهجية، لكن تتبع هذه الأمور يتطلب الكثير من الجهد وإذا لم تُركز عليه وتتبعه ستفوتك بعض الأمور. لكن نفترض أنك قد أعددت جدول بيانات، وكل ما عليك فعله هو توسيعه وستحصل على قائمة تحقق كاملة:

قد يبدو هذا الأمر شاقًا ولكن كل خلية في ذلك الجدول هي جزء صغير ومنفصل من سير العمل ومن المفترض أن يستغرق فترة زمنية محددة. عادة ما يكون من الأكثر فعالية مراجعة الموقع مع ملأ الصفوف أولًا، لذا اختر صفحة وتصفح المنهجية بأكملها بدلاً من إجراء اختبار واحد في جميع أنحاء الموقع بأكمله. أثناء قيامك بهذه العملية ضع شيئًا مثل "√" في الخلايا عند إكمالها أو شيء مثل "لا ينطبق" إذا لم يكن من الممكن تطبيق نوع الاختبار. وعلى مدار الساعات والأيام ستمتلئ قائمة التحقق خاصتك ويمكنك الوثوق بأنك قد أجريت اختبارًا كاملاً.
⚠️ من المستحسن إبقاء ملاحظات منفصلة في مستند الملاحظات العادي الخاص بك أثناء إجراء هذا الاختبار لأنك سترغب بإبقاء جدول البيانات نظيفًا وواضحًا.
الاستراتيجية 2: اختبارات الإطار الزمني
من الأخطاء الشائعة عمومًا تقريبًا أن تُركز على صفحة أو إدخال معين أو ما شابه أثناء الفحص بين الأشخاص الذين يفحصون تطبيقات الويب، لأنهم يقولون لأنفسهم أنهم على وشك تحقيق نجاح كبير وسينتهون في غضون 10 دقائق. ولكن تمر ساعات من الوقت وتكون قد فاتتهم وجبة الغداء. (لا يحصل هذا مع الجميع، ولكن إذا كنت ممن يفعلون ذلك فستجد الكثير من الصُحبة.) إذا كان لديك وقت غير محدود لاختبار موقع ما، فلن تكون هذه مشكلة كبيرة (بغض النظر عن الوجبات التي فاتتك)، ولكن في معظم الأحيان سيكون وقتك محدودًا، وإذا نفد وقتك لأنك ركزت على صفحة واحدة فقد تبقى مساحات واسعة من الموقع دون اختبار مليئة بالثغرات الأمنية. 
إذا وجدت نفسك تعلق بشكل متكرر فعليك تعيين مؤقت في كل مرة تبدأ فيها خلية في جدول بيانات الفحص، وتأكد من أنك لا تستطيع رؤية المؤقت لأن النظر إلى ساعة العد التنازلي أمر مرهق. ومع اكتساب الخبرات ستتمكن من تخمين المدة التي من المفترض أن تستغرقها الخلية، لكن تذكر منح نفسك فترة تقديرية مناسبة (حوالي 50٪ أو أكثر). ولذلك إذا كنت تعتقد أنه يمكنك إكمال خلية خلال 10 دقائق عليك أن تضبط مؤقتًا لمدة 15 أو 20 دقيقة. الفكرة هي أن يقوم المؤقت بتحذيرك من أنك ربما تكون أنك تقضي وقتًا مفرطًا، وليس لتحفيزك على التحرك بسرعة. إذا انتهى المؤقت قبل إكمال الخلية عليك أن تتوقف وتجري تقييمًا، فإذا وجدت ثغرة أمنية وكنت تُحرز تقدمًا في إنشاء توضيح لثغرة (على سبيل المثال، عثرت على حقن لغة الاستعلامات البنيوية وتعمل على إعداد أمر لاستخراج قاعدة البيانات)، عليك إعادة ضبط المؤقت وثم الاستمرار. لكن إذا وجدت أنك تلاحق ثغرات ربما لا تكون موجودة بالفعل عليك تدوين تقدمك بشكل مستمر ثم الانتقال إلى الخلية التالية، وفي حال تبقى لديك وقت في نهاية الاختبار يمكنك العودة.
لهذه الاستراتيجية فوائد جيدة على الصحة، لأن عملية إعادة ضبط المؤقت لكل خلية أيضًا فرصة للنهوض والتمدد وشرب شيء والتأكد من حصولك على قسط من الراحة لتناول الوجبات وما إلى ذلك.
الاستراتيجية 3: التوثيق أثناء تقدمك
تمت مناقشة هذه الاستراتيجية في القسم السابق ولكن معظم الناس يتجاهلون النصيحة في البداية، ونأمل خلال إكمال القسم السابق أن تكون إما اتّبعت النصيحة أو تعلمت أن كتابة التقرير في النهاية ليست استراتيجية فعّالة. لكن يتعين على الكثير من الناس تعلّم هذا الدرس مرارًا وتكرارًا على مدار مهنة كاملة من إجراء الاختبارات الأمنية ولذلك لا تشعر بالسوء الشديد إذا أخطأت من وقت لآخر.
وفي هذا الشأن سترغب بإبقاء ملاحظات فعالة، حيث يحتفظ العديد من الأشخاص بملف ملاحظات يحدثونه باستمرار يتضمن فقط ما يجول في بالهم والأمور الغريبة التي يلاحظونها أثناء الاختبار وملف ملاحظات آخر يتضمن تفاصيل أكثر حول الثغرات الأمنية التي يجدونها واستنتاجات حول الموقع مطوّلة جدًا أو غير خاصة بالتقرير. 
يجب أن تُهيئك هذه الاستراتيجيات للنجاح في اختبار مواقع الويب، وسنضعها موضع التنفيذ في القسم الفرعي التالي من هذا الموضوع الفرعي.
التفكير في الثغرات من خلال عدسة نموذج الربط البيني للأنظمة المفتوحة
يعمل نموذج الربط البيني للأنظمة المفتوحة (Open Systems Interconnection أو اختصارًا OSI) على شكل إطار موحّد لفهم نظرية شبكات الكمبيوتر على الرغم من أن الشبكات في العالم الحقيقي تعتمد في الغالب على نموذج أكثر إيجازًا من برتوكول التحكم في الإرسال/بروتوكول الإنترنت، لكن لا يزال نموذج الربط البيني للأنظمة المفتوحة ذا أهمية لاكتساب فهم أولي لمفاهيم الشبكات. تتيح هذه الطبقات مجتمعة أداءً سلسًا لشبكات الكمبيوتر يضمن نقل البيانات بكفاءة وموثوقية من التطبيق إلى مستوى الأجهزة الفعلية.
نظرًا لأن نموذج الربط البيني للأنظمة المفتوحة هو من بين الطرق الرئيسية لفهم الشبكات، من المفيد أن نكون على دراية به عند التفكير بوجود ثغرات المحتملة وأيضًا عند البحث عنها.


يتكون نموذج الربط البيني للأنظمة المفتوحة من سبع طبقات:

التطبيق: يُوفر قدرات الربط الشبكي لبرامج الكمبيوتر مما يسهل نقل البيانات بين التطبيقات، وثم تُمرر البيانات الواردة في هذه الطبقة إلى طبقة التقديم.
التقديم: تتلقى البيانات من طبقة التطبيق وغالبًا ما تكون بصيغة تخص التطبيق، ثم توحد تنسيق البيانات وتتعامل مع مهام مثل التشفير والضغط قبل تمريرها إلى طبقة الجلسة.
الجلسة: تحاول إنشاء اتصال مع كمبيوتر آخر عبر الشبكة والحفاظ عليه، حيث تُدير جلسات الاتصال وتُزامن تبادل البيانات بين المضيف وأجهزة الكمبيوتر البعيدة.
النقل: تحدد بروتوكول الإرسال (بروتوكول تحكم الإرسال أو بروتوكول مخطط بيانات المستخدم) وتُقسم البيانات إلى شرائح أو مخططات بيانات يمكن إدارتها، حيث يوفر بروتوكول تحكم الإرسال إرسالًا موثوقًا قائمًا حسب الاتصال بينما يعطي بروتوكول مخطط بيانات المستخدم الأولوية للسرعة.
الشبكة: تُحدد وجهة نقل البيانات باستخدام العناوين المنطقية (على سبيل المثال، عناوين بروتوكول الإنترنت) لتحديد أفضل مسار عبر الشبكة، وتتضمن تنسيقات العنونة المنطقية الشائعة بروتوكول الإنترنت الإصدار 4.
رابط البيانات: تُركز على المعالجة الفعلية عن طريق إضافة عنوان وحدة التحكم في الوصول إلى الوسائط (MAC أو Media Access Control) لنقطة النهاية المستقبلة لحزمة الإرسال وتضمن أيضًا سلامة نقل البيانات وتُحضر البيانات لإرسالها. 
الفعلية: يتعامل مع جوانب نقل البيانات على مستوى الأجهزة ويحول البيانات الثنائية إلى إشارات لإرسالها عبر الشبكة، وهي مسؤولة عن إرسال واستقبال النبضات الكهربائية التي تُمثل نقل البيانات.

يمكن للمهاجمين اختراق كل طبقة من نموذج الربط البيني للأنظمة المفتوحة بسبب الثغرات الكامنة، ويمكن أن تنشأ هذه الثغرات من أخطاء البرامج وعيوب التصميم والتكوينات الخاطئة والتي توفر بشكل جماعي للمهاجمين فرصًا لاستغلال الثغرات بين جميع الطبقات السبع.
التطبيق: تشمل الهجمات الشائعة التي تستهدف هذه الطبقة البرمجة النصية عبر المواقع حيث يتم حقن البرامج النصية الضارة في تطبيقات الويب لاختراق بيانات المستخدم أو اختطاف الجلسات.
العرض: قد يستهدف المهاجمون هذه الطبقة بتقنيات مثل هجمات سلاسل الصيغ أو استغلال الثغرات الأمنية في خوارزميات التشفير.
الجلسة: تشمل هجمات طبقة الجلسة السيطرة على الجلسة حيث يعترض المهاجم جلسة المستخدم ويتحكم فيها للتمتع بتخويل غير مصرح به.
النقل: قد تتضمن هجمات فيضان بروتوكول المزامنة لبروتوكول طبقة النقل أو هجمات فيضان بروتوكول مخطط بيانات المستخدم التي تُنهك على موارد الشبكة عن طريق إرسال العديد من طلبات الاتصال.
الشبكة: تشمل هجمات طبقة الشبكة تزييف عنوان بروتوكول الإنترنت، حيث يقوم المهاجمون بتزوير عنوان بروتوكول إنترنت المصدر للحزم لتجاوز التدابير الأمنية أو شن هجمات حجب الخدمة.
رابط البيانات: قد تشمل الهجمات التي تستهدف طبقة رابط البيانات فيضانات وحدة التحكم في الوصول إلى الوسائط أو هجمات بروتوكول تحليل العنوان التي تُعطل اتصال الشبكة أو تُسهل هجمات الوسيط.
الفعلية: تتضمن هجمات الطبقة الفعلية العبث الفعلي مثل التنصت على الكابلات أو تداخل الإشارات بهدف تعطيل اتصال الشبكة أو اعتراض البيانات.
الممارسة
تُشبه هذه الممارسة تلك الواردة في القسم الفرعي السابق إلا أنك ستتبع هذه المرة عملية الاختبار الموضّحة أعلاه، وكما أن موقع الويب الذي ستختبره أكثر واقعية بعض الشيء فقد تم تصميمه ليكون موقعًا إلكترونيًا فيه ثغرات بدلاً من موقع يحتوي على مجموعة من التحديات. وعلى هذا النحو يجب أن يكون الأمر أشبه باختبار موقع ويب حقيقي.

تثبيت دي آي دبليو إيه (DIWA) (داكر هو عمومًا الطريقة الأسهل)
حضّر بيئة اختبارك كما هو الحال مع الموضوع الفرعي السابق، وتأكد من ووجود تقرير فارغ وملف ملاحظات واحد أو أكثر وجدول بيانات للاختبار. بالنسبة للأخير (وعملك المستقبلي) لا تتردد في نسخ هذا النموذج. 
أبدأ الاختبار! اتبع العملية الموضّحة في هذا الموضوع الفرعي وقارن ما تشعر به عندما كنت تفحص جوس شوب، وكما ذكرنا سابقًا يتمثل الهدف في التمرّن، لا تبحث عن الإجابات أو الأدلة التوجيه خطوة بخطوة حتى انتهاءك.
اختبار مهارة
راجع تقريرك مع المُرشد في حال كان موجودًا، ومن المحتمل أن تجد أنه من المفيد الاطلاع على نظرة على قائمة بالثغرات الموجودة في دي آي دبليو إيه المتاحة (يرجى تقديم أي إضافات). ولكن في حال وجدت غالبيتها في فترة زمنية معقولة (يوم أو يومين) - فتهانينا! 

إذا لم يكن لديك مرشدًا فيمكنك أن تراجع نفسك باستخدام القائمة أعلاه
