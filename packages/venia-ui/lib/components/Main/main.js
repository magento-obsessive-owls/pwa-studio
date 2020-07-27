import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { mergeClasses } from '../../classify';
import Footer from '../Footer';
import Header from '../Header';
import defaultClasses from './main.css';

const Main = props => {
    const { children, isMasked } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            <Header />
            <div className={classes.sample}>
                <h2>
                    <FormattedMessage
                        id="app.welcome"
                        defaultMessage="Welcome to Venia Storefront"
                        description="Greeting to welcome the user to the app"
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id="app.greeting"
                        description="Greeting to welcome the user to the app"
                        defaultMessage="Hello, <b>World</b>"
                        values={{
                            b: chunks => <b>{chunks}</b>
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="app.long"
                        description="A long string of text"
                        defaultMessage="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane."
                    />
                </p>
                <h2>
                    <FormattedMessage
                        id="app.plurals_header"
                        description="Plural examples to follow"
                        defaultMessage="Plurals"
                    />
                </h2>
                {/* Note: FormattedPlural should only be used in apps with one language. To support multiple languages, use FormattedMessage */}
                <p>
                    <FormattedMessage
                        id="app.plurals_example"
                        description="Plural examples to follow"
                        defaultMessage={`{count, plural, =0 {no persons} one {# person} other {# people}}`}
                        values={{
                            count: 500
                        }}
                    />
                </p>
                <h2>
                    <FormattedMessage
                        id="app.currencies"
                        description="Currency examples to follow"
                        defaultMessage="Currencies"
                    />
                </h2>
                {/*<FormattedNumber value={19} style="currency" currency="EUR" />*/}
            </div>
            <div className={pageClass}>{children}</div>
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string,
        sample: string
    }),
    isMasked: bool
};
