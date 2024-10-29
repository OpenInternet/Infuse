+++
style = "module"
weight = 2
title = "Website Logging for Security"
description = "Website logs can be crucial in identifying potential attacks and attackers. We look at how to effectively use them"
+++

## Use Case

Any website that’s exposed to the internet is under constant attack. At the very least, it’s being deluged by undirected attacks by hordes of robots operated by criminal actors. More concerning are targeted attacks; even unskilled attackers, given perseverance and luck, can find vulnerabilities in a website.

Ideally, the website owner should be able to be aware of the threats they are facing. Site owners especially will want to know if an attacker is close to finding, or has recently found, a vulnerability in their site. Finally, if a vulnerability is exploited, site owners will want to know where the vulnerability is, and for how long it’s been exploited. Website logs can support all of these desires.

On the other hand, excessive logging can present a risk to the users of web sites. If a site logs sensitive information, and those logs are acquired by an adversary (e.g., seizure by law enforcement or compromise by hackers), then sensitive information could easily end up in the wrong hands.

This subtopic will cover approaches to website logging to maximize utility to website owners and minimize risk to site users.

## Objectives

After completing this subtopic, the practitioner should be able to do the following:

- Understand built-in logging for major web servers
- Understand what application-specific logs to add to detect attacks
- Know how to minimize sensitive information in logs

---
## Main Section
Even with the best possible skills, dedication, processes, and intentions, it’s nearly impossible to develop a website that’s completely resistant to any kind of attack. Given enough time and bad luck, every site will have a security incident. When that happens, it’s important to have logging in place that supports the detection and investigation of security events. At the same time, it’s important that a website's logs don’t pose additional risks themselves. This subtopic will teach you how to approach logging to maximize a site’s security. It will discuss:

- Built-in logs for popular platforms
- Adding logs to catch important security events
- Minimizing risks associated with logging

### Built-in Logging

Various web platforms have their own logging systems. They can be relied upon to record data on every request and response, but are generally not sufficient for all incident response needs. Let’s go over what’s available in some common frameworks’ logs.

#### Apache

Apache is the most popular full-featured web server on the internet, serving more active sites than any other. By default, it logs events to file on the web server’s filesystem. There are two files: `access_log` and `error_log`. The access log contains structured information about each request, while the error log contains more semi-structured data about things that have gone wrong.

The access log has one line per entry, with a configurable format. The default format is the following fields, each separated by a space:

- The requester’s IP address
- The logged-in user on the requesting device. This is almost never sent, and so is almost always just a dash.
- The user logged in if the web site uses HTTP Basic authentication. This will also almost always be a dash.
- The date and time of the request, surrounded by square brackets. Note that this field will usually have spaces in it.
- The HTTP request line sent from the client, surrounded by quotes (e.g. `"GET / HTTP/1.1"`). These fields will always have spaces.
- The HTTP response code from the server, e.g. 200, 404, 500, etc.
- The size of the response returned from the server

Here’s an example:

```
127.0.0.1 - - [13/Dec/2023:13:55:36 -0700] "GET / HTTP/1.1" 200 2326
```

Note that each Apache server can be configured to log more of less data. For more information, see [the Apache documentation](https://httpd.apache.org/docs/2.4/logs.html#accesslog). For more about the apache access log and how to use it, see [this article.](https://www.keycdn.com/support/apache-access-log)

The error log consists of a mix of messages from Apache that are in a semi-structured format and error messages from websites running on the server, without any enforced structure. The default structure of error log entries from Apache itself is one line per entry, with the following fields, again separated by spaces:

- The date and time of the request, surrounded by square brackets. Note that this field will usually have spaces in it.
- The error level (e.g. notice, error) surrounded by square brackets.
- If the error is associated with a request, the word “client” and the IP address of the requester, all within square brackets.
- The actual error message itself, which will almost always contain a number of spaces

[This article](https://www.dataset.com/blog/apache-error-log-detail/) provides more information about using the Apache error log.

#### IIS

IIS is the default Windows web server, and is also a very popular web server. Like Apache, IIS also, by default, logs requests to the web server’s filesystem. There are several log formats available, but the default is the W3C format, which logs the following, separated by spaces:

- Request time
- Requester’s IP address
- HTTP method (e.g. `GET`, `POST`, `HEAD`, etc.)
- URI (e.g. `/`, `/index.htm`, `/posts/34/reply`, etc.)
- Server response code (e.g. `200`, `404`, `500`, etc.)
- HTTP protocol version (e.g. `HTTP/1.1`)

Note that the default logs do not log the query string, so for example a request to [http://example.com/profile?profileID=34](http://example.com/profile?profileID=34) will only log `/profile`. For more information on the IIS access logs, see the [Microsoft documentation](https://learn.microsoft.com/en-us/windows/win32/http/server-side-logging-in-http-version-2-0).

Error logs under IIS are slightly more complicated. Depending on the error, they may go to the HTTP.SYS HTTPERR log file, or in the Windows event log.

The HTTPERR file contains protocol-level errors and is in a structured format, with the following fields separated by spaces:

- Request date
- Request time
- Requester’s IP address
- Requester’s port (not the server port)
- Server IP address
- Server port
- HTTP protocol ( e.g. `HTTP/1.1`)
- HTTP method (e.g. `GET`, `POST`, `HEAD`, etc.)
- The URL and query string
- Server response code (e.g. `200`, `404`, `500`, etc.)
- A literal dash
- An error type string (no spaces)

For more information on the error log, see the [Microsoft documentation](https://learn.microsoft.com/en-us/troubleshoot/developer/webapps/aspnet/site-behavior-performance/error-logging-http-apis).

The Windows event log contains errors generated from the application server (e.g. ASP.NET) or application. These are available in the Windows Event Viewer and are semi-structured:

- Error level (e.g. `Information`, `Warning`, `Error`)
- Date and time
- The software that logged the error (log entries can come from any software on the system, not just the web server)
- A unique ID of the event/error
- Category
- Unstructured information specific to the error

For more information on finding error logs on Windows, see [this article](https://stackify.com/beyond-iis-logs-find-failed-iis-asp-net-requests/).

#### nginx

Depending on how you count, nginx may be the most popular web server on the internet, however it is fairly limited, usually acting as a reverse proxy to a back-end web server or serving static files.

The default access logs are similar to the default Apache logs, but with the following fields at the end of each line:

- Value of the referer header sent with the request
- User agent (browser version) sent with the request

For more information about nginx logs, see [the official documentation](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).

nginx error logs are semi-structured, with the following fields, separated by spaces:

- The request date
- The request time
- The error level inside of square brackets
- Process ID information about the nginx instance that logged the error
- An (optional) connection ID
- The error message in free-form text

For more information, see [this article](https://trunc.org/learning/nginx-log-analysis).

#### Upstream CDN logs

If a site is behind a CDN, it’s often useful to see the logs of the requests to the CDN, as opposed to the requests from the CDN to the origin site. Each CDN provider provides logs differently and has different pricing structures for logging.

#### Setting up server logging

When setting up server logging, there are a few steps that should be taken to maximize the security value of the logs.

- Make sure the logs contain at least the IP address of the requestor, full URI requested (including the query string), time taken to serve the request, response size, referer, and user-agent. This information can be extremely helpful when investigating an incident.
- Try to get the logs off of the web server as quickly as possible. If the server itself is compromised, attackers will likely try to hide their tracks by deleting or modifying the server logs. Some ways of accomplishing this include:
  - Have a process that pulls log files from the server periodically. Pushing logs from the web server is okay, though it’s important that the push process cannot be used to delete the backed-up logs.
  - “Stream” logs from the web server to a remote ever, for example, with syslog-ng. This provides great protection against loss of logs. It’s usually a good idea to keep logs on the web server as well, in case of network interruption.

#### Limitations of server logging

Even when fully configured, built-in server logs miss a lot of important information. Some examples:

- POST parameter information isn’t included. If an attacker is performing application-level attacks against a page that accepts POST parameters, there will be no way to see those attacks in the logs.
- Although error logs may contain information about filesystem and database errors that occur as attackers exploit vulnerabilities, they generally are not sufficient to understand much about the attack. E.g., elevated error logs may indicate an attack in progress but may also indicate a non-security bug, and it can be very difficult to distinguish between the two.
- No identity information is included. While all logs include the IP address, multiple users can have the same IP.

Much of this information isn’t included for good reason. Much of it can have bad implications for user privacy. Others (like useful error logging) require insight into the application itself, so can’t be done by the web server.

#### Approaching Logging for security

The main purpose of application-level logging in a web application is to overcome the limitations of server logging. There are numerous articles describing best practices for logging, here are a few:

- [An overview of security logging](https://www.dnsstuff.com/security-log-best-practices)
- [An article from OWASP on logging for web sites](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [An article from OWASP on having a consistent format for logs](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html)

These resources should get you set up with the knowledge you need to integrate security logging into an existing (or new) web application.

#### Logging and sensitive information

When overcoming the limitations of built-in server logging, we want to make sure that we don’t put site users at risk. It is frequently the case that logs are less well protected than production databases. First off, logs are not as obvious a target as a production database, so people tend to not focus on them as much when putting security measures in place. Secondly, it’s often the case that more users at an organization are given access to logs than are granted to access to a production database. Third, logs tend to be sent to many different systems, whereas production databases tend to stay centralized. Because of this, it’s worth considering redacting sensitive information in logs.

[This article](https://www.skyflow.com/post/how-to-keep-sensitive-data-out-of-your-logs-nine-best-practices) prevents some general best practices for handling sensitive data during logging. Here are some approaches to consider for specific sorts of data:

##### POST parameters

It is a recommended practice to not include sensitive information in GET parameters, hence GET parameters being logged, but not POST parameters. However, it can be extremely useful to have access to information about POST parameters when responding to an attack. A few things to put in place:

- Certain pages (e.g. the login page) and/or parameters (credit card number, password fields) should be exempted from logging
- For POST parameters that will be logged, consider redacting them to hide potentially sensitive information, while still being able to identify malicious traffic. The following Python code may give some inspiration:

  {{< highlight python "linenos=table" >}}
  import re

  keep = ['select', 'where', 'from', 'and', 'script', 'on', 'src', '../', '<', '>']
  output = ''

  i = 0
  while i < len(target):
  	matched = False
  	for j in keep:
  		if target[i:i+len(j)].lower() == j.lower():
  			output = output + target[i:i+len(j)]
  			i=i+len(j)
  			matched = True
  	if not matched:
  		if ' ' == target[i:i+1]:
  			output = output + ' '
  		elif re.search('\w', target[i:i+1]):
  			output = output + "A"
  		elif re.search('\d', target[i:i+1]):
  			output = output + "1"
  		else:
  			output = output + "*"
  		i = i+1

  {{< / highlight >}}

##### Security-related errors

If a request causes an error that looks like an attempt to hack or bypass controls, the website should aggressively log the request information. Examples include:

- Database queries that trigger an error
- Requests for a data element that the user doesn’t have access to
- Errors or empty data when attempting to read a file

If any of these happen, it’s a good idea to log the request, as well as internal information (e.g., database query, filename, etc). In the good case, there’s a simple bug in the site. In that case, there’s plenty of debugging information. In the bad case, the site is being compromised. In that case, it’s easier to find where the compromise occurred, so that forensics is more effective.

##### Identity information

Logging the identity of a logged-in user can be dangerous, but there are steps that can be taken to mitigate the danger. It’s questionable to log session cookies, but a hash of a session ID can be used to track a user’s activity across the site. Also, if the web server has a queryable directory of active user sessions, then either an internal ID can be used in logs, or the existing session IDs can be hashed to identify the log entries of a logged-in user. This will allow site owners to identify an active attacker, while making the identities in the logs useless to a threat actor on their own.

## Practice

Read through the following example commands which use common Unix tools like `awk`, `sort`, `uniq`, and `grep` to perform the analysis on Apache and Nginx logs.

### A brief introduction to Unix text analysis tools

Below are example commands using common Unix tools like `awk`, `sort`, `uniq`, and `grep` to perform the analysis on Apache and Nginx logs.

`awk` is a powerful command-line tool for manipulating text files in Unix-like operating systems. It has a simple syntax. The basic structure of an `awk `command is as follows:

{{< highlight awk >}}
awk 'pattern { action }' file
{{< / highlight >}}

For example let’s consider the following text file (we will call it example.txt):

```
apple red 5
banana yellow 10
pear green 15
Orange orange 20
```

`awk` scans the input file line by line, and performs a specified action for each line if the pattern matches. `awk `automatically splits each line of input into fields based on whitespace (by default). Fields can be referenced using $1, $2, etc., where $1 refers to the first field, $2 to the second, and so on.

For example to print first column with `awk` command we need to use

{{< highlight awk >}}
awk '{ print $1 }' example.txt
{{< / highlight >}}

We can use Conditional Filtering. For example we want to print lines where third column is greater than 10

{{< highlight awk >}}
awk '$3 > 10 {print $1, $3}' example.txt
{{< / highlight >}}

To use a custom delimiter with `awk`, use the -F option followed by the delimiter character. For example if we have a comma delimited file we can use -F',' (enclose the delimiter character in single quotes ) to specify a comma (,) as the delimiter.

{{< highlight awk >}}
awk -F',' '{print $1, $3}' comma-delimited.txt
{{< / highlight >}}

We can do calculations using `awk`. This command calculates the sum of values in the third field across all lines and prints the total at the end. "END" is a special pattern used to execute statements after the last record is processed

{{< highlight awk >}}
awk '{total += $3} END {print "Total:", total}' example.txt
{{< / highlight >}}

There are some built in variables in `awk`. For example NR is a built-in variable in awk that represents the current record number. NR increments by one for each line read from the input file(s).

If you want to print line numbers in addition to line content, you could use the following:

{{< highlight awk >}}
awk '{print NR, $0}' example.txt
{{< / highlight >}}

### Practice exercise 1: Apache Access Log Analysis

Spend some time playing around with the following awk commands. You can use a log from your own web server or use practice ones, such as [this collection](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip).

Identify the total number of requests recorded in the access log.

{{< highlight bash >}}
cat apache_access.log | wc -l
{{< / highlight >}}


Determine the most frequently requested URLs.

{{< highlight bash >}}
awk '{print $7}' apache_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

This awk command will print the seventh column from each line of the log then pipe the output of the previous awk command into the sort command. sort is used to sort the lines of text alphabetically or numerically. By default, it sorts in ascending order. After sorting the output with sort, the uniq -c command is used to count the occurrences of each unique line in the sorted output. The sort -nr command is used to sort the output numerically (-n) in reverse order (-r). This means that the lines are sorted based on their numerical values, with the highest values appearing first. The head -5 command is used to display the first 5 lines of the input.

Find out the top 5 IP addresses making requests to the server.

{{< highlight bash >}}
awk '{print $1}' apache_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Analyze the distribution of request methods.

{{< highlight bash >}}
awk '{print $6}' apache_access.log | sort | uniq -c
{{< / highlight >}}

### Practice exercise 2: Nginx Access Log Analysis

Count the total number of requests in an Nginx access log.

{{< highlight bash >}}
cat nginx_access.log | wc -l
{{< / highlight >}}

Identify the most requested URLs and their corresponding status codes.

{{< highlight bash >}}
awk '{print $7, $9}' nginx_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

Calculate the average size of requests (in bytes).

{{< highlight awk >}}
awk '{sum+=$10} END {print "Average request size:", sum/NR, "bytes"}' nginx_access.log
{{< / highlight >}}

This AWK command calculates the average request size by summing up the values in the 10th column (presumably representing request sizes) for all lines in the nginx_access.log file. Then, it divides the total sum by the number of lines (NR), representing the average request size in bytes. Finally, it prints out the result along with a descriptive message.

Make sure that the 10th column actually represents the request size in bytes in your nginx_access.log file, as the accuracy of the calculation depends on the correctness of the column indexing. \

Determine the top 5 user agents accessing the server.

{{< highlight bash >}}
awk -F'"' '{print $6}' nginx_access.log | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}

This command uses `awk` to set the field separator (-F) to double quotes ("), then extracts the 6th field from each line of the` nginx_access.log` file. This assumes that the log entries are formatted in such a way that the URL or request path is enclosed within double quotes. The extracted URLs or request paths are then piped to sort them alphabetically. `uniq -c` is used to count the occurrences of each unique URL or request path. The output is piped again to `sort -nr` to sort the results numerically in descending order based on the count.

Finally, head -5 is used to display the top 5 URLs or request paths with the highest occurrence counts.

Analyze the distribution of requests by hour of the day.

{{< highlight bash >}}
awk '{print $4}' nginx_access.log | cut -c 14-15 | sort | uniq -c
{{< / highlight >}}

`awk` is used to extract the 4th field ($4) from each line of the `access.log` file, which typically contains the timestamp.

The `cut` command is then applied to extract characters 14 to 15 from each timestamp, which correspond to the hour portion.

The extracted hour values are piped to sort to arrange them in ascending order. `uniq -c` is used to count the occurrences of each unique hour value.

The output will display the count of log entries for each hour in the log file.

### Practice exercise 3: Error Log Analysis (Both Apache and Nginx)

Apache and nginx: Count the total number of error entries in the log.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | wc -l
cat nginx_error.log | grep 'error' | wc -l
{{< / highlight >}}


Apache: Identify the most common types of errors. awk '{print $NF}' reads each line of input data, splits it into fields (separated by whitespace by default), and then prints the value of the last field from each line.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}


The number at the beginning of each line shows how many times a particular error occurred in the log. In this case, “`2047`” means that the error with the last field “`757`” occurred 2047 times.

The last field represents different things in each line. It could be a file path, a specific action, or some other identifier related to the error. For instance, “`757`” or “`154`” could be error codes or unique identifiers, while “`/home/mysite/public_html/new/wp-content/plugins/woocommerce/includes/data-stores/abstract-wc-order-data-store-cpt.php:100`” could be a file path and line number where the error occurred.

nginx: Determine the top 5 IP addresses, domains, or file paths generating errors.

{{< highlight bash >}}
cat nginx_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5
{{< / highlight >}}


Apache: Analyze the distribution of errors by date or time.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{print $1}' | sort | uniq -c
{{< / highlight >}}


Apache: Investigate any recurring error patterns and propose potential solutions. {$1=""; $2=""; $3="";}: This part of the awk command sets the first three fields (date, time, and timezone information) to empty strings.

{{< highlight bash >}}
cat apache_error.log | grep 'error' | awk '{$1=""; $2=""; $3=""; print}' | sort | uniq -c | sort -nr | head -10
{{< / highlight >}}

### An introduction to regular expressions and using them to analyze a log

For this exercise, we use we use log files from [this collection](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip) (same collection as the other files in this practice section)

In this task we are going to use regular expressions. Regular expressions (regex) are like powerful search tools that help you find specific patterns in data. For example, if you're investigating suspicious network traffic and you know that malicious requests often contain certain patterns of characters, you can use regex to search through logs or traffic captures to find those requests. Regex allows you to define flexible search patterns. For example:

    **[a-z] range **- Matches a character in the range "a" to "z". Case sensitive.


    I.e. [g-s] matches a character between g and s inclusive


    abcdef**ghijklmnopqrs**tuvwxyz


    **[A-Z] range -**  Matches a character in the range "A" to "Z" . Case sensitive.


    **[0-9] range - **Matches a character in the range "0" to "9". Case sensitive.


    We can also use **quantifiers** to match  the specified quantity of the previous token. {1,3} will match 1 to 3. {3} will match exactly 3. {3,} will match 3 or more.

[a-d]{3} matches any sequence of exactly three characters within the given range, each of which can be any lowercase letter from 'a' to 'd'. So, it would match strings like 'abc', 'bda', 'cad', etc. Some characters have special meanings within regexes these characters are:

| Symbol | Name                          | Description                                      |
|--------|-------------------------------|--------------------------------------------------|
| \      | Backslash                     | Used to escape a special character               |
| ^      | Caret                         | Beginning of a string                            |
| $      | Dollar sign                   | End of a string                                  |
| .      | Period or dot                 | Matches any single character                     |
| \|     | Vertical bar or pipe symbol   | Matches previous OR next character/group         |
| ?      | Question mark                 | Match zero or one of the previous                |
| *      | Asterisk or star              | Match zero, one or more of the previous          |
| +      | Plus sign                     | Match one or more of the previous                |
| ( )    | Opening and closing parenthesis| Group characters                                |
| [ ]    | Opening and closing square bracket| Matches a range of characters               |
| { }    | Opening and closing curly brace| Matches a specified number of occurrences of the previous|


In our task we will use backslash to escape “\” special character.

You can read more about regex here: [https://en.wikipedia.org/wiki/Regular_expression](https://en.wikipedia.org/wiki/Regular_expression)

If you check the provided nginx access log you can see these kind of lines:

```
181.214.166.113 - - [15/Feb/2024:15:05:19 -0500] "[L\x9E\x804\xD9-\xFB&\xA3\x1F\x9C\x19\x95\x12\x8F\x0C\x89\x05\x81" 400 181 "-" "-"
45.95.169.184 - - [15/Feb/2024:15:49:27 -0500] "\x10 \x00\x00BBBB\xBA\x8C\xC1\xABDAAA" 400 181 "-" "-"
```

As you can see, both lines contain \x followed by exactly two characters which map to hexadecimal notation (so they use the numbers 0-9 and the letters A to F), such as \x9C, \x10, \xBA, etc. To filter all lines we need to use the '`\\x[a-fA-F0-9]{3}`' pattern where` \\x[a-fA-F0-9]` is our token, `{3}` is a quantifier.

We will use the `grep` command to search for the specified pattern in text. For example:

`grep 'abcd'` will filter all lines containing the string “abcd”.

The “`-E`” option in the `grep` command enables the use of extended regular expressions for pattern matching `grep -E 'abcd\[0-9]{2}'` for filtering text like `abcd\34, abcd\47` etc.

### Practice exercise 4: using regular expressions (regexes)

For those exercises, we use nginx log files from [this collection](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip) (same collection as the other files in this practice section)

1. Use grep and the ` '\\x[a-fA-F0-9]{2}'` [regex](https://en.wikipedia.org/wiki/Regular_expression) to filter requests from nginx access.log containing a suspicious payload. The regex` '\x[a-fA-F0-9]{3}'` matches a sequence starting with '`\x`' followed by exactly three hexadecimal characters (0-9, a-f, or A-F). How many lines are there?
2. Using the same filter determine which IP address is making the most requests
3. Examine` error.log` by running `more  error.log`. You can quit this command with ctrl+c or press the “q” key to return command prompt. Excluding "PHP Notice" errors. What kind of critical errors can you find in the log?
4. Exclude PHP errors from the error.log and find the lines where requests are denied due to security rules. Which sensitive file has been requested?

{{< question title="Practice exercise 4: answers" >}}

Exercise 1: \
Correct answer: 113 lines

Command(s) to execute: `grep -E '\\x[a-fA-F0-9]{2}' nginx_access.log|wc|awk '{print $1}' `

Exercise 2:

Correct answer: 222.186.13.131 20 lines

Command(s) to execute: `grep -E '\\x[a-fA-F0-9]{2}' nginx_access.log|sort|awk '{print $1}'| sort | uniq -c | sort -nr`

Exercise 3:

Correct answer: SSL handshaking errors

Command(s) to execute:

{{< highlight bash >}}
more nginx_error.log
cat nginx_error.log|grep -v "PHP"|grep crit
{{< / highlight >}}

Exercise 4:

Correct answer: `.git/config`

Command(s) to execute: `cat nginx_error.log|grep -v "PHP"|grep forbidden`

{{< /question >}}


## Skill Check

This skill check will be much easier if you’ve first completed the practice exercise above.

You are given an nginx access log from a website under attack to investigate, which you can {{< fontawesome "solid/download" >}} [download here](https://github.com/OpenInternet/Infuse/blob/main/web-app-hardening-skill-check.log).

Locate a suspicious path that is being targeted, extract IP addresses that are sending suspicious requests and find out which countries those IPs are in (you can use geoIP databases, described in more detail in the malicious infrastructure learning path, for this). You can use standard CLI tools like `awk`, `grep`, `sort`, `uniq`. To find out AS numbers and countries, we recommend using relevant online lookup services.

_Hint:_ ipinfo.io provides a convenient way of looking up IP details, you can use curl to fetch those.


الموضوع الفرعي 2: تسجيل أحداث موقع الويب للأمان
حالة استخدام
يُعدّ أي موقع ويب على الإنترنت معرضًا لشكل مستمر للهجوم، وعلى أقل تقدير تغرق بهجمات غير موجّهة من أعداد كبيرة من روبوتات تُديرها جهات إجرامية. والأمر الأكثر إثارة للقلق هو الهجمات المستهدفة لأن حتى المهاجمين غير المهرة مع القليل من المثابرة والحظ، يمكنهم العثور على نقاط ضعف في موقع الويب. 
من الناحية المثالية، يجب أن يكون مالك موقع الويب قادرًا على إدراك التهديدات التي يواجهها، وسيرغب في معرفة ما إذا كان المهاجم قريبًا من العثور على ثغرة أمنية في موقعه أو وجدها مؤخرًا. وأخيرًا في حالة استغلال ثغرة أمنية سيرغب مالكو الموقع في معرفة مكانها ومدة استغلالها، ويمكن أن تدعم سجلات موقع الويب كل هذه الرغبات.
من ناحية أخرى يمكن أن يشكل فرط إبقاء السجلات خطرًا على مستخدمي مواقع الويب، حيث إذا قام الموقع بتسجيل معلومات حساسة وحصل المتطفل على هذه السجلات (على سبيل المثال، الاستيلاء عليها من قبل سلطات إنفاذ القانون أو سرقها المخترقون)، فقد تنتهي المعلومات الحساسة بسهولة في الأيدي الخطأ.
سيغطي هذا الموضوع الفرعي مناهج تسجيل مواقع الويب لتعظيم الفائدة لأصحاب مواقع الويب وتقليل المخاطر التي يتعرض لها مستخدمو الموقع.
الأهداف 

بعد استكمال هذا الموضوع الفرعي، يجب أن يكون الممارس قادرًا على القيام بما يلي:
فهم تسجيل الأحداث المدمجة لخوادم الويب الرئيسية
فهم سجلات التطبيق التي يجب إضافتها لاكتشاف الهجمات
معرفة كيفية تقليل المعلومات الحساسة في السجلات
العرض 
حتى مع توفر المهارات والتفاني والعمليات بأفضل صورة، من شبه المستحيل تطوير موقع ويب يكون محصناً تماماً ضد أي نوع من الهجمات، ومع مرور الوقت وبعض الحظ السيئ سيتعرض كل موقع لحادث أمني. عندما يحدث ذلك من المهم أن يكون لديك سجلات أحداث تدعم اكتشاف الأحداث الأمنية والتحقيق فيها، وفي الوقت نفسه من المهم ألا تشكل سجلات موقع الويب مخاطر إضافية بحد ذاتها. سيعلمك هذا الموضوع الفرعي كيفية التعامل مع التسجيل لزيادة أمان الموقع، وسيناقش:
سجلات أحداث مدمجة للمنصات الشائعة
إضافة سجلات لتسجيل الأحداث الأمنية المهمة
تقليل المخاطر المرتبطة بتسجيل الأحداث
سجلات أحداث مدمجة
تمتلك منصات الويب المختلفة أنظمة تسجيل خاصة بها، ويمكن الاعتماد عليها لتسجيل البيانات عند كل طلب واستجابة، ولكنها لا تكفي عمومًا لجميع احتياجات الاستجابة للحوادث. لنراجع ما هو متاح في بعض سجلات الأطر الشائعة.
أباتشي (Apache)
أباتشي هو خادم ويب مكتمل الميزات والأكثر شعبية على الإنترنت ويخدم مواقع أكثر نشاطًا من أي خادم آخر، وبشكل افتراضي يُسجل الأحداث للملف على نظام ملفات خادم الويب. يوجد ملفان: access_log  وerror_log. ويضم سجل الوصول معلومات منظمة حول كل طلب بينما يحتوي سجل الأخطاء على المزيد من البيانات شبه المنظمة حول الأشياء التي حدثت بشكل خاطئ. 
يحتوي سجل الوصول على سطر واحد لكل إدخال بصيغة قابلة للتكوين، والصيغة الافتراضية هي الحقول التالية، كل منها مفصولة بمسافة:
عنوان بروتوكول الإنترنت لمقدم الطلب
المستخدم مسجل الدخول على الجهاز مقدم الطالب، لكن غالبا ما لا يرسل هذا وكذلك دائمًا ما يكون مجرد شَرطة.
قام المستخدم بتسجيل الدخول إذا كان موقع الويب يستخدم مصادقة أساسية لبروتوكول نقل النص التشعبي وسيكون هذا أيضًا دائمًا شرطة.
تاريخ ووقت الطلب محاطين بأقواس معقوفة. لاحظ أن هذا الحقل سيحتوي عادةً على مسافات فيه.
خط طلب بروتوكول نقل النص التشعبي المرسل من العميل، محاطًا بقوسين (على سبيل المثال "GET / HTTP/1.1"). ستحتوي هذه الحقول دائمًا على مسافات.
رمز استجابة بروتوكول نقل النص التشعبي من الخادم، على سبيل المثال 200، 404، 500، وما إلى ذلك.
حجم الاستجابة التي تم إرجاعها من الخادم
إليك مثال على ذلك:
127.0.0.1 - - [13/Dec/2023:13:55:36 -0700] "GET / HTTP/1.1" 200 2326
لاحظ أنه يمكن تكوين كل خادم أباتشي لتسجيل المزيد من بيانات أقل. لمزيد من المعلومات، راجع وثائق أباتشي ولمزيد من المعلومات حول سجل وصول أباتشي وكيفية استخدامه، راجع هذه المقالة.
يتكون سجل الأخطاء من مزيج من الرسائل من أباتشي بتنسيق شبه منظم ورسائل خطأ من مواقع الويب التي تعمل على الخادم، دون أي بنية مهيكلة، والهيكل الافتراضي لإدخالات سجل الأخطاء من أباتشي نفسها هو سطر واحد لكل إدخال، مع الحقول التالية، مفصولة مرة أخرى بمسافات:
تاريخ ووقت الطلب محاطين بأقواس معقوفة. لاحظ أن هذا الحقل سيحتوي عادةً على مسافات فيه.
مستوى الخطأ (مثل الإشعار والخطأ) محاطًا بأقواس معقوفة.
إذا كان الخطأ مرتبطًا بطلب فإن كلمة "العميل" وعنوان بروتوكول الإنترنت لمقدم الطلب ستكون بين قوسين معقوفين. 
رسالة الخطأ الفعلية نفسها ستحتوي دائمًا على عدد من المسافات>
توفر هذه المقالة معلومات إضافية حول استخدام سجل أخطاء أباتشي.
إنترنت إنفورميشن سيرفيسيز (IIS) 
إنترنت إنفورميشن سيرفيسيز هو خادم الويب الافتراضي لويندوز وهو أيضًا خادم ويب شائع جدًا. مثل أباتشي يقوم إنترنت إنفورميشن سيرفيسيز أيضًا افتراضيًا بتسجيل الطلبات إلى نظام ملفات خادم الويب. توجد العديد من تنسيقات السجلات المتاحة، ولكن الافتراضي هو صيغة دبليو 3 سي (W3C) التي تسجل ما يلي مفصولة بمسافات:
وقت الطلب
عنوان بروتوكول الإنترنت لمقدم الطلب
طرق بروتوكول نقل نص تشعبي (على سبيل المثال، غت (GET)، بوست (POST)، هيد (HEAD)، وما إلى ذلك.)
معرف موارد منتظم (على سبيل المثال /index.htm، /posts/34/reply، وما إلى ذلك.)
رمز استجابة الخادم (على سبيل المثال 200، 404، 500، وما إلى ذلك)
إصدار بروتوكول نقل نص تشعبي (مثل HTTP/1.1)
لاحظ أن السجلات الافتراضية لا تسجل سلسلة الاستعلام، لذلك على سبيل المثال سيسجل طلب http://example.com/profile?profileID=34فقط قسمprofile/. لمزيد من المعلومات حول سجلات وصول إنترنت إنفورميشن سيرفيسيز، راجع وثائق مايكروسوفت.
سجلات الأخطاء ضمن إنترنت إنفورميشن سيرفيسيز أكثر تعقيدًا قليلًا. حسب نوع الخطأ قد ينتقل إلى ملف سجل HTTP.SYS HTTPERR أو سجل أحداث ويندوز.
يحتوي ملف HTTPERR على أخطاء على مستوى البروتوكول وهو بصيغة منظمة مع فصل الحقول التالية بمسافات:
تاريخ الطلب
وقت الطلب
عنوان بروتوكول الإنترنت لمقدم الطلب
منفذ مقدم الطلب (وليس منفذ الخادم)
عنوان بروتوكول إنترنت الخادم 
منفذ الخادم
بروتوكول نقل نص تشعبي (مثل HTTP/1.1)
طرق بروتوكول نقل نص تشعبي (على سبيل المثال، غت (GET)، بوست (POST)، هيد (HEAD)، وما إلى ذلك.)
عنوان موقع ويب وسلسلة الاستعلام
رمز استجابة الخادم (على سبيل المثال 200، 404، 500، وما إلى ذلك)
شرطة فعلية
سلسلة نوع الخطأ (دون مسافات)
لمزيد من المعلومات حول سجل الأخطاء، راجع وثائق مايكروسوفت.
يحتوي سجل أحداث ويندوز على أخطاء تم إنشاؤها من خادم التطبيق (مثل ASP.NET) أو التطبيق، وهي متوفرة في عارض أحداث ويندوز وهي شبه منظمة:
مستوى الخطأ (مثل المعلومات، التحذير، الخطأ)
التاريخ والوقت
البرنامج الذي سجّل الخطأ (يمكن أن تأتي إدخالات السجل من أي برنامج على النظام وليس فقط خادم الويب)
معرّف فريد للحدث/الخطأ
الفئة
معلومات غير منظمة خاصة بالخطأ
لمزيد من المعلومات حول العثور على سجلات الأخطاء على ويندوز، راجع هذه المقالة.
إن جي آي إن إكس (nginx)
حسب طريقة الحساب قد يكون إن جي آي إن إكس هو خادم الويب الأكثر شيوعًا على الإنترنت ولكنه محدود إلى حد ما وعادةً ما يعمل على شكل وكيل عكسي لخادم الويب الخلفي أو يقدم ملفات ثابتة. 
تتشابه سجلات الوصول الافتراضية مع سجلات أباتشي الافتراضية، ولكن مع الحقول التالية في نهاية كل سطر:
قيمة رأس المُحيل المرسل مع الطلب
تم إرسال وكيل المستخدم (إصدار المتصفح) مع الطلب
لمزيد من المعلومات حول سجلات إن جي آي إن إكس، راجع الوثائق الرسمية.
سجلات أخطاء إن جي آي إن إكس شبه منظمة وتشمل الحقول التالية مفصولة بمسافات:
تاريخ الطلب
وقت الطلب
مستوى الخطأ داخل الأقواس المعقوفة
معلومات معرّف العملية حول مثيل إن جي آي إن إكس الذي سجل الخطأ
معرّف اتصال (اختياري)
رسالة الخطأ بشكل نص حر
للاطلاع على مزيد من المعلومات، انظر هذه المقالة.
سجلات شبكة توصيل المحتوى بالاتجاه الصاعد
إذا كان الموقع خلف شبكة توصيل المحتوى، فغالبًا ما يكون من المفيد الاطلاع على سجلات طلبات المرسلة إلى شبكة توصيل المحتوى بدلًا من الطلبات من شبكة توصيل المحتوى إلى موقع المنشأ. يوفر كل مزود شبكة توصيل المحتوى سجلات مختلفة ولديه هياكل تسعير مختلفة للسجلات. 
إعداد سجلات الخادم
عند إعداد سجلات الخادم، توجد بعض خطوات يجب اتخاذها لزيادة قيمة أمان السجلات.
تأكد من أن السجلات تحتوي على الأقل على عنوان بروتوكول الإنترنت لمقدم الطلب، وكامل عنوان معرف الموارد المنتظم المطلوب (بما في ذلك سلسلة الاستعلام)، والوقت المستغرق لخدمة الطلب وحجم الاستجابة والمُحيل ووكيل المستخدم. يمكن أن تكون هذه المعلومات مفيدة للغاية عند التحقيق في حادث ما.
حاول إخراج السجلات من خادم الويب في أسرع وقت ممكن لأنه تعرض الخادم نفسه للاختراق من المحتمل أن يحاول المهاجمون إخفاء مساراتهم عن طريق حذف سجلات الخادم أو تعديلها. تشمل بعض طرق تحقيق ذلك ما يلي:
إجراء عملية تسحب ملفات السجل من الخادم بشكل دوري، ولا بأس بدفع السجلات من خادم الويب على الرغم من أنه من المهم عدم استخدام عملية الدفع لحذف السجلات الاحتياطية.
سجلات "البث" من خادم الويب إلى جهاز تحكم عن بعد من أي وقت مضى، على سبيل المثال، باستخدام syslog-ng، وهذا يوفر حماية كبيرة ضد فقدان السجلات. عادة ما يكون من المستحسن إبقاء السجلات على خادم الويب أيضًا في حالة انقطاع الشبكة.
قيود تسجيل الخادم
حتى عند تكوينها بالكامل غالبًا ما تفقد سجلات الخادم المضمّنة الكثير من المعلومات المهمة، ومن الأمثلة على ذلك:
لا تتضمن معلومات معلمة بوست، وإذا كان المهاجم ينفذ هجمات على مستوى التطبيق ضد صفحة تقبل معلمات بوست فلن تكون هناك طريقة لرؤية هذه الهجمات في السجلات.
على الرغم من أن سجلات الأخطاء قد تحتوي على معلومات حول أخطاء نظام الملفات وقاعدة البيانات التي تحدث عندما يستغل المهاجمون الثغرات الأمنية، إلا أنها لا تكفي عمومًا لفهم الكثير عن الهجوم. على سبيل المثال، قد تشير سجلات الأخطاء المرتفعة إلى هجوم يجري ولكنها قد تشير أيضًا إلى خطأ غير أمني وقد يكون من الصعب جدًا التمييز بين الاثنين.
لم يتم تضمين أي معلومات هوية في حين أن جميع السجلات تتضمن عنوان بروتوكول الإنترنت ويمكن أن يكون لدى العديد من المستخدمين عنوان البروتوكول ذاته.
لم يتم تضمين الكثير من هذه المعلومات لسبب وجيه ويمكن أن يكون للكثير منها آثار سيئة على خصوصية المستخدم، يتطلب بعضها الآخر (مثل تسجيل الأخطاء المفيدة) معرفة متعمّقة بالتطبيق نفسه ولذلك لا يمكن القيام بذلك بواسطة خادم الويب.
مقاربة تسجيل الأحداث من أجل الأمن 
يتمثل الغرض الرئيسي من تسجيل الأحداث على مستوى التطبيق في تطبيق الويب في التغلب على قيود تسجيل الخادم للأحداث، وهناك العديد من المقالات التي تصف أفضل الممارسات لتسجيل الأحداث، وفيما يلي بعض منها:
نظرة عامة على تسجيل أحداث الأمنية
مقالة من مشروع أمان تطبيق الويب المفتوح حول تسجيل الأحداث لمواقع الويب
مقالة من مشروع أمان تطبيق الويب المفتوح حول وجود تنسيق متسق للسجلات
يجب أن تُوفر لك هذه الموارد المعرفة التي تحتاجها لدمج تسجيل الأحداث الأمنية في تطبيق ويب موجود (أو جديد).
تسجيل الأحداث والمعلومات الحساسة
عند التغلب على قيود تسجيل الأحداث في الخادم المدمج، سنرغب بالتأكد من أننا لا نعرض مستخدمي الموقع للخطر، وغالبًا ما تكون السجلات ذات حماية أقل من قواعد بيانات الإنتاج. أولًا، ليست السجلات هدفًا واضحًا مثل قاعدة بيانات الإنتاج ولذلك يميل الناس إلى عدم التركيز عليها كثيرًا عند وضع التدابير الأمنية. ثانيًا، غالبًا ما يُمنح عدد أكبر من المستخدمين في المؤسسة حق الوصول إلى السجلات مقارنةً بالوصول إلى قاعدة بيانات الإنتاج. ثالثًا، عادة ما تُرسل السجلات إلى العديد من الأنظمة المختلفة، في حين تميل قواعد بيانات الإنتاج إلى البقاء مركزية ولهذا السبب يجدر النظر في تنقيح المعلومات الحساسة في السجلات. 
توفر هذه المقالة بعض أفضل الممارسات العامة للتعامل مع البيانات الحساسة أثناء التسجيل، وفيما يلي بعض الأساليب التي يجب مراعاتها لأنواع محددة من البيانات:
معلمات بوست
من الممارسات الموصى بها عدم تضمين المعلومات الحساسة في معلمات غت، وبالتالي الحصول على المعلمات التي يتم تسجيلها، ولكن ليس معلمات بوست، لكن قد يكون من المفيد للغاية الوصول إلى معلومات حول معلمات بوست عند الاستجابة للهجوم، وتوجد عدة أمور يجب أخذها في الاعتبار عند التنفيذ:
يجب إعفاء صفحات معينة (مثل صفحة تسجيل الدخول) و/أو المعلمات (رقم بطاقة الائتمان وحقول كلمة المرور) من تسجيل الأحداث.
بالنسبة لمعلمات النشر التي سيتم تسجيلها، يجب أن تراعي تنقيحها لإخفاء المعلومات التي يحتمل أن تكون حساسة مع متابعة تحديد حركة المرور الضارة. يمكن لتعليمات بايثون البرمجية التالية أن تساعدك:
import re

keep = ['select', 'where', 'from', 'and', 'script', 'on', 'src', '../', '<', '>']
output = ''

i = 0
while i < len(target):
	matched = False
	for j in keep:
		if target[i:i+len(j)].lower() == j.lower():
			output = output + target[i:i+len(j)]
			i=i+len(j)
			matched = True
	if not matched:
		if ' ' == target[i:i+1]:
			output = output + ' '
		elif re.search('\w', target[i:i+1]):
			output = output + "A"
		elif re.search('\d', target[i:i+1]):
			output = output + "1"
		else:
			output = output + "*"
		i = i+1

أخطاء متعلقة بالأمن
إذا تسبب الطلب في خطأ يبدو وكأنه محاولة لاختراق عناصر التحكم أو تجاوزها، فيجب على موقع الويب تسجيل معلومات الطلب بالتفصيل، وتشمل الأمثلة على ذلك ما يلي:
استعلامات قاعدة البيانات التي تسبب حدوث خطأ
طلبات الحصول على عنصر بيانات لا يستطيع المستخدم الوصول إليه
أخطاء أو بيانات فارغة عند محاولة قراءة ملف
في حالة حدوث أي من هذه الأمور، من الجيد تسجيل الطلب بالإضافة إلى المعلومات الداخلية (على سبيل المثال، استعلام قاعدة البيانات واسم الملف وما إلى ذلك). في الحالات الجيدة يكون خطأً بسيطًا في الموقع، وفي هذه الحالة توجد الكثير من معلومات تصحيح الأخطاء. وفي الحالة السيئة يكون الموقع قد تعرض للاختراق، وفي هذه الحالة من الأسهل العثور على مكان حدوث الاختراق بحيث يكون التحليل الجنائي أكثر فعالية.
معلومات الهوية
قد يكون تسجيل أحداث هوية المستخدم الذي قام بتسجيل الدخول أمرًا خطيرًا ولكن هناك خطوات يمكن اتخاذها للتخفيف من الخطر. توجد شكوك حول تسجيل ملفات تعريف الارتباط للجلسة ولكن يمكن استخدام تجزئة معرّف الجلسة لتتبع نشاط المستخدم عبر الموقع. إذا كان خادم الويب يحتوي على دليل قابل للاستعلام لجلسات المستخدم النشطة، فيمكن استخدام معرّف داخلي في السجلات أو يمكن توليد شفرة تجزئة معرّفات الجلسة الحالية لتحديد إدخالات السجل لمستخدم مسجل الدخول. سيسمح ذلك لمالكي المواقع بتحديد هوية المهاجم النشط في حين يبقي الهويات الموجودة في السجلات عديمة الفائدة لممثل التهديد بمفرده.
موارد التعلّم
الممارسة
اقرأ أمثلة الأوامر التالية التي تستخدم أدوات يونكس الشائعة مثل awk وsort وuniq وgrep  لإجراء التحليل على سجلات أباتشي وإن جي آي إن إكس. 
حلل الأوامر قليلًا حتى تفهم ما تفعله بالضبط، ويمكنك تشغيلها على عينات السجلات وتعديلها قليلًا أيضًا. إذا لم يكن لديك أي سجلات نموذجية في متناول اليد، فيمكنك العثور على بعضها على غيت هب، على سبيل المثال هنا.
مقدمة موجزة عن أدوات تحليل نص يونكس
فيما يلي أمثلة أوامر تستخدم أدوات يونكس الشائعة مثل awk وsort وuniq وgrep  لإجراء التحليل على سجلات أباتشي وإن جي آي إن إكس.
تُعدّ awk أداة سطر أوامر قوية لمعالجة الملفات النصية في أنظمة التشغيل الشبيهة بيونكس، وبناء جملها بسيط، وفيما يلي البناء الأساسي لأمر awk ما يلي:

awk 'pattern { action }' file

على سبيل المثال، لننظر في الملف النصي التالي (سنسميه example.txt):

تفاح أحمر 5
موز أصفر 10
أجاص أخضر 15
برتقال برتقالي 20

يقوم awk بمسح ملف الإدخال سطرًا بسطر وينفذ إجراءً محددًا لكل سطر إذا كان النمط متطابقًا ويقوم awk تلقائيًا بتقسيم كل سطر من سطور الإدخال إلى حقول حسب المسافة الفارغة (افتراضيًا). يمكن الإشارة إلى الحقول باستخدام 1$ و2$ وما إلى ذلك حيث يشير 1$ إلى الحقل الأول و2$ إلى الحقل الثاني وما إلى ذلك.

على سبيل المثال لطباعة العمود الأول بأمر awk نحتاج إلى استخدام: 

awk '{ print $1 }' example.txt

يمكننا استخدام التصفية الشرطية، على سبيل المثال إذا اردنا طباعة الأسطر التي يكون فيها العمود الثالث أكبر من 10، نستخدم:

awk '$3 > 10 {print $1, $3}' example.txt

لاستخدام محدِّد مخصص مع awk، استخدم خيار F- متبوعًا بحرف المحدِّد. على سبيل المثال، إذا كان لدينا ملف مقسوم بالفواصل، فيمكننا استخدام ','F- (أرفق حرف المحدِّد بين علامات اقتباس مفردة) لتحديد الفاصلة (,) بحيث تكون هي المحدِّد.

awk -F',' '{print $1, $3}' comma-delimited.txt

يمكننا إجراء العمليات الحسابية باستخدام awk، ويحسب هذا الأمر مجموع القيم في الحقل الثالث عبر جميع الأسطر ويطبع الإجمالي في النهاية. يُعدّ "END" نمطًا خاصًا يُستخدم لتنفيذ البيانات بعد معالجة السجل الأخير

awk '{total += $3} END {print "Total:", total}' example.txt

هناك بعض المتغيرات المدمجة في awk.  على سبيل المثال، NR هو متغير مدمج في awk يُمثل رقم السجل الحالي. يزداد NR بمقدار واحد لكل سطر مقروء من ملف (أو ملفات) الإدخال.

طباعة أرقام الأسطر بالإضافة إلى محتويات الأسطر
awk '{print NR, $0}' example.txt

تمرين تدريبي 1: تحليل سجل وصول أباتشي
اقض بعض الوقت في تجربة أوامر awk التالية، ويمكنك استخدام سجل من خادم الويب الخاص بك أو استخدام سجل تدريبي، مثل هذا.
تحديد العدد الإجمالي للطلبات المسجلة في سجل الوصول
cat apache_access.log | wc -l

تحديد عناوين موقع ويب الأكثر طلبًا
awk '{print $7}' apache_access.log | sort | uniq -c | sort -nr | head -5

سيقوم أمر awk هذا بطباعة العمود السابع من كل سطر من السجل ثم يقوم بتوصيل خرج أمر awk السابق إلى أمر sort ويستخدم sort لترتيب أسطر النص أبجديًا أو رقميًا وبشكل افتراضي يفرزها بترتيب تصاعدي. بعد فرز المُخْرج باستخدام sort، يستخدم أمر uniq -c لحساب تكرارات كل سطر فريد في الخرج الذي تم فرزه. ويُستخدم أمر sort -nr لفرز المُخْرج رقميًا (n-) بترتيب عكسي (r-)، وهذا يعني أن الخطوط تفرز بناءً على قيمها العددية مع ظهور أعلى القيم أولًا. يُستخدم أمر head -5 لعرض أول 5 أسطر من الإدخال. 

تعرّف على أعلى 5 عناوين بروتوكول إنترنت تُقدم طلبات إلى الخادم
awk '{print $1}' apache_access.log | sort | uniq -c | sort -nr | head -5

تحليل توزيع طرق الطلبات
awk '{print $6}' apache_access.log | sort | uniq -c


تمرين تدريبي 2: تحليل سجل وصول إن جي آي إن إكس
حساب العدد الإجمالي للطلبات في سجل وصول إن جي آي إن إكس
ويمكنك استخدام سجل من خادم الويب الخاص بك أو استخدام سجل تدريبي مثل هذا.
cat nginx_access.log | wc -l

تحديد عناوين مواقع الويب الأكثر طلبًا ورموز الحالة المقابلة لها
awk '{print $7, $9}' nginx_access.log | sort | uniq -c | sort -nr | head -5

حساب متوسط حجم الطلبات (بالبايت)
awk '{sum+=$10} END {print "Average request size:", sum/NR, "bytes"}' nginx_access.log

يحسب أمر AWK هذا متوسط حجم الطلبات عن طريق تلخيص القيم في العمود العاشر (يُفترض أنه يمثل أحجام الطلبات) لجميع الأسطر في ملف nginx_access.log، ثم يُقسم المجموع الإجمالي على عدد الأسطر (NR) وهو ما يمثل متوسط حجم الطلبات بالبايت، وأخيرًا تُطبع النتيجة جنبًا إلى جنب مع رسالة وصفية.

تأكد من أن العمود العاشر يمثل بالفعل حجم الطلبات بالبايت في ملف nginx_access.log الخاص بك حيث تعتمد دقة الحساب على صحة فهرسة العمود.

تحديد أفضل 5 وكلاء مستخدمين يصلون إلى الخادم
awk -F'"' '{print $6}' nginx_access.log | sort | uniq -c | sort -nr | head -5

يُستخدم هذا الأمر awk لتعيين فاصل الحقل (F-) بحيث يكوّن علامات اقتباس مزدوجة (")، ثم يستخرج الحقل السادس من كل سطر من ملف nginx_access.log. يفترض هذا أن إدخالات السجل يتم تنسيقها بطريقة تجعل عنوان موقع ويب أو مسار الطلبات محاطًا بعلامات اقتباس مزدوجة، ثم يتم توصيل عناوين مواقع الويب المستخرجة أو مسارات الطلبات لفرزها أبجديًا، زيُستخدم uniq -c لحساب تكرار كل عنوان موقع ويب أو مسار طلب فريدين. يجري بعدها إيصال النتائج مرة أخرى إلى أمر sort -nr لفرز النتائج رقميًا بترتيب تنازلي حسب العدد.
وأخيرًا يُستخدم head -5 لعرض أفضل 5 عناوين مواقع الويب أو مسارات الطلب التي تحتوي على أعلى عدد مرات حدوث.

تحليل توزيع الطلبات حسب الساعة في اليوم
awk '{print $4}' nginx_access.log | cut -c 14-15 | sort | uniq -c

يستخدم awk لاستخراج الحقل الرابع (4$) من كل سطر من ملف access.log الذي يحتوي عادةً على الطابع الزمني.
ثم يطبق أمر cut لاستخراج الأحرف من 14 إلى 15 من كل طابع زمني والتي تتوافق مع الجزء من الساعة.
يتم توصيل قيم الساعات المستخرجة للفرز لترتيبها بترتيب تصاعدي ويستخدم uniq -c لحساب تكرارات كل قيمة ساعة فريدة.
سيعرض الخرج عدد إدخالات السجل لكل ساعة في ملف السجل.

تمرين تدريبي 3: تحليل سجل الأخطاء (كل من أباتشي وإن جي إن جي آي إن إكس)
حساب العدد الإجمالي لإدخالات الخطأ في السجل
ويمكنك استخدام سجل من خادم الويب الخاص بك أو استخدام سجل تدريبي، مثل هذا.
cat apache_error.log | grep 'error' | wc -l
cat nginx_error.log | grep 'error' | wc -l

تحديد أكثر أنواع الأخطاء شيوعًا
يقوم أمر awk '{print $NF}' بقراءة كل سطر من بيانات الإدخال ويقسمها إلى حقول (مفصولة بمسافة بيضاء افتراضيًا) ثم يطبع قيمة الحقل الأخير من كل سطر.

cat apache_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5

يقوم هذا الأمر بتصفية الأسطر التي تحتوي على كلمة "خطأ".
يقوم أمر awk '{print $NF}' باستخراج الحقل الأخير (يفترض أنه رسالة الخطأ) من كل سطر ثم يقوم بفرز رسائل الخطأ أبجديًا.
يقوم أمر uniq -c بحساب تكرار كل رسالة خطأ فريدة.
يقوم أمر sort -nr بفرز الأعداد بترتيب تنازلي بينما يقوم أمر head -5 بإخراج أهم 5 رسائل خطأ متكررة جنبًا إلى جنب مع أعدادها.
يوفر هذا المسار معرفة معمقة حول أهم 5 رسائل خطأ شائعة في سجل أخطاء أباتشي.

تحديد أهم 5 عناوين بروتوكول الإنترنت التي تولد الأخطاء
cat apache_error.log | grep 'error' | awk '{print $NF}' | sort | uniq -c | sort -nr | head -5

تحليل توزيع الأخطاء حسب التاريخ أو الوقت
cat apache_error.log | grep 'error' | awk '{print $1}' | sort | uniq -c


التحقيق في أي أنماط أخطاء متكررة واقتراح الحلول المحتملة
{$1=""; $2=""; $3="";}: يقوم هذا الجزء من أمر awk بتعيين الحقول الثلاثة الأولى (التاريخ والوقت ومعلومات المنطقة الزمنية) إلى سلاسل فارغة. 
cat apache_error.log | grep 'error' | awk '{$1=""; $2=""; $3=""; print}' | sort | uniq -c | sort -nr | head -10
مقدمة حول التعبيرات العادية واستخدامها لتحليل سجل

بالنسبة لهذا التمرين، نستخدم ملفات السجل التالية
في هذه المهمة سنستخدم التعبيرات العادية (Regular expressions أو regex اختصارًا) وهي تشبه أدوات البحث القوية التي تساعدك في العثور على أنماط محددة في البيانات. على سبيل المثال، إذا كنت تحقق في حركة مرور مشبوهة على الشبكة وتعلم أن الطلبات الضارة غالبًا ما تحتوي على أنماط معينة من الأحرف، فيمكنك استخدام التعبيرات العادية للبحث في السجلات أو تسجيلات حركة المرور للعثور على تلك الطلبات. تتيح لك التعبيرات العادية تحديد أنماط البحث المرنة، مثل:
نطاق [a-z] - يطابق حرفًا في النطاق بين "a" حتى "z". الحساسية لحالة الأحرف.
على سبيل المثال يطابق مجال [g-s] أي حرف بين g و s ضمنًا 
abcdefghijklmnopqrstuvwxyz
نطاق [A-Z] - يطابق حرفًا بين "A" و"Z". الحساسية لحالة الأحرف.
نطاق [0-9] - يطابق رقمُا بين "0" و"9". الحساسية لحالة الأحرف. 
يمكننا أيضًا استخدام محددات الكمية لمطابقة الكمية المحددة من الرمز المميز السابق. تتطابق {1,3} مع الأرقام من 1 إلى 3. تتطابق {3} فقط مع 3. تتطابق {3,} مع 3 أو أكثر.
تتطابق [a-d]{3} مع أي تسلسل من ثلاثة أحرف بالضبط ضمن النطاق المحدد، ويمكن أن يكون كل منها أي حرفًا صغيرًا من "a" إلى "d". لذلك ستتطابق سلاسل مثل "abc" و "bda" و "cad" وما إلى ذلك. لبعض الأحرف معاني خاصة داخل التعبيرات العادية وهذه الأحرف هي:

في مهمتنا سنستخدم الخط المائل العكسي لإلغاء حرف خاص "\".
يمكنك قراءة المزيد عن التعبيرات العادية هنا: https://en.wikipedia.org/wiki/Regular_expression 

إذا اطلّعت على سجل وصول إن جي آي إن إكس المقدم يمكنك رؤية هذا النوع من الأسطر:

181.214.166.113 - - [15/Feb/2024:15:05:19 -0500] "[L\x9E\x804\xD9-\xFB&\xA3\x1F\x9C\x19\x95\x12\x8F\x0C\x89\x05\x81" 400 181 "-" "-"  
45.95.169.184 - - [15/Feb/2024:15:49:27 -0500] "\x10 \x00\x00BBBB\xBA\x8C\xC1\xABDAAA" 400 181 "-" "-"

كما ترون، يحتوي كلا السطرين على x\ متبوعين بحرفين بالضبط يمثلان التدوين السداسي العشري (لذلك يستخدمان الأرقام من 0-9 والحروف من A إلى F)، مثل x9C\ وx10\ وxBA\ وما إلى ذلك.  لتصفية جميع الأسطر، نحتاج إلى استخدام نمط '\\x[a-fA-F0-9]' حيث يكون  \\x[a-fA-F0-9] هو رمزنا المميز وهو محددنا الكمي.
سنستخدم أمر grep للبحث عن النمط المحدد في النص مثل: 
يصفي أمرgrep 'abcd'  جميع الأسطر التي تحتوي على سلسلة "abcd".

 يتيح خيار “E-” في أمر grep استخدام تعبيرات عادية موسّعة لمطابقة نمط grep -E 'abcd\[0-9]' لتصفية النص مثل abcd\34 أو abcd\47 وما إلى ذلك. 

تمرين تدريبي 4: استخدام التعبيرات العادية (regexes)

بالنسبة لتلك التمارين، نستخدم ملفات السجل التالية (كما هو الحال في القسم أعلاه)

استخدم grep والتعبير العادي '\\x[a-fA-F0-9]' لتصفية الطلبات من access.log إن جي آي إن إكس التي تحتوي على حمولة مشبوهة. تتطابق التعابير العادية '\x[a-fA-F0-9]' مع تسلسل يبدأ بحرف '\x' متبوعًا بثلاثة أحرف سداسية عشرية بالضبط (0-9 أو a-f أو A-F). كم عدد السطور الموجودة؟ 

باستخدام نفس عامل التصفية، حدد عنوان بروتوكول الإنترنت الذي يقدم معظم الطلبات 


فحص error.log عن طريق تشغيل `more  error.log`. يمكنك إيقاف هذا الأمر باستخدام ctrl+c أو الضغط على المفتاح "q" لإعادة موجه الأوامر. باستثناء أخطاء "إشعار المعالج المسبق للنصوص الفائقة (PHP)". ما نوع الأخطاء الحرجة التي يمكنك العثور عليها في السجل؟

استبعد أخطاء المعالج المسبق للنصوص الفائقة من سجل الأخطاء واعثر على الأسطر التي يتم فيها رفض الطلبات بسبب قواعد الأمان. ما هو الملف الحساس الذي تم طلبه؟

التمرين التدريبي 4: الإجابات

التمرين 1:
الإجابة الصحيحة:  113 سطر
الأمر أو الأوامر الواجب تنفيذها:grep -E '\\x[a-fA-F0-9]' access.log|wc|awk '{print $1}' 

التمرين 2:
الإجابة الصحيحة: 222.186.13.131  19  سطرًا
الأمر أو الأوامر الواجب تنفيذها:grep -E '\\x[a-fA-F0-9]' access.log|sort|awk '{print $1}'| sort | uniq -c | sort -nr

التمرين 3:
الإجابة الصحيحة: أخطاء مصافحة طبقة مآخذ التوصيل الآمنة
الأمر أو الأوامر الواجب تنفيذها: 
more error.log
cat error.log|grep -v "PHP"|grep crit

التمرين 4:
الإجابة الصحيحة: .git/config
الأمر (أو الأوامر) الواجب تنفيذها: cat error.log|grep -v "PHP"|grep forbidden
اختبار مهارة
سيكون اختبار المهارة هذا أسهل بكثير إذا كنت قد أكملت التمرين التدريبي أعلاه أولًا.
قُدّم لك سجل وصول إن جي آي إن إكس من موقع ويب يتعرض للهجوم كي تحقق فيه: https://czesiek.net/files/access.log .
حدد مسارًا مشبوهًا يتم استهدافه، واستخرج عناوين بروتوكول الإنترنت التي ترسل طلبات مشبوهة واكتشف البلدان التي توجد فيها عناوين بروتوكول هذه (يمكنك استخدام قواعد بيانات جيو آي بي (geoIP)، الموضحة بمزيد من التفصيل في مسار تعلم البنية التحتية الضارة لهذا الغرض). يمكنك استخدام أدوات واجهة سطر الأوامر القياسية مثل awk وgrep وsort وuniq. لمعرفة أرقام AS والبلدان نوصي باستخدام خدمات البحث ذات الصلة عبر الإنترنت.
تلميح: يوفر ipinfo.io طريقة مريحة للبحث عن تفاصيل بروتوكول الإنترنت، ويمكنك استخدام curl للحصول عليها.


## Learning Resources

{{% resource title="Log Files - Apache" languages="English" cost="Free" description="An overview of how to read log files in the Apache web server." url="https://httpd.apache.org/docs/2.4/logs.html#accesslog" %}}

{{% resource title="Understanding the Apache Access and Error Log" languages="English" cost="Free" description="Two pieces on how to read the Apache web server’s logs." url1="https://www.keycdn.com/support/apache-access-log" url2="https://www.dataset.com/blog/apache-error-log-detail/" %}}

{{% resource title="Server-side logging" languages="English" cost="Free" description="An analysis of logs within the Microsoft IIS server." url="https://learn.microsoft.com/en-us/windows/win32/http/server-side-logging-in-http-version-2-0" %}}

{{% resource title="IIS Error Logs and Other Ways to Find ASP.Net Failed Requests" languages="English" cost="Free" description="Another look at IIS logs and how we can search for application errors therein." url="https://stackify.com/beyond-iis-logs-find-failed-iis-asp-net-requests/" %}}

{{% resource title="Configuring logging on nginx" languages="English" cost="Free" description="Documentation by the NGINX web server on how to configure and work with logs." url="https://docs.nginx.com/nginx/admin-guide/monitoring/logging/" %}}

{{% resource title="A guide to NGINX logs" languages="English" cost="Free" description="An overview of different NGINX logs and their formats." url="https://trunc.org/learning/nginx-log-analysis" %}}

{{% resource title="Security Log: Best Practices for Logging and Management" languages="English" cost="Free" description="An analysis of when logs are useful, how we can analyze them, and what policies we can create around them." url="https://www.dnsstuff.com/security-log-best-practices" %}}

{{% resource title="OWASP logging cheat sheet and vocabulary" languages="English" cost="Free" description="A guide from OWASP on what purpose logs should serve, how we should analyze them, and a standard vocabulary for them." url1="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html" url2="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html" %}}

{{% resource title="Keep Sensitive Data Out of Your Logs: 9 Best Practices" languages="English" cost="Free" description="Thorough logging can also end up including sensitive data, which could put users at risk. This guide looks at how we can adapt our logging practices to exclude sensitive data from logs." url="https://www.skyflow.com/post/how-to-keep-sensitive-data-out-of-your-logs-nine-best-practices" %}}
