class CaroFredSel extends LitElement {
static get styles() {
    return css`
    .list_carousel {
        float: left;
        width: 600px;
    }

    .list_carousel ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: block;
    }

    .list_carousel li {
        width: 60px;
        padding: 0;
        display: block;
        float: left;
        text-align: center;
    }

    .list_carousel li img {
        width: 58px;
        padding-bottom: 8px;
    }

    .list_carousel.responsive {
        width: auto;
        margin-left: 0;
    }
    
    .list_carousel2 {
        float: left;
        width: 360px;
    }

    .list_carousel2 ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: block;
    }

    .list_carousel2 li {
        width: 35px;
        height: 35px;
        padding: 0;
        display: block;
        float: left;
        text-align: center;
    }

    .list_carousel2 li img {
        width: 25px;
        height: 25px;
        padding: 1px;
    }

    .list_carousel2 li img:hover {
        width: 25px;
        height: 25px;
        padding: 0px;
    }

    .list_carousel2.responsive {
        width: auto;
        margin-left: 0;
    }
    `
}

static get properties() {
    return { 
    CarouselName: { type: String },
    CarouselName: { type: String },
    CarouselName: { type: String },
    CarouselName: { type: String },
    CarouselName: { type: String },
    };
}

New_Carousel = ({
    $CarouselID,
    $CarouselItems,
    $CarouselContainerStyle,
    $CarouselItemsContainerStyle
}) => {

    return html`
    <div class="${$CarouselContainerStyle}" id="${$CarouselID}Container" style="display:block">
        <br>
        <a class="prev" href="#" />
        <div class="${$CarouselItemsContainerStyle}">
        <ul id="${$CarouselID}">
            ${$CarouselItems}
        </ul>
        </div>
        <a class="next" href="#" />
    </div>
    `
}

New_CrouselItem = ({
    $CarouselName,
    $CarouselItemValue,
    $CarouselItemImageURL,
    $CarouselItemTitle,
    $IsChecked
}) => html`
<li>
    <label>
    <input 
        type="radio"
        name="${$CarouselName}"
        value="${$CarouselItemValue}"
        id="${$CarouselItemTitle}"
        ?checked=${$IsChecked}
        @click=${window.radioSelect}
        @input=${window.radioSelect}
    />
    <img 
        src="${$CarouselItemImageURL}"
        title="${$CarouselItemTitle}">
        <br>
    <span class="swatch-label">${$CarouselItemTitle}</span>
    </label>
</li>
`


render(){
    return  New_Carousel()
}
}
customElements.define('x-carofredsel', CaroFredSel);
class MyElement extends LitElement {
}