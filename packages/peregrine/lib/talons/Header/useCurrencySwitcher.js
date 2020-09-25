import { useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';
import { useTypePolicies } from '@magento/peregrine';
import { BrowserPersistence } from '@magento/peregrine/lib/util';

const storage = new BrowserPersistence();

const mapAvailableOptions = rawData => {
    if (rawData) {
        const { available_currency_codes, current_currency_code } = rawData;

        const availableOptions = {};

        available_currency_codes.forEach(currencyCode => {
            availableOptions[currencyCode] = {
                is_current: currencyCode === current_currency_code
            };
        });

        return availableOptions;
    } else {
        return {};
    }
};

/**
 * The useCurrencySwitcher talon complements the CurrencySwitcher component.
 *
 * @param {*} props.queries the currency switcher data getCurrencyData
 * @param {*} props.typePolicies customization of the apollo cache's behavior for 'current_currency_code' field
 *
 * @returns {Object}    talonProps.availableCurrencies - Details about the available currencies.
 * @returns {Boolean}   talonProps.storeMenuIsOpen - Whether the menu that this trigger toggles is open or not.
 * @returns {Ref}       talonProps.storeMenuRef - A React ref to the menu that this trigger toggles.
 * @returns {Ref}       talonProps.storeMenuTriggerRef - A React ref to the trigger element itself.
 * @returns {Function}  talonProps.handleTriggerClick - A function for handling when the trigger is clicked.
 * @returns {Function}  talonProps.handleSwitchCurrency - A function for handling when the menu item is clicked.
 */

export const useCurrencySwitcher = props => {
    const { queries, typePolicies } = props;
    const { getCurrencyData } = queries;

    useTypePolicies(typePolicies);

    const { data: currencyData } = useQuery(getCurrencyData, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const availableCurrencies = useMemo(() => {
        return currencyData && mapAvailableOptions(currencyData.currency);
    }, [currencyData]);

    const history = useHistory();

    const handleSwitchCurrency = useCallback(
        currencyCode => {
            // Do nothing when currency code is not present in available currencies
            if (!availableCurrencies[currencyCode]) return;

            storage.setItem('store_view_currency', currencyCode);

            // Refresh the page to re-trigger the queries once currency are saved in local storage.
            history.go(0);
        },
        [availableCurrencies, history]
    );

    const {
        elementRef: currencyMenuRef,
        expanded: currencyMenuIsOpen,
        setExpanded: setCurrencyMenuIsOpen,
        triggerRef: currencyMenuTriggerRef
    } = useDropdown();

    const handleTriggerClick = useCallback(() => {
        // Toggle Stores Menu.
        setCurrencyMenuIsOpen(isOpen => !isOpen);
    }, [setCurrencyMenuIsOpen]);

    return {
        availableCurrencies,
        currencyMenuRef,
        currencyMenuTriggerRef,
        currencyMenuIsOpen,
        handleTriggerClick,
        handleSwitchCurrency
    };
};
