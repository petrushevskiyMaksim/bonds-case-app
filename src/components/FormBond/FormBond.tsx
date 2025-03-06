import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, DatePicker } from 'antd';
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
	const [form] = Form.useForm();

	return (
		<Form
			className={className}
			form={form}
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
				<Button type='primary' htmlType='button'>
					Фэйковая облигация
				</Button>
			</div>
		</Form>
	);
};

export default FormBond;
