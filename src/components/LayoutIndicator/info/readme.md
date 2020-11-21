# how to use

Use it when you need programmatically understand is layout for mobile device
Often it requires to use in css={{}} property, because media like 'xs' is not available here, but not sure, need to check

This component raises an update always when screen size changes from 
xs to md, from md to lg, etc...
```jsx harmony
export const Foo = () => {
  const { isMobile, layout } = useLayoutListenerContext();

  useEffect(function () {
    if ( isMobile(layout) ) {
      console.log('this is mobile device');
    } else {
      console.log('this is tablet or desktop device');
    }
  }, [layout]);

  if ( isMobile(layout) ) {
    return <div>mobile</div>
  } else {
    return <div>desktop</div>
  }
};
```
#### global installation (once in the project)
```jsx harmony
const App = () => (
  <LayoutListenerContextProvider>
    <Layout />
  </LayoutListenerContextProvider>
);
```
than in Layout you can use example on top
