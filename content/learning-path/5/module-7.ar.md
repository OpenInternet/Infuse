+++
style = "module"
weight = 7
title = "Automatic Vulnerability Discovery"
description = "In past subtopics, we looked at how to discover vulnerabilities by hand. Here, we explore tools that can help automate that process"
+++

## Use Case

This learning path has focused on manual discovery of vulnerabilities in web applications. This skill is vital for understanding the vulnerabilities and also gives you the tools to find them on any site. However, there are numerous tools that can help with vulnerability discovery and exploitation in web applications. These tools have both advantages and disadvantages and are best used in conjunction with manual testing. This subtopic reviews a number of freely available tools and how to use them effectively.

## Objectives

After completing this subtopic, practitioners will know how and when to appropriately use various web application vulnerability scanners, including:

- ZAP scanner
- sqlmap
- WPScan CLI

---
## Main Section
This subtopic explores three classes of web application automation tools. It will discuss what they do, what they’re good at, what they’re not good at, and how to get the most out of them. We’ll break the space down into three broad categories:

- Web app automatic testers
- Exploitation tools
- Web app vulnerability scanners

### Web application automatic testers

This first category is tools that do the same things that humans do to find new vulnerabilities in web applications. They go through the site, find inputs, send malicious data to those inputs, and try to detect when that data has triggered a vulnerability. One example of this type of web app scanner is SSP’s ZAP, but there are numerous others, including Burp Pro’s scanner, HCL AppScan, etc.

Typically, these tools work by first “[spidering](https://en.wikipedia.org/wiki/Web_crawler)” the target website, where they will follow every link on every page and attempt to build a complete map of the site. Then, they find every parameter that is sent to the server, and replace that parameter with various “[fuzz](https://en.wikipedia.org/wiki/Fuzzing)” substitutions. When each response comes back, the scanner will look for features that indicate a successful attack. For example, the scan engine might replace a parameter with <code>&lt;script><em>var</em> xyz<em>=</em>"abc";&lt;/script></code>. When the HTTP response comes back, the scanner will parse the pages’ HTML, and if it sees that script element as a JavaScript block in the page, then it knows that the input is vulnerable to XSS.

#### Scanner Strengths

People use web application scanners for good reason. They find vulnerabilities quickly and effectively. Experienced web application security testers will use scanners as part of their assessments, despite their years of experience. There are some things that web application scanners are very good at.

The biggest strength of these tools is finding vulnerabilities related to data validation. Scanners are excellent at finding mainstream data validation issues like XSS and SQLi, but also obscure issues like LDAP injections, XSLT, etc. The reasons for this are simple:

- Scanners don’t get tired or bored, they can submit thousands of requests and not “lose focus”
- Scanners can try every possible input they’re programmed to, including HTTP referer headers, cookies, extra parameters arbitrarily added to the ends of URLs, etc.
- Scanners have huge libraries of tests to try lots of permutations of each potential attack
- Data validation vulnerabilities are generally quite easy to recognize, with simple pattern matching or behavioral analysis that is easy to detect programmatically.

Some scanners even use unique fuzz strings for each input, so that they can detect input that’s entered in one place and shown in another. Generally, a properly configured scanner should find more data validation issues in less time than a highly skilled human.

Another area where scanners excel is in finding configuration issues, especially ones that exist in only a small subset of the site. If a site uses CSRF tokens in every form, but the developers forgot in one section of the site, a human tester is likely to overlook the error. However, a scanner will almost certainly find and report the missing token. As with data validation, scanners have huge batteries of tests that they run on every request and response.

#### Scanner Weaknesses

Despite their strengths, scanners also have multiple weaknesses. In some cases, it may not even be appropriate to use a scanner for testing certain sites. Here are some of the biggest problems with web app scanners.

#### Scan Completeness

There are numerous potential issues with the way scanners work that may cause them to not complete a full test against the site in a timely manner.

The first is that many sites require users to log in. Scanners can be configured with a logged in session ID, given a script that submits the login form, or other ways of authenticating. They can also be configured to detect when they’ve been logged out of the site. However, this configuration is often error-prone. If the scanner is configured improperly, it may not completely spider the site, or may not detect when it’s been logged out and not properly complete testing. In extreme cases, sites may have anti-automation features that make scanning nearly impossible.

Another issue is that scanners don’t always distinguish between pages that are completely different vs pages that merely look different. For instance, in an online forum, it’s easy for a human to see that each forum thread is really the same underlying page with different data. However, an automatic scanner might determine that two threads are entirely different web pages and that they must be tested separately. In large sites, sometimes scanners can get stuck testing one page that appears to be different pages to the scanner, and spend hours or days performing redundant tests.

On the other hand, there may be pages or parameters that the spider doesn’t detect for one reason or another. If the scanner hasn’t detected a parameter, or has missed sections of the site, then obviously it’s likely to miss vulnerabilities related to those pages or parameters.

All of these issues can be worked through with close observation of the scanner behavior and changing scan configurations. While it’s entirely possible to just point a scanner at a website and launch a scan, to get the best results, it’s important to at least complete Discovery and Authentication testing before launching a scan.

#### Scanner Destructiveness

One of the strengths of a scanner is that it runs very fast. This strength can cause problems, though.

If submitting a request ends up performing some action outside the site, then the scanner may make that action happen thousands of times. Examples of outside effects might include sending a SMS (which may cost the site owner money), sending an email (imagine someone opening their inbox to find tens of thousands of emails), printing an order ticket in a warehouse, etc.

Relatedly, some sites don’t have the resources to keep up with a scanner. Given how often independent media and civil society sites come under denial of service attacks, this might be an important thing to discover. However, the site crashing will prevent further vulnerability testing.

Both of these can be partially mitigated through discussions with the site owner and by paying attention during Discovery testing and configuring the scanner correctly. For instance, all major scanners have ways of excluding certain pages from scans and for controlling how fast they scan. However, the risk of a scanner impacting the site or its related systems can never be eliminated.

#### Vulnerabilities That Scanners Are Bad At Discovering

While scanners are great at discovering some sorts of vulnerabilities, there are other types that are nearly impossible for them to discover.

Chief among these are true business logic vulnerabilities. Scanners just execute scripts, and they don’t “understand” how sites are meant to work. No scanner will understand the significance of a rounding error in money transfers or the significance of omitting a supposedly required field in a form.

Relatedly, automated tools do not tend to do a good job at detecting authorization vulnerabilities. While there exist a variety of tools to assist with authorization testing, generally scanners do not automatically detect these sorts of vulnerabilities.

#### False Positives and Non-Issues

Scanners may also produce lots of results that aren’t useful. In some cases, the script to detect a vulnerability may be imperfect, resulting in the scanner reporting an issue where none exists. In other cases, the scanner may report things that the tool’s author may think are interesting or valuable, but are not significant in the context of the site you’re testing.

In all cases, you should manually reproduce and fully understand scanner findings before adding them to your report.

#### Using Scanners Effectively

Generally, web applications security assessment practitioners find that they’re more effective using a scanner than not. Since their strengths are so compelling, it’s worth one’s time to configure and monitor scans.

In all cases, you should complete Discovery and Authentication before using a scanner. Since you are new to the field, you should practice using a scanner on different websites and both read and understand your scanner’s configuration options and progress indicators. Try to understand how the site works before unleashing a scanner upon it.

Some practitioners will scan pages individually, skipping the “spidering” stage of a scan. This has the advantage of mitigating many of the issues of scanning, but also misses out on the ability of the spider to find content that you might have missed. It’s also more labor intensive. However, it can be very effective on sites that are hard for the scanner to spider and sites that are more fragile.

Another option is to scan the whole site at once. It’s generally good to use a separate web app user for this scan, so that garbage data from the scan doesn’t interfere with your regular testing. Also make sure that the account you use has full access to the site. While the scan is running, you should try to strike a balance between monitoring the scan closely enough to notice problems, but also spend most of your time doing manual testing.

In either case, you should not rely on the scanner entirely for data validation testing or any other vulnerability class. You should at least do a few tests on each input to the site and do some thorough testing on others. The scanner may have subtle problems testing the site that aren’t obvious.

### Practice: Using ZAP

ZAP (SSP’s Zed Attack Proxy) is an open-source alternative to Burp. Though most professionals prefer Burp Professional, ZAP is a quite capable proxy and includes a web application scanner. At this point you should be familiar with Burp Suite; the concepts are the same for ZAP, though the UI is quite different.

For this practice, we’ll be using ZAP’s scanner module. To get a feel for it, first, make sure you’ve got an instance of DIWA running, then simply open ZAP and click “Automated Scan”, put in the URL of your DIWA home page, and click “Attack”.

![A screenshot of ZAP as it opens](/media/uploads/web_security_assessment_ZAP1.png)

![A screenshot of ZAP as the user selects an automated scan. The URL to attack is 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP2.png)

Since DIWA is a small app, this scan should complete rather quickly. If nothing went horribly wrong, you’ll note that ZAP’s scanner found some issues. However, unless ZAP has changed significantly, the ZAP results may be somewhat underwhelming. There may be some small issues that ZAP found and you didn’t, but ZAP should’ve missed most of the big issues you found.

Let’s see if we can improve this. Click the “Quick Start” button in the secondary toolbar, and then the “&lt;” in the pane below. From there, click “Manual Explore”, put in the URL of your DIWA, and then click “Launch Browser”.

![A screenshot of ZAP and the "alerts" box that the service displays at the bottom](/media/uploads/web_security_assessment_ZAP3.png)

![A screenshot of ZAP as it manually explores the page for vulnerable JS libraries](/media/uploads/web_security_assessment_ZAP4.png)

Click around the site a bit, and make sure that when you’re done you’re logged into the site as an administrative user. Now, go back to ZAP and launch a scan by right-clicking the DIWA site in the left bar and launching an active scan with the default setup.

![A screenshot of ZAP as the user rights clicks on a site, and selects "attack" and "active scan"](/media/uploads/web_security_assessment_ZAP5.png)

![A screenshot of ZAP as the user gets ready to run an active scan on 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP6.png)

This scan should take significantly longer and give significantly different better results. Why did this happen? Launching the scan from a site you’ve visited in the “Sites” section gives the scanner a lot more information than the fully automated scan gets. In fact, the results you get from the scanner may differ greatly based on how you manually explore the site prior to running the scan.

Play around manually using the site and running scans a bit, and then compare the results from ZAP to the ones you obtained from manual testing.

- What issues did ZAP find that you did not?
- What issues did you find that ZAP did not?

Think about these. As part of skill validation, we’ll return to these lists.

### Exploitation Tools

The next class of automation we’ll cover in the subtopic is tools that aid in exploitation after you’ve found a vulnerability. While there exist several tools for this, the one most commonly used in web application security assessments is [sqlmap](https://sqlmap.org/). sqlmap is capable of detecting SQL injection of websites, but it truly shines in exploitation. Some blind SQL injection data extraction techniques can take several seconds to extract a single bit of information from a database. sqlmap can automate and optimize most forms of SQLi exploitation, saving you a ton of time.

The typical standalone use of sqlmap is to save the request that you used to identify SQL injection to a text file, and then [run sqlmap with that text file](https://github.com/sqlmapproject/sqlmap/wiki/Usage#load-http-request-from-a-file) using the -r flag. You would then specify the parameter to test with the -p flag, and then choose what data you wished to extract. Generally, it’s best to start with the -b option to simply retrieve the database information. sqlmap will attempt to confirm that the specified parameter is vulnerable to SQLi, and then choose a data extraction technique that allows it to extract data as efficiently as possible. It may be that data extraction is quite slow, in which case you should be careful about how much data you try to extract.

It’s worth noting that if you find several SQLi vulnerabilities in a site, they may allow for very different data extraction speeds. Any SQLi vulnerability that results in data from the database being included in the HTTP response will be much faster than one that only results in a success or failure (as in a login page).

An alternative to using sqlmap standalone is to use a proxy integration to run sqlmap directly from your proxy, such as with the [SQLiPy extension for Burp](https://portswigger.net/support/using-burp-with-sqlmap). This generally speeds up sqlmap configuration and saves you a few trips back and forth from the sqlmap documentation.

#### Using sqlmap

From the setup subtopic, you should have sqlmap installed and also a copy of DIWA. You should’ve already identified one or more SQLi vulnerabilities in DIWA. Using sqlmap, exploit one of those vulnerabilities to extract the DIWA database structure, and then extract the DIWA user database.

Note that sqlmap has capabilities and configuration options beyond what’s discussed here. Be sure to check out [the documentation](https://github.com/sqlmapproject/sqlmap/wiki/) for usage options.

### Web application specific vulnerability scanners

For purposes of this subtopic, we’re using the words “vulnerability scanner” to mean a tool that uncovers previously known vulnerabilities as opposed to a tool that automatically discovers new vulnerabilities. Examples of the former include tools such as Nessus and OpenVAS, while the latter include the scanner built into Burp Pro and ZAP.

While Nessus and OpenVAS try to be able to detect a wide range of vulnerabilities, others specialize. For instance, Nikto is a tool that attempts to find web servers configuration errors specifically. While Nikto has not been updated in years, and has generally been superseded by general-purpose vulnerability scanners, there’s one specific web application vulnerability scanner that stands out. It’s called WP Scan, and it’s focused on finding vulnerabilities in WordPress sites. Since WorsPress enjoys great popularity among civil society and independent journalism websites, it’s useful to cover in this learning path.

WPScan started out as open source software, and the [command-line version](https://github.com/wpscanteam/wpscan) still is, although there are [commercial options](https://wpscan.com/pricing/) for those who want other features. WPScan works in essentially the same way as other vulnerability scanners. Simplified, it sends requests to a server and tries to determine what versions of software are installed on that server. It then compares those versions to a database of vulnerabilities.

🛠️ Download [DVWP](https://github.com/vavkamil/dvwp) (you’ll want to use Docker to deploy it). If you’re on an Apple Silicon mac, you may have to add “platform: linux/amd64” to each service in the docker-compose.yml file.

Then use the WPScan CLI to find vulnerabilities on the site. If you installed WPScan via Docker on Mac or Windows, you won’t be able to use 127.0.0.1:31337 to reference DVWP for WPScan. This is because Docker is running in a VM, and the VM’s 127.0.0.1 is the VM, not your computer. Instead, find your computer’s LAN IP address (e.g. 196.168.0.xxx, 10.xxx.xxx.xxx, etc) and use that.

Although it’s not required, you’ll probably want to [sign up for an API key on the WPScan website](https://wpscan.com/register/) and use the key when scanning. If you don’t specify an API key, WPScan will identify the versions of WordPress and its plugins and let you know which ones are out of date. If you use the API key, it will tell you what vulnerabilities exist in the site.

## Skill Check

Discuss your use of ZAP’s scanner and sqlmap on DIWA with your mentor. Why did you find things that ZAP didn’t, and vice versa? Explain to them how you plan on using automation to help you test websites going forward?

الموضوع الفرعي 7: اكتشاف الثغرات التلقائي
حالة استخدام
يركّز مسار التعلّم هذا على الاكتشاف اليدوي للثغرات في تطبيقات الويب، وهذه المهارة ضرورية لفهم الثغرات وتمنحك أيضًا الأدوات اللازمة للعثور عليها في أي موقع. لكن هناك العديد من الأدوات التي يمكن أن تُساعد في اكتشاف الثغرات الأمنية واستغلالها في تطبيقات الويب، لكن لهذه الأدوات لها مزايا وعيوب على حد سواء ومن الأفضل استخدامها بالاقتران مع الاختبار اليدوي. يستعرض هذا الموضوع الفرعي عددًا من الأدوات المتاحة مجانًا وكيفية استخدامها بفعالية.
الأهداف 

بعد الانتهاء من هذا الموضوع الفرعي سيتمكن الممارسون من معرفة كيف ومتى يستخدمون مختلف أدوات فحص الثغرات لتطبيقات الويب بشكل مناسب، بما في ذلك:
أداة المسح زد أتاك بروكسي (ZAP scanner)
إس كيو إل ماب (sqlmap)
واجهة سطر أوامر دبليو بي سكان (WPScan)
العرض 
يستكشف هذا الموضوع الفرعي ثلاث فئات من أدوات أتمتة تطبيقات الويب، كما سيناقش ما تفعله وما تجيده وما لا تجيده وكيفية تحقيق أقصى استفادة منها، وسنقسم المساحة إلى ثلاث فئات عامة:
أدوات الفحص التلقائية لتطبيق الويب
أدوات الاستغلال
ماسحات الثغرات في تطبيقات الويب
أدوات فحص الثغرات في تطبيق الويب
تشمل هذه الفئة الأولى الأدوات التي تفعل ذات الأمور التي يفعلها البشر للعثور على نقاط ضعف جديدة في تطبيقات الويب، حيث تفحص الموقع وتعثر على المدخلات وترسل البيانات الضارة إلى تلك المدخلات وتحاول اكتشاف متى تسببت هذه البيانات في ثغرة أمنية. ومن الأمثلة على هذا النوع من أدوات فحص تطبيقات الويب هي زد أتاك بروكسي من سوفتوير سيكيوريتي بروجكت ولكن هناك العديد من الأمثلة الأخرى بما في ذلك ماسح بيرب برو (Burp Pro) وإتش سي إل آب سكان (HCL AppScan)، وما إلى ذلك.
عادةً ما تعمل هذه الأدوات عن طريق "تتبع الارتباطات" أولاً على موقع الويب المستهدف حيث ستتبع كل رابط في كل صفحة وتحاول إنشاء خريطة كاملة للموقع. بعد ذلك ستعثر على كل معلمة تم إرسالها إلى الخادم وتستبدل تلك المعلمة ببدائل "عشوائية" مختلفة. ومع عودة كل استجابة ستبحث أداة المسح عن الخصائص التي تُشير إلى نجاح الهجوم. على سبيل المثال، قد يقوم محرك المسح باستبدال معلمة بما يلي`<script>var xyz="abc";</script>`. عندما تعود استجابة بروتوكول نقل النص التشعبي، ستقوم أداة المسح بتحليل لغة تمييز النص التشعبي للصفحات وإذا رأت عنصر البرنامج النصي ذلك في شكل كتلة جافا سكريبت في الصفحة ستعلم أن الإدخال معرض لثغرة البرمجة النصية عبر المواقع.
نقاط قوة أدوات المسح
يستخدم الناس ماسحات تطبيقات الويب لسبب وجيه، فهي تجد الثغرات بسرعة وفعالية. وسيقوم فاحصوا أمان تطبيقات الويب ذوي الخبرة باستخدام الماسحات كجزء من تقييماتهم بغض النظر عن سنوات خبرتهم العديدة، حيث توجد بعض الأشياء التي تُجيدها ماسحات تطبيقات الويب.
تتمثل القوة الأكبر لهذه الأدوات في العثور على ثغرات المتعلقة بالتحقق من صحة البيانات. تُعدّ الماسحات ممتازة في العثور على مشكلات التحقق من صحة البيانات السائدة مثل البرمجة النصية عبر المواقع وحقن لغة الاستعلامات البنيوية، ولكن أيضًا المشكلات غير المشهورة مثل حقن البروتوكول الخفيف لتغيير بيانات الدليل (LDAP) وتحويل لغة صفحات الأنماط الموسعة (XSLT) وما إلى ذلك، وأسباب ذلك بسيطة. 
لا تتعب الماسحات أو تشعر بالملل ويمكنها تقديم آلاف الطلبات دون أن "تفقد التركيز".
يمكن للماسحات تجربة كل إدخال ممكن تمت برمجتها عليه بما في ذلك رؤوس مرجع بروتوكول نقل النص التشعبي وملفات تعريف الارتباط والمعلمات الإضافية المضافة بشكل تعسفي إلى نهايات عناوين مواقع الويب وما إلى ذلك.
تحتوي الماسحات على مكتبات ضخمة من الاختبارات لتجربة الكثير من الصيغ البديلة لكل هجوم محتمل.
من السهل عمومًا التعرّف على ثغرات في التحقق من صحة البيانات، مع مطابقة بسيطة للأنماط أو تحليل سلوكي يسهل اكتشافه برمجيًا.
تستخدم بعض الماسحات حتى سلاسل بيانات عشوائية فريدة لكل إدخال بحيث يمكنها اكتشاف الإدخال الذي تم في مكان واحد وعرضه في مكان آخر، وبشكل عام يجب أن يجد الذي تم تكوينه بشكل صحيح المزيد من مشكلات التحقق من صحة البيانات خلال فترة زمنية أقل من إنسان عالي المهارة.
من المجالات الأخرى التي تتفوق فيه الماسحات هو العثور على مشكلات التكوين وبالأخص تلك الموجودة في مجموعة فرعية صغيرة فقط على الموقع. في حال كان الموقع يستخدم رموز تزييف طلب المواقع المشتركة في كل شكل، ولكن نسي المطورون ذلك في أحد أقسام الموقع، فمن المرجح أن يتجاهل الفاحص البشري هذا الخطأ، ولكن من شبه المؤكد أن أداة المسح ستجد الرمز المفقود وتُبلغ عنه. كما هو الحال مع التحقق من صحة البيانات، تحتوي الماسحات على قواعد ضخمة من الاختبارات تُطبق على كل طلب واستجابة.
نقاط ضعف أداة المسح
على الرغم من نقاط قوتها تعاني أدوات المسح أيضًا من نقاط ضعف متعددة، ولكن بعض الحالات قد لا يكون من المناسب حتى استخدام أداة مسح لاختبار مواقع معينة. وفيما يلي بعض أكبر المشكلات المتعلقة بماسحات تطبيقات الويب.
اكتمال الفحص
هناك العديد من المشكلات من المحتمل أن تُعاني منها طريقة عمل الماسحات والتي قد تتسبب في عدم اكتمال اختبار كامل على الموقع في الوقت المناسب.
أولها هي أن العديد من المواقع تتطلب من المستخدمين تسجيل الدخول، ويمكن تكوين الماسحات باستخدام معرّف جلسة تم تسجيل الدخول إليه أو باستخدام برنامج نصي يُقدم نموذج تسجيل دخول أو طرق مصادقة أخرى. يمكن أيضًا تهيئتها للكشف عن وقت تسجيل خروجها من الموقع، ولكن غالبًا ما يكون هذا التكوين عُرضة للخطأ. إذا تم تكوين أداة المسح بشكل غير صحيح، فقد لا تقوم بتتبع ارتباطات كامل الموقع أو قد لا تكتشف متى تم تسجيل خروجه دون أن استكمال الاختبار بشكل صحيح. في الحالات الشديدة قد تحتوي المواقع على ميزات مضادة للأتمتة تجعل المسح مستحيلًا تقريبًا.
وهناك مشكلة أخرى تتمثل بأن الماسحات لا تُميز دائمًا بين الصفحات المختلفة تمامًا مقابل الصفحات التي تبدو مختلفة فحسب. على سبيل المثال، في منتدى عبر الإنترنت من السهل على الإنسان أن يرى أن كل سلسلة على منتدى هو في الحقيقة الصفحة الأساسية ذاتها مع بيانات مختلفة. لكن قد تكتشف أداة المسح التلقائية أن سلسلتين هما صفحتا ويب مختلفتان تمامًا وأنه يجب اختبارهما بشكل منفصل، وفي المواقع الكبيرة قد تواجه الماسحات مشاكل في بعض الأحيان في اختبار صفحة واحدة تبدو وكأنها صفحات مختلفة بالنسبة لأدوات المسح وتقضي ساعات أو أيامًا في إجراء اختبارات مكررة.
ومن ناحية أخرى قد تكون هناك صفحات أو معلمات لا تكتشفها أداة تتبع الارتباطات لسبب أو لآخر، وإذا لم تكتشف أداة المسح معلمة أو فاتته أقسام من الموقع، فمن البديهي أنه من المحتمل أن يُفوّت ثغرات متعلقة بتلك الصفحات أو المعلمات.
يمكن حل جميع هذه المشكلات من خلال المراقبة الدقيقة لسلوك أداة المسح وتغيير تكوينات المسح، وفي حين أنه من الممكن تمامًا توجيه أداة مسح إلى موقع ويب وتشغيل الفحص، من المهم إكمال اختباري الاكتشاف والمصادقة على الأقل قبل بدء الفحص لأجل الوصول إلى أفضل النتائج.
الآثار السلبية لأداة المسح
تتمثل إحدى نقاط قوة أداة المسح في أنها تعمل بسرعة كبيرة، ولكن يمكن أن تُسبب هذه القوة مشاكل. 
إذا تسبب إرسال طلب ما بتنفيذ إجراء ما خارج الموقع، فقد تقوم أداة المسح بتنفيذ هذا الإجراء آلاف المرات، وقد تشمل الأمثلة على التأثيرات الخارجية إرسال رسالة نصية قصيرة (والتي قد تُكلف مالك الموقع أموالًا) أو إرسال بريد إلكتروني (فتخيل أن يفتح شخص ما بريده الوارد ليرى عشرات الآلاف من رسائل البريد الإلكتروني)، وطباعة تذكرة طلب في مستودع وما إلى ذلك.
كذلك الأمر من حيث عدم امتلاك بعض المواقع الموارد اللازمة لمواكبة أداة المسح، وبالنظر إلى عدد المرات التي تتعرض فيها مواقع الإعلام المستقلة ومواقع المجتمع المدني لهجمات حجب الخدمة فقد يكون هذا أمرًا من المهم اكتشافه. ولكن تعطل الموقع سيمنع إجراء اختبارات الثغرات الإضافية.
يمكن التخفيف من حدة كلا هذين الأمرين جزئيًا من خلال المناقشات مع مالك الموقع ومن خلال الانتباه أثناء اختبار الاكتشاف وتكوين أداة المسح بشكل صحيح، فعلى سبيل المثال، تحتوي جميع الماسحات الرئيسية على طرق لاستبعاد صفحات معينة من عمليات المسح وللتحكم في مدى سرعة المسح. ولكن لا يمكن أبدًا تجاهل خطر تأثير أداة المسح على الموقع أو الأنظمة المرتبطة به.
الثغرات التي لا تُجيد الماسحات اكتشافها
في حين تُجيد الماسحات اكتشاف بعض أنواع الثغرات الأمنية إلا أن هناك أنواعًا أخرى يكاد يكون من المستحيل اكتشافها. 
يُعدّ من بين أهمها ثغرات منطق العمل الحقيقية، حيث تقوم الماسحات فقط بتنفيذ البرامج النصية ولا "تفهم" كيفية عمل المواقع، ولن تفهم أي أداة مسح أهمية خطأ التقريب في التحويلات المالية أو أهمية حذف حقل يُفترض أن يكون مطلوبًا في نموذج.
وبهذا السياق لا تميل الأدوات الآلية إلى إجادة اكتشاف ثغرات التخويل، وعلى الرغم من وجود مجموعة متنوعة من الأدوات للمساعدة في اختبار التخويل لا تكتشف الماسحات عمومًا تلقائيًا أنواع الثغرات الأمنية هذه. 
النتائج الإيجابية الخاطئة والنتائج التي لا تكوّن ثغرات
قد تنتج الماسحات أيضًا الكثير من النتائج غير المفيدة، ففي بعض الحالات قد يكون البرنامج النصي للكشف عن الثغرة الأمنية غير كامل مما يؤدي إلى قيام أداة المسح بالإبلاغ عن مشكلة في حالة عدم وجودها. وفي حالات أخرى قد تقوم أداة المسح بالإبلاغ عن أشياء قد يعتقد مؤلف الأداة أنها مثيرة للاهتمام أو ذات قيمة ولكنها ليست مهمة في سياق الموقع الذي تختبره.
في جميع الحالات عليك إعادة تكرار نتائج أداة المسح يدويًا وفهمها تمامًا قبل إضافتها إلى تقريرك. 
استخدام الماسحات بشكل فعّال
بشكل عام يجد ممارسو تقييم أمان تطبيقات الويب أنه من الأكثر فعالية استخدام الأداة من عدمها، ونظرًا لأن نقاط قوتها مقنّعة للغاية، يستحق الأمر قضاء الوقت لتكوين عمليات المسح ومراقبتها.
في جميع الحالات عليك إكمال الاكتشاف والمصادقة قبل استخدام أداة المسح. بما أنك جديد في هذا المجال، عليك التدرب على استخدام أداة مسح على مواقع ويب مختلفة وقراءة وفهم خيارات تكوين أداة المسح ومؤشرات التقدم، لذا حاول فهم كيفية عمل الموقع قبل إطلاق الماسح عليه.
سيقوم بعض الممارسين بمسح الصفحات بشكل فردي متخطين مرحلة "تتبع ارتباطات" ضمن المسح، ويسمح ذلك بالتخفيف من العديد من مشكلات المسح ولكنه يفوت أيضًا قدرة متتبع الارتباطات على العثور على المحتوى الذي ربما فاتك، كما أنه يتطلب جهدًا أكبر ولكن يمكن أن يكون فعالًا جدًا في المواقع التي يصعب على أداة المسح الوصول إليها والمواقع الأكثر هشاشة. 
يمكن أيضًا مسح الموقع بأكمله في وقت واحد، ومن الجيد عمومًا استخدام مستخدم تطبيق ويب منفصل لهذا الفحص بحيث لا تتداخل البيانات عديمة الفائدة من الفحص مع اختبارك المنتظم. وتأكد أيضًا من أن الحساب الذي تستخدمه يتمتع بحق الوصول الكامل إلى الموقع. يجب أن تُحاول خلال سير الفحص تحقيق توازن بين مراقبة الفحص عن كثب بما يكفي لملاحظة المشاكل ولكن أيضًا أن تحاول قضاء معظم وقتك في إجراء الاختبار اليدوي.
يجب ألا تعتمد في كلتا الحالتين على أداة المسح بالكامل في اختبار التحقق من صحة البيانات أو أي فئة ثغرة أخرى، فعليك على الأقل إجراء عدة اختبارات على كل مدخل من مدخلات الموقع وإجراء بعض الاختبارات الشاملة على غيرها، حيث قد تواجه أداة المسح مشاكل خفية في اختبار الموقع لا تكون واضحة.
الممارسة: استخدام أداة زد أتاك بروكسي
أداة زد أتاك بروكسي (التابعة لسوفتوير سيكيوريتي بروجكت) هو بديل مفتوح المصدر لبيرب، وبالرغم من تفضيل معظم المحترفين بيرب بروفشنل (Burp Professional)، يبقى زد أتاك بروكسي وكيلًا يفيه الكثير من القدرات ويتضمن أداة مسح لتطبيقات الويب. في هذه المرحلة يجب أن تكون ملمًا ببيرب سويت ومفاهيمه هي ذاتها بالنسبة لأداة زد أتاك بروكسي على الرغم من أن واجهة المستخدم مختلفة تمامًا. 
سنستخدم في هذا التمرين وحدة المسح من أداة زد أتاك بروكسي، ولتتعرف عليها تأكد أولاً من تشغيل نسخة من دي آي دبليو إيه، ثم ببساطة افتح أداة زد أتاك بروكسي وانقر على "الفحص التلقائي (Automated Scan)" وضع عنوان موقع الويب لصفحتك الرئيسية في دي آي دبليو إيه وانقر على "هجوم (Attack)".
 
نظرًا لأن دي آي دبليو إيه تطبيق صغير يجب أن يكتمل هذا الفحص بسرعة نوعًا ما، وإذا لم يحدث أي خطأ فظيع فستلاحظ أن أداة مسح زد أتاك بروكسي وجدت بعض المشكلات. لكن ما لم تتغير أداة زد أتاك بروكسي بشكل كبير فقد تكون نتائج أداة زد أتاك بروكسي مخيبة للآمال إلى حد ما. قد تكون هناك مشكلات صغيرة وجدتها أداة زد أتاك بروكسي لم تجدها أنت ولكن من المفترض أن تكون أداة زد أتاك بروكسي فوتت معظم المشكلات الكبيرة التي وجدتها أنت.
لنرَ ما إذا كان من الممكن تحسينها. انقر على زر "البدء السريع (Quick Start)" في شريط الأدوات الثانوي، ثم على "<" في النافذة أدناه، وبعدها انقر على "استكشاف يدوي (Manual Explore)" ثم ضع عنوان موقع الويب الخاص بدي آي دبليو إيه وانقر على "تشغيل المتصفح (Launch Browser)". 
 
تصفح الموقع قليلاً وتأكد من تسجيل دخولك إلى الموقع بصفة مستخدم مشرف عند الانتهاء. والآن ارجع إلى أداة زد أتاك بروكسي وابدأ المسح بالنقر بزر الماوس الأيمن على موقع دي آي دبليو إيه في الشريط الأيسر وابدأ المسح النشط باستخدام الإعداد الافتراضي.
 
يجب أن يستغرق هذا الفحص وقتًا أطول بكثير وسيعطي نتائج أفضل مختلفة بشكل كبير. لم حصلَ هذا؟ يسمح بدء الفحص من موقع قمت بزيارته في قسم "المواقع" أداة المسح معلومات أكثر بكثير مقارنة بفحص تلقائي بالكامل، وفي الواقع قد تختلف النتائج التي تحصل عليها من أداة المسح اختلافًا كبيرًا استنادًا إلى كيفية استكشاف الموقع يدويًا قبل تشغيل الفحص.
جرّب استخدام الموقع وتشغيل عمليات المسح قليلًا ثم قارن النتائج من أداة زد أتاك بروكسي بالنتائج التي حصلت عليها من الاختبار اليدوي.
ما هي المشكلات التي وجدتها أداة زد أتاك بروكسي ولم تجدها أنت؟
ما هي المشكلات التي وجدتها أنت ولم تجدها أداة زد أتاك بروكسي؟
فكر في هذين السؤالين، ريثما نعود إلى سرد قوائمهما ضمن قسم التحقق من المهارة.
أدوات الاستغلال
الفئة التالية من الأتمتة التي سنغطيها في الموضوع الفرعي هي الأدوات التي تساعد في الاستغلال بعد العثور على ثغرة أمنية، وفي حين أن هناك العديد من الأدوات لهذا الغرض، فإن الأداة الأكثر استخدامًا في تقييمات أمان تطبيقات الويب هي إس كيو إل ماب وهي أداة قادرة على اكتشاف حقن لغة الاستعلامات البنيوية لمواقع الويب ولكنها تتألق حقًا في الاستغلال. قد تستغرق بعض تقنيات استخراج بيانات حقن لغة الاستعلامات البنيوية العشوائية عدة ثوانٍ لاستخراج معلومة من قاعدة بيانات. لكن يمكن لأداة إس كيو إل ماب أتمتة وتحسين معظم أشكال استغلال حقن لغة الاستعلامات البنيوية مما يوفر لك الكثير من الوقت. 
يتمثل الاستخدام المستقل النموذجي لأداة إس كيو إل ماب في حفظ الطلب الذي استخدمته لتحديد حقن لغة الاستعلامات البنيوية في ملف نصي ثم تشغيل إس كيو إل ماب مع هذا الملف النصي مع استخدام علامة r-، ويمكنك بعدها تحديد المعلمة التي ترغب باختبارها باستخدام علامة p- ثم اختيار البيانات التي ترغب في استخراجها. بشكل عام من الأفضل البدء بخيار b- لاسترداد معلومات قاعدة البيانات ببساطة حيث ستحاول أداة إس كيو إل ماب التأكد من أن المعلمة المحددة عرضة لحقن لغة الاستعلامات البنيوية، ثم اختر تقنية استخراج بيانات تسمح لها باستخراج البيانات بأكبر قدر ممكن من الكفاءة. وقد يكون استخراج البيانات بطيئًا للغاية وفي هذه الحالة يجب أن تكون حذرًا بشأن مقدار البيانات التي تحاول استخراجها. 
تجدر الإشارة إلى أنه إذا وجدت العديد من ثغرات حقن لغة الاستعلامات البنيوية في موقع ما فقد تسمح بسرعات مختلفة جدًا لاستخراج البيانات وستكون أي ثغرة حقن لغة الاستعلامات البنيوية تؤدي إلى التسبب بتضمين بيانات من قاعدة البيانات في استجابة بروتوكول نقل النص التشعبي أسرع بكثير من تلك التي تؤدي فقط إلى النجاح أو الفشل (كما هو الحال في صفحة تسجيل الدخول).
من بدائل أداة إس كيو إل ماب بشكل مستقل هو استخدام تكامل الوكيل لتشغيل إس كيو إل ماب مباشرة من الوكيل الخاص بك كما هو الحال في إضافة إس كيو إل آي ب واي (SQLiPy) لأجل بيرب، حيث يؤدي هذا بشكل عام إلى تسريع تكوين إس كيو إل ماب ويوفر عليك بضع رحلات ذهابًا وإيابًا إلى وثائق إس كيو إل ماب.
استخدام أدأة إس كيو إل ماب
من الموضوع الفرعي المتعلق بالإعداد يجب أن يكون تكون أداة إس كيو إل ماب مثبتة ولديك ويجب أن يكون لديك نسخة من دي آي دبليو إيه أيضًا. يجب أن تكون قد حددت بالفعل ثغرة واحدة أو أكثر من ثغرات حقن لغة الاستعلامات البنيوية في دي آي دبليو إيه، وباستخدام الأداة استغل إحدى هذه الثغرات لاستخراج بنية قاعدة بيانات دي آي دبليو إيه ثم استخرج قاعدة بيانات المستخدمين.
لاحظ أن أداة إس كيو إل ماب تتمتع بقدرات وخيارات تكوين تتجاوز ما تمت مناقشته هنا، وتأكد من الاطلاع على الوثائق لمعرفة خيارات الاستخدام.
ماسحات ثغرات محددة في تطبيقات الويب
لأغراض هذا الموضوع الفرعي نستخدم كلمات ماسحات الثغرات لتعني أداة تكشف عن الثغرات الأمنية المعروفة سابقًا بدلاً من أداة تكتشف الثغرات الأمنية الجديدة تلقائيًا، وتتضمن الأمثلة على الأولى أدوات مثل نيسوس (Nessus) وأوبن في إيه إس (OpenVAS)، بينما تشمل الثانية الماسح المدمج في بيرب برو وأداة زد أتاك بروكسي.
بينما تحاول أداتا نيسوس وأوبن في إيه إس كشف مجموعة واسعة من الثغرات، هناك أدوات أخرى متخصصة مثل نايكتو (Nikto) التي تحاول العثور على أخطاء تكوين خوادم الويب على وجه التحديد. وعلى الرغم من أن هذه الأداة لم يتم تحديثها منذ سنوات واستبدلتها عمومًا أدوات مسح الثغرات الأمنية التي تستخدم لأغراض العامة، توجد أداة مسح ثغرات تطبيقات ويب محددة تتميز عن غيره. تُسمى هذه الأداة دبليو بي سكان (WP Scan) وتُركز على العثور على ثغرات في مواقع ووردبرس، ونظرًا لأن هذه المواقع تتمتع بشعبية كبيرة بين المجتمع المدني ومواقع الصحافة المستقلة، فمن المفيد تغطيتها في مسار التعلّم هذا.
بدأت أداة دبليو بي سكان على شكل برنامج مفتوح المصدر ولا يزال إصدار سطر الأوامر منها كذلك ولكن توجد خيارات مدفوعة لأولئك الذين يريدون ميزات أخرى. تعمل أداة دبليو بي سكان بشكل أساسي بنفس طريقة عمل ماسحات الثغرات الأمنية الأخرى، وببساطة تُرسل الطلبات إلى الخادم وتحاول تحديد إصدارات البرامج المثبتة على هذا الخادم ثم تقارن تلك الإصدارات بقاعدة بيانات ثغرات. 
🛠️ قم بتنزيل دي في دبليو بي (ستحتاج إلى استخدام داكر لنشره) وإذا كنت تستخدم جهاز ماك من آبل سيليكون فقد تضطر إلى إضافة "platform: linux/amd64" إلى كل خدمة في ملف docker-compose.yml. 
قم بعدها باستخدم واجهة سطر أوامر دبليو بي سكان للعثور على ثغرات على الموقع، وإذا كنت قد قمت بتثبيت دبليو بي سكان عبر داكر على ماك أو ويندوز، فلن تتمكن من استخدام 127.0.0.1:31337 لتوجيه دي في دبليو ب على دبليو ب سكان. هذا لأن داكر يعمل في جهاز ظاهري ويعد مقابل عنوان 127.0.0.1 في الجهاز الظاهري هو الجهاز الظاهري نفسه وليس جهاز الكمبيوتر الخاص بك. عليك بدلاً من ذلك البحث عن عنوان بروتوكول إنترنت الشبكة المحلية لجهاز الكمبيوتر الخاص بك (على سبيل المثال ×××.196.168.0، ×××.×××.×××.10 وما إلى ذلك) واستخدمه.
 ستحتاج على الأرجح إلى التسجيل للحصول على مفتاح واجهة برمجة التطبيقات على موقع دبليو بي سكان واستخدامه عند المسح على الرغم من أنه هذا الأمر غير مطلوب. إذا لم تحدد مفتاح واجهة برمجة التطبيقات ستقوم أدأة دبليو بي سكان بتحديد إصدارات ووردبرس وملحقاته وستخبرك بالإصدارات القديمة، وإذا استخدمت مفتاح واجهة برمجة التطبيقات سيخبرك عن الثغرات الموجودة في الموقع.
موارد التعلّم
اختبار مهارة
ناقش استخدامك لأداة زد أتاك بروكسي للمسح إس كيو إل ماب على دي آي دبليو إيه مع مرشدك. لماذا وجدت أشياء لم تجدها أداة زد أتاك بروكسي، ولماذا العكس أيضًا؟ اشرح له كيف تخطط لاستخدام الأتمتة لمساعدتك في اختبار مواقع الويب من الآن فصاعدًا؟


## Learning Resources

{{% resource title="Web crawler" languages="47 languages" cost="Free" description="An overview of what a web crawler is and what it does." url="https://en.wikipedia.org/wiki/Web_crawler" %}}

{{% resource title="Usage" languages="English" cost="Free" description="A guide on how to use sqlmap." url="https://github.com/sqlmapproject/sqlmap/wiki/Usage" %}}

{{% resource title="Using Burp with sqlmap" languages="English" cost="Free" description="Instructions on how to integrate sqlmap with Burp for web application security testing." url="https://portswigger.net/support/using-burp-with-sqlmap" %}}

{{% resource title="WPScan" languages="English" cost="Free" description="An automated tool to scan WordPress sites for security flaws." url="https://github.com/wpscanteam/wpscan" %}}

{{% resource title="Damn Vulnerable WordPress" languages="English" cost="Free" description="A specially designed WordPress installation intentionally vulnerable for testing purposes." url="https://github.com/vavkamil/dvwp" %}}
