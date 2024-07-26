+++
style = "module"
weight = 4
title = "Application Logic and Related Vulnerabilities"
+++

## Use Case

There exist other types of vulnerabilities not covered in the above subtopics which could nonetheless be used to damage or gain unauthorized entry into a web app. We look at several of those below. This is the last subtopic which outlines vulnerability classes: once you’ve learned about all of them, you can move on to the next topics, which look into scanning your web apps for potential vulnerabilities and ensuring that they do not have any serious security holes.

## Objectives

After completing this subtopic, practitioners will be able to find weaknesses in web applications that relate to subverting the mechanisms of the application itself. These can relate to the application mechanism itself, the mechanisms of the server, or even quirks of web browsers.

They should also be able to find and exploit the following types of vulnerabilities:

- Business logic vulnerabilities
- Race conditions
- Excessive information disclosure
- Cross-site request forgery
- File upload vulnerabilities

---

## What are application logic vulnerabilities?

Application logic vulnerabilities are often described as bugs that allow a user of an application to subvert the mechanisms of an application system’s design, as opposed to attacking the application’s implementation. While this is true, the category is also frequently used as a catch-all for vulnerability classes that don’t neatly fit into another category. Some vulnerabilities very clearly exploit application logic. For example, if you have a money transfer function that truncates fractional cents when withdrawing money from the source account, but deposits those fractional cents into the target account, you can generate money by transferring funds back and forth. Others are much more tenuous, like supplying a PHP file to a form that’s supposed to accept a profile picture and then executing that PHP when you visit the page for the profile pic.

In any case, the vulnerabilities in this subtopic are all frequently present in web applications and should wrap up your understanding of common vulnerabilities.

## Business Logic Vulnerabilities

The name “business logic vulnerabilities” obviously originated in the area of testing commerce-related applications, but one can simply omit the word “business” from the name. We include it because the term is popular among resources that talk about application testing. In any case, these vulnerabilities are grouped together in that they relate more to the abstract mechanisms of data processing within an application.

Head over to the [PortSwigger Academy Business Logic Vulnerabilities topic](https://portswigger.net/web-security/logic-flaws) and complete the reading and labs.

## Race Conditions

Race condition vulnerabilities refer to bugs that allow an attacker to initiate some process, then perform some action or actions that are normally not allowed before the process completes. For example, consider a file-sharing site that allows you to upload files and duplicate uploaded files. To protect its users, the site scans uploaded files to see if they contain malware and deletes them if they do. Obviously, copies of files don’t need to be scanned, because all uploaded files have been scanned, right? Well, let’s say that, to improve site responsiveness, the process that scans (and deletes) uploaded files is run in the background on the web server. An attacker could upload a file containing malware and then immediately copy it on the site. Since the scan hasn’t been completed, the file will still exist on the server, so the copy will work. Once the scan completes, the original file will be deleted, but the copy will remain. There are many more types of race conditions vulnerabilities; this subtopic explores some of them.

Head over to the [PortSwigger Academy Race Conditions topic](https://portswigger.net/web-security/race-conditions) and complete the reading and labs.

## Excessive Information Disclosure

Information disclosure vulnerabilities occur when an application or its infrastructure sends sensitive information back to the browser. This information may be displayed in the browser window, or hidden in non-rendered HTML. Common places where this information can leak out are via error messages, HTML comments or hidden fields, extraneous files on the web server, etc. While in most cases these information leaks are not severe, in some cases the information revealed can have catastrophic impacts on the web application’s security, such as if a secret 3rd party API key is revealed.

Head over to the [PortSwigger Academy Information Disclosure topic](https://portswigger.net/web-security/information-disclosure) and complete the reading and labs.

## Cross-site Request Forgery

CSRF (Cross-Site Request Forgery) is an interesting vulnerability arising from the interaction between websites and browsers. Consider a peer to peer payment service. It accepts GET requests like [http://victim.com/transfer?to-account=xyz&amount=123](http://victim.com/transfer?to-account=xyz&amount=123). It properly only allows authenticated users to transfer money by checking their session cookies. However, if an attacker posted a message in an online forum that contained an image link like `&lt;img src="http://victim.com/transfer?to-account=xyz&amount=123">`, what would happen? Every time someone viewed the post, their browser would see the image tag and try to load the image. It would send a request to victim.com, of course including the site’s cookies. If the user was already logged into the payment site, this would have the effect of transferring money to the XYZ account. The issue here is that HTML and JavaScript allow websites to cause users’ browsers to send requests to other sites, which by default include that other site’s cookies.

Head over to the [PortSwigger Academy Cross-site Request Forgery topic](https://portswigger.net/web-security/csrf) and complete the reading and labs.

## File Upload Vulnerabilities

This subtopic covers the case where an attacker can upload files to a website, perhaps for a profile picture, but the file is interpreted as code either on the client side (causing XSS) or on the server side (causing code execution). A common technique attackers use when exploiting this latter type is to upload a [web shell](https://en.wikipedia.org/wiki/Web_shell), a small script that takes a shell command form a user (typically via a URL parameter), executes the shell command on the server, and then returns the results.

If you are testing a site and wish to upload a web shell, it is very important that you put a password on it. Just because you can upload a file to the server, does not mean you can delete that file. You may find yourself in a situation of having to rely on the site owner to delete the file. Adding a password can be simple. There are [web shells available in many languages](https://www.kali.org/tools/webshells/), but here’s a simple PHP example:

```
<?php echo system($_GET['command']);?>
```

To add a password to this, we merely change it to this:

```
<?php
_if_ (_$\_GET_['password'] _==_ 'A super-secret password only I know.') {
    _echo_ system(_$_GET_['command']);
} _else_ {
    http_response_code(404);
}
?>
```
This will ensure that anyone who stumbles upon your testing-focused web shell won’t be able to use it for their own nefarious purposes.

Make sure to read and understand how a web shell works before you upload it. You want to be sure that the shell is only going to execute what you ask it to, and won’t talk to any other servers.

## Learning Resources

{{% resource title="Web shells" languages="English, Kurdish, Chinese, Korean, French, Lombard, Hindi, Malayalam" cost="Free" description="Overview of what a web shell is and its potential use in attacks." url="https://en.wikipedia.org/wiki/Web_shell" %}}

{{% resource title="Webshells | Kali Linux Tools" languages="English" cost="Free" description="Overview of webshells available in a default Kali Linux installation." url="https://www.kali.org/tools/webshells/" %}}

## Skill Check

PortSwigger academy contains a series of labs which you can use to test and validate your skills. For each of the following topics, complete 1-3 of the ‘practitioner’ level labs:

- [Business logic vulnerabilities](https://portswigger.net/web-security/all-labs#business-logic-vulnerabilities)
- [Race conditions](https://portswigger.net/web-security/all-labs#race-conditions)
- [Information disclosure](https://portswigger.net/web-security/all-labs#information-disclosure)

If you are working with a peer or mentor, explain to them how each attack works and how you would find and demonstrate exploitability for similar vulnerabilities in a site you were testing.
