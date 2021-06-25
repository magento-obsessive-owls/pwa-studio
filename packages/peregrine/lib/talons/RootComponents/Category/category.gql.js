import { gql } from '@apollo/client';

import { CategoryFragment, ProductsFragment } from './categoryFragments.gql';

const existingFields = ['price', 'short_description'];

const fragment = PRODUCT_ATTRIBUTES_METADATA ?
    PRODUCT_ATTRIBUTES_METADATA.reduce((result, item) => {
        if (item.storefront_properties.use_in_product_listing === true && !existingFields.includes(item.attribute_code))
        {
            result.push(item.attribute_code)
        } else if (item.attribute_code==='short_description') {
            result.push(`${item.attribute_code} {\n\thtml\n}`)
        }
        return result;
    },[]).join("\n") : 'id';
//debugger
const ListingAttributesFragment = gql`
    fragment ListingAttributesFragment on Products {
        items {
            ${fragment}
        }
    }
`;

export const GET_CATEGORY = gql`
    query GetCategories(
        $id: Int!
        $pageSize: Int!
        $currentPage: Int!
        $filters: ProductAttributeFilterInput!
        $sort: ProductAttributeSortInput
    ) {
        category(id: $id) {
            id
            ...CategoryFragment
        }
        products(
            pageSize: $pageSize
            currentPage: $currentPage
            filter: $filters
            sort: $sort
        ) {
            ...ProductsFragment
            ...ListingAttributesFragment
        }
    }
    ${CategoryFragment}
    ${ProductsFragment}
    ${ListingAttributesFragment}
`;

export const GET_FILTER_INPUTS = gql`
    query GetFilterInputsForCategory {
        __type(name: "ProductAttributeFilterInput") {
            inputFields {
                name
                type {
                    name
                }
            }
        }
    }
`;

export default {
    getCategoryQuery: GET_CATEGORY,
    getFilterInputsQuery: GET_FILTER_INPUTS
};
