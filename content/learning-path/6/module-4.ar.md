+++
style = "module"
weight = 4
title = "Hacking Incident Response"
description = "We look at some ways in which we can investigate and recover from an attack that targeted our website"
+++

## Use Case

If a website is hacked, understanding the actions and methods of the attacker is vital. At the very least, the site owners need to identify how the site was initially compromised so that they can fix any vulnerabilities that enabled that. It may also be important to know what data the attackers may have accessed or modified. This subtopic describes some practices to help investigate and recover from a website hacking incident.

## Objectives

After completing this subtopic, the practitioner should be able to do the following:

- Identify the point of initial compromise of a website
- Identify the actions an attacker took after initial compromise

---
## Main Section
### Identifying a hacking incident

For most victims of a hacking incident, the delay between the initial compromise and detection can be months or even years. Compromise is often detected by an engineer thinking that something “seems odd.” Some signs of compromise can include:

- Changes to site content. These can range from subtle (e.g., invisible changes to JavaScript) to very unsubtle (defacement)).
- User accounts appearing in password databases or other data dumps
- Unexplained files on the web server
- Unusual network traffic in or out of web or other servers
- Small spikes in traffic, associated with odd requests in the access or error logs

When signs of potential compromise occur, it’s quite natural to want to explain them away. Nobody wants to face the prospect that their website has been hacked. To be fair, most websites are never broken into, so there likely is a perfectly reasonable explanation. However, it’s important to detect and investigate a compromise as quickly as possible.

### Moving from an IoC to initial compromise

Once you have established that the site has been hacked through one or more IoCs (indicators of compromise), the next step is to work backwards to find the source of the initial compromise. This serves two purposes:

- It identifies what vulnerability enabled the attacker to compromise the site, allowing the site owner to fix the vulnerability before restoring the site.
- Once an initial compromise is found, you can work to find the activities performed by the attacker.

It’s not always the case that a website compromise starts with a vulnerability in the website itself. While this may be the most common way in, you shouldn’t disqualify something like a [compromised developer account](https://www.qurium.org/alerts/targeted-sophisticated-phishing-attacks-against-dissidents-in-azerbaijan-is-trending/) allowing an attacker to simply upload a backdoor, or a [backdoored dependency](https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/) being used as part of a supply chain attack.

Working backwards from an IoC to the previous step in the attack chain is a matter of connecting data and metadata from the IoC to the source of the IoC. For example, if there’s an unexpected file on the web server, when was the file created? What account created the file (e.g. the deployment system, the web server itself, a developer’s account)? If the web server created the file, check the access logs for requests around and just before that time. If a developer’s account created the file, check the SSH and other remote access logs around and just before that file’s creation time. If the deployment system created the file, check to see if the file was added to the source code repository. For each of these cases, if you find something, it may give you another IoC to work back from. Perhaps you find something in the web logs; are there prior requests from that IP address or netblock with that user-agent? If a malicious file was added to source control, what account added it, and from where did they authenticate?

Bear in mind that even minimally-competent attackers will usually make an attempt to cover their tracks. Some techniques they may user include:

- Connecting from different IP addresses and using different user-agent strings
- Uploading an initial backdoor, then using that backdoor to download a different backdoor, and finally deleting the first backdoor
- Deleting any log files that they find on the server
- Slowing down their hacking tools (e.g. [sqlmap](https://sqlmap.org/)) so as not to cause a big traffic spike

For these and other reasons you may not be able to create a clear set of steps from an IoC to an initial compromise. In some cases (like finding a data dump of the site on the dark web), you may have very little to go on. Note that when reviewing logs, it’s ideal if the web site uses a central, high-security logging platform, as hopefully the attacker has not been able to modify or delete those logs. Logs that are sitting on a compromised host may not be fully reliable. Another pitfall is log timestamps that are not aligned. Different systems may use different time zones, or may have inaccurate system clocks. When comparing timestamps across different systems, it’s useful to try to find logs for a single event, and then use that to find the offset between timestamps.

If, due to missing on uninformative IoCs, you do need to try open-ended searching of web server logs. The main issue with this is that web server access logs don’t give much insight into the results of those requests. If the site owners have set up customer security logging, obviously that may be much more helpful. If you do have to search through server access logs, here are some pointers:

- Consider parsing the logs and storing them in a more structured format for easier searching
- Attackers will often try to hide their attacks through encoding, so quickly look through the logs for percent signs (%) to see if there’s URL encoded data.
- Look for strings associated with attack patterns. Note that automated vulnerability scanners are constantly indiscriminately the entire internet, so you should expect a lot of results. If you have a lot of results, try to find patterns among them. Patterns that appear constantly throughout the logs are probably less interesting. Most interesting are groups of different patterns that share an IP address, netblock and/or user-agent. This is indicative of a human poking at the site. Some useful patterns to look for:
  - Requests with angle brackets (&lt; and >), especially the string `&lt;script`.
  - Requests with JavaScript selectors like `onClick`, `onMouseOver`, etc.
  - Requests with the string `../` in them.
  - Requests with single quotes and/or SQL keywords (`select`, `and`, or `where`, `update`, `delete`) in them
  - Requests that generate an unusually large response for their endpoint. (For example,. an article index usually generates a 30k web page generating a 300k page.)

If you find an interesting log entry that may indicate a source of compromise or exploitation, a quick way to check it is to try to send a similar request yourself. Completing the Web Application Security Assessment learning path will help you understand these attacks. Another approach is to work with the site owner to go through the code that processes that request and see if it could trigger a vulnerability in the code.

Through a mix of less-directing searching through logs and trying to connect the links of an attack chain, hopefully you can find the initial source of a compromise. Note that most attackers do not go through great lengths to hide their tracks. It’s a good strategy to start out looking for the most obvious thing first, and only after that fails to look for clever evasion techniques. For instance, if you find HTTP requests from the attacker, looking for more requests from the same IP address and/or the same user-agent is likely to be successful.

### Tracking an attacker forward

Once you have found the initial compromise, the next obvious step is to follow the attacker forward to see what they’ve done. The goals of this process are to determine what information the attacker has likely compromised and to prepare to evict them. The process of tracing the attacker’s steps forward is similar to, but easier than, tracing their steps backwards. Be sure to look for artifacts on disk and their metadata, in addition to logs. Comparing the files on the web server to what’s in the source code repository can be helpful with this. Also bear in mind that attackers will frequently attempt to expand their access to other servers, so maintain alert to attempts at horizontal movement. Finally, be sure to look for persistence mechanisms such as changes to cron files and the like.

### Evicting the attacker

Once you’re pretty sure what systems the attacker has access to (e.g., via exploits, backdoors, etc.), you can try to cut off their access. This is something you should try to do quickly and all at once. You’ll want to fix any vulnerabilities and remove any backdoors that you are aware of. Also note that most attackers, especially nation-state actors, work a regular schedule. Especially if the attacker doesn’t know that they’ve been detected, it’s best to evict them while they’re asleep.

The ideal way to evict the attacker is to tear down any servers that they might have accessed and rebuild them from scratch. This, of course, depends on having a clean version of the site source and reliable backups of site data (e.g., databases). If this isn’t possible, try to do as much rebuilding as possible, as opposed to trying to surgically remove the attacker’s access.

In the worst case, if the site’s infrastructure is completely overrun, or it looks as if the attacker is on the verge of getting a devastating level of access, it may be sensible to simply turn off the servers and replace the site with a static page.

### Recovering from the hack

If you believe the attacker has been evicted, you may be wrong. Even if the attacker has been evicted, they will likely be looking for another way in. It’s important to be actively looking for attacker activity. Additionally, if the attacker exploited a website vulnerability to get in, there are likely other exploitable vulnerabilities in the site. It’s a good idea to perform a security assessment on the site. See the Web Application Security Assessment learning path for more on this. It’s also probably a good idea to perform the site hardening processes described in Subtopic 1 of this learning path. Lastly, you probably identified some issues with the site, infrastructure, logging, etc. Now would be a good time to make a plan for addressing those issues.

If user data was compromised, the site owner may be legally and/or morally required to disclose the breach. Managing that is beyond the scope of this learning path, but [here’s an article to get started](https://discernibleinc.com/blog/-mailbag-reader-question-truthful-communication-legal-exposure).

## Practice

Offers a collection of exercises which allow the practitioner to use the tools and practice the skills outlined above. If relevant, this section also links to samples of malware or malicious content which the practitioner can interact with while practicing the skill.

- Complete the [Log Analysis – Compromised WordPress](https://blueteamlabs.online/home/challenge/log-analysis-compromised-wordpress-ce000f5b59) on Blue Team Labs Online (free account required). If you’re having trouble, [a write-up](https://cyberjunnkie.medium.com/log-analysis-wordpress-incidentresponse-blueteamlabsonline-fdf211899782) is available.
- Complete the [WebStrike Blue Team Challenge](https://cyberdefenders.org/blueteam-ctf-challenges/149#nav-overview) on CyberDefenders (free account required). Although this challenge involved the use of PCAP files instead of web logs, the principles are the same.

## Skill Check

Independently (or with a mentor), complete the [Tomcat Takeover Blue Team Challenge](https://cyberdefenders.org/blueteam-ctf-challenges/135#nav-overview) at CyberDefenders (free account required). Although this challenge involved the use of PCAP files instead of web logs, it represents an end-to-end attack scenario.

## Learning Resources

{{% resource title="The year-long rash of supply chain attacks against open source is getting worse" languages="English" cost="Free" description="A look at supply chain attacks against open source software, in which attackers compromise software dependencies" url="https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/" %}}

{{% resource title="How do you manage/balance truthful communications about an incident/breach while mitigating legal exposure?" languages="English" cost="Free" description="A short guide, written by an incident responder rather than a lawyer on what the various concerns (legal/ ethical/ other) digital protectors might have when disclosing breaches and how to manage those" url="https://discernibleinc.com/blog/-mailbag-reader-question-truthful-communication-legal-exposure" %}}

الموضوع الفرعي 4: الاستجابة لحوادث الاختراق
حالة استخدام
في حال تعرض موقع ويب للاختراق سيكون فهم تصرفات وأساليب المهاجم أمرًا حيويًا، وعلى أقل تقدير يحتاج مالكو الموقع إلى تحديد كيفية اختراق الموقع في البداية حتى يتمكنوا من إصلاح أي ثغرات أمنية سمحت بذلك. قد يكون من المهم أيضًا معرفة البيانات التي قد يكون المهاجمون قد وصلوا إليها أو عدلوها، ويصف مسار التعلّم هذا بعض الممارسات للمساعدة في التحقيق في حوادث اختراق موقع الويب والتعافي منها.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارس قادرًا على القيام بما يلي:
تحديد نقطة الاختراق الأولية لموقع الويب
تحديد الإجراءات التي اتخذها المهاجم بعد الاختراق الأولي
العرض 
التعرف على حادثة اختراق
بالنسبة لمعظم ضحايا حوادث الاختراق، يمكن أن يكون التأخير بين الاختراق الأولي والكشف أشهرًا أو حتى سنوات، وغالبًا ما يكتشف الاختراق من قبل مهندس يعتقد أن شيئًا ما "يبدو غريبًا". يمكن أن تشمل بعض علامات الاختراق ما يلي:
التغييرات في محتوى الموقع ويمكن أن تتراوح هذه من خفية (على سبيل المثال، تغييرات غير مرئية على جافا سكريبت) إلى غير خفية أبدًا (تشويه)).
حسابات المستخدمين التي تظهر في قواعد بيانات كلمات المرور أو غيرها من السجلات المفرّغة
ملفات غير مفسرة على خادم الويب
حركة مرور غير عادية للشبكة داخل أو خارج الويب أو الخوادم الأخرى
طفرات صغيرة في حركة المرور، مرتبطة بالطلبات الفردية في سجلات الوصول أو الخطأ
عندما تظهر علامات الاختراق المحتملة من الطبيعي تمامًا أن ترغب في توضيحها، ولا أحد يريد مواجهة احتمال تعرض موقعه الإلكتروني للاختراق. لكي نكون منصفين، لا تتعرض معظم مواقع الويب للاقتحام أبدًا وبالتالي من المحتمل أن يكون هناك تفسير معقول تمامًا، ولكن من المهم اكتشاف اختراق والتحقيق فيه في أسرع وقت ممكن.
الانتقال من مؤشرات الاختراق إلى الاختراق الأولي
بمجرد التأكد من أن الموقع قد تم اختراقه من خلال واحد أو أكثر من مؤشرات الاختراق، فإن الخطوة التالية هي التحليل الرجعي للعثور على مصدر الاختراق الأولي، وذلك لأجل هدفين: 
تحديد الثغرة الأمنية التي مكنّت المهاجم من اختراق الموقع مما يسمح لمالك الموقع بإصلاح الثغرة الأمنية قبل استعادة الموقع.
بمجرد العثور على اختراق أولي يمكنك العمل على العثور على الأنشطة التي يقوم بها المهاجم.
ليس الأمر دائمًا أن اختراق موقع الويب يبدأ بوجود ثغرة أمنية في موقع الويب نفسه، ولكن قد يكون هذا أكثر الطرق شيوعًا للاقتحام ولكن يجب ألا تستبعد شيئًا مثل حساب مطوّر مخترق يسمح للمهاجم ببساطة بتحميل باب خلفي أو استخدام تبعية فيها باب خلفي كجزء من هجوم سلسلة التوريد.
يُعدّ التحليل الرجعي من مؤشرات الاختراق إلى الخطوة السابقة في سلسلة الهجوم مسألة ربط البيانات والبيانات الوصفية من مؤشر الاختراق إلى مصدر مؤشر الاختراق. على سبيل المثال، إذا كان هناك ملف غير متوقع على خادم الويب فمتى تم إنشاء الملف؟ ما الحساب الذي أنشأ الملف (مثل نظام النشر، وخادم الويب نفسه، وحساب المطور)؟ إذا أنشأ خادم الويب الملف تحقق من سجلات الوصول للطلبات الموجودة في ذلك الوقت وقبله مباشرة. إذا أنشأ حساب المطور الملف، فتحقق من بروتوكول النقل الآمن وسجلات الوصول عن بُعد الأخرى قبل وقت إنشاء هذا الملف مباشرة. إذا أنشأ نظام النشر ملفًا، تحقق لمعرفة ما إذا كان الملف قد تمت إضافته إلى مستودع التعليمات البرمجية للمصدر، وبالنسبة لكل حالة من هذه الحالات إذا عثرت على شيء ما فقد توفر لك مؤشر اختراق آخر للتحليل الرجعي منه. ربما يمكن أن تعثر على شيء ما في سجلات الويب، هل هناك طلبات مسبقة من عنوان بروتوكول الإنترنت أو مجال عناوين بروتوكول الإنترنت مع وكيل المستخدم هذا؟ في حال تمت إضافة ملف ضار إلى عنصر تحكم المصدر، فما الحساب الذي أضافه وأين تمت المصادقة عليه؟
يجب أن تراعي أنه حتى المهاجمين ذوي حد الكفاءة الأدنى يحاولون عادة تغطية مساراتهم، وتشمل بعض التقنيات التي قد يستخدمونها:
الاتصال من عناوين بروتوكول إنترنت مختلفة واستخدام سلاسل مختلفة من وكلاء المستخدم
تحميل باب خلفي أولي، ثم استخدام هذا الباب الخلفي لتنزيل باب خلفي مختلف، وأخيرًا حذف الباب الخلفي الأولي
حذف أي ملفات سجل يعثرون عليها على الخادم
إبطاء أدوات الاختراق الخاصة بهم (مثل إس كيو إل ماب(sqlmap)) حتى لا تتسبب في ارتفاع كبير في حركة المرور
لهذه الأسباب وغيرها قد لا تتمكن من العثور على سلسلة خطوات واضحة تُعيدك من مؤشر الاختراق إلى الاختراق الأولي. وفي بعض الحالات (مثل العثور على سجل مفرّغ لبيانات الموقع على الدارك ويب) قد لا يكون لديك الكثير لتحلله، ولاحظ أنه عند مراجعة السجلات، يكون من المثالي أن يستخدم موقع الويب منصة تسجيل أحداث مركزية عالية الأمان حيث نأمل ألا يتمكن المهاجم من تعديل هذه السجلات أو حذفها. قد لا تكون السجلات الموجودة على مضيف مخترق موثوقة تمامًا وإحدى الهفوات الأخرى هي سجلات الطوابع الزمنية التي لا تكون متحاذية. قد تستخدم الأنظمة المختلفة مناطق زمنية مختلفة، أو قد تحتوي على ساعات نظام غير دقيقة، وعند مقارنة الطوابع الزمنية بين أنظمة مختلفة، من المفيد محاولة العثور على سجلات لحدث واحد ثم استخدام ذلك للعثور على الفارق بين الطوابع الزمنية.
إذا كنت بحاجة إلى محاولة إجراء بحث مفتوح في سجلات خادم الويب بسبب عدم عثورك على مؤشرات اختراق غير مفيدة، فهنالك مشكلة رئيسية في ذلك أن سجلات الوصول إلى خادم الويب لا توفر خبرة متعمّقة حول نتائج تلك الطلبات. إذا قام مالكو الموقع بإعداد تسجيل أمان العملاء فمن الواضح أن ذلك قد يكون أكثر فائدة، وإذا كان عليك البحث في سجلات وصول الخادم، فإليك بعض المؤشرات:
يجب أن تراعي تحليل السجلات وتخزينها بتنسيق أكثر تنظيمًا لتسهيل البحث،
غالبًا ما يحاول المهاجمون إخفاء هجماتهم من خلال الترميز، لذا ابحث بسرعة في السجلات عن علامات النسبة المئوية (٪) لمعرفة ما إذا كانت هناك بيانات مشفرة لعنوان موقع الويب.
ابحث عن السلاسل المرتبطة بأنماط الهجوم، ولاحظ أن فاحصات الثغرات الأمنية الآلية على الإنترنت تقوم بالفحص بشكل كامل وعشوائي ولذلك يجب أن تتوقع الكثير من النتائج. إذا عثرت على العديد من النتائج، حاول العثور على أنماط فيما بينها، ويمكن أن تكون الأنماط التي تظهر باستمرار في جميع أنحاء السجلات أقل إثارة للاهتمام. وأكثرها إثارة للاهتمام هي مجموعات من الأنماط المختلفة التي تشترك في عنوان بروتوكول الإنترنت و/أو مجال عناوين بروتوكول الإنترنت و/أو وكيل المستخدم. ويدل ذلك على وجود شخص يختبر الموقع. وتشمل بعض الأنماط المفيدة التي يجب البحث عنها:
الطلبات التي تحتوي على أقواس زاوية (< و >) وخاصة السلسلة النصية سكريبت(<script). 
الطلبات باستخدام محددات جافا سكريبت مثل أون كليك (onClick) وأون ماوس أوفر (onMouseOver) وما إلى ذلك. 
الطلبات التي تحتوي على السلسلة /.. بداخلها.
الطلبات التي تحتوي على علامات اقتباس مفردة و/أو كلمات إس كيو إل رئيسية (select، and، or where، update، delete) فيها
الطلبات التي تولد استجابة كبيرة بشكل غير عادي لنقطة النهاية الخاصة بها (على سبيل المثال، عادةً ما ينشئ فهرس المقالة صفحة ويب 30 ألف تولد صفحة 300 ألف.)
إذا وجدت إدخال سجل مثيرًا للاهتمام قد يشير إلى مصدر الاختراق أو ثغرة، فإن الطريقة السريعة للتحقق منه هي محاولة إرسال طلب مماثل بنفسك. وسيساعدك إكمال مسار تعلّم تقييم أمان تطبيقات الويب على فهم هذه الهجمات. يتمثل نهج آخر في العمل مع مالك الموقع لمراجعة التعليمات البرمجية التي تعالج هذا الطلب ومعرفة ما إذا كان يمكن أن يؤدي إلى ثغرة أمنية في التعليمات البرمجية.
من خلال الجمع بين التقليل من البحث مباشرة في السجلات ومحاولة ربط حلقات سلسلة الهجوم، نأمل أن تتمكن من العثور على المصدر الأولي للاختراق، ولاحظ أن معظم المهاجمين لا يبذلون قصارى جهدهم لإخفاء مساراتهم. من المستحسن بدء البحث عن الشيء الأكثر وضوحًا أولًا وبعد فشل ذلك عليك أن تبحث عن تقنيات التهرب الذكية. على سبيل المثال، إذا وجدت طلبات بروتوكول نقل النص التشعبي من المهاجم، فمن المحتمل أن يزيد نجاح عمليات البحث عن الطلبات الإضافية من عنوان بروتوكول الإنترنت ذاته و/أو نفس وكيل المستخدم.
تتبع المهاجم مستقبلًا
بمجرد العثور على الاختراق الأولي، تتمثل الخطوة الواضحة التالية في متابعة المهاجم مستقبلًا لمعرفة ما فعله، وتتمثل أهداف هذه العملية في تحديد المعلومات التي من المحتمل أن يكون المهاجم قد اخترقها والاستعداد لطرده. تُشبه عملية تتبع خطوات المهاجم مستقبلًا ولكنها أسهل من تتبع خطواته في الماضي. تأكد من البحث عن الآثار على القرص وبياناتها الوصفية بالإضافة إلى السجلات. يمكن أن تكون مقارنة الملفات الموجودة على خادم الويب بما هو موجود في مستودع التعليمات البرمجية المصدر مفيدًا في ذلك. ويجب أن تراعي أيضًا أن المهاجمين سيحاولون في كثير من الأحيان توسيع وصولهم إلى خوادم أخرى لذا تنبّه إلى محاولات الحركة الأفقية. تأكد أخيرًا من البحث عن آليات الثبات مثل التغييرات في ملفات كرون (cron) وما شابه ذلك.
طرد المهاجم
بمجرد أن تكون متأكدًا تمامًا من الأنظمة التي يمكن للمهاجم الوصول إليها (على سبيل المثال، عبر عمليات الاستغلال، والأبواب الخلفية، وما إلى ذلك)، يمكنك محاولة قطع وصوله، وهذا شيء يجب أن تحاول القيام به بسرعة وفي الوقت ذاته وستحتاج إلى إصلاح أي ثغرات أمنية وإزالة أي أبواب خلفية تعرفها. لاحظ أيضًا أن معظم المهاجمين وخاصة الجهات الفاعلة في الدولة القومية، يعملون وفقًا لجدول زمني منتظم، وإذا كان المهاجم لا يعرف أنه تم اكتشافه، فمن الأفضل طرده عندما يكون غير نشط. 
تُعدّ الطريقة الأمثل لطرد المهاجم هي هدم أي خوادم قد يكون قد تمكن من الوصول إليها وإعادة بنائها من الصفر، ويعتمد هذا بالطبع على وجود نسخة نظيفة من مصدر الموقع ونسخ احتياطية موثوقة من بيانات الموقع (على سبيل المثال، قواعد البيانات). إذا لم يكن ذلك ممكنًا يجب أن تحاول إعادة البناء بأكبر قدر ممكن بدلًا من محاولة استئصال وصول المهاجم بشكل دقيق.
وفي أسوأ الحالات، إذا تم تجاوز البنية التحتية للموقع بالكامل أو يبدو أن المهاجم على وشك الحصول على مستوى مدمر من الوصول فقد يكون من المنطقي ببساطة إيقاف تشغيل الخوادم واستبدال الموقع بصفحة ثابتة. 
التعافي من الاختراق
قد تكون مخطئًا إذا كنت تعتقد أن المهاجم قد تم طرده، وحتى لو تم طرد المهاجم فمن المحتمل أن يبحث عن طريقة أخرى للدخول. من المهم أن تبحث بشكل نشط عن أفعال المهاجم وإذا استغل المهاجم ثغرة أمنية في موقع الويب للدخول فمن المحتمل أن تكون هناك ثغرات أمنية أخرى يمكن استغلالها في الموقع. من المستحسن إجراء تقييم أمني في الموقع. راجع مسار تعلّم تقييم أمان تطبيقات الويب لمزيد من المعلومات حول هذا الموضوع. من المحتمل أيضًا أن تجري عمليات تعزيز حماية الموقع الموضحة في الموضوع الفرعي 1 من مسار التعلّم هذا. أخيرًا، ربما تكتشف بعض المشكلات المتعلقة بالموقع والبنية التحتية وتسجيل الأحداث وما إلى ذلك، والآن هو الوقت المناسب لوضع خطة لمعالجة هذه القضايا.
إذا تعرضت بيانات المستخدم للاختراق، فقد يُطلب من مالك الموقع قانونًا و/أو أخلاقيًا الكشف عن الخرق، وإدارة ذلك تقع خارج نطاق مسار التعلّم هذا ولكن هذه مقالة يمكن أن تبدأ بها.
موارد التعلّم
الممارسة
مجموعة من التمارين التي تسمح للممارس باستخدام الأدوات وممارسة المهارات الموضحة أعلاه، وفي حال كان ذلك مناسبًا يرتبط هذا القسم أيضًا بعينات من البرامج الضارة أو المحتوى الضار الذي يمكن للممارس التفاعل معه أثناء ممارسة المهارة.
أكمل تحليل السجل – اختراق ووردبرس على بلو تيم لابز أونلاين (Blue Team Labs Online) (تحتاج إلى حساب مجاني). إذا كنت تواجه أي مشاكل، توجد مقالة لتساعدك.
أكمل تحدي الفريق الأزرق من وب سترايك على سايبر دفندرز (CyberDefenders) (تحتاج إلى حساب مجاني). على الرغم من أن هذا التحدي يتضمن استخدام ملفات الحزم التي تم التقاطها بدلًا من سجلات الويب، تبقى المبادئ هي ذاتها.
اختبار مهارة
استكمل بشكل مستقل أو مع مُرشِد تحدي بلو تيم تومكات تيك أوفر في سايبر دفندرز (CyberDefenders) (تحتاج إلى حساب مجاني). يُمثل هذا التحدي سيناريو هجوم بين الأطراف ولكنه يشمل استخدام ملفات الحزم التي تم التقاطها بدلًا من سجلات الويب.

