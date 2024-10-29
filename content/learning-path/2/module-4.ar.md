+++
style = "module"
weight = 4
title = "Initial steps and checks for detecting malware"
description = "This subtopic looks at the ways in which we can conduct initial triage and check for malware when we are handed a potentially infected device"
+++

## Use Case

There is a device of unknown security status and the owner wants to investigate the possibility of infection or previous compromise. Perhaps you have been handed this device physically, or perhaps you will support the client remotely. Use different off-the-shelf or built-in first party scanning tools as well as integrity checks to identify, analyze, and search for Indicators of compromise (IoC) to identify a breach, or a given suspicious malware.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Use popular malware detection tools, such as antivirus or the built-in tools in your OS, to aid in your analysis
- Understand some basic anti-malware protections within modern operating systems and how to check if they are running or if they have been disabled.

---
## Main Section
### Off-the-shelf anti-malware (all platforms)

The least labor-intensive method to detect known malware is to simply use a malware scanner to look at a client’s device’s live system. Note that the quality of antivirus products can vary wildly, but most products catch most known malware. Below are links to some common malware scanners for desktop systems:

- 🧰 Windows: [Microsoft Defender](https://apps.microsoft.com/store/detail/microsoft-defender/9P6PMZTM93LR) is free and built into Windows. Various commercial AV tools may be used, each with their own pros and cons. Here we will be suggesting [MalwareBytes](https://www.malwarebytes.com/). Consider also [AdwCleaner ](https://support.malwarebytes.com/hc/en-us/articles/360038523194)from MalwareBytes for a remover of Adware and Potentially Unwanted Programs[^1].

- 🧰 MacOS: We similarly recommend using [Malwarebytes](https://www.malwarebytes.com/mac). [Avast Free Antivirus](https://www.avast.com/en-us/free-antivirus-download) is also a free option.
- 🧰 Linux: [ClamAV](https://www.clamav.net/) is an open-source antivirus for Linux. It is also available for other platforms
- 🧰 Android: Various providers such as [LookOut ](https://www.lookout.com/)provide free or paid Android antivirus and additional mobile security protections. ClamAV is implemented on Android in the [Hypatia](https://f-droid.org/en/packages/us.spotco.malwarescanner/) app via [F-Droid](https://f-droid.org/en/).
  - [Google Play Protect](https://support.google.com/googleplay/answer/2812853?hl=en) will scan apps on your phone, even those not downloaded from the Google Play Store. Click the link for more details and directions on how to initiate a scan.

💡 Compared to desktop operating systems, by design antivirus on Android is more limited in its ability; it can scan all installed apps, but isn’t able to look for possible advanced spyware hiding on the system. Moreover, it may not be able to remove malware it detects.

- 🧰 iOS: There are no comprehensive malware scanners for iOS. The security built into iOS means that apps aren’t able to scan other installed apps. Several antivirus vendors have apps for iOS, but these tend to have other functions, such as blocking phishing websites or checking if the phone is up to date.

### Advice and skills for using off-the-shelf antivirus to detect Malware

One of the first steps you can take when looking for malware is installing an antivirus program and letting it run a scan on its system. After the scan is complete, most programs will generate some kind of log that provides additional information about scan results, and we recommend taking a look at it. If antivirus programs catch a potentially suspicious file, they might ‘quarantine’ it, which means that the file will be locked away from the rest of the operating system so that it cannot be accidentally opened or cause further havoc. If you would like to do further analysis on that file, you might need to take it out of quarantine; check out your antivirus program’s documentation on this topic.

It should be noted that modern malware doesn’t always involve malicious files. Instead, it may involve legitimate scripts performing malicious tasks that are made persistent in some way. Antivirus apps will scan for such tasks, thus in the logs it provided, be mindful not to only expect ‘files’.

You should be aware of the limitations of antivirus programs and why they are not a total cure for malware. Different antivirus programs use different detection engines. Some engines will detect some types of viruses and other malware, but no engine is 100% effective.

For this reason, in case you have a sample, you may prefer to upload potentially suspicious files to VirusTotal, which checks the file using a suite of commercially available engines and provides other information that can help you determine whether a file is malicious. Do note that if you upload a file to VirusTotal, it will remain on the website and can be downloaded (and searched for) by anyone with a paid account on the site. As such, if you are dealing with files that contain potentially sensitive information or you don’t want the fact that this file is being analyzed to become publicly known, it’s best to generate a hash of the file[^2] and search for this on VirusTotal instead. Finally, remember that VirusTotal only uses static engines and its detection can therefore be less effective than that of an antivirus running on a live system. See [Subtopic 8](/en/learning-path/2/module-8/) on sample-based Detection for more on this skill. For more on VirusTotal skills, complete the activity in [Chapter 7 of the Field Guide to Incident Response for Civil Society and Media](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).

While modern antivirus engines try to look for malware-like behavior and block executables which meet this criterion, those tests are still relatively rudimentary. Antivirus mostly recognizes malware based on IoCs that were submitted to it; as such, it rarely picks up on new or lesser-known malware.

In addition, adversaries will often test their malware against well-known antivirus programs and modify it so that it isn’t easily detected, for instance by using obfuscation, encoding, compression, and encryption. Some malware will attempt to disable antivirus programs or add itself to an exception list so that it is not scanned. Other malware can trick users into disabling them. For this reason, we recommend installing a new antivirus program on a potentially compromised system and running a scan with that. You can uninstall the program afterwards.

When you do find malware or adware on somebody’s computer, including in cases where it is commodity malware or adware, it is useful to work with the owner of the device to understand how the malware may have been installed on the device (described in [Subtopic 10](/en/learning-path/2/module-10/)) and then clean up the infection (described in [Subtopic 11](/en/learning-path/2/module-11/)). Understanding how the malware was installed may point to lack of controls, awareness about risky behavior, or even supply chain issues (e.g., devices shipped pre-installed with potentially unwanted programs) to be discussed and addressed.

### Triage/Checklists To check for missing protections

All modern operating systems use some form of built-in protection or so-called ‘walled gardens’ (such as app stores or Smart Screen) which restrict users to executable files which the operating system deems safe. By checking to see if these protections have been disabled, removed, or put in an error state, you will gain a valuable triage indication that further compromise may have occurred. If any of those protections are not working, it does not necessarily mean that they were disabled by malware; a user could have turned them off manually in order to run certain software or they could have been targeted by a social engineering attack which convinced them to disable some of those features. If you re-enable those protections, it will likely stop a lot of malware from running or restrict the damage which it can cause to a system.

One thing you can do on all systems is check all web browsers that are installed and see if they have any new extensions which you do not recognize. If they have such extensions, run a web search to see what they do, if they could potentially be malicious, and, if they are potentially malicious, what sort of malware could have installed them.[^3]

For all devices, we would recommend checking out [this quick triage checklist](https://pts-project.org/guides/g6/#identifying-compromised-devices).

#### Windows

Check out the [Windows Defender Security Center](https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/windows-defender-security-center/windows-defender-security-center) (or Windows Security/Security at a glance), which lets you quickly glance at several Windows security settings, including whether Windows Defender is currently up and running. Do note that Windows Defender’s antivirus features might be automatically disabled if you install a third-party antivirus. This is expected behavior. In either case, a malicious program may have succeeded in adding itself to an exception list (allowlist) instructing the anti-malware tool not to check it. You can verify that there are no unwanted exceptions on Windows Defender using [these instructions](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26#ID0EBF=Windows_11) and other third party anti-malware products may offer the same functionality. The settings panel will let you check the status of several other built-in protections, such as Reputation-based Protection, Core isolation, and Secure boot, among others.

Windows uses Smart App Control (previously called SmartScreen before Window 11, which is now the web-based version of the product integrated in the Edge Browser) as a mechanism to check the reputation of executables before they are run. Check [Smart App Control (Win 11) in the Windows Security settings ](https://support.microsoft.com/en-au/topic/what-is-smart-app-control-285ea03d-fa88-4d56-882e-6698afdb7003)to see in case it has been disabled. Look for Smart Screen settings in earlier versions of Windows.

#### MacOS

- macOS has several mechanisms which aim to stop malware from running. Still, a malicious actor could find ways of bypassing those. Read [about the different protections](https://support.apple.com/guide/security/protecting-against-malware-sec469d47bd8/web) which exist on macOS. This [advanced guide](https://redcanary.com/blog/gatekeeper/) provides an in-depth look at macOS protections and at the databases they use. Advanced users could look through those databases to spot unusual activity, though this is in-depth forensics work which goes beyond the scope of this learning path.
- One of the most important anti-malware mechanisms on macOS is called Gatekeeper. Every macOS system should have Gatekeeper enabled, especially for devices which run sensitive data. [There have, however, been cases when malware disabled Gatekeeper](https://www.zdnet.com/article/macos-malware-disables-gatekeeper-to-deploy-malicious-payloads/) protections so as to be able to run further malicious code on macOS systems. Users might have been targeted by social engineering attacks that persuaded them to turn off this feature. You can run “spctl --status” on the macOS Terminal to see whether Gatekeeper, its standard anti-malware measure, has been enabled or disabled.[^4] If Gatekeeper is disabled, make sure to turn it on (this will stop most malware from running) and investigate, perhaps by [checking command line history](https://www.macworld.com/article/351872/how-to-look-at-your-command-history-list-in-macoss-terminal.html), how this could have happened.

#### iOS

- iOS supports loading up custom profiles. Those are typically used to connect to corporate or university networks, but an adversary could potentially use them to intercept your traffic. Go to the settings for your iOS device and [check ](https://support.apple.com/guide/iphone/install-or-remove-configuration-profiles-iph6c493b19/ios)if any profiles have been installed. If any profiles look suspicious and the user does not recall installing them, it could be a sign of malicious activity. In this case, it's good to document everything you can find about this profile, take screenshots, and then remove it.
- iOS also has Shortcuts, which are typically used to automate certain functions on the device, such as compressing images or converting text. The app is usually quite good at describing what the shortcuts do in plain language ([though some shortcuts allow you to run custom JavaScript](https://support.apple.com/guide/shortcuts/advanced-shortcuts-settings-apdfeb05586f/ios)). Just like with profiles, if you see any shortcuts which appear to be suspicious (note that each iOS version might install some new ones, so it's best to read up on them as well), document them through screenshots and then remove them. In general, it’s incredibly difficult for malware to install custom profiles or shortcuts; it’s far easier for an attacker to load them through social engineering or by having brief access to an unlocked device.
- Consider the security of the users’ iCloud account, as compromise of this account can lead to access to significant iOS device data. Complete a review of Apple ID account security and make changes such as password changes, 2FA, app access removal, and other device sign-out if necessary. Apple’s Safety Check contains a [review feature](https://support.apple.com/guide/personal-safety/how-safety-check-works-ips2aad835e1/web) which could help you with this.
- Adversaries would sometimes send text messages or iMessages with malicious links to targeted persons. If clicked, this link could contain a malware or social engineering payload. It’s a good idea to look through recent iMessages and text messages to see if any contain suspicious links or other content.
- For more on iOS triage basics, check out [chapter 12 of the field guide](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf).
- Some adversaries try to add a new device which they control to the list of linked devices in a targeted person’s messenger such as WhatsApp or Signal. That way, all of the messages that the targeted person would send and receive would be copied to the adversary’s device as well. This attack is usually caused by an adversary having direct physical access rather than malware, but checking for unrecognized linked devices in [WhatsApp](https://faq.whatsapp.com/378279804439436?helpref=faq_content), [Signal](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices), [Telegram](https://telegram.org/blog/sessions-and-2-step-verification), and other messengers should also be a key part of the triage process.

#### Android

- For Android, read through [chapter 8 of the field guide](https://internews.org/wp-content/uploads/2023/11/Field-Guide-to-Threat-Labs.pdf), which shows how you can triage potentially suspicious apps by looking at the various permissions (such as access to your photos, camera, or microphone) that they are requesting.
- Check for Apps given extra control over the device by reviewing apps listed and enabled under Device Admin Apps in Android settings. The user should know which apps have been granted these privileges - normally either corporate enterprise apps or official device theft apps which allow remote wipe. In case unrecognized apps have been granted admin permissions, disable them and investigate further.
- Install Unknown Sources is another Android permission which can be granted to an app to allow it to install other apps. This circumvents the ‘walled garden’ protection of official app stores like Google Play Store or Galaxy Store. In some cases this may be desirable, as in the case of the F-Droid open source app store. However if you find that bluetooth, a browser, an instant messenger, a files app or sending/transfer app have been granted this permission, it indicates the device owner has installed apps from outside of safe app sources and further investigations will be required.
- Adversaries would sometimes send text messages with malicious links to targeted persons. If clicked, this link could contain a malware or social engineering payload. It’s a good idea to look through recent text messages to see if any contain suspicious links or other content.
- Check in the App Info for the app in the if it is possible to uninstall the app. If it isn't, this is a pre-installed app. This could still be an issue (some cheaper phones have malware pre-installed) but excludes targeting and also far less likely on more expensive phones.
- [Check ](https://support.google.com/android/answer/2812853?hl=en)if Google Play Protect is enabled.
- Some adversaries try to add a new device which they control to the list of linked devices in a targeted person’s messenger such as WhatsApp or Signal. That way, all of the messages that the targeted person would send and receive would be copied to the adversary’s device as well. This attack is usually caused by an adversary having direct physical access rather than malware, but checking for unrecognized linked devices in [WhatsApp](https://faq.whatsapp.com/378279804439436?helpref=faq_content), [Signal](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices), [Telegram](https://telegram.org/blog/sessions-and-2-step-verification), and other messengers should also be a key part of the triage process.

It’s worth noting that security configurations vary between different versions of iOS and Android. More recent versions of iOS, for example, require profiles to be digitally signed, which should make it harder for adversaries to leverage them. Similarly, many software updates change the way systems deal with permissions or notifications. A good rule of thumb is that successive versions of iOS and Android tend to have stricter security requirements when it comes to automations, apps, and permissions.


## Practice

### Windows and macOS

1. Windows: look through the Windows Defender Security Center. Do you notice anything suspicious?
2. macOS: use the command line to check if Gatekeeper is enabled.

### Android and iOS

1. Look through several of your apps and see which permissions they have. Are there any apps you do not recognize or some which ask for too many permissions? On Android: are any of those apps which you do not recognize pre-installed?
2. iOS only: check your device for shortcuts and installed profiles you do not recognize
3. Use a search engine to find the full text of a text message you have received that might have looked weird or suspicious. If you have no weird or suspicious text messages, search for a standard message from your network operator. How much information can you find online about the number which sent this message and about the message itself?

## Skill Check

### Android and iOS

1. Android: Read through the [Android documentation on permissions](https://developer.android.com/guide/topics/permissions/overview). There is no need for you to understand the source code, the goal is just to gain a general understanding of how permissions work. \
   Think about what a malicious application could do and what data it could extract with the permissions outlined in the Android specification, and also about what steps the operating system takes to minimize the risk of apps abusing permissions. Write down a list of five to ten actions a malicious application that has wide system permissions could do, and note down two to three undesirable situations which app permissions best practices could mitigate. \
   If you are working with a peer or mentor, discuss the list you compiled above with them, and have them verify that you have correctly understood app permissions, how they could be abused, and Android mitigations which prevent this from happening.
2. iOS: Read through the description of [iOS Lockdown Mode](https://support.apple.com/en-us/HT212650), a special setting for individuals at high risk of targeted attacks, especially through mercenary spyware. List some answers to the following questions. Do note that there are no exact right or wrong answers to those questions, since Lockdown Mode, like all other security mechanisms, aims for a fine balance between security and usability. Some of those questions require deeper knowledge of prior attacks against iOS (we encourage learners to look up ‘jailbreaking’ when researching the topic) and might require a little additional research.
   1. Why does Lockdown Mode block most attachments on Apple Messages? Why does it not block them on applications such as WhatsApp?
   2. Can you think of a reason why Lockdown Mode restricts certain web browsing features?
   3. Lockdown Mode, once enabled, does not allow for the installation of custom profiles. Why do you think profiles which were installed before the user turned on Lockdown Mode are still allowed to operate?
      If you are working with a peer or mentor, discuss your answers to the above questions with them and have them verify that you have understood Lockdown Mode.

الموضوع الفرعي 4: الخطوات الأولية والفحوصات للكشف عن البرمجيات الضارة
حالة استخدام
يوجد جهاز ذو حالة أمنية غير معروفة ويريد المالك فحص إمكانية الإصابة أو الاختراق السابق. ربما تم تسليمك هذا الجهاز بشكل فعلي أو ربما ستدعم العميل عن بُعد. استخدم أدوات فحص مختلفة جاهزة أو مضمّنة تخص الطرف الأول بالإضافة إلى فحوصات السلامة لتحديد مؤشرات الاختراق وتحليلها والبحث عنها لتحديد خرق أو برمجية ضارة مشبوهة معينة.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
استخدام أدوات كشف البرمجيات الضارة الشائعة، مثل برامج مكافحة الفيروسات أو الأدوات المدمجة في نظام التشغيل الخاص بك للمساعدة في تحليلك
فهم بعض وسائل الحماية الأساسية للبرمجيات الضارة داخل أنظمة التشغيل الحديثة وكيفية التحقق مما إذا كانت قيد التشغيل أو إذا تم تعطيلها.
العرض 
البرامج الجاهزة لمكافحة البرمجيات الضارة (جميع المنصات) 
أقل الطرق حاجة إلى كثافة العمل للكشف عن البرمجيات الضارة المعروفة هي ببساطة استخدام فاحص برمجيات ضارة للنظر إلى النظام المباشر لجهاز العميل. لاحظ أن جودة منتجات مكافحة الفيروسات يمكن أن تختلف بشكل كبير ولكن معظم المنتجات تلتقط معظم البرمجيات الضارة المعروفة. فيما يلي روابط لبعض فاحصات البرمجيات الضارة الشائعة لأنظمة سطح المكتب:
🧰 ويندوز: مايكروسوفت ديفندر (Microsoft Defender) مجاني ومضمّن في ويندوز ويمكن استخدام أدوات مضاد فايروس مدفوعة مختلفة لكل منها إيجابياتها وسلبياتها الخاصة. نقترح هنا مالوير بايتس (MalwareBytes) ويمكنك أيضًا مراعاة آد دبليو كلينر (AdwCleaner)من مالوير بايتس لإزالة البرمجيات الدِعائية والبرمجيات غير المرغوب فيها.
🧰 نظام ماك أو إس: وبالمثل، نوصي باستخدام مالوير بايتس. برنامج أفاست (Avast) المجاني لمكافحة الفيروسات هو أيضًا خيار مجاني.
🧰 نظام لينوكس: كلام إيه في (ClamAV) هو مكافحة فيروسات مفتوح المصدر لنظام لينوكس وهو متاح أيضًا للمنصات الأخرى
🧰 نظام أندرويد: يوجد العديد من مقدمي الخدمات مثل لوكآوت (LookOut)الذي يوفر إمكانيات مكافحة فيروسات مجانية أو مدفوعة على أندرويد وسبل حماية إضافية لضمان أمان الأجهزة المحمولة. يتوفر كلام إيه في على أندرويد في تطبيق هيباشيا (Hypatia) عبر متجر إف درويد (F-Droid). 
تقوم خدمة غوغل بلاي للحماية (Google Play Protect) بفحص التطبيقات على هاتفك حتى تلك التي لم يتم تنزيلها من متجر غوغل بلاي. انقر على الرابط للحصول على مزيد من التفاصيل والتوجيهات حول كيفية بدء الفحص.
💡 بالمقارنة مع أنظمة تشغيل سطح المكتب، فإن تصميم برامج مكافحة الفيروسات على أندرويد أكثر محدودية من حيث القدرة ويمكنه فحص جميع التطبيقات المثبتة لكنه غير قادر على البحث عن برمجيات التجسس المتقدمة المحتملة المخفية على النظام. علاوة على ذلك، قد لا يتمكن من إزالة البرمجيات الضارة التي يكتشفها.
🧰 آي أو إس: لا توجد فاحصات شاملة للبرمجيات الضارة لنظام تشغيل آي أو إس لأن ميزات الأمان المضمّنة في آي أو إس أن تعني أن التطبيقات غير قادرة على فحص التطبيقات المثبتة الأخرى. لدى العديد من موفري خدمات برامج مكافحة الفيروسات تطبيقات لنظام التشغيل آي أو إس، ولكن تميل هذه إلى أن يكون لها وظائف أخرى مثل حظر مواقع التصيد الاحتيالي أو التحقق مما إذا كان الهاتف محدثًا.   
نصائح ومهارات لاستخدام برامج مكافحة الفيروسات الجاهزة للكشف عن البرمجيات الضارة
تتمثل إحدى الخطوات الأولى التي يمكنك اتخاذها عند البحث عن البرمجيات الضارة في تثبيت برنامج مكافحة فيروسات والسماح له بإجراء فحص على نظامه. بعد اكتمال الفحص، ستقوم معظم البرامج بتوليد أحد أنواع السجلات التي توفر معلومات إضافية حول نتائج الفحص ونوصي بإلقاء نظرة عليها. إذا التقطت برامج مكافحة الفيروسات ملفًا مشبوهًا محتملًا، فقد "تعزله" مما يعني أنه سيتم قفل الملف بعيدًا عن بقية نظام التشغيل بحيث لا يمكن فتحه عن طريق الخطأ أو التسبب بالمزيد من الفوضى. إذا كنت ترغب في إجراء مزيد من التحليل لهذا الملف، فقد تحتاج إلى إخراجه من العزل وبإمكانك التحقق من وثائق برنامج مكافحة الفيروسات الخاص بك حول هذا الموضوع.
تجدر الإشارة إلى أن البرمجيات الضارة الحديثة لا تتضمن دائمًا ملفات ضارة، بدلًا من ذلك، قد تتضمن ذلك برامج نصوص سليمة تؤدي مهامًا ضارة ويتم إبقائها مستمرة بطريقة ما. ستقوم تطبيقات مكافحة الفيروسات بالبحث عن مثل هذه المهام وبالتالي عليك أن تراعي أنه في السجلات عليك ألا تتوقع وجود "ملفات" فقط. 
يجب أن تكون على دراية بقيود برامج مكافحة الفيروسات وسبب عدم كونها علاجًا كاملًا للبرمجيات الضارة. تستخدم برامج مكافحة الفيروسات المختلفة محركات كشف مختلفة وستكتشف بعض المحركات بعض أنواع الفيروسات والبرمجيات الضارة الأخرى ولكن لا يوجد محرك فعال بنسبة 100 ٪. 
لهذا السبب، إذا كان لديك عينة فقد تفضل تحميل ملفات مشبوهة محتملة إلى فايروستوتال، الذي يتحقق من الملف باستخدام مجموعة من المحركات المتاحة المدفوعة ويوفر معلومات أخرى يمكن أن تساعدك في تحديد ما إذا كان الملف ضارًا أم لا. لاحظ أنه إذا قمت بتحميل ملف إلى فايروستوتال، فسيبقى على موقع الويب ويمكن تنزيله (والبحث عنه) من قبل أي شخص لديه حساب مدفوع على الموقع. على هذا النحو، إذا كنت تتعامل مع ملفات تحتوي على معلومات يُحتمل أن تكون حساسة أو كنت لا تريد أن تصبح حقيقة أن هذا الملف يتم تحليله معروفة للجمهور، فمن الأفضل إنشاء شفرة تجزئة للملف والبحث عنها على فايروستوتال بدلًا من ذلك. أخيرًا، تذكر أن فايروستوتال يستخدم فقط محركات ثابتة وبالتالي يمكن أن يكون اكتشافه أقل فعالية من اكتشاف مضاد الفيروسات الذي يعمل على نظام يعمل. انظر الموضوع الفرعي 7 حول الكشف القائم على العينات لمزيد من المعلومات حول هذه المهارة. لمعرفة المزيد عن مهارات فايروستوتال، أكمل النشاط في الفصل 7 من الدليل الميداني للاستجابة لحوادث المجتمع المدني ووسائل الإعلام.
بينما تحاول محركات مكافحة الفيروسات الحديثة البحث عن سلوك شبيه بالبرمجيات الضارة وحظر الملفات التنفيذية التي تفي بهذا المعيار، لا تزال هذه الاختبارات بدائية نسبيًا ويتعرف برنامج مكافحة الفيروسات في الغالب على البرمجيات الضارة استنادًا إلى مؤشرات الاختراق التي تم إرسالها إليه وعلى هذا النحو نادرًا ما يلتقط البرمجيات الضارة الجديدة أو الأقل شهرة.
بالإضافة إلى ذلك، غالبًا ما يقوم المتطفلون باختبار برمجياتهم الضارة ضد برامج مكافحة الفيروسات المعروفة وتعديلها بحيث لا يتم اكتشافها بسهولة، على سبيل المثال باستخدام الطمس والترميز والضغط والتشفير. ستحاول بعض البرمجيات الضارة تعطيل برامج مكافحة الفيروسات أو إضافة نفسها إلى قائمة الاستثناءات حتى لا يتم فحصها. يمكن للبرمجيات الضارة الأخرى أن تخدع المستخدمين ليقوموا بتعطيلها ولهذا السبب نوصي بتثبيت برنامج جديد لمكافحة الفيروسات على نظام يُحتمل أن يكون مخترقًا وإجراء فحص باستخدامه ثم يمكنك إلغاء تثبيت البرنامج بعدها.
عندما تجد برمجيات ضارة أو برمجيات دِعائية على جهاز كمبيوتر شخص ما، بما في ذلك في الحالات التي تكون فيها برمجيات ضارة دِعائية أو برمجيات دِعائية متاحة للبيع، فمن المفيد العمل مع مالك الجهاز لفهم كيفية تثبيت البرمجيات الضارة على الجهاز (الموصوفة في الموضوع الفرعي 9) ثم تنظيف الإصابة (الموصوفة في الموضوع الفرعي 10). قد يشير فهم كيفية تثبيت البرمجيات الضارة إلى نقص الضوابط أو الوعي بالسلوك المحفوف بالمخاطر أو حتى مشكلات سلسلة التوريد (على سبيل المثال، الأجهزة التي تم شحنها مسبقًا مع برمجيات يحتمل أن تكون غير مرغوب فيها) لمناقشتها ومعالجتها.
التصنيف/قوائم التحقق للتأكد من فقدان الحماية
تستخدم جميع أنظمة التشغيل الحديثة شكلًا من أشكال الحماية المضمّنة أو ما يسمى "الحدائق المسورّة" (مثل متاجر التطبيقات أو سمارت سكرين (Smart Screen)) التي تُقيد المستخدمين بالملفات القابلة للتنفيذ التي يعتبرها نظام التشغيل آمنة. من خلال التحقق لمعرفة ما إذا كان قد تم تعطيل هذه الحماية أو إزالتها أو وضعها في حالة خطأ، سيتوفر لديك مؤشر تصنيف مهم يدل على وجود المزيد من مؤشرات الاختراق وإذا لم تنجح أي من هذه الحماية، فهذا لا يعني بالضرورة أنه تم تعطيلها بواسطة البرمجيات الضارة وكان بإمكان المستخدم إيقاف تشغيلها يدويًا من أجل تشغيل برامج معينة أو كان من الممكن استهدافها بهجوم انتحال بالهندسة الاجتماعية لإقناعهم بتعطيل بعض هذه الميزات. إذا أعدت تمكين هذه الحمايات، فمن المحتمل أن تمنع الكثير من البرمجيات الضارة من العمل أو أن تُقلل الضرر الذي يمكن أن تسببه للنظام.
أحد الأشياء التي يمكنك القيام بها على جميع الأنظمة هي التحقق من جميع متصفحات الويب المثبتة ومعرفة ما إذا كانت تحتوي على أي إضافات جديدة لا تتعرف عليها. إذا كان فيها إضافات كهذه عليك إجراء بحث على الويب لمعرفة ما تفعله وما إذا كان من المحتمل أن تكون ضارة وما إذا كان من المحتمل أن تكون ضارة وما نوع البرمجيات الضارة التي يمكن أن تكون قد قمت بتثبيتها.
بالنسبة لجميع الأجهزة، نوصي بالاطلاع على قائمة التحقق للتصنيف السريع هذه.
ويندوز
تحقق من مركز أمان ويندوز ديفندر (Windows Defender Security Center) (أو أمان ويندوز/الأمان في لمحة)، والذي يتيح لك إلقاء نظرة سريعة على العديد من إعدادات أمان ويندوز بما فيها ما إذا كان ويندوز ديفندر قيد التشغيل حاليًا. لاحظ أن ميزات مكافحة الفيروسات في ويندوز ديفندر قد يتم تعطيلها تلقائيًا إذا قمت بتثبيت برنامج مكافحة فيروسات يخص جهة أخرى، فهذا سلوك متوقع. في كلتا الحالتين، قد تكون البرمجية الضارة قد نجحت في إضافة نفسها إلى قائمة الاستثناءات (قائمة السماح) التي تطلب من أداة مكافحة البرمجيات الضارة عدم التحقق منها. يمكنك التحقق من عدم وجود استثناءات غير مرغوب فيها على ويندوز ديفندر باستخدام هذه التعليمات وقد توفر منتجات مكافحة البرمجيات الضارة الأخرى التابعة لجهات خارجية الوظيفة ذاتها. ستتيح لك لوحة الإعدادات التحقق من حالة عدد من وسائل الحماية المضمّنة الأخرى، مثل الحماية القائمة على السمعة وعزل النواة، ووضع تمهيد التشغيل الآمن من بين أمور أخرى.
يستخدم ويندوز التحكم الذكي في التطبيقات (Smart App Control) (الذي كان يسمى سابقًا سمارت سكرين قبل ويندوز 11 والذي أصبح الآن الإصدار المستند إلى الويب من المنتج المضمّن في متصفح إيدج (Edge)) كآلية للتحقق من سمعة الملفات التنفيذية قبل تشغيلها. اطلّع على التحكم الذكي في التطبيقات (ويندوز 11) في إعدادات أمان ويندوزلمعرفة ما إذا كان قد تم تعطيله. ابحث عن إعدادات سمارت سكرين في الإصدارات السابقة من ويندوز.
نظام ماك أو إس
يحتوي نظام ماك أو إس على العديد من الآليات التي تهدف إلى وقف البرمجيات الضارة قبل بدأها بالعمل ولكن يمكن للممثل الخبيث أن يجد طرقًا للتحايل عليها. اقرأ عن أنماط الحماية المختلفة الموجودة على ماك أو إس. يوفر هذا الدليل المتقدم نظرة متعمّقة حول حماية ماك أو إس وحول قواعد البيانات المستخدمة. يمكن للمستخدمين المتقدمين البحث في قواعد البيانات هذه لاكتشاف النشاط غير الاعتيادي على الرغم من أن هذا عمل تحليل جنائي متعمّق يتجاوز نطاق مسار التعلّم هذا.
إحدى أهم آليات مكافحة البرمجيات الضارة على ماك أو إس تسمى غيت كيبر (Gatekeeper) يجب تمكين غيت كيبر لكل نظام ماك أو إس وبالأخص للأجهزة التي تعمل وعليها بيانات حساسة. لكن كانت هناك حالات قامت فيها البرمجيات الضارة بتعطيل حماية غيت كيبر حتى تتمكن من تشغيل تعليمات برمجية ضارة إضافية على أنظمة ماك أو إس. ربما جرى استهداف المستخدمين بهجمات الانتحال بالهندسة الاجتماعية التي أقنعتهم بإيقاف تشغيل هذه الميزة. يمكنك تشغيل "spctl --status" على الوحدة الطرفية على نظام ماك أو إس لمعرفة ما إذا كان غيت كيبر الذي يُعدّ مقياس مكافحة البرمجيات الضارة القياسي قد تم تمكينه أو تعطيله. إذا تم تعطيل غيت كيبر، فتأكد من تشغيله (سيؤدي ذلك إلى إيقاف تشغيل معظم البرمجيات الضارة) وأجري الفحص ربما باستخدام التحقق من سجل سطر الأوامر حول كيفية حدوث ذلك.
نظام آي أو إس
يدعم نظام آي أو إس تحميل ملفات التعريف المخصصة وعادة ما تستخدم للاتصال بشبكات الشركات أو الجامعات، ولكن من المحتمل أن يستخدمها المتطفل لاعتراض حركة المرور خاصتك. انتقل إلى إعدادات جهاز آي أو إس وتحقق مما إذا كان قد تم تثبيت أي ملفات تعريف. إذا بدت أي ملفات تعريف مشبوهة ولم يتذكر المستخدم تثبيتها، فقد يكون ذلك علامة وجود نشاط ضار. في هذه الحالة، من الجيد توثيق كل ما يمكنك العثور عليه حول ملف التعريف هذا والتقاط لقطات شاشة ثم إزالته.
يحتوي آي أو إس أيضًا على اختصارات تستخدم عادةً لأتمتة وظائف معينة على الجهاز مثل ضغط الصور أو تحويل النص. عادةً تصف التطبيقات بشكل جيد ما تفعله الاختصارات بلغة بسيطة (على الرغم من أن بعض الاختصارات تسمح لك بتشغيل تعليمات جافا سكريبت (JavaScript) مخصصة). تمامًا كما هو الحال مع ملفات التعريف، إذا رأيت أي اختصارات تبدو مشبوهة (لاحظ أن كل إصدار من آي أو إس قد يقوم بتثبيت بعض الإصدارات الجديدة، لذلك من الأفضل أن تقرأ عنها أيضًا)، فقم بتوثيقها من خلال لقطات الشاشة ثم قم بإزالتها. بشكل عام، من الصعب للغاية على البرمجيات الضارة تثبيت ملفات تعريف أو اختصارات مخصصة ومن الأسهل بكثير على المهاجم تحميلها من خلال الهندسة الاجتماعية أو من خلال الوصول لفترة قصيرة إلى جهاز غير مقفل.
يجب أن تراعي أمان حساب آي كلاود (iCloud) الخاص بالمستخدمين، حيث يمكن أن يؤدي اختراق هذا الحساب إلى الوصول إلى بيانات جهاز آي أو إس المهمة. أكمل مراجعة أمان حساب آبل آي دي (Apple ID) وأجر تغييرات مثل تغييرات كلمة المرور والمصادقة ثنائية العوامل، وإزالة أذونات وصول التطبيقات، وتسجيل الخروج من الجهاز الآخر إذا لزم الأمر. يحتوي فحص سلامة آبل على ميزة مراجعة يمكن أن تساعدك في ذلك.
قد يرسل المتطفلون أحيانًا رسائل نصية أو رسائل إلكترونية تحتوي على روابط ضارة إلى الأشخاص المستهدفين، وفي حال النقر عليها قد تشمل حمولة البرمجيات الضارة أو انتحال بالهندسة الاجتماعية. من الجيد الاطلاع على رسائل آي مسجز (iMessages) والرسائل النصية الحديثة لمعرفة ما إذا كانت تحتوي على روابط مشبوهة أو محتوى آخر.
لمزيد من المعلومات حول أساسيات تصنيف آي أو إس، اطلع على الفصل 12 من الدليل الميداني.
يحاول بعض المتطفلون إضافة جهاز جديد يتحكمون فيه إلى قائمة الأجهزة المرتبطة في برنامج مراسلة الشخص المستهدف مثل واتسآب أو سيغنال. وبهذه الطريقة تُنسخ بعدها جميع الرسائل التي يرسلها الشخص المستهدف ويستقبلها إلى جهاز المتطفل أيضًا. عادة ما يحدث هذا الهجوم بسبب وجود متطفل لديه وصول مادي مباشر وليس برمجيات ضارة، ولكن يجب أن يكون التحقق من الأجهزة المرتبطة غير المعروفة مع واتسآب وسيغنال وتيليغرام وبرامج المراسلة الأخرى جزءًا أساسيًا من عملية التصنيف.
نظام أندرويد
بالنسبة لنظام أندرويد، اقرأ الفصل 8 من الدليل الميداني الذي يوضّح كيف يمكنك تصنيف التطبيقات التي يحتمل أن تكون مشبوهة من خلال النظر إلى الأذونات المختلفة (مثل الوصول إلى صورك أو الكاميرا أو الميكروفون) التي يطلبونها.
تحقق من التطبيقات التي توفر تحكمًا إضافيًا على الجهاز من خلال مراجعة التطبيقات المدرجة والممكّنة ضمن التطبيقات التي تتمتع بوصول المشرف على الجهاز في إعدادات أندرويد. يجب أن يعرف المستخدم التطبيقات التي تم منحها هذه الامتيازات وعادةً تكون إما تطبيقات شركات أو تطبيقات سرقة الأجهزة الرسمية التي تسمح بالمسح عن بُعد. في حالة منح التطبيقات غير المعروفة أذونات المشرف، قم بتعطيلها ثم أجر الفحص الإضافي.
يُعدّ أذن التثبيت من مصادر غير معروفة أحد الأذونات الأخرى لنظام أندرويد التي يمكن أن يسمح لأحد التطبيقات بتثبيت تطبيقات أخرى. يتحايل هذا الإذن على حماية "الحديقة المسوّرة" لمتاجر التطبيقات الرسمية مثل متجر غوغل بلاي أو غالاكسي ستور (Galaxy Store). في بعض الحالات، قد يكون هذا مرغوبًا فيه كما هو الحال في متجر تطبيقات إف درويد مفتوح المصدر. لكن إذا وجدت أن البلوتوث أو المتصفح أو برنامج المراسلة الفورية أو تطبيق الملفات أو تطبيق الإرسال/النقل قد تم منحه هذا الإذن، فهذا يشير إلى أن مالك الجهاز قد قام بتثبيت تطبيقات من خارج المصادر الآمنة للتطبيقات وستكون هناك حاجة إلى فحوص إضافية.
قد يرسل المتطفلون أحيانًا رسائل نصية تحتوي على روابط ضارة إلى الأشخاص المستهدفين. وفي حال النقر عليها قد تشمل حمولة البرمجيات الضارة أو انتحال بالهندسة الاجتماعية. من الجيد الاطلاع على الرسائل النصية الأخيرة لمعرفة ما إذا كانت تحتوي على روابط مشبوهة أو محتوى آخر.
تحقق من معلومات التطبيق لترى ما إذا كان من الممكن إلغاء تثبيته وإذا لم يكن هذا الخيار متاحًا يعني ذلك أن هذا تطبيق مثبت مسبقًا. قد لا يزال هذا الأمر مشكلة حيث تحتوي بعض الهواتف الأرخص على برمجيات ضارة مثبتة مسبقًا ولكنه يستبعد الاستهداف وهو أيضًا أقل احتمالًا على الهواتف الأكثر تكلفة.
تحققمما إذا كانت خدمة غوغل بلاي للحماية ممكّنةً.
يحاول بعض المتطفلون إضافة جهاز جديد يتحكمون فيه إلى قائمة الأجهزة المرتبطة في برنامج مراسلة الشخص المستهدف مثل واتسآب أو سيغنال. وبهذه الطريقة تُنسخ بعدها جميع الرسائل التي يرسلها الشخص المستهدف ويستقبلها إلى جهاز المتطفل أيضًا. عادة ما يحدث هذا الهجوم بسبب وجود متطفل لديه وصول مادي مباشر وليس برمجيات ضارة، ولكن يجب أن يكون التحقق من الأجهزة المرتبطة غير المعروفة مع واتسآب وسيغنال وتيليغرام وبرامج المراسلة الأخرى جزءًا أساسيًا من عملية التصنيف.
تجدر الإشارة إلى أن تكوينات الأمان تختلف بين مختلف إصدارات آي أو إس وأندرويد. تتطلب الإصدارات الأحدث من آي أو إس على سبيل المثال توقيع الملفات التعريفية رقميًا مما يجعل من الصعب على المتطفلون الاستفادة منها. وبالمثل تُغير العديد من تحديثات البرمجيات الطريقة التي تتعامل بها الأنظمة مع الأذونات أو الإشعارات. بشكل عام تتطلب الإصدارات اللاحقة من آي أو إس وأندرويد لها متطلبات أمان أكثر صرامة عندما يتعلق الأمر بالأتمتة والتطبيقات والأذونات.
موارد التعلّم
الممارسة 
ويندوز وماك أو إس
ويندوز: تحقق من مركز أمان ويندوز ديفندر، هل لاحظت وجود شيءٍ مريب؟
ماك أو إس: استخدم سطر الأوامر للتحقق مما إذا كان غيت كيبر ممكّنًا.
آي أو إس وأندرويد
تحقق من عدد من تطبيقاتك وشاهد الأذونات التي لديها، هل ترى أي تطبيقات لا تتعرف عليها أو ترى بعضها الذي يطلب الكثير من الأذونات؟ على أندرويد: هل أي من تلك التطبيقات التي لا تتعرف عليها مثبتة مسبقًا؟
آي أو إس فقط: تحقق من جهازك بحثًا عن الاختصارات وملفات التعريف المثبتة التي لا تتعرف عليها.
استخدم محرك بحث للعثور على النص الكامل لرسالة نصية تلقيتها قد تبدو غريبة أو مشبوهة، وفي حال لم تكن لديك رسائل نصية غريبة أو مشبوهة، ابحث عن رسالة قياسية من مشغل الشبكة. ما مقدار المعلومات التي يمكنك العثور عليها عبر الإنترنت حول الرقم الذي أرسل هذه الرسالة وحول الرسالة نفسها؟
اختبار مهارة
آي أو إس وأندرويد
أندرويد: اقرأ وثائق مستخدم أندرويد حول الأذونات لا داعي لفهم التعليمات البرمجية المصدر فالهدف هو فقط الوصول إلى فهم عام لكيفية عمل الأذونات.
فكر فيما يمكن أن يفعله تطبيق ضار وما البيانات التي يمكن أن يستخرجها باستخدام الأذونات الموضّحة في مواصفات أندرويد، وكذلك حول الخطوات التي يتخذها نظام التشغيل لتقليل مخاطر إساءة استخدام التطبيقات للأذونات. اكتب قائمة من خمسة إلى عشرة إجراءات يمكن أن يقوم بها تطبيق ضار لديه أذونات نظام واسعة ودوّن حالتين إلى ثلاث حالات غير مرغوب فيها يمكن التخفيف منها من خلال أفضل ممارسات أذونات التطبيق.
إذا كنت تعمل مع زميل أو مرشِد، ناقش القائمة التي جمعتها أعلاه معه واطلب منه التحقق من أنك قد فهمت أذونات التطبيق بشكل صحيح وكيف يمكن إساءة استخدامها والتخفيف من آثار أندرويد التي تمنع حدوث ذلك.
أي أو إس: اقرأ وصف وضع إغلاق آي أو إس، وهو إعداد خاص للأفراد المعرضين لخطر هجمات مستهدفة كبير بالأخص من خلال برمجيات التجسس المرتزقة. اذكر بعض الإجابات على الأسئلة التالية. لاحظ أنه لا توجد إجابات صحيحة أو خاطئة لهذه الأسئلة، لأن وضع الإغلاق مثل جميع آليات الأمان الأخرى يهدف إلى تحقيق توازن حريص بين الأمان وسهولة الاستخدام. تتطلب بعض هذه الأسئلة معرفة أعمق بالهجمات السابقة ضد آي أو إس (نشجع المتعلمين على البحث عن "اختراق الحماية" عند البحث في الموضوع) وقد تتطلب القليل من البحث الإضافي.
لماذا يحجب وضع الإغلاق معظم المرفقات على رسائل آبل؟ لماذا لا تُحظر على تطبيقات مثل واتسآب؟
هل يمكنك التفكير في سبب قيام وضع الإغلاق بتقييد بعض ميزات تصفح الويب؟
لا يسمح وضع الإغلاق بمجرد تمكينه بتثبيت ملفات التعريف المخصصة. لماذا تعتقد أن ملفات التعريف التي تم تثبيتها قبل تشغيل المستخدم لوضع الإغلاق لا تزال تعمل؟
 إذا كنت تعمل مع زميل أو مُرشِد، ناقش إجاباتك على الأسئلة المذكورة أعلاه معهم واطلب منهم التحقق من أنك قد فهمت وضع الإغلاق.

## Learning Resources

{{% resource title="Windows Defender" languages="Multiple" cost="Free with an active Windows license" description="An anti-malware solution made by Microsoft, available to all Windows users for free." url="https://apps.microsoft.com/detail/microsoft-defender/9P6PMZTM93LR?hl=en-us&gl=US" %}}

{{% resource title="MalwareBytes" languages="Multiple" cost="Free with premium features" description="A popular antivirus scanner often used within civil society." url="https://www.malwarebytes.com/" %}}

{{% resource title="Avast" languages="Multiple" cost="Free with premium features" description="Another antivirus scanner with a solid free tier." url="https://www.avast.com/en-us/free-antivirus-download#pc" %}}

{{% resource title="ClamAV" languages="Multiple" cost="Free" description="An open source virus scanner." url="https://www.clamav.net/" %}}

{{% resource title="Lookout" languages="Multiple" cost="Multiple pricing tiers" description="A well-known company providing Android security services." url="https://www.lookout.com/" %}}

{{% resource title="Hypatia" languages="English" cost="Free" description="An open source malware scanner for Android, based on ClamAV." url="https://f-droid.org/en/packages/us.spotco.malwarescanner/" %}}

{{% resource title="Google Play Protect" languages="Multiple" cost="Free" description="Quick documentation on Google Play Protect, an additional and highly recommended security tool for Android." url="https://support.google.com/googleplay/answer/2812853?hl=en" %}}

{{% resource title="Identifying compromised devices: an intermediate guide" languages="English" cost="Free" description="Some quick signs we can look for when trying to figure out if a device is potentially compromised by malware. Note that these steps are just the start and do not replace scans and deeper analysis." url="https://pts-project.org/guides/g6/#identifying-compromised-devices" %}}

{{% resource title="Windows Security" languages="Multiple" cost="Free with every Windows install" description="A central point in a Windows operating system where you can check at a glance which security measures have been enabled and which have not." url="https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/windows-defender-security-center/windows-defender-security-center" %}}

{{% resource title="Protecting against malware in macOS" languages="Multiple" cost="Free" description="An article by Apple outlining some of the security mechanisms present within macOS." url="https://support.apple.com/en-gb/guide/security/sec469d47bd8/web" %}}

{{% resource title="Gatekeeping on macOS" languages="English" cost="Free" description="A more in-depth article describing how Gatekeeper, a key macOS security mechanism, functions." url="https://redcanary.com/blog/gatekeeper/" %}}

{{% resource title="macOS trojan disables gatekeeper to deploy malicious payloads" languages="English" cost="Free" description="A case study of how malware managed to disable macOS security mechanisms in order to spread itself on a system." url="https://www.zdnet.com/article/macos-malware-disables-gatekeeper-to-deploy-malicious-payloads/" %}}

{{% resource title="How to look at your command history list in macOS terminal" languages="English" cost="Free" description="A brief guide to browsing through command line history on macOS terminal, which can be useful if you’re trying to figure out what prior commands were typed and if any of them affected security mechanisms." url="https://www.macworld.com/article/351872/how-to-look-at-your-command-history-list-in-macoss-terminal.html" %}}

{{% resource title="iOS security checks and mechanisms" languages="Multiple" cost="Free with macOS and iOS systems" description="Some security checks you can conduct when doing triage on iOS systems:" url="https://support.apple.com/en-is/guide/iphone/iph6e7d349d1/17.0/ios/17.0" %}}

{{% resource title="iOS security checks and mechanisms" languages="Multiple" cost="Free with macOS and iOS systems" description="Check for app tracking permissions on iOS systems" url="https://support.apple.com/en-is/guide/iphone/iph4f4cbd242/ios" %}}

{{% resource title="iOS security checks and mechanisms" languages="Multiple" cost="Free with macOS and iOS systems" description="Apple's Safety Check tool" url="https://support.apple.com/en-is/guide/personal-safety/ips2aad835e1/web" %}}

{{% resource title="Checking for linked devices on WhatsApp" languages="English, with apps and help guides localized into many other languages as well" cost="Free" description="Articles for:" url="https://faq.whatsapp.com/378279804439436?helpref=faq_content" %}}

{{% resource title="Checking for linked devices on Signal" languages="English, with apps and help guides localized into many other languages as well" cost="Free" description="Articles for:" url="https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices" %}}

{{% resource title="Checking for linked devices on Telegram" languages="English, with apps and help guides localized into many other languages as well" cost="Free" description="Articles for:" url="https://telegram.org/blog/sessions-and-2-step-verification" %}}



## Notes

[^1]: A Potentially Unwanted Program is something that the user does not want on their system, even if they might have downloaded and run it themselves. It could include programs which mis-advertise their functionality or run many ads.
[^2]: A hash is like a short fingerprint of a file—it can be used to identify a unique file without revealing its contents. You can calculate a hash by using [the command line on Windows, macOS, and Linux](https://techdocs.akamai.com/download-ctr/docs/verify-checksum).
[^3]: Having a malicious extension on your system does not necessarily mean that you have other types of malware as well. An attacker could also use social engineering to convince a user to install malware.
[^4]: If you want to learn more about the spctl command, which is responsible for Gatekeeper, run “man spctl” in the macOS Terminal to see the manual/ documentation page.
