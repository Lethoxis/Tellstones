const publicUrl = process.env.PUBLIC_URL;

const regionStyles = {
    demacia: {
        "--color-primary": `rgb(58, 73, 114)`,
        "--color-input-background": `rgb(247, 243, 240)`,
        
        "--color-secondary": `rgb(185, 71, 99)`,
        "--hue-rotate-secondary": `120deg`,
        "--saturation-secondary": `3`,
        
        "--color-highlight": `rgb(255, 153, 0)`,
        "--color-select": `rgb(180 41 76)`,
        "--color-line-placeable": `rgb(255, 255, 255)`,
        
        "--image-background": `url('${publicUrl}/images/demacia/background.jpg')`,
        "--image-button": `url('${publicUrl}/images/demacia/button.png')`,
        "--image-button-hover": `url('${publicUrl}/images/demacia/button-hover.png')`,
        "--image-button-square": `url('${publicUrl}/images/demacia/button-square.png')`,
        "--image-button-square-hover": `url('${publicUrl}/images/demacia/button-square-hover.png')`
    }
};

export default regionStyles;
