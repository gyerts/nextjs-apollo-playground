##General component description
Responsive image component allows you to display images that are optimized for theme breakpoints(desktop, mobile, tablet, and widescreen). Under the hood it based on <picture> tag and srcset and media attributes. As a fallback it uses image url for widescreen. 


## How to use

```jsx
<ResponsiveImage {...imageProps} />
```
Responsive image properties

```js
interface ResponsiveImageProps {
    src: string;
    alt?: string;
    source?: {
        srcset: string;
        media: string;
    }[];
    class?: string;
}
```