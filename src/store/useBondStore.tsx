import { useReducer } from 'react';
import { DataType } from '../components/Table/TableEdit'; // тип облигации (структура данных)
import { ADD_BONDS, DEL_BONDS, EDIT_BONDS } from './constatnts';

type BondsAction =
	| { type: string; payload: DataType }
	| { type: string; payload: React.Key }
	| { type: 'EDIT_BONDS'; payload: DataType };

// Начальное состояние: список облигаций (может быть пустым или с предустановленными значениями)
const initialBonds: DataType[] = [
	// Пример начальных данных (можно оставить пустой массив):
	// { key: '1', name: 'Облигация 1', ... остальные поля ... },
	// { key: '2', name: 'Облигация 2', ... },
];

// Редьюсер для управления списком облигаций
function bondsReducer(state: DataType[], action: BondsAction): DataType[] {
	switch (action.type) {
		case ADD_BONDS:
			// Добавляем новую облигацию в конец списка
			return [...state, action.payload];
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

	// Функция для добавления новой облигации
	const addBond = (bond: DataType) => {
		dispatch({ type: ADD_BONDS, payload: bond });
	};

	// Функция для удаления облигации по ее ключу
	const removeBond = (key: React.Key) => {
		dispatch({ type: DEL_BONDS, payload: key });
	};

	// Функция для редактирования облигации
	const editingBond = (key: React.Key, newBond) => {
		dispatch({ type: EDIT_BONDS, payload: { key, newBond } });
	};

	// Возвращаем текущее состояние и функции для изменения состояния
	return { bonds, addBond, removeBond, editingBond };
}
