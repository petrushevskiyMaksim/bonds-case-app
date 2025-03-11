import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, DatePicker } from 'antd';
import { useBondStoreContext } from '../../store/BondStoreProvider';
import { daysMaturity } from '../utils/date/daysMaturity';
import { calcCouponIncome } from '../utils/calculations/calcCouponIncome';
import { DataType } from '../Table/TableEdit'; // тип облигации (структура данных)
import moment from 'moment'; // Импортируем moment для работы с датами
import './form.css';

interface FormBondProps {
	className?: string; // Опциональный пропс
}

interface SubmitButtonProps {
	form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
	form,
	children,
}) => {
	const [submittable, setSubmittable] = React.useState<boolean>(false);
	const values = Form.useWatch([], form);
	React.useEffect(() => {
		form
			.validateFields({ validateOnly: true })
			.then(() => setSubmittable(true))
			.catch(() => setSubmittable(false));
	}, [form, values]);
	return (
		<Button type='primary' htmlType='submit' disabled={!submittable}>
			{children}
		</Button>
	);
};

const FormBond: React.FC<FormBondProps> = ({ className }) => {
	const { bonds, addBond } = useBondStoreContext();
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		// const { calcDaysToMaturity } = daysMaturity(values);
		console.log(values.buyDate);

		const newBond: DataType = {
			...values,
			// Преобразуем объекты moment в строки
			buyDate: values.buyDate ? values.buyDate.format('DD-MM-YYYY') : '',
			sellDate: values.sellDate ? values.sellDate.format('DD-MM-YYYY') : '',
			couponDate: values.couponDate
				? values.couponDate.format('DD-MM-YYYY')
				: '',

			couponIncome: calcCouponIncome(values),
			// couponIncomeRub: calcCouponRub(values),
			daysToMaturity: daysMaturity(values),
			// yieldYear: yieldYearIncome(values),
			key: Date.now().toString(),
			order: bonds.length + 1,
		};

		addBond(newBond);
		form.resetFields();
	};

	const fillFakeData = () => {
		const randomName = 'ОФЗ ' + Math.floor(Math.random() * 10000);
		const randomSum = Math.floor(Math.random() * 10) + 1;
		const randomNominal = 1000; // 1000
		const randomBuyPrice = Math.floor(Math.random() * 900) + 100; // от 100 до 1000
		const randomBrokerTax = Number((Math.random() * 0.5).toFixed(2)); // от 0 до 0.5
		const randomCouponPrice = Math.floor(Math.random() * 90) + 10; // от 10 до 100
		const randomCouponPeriod = Math.floor(Math.random() * 4) + 1; // от 1 до 4
		const randomNKD = Number((Math.random() * 100).toFixed(0)); // от 0 до 100

		// Генерация дат: для buyDate выбираем случайное число дней назад, для sellDate – дату после buyDate,
		// а для couponDate – ближайшую будущую дату.
		const buyDate = moment().subtract(Math.floor(Math.random() * 100), 'days');
		const sellDate = moment(buyDate).add(
			Math.floor(Math.random() * 30) + 1,
			'days'
		);
		const couponDate = moment().add(Math.floor(Math.random() * 30) + 1, 'days');

		form.setFieldsValue({
			name: randomName,
			sumBonds: randomSum,
			nominalPrice: randomNominal,
			buyPrice: randomBuyPrice,
			brokerTax: randomBrokerTax,
			buyDate: buyDate,
			sellDate: sellDate,
			couponPrice: randomCouponPrice,
			couponDate: couponDate,
			couponPeriod: randomCouponPeriod,
			NKD: randomNKD,
		});
	};

	return (
		<Form
			className={className}
			form={form}
			onFinish={onFinish}
			name='validateOnly'
			layout='vertical'
			autoComplete='on'
		>
			<div className='form'>
				<Form.Item
					name='name'
					label='Название облигации'
					rules={[{ required: true }]}
				>
					<Input placeholder='Например: ОФЗ 26022' />
				</Form.Item>
				<Form.Item
					name='sumBonds'
					label='Количество облигаций'
					rules={[{ required: true }]}
				>
					<Input type='number' min={1} placeholder='Например: 2' />
				</Form.Item>
				<Form.Item
					name='nominalPrice'
					label='Номинальная цена'
					rules={[{ required: true }]}
				>
					<Input type='number' min={0} placeholder='1000' />
				</Form.Item>
				<Form.Item
					name='buyPrice'
					label='Цена покупки'
					rules={[{ required: true }]}
				>
					<Input type='number' min={1} placeholder='Например: 847' />
				</Form.Item>
				<Form.Item
					name='brokerTax'
					label='Комиссия брокера'
					rules={[{ required: true }]}
				>
					<Input
						type='number'
						min={0}
						step='0.01'
						placeholder='Например: 0.3'
					/>
				</Form.Item>
				<Form.Item
					name='buyDate'
					label='Дата покупки'
					rules={[{ required: true }]}
				>
					<DatePicker format='YYYY-MM-DD' />
				</Form.Item>
				<Form.Item
					name='sellDate'
					label='Дата продажи'
					rules={[{ required: true }]}
				>
					<DatePicker format='YYYY-MM-DD' />
				</Form.Item>
				<Form.Item
					name='couponPrice'
					label='Купон'
					rules={[{ required: true }]}
				>
					<Input type='number' min={0} placeholder='Например: 35' />
				</Form.Item>
				<Form.Item
					name='couponDate'
					label='Дата ближайшего купона'
					rules={[{ required: true }]}
				>
					<DatePicker format='YYYY-MM-DD' />
				</Form.Item>
				<Form.Item
					name='couponPeriod'
					label='Купонов в год'
					rules={[{ required: true }]}
				>
					<Input type='number' min={0} placeholder='Например: 2' />
				</Form.Item>
				<Form.Item
					name='NKD'
					label='Накопленный купонный доход'
					rules={[{ required: true }]}
				>
					<Input type='number' min={0} placeholder='Например: 27.4' />
				</Form.Item>
			</div>
			<div className='form-buttons'>
				<SubmitButton form={form}>Добавить облигацию</SubmitButton>
				<Button type='primary' htmlType='reset'>
					Очистить форму
				</Button>
				<Button type='primary' htmlType='button' onClick={fillFakeData}>
					Фэйковая облигация
				</Button>
			</div>
		</Form>
	);
};

export default FormBond;
