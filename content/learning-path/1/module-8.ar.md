---
style: module
title: Documenting Findings
description: This module teaches you how to write up and share the results of
  your investigation and include appropriate indicators of compromise (IoCs)
weight: 8
---

## Use Case

There can be several reasons why civil society organizations do not report or share their findings. They might lack the time to do so, they might be concerned about sharing malware samples or indicators of compromise, or they might simply lack the expertise on how to responsibly document the findings of a malware investigation. This subtopic addresses the last point.

Prior to completing this subtopic, make sure that you’ve thoroughly read through and understood the two writeups (by Amnesty/HRW and by Bellingcat) outlined in Subtopic 7.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Perform a quick write-up of an investigation
- Select appropriate indicators of compromise and share them responsibly
- Understand how best to disseminate the findings of a write-up

---

## Main Section 
As you investigate the malicious infrastructure associated with a particular phishing campaign or other threat, it is imperative that you keep detailed notes. You may forget small details that turn out to be important. Furthermore, the threat actors are likely to change their infrastructure (e.g. turn off servers) during your investigation! Therefore, you should keep notes on both what you’re doing and what you discover. Include all information you collect, including things like DNS/whois query results, attacker emails and web pages (full source and screenshots), etc. The exact format of these notes isn’t important, but they should be comprehensive.

As your investigation proceeds, you’ll want to start keeping more distilled analysis notes keeping track of your significant findings. You can also document these in your detailed notes, but it’s good to also track them separately, as your detailed notes are likely to get very long and unwieldy. Your significant findings notes should contain your conclusions about various pieces of infrastructure and the connections between them. Think of it as containing things that you’re likely going to want to keep in your final report. As with your unfiltered notes, the format of these notes isn’t significant, but many people like to use [Maltego](https://www.maltego.com/) to document connections.

Your report should also contain specific technical indicators: those might include URLs, IP addresses, email addresses, phone numbers, and other identifiers which are used by or which describe the attackers. Those indicators are here to support other analysts or targets: if they come across a campaign with the same or similar indicators, it's likely that it was conducted by the same threat actor or could be used to identify whether they were also targeted. These indicators are usually listed within or at the end of a threat report or compiled in an online repository.

Your indicators should be specific enough to be helpful to other analysts: if an attacker used Google Drive to host files, then using "Google Drive" as an indicator might be too vague (instead, you could talk about how the attacker used third party services in the more descriptive parts of your report). Don't forget that indicator lists are rarely comprehensive: they only capture the URLs and IP addresses that you have observed during your investigation. It's very likely that attackers will be using many more which you have not seen.

In some places analysts will distinguish between indicators of attack (IoAs), which suggest that an attack is being attempted, and indicators of compromise (IoCs), which suggest an attack was successful. Much of the industry, however, including the human rights space, uses the term 'indicators of compromise' (IoCs) to describe both situations.

Finally, when you’ve concluded your investigation, it’s time to write your report.

The report should contain a factual account of what happened and what infrastructure was used, as well as your impressions and conclusions. Generally, this investigation will be triggered by some sort of social engineering attack (via email, SMS, WhatsApp, etc). In that case, you’ll want to note any conclusions you’ve made about the nature of the attack. Was it targeted? If possible, can you identify others who received the message? What techniques did the attacker use to try to trick the targeted person?

Depending on the audience, you might also want to note the targeted person’s actions and any conclusions you’ve made about the attacker’s awareness of the situation. Did they follow links, enter sensitive information into attacker-controlled websites, download attachments, open attachments, etc.? How likely is it that the actions of you and the targeted person were tracked? Note that if the targeted person entered credentials or opened malware, a deeper investigation and remediation effort (outside the scope of this learning path) is warranted.

Once you’ve created a report and shared it with your client (if applicable), there are a couple things you can do with it:

- Share it with your fellow civil society digital defenders
- Publish it to the world

You can do either or both of these things. If you were working with a client whose device was compromised, you will of course need to ensure that they’re comfortable with you sharing the report. Best to get their approval in writing.

If you are a member of an organization like [CiviCERT](https://www.civicert.org/), that’s a great place to share your findings. The other members are likely to read your report, provide feedback, and take action on it.

You can also publish your findings on a blog or somewhere like GitHub. This requires little effort, but also can be limited in its impact. However, your report may be invaluable to someone who is investigating a similar set of infrastructure.

## Skill Check

Take either one of the phishing emails or targeted malicious emails which you discussed in Subtopic 2 or a domain you found on [PhishTank](https://phishtank.org/) (be careful when analyzing the latter, assume that all domains listed there are malicious). You could also use an email or domain you analyzed in a prior subtopic. Imagine and plan out what a report describing the wider campaign behind those emails would look like. Since the report will not be shared with anyone, feel free to make up some details. Afterwards, write down some notes which would summarize/ outline that report.

If you are working with a peer or a mentor, discuss those notes with them. They should check for a few things:

- Do the notes accurately describe the type of attack?
- Does the report contain and present information in a way which could be useful for others in the civil society space, for example by including indicators of compromise (IoC)?
- Does the report summarize its findings in a responsible way, for example by defanging URLs and redacting sensitive data about targeted persons?

## Learning Resources

{{% resource title="Maltego" languages="English" cost="There is a community version free for non-commercial use, Pro versions cost 999 USD a year" description="Maltego can be used for visual representation of findings and make it easier to identify connections between different indicators." url="https://www.maltego.com/" %}}

{{% resource title="Guccifer Rising? Months-Long Phishing Campaign on ProtonMail Targets Dozens of Russia-Focused Journalists and NGOs" languages="English" cost="Free" description="This is a very thorough report on a major phishing campaign. Don’t feel the need to make yours this complete, but feel free to take inspiration from it." url="https://www.bellingcat.com/news/uk-and-europe/2019/08/10/guccifer-rising-months-long-phishing-campaign-on-protonmail-targets-dozens-of-russia-focused-journalists-and-ngos/" %}}

{{% resource title="Iran: State-Backed Hacking of Activists, Journalists, Politicians" languages="English" cost="Free" description="Another great write-up and a summary of an investigation. Once again, yours will likely be less thorough but this one is a great example." url="https://www.hrw.org/news/2022/12/05/iran-state-backed-hacking-activists-journalists-politicians" %}}


