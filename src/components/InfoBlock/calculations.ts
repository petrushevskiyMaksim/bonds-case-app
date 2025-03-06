import moment from 'moment';

export const calcCost = bonds => {
	let totalCost = 0; // Переменная для хранения общей суммы затрат
	console.log(bonds);

	bonds.forEach(bond => {
		const procent = bond.buyPrice * (bond.brokerTax / 100);
		const result =
			bond.sumBonds *
			(Number(bond.buyPrice) + Number(procent) + Number(bond.NKD));
		totalCost += result; // Суммируем затраты
	});
	return totalCost.toFixed(2);
};

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

export const calcIncome = (bonds, sumIncome, setSumIncome, setBonds) => {
	let totalIncome = 0; // Создаем переменную куда будем записывать все доходы
	const updatedDataForm = [...bonds]; // Создаем копию массива (поверхностная копия)
	const today = moment().startOf('day'); // Создаем сегодня

	if (updatedDataForm.length === 0) return;
	// Перебор нашего нового массива облигаций
	updatedDataForm.forEach((bond, index) => {
		// Проверка даты погашения
		//  преобразовываем даты в timestamp(миллисекунды)
		if (today.isSame(moment(bond.sellDate, 'DD-MM-YYYY'), 'day')) {
			// Высчитываем разницу между покупкой и продажей(погашением) + купон со всех бумаг
			const profit =
				bond.sumBonds *
					(bond.nominalPrice -
						(bond.buyPrice +
							bond.NKD +
							bond.buyPrice * (bond.brokerTax / 100))) +
				bond.sumBonds * bond.couponPrice;
			totalIncome += profit; // Добавляем прибыль от продажи(погашения) облигации
			updatedDataForm.splice(index, 1); // Удаляем облигацию из списка
		}

		// Проверка даты купона
		//  преобразовываем даты в timestamp(миллисекунды)
		if (today.isSame(moment(bond.couponDate, 'DD-MM-YYYY'), 'day')) {
			totalIncome += bond.couponPrice * bond.sumBonds; // Добавляем сумму купона
			// Изменяем дату купона на следующую
			bond.couponDate = getNextCouponDate(bond.couponDate, bond.couponPeriod);
		}
	});

	// setSumIncome(totalIncome); // Обновляем состояние прибыли
	// setDataForm(updatedDataForm); // Обновляем состояние dataForm (списка облигаций)

	// Проверяем, изменился ли доход
	if (totalIncome !== sumIncome) {
		setSumIncome(totalIncome);
	}

	// Проверяем, изменился ли bonds
	if (JSON.stringify(updatedDataForm) !== JSON.stringify(bonds)) {
		setBonds(updatedDataForm);
		console.log(`dataForm изменился в CALCINCOME: ${bonds}`);
	}

	return updatedDataForm;
};
