+++
style = "module"
weight = 9
title = "Malicious document analysis"
description = "We learn how to triage and analyze potentially suspicious malicious documents"
+++

## Use Case

While many people know to be suspicious of executable binary files, office document formats such as PDF, DOC, DOCX, XLSX, and ODT, which are used on a daily basis, are unfortunately known to be weaponized with malicious dynamic content or application exploits.

This subtopic teaches learners how they can triage and analyze potentially malicious documents.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Set up a REMNux virtual machine for document analysis
- Disassemble and analyze PDF documents
- Disassemble and analyze Microsoft Office documents

---
## Main Section
Many threat actors can use documents with malicious payloads as an attack vector. Read through [this page](https://cyberhub.am/en/blog/2023/10/25/technical-writeup-malware-campaigns-targeting-armenian-infrastructure-and-users/) for a case study thereof.

_Greater Internet Freedom_, an Internews Project, recently created a small course on analyzing malicious documents. Read through all four parts of the course (listed below) in order to complete this subtopic.

Please note that some of the tools included in this guide require Python to be installed on your system. MacOS and Linux systems may have Python installed by default. If you are running Windows, we recommend setting up [WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/install) and running the tools from there.

[Part 1 - Introduction and VMs - Internews Greater Internet Freedom](https://greaterinternetfreedom.org/course/part01-intro-and-vms/)\
[Part 2 - PDF Documents](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-02-pdf-documents/)\
[Part 3 - Microsoft Office Documents](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-03-microsoft-office-documents/)\
[Part 4 - Defensive Measures and Next Steps](https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-04-defensive-measures-next-steps-and-closure/)

## Skill Check

Complete all of the challenges in the course linked above.


الموضوع الفرعي 8: تحليل المستندات الضارة
حالة استخدام
في حين يعرف العديد من الأشخاص أنه يجب التشكيك في الملفات الثنائية القابلة للتنفيذ، توجد تنسيقات مستندات مكتبية مثل PDF وDOC وDOCX وXLSX وODT تستخدم بشكل يومي ومن المعروف للأسف أنه يمكن تسليحها إما بمحتوى ديناميكي ضار أو ثغرات تطبيق.
يُعلّم هذا الموضوع الفرعي المتعلمين كيف يمكنهم تصنيف وتحليل المستندات التي يحتمل أن تكون ضارة.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
إعداد جهاز ريمنوكس ظاهري لتحليل المستندات
تفكيك وتحليل مستندات PDF
تفكيك مستندات مايكروسوفت أوفيس وتحليلها
العرض 
يمكن للعديد من الجهات الفاعلة في مجال التهديد استخدام المستندات ذات الحمولات الضارة باعتبارها ناقل حمولات هجومية. اقرأ هذه الصفحة للحصول على دراسة حالة عنها.
أنشأ مشروع حرية أكبر على الإنترنت (Greater Internet Freedom)، وهو مشروع تابع لإنترنيوز مؤخرًا دورة تدريبية صغيرة حول تحليل المستندات الضارة. اقرأ الأقسام الأربعة من الدورة التدريبية (المدرجة أدناه) لإكمال هذا الموضوع الفرعي.
يرجى ملاحظة أن بعض الأدوات المضمّنة في هذا الدليل تتطلب تثبيت بايثون على نظامك وقد تحتوي أنظمة ماك أو إس ولينوكس على بايثون مثبتة بشكل افتراضي. إذا كنت تعمل على نظام ويندوز، فإننا نوصي بإعداد نظام ويندوز الفرعي لنظام لينوكس (Windows Subsystem for Linux) وتشغيل الأدوات من هناك.
الجزء 1 - مقدمة والأجهزة الظاهرية حرية أكبر للإنترنت من إنترنيوز
الجزء 2 - مستندات PDF
الجزء 3 - مستندات مايكروسوفت أوفيس
الجزء 4 التدابير الدفاعية والخطوات التالية
مصادر التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة
أكمل جميع التحديات في الدورة الموجود رابطها أعلاه.


## Learning Resources

{{% resource title="Analysis of malicious documents – Part 01 – Introduction and VMs" languages="English" cost="Free" description="Introduces the topic of malicious document analysis and guides learners on setting up a VM for the task." url="https://greaterinternetfreedom.org/course/part01-intro-and-vms/" %}}

{{% resource title="Analysis of malicious documents – Part 02 – PDF documents" languages="English" cost="Free" description="Covers tools like text editors and PDF disassemblers for analyzing PDF files and detecting executable scripts." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-02-pdf-documents/" %}}

{{% resource title="Analysis of malicious documents – Part 03 – Microsoft Office documents" languages="English" cost="Free" description="Explores the structure of Microsoft Office documents and their potential for embedding active content." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-03-microsoft-office-documents/" %}}

{{% resource title="Analysis of malicious documents – Part 04 – Defensive measures, next steps, and closure" languages="English" cost="Free" description="Demonstrates steps and defensive measures when handling documents from unknown or potentially malicious sources." url="https://greaterinternetfreedom.org/course/analysis-of-malicious-documents-part-04-defensive-measures-next-steps-and-closure/" %}}

{{% resource title="Analyzing malicious PDFs" languages="English" cost="Free" description="Discusses various tools for in-depth analysis of malicious PDF files." url="https://resources.infosecinstitute.com/topics/hacking/analyzing-malicious-pdf/" %}}

{{% resource title="How to analyze malicious Microsoft Office files" languages="English" cost="Free" description="Provides insights into detecting malicious payloads in Microsoft Office files and methods for analysis." url="https://intezer.com/blog/malware-analysis/analyze-malicious-microsoft-office-files/" %}}
