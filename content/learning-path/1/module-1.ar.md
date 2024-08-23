---
style: module
title: Triage - Deciding when to investigate
description: When you receive or are forwarded a suspicious message, conduct
  initial triage in order to determine if it is indeed malicious, to figure out
  the best rapid response for the targeted recipient(s) if it is, and to
  determine if further investigation is needed. For most messages, it’s enough
  to conduct basic heuristics to separate untargeted from targeted threats and
  to identify harm-reducing actions
weight: 1
---
## Use Case

When you receive or are forwarded a suspicious message, conduct initial triage in order to determine if it is indeed malicious, to figure out the best rapid response for the targeted recipient(s) if it is, and to determine if further investigation is needed. For most messages, it’s enough to conduct basic heuristics to separate untargeted from targeted threats and to identify harm-reducing actions.

## Objectives

After completing this subtopic, the practitioner should be able to differentiate between legitimate emails, untargeted spam or phishing emails, and targeted ones based on several heuristic indicators.

- - -

## Foundation Knowledge

The practitioner should be able to recognize common phishing email techniques and attacker objectives. They should be able to spot common telltale signs of a phishing message. If you need to brush up on this topic, check out Jigsaw’s [Phishing Quiz](https://phishingquiz.withgoogle.com/).

Low-tech approaches to determining if a message was actually sent by a person you know are often the simplest and fastest way to determine if that message is authentic. A great example of such a low tech approach is following up with the sender of a potentially suspicious email (assuming you know them) on another communication medium like an instant messenger to make sure that it was indeed them who sent the email and that it’s legitimate.

Also check out these two articles with examples of tactics and deceptive techniques commonly used in phishing messages: [6 Common Phishing Attacks and How to Protect Against Them ](https://www.tripwire.com/state-of-security/6-common-phishing-attacks-and-how-to-protect-against-them)and [5 Common Phishing Techniques (vadesecure.com)](https://www.vadesecure.com/en/blog/5-common-phishing-techniques).

## Practical Triage Criteria

Spam and non targeted phishing messages are an unfortunate reality of the internet. Investigating messages and related malicious infrastructure is only a practical and useful exercise in a small set of cases. Consider the following criteria when deciding if it is worth spending time investigating the message and related infrastructure:

* Targeting: Has the message been customized (displaying social engineering and foreknowledge of the identity of the targeted person) to increase likelihood that they carry out the intended action (for example clicking on a link, downloading a malicious attachment)?
* Threat: What is the intended objective of the message/campaign? What is the risk/threat context of the targeted person, organization, or community?
* Value of Intervention: What is the value of investigating and intervening further? Would interrupting the attackers’ infrastructure have a worthwhile impact on stemming current or future attacks? What is the likelihood that the same malicious infrastructure will be reused? Would public exposure/attribution make them less likely to conduct further attacks? Would public exposure help alert other targets who may be compromised?
* Investment: How much time and how many resources did an attacker need to create that message? Did they for example spin up new domains and infrastructure?
* Uniqueness: Is the message unique? Can the same text be found by looking up quotes from the message on search engines?

A general rule is that *only targeted messages are usually worth investigating*. Many spam or phishing emails end up being quite low quality or sent en masse. Those are usually sent by adversaries who might have some financial motive but have not targeted the organization specifically due to its human rights or civil society work. They are therefore less likely to attack NGOs in the future, and a write-up of their activities would be of less benefit to the community.

Attackers who use lower quality or mass messaging are also likely to be caught by automated testing and rules and simply change messaging, in contrast to those who pursue targeted attacks which require a far greater investment. Adversaries who send targeted messages often have (geo)political motivations, and might use phishing as part of a wider hybrid campaign, which could also be directed at other NGOs. Investigating targeted messages can therefore often help uncover such broader campaigns.

⚠️ Remember, if you need additional help and do not feel confident that you are able to respond to the level of risk or analysis needs of a malicious message, reach out for help for instance to [CiviCERT Members ](https://www.civicert.org/)or through support providers listed at the [Digital First Aid Kit](https://digitalfirstaid.org/).

⚠️ While considering or conducting an investigation, ensure you balance harm reduction needs and support any targets to implement timely harm reduction actions, such as those listed at [Recover from possible account compromise (securityinabox.org)](https://securityinabox.org/en/communication/account-compromise/).

## Skill Check

Spend some time on the phishing quiz by [Shira](https://shira.app/) until you feel like you can comfortably pass the tests and accurately recognize phishing on several app categories.

## Learning Resources

{{% resource title="Shira by Horizontal" languages="English, Spanish, Mandarin" cost="Free" description="An online quiz with sample emails, where the user must decide whether they are malicious" url="https://shira.app" %}}

{{% resource title="Phishing Quiz by Jigsaw" languages="27 Languages" cost="Free" description="An online quiz with sample emails, where the user must decide whether they are malicious" url="https://phishingquiz.withgoogle.com/" %}}

{{% resource title="6 Common phishing attacks and how to protect against them" languages="English" cost="Free" description="A summary of some common phishing attacks, which also includes some more sophisticated methods used by attackers" url="https://www.tripwire.com/state-of-security/6-common-phishing-attacks-and-how-to-protect-against-them" %}}

{{% resource title="5 Common phishing techniques" languages="English" cost="Free" description="A look at some techniques attackers use to make phishing emails more convincing and occasionally escape detection" url="https://www.vadesecure.com/en/blog/5-common-phishing-techniques" %}}

{{% resource title="CiviCERT" languages="English" cost="Free" description="A network of civil society organizations and rapid response groups which focus on cyberattacks and similar threats" url="https://www.civicert.org/" %}}

{{% resource title="Digital First Aid Kit" languages="Arabic, Spanish, Farsi, French, Indonesian, Armenian, Kyrgyz, Burmese, Portuguese, Russian, Albanian, Thai, Ukrainian" cost="Free" description="A comprehensive guide supporting digital protectors who deal with a variety of different issues" url="https://digitalfirstaid.org/" %}}

{{% resource title="Recover from possible account compromise" languages="Arabic, Indonesian, English, Spanish, Farsi, French, Portuguese, Russian, Thai, Turkish, Vietnamese, Chinese, Tibetan, Khmer, Burmese" cost="Free" description="A guide on what immediate and long-term steps to take when an account has been compromised" url="https://securityinabox.org/en/communication/account-compromise/" %}}


