+++
style = "module"
weight = 5
title = "Finding Web Application Vulnerabilities"
+++

## Use Case

One way or another, every web application accepts and processes untrusted input. This input usually comes from end users and their browsers but may also come from other websites or backend systems. Depending on where this information flows, the processing of the data may have undesirable effects on the website or its users.

## Objectives

After completing this subtopic, practitioners will be able to find vulnerabilities in a real website, as opposed to understanding individual vulnerabilities in isolation.

---

Having completed the previous subtopics, you should have a good understanding of individual vulnerabilities. While this might be enough to guide you in fixing vulnerabilities or perform forensics in a web application breach, it is not enough if you wish to find those vulnerabilities in a web application. While the previous labs were focused puzzles challenging you to activate a vulnerability in a single input, in a real web application most inputs will not be vulnerable to anything. Your challenge will be to find those rare inputs that are vulnerable.

To assist in this, it’s helpful to have a mental framework to guide your testing. This will serve to organize your thoughts and notes about what you’re testing, and can also serve as a checklist. Do not underestimate the power of a checklist! Checklists are the reason air travel is safe, and [introducing checklists to the intensive care units of a US state’s hospitals dropped infections rates by ⅔, and over a year and a half saves over 1,500 lives](https://www.newyorker.com/magazine/2007/12/10/the-checklist). Any complex, error-prone task will benefit highly from a checklist, and testing web applications is extremely complex and extremely error prone.

## Practice targets

For this subtopic, you will be testing a deliberately vulnerable web application. You will attempt to find all the vulnerabilities in the application and document those vulnerabilities.

To start with, you will need an application to test. One (bad) option would be to find some random website on the internet and try to break into it. This is not a good idea for two reasons. The first is that it’s unethical (even if your intentions are good, what if you accidentally damaged the site?) and, depending on where you live, probably illegal. The second is that, especially starting out, it’s impossible to know the difference between a site being secure, and you not being good at testing.

The solution to this is to practice on a [site that is intentionally vulnerable](https://owasp.org/www-project-vulnerable-web-applications-directory/). These sites are built expressly for people to practice finding and exploiting vulnerabilities. They are ethical and legal to test (most are downloadable for you to test on your own computer), and have certain known vulnerabilities, so that you can evaluate your success. For this subtopic we will be using [the OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) vulnerable web application.

## Organizing your testing

Next up, you will need a methodology to guide your testing. As you gain experience, you will likely start to develop your own framework and procedures that work well for your preferred work style. However, at first, you will need one to get you started. For this learning path, we will use [a methodology written by Tanner Prynn](https://github.com/tprynn/web-methodology), which is about in line with the standards used by most professional web application penetration testing practices. This methodology document is a good compromise between brevity (compare its 23 printed pages to the 465 of the OWASP testing guide) and completeness. It doesn’t contain every possible vulnerability, nor does it have complete guidance for testing the vulnerabilities it does cover, but it should be enough to let you leverage the expertise you have.

In addition to having a framework and checklist of what you’ve tested, it’s extremely important that you keep detailed notes. Structured notes like a checklist only go so far. Here are some examples of how to use free-form notes:

- Perhaps you’re in the middle of some focused testing and notice some odd site behavior. Don’t interrupt your focused testing, take a note and investigate the odd behavior later.
- Perhaps you don’t understand how a portion of the site works; take a note of that. If you’re working with the site owner, you can ask them a bunch of questions at once instead of bothering them throughout the day. Or, perhaps the way that part of the site works will become clear as you move through the rest of the site.
- Perhaps you find a place to input data, but it’s not immediately obvious where that data is used. Take a note of it. Perhaps you will find where that data pops out later; if so, you’ll need to look at both web pages when testing that input.
- Always keep notes on any places where the site isn’t working properly. You will need those for your report.
- Sometimes you’ll be _sure_ that a particular input is vulnerable to something, but you will struggle to find out what or how. Write down what you’ve tried, then move on. A few hours or a night’s rest may give you a new perspective.

## Reporting

Finally, in order for your hard work to be useful to anyone, you need to document the vulnerabilities that you find. Generally you will be testing someone else’s website and will be producing some sort of report, whether formal or informal. Regardless, some of the primary goals or the report should be to communicate:

- What was tested
- What _wasn’t_ tested, and why
- For each vulnerability found:
  - Where the vulnerability was located
  - How to trigger the vulnerability for later reproduction
  - What the risk/security impact of the vulnerability is
  - Recommendations for fixing the vulnerability

Typically, reports will have an introductory section that talks about what was and wasn’t tested, and then another section containing details of each vulnerability found. Let’s dig into each section.

The introductory section will usually contain information about the tested application. Details such as the URL of the application, environment it was tested (e.g. production vs staging), and the date range in which the testing was performed are all important, allowing the website developers to contextualize the testing against their development and release cycles.

It’s also important to include information about the testing goals. For some tests, the goal might be to only test for vulnerabilities that might result in a complete takeover of the web server infrastructure. For others, the goal might be to perform a very thorough and complete test. For most web application tests, the test must be completed within a particular amount of time, and the goal is to identify as many and as impactful vulnerabilities as possible in that time. Including this information straddles the line between describing what was tested and what wasn’t tested.

Finally, if any types of tests were excluded, any parts of the site weren’t tested, or if there were any other restrictions that prevented the testing goals from being achieved, it’s important to note these in the report. That way, the site owners will not be aware of areas which could contain unknown vulnerabilities.

Web application security assessment reports will typically have another section that lists the details of each vulnerability found. This is the most important part of the report, and it’s important that it be clear and understandable. Usually this takes the form of a list for each vulnerability that includes things like:

- Location: A URL and a parameter, just a URL, and/or a line of code (if known). All of these will help developers find the code containing the vulnerability. Note that some vulnerabilities may exist in multiple places, in which case it’s usually fine to document multiple locations. In some cases, a vulnerability may exist throughout the website. In others, it might exist in too many places to document, but not everywhere. In any case, the goal is clarity; the reader should understand which of the above cases exists.
- How to trigger the vulnerability: Often referred to as “reproduction steps,” this is a description of how to trigger the vulnerability. This is invaluable to development teams trying to fix the vulnerability. In some cases, this can be simple as a URL (e.g. something like “Visit [http://victim.com/search?q=&lt;script>alert(‘xss’)&lt;/script>](http://victim.com/search?q=)), in other cases multiple stages of setup may be required. Ideally the reproduction steps should be clear and reproducible.
- Risk rating: Risk ratings are somewhat subjective and often require data that’s not readily available to the person performing the testing (such as the relative importance of this particular website to the site owner). However, they should be at least internally consistent within a report. Usually a rating scale is used, such as:

  - Critical: Extremely severe vulnerabilities that can result in an easy compromise of the application, such as remote code execution or SQL injection exploitable by anyone over the internet. If, in finding a vulnerability, your first thought is “how is this application not mining Bitcoin or sending spam?” it’s probably a critical risk.
  - High: Severe vulnerabilities that result in a less complete compromise and/or are more difficult to exploit. Examples might be SQL injection that’s only exploitable by internal users, most authorization vulnerabilities, or [wormable XSS](<https://en.wikipedia.org/wiki/Samy_(computer_worm)>). If your first thought upon finding a vulnerability is to let the site owner know right away, it’s probably high risk.
  - Medium: Vulnerabilities whose exploitation would only result in a partial compromise of the application, or have a high impact but are very hard to exploit (such as a timing attack that would require many billions of requests). Most XSS and CSRF vulnerabilities, and partial information disclosure (such as minor authorization issues or most source code disclosure) fall under this rating. Typically these are vulnerabilities that are important to fix but not an emergency.
  - Low: Vulnerabilities that do have an impact on the application but that impact is quite minor. Typically these are things like very minor information disclosures, issues that make exploitation of other vulnerabilities somewhat easier (like a lack of rate-limiting), or a nonconformance to best practices that has no real impact.
  - Informational: These include both vulnerabilities that are not actually exploitable but could potentially become issues in the future, functional bugs with no security impact, or other non-security issues.

  Sometimes a more structured method will be used to arrive at a risk rating, such as [CVSS](https://www.ibm.com/docs/en/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss). Note that such methods are either inflexible enough that they sometimes generate risk ratings that don’t reflect reality, or flexible enough that they don’t provide any meaningful consistency. For more guidance on determining risk ratings, see [the OWASP risk rating methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology) and the risk rating guidelines for bug bounty programs such as [Bugcrowd](https://bugcrowd.com/vulnerability-rating-taxonomy).

- Recommendation: As someone who should know more about web security than the site owner, you probably have some good advice about how to fix a particular issue. Generally, you will not know enough about the application internals to provide specific guidance, but in some cases you may. Usually, though, you should provide general advice, for example to use output encoding to fix XSS, or parameter binding to fix SQLi. Note that in many cases the site owners may not be able to exactly follow your advice. This is just a reality of application development and generally not something you should take personally.

While the above represents a reasonable minimum amount of information to include in a report, it’s fine (and often good) to include more. Professional security assessment companies sometimes produce reports that are available to the public. Reading those can provide you with inspiration for your own reports, as well as insights into vulnerabilities that can exist and their risk ratings. [This GitHub](https://github.com/juliocesarfort/public-pentesting-reports/tree/master) contains a large repository of public reports. Note that many public reports do not include vulnerability details, but some (such as the following) do:

- [Bishop Fox - Winston Privacy](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Bishop%20Fox/Bishop%20Fox%20Assessment%20Report%20-%20Winston%20Privacy.pdf)
- [Cure53 - 1Password](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Cure53/Cure53-1PW18-report.pdf)
- [DoyenSec - Gravity Platform](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/Doyensec/Doyensec_Gravitational_GravityPlatform_Q22019.pdf)
- [iSEC - phpMyAdmin](https://github.com/juliocesarfort/public-pentesting-reports/blob/master/iSEC/NCC_Group_-_phpMyAdmin.pdf)

One last note on reporting: it is very important that you document findings in your report as you test. Typically, new testers will want to keep on testing, thinking that it’ll be easy to write up the report later. This is false. They finish their testing then struggle to complete their report, often needing to go back and do more testing in order to complete their report. It may seem inefficient to stop testing and write up a vulnerability in your report, especially if you have to update that vulnerability later. However, it’s more efficient to do exactly this.

## Learning Resources

{{% resource title="The Checklist" languages="English" cost="Free for first articles from the publication, later ones require subscription" description="An article about the importance of using checklists in various professions." url="https://www.newyorker.com/magazine/2007/12/10/the-checklist" %}}

{{% resource title="OWASP vulnerable web applications directory" languages="English" cost="Free" description="A collection of web applications with known vulnerabilities for testing web assessment and penetration testing skills." url="https://owasp.org/www-project-vulnerable-web-applications-directory/" %}}

{{% resource title="Methodology for high-quality web application security testing" languages="English" cost="Free" description="A comprehensive list of issues to review when assessing the security of web applications." url="https://github.com/tprynn/web-methodology/wiki" %}}

{{% resource title="Samy (worm)" languages="English, Arabic, Chinese, Indonesian, Lombard" cost="Free" description="An example of a malicious code exploiting XSS vulnerabilities." url="https://en.wikipedia.org/wiki/Samy_(computer_worm)" %}}

{{% resource title="An overview of CVSS" languages="Arabic, Bulgarian, Catalan, Czech, Danish, German, Greek, English, Spanish, Finnish, French, Croatian, Hungarian, Italian, Hebrew, Japanese, Korean, Kazakh, Dutch, Norwegian, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Serbian, Swedish, Thai, Turkish, Vietnamese, Chinese Simplified, Chinese Traditional" cost="Free" description="A quick look at the Common Vulnerability Scoring System (CVSS), used to rate the severity of vulnerabilities." url="https://www.ibm.com/docs/en/qsip/7.5?topic=vulnerabilities-common-vulnerability-scoring-system-cvss" %}}

{{% resource title="OWASP risk rating methodology" languages="English" cost="Free" description="Describes OWASP's methodology for rating risks of vulnerabilities and exploits." url="https://owasp.org/www-community/OWASP_Risk_Rating_Methodology" %}}

{{% resource title="Bugcrowd vulnerability taxonomy" languages="English" cost="Free" description="Bugcrowd's approach to tracking risks of vulnerabilities." url="https://bugcrowd.com/vulnerability-rating-taxonomy" %}}

{{% resource title="Public penetration testing reports" languages="English" cost="Free" description="A public repository of penetration testing reports." url="https://github.com/juliocesarfort/public-pentesting-reports/tree/master" %}}

## Practice

The bulk of this learning path is this practice. Here you will pull together all of the techniques you learned in prior subtopics to find vulnerabilities in a real web application. You should expect this to take you some time. Typically, it would take a skilled practitioner up to a week to fully assess an application like Juice Shop, and you are not yet a skilled practitioner. You may find yourself struggling; that’s normal. Resist the temptation to look up walkthroughs or answer keys, or to look at the following sections of this learning path. The struggle is a natural and important part of the learning process.

1. [Install Juice Shop](https://hub.docker.com/r/bkimminich/juice-shop/#docker-container) (using Docker is the easiest method)
2. By default, Juice Shop has dangerous vulnerabilities disabled. Those are the most important vulnerabilities to find! You’ll want to [change the configuration](https://pwning.owasp-juice.shop/companion-guide/latest/part4/customization.html) to set safetyOverride to true. While you’re at it, also include all the configuration flags in [quiet.yml](https://github.com/juice-shop/juice-shop/blob/master/config/quiet.yml).
3. Prepare your testing environment:
   - Burp or whatever proxy you prefer
   - One or more browser profiles for testing
   - A methodology to refer to
   - The beginnings of a report
   - Your notes documents
4. Start testing! Remember to be methodical, keep detailed notes, and document vulnerabilities as you find them. Remember that there may be vulnerabilities that don’t exist in the site, inputs that aren’t vulnerable to anything, and multiple instances of some types of vulnerabilities.

You shouldn’t expect to find every instance of every vulnerability. Try for it, but don’t be too disappointed when you don’t. Also, try not to second-guess yourself too much about whether or not you tested thoroughly enough. It is [literally impossible](https://en.wikipedia.org/wiki/Computability_theory) to confidently know that you’ve found all the vulnerabilities in all but the most limited applications.

Instead, go through the methodology and try to thoroughly test the website. If you have things to revisit from your notes, revisit them briefly, but don’t spend a ton of time on those things. Remember, this is just a practice.

## Skill Check

If you have a mentor, review your practice report with them. You will probably find it useful to look at one or more of the write-ups that contain vulnerabilities that other people have found, [here's one](https://pwning.owasp-juice.shop/companion-guide/latest/part2/README.html). Note that Juice Shop contains a bunch of challenges. The challenges mainly involve exploiting vulnerabilities. The best thing to do is to have your mentor give you hints on the vulnerabilities you missed, for example what page they’re on, then try to find them yourself. If you’re really stuck, have your mentor walk through the vulnerability with you.

If you don’t have a mentor, you can self mentor for this subtopic. You can simply perform the above activities. Instead of getting a hint from your mentor, briefly glance at the challenges, and try to figure out the associated vulnerability. Again, if you’re really stuck, there are numerous walkthroughs, both written and in video format.
