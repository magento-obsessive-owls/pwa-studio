import React from 'react';
import { string, shape } from 'prop-types';
import patches from '../util/intlPatches';
import { useIntl } from 'react-intl';

/**
 * The CurrencySymbol component is used to extract currency symbol from Intl.NumberFormat.
 *
 * Formatting of prices and currency symbol selection is handled entirely by the ECMAScript Internationalization API available in modern browsers.
 *
 * A [polyfill][] is required for any JavaScript runtime that does not have [Intl.NumberFormat.prototype.formatToParts][].
 *
 * [polyfill]: https://www.npmjs.com/package/intl
 * [Intl.NumberFormat.prototype.formatToParts]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
 */

const CurrencySymbol = props => {
    const { locale } = useIntl();
    const { currencyCode, classes, currencyDisplay } = props;

    // If the optional locale prop is not provided or is undefined,
    // the runtime's default locale is used in the Intl.NumberFormat() constructor.
    const parts = patches.toParts.call(
        new Intl.NumberFormat(locale, {
            style: 'currency',
            currencyDisplay: currencyDisplay,
            currency: currencyCode
        }),
        0
    );

    const symbol = parts.find(part => part.type === 'currency');

    return <span className={classes.currency}>{symbol.value}</span>;
};

CurrencySymbol.propTypes = {
    /**
     * Class names to use when styling this component
     */
    classes: shape({
        currency: string
    }),
    /**
     * A string with any of the currency code supported by Intl.NumberFormat
     */
    currencyCode: string.isRequired,
    /**
     * Currency display types supported by Intl.NumberFormat
     */
    currencyDisplay: string
};

CurrencySymbol.defaultProps = {
    classes: {},
    currencyDisplay: 'symbol'
};

export default CurrencySymbol;
