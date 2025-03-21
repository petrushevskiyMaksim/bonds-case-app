import React, { createContext, useContext } from 'react';
import { useBondStore } from './useBondStore';
import { useResoursesStore } from './useResourseStore';
import type { Resourses } from './useResourseStore';
import type { DataType } from '../components/Table/TableEdit';

// Определяем тип контекста, который содержит список облигаций и функции для их изменения
interface AppStoreContextType {
	bonds: DataType[]; // Состояние облигаций
	addBond: (bond: DataType) => void; // Метод для добавления облигации
	removeBond: (key: React.Key) => void; // Метод для удаления облигации
	editingBond: (key: React.Key, newBond: DataType) => void;
	resourses: Resourses[]; // Состояние ресурсов
	addResourse: (resourse: Resourses) => void; // Метод для добавления ресурса
	removeResourse: (key: React.Key) => void; // Метод для удаления ресурса
	totalCost: number; // Метод расчета Расходов
	totalIncome: number; // Метод расчета Доходов
}

// Создаем контекст с начальным значением null
const AppStoreContext = createContext<AppStoreContextType | null>(null);

// Провайдер для хранения общего состояния облигаций
export const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const bondsStore = useBondStore(); // получаем состояние из кастомного хука
	const resoursesStore = useResoursesStore(); // получаем состояние из кастомного хука

	// Объединяем оба хранилища в один объект
	const combinedStore = {
		...bondsStore,
		...resoursesStore,
	};

	return (
		<AppStoreContext.Provider value={combinedStore}>
			{children}
		</AppStoreContext.Provider>
	);
};

// Хук для доступа к контексту. Если контекст не найден, выбрасывается ошибка.
export const useAppStoreContext = () => {
	const context = useContext(AppStoreContext);
	if (!context) {
		throw new Error(
			'useBondStoreContext must be used within a BondStoreProvider'
		);
	}
	return context;
};
