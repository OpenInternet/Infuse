+++
style = "module"
weight = 6
title = "Interpersonal Skills for Web Application Security"
+++

## Use Case

When interacting with individuals and organizations who operate web applications, self-awareness is necessary to check the nature of the digital protector relationship, provide useful and not fear-mongering advice or services. It is critical to frame your technical work within a sound risk assessment of the reality of the web application and its users.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Self reflect on the digital protector relationship with a client within web application assessment work and reporting
- Simplify and filter findings and explain them in a way which makes sense to the needs and threat models of the organization and its stakeholders
- Maintain an awareness of the limits of your own knowledge and ability
- Communicate in a non fear-mongering way about vulnerabilities and weaknesses
- Conduct a broader risk analysis of a web application based on the political, social, economic, and technical realities which surround it.

---

Your work in web application security assessment must remain contextualized within the frame of the organization which operates or hosts the application, the people who utilize it (and of their devices), the interpersonal relationships you have with these people, the nature of the web application itself, the data stored or processed on it, the legal realities which prevail over the application, and a solid risk assessment of all these elements. Let’s unpack these elements and consider a self-critique of your role as a digital protector.

## The Role of digital protector in web application security assessment

Web application security assessment – and especially many of the elements of this and and subsequent linked learning paths which go beyond basic vulnerability scanning, version enumeration, and misconfiguration checks - is a highly technical and rarified skill set with a terminology which is inaccessible and difficult to understand both by lay users and even tech-savvy website administrators. Take a moment to reflect on your own knowledge level and your personal feelings about conducting this assessment and what you hope to communicate with your client. One of the golden rules of working as an effective digital protector: _the goal is not to impress others and make yourself appear superior - it is to provide effective assistance which reduces harm and risk while supporting the advocacy goals of your client_.

As such, it is important to filter and explain your findings within the context of a risk analysis of the web application itself. While finding many vulnerabilities and weaknesses may make you feel good as an analyst, sharing all of those with the client may create a lot of noise and potential stress for your client. Achieving the right balance can be more difficult than it first appears to achieve - not all security findings are equal to each other. It takes an understanding of the nature of the vulnerability, the attack chain which renders it meaningful, and the potential for harm which an exploitation of the vulnerability could have.

As an example, when using an automated security assessment tool such as ZAP (mentioned in more detail in the Website Assessment Learning Path), your scan of a website may reveal dozens or even hundreds of weaknesses and vulnerabilities. Providing this list to your client is less helpful unless you can explain how some of these findings _matter_ to their stakeholders and their operational and advocacy objectives. Do you understand the findings enough to be able to provide that filtering and explanation? It is also necessary to be cognizant of the limitations of our own understanding in the field. In case you can not properly assess whether a given vulnerability or weakness is important, you may leave a recommendation with your best interpretation and advice that they may need to look into it further.

### Risk Assessment with Web Applications

Organizations use web applications for various purposes. In some cases these will be straightforward information or brand dissemination purposes and have limited sensitive data involved. Even in these cases, leaked information about traffic and visitors and risks of implanting malicious content on the site can pose real harm to the visitors or the reputation of the organization.

In other cases confidential and mission-critical data may be processed by the application. As you proceed through these learning paths which focus heavily on technical skills, continually do a sense-check on the threat models which prevail over the application itself, the organization and people who operate it as well as those who utilize it, including consideration for the devices which they use to interact with it.

## Reporting and talking about vulnerabilities

Reporting vulnerabilities you’ve discovered can be difficult, especially if you’re new to it. We have created a brief overview of the reporting process in [Subtopic 5 of the Web Application Security Assessment learning path](https://docs.google.com/document/d/19v34droskAFgkp_qqcwiQLpc1hI1W-FjzHNV2QRBsaA/edit#heading=h.3b8ncrmhhmwt) and encourage all learners who need to write up reports to clients to look through it.

## Skill Check

Log in to DVWA again and open one of its pages. Set it to either low or medium security. Imagine that this page belongs to a client of yours and you need to brief them on the vulnerabilities, their potential impact, and necessary mitigations. You can do this exercise either:

1. By yourself, by writing a draft of an email which you would send to the client. If possible, share that draft with a peer or mentor later on, who will verify that it’s an appropriate and measured response.
2. With a peer or mentor, by role-playing the conversation you would have with the client. Debrief after the conversation, asking the peer for feedback on what you did well and where you could improve.
