import { Form } from 'antd';

const [form] = Form.useForm();

export 
const fillFakeData = () => {

	const randomName = 'ОФЗ ' + Math.floor(Math.random() * 10000);
	const randomSum = Math.floor(Math.random() * 10) + 1;
	const randomNominal = 1000; // 1000
	const randomBuyPrice = Math.floor(Math.random() * 900) + 100; // от 100 до 1000
	const randomBrokerTax = Number((Math.random() * 0.5).toFixed(2)); // от 0 до 0.5
	const randomCouponPrice = Math.floor(Math.random() * 90) + 10; // от 10 до 100
	const randomCouponPeriod = Math.floor(Math.random() * 4) + 1; // от 1 до 4
	const randomNKD = Number((Math.random() * 100).toFixed(0)); // от 0 до 100

	// Генерация дат: для buyDate выбираем случайное число дней назад, для sellDate – дату после buyDate,
	// а для couponDate – ближайшую будущую дату.
	const buyDate = moment().subtract(Math.floor(Math.random() * 100), 'days');
	const sellDate = moment(buyDate).add(
		Math.floor(Math.random() * 30) + 1,
		'days'
	);
	const couponDate = moment().add(Math.floor(Math.random() * 30) + 1, 'days');

	form.setFieldsValue({
		name: randomName,
		sumBonds: randomSum,
		nominalPrice: randomNominal,
		buyPrice: randomBuyPrice,
		brokerTax: randomBrokerTax,
		buyDate: buyDate,
		sellDate: sellDate,
		couponPrice: randomCouponPrice,
		couponDate: couponDate,
		couponPeriod: randomCouponPeriod,
		NKD: randomNKD,
	});
};
