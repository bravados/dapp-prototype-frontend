import { createStitches } from '@stitches/react';

const {
    styled,
    css,
    globalCss,
    getCssText,
    reset,
    config
} = createStitches({
    prefix: 'kiruna-labs',
});

const getCssAndReset = () => {
    // call first the rest and after it the getCssText from stitches
    reset();
    return getCssText();
};

export {
    styled,
    css,
    globalCss,
    getCssText,
    reset,
    config,
    getCssAndReset,
}