#General component description

PromoBanner component mainly is used at homepage for marketing purposes. It consists of image, title and shop button.

### Component preview
![PromoBanner](promoBanner.png)

## how to use
```jsx
<PromoSectionBanner  {...bannerProps}/>
```

bannerProps has the following interface:

```js
interface PromoBannerComponent {
    url: string;
    text: string;
    image: {
        altText: string;
        url: string;
        mime?: string;
    };
    typeCode?: string;
    className?: string;
    theme?: Theme;
}
```
