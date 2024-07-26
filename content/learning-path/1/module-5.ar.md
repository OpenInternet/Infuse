---
style: module
title: "Passive Investigation - Analyze email headers"
description: "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus."
weight: 5
---

## Use Case

There is far more to emails than meets the eye. The subtopic will teach you how to** analyze the extensive metadata** which documents an email’s origin, the servers it traveled through, information about possible spam checks, and much more. This metadata can form a crucial part of any in-depth investigation into potentially malicious emails.

Use this skill after or alongside the [Triage](#subtopic-4-passive-investigation-analyze-urls-hostnames-and-ip-addresses) subtopic within this learning path. Some of these skills may be necessary as part of the triage process in order to decide if a message is suspicious.

Since email headers can contain references to other domains and infrastructure, practitioners should first be familiar with Subtopic 4, which looks at analyzing domain and IP info, prior to tackling this one.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Extract full headers from an email that they have received or are analyzing;
- Analyze the extracted headers, paying particular attention to
  - The identity of the server or servers which sent the email;
  - Any information about SPF or DKIM data which those headers contain;
  - The possibility that any of the information in the header was spoofed

---

Every email has headers, which contain crucial metadata about the sender, recipient, and email itself. In this section, we will look at email headers, how you can analyze them, and how emails could be spoofed. This requires some background knowledge

## Foundation Knowledge

Read the resources and documents below to familiarize yourself a bit with (or recap your knowledge on) email headers, SPF, and DKIM.

- Understand [what email headers are](https://support.google.com/mail/answer/29436?hl=en) and how we can view them in multiple systems
- Understand the basics of email spoofing and using SPF and DKIM to combat it
  - Learn about email spoofing / learn to identify spoofed emails
    - [https://docs.sendgrid.com/glossary/spoofing](https://docs.sendgrid.com/glossary/spoofing)
  - Learn about the Sender Policy Framework and how it aims to prevent sender address forgery.
    - Use dig / doggo to lookup a valid SPF record (you can do so by [running the dig command with the txt argument](https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool)), analyze its content (see [here](https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain) for a guide) and answer the following questions.
      - What is the SPF version used?
      - Which domains are authorized email senders for the domain?
      - Which mechanism (or policy) was used for all “other” senders?
      - Are there any other mechanisms (or policies) defined in the record?
    - Use [https://mxtoolbox.com/spf.aspx](https://mxtoolbox.com/spf.aspx) to conduct a lookup and test on an SPF protected domain. You can look up the records for your own organization, for example, by checking its main domain.
  - Learn about DomainKeys Identified Mail (DKIM) and how, as an authentication standard, it is used to prevent email spoofing.
    - [https://docs.sendgrid.com/ui/account-and-settings/dkim-records](https://docs.sendgrid.com/ui/account-and-settings/dkim-records)
    - Use [https://mxtoolbox.com/dkim.aspx](https://mxtoolbox.com/dkim.aspx) to conduct a lookup on a DKIM authenticated domain. You can look up the records for your own organization, for example, by checking its main domain.
- **(Advanced) **Familiarize yourself with various techniques and mechanisms spam filters use to identify spam / spoofed emails.
  - Look at the list of available modules (and selectors) supported by RSPAMD [https://rspamd.com/doc/modules/](https://rspamd.com/doc/modules/)

## Analyzing headers

The [Nebraska GenCyber Team created a quick and relatively comprehensive course on email headers](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers) : we recommend it to all who want to learn about the topic.

As you analyze headers, you will learn quite a bit about the different domains involved in setting up the email. Once you have a list of those domains, you can use the same tools we used in the previous section (dig, whois, geoIP, and others) to learn more about them.

Systems administrators who use workplace domains such as Google Workspace and Microsoft 365 often have access to powerful logging and log search tools: they can use those to search their systems for identifiers which were found in email headers (such as suspicious domains), which can help them figure out who, if anyone, has been targeted in their organization. See [Google’s](https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA) and [Microsoft’s](https://learn.microsoft.com/en-us/exchange/monitoring/monitoring) documentation on searching through logs. Do note that those search features are usually restricted to business or enterprise accounts.

--- 

## Practice

After reading through all of the materials in the [Nebraska GenCyber email header analysis](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/) course, do the exercises linked therein. The site has a link issue, with the exercises often being unavailable directly on it, but they can also be downloaded [here](https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers).

## Skill Check

Find an email in your inbox or spam folder. Alternatively, ask for a peer or mentor to send you the headers of an email which they have recently received. Analyze the headers of the email using the same techniques as were outlined in the practice exercise, including by loading them in the [Google Admin Toolbox Message Header tool](https://toolbox.googleapps.com/apps/messageheader/). Then, answer questions 1, 2, 3, and 5 outlined in [the investigation section](https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#investigation) of the Nebraska GenCyber email header analysis course, this time using the headers from the email you found rather than the email attached to the course.

## Learning Resources

{{% resource title="What are email headers?" languages="English" cost="Free" description="A good introduction to email headers. Highlights three important groupings of email headers. Includes a list of step-by-step guides for different MUAs." url="https://mailtrap.io/blog/email-headers/" %}}

{{% resource title="Viewing full email headers" languages="Multiple" cost="Free" description="How to view email headers in multiple email systems (Gmail, Outlook, Apple Mail, Thunderbird, etc)." url="https://support.google.com/mail/answer/29436?hl=en" %}}

{{% resource title="Checking SPF headers using the dig tool" languages="English" cost="Free" description="This piece offers a quick guide on how to check SPF headers using dig, a tool installed on most Unix-like systems." url="https://easydmarc.com/tools/spf-lookup#how-to-check-spf-record-via-command-line-via-dig-tool" %}}

{{% resource title="How to check and read a Sender Policy Framework record for a domain" languages="English" cost="Free" description="This piece shows how to check SPF headers using nslookup, an alternative tool to dig, and describes how to interpret the results." url="https://support.mailessentials.gfi.com/hc/en-us/articles/360015116520-How-to-check-and-read-a-Sender-Policy-Framework-record-for-a-domain" %}}

{{% resource title="The Nebraska GenCyber Team course on email headers" languages="English" cost="Free" description="A comprehensive course on how to analyze email headers when investigating potential cases of phishing." url="https://mlhale.github.io/nebraska-gencyber-modules/phishing/email-headeranalysis/#email-headers" additional_urls="Samples for exercises: https://github.com/MLHale/nebraska-gencyber-modules/tree/master/phishing/email-headers" %}}

{{% resource title="Checking email headers in Proton Mail" languages="English" cost="Free" description="A guide on how to check email headers in Proton Mail." url="https://proton.me/support/check-email-headers" %}}

{{% resource title="Viewing email headers on Zoho" languages="English" cost="Free" description="A guide on how to view email headers on Zoho." url="https://www.zoho.com/mail/help/mail-options.html#alink1" %}}

{{% resource title="Tools for analyzing email headers" languages="English" cost="Free" description="Links to several tools which can extract and dissect email headers, crucial for any analysis of potentially malicious emails." url="https://mxtoolbox.com/EmailHeaders.aspx" additional_urls="https://github.com/keraattin/EmailAnalyzer, https://github.com/umair9747/headmail, https://github.com/cyberdefenders/email-header-analyzer" %}}

{{% resource title="Introduction to email spoofing" languages="Multiple" cost="Free" description="Several articles describing email spoofing basics." url="https://en.wikipedia.org/wiki/Email_spoofing" additional_urls="https://docs.sendgrid.com/glossary/spoofing, https://www.fortinet.com/resources/cyberglossary/email-spoofing" %}}

{{% resource title="Evaluating 'Received' headers" languages="English" cost="Free" description="How to use email headers to find the server that sent the email." url="https://www.techlicious.com/how-to/how-to-tell-if-email-has-been-spoofed/" %}}

{{% resource title="Analyzing potentially forged 'Received' headers" languages="English" cost="Free" description="How to identify fake 'received' headers." url="https://luxsci.com/blog/analyzing-forged-email-message.html" additional_urls="https://www.linkedin.com/pulse/anatomy-phishing-email-whats-header-penelope-raquel-bise-" %}}

{{% resource title="Find messages with Email Log Search" languages="English" cost="Documentation free, tools only available to business & enterprise users" description="Describes how administrators of Google business and enterprise accounts can monitor message logs." url="https://support.google.com/a/answer/2618874?hl=en&fl=1&sjid=3562339787569460230-NA" %}}

{{% resource title="Monitoring, reporting, and message tracing in Exchange Online" languages="English" cost="Documentation free, tools only available to enterprise users" description="Describes how administrators of Microsoft enterprise accounts can monitor message logs." url="https://learn.microsoft.com/en-us/exchange/monitoring/monitoring" %}}


