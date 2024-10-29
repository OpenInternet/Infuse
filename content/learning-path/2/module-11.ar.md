+++
style = "module"
weight = 11
title = "Clean-up, after-care, post-incident risk management, and information sharing"
description = "Removing malware and supporting people post-infection can prove challenging. We look at some of the best ways to do so"
+++

## Use Case

If malware or malicious traffic is found on a targeted person’s device, we need to either provide remedial after-care or targeted recommendations to allow a client to determine appropriate next steps.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Determine the appropriate clean-up method for the type of malware or indicator of compromise discovered
- Carry out or guide on remedial clean-up steps, including removal of persistence mechanisms, malware removal tools, reboots, factory resets
- Identify situations in which clean-up may not be possible and further advice or action may be necessary
- Document and share findings

---

## Main Section

### Re-enabling operating system security features

Earlier in this learning path we mentioned [some built-in operating system protections](/en/learning-path/2/module-4/#triagechecklists-to-check-for-missing-protections). If malware was able to run on a targeted person’s system just because some of those protections were disabled, then re-enabling them may help prevent malware from executing or doing any further damage. Some less sophisticated pieces of malware could therefore stop running or even be removed just by going into operating system settings and re-enabling protections. In case you are unable to re-enable these protections or if they are disabled again after some time, this is an indication that the malicious process is preventing the proper functioning of the operating system and further clean-up work or factory reset are required. Do note that in some instances you may find instances that OS protections have been disabled in order to install pirated software, which the user may not immediately communicate to you. It is helpful to know this scenario and to guide the client in risk-management decisions and find safer alternatives which preserve operating system integrity.

### Factory resets

Factory resets are often the simplest, cleanest way to clear up malware on a given device. If the user has backed up all data they want to keep in a cloud location or a backup drive and is able to reinstall their most-used applications after a factory reset, this is a preferable option for dealing with malware. If they are not certain of having backed up important data, you might assist them in completing a local or cloud backup. Note that malicious files may be found in backed up files (though they would be inert until executed), thus scanning backup folders with a reputable antivirus engine is advisable. Note that oftentimes application and other device configurations are not backed up, depending on the backup utility used. It’s always a good idea to test backups, for example by trying to restore the whole system or some key files from them, before doing a factory reset.

Many malware analysts prefer to use factory resets over other types of removal, since this gives them a far greater certainty that no traces of the malware remained on the targeted person’s systems. There always remains the risk that antivirus programs or operating systems’ built-in protections will not remove all malware, especially if it’s novel or rare; a factory reset will be far more effective at this. The only exception to this might be UEFI rootkits and malware which affects the device’s firmware rather than operating system; we’ve linked to some articles about this below.

### Malware removal (and when it is not possible)

Sometimes a factory reset is not feasible due to time constraints, technology constraints, or user comfort with the action. Depending on the nature of the malware, and how well understood it is, it may be feasible to remove it through automated or manual means. See the list of platform-specific advice below for general guidance.

In some cases, malware removal efforts may be ineffective. Built-in Android malware or cracked or jailbroken versions of an operating system are one example (see Android section below for more details). Hardware/firmware attacks are another class of malware which would be resistant to clean-up or factory reset efforts. These are relatively rare however they do occur, mainly only on PCs (Windows/Linux), thus are worth knowing about. Some are detectable by antiviruses, for instance see [ESET on the topic of a UEFI Rootkit discovered in the wild in 2018](https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/). Additional tips and advice from Microsoft on UEFI rootkit threat hunting is available from [BleepingComputer here](https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/).

### Platform-Specific Advice

#### Android

- Factory reset is available from the Settings menu or from recovery boot mode.
- Some malware/adware/spyware is embedded within the factory-provided Android operating system, as in the case of some low-cost and off-brand Android devices. An example of this is detailed in the technical report by [HUMAN Security on the BADBOX ad fraud botnet](https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf). Unfortunately, in most cases these devices cannot be cleaned by factory reset and are unredeemable by the average user and should be replaced with reputable brand devices, alas at a higher price point.
- Check if unprotected app sources were enabled by checking if any apps were granted permission to install APKs from ‘Unknown Sources’ in the Settings section. If yes, look for suspicious/unknown applications.
- Suspicious or malicious applications can be removed.
- Secure any Google accounts used to access the device.
- Ensure Google Play Protect is enabled and check scan results (from Google Play -> Menu -> Play Protect).
- Ensure that system components are up to date and security updates are installed. You can check the date of the device's security updates by looking in Settings -> About Phone -> Software Information (or Android Version) -> Android Security Patch Level. Check for updates by tapping on Google Play System Update. Note that older devices may receive limited security updates.

#### iOS/iPadOS

- Published research indicates that exploits against iOS live systems (including cases such as Pegasus) do not survive a device reboot (not a factory restart, but a simple power cycling on/off), so conducting a reboot is a good idea. As the threat actor may re-infect the device if using a zero-click exploit, regular rebooting is possibly prudent, as is Lockdown Mode, linked below. Keep in mind that this level of attack is still rare and high-cost. Note that maliciously configured or installed applications (e.g. stalkerware, find my phone functionality) or a compromised Apple ID account would still affect the device safety, so read on for further actions below.
- Uninstall suspicious or malicious apps.
- Consider enabling [Lockdown Mode](https://support.apple.com/en-us/105120).
- Ensure Apple iCloud account is private and not accessed by any other person. Any iOS user can use [Apple’s Safety Check](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0) to audit whether others have access to any of their accounts.
- Check if the device is jailbroken. [Some advice provided](https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/) by Certo Software includes checking for Cydia or Sileo or to utilize their free Certo Mobile Security app.
- Check for (unwanted) enrollment in Mobile Device Management (check under Settings -> General -> Profiles).
- Conduct a factory reset following [this guide](https://support.apple.com/en-gb/HT201274) (This will remove all photos, messages, and files on the phone. Unless backed up, they will be irretrievably lost).

#### Windows

- Factory reset is the preferable solution. Most devices which were purchased with Windows preinstalled will have a recovery partition from which you can perform a factory reset or a ‘refresh’ of the Operating System
- Running Antivirus in Windows ‘Safe Mode’ can be more effective at quarantining discovered infections. However, it may also miss ‘fileless’ malware which is in effect during normal OS operation.
- Check for persistence mechanisms of malware using SysInternals AutoRuns, disable them and confirm after cleanup activities that they have not-enabled.
- Some Antivirus creators provide a ‘rescue disk’ which allows you to boot into a temporary live system from which to carry out scans and malware removal activities. A list of reputable options is [provided here by TechRadar](https://www.techradar.com/best/best-antivirus-rescue-disk).
- Beware the many Windows ‘malware removal’ guides found online which appear to be customized for specific malware variants. Many of them are generic guides promoting the use of a proprietary tool which may itself be an unwanted software.

#### MacOS

- Factory reset is advisable, see [instructions from Apple here](https://support.apple.com/en-ug/HT212749).
- Commercial antivirus will have a clean-up and quarantine feature.
- Utilize [Objective-See tools ](https://objective-see.org/tools.html)such as Knock Knock and Kext Viewer to check for and disable unknown and persistent processes and kernel extensions.

### Post-Incident Risk Management and Information Sharing

Sharing your findings with your client and working with them to understand how malware infection may have occurred is an important step which allows them to update their risk management approach and understand the significance (or lack of significance) of the security incident.

Take as many detailed technical notes, screenshots, and samples (or, more likely, hashes thereof) and talk to your client about their threat model and to what degree you could share your findings with the wider community. Sharing your findings is particularly valuable if you found a novel threat or one that targets community members specifically based on certain work that they do; in this case, talking to others about malware hashes, infection vectors, and mitigation mechanisms will help protect those at highest risk from it. You can use some of the information from the [Documenting Findings](/en/learning-path/1/module-8/) section of the _Detecting, Investigating and Tracking Malicious Infrastructure_ learning path when authoring a brief report and when you consider disseminating it.

## Skill Check

Build either a flowchart or a checklist which could assist you in removing malware from a device and ensuring that you do not miss any steps. Discuss this flowchart or checklist with a peer or mentor to make sure that it’s accurate and you didn’t miss anything.

Write a brief paragraph explaining in what situations you would recommend that persons who were targeted by a successful malware infection change passwords to their main accounts (email, iCloud, social media, work) afterwards and how you would explain this to a person you are supporting. Run this paragraph by a peer or mentor who will check if your explanation is accurate.



الموضوع الفرعي 10: التنظيف والرعاية اللاحقة وإدارة مخاطر ما بعد الحادثة ومشاركة المعلومات
حالة استخدام
إذا تم العثور على برمجيات ضارة أو حركة مرور ضارة على جهاز شخص مستهدف، فنحن بحاجة إلى تقديم توصيات علاجية لاحقة للرعاية أو توصيات مستهدفة للسماح للعميل بتحديد الخطوات التالية المناسبة.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
تحديد طريقة التنظيف المناسبة لنوع البرمجيات الضارة أو مؤشر الاختراق المكتشف
تنفيذ أو توجيه خطوات التنظيف التصحيحي، بما في ذلك إزالة آليات البقاء، وأدوات إزالة البرمجيات الضارة، وإعادة التشغيل، وإعادة الضبط إلى إعدادات المصنع
تحديد المواقف التي قد لا يكون فيها التنظيف ممكنًا وقد يكون من الضروري تقديم المزيد من النصائح أو الإجراءات
توثيق وحفظ النتائج
العرض 
عندما تكتشف إصابة ببرمجيات ضارة أو مؤشرًا آخر على اختراق جهاز ما، ستحتاج إلى العمل مع مالك الجهاز المتأثر لإعادة أجهزته إلى حالة جيدة. يتطلب تقديم أفضل دعم مراعاة أهداف الشخص وفهم طبيعة التهديد الموجود على الأجهزة. قد يكون الشخص المصاب مهتمًا إما بالتخلص من البرمجيات الضارة في أسرع وقت ممكن حتى يتمكن من العودة إلى حياته وعمله أو بدلًا من ذلك قد يفضل استخدام جهاز آخر مع الاحتفاظ بالجهاز المصاب من أجل فحص ما حدث وربما من كان مسؤولًا عنه.

إزالة البرمجيات الضارة
إعادة تمكين ميزات أمان نظام التشغيل
في وقت سابق من مسار التعلّم هذا، ذكرنا بعض وسائل حماية نظام التشغيل المضمّنة وإذا كانت البرمجيات الضارة قادرة على العمل على نظام شخص مستهدف لمجرد تعطيل بعض أنواع الحماية هذه، فقد تساعد إعادة تمكينها في منع البرمجيات الضارة من العمل أو إلحاق أي ضرر آخر. لذلك يمكن إيقاف تشغيل بعض البرمجيات الضارة الأقل تعقيدًا أو حتى إزالتها بمجرد الدخول إلى إعدادات نظام التشغيل وإعادة تمكين الحماية. في حالة عدم تمكنك من إعادة تمكين هذه الحماية أو إذا تم تعطيلها مرة أخرى بعد مرور بعض الوقت، فهذا مؤشر على أن العملية الضارة تمنع عمل نظام التشغيل بشكل سليم وأن هناك حاجة إلى أعمال تنظيف إضافية أو إعادة الضبط إلى إعدادات المصنع. لاحظ أنه في بعض الأحيان قد تصادفك حالات تم فيها تعطيل حماية نظام التشغيل من أجل تثبيت البرمجيات المقرصنة والتي قد لا يقوم المستخدم بإبلاغك بها على الفور. من المفيد معرفة هذا السيناريو وتوجيه العميل خلال قرارات إدارة المخاطر وإيجاد بدائل أكثر أمانًا تحافظ على سلامة نظام التشغيل.
إعادة الضبط إلى إعدادات المصنع
غالبًا ما تكون إعادة تعيين إعدادات المصنع أبسط وأنظف طريقة لإزالة البرمجيات الضارة على جهاز معين وإذا قام المستخدم بعمل نسخة احتياطية من جميع البيانات التي يريد الاحتفاظ بها في موقع سحابي أو محرك أقراص احتياطي وكان قادرًا على إعادة تثبيت تطبيقاته الأكثر استخدامًا بعد إعادة ضبط المصنع، فهذا هو الخيار المفضل للتعامل مع البرمجيات الضارة. إذا لم يكونوا متأكدين من نسخ البيانات المهمة احتياطيًا، فيمكنك مساعدتهم في إكمال نسخة احتياطية محلية أو سحابية. لاحظ أنه قد يتم العثور على ملفات ضارة في ملفات احتياطية (على الرغم من أنها ستكون خاملة حتى يتم تنفيذها)، وبالتالي يُنصح بفحص مجلدات النسخ الاحتياطي باستخدام محرك مكافحة فيروسات حسن السمعة. لاحظ أنه في كثير من الأحيان لا يتم الاحتفاظ بنسخة احتياطية من التطبيق وتكوينات الجهاز الأخرى، اعتمادًا على أداة النسخ الاحتياطي المستخدمة. من الجيد دائمًا اختبار النسخ الاحتياطية، على سبيل المثال من خلال محاولة استعادة النظام بأكمله أو بعض الملفات الرئيسية منه قبل إجراء إعادة الضبط إلى إعدادات المصنع.
يُفضل العديد من محللي البرمجيات الضارة استخدام إعادة الضبط إلى إعدادات المصنع على أنواع أخرى من الإزالة، لأن هذا يمنحهم يقينًا أكبر بكثير بأنه لا توجد آثار للبرمجيات الضارة على أنظمة الشخص المستهدف. لا يزال هناك دائمًا خطر من أن برامج مكافحة الفيروسات أو الحماية المضمنة لأنظمة التشغيل لن تزيل جميع البرمجيات الضارة، خاصة إذا كانت جديدة أو نادرة وستكون إعادة الضبط إلى إعدادات المصنع أكثر فعالية في هذا الشأن. قد يكون الاستثناء الوحيد لهذا هو الجذور الخفية في الواجهة الموحّدة للبرامج الثابتة الموسّعة والبرمجيات الضارة التي تؤثر على البرامج الثابتة للجهاز بدلًا من نظام التشغيل وقد ذكرنا روابط بعض المقالات حول هذا الموضوع أدناه.
إزالة البرمجيات الضارة (وعندما لا يكون ذلك ممكنًا)
في بعض الأحيان لا تكون إعادة ضبط المصنع ممكنة بسبب قيود الوقت أو قيود التكنولوجيا أو راحة المستخدم مع الإجراء. حسب طبيعة البرمجيات الضارة ومدى فهمها، قد يكون من الممكن إزالتها من خلال الوسائل الآلية أو اليدوية. انظر قائمة النصائح الخاصة بالمنصة أدناه للحصول على إرشادات عامة.
في بعض الحالات، قد تكون جهود إزالة البرمجيات الضارة غير فعالة، ومن الأمثلة على ذلك البرمجيات الضارة المضمّنة في نظام أندرويد أو الإصدارات مُخترقة الحماية أو المعطلة من نظام التشغيل (انظر قسم أندرويد أدناه لمزيد من التفاصيل). تُعدّ هجمات الأجهزة/البرامج الثابتة هي فئة أخرى من البرمجيات الضارة التي ستكون مقاومة لجهود التنظيف أو إعادة الضبط إلى إعادة الضبط إلى إعدادات المصنع، ولكنها تكون نادرة نسبيًا ولكن تحدث بشكل أساسي فقط على أجهزة الكمبيوتر (ويندوز/لينوكس) وبالتالي فهي تستحق أن نعرفها. يمكن اكتشاف بعضها بواسطة مضادات الفيروسات، على سبيل المثال، انظر مقالة إي سيت (ESET)حول موضوع الجذور الخفية في الواجهة الموحّدة للبرمجيات الثابتة الموسّعة الذي تم اكتشافها طليقة في عام 2018. تتوفر نصائح ونصائح إضافية من مايكروسوفت حول البحث عن تهديد الجذور الخفية في الواجهة الموحّدة للبرمجيات الثابتة الموسّعة من بليبنغ كمبيوتر (BleepingComputer) هنا.
نصائح خاصة بالمنصات
نظام أندرويد
تتوفر إعادة الضبط إلى إعدادات المصنع من قائمة الإعدادات أو من وضع تمهيد الاسترداد.
تُضمّن بعض البرمجيات الضارة/البرمجيات الدِعائية/ برمجيات التجسس داخل نظام تشغيل أندرويد الذي يوفره المصنع كما هو الحال في بعض أجهزة أندرويد منخفضة التكلفة والتي ليست من علامات تجارية معروفة. يرد مثال مفصل على ذلك في التقرير الفني من تأليف هيومن سيكيوريتي (HUMAN Security) حول شبكة روبوتات بادبوكس (BADBOX) البرمجية الاحتيالية الضارة لفتح الإعلانات. لسوء الحظ في معظم الحالات لا يمكن تنظيف هذه الأجهزة عن طريق إعادة ضبط المصنع ولا يمكن استبدالها من قبل المستخدم العادي ويجب استبدالها بأجهزة ذات علامة تجارية حسنة السمعة، ولكنها للأسف بسعر أعلى.
تحقق مما إذا كان قد تم تمكين مصادر التطبيقات غير المحمية عن طريق التحقق مما إذا كان قد تم منح أي تطبيقات إذنًا لتثبيت ملفات APK من "مصادر غير معروفة" في قسم الإعدادات. إذا كانت الإجابة نعم، ابحث عن التطبيقات المشبوهة/غير المعروفة. 
يمكن إزالة التطبيقات المشبوهة أو الضارة.
قم بتأمين أي حسابات غوغل مستخدمة للوصول إلى الجهاز.
تأكد من تمكين غوغل بلاي للحماية وتحقق من نتائج الفحص (من غوغل بلاي -> القائمة -> بلاي بروتكت).
تأكد من تحديث مكونات النظام وتثبيت تحديثات الأمان حيث يمكنك التحقق من تاريخ تحديثات أمان الجهاز من خلال البحث في الإعدادات -> حول الهاتف -> معلومات البرنامج (أو إصدار أندرويد) -> مستوى تصحيح أمان أندرويد.  تحقق من وجود تحديثات من خلال النقر على تحديث نظام غوغل بلاي ولاحظ أن الأجهزة القديمة قد تتلقى تحديثات أمان محدودة.
آي أو إس/آيباد أو إس
تُشير الأبحاث المنشورة إلى أن عمليات الاستغلال ضد أنظمة آي أو إس المباشرة (بما في ذلك حالات مثل بيغاسوس) لا تبقى بعد إعادة تشغيل الجهاز (ليس إعادة ضبط إلى إعدادات المصنع، وإنما تشغيل/إيقاف تشغيل بسيط للطاقة) لذا فإن إجراء إعادة التشغيل فكرة جيدة. نظرًا لأن الجهة الفاعلة في التهديد قد تعيد إصابة الجهاز في حالة ثغرة لا تحتاج تفاعل المستخدم، فمن المحتمل أن تكون إعادة التشغيل المنتظمة حكيمة كما هو الحال في وضع الإغلاق الوارد رابطه أدناه. يجب أن تراعي أن هذا المستوى من الهجوم لا يزال نادرًا وعالي التكلفة. لاحظ أن التطبيقات التي تم تكوينها أو تثبيتها بشكل ضار (مثل برمجيات المطاردة، أو العثور على وظائف هاتفي) أو حساب آبل آي دي مُخترق ستظل تؤثر على سلامة الجهاز لذا تابع القراءة للاطلاع على المزيد من الإجراءات أدناه.
إلغاء تثبيت التطبيقات المشبوهة أو الضارة.
يجب أن تراعي تمكين وضع الإغلاق.
تأكد من أن حساب آبل آي كلاود خاص ولا يمكن أن يصل إليه أي شخص آخر. يمكن لأي مستخدم آي أو إس استخدام تحقق سلامة آبل لتدقيق ما إذا كان بإمكان الآخرين الوصول إلى أي من حساباتهم.
تحقق ما إذا كان الجهاز مُخترق الحماية حيث تتضمن بعض النصائح التي تقدمها سيرتو سوفتوير (Certo Software) تحقق من سيديا (Cydia) أو سيليو (Sileo) أو استخدم تطبيق أمان سيرتو المجاني.
تحقق من التسجيل (غير المرغوب فيه) في إدارة الأجهزة المحمولة (تحقق من الإعدادات -> عام -> ملفات التعريف).
أجر إعادة ضبط المصنع باتباع هذا الدليل (سيؤدي ذلك إلى إزالة جميع الصور والرسائل والملفات على الهاتف وستضيع بشكل لا رجعة فيه إذا لم يتم نسخها احتياطيًا).
ويندوز
يُعدّ إعادة ضبط المصنع هو الحل المفضل حيث ستحتوي معظم الأجهزة التي تم شراؤها مع ويندوز المثبتة مسبقًا على قسم استرداد يمكنك من خلاله إجراء إعادة ضبط المصنع أو "تحديث" نظام التشغيل
يمكن أن يكون تشغيل برنامج مكافحة الفيروسات في "الوضع الآمن" لنظام التشغيل ويندوز أكثر فعالية في الحجر الصحي للإصابة المكتشفة. لكن قد يفتقد أيضًا البرمجيات الضارة "التي ليس لها ملفات" والتي تكون قيد العمل أثناء تشغيل نظام التشغيل العادي.
تحقق من آليات بقاء البرمجيات الضارة باستخدام سيس إنترنالز أوتورنز وقم بتعطيلها وتأكيد عدم تمكينها بعد أنشطة التنظيف.
يُوفر بعض منشئي برامج مكافحة الفيروسات "قرص إنقاذ" يسمح لك بالتمهيد في نظام مباشر مؤقت يمكنك من خلاله إجراء عمليات الفحص وأنشطة إزالة البرمجيات الضارة. تتوفر قائمة بالخيارات ذات السمعة الطيبة هنا من تك رادار.
تنبّه إلى أن العديد من أدلة "إزالة البرمجيات الضارة" لويندوز موجودة على الإنترنت ويبدو أنها مخصصة لأنماط برمجيات ضارة محددة لكن العديد منها عبارة عن أدلة عامة تروج لاستخدام أداة خاصة قد تكون في حد ذاتها برمجية غير مرغوب فيها.
نظام ماك أو إس
يُنصح بإعادة ضبط المصنع، انظر تعليمات آبل هنا.
تحتوي برامج مكافحة الفيروسات التجارية على ميزة التنظيف والحجر الصحي.
استخدم أدوات أوبجكتف سي مثل نكنوك وكيكست فيور للتحقق من العمليات غير المعروفة والتي تحافظ على بقائها وملحقات النواة وتعطيلها.
إدارة المخاطر بعد الحادثة وتبادل المعلومات
تُعدّ مشاركة النتائج التي توصلت إليها مع عميلك والعمل معه لفهم كيفية حدوث الإصابة بالبرمجيات الضارة خطوة مهمة تسمح له بتحديث نهج إدارة المخاطر وفهم أهمية (أو عدم أهمية) الحادث الأمني.
سجّل أكبر عدد ممكن من الملاحظات الفنية التفصيلية ولقطات الشاشة والعينات (أو على الأرجح شفرات تجزئتها) وتحدث إلى عميلك حول نموذج التهديد الخاص به وإلى أي درجة يمكنك مشاركة النتائج التي توصلت إليها مع المجتمع الأوسع. تُعدّ مشاركة النتائج التي توصلت إليها ذات قيمة خاصة إذا وجدت تهديدًا جديدًا أو تهديدًا يستهدف أفراد المجتمع على وجه التحديد بناءً على عمل معين يقومون به؛ في هذه الحالة سيساعد التحدث إلى الآخرين حول شفرات تجزئة البرمجيات الضارة وناقلات الإصابة وآليات التخفيف على حماية الأشخاص الأكثر عرضة للخطر بسببها. يمكنك استخدام بعض المعلومات من قسم توثيق النتائج في مسار تعلّم كشف البنية التحتية الضارة وفحصها وتتبعها عند كتابة تقرير موجز وعندما تفكر في نشره.
مصادر التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة
أنشئ مخطط انسيابي أو قائمة مرجعية يمكن أن تساعدك في إزالة البرمجيات الضارة من الجهاز والتأكد من عدم تفويت أي خطوات. ناقش هذا المخطط الانسيابي أو القائمة المرجعية مع أحد الزملاء أو المُرشِد للتأكد من دقته وعدم تفويتك لأي شيء.

اكتب فقرة موجزة تشرح فيها المواقف التي توصي بأن يقوم الأشخاص فيها الذين نجحت البرمجيات الضارة باستهدافهم بتغيير كلمات المرور إلى حساباتهم الرئيسية (البريد الإلكتروني، أو آي كلاود، أو وسائل التواصل الاجتماعي، أو العمل) بعد ذلك وكيف ستشرح ذلك لشخص تدعمه. واعرض هذه الفقرة على أحد النظراء أو مُرشِد ليتحقق مما إذا كان شرحك دقيقًا.



## Learning Resources

{{% resource title="UEFI rootkit cyber attack discovered" languages="English" cost="Free" description="Analysis of a UEFI rootkit malware discovered in 2018, designed to persist even after OS reinstall." url="https://www.eset.com/int/uefi-rootkit-cyber-attack-discovered/" %}}

{{% resource title="Microsoft shares guidance to detect BlackLotus UEFI bootkit attacks" languages="English" cost="Free" description="Overview of the BlackLotus UEFI bootkit malware and steps to detect it, provided by Microsoft." url="https://www.bleepingcomputer.com/news/security/microsoft-shares-guidance-to-detect-blacklotus-uefi-bootkit-attacks/" %}}

{{% resource title="Trojans All the Way Down: BADBOX and PEACHPIT" languages="English" cost="Free" description="In-depth report on BADBOX and PEACHPIT, malware pre-installed at factories, emphasizing the importance of devices from reputable manufacturers." url="https://www.humansecurity.com/hubfs/HUMAN_Report_BADBOX-and-PEACHPIT.pdf" %}}

{{% resource title="How Safety Check on iPhone works to keep you safe" languages="English" cost="Free" description="Explanation of the iPhone Safety Check feature, allowing users to review and control shared information." url="https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/1.0/web/1.0" %}}

{{% resource title="How to tell if your iPhone is jailbroken" languages="English" cost="Free" description="Guide to detecting whether an iOS device has been jailbroken using initial heuristics." url="https://www.certosoftware.com/insights/how-to-tell-if-your-iphone-is-jailbroken/" %}}

{{% resource title="How to factory reset your iPhone, iPad or iPod touch" languages="English" cost="Free" description="Guide on how to completely wipe an iOS device, ensuring removal of malware or malicious profiles." url="https://support.apple.com/en-gb/HT201274" %}}

{{% resource title="Best antivirus rescue disks of 2024" languages="English" cost="Free" description="List of tools for scanning and cleaning infected operating systems using external bootable drives." url="https://www.techradar.com/best/best-antivirus-rescue-disk" %}}

{{% resource title="Erase your Mac and reset it to factory settings" languages="English" cost="Free" description="Guide on how to completely wipe a macOS device to remove malware or malicious profiles." url="https://support.apple.com/en-ug/102664" %}}

{{% resource title="Objective-See Tools" languages="English" cost="Free" description="Collection of security tools for macOS developed by a reputable security researcher, used for detecting malware." url="https://objective-see.org/tools.html" %}}
