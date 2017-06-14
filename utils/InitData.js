
var data = [
	{
		id: 1,
		price: 1.0,
		name: 'Test01',
		description: 'Test01',
		creationDate: '2017-01-01'
	},
	{
		id: 2,
		price: 2.0,
		name: 'Test02',
		description: 'Test02',
		creationDate: '2017-01-01'
	},
	{
		id: 3,
		price: 3.0,
		name: 'Test03',
		description: 'Test03',
		creationDate: '2017-01-01'
	},
	{
		id: 4,
		price: 4.0,
		name: 'Test04',
		description: 'Test04',
		creationDate: '2017-01-01'
	},
	{
		id: 5,
		price: 5.0,
		name: 'Test05',
		description: 'Test05',
		creationDate: '2017-01-01'
	}
]

export default function initData() {
	localStorage.setItem("products", JSON.stringify(data));
}