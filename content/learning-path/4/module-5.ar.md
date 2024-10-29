+++
style = "module"
weight = 5
title = "Application Logic"
description = "Here we learn about application logic vulnerabilities, what they are, and how to protect our website against them"
+++

## Use Case

In any interactive website that puts constraints on the types of actions that users can perform, it’s important that the site properly enforces those constraints to prevent unintended (and potentially) damaging actions by malicious users.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand the concept of application logic vulnerabilities
- Identify and understand common subclasses of application logic vulnerabilities, including:
  - Client-side controls
  - Lack of rate limiting/multiple submissions
  - Rounding inconsistencies
  - Skipping process steps
  - Cross-site request forgery

---
## Main Section
Application logic vulnerabilities (frequently called business logic vulnerabilities) are a loosely assembled class of vulnerabilities that relate to the processes that the application itself performs, as opposed to underlying vulnerabilities in the technologies that the application uses. If this definition is confusing to you, you’re in good company. What constitutes a business logic vulnerability vs some other class is hotly contested. Infuse takes the position that the actual definition doesn’t matter that much, and that expediency is more important than precise definitions. We encourage you to maintain a focus on the vulnerabilities themselves, develop a view of vulnerability classes that makes sense to you, and maintain flexibility in taxonomy when discussing vulnerabilities with others.

This subtopic will cover a number of examples of vulnerabilities that arguably fall under application logic. As every application is slightly different, there are an infinite number of potential types of application logic vulnerabilities, but these examples cover a number of common ones.

### Client-side controls

Sometimes web applications will put constraints on what users can do in the application, but those constraints are enforced by the browser, either using JavaScript or built-in features of HTML elements. It is important that site developers realize that anything that is sent to the browser can be viewed, modified, or ignored by a moderately skilled attacker. Here are some example of common client-side controls that can be easily bypassed

#### Input size

HTML input elements have an attribute maxlength that purports to limit the number of characters typed into an input field, e.g. `<input type="text" name="firstname" maxlength="20">`. In this example, if a user tries to put more than 20 characters into the input field, the browser will prevent them from doing so. However, this is really just a polite request, as opposed to a real restriction. For example:

- The user could use the web inspector feature of their browser to modify the DOM to remove the length restriction.
- The user could save the web page locally, modify the HTML to remove the restriction, then load the page back into their browser.
- The user could read the HTML and manually craft an equivalent request in `curl` (a command line tool to download resources and transfer data using a variety of different protocols) to the one the form generates, only without the length restriction.
- The user could use a specialized tool called an intercepting proxy to capture the web page from the server before it’s sent to the browser, and remove the restriction before sending it onto the browser. Or the user could use the same tool to capture the browser’s request before it’s sent to the server, then edit the request to include a longer value and send it on to the server.

These bypass techniques generally work for all client-side controls. Keep them in mind as we cover other controls.

#### Data content validation

Some developers will use JavaScript to restrict the values that can be entered into a form, or use HTML controls like radio buttons or drop-downs to restrict possible choices. Neither of these controls are effective. Using the same techniques as described above, attackers can remove the restrictions in their browser or bypass them to submit whatever data they want.

One common subclass of this type of vulnerability has to do with image resizing. Occasionally developers will have a feature on a website that resizes images server-side for optimal display at a certain resolution. Generally the URL will look something like [http://example.com/image?imgname=file.gif&width=640&height=480](http://example.com/image?imgname=file.gif&width=640&height=480). The way these scripts almost always work is to allocate in-memory storage to hold the resized image, scale the specified file to the new size, then return the image data to the browser. In the above example, the memory allocated would usually be a modest 1.2 megabytes. However, if a user sent a request with a width and height each of 100000, the server would attempt to allocate 10 gigabytes. By repeatedly sending such requests, an attacker can easily overwhelm even a powerful web server. Developers should at least enforce a maximum size on the server-side, and consider offloading the resizing process to an isolated server, so that overwhelming that server doesn’t affect the primary server.

#### Disabling controls

Sometimes developers will use JavaScript to disable certain controls on a web page until certain constraints are met. For instance, perhaps a user needs to solve a CAPTCHA or wait a certain amount of time before submitting a form or clicking a link. Using the techniques above, an attacker can simply remove or bypass these controls.

#### Sensitive data stored client-side

Sometimes developers will include sensitive data in a web page that is either secret, or controls something that should not be under user control. An example of the former might be attempting to restrict the data a user sees by hiding secret data using the CSS display=none attribute, enclosing it in HTML comments, or other mechanisms. The user can see this data by simply viewing the HTML source code of the web page. An example of giving client-side control by including data that should not be edited in hidden form fields. For instance, in the early days of e-commerce, web stores would frequently include an item’s price in a hidden HTML form input, which was then sent to a 3rd-party shopping cart. Using the techniques discussed in “input size,” users could easily modify the value in that hidden field, and buy it for whatever price they wanted. (You may remember that another example of this type of vulnerability was discussed under “horizontal privilege escalation” above.)

#### Preventing client-side control vulnerabilities

There is nothing inherently bad about performing validation of input on the client-site, but developers must understand that they are merely UI conveniences. All validation and sensitive computations must be performed on the server, not on the client.

### Lack of rate limiting/multiple submissions

One class of application logic vulnerability is an implicit constraint on the number of times or frequency that a request may be sent. The former is often abused when the server performs expensive or abusable operations, such as insertions of data into a database with lots of indices, sending emails or SMS messages, or generally manipulating large amounts of data. The image resizing vulnerability discussed above would be another example of this. Developers don’t generally think of the rate at which users submit such requests as an application logic constraint to be enforced, and yet it arguably fits into the vulnerability class.

There are many methods of rate limiting requests, but the only ones that are truly effective are those that are enforced on the server site. For expensive operations, various queuing systems can be used to ensure that only a small number of such operations can be performed at once. More complex systems involving CAPTCHAs, per-account and per-IP address rate limiting may be required for frequently-abused operations.

A related case is requests that are meant to only be submitted once or a few times. One example might be a helpdesk site that lets users generate a ticket number. If a user can, for instance, register 20 tickets, and link them all to a specific case/ intervention, that will have a negative effect on the site owners!

### Rounding inconsistencies

One interesting class of vulnerabilities has to do with how various operations handle factions. This class of vulnerability has been featured in such movies as _Superman 3_ and _Office Space_, yet still occurs in numerous financial applications. If two applications support transferring money between each other, how then handle fractional cents may be important. If one application rounds off fractional cents, and another truncates them, then an attacker can repeatedly transfer 1.9 cents from the truncating application to the rounding application. Each transfer will cost the user 1 cent (1.9 truncated), and gain them 2 cents (1.9 rounded).

There are many ways to prevent vulnerabilities in rounding. The most straightforward is to reject transactions with fractional values. Alternatively, one can fully support fractional currencies. Finally, if rounding/truncating/etc is required, one has to do the hard work of ensuring that the handling of fractions is consistent.

### Skipping process steps

Often websites will have processes that are presented to users as a series of steps. While the intention of the developers may be to have the user go through each step, often the application will still allow users to complete the process without going through each step. Consider an online shopping site that allows users to add items to their cart, specify their delivery options, specify their payment information, and then finally complete the transaction. It is not unheard of for actual sites to perform the transaction if the user simply performs the first two steps and then goes directly to the complete transaction page. While this is rare in actual ecommerce sites, it’s not uncommon in various e-learning platforms, where the user can skip watching the boring videos and go directly to the page that marks their attendance as complete.

### Cross-site request forgery

Our last application logic vulnerability is often considered to be its own vulnerability class altogether, but we’re including it here for expediency. The essence of CSRF (cross site request forgery) is in some situations, web browsers will send a website the user’s cookies for every request to that site, regardless of the site that generated the request. If a malicious site, when a user visits the site, generates a fraudulent request to a target site, and the user is logged into the target site, then the target site will perform the requested action as the user, even though the user did not intentionally trigger the request.

As an example, consider a site where the password reset mechanism is that the site emails you a link that allows you to change your password. This is fairly normal. Imagine that the same site has a page that allows you to change your email address, and if you simply visit [example.com/changeemail?new=123@attacker.com](http://example.com/changeemail?new=123@attacker.com), it will change your email address to the specified address. Finally, imagine that attacker.com is set up to show page after page of photos of adorable animals. However, there’s a trick. The “next” button on the bottom of the page is actually the link above. If a user is logged into example.com, visits attacker.com, and clicks the “next” button, their email address will be changed, and the attacker can immediately reset the user’s password, gaining control of their account.

#### Try it yourself!

Log into your DVWA and make sure the security level is set to low. Navigate to the “CSRF” page and try to generate a web page that will change the logged-in user’s password. Note that, if you have an up to date web browser, it might automatically restrict SameSite attributes of session cookies and the lab might not work there. If this happens, do not worry and skip this exercise–this is normal and desired behavior by the web browser.

### Preventing CSRF

The most straightforward way of preventing CSRF is to explicitly set the SameSite attribute of session cookies to Lax or Strict, and to ensure that any request that changes data only changes that data if it’s submitted with HTTP POST. Other methods may work, but are more complex.

For more information about CSRF, see [the OWASP page about it](https://owasp.org/www-community/attacks/csrf) and the [OWASP CSRF protection cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

For an in-depth exploration of both CSRF and other application logic vulnerabilities, see the [Web Application Security Assessment learning path](/en/learning-path/5/).

## Skill Check

For this section, we have decided to skip the skill check for one very simple reason: web browsers are currently changing their policies so that SameSite cookie policies are now Lax by default, which should automatically stop a lot of CSRF attacks from functioning. Because of this, any exercises we suggest might no longer function in the future.

If you would still like to do some sort of skill check exercise, try the DVWA lab linked above to see if it works. If it does not, hold a brief conversation with a peer or mentor about why the changes in web browsers’ default settings mean that the lab no longer works and ask them to verify that you’ve properly understood the topic.

الموضوع الفرعي 5: منطق التطبيق
حالة استخدام
في أي موقع ويب تفاعلي يضع قيودًا على أنواع الإجراءات التي يمكن للمستخدمين تنفيذها، من المهم أن يفرض الموقع هذه القيود بشكل صحيح لمنع الإجراءات الضارة غير المقصودة (والمحتملة) من قبل المستخدمين الخبيثين.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم مفهوم الثغرات المنطقية في التطبيقات
تحديد وفهم الفئات الفرعية الشائعة لثغرات منطق التطبيق بما في ذلك:
الضوابط من جانب العميل
عدم وجود حد لمعدل/تقديم طلبات متعددة
تضاربات التقريب
تجاوز خطوات العملية
تزييف الطلبات عبر المواقع
العرض 
تُعدّ ثغرات منطق التطبيق (تسمى في كثير من الأحيان ثغرات منطق الأعمال) فئة من الثغرات المجمّعة على نطاق واسع والتي تتعلق بالعمليات التي يقوم بها التطبيق نفسه على عكس ثغرات الأساسية في التقنيات التي يستخدمها التطبيق. إذا شعرت بأن هذا التعريف مربك فلست الوحيد لأن ما يشكل ثغرة في منطق الأعمال مقابل فئة أخرى هو موضع نزاع محتدم. يتمثل موقف إنفيوز (Infuse) بأن التعريف الفعلي لا يهم كثيرًا وأن السرعة أكثر أهمية من التعريفات الدقيقة ونشجعك على الحفاظ على التركيز على ثغرات نفسها وتطوير رؤية لفئات الثغرات التي تكون منطقية بالنسبة لك والحفاظ على المرونة في التصنيف عند مناقشة الثغرات مع الآخرين.
سيغطي هذا الموضوع الفرعي عددًا من الأمثلة عن الثغرات التي يمكن القول إنها تندرج تحت منطق التطبيق، ونظرًا لأن كل تطبيق مختلف قليلًا فهناك عدد لا حصر له من الأنواع المحتملة من ثغرات في منطق التطبيق ولكن هذه الأمثلة تغطي عددًا من الأمثلة الشائعة.
الضوابط من جانب العميل
في بعض الأحيان ستضع تطبيقات الويب قيودًا على ما يمكن للمستخدمين القيام به في التطبيق ولكن تُفرض هذه القيود بواسطة المتصفح إما باستخدام جافا سكريبت أو ميزات مضمنة لعناصر لغة تمييز النص التشعبي. من المهم أن يدرك مطورو الموقع أن أي شيء يتم إرساله إلى المتصفح يمكن عرضه أو تعديله أو تجاهله من قبل مهاجم ذي مهارة متوسطة، وفيما يلي بعض الأمثلة على عناصر الضوابط من جانب العميل والتي يمكن تجاوزها بسهولة:
حجم الإدخال
تحتوي عناصر إدخال لغة تمييز النص التشعبي على حد أقصى للسمة يهدف إلى الحد من عدد الأحرف المكتوبة في حقل الإدخال على سبيل المثال <input type="text" name="firstname" maxlength="20">. وفي هذا المثال إذا حاول المستخدم وضع أكثر من 20 حرفًا في حقل الإدخال فسيمنعه المتصفح من القيام بذلك، ولكن ذلك في الحقيقة مجرد طلب مهذب وليس تقييدًا حقيقيًا. ومن الأمثلة على ذلك:
يمكن للمستخدم استخدام ميزة مفتش الويب في متصفحه لتعديل نموذج كائن مستند لإزالة قيود الطول. 
يمكن للمستخدم حفظ صفحة الويب محليًا وتعديل لغة تمييز النص التشعبي لإزالة التقييد ثم تحميل الصفحة مرة أخرى في متصفحه.
يمكن للمستخدم قراءة لغة تمييز النص التشعبي وصياغة طلب مشابه يدويًا في curl (أداة سطر أوامر لتنزيل الموارد ونقل البيانات باستخدام مجموعة متنوعة من البروتوكولات المختلفة) إلى البروتوكول الذي ينشئه النموذج فقط دون قيود الطول.
يمكن للمستخدم استخدام أداة متخصصة تسمى وكيل الاعتراض لالتقاط صفحة الويب من الخادم قبل إرسالها إلى المتصفح وإزالة التقييد قبل إرسالها إلى المتصفح، أو يمكن للمستخدم استخدام نفس الأداة لالتقاط طلب المتصفح قبل إرساله إلى الخادم ثم تعديل الطلب لتضمين قيمة أطول وإرساله إلى الخادم.
تعمل تقنيات التحويل هذه بشكل عام مع جميع الضوابط من جانب العميل، ويجب أن تراعيها أثناء تغطيتنا لعناصر التحكم الأخرى.
التحقق من صحة محتوى البيانات
سيستخدم بعض المطورين جافا سكريبت لتقييد القيم التي يمكن إدخالها في نموذج أو سيستخدمون عناصر تحكم لغة تمييز النص التشعبي مثل أزرار الاختيار أو القوائم المنسدلة لتقييد الخيارات الممكنة، لكن لا يعتبر أي من هذه الضوابط فعالًا. وباستخدام ذات التقنيات الموضحة أعلاه يمكن للمهاجمين إزالة القيود في متصفحهم أو تجاوزها لإرسال أي بيانات يريدونها.
تتعلق إحدى الفئات الفرعية الشائعة لهذا النوع من الثغرات الأمنية بتغيير حجم الصورة، وفي بعض الأحيان سيكون لدى المطورين ميزة على موقع ويب تقوم بتغيير حجم الصور من جانب الخادم للعرض الأمثل بدقة معينة. بشكل عام سيبدو عنوان موقع الويب مثل http://example.com/image?imgname=file.gif&width=640&height=480. تتمثل طريقة عمل هذه البرامج النصية دائمًا تقريبًا في تخصيص تخزين ضمن الذاكرة لإبقاء الصورة التي تم تغيير حجمها وتوسيع نطاق الملف المحدد ليصل إلى الحجم الجديد ثم إعادة بيانات الصورة إلى المتصفح. في المثال أعلاه، عادة ما تكون الذاكرة المخصصة 1.2 بحد ميغابايت متواضعة، ولكن إذا أرسل المستخدم طلبًا بعرض وارتفاع 100000 فسيحاول الخادم تخصيص 10 غيغابايت. من خلال إرسال مثل هذه الطلبات بشكل متكرر يمكن للمهاجم التغلب بسهولة حتى على خادم الويب القوي. يجب على المطورين على الأقل فرض حد أقصى للحجم على جانب الخادم ومراعاة نقل عملية تغيير الحجم إلى خادم معزول بحيث لا يؤثر غمر هذا الخادم على الخادم الأساسي.
تعطيل عناصر التحكم
في بعض الأحيان سيستخدم المطورون جافا سكريبت لتعطيل عناصر تحكم معينة على صفحة ويب حتى يتم استيفاء قيود معينة، على سبيل المثال ربما يحتاج المستخدم إلى حل اختبار كابتشا أو الانتظار لفترة معينة من الوقت قبل إرسال نموذج أو النقر على رابط. وباستخدام التقنيات المذكورة أعلاه يمكن للمهاجم ببساطة إزالة عناصر التحكم هذه أو تجاوزها.
البيانات الحساسة المخزنة على جانب العميل
في بعض الأحيان يقوم المطورون بتضمين بيانات حساسة في صفحة ويب إما سرية أو يتحكمون في شيء لا ينبغي أن يكون تحت سيطرة المستخدم. قد يكون أحد الأمثلة على ذلك محاولة تقييد البيانات التي يراها المستخدم عن طريق إخفاء البيانات السرية باستخدام سمة أوراق الأنماط المتتالية (CSS) display=none، أو إرفاقها في تعليقات لغة تمييز النص التشعبي أو آليات أخرى. يمكن للمستخدم مشاهدة هذه البيانات ببساطة عن طريق عرض شفرة مصدر لغة تمييز النص التشعبي لصفحة الويب. مثال على الضوابط من جانب العميل هي تضمين البيانات التي لا ينبغي تحريرها في حقول النموذج المخفية. على سبيل المثال، في الأيام الأولى للتجارة الإلكترونية غالبًا ما شملت متاجر الويب سعر العنصر في إدخال نموذج مخفي بلغة تمييز النص التشعبي تم إرساله بعد ذلك إلى عربة تسوق تابعة لجهة خارجية. باستخدام التقنيات التي تمت مناقشتها في "حجم الإدخال"، يمكن للمستخدمين بسهولة تعديل القيمة في هذا الحقل المخفي وشرائه بأي سعر يريدونه. (قد تتذكر أنه تمت مناقشة مثال آخر لهذا النوع من الثغرات الأمنية تحت عنوان "تصعيد الصلاحيات الأفقي" أعلاه.)
الوقاية من ثغرات الضوابط من جانب العميل
لا يوجد شيء سيء بطبيعته في إجراء التحقق من صحة المدخلات على موقع العميل ولكن يجب على المطورين أن يفهموا أنها مجرد وسائل راحة لواجهة المستخدم، ويجب إجراء جميع عمليات التحقق والحسابات الحساسة على الخادم وليس على العميل.
عدم وجود حد لمعدل/تقديم طلبات متعددة
تُمثل إحدى فئات الثغرات لمنطق التطبيق قيودًا ضمنية على عدد المرات أو التكرار الذي قد يتم فيه إرسال الطلب، وغالبًا ما يساء استخدام الأول عندما يقوم الخادم بعمليات باهظة الثمن أو يمكن إساءتها استخدامها، مثل إدراج البيانات في قاعدة بيانات تحتوي على الكثير من الفهارس أو إرسال رسائل بريد إلكتروني أو رسائل نصية قصيرة أو التلاعب بشكل عام بكميات كبيرة من البيانات. وتُعدّ ثغرات تغيير حجم الصورة التي نوقشت أعلاه مثالًا آخر على ذلك، لا يفكر المطورون عمومًا بالمعدل الذي يقدم به المستخدمون مثل هذه الطلبات كقيد منطقي للتطبيق يُفرض ولكن يمكن القول إنه يتناسب مع فئة الثغرات. 
هناك العديد من طرق تحديد الأسعار ولكن الطرق الوحيدة الفعالة حقًا هي تلك التي يتم فرضها على موقع الخادم، وبالنسبة للعمليات باهظة الثمن يمكن استخدام أنظمة طابور مختلفة لضمان أنه لا يمكن تنفيذ سوى عدد قليل من هذه العمليات في وقت واحد. قد تكون هناك حاجة إلى أنظمة أكثر تعقيدًا تشمل الكابتشا وقيود المعدل لكل حساب ولكل عنوان بروتوكول إنترنت للعمليات التي يتم إساءة استخدامها بشكل متكرر. 
تُمثل الحالات ذات الصلة الطلبات التي من المفترض تقديمها مرة واحدة فقط أو عدة مرات، وقد يكون أحد الأمثلة على ذلك موقع مكتب المساعدة الذي يتيح للمستخدمين إنشاء رقم تذكرة. إذا كان بإمكان المستخدم على سبيل المثال تسجيل 20 تذكرة وربطها جميعًا بحالة/ تدخل معين فسيكون لذلك تأثير سلبي على مالكي الموقع! 
تناقضات التقريب
تتعلق إحدى فئات الثغرات المثيرة للاهتمام بكيفية تعامل العمليات المختلفة مع الفئات، وسلُط الضوء على هذه الفئة من الثغرات في فلمي سوبرمان 3 (Superman 3) وأوفيس سبيس (Office Space) ومع ذلك لا تزال تحدث في العديد من التطبيقات المالية. إذا كان هناك تطبيقان يدعمان تحويل الأموال بين بعضهما البعض فكيفية تعاملهما مع السنتات الجزئية أمر مهم. فإذا قام أحد التطبيقات بتقريب السنتات الجزئية وقام تطبيق آخر باقتطاعها فيمكن للمهاجم نقل 1.9 سنتًا بشكل متكرر من تطبيق الاقتطاع إلى تطبيق التقريب، حيث سيكلف كل تحويل المستخدم 1 سنت (1.9 مقتطعة) ويحصل على 2 سنت (1.9 مقربة). 
هناك العديد من الطرق لمنع ثغرات التقريب، وأكثر الأمثلة وضوحًا على ذلك هو رفض المعاملات ذات القيم الجزئية. وبدلًا من ذلك يمكن للمرء دعم العملات الجزئية بالكامل. أخيرًا إذا كان التقريب/الاقتطاع/إلخ مطلوبًا فيجب على المرء القيام بالعمل الشاق لضمان اتساق التعامل مع الأجزاء.
تجاوز خطوات العملية
غالبًا ما تحتوي مواقع الويب على عمليات يتم تقديمها للمستخدمين ضمن سلسلة من الخطوات، وفي حين أن نية المطورين قد تكون جعل المستخدم يمر بكل خطوة فغالبًا ما يسمح التطبيق للمستخدمين بإكمال العملية دون المرور بكل خطوة. فكر في موقع للتسوق عبر الإنترنت يسمح للمستخدمين بإضافة عناصر إلى سلة التسوق الخاصة بهم وتحديد خيارات التوصيل الخاصة بهم وتحديد معلومات الدفع الخاصة بهم ثم إكمال المعاملة أخيرًا. ليس من غير المألوف أن تقوم المواقع الفعلية بإجراء المعاملة إذا قام المستخدم ببساطة بتنفيذ أول خطوتين ثم انتقل مباشرة إلى صفحة المعاملة الكاملة. في حين أن هذا أمر نادر الحدوث في مواقع التجارة الإلكترونية الفعلية، إلا أنه ليس من غير المألوف في العديد من منصات التعلّم الإلكتروني حيث يمكن للمستخدم تخطي مشاهدة مقاطع الفيديو المملة والانتقال مباشرة إلى الصفحة التي تحدد حضوره لها على أنه قد اكتمل.
تزييف الطلبات عبر المواقع
غالبًا ما تعتبر الثغرة الأمنية الأخيرة في منطق التطبيق هي فئة ثغرات تصنّف بشكل مستقل ولكننا ندرجها هنا من أجل المنفعة، وتتمثل في جوهر تزييف طلب المواقع المشتركة في بعض الحالات حيث سترسل متصفحات الويب موقعًا إلكترونيًا لملفات تعريف الارتباط الخاصة بالمستخدم لكل طلب إلى هذا الموقع بغض النظر عن الموقع الذي أنشأ الطلب. إذا قام موقع ضار عند زيارة مستخدم للموقع بإنشاء طلب احتيالي إلى موقع مستهدف وتم تسجيل دخول المستخدم إلى الموقع المستهدف فسيقوم الموقع المستهدف بتنفيذ الإجراء المطلوب بصفته المستخدم على الرغم من أن المستخدم لم يقم بتشغيل الطلب عن قصد. 
على سبيل المثال فكر في موقع تكون فيه آلية إعادة تعيين كلمة المرور هي قيام الموقع بإرسال رابط لك يسمح بتغيير كلمة المرور الخاصة بك، وهذا أمر طبيعي إلى حد ما. تخيل أن الموقع نفسه يحتوي على صفحة تسمح لك بتغيير عنوان بريدك الإلكتروني وإذا قمت ببساطة بزيارة example.com/changeemail?new=123@attacker.com، فسيتم تغيير عنوان بريدك الإلكتروني إلى العنوان المحدد. أخيرًا تخيل أن موقع attacker.com قد تم إعداده لعرض صفحة بعد صفحة من صور الحيوانات الرائعة، لكن توجد مشكلة لأن زر "التالي" في أسفل الصفحة هو في الواقع الرابط أعلاه. إذا قام مستخدم مسجل الدخول في example.com بزيارة attacker.com ونقر على زر "التالي" فسيتم تغيير عنوان بريده الإلكتروني ويمكن للمهاجم إعادة تعيين كلمة مرور المستخدم على الفور والتحكم في حسابه. 
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. انتقل إلى صفحة "تزييف طلب المواقع المشتركة (CSRF)" وحاول إنشاء صفحة ويب تُغير كلمة مرور المستخدم الذي قام بتسجيل الدخول، ولاحظ أنه إذا كان لديك متصفح ويب محدّث فقد يُقيد تلقائيًا سمات SameSite لملفات تعريف الارتباط للجلسة وقد لا يعمل المخبر عليه. إذا حدث هذا، فلا تقلق وتخطى هذا التمرين فهذا سلوك طبيعي ومرغوب فيه في متصفح الويب.
الوقاية من تزييف طلب المواقع المشتركة
تتمثل الطريقة الأكثر وضوحًا لمنع تزييف طلب المواقع المشتركة في تعيين سمة SameSite لملفات تعريف الارتباط الخاصة بالجلسة بشكل صريح لتصبح LAX أو Strict والتأكد من أن أي طلب يغير البيانات سيغير تلك البيانات فقط إذا تم إرسالها باستخدام بوست بروتوكول نقل النص التشعبي، وقد تنجح الطرق الأخرى لكنها أكثر تعقيدًا. 
لمزيد من المعلومات حول تزييف طلب المواقع مشتركة، راجع صفحة مشروع أمان تطبيق الويب المفتوح حول هذا الموضوع وورقة معلومات مرجعية حول الوقاية من تزييف طلب المواقع المشتركة الخاصة بمشروع أمان تطبيق الويب المفتوح. 
لأجل استكشاف متعمّق لكل من تزييف طلب مواقع مشتركة والثغرات الأخرى في منطق التطبيق، راجع مسار تعلّم تقييم أمان تطبيقات الويب.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة

بالنسبة لهذا القسم قررنا تخطي اختبار المهارات لسبب واحد بسيط للغاية وهو أن متصفحات الويب تقوم حاليًا بتغيير سياساتها بحيث تكون سياسات ملفات تعريف SameSite الآن Lax افترضيًا مما يتسبب تلقائيًا بإيقاف الكثير من هجمات تزييف طلب المواقع المشتركة من العمل. ولهذا السبب فإن أي تمارين نقترحها قد لا تعمل في المستقبل.
إذا كنت لا تزال ترغب في إجراء نوع من تمرين اختبار المهارة فجرّب مختبر دي في دبليو إيه الموجود رابطه أعلاه لمعرفة ما إذا كان يعمل، ولكن إذا لم يعمل ناقش بإيجاز مع أحد الزملاء أو المرشد سبب كون التغييرات في الإعدادات الافتراضية لمتصفحات الويب تعني أن المختبر لم يعد يعمل واطلب منهم التحقق من فهمك للموضوع بشكل صحيح

## Learning Resources

{{% resource title="Cross-site request forgery" languages="English" cost="Free" description="Guide to CSRF vulnerability, how it works, and preventive measures." url="https://owasp.org/www-community/attacks/csrf" %}}

{{% resource title="Cross-Site Request Forgery Prevention Cheat Sheet" languages="English" cost="Free" description="List of CSRF mitigations, recommended and discouraged practices." url="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" %}}
