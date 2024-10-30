+++
style = "module"
weight = 5
title = "Finding Web Application Vulnerabilities"
description = "Once you have learned about different types of vulnerabilities, it's time to look for them in the web applications you are testing! To start with and get some initial practice, you will test a deliberately vulnerable web application"
+++

## Use Case

Once you have learned about different types of vulnerabilities, it's time to look for them in the web applications you are testing! To start with and get some initial practice, you will test a deliberately vulnerable web application.

## Objectives

After completing this subtopic, practitioners will be able to find vulnerabilities in a real website, as opposed to understanding individual vulnerabilities in isolation.

---
## Main Section
Having completed the previous subtopics, you should have a good understanding of individual vulnerabilities. While this might be enough to guide you in fixing vulnerabilities or perform forensics in a web application breach, it is not enough if you wish to find those vulnerabilities in a web application. While the previous labs were focused puzzles challenging you to activate a vulnerability in a single input, in a real web application most inputs will not be vulnerable to anything. Your challenge will be to find those rare inputs that are vulnerable.

To assist in this, it’s helpful to have a mental framework to guide your testing. This will serve to organize your thoughts and notes about what you’re testing, and can also serve as a checklist. Do not underestimate the power of a checklist! Checklists are the reason air travel is safe, and [introducing checklists to the intensive care units of a US state’s hospitals dropped infections rates by ⅔, and over a year and a half saves over 1,500 lives](https://www.newyorker.com/magazine/2007/12/10/the-checklist). Any complex, error-prone task will benefit highly from a checklist, and testing web applications is extremely complex and extremely error prone.

### Practice targets

For this subtopic, you will be testing a deliberately vulnerable web application. You will attempt to find all the vulnerabilities in the application and document those vulnerabilities.

To start with, you will need an application to test. One (bad) option would be to find some random website on the internet and try to break into it. This is not a good idea for two reasons. The first is that it’s unethical (even if your intentions are good, what if you accidentally damaged the site?) and, depending on where you live, probably illegal. The second is that, especially starting out, it’s impossible to know the difference between a site being secure, and you not being good at testing.

The solution to this is to practice on a [site that is intentionally vulnerable](https://owasp.org/www-project-vulnerable-web-applications-directory/). These sites are built expressly for people to practice finding and exploiting vulnerabilities. They are ethical and legal to test (most are downloadable for you to test on your own computer), and have certain known vulnerabilities, so that you can evaluate your success. For this subtopic we will be using [the OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) vulnerable web application.

### Organizing your testing

Next up, you will need a methodology to guide your testing. As you gain experience, you will likely start to develop your own framework and procedures that work well for your preferred work style. However, at first, you will need one to get you started. For this learning path, we will use [a methodology written by Tanner Prynn](https://github.com/tprynn/web-methodology), which is about in line with the standards used by most professional web application penetration testing practices. This methodology document is a good compromise between brevity (compare its 23 printed pages to the 465 of the OWASP testing guide) and completeness. It doesn’t contain every possible vulnerability, nor does it have complete guidance for testing the vulnerabilities it does cover, but it should be enough to let you leverage the expertise you have.

In addition to having a framework and checklist of what you’ve tested, it’s extremely important that you keep detailed notes. Structured notes like a checklist only go so far. Here are some examples of how to use free-form notes:

- Perhaps you’re in the middle of some focused testing and notice some odd site behavior. Don’t interrupt your focused testing, take a note and investigate the odd behavior later.
- Perhaps you don’t understand how a portion of the site works; take a note of that. If you’re working with the site owner, you can ask them a bunch of questions at once instead of bothering them throughout the day. Or, perhaps the way that part of the site works will become clear as you move through the rest of the site.
- Perhaps you find a place to input data, but it’s not immediately obvious where that data is used. Take a note of it. Perhaps you will find where that data pops out later; if so, you’ll need to look at both web pages when testing that input.
- Always keep notes on any places where the site isn’t working properly. You will need those for your report.
- Sometimes you’ll be _sure_ that a particular input is vulnerable to something, but you will struggle to find out what or how. Write down what you’ve tried, then move on. A few hours or a night’s rest may give you a new perspective.

### Reporting

Finally, in order for your hard work to be useful to anyone, you need to document the vulnerabilities that you find. Generally you will be testing someone else’s website and will be producing some sort of report, whether formal or informal. Regardless, some of the primary goals or the report should be to communicate:

- What was tested
- What _wasn’t_ tested, and why
- For each vulnerability found:
  - Where the vulnerability was located
  - How to trigger the vulnerability for later reproduction
  - What the risk/security impact of the vulnerability is
  - Recommendations for fixing the vulnerability

Typically, reports will have an introductory section that talks about what was and wasn’t tested, and then another section containing details of each vulnerability found. Let’s dig into each section.

The introductory section will usually contain information about the tested application. Details such as the URL of the application, environment it was tested (e.g. production vs staging), and the date range in which the testing was performed are all important, allowing the website developers to contextualize the testing against their development and release cycles.

It’s also important to include information about the testing goals. For some tests, the goal might be to only test for vulnerabilities that might result in a complete takeover of the web server infrastructure. For others, the goal might be to perform a very thorough and complete test. For most web application tests, the test must be completed within a particular amount of time, and the goal is to identify as many and as impactful vulnerabilities as possible in that time. Including this information straddles the line between describing what was tested and what wasn’t tested.

Finally, if any types of tests were excluded, any parts of the site weren’t tested, or if there were any other restrictions that prevented the testing goals from being achieved, it’s important to note these in the report. That way, the site owners will not be aware of areas which could contain unknown vulnerabilities.

Web application security assessment reports will typically have another section that lists the details of each vulnerability found. This is the most important part of the report, and it’s important that it be clear and understandable. Usually this takes the form of a list for each vulnerability that includes things like:

- Location: A URL and a parameter, just a URL, and/or a line of code (if known). All of these will help developers find the code containing the vulnerability. Note that some vulnerabilities may exist in multiple places, in which case it’s usually fine to document multiple locations. In some cases, a vulnerability may exist throughout the website. In others, it might exist in too many places to document, but not everywhere. In any case, the goal is clarity; the reader should understand which of the above cases exists.
- How to trigger the vulnerability: Often referred to as “reproduction steps,” this is a description of how to trigger the vulnerability. This is invaluable to development teams trying to fix the vulnerability. In some cases, this can be simple as a URL (e.g. something like “Visit [http://victim.com/search?q=&lt;script>alert(‘xss’)&lt;/script>](http://victim.com/search?q=)), in other cases multiple stages of setup may be required. Ideally the reproduction steps should be clear and reproducible.
- Risk rating: Risk ratings are somewhat subjective and often require data that’s not readily available to the person performing the testing (such as the relative importance of this particular website to the site owner). However, they should be at least internally consistent within a report. Usually a rating scale is used, such as:

  - Critical: Extremely severe vulnerabilities that can result in an easy compromise of the application, such as remote code execution or SQL injection exploitable by anyone over the internet. If, in finding a vulnerability, your first thought is “how is this application not mining Bitcoin or sending spam?” it’s probably a critical risk.
  - High: Severe vulnerabilities that result in a less complete compromise and/or are more difficult to exploit. Examples might be SQL injection that’s only exploitable by internal users, most authorization vulnerabilities, or [wormable XSS](<https://en.wikipedia.org/wiki/Samy_(computer_worm)>). If your first thought upon finding a vulnerability is to let the site owner know right away, it’s probably high risk.
  - Medium: Vulnerabilities whose exploitation would only result in a partial compromise of the application, or have a high impact but are very hard to exploit (such as a timing attack that would require many billions of requests). Most XSS and CSRF vulnerabilities, and partial information disclosure (such as minor authorization issues or most source code disclosure) fall under this rating. Typically these are vulnerabilities that are important to fix but not an emergency.
  - Low: Vulnerabilities that do have an impact on the application but that impact is quite minor. Typically these are things like very minor information disclosures, issues that make exploitation of other vulnerabilities somewhat easier (like a lack of rate-limiting), or a nonconformance to best practices that has no real impact.
  - Informational: These include both vulnerabilities that are not actually exploitable but could potentially become issues in the future, functional bugs with no security impact, or other non-security issues.

  Sometimes a more structured method will be used to arrive at a risk rating, such as [CVSS](https://www.ibm.com/docs/en/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss). Note that such methods are either inflexible enough that they sometimes generate risk ratings that don’t reflect reality, or flexible enough that they don’t provide any meaningful consistency. For more guidance on determining risk ratings, see [the OWASP risk rating methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology) and the risk rating guidelines for bug bounty programs such as [Bugcrowd](https://bugcrowd.com/vulnerability-rating-taxonomy).

- Recommendation: As someone who should know more about web security than the site owner, you probably have some good advice about how to fix a particular issue. Generally, you will not know enough about the application internals to provide specific guidance, but in some cases you may. Usually, though, you should provide general advice, for example to use output encoding to fix XSS, or parameter binding to fix SQLi. Note that in many cases the site owners may not be able to exactly follow your advice. This is just a reality of application development and generally not something you should take personally.

While the above represents a reasonable minimum amount of information to include in a report, it’s fine (and often good) to include more. Professional security assessment companies sometimes produce reports that are available to the public. Reading those can provide you with inspiration for your own reports, as well as insights into vulnerabilities that can exist and their risk ratings. [This GitHub](https://github.com/juliocesarfort/public-pentesting-reports/tree/master) contains a large repository of public reports. Note that many public reports do not include vulnerability details, but some (such as the following) do:

- [Bishop Fox - Winston Privacy](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Bishop%20Fox/Bishop%20Fox%20Assessment%20Report%20-%20Winston%20Privacy.pdf)
- [Cure53 - 1Password](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Cure53/Cure53-1PW18-report.pdf)
- [DoyenSec - Gravity Platform](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Doyensec/Doyensec_Gravitational_GravityPlatform_Q22019.pdf)
- [iSEC - phpMyAdmin](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/iSEC/NCC_Group_-_phpMyAdmin.pdf)

One last note on reporting: it is very important that you document findings in your report as you test. Typically, new testers will want to keep on testing, thinking that it’ll be easy to write up the report later. This is false. They finish their testing then struggle to complete their report, often needing to go back and do more testing in order to complete their report. It may seem inefficient to stop testing and write up a vulnerability in your report, especially if you have to update that vulnerability later. However, it’s more efficient to do exactly this.

## Practice

The bulk of this learning path is this practice. Here you will pull together all of the techniques you learned in prior subtopics to find vulnerabilities in a real web application. You should expect this to take you some time. Typically, it would take a skilled practitioner up to a week to fully assess an application like Juice Shop, and you are not yet a skilled practitioner. You may find yourself struggling; that’s normal. Resist the temptation to look up walkthroughs or answer keys, or to look at the following sections of this learning path. The struggle is a natural and important part of the learning process.

1. [Install Juice Shop](https://hub.docker.com/r/bkimminich/juice-shop/#docker-container) (using Docker is the easiest method)
2. By default, Juice Shop has dangerous vulnerabilities disabled. Those are the most important vulnerabilities to find! You’ll want to [change the configuration](https://pwning.owasp-juice.shop/companion-guide/latest/part4/customization.html) to set safetyOverride to true. While you’re at it, also include all the configuration flags in [quiet.yml](https://github.com/juice-shop/juice-shop/blob/master/config/quiet.yml).
3. Prepare your testing environment:
   - Burp or whatever proxy you prefer
   - One or more browser profiles for testing
   - A methodology to refer to
   - The beginnings of a report
   - Your notes documents
4. Start testing! Remember to be methodical, keep detailed notes, and document vulnerabilities as you find them. Remember that there may be vulnerabilities that don’t exist in the site, inputs that aren’t vulnerable to anything, and multiple instances of some types of vulnerabilities.

You shouldn’t expect to find every instance of every vulnerability. Try for it, but don’t be too disappointed when you don’t. Also, try not to second-guess yourself too much about whether or not you tested thoroughly enough. It is [literally impossible](https://en.wikipedia.org/wiki/Computability_theory) to confidently know that you’ve found all the vulnerabilities in all but the most limited applications.

Instead, go through the methodology and try to thoroughly test the website. If you have things to revisit from your notes, revisit them briefly, but don’t spend a ton of time on those things. Remember, this is just a practice.

## Skill Check

If you have a mentor, review your practice report with them. You will probably find it useful to look at one or more of the write-ups that contain vulnerabilities that other people have found, [here's one](https://pwning.owasp-juice.shop/companion-guide/latest/part2/README.html). Note that Juice Shop contains a bunch of challenges. The challenges mainly involve exploiting vulnerabilities. The best thing to do is to have your mentor give you hints on the vulnerabilities you missed, for example what page they’re on, then try to find them yourself. If you’re really stuck, have your mentor walk through the vulnerability with you.

If you don’t have a mentor, you can self mentor for this subtopic. You can simply perform the above activities. Instead of getting a hint from your mentor, briefly glance at the challenges, and try to figure out the associated vulnerability. Again, if you’re really stuck, there are numerous walkthroughs, both written and in video format.

الموضوع الفرعي 5: العثور على ثغرات تطبيق الويب
حالة استخدام
بطريقة أو بأخرى يقبل كل تطبيق ويب المدخلات غير الموثوقة ويعالجها، وعادة ما يأتي هذا الإدخال من المستخدمين النهائيين ومتصفحاتهم ولكن قد يأتي أيضًا من مواقع ويب أخرى أو أنظمة خلفية. وحسب المكان الذي تتدفق إليه هذه المعلومات قد يكون لمعالجة البيانات تأثيرات غير مرغوب فيها على موقع الويب أو مستخدميه.
الأهداف 
بعد استكمال هذا الموضوع الفرعي، سيتمكن الممارسون من العثور على ثغرات في موقع ويب حقيقي بدلاً من فهم ثغرات فردية بمعزل عن غيرها.
العرض 
بعد استكمال المواضيع الفرعية السابقة، يجب أن يكون لديك فهم جيد لثغرات الفردية، وفي حين أن هذا قد يكفي لإرشادك حول إصلاح ثغرات أو إجراء التحليلات الجنائية في خرق تطبيق الويب إلا أنه لا يكفي إذا كنت ترغب في العثور على هذه الثغرات في تطبيق ويب. في حين أن المخابر السابقة كانت ألغازًا مركزة تتحداك لتنشيط نقطة ضعف باستخدام إدخال واحد، إلا أنه ضمن تطبيق ويب حقيقي لن تكون معظم المدخلات عُرضة لأي شيء، وسيكون التحدي الذي يواجهك هو التمكّن من العثور على المدخلات النادرة المعرضة للخطر. 
للمساعدة في ذلك من المفيد أن يكون لديك إطار ذهني لتوجيه اختبارك، وسيسمح ذلك بتنظيم أفكارك وملاحظاتك حول ما تجربه ويمكن أن يكون أيضًا بمثابة قائمة تحقق. لا تستخف بقوته! قوائم التحقق هي سبب كون السفر عبر الجو آمنًا وقد أدى إدخال قوائم التحقق إلى وحدات العناية المركزة في مستشفيات إحدى الولايات الأمريكية إلى انخفاض معدلات الإصابة بمعدل ⅔ وينقذ على مدى أكثر من عام ونصف حياة أكثر من 1500 شخص. يمكن أن تستفيد أي مهمة معقّدة وعُرضة للخطأ بشكل كبير من وجود قائمة تحقق ويُعد اختبار تطبيقات الويب أمرًا شديد التعقيد وعرضة للخطأ. 
أهداف التمرن
في هذا الموضوع الفرعي ستقوم بفحص تطبيق ويب فيه ثغرة عن قصد، حيث ستحاول العثور على جميع الثغرات الأمنية في التطبيق وتوثيقها. 
في البداية ستحتاج إلى تطبيق لاختبارها، ومن الخيارات (السيئة) أن تعثر على موقع ويب عشوائي على الإنترنت وتحاول اقتحامه، ولكن ليست هذه فكرة جيدة لسببين: اولاً هذا أمر غير أخلاقي، فحتى لو كانت نواياك حسنة ، ماذا لو ألحقت الضرر بالموقع عن طريق الخطأ؟ ومن المرجح أن يكون هذا غير قانونيًا في المكان الذي تعيش فيه. وثانيًا وبالأخص في البداية من المستحيل معرفة الفرق بين كون الموقع آمنًا ومدى إجادتك للاختبار. 
ويتمثل حل هذه المشكلة في التدرب على موقع فيه ثغرة مقصودة مصممة بشكل صريح للأشخاص للتمرن على العثور على ثغرات واستغلالها ومن الأخلاقي والقانوني اختبارها (يمكن تنزلي معظمها كي تتمكن من اختباره على جهاز الكمبيوتر الخاص بك)، وفيها عدة ثغرات معروفة حتى تتمكن من تقييم نجاحك. بالنسبة لهذا الموضوع الفرعي، سنستخدم تطبيق الويب جوس شوب (Juice Shop) من مشروع أمان تطبيق الويب المفتوح الذي يعاني من ثغرات. 
تنظيم اختبارك
ستحتاج بعدها إلى منهجية لتوجيه اختبارك. مع اكتسابك الخبرات من المرجح أن تبدأ بتطوير إطار عمل وإجراءات تخصك ملائمة لأسلوب العمل الذي تُفضله، ولكن في البداية ستحتاج إلى منهجية كي تتمكن من البدء. بالنسبة لمسار التعلّم هذا، سنستخدم منهجية كتبها تانر برين (Tanner Prynn) تتماشى مع المعايير المستخدمة في معظم ممارسات اختبار اختراق تطبيقات الويب الاحترافية. تُعد وثيقة تفاصيل المنهجية هذه حلاً وسطًا جيدًا بين الإيجاز والشمولية (قارن بين عدد صفحاته البالغ 23 صفحة بدليل اختبار مشروع أمان تطبيق الويب المفتوح البالغ عدد صفحاته 465). لا يشمل جميع الثغرات المحتملة ولا يحتوي على إرشادات كاملة لاختبار ثغرات التي تغطيها ولكن يجب أن يكفي للسماح لك بالاستفادة من الخبرة التي لديك.
بالإضافة إلى وجود إطار عمل وقائمة تحقق لما اختبرته من المهم للغاية أن تدوّن ملاحظات مفصّلة، علمًا أن الملاحظات المنظمة بشكل قائمة تحقق لا تكفي لتشمل جميع الأشياء، وفيما يلي بعض الأمثلة على كيفية استخدام الملاحظات ذات الشكل الحر:
قد تكون في وسط إجراء اختبارات مركزة قبل أن تلاحظ بعض العمليات الغريبة على الموقع، لكن لا تُقاطع اختبارك المركّز وإنما دوّن الملاحظات وتحقق من العملية الغريبة لاحقًا. 
في حال لم تفهم كيفية عمل قسم ما من الموقع، دوّن ملاحظة حول ذلك.  وهذا أمر يسمح لك في حال كنت تعمل مع مالك الموقع أن تطرح مجموعة من الأسئلة عليه في وقت واحد بدلًا من إزعاجه طوال اليوم، أو ربما تتوضّح لك طريقة عمل هذا القسم من الموقع أثناء تنقلك خلال بقيته. 
ربما تجد مكانًا لإدخال البيانات ولكن لا يكون من الواضح فورًا مكان استخدام هذه البيانات، وهذا أمر آخر يمكنك تدوينه. ربما ستعثر على مكان ظهور هذه البيانات لاحقًا وفي حال تمكّنت من ذلك ستحتاج إلى إلقاء نظرة على كلا صفحتي الويب عند اختبار هذا الإدخال.
دوّن دائمًا ملاحظات حول أي أماكن لا يعمل فيها الموقع بشكل صحيح لأنك ستحتاج إليها في تقريرك.
في بعض الأحيان ستكون متأكدًا من أن مدخلًا معينًا معرّض لخطر ما ولكنك ستواجه صعوبة في التمكّن من معرفة ماهيته أو كيفيته. اكتب ما جربته ثم تابع، فقد تمنحك بضع ساعات أو ليلة من الراحة منظورًا جديدًا.
إعداد التقارير
أخيرًا وكي يتمكّن أي شخص من الاستفادة من عملك الشاق ستحتاج إلى توثيق الثغرات التي تجدها، حيث إنه بشكل عام ستقوم بفحص موقع شخص آخر وستُنتج نوعًا من التقارير سواء كانت رسمية أو غير رسمية. وبغض النظر يجب أن تكون بعض الأهداف الأساسية أو التقرير هي إيصال المعلومات التالية:
ما تم اختباره
ما لم يتم اختباره وسبب ذلك
وبالنسبة لكل ثغرة تم العثور عليها:
مكان وجود الثغرة
كيفية التسبب بحدوث هذه الثغرة كي تتمكن من تكرارها لاحقًا
ما هو تأثير الثغرة الأمنية على المخاطر/الأمن
توصيات لإصلاح الثغرات
عادةً ما تحتوي التقارير على قسم تمهيدي يتحدث عما تم اختباره وما لم يتم اختباره متبوعًا بقسم آخر يحتوي تفاصيل كل ثغرة عُثر عليها، ودعونا نتعمق في كل قسم.
عادة ما يحتوي القسم التمهيدي على معلومات حول التطبيق الذي تم اختباره، كما أن تفاصيل عنوان موقع ويب التطبيق والبيئة التي تم اختباره فيها (مثل الإنتاج مقابل التشغيل المرحلي) والنطاق الزمني الذي تم فيه إجراء الاختبار كلها مهمة وتسمح لمطوري مواقع الويب بوضع سياق الاختبار مقابل دورات التطوير والإصدار الخاصة بهم. 
من المهم أيضًا تضمين معلومات حول أهداف الاختبار، فبالنسبة لبعض الاختبارات قد يكون الهدف هو اختبار الثغرات الأمنية التي قد تؤدي إلى الاستيلاء الكامل على البنية التحتية لخادم الويب فقط. وبالنسبة لغيرها قد يكون الهدف هو إجراء اختبار شامل وكامل للغاية. بالنسبة لمعظم اختبارات تطبيقات الويب، يجب إكمال الاختبار في غضون فترة زمنية معينة وهدف ذلك تحديد أكبر عدد ممكن من الثغرات المؤثرة في ذلك الوقت، حيث يمثل تضمين هذه المعلومات الخط الفاصل بين وصف ما تم وما لم يتم اختباره.
أخيرًا إذا تم استبعاد أي أنواع من الاختبارات أو لم يتم اختبار أي أجزاء من الموقع أو إذا كانت هناك أي قيود أخرى تمنع تحقيق أهداف الاختبار فمن المهم تدوينها في التقرير، وبهذه الطريقة لن يكون مالكو الموقع على دراية بالمناطق التي قد تحتوي على ثغرات أمنية غير معروفة.
عادةً ما تحتوي تقارير تقييم أمان تطبيقات الويب على قسم آخر يسرد تفاصيل كل ثغرة أمنية يتم العثور عليها، فهذا هو الجزء الأكثر أهمية في التقرير ومن الضروري أن يكون واضحًا ومفهومًا. وعادة ما يأخذ هذا بشكل قائمة بكل ثغرة تتضمن أشياء مثل:
الموقع: عنوان موقع الويب ومعامله أو مجرد عنوان موقع الويب فقط و/أو سطر تعليمات برمجية (في حال كانت معروفة)، مما سيساعد المطورين في العثور على التعليمات البرمجية التي تحتوي على الثغرة. لاحظ أن بعض الثغرات الأمنية قد تكون موجودة في أماكن متعددة وفي هذه الحالة عادة ما يكون من الجيد توثيق مواقع متعددة وفي بعض الحالات قد توجد ثغرة أمنية في جميع أنحاء الموقع، بينما في حالات أخرى قد يكون موجودًا في أماكن كثيرة جدًا إلى حد لا يسمح بالتوثيق ولكن ليس في كل مكان. على أي حال، يُعدّ الهدف هو الوضوح حيث يجب على القارئ أن يفهم أي من الحالات المذكورة أعلاه موجودة.
كيفية التسبب بحدوث الثغرة: غالبًا ما يشار إليها باسم "خطوات التكرار" وهي وصف لكيفية التسبب بحدوث الثغرة، وهو أمر لا يقدر بثمن لفرق التطوير التي تحاول إصلاح الثغرة. في بعض الحالات، يمكن أن يكون هذا بسيطًا مثل مجرد عنوان موقع الويب (على سبيل المثال، شيء مثل "قم بزيارة `http://victim.com/search?q=<script>alert(‘xss’)</script>`)، وفي حالات أخرى قد تكون هناك حاجة إلى مراحل متعددة من الإعداد. من الناحية المثالية يجب أن تكون خطوات التكرار واضحة ومن السهل تكرارها.
تصنيف المخاطر: تصنيفات مخاطر ذاتية إلى حد ما وغالبًا ما تتطلب بيانات غير متاحة بسهولة للشخص الذي يُجري الاختبار (مثل الأهمية النسبية لموقع الويب هذا بالنسبة لمالكه)، لكن يجب أن تكون متسقة داخليًا على الأقل في التقرير، فعادة ما يستخدم مقياس تقييم مثل الوارد أدناه:
الحالات الحرجة: الثغرات شديدة الخطورة التي يمكن أن تؤدي إلى اختراق التطبيق بطريقة سهلة، مثل تنفيذ التعليمات البرمجية عن بُعد أو حقن لغة الاستعلامات البنيوية والتي تسمح باستغلالها من قبل أي شخص عبر الإنترنت. إذا كان أول ما يجول خاطرك عند العثور على ثغرة أمنية هي "كيف من المعقول أن هذا التطبيق لا يُستغل في تعدين البيتكوين أو إرسال رسائل غير مرغوب فيها؟" فمن الأغلب أنه خطر حرج.
الحالات عالية الخطورة: ثغرات شديدة تؤدي إلى اختراق أقل شمولية و/أو يصعب استغلاله، ومن الأمثلة على ذلك حقن لغة الاستعلامات البنيوية الذي لا يمكن استغلاله إلا من قبل المستخدمين الداخليين، أو معظم ثغرات التخويل أو البرمجة النصية عبر المواقع التي يمكن تحويلها إلى ديدان. إذا كان أول ما يجول خاطرك عند العثور على ثغرة هي إخبار مالك الموقع على الفور فمن المحتمل أن تكون عالية الخطورة.
الحالات متوسطة الخطورة: ثغرات لن يؤدي استغلالها إلا إلى اختراق جزئي للتطبيق أو يكون لها تأثير كبير ولكن من الصعب جدًا استغلالها (مثل هجوم التوقيت الذي يتطلب عدة مليارات من الطلبات)، وتندرج تحت هذا التصنيف معظم ثغرات البرمجة النصية عبر المواقع وتزييف طلب المواقع المشتركة، والكشف الجزئي عن المعلومات (مثل مشكلات التخويل البسيطة أو معظم حالات كشف التعليمات البرمجية المصدر)، وعادة ما تكون هذه ثغرات تحتاج الإصلاح ولكن ليست حالة طارئة.
الحالات منخفضة الخطورة: للثغرات تأثير على التطبيق ولكن هذا التأثير طفيف للغاية، وعادةً ما تكون مثل الإفصاحات الطفيفة جدًا عن المعلومات أو المشكلات التي تجعل استغلال ثغرات الأخرى أسهل إلى حد ما (مثل الافتقار حد على المعدلات) أو عدم الامتثال لأفضل الممارسات التي ليس لها تأثير حقيقي.
الحالات المعلوماتية: تشمل هذه الثغرات كلًا من الثغرات الأمنية التي لا يمكن استغلالها في الواقع ولكن من المحتمل أن تصبح مشاكل في المستقبل والأخطاء الوظيفية التي ليس لها أي تأثير أمني أو غيرها من المسائل غير الأمنية.
في بعض الأحيان، ستُستخدم طريقة أكثر تنظيمًا للوصول إلى تصنيف للمخاطر مثل نظام تسجيل الثغرات الأمنية الشائعة، ولاحظ أن مثل هذه الأساليب إما غير مرنة بما يكفي بحيث تُولد أحيانًا تصنيفات للمخاطر لا تعكس الواقع أو مرنة بما يكفي بحيث لا توفر أي اتساق ذي مغزى. لمزيد من الإرشادات حول تحديد تصنيفات المخاطر راجع منهجية تصنيف مخاطر مشروع أمان تطبيق الويب المفتوح وإرشادات تصنيف المخاطر لبرامج مكافآت الأخطاء مثل بغ كراود (Bugcrowd).
التوصيات: بصفتك شخصًا من المفترض أن يعرف المزيد عن أمان الويب أكثر من مالك الموقع، من المرجّح أن يكون لديك بعض النصائح الجيدة حول كيفية إصلاح مشكلة معينة. وبشكل عام لن تعرف ما يكفي عن التطبيقات الداخلية لتقديم إرشادات محددة ولكن في بعض الحالات قد تعرف. لكن سيتوجّب عليك عادة تقديم نصائح عامة تشمل على سبيل المثال استخدام ترميز المُخْرج لإصلاح البرمجة النصية عبر المواقع أو ربط المعلمات لإصلاح حقن لغة الاستعلامات البنيوية. لاحظ أنه في كثير من الحالات قد لا يتمكن مالكو الموقع من اتباع نصيحتك بدقة، فهذا مجرد واقع لتطوير التطبيقات وعمومًا ليس شيئًا يجب أن تأخذه على المحمل الشخصي.
في حين يُمثل ما سبق الحد الأدنى المعقول من المعلومات التي يجب تضمينها في التقرير، من المستحسن إضافة المزيد وهو أمر من المرجح أن يكون بالفعل جيدًا. تُنتج شركات التقييم الأمني المهنية أحيانًا تقارير متاحة للعامة، ويمكن أن توفر لك قراءتها مصدر إلهام لتقاريرك الخاصة بالإضافة إلى رؤى حول ثغرات التي يمكن أن توجد وتقييمات المخاطر الخاصة بها. تحتوي صفحة غت هب (GitHub) هذه على مستودع كبير يشمل تقارير متاحة للعامة، علمًا أن العديد من التقارير العامة لا تتضمن تفاصيل الثغرات، وإنما بعضها فقط مثل ما يلي:
بيشوب فوكس (Bishop Fox) - ونستون برايفيسي (Winston Privacy)
كيور 53 (Cure53) - ون باسوورد (1Password)
دوين سيك (DoyenSec) - غرافيتي بلاتفورم (Gravity Platform)
آي سيك (iSEC) - ب إتش ب ماي آدمن (phpMyAdmin)
ملاحظة أخيرة حول إعداد التقارير: من المهم جدًا أن توثّق النتائج في تقريرك أثناء الاختبار، حيث سيرغب الفاحصون الجدد عادة في الاستمرار بإجراء الاختبار معتقدين أنه سيكون من السهل كتابة التقرير لاحقًا، - وهذا خطأ- يُنهون اختبارهم ثم يعانون لإكمال التقرير وغالبًا ما يحتاجون إلى العودة وإجراء اختبارات إضافية من أجل إكمال تقريرهم، وقد يبدو من غير الفعّال إيقاف الاختبار والكتابة عن ثغرة في تقريرك خاصة إذا كان عليك تحديثها لاحقًا، ولكن من الأفضل القيام بذلك بالضبط.
موارد التعلّم
الممارسة
تُمثل الممارسة الجزء الأكبر من مسار التعلّم هذا، حيث ستجمع كل التقنيات التي تعلمتها في المواضيع الفرعية السابقة للعثور على ثغرات في تطبيق ويب حقيقي. ومن المتوقع أن يستغرق هذا بعض الوقت. عادةً ما يتطلب هذا الأمر من الممارس الماهر ما يصل إلى أسبوع قبل إجراء تقييم كامل لتطبيق مثل جوس شوب وأنت في هذه النقطة لم تصبح بعد ممارسًا ماهرًا، وقد تواجه صعوبة ولكن هذا أمر طبيعي. قاوم رغبة البحث عن أدلة التوجيه خطوة بخطوة أو مفاتيح الإجابة أو إلقاء نظرة على الأقسام التالية من مسار التعلّم هذا لأن الصعوبة جزء طبيعي ومهم من عملية التعلّم.

ثبّت جوس شوب (أسهل طريقة هي باستخدام داكر)
يحتوي جوس شوب بشكل افتراضي على ثغرات أمنية خطيرة غير مفعّلة، وهي أهم ثغرات يجب العثور عليها. ستحتاج إلى تغيير التكوين لضبط خيار safetyOverride بحيث يصبح true وعند قيامك بذلك تأكد أيضًا من تضمين جميع علامات التكوين في quiet.yml.
أعد بيئة الاختبار خاصتك:
بيرب أو أي وكيل تفضله
ملف تعريف متصفح واحد أو أكثر لاختباره
منهجية ترجع إليها
بدايات تقرير
مستندات ملاحظاتك
أبدأ الاختبار! تذكر أن تكون منهجيًا وأن تحتفظ بملاحظات مفصلة وأن تُوثق الثغرات الأمنية عند العثور عليها. تذكر أنه قد تكون هناك ثغرات أمنية غير موجودة في الموقع، ومدخلات ليست عرضة لأي شيء، وحالات متعددة لبعض أنواع الثغرات الأمنية. 

لكن لا تتوقع العثور على جميع حالات الثغرات الأمنية، ويمكنك بالطبع محاولة ذلك ولكن لا تشعر بخيبة أمل كبيرة عندما لا تستطيع. حاول أيضًا ألا تشكك في نفسك كثيرًا حول ما إذا كنت قد أجريت اختبارًا شاملاً بما فيه الكفاية أم لا. من المستحيل حرفيًا أن تثق بأنك وجدت جميع الثغرات في جميع التطبيقات باستثناء التطبيقات الأكثر محدودية. 

بدلاً من ذلك، راجع المنهجية وحاول اختبار موقع الويب بدقة، وإذا كان لديك أشياء ترغب بإعادة النظر فيها من ملاحظاتك، فقم بإعادة النظر فيها بإيجاز ولكن لا تقضِ الكثير من الوقت في فعل ذلك، وتذكر أنها مجرد تمارين.
اختبار مهارة
إذا كان لديك مرشد، راجع تقرير التدريب الخاص بك معه فمن المحتمل أن تجد أنه من المفيد إلقاء نظرة على واحدة أو أكثر على المقالات التي تحتوي على ثغرات وجدها الآخرون وهنا تجد إحداها. لاحظ أن جوس شوب يحتوي على مجموعة من التحديات وتنطوي بشكل أساسي على استغلال الثغرات، وأفضل ما يمكنك فعله هو أن تحصل من مرشدك على تلميحات حول ثغرات فاتتك على سبيل المثال للصفحة التي أنت موجود عليها وثم محاولة العثور عليها بنفسك. لكن في حال كنت عالقًا بحق يمكنك أن تطلب من مرشدك أن يوجهك خلال الثغرة. 

إذا لم يكن لديك مرشد يمكنك توجيه نفسك حول هذا الموضوع الفرعي ويمكنك ببساطة تنفيذ الأنشطة المذكورة أعلاه. بدلاً من الحصول على تلميح من مرشدك، ألقِ نظرة موجزة على التحديات وحاول التعرّف على الثغرات المرتبطة بها. ومرة أخرى في حال وصلت إلى نقطة تعلق فيها فعلًا يمكنك الاطلاع على العديد من أدلة التوجيه خطوة بخطوة سواء كانت مكتوبة أو في شكل فيديو

## Learning Resources

{{% resource title="The Checklist" languages="English" cost="Free for first articles from the publication, later ones require subscription" description="An article about the importance of using checklists in various professions." url="https://www.newyorker.com/magazine/2007/12/10/the-checklist" %}}

{{% resource title="OWASP vulnerable web applications directory" languages="English" cost="Free" description="A collection of web applications with known vulnerabilities for testing web assessment and penetration testing skills." url="https://owasp.org/www-project-vulnerable-web-applications-directory/" %}}

{{% resource title="Methodology for high-quality web application security testing" languages="English" cost="Free" description="A comprehensive list of issues to review when assessing the security of web applications." url="https://github.com/tprynn/web-methodology/wiki" %}}

{{% resource title="Samy (worm)" languages="English, Arabic, Chinese, Indonesian, Lombard" cost="Free" description="An example of a malicious code exploiting XSS vulnerabilities." url="https://en.wikipedia.org/wiki/Samy_(computer_worm)" %}}

{{% resource title="An overview of CVSS" languages="Arabic, Bulgarian, Catalan, Czech, Danish, German, Greek, English, Spanish, Finnish, French, Croatian, Hungarian, Italian, Hebrew, Japanese, Korean, Kazakh, Dutch, Norwegian, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Serbian, Swedish, Thai, Turkish, Vietnamese, Chinese Simplified, Chinese Traditional" cost="Free" description="A quick look at the Common Vulnerability Scoring System (CVSS), used to rate the severity of vulnerabilities." url="https://www.ibm.com/docs/en/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss" %}}

{{% resource title="OWASP risk rating methodology" languages="English" cost="Free" description="Describes OWASP's methodology for rating risks of vulnerabilities and exploits." url="https://owasp.org/www-community/OWASP_Risk_Rating_Methodology" %}}

{{% resource title="Bugcrowd vulnerability taxonomy" languages="English" cost="Free" description="Bugcrowd's approach to tracking risks of vulnerabilities." url="https://bugcrowd.com/vulnerability-rating-taxonomy" %}}

{{% resource title="Public penetration testing reports" languages="English" cost="Free" description="A public repository of penetration testing reports." url="https://github.com/juliocesarfort/public-pentesting-reports/tree/master" %}}
