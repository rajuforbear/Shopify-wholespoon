export default `title
availableForSale
compareAtPriceRange
{
    maxVariantPrice
    {
        amount
        currencyCode
    }
    minVariantPrice
    {           
        amount
        currencyCode
    }
}
createdAt
description
descriptionHtml
featuredImage
{
    altText
    height
    id
    url
    width
}
handle
id
images(first:10)
{
    nodes
    {
        altText
        url
        width
        id
        height
    }
    edges
    {
        node{
            altText
            height
            id
            url
            width
        }
    }
}
isGiftCard
media(first:10)
{
    edges{
        cursor
        node
        {
            alt
            mediaContentType
            presentation
            {
                id
            }
            previewImage
            {
                url
            }

        }
    }
}
onlineStoreUrl
options(first:20){
    id
    name
    values
}
priceRange
{
    maxVariantPrice
    {
        amount
        currencyCode
    }
    minVariantPrice
    {
        amount
        currencyCode
    }
}
productType
publishedAt
requiresSellingPlan
sellingPlanGroups(first:10)
{
    edges
    {
        cursor
        node
        {
            appName
            name
            options
            {
                name
            }
            sellingPlans(first:20)
            {
                edges
                {
                    cursor
                    node
                    {
                        checkoutCharge
                        {
                            type
                            value
                            {
                                __typename
                            }
                        }
                        description

                    }
                }
            }
        }
    }
}
seo
{
    title
    description
}
tags
title
totalInventory
updatedAt
variants(first:10)
{
    nodes{
         title
            availableForSale
            barcode
            compareAtPrice
            {
                amount
                currencyCode
            }
            currentlyNotInStock
            id
            image
            {
                url
                id
            }
            price
            {
                amount
                currencyCode
            }
            quantityAvailable
            requiresShipping
            selectedOptions
            {
                name
                value
            }
            sellingPlanAllocations(first:10)
            {
                edges
                {
                    cursor
                    node
                    {
                       checkoutChargeAmount
                       {
                           amount
                           currencyCode
                       }
                       priceAdjustments
                       {
                           compareAtPrice
                           {
                               amount
                               currencyCode
                           }
                           perDeliveryPrice
                           {
                               amount
                               currencyCode
                           }
                           price
                           {
                               amount
                               currencyCode
                           }
                           unitPrice
                           {
                               amount
                               currencyCode
                           }
                       }
                       sellingPlan
                       {
                           checkoutCharge
                           {
                               type
                               value
                               {
                                   __typename
                               }
                           }
                       }
                       remainingBalanceChargeAmount{
                           amount
                           currencyCode
                       }
                    }
                }
            }
    }
    edges
    {
        cursor
        node
        {
            title
            availableForSale
            barcode
            compareAtPrice
            {
                amount
                currencyCode
            }
            currentlyNotInStock
            id
            image
            {
                url
                id
            }
            price
            {
                amount
                currencyCode
            }
            quantityAvailable
            requiresShipping
            selectedOptions
            {
                name
                value
            }
            sellingPlanAllocations(first:10)
            {
                edges
                {
                    cursor
                    node
                    {
                       checkoutChargeAmount
                       {
                           amount
                           currencyCode
                       }
                       priceAdjustments
                       {
                           compareAtPrice
                           {
                               amount
                               currencyCode
                           }
                           perDeliveryPrice
                           {
                               amount
                               currencyCode
                           }
                           price
                           {
                               amount
                               currencyCode
                           }
                           unitPrice
                           {
                               amount
                               currencyCode
                           }
                       }
                       sellingPlan
                       {
                           checkoutCharge
                           {
                               type
                               value
                               {
                                   __typename
                               }
                           }
                       }
                       remainingBalanceChargeAmount{
                           amount
                           currencyCode
                       }
                    }
                }
            }
        }
    }
}
vendor`