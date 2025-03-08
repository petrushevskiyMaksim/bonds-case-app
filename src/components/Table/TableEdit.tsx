import React, { useState } from 'react';
import { Table, Form, Input, InputNumber, Typography, Popconfirm } from 'antd';
import { useBondStoreContext } from '../../store/BondStoreProvider';
import type { ColumnType } from 'antd/es/table';
import './table.css';

// Новый интерфейс для столбцов с добавленным свойством editable
interface EditableColumnType<DataType> extends ColumnType<DataType> {
	editable?: boolean; // Добавляем свойство editable
	dataIndex?: string;
	width?: number;
}

interface TableEditProps {
	className?: string; // Опциональный пропс
}

export interface DataType {
	key: string;
	order: number;
	name: string;
	sumBonds: number;
	nominalPrice: number;
	buyPrice: number;
	brokerTax: number;
	buyDate: string; // "YYYY-MM-DD"
	sellDate: string; // "YYYY-MM-DD"
	couponPrice: number;
	couponDate: string; // "YYYY-MM-DD"
	couponPeriod: number;
	NKD: number;
	daysToMaturity: number;
	yieldYear: number;
	editable: boolean;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: string;
	inputType: 'string' | 'date' | 'number';
	record: DataType;
	index: number;
}

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	let inputNode: React.ReactNode;

	switch (inputType) {
		case 'string':
			inputNode = <Input />;
			break;
		case 'date':
			// Используем нативный календарь
			inputNode = <Input type='date' />;
			break;
		case 'number':
		default:
			inputNode = <InputNumber />;
	}

	// Правила валидации
	const rules = [{ required: true, message: `Пожалуйста, введите ${title}!` }];

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item name={dataIndex} style={{ margin: 0 }} rules={rules}>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const TableEdit: React.FC<TableEditProps> = ({ className }) => {
	const { bonds, removeBond, editingBond } = useBondStoreContext();
	const [editingKey, setEditingKey] = useState<string>('');
	const [form] = Form.useForm();

	const isEditing = (record: DataType) => record.key === editingKey;

	const edit = (record: DataType) => {
		form.setFieldsValue({ ...record });
		setEditingKey(record.key);
	};

	const handleDelete = (key: React.Key) => {
		removeBond(key);
	};

	// Сохранение изменений
	const save = async (key: React.Key) => {
		try {
			// Получаем значения из формы (отредактированный обьект ОФЗ)
			const row = await form.validateFields();
			// Копируем массив облигаций
			const newBonds = [...bonds];
			// Находим в массиве индекс того обьекта(ОФЗ) на котором нажали Edit
			const index = newBonds.findIndex(item => key === item.key);

			// Если индекс 0 или больше значит элемент есть в массиве и мы попадаем в этот блок
			if (index > -1) {
				// Создаем текущий элемент на котором было нажатие
				const currentItem: DataType = newBonds[index];

				// Обновляем запись формируем из данных текущего элемента и добавляем обновленные данные из отредактированного элемента
				const updatedRow = {
					...currentItem,
					...row,
				};

				// newBonds.splice(index, 1, updatedRow);
				editingBond(updatedRow.key, updatedRow);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const cancel = () => {
		setEditingKey('');
	};

	// Определяем столбцы таблицы
	const columns: EditableColumnType<DataType>[] = [
		{
			title: '№',
			dataIndex: 'order',
			width: 50,
			editable: false,
			sorter: (a, b) => a.order - b.order,
		},
		{
			title: 'Название',
			dataIndex: 'name',
			width: 120,
			fixed: 'left',
			editable: true,
		},
		{ title: 'Количество', dataIndex: 'sumBonds', width: 120, editable: true },
		{ title: 'Номинал', dataIndex: 'nominalPrice', width: 100, editable: true },
		{
			title: 'Цена покупки',
			dataIndex: 'buyPrice',
			width: 100,
			editable: true,
		},
		{
			title: 'Комиссия брокера',
			dataIndex: 'brokerTax',
			width: 100,
			editable: true,
		},
		{ title: 'Дата покупки', dataIndex: 'buyDate', width: 150, editable: true },
		{
			title: 'Дата продажи',
			dataIndex: 'sellDate',
			width: 150,
			editable: true,
		},
		{
			title: 'Дней до погашения',
			dataIndex: 'daysToMaturity',
			width: 120,
			editable: false,
		},
		{ title: 'Купон', dataIndex: 'couponPrice', width: 100, editable: true },
		{
			title: 'Купонная доходность',
			dataIndex: 'couponIncome',
			width: 200,
			editable: false,
		},
		{
			title: 'Кол-во купонов в год',
			dataIndex: 'couponPeriod',
			width: 130,
			editable: true,
		},
		{
			title: 'Дата купона',
			dataIndex: 'couponDate',
			width: 150,
			editable: true,
		},
		{ title: 'НКД', dataIndex: 'NKD', width: 100, editable: true },
		{
			title: 'Доходность в год',
			dataIndex: 'yieldYear',
			width: 120,
			editable: false,
		},
		{
			title: 'Действие',
			dataIndex: 'operation',
			width: 120,
			editable: false,
			render: (_: any, record: DataType) => {
				const editable = isEditing(record);

				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{ marginInlineEnd: 8 }}
						>
							Save
						</Typography.Link>
						<Popconfirm
							title='Уверены, что хотите отменить?'
							onConfirm={cancel}
						>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<>
						<Typography.Link
							disabled={editingKey !== ''}
							onClick={() => edit(record)}
						>
							Edit
						</Typography.Link>
						{bonds.length >= 1 ? (
							<Popconfirm
								title='Уверены, что хотите удалить?'
								onConfirm={() => handleDelete(record.key)}
							>
								<a style={{ display: 'inline-block', marginLeft: '8px' }}>
									Delete
								</a>
							</Popconfirm>
						) : null}
					</>
				);
			},
		},
	];

	// Настраиваем редактируемые ячейки
	const mergedColumns: EditableColumnType<DataType>[] = columns.map(col => {
		if (!col.editable) {
			return col;
		}
		// Определяем тип input
		let inputType: 'string' | 'date' | 'number' = 'string';
		if (
			col.dataIndex === 'buyDate' ||
			col.dataIndex === 'sellDate' ||
			col.dataIndex === 'couponDate'
		) {
			inputType = 'date';
		} else if (
			col.dataIndex === 'sumBonds' ||
			col.dataIndex === 'nominalPrice' ||
			col.dataIndex === 'buyPrice' ||
			col.dataIndex === 'brokerTax' ||
			col.dataIndex === 'couponPrice' ||
			col.dataIndex === 'couponPeriod' ||
			col.dataIndex === 'NKD'
		) {
			inputType = 'number';
		}
		return {
			...col,
			onCell: (record: DataType) => ({
				record,
				inputType,
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<Form form={form} component={false}>
			<Table<DataType>
				components={{ body: { cell: EditableCell } }}
				className={className}
				columns={mergedColumns}
				dataSource={bonds}
				sticky
				scroll={{ x: 'max-content', y: 300 }}
				pagination={{ pageSize: 10 }}
			/>
		</Form>
	);
};

export default TableEdit;
