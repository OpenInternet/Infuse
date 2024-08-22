CMS.registerEditorComponent({
    id: "fontawesome",
    label: "FontAwesome Icon",
    fields: [
        { name: "iconName", label: "Icon Name", widget: "string" }
    ],
    pattern: /{{< fontawesome "([^"]+)" >}}/,
    fromBlock: function(match) {
        return {
            iconName: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< fontawesome "${obj.iconName}" >}}`;
    },
    toPreview: function(obj) {
        const iconName = obj.iconName;
        const iconPath = `assets/icons/${iconName}.svg`;

        // Load the SVG content directly (simplified for the preview)
        return fetch(iconPath)
            .then(response => response.text())
            .then(svgContent => {
                return svgContent; // Return the SVG content for rendering
            })
            .catch(() => {
                return `<span>Icon not found</span>`; // Fallback message if the SVG isn't found
            });
    }
});
CMS.registerEditorComponent({
    id: "resource",
    label: "Resource Card",
    fields: [
        { name: "title", label: "Title", widget: "string" },
        { name: "cost", label: "Cost", widget: "string" },
        { name: "description", label: "Description", widget: "text" },
        { name: "languages", label: "Languages", widget: "string" },
        { name: "url", label: "URL", widget: "string" }
    ],
    pattern: /{{%\s*resource\s+title="(.*?)".*?\s*languages="(.*?)".*?\s*cost="(.*?)".*?\s*description="(.*?)".*?\s*url="(.*?)".*?%}}/,
    fromBlock: function(match) {
        return {
            title: match[1],
            languages: match[2],
            cost: match[3],
            description: match[4],
            url: match[5]
        };
    },
    toBlock: function(obj) {
        return `{{% resource title="${obj.title}" languages="${obj.languages}" cost="${obj.cost}" description="${obj.description}" url="${obj.url}" %}}`
    },
    toPreview: function(obj) {
        return `<div class="transition-200 relative mb-6 flex w-full items-center space-x-3 rounded-3xl border-2 border-gray-300 bg-white p-4 shadow-3xl transition-shadow focus-within:shadow-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-gray-400 hover:shadow-none">
<div class="p-6">
<p class="mb-2 mt-0 text-2xl font-bold">${obj.title}</p>` +
               `${obj.cost ? `<span class="mb-2 me-2 inline-block rounded-full border-2 border-indigo-300 bg-indigo-50 px-2 py-0 text-sm font-semibold text-indigo-700">${obj.cost}</span>` : ''}` +
               `${obj.description ? `<p class="mb-3 mt-0">${obj.description}</p>` : ''}` +
               `${obj.languages ? `<div class="mb-2"><span class="text-sm font-semibold">Languages</span>: ${obj.languages.split(', ').map(lang => `<span class="mb-0 inline-block text-sm">${lang}</span>`).join(', ')}</div>` : ''}` +
               `${obj.url ? `<a href="${obj.url}" target="_blank" rel="noopener noreferrer" class="mt-2 inline-block rounded-lg bg-green-700 px-4 py-2 font-bold text-white no-underline hover:bg-green-800">Visit Site</a>` : ''}
</div>
</div>`;
    }
});
CMS.registerEditorComponent({
    id: "question",
    label: "Question Element",
    fields: [
        { name: "title", label: "Title", widget: "string" },
        { name: "open", label: "Open by default", widget: "boolean", default: false },
        { name: "content", label: "Content", widget: "markdown" }
    ],
    pattern: /{{< question title="(.*?)"(?: open="(.*?)"|) >}}([\s\S]*?){{< \/question >}}/,
    fromBlock: function(match) {
        return {
            title: match[1],
            open: match[2] === undefined ? false : (match[2] === "true"),
            content: match[3].trim()
        };
    },
    toBlock: function(obj) {
        return `{{< question title="${obj.title}"${obj.open ? ` open="true"` : ""} >}}
${obj.content}
{{< /question >}}`;
    },
    toPreview: function(obj) {
        const markdownContent = obj.content.replace(/^\s*-\s+/gm, '- '); // Ensure proper markdown list formatting

        // Render the content including markdown and HTML for images
        const renderedContent = markdownContent.split(/\n\s*\n/).map(line => {
            if (line.startsWith('![alt_text]')) {
                const imageUrl = line.match(/\((.*?)\s/)[1];
                return `<img src="${imageUrl}" alt="image" class="mb-4">`;
            } else {
                return `<p>${line}</p>`;
            }
        }).join('');
        
        return `<details class="group mb-6 w-full rounded-lg p-6 transition${obj.open ? ' open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10' : ''}"${obj.open ? ' open' : ''}>
<summary class="flex cursor-pointer list-none items-center justify-between font-medium"><span class="text-gray-900">${obj.title}</span>
<span class="transition group-open:hidden">
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 8.31055V16.3105M8.5 12.3105H16.5M22.5 12.3105C22.5 17.8334 18.0228 22.3105 12.5 22.3105C6.97715 22.3105 2.5 17.8334 2.5 12.3105C2.5 6.7877 6.97715 2.31055 12.5 2.31055C18.0228 2.31055 22.5 6.7877 22.5 12.3105Z" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</span>
<span class="hidden transition group-open:block">
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 12.3105H16.5M22.5 12.3105C22.5 17.8334 18.0228 22.3105 12.5 22.3105C6.97715 22.3105 2.5 17.8334 2.5 12.3105C2.5 6.7877 6.97715 2.31055 12.5 2.31055C18.0228 2.31055 22.5 6.7877 22.5 12.3105Z" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</span>
</summary>
<div class="pe-6 pt-4">${renderedContent}</div>
</details>`;
    }
});
CMS.registerEditorComponent({
    id: "figure",
    label: "Figure",
    fields: [{
            name: "title",
            label: "Figure Title",
            widget: "string"
        },
        {
            name: "src",
            label: "Figure SRC",
            widget: "string"
        },
    ],
    pattern: /{{< figure src="([a-zA-Z0-9-_ ]+)" title="([a-zA-Z0-9-_ ]+)" >}}/,
    fromBlock: function(match) {
        return {
            title: match[1],
            src: match[2],
        };
    },
    toBlock: function(obj) {
        return `{{< figure src="${obj.src}" title="${obj.title}" >}}`;
    },
    toPreview: function(obj) {
        return `<figure><img src=${obj.src} alt=${obj.title}><figcaption>${obj.title}</figcaption></figure>`;
    },
});
CMS.registerEditorComponent({
    id: "gist",
    label: "Gist",
    fields: [{
            name: "username",
            label: "Github Username",
            widget: "string"
        },
        {
            name: "gid",
            label: "Gist ID",
            widget: "string"
        },
    ],
    pattern: /{{< gist ([a-zA-Z0-9]+) ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            username: match[1],
            gid: match[2],
        };
    },
    toBlock: function(obj) {
        return `{{< gist ${obj.username} ${obj.gid} >}}`;
    },
    toPreview: function(obj) {
        return `{{< gist ${obj.username} ${obj.gid} >}}`;
    },
});
CMS.registerEditorComponent({
    id: "instagram",
    label: "Instagram",
    fields: [
      {
          name: "pid",
          label: "Post id",
          widget: "string"
      },
      {
        name: "hidecaption",
        label: "Hide caption",
        widget: "boolean"
      }
    ],
    pattern: /{{< instagram (?<pid>[a-zA-Z0-9]+)\s{0,}(?<hidecaption_flag>hidecaption)?\s+>}}/,
    fromBlock: function(match) {
        return {
            pid: match[1],
            hidecaption: match[2]
        };
    },
    toBlock: function(obj) {
        return `{{< instagram ${obj.pid} ${
          obj.hidecaption ? "hidecaption " : ""
        }>}}`;
    },
    toPreview: function(obj) {
        return `{{< instagram ${obj.pid} ${
          obj.hidecaption ? "hidecaption " : ""
        }>}}`;
    },
});
CMS.registerEditorComponent({
    id: "twitter",
    label: "Twitter",
    fields: [{
        name: "tid",
        label: "Tweet id",
        widget: "string"
    }],
    pattern: /{{< tweet ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            tid: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< tweet ${obj.tid} >}}`;
    },
    toPreview: function(obj) {
        return `{{< tweet ${obj.tid} >}}`;
    },
});
CMS.registerEditorComponent({
    id: "vimeo",
    label: "Vimeo",
    fields: [{
        name: "shortcode",
        label: "Vimeo shortcode",
        widget: "string"
    }],
    pattern: /{{< vimeo ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            shortcode: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< vimeo ${obj.shortcode} >}}`;
    },
    toPreview: function(obj) {
        return `{{< vimeo ${obj.shortcode} >}}`;
    },
});
CMS.registerEditorComponent({
    id: "youtube",
    label: "Youtube",
    fields: [{
        name: "id",
        label: "Youtube Video ID",
        widget: "string"
    }],
    pattern: /{{< youtube\s+(?<id>[A-Za-z0-9\-]+)\s+>}}/,
    fromBlock: function(match) {
        return {
            id: match[1],
        };
    },
    toBlock: function(obj) {
        return `{{< youtube ${obj.id} >}}`;
    },
    toPreview: function(obj) {
        return `<img src="https://i3.ytimg.com/vi/${obj.id}/hqdefault.jpg" alt="Youtube Video"/>`;
    },
});
