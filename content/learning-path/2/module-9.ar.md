+++
style = "module"
weight = 9
title = "Malicious document analysis"
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

الجزء 1 - مقدمة والأجهزة الظاهرية حرية أكبر للإنترنت من إنترنيوز[Part 1 - Introduction and VMs - Internews Greater Internet Freedom](https://greaterinternetfreedom.org/course/part01-intro-and-vms/)\
الجزء 2 - مستندات  [Part 2 - PDF Documents](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-02-pdf-documents/)\
الجزء 3 - مستندات مايكروسوفت أوفيس [Part 3 - Microsoft Office Documents](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-03-microsoft-office-documents/)\
الجزء 4 التدابير الدفاعية والخطوات التالية [Part 4 - Defensive Measures and Next Steps](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-04-defensive-measures-next-steps-and-closure/)


## اختبار مهارة

كمل جميع التحديات في الدورة الموجود رابطها أعلاه.


## مصادر التعلّم

{{% resource title="Analysis of malicious documents – Part 01 – Introduction and VMs" languages="English" cost="Free" description="Introduces the topic of malicious document analysis and guides learners on setting up a VM for the task." url="https://greaterinternetfreedom.org/course/part01-intro-and-vms/" %}}

{{% resource title="Analysis of malicious documents – Part 02 – PDF documents" languages="English" cost="Free" description="Covers tools like text editors and PDF disassemblers for analyzing PDF files and detecting executable scripts." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-02-pdf-documents/" %}}

{{% resource title="Analysis of malicious documents – Part 03 – Microsoft Office documents" languages="English" cost="Free" description="Explores the structure of Microsoft Office documents and their potential for embedding active content." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-03-microsoft-office-documents/" %}}

{{% resource title="Analysis of malicious documents – Part 04 – Defensive measures, next steps, and closure" languages="English" cost="Free" description="Demonstrates steps and defensive measures when handling documents from unknown or potentially malicious sources." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-04-defensive-measures-next-steps-and-closure/" %}}

{{% resource title="Analyzing malicious PDFs" languages="English" cost="Free" description="Discusses various tools for in-depth analysis of malicious PDF files." url="https://resources.infosecinstitute.com/topics/hacking/analyzing-malicious-pdf/" %}}

{{% resource title="How to analyze malicious Microsoft Office files" languages="English" cost="Free" description="Provides insights into detecting malicious payloads in Microsoft Office files and methods for analysis." url="https://intezer.com/blog/malware-analysis/analyze-malicious-microsoft-office-files/" %}}
