---
style: module
title: Website Logging for Security
description: Website logs can be crucial in identifying potential attacks and
  attackers. We look at how to effectively use them
weight: 2
---

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


**\[a-z\] range** - Matches a character in the range "a" to "z". Case sensitive.

I.e. \[g-s\] matches a character between g and s inclusive

abcdef**ghijklmnopqrs**tuvwxyz

**\[A-Z\] range** -  Matches a character in the range "A" to "Z" . Case sensitive.

**\[0-9\] range** - Matches a character in the range "0" to "9". Case sensitive.

We can also use **quantifiers** to match  the specified quantity of the previous token. {1,3} will match 1 to 3. {3} will match exactly 3. {3,} will match 3 or more.

\[a-d\]\{3\} matches any sequence of exactly three characters within the given range, each of which can be any lowercase letter from 'a' to 'd'. So, it would match strings like 'abc', 'bda', 'cad', etc. 



Some characters have special meanings within regexes these characters are:

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

The “`-E`” option in the `grep` command enables the use of extended regular expressions for pattern matching `grep -E 'abcd\\[0-9]{2}'` for filtering text like `abcd\34, abcd\47` etc.

### Practice exercise 4: using regular expressions (regexes)

For those exercises, we use nginx log files from [this collection](https://github.com/OpenInternet/Infuse/blob/main/learner-assets/nginx%20and%20apache%20logs.zip) (same collection as the other files in this practice section)

1. Use grep and the ` '\\x[a-fA-F0-9]{3}'` [regex](https://en.wikipedia.org/wiki/Regular_expression) to filter requests from nginx access.log containing a suspicious payload. The regex` '\\x[a-fA-F0-9]{3}'` matches a sequence starting with '`\x`' followed by exactly three hexadecimal characters (0-9, a-f, or A-F). How many lines are there?
2. Using the same filter determine which IP address is making the most requests
3. Examine` error.log` by running `more  error.log`. You can quit this command with ctrl+c or press the “q” key to return command prompt. Excluding "PHP Notice" errors. What kind of critical errors can you find in the log?
4. Exclude PHP errors from the error.log and find the lines where requests are denied due to security rules. Which sensitive file has been requested?

{{< question title="Practice exercise 4: answers" >}}

Exercise 1: \
Correct answer: 131 lines

Command(s) to execute: `grep -E '\\x[a-fA-F0-9]{3}' nginx_access.log|wc|awk '{print $1}' `

Exercise 2:

Correct answer: 222.186.13.131 19 lines

Command(s) to execute: `grep -E '\\x[a-fA-F0-9]{3}' nginx_access.log|sort|awk '{print $1}'| sort | uniq -c | sort -nr`

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
