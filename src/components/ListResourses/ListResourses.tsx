import React from 'react';
import { List, Popconfirm } from 'antd';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { useAppStoreContext } from '../../store/BondStoreProvider';
import './ListResourses.css';

interface ListResoursesProps {
	className?: string; // Опциональный пропс
}

const ListResourses: React.FC<ListResoursesProps> = ({ className }) => {
	const { resourses, removeResourse } = useAppStoreContext();

	const handleIconClick = (id: string) => {
		removeResourse(id);
	};

	return (
		<>
			<List
				className={className}
				dataSource={resourses}
				split
				renderItem={item => (
					<List.Item className='list-item'>
						<Popconfirm
							title='Уверены, что хотите удалить?'
							onConfirm={() => handleIconClick(item.id)}
						>
							<HiMiniArrowTopRightOnSquare
								className='icon-resourses'
								size={15}
								strokeWidth={1}
							/>
						</Popconfirm>{' '}
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
