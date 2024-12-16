---
title: Contribute
weight: 3
navbar: true
---
## Submitting contributions and feedback

Infuse is Open Source! We welcome any efforts you make to report issues, propose opportunities to collaborate on developing content, directly contributing content, adding new resources, making corrections, or providing further translations. A coalition of organizations ([Conexo](https://conexo.org/), [DefendDefenders](https://defenddefenders.org/), and [Internews](https://internews.org/)) maintain the site and will review all contributions made. Please allow up to two weeks for a response and understand that there may be limitations in the actions which can be taken to address feedback. You can submit general feedback and requests for support to [contact@infuse.quest](mailto:contact@infuse.quest) in order to reach the project maintainers. 

This page provides an overview of ways to directly contribute to and edit Infuse. There are two ways we suggest doing this: editing text directly on GitHub, or editing through the provided content management system (CMS).

## Editing Directly on GitHub

The Infuse website is hosted on GitHub, so you can suggest edits by clicking where it says “Edit this Page on GitHub” on any of the learning path module pages (as shown below). Do note that this will require you to have a GitHub account.

![Top of a learning path module page with an arrow pointing to a link that says "Edit this Page on GitHub" ](/media/uploads/contribute-1.png)

The above link should take you to the GitHub page which contains the learning path you just visited. All paths are composed using Markdown (see a cheat sheet on Markdown [here](https://www.markdownguide.org/basic-syntax/)). Once you’re on the page, click the “edit” button, which has a little pencil logo.

![GitHub page for learning path 1 module 4 with a green arrow pointing at the edit button, represented by a pencil icon](/media/uploads/contribute-2.png)

When you are done editing the page, just press “save”. This should automatically create a GitHub pull request which you can then submit for our team to look at and hopefully merge into the main site!

## Editing from the Content Management System

An alternative method for editing Infuse in the browser with a user-friendly interface is to submit changes or new content through the content management system at <https://infuse.quest/admin>. You will then need to log-in to the backend using a GitHub account and authorize the application to read and write from your own GitHub account. If you are interested to know what is happening under the hood: this application manages the creation of a copy of the site on your own GitHub account and saves all changes to your copy, then when you are ready to submit those changes for consideration it will create a GitHub pull request which we can review.

![](/media/uploads/contribute-3.png)

Once signed in, you will be able to directly edit site content by navigating to the relevant page. From the *Collections* section you will be able to access the Learning Paths and proceed to the specific Module which you would like to edit.

![](/media/uploads/contribute-4.png)

Once you have selected the module you would like to edit, you will open the editor window, shown below. Here are some highlights to working with the editor:

![](/media/uploads/contribute-5.png)

1. **Saving Workflow:** Once you have finished making changes, press the Save button. This will put the page into Draft mode. At this stage you can continue to work on the page at a later time, but the Infuse team will not be alerted to your edits. Once you are ready, you can the status to ‘*In Review’,* which will open a pull request to the main Infuse repository.  
2. **Language Switcher:** Translations can be made or updated by selecting the appropriate language from this drop-down. If you are interested in translating a new language, email us at [contact@infuse.quest](mailto:contact@infuse.quest)!
3. **Editor Selector**: The Rich Text editor will allow you to use the buttons in the panel to control styling, while the Markdown selection requires that you edit in correct Markdown.

## Adding images

Sometimes, as we add content to the site, we will also want to include images.

To add images to the Infuse site, you will first need to upload them to the /static/media/uploads folder. That's where we keep all of the images for the learning paths and other materials. You can either upload them manually through GitHub or through the "Media" tab in the CMS.

To upload an image via GitHub, just add it to the folder above.

![](/media/uploads/contribute-6.png)

Alternatively, if you prefer to use the CMS to add files, you can use the “Media” tab (third from the left) in the upper left corner of the CMS.	

![](/media/uploads/contribute-7.png)

We can also insert images into the page content, either through the CMS or through markdown!

To add an image in the CMS, just click on the little “+” when you are editing a document.

![](/media/uploads/contribute-8.png)

This will allow you to insert an image either by browsing an image folder in the CMS or by adding a link.

![](/media/uploads/contribute-9.png)

If you want to insert the image from a URL, remember to use relative links. So instead of typing in `https://infuse.quest/media/uploads/CFT2_sender_address.png` or `https://github.com/OpenInternet/Infuse/blob/main/static/media/uploads/CFT2_sender_address.png`, just type in `/media/uploads/CFT2_sender_address.png`

![](/media/uploads/contribute-10.png)

The CMS will ask you for two more things when you are inserting images: a title and an alt text. We typically leave the title blank. The alt text, on the other hand, should be filled in for all images save for those which serve a purely decorative purpose. It is used to describe the image in words so that people who are visually impaired or who cannot load the image for other reasons (perhaps they have lower internet bandwidth) can still understand what is going on. Check out [this article](https://design102.blog.gov.uk/2022/01/14/whats-the-alternative-how-to-write-good-alt-text/), which gives a quick introduction to writing a good alt text.

If you would prefer to insert the image in markdown, here’s the code to do so:

`![alt text goes here](relative link goes here)`

So an example of markdown code we used might include:

`![An empty text box on a website where the user can enter text input, with a Submit button](/media/uploads/web_fundamentals_empty_box.png)`

## Developing new learning paths and modules

Are you interested in developing an additional Infuse learning path or adding a new module to an existing learning path? If so, please contact [contact@infuse.quest](mailto:contact@infuse.quest) for guidance on how to do so using the Infuse framework.

Some things to consider:

* Learning path topics should cover specialized technical expertise (STE). Read more about how Infuse defines STE here. They should also be applicable for digital protectors working with at-risk communities.  
* Learning paths and modules should mostly or entirely follow the same structure as those which have been developed. This structure and framework was carefully developed through a co-design process.  
* Learning paths should contain a combination of theoretical and practical content.  
* Whenever possible, learning paths should try to link out to relevant external resources which are available in multiple languages.
