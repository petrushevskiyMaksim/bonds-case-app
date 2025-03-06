import React from 'react';
import { List } from 'antd';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import './ListResourses.css';

interface ListResoursesProps {
	className?: string; // Опциональный пропс
}

const ListResourses: React.FC<ListResoursesProps> = ({ className }) => {
	const dataResourses: Resource[] = [
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
	return (
		<>
			<List
				className={className}
				dataSource={dataResourses}
				split
				renderItem={item => (
					<List.Item className='list-item'>
						<HiMiniArrowTopRightOnSquare
							className='icon-resourses'
							size={15}
							strokeWidth={1}
						/>{' '}
						<a target='_blank' href={item.url} rel='noopener noreferrer'>
							{item.text}
						</a>
					</List.Item>
				)}
			/>
		</>
	);
};

export default ListResourses;
