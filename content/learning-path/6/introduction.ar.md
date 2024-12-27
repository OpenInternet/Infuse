---
style: introduction
title: مقدمة
description: "اقرأ نظرة عامة على مسار التعلم وأهدافه والتهديدات المرتبطة به ومتطلباته الأساسية"
weight: 1
---

## نظرة عامة

المواقع الإلكترونية هي بنية تحتية حيوية تستخدمها المنظمات الإعلامية والمجتمع المدني لنشر التدفق الحر للمعلومات وكذلك لتوفير وظائف لأصحاب المصلحة فيها. يهاجم المتطفلون تطبيقات الويب هذه لأغراض مختلفة، بما فيها إيقاف تدفق المعلومات الحر وإلحاق الضرر بالسمعة والتسلل إلى الأنظمة الخاصة وسرقة المعلومات الحساسة والمراقبة واختراق الأجهزة. من خلال الاستعداد الفعال لهذه الأنواع من الهجمات، يمكن تقليل تأثيرها أو في بعض الحالات منعها تمامًا.

تنقسم الهجمات على مواقع الويب بشكل عام إلى فئتين هما: حجب الخدمة والاختراق بأشكاله المختلفة. تهدف هجمات حجب الخدمة إلى منع الأشخاص من الوصول إلى الموقع وعادة ما تُنفذ عن طريق إغراق الموقع بحركة مرور الاتصالات. غالبًا ما يشن هجمات حجب الخدمة مجرمون مبتزون يطالبون بتلقي أموال مقابل وقف الهجوم، أو من قبل المنافسين السياسيين الذين يرغبون في حرمان أهدافهم من الوصول إلى المنصة. تستهدف هجمات الاختراق الثغرات ونقاط الضعف في تطبيق الويب، وبالتالي تتطلب عمومًا مهارات إضافية ولكن يمكن أن يكون لها تأثير أكبر على الموقع المستهدف.  تختلف كثيرًا أنواع المهاجمين وأهدافهم، ولكن تشمل أهداف الاختراق الشائعة استخراج البيانات الخاصة من موقع ما، أو تشويه المحتوى أو تغييره بطرق أخرى، أو الاستيلاء على البنية التحتية الأساسية للموقع، أو التغيير لأجل أهداف أخرى، أو استهداف مستخدمي الموقع.

يغطي مسار التعلّم هذا المعرفة المتوسطة والمتقدمة اللازمة للتحضير للهجمات ضد تطبيقات الويب والرد عليها، ويُعدّ الاستعداد الفعّال مهمًا للغاية للرد على أي نوع من الهجمات. من الصعب أو المستحيل تنفيذ معظم تقنيات الاستجابة التي يغطيها مسار التعلّم هذا دون الإعداد المناسب، لكن ومع الاستعداد المناسب، من الممكن جعل بعض أشكال هجمات حجب الخدمة غير فعّالة والتخفيف من هجمات حجب الخدمة بسرعة وفعالية، وإيقاف والتعافي من هجمات الاختراق قبل حدوث ضرر كبير. سنغطي في مسار التعلّم هذا:

- تعزيز حماية موقع الويب
- تسجيل الأحداث على خادم الويب
- الاستجابة لأحداث حجب الخدمة
- الاستجابة لحوادث الاختراق والتحليل الجنائي
- 
لاحظ أنه في حين أن هجمات حجب الخدمة أكثر شيوعًا من هجمات الاختراق، يُغطي مسار التعلّم هذا في الغالب استجابة الاختراق. يُعزى سبب ذلك إلى حقيقة أن هجمات حجب الخدمة تكون دائمًا أبسط من هجمات الاختراق، ولأن الاستعداد لهجمات حجب الخدمة والاستجابة لها ينطوي في الغالب على العمل مع مزودي الطرف الثالث الذين يقومون بمعظم العمل. وبالمقارنة، غالبًا ما تكون هجمات الاختراق أكثر تعقيدًا، ويتطلب الرد عليها عملًا متعمّقًا ومباشرًا على الموقع نفسه.
 
في حين أن بعض الجهات الفاعلة التي تكون دول قومية (مثل الولايات المتحدة والصين وكوريا الشمالية وروسيا وما إلى ذلك) تحظى بتمويل جيد ولديها وكلاء ذوي مهارات عالية، تحظى غالبيتها الأخرى بالتمويل ولكنها تفتقر إلى المهارات التقنية العميقة. تستخدم هذه الجهات بشكل متكرر هجمات حجب خدمة واسعة النطاق لمنع الناس من مشاهدة مواقع هؤلاء المنافسين بقصد كبت خطاب منافسيهم السياسيين. تسعد المنظمات الإجرامية بتأجير شبكات الروبوت الخاصة بها (شبكات أجهزة الكمبيوتر المُخترقة) للأشخاص لاستخدامها في هجمات حجب الخدمة،  إليكم بعض الأمثلة:

- سبتمبر/أيلول 2022 [https://www.qurium.org/alerts/nacionale-under-ddos/](https://www.qurium.org/alerts/nacionale-under-ddos/)
- مايو/أيار [https://www.qurium.org/alerts/the-tip-of-the-iceberg/](https://www.qurium.org/alerts/the-tip-of-the-iceberg/) 
- مارس/آذار 2022 [https://www.qurium.org/alerts/philippines/forensic-analysis-of-the-multiple-distributed-denial-of-service-attacks-in-the-philippines/](https://www.qurium.org/alerts/philippines/forensic-analysis-of-the-multiple-distributed-denial-of-service-attacks-in-the-philippines/)
- سبتمبر/أيلول 2021 https://www.qurium.org/alerts/switzerland/gotham-city-under-denial-of-service/ 
أغسطس/آب 2021 [https://www.qurium.org/alerts/philippines/human-rights-alliance-karapatan-under-long-lasting-ddos-attack/](https://www.qurium.org/alerts/philippines/human-rights-alliance-karapatan-under-long-lasting-ddos-attack/) & [https://www.qurium.org/alerts/philippines/israeli-firm-bright-data-luminati-networks-enabled-the-attacks-against-karapatan/](https://www.qurium.org/alerts/philippines/israeli-firm-bright-data-luminati-networks-enabled-the-attacks-against-karapatan/)
- يونيو/حزيران 2021 [https://www.qurium.org/alerts/philippines/attacks-against-media-in-the-philippines-continue/](https://www.qurium.org/alerts/philippines/attacks-against-media-in-the-philippines-continue/)
- يوليو/تموز 2020 [https://www.qurium.org/alerts/colombia/la-nueva-prensa-attacked-for-operacion-jaque-documentary/](https://www.qurium.org/alerts/colombia/la-nueva-prensa-attacked-for-operacion-jaque-documentary/)
- مايو/أيار 2020 [https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/](https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/)
- أبريل/نيسان 2020 [https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/](https://www.qurium.org/alerts/azerbaijan/sandman-and-fineproxy-behind-the-ddos-attacks-against-timetv-live/)
- مارس/آذار 2020 [https://www.qurium.org/alerts/el-salvador/ddos-attacks-against-salvadoran-revista-factum-attributed-to-university-infrastructure/](https://www.qurium.org/alerts/el-salvador/ddos-attacks-against-salvadoran-revista-factum-attributed-to-university-infrastructure/)
- 
لدى المتطفلين، وبالأخص المتطفلين السياسيين تاريخ سابق بمحاولات اختراق مواقع جماعات المجتمع المدني، وتشمل الأمثلة على ذلك ما يلي:
مارس/آذار 2020 [https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/](https://www.qurium.org/alerts/nigeria/premium-times-nigeria-ddos-attack/) 
أكتوبر/تشرين الأول [https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/](https://www.qurium.org/alerts/colombia/kontacto-lacks-of-security-exposed-data-from-55-000-people/)
أغسطس/آب 2019 [https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/ ](https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/](https://www.qurium.org/alerts/zimbabwe/the-cyberattack-against-the-zimbabwe-electoral-commission/))
سبتمبر/أيلول [https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/](https://www.qurium.org/alerts/zimbabwe/the-zimbabwe-election-commission-zec-website-what-went-wrong/)

بالإضافة إلى ذلك، يمكن أن يتعرض أي موقع على الإنترنت لهجمات انتهازية وموجّهة من قبل الجهات الفاعلة ذات الدوافع المالية. لدى هؤلاء المتطفلين أهداف تشمل سرقة كلمات مرور المستخدم، ومعلومات بطاقة الدفع وما شابه ذلك بهدف إعادة بيعها أو تعديل محتوى الموقع للتلاعب بترتيب نتائج البحث أو بهدف النقر الاحتيالي، أو استخدام البنية التحتية للموقع نفسه لتعدين العملات المشفرة، أو إرسال رسائل غير مرغوب فيها، أو شن هجمات حجب الخدمة. لمزيد من المعلومات حول الهجمات الانتهازية والآلية على تطبيقات الويب، راجع هذا [التقرير الصادر عن مشروع أمان تطبيق الويب المفتوح (OWASP)](https://owasp.org/www-project-automated-threats-to-web-applications/).

## الهدف 
سيتعلم الممارسون كيفية:

- إجراء تعزيز الحماية الأساسي لمواقع الويب ضد القرصنة وهجمات حجب الخدمة
- إضافة سجلات أمان فعّالة إلى تطبيقات الويب خاصتهم
- الاستجابة لهجمات حجب الخدمة والاختراق

## ما هي التهديدات التي تخففها أو تستجيب لها هذه المهارة؟

- اختراق موقع الويب
- حجب الخدمة للموقع

## ما هي المتطلبات المسبقة؟

يتطلب مسار التعلّم هذا معرفة عملية بخوادم الويب، والثغرات المحتملة، ونقاط الضعف الأساسية. لذلك نوصي جميع المتعلمين الذين يدرسونه أولًا وليس لديهم معرفة جيدة ببنى خوادم الويب والثغرات بإكمال مسار تعلّم أساسيات أمان تطبيقات الويب أولًا.

في حين أن معرفة اختبار أمان موقع الويب وتقييمه ليست شرطًا أساسيًا ملزمًا قبل مسار التعلّم هذا، قد يجد بعض المتعلمين أنه من الأسهل عليهم أولًا دراسة مسار تعلّم تقييم أمان تطبيق الويب قبل إجراء هذا المسار، وبالأخص إذا كانوا يرغبون بمراجعة معرفتهم بالثغرات الرئيسية في تطبيقات الويب.

بالإضافة إلى ما سبق، يجب أن يكون المتعلمون قادرين على إكمال تحليل الملفات النصية الأساسية باستخدام أداة awk، وإذا كانوا بحاجة إلى مراجعة مهاراتهم، نوصي بهذه [المقدمة](https://www.tutorialspoint.com/awk/index.htm) أو هذا [الكتاب الإلكتروني](https://learnbyexample.github.io/learn_gnuawk/) الشامل.

## ما هي الأجهزة أو البرمجيات التي تحتاجها لأداء التمارين؟ 

لأجل إكمال العديد من التمارين العملية الموصى بها في مسار التعلّم هذا، ستحتاج إلى جهاز كمبيوتر يمكنه تشغيل داكر (Docker)، ويمكن أن يعمل على أي جهاز ماك أو إس (macOS) (بما في ذلك آبل سيليكون (Apple Silicon)) أو ويندوز (Windows) أو لينوكس (Linux) مزوّد بذاكرة وصول عشوائي تبلغ 8 غيغابايت وبعض المساحة الحرة على قرص تخزينه.

في حال كنت تعمل على نظام ويندوز، فإننا نوصيك بتثبيت نظام ويندوز الفرعي لنظام لينوكس (Windows Subsystem for Linux) لتشغيل بعض الأدوات في مسار التعلّم هذا. في حين قد تكون هناك طرق أخرى لتشغيل مثل هذه الأدوات، سيتطلب ذلك قدرًا أقل بكثير في إعداد التبعيات.

- فيما يلي الوثائق المقدمة من مايكروسوفت (Microsoft) التي تشمل التفاصيل الكاملة حول كيفية تثبيت نظام ويندوز الفرعي لنظام لينوكس 2: [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10) 
- افتح "تشغيل أو إيقاف ميزات ويندوز (Turn Windows features on or off)" في لوحة تحكم ويندوز وتأكد من اختيار "النظام الأساسي للأجهزة الظاهرية (Virtual Machine Platform)" و"نظام ويندوز الفرعي لنظام لينوكس".
- نزّل وثبّت نظام ويندوز الفرعي لنظام لينوكس 2 من متجر مايكروسوفت [Microsoft Store](https://apps.microsoft.com/store/detail/windows-subsystem-for-linux-preview/9P9TQF7MRM4R). بمجرد تثبيته أعد تشغيل الكمبيوتر لتطبيق التغييرات.
افتح ويندوز باورشل (Windows PowerShell) أو موجه الأوامر (Command Prompt) بوضع المسؤول من خلال النقر بزر الماوس الأيمن واختيار "تشغيل كمسؤول (Run as administrator)" ثم شغّل الأمر
wsl --set-default-version 2
سيكون ناتج هذا الأمر كما يلي:
لمزيد من المعلومات حول الاختلافات الرئيسية مع نظام ويندوز الفرعي لنظام لينوكس 2، يرجى زيارة [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
تمت العملية بنجاح.
بمجرد تثبيت نظام ويندوز الفرعي لنظام لينوكس 2، يمكنك تثبيت توزيعة لينوكس التي تفضلها من متجر مايكروسوفت أو باستخدام سطر الأوامر. ما عليك سوى البحث عن "لينوكس (Linux)" في متجر مايكروسوفت، وتحديد التوزيعة المطلوبة (على سبيل المثال، أوبنتو (Ubuntu) أو ديبيان (Debian) أو غيرهما)، والنقر على "تثبيت (Install)". بدلًا من ذلك يمكنك تثبيت توزيعة لينوكس باستخدام باورشل أو موجه الأوامر. افتح ويندوز باورشل أو موجه الأوامر واطلب سرد التوزيعات المتاحة:
wsl --list --online
قم بتثبيت توزيعة من هذه القائمة باستخدام أمر <اسم التوزيعة> wsl --install -d.
wsl --install -d Ubuntu
بعد التثبيت، سيكون لكل توزيعة لينوكس رمز في قائمة تطبيقات ويندوز. بمجرد تثبيت نظام ويندوز الفرعي لنظام لينوكس، ستحتاج إلى إنشاء حساب مستخدم وكلمة مرور لتوزيعة لينوكس المثبتة حديثًا. 
يجب أن تفتح نافذة جديدة فيها غلاف لينوكس.
فيما يلي مراجعة سريعة لخيارات سطر أوامر النظام ويندوز الفرعي لنظام لينوكس.
اطبع معلومات الاستخدام وشاهد وسيطات سطر الأوامر:
wsl --help
سرد التوزيعات المثبتة:
wsl --list
سرد التوزيعات قيد التشغيل فقط:
wsl --list --running
إنهاء التوزيعة قيد التشغيل:
wsl --terminate Ubuntu-22.04
إيقاف تشغيل جميع التوزيعات قيد التشغيل:
wsl --shutdown
إلغاء تسجيل توزيع لينوكس وحذف نظام الملفات:
wsl --unregister Ubuntu-22.04
تحديث النظام ويندوز الفرعي لنظام لينوكس إلى أحدث إصدار:
wsl --update
ابدأ التوزيعة الافتراضية:
wsl
## مسارات التعلّم ذات الصلة 

أساسيات أمان تطبيقات الويب: يفترض مسار تعلّم تعزيز الحماية والتحليل الجنائي والاستجابة للحوادث وجود مستوى معين من الإلمام بأمن تطبيقات الويب. إذا كان هذا المجال الأمني جديدًا بالنسبة لك، عليك استكمال مسار تعلّم أساسيات الأمان لتحصل على المعلومات الأساسية للتعامل معها بفعالية.

تقييم أمان تطبيقات الويب: بالنسبة للمدافعين الرقميين، يُعد الهجوم والدفاع جزأين مهمين من الصورة الكاملة، وبما أنك شخص يساعد عملائك على تأمين مواقعهم، فإن معرفة كيفية الدفاع بشكل كلي ضد الهجمات يسمح لك بتزويدهم بتوصيات أفضل. يُوفر مسار التعلّم هذا فهمًا أعمق لأنواع هجمات الاختراق التي قد تتعرض لها مواقع الويب.



