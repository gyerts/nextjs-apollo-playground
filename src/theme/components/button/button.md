## Use as simple button
#### default
```
<Button>
  Click me!
</Button>
```
#### disabled
```
<Button
  disabled
>
  Click me!
</Button>
```

### Use as router link
#### disabled
>`disabled` attr is not supported by `a` tag, use `class` instead
```
import RouterLink from "next/link";

<Button
  as={RouterLink}
  to='/'
  className='disabled'
>
  Click me!
</Button>
```


## Variants
#### inverse
> normal view is bg-black color-white, in this mode colors inverted
#### icon
> when you need to wrap icon with button, removes bg, border styles
#### link
> when you need just use clickable text (without href)
#### link-underlined
> when you need just use clickable underlined text (without href)
#### loader (broken)
> default loader animation (broken)
