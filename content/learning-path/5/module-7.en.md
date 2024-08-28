+++
style = "module"
weight = 7
title = "Automatic Vulnerability Discovery"
description = "In past subtopics, we looked at how to discover vulnerabilities by hand. Here, we explore tools that can help automate that process"
+++

## Use Case

This learning path has focused on manual discovery of vulnerabilities in web applications. This skill is vital for understanding the vulnerabilities and also gives you the tools to find them on any site. However, there are numerous tools that can help with vulnerability discovery and exploitation in web applications. These tools have both advantages and disadvantages and are best used in conjunction with manual testing. This subtopic reviews a number of freely available tools and how to use them effectively.

## Objectives

After completing this subtopic, practitioners will know how and when to appropriately use various web application vulnerability scanners, including:

- ZAP scanner
- sqlmap
- WPScan CLI

---
## Main Section
This subtopic explores three classes of web application automation tools. It will discuss what they do, what they’re good at, what they’re not good at, and how to get the most out of them. We’ll break the space down into three broad categories:

- Web app automatic testers
- Exploitation tools
- Web app vulnerability scanners

### Web application automatic testers

This first category is tools that do the same things that humans do to find new vulnerabilities in web applications. They go through the site, find inputs, send malicious data to those inputs, and try to detect when that data has triggered a vulnerability. One example of this type of web app scanner is SSP’s ZAP, but there are numerous others, including Burp Pro’s scanner, HCL AppScan, etc.

Typically, these tools work by first “[spidering](https://en.wikipedia.org/wiki/Web_crawler)” the target website, where they will follow every link on every page and attempt to build a complete map of the site. Then, they find every parameter that is sent to the server, and replace that parameter with various “[fuzz](https://en.wikipedia.org/wiki/Fuzzing)” substitutions. When each response comes back, the scanner will look for features that indicate a successful attack. For example, the scan engine might replace a parameter with <code>&lt;script><em>var</em> xyz<em>=</em>"abc";&lt;/script></code>. When the HTTP response comes back, the scanner will parse the pages’ HTML, and if it sees that script element as a JavaScript block in the page, then it knows that the input is vulnerable to XSS.

#### Scanner Strengths

People use web application scanners for good reason. They find vulnerabilities quickly and effectively. Experienced web application security testers will use scanners as part of their assessments, despite their years of experience. There are some things that web application scanners are very good at.

The biggest strength of these tools is finding vulnerabilities related to data validation. Scanners are excellent at finding mainstream data validation issues like XSS and SQLi, but also obscure issues like LDAP injections, XSLT, etc. The reasons for this are simple:

- Scanners don’t get tired or bored, they can submit thousands of requests and not “lose focus”
- Scanners can try every possible input they’re programmed to, including HTTP referer headers, cookies, extra parameters arbitrarily added to the ends of URLs, etc.
- Scanners have huge libraries of tests to try lots of permutations of each potential attack
- Data validation vulnerabilities are generally quite easy to recognize, with simple pattern matching or behavioral analysis that is easy to detect programmatically.

Some scanners even use unique fuzz strings for each input, so that they can detect input that’s entered in one place and shown in another. Generally, a properly configured scanner should find more data validation issues in less time than a highly skilled human.

Another area where scanners excel is in finding configuration issues, especially ones that exist in only a small subset of the site. If a site uses CSRF tokens in every form, but the developers forgot in one section of the site, a human tester is likely to overlook the error. However, a scanner will almost certainly find and report the missing token. As with data validation, scanners have huge batteries of tests that they run on every request and response.

#### Scanner Weaknesses

Despite their strengths, scanners also have multiple weaknesses. In some cases, it may not even be appropriate to use a scanner for testing certain sites. Here are some of the biggest problems with web app scanners.

##### Scan Completeness

There are numerous potential issues with the way scanners work that may cause them to not complete a full test against the site in a timely manner.

The first is that many sites require users to log in. Scanners can be configured with a logged in session ID, given a script that submits the login form, or other ways of authenticating. They can also be configured to detect when they’ve been logged out of the site. However, this configuration is often error-prone. If the scanner is configured improperly, it may not completely spider the site, or may not detect when it’s been logged out and not properly complete testing. In extreme cases, sites may have anti-automation features that make scanning nearly impossible.

Another issue is that scanners don’t always distinguish between pages that are completely different vs pages that merely look different. For instance, in an online forum, it’s easy for a human to see that each forum thread is really the same underlying page with different data. However, an automatic scanner might determine that two threads are entirely different web pages and that they must be tested separately. In large sites, sometimes scanners can get stuck testing one page that appears to be different pages to the scanner, and spend hours or days performing redundant tests.

On the other hand, there may be pages or parameters that the spider doesn’t detect for one reason or another. If the scanner hasn’t detected a parameter, or has missed sections of the site, then obviously it’s likely to miss vulnerabilities related to those pages or parameters.

All of these issues can be worked through with close observation of the scanner behavior and changing scan configurations. While it’s entirely possible to just point a scanner at a website and launch a scan, to get the best results, it’s important to at least complete Discovery and Authentication testing before launching a scan.

##### Scanner Destructiveness

One of the strengths of a scanner is that it runs very fast. This strength can cause problems, though.

If submitting a request ends up performing some action outside the site, then the scanner may make that action happen thousands of times. Examples of outside effects might include sending a SMS (which may cost the site owner money), sending an email (imagine someone opening their inbox to find tens of thousands of emails), printing an order ticket in a warehouse, etc.

Relatedly, some sites don’t have the resources to keep up with a scanner. Given how often independent media and civil society sites come under denial of service attacks, this might be an important thing to discover. However, the site crashing will prevent further vulnerability testing.

Both of these can be partially mitigated through discussions with the site owner and by paying attention during Discovery testing and configuring the scanner correctly. For instance, all major scanners have ways of excluding certain pages from scans and for controlling how fast they scan. However, the risk of a scanner impacting the site or its related systems can never be eliminated.

##### Vulnerabilities That Scanners Are Bad At Discovering

While scanners are great at discovering some sorts of vulnerabilities, there are other types that are nearly impossible for them to discover.

Chief among these are true business logic vulnerabilities. Scanners just execute scripts, and they don’t “understand” how sites are meant to work. No scanner will understand the significance of a rounding error in money transfers or the significance of omitting a supposedly required field in a form.

Relatedly, automated tools do not tend to do a good job at detecting authorization vulnerabilities. While there exist a variety of tools to assist with authorization testing, generally scanners do not automatically detect these sorts of vulnerabilities.

##### False Positives and Non-Issues

Scanners may also produce lots of results that aren’t useful. In some cases, the script to detect a vulnerability may be imperfect, resulting in the scanner reporting an issue where none exists. In other cases, the scanner may report things that the tool’s author may think are interesting or valuable, but are not significant in the context of the site you’re testing.

In all cases, you should manually reproduce and fully understand scanner findings before adding them to your report.

##### Using Scanners Effectively

Generally, web applications security assessment practitioners find that they’re more effective using a scanner than not. Since their strengths are so compelling, it’s worth one’s time to configure and monitor scans.

In all cases, you should complete Discovery and Authentication before using a scanner. Since you are new to the field, you should practice using a scanner on different websites and both read and understand your scanner’s configuration options and progress indicators. Try to understand how the site works before unleashing a scanner upon it.

Some practitioners will scan pages individually, skipping the “spidering” stage of a scan. This has the advantage of mitigating many of the issues of scanning, but also misses out on the ability of the spider to find content that you might have missed. It’s also more labor intensive. However, it can be very effective on sites that are hard for the scanner to spider and sites that are more fragile.

Another option is to scan the whole site at once. It’s generally good to use a separate web app user for this scan, so that garbage data from the scan doesn’t interfere with your regular testing. Also make sure that the account you use has full access to the site. While the scan is running, you should try to strike a balance between monitoring the scan closely enough to notice problems, but also spend most of your time doing manual testing.

In either case, you should not rely on the scanner entirely for data validation testing or any other vulnerability class. You should at least do a few tests on each input to the site and do some thorough testing on others. The scanner may have subtle problems testing the site that aren’t obvious.

### Practice: Using ZAP

ZAP (SSP’s Zed Attack Proxy) is an open-source alternative to Burp. Though most professionals prefer Burp Professional, ZAP is a quite capable proxy and includes a web application scanner. At this point you should be familiar with Burp Suite; the concepts are the same for ZAP, though the UI is quite different.

For this practice, we’ll be using ZAP’s scanner module. To get a feel for it, first, make sure you’ve got an instance of DIWA running, then simply open ZAP and click “Automated Scan”, put in the URL of your DIWA home page, and click “Attack”.

![A screenshot of ZAP as it opens](/media/uploads/web_security_assessment_ZAP1.png)

![A screenshot of ZAP as the user selects an automated scan. The URL to attack is 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP2.png)

Since DIWA is a small app, this scan should complete rather quickly. If nothing went horribly wrong, you’ll note that ZAP’s scanner found some issues. However, unless ZAP has changed significantly, the ZAP results may be somewhat underwhelming. There may be some small issues that ZAP found and you didn’t, but ZAP should’ve missed most of the big issues you found.

Let’s see if we can improve this. Click the “Quick Start” button in the secondary toolbar, and then the “&lt;” in the pane below. From there, click “Manual Explore”, put in the URL of your DIWA, and then click “Launch Browser”.

![A screenshot of ZAP and the "alerts" box that the service displays at the bottom](/media/uploads/web_security_assessment_ZAP3.png)

![A screenshot of ZAP as it manually explores the page for vulnerable JS libraries](/media/uploads/web_security_assessment_ZAP4.png)

Click around the site a bit, and make sure that when you’re done you’re logged into the site as an administrative user. Now, go back to ZAP and launch a scan by right-clicking the DIWA site in the left bar and launching an active scan with the default setup.

![A screenshot of ZAP as the user rights clicks on a site, and selects "attack" and "active scan"](/media/uploads/web_security_assessment_ZAP5.png)

![A screenshot of ZAP as the user gets ready to run an active scan on 127.0.0.1:8901](/media/uploads/web_security_assessment_ZAP6.png)

This scan should take significantly longer and give significantly different better results. Why did this happen? Launching the scan from a site you’ve visited in the “Sites” section gives the scanner a lot more information than the fully automated scan gets. In fact, the results you get from the scanner may differ greatly based on how you manually explore the site prior to running the scan.

Play around manually using the site and running scans a bit, and then compare the results from ZAP to the ones you obtained from manual testing.

- What issues did ZAP find that you did not?
- What issues did you find that ZAP did not?

Think about these. As part of skill validation, we’ll return to these lists.

### Exploitation Tools

The next class of automation we’ll cover in the subtopic is tools that aid in exploitation after you’ve found a vulnerability. While there exist several tools for this, the one most commonly used in web application security assessments is [sqlmap](https://sqlmap.org/). sqlmap is capable of detecting SQL injection of websites, but it truly shines in exploitation. Some blind SQL injection data extraction techniques can take several seconds to extract a single bit of information from a database. sqlmap can automate and optimize most forms of SQLi exploitation, saving you a ton of time.

The typical standalone use of sqlmap is to save the request that you used to identify SQL injection to a text file, and then [run sqlmap with that text file](https://github.com/sqlmapproject/sqlmap/wiki/Usage#load-http-request-from-a-file) using the -r flag. You would then specify the parameter to test with the -p flag, and then choose what data you wished to extract. Generally, it’s best to start with the -b option to simply retrieve the database information. sqlmap will attempt to confirm that the specified parameter is vulnerable to SQLi, and then choose a data extraction technique that allows it to extract data as efficiently as possible. It may be that data extraction is quite slow, in which case you should be careful about how much data you try to extract.

It’s worth noting that if you find several SQLi vulnerabilities in a site, they may allow for very different data extraction speeds. Any SQLi vulnerability that results in data from the database being included in the HTTP response will be much faster than one that only results in a success or failure (as in a login page).

An alternative to using sqlmap standalone is to use a proxy integration to run sqlmap directly from your proxy, such as with the [SQLiPy extension for Burp](https://portswigger.net/support/using-burp-with-sqlmap). This generally speeds up sqlmap configuration and saves you a few trips back and forth from the sqlmap documentation.

#### Using sqlmap

From the setup subtopic, you should have sqlmap installed and also a copy of DIWA. You should’ve already identified one or more SQLi vulnerabilities in DIWA. Using sqlmap, exploit one of those vulnerabilities to extract the DIWA database structure, and then extract the DIWA user database.

Note that sqlmap has capabilities and configuration options beyond what’s discussed here. Be sure to check out [the documentation](https://github.com/sqlmapproject/sqlmap/wiki/) for usage options.

### Web application specific vulnerability scanners

For purposes of this subtopic, we’re using the words “vulnerability scanner” to mean a tool that uncovers previously known vulnerabilities as opposed to a tool that automatically discovers new vulnerabilities. Examples of the former include tools such as Nessus and OpenVAS, while the latter include the scanner built into Burp Pro and ZAP.

While Nessus and OpenVAS try to be able to detect a wide range of vulnerabilities, others specialize. For instance, Nikto is a tool that attempts to find web servers configuration errors specifically. While Nikto has not been updated in years, and has generally been superseded by general-purpose vulnerability scanners, there’s one specific web application vulnerability scanner that stands out. It’s called WP Scan, and it’s focused on finding vulnerabilities in WordPress sites. Since WorsPress enjoys great popularity among civil society and independent journalism websites, it’s useful to cover in this learning path.

WPScan started out as open source software, and the [command-line version](https://github.com/wpscanteam/wpscan) still is, although there are [commercial options](https://wpscan.com/pricing/) for those who want other features. WPScan works in essentially the same way as other vulnerability scanners. Simplified, it sends requests to a server and tries to determine what versions of software are installed on that server. It then compares those versions to a database of vulnerabilities.

🛠️ Download [DVWP](https://github.com/vavkamil/dvwp) (you’ll want to use Docker to deploy it). If you’re on an Apple Silicon mac, you may have to add “platform: linux/amd64” to each service in the docker-compose.yml file.

Then use the WPScan CLI to find vulnerabilities on the site. If you installed WPScan via Docker on Mac or Windows, you won’t be able to use 127.0.0.1:31337 to reference DVWP for WPScan. This is because Docker is running in a VM, and the VM’s 127.0.0.1 is the VM, not your computer. Instead, find your computer’s LAN IP address (e.g. 196.168.0.xxx, 10.xxx.xxx.xxx, etc) and use that.

Although it’s not required, you’ll probably want to [sign up for an API key on the WPScan website](https://wpscan.com/register/) and use the key when scanning. If you don’t specify an API key, WPScan will identify the versions of WordPress and its plugins and let you know which ones are out of date. If you use the API key, it will tell you what vulnerabilities exist in the site.

## Skill Check

Discuss your use of ZAP’s scanner and sqlmap on DIWA with your mentor. Why did you find things that ZAP didn’t, and vice versa? Explain to them how you plan on using automation to help you test websites going forward?

## Learning Resources

{{% resource title="Web crawler" languages="47 languages" cost="Free" description="An overview of what a web crawler is and what it does." url="https://en.wikipedia.org/wiki/Web_crawler" %}}

{{% resource title="Usage" languages="English" cost="Free" description="A guide on how to use sqlmap." url="https://github.com/sqlmapproject/sqlmap/wiki/Usage" %}}

{{% resource title="Using Burp with sqlmap" languages="English" cost="Free" description="Instructions on how to integrate sqlmap with Burp for web application security testing." url="https://portswigger.net/support/using-burp-with-sqlmap" %}}

{{% resource title="WPScan" languages="English" cost="Free" description="An automated tool to scan WordPress sites for security flaws." url="https://github.com/wpscanteam/wpscan" %}}

{{% resource title="Damn Vulnerable WordPress" languages="English" cost="Free" description="A specially designed WordPress installation intentionally vulnerable for testing purposes." url="https://github.com/vavkamil/dvwp" %}}