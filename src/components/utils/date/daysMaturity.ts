import moment from 'moment';
import dayjs from 'dayjs';
import { DataType } from '../../../components/Table/TableEdit'; // тип облигации (структура данных)

type DateInput = moment.Moment | dayjs.Dayjs | string;

function parseDate(input: DateInput): moment.Moment {
	if (moment.isMoment(input)) {
		return input;
	}

	if (dayjs.isDayjs(input)) {
		return moment(input.toDate());
	}

	// Предполагаем, что строка может быть в формате "день месяц год" или "год месяц день"
	const formats = ['DD-MM-YYYY', 'YYYY-MM-DD'];
	const parsedDate = moment(input, formats, true);

	if (!parsedDate.isValid()) {
		console.log(input);

		throw new Error('Неверный формат даты');
	}

	return parsedDate;
}

export function calculateDateDifference(bond: DataType): string {
	const { buyDate, sellDate } = bond;
	const momentDate1 = parseDate(sellDate);
	const momentDate2 = parseDate(buyDate);

	const diff = momentDate1.diff(momentDate2, 'days'); // Разница в днях

	return diff;
}
