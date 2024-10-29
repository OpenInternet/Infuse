+++
style = "module"
weight = 1
title = "Setup"
description = "We introduce and set up some key web security assessment tools"
+++

## Use Case

Effectively testing web applications for security vulnerabilities requires specialized tools, which this subtopic looks at.

The most important of these tools is an intercepting proxy server, which will allow you to directly interact with HTTP data as it flows back and forth between your browser and the target web server. This will let you observe what data is being exchanged and manipulate it without the interference of your browser or any client-side controls that are in place.

There are additional tools that can automatically test websites for certain types of vulnerabilities. These can both speed up testing, and catch certain vulnerabilities that you may have missed.

Finally, there are some tools that will be required for the practical activities in this learning path.

## Objectives

After completing this subtopic, practitioners will have the software and accounts set up to complete the rest of this learning path, and know how to use them, including the following software and SaaS solutions:

- Burp Suite Community Edition
- PortSwigger Academy free account
- ZAP
- WPScan CLI
- Docker

---
## Main Section
### Types of assessment

There are three main approaches for web application security assessment:

1. White-box testing: We have complete access to the application's source code, infrastructure, and documentation. This comprehensive access allows for an in-depth examination to identify vulnerabilities, requiring skills in source code review and understanding application logic. It is the most thorough but time-consuming method.

2. Black-box testing: We start without any knowledge about the application, focusing on discovering information through enumeration. This approach is common in bug bounty programs and requires significant effort in the initial stages to identify potential vulnerabilities.

3. Grey-box testing: This method provides us with limited information about the application, such as authentication methods or framework details, offering a balance between in-depth analysis and external exploration.

Each method is chosen based on the specific context of the assessment, including the information available and the objectives of the engagement.

### Burp Suite

#### What is an intercepting web proxy server?

The primary tool used in web application security assessments is an intercepting [proxy server](https://en.wikipedia.org/wiki/Proxy_server). You may be familiar with other types of proxies such as:

- [squid](http://www.squid-cache.org/), which is mostly used for caching and network access control,
- [BlueCoat](https://en.wikipedia.org/wiki/Blue_Coat_Systems), which is popular for surveillance for corporate compliance (or other competitors), or
- CDN reverse proxies such as those used by [Fastly](https://www.fastly.com/), [CloudFlare ](https://www.cloudflare.com/)or [AWS CloudFront](https://aws.amazon.com/cloudfront/).

Web proxies sit on the network in between a web application and web server, and act on that network traffic.

Web proxies are typically configured as either forward or reverse (transparent) proxies. In a forward proxy, the browser is configured to explicitly use the proxy server. The browser will then send a CONNECT request to the proxy, asking it to forward their request to the real server. Since the web browser tells the proxy which site it’s trying to connect to, forward proxies can make connections to many back-end (origin) websites. This is in contrast to reverse proxies (below). Reverse proxies do not appear to be a proxy server to the browser, but instead masquerade as the server itself. This can be an advantage for clients or applications that do not support proxy servers. Setting up a reverse proxy is typically more involved than a forward proxy, with per-site configuration and DNS changes. Since the browser doesn’t know that the reverse-proxy is even a proxy server, each reverse-proxy can only connect to one back-end (origin) website.

For a further explanation of reverse proxies, check out [this guide](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/).

The kind of proxy used for web application testing most commonly runs on the same computer as the tester’s web browser, though this is not required. That is the type of proxy we will be using in this learning path. The proxy will also perform TLS interception, decrypting network traffic. The key feature of these proxies is allowing the user to visualize, pause, and manually modify network traffic between the browser and server. For example, if the tester submits a form, causing their browser to send a POST request to the server, the proxy will allow the tester to see and modify the full request before it’s actually sent to the server. Different proxy servers may have many more features, such as scripting and automation features, site cataloging, and tools to automatically [fuzz test](https://owasp.org/www-community/Fuzzing) web applications.

Two popular intercepting web proxies used for security assessments are Portswigger’s [Burp Suite](https://portswigger.net/burp), and [SSP](https://softwaresecurityproject.org/)’s [ZAP](https://www.zaproxy.org/). Burp Suite is paid software that comes with a feature-limited Community Edition, while ZAP is open-source. The majority of practice exercises in this learning path are provided by Portswigger, so are written with the use of Burp Suite in mind. However, you may use either proxy (or both). We recommend using Burp Suite Community Edition for most subtopics, but there is a subtopic dedicated to using ZAP for automatic security testing.

#### Setting up Burp Suite Community Edition

To get started with Burp, you must first [download it](https://portswigger.net/burp/releases/community/latest). Once you’ve got it downloaded and installed, open the application. Before you start using Burp, it will prompt you to specify a project and a configuration. Projects let you keep track of your progress testing a site between sessions, but are not supported in the free edition, so just select “Temporary project”. You can also specify different sets of configurations, for now just select “Use Burp defaults.”

![A screenshot of one of Burp Suite's first screens, with "Temporary Project in Memory" selected](/media/uploads/web_security_assessment_burp1.png)

![A screenshot of the next Burp Suite screen, with "Use Burp defaults" selected](/media/uploads/web_security_assessment_burp2.png)

This will take you to the main Burp window. The primary tabs that you’ll be using are the “Proxy” and “Intruder” tabs. For now, switch to the Proxy tab and click the “Open Browser” button. This will open a Chromium instance that’s fully configured to use Burp. This embedded browser is configured to use Burp as its proxy and has its TLS configuration changed to allow Burp to intercept encrypted traffic. You can use this browser instance for testing web applications while you use your normal browser for general browsing.

![A screenshot of Burp Suite, with proxy and intercept enabled](/media/uploads/web_security_assessment_burp3.png)

![A screenshot of the Burp Suite intercept. A web browser has loaded the Internews web page, and the intercept is listing all the requests it makes](/media/uploads/web_security_assessment_burp4.png)

For now, type the URL of any website into Burp’s embedded browser and hit enter. You’ll note that nothing happens in the browser. Switch back to Burp, and you’ll see the HTTP request that the browser sent, and a button lit up that says “Intercept is on.” What has happened is that Burp has received the request from your browser but has not forwarded it to the web server. Instead, it’s allowing you to inspect and modify the request. For now, click the “intercept is on” button to turn off interception. If you look at Burp’s embedded Chromium, you should see the web page loaded. Switch back to Burp, and click the “HTTP History” sub-tab of the Proxy tab. You will see a log of all the HTTP requests that your browser has sent. If you click on one, you can see the full request, and also the response from the server.

![A screenshot of the Burp Suite proxy, collecting HTTP history. The Internews website is in the foreground](/media/uploads/web_security_assessment_burp5.png)

If you want to modify a request that’s already been sent, right-click that request and select “Send to Repeater”. Switch to the Repeater tab, and you will see the request on the left. A good practice is to immediately click the “Send” button to get a normal response. You can then edit the request, and send the edited request. You can use the “&lt;” and “>” buttons to see prior requests and responses. Using the repeater tab is extremely important when performing security assessments, as you will see in the later subtopics.

![A screenshot of the Burp Suite proxy, as it has collected an item of HTTP history and is sending that item to the intruder feature](/media/uploads/web_security_assessment_burp6.png)

One important feature of the Repeater interface is the “URL-encode as you type” feature. This will automatically encode characters as you type them, saving you many mistakes and a lot of time. Depending on what you’re modifying, you will either want this feature on or off. To change the setting, right-click on the Request pane and select the menu item.

![A screenshot of the Burp Suite proxy, as it has collected an item of HTTP history and is sending that item to the repeater feature](/media/uploads/web_security_assessment_burp7.png)

This will get you started with Burp Suite. The free Community Edition is enough for this learning path, although most people who get paid to perform security assessments of websites elect to subscribe to the Professional Edition. Both the free and paid version include a large number of features, which are documented on the [Portswigger website](https://portswigger.net/burp/documentation). You’ll be going much more in depth into Burp in most of the following subtopics (though you can use any proxy you want, if you prefer).

### PortSwigger Academy

For all of the subtopics about vulnerability classes, the vast majority of the reading and exercises are hosted on the PortSwigger Academy. The PortSwigger Academy is a free website that includes reading and lab exercises covering the vast majority of common web security topics. The structure of those topics is a number of web pages that have links to lab exercises within the pages. You will need to use Burp Suite as described above to solve these labs. (Most labs can be solved with any number of intercepting proxies, but some require Burp specifically.)

In the subtopics below, each subtopic will assign a section of reading and labs from the PortSwigger Academy. When you’re completing those assignments, be sure to go through all the pages and complete all of the “apprentice” level labs. You should also attempt all of the “practitioner” level labs, but try not to get hung up on any one lab. If you get stuck on a particular practitioner lab, simply move on, and come back to it before you complete the final skill validation exercise of the learning path.

![A screenshot of PortSwigger academy, demonstrating an XSS proof of concept](/media/uploads/web_security_assessment_PortSwigger_screenshot1.png)

The PortSwigger Academy XSS topic. Be sure to go through all the subtopics. “What is XSS” through “Testing” are all one web page, but each subtopic is its own page.

![A screenshot of PortSwigger academy, demonstrating reflected XSS](/media/uploads/web_security_assessment_PortSwigger_screenshot2.png)

The PortSwigger Academy Reflected XSS subtopic. Note the lab linked towards the bottom of the screenshot.

![A screenshot of PortSwigger academy, demonstrating three labs in the reflected XSS subtopic](/media/uploads/web_security_assessment_PortSwigger_screenshot3.png)

After completing a topic (e.g. XSS), double-check your lab completion by checking the “View all _topic_ labs” link. This will let you see any labs that you missed.

**Try it yourself**

Head over to the [PortSwigger Academy](https://portswigger.net/web-security) and sign up for an account.

**‼️** If you’re feeling stuck on a lab, there are a number of walkthroughs and tutorials [on YouTube](https://www.youtube.com/results?search_query=portswigger+lab+walkthrough) and blogs. Note that following a walkthrough is unlikely to be very beneficial to your learning. If you find yourself needing multiple walkthroughs to get through the labs, you may want to take a step back, re-read the material, then try to carefully re-do some of the labs you previously completed using walkthroughs.

### ZAP

ZAP is an open source alternative to Burp Suite. While it is not as favored among professionals, it does have the distinct advantage of being free and including a web application security scanner. Although the UI is different between ZAP and Burp, the same basic features exist on each.

**Try it yourself**

[Download ZAP](https://www.zaproxy.org/download/), and then go through the Installation, Desktop UI, and Exploring an Application Manually section of the [ZAP getting started guide](https://www.zaproxy.org/getting-started/). We’ll cover ZAP in more depth in the automation subtopic.

### Docker

Docker is a system that allows you to run linux applications in a semi-self contained environment, called containers. Although they aren’t as secure as a full-fledged VM, containers are much more lightweight and flexible. On Windows and Mac, Docker includes a linux VM. For the purposes of this Learning Path, we will be using Docker to allow you to conveniently run full websites on your computer.

**Try it yourself**

[Install Docker Desktop](https://docs.docker.com/desktop/). You should not need to sign up for an account or acquire a commercial license to complete this Learning Path. Note that you have likely completed this as part of the Web Application Security Fundamentals Learning Path.

### sqlmap

While humans can be very good at finding SQL injection vulnerabilities, exploiting those vulnerabilities often involves extremely repetitive work. sqlmap is a SQL injection tool that excels at exploitation. It has scripts that will figure out how to enumerate a database’s structure and extract content from that database using SQL injection. This is very useful both for demonstrating the seriousness of SQL injection vulnerabilities, and for finding other vulnerabilities related to data storage.

**Try it yourself**

Install sqlmap. You can either [download it](https://sqlmap.org/) (it’s Python based) or use something like [Kali’s package](https://www.kali.org/tools/sqlmap/).

### WPScan CLI

Within independent journalism and civil society, many media outlets use WordPress to share their content. WordPress is complicated software with many plug-ins and configuration options which can have large security impacts. As part of the automation subtopic, we’ll be using an open-source tool called WPScan to find security weaknesses in a WordPress site.

**Try it yourself**

[Install the WPScan CLI](https://github.com/wpscanteam/wpscan). Note that this can be done from source, from a package manager (such as homebrew or rubygems), as a Docker container, or by using the version included in many penetration testing VM distributions such as Kali Linux. Which you choose is up to you. We’ll cover WPScan in the automation subtopic.

## Practice

Make sure that you have installed and set up the following tools, which we’ve also listed above:

- Burp Suite (Community Edition works)
- ZAP
- Docker Desktop
- sqlmap
- WPSCan CLI

الموضوع الفرعي 1: الإعداد
حالة استخدام
يتطلب الاختبار الفعّال لتطبيقات الويب للكشف عن الثغرات الأمنية أدوات متخصصة وهو ما يتطرق إليه هذا الموضوع الفرعي.

تُعدّ أهم هذه الأدوات هي خادم وكيل اعتراض سيسمح لك بالتفاعل مباشرة مع بيانات بروتوكول نقل النص التشعبي أثناء تدفقها ذهابًا وإيابًا بين متصفحك وخادم الويب المستهدف، وسيتيح لك هذا مراقبة البيانات التي تم تبادلها والتلاعب بها دون تدخل من متصفحك أو أي عناصر تحكم موجودة من جانب العميل.

هناك أدوات إضافية يمكنها اختبار مواقع الويب تلقائيًا لأنواع معينة من الثغرات، مما يمكن أن يؤدي إلى تسريع الاختبار وكشف بعض الثغرات الأمنية التي ربما تكون قد فاتتك. 

أخيرًا هناك بعض الأدوات التي ستكون مطلوبة للأنشطة العملية في مسار التعلّم هذا.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، سيتم إعداد البرامج والحسابات للممارسين لإكمال بقية مسار التعلّم هذا ومعرفة كيفية استخدامها بما في ذلك البرامج وخدمة برمجية الحلول التالية:
بيرب سويت إصدار المجتمع (Burp Suite Community Edition)
حساب مجاني على أكاديمية بورت سويغر (PortSwigger Academy)
أداة زد أتاك بروكسي (Zed Attack Proxy أو ZAP اختصارًا)
واجهة سطر أوامر دبليو بي سكان (WPScan)
داكر (Docker)
العرض 
أنواع التقييم
هناك ثلاثة مناهج رئيسية لتقييم أمان تطبيقات الويب: 
1.     اختبار الصندوق الأبيض: نتمتع بالوصول الكامل إلى شفرة مصدر التطبيق وبنيته الأساسية ووثائقه، ويسمح هذا الوصول الشامل بإجراء فحص متعمق لتحديد الثغرات مما يتطلب مهارات في مراجعة التعليمات البرمجية المصدر وفهم منطق التطبيق، ويُعدّ الطريقة الأكثر شمولاً وأيضًا الأكثر استغراقًا للوقت.
2.     اختبار الصندوق الأسود: نبدأ دون أي معرفة بالتطبيق مع التركيز على اكتشاف المعلومات من خلال التعداد، وهذا النهج شائع في برامج مكافآت كشف الأخطاء ويتطلب جهدًا كبيرًا في المراحل الأولية لتحديد الثغرات المحتملة.
3.     اختبار الصندوق الرمادي: توفر لنا هذه الطريقة معلومات محدودة حول التطبيق مثل طرق المصادقة أو تفاصيل الإطار مما يوفر توازنًا بين التحليل المتعمّق والاستكشاف الخارجي.
يجري اختيار كل طريقة بناءً على السياق المحدد للتقييم بما في ذلك المعلومات المتاحة وأهداف المشاركة.
بيرب سويت (Burp Suite)

ما هو خادم وكيل الويب المعترض؟

الأداة الأساسية المستخدمة في تقييمات أمان تطبيقات الويب هي خادم وكيل اعتراض، وقد تكون على دراية بأنواع أخرى من الوكلاء مثل:
سكويد (squid) الذي يستخدم في الغالب للتخزين المؤقت والتحكم في الوصول إلى الشبكة 
بلو كوت (BlueCoat) الذي يشتهر بمراقبة امتثال الشركات (أو المنافسين الآخرين)، أو
الوكلاء العكسيون لشبكة توصيل المحتوى مثل تلك المستخدمة من قبل فاستلي (Fastly) أو كلاود فلير (CloudFlare)أو إيه دبليو إس كلاودفرنت (AWS CloudFront). 
يأتي وكلاء الويب على الشبكة بين تطبيق الويب وخادم الويب ويؤثران على حركة مرور الشبكة هذه.

عادةً ما يجري ضبط وكلاء الويب ليكونوا إما وكلاء أماميين أو وكلاء عكسيين (وكيل شفاف). في حالة الوكيل الأمامي يجري تكوين المتصفح لاستخدام الخادم الوكيل بشكل صريح، ويقوم المتصفح بعدها بإرسال طلب اتصال إلى الوكيل ويطلب منه إعادة توجيه طلبه إلى الخادم الحقيقي. نظرًا لأن متصفح الويب يخبر الوكيل بالموقع الذي يحاول الاتصال به يمكن للوكلاء الأماميين إجراء اتصالات بالعديد من مواقع الويب الخلفية (الأصلية)، وهذا على النقيض من الوكلاء العكسيين (أدناه). لا يظهر الوكلاء العكسيون بشكل خادم وكيل للمتصفح ولكن بدلاً من ذلك يتظاهر بأنه الخادم نفسه، ويمكن أن تكون هذه ميزة للعملاء أو التطبيقات التي لا تدعم الخوادم الوكيلة. عادةً ما يكون إعداد وكيل عكسي أمرًا يتطلب مشاركة أكبر مقارنة بالوكيل الأمامي مع تكوين لكل موقع وتغييرات نظام أسماء المجالات. نظرًا لأن المتصفح لا يعرف أن الوكيل المعكوس هو خادم وكيل حتى، يمكن لكل وكيل عكسي أن يتصل فقط بموقع ويب واحد خلفي (الأصل).

لأجل توضيح إضافي للوكلاء العكسيين، اطلع على هذا الدليل.

يعمل نوع الوكيل المستخدم لاختبار تطبيقات الويب بشكل شائع على ذات كمبيوتر متصفح الويب الخاص بالشخص الفاحص ولكن ليس هذا أمرًا مطلوبًا، وهذا هو نوع الوكيل الذي سنستخدمه في مسار التعلّم هذا. كما سيقوم أيضًا باعتراض بروتوكول أمان طبقة النقل وفك تشفير حركة مرور الشبكة. تُعدّ الميزة الرئيسية لهذه الوكلاء هي سماحها للمستخدم بمشاهدة رسم بياني لحركة مرور الشبكة بين المتصفح والخادم وإيقافها مؤقتًا وتعديلها يدويًا. على سبيل المثال إذا أرسل مجري الاختبار نموذجًا تسبب بقيام متصفحه بإرسال طلب بوست (POST) إلى الخادم، فسيسمح الوكيل للشخص الفاحص بمشاهدة الطلب الكامل وتعديله قبل إرساله فعليًا إلى الخادم. قد تحتوي خوادم الوكيل المختلفة على العديد من الميزات، مثل ميزات التعليمات البرمجة والأتمتة، وفهرسة الموقع، وأدوات للفحص الترجيحي لتطبيقات الويب تلقائيًا.

هناك وكيلان شائعان لاعتراض الويب يُستخدمان للتقييمات الأمنية وهما بيرب سويت من بورت سويغر وأداة زد أتاك بروكسي  من سوفتوير سيكيوريتي بروجكت (Software Security Project أو اختصارًا SSP). بيرب سويت هو برنامج مدفوع يأتي مع إصدار مجتمع محدود الميزات في حين أن زد أتاك بروكسي مفتوح المصدر. تتوفر غالبية تمارين الممارسة في مسار التعلّم هذا من بورت سويغر لذلك يتم كتابتها مع وضع استخدام بيرب سويت في الاعتبار، ولكن يمكنك استخدام أي من الوكيلين أو كليهما. نوصي باستخدام بيرب سويت إصدار المجتمع لمعظم المواضيع الفرعية ولكن هناك موضوع فرعي مخصص لاستخدام أداة زد أتاك لعملية تلقائية لاختبار الأمان.

إعداد بيرب سويت الإصدار المجتمعي
لبدء استخدام بيرب عليك أولًا تنزيله ثم قم بتثبيت التطبيق وفتحه. قبل البدء في استخدام بيرب، سيطلب منك تحديد مشروع وإجراء تكوين، وتتيح لك المشاريع تتبع تقدمك في اختبار موقع ما بين الجلسات ولكنها غير مدعومة في الإصدار المجاني لذلك ما عليك سوى تحديد "مشروع مؤقت"، ويمكنك أيضًا تحديد مجموعات مختلفة من التكوينات ولكن حاليًا اختر "استخدام الإعدادات الافتراضية لبيرب (Use Burp defaults)".

 

سينقلك هذا إلى نافذة بيرب الرئيسية حيث ستستخدم علامتي التبويب الأساسيتين "الوكيل" و"الدخيل". في الوقت الحالي انتقل إلى علامة تبويب الوكيل وانقر على زر "فتح المتصفح". سيؤدي هذا إلى فتح مثيل كروميوم (Chromium)الذي تم تكوينه بالكامل لاستخدام بيرب، تم تكوين هذا المتصفح المضمن لاستخدام بيرب كوكيل له وتم تغيير تكوين بروتوكول أمان طبقة النقل للسماح لبيرب باعتراض حركة المرور المشفرة. يمكنك استخدام مثيل المتصفح هذا لاختبار تطبيقات الويب أثناء استخدام المتصفح العادي للتصفح العام.

 

اكتب حاليًا عنوان موقع ويب يخص أي موقع في متصفح بيرب المضمن واضغط على إدخال، وستلاحظ أنه لا يحدث شيء في المتصفح. انتقل مرة أخرى إلى بيرب وسترى طلب بروتوكول نقل النص التشعبي الذي أرسله المتصفح وسيضيء زر يقول "الاعتراض قيد التشغيل". ما حدث هو أن بيرب قد تلقى الطلب من متصفحك ولكنه لم يُعِد توجيهه إلى خادم الويب. بدلاً من ذلك يسمح لك بفحص الطلب وتعديله، ولكن في الوقت الحالي انقر على زر "تشغيل الاعتراض (intercept is on)" لإيقاف الاعتراض. وإذا نظرت إلى كروميوم المضمن في بيرب فسترى صفحة الويب محملة. انتقل مرة أخرى إلى بيرب وانقر على علامة التبويب الفرعية "تاريخ بروتوكول نقل النص التشعبي" في علامة تبويب الوكيل، سترى سجلًا لجميع طلبات بروتوكول نقل النص التشعبي التي أرسلها متصفحك وإذا نقرت على إحداها يمكنك رؤية الطلب الكامل وكذلك الاستجابة من الخادم. 

 

إذا كنت ترغب في تعديل طلب تم إرساله بالفعل، انقر بزر الماوس الأيمن على هذا الطلب وحدد "إرسال إلى المكرر (Send to Repeater)". انتقل إلى علامة التبويب المكرر (Repeater) وسترى الطلب على اليسار. من المستحسن النقر على الفور على زر "إرسال" للحصول على استجابة طبيعية، ويمكنك بعها تعديل الطلب وإرساله بعد التعديل. يمكنك استخدام الزرين "<" و">" للاطلاع على الطلبات والاستجابات السابقة. يعد استخدام علامة تبويب المكرر أمرًا بالغ الأهمية عند إجراء تقييمات الأمان كما سيتضح من المواضيع الفرعية اللاحقة.
  z
إحدى الميزات المهمة لواجهة المكرر هي ميزة "ترميز عنوان بروتوكول عنوان موقع ويب أثناء الكتابة"، مما سيؤدي تلقائيًا إلى ترميز الأحرف أثناء كتابتها مما يوفر لك العديد من الأخطاء والكثير من الوقت. حسب ما تقوم بتعديله ستضطر إما إلى تشغيل هذه الميزة أو إيقاف تشغيلها، ولتغيير الإعداد انقر بزر الماوس الأيمن على نافذة الطلب واختر عنصر القائمة.



سيسمح ذلك لك بالبدء باستخدام بيرب سويت، ويكفي الإصدار المجتمعي المجاني لمسار التعلّم هذا، لكن معظم الأشخاص الذين يتقاضون أجورًا لقاء إجراء تقييمات أمنية لمواقع الويب يختارون الاشتراك بالإصدار الاحترافي. يتضمن كل من الإصدار المجاني والمدفوع عددًا كبيرًا من الميزات التي تم توثيقها على موقع بورت سويغر. ستتعمق أكثر في بيرب في معظم المواضيع الفرعية التالية (على الرغم من أنه يمكنك استخدام أي وكيل تريده إذا كنت تفضل ذلك).
أكاديمية بورت سويغر
بالنسبة لجميع المواضيع الفرعية حول فئات الثغرات، يمكن العثور على الغالبية العظمى للقراءة والتمارين في أكاديمية بورت سويغر، وهي موقع ويب مجاني يتضمن تمارين القراءة والمخابر التي تغطي الغالبية العظمى من مواضيع أمان الويب الشائعة.  تُناقش هذه المواضيع في عدد من صفحات الويب التي تحتوي على روابط لتمارين المخابر ضمن الصفحات. ستحتاج إلى استخدام بيرب سويت كما هو موضح أعلاه لحل هذه المخابر. (يمكن حل معظم المخابر باستخدام أي عدد من وكلاء الاعتراض ولكن بعضها يتطلب بيرب على وجه التحديد.)

يخصص كل واحد من المواضيع الفرعية أدناه قسمًا للقراءة والمخابر من أكاديمية بورت سويغر، وخلال استكمال هذه المهام تأكد من مراجعة جميع الصفحات وإكمال جميع مختبرات المستوى "المتدرب". يجب عليك أيضًا تجربة جميع مخابر مستوى "الممارس" ولكن حاول ألا تقضي وقتًا مفرطًا في أي مختبر واحد. في حال علقت في مخبر ممارس معين، ما عليك سوى المضي قدمًا والعودة إليه قبل إكمال تمرين التحقق من المهارات النهائي لمسار التعلّم. 


ضمن موضوع البرمجة النصية عبر المواقع (XSS) على أكاديمية بورت سويغر، تأكد من مراجعة جميع المواضيع الفرعية، حيث تقع أقسام "ما هي البرمجة النصية عبر المواقع (XSS)" حتى "الاختبار" كلها على صفحة ويب واحدة، ولكن لكل موضوع فرعي صفحته الخاصة.


الموضوع الفرعي البرمجة النصية عبر المواقع المنعكسة على أكاديمية بورت سويغر، علمًا أن رابط المخبر موجود في أسفل لقطة الشاشة.


بعد الانتهاء من موضوع ما (مثل البرمجة النصية عبر المواقع)، تحقق مرة أخرى من إكمال المخبر عن طريق التحقق من رابط "عرض جميع مخابر الموضوع"، مما يتيح لك رؤية أي فحوصات مخبرية فاتتك.


جربه بنفسك
 توجه إلى أكاديمية بورت سويغروسجّل حسابًا.
‼️ إذا كنت تشعر بأنك عالق في مخبر ما، يمكنك الاطلاع على عدد من أدلة التوجيه خطوة بخطوة والأدلة التوجيهية على يوتيوب والمدونات، لكن لاحظ أنه من غير المرجح أن يكون اتباع أدلة التوجيه خطوة بخطوة مفيدًا جدًا لتعلمك. إذا وجدت نفسك بحاجة إلى عدة أدلة توجيه خطوة بخطوة كي تجتاز المخابر، فقد ترغب في العودة خطوة إلى الوراء وإعادة قراءة المواد ثم أعد محاولة اجتياز بعض المخابر التي أكملتها سابقًا بحذر مستخدمًا أدلة التوجيه خطوة بخطوة. 
أداة زد أتاك بروكسي
تُعدّ أداة زد أتاك بروكسي بديلًا مفتوح المصدر لبيرب سويت، وعلى الرغم من أنها ليست المفضلة بين المحترفين، إلا أنها تتمتع بميزة كونها مجانية وتتضمن أداة مسح لأمن تطبيقات الويب. على الرغم من أن واجهة المستخدم تختلف بين زد أتاك بروكسي وبيرب تبقى الميزات الأساسية ذاتها موجودة في كل منهما.
جربه بنفسك
 نزّل أداة زد أتاك بروكسي ثم انتقل إلى قسم التثبيت وواجهة مستخدم سطح المكتب وقسم استكشاف التطبيق يدويًا في دليل بدء تطبيق أداة زد أتاك بروكسي، حيث سنغطي أداة زد أتاك بروكسي بتعمّق أكبر في الموضوع الفرعي المتعلق بالأتمتة.
داكر (Docker)
داكر هو نظام يسمح لك بتشغيل تطبيقات لينوكس في بيئة شبه مستقلة تسمى الحاويات، وعلى الرغم من أنها ليست آمنة مثل جهاز ظاهري كامل إلا أنها تتمتع بالخفة والمرونة. يتضمن داكر على نظامي تشغيل ويندوز وماك جهاز لينوكس ظاهري. ولأغراض مسار التعلّم هذا، سنستخدم داكر للسماح لك بتشغيل مواقع الويب الكاملة بسهولة على جهاز الكمبيوتر الخاص بك. 
جربه بنفسك
 ثبّت داكر لسطح المكتب، علمًا أنك لن تحتاج إلى التسجيل للحصول على حساب أو الحصول على ترخيص تجاري لإكمال مسار التعلّم هذا. لاحظ أنه من المحتمل أنك أكملته كجزء من مسار تعلم أساسيات أمان تطبيقات الويب.
إس كيو إل ماب (sqlmap)
بينما يمكن للبشر أن يكونوا ماهرين جدًا في العثور على ثغرات حقن لغة الاستعلامات البنيوية (اختصارا بالانجليزية: إس كيو إل SQL)، فإن استغلال هذه الثغرات غالبًا ما يتطلب عملاً متكرراً للغاية. يعتبر إس كيو إل ماب أداة لحقن إس كيو إل تتفوق في عملية الاستغلال. تحتوي إس كيو إل ماب على برامج نصية تكتشف كيفية تعداد بنية قاعدة البيانات واستخراج المحتوى من قاعدة البيانات هذه باستخدام حقن لغة الاستعلامات البنيوية، وهو أمر مفيد جدًا لإظهار خطورة ثغرات حقن لغة الاستعلامات البنيوية ولإيجاد ثغرات أخرى تتعلق بتخزين البيانات.

جربه بنفسك
 ثبّت إس كيو إل ماب ويمكنك إما تنزيله (يعمل على بايثون) أو استخدام حزمة كالي.

واجهة سطر أوامر دبليو بي سكان (WPScan)
ضمن مجتمعات الصحافة المستقلة والمجتمع المدني، تستخدم العديد من وسائل الإعلام ووردبريس (WordPress) لمشاركة محتواها، ويُعدّ ووردبريس برنامجًا معقدًا يحتوي على العديد من المكونات الإضافية وخيارات التكوين التي يمكن أن يكون لها تأثيرات أمان كبيرة. كجزء من الموضوع الفرعي للأتمتة، سنستخدم أداة مفتوحة المصدر تسمى دبليو بي سكان للعثور على ثغرات الأمنية في موقع ووردبريس. 
جربه بنفسك
 ثبّت واجهة سطر الأوامر دبليو بي سكان، ولاحظ أنه يمكن القيام بذلك من المصدر أو من مدير الحزم (مثل هومبرو (homebrew) أو روبيجمز (rubygems)) أو كحاوية داكر أو باستخدام الإصدار المضمّن في العديد من توزيعات الجهاز الظاهري لاختبار الاختراق مثل كالي لينوكس. الأمر متروك لك وبإمكانك الاختيار، علمًا أننا سنغطي دبليو بي سكان في الموضوع الفرعي المتعلق بالأتمتة.
موارد التعلّم
الممارسة
تأكد من تثبيت وإعداد الأدوات التالية التي أدرجناها أيضًا أعلاه: 
بيرب سويت (أعمال الإصدار المجتمعي)
أداة زد أتاك بروكسي (Zed Attack Proxy أو ZAP اختصارًا)
داكر لسطح المكتب
إس كيو إل ماب (sqlmap)
واجهة سطر أوامر دبليو بي سكان
اختبار مهارة
لا يوجد اختبار مهارة



## Learning Resources

{{% resource title="PortSwigger Academy" languages="English" cost="Free" description="Collection of explainers and labs on web application security." url="https://portswigger.net/web-security/all-topics" %}}

{{% resource title="What is a reverse proxy?" languages="German, Spanish, French, Italian, Japanese, Korean, Portuguese, Chinese, Taiwanese" cost="Free" description="Overview of reverse proxy compared to forward proxy." url="https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/" %}}

{{% resource title="Proxy server" languages="54 languages" cost="Free" description="Introduction to the concept of a proxy server." url="https://en.wikipedia.org/wiki/Proxy_server" %}}

{{% resource title="Fuzzing" languages="English" cost="Free" description="Simple explanation of fuzzing from OWASP documentation." url="https://owasp.org/www-community/Fuzzing" %}}

{{% resource title="Squid cache" languages="English" cost="Free" description="Proxy software that can be deployed by anyone." url="http://www.squid-cache.org/" %}}

{{% resource title="Commercial proxies and content delivery networks" languages="Many languages, depends on the product" cost="Varied" description="Fastly, Cloudflare, Amazon CloudFront." url="Fastly: https://www.fastly.com/ Cloudflare: https://www.cloudflare.com/ Amazon CloudFront: https://aws.amazon.com/cloudfront/" %}}

{{% resource title="Burp Suite" languages="English" cost="Community version is free, Pro edition costs $449 per user" description="Popular web security testing tool." url="https://portswigger.net/burp" %}}

{{% resource title="ZAP" languages="English" cost="Free" description="Popular security testing tool for web apps." url="https://www.zaproxy.org/" %}}

{{% resource title="Docker Desktop" languages="English" cost="Free" description="Tool to install containers containing executable applications." url="https://docs.docker.com/desktop/" %}}

{{% resource title="sqlmap" languages="English" cost="Free" description="Open source penetration testing tool for SQL injection." url="https://sqlmap.org/" %}}

{{% resource title="WPScan" languages="English" cost="Free" description="Security scanner for WordPress." url="https://github.com/wpscanteam/wpscan" %}}
