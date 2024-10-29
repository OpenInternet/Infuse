+++
style = "module"
weight = 4
title = "Application Logic and Related Vulnerabilities"
description = "There exist other types of vulnerabilities not covered in the above subtopics which could nonetheless be used to damage or gain unauthorized entry into a web app. We look at several of those"
+++

## Use Case

There exist other types of vulnerabilities not covered in the above subtopics which could nonetheless be used to damage or gain unauthorized entry into a web app. We look at several of those below. This is the last subtopic which outlines vulnerability classes: once you’ve learned about all of them, you can move on to the next topics, which look into scanning your web apps for potential vulnerabilities and ensuring that they do not have any serious security holes.

## Objectives

After completing this subtopic, practitioners will be able to find weaknesses in web applications that relate to subverting the mechanisms of the application itself. These can relate to the application mechanism itself, the mechanisms of the server, or even quirks of web browsers.

They should also be able to find and exploit the following types of vulnerabilities:

- Business logic vulnerabilities
- Race conditions
- Excessive information disclosure
- Cross-site request forgery
- File upload vulnerabilities

---
## Main Section
### What are application logic vulnerabilities?

Application logic vulnerabilities are often described as bugs that allow a user of an application to subvert the mechanisms of an application system’s design, as opposed to attacking the application’s implementation. While this is true, the category is also frequently used as a catch-all for vulnerability classes that don’t neatly fit into another category. Some vulnerabilities very clearly exploit application logic. For example, if you have a money transfer function that truncates fractional cents when withdrawing money from the source account, but deposits those fractional cents into the target account, you can generate money by transferring funds back and forth. Others are much more tenuous, like supplying a PHP file to a form that’s supposed to accept a profile picture and then executing that PHP when you visit the page for the profile pic.

In any case, the vulnerabilities in this subtopic are all frequently present in web applications and should wrap up your understanding of common vulnerabilities.

#### Business Logic Vulnerabilities

The name “business logic vulnerabilities” obviously originated in the area of testing commerce-related applications, but one can simply omit the word “business” from the name. We include it because the term is popular among resources that talk about application testing. In any case, these vulnerabilities are grouped together in that they relate more to the abstract mechanisms of data processing within an application.

Head over to the [PortSwigger Academy Business Logic Vulnerabilities topic](https://portswigger.net/web-security/logic-flaws) and complete the reading and labs.

#### Race Conditions

Race condition vulnerabilities refer to bugs that allow an attacker to initiate some process, then perform some action or actions that are normally not allowed before the process completes. For example, consider a file-sharing site that allows you to upload files and duplicate uploaded files. To protect its users, the site scans uploaded files to see if they contain malware and deletes them if they do. Obviously, copies of files don’t need to be scanned, because all uploaded files have been scanned, right? Well, let’s say that, to improve site responsiveness, the process that scans (and deletes) uploaded files is run in the background on the web server. An attacker could upload a file containing malware and then immediately copy it on the site. Since the scan hasn’t been completed, the file will still exist on the server, so the copy will work. Once the scan completes, the original file will be deleted, but the copy will remain. There are many more types of race conditions vulnerabilities; this subtopic explores some of them.

Head over to the [PortSwigger Academy Race Conditions topic](https://portswigger.net/web-security/race-conditions) and complete the reading and labs.

#### Excessive Information Disclosure

Information disclosure vulnerabilities occur when an application or its infrastructure sends sensitive information back to the browser. This information may be displayed in the browser window, or hidden in non-rendered HTML. Common places where this information can leak out are via error messages, HTML comments or hidden fields, extraneous files on the web server, etc. While in most cases these information leaks are not severe, in some cases the information revealed can have catastrophic impacts on the web application’s security, such as if a secret 3rd party API key is revealed.

Head over to the [PortSwigger Academy Information Disclosure topic](https://portswigger.net/web-security/information-disclosure) and complete the reading and labs.

#### Cross-site Request Forgery

CSRF (Cross-Site Request Forgery) is an interesting vulnerability arising from the interaction between websites and browsers. Consider a peer to peer payment service. It accepts GET requests like [http://victim.com/transfer?to-account=xyz&amount=123](http://victim.com/transfer?to-account=xyz&amount=123). It properly only allows authenticated users to transfer money by checking their session cookies. However, if an attacker posted a message in an online forum that contained an image link like `&lt;img src="http://victim.com/transfer?to-account=xyz&amount=123">`, what would happen? Every time someone viewed the post, their browser would see the image tag and try to load the image. It would send a request to victim.com, of course including the site’s cookies. If the user was already logged into the payment site, this would have the effect of transferring money to the XYZ account. The issue here is that HTML and JavaScript allow websites to cause users’ browsers to send requests to other sites, which by default include that other site’s cookies.

Head over to the [PortSwigger Academy Cross-site Request Forgery topic](https://portswigger.net/web-security/csrf) and complete the reading and labs.

#### File Upload Vulnerabilities

This subtopic covers the case where an attacker can upload files to a website, perhaps for a profile picture, but the file is interpreted as code either on the client side (causing XSS) or on the server side (causing code execution). A common technique attackers use when exploiting this latter type is to upload a [web shell](https://en.wikipedia.org/wiki/Web_shell), a small script that takes a shell command form a user (typically via a URL parameter), executes the shell command on the server, and then returns the results.

If you are testing a site and wish to upload a web shell, it is very important that you put a password on it. Just because you can upload a file to the server, does not mean you can delete that file. You may find yourself in a situation of having to rely on the site owner to delete the file. Adding a password can be simple. There are [web shells available in many languages](https://www.kali.org/tools/webshells/), but here’s a simple PHP example:

{{< highlight php >}}

<?php echo system($_GET['command']);?>
{{< / highlight >}}

To add a password to this, we merely change it to this:

{{< highlight php >}}
<?php
_if_ (_$\_GET_['password'] _==_ 'A super-secret password only I know.') {
    _echo_ system(_$_GET_['command']);
} _else_ {
    http_response_code(404);
}
?>
{{< / highlight >}}
This will ensure that anyone who stumbles upon your testing-focused web shell won’t be able to use it for their own nefarious purposes.

Make sure to read and understand how a web shell works before you upload it. You want to be sure that the shell is only going to execute what you ask it to, and won’t talk to any other servers.

## Skill Check

PortSwigger academy contains a series of labs which you can use to test and validate your skills. For each of the following topics, complete 1-3 of the ‘practitioner’ level labs:

- [Business logic vulnerabilities](https://portswigger.net/web-security/all-labs#business-logic-vulnerabilities)
- [Race conditions](https://portswigger.net/web-security/all-labs#race-conditions)
- [Information disclosure](https://portswigger.net/web-security/all-labs#information-disclosure)

If you are working with a peer or mentor, explain to them how each attack works and how you would find and demonstrate exploitability for similar vulnerabilities in a site you were testing.

الموضوع الفرعي 4: منطق التطبيق والثغرات ذات الصلة
حالة استخدام
هناك أنواع أخرى من الثغرات الأمنية لم تتم تغطيتها في المواضيع الفرعية المذكورة أعلاه ولكن من الممكن استخدامها لإلحاق الضرر أو الوصول إلى تطبيق ويب دون تخويلهم بذلك، وسنتناول عددًا منها أدناه. هذا هو الموضوع الفرعي الأخير الذي يحدد فئات الثغرات، وبمجرد أن تتعرف عليها جميعها يمكنك الانتقال إلى المواضيع التالية التي تبحث في فحص تطبيقات الويب الخاصة بك بحثًا عن ثغرات محتملة والتأكد من عدم وجود أي ثغرات أمنية خطيرة فيها.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، سيتمكن الممارسون من العثور على نقاط الضعف في تطبيقات الويب المتعلقة بالتحايل على آليات التطبيق نفسه ويمكن أن يتعلق ذلك بآلية التطبيق نفسها أو آليات الخادم أو حتى مزايا متصفحات الويب.
يجب أن يكونوا قادرين أيضًا على العثور على الأنواع التالية من الثغرات واستغلالها:
ثغرات منطق العمل
حالات التعارض 
فرط كشف المعلومات
تزييف الطلبات عبر المواقع
ثغرات تحميل الملفات
العرض 
ما هي ثغرات منطق التطبيق؟
غالبًا ما تُوصف الثغرات الأمنية لمنطق التطبيق بأنها أخطاء تسمح لمستخدم التطبيق بتخريب آليات تصميم نظام التطبيق بدلاً من مهاجمة التطبيق في حالته المُنفّذة، وفي حين أن هذا أمر صحيح تستخدم هذه الفئة أيضًا بشكل متكرر لتشمل جميع فئات الثغرات التي لا تُطابق بدقة فئة أخرى. تعمل بعض الثغرات بشكل واضح للغاية على استغلال منطق التطبيق، فعلى سبيل المثال إذا كان لديك وظيفة تحويل أموال تقتطع أجزاءً من السنت عند سحب الأموال من حساب المصدر ولكن تودع الأجزاء من السنت تلك في حساب الهدف فيمكنك توليد الأموال عن طريق تحويل الأموال ذهابًا وإيابًا. لكن بعضها الآخر أكثر هشاشة مثل تقديم ملف المعالج المسبق للنصوص الفائقة (PHP) إلى نموذج من المفترض أن يقبل صورة ملف شخصي ثم تنفيذ المعالج المسبق للنصوص الفائقة عند زيارة الصفحة الخاصة بملف التعريف الشخصي. 
على أي حال، يمكن العثور على ثغرات هذا الموضوع الفرعي بشكل متكرر في تطبيقات الويب ومن المفترض أن تختتم فهمك للثغرات الشائعة.
ثغرات منطق العمل 
من الواضح أن اسم "ثغرات منطق العمل" نشأ في مجال اختبار التطبيقات المتعلقة بالتجارة ولكن يمكن للمرء ببساطة حذف كلمة "العمل" من اسمها، ولكن نُضمّن الكلمة لأن المصطلح شائع بين الموارد التي تتحدث عن اختبار التطبيق. على أي حال، تُجمع هذه الثغرات معًا من حيث أنها تتعلق أكثر بالآليات المجرّدة لمعالجة البيانات داخل التطبيق.

توجه إلى موضوع ثغرات منطق العمل في أكاديمية بورت سويغر وأكمل القراءة والمخابر.

حالات التعارض 
تُشير ثغرات حالات التعارض إلى الأخطاء التي تسمح للمهاجم ببدء بعض العمليات ثم تنفيذ إجراء أو إجراءات لا يُسمح بها عادةً قبل اكتمال العملية. راعي على سبيل المثال موقع مشاركة ملفات يسمح بتحميل الملفات ونسخ الملفات التي تم تحميلها، لأجل حماية مستخدميه يقوم الموقع بمسح الملفات التي تم تحميلها لمعرفة ما إذا كانت تحتوي على برمجيات ضارة وحذفها في حال عثر عليها. من الواضح أن نُسخ الملفات لا تحتاج إلى الفحص لأن جميع الملفات التي تم تحميلها قد تم فحصها بالفعل، صحيح؟ حسنًا لنفترض أنه بهدف تحسين استجابة الموقع تجري عملية فحص (وحذف) الملفات التي تم تحميلها في الخلفية على خادم الويب. يمكن للمهاجم تحميل ملف يحتوي على برمجيات ضارة ثم نسخه على الفور على الموقع، ونظرًا لعدم اكتمال الفحص سيبقى الملف موجودًا على الخادم وبالتالي ستعمل نسخته. بمجرد اكتمال الفحص يتم حذف الملف الأصلي ولكن تبقى نسخته. هناك العديد من أنواع ثغرات في حالات التعارض ويستكشف هذا الموضوع الفرعي بعضًا منها.

توجه إلى موضوع حالات تعارض أكاديمية بورت سويغر واستكمل القراءة والمخابر.

فرط كشف المعلومات 

تحدث ثغرات في الكشف عن المعلومات عندما يرسل التطبيق أو بنيته التحتية معلومات حساسة إلى المتصفح، وقد تُعرض هذه المعلومات في نافذة المتصفح أو يتم إخفاؤها في لغة تمييز نص تشعبي ليست ظاهرة. تشمل الأماكن الشائعة التي يمكن أن تتسرب فيها هذه المعلومات رسائل الخطأ أو تعليقات لغة تمييز النص التشعبي أو الحقول المخفية أو الملفات الخارجية على خادم الويب، وما إلى ذلك. في حين أن تسريبات المعلومات هذه في معظم الحالات ليست شديدة، إلا أنه في بعض الحالات يمكن أن يكون للمعلومات التي يتم الكشف عنها تأثيرات كارثية على أمان تطبيق الويب مثل عند انكشاف مفتاح واجهة برمجة تطبيقات سري تابع لجهة خارجية.

توجه إلى موضوع كشف المعلومات في أكاديمية بورت سويغر وأكمل القراءة والمخابر.

تزييف الطلبات عبر المواقع 

يُعدّ تزييف طلب المواقع المشتركة نقطة ضعف مثيرة للاهتمام تنشأ عن التفاعل بين مواقع الويب والمتصفحات. راعي خدمة الدفع بين النظراء يُقبل فيها طلبات غت (GET) مثل http://victim.com/transfer?to-account=xyz&amount=123. تسمح بشكل صحيح فقط للمستخدمين الذين تمت مصادقتهم بتحويل الأموال عن طريق التحقق من ملفات تعريف الارتباط الخاصة بجلستهم. لكن إذا نشر مهاجم رسالة في منتدى عبر الإنترنت تحتوي على رابط صورة مثل <{4>img src="http://victim.com/transfer?to-account=xyz&amount=123">، فماذا سيحدث؟ في كل مرة يشاهد فيها شخص ما المنشور سيرى متصفحه وسم الصورة ويحاول تحميلها، وسيرسل طلبًا إلى victim.com بالطبع يشمل ملفات تعريف الارتباط الخاصة بالموقع. إذا كان المستخدم قد سجل الدخول بالفعل إلى موقع الدفع فسيؤدي ذلك إلى تحويل الأموال إلى حساب XYZ. تتمثل المشكلة هنا بأن لغة تمييز النص التشعبي وجافا سكريبت تسمحان لمواقع الويب بالتسبب في قيام متصفحات المستخدمين بإرسال طلبات إلى مواقع أخرى والتي تتضمن افتراضيًا ملفات تعريف الارتباط الخاصة بالموقع الآخر.

توجه إلى موضوع تزييف طلب المواقع المشتركة لأكاديمية بورت سويغر وأكمل القراءة والمخابر.

ثغرات تحميل الملف 

يغطي هذا الموضوع الفرعي الحالة التي يمكن فيها للمهاجم تحميل الملفات إلى موقع ويب، ربما تكون صورة ملف شخصي ولكن يُفسر الملف على أنه تعليمات برمجية على جانب العميل (مما يؤدي إلى تطبيق برمجة نصية عبر المواقع) أو على جانب الخادم (مما يتسبب في تنفيذ التعليمات البرمجية) ومن التقنيات الشائعة التي يستخدمها المهاجمون عند استغلال هذا النوع الأخير هي تحميل شل ويب، وهو برنامج نصي صغير يأخذ أمر شل (shell) من مستخدم (عادةً عبر معلمة عنوان موقع الويب)، وينفذ أمر شل على الخادم ثم يُعيد النتائج. 

إذا كنت تختبر موقعًا وترغب في تحميل شل ويب، فمن المهم جدًا أن تحميه بكلمة مرور لأنه إمكانية تحميل ملف إلى الخادم لا يعني بالضرورة أنه يمكنك حذفه. قد تجد نفسك مضطرًا إلى الاعتماد على مالك الموقع لحذف الملف ولكن إضافة كلمة المرور أمر بسيط. تتوفر شل الويب بالعديد من اللغات، ولكن إليك مثالًا بسيط على المعالج المسبق للنصوص الفائقة:
<?php {i>echo <i}system($_GET['command']); ?>
لإضافة كلمة مرور إلى هذا، نغيرها ببساطة لتصبح:
<?php
if ($_GET['password'] == 'A super-secret password only I know.') {
	echo system($_GET['command']);
} else {
	http_response_code(404);
}
?>
سيضمن ذلك أن أي شخص يعثر على شل الويب خاصتك المخصصة للاختبار لن يتمكن من استخدامها لأغراضه خبيثة.

تأكد من قراءة وفهم كيفية عمل شل الويب قبل تحميلها وعليك التأكد من أن الشل ستنفذ فقط ما تطلبه منها ولن تخاطب أي خوادم أخرى.
موارد التعلّم
اختبار مهارة
تحتوي أكاديمية بورت سويغر على سلسلة من المخابر التي يمكنك استخدامها لاختبار مهاراتك والتحقق منها ولكل موضوع من المواضيع التالية، أكمل 1-3 من مختبرات مستوى "الممارس":
ثغرات منطق العمل
حالات التعارض
كشف المعلومات

إذا كنت تعمل مع زميل أو مرشد اشرح له كيفية عمل كل هجوم وكيف ستبحث وتثبت إمكانية استغلال نقاط الضعف المماثلة في الموقع الذي كنت تفحصه

## Learning Resources

{{% resource title="Web shells" languages="English, Kurdish, Chinese, Korean, French, Lombard, Hindi, Malayalam" cost="Free" description="Overview of what a web shell is and its potential use in attacks." url="https://en.wikipedia.org/wiki/Web_shell" %}}

{{% resource title="Webshells | Kali Linux Tools" languages="English" cost="Free" description="Overview of webshells available in a default Kali Linux installation." url="https://www.kali.org/tools/webshells/" %}}
