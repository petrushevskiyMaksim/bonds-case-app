import React, { useState } from 'react';
import { Button, Modal, Flex, Input, Form } from 'antd';
import { useAppStoreContext } from '../../store/BondStoreProvider';
import type { Resourses } from '../../store/useResourseStore';
import { v4 as uuidv4 } from 'uuid';
import './modal.css';

export const MyModal: React.FC = () => {
	const [form] = Form.useForm();
	const { addResourse } = useAppStoreContext();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	// const handleOk = () => {
	// 	setIsModalVisible(false);
	// };

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = (values: Resourses) => {
		const newResourse: Resourses = {
			...values,
			id: uuidv4(), // Уникальный ключ для таблицы
		};

		addResourse(newResourse);
		form.resetFields(); // Очищаем поля формы после добавления
		setIsModalVisible(false); // Закрываем модальное окно
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Добавить ссылку
			</Button>
			<Modal
				centered
				open={isModalVisible}
				title='Добавить ссылку'
				// onOk={handleOk}
				onCancel={handleCancel}
				footer={
					<Flex className='modal-btn-wrap' gap={'20px'}>
						<Button
							key='link'
							href='https://google.com'
							target='_blank'
							type='primary'
							// onClick={handleOk}
						>
							Поиск в Google
						</Button>
						<Button key='back' onClick={handleCancel}>
							Назад
						</Button>
					</Flex>
				}
			>
				<Form form={form} onFinish={onFinish} layout='vertical'>
					<Form.Item name='text' label='Название' rules={[{ required: true }]}>
						<Input placeholder='Введите название' variant='filled' />
					</Form.Item>
					<Form.Item
						name='url'
						label='Ссылка (URL)'
						rules={[{ required: true }]}
					>
						<Input placeholder='Введите ссылку (URL)' variant='filled' />
					</Form.Item>
					<Form.Item>
						<Button
							key='submit'
							htmlType='submit'
							type='primary'
							// onClick={handleOk}
						>
							Добавить
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

// export default _Modal;
