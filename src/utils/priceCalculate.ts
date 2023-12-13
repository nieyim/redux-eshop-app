export function priceCalculate(dcPrice: number, dcPercent: number) {
    const discountedPrice = (dcPrice - (dcPrice * dcPercent) / 100).toFixed(0);
    return discountedPrice;
}
