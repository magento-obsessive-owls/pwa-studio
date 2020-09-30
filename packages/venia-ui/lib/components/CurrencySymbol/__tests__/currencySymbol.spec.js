import React from 'react';
import IntlPolyfill from 'intl';
import areIntlLocalesSupported from 'intl-locales-supported';

import { createTestInstance } from '@magento/peregrine';
import CurrencySymbol from '../currencySymbol';

if (global.Intl.NumberFormat.prototype.formatToParts) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported('fr-FR')) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and patch the constructors we need with the polyfill's.
        //global.Intl = IntlPolyfill;
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = IntlPolyfill;
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/fr-FR.js');
}

test('Renders a USD symbol', () => {
    const instance = createTestInstance(<CurrencySymbol currencyCode="USD" />);

    expect(instance.toJSON()).toMatchSnapshot();
});

test('Renders a EUR symbol', () => {
    const instance = createTestInstance(<CurrencySymbol currencyCode="EUR" />);

    expect(instance.toJSON()).toMatchSnapshot();
});

test('Allows custom classname', () => {
    const classes = {
        currency: 'curr'
    };

    const instance = createTestInstance(
        <CurrencySymbol currencyCode="USD" classes={classes} />
    );

    expect(instance.toJSON()).toMatchSnapshot();
});
