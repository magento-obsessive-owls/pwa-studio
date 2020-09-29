import React from 'react';
import { shape, string } from 'prop-types';

import { useCurrencySwitcher } from '@magento/peregrine/lib/talons/Header/useCurrencySwitcher';

import { mergeClasses } from '../../classify';
import defaultClasses from './currencySwitcher.css';
import SwitcherItem from './switcherItem';
import currencyOperations, { CUSTOM_TYPES } from './currencySwitcher.gql';
import { CurrencySymbol } from '@magento/peregrine/lib/Price';

const CurrencySwitcher = props => {
    const talonProps = useCurrencySwitcher({
        ...currencyOperations,
        typePolicies: CUSTOM_TYPES
    });

    const {
        handleSwitchCurrency,
        currentCurrencyCode,
        availableCurrencies,
        currencyMenuRef,
        currencyMenuTriggerRef,
        currencyMenuIsOpen,
        handleTriggerClick
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const menuClassName = currencyMenuIsOpen ? classes.menu_open : classes.menu;

    const currencySymbol = {
        currency: classes.symbol
    };

    if (!availableCurrencies || availableCurrencies.length === 1) return null;

    const currencies = availableCurrencies.map(code => {
        return (
            <li key={code} className={classes.menuItem}>
                <SwitcherItem
                    active={code === currentCurrencyCode}
                    onClick={handleSwitchCurrency}
                    option={code}
                >
                    <CurrencySymbol
                        classes={currencySymbol}
                        currencyCode={code}
                        currencyDisplay={'narrowSymbol'}
                    />
                    {code}
                </SwitcherItem>
            </li>
        );
    });

    return (
        <div className={classes.root}>
            <button
                className={classes.trigger}
                aria-label={currentCurrencyCode}
                onClick={handleTriggerClick}
                ref={currencyMenuTriggerRef}
            >
                <span className={classes.label}>
                    <CurrencySymbol
                        classes={currencySymbol}
                        currencyCode={currentCurrencyCode}
                        currencyDisplay={'narrowSymbol'}
                    />
                    {currentCurrencyCode}
                </span>
            </button>
            <div ref={currencyMenuRef} className={menuClassName}>
                <ul>{currencies}</ul>
            </div>
        </div>
    );
};

export default CurrencySwitcher;

CurrencySwitcher.propTypes = {
    classes: shape({
        root: string,
        trigger: string,
        menu: string,
        menu_open: string,
        menuItem: string,
        symbol: string
    })
};
