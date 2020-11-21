when lazy to translate text right now, you can use 
component: `<TT id="Some normal text from design" />`
function: `t("Some normal text from design")`

### benefits
1. this component will always show warnings in console
2. after task execution, you can easy find all `tt` and `TT` usages, and replace it with normal components

### helpers
> how to replace tt to t
```
const {t} = useContext(I18nContext);
```

> how to replace TT to T
```
import {T} from "@market-ui/falcon-i18n";
```
