import './title.css';

interface TitleProps {
	className?: string; // Опциональный пропс
	text: string; // Обязательный пропс
}

const Title: React.FC<TitleProps> = ({ className, text }) => {
	return <h2 className={className}>{text}</h2>;
};

export default Title;
