import React, { createContext, useContext, useState } from 'react';
import { DataType } from '../components/Table/TableEdit';
import { store } from './store';

const myStore = store;

// export interface Resource {
// 	id: number;
// 	text: string;
// 	url: string;
// }

// const dataResourses: Resource[] = [
// 	{
// 		id: Date.now(),
// 		text: 'SmartLab - Облигации',
// 		url: 'https://smart-lab.ru/q/ofz/',
// 	},
// 	{
// 		id: Date.now(),
// 		text: 'Московская биржа - Облигации',
// 		url: 'https://www.moex.com/s2644',
// 	},
// 	{
// 		id: Date.now(),
// 		text: 'RusBonds - Облигации',
// 		url: 'https://rusbonds.ru/',
// 	},
// 	{
// 		id: Date.now(),
// 		text: 'ДОХОД - Анализ облигации',
// 		url: 'https://www.dohod.ru/analytic/bonds',
// 	},
// 	{
// 		id: Date.now(),
// 		text: 'Investing.com - Облигации',
// 		url: 'https://ru.investing.com/rates-bonds/world-government-bonds',
// 	},
// ];

interface DataFormContextType {
	bondsList: DataType[];
	setBondsList: React.Dispatch<React.SetStateAction<DataType[]>>;
	resources: Resource[]; // Состояние для списка полезных ресурсов
	setResources: React.Dispatch<React.SetStateAction<Resource[]>>; // Функция для управления списком ресурсов
	isModalVisible: boolean; // Состояние видимости модального окна
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // Функция для управления видимостью модального окна
}

const storeContext = createContext<DataFormContextType | undefined>(myStore);

export const storeProvider: React.FC<{ children: React.ReactNode }> = ({
	store,
	children,
}) => {
	return (
		<storeContext.Provider value={store}>{children}</storeContext.Provider>
	);
};

export const useStore = () => {
	const context = useContext(storeContext);
	console.log(context);

	if (!context) {
		throw new Error('useDataForm must be used within a DataFormProvider');
	}
	return context;
};
