+++
style = "module"
weight = 2
title = "Data Validation"
description = "Every web application accepts and processes untrusted input. Here we learn how to discover common vulnerabilities that take advantage thereof"
+++

## حالة استخدام

One way or another, every web application accepts and processes untrusted input. This input usually comes from end users and their browsers but may also come from other websites or backend systems. Depending on where this information flows, the processing of the data may have undesirable effects on the website or its users.

## الأهداف

After completing this subtopic, practitioners will be able to find ways that the format or structure of the data sent to a website may expose and exploit vulnerabilities.

They should also be able to find and exploit the following types of data validation vulnerabilities:

- Cross-site scripting
- SQL injection
- Path traversal
- Command Injection
- Server-side request forgery
- XXE injection
- NoSQL injection

---
## العرض 
### What are data validation vulnerabilities?

As you may remember from the Web Application Security Fundamentals learning path, data validation vulnerabilities can take many forms. In web applications, they are commonly triggered by the presence of certain characters when data is interpreted in a changing context. For example, the characters &lt; or > may be harmless in an application’s code, but can trigger a cross-site scripting vulnerability when put into a web page. The single-quote or space characters may be harmless in a web page or application’s code, but can trigger a SQL injection vulnerability when included in a database query. Generally, for every system involved in a web application (HTML, JavaScript, SQL, filesystems, unix shell, etc) there’s a different type of possible data validation vulnerability.

#### Cross-Site Scripting

Cross-site scripting (usually referred to as XSS) is generally the easiest type of data validation vulnerability to engage with. The inputs and outputs are visible to the tester, and it only requires knowledge of HTML and JavaScript. It is also extremely common, [being found on 1 in 5 websites tested by a major website assessment company](https://venturebeat.com/security/report-50-of-all-web-applications-were-vulnerable-to-attacks-in-2021/). As such, that’s where we’ll be starting.

Head over to the [PortSwigger Academy XSS topic](https://portswigger.net/web-security/cross-site-scripting) and complete the reading and labs.

##### Effective XSS testing

The common thing people do for XSS testing is to put something like `">&lt;script>alert('xss')&lt;/script>` into different request parameters, and wait for a JavaScript pop-up when the page comes back. There are two problems with this.

The first problem is that in a site that has a lot of stored XSS vulnerabilities, you may end up clicking away multiple JavaScript popups on every page you visit. This is annoying, distracting, and will significantly slow down your testing.

The second problem is that if you use the same string for each input, you won’t immediately know what inputs correspond to what outputs. If you have a stored XSS that appears in multiple parts of the site, you may stumble upon your XSS test string somewhere on the site, but not know where it came from.

Instead, you can do something a bit more subtle and informative. One approach is to use a test string like `">&lt;i>xss test - pagename - fieldname&lt;/i>&lt;q z="` where `pagename` and `fieldname` are the page and parameter you’re testing. If you ever see that string in italics in the site, you immediately know that there’s XSS and where the input came from.

##### CORS

A related topic to XSS is vulnerabilities related to cross-origin resource sharing. You may have wondered why JavaScript running on one site can’t interact with another site that a user has open in their browser (say, in another browser window, tab, or even in an iframe). The reason is that all JavaScript in the browser is associated with an _[origin](https://en.wikipedia.org/wiki/Same-origin_policy#Origin_determination_rules)_, which approximately is the same thing as a website. JavaScript on one origin can’t interact with web pages or data on another origin.

There are exceptions to this. The most common of these is called [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS), and it allows a site to allow other sites’ JavaScript to interact with the site. Some examples of this are very useful, for example allowing JavaScript on [www.example.com](http://www.example.com) to interact with api.example.com. Improperly configuring CORS may have the unfortunate effect of allowing attackers to bypass some of the site’s security controls. CORS-related vulnerabilities aren’t data validation vulnerabilities, but it makes sense to learn about them after learning about XSS.

Head over to the [PortSwigger Academy CORS topic](https://portswigger.net/web-security/cors) and complete the reading and labs.

#### SQL Injection

SQL Injection (often shortened to SQLi) has the properties of being relatively common in web applications, and also typically resulting in a complete compromise of the application and its data. While it is a little trickier to find and exploit than XSS, there are a few techniques that make identifying and demonstrating exploitability fairly reliable. Given its importance, this is the next vulnerability class we’ll be focusing on.

Head over to the [PortSwigger Academy SQLi topic](https://portswigger.net/web-security/sql-injection) and complete the reading and labs.

Once you’ve completed the labs, here are a few tips for safely and reliably identifying SQLi.

##### Testing string parameters

A common way to test for SQLi is to go through a site adding `' or 1=1;--` to the ends of parameters. This is suboptimal for a number of reasons. The first is update statements. Consider the following SQL:

{{< highlight sql >}}
update users set password='Password1!' where username='alice'
{{< / highlight >}}

What happens if, for the username, you pass `alice' or 1=1;--` instead of `alice'`?

{{< highlight sql >}}
update users set password='Password1!' where username='alice' or 1=1;--'
{{< / highlight >}}

Oh no! Now every user in the database has the same password. You can never know (unless you’ve _very_ carefully reviewed the source code) where your inputs are going to go, so using <code><em>or</em></code> statements when trying to find SQLi can be quite dangerous.

Even if you don’t overwrite the database with this testing string, it can have other problems. Consider a multi-line query:

{{< highlight sql >}}
select *
  from comments
 where username = 'alice'
   and draft=0
{{< / highlight >}}

When you pass in a username parameter of `alice' or 1=1;--`, the resulting query will be:

{{< highlight sql >}}
select *
  from comments
 where username = 'alice' or 1=1;--'
   and draft=0
{{< / highlight >}}

Note the pesky semicolon in there. It causes the database to interpret the query as first a select query (<code><em>select</em> <em>\*</em> <em>from</em> comments <em>where</em> username <em>=</em> 'alice' <em>or</em> 1<em>=</em>1;</code>), and then an <code><em>and</em></code> query (<code><em>and</em> draft<em>=</em>0</code>). The problem with this is that there is no such thing as an and query, so this will result in an error. It might result in an error for other reasons as well, depending on the database. If the web application gives the same response for a database error as it does for no data (it should), then you won’t know that there is SQLi in the username parameter.

The proper thing to do when testing for SQLi in a string parameter is to make a test parameter that works regardless of the query it’s in. The best thing to do is to use two requests, one that will result in the original data being returned from the query and another that will result in no data from the query. You can then compare the three responses (original, test 1, and test 2). If the original and test 1 return the same response, and test 2 returns a different response, then you’ve identified SQLi. Here is a set of strings you can use:

For test 1, append the following to the parameter: `' and 'a' like '%a`

For test 2, append the following to the parameter: `' and 'a' like '%b`

Here are some example queries with these parameters:

{{< highlight sql >}}
select * from comments where username = 'alice' and 'a' like '%a'
select * from comments where username = 'alice' and 'a' like '%b'
{{< / highlight >}}

Note that the first query will return the same results as if alice was passed as the parameter, and the second will return no rows. Thus there’s no risk of disaster if there's an injectable update or delete statement. Also note that the structure of the query is minimally perturbed, the tests will work even in multi-line queries.

You may be wondering why the examples use the <code><em>like</em></code> operation instead of <code><em>=</em></code>. That’s because the query you’re injecting into may use the like operation. Consider a document search query:

{{< highlight sql >}}
select * from documents where title like '%user text%'
{{< / highlight >}}

The like operation allows wildcard operators, usually the percent sign. The above query will match any documents that contain the string “user text” anywhere in their title; the start, middle, or end. If we just used something like `' and 'a'='a` in our injection, then the test 1 query would be:

{{< highlight sql >}}
select * from documents where title like '%user text' and 'a'='a%'
{{< / highlight >}}

This will return no rows, since “a” is never _equal to_ “a%”. If we use test 1 above, though, the query would be:

{{< highlight sql >}}
select * from documents where title like '%user text' and 'a' like 'a%'
{{< / highlight >}}

Although they are not equal, “a” is _like_ “a%”. Thus, the above test 1 and test 2 should work in almost any string-based situation. Note that if you are testing a search feature, you might also want to try an additional test 1 string: `%' and 'a' like '%a`. Note that in the above queries the original search is slightly changed; it’s missing the % after the user text. If you suspect a like operation is in use, this test 1 string should make up for that.

##### Testing numeric parameters

Sometimes, when the browser passes a numeric value to the web server, the server includes it in a SQL query as a string. However, sometimes, it’s included as a numeric value. Typically, the SQL for a simple lookup of a numeric parameter will be something like:

{{< highlight sql >}}
select * from stories where story_id=5
{{< / highlight >}}

Obviously, sending a story_id of `5' and '1' like '1` isn’t going to work, due to a syntax error. Instead, try sending two requests, one with a story_id of `5`, and another with a story_id of `6-1`. If the second one gives no result, an error, or a different story than the request with a story_id of 5, then there’s no evidence of SQLi. However, if passing a story_id of 6-1 results in the same response as a story_id of 5, then that is strong evidence of SQLi. The query is likely to look like:

{{< highlight sql >}}
select * from stories where story_id=6-1
{{< / highlight >}}

In this example, the database engine is evaluating 6-1 as code, and retrieving the story whose ID is 5. From there, you can proceed to exploitation.

Of course, you can never know exactly what an application is doing to your input, or how it’s being used, but the above tips should significantly enhance the safety and effectiveness of your SQLi hunting.

#### Path Traversal

Path traversal typically occurs in websites that manage user supplied files or administrative interfaces, but can occur anywhere that the server-side web application itself opens files. Depending on what the server does with the files in question, the impact can range from source code disclosure at one extreme, to complete web server takeover on the other. Among modern web applications, the most common places to find path traversal vulnerabilities are blogging software and other content management systems, putting independent journalists and small media organizations particularly at risk.

Head over to the [PortSwigger Academy path traversal topic](https://portswigger.net/web-security/file-path-traversal) and complete the reading and labs.

#### Command Injection

Although command injection is relatively uncommon in modern web applications, it almost universally resultist in a complete compromise of the web application in the event that it is found and exploited. Where it does appear, it’s usually in management interfaces and, to a lesser extent, in content management systems.

Head over to the [PortSwigger Academy command injection topic](https://portswigger.net/web-security/os-command-injection) and complete the reading and labs.

#### Server-side request forgery

The general idea behind server-side request forgery (usually abbreviated as SSRF) is that an attacker can cause the web application’s server to send a HTTP request to any other server. Sometimes the application can display the response back to the client. For years, server side request forgery was considered a rather uninteresting vulnerability. When it was found, it was difficult to exploit in any sort of meaningful way. However, with the advent of cloud computing SSRF has suddenly become a critical issue.

In cloud environments, administrators can assign permissions to virtual servers themselves. This is typically used to grant access to data storage buckets, databases, network services, etc. Usually the resources in question are accessible over the internet, making the server permissions the only access control.

The way these server permissions (sometimes called instance identity, machine keys, service account keys, managed identities, etc.) work is actually quite simple. In a cloud environment, servers are virtual machines running on physical hardware. There is a web service running on the physical server that only accepts network connections from VMs running on the server itself. When it receives a request, it looks up the VM by IP address and retrieves information about the VM, including the customer and permissions role associated with the VM. It then generates cloud credentials for that role and sends them back in the response. Software on the VM can then use those credentials to authenticate to other cloud services.

If an attacker can cause a web application hosted in the cloud to send arbitrary HTTP requests and return the responses, then frequently the attacker can see the server’s cloud instances. If that happens, the attacker can impersonate the web server. One example of this is [the 2019 breach of Capital One](https://blog.appsecco.com/an-ssrf-privileged-aws-keys-and-the-capital-one-breach-4c3c2cded3af), which resulted in the compromise of sensitive information for over 100 million people.

Head over to the [PortSwigger Academy SSRF topic](https://portswigger.net/web-security/ssrf) and complete the reading and labs.

#### NoSQL injection

Traditionally, web applications used SQL databases to store and retrieve their data. For many web application uses, developers have come to prefer NoSQL databases (e.g. MongoDB, though there are many). These NoSQL databases use a different query syntax than SQL (not surprising, given the name), but the general concepts for NoSQL injection are similar to that of SQL injection. However, the specifics are quite different.

Head over to the [PortSwigger Academy NoSQL injection topic](https://portswigger.net/web-security/nosql-injection) and complete the reading and labs.

#### XXE injection

XXE injection uses the ability of XML files to refer to other files. Applications that allow users to control XML data that the application processes may be vulnerable. Exploitation typically allows attackers to read arbitrary files from the web server, and may also allow denial of service attacks and, in rare cases, remote code execution. Fortunately for defenders, most web applications do not process user-controllable XML.

Head over to the [PortSwigger Academy XXE injection topic](https://portswigger.net/web-security/xxe) and complete the reading and labs.

## اختبار مهارة

PortSwigger academy contains a series of labs which you can use to test and validate your skills. For each of the following topics, complete 1-3 of the ‘practitioner’ level labs:

- [Cross-site scripting](https://portswigger.net/web-security/all-labs#cross-site-scripting)
- [Cross-origin resource sharing](https://portswigger.net/web-security/all-labs#cross-origin-resource-sharing-cors)
- [SQL injection](https://portswigger.net/web-security/all-labs#sql-injection)
- [Path traversal](https://portswigger.net/web-security/all-labs#path-traversal)
- [OS command injection](https://portswigger.net/web-security/all-labs#os-command-injection)
- [NoSQL injection](https://portswigger.net/web-security/all-labs#nosql-injection)
- [XXE injection](https://portswigger.net/web-security/all-labs#xml-external-entity-xxe-injection)

If you are working with a peer or mentor, explain to them how each attack works and how you would find and demonstrate exploitability for similar vulnerabilities in a site you were testing.


الموضوع الفرعي 2: التحقق من صحة البيانات
حالة استخدام
بطريقة أو بأخرى يقبل كل تطبيق ويب المدخلات غير الموثوقة ويعالجها، وعادة ما يأتي هذا الإدخال من المستخدمين النهائيين ومتصفحاتهم ولكن قد يأتي أيضًا من مواقع ويب أخرى أو أنظمة خلفية. وحسب المكان الذي تتدفق إليه هذه المعلومات قد يكون لمعالجة البيانات تأثيرات غير مرغوب فيها على موقع الويب أو مستخدميه.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، سيتمكن الممارسون من العثور على طرق قد تؤدي بها صيغة أو هيكل البيانات المرسلة إلى موقع ويب إلى كشف الثغرات الأمنية واستغلالها.
يجب أن يكونوا قادرين أيضًا على العثور على الأنواع التالية من ثغرات التحقق من صحة البيانات واستغلالها:
البرنامج النصي عبر الموقع
حقن لغة الاستعلامات البنيوية
اجتياز المسار
حقن الأوامر
تزييف الطلبات من جانب الخادم
حقن كيان خارجي للغة التمييز القابلة للامتداد (XXE injection)
حقن غير لغة الاستعلامات البنيوية
العرض 
ما هي الثغرات في التحقق من صحة البيانات؟
كما قد تتذكر من مسار تعلم أساسيات أمان تطبيقات الويب، يمكن أن تتخذ ثغرات التحقق من صحة البيانات أشكالًا عديدة، وفي تطبيقات الويب عادة ما تأتي في شكل أحرف معينة عندما تُفسر البيانات في سياق متغير. على سبيل المثال، قد يكون رمزا < أو > غير ضارين في التعليمات البرمجية للتطبيق، ولكن يمكن أن تؤدي إلى ثغرة في البرمجة النصية عبر المواقع عند وضعها في صفحة ويب. قد تكون أحرف الاقتباس المفردة أو أحرف المسافة غير ضارة في صفحة ويب أو التعليمات البرمجية للتطبيق، ولكن يمكن أن تؤدي إلى ثغرة أمنية في حقن لغة الاستعلامات البنيوية عند تضمينها في استعلام قاعدة بيانات. بشكل عام لكل نظام معني بتطبيق ويب (لغة تمييز النص التشعبي، جافا سكريبت، لغة الاستعلامات البنيوية، أنظمة الملفات، يونكس شل (unix shell)، وما إلى ذلك) هناك نوع مختلف من الثغرات الأمنية المحتملة للتحقق من صحة البيانات.

البرمجة النصية عبر المواقع
تُعدّ البرمجة النصية عبر المواقع (يشار إليها عادة باسم Cross-site scripting أو XSS) هي عمومًا أسهل نوع من ثغرات التحقق من صحة البيانات التي يمكن التعامل معها، فالمدخلات والمخرجات مرئية للشخص الفاحص وتتطلب فقط معرفة لغة تمييز النص التشعبي وجافا سكريبت. وهي شائعة للغاية حيث يمكن العثور عليه في 1 من كل 5 مواقع تم اختبارها من قبل شركة تقييم مواقع كبرى، وبالتالي سنبدأ هنا. 

توجه إلى موضوع البرمجة النصية عبر المواقع في أكاديمية بورت سويغر وأكمل القراءة والمخابر.
الاختبار الفعّال للبرمجة النصية عبر المواقع
من الشائع لاختبار البرمجة النصية عبر المواقع هو إدخال عبارة "><{3>script>alert('xss')</{8>script> في معلمات طلب مختلفة وانتظار انبثاق نافذة جافا سكريبت عند عودة الصفحة، ولكن ينجم عن ذلك مشكلتان:
تتمثل المشكلة الأولى بأنه في موقع يحتوي على الكثير من الثغرات المخزنة في البرمجة النصية عبر المواقع، قد ينتهي المطاف بك في النقر على نوافذ جافا سكريبت منبثقة متعددة في كل صفحة تزورها، وهذا أمر مزعج ومشتت للانتباه وسيؤدي إلى إبطاء الاختبار بشكل كبير. 
بينما تتمثل المشكلة الثانية في أنه إذا استخدمت السلسلة ذاتها لكل إدخال فلن تعرف على الفور أي مدخلات تتوافق مع المخرجات، وإذا كان لديك برمجة نصية عبر المواقع مخزنة تظهر في أجزاء متعددة من الموقع، فقد تجد سلسلة اختبار البرمجة النصية عبر المواقع الخاصة بك في مكان ما على الموقع ولكنك لا تعرف مصدرها.
يمكنك بدلاً من ذلك القيام بشيء أكثر خفية ويوفر معلومات أكثر، تتمثل إحدى الطرق في استخدام سلسلة اختبار مثل "><{3>i>xss test - pagename - fieldname</{5>i><{6>q z="  حيث يكون pagename و fieldname  هما الصفحة والمعلمة التي تجربها. إذا رأيت هذه السلسلة بالخط المائل في الموقع فستعرف على الفور أن البرمجة النصية عبر المواقع موجودة وستعرف مصدر إدخالها.
مشاركة الموارد عبر الأصول
من المواضيع ذات الصلة بالبرمجة النصية عبر المواقع هي الثغرات المتعلقة بمشاركة الموارد عبر الأصول. لربما تساءلت عن سبب عدم قدرة تعليمات جافا سكريبت التي تعمل على موقع واحد على التفاعل مع موقع آخر يفتحه المستخدم في متصفحه (على سبيل المثال، في نافذة متصفح أخرى أو علامة تبويب أو حتى في إطار آي فريم (iframe))، ويرجع سبب ذلك إلى أن كل جافا سكريبت في المتصفح مرتبطة بأصل مما يعني تقريبًا ذات الشيء كموقع ويب. لا يمكن أن يتفاعل جافا سكريبت على أصل واحد مع صفحات الويب أو البيانات على أصل آخر.
لكن توجد استثناءات لذلك، وتسمى أكثرها شيوعًا مشاركة الموارد عبر الأصول التي تسمح للموقع بأن يتيح للجافا سكريبت الخاصة بالمواقع الأخرى التفاعل مع الموقع نفسه. من الأمثلة المفيدة للغاية لذلك هي على سبيل المثال السماح لجافا سكريبت على www.example.com بالتفاعل مع api.example.com. قد يكون لتكوين مشاركة الموارد عبر الأصول بشكل غير صحيح تأثير مؤسف يتمثل في السماح للمهاجمين بتجاوز بعض الضوابط الأمنية للموقع. ليست الثغرات الأمنية المتعلقة بمشاركة الموارد عبر الأصول ثغرات تحقق من صحة البيانات، ولكن من المنطقي التعرّف عليها بعد التعلّم عن البرمجة النصية عبر المواقع.  
توجه إلى موضوع مشاركة الموارد عبر الأصول على أكاديمية بورت سويغر وأكمل القراءة والمخابر.
حقن لغة الاستعلامات البنيوية
يتميز حقن لغة الاستعلامات البنيوية (SQL Injection أو يشار إليه اختصارًا SQLi) بميزة كونه شائعًا نسبيًا في تطبيقات الويب ويؤدي أيضًا عادةً إلى اختراق كامل للتطبيق وبياناته وفي حين أنه من الأصعب قليلاً العثور عليه واستغلاله مقارنة بالبرمجة النصية عبر المواقع، إلا أنه توجد بعض التقنيات التي تجعل تحديد قابلية الاستغلال وإثباتها موثوقًا إلى حد ما ونظرًا لأهميته سيكون فئة الثغرات التالية التي سنركز عليها.
توجه إلى موضوع حقن لغة الاستعلامات البنيوية في أكاديمية بورت سويغر وأكمل القراءة والمخابر.
بمجرد استكمالك المخابر يمكنك الاطلاع على بعض النصائح للتعرّف بأمان وموثوقية على حقن لغة الاستعلامات البنيوية.
اختبار معلمات السلسلة
تتمثل إحدى الطرق الشائعة لاختبار حقن لغة الاستعلامات البنيوية في المرور على موقع وإضافة ' أو --;1=1 إلى نهايات المعلمات، ولكن ليس هذا أمرًا مثاليًا لأسباب عديدة. يتمثل الأول في عبارات التحديث، مثل عبارة لغة الاستعلامات البنيوية التالية:
update users set password='Password1!' where username='alice'
ماذا يحدث بالنسبة لاسم المستخدم إذا مررّت alice' or --;1=1 بدلاً من alice'؟ 
update users set password='Password1!' where username='alice' or 1=1;--'
فجأة، يصبح لدى كل مستخدم في قاعدة البيانات كلمة المرور ذاتها، ولا يمكنك أبدًا معرفة (ما لم تكن قد راجعت التعليمات البرمجية المصدر بعناية فائقة) إلى أين ستذهب مدخلاتك ولذلك قد يكون استخدام عبارات or عند محاولة العثور على حقن لغة الاستعلامات البنيوية خطيرًا للغاية.
قد تواجه مشكلات أخرى حتى إذا لم تستبدل المعلومات في قاعدة البيانات باستخدام سلسلة الاختبار هذه. إليك استعلامًا متعدد الأسطر:
select *
  from comments
 where username = 'alice'
   and draft=0
عندما تمرّر في معلمة استم مستخدم  alice' or 1=1;--ستكون نتيجة الاستعلام ما يلي:
select *
  from comments
 where username = 'alice' or 1=1;--'
   and draft=0
لاحظ الفاصلة المنقوطة المتسللة هناك والتي تتسبب بقيام قاعدة البيانات بتفسير الاستعلام في البداية على أنه استعلام select (select * from comments where username = 'alice' or 1=1;) وثم استعلامًا من نوعand  (and draft=0) . وتنبع المشكلة من حقيقة أنه لا يوجد استعلام and وبالتالي سيؤدي إلى حدوث خطأ، وقد يؤدي إلى حدوث خطأ لأسباب أخرى أيضًا حسب قاعدة البيانات. إذا قدم تطبيق الويب الاستجابة ذاتها لخطأ في قاعدة البيانات كما هو الحال بالنسبة لعدم وجود بيانات (وهو أمر يجب أن يحدث)، فلن تعرف أن بوجود حقن لغة الاستعلامات البنيوية في معلمة اسم المستخدم.
يتمثل الأمر الصحيح عند اختبار حقن لغة الاستعلامات البنيوية في معلمة السلسلة في إنشاء معلمة اختبار تعمل بغض النظر عن الاستعلام الموجود فيها، وأفضل ما يمكنك فعله هو استخدام طلبين أحدهما سيؤدي إلى إرجاع البيانات الأصلية من الاستعلام والآخر لن يؤدي إلى أي بيانات من الاستعلام. يمكنك بعدها مقارنة الإجابات الثلاث (الأصلية والتجربة 1 والتجربة 2). إذا أعادت الإجابة الأصلية والتجربة 1 ذات الإجابة، وأعادت التجربة 2 إجابة مختلفة، تكون قد حددت حقن لغة الاستعلامات البنيوية، وإليك مجموعة من السلاسل التي يمكنك استخدامها:
بالنسبة للتجربة 1، أضف ما يلي إلى المعلمة: ' and 'a' like '%a
بالنسبة للتجربة 2، أضف ما يلي إلى المعلمة: ' and 'a' like '%b
فيما يلي بعض الأمثلة على الاستعلامات التي تحتوي على هذه المعلمات:
select * from comments where username = 'alice' and 'a' like '%a'
select * from comments where username = 'alice' and 'a' like '%b'
لاحظ أن الاستعلام الأول سيعيد النتائج ذاتها كما لو تم تمرير alice على أنها معلمة في حين لن يعيد الاستعلام الثاني أي صفوف، وبالتالي لا يوجد خطر حدوث كارثة في حال وجود عبارة تحديث أو حذف يمكن حقنها. لاحظ أيضًا أن تغييرات بنية الاستعلام هي بالحد الأدنى وستعمل الاختبارات حتى في الاستعلامات متعددة الأسطر.
قد تتساءل عن سبب استخدام الأمثلة لعملية like بدلًا من =، وذلك لأن الاستعلام الذي تقوم بحقنه قد يستخدم عملية like، وإليك استعلام بحث مستند:
select * from documents where title like '%user text%'
تسمح عملية like باستخدام أحرف البدل وعادة ما تكون هي علامة النسبة المئوية. سيتطابق الاستعلام أعلاه مع أي مستندات تحتوي على سلسلة "user text" في أي مكان في عنوانها سواء كان ذلك في البداية أو الوسط أو النهاية. إذا استخدمنا شيئًا مثل ' and 'a'='a في عملية الحقن الخاصة بنا، فسيكون استعلام التجربة 1 هو:
select * from documents where title like '%user text' and 'a'='a%'
لن يُعيد ذلك أي صفوف، لأن "a" لا تساوي "%a" أبدًا وإذا استخدمنا التجربة 1 أعلاه، فسيكون الاستعلام:
select * from documents where title like '%user text' and 'a' like 'a%'
على الرغم من أنها غير متساوية، إلا أن "a" تشابه "a%"، وبالتالي يجب أن تعمل التجربتان 1 و2 أعلاه تقريبًا في أي موقف قائم على السلاسل، ولاحظ أنه إذا كنت تختبر ميزة البحث، فقد ترغب أيضًا في تجربة سلسلة تجربة 1 إضافية: %' and 'a' like '%a. لاحظ أنه في الاستعلامات أعلاه، تم تغيير البحث الأصلي قليلاً، فقد تم حذف % بعد نص المستخدم، وإذا كنت تشك في وجود عملية مماثلة قيد الاستخدام، فيجب أن يعوض اختبار سلسلة 1 هذا عن ذلك.
اختبار المعلمات العددية
في بعض الأحيان عندما يُمرر المتصفح قيمة عددية إلى خادم الويب يقوم الخادم بتضمينها في لغة الاستعلامات البنيوية على شكل سلسلة، ولكن في بعض الأحيان تُضمّن بشكل قيمة عددية وعادةً ما تكون لغة الاستعلامات البنيوية لعملية بحث بسيطة عن معلمة رقمية شيئًا يشابه ما يلي:
select * from stories where story_id=5
من الواضح أن إرسال story_id تتضمن 5' and '1' like '1 لن تنجح بسبب وجود خطأ في بناء الجملة. بدلاً من ذلك حاول إرسال طلبين أحدهما يحتوي على story_id يشمل 5 والآخر يحتوي على story_id يشمل 6-1. إذا لم ينتج عن الثاني أي نتيجة أو خطأ أو story مختلفة عن الطلب الذي يحتوي على story_id التي تشمل 5، يعني ذلك عدم وجود دليل على حقن لغة الاستعلامات البنيوية. لكن إذا نتج عن تمرير story_id يشمل 6-1 نفس استجابة story_id الذي يشمل 5 فهذا دليل قوي على وجود حقن لغة الاستعلامات البنيوية، ومن المرجح أن يبدو الاستعلام كما يلي:
select * from stories where story_id=6-1
في هذا المثال يُقيّم محرك قاعدة البيانات 6-1 باعتبارها رمزًا ويسترجع story التي يكون معرفها 5، ويمكنك عند هذه النقطة التوجه نحو استغلال الثغرة.
بالطبع لا يمكنك أبدًا معرفة ما يفعله التطبيق بالضبط بمدخلاتك أو كيفية استخدامه ولكن يجب أن تُعزز النصائح المذكورة أعلاه بشكل كبير من سلامة وفعالية تصيد حقن لغة الاستعلامات البنيوية الخاص بك.
اجتياز المسار
يحدث اجتياز المسار عادةً في مواقع الويب التي تُدير الملفات التي يوفرها المستخدم أو الواجهات الإدارية ولكن يمكن أن يحدث في أي مكان يقوم فيه تطبيق الويب من جانب الخادم نفسه بفتح الملفات، وحسب ما قد يفعله الخادم بالملفات المعنية يمكن أن يتراوح التأثير من الكشف عن التعليمات البرمجية المصدر من ناحية وصولًا إلى الاستيلاء الكامل على خادم الويب من ناحية أخرى. من بين تطبيقات الويب الحديثة تعد أكثر الأماكن شيوعًا التي يمكن العثور فيها على نقاط ضعف اجتياز المسار هي برامج المدونات وأنظمة إدارة المحتوى الأخرى، مما يعرض الصحفيين المستقلين والمؤسسات الإعلامية الصغيرة للخطر بشكل خاص.
توجه إلى موضوع اجتياز المسار لدى أكاديمية بورت سويغر وأكمل القراءة والمخابر.
حقن الأوامر
على الرغم من أن حقن الأوامر غير شائع نسبيًا في تطبيقات الويب الحديثة إلا أنه يؤدي في جميع الحالات تقريبًا إلى اختراق كامل لتطبيق الويب في حالة العثور عليه واستغلاله، وعندما يظهر عادةً ما يكون في واجهات الإدارة وبدرجة أقل في أنظمة إدارة المحتوى.
توجه إلى موضوع حقن أوامر أكاديمية بورت سويغر وأكمل القراءة والمخابر.
تزييف الطلبات من جانب الخادم
تتمثل فكرة تزييف الطلب من جانب الخادم (عادةً ما يعرف اختصارًا باسم SSRF) بأنه يمكن لخادم تطبيق الويب إرسال طلب بروتوكول نقل النص التشعبي إلى أي خادم آخر، وفي بعض الأحيان يمكن للتطبيق عرض الرد على العميل. ولسنوات عديدة اعتبر تزييف الطلب من جانب الخادم ثغرة غير ذات أهمية إلى حد ما، وعند العثور عليها كان من الصعب استغلاله بأي طريقة ذات مغزى، ولكن مع ظهور الحوسبة السحابية أصبح تزييف الطلب من جانب الخادم فجأة مشكلة حرجة. 
في البيئات السحابية يمكن للمسؤولين تعيين أذونات للخوادم الظاهرية بأنفسهم، ويُستخدم هذا عادةً لمنح الوصول إلى مجموعات تخزين البيانات وقواعد البيانات وخدمات الشبكة وما إلى ذلك. عادة ما تكون الموارد المعنية متاحة عبر الإنترنت مما يجعل أذونات الخادم طريقة التحكم الوحيدة في الوصول.
الطريقة التي تعمل بها أذونات الخادم هذه (التي تسمى أحيانًا هوية المثيل، ومفاتيح الآلة، ومفاتيح حساب الخدمة، والهويات المدارة، وما إلى ذلك) هي في الواقع بسيطة للغاية، وفي البيئة السحابية تكون الخوادم عبارة عن أجهزة ظاهرية تعمل على أجهزة فعلية. هناك خدمة ويب تعمل على الخادم الفعلي الذي يقبل فقط اتصالات الشبكة من الأجهزة الظاهرية التي تعمل على الخادم نفسه. عندما يتلقى طلبًا، يبحث عن الجهاز الظاهري عن طريق عنوان بروتوكول الإنترنت ويسترد معلومات حول الجهاز الظاهري بما في ذلك دور العميل والأذونات المرتبط بالجهاز الظاهري، ثم يُنشئ بيانات اعتماد سحابية لهذا الدور ويرسلها مرة أخرى في الاستجابة. يمكن للبرامج الموجودة على الجهاز الظاهري بعد ذلك استخدام بيانات الاعتماد هذه للمصادقة على الخدمات السحابية الأخرى. 
إذا كان بإمكان المهاجم أن يتسبب في قيام تطبيق ويب مستضاف على السحابة بإرسال طلبات بروتوكول نقل نص تشعبي عشوائي والرد بإجابات، فيمكن للمهاجم في كثير من الأحيان رؤية المثيلات السحابية للخادم، وإذا حدث ذلك، يمكن للمهاجم انتحال شخصية خادم الويب. أحد الأمثلة على ذلك هو اختراق كابيتال ون (Capital One) في عام 2019 الذي أدى إلى اختراق المعلومات الحساسة لأكثر من 100 مليون شخص. 
توجه إلى موضوع تزييف الطلبات من جانب الخادم في أكاديمية بورت سويغر وأكمل القراءة والمخابر.
حقن غير لغة الاستعلامات البنيوية
كانت تطبيقات الويب تقليديًا تستخدم قواعد بيانات لغة الاستعلامات البنيوية لتخزين بياناتها واسترجاعها. بالنسبة للعديد من استخدامات تطبيقات الويب، أصبح المطورون يفضلون قواعد بيانات غير لغة الاستعلامات البنيوية (على سبيل المثال مونغو دي بي (MongoDB)، ولكن يوجد العديد منها). تستخدم قواعد بيانات غير لغة الاستعلامات البنيوية بناء استعلامات مختلفة (ليس ذلك أمرًا غريبًا بالنظر إلى الاسم) ولكن المفاهيم العامة لحقن غير لغة الاستعلامات البنيوية تشبه تلك الخاصة بحقن لغة الاستعلامات البنيوية، ولكن التفاصيل مختلفة تمامًا.
توجه إلى موضوع حقن غير لغة الاستعلامات البنيوية على أكاديمية بورت سويغر وأكمل القراءة والمخابر.
حقن كيان خارجي للغة التمييز القابلة للامتداد
يستخدم حقن الكيان الخارجي للغة التمييز القابلة للامتداد إمكانية ملفات لغة التمييز القابلة للامتداد على الإشارة إلى ملفات أخرى. قد تكون التطبيقات التي تسمح للمستخدمين بالتحكم في بيانات لغة التمييز القابلة للامتداد التي يعالجها التطبيق معرّضة للخطر. يسمح استغلال الثغرة عادةً للمهاجمين بقراءة ملفات عشوائية من خادم الويب وقد يسمح أيضًا بهجمات حجب الخدمة وفي حالات نادرة قد يسمح بتنفيذ التعليمات البرمجية عن بُعد، ولكن لحسن الحظ بالنسبة للمدافعين لا تعالج معظم تطبيقات الويب لغة التمييز القابلة للامتداد التي يمكن للمستخدم التحكم فيها.
توجه إلى موضوع حقن الكيان الخارجي للغة التمييز القابلة للامتداد على أكاديمية بورت سويغر وأكمل القراءة والمخابر.
موارد التعلّم
اختبار مهارة
تحتوي أكاديمية بورت سويغر على سلسلة من المخابر التي يمكنك استخدامها لاختبار مهاراتك والتحقق منها ولكل موضوع من المواضيع التالية، أكمل 1-3 من مختبرات مستوى "الممارس":
البرنامج النصي عبر الموقع
مشاركة الموارد عبر الأصول
حقن لغة الاستعلامات البنيوية
اجتياز المسار
حقن أوامر نظام التشغيل
حقن غير لغة الاستعلامات البنيوية
حقن كيان خارجي للغة التمييز القابلة للامتداد (XXE injection)

إذا كنت تعمل مع زميل أو مرشد اشرح له كيفية عمل كل هجوم وكيف ستبحث وتثبت إمكانية استغلال نقاط الضعف المماثلة في الموقع الذي كنت تفحصه.


## Learning Resources

{{% resource title="Report: 50% of all web applications were vulnerable to attacks in 2021" languages="English" cost="Free" description="Summary of a report on vulnerabilities in major web applications." url="https://venturebeat.com/security/report-50-of-all-web-applications-were-vulnerable-to-attacks-in-2021/" %}}

{{% resource title="An overview of same-origin policy and cross-origin resource sharing" languages="Multiple" cost="Free" description="Introductions to same-origin policy and cross-origin resource sharing." url="https://en.wikipedia.org/wiki/Same-origin_policy" url2="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing" %}}

{{% resource title="An SSRF, privileged AWS keys and the Capital One breach" languages="English" cost="Free" description="Overview of the 2019 Capital One breach through an SSRF bug." url="https://blog.appsecco.com/an-ssrf-privileged-aws-keys-and-the-capital-one-breach-4c3c2cded3af" %}}
