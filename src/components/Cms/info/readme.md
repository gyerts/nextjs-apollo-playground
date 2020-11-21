##Hybris WCMS concept overview
WCMS Module in SAP Hybris is a set of extensions that gives an easy way to create and maintain website’s content. Main elements of the CMS in Hybris are:
1. Template - holds the basis structure of pages;
2. Page - an instance of the template that inherits the same structure of the template;
3. Components (CMS Components) - elements to be placed in different sections (ContentSlot) of the page/template.

Components are basically Areas on JSP for adding the dynamic contents. At top level we have page templates.  Page template contains multiple page slots. Page slots contains multiple components and then each component can contain multiple content slots.

More detailed info can be found [here](https://help.sap.com/viewer/9d346683b0084da2938be8a285c0c27a/1811/en-US/8c82617c86691014abcda90cb5da8465.html)

## Component overview
Cms slots concept is used to map and display Hybris CMS content.

Folder components contains list of react components that handle rendering of Hybris cms components.
In components/index.js mapping of react and hybris components is done by 'typeCode'. 'typeCode' is a property of Hybris component. 

For example:

```js
export const CMSParagraphComponent = CMSContent;
```
means that Hybris components with 'typeCode' 'CMSParagraphComponent' will be rendered by CMSConent react component.

Here is how looks response from api for one of the CMSParagraphComponent
```js
{
                "slotId": "SectionLineBannerSlot",
                "slotUuid": "eyJpdGVtSWQiOiJTZWN0aW9uTGluZUJhbm5lclNsb3QiLCJjYXRhbG9nSWQiOiJ3Y2lDb250ZW50Q2F0YWxvZyIsImNhdGFsb2dWZXJzaW9uIjoiT25saW5lIn0=",
                "position": "SectionLineBanner",
                "name": "Line banner slot for Homepage",
                "slotShared": true,
                "components": {
                    "component": [
                        {
                            "uid": "HPLineBanner",
                            "uuid": "eyJpdGVtSWQiOiJIUExpbmVCYW5uZXIiLCJjYXRhbG9nSWQiOiJ3Y2lDb250ZW50Q2F0YWxvZyIsImNhdGFsb2dWZXJzaW9uIjoiT25saW5lIn0=",
                            "typeCode": "CMSParagraphComponent",
                            "modifiedtime": "2020-09-17T04:40:16.924Z",
                            "name": "Paragraph",
                            "container": "false",
                            "content": "<div class=\"homepage-wide-banner\"><a href=\"./c/new-arrivals\" style=\"display: block;background-color: rgba(180,77,13, 0.67);padding: 16px;text-align: center;line-height:1;text-transform: uppercase;text-decoration: underline;font-size: 18px;font-family: 'proxima_nova_rgbold', sans-serif;color: #fff;\">1000’s of £15 Bargains, New Drops Daily</a></div>"
                        }
                    ]
                }
            },
```

So in CmsContent.js we get data from content property and display it.

```jsx
export const CMSContent = ({ content }) => (
  <Box defaultTheme={cmsContentTheme} dangerouslySetInnerHTML={{ __html: `${content}` }} />
);
```

In CMSContent component in props are available data related to this component.

## Link to cms api
https://api.czbc-stuccoser1-d2-public.model-t.cc.commerce.ondemand.com/occ/v2/wci/cms/pages?fields=FULL&pageType=ContentPage&pageLabelOrId=homepage&lang=he

## How to insert specific cms component into page
Each Hybris compnent slot has unique id. This id can be found from api request.
```js
"slotId": "SectionLineBannerSlot",
```

So when we need to display this slot on page we need to import CmsSlot and set id attribute

```jsx
<CmsSlot id="SectionLineBannerSlot" />
```

For more examples see src/pages/Home.js