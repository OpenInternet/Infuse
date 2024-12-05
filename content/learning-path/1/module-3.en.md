---
style: module
title: "Operational Security - Safe Handling of links and infrastructure"
description: >
  "As you go about investigating malicious phishing emails, attachments, websites, and other infrastructure, you will need to take some proactive steps to make sure that you keep yourself and the people you support safe. Be sure to study this skill and, if necessary, set up a safe environment before interacting with suspected malicious emails or web pages"
weight: 3
---

## Use Case

As you go about investigating malicious phishing emails, attachments, websites, and other infrastructure, you will need to take some proactive steps to make sure that you keep yourself and the people you support safe. You will also need to know what to advise the recipient of the messages whenever they are faced with such incidents, and how they can safely report it to you for handling without compromising themselves.
Be sure to study this skill and, if necessary, set up a safe environment before interacting with suspected malicious emails or web pages.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Demonstrate how to safely handle malicious emails and URLs during investigation of malicious infrastructure;
- Describe what steps they should take to prevent their IP address being leaked while conducting an investigation;
- Describe immediate next steps when you suspect that an account might have been compromised;
- Safely ‘defang’ URLs.

---

## Main Section 

Many phishing emails and similar messages do not just try to get the targeted person to click on a link but may also attempt to collect data about them (we discuss this in more depth in Subtopic 6). When conducting an investigation, it’s important to handle messages and other infrastructure carefully, so as to not reveal too much information about your identity, work and organization to an attacker, as well as to protect devices and accounts.

### Basic precautions

We typically divide analysis up into two components: passive (Subtopics 4 and 5) and active (Subtopics 6 and 7). Passive analysis should not include any contact with an attackers’ servers, whereas active analysis does.
It’s important for analysts to understand what types of activities directly interact with attacker infrastructure and can therefore be detected. Once analysts gain this understanding, they will be able to adapt the methods they use to relevant threat models.

We recommend consider the following operational security precautions when you conduct your analyses:

### Safe Environment

Depending on the sophistication of the attacks which you are dealing with, the sensitivity of the machine, data, and accounts you are utilizing, and even the sensitivity of your investigation activities and personal identity, you may need to adopt an appropriate safe environment for conducting investigation work. Consider the following suggestions when building your safety solution:

- Use a reputable VPN while doing any activity which might entail interacting with attacker infrastructure in order to avoid your actual IP from being logged by the attacker.
- Select and utilize a specific browser on your device for this work which you pre-configure to reduce risk of malicious active content from running on your device. [NoScript](https://noscript.net/) is an excellent browser extension available on Firefox and Chromium-based browsers which will prevent the execution of scripts, allowing you to inspect any active content before execution.
- Consider using a separate device for your analysis, or a separate virtual machine. This device and virtual machine should not be connected to any work or personal accounts, network attached storage or sensitive networks. It should not contain any sensitive information (unless you discover such information during your investigation).
- Set up a special email address where targeted persons can forward suspicious emails they receive. (If they receive suspicious messages from a platform like WhatsApp, they can send a screenshot of the message via email). This email address does not need to be unique for each targeted person. Make sure this account is protected by a unique password and two-factor authentication and prevent your email client from automatically loading external content such as images. This is because images that are loaded from a server can alert the attacker that they are being investigated, and turn an investigation from a passive to an active one (see subtopic 6 for more detail);
- Ensure you have a protected PC with up-to-date anti-malware protection in place to guard your computer handling malware analysis against any potential spillover of malware infection to your computer.

### Defanging URLs

As you document potentially malicious URLs, it is common practice to ‘defang’ the URL so that the applications you use for notes or documentation do not automatically generate clickable links which unintentionally lead you (or anyone you are collaborating with) to click the link or otherwise instigate traffic to the URL from your working machine. Some applications, for example messengers, also automatically preview links (and fetch the content from a server in order to do so). Defanging URLs prevents them from doing so.

This is commonly done by replacing the protocol section of the URL with an invalid equivalent, and enclosing dots in the URL with [square brackets]. For example:

| From live URL                                                      | To defanged URL                   |
|--------------------------------------------------------------------|-----------------------------------|
| https://www.malicious-site.com                                     | hxxps://www[.]malicious-site[.]com |
| ftp://192.168.12.20                                                | fxp://192[.]168[.]12[.]20          |


This can be done manually using a text-only editor such as NotePad, Textedit, or Gedit. Also see utilities like [https://defang.me/](https://defang.me/) or search for Defang tools in [CyberChef](https://gchq.github.io/CyberChef).

### Communicating with targeted persons and immediate next steps during an incident

If you suspect that an attacker might have gained access to the targeted person’s email or messaging account or is monitoring their machine (the former might have been the result of a successful phishing attack, while the latter might be caused by malware, caused for example by running a malicious attachment), ask the targeted person not to use this machine and account until you can figure out what is going on. If possible, communicate with the targeted person through another account and another device—for example, Signal or WhatsApp on their personal device.

If you suspect that a targeted person’s accounts might have been compromised, ask them to immediately change their passwords and force the account to log out of all other locations (most major services have a setting like this). This should stop the attacker from having any further access to the account. It will, however, alert them that the targeted person has realized that something is wrong. The attacker might already have downloaded a significant amount of data from the account.

If you suspect that a targeted person’s device has been compromised, ask them to change their account passwords on a different device and avoid using that device until an investigation is complete. Follow the steps outlined in the Malware Detection learning path.

## Practice

- With your VPN turned off (if it is safe to do so), go to a website which displays your IP address (those websites are easy to find, just look up ‘what is my IP’ in your favorite search engine). Think about what would happen if an attacker were to learn your IP address: does your IP address belong to a company or an office? \
  Following this, turn on a reputable VPN and once again check what your IP address is. \
  Finally, [read up on DNS leaks](https://mullvad.net/en/help/all-about-dns-servers-and-privacy) and test if your VPN is leaking DNS information (most VPNs have their own website which tests for DNS leaks, you can use your favorite search engine to find it!).
- Defang the URL for [https://www.wikipedia.org/](https://www.wikipedia.org/). Paste the defanged URL into your web browser address bar and press enter. If it refuses to load the webpage, then it means that you have properly defanged the URL (the web browser might instead try to look for the defanged URL in a search engine, this is completely normal behavior).

## Skill Check

- Work with a peer or mentor who will send you a web bug token generated [here](https://canarytokens.org/generate#). Open this web bug on your analysis machine. Once you do, your peer or mentor will receive some information on the email address with which they registered the web bug, including your IP address and a brief description of your web browser called a user agent. Discuss those results with your peer or mentor: if you were conducting an active analysis, the attacker would likely see those details as well, since you would be using this machine to connect to servers they control.

## Learning Resources

{{% resource title="NoScript" languages="English" cost="Free" description="A browser extension for Firefox and Chromium-based browsers, which allows you to selectively block or allow the execution of JavaScript. When looking at potentially malicious websites, it enables you to load the site while disabling much of its potentially damaging functionality." url="https://noscript.net/" %}}

{{% resource title="Defang.me" languages="English" cost="Free" description="A tool which automatically defangs URLs and IP addresses." url="https://defang.me/" %}}

{{% resource title="CyberChef" languages="English" cost="Free" description="A comprehensive tool for converting between different formats, also able to automatically defang URLs and IP addresses." url="https://gchq.github.io/CyberChef/" %}}


