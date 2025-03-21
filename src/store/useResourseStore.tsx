import { useReducer } from 'react';
import { ADD_RESOURSES, DEL_RESOURSES } from './constatnts';
import { v4 as uuidv4 } from 'uuid';

export type Resourses = {
	id?: string;
	text: string;
	url: string;
};

type ResourseAction =
	| { type: typeof ADD_RESOURSES; payload: Resourses } // Для добавления
	| { type: typeof DEL_RESOURSES; payload: string }; // Для удаления

const initialResourse: Resourses[] = [
	{
		id: uuidv4(),
		text: 'SmartLab - Облигации',
		url: 'https://smart-lab.ru/q/ofz/',
	},
	{
		id: uuidv4(),
		text: 'Московская биржа - Облигации',
		url: 'https://www.moex.com/s2644',
	},
	{
		id: uuidv4(),
		text: 'RusBonds - Облигации',
		url: 'https://rusbonds.ru/',
	},
	{
		id: uuidv4(),
		text: 'ДОХОД - Анализ облигации',
		url: 'https://www.dohod.ru/analytic/bonds',
	},
	{
		id: uuidv4(),
		text: 'Investing.com - Облигации',
		url: 'https://ru.investing.com/rates-bonds/world-government-bonds',
	},
];

// Редьюсер для управления списком облигаций
function resoursesReducer(
	state: Resourses[],
	action: ResourseAction
): Resourses[] {
	switch (action.type) {
		case ADD_RESOURSES:
			// Добавляем
			return [...state, action.payload as Resourses];
		case DEL_RESOURSES:
			// Удаляем
			return state.filter(
				(resourse: Resourses) => resourse.id !== action.payload
			);

		default:
			return state;
	}
}

// Пользовательский хук для управления облигациями
export function useResoursesStore() {
	const [resourses, dispatch] = useReducer(resoursesReducer, initialResourse);

	// Функция для добавления
	const addResourse = (resourse: Resourses) => {
		dispatch({ type: ADD_RESOURSES, payload: resourse });
	};

	// Функция для удаления облигации по ее ключу
	const removeResourse = (key: string) => {
		dispatch({ type: DEL_RESOURSES, payload: key });
	};

	// Возвращаем текущее состояние и функции для изменения состояния
	return { resourses, addResourse, removeResourse };
}
