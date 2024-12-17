---
style: module
title: Capture-the-flag exercise
description: We have also designed a capture-the-flag exercise in which learners
  can analyze a phishing email and the infrastructure it links to. The exercise
  can be used as an additional practice or skill verification exercise, and can
  be found here
weight: 10
---
We have also designed a capture-the-flag exercise in which learners can analyze a phishing email and the infrastructure it links to. The exercise can be used as an additional practice or skill verification exercise, and can be found below.

You are sitting in the bustling Press newsroom where you are working as an IT admin, sitting totally focused on your duties surrounded by glowing monitors. Your colleague Alia from Accounting rushes over with a concerned look on their face, who lets you know they forwarded an email claiming to be from PayPal which urges them to take immediate action due to suspicious account activity. The Press organization relies on PayPal for processing subscription payments. Your interest is instantly piqued as you recognize the potential of a malicious attack, and you get started on an investigation.

*This activity utilizes a sample email and landing page needed for this activity. Download the files here: {{< fontawesome "solid/download" >}} [CTF Materials](/files/ctf-materials.zip)*

### Question 1: What is the sender address of the email?

{{< question title="Instructions" open="true" >}}
Find out how the sender address would appear in the email client if the email is opened.
{{< /question >}}

{{< question title="Hints" >}}
There are multiple ways to view what the email would look like to the recipient. The most straightforward way is to open the file in a mail client, which is what we have done in the below examples. However in the context of a targeted threat this can be a bad idea, in case the file contains scripts which can exploit email clients, collect information about the device, or load external resources (like /media/uploads/tracking pixels) which disclose your IP to the attacker. In the case of this walkthrough it is safe to open the EML in your email client, however for live work consider some alternatives:

* Use an email client in a virtual machine which can be rolled back to a safe snapshot
* Open the file in a text editor and read the HTML content directly
* Rename the file to .mht and open in a web browser (consider using a sandboxed machine and connecting to a VPN to avoid IP collection from tracking pixels)
* Use an online service such as <https://www.emlreader.com/> or <https://www.encryptomatic.com/viewer/> to render the email. MXToolBox’s email header analyzer <https://mxtoolbox.com/EmailHeaders.aspx> (used later in this walkthrough) will also render HTML content if you include it in the pasted headers.
* Using an eDiscovery tool which can render EML files
* Self-host your own service to render EML files, such as <https://github.com/xme/emlrender>

In this walkthrough we will just open the email (paypal.eml) in an email program

![Windows Right-Click menu showing Open With -> Outlook Option](/media/uploads/CTF1_open_in_mail_program.png)

As we look into the email, we see the visible sender email address

![Image of an ostensible email from Paypal indicating suspicious account activity with a link to verify the account. The email is from paypal@service.com](/media/uploads/CTF2_sender_address.png)
{{< /question >}}

{{< question title="Answer" >}}
The sender email is: paypal@service.com
{{< /question >}}

### Question 2: What is the subject of this email?

{{< question title="Instructions" open="true" >}}
As we continue to review the email, we look for more characteristics which could be indicative of spam or malicious messages. Let’s look at the subject and some other signs within the text! If you are reading the email in a text editor, you will find it in the Subject: line.
{{< /question >}}

{{< question title="Hints" >}}
![A screenshot of the email in question, highlighting its subject line](/media/uploads/CTF3_email_subject.png)

Here are some key trigger points to watch out for in a phishing email:

* Sense of urgency
* Weird opening, does not address you by name
* Grammar errors
* The sender address or URLs within the email are obfuscated or do not match the website the email claims to be from
{{< /question >}}

{{< question title="Answer" >}}
The email subject line is: _We called you, you didn't answer_
{{< /question >}}

### Question 3: What is the action requested?

{{< question title="Instructions" open="true" >}}
When we look at a potentially malicious email, we also need to figure out what the sender wanted us to do. What action do you assume that the sender wanted the recipient to do?
{{< /question >}}

{{< question title="Hints" >}}
![A screenshot of the email with "detected suspicious activity", "payments have been suspended", "complete account verification" and the call to action link saying "resume payments" all underlined](/media/uploads/CTF4_email_actions.png)
{{< /question >}}

{{< question title="Answer" >}}
Click on one of the two links within the email.
{{< /question >}}

## Recognizing the Threat

### Question 4: Defang the “Confirm” Link

{{< question title="Instructions" open="true" >}}
As we go deeper in the analysis, the first step to do is to understand the difference between suspicious links. When we analyze potentially suspicious links, we typically defang them–this means replacing some characters so that the link cannot be accidentally clicked or does not trigger any automated link- or virus-scanning mechanisms. Defanging links is considered best practice in security investigations. Defanged links will not automatically turn into clickable links but still retain the original link information, for instance hxxp[://]www[.]google[.]com.
{{< /question >}}

{{< question title="Hints" >}}
You can defang a link in a text editor. Here we will use [CyberChef](https://gchq.github.io/CyberChef) to defang the URL as we will use CyberChef for other steps as well. CyberChef is a web application with a huge number of functions which can help you with analyzing security-related data. Here’s a [very brief introduction](https://udel.codes/cyberchef.html) to its layout and functions.

As part of this exercise, play around with CyberChef and defang the “please confirm” link from the attached email.

![A screenshot of how to right click on an email and then press "copy link"](/media/uploads/CTF5_copylink.png)
First, we copy the hyperlink from the email.

![A screenshot of CyberChef, with "defang" being typed into its search bar](/media/uploads/CTF6_defang.png)
Then, we take the “Defang URL” input from CyberChef and drag it into the “Recipe” section

![A screenshot of CyberChef successfully defanging an email](/media/uploads/CTF7_defanged.png)

Once we’ve pasted the URL into the input section in CyberChef, it will automatically output a defanged version thereof.
{{< /question >}}

{{< question title="Answer" >}}
hxxps[://]d[.]pr/mUxkOm
{{< /question >}}

### Question 5: Use CyberChef to extract and defang all the links in the email

{{< question title="Instructions" open="true" >}}
You can use CyberChef to perform a lot of different analysis tasks. This time, find and describe a workflow to easily extract and defang all of the links from the email.
{{< /question >}}

{{< question title="Answer" >}}
You can use a ‘recipe’ – or a series of connected steps –in CyberChef to carry out a more complex analysis. To obtain and defang all the URLs in the message, all you need to do is run a recipe with the “extract URLs” and “defang URLs” workflows and paste the full content of the email (copied from a plain text editor) as input. If you were to tick the “unique” checkbox under “extract URLs”, you will see that the results will differ from those from the screenshot, and it will only output a single URL, the same one you defanged above. The fact that there is just one URL, repeated many times, within the email is great news for us–it will make our analysis much more straightforward. \

![A screenshot of a CyberChef recipe which first extracts all the URLs from a text file and then defangs them](/media/uploads/CTF9_cyberchef.png)
{{< /question >}}

## Passive Investigation of URLs, Hostnames, and IP Addresses

### Question 6: When was the URL defanged in question 4 submitted to VirusTotal?

{{< question title="Hints" >}}
For the next few questions, we will use [VirusTotal](https://www.virustotal.com/)**.** It’s an online service that acts like a security scanner for suspicious files and URLs. Think of it as a digital inspector. You can upload a file or provide a URL, and VirusTotal scans it with antivirus engines and website checkers from dozens of different security companies. It also performs some additional analysis. This gives you a quick overview of whether the file or website is likely to be malicious. It's a valuable tool to help you identify potential threats before you open an attachment or click on a link. It also contains metadata about files which may be helpful. Here we will use the entry history to find out when a malicious indicator was first observed.

Paste the URL from question 4 into VirusTotal (this time, you need to paste the full URL, not the defanged version). Go to “details” tab and look at the URL capture history.

![A screenshot of VirusTotal history, showing three dates: first submission, last submission, last analysis](/media/uploads/CTF9_VirusTotal.png)
{{< /question >}}

{{< question title="Answer" >}}
08/20/2018
{{< /question >}}

### Question 7: What does VirusTotal give as the serving IP address for the URL defanged in question 4?

{{< question title="Hints" >}}
Also looking through the “details” tab in VirusTotal, look up the serving IP address.

![A screenshot of VirusTotal showing an HTTP response, with the final URL and serving IP address given](/media/uploads/CTF10_VirusTotalIP.png)
{{< /question >}}

{{< question title="Answer" >}}
52.89.102.146
{{< /question >}}

### Question 8: how many vendors on VirusTotal detect this URL as malicious?

{{< question title="Instructions" open="true" >}}
When viewing the URL in VirusTotal, look up all the details under the “detection” tab. For a deep dive into what VirusTotal means by detection and what its methodologies are, check out [its documentation](https://docs.virustotal.com/).
{{< /question >}}

{{< question title="Answer" >}}
5 Vendors
{{< /question >}}

### Question 9: In which registrar was the domain defanged in question 4 registered?

{{< question title="Instructions" open="true" >}}
In order to look up information related to a domain registration, we can use a whois lookup. You can conduct such a lookup either through a command line tool on your device or through a dedicated app.
{{< /question >}}

{{< question title="Hints" >}}
Here we use a whois website to extract it

![A screenshot of a WHOIS lookup of the d.pr domain](/media/uploads/CTF11_whois.png)
{{< /question >}}

{{< question title="Answer" >}}
Internet Technology Solutions
{{< /question >}}

### Question 10: Where is the serving IP that you identified through VirusTotal geographically located?

{{< question title="Instructions" open="true" >}}
IP addresses are loosely tied to geographical locations, such as cities or districts. There are many online services where you can input an IP address and learn more about where it’s most likely located. While this type of check is not perfect and can sometimes make mistakes, it can nonetheless be an important part of malicious infrastructure investigations.

It’s worth comparing the information you receive from a whois lookup with that you receive from IP location searches. You might learn that the IP address you are trying to investigate belongs to a VPN provider or a big tech company such as Google–if this is the case, then you will not learn much from those investigations; the IP location will likely correspond to one of those companies’ server farms and might have little to do with the location of the person or entity you’re trying to investigate.

![A screenshot of a geoIP lookup of an IP address, showing that it originated in Portland, Oregon](/media/uploads/CTF12_geoIP.png)
{{< /question >}}

{{< question title="Answer" >}}
Portland, Oregon, United States
{{< /question >}}

## Passive Investigation of Email Headers

### Question 11: what is the return path of the initial email you looked up?

{{< question title="Instructions" open="true" >}}
For the next few questions, we will be using a tool called [MxToolbox](https://mxtoolbox.com/). It’s a tool which can analyze email headers, hostnames, spam status, and much more. We will focus on its [header analyzer](https://mxtoolbox.com/EmailHeaders.aspx) feature, in which you can copy and paste all of the headers of an email (or even the whole email!) and run some basic analytics on them.
{{< /question >}}

{{< question title="Hints" >}}
First, open the email using a plain text editor of your choice and copy its content. Then, paste them into the MxToolbox’s “Analyze Headers” tool

![A screenshot of email headers being pasted into MX Toolbox Analyser](/media/uploads/CTF8_MX_analyzer.png)

Once you press “Analyze Header”, you can see the return path

![A screenshot of MX Toolbox giving a complex Return-Path based on the headers it analyzed](/media/uploads/CTF13_return_path.png)
{{< /question >}}

{{< question title="Answer" >}}
`paparazi@rjttznyzjjzydnillquh.designclub.uk.com`
{{< /question >}}

### Question 12: What are the first hop and SMTP server address of that email?

{{< question title="Instructions" open="true" >}}
Go to the file `mx-toolbox-header-analysis.pdf`, look into the relay information section.

![Another screenshot of the MX Toolbox analytics, with an initial relay highlighted](/media/uploads/CTF14_relay.png)
The address of the mail server

![Another screenshot of the MX Toolbox analytics, with the relay address highlighted](/media/uploads/CTF15_address.png)
{{< /question >}}

{{< question title="Answer" >}}
First hop: efianalytics.com 216.244.76.116

SMTP: `2002:a59:ce05:0:b0:2d3:3de5:67a9`
{{< /question >}}

## Active Investigation of Malicious Web Pages

### Question 13: What is the victim Id present in the code of the website?

{{< question title="Instructions" open="true" >}}
If the recipient of the email clicked on the link they would arrive at a landing page. Go to the file in the activity package to open “paypal.html”, look into the source code and search for the victimID. Use CyberChef to decode it to find a string of text.
{{< /question >}}

{{< question title="Hints" >}}
In this exercise, you will encounter a string of text encoded in Base64. Base64 is a technique for transforming text that has many purposes, but in this case aims to obfuscate a string of text: the string is still there, it’s just saved in a way that cannot be easily spotted by the human eye or by a simple text search. If this is the first time in your work you’ve encountered Base64, it’s worth reading [a little more about it and other obfuscation formats](https://anithaana3.medium.com/common-text-encoding-methods-for-code-obfuscation-9399757eb5c3). Malware authors like to obfuscate some text strings within their programs using a technique such as Base64 in order to make it more difficult to analyze.

CyberChef can encode and decode Base64 text.

We open once again the code attached of the phishing page (.html)

![A screenshot of an html file being right clicked in Windows Explorer, and then opened in Notepad](/media/uploads/CTF16_open_webpage_notepad.png)

we search for the victimID in the source code
![A screenshot of someone searching through the plain text file opened in Notepad and finding a data item called "victimID"](/media/uploads/CTF17_searchID.png)

Then we can paste the value we discovered into CyberChef. The tool has a magic wand feature which automatically detects and converts encoding–we could use that!

![A screenshot of CyberChef's magic wand feature](/media/uploads/CTF19_cyberchef_wand.png)

Yay! The magic wand detected that the input is encoded with Base64 and decoded it automatically, giving us the answer!

![A screenshot of CyberChef decoding Base64 input into plain text](/media/uploads/CTF18_cyberchef_result.png)


{{< /question >}}

{{< question title="Answer" >}}
Th1s_1s_pH1sh1ng_Em3il
{{< /question >}}

## Other resources and links

{{% resource title="Access Now helpline community documentation for responding to suspicious/phishing emails" languages="English" cost="Free" description="Client Receives a Suspicious/Phishing Email" url="https://accessnowhelpline.gitlab.io/community-documentation/58-Suspicious_Phishing_Email.html#" %}}

{{% resource title="List of all DNS record types" languages="English, Chinese, Japanese, Korean, Russian, Serbian, Ukrainian, Esperanto, Hungarian, Vietnamese, Italian, Spanish, French" cost="Free" description="Includes (almost?) all DNS record types." url="https://en.wikipedia.org/wiki/List_of_DNS_record_types" %}}

{{% resource title="Amnesty reports on phishing campaigns" languages="Multiple, depending on the report" cost="Free" description="A list of examples of how a targeted phishing campaign against human right defenders, activists and journalists looks" url="https://www.amnesty.org/en/search/phishing/" %}}
