+++
style = "module"
weight = 2
title = "Basic file analysis"
description = "بمجرد أن يكون لديك برمجية ضارة على جهازك الظاهري المخصص للتحليل، تكمن الخطوة التالية في معرفة ما يحتويه. يمكن أن تستخدم البرمجية الضارة عدة ملفات، وفي هذه الحالة ستستخدم التقنيات الواردة في هذا القسم لكل ملف. هناك عدة طرق مختلفة للتعرف على نوع الملف الذي تتعامل معه."
+++

## حالة استخدام

بمجرد أن يكون لديك برمجية ضارة على جهازك الظاهري المخصص للتحليل، تكمن الخطوة التالية في معرفة ما يحتويه. يمكن أن تستخدم البرمجية الضارة عدة ملفات، وفي هذه الحالة ستستخدم التقنيات الواردة في هذا القسم لكل ملف. هناك عدة طرق مختلفة للتعرف على نوع الملف الذي تتعامل معه. لاحظ أنه قد يكون من الصعب التعرف على بعض أنواع البرمجيات الضارة حيث تخفي محتوًى ضارًا في ملفات غير ضارة أو إنشاء ملفات تحتوي على عدة أنواع صالحة في الوقت ذاته (من الأمثلة التقليدية على ذلك هي ملفات GIFAR التي هي صورة صالحة وأيضًا تطبيق جافا صغير صالح). لهذا السبب، نحتاج إلى إجراء تحليل أعمق لأنواع الملفات ومحتوياتها عند تقييم ملفات البرمجيات الضارة. بالإضافة إلى ملحقات اسم الملف، سنفحص رؤوس الملفات وتوقيعاتها بالإضافة إلى محتويات السلاسل النصية.


## الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارس قادرًا على القيام بما يلي:

- فهم ملحقات أسماء الملفات والرؤوس وبيانات التعريف
- استخدام الأدوات الجاهزة التي تكشف أنواع الملفات

---
## العرض
### ملحق اسم المل


بالنسبة للعديد من أنظمة التشغيل، تعد ملحقات أسماء الملفات مهمة جدًا لكيفية تعامل النظام مع الملف، وأسماء الملفات (وبالتالي ملحقاتها) ليست في الواقع جزءًا من الملف ولكنها جزءًا من البيانات التعريفية للملف في نظام الملفات. على هذا النحو يمكن تغييرها بسهولة ولا تكشف في الواقع عن أي شيء مهم حول محتوى الملف ولكنها خطوة أولية جيدة في التحليل. هناك مجموعة غير محدودة عمليًا من ملحقات أسماء الملفات (فهي مجرد أحرف في نهاية اسم الملف) ولا يوجد سجل مطبّق لها. لا يمكن العثور على قائمة شاملة بملحقات أسماء الملفات وللعديد منها عدة معانٍ محتملة، ولكن يمكن الاطلاع على بعض القوائم:

- ملحقات أسماء الملفات الشائعة من مايكروسوفت [Common file extensions from Microsoft](https://support.microsoft.com/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01)  (متعددة اللغات، مجانية)
- قائمة كبيرة بملحقات أسماء الملفات من ويكيبيديا[Large list of file extensions from Wikipedia](https://en.wikipedia.org/wiki/List_of_filename_extensions (الإنجليزية واليابانية والكورية، مجانية)
- قائمة كبيرة بملحقات الملفات من صانع TrID برنامج تعريف ملفات [Large list of file extensions from the maker of TrID](https://mark0.net/soft-trid-deflist.html)(الإنجليزية، مجانية)
  
### الرؤوس

تحتوي العديد من تنسيقات الملفات على هياكل بيانات مميزة خاصة بتنسيق ملفاتها، وعادة ما تكون في بداية الملف ولكنها تظهر في بعض الأحيان في أماكن أخرى. على سبيل المثال، تبدأ ملفات GIF بالسلسلة النصية "GIF89a" (أو بصورة أقل شيوعًا بالسلسلة النصية "GIF87a") بينما تبدأ الملفات التنفيذية لنظام ويندوز (تنسيق PE) بالسلسلة النصية "MZ ". تُعدّ هذه الرؤوس مهمة لأن معظم (إن لم يكن كل) البرامج التي تستخدم ملفًا لن تقوم بمعالجة الملف دون وجود التوقيعات الصحيحة. على سبيل المثال، إذا حاولت تشغيل ملف ينتهي بملحق "exe." على ويندوز، لكن الملف لا يحتوي على رأس ملف PE مناسب، فلن يقوم ويندوز بتشغيل الملف.

### بخصوص ما بعد الرؤوس القياسية

في كثير من الحالات، من الممكن التعرف على المزيد حول تنسيق الملف من خلال النظر في محتوى الإضافي في الملف. على سبيل المثال، كل من أرشيفات ZIP العادية وملفات أرشيف جافا جار (Java (JAR)) هي بتنسيق ZIP. إذا قمت بإعادة تسمية ملف jar. إلى zip.، يمكن بسهولة أن تستخرج محتوياته أدوات ZIP القياسية. لكن ستحتوي جميع ملفات JAR على سلاسل نصية (مثل "MANIFEST.MF") لا تكون موجودة في جميع ملفات ZIP. 

في بعض الحالات، لن يكون للملفات حتى نفس التنسيق الأساسي، ولكن سيكون من الصعب التمييز بينها. على سبيل المثال، يبدأ كل من الرمز المكون من وحدات البايت للملفات الثنائية التي تعمل على جافا وماخ أو (Mach-O) بتسلسل بايت 0xCAFEBABE. هنا هو [الرمز ](https://github.com/file/file/blob/master/magic/Magdir/cafebabeالذي يستخدمه أمر الملف من أجل التمييز بينهما، وكما يتضح من ذلك يحتاج الأمر الكثير من التحليلات التجريبية.

### الأدوات

For a more advanced guide on how to capture and do preliminary analysis on an Android app, we recommend checking out [this excellent guide](https://pts-project.org/guides/g3/) from PiRogue tool suite.

نظرًا لأن عدد أنواع الملفات هائل، فمن المنطقي استخدام أداة تحتوي على قاعدة بيانات لأنواع الملفات، وأكثرها شيوعًا هي أمر ملف "file" في نظام لينوكس. نظرًا لأنها  [مفتوحة المصدر](https://github.com/file/file)، يمكنك أن ترى كيف توصلت إلى قرار معين بشأن ملف معين. ومن الأدوات المماثلة لها أداة [TrID](https://mark0.net/soft-trid-e.html) على الرغم من أنها ليست مفتوحة المصدر، قد تتمكن من الحصول على نتائج أفضل لملفات معينة.

إحدى الأدوات الأخرى المفيدة لتحليل الملفات هي أمر "strings". تطبع أداة يونيكس (unix) هذه جميع سلاسل الشفرة القياسية الأمريكية لتبادل المعلومات (ASCII) في ملف ويمكن أن يكون هذا مفيدًا جدًا في اكتشاف الأنماط مثل عناوين مواقع الويب، وفي حين أنها لن تعمل بشكل جيد على البيانات المشفرة أو المضغوطة أو المرمّزة تبقى فائدتها ممكنة.

أخيرًا، سيعرض المحرر السداسي العشري الملفات الثنائية بتنسيق يمكن أن يقرأه الإنسان، وعادةً ما يعرض تمثيلًا سداسيًا عشريًا وبالشفرة القياسية الأمريكية لتبادل المعلومات لبيانات الملف مما يعني أنه يمكن أن يكون مفيدًا في اكتشاف الأنماط. هناك العديد من أدوات التحرير السداسية العشرية، ويوجد على ويكيبيديا مقارنة بين بعضها [Wikipedia has a comparison of some](https://en.wikipedia.org/wiki/Comparison_of_hex_editors)ويأتي مع ريمنكوس سداسي عشري يسمى[wxHexEditor](https://www.wxhexeditor.org/home.php).

لأجل توجيهات أكثر تقدمًا حول كيفية التقاط وإجراء تحليل أولي على تطبيقات أندرويد، نوصي بالاطلاع على هذا  [الدليل الممتاز](https://pts-project.org/guides/g3/) من مجموعة أدوات بيروج (PiRogue).



### الهندسية العكسية لتنسيقات الملفات

هذه  [مقالة سريعة](https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats) عن الهندسة العكسية الثابتة لتنسيقات الملفات، عليك قراءتها والتأكد من فهمها. إذا كان ذلك ممكنًا، ناقش هذه المقالة مع مرشد أو شخص آخر لديه معرفة عميقة بالهندسة العكسية لتنسيق الملفات.

## الممارسة
أكمل التدريبات التعريفية بالبرمجيات الضارة (المجانية) على تراي هاك مي (TryHackMe) [Malware Introductory](https://tryhackme.com/room/malmalintroductory)

## اختبار مهارة

افتح الجهاز الظاهري الذي يعمل عليه نظام ريمنوكس الذي قمت بإعداده في التمارين التجريبية للموضوع الفرعي السابق.

أدِّ المهام التالية: 

1- نقل ملف غير ضار غير تنفيذي إليه مباشرة من نظام التشغيل المضيف.
2- بالإضافة إلى ذلك، قم بتنزيل إما ملف ضار من [Malware Bazaar](https://bazaar.abuse.ch/)  أو ملف إي إكس إس (exe) (نأمل ألا يكون ضارًا) من مكان آخر. حدد تنسيق كل من الملف غير القابل للتنفيذ الذي قمت بتنزيله في الخطوة السابقة والملف القابل للتنفيذ الحالي باستخدام أمر file.
3- افتح الملفين اللذين قمت للتو بتشغيل أمر file عليهما في محرر سداسي عشري. هل ترى أي اختلافات كبيرة بينهما، وبالأخص كيفية بدء الملفات؟
4- قم بتنزيل ملف دوكس (docx). من الإنترنت (يمكنك استخدام مالوير بازار هنا أيضًا). افتحها باستخدام محرر سداسي عشري لتأكيد أنه يبدأ بسلسلة "PK". ثم استخدم أمر unzip عليه وتأكد من أنه في الواقع ملف مضغوط. 
5- كرر الشيء نفسه لملف apk. (هذا ملف حزمة أندرويد).

اعرض العمل أعلاه على مُرشِد أو زميل للتأكد من تنفيذ التمارين بشكل صحيح.


## موارد التعلّم

{{% resource title="Common file name extensions in Windows" languages="English" cost="Free" description="Guide by Microsoft outlining commonly encountered file extensions in Windows." url="https://support.microsoft.com/en-us/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01" %}}

{{% resource title="List of filename extensions | Wikipedia" languages="English, Japanese, Korean" cost="Free" description="Comprehensive list of file extensions used by various software." url="https://en.wikipedia.org/wiki/List_of_filename_extensions" %}}

{{% resource title="TrID" languages="English" cost="Free" description="Program for Windows and Linux to identify file types based on binary signatures." url="https://mark0.net/soft-trid-e.html" %}}

{{% resource title="File extensions and file type definitions" languages="English" cost="Free" description="TrID’s list of over 16,000 known file extensions." url="https://mark0.net/soft-trid-deflist.html" %}}

{{% resource title="File" languages="English" cost="Free" description="Command line program for Unix-like systems to identify files by type." url="https://github.com/file/file" %}}

{{% resource title="Comparison of hex editors" languages="English, Simplified Chinese, Croatian, Spanish" cost="Free" description="List and comparison of hex editors for directly editing binary files." url="https://en.wikipedia.org/wiki/Comparison_of_hex_editors" %}}

{{% resource title="wxHexEditor" languages="English" cost="Free" description="Official webpage of the hex editor supplied with REMnux." url="https://www.wxhexeditor.org/home.php" %}}

{{% resource title="Wikibooks/ Reverse Engineering File Formats" languages="English" cost="Free" description="Comprehensive guide to reverse engineering file formats." url="https://en.wikibooks.org/wiki/Reverse_Engineering/File_Formats" %}}

{{% resource title="Beginner guide: how to handle a potentially malicious mobile app" languages="English" cost="Free" description="Introduction to handling suspicious Android apps with initial data collection and analysis steps." url="https://pts-project.org/guides/g3/" %}}
