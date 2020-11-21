import {Theme} from "@market-ui/falcon-ui";
import {GQLCMSMedia, GQLCMSProduct} from "src/graphql-types";

export interface SimpleResponsiveBannerComponent {
    uid: string;
    typeCode: string;
    urlLink: string;
    media: ResponsiveBannerMedia;
}

export interface ResponsiveBanner {
    url: string;
    altText: string;
    code?: string;
    mime?: string;
    catalogId?: string;
    downloadUrl?: string;
}

export interface ResponsiveBannerMedia {
    [key: string]: ResponsiveBanner;
    tablet: ResponsiveBanner;
    desktop: ResponsiveBanner;
    mobile: ResponsiveBanner;
    widescreen: ResponsiveBanner;
}

export interface BannerSource {
    srcset: string;
    media: string;
    alt: string;
}

export interface CarouselBanner {
    [key:string]: any;

    link: string;
    src: string;
    alt: string;
    source: BannerSource[]
}

export type Component  = {
    uid: string;
    name: string;
    container: string;
    typeCode: string;
    sequence: string;
    components: [Component];
    banners: string;
    content: string;
    displayProductImages: string;
    displayProducts: string;
    displaySuggestions: string;
    external: string;
    flexType: string;
    htmlClass: string;
    itemsNumber: string;
    maxProducts: string;
    maxSuggestions: string;
    media: GQLCMSMedia;
    minCharactersBeforeRequest: string;
    modifiedtime: string;
    numberOfItems: string;
    showLanguageCurrency: string;
    shownProductCount: string;
    sortByField: string;
    title: string;
    totalDisplay: string;
    urlLink: string;
    uuid: string;
    waitTimeBeforeRequest: string;
    wrapAfter: string;
    image: GQLCMSMedia;
    text: string;
    url: string;
    products: [GQLCMSProduct]
}

export interface IShopAllCategoriesComponent {
    name: string;
    className: string;
    components: Component[]
    theme?: Theme;
}
