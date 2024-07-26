+++
style = "module"
weight = 5
title = "Application Logic"
+++

## Use Case

In any interactive website that puts constraints on the types of actions that users can perform, it’s important that the site properly enforces those constraints to prevent unintended (and potentially) damaging actions by malicious users.

## Objectives

After completing this subtopic, practitioners should be able to do the following:

- Understand the concept of application logic vulnerabilities
- Identify and understand common subclasses of application logic vulnerabilities, including:
  - Client-side controls
  - Lack of rate limiting/multiple submissions
  - Rounding inconsistencies
  - Skipping process steps
  - Cross-site request forgery

---

Application logic vulnerabilities (frequently called business logic vulnerabilities) are a loosely assembled class of vulnerabilities that relate to the processes that the application itself performs, as opposed to underlying vulnerabilities in the technologies that the application uses. If this definition is confusing to you, you’re in good company. What constitutes a business logic vulnerability vs some other class is hotly contested. Infuse takes the position that the actual definition doesn’t matter that much, and that expediency is more important than precise definitions. We encourage you to maintain a focus on the vulnerabilities themselves, develop a view of vulnerability classes that makes sense to you, and maintain flexibility in taxonomy when discussing vulnerabilities with others.

This subtopic will cover a number of examples of vulnerabilities that arguably fall under application logic. As every application is slightly different, there are an infinite number of potential types of application logic vulnerabilities, but these examples cover a number of common ones.

## Client-side controls

Sometimes web applications will put constraints on what users can do in the application, but those constraints are enforced by the browser, either using JavaScript or built-in features of HTML elements. It is important that site developers realize that anything that is sent to the browser can be viewed, modified, or ignored by a moderately skilled attacker. Here are some example of common client-side controls that can be easily bypassed

### Input size

HTML input elements have an attribute maxlength that purports to limit the number of characters typed into an input field, e.g. `&lt;input type="text" name="firstname" maxlength="20">`. In this example, if a user tries to put more than 20 characters into the input field, the browser will prevent them from doing so. However, this is really just a polite request, as opposed to a real restriction. For example:

- The user could use the web inspector feature of their browser to modify the DOM to remove the length restriction.
- The user could save the web page locally, modify the HTML to remove the restriction, then load the page back into their browser.
- The user could read the HTML and manually craft an equivalent request in `curl` (a command line tool to download resources and transfer data using a variety of different protocols) to the one the form generates, only without the length restriction.
- The user could use a specialized tool called an intercepting proxy to capture the web page from the server before it’s sent to the browser, and remove the restriction before sending it onto the browser. Or the user could use the same tool to capture the browser’s request before it’s sent to the server, then edit the request to include a longer value and send it on to the server.

These bypass techniques generally work for all client-side controls. Keep them in mind as we cover other controls.

### Data content validation

Some developers will use JavaScript to restrict the values that can be entered into a form, or use HTML controls like radio buttons or drop-downs to restrict possible choices. Neither of these controls are effective. Using the same techniques as described above, attackers can remove the restrictions in their browser or bypass them to submit whatever data they want.

One common subclass of this type of vulnerability has to do with image resizing. Occasionally developers will have a feature on a website that resizes images server-side for optimal display at a certain resolution. Generally the URL will look something like [http://example.com/image?imgname=file.gif&width=640&height=480](http://example.com/image?imgname=file.gif&width=640&height=480). The way these scripts almost always work is to allocate in-memory storage to hold the resized image, scale the specified file to the new size, then return the image data to the browser. In the above example, the memory allocated would usually be a modest 1.2 megabytes. However, if a user sent a request with a width and height each of 100000, the server would attempt to allocate 10 gigabytes. By repeatedly sending such requests, an attacker can easily overwhelm even a powerful web server. Developers should at least enforce a maximum size on the server-side, and consider offloading the resizing process to an isolated server, so that overwhelming that server doesn’t affect the primary server.

### Disabling controls

Sometimes developers will use JavaScript to disable certain controls on a web page until certain constraints are met. For instance, perhaps a user needs to solve a CAPTCHA or wait a certain amount of time before submitting a form or clicking a link. Using the techniques above, an attacker can simply remove or bypass these controls.

### Sensitive data stored client-side

Sometimes developers will include sensitive data in a web page that is either secret, or controls something that should not be under user control. An example of the former might be attempting to restrict the data a user sees by hiding secret data using the CSS display=none attribute, enclosing it in HTML comments, or other mechanisms. The user can see this data by simply viewing the HTML source code of the web page. An example of giving client-side control by including data that should not be edited in hidden form fields. For instance, in the early days of e-commerce, web stores would frequently include an item’s price in a hidden HTML form input, which was then sent to a 3rd-party shopping cart. Using the techniques discussed in “input size,” users could easily modify the value in that hidden field, and buy it for whatever price they wanted. (You may remember that another example of this type of vulnerability was discussed under “horizontal privilege escalation” above.)

### Preventing client-side control vulnerabilities

There is nothing inherently bad about performing validation of input on the client-site, but developers must understand that they are merely UI conveniences. All validation and sensitive computations must be performed on the server, not on the client.

## Lack of rate limiting/multiple submissions

One class of application logic vulnerability is an implicit constraint on the number of times or frequency that a request may be sent. The former is often abused when the server performs expensive or abusable operations, such as insertions of data into a database with lots of indices, sending emails or SMS messages, or generally manipulating large amounts of data. The image resizing vulnerability discussed above would be another example of this. Developers don’t generally think of the rate at which users submit such requests as an application logic constraint to be enforced, and yet it arguably fits into the vulnerability class.

There are many methods of rate limiting requests, but the only ones that are truly effective are those that are enforced on the server site. For expensive operations, various queuing systems can be used to ensure that only a small number of such operations can be performed at once. More complex systems involving CAPTCHAs, per-account and per-IP address rate limiting may be required for frequently-abused operations.

A related case is requests that are meant to only be submitted once or a few times. One example might be a helpdesk site that lets users generate a ticket number. If a user can, for instance, register 20 tickets, and link them all to a specific case/ intervention, that will have a negative effect on the site owners!

## Rounding inconsistencies

One interesting class of vulnerabilities has to do with how various operations handle factions. This class of vulnerability has been featured in such movies as _Superman 3_ and _Office Space_, yet still occurs in numerous financial applications. If two applications support transferring money between each other, how then handle fractional cents may be important. If one application rounds off fractional cents, and another truncates them, then an attacker can repeatedly transfer 1.9 cents from the truncating application to the rounding application. Each transfer will cost the user 1 cent (1.9 truncated), and gain them 2 cents (1.9 rounded).

There are many ways to prevent vulnerabilities in rounding. The most straightforward is to reject transactions with fractional values. Alternatively, one can fully support fractional currencies. Finally, if rounding/truncating/etc is required, one has to do the hard work of ensuring that the handling of fractions is consistent.

## Skipping process steps

Often websites will have processes that are presented to users as a series of steps. While the intention of the developers may be to have the user go through each step, often the application will still allow users to complete the process without going through each step. Consider an online shopping site that allows users to add items to their cart, specify their delivery options, specify their payment information, and then finally complete the transaction. It is not unheard of for actual sites to perform the transaction if the user simply performs the first two steps and then goes directly to the complete transaction page. While this is rare in actual ecommerce sites, it’s not uncommon in various e-learning platforms, where the user can skip watching the boring videos and go directly to the page that marks their attendance as complete.

## Cross-site request forgery

Our last application logic vulnerability is often considered to be its own vulnerability class altogether, but we’re including it here for expediency. The essence of CSRF (cross site request forgery) is in some situations, web browsers will send a website the user’s cookies for every request to that site, regardless of the site that generated the request. If a malicious site, when a user visits the site, generates a fraudulent request to a target site, and the user is logged into the target site, then the target site will perform the requested action as the user, even though the user did not intentionally trigger the request.

As an example, consider a site where the password reset mechanism is that the site emails you a link that allows you to change your password. This is fairly normal. Imagine that the same site has a page that allows you to change your email address, and if you simply visit [example.com/changeemail?new=123@attacker.com](http://example.com/changeemail?new=123@attacker.com), it will change your email address to the specified address. Finally, imagine that attacker.com is set up to show page after page of photos of adorable animals. However, there’s a trick. The “next” button on the bottom of the page is actually the link above. If a user is logged into example.com, visits attacker.com, and clicks the “next” button, their email address will be changed, and the attacker can immediately reset the user’s password, gaining control of their account.

### Try it yourself!

Log into your DVWA and make sure the security level is set to low. Navigate to the “CSRF” page and try to generate a web page that will change the logged-in user’s password. Note that, if you have an up to date web browser, it might automatically restrict SameSite attributes of session cookies and the lab might not work there. If this happens, do not worry and skip this exercise–this is normal and desired behavior by the web browser.

Preventing CSRF

The most straightforward way of preventing CSRF is to explicitly set the SameSite attribute of session cookies to Lax or Strict, and to ensure that any request that changes data only changes that data if it’s submitted with HTTP POST. Other methods may work, but are more complex.

For more information about CSRF, see [the OWASP page about it](https://owasp.org/www-community/attacks/csrf) and the [OWASP CSRF protection cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

For an in-depth exploration of both CSRF and other application logic vulnerabilities, see the <span style="text-decoration:underline;">Web Application Security Assessment learning path</span>.

## Learning Resources

{{% resource title="Cross-site request forgery" languages="English" cost="Free" description="Guide to CSRF vulnerability, how it works, and preventive measures." url="https://owasp.org/www-community/attacks/csrf" %}}

{{% resource title="Cross-Site Request Forgery Prevention Cheat Sheet" languages="English" cost="Free" description="List of CSRF mitigations, recommended and discouraged practices." url="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" %}}

## Skill Check

For this section, we have decided to skip the skill check for one very simple reason: web browsers are currently changing their policies so that SameSite cookie policies are now Lax by default, which should automatically stop a lot of CSRF attacks from functioning. Because of this, any exercises we suggest might no longer function in the future.

If you would still like to do some sort of skill check exercise, try the DVWA lab linked above to see if it works. If it does not, hold a brief conversation with a peer or mentor about why the changes in web browsers’ default settings mean that the lab no longer works and ask them to verify that you’ve properly understood the topic.
