import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';

import { mergeClasses } from '../../classify';
import Footer from '../Footer';
import Header from '../Header';
import defaultClasses from './main.css';
// hook, Trans component
import { useTranslation, Trans } from 'react-i18next';

const Main = props => {
    const { children, isMasked } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    const { t } = useTranslation();

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            <Header />
            <div className={classes.sample}>
                <h2>Using the Hook:</h2>
                <p>{t('hello world')}</p>
                <p>{t('Welcome to Venia')}</p>
                <p>{t('icu', { numPersons: 0 })}</p>
                <p>{t('icu', { numPersons: 1 })}</p>
                <p>{t('icu', { numPersons: 501 })}</p>
                <p>{t('price', { amount: 100 })}</p>
            </div>
            <div className={classes.sample}>
                <h2>Using the Trans component:</h2>
                <p>
                    <Trans>Welcome to Venia</Trans>
                </p>
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
