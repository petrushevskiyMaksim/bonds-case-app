const ADD_BONDS = 'ADD_BONDS';
const DEL_BONDS = 'DEL_BONDS';
const ADD_RESOURSES = 'ADD_RESOURSES';
const DEL_RESOURSES = 'DEL_RESOURSES';

export const createStore = reducer => {
	let state = reducer({}, { type: 'INIT' });
	let subscribers = [];

	return {
		getState: () => state,
		dispatch: action => (state = reducer(state, action)),
		subsrcibe: callback => subscribers.push(callback),
	};
};

const initBondsListState = [
	{
		id: 1,
		name: 'name',
		age: 25,
	},
	{
		id: 2,
		name: 'vasa',
		age: 44,
	},
];

const initResoursesListState = [
	{
		id: Date.now(),
		text: 'SmartLab - Облигации',
		url: 'https://smart-lab.ru/q/ofz/',
	},
	{
		id: Date.now(),
		text: 'Московская биржа - Облигации',
		url: 'https://www.moex.com/s2644',
	},
	{
		id: Date.now(),
		text: 'RusBonds - Облигации',
		url: 'https://rusbonds.ru/',
	},
	{
		id: Date.now(),
		text: 'ДОХОД - Анализ облигации',
		url: 'https://www.dohod.ru/analytic/bonds',
	},
	{
		id: Date.now(),
		text: 'Investing.com - Облигации',
		url: 'https://ru.investing.com/rates-bonds/world-government-bonds',
	},
];

const initState = {
	initBondsListState: initBondsListState,
	initResoursesListState: initResoursesListState,
	isModalVisible: false,
};

const bondsReducer = (state = initState.initBondsListState, action) => {
	switch (action.type) {
		case ADD_BONDS:
			return [...state, action.payload];

		case DEL_BONDS:
			return state.filter(bond => bond.id !== action.payload);

		default:
			return state;
	}
};

const resoursReducer = (state = initState.initResoursesListState, action) => {
	switch (action.type) {
		case ADD_RESOURSES:
			return [...state, action.payload];
		case DEL_RESOURSES:
			return state.filter(bond => bond.id !== action.payload);

		default:
			return state;
	}
};

const modalReducer = (state = initState.isModalVisible, action) => {
	switch (action.type) {
		case 'IS_OPEN':
			return true;

		case 'IS_CLOSE':
			return false;

		default:
			return state;
	}
};

const combineReducer = reducersMap => {
	return (state, action) => {
		const newState = {};

		Object.entries(reducersMap).forEach(([key, reducer]) => {
			newState[key] = reducer(state[key], action);
		});

		return newState;
	};
};

export const rootReducer = combineReducer({
	bondsList: bondsReducer,
	resoursesList: resoursReducer,
	isModalVisible: modalReducer,
});

const store = createStore(rootReducer);

const state = store.getState();

const bondsList = state.bondsList;
console.log(bondsList);
