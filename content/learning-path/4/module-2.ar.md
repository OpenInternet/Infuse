+++
style = "module"
weight = 2
title = "Data Validation"
description = "We look at a very common class of vulnerabilities, in which a website parses maliciously crafted data submitted by a user"
+++

## Use Case

A common class of web application vulnerabilities relates to the way the app processes data supplied by users of the site. This class of vulnerabilities is commonly used by attackers to completely take over target websites, and often can be discovered via automated techniques. Understanding the mechanisms for data validation vulnerabilities is also extremely useful for demystifying complex security topics.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand common types of data validation vulnerabilities
- Understand the potential impacts of those types of vulnerabilities
- Understand the mechanisms by which those vulnerabilities work
- Understand, in broad strokes, how those vulnerabilities can be prevented

---
## Main Section
Our first class of web application specific vulnerabilities encompasses those related to data validation. There are many different kinds of data validation vulnerabilities, and they can occur in any system that processes input. Generally, these vulnerabilities occur when the application makes implicit assumptions about the length and/or content of data it’s sent. When the input is received and/or processed, the data “escapes” its intended context and becomes code in its new context. We’ll talk about how this works, its consequences, and how to fix the vulnerability for each specific type. Be sure to read through in order, as the sections build on previous ones.

### Cross site scripting (XSS)

The name “cross site scripting” is an artifact of how early XSS exploits worked. A better name might be “JavaScript injection,” but the old name remains for historical reasons. XSS occurs when a browser interprets user input as JavaScript. This allows an attacker to, to a limited extent, control the targeted person’s web browser in the context of the target website. The attacker can steal the targeted person’s cookies, allowing the attacker to impersonate them on the site. More than that, though, the attacker can automatically extract any of the targeted person’s data from the target website and can similarly perform actions on the target site as the user. Finally, the attacker can change the appearance of the website for the targeted person, for example popping up a fake re-authentication page that sends the user’s credentials to the attacker or prompting them to download malware purporting to come from a trusted site.

While this attack is powerful, there are limits. The attacker is limited to controlling the content of the target website within the context of the user’s browser. The attacker cannot interact with other websites, and their actions are limited by browser security features.

Mechanically, this attack works by a web application receiving user data, and then integrating that user data directly into a web page. Consider a discussion forum site that allows users to to pick a display name:

![An empty text box on a website where the user can enter text input, with a clickable button labeled "Submit" underneath](/media/uploads/web_fundamentals_empty_box.png)

This rather un-fancy web page has the following HTML code:
{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

When it receives a name from the user, it displays it in the form:

![The same text box, but now it has the text "Alice" in it](/media/uploads/web_fundamentals_Alice_box.png)

using the following HTML:
{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

So far so good. Now, what happens if the user enters some more tricky input, like:
{{< highlight html >}}
Alice"><script>alert("Owned by Alice")</script><i q="
{{< / highlight >}}

When the web page is generated, it looks a bit different:

![An alert on a webpage that says "owned by Alice"](/media/uploads/web_fundamentals_owned_by_Alice_alert.png)

How did this happen?
<!-- We changed the content somewhat from the original learning path, since it used its own highlighting for code colors and not the built-in syntax highlighting
original text: Let’s use some color to highlight what’s going on. Remember, the web application is just treating the user input as text, it has no idea about the colors. -->
{{< highlight html >}}
Alice"><script>alert("Owned by Alice")</script><i q="
{{< / highlight >}}

The application simply takes the input from the user and places it verbatim into the HTML it generates, from the point of the view of the web application, and the web browser, it’s all just undifferentiated text.
{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice"><script>alert("Owned by
    Alice")</script><i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

Note the `">` after `value="Alice"`. That tells the browser that the HTML input’s value attribute is completed, and then that the input tag is completed. Next, the text in blue is a script tag that runs the JavaScript that pops up an alert box. Finally, the `<i q="` is just some cleanup that prevents the web page from displaying the remnants of the original input tag. 
<!-- We can use different color highlighting and formatting to show how the browser interprets the generated web page: -->
{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice"><script>alert("Owned by
    Alice")</script>
  <i q=""><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

As it is, this demonstration of XSS doesn’t do anything malicious, and the only person who is affected is Alice herself. However, if our attacker Alice can cause someone else to see her display name, and her JavaScript does something malicious, then she’s got a real attack to perform.

#### Try it yourself!

Log into your DVWA and make sure the security level is set to low (see the “Setup” section in the introduction of this learning path for more information on this). Navigate to the “XSS (Reflected)” section. The “What’s your name?” input is vulnerable to XSS. Try to enter a name that causes a JavaScript alert box to pop up when you click the “Submit” button.

![A screenshot of DVWA, with the "Vulnerability: Reflected Cross Site Scripting (XSS)" page currently loaded](/media/uploads/web_fundamentals_reflected_XSS_screenshot.png)

### XSS Prevention

To prevent XSS, the best technique to use is called output encoding. Note that in the above example, the attack was enabled through the use of the `"` and `>` characters. In the context of a web page, those characters control the structure of the page. In HTML, all such characters can be encoded, so that the web browser knows to display a double-quote or angle bracket, as opposed to modifying the structure of the page. In this case, if Alice’s data was output encoded before being integrated into the web page, it would generate the following HTML
{{< highlight html >}}
<html><body><form>
  Name: <input name="disp_name" value="Alice&quot;&gt;&lt;script&gt;alert(&quot;Owned by Alice&quot;)&lt;/script&gt;&lt;i q=&quot;"><br>
  <input type="submit">
</form></html>
{{< / highlight >}}

which would display like this
![An empty text box form, with a button that says "submit" below it](/media/uploads/web_fundamentals_Alice_script_box.png)

Output encoding is dependent on the context that the data will be used in. For HTML, you would encode HTML entities in the data. For data that was going to be included into a block of JavaScript, a different encoding would be used. If user data was going to be used in a database query yet another type of encoding would be used. Web frameworks and libraries should have functions to perform output encoding for you; it’s better to use those (hopefully) mature functions than to try to write them yourself from first principles.

For a bit more on XSS, see [the OWASP guide on XSS](https://owasp.org/www-community/attacks/xss/). For an in-depth exploration, see the [Web Application Security Assessment learning path](/en/learning-path/5/).

### SQL injection (SQLi)

Where XSS allows user data to escape from its context and be interpreted as HTML and JavaScript in the victim’s web browser, SQL injection allows user data to escape from its context and be interpreted as SQL on the web application’s database. Most web applications use a back-end database to store and retrieve data. Typically, they will use SQL to perform this data access. SQL injection can occur where user data is interpolated into a query.

Since the attacker-controlled SQL is run in the server environment, SQL injection vulnerabilities are generally much more dangerous than XSS. While an XSS vulnerability allows an attacker to target other users, perhaps through some sort of social engineering, SQL injection can give the attacker read-write access to all user data on the site. The attacker can also read and write any other data stored in the database that the web application can assess. Frequently, the attacker can use the SQL access to gain the ability to run commands on the database server itself, gaining full remote access to the website’s back-end infrastructure.

How does SQL injection work? Consider a web application, where there’s a ticketing platform that lists the name, description, and version of each tool in a category. The user would also be submitting an id parameter; this might even be contained in the URL of the page making the request. Perhaps the code that generates the SQL that retrieves this data looks something like:
{{< highlight sql >}}
$sql = 'select productid, name, description, version from products where categoryid='+request_params['id']
{{< / highlight >}}

When a user sends an `id` parameter like 1 or 32, all is well, we get a query like:
{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where categoryid=32
{{< / highlight >}}

However, the trouble starts when a curious user sends an `id` of 2-1, and notes that they get the same results as for an `id` of 1:
{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where categoryid=2-1
{{< / highlight >}}

This shows the attacker that the application is vulnerable to SQL injection. It is interpreting their input as code (executing the expression 2-1) instead of data (looking for a category whose ID is literally “2-1”). After a bit of digging around, they send an `id` of `-1 union all select 1, username, password, 1.0 from admin_users`. This results in a SQL query of
{{< highlight sql >}}
 select toolid, name, description, version
   from tools
  where toolid=-1
union all
 select 1, username, password, 1.0
   from admin_users
{{< / highlight >}}

What this query does is look up all the tools that have a category `id` of `-1` (which is probably none of them), and then add to that list the usernames and passwords of the ticketing platform’s admin users. The application then formats this as a nice, readable HTML table and sends it back to the user requesting the data. Not only will this allow the attacker to simply log into the ticketing system, but if any of those users reuse their passwords, then the attacker may be able to access other systems in the same organization.

#### Try it yourself!

Log into your DVWA and make sure the security level is set to low. Navigate to the “SQL Injection” page, and experiment with the input. Can you cause the page to return the list of all user accounts? Can you use the “union all” technique to retrieve data from other tables, such as the table called “information_schema.tables”?

### SQLi Prevention

Unlike with XSS, output encoding is not a reliable way to prevent SQL injection. Note that in the above examples, the attacker uses characters such as space and - to change the context of their data from that of data in the SQL query to that of the structure of the query itself. Some combination of type-aware input filtering and output encoding can prevent SQL injection in theory, but in practice this approach is very unreliable.

Instead, we can use a feature of every database engine that skips some of the initial parsing of the query entirely. This type of query is called a parameterized query, and using it is frequently called parameter binding. Instead of sending the database a string of text that contains both the structure of the query and the user’s data, we send one string that contains the structure of the query with placeholders in it for the data. Along with that string, we send the data for each placeholder. In this way, the user’s data is never parsed in a SQL context; no matter what they send, it will be treated exclusively as data. Not only does this protect against SQL injection, it makes the database queries slightly faster.

For a bit more on SQL injection, see [the OWASP guide on it](https://owasp.org/www-community/attacks/SQL_Injection). For an in-depth exploration, see the [Web Application Security Assessment learning path](/en/learning-path/5/).

### Path injection/directory traversal/local file inclusion

This class of vulnerabilities involves the user sending a web application that subverts the application’s interactions with the filesystem. With this type of vulnerability, the attacker can influence or control the pathname of a file that the web application is reading from or writing to, potentially giving the attacker full access to any file that the web server can read or write. Depending on what’s stored on the web server, this may give different abilities to an attacker. However, popular targets are configuration files, which often contain credentials for databases and other external network services, and the source code to the application itself.

Consider an application that keeps some data on the filesystem instead of a database. For example, a multilingual site that keeps localizations in files. Perhaps the home page code looks like this:
{{< highlight html >}}
<?
function localize($content, $lang) {
	return fread("../config/lang/"+$lang+"/"+$content);
}
?>
<html>
<head><title><?= localize($_GET("pg")+".title",$_GET("hl"))?></title></head>
<body><?= localize($_GET("pg"), $_GET("hl"))?></body>
</html>
{{< / highlight >}}

Note that it takes parameters from the URL string and uses them to read files off the filesystem, including their content in the page.

When you load up [http://www.example.com/?hl=en-us&pg=main](http://www.example.com/?hl=en-us&pg=main), the server looks for `../config/lang/en-us/main.title` and `../config/lang/en-us/main`. Perhaps the resulting HTML looks like this:
{{< highlight html >}}
<html>
<head><title>Cool site: Main</title></head>
<body><h1>Hello, world!</h1></body>
</html>
{{< / highlight >}}

Now, what happens if instead, we visit [http://www.example.com/?hl=../../../../../../../../&pg=../etc/passwd](http://www.example.com/?hl=../../../../../../../../&pg=../etc/passwd)? The site will look for `../config/lang/../../../../../../../../&pg=../etc/passwd.title` and `../config/lang/../../../../../../../../&pg=../etc/passwd`. It’s unlikely to find the first one, but assuming the server ignored the error, we might get a web page that looks like:
{{< highlight html >}}
<html>
<head><title></title></head>
<body>nobody:*:-2:-2:Unprivileged User:/var/empty:/usr/bin/false
root:*:0:0:System Administrator:/var/root:/bin/sh
daemon:*:1:1:System Services:/var/root:/usr/bin/false
</body>
</html>
{{< / highlight >}}

On any modern Unix-like system, grabbing `/etc/passwd` isn’t a big deal, but if the the attacker managed to brute force other files on the system (perhaps a config file or something like `/home/dev/vpn-credentials.txt`), the results could be quite bad. Even worse would be a site that allows users to upload files, but the user can manipulate the file location to be code (e.g. .php, .asp, etc.) inside the web root. In this case, the attacker can upload a [web shell](https://en.wikipedia.org/wiki/Web_shell) and run commands on the web server.

#### Try it yourself!

Log into your DVWA and make sure the security level is set to low. Navigate to the “File Inclusion” page, and experiment with the URL that you visit when you click on a file. Can you retrieve the `/etc/passwd` file?

### Path injection prevention

To a large extent, the best advice for preventing this sort of attack is “don’t use the filesystem in your application code.” While this advice is effective, it’s not always practical. A hybrid option would be to store file names in a database, and accept database indices from the user. In the above example, perhaps the database would look something like:

<table>
  <tr>
   <td>lang
   </td>
   <td>page
   </td>
   <td>type
   </td>
   <td>location
   </td>
  </tr>
  <tr>
   <td><code>en-us</code>
   </td>
   <td><code>main</code>
   </td>
   <td><code>title</code>
   </td>
   <td><code>../config/lang/en-us/main.title</code>
   </td>
  </tr>
  <tr>
   <td><code>en-us</code>
   </td>
   <td><code>main</code>
   </td>
   <td><code>body</code>
   </td>
   <td><code>../config/lang/en-us/main</code>
   </td>
  </tr>
</table>

If this isn’t feasible, the site should only use and accept a very limited set of characters (such as letters and numbers) for user-specified filename components. This will still likely allow users to read or write arbitrary files within a specified directory, so the application developers must ensure that files in that directory aren’t executable by the web server, and that there is no sensitive data or important configuration information in that directory.

For a bit more on path injection, see [the OWASP guide on it](https://owasp.org/www-community/attacks/Path_Traversal). For an in-depth exploration, see the [Web Application Security Assessment learning path](/en/learning-path/5/).

### Shell injection/command injection

Shell injection is similar to path injection, in that it involves the application’s interactions with the operating system. In this case, though, the application is directly executing a shell command or several commands, and it’s possible for an attacker to change what commands are executed. The impact of a shell injection is extremely high, allowing the attacker to run their own commands on the underlying web server hardware. Complete compromise of the web application is almost assured. Given time, compromise of other infrastructure in the server environment is likely.

Consider an application that allows users to check network connectivity to other systems from the web server. Here’s some code for a minimal PHP page that does this:
{{< highlight html >}}
<html>
<head><title>Network connectivity check</title></head>
<body>
	<h1>Network connectivity check</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<?
	if ($_GET("host")) {
		print("	<h2>Results</h2>\r<pre>".shell_exec("ping -c 3 ".$_GET("host"))."</pre>");
	}
?>
</body>
</html>
{{< / highlight >}}


If the users enters “8.8.8.8”, the page uses the shell_exec function to run the command `ping -c 3 8.8.8.8`, and the resulting HTML looks something like this:
{{< highlight html >}}
<html>
<head><title>Network connectivity check</title></head>
<body>
	<h1>Network connectivity check</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2>Results</h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=7.266 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=8.681 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=12.481 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.266/9.476/12.481/2.202 ms</pre>
</body>
</html>
{{< / highlight >}}

Super handy! However, what will happen if the user enters “`8.8.8.8; ls -1 /`” instead? The shell command run will be `ping -c 3 8.8.8.8; ls -1 /`, and the resulting web page will look something like:
{{< highlight html >}}
<html>
<head><title>Network connectivity check</title></head>
<body>
	<h1>Network connectivity check</h1>
	<form method="GET">
		<input name="host">
		<input type="submit">
	</form>
<h2>Results</h2>
<pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=5.611 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=11.918 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=9.519 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 5.611/9.016/11.918/2.599 ms
Applications
Library
System
Users
Volumes
bin
cores
dev
etc
home
opt
private
sbin
tmp
usr
var</pre>
</body>
</html>
{{< / highlight >}}

What happened? The shell saw the command to ping 8.8.8.8, and then a semicolon. In most Unix-like shells, the semicolon command separates individual commands that are run together on one line. So, the shell ran the ping command, then ran the next command, to list the root directory contents. It gathered the output of both commands, and then returned those results to the web server.

Obviously, something like this could be used to retrieve almost any file from the web server (for example, using the “cat” command). The attacker could cause the web server to download files (including executables) from other servers, and then run those commands. Those downloaded executables could be exploits that allow the attacker to escalate privileges from the web server user to an administrative user (e.g. system or root), giving the attacker full control over the web server.

#### Try it yourself!

Log into your DVWA and make sure the security level is set to low. Navigate to the “Command Injection” page, and experiment with the input. Can you list the contents of the web server’s root directory?

### Shell injection prevention

As with path injection, the best way to prevent shell injection is “don’t do that.” Unlike with path injection, the advice to not run shell commands from the web server should not be given full consideration. The other alternatives (such as input data validation) are difficult to implement correctly, and may be impossible if the application needs to allow any sort of non-trivial input.

For a bit more on shell injection, see [the OWASP guide on it](https://owasp.org/www-community/attacks/Command_Injection) and the [OWASP guide on preventing it](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html). For an in-depth exploration, see the [Web Application Security Assessment learning path](/en/learning-path/5/).

## Skill Check

### Exercise 1: recap

(This is a recap of the exercise outlined above in the subtopic)

Access your installation of DVWA. Set the difficulty level to “low” and complete the following sections:

- XSS (reflected)
- SQL injection
- File inclusion
- Command injection

For each of the following sections, your task is to find and exploit the vulnerability as described on the respective DVWA page. Since you might not have a lot of experience with JavaScript, SQL, or command lines, it is totally all right to use walkthroughs (there are many online that look at DVWA) or guides to aid you in the exercises. Just make sure that, rather than simply copying and pasting commands from the walkthroughs, you can actually explain _what_ each DVWA page does and what the vulnerability is.

### Exercise 2: multiple choice quiz

Data validation is a critical aspect of web application security, ensuring that input data is safe, properly formatted, and free from malicious intent. Failure to implement adequate data validation can leave web applications vulnerable to various exploits. The following questions explore the importance of data validation in web applications and techniques for preventing data validation vulnerabilities.

If possible, discuss your answers to those questions with a peer or mentor who will help verify that you’ve correctly understood the topic.

**Question 1**

What is a common consequence of failing to implement proper data validation in a web application?

A) Increased server performance\
B) Enhanced user experience\
C) Vulnerability to SQL injection attacks\
D) Improved data integrity

{{< question title="Answer and explanation" >}}
**Question 1 correct answer**: C) Vulnerability to SQL injection attacks

Explanation:

A) Incorrect. Failing to implement proper data validation typically does not lead to increased server performance.\
B) Incorrect. While proper data validation contributes to a better user experience by preventing errors, its absence does not enhance user experience.\
C) Correct. Without proper data validation, web applications are vulnerable to SQL injection attacks, where attackers can manipulate database queries by injecting malicious SQL code.\
D) Incorrect. Data validation helps maintain data integrity, but its absence does not improve data integrity.
{{< /question >}}

**Question 2**

Which of the following is an effective mechanism for preventing cross-site scripting (XSS) attacks in web applications?

A) Using plaintext for storing sensitive data\
B) Escaping user input before displaying it\
C) Storing user passwords in plain text\
D) Disabling HTTPS encryption

{{< question title="Answer and explanation" >}}
**Question 2 Correct Answer**: B) Escaping user input before displaying it

Explanation:

A) Incorrect. Using plaintext for storing sensitive data does not prevent XSS attacks; in fact, it increases the risk of data exposure.\
B) Correct. Escaping user input before displaying it helps mitigate XSS attacks by rendering any potentially malicious scripts harmless, thereby preventing them from executing in users' browsers.\
C) Incorrect. Storing user passwords in plaintext is a security risk and unrelated to preventing XSS attacks.\
D) Incorrect. Disabling HTTPS encryption exposes sensitive data to interception and does not prevent XSS attacks.
{{< /question >}}

**Question 3**

Which technique is effective in preventing SQL injection attacks in web applications?

A) Using dynamic SQL queries\
B) Employing input sanitization and parameterized queries\
C) Storing sensitive data in plain text\
D) Disabling error messages

{{< question title="Answer and explanation" >}}
**Question 3 Correct Answer**: B) Employing input sanitization and parameterized queries

Explanation:

A) Incorrect. Using dynamic SQL queries without proper input validation and sanitization increases the risk of SQL injection attacks.\
B) Correct. Employing input sanitization and parameterized queries helps prevent SQL injection attacks by ensuring that user input is treated as data rather than executable code, thus neutralizing malicious SQL injection attempts.\
C) Incorrect. Storing sensitive data in plain text increases the risk of data exposure but does not directly prevent SQL injection attacks.\
D) Incorrect. Disabling error messages may hide potential vulnerabilities from attackers but does not address the root cause of SQL injection vulnerabilities.
{{< /question >}}

**Question 4**

Which of the following statements best explains how proper data validation helps prevent command injection attacks in web application security?

A) Data validation restricts the input to predefined characters and patterns, thereby minimizing the likelihood of malicious commands being injected into the application.\
B) Proper validation techniques, such as input sanitization and parameterized queries, help neutralize malicious commands embedded in user inputs, thereby mitigating command injection vulnerabilities.\
C) Implementing validation methods like input length checks and whitelisting of acceptable characters reduces the attack surface and prevents execution of unauthorized commands within the web application.\
D) All of the above.

{{< question title="Answer" >}}
**Question 4 Correct Answer**: D) All of the above.
{{< /question >}}

الموضوع الفرعي 2: التحقق من صحة البيانات
حالة استخدام
تتعلق فئة شائعة من الثغرات في تطبيقات الويب بالطريقة التي يعالج بها التطبيق البيانات التي يقدمها مستخدمو الموقع، ويكثر استخدام فئة الثغرات الأمنية هذه من قبل المهاجمين للتحكم بالكامل بمواقع الويب المستهدفة، وغالبًا ما يمكن اكتشافها عبر التقنيات الآلية. يُعدّ فهم آليات ثغرات التحقق من صحة البيانات مفيدًا للغاية أيضًا لتوضيح مواضيع الأمان المعقدة.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارسون قادرين على القيام بما يلي:
فهم الأنواع الشائعة من ثغرات التحقق من صحة البيانات
فهم الآثار المحتملة لهذه الأنواع من الثغرات
فهم آليات عمل هذه الثغرات
فهم كيفية منع ثغرات هذه بشكل عام
العرض 

تشمل الفئة الأولى من الثغرات الأمنية الخاصة بتطبيقات الويب تلك المتعلقة بالتحقق من صحة البيانات، وهناك العديد من الأنواع المختلفة من ثغرات التحقق من صحة البيانات ويمكن أن تحدث في أي نظام يعالج الإدخال. بشكل عام تحدث هذه الثغرات عندما يفترض التطبيق ضمنًا أمورًا حول طول و/أو محتوى البيانات التي يتم إرسالها، وعند استلام المدخلات و/أو معالجتها "تُفلت" البيانات من سياقها المقصود وتصبح رمزًا في سياقها الجديد. وسنتحدث عن كيفية نجاح ذلك وعواقبه وكيفية إصلاح الثغرة الأمنية لكل نوع محدد، وتأكد من أن تقرأ بالترتيب لأن جميع الأقسام مرتبطة بالأقسام التي تسبقها.

البرمجة النصية عبر المواقع (Cross site scripting أو XSS)
يأتي اسم "البرمجة النصية عبر المواقع" من طريقة عمل العمليات السابقة لاستغلال ثغرات البرمجة النصية عبر المواقع، ومن المرجح أن اسم "حقن جافا سكريبت" أفضل لوصفها ولكن الاسم القديم يبقى لأسباب تاريخية. تحدث البرمجة النصية عبر المواقع عندما يفسر المتصفح إدخال المستخدم على أنه جافا سكريبت، ويسمح هذا للمهاجم إلى حد ما بالتحكم في متصفح الويب الخاص بالشخص المستهدف في سياق موقع الويب المستهدف. يمكن للمهاجم سرقة ملفات تعريف الارتباط الخاصة بالشخص المستهدف مما يسمح للمهاجم بانتحال شخصيته على الموقع. بالإضافة إلى ذلك، يمكن للمهاجم استخراج أي من بيانات الشخص المستهدف تلقائيًا من موقع الويب المستهدف ويمكنه بالمثل تنفيذ إجراءات على الموقع المستهدف مثل المستخدم. وأخيرًا يمكن للمهاجم تغيير مظهر موقع الويب للشخص المستهدف على سبيل المثال عرض صفحة إعادة مصادقة مزيفة ترسل بيانات اعتماد المستخدم إلى المهاجم أو تطلب منهم تنزيل برمجيات ضارة يُزعم أنها تأتي من موقع موثوق به.
في حين أن هذا الهجوم قوي إلاّ أن هناك حدودًا، ويقتصر المهاجم على التحكم في محتوى موقع الويب المستهدف في سياق متصفح المستخدم، ولا يمكن للمهاجم التفاعل مع مواقع الويب الأخرى وتقتصر إجراءاته على ميزات أمان المتصفح. 
يعمل هذا الهجوم من الناحية الميكانيكية من خلال تطبيق ويب يتلقى بيانات المستخدم ثم يدمج بيانات المستخدم هذه مباشرة في صفحة ويب. فكر في حالة موقع منتدى مناقشة يسمح للمستخدمين باختيار الاسم المعروض:

تحتوي صفحة الويب غير الفاخرة هذه على رمز لغة تمييز النص التشعبي التالي:
<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name"><{7>br>
  <{1>input type="submit">
</{1>form></{2>html>

عندما يتلقى اسمًا من المستخدم فإنه يعرضه في النموذج:

باستخدام لغة تمييز النص التشعبي التالية:

<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name" value="Alice"><{11>br>
  <{1>input type="submit">
</form></html>

تبدو الأمور على خير حتى الآن، ولكن ماذا سيحدث إذا أدخل المستخدم بعض المدخلات الأكثر صعوبة، مثل:
Alice"><script>alert("Owned by Alice")</script><i q="
عند إنشاء صفحة الويب ستبدو مختلفة بعض الشيء:

كيف حصل ذلك؟ لنستخدم بعض الألوان لتسليط الضوء على ما يحدث، وتذكر أن تطبيق الويب يتعامل فقط مع مدخلات المستخدم كنص وليس لديه أي فكرة عن الألوان.
Alice"><script>alert("Owned by Alice")</script><i q="
يأخذ التطبيق ببساطة المدخلات من المستخدم ويضعها حرفيًا ضمن لغة تمييز النص التشعبي التي يولدها ومن وجهة نظر تطبيق الويب ومتصفح الويب كله مجرد نص غير متمايز.
<html><body><form>
  Name: <input name="disp_name" value="Alice"><script>alert("Owned by
    Alice")</script><i q=""><br>
  <input type="submit">
</form></html>

لاحظ "> باللون الأحمر.  تخبر هذه العلامة المتصفح باكتمال سمة قيمة إدخال لغة تمييز النص التشعبي ووسم الإدخال بعد ذلك. يأتي النص باللون الأزرق بعده على شكل علامة نصية تُشغل جافا سكريبت التي تظهر مربع تنبيه. أخيرًا يُستخدم <i q=" لأغراض التنظيف حيث يمنع صفحة الويب من عرض بقايا وسم الإدخال الأصلي، ويمكننا استخدام تمييز وتنسيق ألوان مختلفة لإظهار كيفية تفسير المتصفح لصفحة الويب التي تم إنشاؤها:
<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name" value="Alice"><{11>script>alert("Owned by
    Alice")</{3>script>
  <{1>i q=""><{4>br>
  <{1>input type="submit">
</{1>form></{2>html>

كما هو الحال لا يتسبب مثال البرمجة النصية عبر المواقع هذا بأي شيء ضار والشخص الوحيد المتأثر هو أليس (Alice) نفسها، ولكن إذا تمكنت مهاجمتنا أليس من جعل شخص آخر يرى اسمها المعروض وكانت جافا سكريبت الخاصة بها تتسبب بشيء ضار فسيكون بإمكانها أداء هجوم حقيقي.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من تعيين مستوى الأمان ليكون منخفضًا (انظر قسم "الإعداد" في مقدمة مسار التعلّم هذا لمزيد من المعلومات). انتقل إلى قسم "البرمجة النصية عبر المواقع (المعكوس)" سترى أن حقل إدخال “What’s your name?” معرّض لثغرة البرمجة النصية عبر المواقع> جرّب بعدها إدخال اسم يتسبب في ظهور مربع تنبيه جافا سكريبت عند النقر على زر "إرسال".

الوقاية من البرمجة النصية عبر المواقع
وتسمى أفضل تقنية لمنع البرمجة النصية عبر المواقع يمكن استخدامها هي ترميز الإخراج، ولاحظ أنه في المثال أعلاه تم تمكين الهجوم من خلال استخدام المحرفين " و >، حيث تتحكم هذه المحارف في بنية الصفحة في سياق صفحات الويب. في لغة تمييز النص التشعبي يمكن ترميز جميع هذه المحارف بحيث يعرف متصفح الويب أن يعرض اقتباسًا مزدوجًا أو قوس زاوية بدلًا من تعديل بنية الصفحة، وفي هذه الحالة إذا تم ترميز بيانات أليس قبل دمجها في صفحة الويب فسيتم إنشاء لغة تمييز النص التشعبي التالية:
<{1>html><{2>body><{3>form>
  Name: <{2>input name="disp_name" value="Alice&quot;&gt;&lt;script&gt;alert(&quot;Owned by Alice&quot;)&lt;/script&gt;&lt;i q=&quot;"><{27>br>
  <{1>input type="submit">
</{1>form></{2>html>

والتي من شأنها أن تعرض ما يلي:

يعتمد ترميز المخرجات على السياق الذي سيتم فيه استخدام البيانات، وبالنسبة للغة تمييز النص التشعبي يمكنك ترميز كيانات لغة تمييز النص التشعبي في البيانات. أما بالنسبة للبيانات التي سيتم تضمينها في كتلة جافا سكريبت سيتم استخدام ترميز مختلف. في حال كان من المقرر استخدام بيانات المستخدم في استعلام قاعدة بيانات فسيتم استخدام نوع آخر من الترميز، ويجب أن تحتوي أطر الويب والمكتبات على وظائف لأداء ترميز الخرج لك ومن الأفضل (نأمل) استخدام هذه الوظائف المتقدمة بدلًا من محاولة كتابتها بالاستناد إلى المبادئ الأولى. 
لمزيد من المعلومات حول البرمجة النصية عبر المواقع، راجع دليل مشروع أمان تطبيق الويب المفتوح للبرمجة النصية عبر المواقع (XSS) ولأجل دراسة متعمقة راجع مسار تعلّم تقييم أمان تطبيقات الويب.
حقن لغة الاستعلامات البنيوية (SQLi)
حيث تسمح البرمجة النصية عبر المواقع لبيانات المستخدم بالخروج من سياقها وتفسيرها على أنها لغة تمييز النص التشعبي وجافا سكريبت في متصفح الويب الخاص بالضحية، يسمح حقن لغة الاستعلامات البنيوية  لبيانات المستخدم بالخروج من سياقها وتفسيرها على أنها لغة الاستعلامات البنيوية في قاعدة بيانات تطبيق الويب. وتستخدم معظم تطبيقات الويب قاعدة بيانات خلفية لتخزين البيانات واستردادها، حيث عادة ما تستخدم لغة الاستعلامات البنيوية لتحقيق الوصول إلى البيانات هذا ويمكن أن يحدث حقن لغة الاستعلامات البنيوية عند استكمال بيانات المستخدم في استعلام. 
نظرًا لأن لغة الاستعلامات البنيوية التي يتحكم فيها المهاجم تعمل في بيئة الخادم، فإن ثغرات حقن لغة الاستعلام البنيوية تكون عمومًا أكثر خطورة من البرمجة النصية عبر المواقع. وبينما تسمح ثغرة البرمجة النصية عبر المواقع للمهاجم باستهداف المستخدمين الآخرين ربما من خلال نوع من الانتحال بالهندسة الاجتماعية ويمكن لحقن لغة الاستعلامات البنيوية أن يمنح المهاجم حق الوصول للقراءة والكتابة إلى جميع بيانات المستخدم على الموقع. يمكن للمهاجم أيضًا قراءة وكتابة أي بيانات أخرى مخزنة في قاعدة البيانات التي يمكن لتطبيق الويب تقييمها، وفي كثير من الأحيان يمكن للمهاجم استخدام وصول لغة الاستعلامات البنيوية للحصول على القدرة على تشغيل الأوامر على خادم قاعدة البيانات نفسه والوصول بشكل كامل عن بُعد إلى البنية التحتية الخلفية للموقع.
كيف يعمل حقن لغة الاستعلامات البنيوية؟ فكر في تطبيق ويب توجد فيه منصة تذاكر تسرد اسم كل أداة ووصفها وإصدارها في فئة، حيث سيقوم المستخدم أيضًا بإرسال معلمة معرف وقد تكون موجودة في عنوان موقع ويب للصفحة التي تقدم الطلب، كما يبدو الكود البرمجية التي تنشئ لغة الاستعلام البنيوية التي تسترد هذه البيانات كما يلي:
$sql = 'select productid, name, description, version from products where categoryid='+request_params['id']
عندما يرسل المستخدم معلمة id  مثل 1 أو 32 سيكون كل شيء على ما يرام وسنحصل على استعلام مثل:
 select toolid, name, description, version
   from tools
  where categoryid=32

لكن تبدأ المشكلة عندما يرسل مستخدم فضولي استعلام id 2-1 للأرقام 2-1 ويلحظ أنه يحصل على نفس ذات نتائج استعلام id  للرقم1:
 select toolid, name, description, version
   from tools
  where categoryid=2-1

يُوضح هذا للمهاجم أن التطبيق عرضة لحقن لغة الاستعلامات البنيوية، فهو يفسر مدخلاتهم على أنها تعليمة برمجية (تنفيذ التعبير 2-1) بدلًا من بيانات (البحث عن فئة يكون معرفها حرفيًا "2-1"). بعد القليل من البحث يرسلون استعلام id  يضم -1 union all select 1, username, password, 1.0 from admin_users وينتج عن ذلك استعلام لغة استعلامات بنيوية تضم: 
 select toolid, name, description, version
   from tools
  where toolid=-1
union all
 select 1, username, password, 1.0
   from admin_users

ما يفعله هذا الاستعلام هو البحث عن جميع الأدوات التي تحتوي على معرّف فئة -1 (والذي ربما لا يكون أيًا منها) ثم أضف إلى تلك القائمة أسماء المستخدمين وكلمات المرور للمستخدمين المسؤولين عن منصة التذاكر، ثم يقوم التطبيق بتنسيق هذا بشكل جدول لغة تمييز النص التشعبي ملائم وقابل للقراءة ويعيده إلى المستخدم الذي يطلب البيانات. لن يسمح هذا للمهاجم فقط بتسجيل الدخول إلى نظام التذاكر ولكن إذا أعاد أي من هؤلاء المستخدمين استخدام كلمات المرور الخاصة بهم فقد يتمكن المهاجم من الوصول إلى أنظمة أخرى في نفس المؤسسة.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. انتقل إلى صفحة "حقن لغة الاستعلامات البنيوية" وجرب الإدخال. هل يمكنك أن تتسبب بجعل الصفحة تعيد قائمة بجميع حسابات المستخدمين؟ هل يمكنك استخدام تقنية “union all” لاسترداد البيانات من الجداول الأخرى مثل الجدول المسمى “information_schema.tables”؟
الوقاية من حقن لغة الاستعلامات البنيوية
على عكس البرمجة النصية عبر المواقع، ترميز الخرج ليس طريقة موثوقة لمنع حقن لغة الاستعلامات البنيوية. لاحظ أنه في الأمثلة أعلاه يستخدم المهاجم المسافة و الـ - لتغيير سياق بياناته من سياق البيانات في استعلام لغة الاستعلامات البنيوية إلى سياق بنية الاستعلام نفسه، ويمكن لمزيج من ترشيح المدخلات المدرك للنوع وترميز المخرجات أن يمنع حقن لغة الاستعلامات البنيوية من الناحية النظرية، ولكن من الناحية العملية لا يمكن الاعتماد على هذا النهج. 
بدلًا من ذلك يمكننا استخدام ميزة لكل محرك قاعدة بيانات تتخطى تمامًا بعض التحليل الأولي للاستعلام، يُطلق على هذا النوع من الاستعلامات اسم الاستعلام المعلمي، واستخدامه يُسمى عادةً بربط المعلمات. بدلًا من إرسال قاعدة البيانات سلسلة نصية تحتوي على كل من بنية الاستعلام وبيانات المستخدم نُرسل سلسلة واحدة تحتوي على بنية الاستعلام مع عناصر نائبة فيها للبيانات. وإلى جانب هذه السلسلة نُرسل البيانات لكل عنصر نائب، وبهذه الطريقة لا يتم تحليل بيانات المستخدم أبدًا في سياق لغة الاستعلامات البنيوية، وبغض النظر عما يرسلونه سيتم التعامل معها حصريًا على أنها بيانات، مم لا يسمح بالحماية من حقن لغة الاستعلامات البنيوية فحسب بل يجعل استعلامات قاعدة البيانات أسرع قليلًا.
لمزيد من المعلومات حول حقن لغة الاستعلامات البنيوية، راجع دليل مشروع أمان تطبيق الويب المفتوح،  ولأجل نظرة متعمّقة راجع مسار تعلّم تقييم أمان تطبيقات الويب.
حقن المسار/اجتياز الدليل/تضمين الملف المحلي
تتضمن هذه الفئة من الثغرات الأمنية قيام المستخدم بإرسال تطبيق ويب يُخرّب تفاعلات التطبيق مع نظام الملفات، وباستخدام هذا النوع من الثغرات الأمنية يمكن للمهاجم التأثير أو التحكم في اسم مسار الملف الذي يقرأ منه تطبيق الويب أو يكتب فيه مما قد يمنح المهاجم حق الوصول الكامل إلى أي ملف يمكن لخادم الويب قراءته أو كتابته. حسب ما يُخزن على خادم الويب قد يمنح هذا قدرات مختلفة للمهاجم، ولكن الأهداف الشائعة هي ملفات التكوين التي غالبًا ما تحتوي على بيانات اعتماد لقواعد البيانات وخدمات الشبكة الخارجية الأخرى ورمز المصدر للتطبيق نفسه. 

فكر في تطبيق يحتفظ ببعض البيانات على نظام الملفات بدلًا من قاعدة بيانات، على سبيل المثال موقع متعدد اللغات يبقي التوطين في الملفات، ومن المحتمل أن يبدو رمز الصفحة الرئيسية كما يلي:


<?
function localize($content, $lang) {
	return fread("../config/lang/"+$lang+"/"+$content);
}
?>
<{1>html>
<{1>head><{2>title><?= {3>localize($_GET("pg")+".title",$_GET("hl")) ?></{15>title></{16>head>
<{1>body><?= {2>localize($_GET("pg"), $_GET("hl")) ?></{11>body>
</{1>html>
لاحظ أنه يأخذ المعلمات من سلسلة عنوان موقع ويب ويستخدمها لقراءة الملفات من نظام الملفات بما في ذلك محتواها في الصفحة.

عند تحميل http://www.example.com/?hl=en-us&pg=main, the server looks for ../config/lang/en-us/main.title and ../config/lang/en-us/main. ربما يبدو ناتج لغة تمييز النص التشعبي كما يلي:
<{1>html>
<{1>head><{2>title>Cool site: Main</{4>title></{5>head>
<{1>body><{2>h1>Hello, world!</{4>h1></{5>body>
</{1>html>

الآن ماذا سيحدث إذا قمنا بدلًا من ذلك بزيارة http://www.example.com/?hl=../../../../../../../../&pg=../etc/passwd? سيبحث الموقع عن ../config/lang/../../../../../../../../&pg=../etc/passwd.title and ../config/lang/../../../../../../../../&pg=../etc/passwd. من غير المحتمل العثور على الأول ولكن على افتراض أن الخادم تجاهل الخطأ قد نحصل على صفحة ويب تبدو كما يلي:
<{1>html>
<{1>head><{2>title></{3>title></{4>head>
<{1>body>nobody:*:-2:-2:Unprivileged User:/var/empty:/usr/bin/false
root:*:0:0:System Administrator:/var/root:/bin/sh
daemon:*:1:1:System Services:/var/root:/usr/bin/false
</{1>body>
</{1>html>
في أي نظام حديث يُشابه يونكس لا يُعدّ الاستيلاء على /etc/passwd أمرًا كبيرًا ولكن إذا تمكن المهاجم من فرض ملفات أخرى على النظام بالقوة الغاشمة (ربما ملف تكوين أو شيء من هذا القبيل /home/dev/vpn-credentials.txt)، فقد تكون النتائج سيئة للغاية، والأسوأ من ذلك هو موقع يسمح للمستخدمين بتحميل الملفات ولكن يمكن للمستخدم التلاعب بموقع الملف ليصبح تعليمة برمجية (على سبيل المثال .php، .asp، وما إلى ذلك) داخل جذر الويب. في هذه الحالة، يمكن للمهاجم تحميل ويب شل وتشغيل الأوامر على خادم الويب.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. انتقل إلى صفحة "File Inclusion (تضمين الملف)" وجرب عنوان موقع ويب الذي تزوره عند النقر على ملف. هل يمكنك استرداد ملف /etc/passwd؟ 
الوقاية من حقن المسار
إلى حد كبير تُعدّ أفضل نصائح لمنع هذا النوع من الهجمات هي "ألا تستخدم نظام الملفات في التعليمات البرمجية للتطبيق الخاص بك." وفي حين أن هذه النصيحة فعالة إلا أنها ليست عملية دائمًا، ويمكن أن يكون الحل المختلط هو تخزين أسماء الملفات في قاعدة بيانات وقبول طلبات فهرسة قاعدة البيانات من المستخدم. وفي المثال أعلاه يمكن أن تبدو قاعدة البيانات بالشكل التالي:
إذا لم يكن ذلك ممكنًا فيجب على الموقع استخدام وقبول مجموعة محدودة جدًا من المحارف (مثل الأحرف والأرقام) لمكونات اسم الملف التي يحددها المستخدم، وسيظل من المحتمل أن يسمح هذا للمستخدمين بقراءة أو كتابة ملفات عشوائية داخل دليل محدد، لذلك يجب على مطوري التطبيقات التأكد من أن الملفات الموجودة في هذا الدليل غير قابلة للتنفيذ بواسطة خادم الويب وأنه لا توجد بيانات حساسة أو معلومات تكوين مهمة فيه.
لمزيد من المعلومات حول حقن المسار، راجع دليل مشروع أمان تطبيق الويب المفتوح حول هذا الموضوع ولأجل دراسة متعمقة راجع مسار تعلّم تقييم أمان تطبيقات الويب.
حقن شل/حقن الأوامر
يشبه حقن شل حقن المسار من حيث أنه يتضمن تفاعلات التطبيق مع نظام التشغيل، وفي هذه الحالة يقوم التطبيق مباشرة بتنفيذ أمر شل أو عدة أوامر ومن الممكن للمهاجم تغيير الأوامر التي يتم تنفيذها. تأثير حقن شل مرتفع للغاية وقد يسمح للمهاجم بتشغيل الأوامر الخاصة به على أجهزة خادم الويب الأساسية ويكاد يكون الاختراق الكامل لتطبيق الويب مضمونًا، ومع مرور الوقت من المحتمل أن يطرأ اختراق للبنية التحتية الأخرى في بيئة الخادم.
فكر في تطبيق يسمح للمستخدمين بالتحقق من اتصال الشبكة بالأنظمة الأخرى من خادم الويب، وإليك الحد الأدنى من التعليمات البرمجية لصفحة من نوع المعالج المسبق للنصوص الفائقة (PHP) التي تقوم بذلك:
<{1>html>
<{1>head><{2>title>Network connectivity check</{4>title></{5>head>
<{1>body>
	<{1>h1>Network connectivity check</{3>h1>
	<{1>form method="GET">
		<{1>input name="host">
		<{1>input type="submit">
	</{1>form>
<?
	if ($_GET("host")) {
		print("	<{2>h2>Results</{4>h2>\r<{5>pre>".shell_exec("ping -c 3 ".$_GET("host"))."</{7>pre>");
	}
?>
</{1>body>
</{1>html>

إذا أدخل المستخدمون "8.8.8.8"، تستخدم الصفحة الدالة shell_exec لتشغيل الأمر ping -c 3 8.8.8.8 وتبدو لغة تمييز النص التشعبي الناتج شيئًا يشابه ما يلي:
<{1>html>
<{1>head><{2>title>Network connectivity check</{4>title></{5>head>
<{1>body>
	<{1>h1>Network connectivity check</{3>h1>
	<{1>form method="GET">
		<{1>input name="host">
		<{1>input type="submit">
	</{1>form>
<{1>h2>Results</{3>h2>
<{1>pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=7.266 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=8.681 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=12.481 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.266/9.476/12.481/2.202 ms</{2>pre>
</{1>body>
</{1>html>

مفيد للغاية! ولكن ماذا سيحدث إذا أدخل المستخدم “8.8.8.8; ls -1 /” بدلًا من ذلك؟ سيكون تشغيل أمر شل هوping -c 3 8.8.8.8; ls -1 / وستبدو صفحة الويب الناتجة كما يلي:
<{1>html>
<{1>head><{2>title>Network connectivity check</{4>title></{5>head>
<{1>body>
	<{1>h1>Network connectivity check</{3>h1>
	<{1>form method="GET">
		<{1>input name="host">
		<{1>input type="submit">
	</{1>form>
<{1>h2>Results</{3>h2>
<{1>pre>PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=119 time=5.611 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=11.918 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=9.519 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 5.611/9.016/11.918/2.599 ms
Applications
Library
System
Users
Volumes
bin
cores
dev
etc
home
opt
private
sbin
tmp
usr
var</{2>pre>
</{1>body>
</{1>html>

ماذا حدث؟ يرى الشل أمر اختبار اتصال (ping) 8.8.8.8 ثم فاصلة منقوطة، وفي معظم أنواع شل الشبيهة بنظام يونكس يفصل أمر الفاصلة المنقوطة الأوامر الفردية التي تم تشغيلها معًا على سطر واحد. ولذلك قامت شل بتشغيل أمر اختبار الاتصال ثم قامت بتشغيل الأمر التالي لسرد محتويات الدليل الجذر، حيث تجمع مخرجات كلا الأمرين ثم أعادت تلك النتائج إلى خادم الويب. 
من الواضح أنه يمكن استخدام شيء من هذا القبيل لاسترداد أي ملف تقريبًا من خادم الويب (على سبيل المثال، باستخدام أمر"cat")، وقد يتسبب المهاجم في قيام خادم الويب بتنزيل الملفات (بما في ذلك الملفات التنفيذية) من خوادم أخرى ثم تشغيل هذه الأوامر. ويمكن أن تكون هذه الملفات التنفيذية التي تم تنزيلها عبارة عن ثغرات تسمح للمهاجم بتصعيد الصلاحيات من مستخدم خادم الويب إلى مستخدم إداري (مثل النظام أو الجذر) مما يمنح المهاجم السيطرة الكاملة على خادم الويب.
جرب بنفسك!
سجّل الدخول إلى دي في دبليو إيه الخاص بك وتأكد من ضبط مستوى الأمان ليكون منخفضًا. ثم انتقل إلى صفحة "حقن الأوامر (Command Injection)"، وجرب الإدخال هل يمكنك سرد محتويات الدليل الجذر لخادم الويب؟ 
الوقاية من حقن شل
كما هو الحال مع حقن المسار فإن أفضل طريقة لمنع حقن الشل هي "لا تفعل ذلك"، وعلى عكس حقن المسار لا ينبغي أن تكون النصيحة عدم تشغيل أوامر شل من خادم الويب أمرًا يُعتمد بالكامل. ومن الصعب تنفيذ البدائل الأخرى (مثل التحقق من صحة بيانات الإدخال) بشكل صحيح وقد يكون ذلك مستحيلًا إذا كان التطبيق يحتاج إلى السماح بأي نوع من المدخلات غير البسيطة. 
لمزيد من المعلومات حول حقن شل راجع دليل مشروع أمان تطبيق الويب المفتوح عليه ودليل مشروع أمان تطبيق الويب المفتوح حول منعه ولأجل استكشاف متعمّق راجع مسار تعلّم تقييم أمان تطبيقات الويب.
موارد التعلّم
[تلخص جميع الروابط في العرض بالإضافة إلى أي موارد إضافية لتضمينها]
اختبار مهارة

التمرين 1: ملخص

(هذا ملخص للتمرين الموضح أعلاه في الموضوع الفرعي)
انتقل إلى نسخة دي في دبليو إيه الخاصة بك، واضبط مستوى الصعوبة ليكون "منخفض" وأكمل الأقسام التالية:

البرمجة النصية عبر المواقع (معكوسة)
حقن لغة الاستعلامات البنيوية
تضمين الملف
حقن الأوامر

بالنسبة لكل قسم من الأقسام التالية تتمثل مهمتك في العثور على الثغرة الأمنية واستغلالها كما هو موضح في صفحة دي في دبليو إيه المعنية، ونظرًا لأنه قد لا يكون لديك الكثير من الخبرة في جافا سكريبت أو لغة الاستعلامات البنيوية أو سطور الأوامر فلا بأس من استخدام أدلة التوجيه خطوة بخطوة (هناك العديد من الأدلة عبر الإنترنت التي تنظر إلى دي في دبليو إيه) أو الأدلة لمساعدتك في التمارين. وتأكد فقط أنه بدلًا من مجرد نسخ ولصق الأوامر من أدلة التوجيه خطوة بخطوة أن تقوم في الواقع بشرح ما تفعله كل صفحة دي في دبليو إيه وماهية الثغرات.

التمرين 2: اختبار خيارات متعددة
	 	 	 	
يُعدّ التحقق من صحة البيانات جانبًا مهمًا من جوانب أمان تطبيقات الويب يضمن أن بيانات الإدخال آمنة ومهيأة بشكل صحيح وخالية من النوايا الخبيثة، ويمكن أن يؤدي الفشل في تنفيذ التحقق الكافي من صحة البيانات إلى ترك تطبيقات الويب عرضة لمختلف عمليات الاستغلال. وتستكشف الأسئلة التالية أهمية التحقق من صحة البيانات في تطبيقات وتقنيات الويب الوقاية من ثغرات التحقق من صحة البيانات.
وإذا كان ذلك ممكنًا ناقش إجاباتك على هذه الأسئلة مع زميل أو مرشد يساعد في التحقق من فهمك للموضوع بشكل صحيح.
السؤال 1
ما هي النتيجة الشائعة للفشل في أداء التحقق المناسب من صحة البيانات في تطبيق الويب؟
أ) زيادة أداء الخادم
ب) تجربة مستخدم محسنة
ج) هجمات حقن لغة الاستعلامات البنيوية
د) تحسين سلامة البيانات

السؤال 2
أي مما يلي يُعدّ آلية فعّالة لمنع هجمات البرمجة النصية عبر المواقع في تطبيقات الويب؟
أ) استخدام النص العادي لتخزين البيانات الحساسة
ب) إلغاء مدخلات المستخدم قبل عرضها
ج) تخزين كلمات مرور المستخدم في النص العادي
د) تعطيل تشفير بروتوكول نقل النص التشعبي الآمن

السؤال 3
ما هي التقنية الفعالة في منع هجمات حقن لغة الاستعلامات البنيوية في تطبيقات الويب؟
أ) استخدام استعلامات لغة الاستعلامات البنيوية الديناميكية
ب) استخدام تعقيم الإدخالات والاستعلامات المعيارية
ج) تخزين البيانات الحساسة في نص عادي
د) تعطيل رسائل الخطأ

السؤال 4
أي من العبارات التالية تشرح بأفضل صورة كيف يساعد التحقق من صحة البيانات بشكل صحيح في منع هجمات حقن الأوامر في أمان تطبيقات الويب؟
أ) يُقيد التحقق من صحة البيانات الإدخال ضمن محارف وأنماط محددة مسبقًا مما يقلل من احتمال حقن الأوامر الضارة في التطبيق.
ب) تُساعد تقنيات التحقق المناسبة مثل تعقيم الإدخالات والاستعلامات ذات المعلمات على تحييد الأوامر الضارة المضمنة في مدخلات المستخدم وبالتالي التخفيف من ثغرات حقن الأوامر.
ج) يؤدي تنفيذ طرق التحقق من الصحة مثل فحوصات طول الإدخال ووضع قائمة بيضاء بالأحرف المقبولة إلى تقليل الأجزاء المعرضة للهجوم ومنع تنفيذ الأوامر غير المصرح بها داخل تطبيق الويب.
د) كل ما سبق

مفتاح الإجابات
الإجابة الصحيحة عن السؤال 1: ج) هجمات حقن لغة الاستعلامات البنيوية
الشرح:
أ) غير صحيح. عادة لا يؤدي الفشل في تنفيذ التحقق المناسب من صحة البيانات إلى تحسين أداء الخادم.
ب) غير صحيح. في حين أن التحقق المناسب من صحة البيانات يساهم في تحسين تجربة المستخدم من خلال منع الأخطاء لا يعزز غيابها من تجربة المستخدم.
ج) صحيح. دون التحقق من صحة البيانات بشكل صحيح، تكون تطبيقات الويب عرضة لهجمات حقن لغة الاستعلامات البنيوية حيث يمكن للمهاجمين التعامل مع استعلامات قاعدة البيانات عن طريق حقن تعليمات ضارة بلغة الاستعلامات البنيوية.
د) غير صحيح. يُساعد التحقق من صحة البيانات في الحفاظ على سلامة البيانات ولكن لا يحسن غيابها من سلامة البيانات.

الإجابة الصحيحة عن السؤال 2: ب) إلغاء مدخلات المستخدم قبل عرضها
الشرح:
أ) غير صحيح. لا يمنع استخدام النص العادي لتخزين البيانات الحساسة هجمات البرمجة النصية عبر المواقع وإنما في الواقع يزيد من خطر تعرض البيانات.
ب) صحيح. يساعد إلغاء إدخال المستخدم قبل عرضه على التخفيف من هجمات البرمجة النصية عبر المواقع من خلال جعل أي برامج نصية ضارة محتملة غير ضارة وبالتالي منعها من التنفيذ في متصفحات المستخدمين.
ج) غير صحيح. يعد تخزين كلمات مرور المستخدم في نص عادي خطرًا أمنيًا ولا علاقة له بمنع هجمات البرمجة النصية عبر المواقع.
د) غير صحيح. يؤدي تعطيل تشفير بروتوكول نقل النص التشعبي الآمن إلى تعريض البيانات الحساسة للاعتراض ولا يمنع هجمات البرمجة النصية عبر المواقع.
الإجابة الصحيحة عن السؤال 3: ب) توظيف تعقيم الإدخالات ومعلمات الاستعلام
الشرح:
أ) غير صحيح. يؤدي استخدام استعلامات لغة الاستعلامات البنيوية الديناميكية دون التحقق من صحة المدخلات وتعقيمها بشكل صحيح إلى زيادة خطر هجمات حقن لغة الاستعلامات البنيوية.
ب) صحيح. يساعد استخدام تعقيم المدخلات والاستعلامات ذات المعلمات على منع هجمات حقن لغة الاستعلامات البنيوية من خلال ضمان التعامل مع مدخلات المستخدم على أنها بيانات بدلًا من تعليمات برمجية قابلة للتنفيذ وبالتالي تُحيّد محاولات حقن لغة الاستعلامات البنيوية الضارة.
ج) غير صحيح. يزيد تخزين البيانات الحساسة في نص عادي من خطر تعرض البيانات ولكنه لا يمنع هجمات حقن لغة الاستعلامات البنيوية بشكل مباشر.
د) غير صحيح. قد يؤدي تعطيل رسائل الخطأ إلى إخفاء الثغرات الأمنية المحتملة عن المهاجمين ولكنه لا يعالج السبب الجذري لثغرات حقن لغة الاستعلامات البنيوية.
الإجابة الصحيحة عن السؤال 4: د) كل ما سبق


## Learning Resources

{{% resource title="OWASP guides to vulnerabilities" languages="English" cost="Free" description="Great overviews of different vulnerabilities, including examples." url="https://owasp.org/www-community/attacks/SQL_Injection" url2="https://owasp.org/www-community/attacks/xss/" url3="https://owasp.org/www-community/attacks/Path_Traversal" url4="https://owasp.org/www-community/attacks/Command_Injection" %}}

{{% resource title="OS command injection cheat sheet" languages="English" cost="Free" description="Quick overview of different OS commands which could be abused for injection." url="https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html" %}}

{{% resource title="Web shells" languages="English, Kurdish, Chinese, Korean, French, Lombard, Hindi, Malayalam" cost="Free" description="Overview of what a web shell is and how it could be used in attacks." url="https://en.wikipedia.org/wiki/Web_shell" %}}
