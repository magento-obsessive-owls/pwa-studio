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
        handleSwitchStore,
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

    if (!availableCurrencies || Object.keys(availableCurrencies).length === 1)
        return null;

    let currentCurrency = null;

    const currencies = Object.keys(availableCurrencies).map(currencyCode => {
        const isActive = availableCurrencies[currencyCode].is_current;
        const label = (
            <span>
                <CurrencySymbol
                    classes={currencySymbol}
                    currencyCode={currencyCode}
                />
                {currencyCode}
            </span>
        );

        const switcherItem = {
            label: label,
            code: currencyCode
        };

        if (isActive) {
            currentCurrency = label;
        }

        return (
            <li key={currencyCode} className={classes.menuItem}>
                <SwitcherItem
                    active={isActive}
                    onClick={handleSwitchStore}
                    switcherItem={switcherItem}
                />
            </li>
        );
    });

    return (
        <div className={classes.root}>
            <button
                className={classes.trigger}
                aria-label={currentCurrency}
                onClick={handleTriggerClick}
                ref={currencyMenuTriggerRef}
            >
                <span className={classes.label}>{currentCurrency}</span>
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
