import React, { createContext, useContext } from 'react';
import { useBondStore } from './useBondStore';
import type { DataType } from '../components/Table/TableEdit';

// Определяем тип контекста, который содержит список облигаций и функции для их изменения
interface BondStoreContextType {
	bonds: DataType[];
	addBond: (bond: DataType) => void;
	removeBond: (key: React.Key) => void;
}

// Создаем контекст с начальным значением null
const BondStoreContext = createContext<BondStoreContextType | null>(null);

// Провайдер для хранения общего состояния облигаций
export const BondStoreProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const bondStore = useBondStore(); // получаем состояние из кастомного хука
	return (
		<BondStoreContext.Provider value={bondStore}>
			{children}
		</BondStoreContext.Provider>
	);
};

// Хук для доступа к контексту. Если контекст не найден, выбрасывается ошибка.
export const useBondStoreContext = () => {
	const context = useContext(BondStoreContext);
	if (!context) {
		throw new Error(
			'useBondStoreContext must be used within a BondStoreProvider'
		);
	}
	return context;
};
