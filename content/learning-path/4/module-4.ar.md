+++
style = "module"
weight = 4
title = "Authorization"
description = "Logged in users do not have access to all other users' data. Here we look at how to make sure no user exceeds their level of access or capability"
+++

## Use Case

In any website that has users with different levels of capabilities (e.g. viewers vs editors) or that holds confidential information for users, it’s important that the site protects these features and/or this data from people who don’t have permission to use these features and/or interact with this data.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand common types of authorization vulnerabilities
- Understand the potential impacts of those types of vulnerabilities
- Understand the mechanisms by which those vulnerabilities work
- Understand, in broad strokes, how those vulnerabilities can be prevented

---
## Main Section
### Foundation Knowledge

Authorization is the process of making sure that a user of a system has permission to perform an action or create/read/edit/delete a piece of data in that system, and preventing these actions if the user doesn’t have permission. Generally, these are the simplest types of security controls to implement, and the simplest type of vulnerability to find. However, even though they are conceptually simple, both securing and breaking the controls are generally very tedious and error-prone.

Every time a web application loads an access-controlled page or performs an access-controlled action, it must first verify that the current user has successfully authenticated, and then verify that the user has the right permissions. Generally, authorization logic is highly application-specific, so web frameworks provide limited support for this, so authorization logic needs to be manually added to each page. Sometimes it’s implemented in the page logic, sometimes it’s implemented in the APIs that web pages call internally. In any case, if it’s missing, then unauthorized users can do things that they are not supposed to be able to do.

To ease communication about vulnerabilities, authorization vulnerabilities are generally broken down into three categories.

### Missing authentication

Sometimes developers will fail to even check that a user is logged in on a page or set of pages. Any user on the internet can view the post-authentication pages or perform post-authentication actions. This class of vulnerability has sometimes been called “forced browsing” or “direct object reference.” There are several ways this kind of vulnerability manifests.

One pattern for this vulnerability is that a site will show one set of links to users who haven’t logged in, and another set of links to users who have logged in. However, no pages that show user-specific data or perform actions actually check that the user is logged in.

Another common pattern is that pages that render data in the browser have authentication checks, but the pages that merely process data (e.g. via a HTTP POST) don’t. This is generally caused by developers not having a deep understanding of how the web works and not realizing that it’s quite easy to generate arbitrary HTTP requests. With this pattern, users can generally only see data that they’re authorized to see, but can perform any action on the site, and modify other users’ data. Note that since users can see and modify their own data, it’s very easy for attackers with an account to discover the missing authentication.

A third common pattern is that individual pages or actions, or perhaps sections of the site, will just fail to check for authentication. Generally this is a result of developer oversight.

### Vertical Privilege Escalation

Vertical privilege escalation happens when less powerful users can perform more powerful actions on the website. This is commonly caused by the site checking authentication status but fails to check permissions. It was mentioned above that frameworks generally don’t include built-in functions for authorization, but many perform checks for authentication. If a page (or entire site) properly performs authentication checks but does not perform permissions checks, this usually results in vertical privilege escalation.

An example of vertical privilege escalation might be in an online forum that has both regular users and moderators. When regular users log in, they can create posts and edit their own posts. When moderators log in, they can also create posts and edit their own posts, but can also hide other users posts and ban users. If regular users can edit the URL or change form parameters to also hide user posts or ban users, that would be vertical privilege escalation.

The patterns that lead to vertical privilege escalation are essentially the same as those that lead to missing authentication, except that users must be logged in.

#### Try it yourself!

Log into your DVWA and make sure the security level is set to low and that you are signed in as the admin (it’s best to log out and log back in using the credentials “admin:password”. Navigate to the “Authorisation Bypass” page. If you cannot see this page in the left bar and have the most up to date version of DVWA, it means that you are not logged in as the admin.

After that, open a private browsing window or another browser and log into your DVWA as the “gordonb” user and note that the Authorisation Bypass does not appear in gordonb’s navigation bar. Can you figure out how to access the Authorisation Bypass as gordonb? (If you're having trouble, remember that authorization vulnerabilities are generally very straightforward. Don’t overthink it.)

### Horizontal Privilege Escalation

Horizontal privilege escalation happens when users can view or perform actions on other users’ data, when those other users have the same access level.

An example of horizontal privilege escalation might be in the above online forum. If a regular user can edit other users’ posts, that would be horizontal privilege escalation.

With horizontal privilege escalation, there are three major development patterns that lead to the vulnerability. The first is that pages check that users are logged in and that they have the right access level, but completely fail to check data-level permissions. Typically this will result in the entire site, or an entire section of the site, being vulnerable. The second is that individual pages or actions fail to check data-level permissions due to developer oversight. Finally, occasionally websites will pass the user id in a URL parameter or hidden form field, instead of reading it from the server side session. The end-user can easily modify these parameters, usually resulting in privilege escalation.

### Preventing Authorization Vulnerabilities

As noted above, the two root causes for authorization vulnerabilities tend to be lack of developer awareness (hence entire sites or site sections missing the proper controls) or lack of consistency in implementing controls. Since framework support is generally poor, developers often need to implement their own controls from scratch. Here are a few tips to consider:

- Attempt to layer and simplify the process of checking user permissions. To the extent that your framework has functions to support authorization, use them. Consistent functions to check user authorization are less error prone than complex logic.
- For extremely powerful users, consider using a separate website entirely. For example, www.example.com for regular users, and admin.example.com for administrative users.
- For data-level permissions checks, having consistent developer guidelines can reduce errors. For instance, a rule that all data access must go through API calls, every API function must include a user id parameter, and every API that takes a user ID must use it in database calls. Having consistent rules like this makes it easier to avoid, and to find, authorization errors.

For a bit more authentication, see [the OWASP authorization cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). For an in-depth exploration, see the [Web Application Security Assessment learning path](/en/learning-path/5/).


## Practice

Read through this [vulnerability report](https://eaton-works.com/2023/06/06/honda-ecommerce-hack/) and make sure that you’ve understood which authentication or authorization vulnerabilities are being exploited here.

## Skill Check

### Exercise 1: recap

Complete the DVWA authorization bypass exercise, as outlined above.

### Exercise 2: multiple choice quiz

**Question 1**. What is the primary purpose of authorization in a system?

A) Authenticating users\
B) Ensuring data integrity\
C) Verifying user permissions\
D) Encrypting sensitive information

{{< question title="Answer" >}}
C) Verifying user permissions
{{< /question >}}

**Question 2**. Which category of vulnerability involves developers failing to check if a user is logged in on certain pages?

A) Vertical Privilege Escalation\
B) Horizontal Privilege Escalation\
C) Missing Authentication\
D) Forced Browsing

{{< question title="Answer" >}}
C) Missing Authentication
{{< /question >}}

**Question 3**. What is one common pattern of missing authentication vulnerability mentioned in the subtopic text?

A) Failing to check permissions on data-level actions\
B) Passing user IDs in URL parameters\
C) Allowing users to modify their own data\
D) Showing different links based on user login status

{{< question title="Answer" >}}
D) Showing different links based on user login status
{{< /question >}}

**Question 4**. What is the result of vertical privilege escalation vulnerability?

A) Users can access unauthorized data\
B) Less powerful users can perform powerful actions they were not authorized to do\
C) Users can edit other users' data without permission\
D) The entire site becomes vulnerable to attacks

{{< question title="Answer" >}}
B) Less powerful users can perform powerful actions
{{< /question >}}


**Question 5**. In the context of horizontal privilege escalation, what is a common cause of vulnerability according to the subtopic text?

A) Lack of developer awareness\
B) Inconsistent implementation of controls\
C) Passing user IDs in URL parameters\
D) Insufficient encryption protocols

{{< question title="Answer" >}}
B) Inconsistent implementation of controls
{{< /question >}}


**Question 6**. How can developers prevent authorization vulnerabilities according to the subtopic text?

A) Use complex logic for authorization checks\
B) Rely solely on framework support\
C) Implement their own controls consistently\
D) Ignore data-level permissions checks

{{< question title="Answer" >}}
C) Implement their own controls consistently
{{< /question >}}

**Question 7**. Which of the following is NOT a tip mentioned in the text for preventing authorization vulnerabilities?

A) Layer and simplify the process of checking user permissions\
B) Use separate websites for regular users and administrators\
C) Rely solely on framework functions for authorization\
D) Establish consistent developer guidelines for data access

{{< question title="Answer" >}}
C) Rely solely on framework functions for authorization
{{< /question >}}

**Question 8**. What is the significance of consistency in implementing authorization controls?

A) It increases the complexity of the system\
B) It reduces the likelihood of errors\
C) It limits access to certain users\
D) It makes authorization checks more difficult

{{< question title="Answer" >}}
B) It reduces the likelihood of errors
{{< /question >}}

**Question 9**. What is one example provided in the subtopic text for vertical privilege escalation vulnerability?

A) Modifying URL parameters to escalate privileges\
B) Allowing users to view other users' data\
C) Passing user IDs in hidden form fields\
D) Regular users gaining access to administrative features

{{< question title="Answer" >}}
D) Regular users gaining access to administrative features
{{< /question >}}

**Question 10**. Which vulnerability category involves users performing actions on other users' data with the same access level?

A) Missing Authentication\
B) Vertical Privilege Escalation\
C) Horizontal Privilege Escalation\
D) Forced Browsing

{{< question title="Answer" >}}
C) Horizontal Privilege Escalation
{{< /question >}}



### Exercise 3 (optional, only for those comfortable with basic Python): code bug finding challenge

The code simulates a vulnerable web application with a horizontal privilege escalation vulnerability. The vulnerability lies in the fact that the delete_profile function only checks for the current user's write permission but does not verify that the current user is authorized to delete other users' profiles. This allows any user with write permission to delete any other user's profile, regardless of their own permissions.

{{< highlight python >}}
# Import statement for print function (Python 3.x)
from __future__ import print_function

# User data (replace with your own test data)
users = {
    "admin": {"id": 1, "username": "admin", "permissions": ["read", "write", "delete"]},
    "user1": {"id": 2, "username": "user1", "permissions": ["read", "write"]},
    "user2": {"id": 3, "username": "user2", "permissions": ["read", "write"]},
}

# Function to simulate fetching a user's profile
def get_profile(username):
    if username not in users:
        return None
    return users[username]

# Function to simulate deleting a user's profile (vulnerable)
def delete_profile(username, current_user):
    if "write" in current_user["permissions"]:
        if username in users:
            del users[username]
            return f"User '{username}' deleted successfully."
        else:
            return f"User '{username}' not found."
    else:
        return "Permission denied: You do not have permission to delete users."

# Test cases (modify as needed)
current_user = users["user1"]  # Simulate a user with write permission
target_username = "user2"  # Simulate the target user

# Try to delete the victim's profile
result = delete_profile(target_username, current_user)

# Print the result (expected output: "Permission denied: You do not have permission to delete users.")
print(result)
{{< / highlight >}}

**Find and fix the vulnerability in the `delete_profile` function.**

{{< question title="Answer and explanation" >}}
The vulnerability lies in the fact that the `delete_profile` function only checks for the current user's write permission but does not verify that the current user is authorized to delete other users' profiles. This allows any user with write permission to delete any other user's profile, regardless of their own permissions.

**To fix the vulnerability, you could:**

1. Check if the current user has the "delete" permission specifically.
2. Implement role-based access control (RBAC) to restrict deletion based on user roles.
3. Add additional checks to verify the legitimacy of the deletion request.
{{< /question >}}


الموضوع الفرعي 4: التخويل
حالة استخدام
في أي موقع ويب يحتوي على مستخدمين بمستويات مختلفة من القدرات (مثل المشاهدين مقابل المحررين) أو يحتوي على معلومات سرية للمستخدمين ومن المهم أن يحمي الموقع هذه الميزات و/أو هذه البيانات من الأشخاص الذين ليس لديهم إذن لاستخدام هذه الميزات و/أو التفاعل مع هذه البيانات.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم الأنواع الشائعة من ثغرات التخويل
فهم الآثار المحتملة لهذه الأنواع من الثغرات
فهم آليات عمل هذه الثغرات
فهم كيفية منع ثغرات هذه بشكل عام
العرض 
المعرفة الأساسية 
يُعدّ التخويل عملية تأكد من أن مستخدم النظام لديه إذن لتنفيذ إجراء أو إنشاء/قراءة/تحرير/حذف جزء من البيانات في هذا النظام ومنع هذه الإجراءات إذا لم يكن لدى المستخدم إذن، وبشكل عام هذه هي أبسط أنواع الضوابط الأمنية التي يجب تنفيذها وأبسط أنواع الثغرات الأمنية التي يمكن العثور عليها. ومع ذلك على الرغم من بساطتها من الناحية المفاهيمية إلا أن تأمين عناصر التحكم وتفكيكها بشكل عام ممل للغاية وعرضة للخطأ.
في كل مرة يقوم فيها تطبيق ويب بتحميل صفحة خاضعة لضبط التحكم أو تنفيذ إجراء خاضع لضبط التحكم يجب عليه أولًا التحقق من أن المستخدم الحالي قد قام بالمصادقة بنجاح ثم التحقق من أن المستخدم لديه الأذونات الصحيحة. بشكل عام يُعدّ منطق التخويل خاصًا بالتطبيق بشكل كبير لذلك تُوفر أطر الويب دعمًا محدودًا له وبالتالي يجب إضافة منطق التخويل يدويًا إلى كل صفحة، وفي بعض الأحيان يتم تنفيذه في منطق الصفحة وأحيانًا يتم تنفيذه في واجهات برمجة التطبيقات التي تتصل بها صفحات الويب داخليًا. وعلى أي حال إذا كان مفقودًا فيمكن للمستخدمين غير المصرح لهم القيام بأشياء لا يفترض أن يكونوا قادرين على القيام بها.
لتسهيل التواصل حول الثغرات تُقسم ثغرات التخويل بشكل عام ضمن ثلاث فئات.
فقدان المصادقة
في بعض الأحيان يفشل المطورون حتى في التحقق من تسجيل دخول المستخدم على صفحة أو مجموعة من الصفحات، ويمكن لأي مستخدم على الإنترنت عرض صفحات ما بعد المصادقة أو تنفيذ إجراءات ما بعد المصادقة. وتسمى فئة الثغرات هذه أحيانًا "التصفح القسري" أو "مرجع الكائن المباشر"، وهناك عدة طرق يظهر فيها هذا نوع الثغرة هذا.
يتمثل أحد أنماط هذه الثغرة الأمنية في أن الموقع سيعرض مجموعة واحدة من الروابط للمستخدمين الذين لم يسجلوا الدخول ومجموعة أخرى من الروابط للمستخدمين الذين قاموا بتسجيل الدخول، ولكن لا توجد صفحات تعرض بيانات خاصة بالمستخدم أو تنفذ إجراءات في الواقع للتحقق من تسجيل دخول المستخدم. 
أحد الأنماط الشائعة الأخرى هو أن الصفحات التي تعرض البيانات في المتصفح تضم عمليات تحقق من المصادقة ولكن الصفحات التي تعالج البيانات فقط (على سبيل المثال عبر منشور بروتوكول نقل النص التشعبي) لا تفعل ذلك. يحدث هذا بشكل عام بسبب عدم امتلاك المطورين فهمًا عميقًا لكيفية عمل الويب وعدم إدراك أنه من السهل جدًا إنشاء طلبات بروتوكول نقل النص التشعبي عشوائية. باستخدام هذا النمط يمكن للمستخدمين عمومًا رؤية البيانات المصرح لهم برؤيتها فقط ولكن يمكنهم تنفيذ أي إجراء على الموقع، وتعديل بيانات المستخدمين الآخرين. لاحظ أنه نظرًا لأن المستخدمين يمكنهم رؤية بياناتهم الخاصة وتعديلها فمن السهل جدًا على المهاجمين الذين لديهم حساب اكتشاف المصادقة المفقودة.
والنمط الشائع الثالث هو أن الصفحات أو الإجراءات الفردية أو ربما أقسام الموقع ستفشل ببساطة في التحقق من المصادقة، وبشكل عام هذا نتيجة لإغفال من جانب المطور.
تصعيد الصلاحيات الرأسي
يحدث تصعيد الصلاحيات الرأسي عندما يتمكن المستخدمون الأقل قوة من تنفيذ إجراءات أكثر قوة على موقع الويب، ويكون سببه عادةً قيام الموقع بالتحقق من حالة المصادقة ولكن مع فشله في التحقق من الأذونات. ذُكر أعلاه أن أطر العمل لا تتضمن عمومًا وظائف ترخيص مضمّنة ولكن العديد منها يقوم بإجراء فحوصات للمصادقة. إذا كانت الصفحة (أو الموقع بأكمله) تُجري عمليات التحقق من المصادقة بشكل صحيح ولكنها لا تجري عمليات التحقق من الأذونات سيؤدي ذلك عادةً إلى تصعيد الصلاحيات الرأسي. 
من الأمثلة على تصعيد الصلاحيات الرأسية منتدى على الإنترنت يشمل على مستخدمين عاديين ومشرفين، وعندما يقوم المستخدمون العاديون بتسجيل الدخول يمكنهم إنشاء منشورات وتعديل منشوراتهم الخاصة. عندما يقوم المشرفون بتسجيل الدخول يمكنهم أيضًا إنشاء منشورات وتعديل منشوراتهم الخاصة ولكن يمكنهم أيضًا إخفاء منشورات المستخدمين الآخرين وحظر المستخدمين. إذا تمكن المستخدمون العاديون من تعديل عنوان موقع الويب أو تغيير معلمات النموذج لإخفاء مشاركات المستخدم أو حظر المستخدمين أيضًا فسيكون ذلك تصعيدًا رأسيًا للصلاحيات.
الأنماط التي تؤدي إلى تصعيد الصلاحيات الرأسي هي في الأساس نفس الأنماط التي تؤدي إلى فقدان المصادقة باستثناء أنه يجب تسجيل دخول المستخدمين.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من تعيين مستوى الأمان بالمستوى المنخفض وأنك قمت بتسجيل الدخول كمسؤول (من الأفضل تسجيل الخروج وتسجيل الدخول مرة أخرى باستخدام بيانات الاعتماد "admin:password". انتقل إلى صفحة "تجاوز التفويض (Authorisation Bypass)"، وإذا لم تتمكن من رؤية هذه الصفحة في الشريط الأيسر ولديك أحدث إصدار من دي في دبليو إيه فهذا يعني أنك لم تقم بتسجيل الدخول بصفة مسؤول.
بعد ذلك افتح نافذة تصفح خاصة أو متصفحًا آخر وسجل الدخول إلى دي في دبليو إيه الخاص بك بصفة مستخدم "gordonb" ولاحظ أن تجاوز التفويض لا يظهر في شريط التنقل في gordonb. هل يمكنك معرفة كيفية الوصول إلى تجاوز التفويض باسم gordonb؟ (إذا كنت تواجه مشكلة فتذكر أن ثغرات في التخويل واضحة للغاية بشكل عام ولا تفرط بالتفكير فيها.)
تصعيد الصلاحيات الأفقي
يحدث تصعيد الصلاحيات الأفقي عندما يتمكن المستخدمون من عرض أو تنفيذ إجراءات على بيانات المستخدمين الآخرين عندما يكون لدى هؤلاء المستخدمين الآخرين نفس مستوى الوصول. 
يمكن العثور على مثال على تصعيد الامتياز الأفقي في منتدى الإنترنت المذكور أعلاه، وإذا كان بإمكان المستخدم العادي تعديل مشاركات المستخدمين الآخرين فسيكون ذلك تصعيدًا أفقيًا للصلاحيات. 
مع تصعيد الصلاحيات الأفقي هناك ثلاثة أنماط تطوير رئيسية تؤدي إلى الثغرات، الأولى هي قيام الصفحات بالتحقق من تسجيل دخول المستخدمين وامتلاك مستوى الوصول الصحيح ولكن فشلهم تمامًا في التحقق من أذونات مستوى البيانات. وعادة ما يؤدي ذلك إلى وجود ثغرة في الموقع بأكمله أو قسم كامل منه. أما الثاني هو أن الصفحات أو الإجراءات الفردية تفشل في التحقق من الأذونات على مستوى البيانات بسبب إغفال من جانب المطورين. وأخيرًا ستقوم مواقع الويب أحيانًا بتمرير معرف المستخدم في معلمة عنوان موقع الويب أو حقل نموذج مخفي بدلًا من قراءته من جلسة جانب الخادم، ويمكن للمستخدم النهائي تعديل هذه المعلمات بسهولة مما يؤدي عادة إلى تصعيد الصلاحيات.
الوقاية من ثغرات التخويل
كما هو مذكور أعلاه يميل السببان الجذريان لثغرات الترخيص إلى الافتقار إلى وعي المطوّر (وبالتالي تفتقر المواقع بأكملها أو أقسام منها إلى الضوابط المناسبة) أو عدم الاتساق في تنفيذ الضوابط، ونظرًا لأن دعم إطار العمل ضعيف بشكل عام غالبًا ما يحتاج المطورون إلى تنفيذ عناصر التحكم الخاصة بهم من الصفر. ونذكر أدناه بعض النصائح السريعة:
محاولة وضع طبقة وتبسيط عملية التحقق من أذونات المستخدم. استخدم وظائف دعم التخويل إلى الحد الذي يحتوي فيه إطار العمل الخاص بك عليها، فالوظائف المتسقة للتحقق من تخويل المستخدم أقل عرضة للخطأ من المنطق المعقد.
بالنسبة للمستخدمين الأقوياء للغاية، فكر في استخدام موقع ويب منفصل تمامًا، على سبيل المثال www.example.com للمستخدمين العاديين و admin.example.com للمستخدمين الإداريين.
بالنسبة لعمليات التحقق من الأذونات على مستوى البيانات يمكن أن يؤدي وجود إرشادات متسقة للمطورين إلى تقليل الأخطاء، فعلى سبيل المثال يمكن لقاعدة تنص على أن جميع عمليات الوصول إلى البيانات يجب أن تمر عبر طلبات واجهة برمجة التطبيقات ويجب أن تتضمن كل وظيفة واجهة برمجة التطبيقات معلمة معرف المستخدم ويجب أن تستخدمها كل واجهة برمجة تطبيقات تقبل معرّف مستخدم في طلبات قاعدة البيانات. حيث يسمح وجود قواعد متسقة مثل هذه بتجنّب أخطاء التخويل والعثور عليها.
لمزيد من المصادقة راجع ورقة معلومات تخويل مشروع أمان تطبيق الويب المفتوح. ولأجل نظرة متعمّقة راجع مسار تعلّم تقييم أمان تطبيقات الويب.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
الممارسة
اقرأ تقرير الثغرات هذا وتأكد من فهمك لثغرات المصادقة أو التخويل التي يتم استغلالها هنا.
اختبار مهارة

التمرين 1: ملخص

أكمل تمرين تجاوز تصريح دي في دبليو إيه كما هو موضح أعلاه.

التمرين 2: اختبار خيارات متعددة
السؤال 1. ما هو الغرض الأساسي من التخويل في النظام؟
أ) مصادقة المستخدمين
ب) ضمان سلامة البيانات
ج) التحقق من أذونات المستخدم
د) تشفير المعلومات الحساسة
السؤال 2. أي فئة من فئات الثغرات تنطوي على فشل المطورين في التحقق مما إذا كان المستخدم قد قام بتسجيل الدخول على صفحات معينة؟
أ) تصعيد الصلاحيات الرأسي
ب) تصعيد الصلاحيات الأفقي
ج) المصادقة المفقودة
د) التصفح القسري
السؤال 3. ما هو النمط الشائع لثغرة المصادقة المفقودة المذكورة في نص الموضوع الفرعي؟
أ) الفشل في التحقق من الأذونات على الإجراءات على مستوى البيانات
ب) تمرير معرفات المستخدم في معلمات عنوان موقع الويب
ج) السماح للمستخدمين بتعديل بياناتهم الخاصة
د) عرض روابط مختلفة بناءً على حالة تسجيل دخول المستخدم
السؤال 4. ما هي نتيجة ثغرة تصعيد الصلاحيات الرأسي؟
أ) يمكن للمستخدمين الوصول إلى البيانات غير المصرح بها
ب) يمكن للمستخدمين الأقل قوة تنفيذ إجراءات قوية لم يكونوا مخولين بالقيام بها
ج) يمكن للمستخدمين تعديل بيانات المستخدمين الآخرين دون إذن
د) يصبح الموقع بأكمله عرضة للهجمات
السؤال 5. في سياق تصعيد الصلاحيات الأفقي، ما هو السبب الشائع للثغرات وفقًا لنص الموضوع الفرعي؟
أ) نقص وعي المطور
ب) التنفيذ غير المتسق للضوابط
ج) تمرير معرّفات المستخدم في معلمات عنوان موقع الويب
د) بروتوكولات التشفير غير كافية
السؤال 6. كيف يمكن للمطورين الوقاية من ثغرات التخويل وفقًا لنص الموضوع الفرعي؟
أ) استخدام منطق معقّد للتحقق من التخويل
ب) الاعتماد فقط على دعم الإطار
ج) تنفيذ الضوابط الخاصة بهم باستمرار
د) تجاهل عمليات التحقق من الأذونات على مستوى البيانات
السؤال 7. أي مما يلي ليس نصيحة مذكورة في النص لمنع ثغرات التخويل؟
أ) تحديد طبقات وتبسيط عملية التحقق من أذونات المستخدم
ب) استخدام مواقع منفصلة للمستخدمين العاديين والمسؤولين
ج) الاعتماد فقط على وظائف الإطار للتخويل
د) وضع مبادئ توجيهية متسقة للمطورين للوصول إلى البيانات
السؤال 8. ما هي أهمية الاتساق في تنفيذ ضوابط التخويل؟
أ) يزيد من تعقيد النظام
ب) يقلل من احتمالية الأخطاء
ج) يحد من الوصول إلى بعض المستخدمين
د) يجعل عمليات التحقق من التخويل أكثر صعوبة
السؤال 9. ما هو أحد الأمثلة الواردة في نص الموضوع الفرعي لثغرة تصعيد الصلاحيات الرأسي؟
أ) تعديل معلمات عنوان موقع الويب لتصعيد الصلاحيات
ب) السماح للمستخدمين بعرض بيانات المستخدمين الآخرين
ج) تمرير معرّفات المستخدم في حقول النموذج المخفية
د) وصول المستخدمين المنتظمين إلى الميزات الإدارية
السؤال 10. ما فئة الثغرات التي تتضمن قيام مستخدمين باتخاذ إجراءات تؤثر على بيانات مستخدمين آخرين بنفس مستوى الوصول؟
أ) المصادقة المفقودة
ب) تصعيد الصلاحيات الرأسي
ج) تصعيد الصلاحيات الأفقي
د) التصفح القسري

مفتاح الإجابات

السؤال 1: ج) التحقق من أذونات المستخدم
السؤال 2: ج) المصادقة المفقودة
السؤال 3: د) عرض روابط مختلفة بناءً على حالة تسجيل دخول المستخدم
السؤال 4: ب) يمكن للمستخدمين الأقل قوة تنفيذ إجراءات قوية
السؤال 5: ب) التنفيذ غير المتسق للضوابط
السؤال 6: ج) تنفيذ الضوابط الخاصة بهم باستمرار
السؤال 7: ج) الاعتماد فقط على وظائف الإطار للتخويل
السؤال 8: ب) يقلل من احتمالية الأخطاء
السؤال 9: د) وصول المستخدمين المنتظمين إلى الميزات الإدارية
السؤال 10: ج) تصعيد الصلاحيات الأفقي


التمرين 3 (اختياري، فقط لأولئك الذين يتعاملون بشكل مرن مع لغة بايثون الأساسية): تحدي العثور على الأخطاء في التعليمات البرمجية

تحاكي التعليمات البرمجية تطبيق ويب يعاني من ثغرات أمنية أفقية لتصعيد الامتيازات. تكمن الثغرة الأمنية في حقيقة أن وظيفة delete_profile تتحقق فقط من إذن الكتابة للمستخدم الحالي ولكنها لا تتحقق من أن المستخدم الحالي مخول بحذف ملفات تعريف المستخدمين الآخرين، ويسمح هذا لأي مستخدم لديه إذن كتابة بحذف أي ملف شخصي لمستخدم آخر بغض النظر عن أذوناته الخاصة.

# Import statement for print function (Python 3.x)
from __future__ import print_function

# User data (replace with your own test data)
users = {
    "admin": {"id": 1, "username": "admin", "permissions": ["read", "write", "delete"]},
    "user1": {"id": 2, "username": "user1", "permissions": ["read", "write"]},
    "user2": {"id": 3, "username": "user2", "permissions": ["read", "write"]},  
}

# Function to simulate fetching a user's profile
def get_profile(username):
    if username not in users:
        return None
    return users[username]

# Function to simulate deleting a user's profile (vulnerable)
def delete_profile(username, current_user):
    if "write" in current_user["permissions"]:  
        if username in users:
            del users[username]
            return f"User '{username}' deleted successfully."
        else:
            return f"User '{username}' not found."
    else:
        return "Permission denied: You do not have permission to delete users."

# Test cases (modify as needed)
current_user = users["user1"]  # Simulate a user with write permission
target_username = "user2"  # Simulate the target user

# Try to delete the victim's profile
result = delete_profile(target_username, current_user)

# Print the result (expected output: "Permission denied: You do not have permission to delete users.")
print(result)

ابحث عن الثغرة الأمنية في وظيفة "delete_profile" وأصلحها.

مفتاح الإجابة والشرح

تكمن الثغرة الأمنية في حقيقة أن وظيفة "delete_profile" تتحقق فقط من إذن الكتابة للمستخدم الحالي ولكنها لا تتحقق من أن المستخدم الحالي مخول بحذف ملفات تعريف المستخدمين الآخرين، ويسمح هذا لأي مستخدم لديه إذن كتابة بحذف أي ملف شخصي لمستخدم آخر بغض النظر عن أذوناته الخاصة.

لأجل إصلاح الثغرة يمكنك:
1. التحقق مما إذا كان المستخدم الحالي لديه إذن "الحذف (delete)" على وجه التحديد.
2. تنفيذ التحكم في الوصول القائم على الدور لتقييد الحذف بناءً على أدوار المستخدم.
3. إضافة فحوصات إضافية للتحقق من صلاحية طلب الحذف.



## Learning Resources

{{% resource title="Authorization cheat sheet" languages="English" cost="Free" description="Best practices for authorization in web applications." url="https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" %}}

{{% resource title="Honda eCommerce hack" languages="English" cost="Free" description="Demonstration of vulnerabilities in websites with poor authentication or authorization practices." url="https://eaton-works.com/2023/06/06/honda-ecommerce-hack/" %}}
