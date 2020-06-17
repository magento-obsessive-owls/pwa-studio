import React from 'react';
import { oneOf, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import defaultClasses from './linkButton.css';
import Button from "../Button";

const LinkButton = props => {
    const {
        children,
        classes: propClasses,
        type,
        ...restProps
    } = props;
    const classes = mergeClasses(defaultClasses, propClasses);

    return (
        <Button priority={'normal'} classes={{ root_normalPriority: classes.root }} type={type} {...restProps}>
            {children}
        </Button>
    );
};

/**
 * Props for {@link Button}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Button component.
 * @property {string} classes.root classes for root container
 * @property {string} type the type of the Button
 */
LinkButton.propTypes = {
    classes: shape({
        root: string
    }),
    type: oneOf(['button', 'reset', 'submit']).isRequired,
};

LinkButton.defaultProps = {
    type: 'button',
};

export default LinkButton;
