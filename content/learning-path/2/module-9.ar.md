+++
style = "module"
weight = 9
title = "تحليل المستندات الضارة"
description = "حين يعرف العديد من الأشخاص أنه يجب التشكيك في الملفات الثنائية القابلة للتنفيذ، توجد تنسيقات مستندات مكتبية"
+++

## حالة استخدام
في حين يعرف العديد من الأشخاص أنه يجب التشكيك في الملفات الثنائية القابلة للتنفيذ، توجد تنسيقات مستندات مكتبية مثل PDF وDOC وDOCX وXLSX وODT تستخدم بشكل يومي ومن المعروف للأسف أنه يمكن تسليحها إما بمحتوى ديناميكي ضار أو ثغرات تطبيق.

يُعلّم هذا الموضوع الفرعي المتعلمين كيف يمكنهم تصنيف وتحليل المستندات التي يحتمل أن تكون ضارة.


## الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:

- إعداد جهاز ريمنوكس ظاهري لتحليل المستندات
- تفكيك وتحليل مستندات PDF
- تفكيك مستندات مايكروسوفت أوفيس وتحليلها

---
## العرض 
يمكن للعديد من الجهات الفاعلة في مجال التهديد استخدام المستندات ذات الحمولات الضارة باعتبارها ناقل حمولات هجومية. اقرأ هذه الصفحة للحصول على دراسة حالة عنها.

أنشأ مشروع حرية أكبر على الإنترنت (Greater Internet Freedom)، وهو مشروع تابع لإنترنيوز مؤخرًا دورة تدريبية صغيرة حول تحليل المستندات الضارة. اقرأ الأقسام الأربعة من الدورة التدريبية (المدرجة أدناه) لإكمال هذا الموضوع الفرعي[this page](https://cyberhub.am/en/blog/2023/10/25/technical-writeup-malware-campaigns-targeting-armenian-infrastructure-and-users/).

يرجى ملاحظة أن بعض الأدوات المضمّنة في هذا الدليل تتطلب تثبيت بايثون على نظامك وقد تحتوي أنظمة ماك أو إس ولينوكس على بايثون مثبتة بشكل افتراضي. إذا كنت تعمل على نظام ويندوز، فإننا نوصي بإعداد نظام ويندوز الفرعي لنظام لينوكس [WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) وتشغيل الأدوات من هناك.

الجزء 1 - مقدمة والأجهزة الظاهرية حرية أكبر للإنترنت من إنترنيوز[Part 1 - Introduction and VMs - Internews Greater Internet Freedom](https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-1-AR.pdf)\
الجزء 2 - مستندات  [Part 2 - PDF Documents](https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-2-AR.pdf)\
الجزء 3 - مستندات مايكروسوفت أوفيس [Part 3 - Microsoft Office Documents](https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-3-AR.pdf)\
الجزء 4 التدابير الدفاعية والخطوات التالية [Part 4 - Defensive Measures and Next Steps](https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-4-AR.pdf)


## اختبار مهارة

كمل جميع التحديات في الدورة الموجود رابطها أعلاه.


## مصادر التعلّم

{{% resource title="تحليل المستندات الضارة – الجزء 01 – مقدمة والأجهزة الظاهرية" description="يُقدم موضوع تحليل المستندات الضارة ويوضح للمتعلمين كيفية إعداد جهاز ظاهري مناسب للمهمة" languages="اللغة الإنجليزية" cost="مجانًا" url="https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-1-AR.pdf" %}}

{{% resource title="تحليل المستندات الضارة – الجزء 02 – مستندات PDF" description="يوضح كيف يمكن استخدام أدوات مثل محررات النصوص وأجهزة تفكيك ملفات PDF المتخصصة لتحليل الملفات بهذا التنسيق للبحث عن أشياء مثل البرمجيات النصية القابلة للتنفيذ" languages="اللغة الإنجليزية" cost="مجانًا" url="https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-2-AR.pdf" %}}

{{% resource title="تحليل المستندات الضارة – الجزء 03 – مستندات مايكروسوفت أوفيس" description="نظرة على بنية مستندات مايكروسوفت أوفيس وكيف يمكنها تضمين المحتوى النشط" languages="اللغة الإنجليزية" cost="مجانًا" url="https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-3-AR.pdf" %}}

{{% resource title="تحليل الوثائق الضارة – الجزء 04 – التدابير الدفاعية والخطوات التالية والإغلاق" description="توضيح لبعض الخطوات والتدابير المضادة التي يمكننا اتخاذها عند العمل مع مستندات من مصادر غير معروفة أو ملفات يحتمل أن تكون ضارة" languages="اللغة الإنجليزية" cost="مجانًا" url="https://internews.org/wp-content/uploads/2024/12/Analyzing-malicious-documents-part-4-AR.pdf" %}}

{{% resource title="تحليل ملفات PDF الضارة" description="سلسلة من الأدوات التي يمكننا استخدامها لتحليل أكثر عمقًا لملفات PDF" languages="اللغة الإنجليزية" cost="مجانًا" url="https://resources.infosecinstitute.com/topics/hacking/analyzing-malicious-pdf/" %}}

{{% resource title="كيفية تحليل ملفات مايكروسوفت أوفيس الضارة" description="مورد إضافي يبحث في كيف يمكن لملفات مايكروسوفت أوفيس أن تنقل الحمولات الضارة وكيف يمكننا اكتشافها" languages="اللغة الإنجليزية" cost="مجانًا" url="https://intezer.com/blog/malware-analysis/analyze-malicious-microsoft-office-files/" %}}
