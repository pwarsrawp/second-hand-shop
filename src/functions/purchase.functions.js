const sortPurchases = (allPurchases, user, products, state) => {
    const sortedProducts = []

    if (!allPurchases) return sortedProducts

    allPurchases.forEach((purchase) => {

        if (
            purchase.state === state &&
            (purchase.seller === user._id || purchase.buyer === user._id)
        ) {
            const product = products.filter((product) => {

                return purchase.product === product._id
            });

            if (product) {
                product[0].purchaseId = purchase._id
                sortedProducts.push(product);
            }
        }
    });
    return sortedProducts;
};


export {
    sortPurchases
}