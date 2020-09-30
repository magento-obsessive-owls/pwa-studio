import React from 'react';
import IntlPolyfill from 'intl';

import { createTestInstance } from '@magento/peregrine';
import CurrencySymbol from '../currencySymbol';

if (!global.Intl.NumberFormat.prototype.formatToParts) {
    // No `Intl`, so use and load the polyfill.
    global.Intl = IntlPolyfill;
    require('intl/locale-data/jsonp/en.js');
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
