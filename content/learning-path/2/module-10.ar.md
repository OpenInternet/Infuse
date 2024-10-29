+++
style = "module"
weight = 10
title = "Discovering where the malware came from"
description = "We look at how we can use timestamps and metadata to figure out where malware originated"
+++

## Use Case

No malware spontaneously appears on a targeted person’s device. It always comes from somewhere. Sometimes, that somewhere is obvious: the targeted person realizes that the link they clicked on was malicious. In other cases, the infection vector may be less clear. Learning where the infection came from can be important for managing future risk. If the initial infection source was untargeted, the victim may have just been the victim of a criminal gang with no goals other than making money. On the other hand, if the initial infection came from a sophisticated targeted social engineering attack, they are likely to face continuing future attacks from the same threat actor.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand how timestamps work on desktop and mobile devices
- Look at operating system metadata to learn where malicious files were downloaded from

---
## Main Section
### File Timestamps

The first step in tracing the origin of the attack is to establish the time that the malware was installed. If you have identified the downloaded malware file, you can use the timestamps on the file. This is harder than one might imagine at first because file system timestamps are complicated. The short answer is to start with the file creation time of the first file that was downloaded. Note that files extracted from archives may have different creation times; it’s important to start with the actual file that was downloaded.

#### Windows, macOS, Linux

For more information on desktop filesystem timestamps, see [this whitepaper from SANS on Windows](https://www.sans.org/white-papers/36842/), [this description of the near-infinite time stamps on MacOS](https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/), [this description of linux timestamps](https://linuxhandbook.com/file-timestamps/) and [a way of viewing file creation time on ext4](https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/).

#### iOS, Android

For mobile devices, MVT provides some timestamp information. For iOS, this is [described in the documentation](https://docs.mvt.re/en/latest/ios/records/). For Android, less information is extracted, and you might have to do on-device checks.

The [Google Files](https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_US&gl=US) app will show the modified time of a file from the meatball menu for each file.

Note that mobile malware typically is much less obvious about leaving easily accessible traces on the file system. The common ways that mobile devices are infected is via fake sideloaded apps, malicious apps in the Apple/Google app store, or via sophisticated browser exploits that gain deep access to the device before downloading any files. In the last cases, malicious files may not show up in common download directories.

### Suspicious Messages/Downloads

Whether or not you find a malicious file, the next step is to find where it came from. There are several bits of information you can collect and look for.

In some operating systems, downloads are associated with their source. This means that files can contain metadata which shows what server they were downloaded from. [This guide](https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/#:~:text=To%20Find%20Origin%20URL%20For%20File%20Downloaded%20with,the%20following%20command%3A%20Get-Content%20%22file%20name%22%20-Stream%20Zone.Identifier.) shows how to check such information on Windows and Linux, while [this one](https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/) does the same for macOS. Such metadata will show you the server from which the file was downloaded, but not what caused the download.[^1] Also note that the link the targeted person clicked on might not be the download URL due to redirects.

Next up, look for emails, messages, etc. that may have triggered the download. You can use any timestamp and URL information you identified previously to help.

## Skill Check

For at least five files in your downloads folder:

- Write out all of the timestamps they contain and what they could indicate
- If available, find the extended attributes or metadata that describes which URL or service they were downloaded from (in our testing, not all files had information about URLs in their metadata, so don’t worry if you are unable to find it)

Ask a peer or mentor to double check your work and ensure that you have correctly read all the metadata.

On Android, install a (non-malicious) app and use the file manager to find the app properties and see what you can learn about the app. If you have access to a test Android phone, download an app from outside Google Play and do the same. Ask a peer or mentor to double check your work and ensure that you have correctly read all the app properties.


الموضوع الفرعي 9: اكتشاف مصدر البرمجيات الضارة
حالة استخدام
لا تظهر البرمجيات الضارة بشكل تلقائي على جهاز الشخص المستهدف وإنما تأتي دائمًا من مكان ما. في بعض الأحيان، يكون ذلك المكان واضحًا حيث يدرك الشخص المستهدف أن الرابط الذي نقر عليه كان ضارًا وفي حالات أخرى، قد يكون ناقل الإصابة أقل وضوحًا. يمكن أن يكون تعلم مصدر الإصابة مهمًا لإدارة المخاطر المستقبلية. إذا كان مصدر الإصابة الأولي غير مستهدفًا، فقد تكون الضحية قد وقعت في أيدي عصابة إجرامية ليس لها أهداف سوى كسب المال. من ناحية أخرى، إذا جاءت الإصابة الأولية من هجوم انتحال بالهندسة الاجتماعية مستهدف ومتطور، فمن المرجح أن يواجهوا هجمات مستقبلية مستمرة من نفس ممثل التهديد.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم كيفية عمل الطوابع الزمنية على أجهزة سطح المكتب والأجهزة المحمولة
انظر إلى البيانات الوصفية لنظام التشغيل لمعرفة من أين تم تنزيل الملفات الضارة
العرض 
الطوابع الزمنية للملفات
تتمثل الخطوة الأولى في تتبع أصل الهجوم في تحديد وقت تثبيت البرمجية الضارة. وإذا كنت قد حددت ملف البرمجيات الضارة الذي تم تنزيله، فيمكنك استخدام الطوابع الزمنية الموجودة على الملف. هذا أصعب مما قد يتخيله المرء في البداية لأن الطوابع الزمنية لنظام الملفات معقدة. تُعدّ الإجابة المختصرة هي البدء بوقت إنشاء الملف للملف الأول الذي تم تنزيله. لاحظ أن الملفات المستخرجة من الأرشيف قد يكون لها أوقات إنشاء مختلفة ومن المهم أن تبدأ بالملف الفعلي الذي تم تنزيله.
ويندوز وماك أو إس ولينوكس
لمزيد من المعلومات حول الطوابع الزمنية لنظام ملفات سطح المكتب، راجع هذا المستند التقني من إس إيه إن إس حول ويندوز، وهذا الوصف للطوابع الزمنية شبه اللانهائية على ماك أو إس، وهذا الوصف للطوابع الزمنية لنظام لينوكسوطريقة عرض وقت إنشاء الملف على ext4. 
آي أو إس وأندرويد
بالنسبة للأجهزة المحمولة، تُوفر موبايل فيريفيكيشن تولكيت بعض معلومات الطابع الزمني وبالنسبة لنظام التشغيل آي أو إس يرد وصف ذلك في الوثائق، أما بالنسبة لنظام أندرويد، تستخرج معلومات أقل وقد تضطر إلى إجراء فحوصات على الجهاز.
يعرض تطبيق غوغل فايلز (Google Files) الوقت المعدل لملف من قائمة النقاط الثلاث لكل ملف.
لاحظ أن البرمجيات الضارة للجهاز المحمول عادة ما تكون أقل وضوحًا من حيث ترك آثار يسهل الوصول إليها على نظام الملفات. تُعدّ الطرق الشائعة لإصابة الأجهزة المحمولة هي تطبيقات وهمية محملة جانبيًا أو تطبيقات ضارة في متجر تطبيقات غوغل/آبل أو عبر عمليات استغلال متطورة للمتصفح يمكنها التمتع بوصول عميق إلى الجهاز قبل تنزيل أي ملفات. في الحالات الأخيرة، قد لا تظهر الملفات الضارة في أدلة التنزيل الشائعة.
الرسائل/التنزيلات المشبوهة
سواء وجدت ملفًا ضارًا أم لا، تتمثل الخطوة التالية هي العثور على مصدره ويوجد عدد من المعلومات التي يمكنك جمعها والبحث عنها.
في بعض أنظمة التشغيل، ترتبط التنزيلات بمصدرها وهذا يعني أن الملفات يمكن أن تحتوي على بيانات وصفية توضح الخادم الذي تم تنزيلها منه. يوضح هذا الدليل كيفية التحقق من هذه المعلومات على نظامي تشغيل ويندوز ولينوكس، في حين يوضح هذا الدليل الأمر ذاته لنظام التشغيل ماك أو إس. ستعرض لك هذه البيانات الوصفية الخادم الذي تم تنزيل الملف منه ولكن ليس ما تسبب في التنزيل. لاحظ أيضًا أن الرابط الذي نقر عليه الشخص المستهدف قد لا يكون عنوان الارتباط التشعبي للتنزيل بسبب عمليات إعادة التوجيه.
ابحث بعد ذلك عن رسائل البريد الإلكتروني والرسائل وما إلى ذلك التي قد تكون تسببت في التنزيل. يمكنك استخدام أي طابع زمني ومعلومات عنوان موقع الويب التي حددتها مسبقًا للمساعدة.
مصادر التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة
اكتل جميع الطوابع الزمنية لخمسة ملفات على الأقل في مجلد التنزيلات
التي تحتويها عليها وما يمكن أن تشير إليه
إذا كان ذلك متاحًا، ابحث عن السمات الموسعة أو البيانات التعريفية التي تصف عنوان موقع الويب أو الخدمة التي تم تنزيلها منها (في اختبارنا، لم تحتوي جميع الملفات على معلومات حول عناوين موقع الويب في بياناتها التعريفية لذلك لا تقلق إذا لم تتمكن من العثور عليها)
اطلب من أحد النظراء أو مُرشِد التحقق مرة أخرى من عملك والتأكد من أنك قرأت جميع البيانات التعريفية بشكل صحيح.

على أندرويد، قم بتثبيت تطبيق (غير ضار) واستخدم مدير الملفات للعثور على خصائص التطبيق والاطلاع على ما يمكنك معرفته عن التطبيق. إذا كان بإمكانك الوصول إلى هاتف أندرويد مخصص للاختبار، فقم بتنزيل تطبيق من خارج متجر غوغل بلاي وافعل الشيء نفسه. اطلب من أحد النظراء أو مُرشِد التحقق مرة أخرى من عملك والتأكد من أنك قرأت جميع الخصائص بشكل صحيح.


## Learning Resources

{{% resource title="Filesystem Timestamps: What Makes Them Tick?" languages="English" cost="Free" description="Overview of timestamps, their portability, and technical workings, with a focus on Windows." url="https://www.sans.org/white-papers/36842/" %}}

{{% resource title="macOS timestamps from extended attributes and spotlight" languages="English" cost="Free" description="Guide to using advanced file metadata in macOS to find different file timestamps." url="https://forensic4cast.com/2016/10/macos-timestamps-from-extended-attributes-and-spotlight/" %}}

{{% resource title="File Timestamps in Linux: atime, mtime, ctime Explained" languages="English" cost="Free" description="Explanation of different types of file timestamps in Linux and how to interpret them." url="https://linuxhandbook.com/file-timestamps/" %}}

{{% resource title="File creation time on ext4 Linux" languages="English" cost="Free" description="Details on how ext4 manages file timestamps and where to find creation time information." url="https://blog.roberthallam.org/2018/01/file-creation-time-on-ext4-linux/" %}}

{{% resource title="Records extracted by mvt-ios" languages="English" cost="Free" description="Information on files generated by MVT when analyzing iOS dumps and how to interpret them." url="https://docs.mvt.re/en/latest/ios/records/" %}}

{{% resource title="Files by Google" languages="Multiple" cost="Free" description="Android app providing access to advanced file metadata." url="https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_US&gl=US" %}}

{{% resource title="Mark of the Web from a Read Team’s Perspective" languages="English" cost="Free" description="Introduction to Mark of the Web, indicating files downloaded from the web requiring special security considerations." url="https://outflank.nl/blog/2020/03/30/mark-of-the-web-from-a-red-teams-perspective/" %}}

{{% resource title="Beware: Chromium-based browsers save download origin url for files" languages="English" cost="Free" description="Discussion on how Windows and Linux systems store metadata about file download origins." url="https://winaero.com/beware-chromium-based-browsers-save-download-origin-url-for-files/" %}}

{{% resource title="Find Out Where a File was Downloaded From in Mac OS X" languages="English" cost="Free" description="Guide on extracting download URLs from macOS file metadata." url="https://osxdaily.com/2010/10/12/find-out-where-a-file-was-downloaded-from/" %}}

## Notes

[^1]:
    On Windows, you will additionally see a number corresponding to a Zone ID. The Zones associated with downloaded files are as follows:

    - ZoneId=1: Local Intranet
    - ZoneId=2: Trusted sites
    - ZoneId=3: Internet
    - ZoneId=4: Restricted sites
