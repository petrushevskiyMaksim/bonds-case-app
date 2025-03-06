import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import _Select from '../Select/Select';
import { MONTH_FOR_SELECT } from '../../constants';
import { FaRubleSign } from 'react-icons/fa';
import './InfoTotal.css';

const { Text } = Typography;

const InfoTotal = () => {
	const [sumCost, setSumCost] = useState(0);
	const [sumIncome, setSumIncome] = useState((0).toFixed(2));

	const COLUMNS = [
		{
			title: 'Расходы',
			number: sumCost,
			type: 'cost',
		},
		{
			title: 'Прибыль',
			number: sumIncome,
			type: 'income',
		},
		{
			title: 'Сумма дохода в ',
			number: 0,
			type: 'income',
		},
		{
			title: 'Средне годовая доходность',
			number: 0,
			type: 'income',
		},
	];



	const handleSelectChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const handleSelectSearch = (value: string) => {
		console.log('search:', value);
	};

	return (
		<Row className='row-info-total' justify={'space-between'} gutter={16}>
			{COLUMNS.map((item, i) => (
				<Col span={6} key={i}>
					<Card
						hoverable
						title={
							item.title === 'Сумма дохода в ' ? (
								<div className='card-title-wrap'>
									{item.title}{' '}
									<_Select
										placeholder={'Месяц'}
										options={MONTH_FOR_SELECT}
										onChange={handleSelectChange}
										onSearch={handleSelectSearch}
									/>
								</div>
							) : (
								item.title
							)
						}
					>
						<Text
							className='text-card'
							type={item.type === 'cost' ? 'danger' : 'success'}
						>
							{item.number} <FaRubleSign />
						</Text>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default InfoTotal;
