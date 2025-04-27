import { useEffect, useState, useRef } from 'react';
import Input from 'ui/input';
import Text from 'ui/text';
import ArrowDownIcon from 'ui/icons/arrow-down-icon';

import cn from 'classnames';

import classes from './multi-dropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type Props = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<Props> = (props) => {
  const { className, options, value, onChange, disabled, getTitle } = props;

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !dropdownRef.current) {
        return;
      }

      if (!dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('click', close);

      return () => {
        window.removeEventListener('click', close);
      };
    }
  }, [open]);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  const handleOptionClick = (option: Option) => {
    const list = new Set(value);

    if (list.has(option)) {
      list.delete(option);
    } else {
      list.add(option);
    }

    onChange(Array.from(list));
    setFilter('');
  };

  const getFilteredOptions = () => {
    return options.filter(({ value }) => value.toLowerCase().startsWith(filter.toLowerCase()));
  };

  const label = getTitle(value);

  return (
    <div className={cn(classes.dropdown, className)} ref={dropdownRef}>
      <Input
        disabled={disabled}
        value={open ? filter : value.length ? label : ''}
        placeholder={label}
        onFocus={() => {
          setOpen(true);
        }}
        onChange={setFilter}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {open && (
        <ul className={classes.popup}>
          {(filter.length ? getFilteredOptions() : options).map((option) => (
            <li
              key={option.key}
              className={cn(classes.option, { [classes.selected]: value.includes(option) })}
              onClick={() => {
                handleOptionClick(option);
              }}
            >
              <Text variant="body-2" as="div">
                {option.value}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
