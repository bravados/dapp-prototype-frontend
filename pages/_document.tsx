import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssAndReset } from '@infrastructure/style';

export default class Document extends NextDocument {
    componentDidMount(): void {
        getCssAndReset();
    }

    render() {
        return (
            <Html lang="en">
                <Head/>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
