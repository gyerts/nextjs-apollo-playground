import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { Loader } from 'src/uikitEjected';
import { I18nContext } from '@market-ui/falcon-i18n';
import { themed } from '@market-ui/falcon-ui';

const StoreLocatorLayout = themed({
  tag: 'div',
  defaultTheme: {
    width: '100%'
  }
});

const StoreLocator = () => {
  const context = useContext(I18nContext);
  return (
        <>
        <StoreLocatorLayout id="storelocatorwidget">
            <Loader />
        </StoreLocatorLayout>
          <Helmet>
              <script type="text/javascript" src={`//maps.googleapis.com/maps/api/js?key=AIzaSyBApVDuxmmzCBmpZAMp4b3OusxKVELmgds&libraries=places${context.language === "he" ? "&language=iw&region=il" : ""}`}></script>
              <script 
                    type="text/javascript" 
                    id="storelocatorscript" 
                    data-uid="673a81b38bc1f8c9c93f0afc9330839b" 
                    src="//cdn.storelocatorwidgets.com/widget/widget.js"
                    {...(context.language === "he" && { "data-language": "Hebrew"})}></script>
              { context.dir === "rtl" && <link rel='stylesheet' type="text/css" href='/storeLocator-rtl.css' />}
          </Helmet>
      </>
    )
  }

export default StoreLocator;
