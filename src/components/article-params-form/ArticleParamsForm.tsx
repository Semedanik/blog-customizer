import React, { useState, useRef } from 'react';
import clsx from 'clsx';

// Импорт компонентов UI
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

// Импорт стилей
import styles from './ArticleParamsForm.module.scss';

// Импорт констант и типов
import {
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	defaultArticleState,
} from 'src/constants/articleProps';

// Хук для закрытия при клике вне компонента
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

// Типизация пропсов компонента
type ArticleParamsFormProps = {
	params: ArticleStateType;
	onParamsChange: (newParams: ArticleStateType) => void;
};

// Компонент формы параметров статьи
export const ArticleParamsForm = ({
	params,
	onParamsChange,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Используем defaultArticleState для инициализации состояний
	const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [width, setWidth] = useState(defaultArticleState.contentWidth);
	const [color, setColor] = useState(defaultArticleState.fontColor);

	// Обработчик отправки формы
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onParamsChange({
			...params,
			backgroundColor: bgColor,
			fontSizeOption: fontSize,
			fontFamilyOption: fontFamily,
			contentWidth: width,
			fontColor: color,
		});
	};

	// Обработчик сброса формы
	const handleReset = () => {
		onParamsChange(defaultArticleState);
		setBgColor(defaultArticleState.backgroundColor);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setWidth(defaultArticleState.contentWidth);
		setColor(defaultArticleState.fontColor);
	};

	// Для стилизации боковой панели
	const sidebarClass = clsx(styles.container, {
		[styles.container_open]: isSidebarOpen,
	});

	// Хук для закрытия боковой панели при клике вне её
	useOutsideClickClose({
		rootRef: formRef,
		isOpen: isSidebarOpen,
		onClose: () => setIsSidebarOpen(false),
		onChange: () => {},
	});

	return (
		<div ref={formRef}>
			<ArrowButton
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				isOpen={isSidebarOpen}
			/>
			<aside className={sidebarClass}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						name='fontSize'
						onChange={setFontSize}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={color}
						onChange={setColor}
						title='Цвет шрифта'
					/>
					<div className={styles.separatorCentered}>
						<Separator />
					</div>
					<Select
						options={backgroundColors}
						selected={bgColor}
						onChange={setBgColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={width}
						onChange={setWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
