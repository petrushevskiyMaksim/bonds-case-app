import { useReducer, useState, useEffect } from 'react';
import { DataType } from '../components/Table/TableEdit'; // тип облигации (структура данных)
import {
	calcBondCost,
	calcBondIncome,
	calcIncomeForMonth,
} from './calculations';
import { ADD_BONDS, DEL_BONDS, EDIT_BONDS } from './constatnts';

type BondsAction =
	| { type: typeof TOTAL_COST; payload: DataType }
	| { type: typeof DEL_BONDS; payload: React.Key }
	| { type: typeof EDIT_BONDS; payload: PayloadNewBond };
// | { type: typeof TOTAL_COST; payload: number }
// | { type: typeof TOTAL_INCOME; payload: number };

type PayloadNewBond = {
	key: string;
	newBond: DataType;
};

// Начальное состояние: список облигаций (может быть пустым или с предустановленными значениями)
const initialBonds: DataType[] = [
	// Пример начальных данных (можно оставить пустой массив):
	// { key: '1', name: 'Облигация 1' },
	// { key: '2', name: 'Облигация 2' },
];

// Редьюсер для управления списком облигаций
function bondsReducer(state: DataType[], action: BondsAction): DataType[] {
	switch (action.type) {
		case ADD_BONDS:
			// Добавляем новую облигацию в конец списка
			return [...state, action.payload as DataType];
		case DEL_BONDS:
			// Удаляем облигацию по ключу (React.Key)
			return state.filter(bond => bond.key !== action.payload);
		case EDIT_BONDS:
			// Редактируем облигацию
			return state.map(bond =>
				bond.key === action.payload.key
					? { ...bond, ...action.payload.newBond }
					: bond
			);

		default:
			return state;
	}
}

// Пользовательский хук для управления облигациями
export function useBondStore() {
	const [bonds, dispatch] = useReducer(bondsReducer, initialBonds);
	const [totalCost, setTotalCost] = useState((0).toFixed(2));
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalMonthIncome, setTotalMonthIncome] = useState((0).toFixed(2));

	// Функция для добавления новой облигации
	const addBond = (bond: DataType) => {
		dispatch({ type: ADD_BONDS, payload: bond });

		// Расчёт затрат на новую облигацию
		const bondCost = calcBondCost(bond);
		setTotalCost(prev => (Number(prev) + Number(bondCost)).toFixed(2));
	};

	// Функция для удаления облигации по ее ключу
	const removeBond = (key: string, isSell: boolean = false) => {
		const bondToRemove = bonds.find(bond => bond.key === key);
		if (bondToRemove && !isSell) {
			// Вычитаем затраты только если это не погашение
			const bondCost = calcBondCost(bondToRemove);
			setTotalCost(prev => (Number(prev) - Number(bondCost)).toFixed(2));
		}
		dispatch({ type: DEL_BONDS, payload: key });
	};

	// Функция для редактирования облигации
	const editingBond = (key: string, newBond: DataType) => {
		const oldBond = bonds.find(bond => bond.key === key);
		if (oldBond) {
			const oldCost = calcBondCost(oldBond);
			const newCost = calcBondCost(newBond);
			setTotalCost(prev =>
				(Number(prev) - Number(oldCost) + Number(newCost)).toFixed(2)
			);
		}
		dispatch({ type: EDIT_BONDS, payload: { key, newBond } });
	};

	// Пересчёт доходов при изменении списка облигаций
	useEffect(() => {
		const income = calcBondIncome(bonds, removeBond, editingBond);
		setTotalIncome(prev => (Number(prev) + Number(income)).toFixed(2));
	}, [bonds]);

	const changeMonthIncome = (bonds, month) => {
		const monthIncome = calcIncomeForMonth(bonds, month);
		setTotalMonthIncome(monthIncome);
	};

	// Возвращаем текущее состояние и функции для изменения состояния
	return {
		bonds,
		addBond,
		removeBond,
		editingBond,
		totalCost,
		totalIncome,
		totalMonthIncome,
		changeMonthIncome,
	};
}
