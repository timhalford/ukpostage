// utility to help sort service items by price,
// returns -1 if left price < right price,
// 1 if left price > right price
function servicePriceSort(left, right) {
	console.log(typeof(left.price), parseFloat(left.price))
	if (parseFloat(left.price) < parseFloat(right.price)) {
		return -1;
	}
	return 1;
}

module.exports = {
	servicePriceSort: servicePriceSort
}