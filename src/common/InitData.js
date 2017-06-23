import AppConstants from './constants';

var data = [
	{
		id: "1000000000000",
		price: 1.0,
		name: 'Product 01',
		description: 'Description 01',
		creationDate: '2017-01-01'
	},
	{
		id: "1000000000001",
		price: 2.0,
		name: 'Product 02',
		description: 'Description 02',
		creationDate: '2017-01-01'
	},
	{
		id: "1000000000002",
		price: 3.0,
		name: 'Product 03',
		description: 'Description 03',
		creationDate: '2017-01-01'
	},
	{
		id: "1000000000003",
		price: 4.0,
		name: 'Product 04',
		description: 'Description 04',
		creationDate: '2017-01-01'
	},
	{
		id: "1000000000004",
		price: 5.0,
		name: 'Product 05',
		description: 'Description 05',
		creationDate: '2017-01-01'
	}
]

export default function initData() {
	if (localStorage.getItem(AppConstants.PRODUCTS_STORAGE) === null || localStorage.getItem(AppConstants.PRODUCTS_STORAGE) === undefined) {
		localStorage.setItem(AppConstants.PRODUCTS_STORAGE, JSON.stringify(data));
	}
}