# how to use

```jsx harmony
// Default usage: 5 stars, black fill of the star, 18px of size, 0 / 5 stars
<Rating />

// Custom star rating

<Rating
    starsCount={starsCount}             // Int | Float (default: 5)
    value={value}                       // Int :: Current star value from state
    onChange={onChange}                 // Function ( event: OnchangeEvent ) -> MouseEvent -> void :: Onclick triggers onChange event to set rate value
    activeFill={activeFillColor}        // HEX String | String (#111122)
    inactiveFill={inactiveFillcolor}    // HEX String | String (#111122)
    size={size}                         // Int | Float (2 | 4.5) :: Converts number to css prop in px
    editable={isEditable}               // Bool :: Flag to change the rate
    spacing={spacing}                   // Int :: Gutters between stars in px
    hideInactive={hideInactive}         // Bool :: Hide inactive stars
/>

// Example

const SomeCoolComponent = (props) => {
    const {userRating} = props; // 10 stars

    return (
        <div className="hello">
            <Rating 
                starCount={userRating} 
                activeFill={'red'} 
                inactiveFill={'green'} 
                size={35} 
                spacing={10} 
                editable
            />
        </div>
    )
}

```

