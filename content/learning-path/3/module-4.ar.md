+++
style = "module"
weight = 4
title = "Static analysis"
description = "Static analysis is the process of disassembling a binary file in order to understand what’s inside it. It’s quite labor-intensive and requires software engineering knowledge"
+++

## Use Case

Static analysis is the process of disassembling a binary file in order to understand what’s inside it. It’s quite labor-intensive and requires software engineering knowledge. For this reason, most analysts will prefer to do dynamic analysis (which we focus on in Subtopic 3) instead. There are several reasons you might want to do static analysis, including when dynamic analysis isn’t yielding good results or if you do not want a potential adversary to know that you are in possession of and analyzing the file.

This subtopic looks at a very advanced skill and the guides it links to will take considerable time to complete. If you do not currently have the time to focus on it and instead want to figure out what to do with the results of dynamic analysis, skip to Subtopic 5.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand in what cases static analysis might be more appropriate than dynamic analysis
- Be able to conduct basic static analysis in Windows or Android using off-the-shelf tools

---
## Main Section
Static analysis is the process of determining information about a piece of malware without running it. Technically, the basic file analysis you performed above is a form of static analysis. However, generally we refer to malware static analysis as learning about the actions that the malware will perform. This generally involves taking a compiled binary program, decompiling it, and then reading the resulting code. An alternative is dynamic analysis, when you run the malware and then observe its behavior.

Static analysis has some advantages over dynamic analysis. First off, since you don’t run the malware, you are less likely to be infected (and there are rare cases of malware which can escape a virtual machine or sandbox). Also, if you don’t run the malware, you’re unlikely to alert the threat actors that their malware has been discovered. Additionally, sophisticated malware may attempt to discover if it’s being analyzed when it’s run. If it determines that it’s being analyzed, it may change its behavior, leading to possible incorrect analysis.

On the other hand, static analysis can be very time-consuming and difficult, and malware authors can use a variety of obfuscation techniques (such as encryption, packing, and dynamically downloading later stages) to make static analysis more difficult.

While much of the focus in this learning path is on static analysis of compiled binary programs, bear in mind that much malware is easier to analyze, being written in HTML/JavaScript, shell scripting languages, etc.

### Windows

To start off in Windows static analysis, we will set aside REMnux and go through a set of tutorials on Windows malware reverse engineering. This tutorial does include a bit of dynamic analysis, but is heavily focused on static analysis. For consistency, you should go through the exercises outlined below. Remember that, if you find any tools that you like that aren’t part of REMnux, you can add them to your REMnux VM. (You can also start over at any time with a blank VM, if you want.)

{{% resource title="Windows malware reverse engineering 101 and 102" languages="English" cost="Free" description="Comprehensive courses on reverse engineering Windows malware." url="https://malwareunicorn.org/workshops/re101.html" url2="https://malwareunicorn.org/workshops/re102.html" %}}

{{% resource title="OpenSecurityTraining2 courses" languages="English" cost="Free, paid with instructor support" description="Courses on low-level system architecture and reversing." url="https://p.ost2.fyi/courses" %}}

{{% resource title="OpenSecurity’s learning path for malware analysis" languages="English" cost="Free" description="Learning path for malware analysis." url="https://opensecuritytraining.info/Malware%20Analysis.html" %}}

{{% resource title="Windows reversing using x64dbg" languages="Spanish" cost="Free" description="Video series on using x64dbg for reversing Windows malware." url="https://www.youtube.com/watch?v=Af5pvCl0CBE&list=PLn__CHOEZR1Ymxi2n4Q9G9I9kBYr6B4Ft" %}}

### Android

While Windows software is typically written in x86 or x64 assembler, binaries on Android typically target a virtual machine called the Android Runtime (ART), which is similar to the Java Virtual Machine. This ART bytecode can usually be automatically reversed into Java, as opposed to x86/x64 bytecode, which typically can only be machine-reversed into assembly. Before you get too excited, note that there are many obfuscation tools that can easily render the reverse-engineered Java code nearly unreadable, and also Android does support native code via the [NDK library](https://developer.android.com/ndk/guides). Note that most Android devices have ARM based architectures, not x86/x64, so you will need to learn ARM assembler to reverse-engineer most Android native code you’re likely to find.

You may also encounter the Kotlin programming language when learning about Android. Both Kotlin and Java compile to the same bytecode, and are very similar at a low-level. When performing static analysis on an Android application, the original programming language should not be significant. We recommend focusing on Java, because the decompilers available turn ART into Java, not Kotlin.

As with the Windows static analysis section this section on Android static analysis is anchored to an excellent and comprehensive, but not gentle, course. You will likely need to do additional studying in order to understand the material in the primary course.

{{% resource title="Android App Reverse Engineering 101" languages="English" cost="Free" description="Comprehensive course on reverse engineering Android applications." url="https://www.ragingrock.com/AndroidAppRE/" %}}

{{% resource title="How to statically analyze a suspicious Android app" languages="English" cost="Free" description="Intermediate introduction to static analysis of Android apps." url="https://pts-project.org/guides/g5/" %}}

{{% resource title="Codecademy’s Learn Java course" languages="English" cost="Free" description="Basic introduction to Java programming." url="https://www.codecademy.com/enrolled/courses/learn-java" %}}

{{% resource title="Build Your First Android App in Java" languages="English, Chinese, Indonesian, Japanese, Korean, Portuguese, Spanish" cost="Free" description="Basic course on building Android apps using Java." url="https://developer.android.com/codelabs/build-your-first-android-app" %}}


## Skill Check

Sit down with a peer or a mentor who has significant experience in passive investigation against servers on the internet. Then:

- Complete the [Basic Malware RE](https://tryhackme.com/room/basicmalwarere) (free) exercises on TryHackMe
- (Android only) Complete the exercises in [Android App Reverse Engineering 101](https://www.ragingrock.com/AndroidAppRE/)
- (Windows only) At this point, you should be somewhat familiar with disassembling Windows binaries, reading x86 assembly, and using that knowledge to understand what a program does. Go back to your REMnux VM and analyze the Windows malware you downloaded earlier. Feel free to go back over the above training material and do supplemental research as you do so!

الموضوع الفرعي 4: تحليل التعليمات البرمجية بحالتها الثابتة
حالة استخدام
يعد تحليل التعليمات البرمجية بحالتها الثابتة عملية تفكيك ملف ثنائي من أجل فهم ما بداخله وهي تتطلب الكثير من العمل وتتطلب معرفة بهندسة البرمجيات. لهذا السبب يُفضل معظم المحللين إجراء تحليل ديناميكي (والذي نركز عليه في الموضوع الفرعي 3) بدلاً من ذلك. هناك العديد من الأسباب التي قد تدفعك إلى إجراء تحليل التعليمات البرمجية بحالتها الثابتة، بما في ذلك عدم جدوى التحليل الديناميكي أو إذا كنت لا تريد أن يعرف المتطفل المحتمل أنك تملك الملف وتحلله.
يتناول هذا الموضوع الفرعي مهارة متقدمة للغاية وتتطلب المؤلفات التوجيهية التي تحتاج روابطها الكثير من الوقت حتى إتمامها. وإذا لم يكن لديك الوقت حاليًا للتركيز عليها وتريد بدلاً من ذلك معرفة ما يجب فعله بنتائج التحليل الديناميكي، انتقل إلى الموضوع الفرعي 5.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يتوقع من الممارسين أن يكونوا قادرين على:
فهم الحالات التي قد يكون فيها تحليل التعليمات البرمجية بحالتها الثابتة أكثر ملاءمة من التحليل الديناميكي
التمكن من إجراء تحليل أساسي للتعليمات البرمجية بحالتها الثابتة في ويندوز أو أندرويد باستخدام أدوات جاهزة
العرض 
يعد تحليل التعليمات البرمجية بحالتها الثابتة عملية لتحديد المعلومات حول برمجية ضارة دون تشغيلها ومن الناحية الفنية فإن تحليل الملف الأساسي الذي أجريته أعلاه هو شكل من أشكال التحليل بالحالة الثابتة. لكن نشير عمومًا إلى تحليل الحالة الثابتة للبرمجيات الضارة على أنه التعرف على الإجراءات التي ستنفذها البرمجيات الضارة. يتضمن هذا عمومًا أخذ برنامج ثنائي تم تحويله برمجيًا ثم إلغاء تحويله البرمجي وقراءة التعليمات البرمجية الناتجة. البديل هو التحليل الديناميكي عند تشغيل البرمجيات الضارة ثم مراقبة سلوكها.
يتمتع التحليل الثابت ببعض المزايا مقارنة بالتحليل الديناميكي، أولاً، بما أنك لا تقوم بتشغيل البرمجيات الضارة، فإن احتمالية إصابتك أقل (وهناك حالات نادرة من البرمجيات الضارة التي يمكنها الخروج من الجهاز الظاهري أو بيئة اختبار معزولة). وأيضًا إذا لم تقم بتشغيل البرمجيات الضارة فمن غير المرجح أن تُنبه ممثل التهديد إلى أنه تم الكشف عن برمجيته الضارة، وبالإضافة إلى ذلك قد تحاول البرمجيات الضارة المتطورة اكتشاف ما إذا كان يتم تحليلها عند تشغيلها. إذا كشفت عن محاولة تحليلها قد تغير سلوكها مما يمكن أن يؤدي إلى تحليل غير صحيح.
من ناحية أخرى، يمكن أن يكون التحليل الثابت أمرًا يستهلك الوقت وصعبًا للغاية ويمكن لمنشئي البرمجيات الضارة استخدام مجموعة متنوعة من تقنيات الطمس (مثل التشفير والتعبئة وتنزيل المراحل اللاحقة بطريقة ديناميكية) لجعل التحليل الثابت أكثر صعوبة.
في حين أن الكثير من تركيز مسار التعلّم هذا ينصب على التحليل الثابت للبرامج الثنائية المحولة برمجيًا، يجب مراعاة وجود أنواع من البرمجيات الضارة من الأسهل تحليلها متل تلك المكتوبة بلغات HTML/JavaScript، ولغات برمجة شيل (shell)، وما إلى ذلك. 
نظام ويندوز
للبدء في التحليل الثابت لنظام ويندوز، سنترك ريمنوكس وننتقل إلى مجموعة من البرامج التعليمية حول الهندسة العكسية البرمجيات الضارة لنظام ويندوز، علمًا أن هذا الدليل التعليمي يتضمن القليل من التحليل الديناميكي ولكنه يركز بشكل كبير على التحليل الثابت. من أجل الاتساق عليك استكمال التمارين الموضحة أدناه. تذكر أنه إذا وجدت أي أدوات تحبها وليست جزءًا من ريمنوكس فيمكنك إضافتها إلى الجهاز الظاهري الذي يعمل عليه نظام ريمنوكس. (يمكنك أيضًا البدء من جديد في أي وقت باستخدام جهاز ظاهري فارغ إذا كنت ترغب بذلك.)
نظام ويندوز: موارد التعلّم
نظام أندرويد
بينما تُكتب برامج ويندوز عادةً باستخدام أداة تجميع x86 أو x64، تستهدف الملفات الثنائيات على أندرويد عادةً جهازًا افتراضيًا يسمى وقت تنفيذ أندرويد (ART)، وهو مشابه لجهاز جافا الظاهري. يمكن عادةً عكس الرمز المكون من وحدات البايت لوقت تنفيذ أندرويد تلقائيًا إلى لغة جافا على النقيض من الرمز المكون من وحدات البايت لهندسة x86/x64 الذي يمكن عكسه عادةً باستخدام الآلة فقط حتى مرحلة التجميع. قبل أن تتحمس أكثر، اعلم بوجود العديد من أدوات الطمس التي يمكنها بسهولة جعل التعليمات البرمجية المكتوبة بلغة جافا والتي تُطبق عليها الهندسة العكسية غير قابلة للقراءة تقريبًا، كما أن نظام أندرويد يدعم التعليمات البرمجية الأصلية من خلال مكتبة NDK. لاحظ أن معظم أجهزة أندرويد تحتوي على هندسات تستند إلى ARM وليس x86/x64، لذلك ستحتاج إلى تعلم تجميع ARM لإجراء هندسة عكسية على معظم التعليمات البرمجية الأصلية لنظام أندرويد التي من المحتمل أن تجدها. 
قد تواجه أيضًا لغة برمجة كولتين عند تعلّمك عن نظام أندرويد حيث تتحول برمجيًا كل من كولتين وجافا إلى نفس الرمز المكون من وحدات البايت وهما متشابهتان جدًا على المستوى المنخفض. عند إجراء تحليل ثابت على تطبيق أندرويد يجب ألا تكون لغة البرمجة الأصلية مهمة ونوصي بالتركيز على جافا لأن أدوات إلغاء التحويل البرمجي المتاحة تُحول وقت تنفيذ أندرويد إلى جافا، وليس كولتين.
كما هو الحال مع قسم التحليل الثابت لنظام ويندوز، يرتكز هذا القسم حول التحليل الثابت لنظام أندرويد على مسار ممتاز وشامل ولكن ليس سهلًا. ستحتاج على الأرجح إلى دراسة المزيد من أجل فهم المادة في المقرر الأساسي.
نظام أندرويد: موارد التعلّم
اختبار مهارة
اجلس مع أحد النظراء أو مُرشِد لديه خبرة كبيرة في الفحص غير النشط ضد الخوادم على الإنترنت وبعدها:
أكمل تمارين بيزيك مالوير آر إي (Basic Malware RE) (المجانية) على تراي هاك مي (TryHackMe)
(أندرويد فقط) أكمل التمارين في الهندسة العكسية 101 لتطبيقات أندرويد 
(ويندوز فقط) في هذه المرحلة، يجب أن تكون على دراية إلى حد ما بتفكيك ملفات الثنائيات لنظام ويندوز وقراءة تجميع x86 واستخدام هذه المعرفة لفهم ما يفعله البرنامج. ارجع إلى الجهاز الظاهري الذي يعمل عليه نظام ريمنوكس وقم بتحليل البرمجيات الضارة التي قمت بتنزيلها مسبقًا. لا تتردد في العودة إلى المواد التدريبية المذكورة أعلاه وإجراء بحث تكميلي أثناء قيامك بذلك
