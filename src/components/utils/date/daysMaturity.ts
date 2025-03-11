import moment from 'moment';
import dayjs from 'dayjs';
import { formateDate } from '../date/formateDate';

export function daysMaturity(bond) {
	const { buyDate, sellDate } = bond;
	console.log(buyDate);
	console.log(sellDate);

	const parseDate = value => {
		if (moment.isMoment(value)) {
			return value; // Если это уже Moment объект
		} else if (dayjs.isDayjs(value)) {
			return moment(value.toISOString()); // Преобразуем Day.js в Moment
		} else if (typeof value === 'string') {
			// const newValue = formateDate(value);
			return moment(value, 'DD-MM-YYYY'); // Если это строка, создаем Moment объект
		} else {
			throw new Error('Неверный формат даты');
		}
	};

	function calculateDaysToMaturity(buyDate, sellDate) {
		const momentSaleDate = parseDate(sellDate);
		const momentPurchaseDate = parseDate(buyDate);

		// Вычисляем разницу в днях
		const differenceInDays = momentSaleDate.diff(momentPurchaseDate, 'days');
		return differenceInDays;
	}

	return calculateDaysToMaturity(buyDate, sellDate);

	// Форматируем результат в строку "день месяц год"
	// return differenceInDays.format('DD-MMMM YYYY');

	// return {
	// 	differenceInDays,
	// 	formattedDate,
	// };

	// let diff;

	// if (moment.isMoment(buyDate) && moment.isMoment(sellDate)) {
	// 	diff = sellDate.diff(buyDate, 'day');
	// } else if (dayjs.isDayjs(buyDate) && dayjs.isDayjs(sellDate)) {
	// 	diff = sellDate.diff(buyDate, 'day');
	// } else {
	// 	const dayBuy = formateDate(buyDate);
	// 	const daySell = formateDate(sellDate);
	// 	const createMomentBuyDay = moment(buyDate, 'DD-MM-YYYY');
	// 	const createMomentSellDay = moment(sellDate, 'DD-MM-YYYY');

	// 	diff = createMomentSellDay.diff(createMomentBuyDay, 'day');
	// 	console.log(diff);
}
