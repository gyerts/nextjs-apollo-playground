## description
this is config provider which is mirrors all configs from 
config/default.json + development.json/production.json depends on your environment

> Typing are also working! if you want to add new config please add it also into typings here src/types.ts -> IClientConfig

## how to use
```
const Foo = () => {
  const { googleApiKey } = useClientConfigs();
}
```

## how to install it (already done in this project)
```
const App = () => (
  <ClientConfigsContextProvider>
    {rest of application, inside you can use configs}
  </ClientConfigsContextProvider>
)
```
