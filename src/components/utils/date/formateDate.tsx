import moment from 'moment'; // Импортируем moment для работы с датами

export const formateDate = (dateString: string): string => {
	// Возможные форматы
	const possibleFormats = ['YYYY-MM-DD', 'DD-MM-YYYY'];

	// Проверяем, какой формат подходит
	let validFormat: string | null = null;

	for (const format of possibleFormats) {
		if (moment(dateString, format, true).isValid()) {
			validFormat = format;
			break;
		}
	}
	if (!validFormat) {
		return dateString;
		// throw new Error('Некорректный формат даты');
	}

	// Создаем объект moment на основе правильного формата
	const date = moment(dateString, validFormat);

	// Преобразуем объект moment в строку в формате "день-месяц-год"
	return date.format('DD-MM-YYYY');
};
