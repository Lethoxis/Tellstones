const publicUrl = process.env.PUBLIC_URL;

const regionStyles = {
    demacia: {
        "--color-primary": `rgb(58, 73, 114)`,
        "--color-input-background": `rgba(247, 243, 240, 0.8)`,
        "--color-button-text": "#374c68",

        "--color-secondary": `rgb(185, 71, 99)`,
        "--filter-secondary": `hue-rotate(120deg) saturate(3)`,

        "--color-highlight": `rgb(255, 153, 0)`,
        "--color-select": `rgb(180 41 76)`,
        "--color-line-placeable": `white`,

        "--line-stones-width": "85%",
        "--line-stones-gap": "25px",
        "--filter-stone-highlighted": "drop-shadow(0 10px 0.4rem black)",
        "--outline-stone-highlighted": "7px dashed var(--color-highlight)",
        "--border-stone-blank-selected": "2px outset var(--color-select)",
        "--outline-stone-blank-visible": "4px dashed var(--color-line-placeable)",
        "--filter-stone-selected": "drop-shadow(0 0 4px var(--color-select)) drop-shadow(0 10px 0.4rem black)",
        "--outline-stone-selected": "7px outset var(--color-select)",

        "--filter-image-hover": "invert(1) brightness(2) drop-shadow(0 1px 2px black)",
        "--image-background": `url('${publicUrl}/images/demacia/background.jpg')`,
        "--image-button": `url('${publicUrl}/images/demacia/button.png')`,
        "--image-button-hover": `url('${publicUrl}/images/demacia/button-hover.png')`,
        "--image-button-square": `url('${publicUrl}/images/demacia/button-square.png')`,
        "--image-button-square-hover": `url('${publicUrl}/images/demacia/button-square-hover.png')`
    },
    piltover: {
        "--color-primary": `#C9BC90`,
        "--color-input-background": `rgba(247, 243, 240, 0.2)`,
        "--color-button-text": "#82612B",

        "--color-secondary": `rgb(62, 142, 238)`,
        "--filter-secondary": `hue-rotate(180deg)`,

        "--color-highlight": `white`,
        "--color-select": `#37A1CA`,
        "--color-line-placeable": `white`,

        "--line-stones-width": "86%",
        "--line-stones-gap": "6px",
        "--filter-stone-highlighted": "drop-shadow(0 0 10px var(--color-highlight)) drop-shadow(0 10px 0.4rem black)",
        "--outline-stone-highlighted": "none",
        "--border-stone-blank-selected": "none",
        "--outline-stone-blank-visible": "none",
        "--filter-stone-selected": "drop-shadow(0 0 10px var(--color-select)) drop-shadow(0 0 13px var(--color-select)) drop-shadow(0 10px 0.4rem black)",
        "--outline-stone-selected": "none",

        "--filter-image-hover": "saturate(0) brightness(2)",
        "--image-background": `url('${publicUrl}/images/piltover/background.jpg')`,
        "--image-button": `url('${publicUrl}/images/piltover/button.png')`,
        "--image-button-hover": `url('${publicUrl}/images/piltover/button-hover.png')`,
        "--image-button-square": `url('${publicUrl}/images/piltover/button-square.png')`,
        "--image-button-square-hover": `url('${publicUrl}/images/piltover/button-square-hover.png')`
    }
};

export default regionStyles;
