+++
style = "module"
weight = 3
title = "Authentication and Authorization"
description = "Many web apps will only allow particular users to view certain pieces of content and require them to log in or prove their identity in other ways. This subtopic looks into authentication and authorization, and possible vulnerabilities therein"
+++

## Use Case

Many web apps will only allow particular users to view certain pieces of content and require them to log in or prove their identity in other ways. Adversaries who want to access sensitive data will often try to bypass those restrictions and attempt to view information they are not allowed to see. This subtopic looks into the idea of authentication and authorization, and possible vulnerabilities therein.

## Objectives

After completing this subtopic, practitioners will be able to find weaknesses in web applications that allow them to partially or completely bypass those applications’ authentication systems or abuse authentication to disclose information about a site’s users.

They should also be able to find and exploit the following types of vulnerabilities:

- Authentication
- Authorization

---
## Main Section
### What are authentication and authorization vulnerabilities?

Authentication and authorization are two sides of a coin, and are primarily responsible for protecting the confidentiality and integrity of data in an application. Authentication is the process of validating that a user is who they claim they are, which authorization ensures that the user only has access to the data and capabilities that they are meant to. While data validation attacks may allow an attacker to circumvent an application’s access control mechanisms (e.g., downloading an entire database with SQLi), authentication and authorization features directly implement access controls.

#### Authentication

For applications that don’t rely on a 3rd party (e.g., sign in with Google/Facebook/etc) for authentication, they usually implement their own authentication systems. Unfortunately, user authentication is quite subtle, and also very important. Thus, there are likely to be subtle and/or catastrophic weaknesses in authentication systems, as developers make the same mistakes over and over. Although the possible range of vulnerabilities is unlimited, there are a few common ones, which we’ll explore in this subtopic.

Head over to the [PortSwigger Academy Authentication topic](https://portswigger.net/web-security/authentication) and complete the reading and labs.

#### Authorization

It is very rare for web application frameworks to automatically provide authorization services for developers, so those developers have to implement their own systems consistently. Although authorization controls are typically very simple, they are extremely easy to overlook in places. Like implementing authorization controls, testing for authorization controls is simple in concept, but requires very high consistency.

Generally, authorization controls are broken down into vertical and horizontal controls. Vertical authorization ensures that users only have the capabilities for which they are authorized. An example of this might be that submitters on an online ticketing system should not be able to access the admin interface. Horizontal authorization ensures that users should only be able to access data for which they are authorized. An example might be that submitters to a ticketing system should see their own ticket history but not those of others.

While testing for authorization, it’s very efficient to have multiple browser profiles (or even different browsers) open at once, each with a different logged in user. That way, if you want to see if User A has access to a page that only User B should be able to see, you can simply paste the URL into User A’s browser session. Other checks (such as POST requests) may be involved, but are still much faster with multiple browser profiles.

Head over to the [PortSwigger Academy Access Control topic](https://portswigger.net/web-security/access-control) and complete the reading and labs.

## Skill Check

PortSwigger academy contains a series of labs which you can use to test and validate your skills. For each of the following topics, complete 1-3 of the ‘practitioner’ level labs:

- [Authentication](https://portswigger.net/web-security/all-labs#authentication)
- [Access control vulnerabilities](https://portswigger.net/web-security/all-labs#access-control-vulnerabilities)

If you are working with a peer or mentor, explain to them how each attack works and how you would find and demonstrate exploitability for similar vulnerabilities in a site you were testing.
