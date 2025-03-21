import type { DataType } from '../components/Table/TableEdit';
import moment from 'moment';

const getNextCouponDate = (currentDate: string, period: number): string => {
	const nextDate = moment(currentDate, 'DD-MM-YYYY');

	if (period == 2) {
		nextDate.add(182, 'days');
	} else if (period == 4) {
		nextDate.add(90, 'days');
	} else {
		nextDate.add(365, 'days');
	}

	return nextDate.format('DD-MM-YYYY');
};

const calcCouponBondProfit = bond => {
	const result = bond.couponPrice * bond.sumBonds;

	return result;
};

const calcSellBondProfit = bond => {
	const result =
		bond.sumBonds *
			(bond.nominalPrice -
				(bond.buyPrice + bond.NKD + bond.buyPrice * (bond.brokerTax / 100))) +
		bond.sumBonds * bond.couponPrice;

	return result;
};

export const calcBondCost = (bond: DataType) => {
	const { buyPrice, sumBonds, NKD, brokerTax } = bond;
	const taxAmount = buyPrice * (brokerTax / 100);
	const totalCost = sumBonds * (buyPrice + NKD + taxAmount);
	return totalCost;
};

export const calcBondIncome = (
	bonds: DataType[],
	removeBond: (key: string) => void,
	editingBond: (key: string, newBond: DataType) => void
): number | string => {
	let totalIncome = 0; // Создаем переменную куда будем записывать все доходы
	const updatedBonds = [...bonds]; // Создаем копию массива (поверхностная копия)
	const today = moment().startOf('day'); // Создаем сегодня

	// Перебор нашего нового массива облигаций
	updatedBonds.forEach(bond => {
		// Проверка даты погашения
		//  преобразовываем даты в timestamp(миллисекунды)
		if (today.isSame(moment(bond.sellDate, 'DD-MM-YYYY'), 'day')) {
			// Высчитываем разницу между покупкой и продажей(погашением) + купон со всех бумаг
			const profitSell = calcSellBondProfit(bond);
			totalIncome += profitSell; // Добавляем прибыль от продажи(погашения) облигации

			// updatedBonds.splice(index, 1); // Удаляем облигацию из списка
			removeBond(bond.key, true);
		}

		// Проверка даты купона
		//  преобразовываем даты в timestamp(миллисекунды)
		if (today.isSame(moment(bond.couponDate, 'DD-MM-YYYY'), 'day')) {
			const profitCoupon = calcCouponBondProfit(bond); // Добавляем сумму купона
			totalIncome += profitCoupon;

			// Изменяем дату купона на следующую
			const nextCouponDate = getNextCouponDate(
				bond.couponDate,
				bond.couponPeriod
			);
			// Обновляем дату купона в обьекте облигации
			const updateBond: DataType = {
				...bond,
				couponDate: nextCouponDate,
			};
			// Добавляем обновленный обьект облигацию с новой датой в массив облигаций
			editingBond(bond.key, updateBond);
		}
	});

	return totalIncome;
};

const getNumberMonth = (month: string) => {
	const months = [
		'январь',
		'февраль',
		'март',
		'апрель',
		'май',
		'июнь',
		'июль',
		'август',
		'сентябрь',
		'октябрь',
		'ноябрь',
		'декабрь',
	];
	const dateParts = month.split('-');
	if (dateParts.length === 3) {
		const numberMonth = parseInt(dateParts[1]);
		if (numberMonth >= 1 && numberMonth <= 12) {
			return numberMonth;
		} else {
			alert('Введен неверный формат месяца');
			return null;
		}
	} else {
		const wordMonth = month.toLowerCase();
		const indexMonth = months.indexOf(wordMonth);

		return indexMonth !== -1
			? indexMonth + 1
			: alert('Введен неверный формат месяца');
	}
};

export const calcIncomeForMonth = (
	bonds: DataType[],
	month: string | number
) => {
	if (bonds.length === 0 || !bonds) return (0).toFixed(2);
	if (!month) return;
	let totalIncomeMonth = 0;
	const selectNumberMonth = getNumberMonth(month);

	bonds.forEach(bond => {
		const getCouponMonth = getNumberMonth(bond.couponDate);
		const getSellMonth = getNumberMonth(bond.sellDate);

		if (selectNumberMonth === getCouponMonth) {
			totalIncomeMonth += calcCouponBondProfit(bond);
		} else if (selectNumberMonth === getSellMonth) {
			totalIncomeMonth += calcSellBondProfit(bond);
		} else {
			return totalIncomeMonth;
		}
	});
	return totalIncomeMonth;
};

// const calcCurrentYield = () => {};
