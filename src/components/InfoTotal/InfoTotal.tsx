import React from 'react';
import { useAppStoreContext } from '../../store/BondStoreProvider';
import { Card, Row, Col, Typography } from 'antd';
import _Select from '../Select/Select';
import { calcIncomeForMonth } from '../../store/calculations';
import { MONTH_FOR_SELECT } from '../../constants';
import { FaRubleSign } from 'react-icons/fa';
import './InfoTotal.css';

const { Text } = Typography;

const InfoTotal = React.memo(() => {
	const { bonds, totalCost, totalIncome, totalMonthIncome, changeMonthIncome } =
		useAppStoreContext();

	const COLUMNS = [
		{
			title: 'Расходы',
			number: totalCost,
			type: 'cost',
		},
		{
			title: 'Доходы',
			number: totalIncome,
			type: 'income',
		},
		{
			title: 'Сумма дохода в ',
			number: totalMonthIncome,
			type: 'income',
		},
		{
			title: 'Текущая доходность',
			number: 0,
			type: 'income',
		},
	];

	const handleSelectChange = (value: string) => {
		console.log(`selected ${value}`);
		changeMonthIncome(bonds, value);
		// calcProfitForMonth(bonds, value);
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
});

export default InfoTotal;
