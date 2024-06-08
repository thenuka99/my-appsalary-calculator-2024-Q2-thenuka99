export const formatNumber = (num) => {
    const roundedNum = num.toFixed(2);
    const parts = roundedNum.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};