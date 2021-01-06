import React, { useState } from 'react';
import {
  View, Text,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import MonthPickerStyles from './styles';
import { getDaysInMonth } from '../../../utils';

const months = [{ shortName: 'янв.', longName: 'январь' }, { shortName: 'фев.', longName: 'февраль' }, { shortName: 'март', longName: 'март' }, { shortName: 'апр.', longName: 'апрель' }, { shortName: 'май', longName: 'май' }, { shortName: 'июнь', longName: 'июнь' }, { shortName: 'июль', longName: 'июль' }, { shortName: 'авг.', longName: 'август' },
  { shortName: 'сент.', longName: 'сентябрь' }, { shortName: 'окт.', longName: 'октябрь' }, { shortName: 'нояб.', longName: 'ноябрь' }, { shortName: 'дек.', longName: 'декабрь' }];

const MonthPicker = ({ onDateChange }) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({ year, month: months[month] });
  const isActive = (month) => date.month.longName === month.longName;
  const selectMonth = (index) => {
    setDate({ ...date, month: months[index] });
    setOpen(false);
    const daysInMonth = getDaysInMonth(index + 1, date.year);
    const startDate = `01.${index + 1}.${date.year}`;
    const endDate = `${daysInMonth}.${index + 1}.${date.year}`;
    onDateChange({ startDate, endDate });
  };
  const changeYear = (action) => {
    let newYear;
    if (action === 'add' && date.year < 2020) newYear = ++date.year;
    else if (action === 'minus' && date.year > 1970) newYear = --date.year;
    else newYear = date.year;

    setDate({ ...date, year: newYear });
  };

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(!open)} style={MonthPickerStyles.monthButton}>
        <Text style={MonthPickerStyles.monthButtonText}>
          {date.month.longName}
        </Text>
        <AntDesign name="calendar" size={18} color="#a8a8a8" />
      </TouchableOpacity>
      {open && (
        <View style={MonthPickerStyles.root}>
          <View style={MonthPickerStyles.header}>
            <TouchableOpacity onPress={() => changeYear('minus')} activeOpacity={0.5}>
              <Feather name="chevrons-left" size={30} color="#8e8f93" />
            </TouchableOpacity>
            <Text>
              {date.year}
            </Text>
            <TouchableOpacity onPress={() => changeYear('add')} activeOpacity={0.5}>
              <Feather name="chevrons-right" size={30} color="#8e8f93" />
            </TouchableOpacity>
          </View>
          <View style={MonthPickerStyles.main}>
            {months.map((item, index) => (
              <View style={{ width: '33%' }} key={`month__${index}`}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => selectMonth(index)}
                  style={isActive(item)
                    ? { ...MonthPickerStyles.monthItem, ...MonthPickerStyles.monthItemActive }
                    : MonthPickerStyles.monthItem}
                >
                  <Text style={{ color: isActive(item) ? '#fff' : '#8e8f93' }}>
                    {item.shortName}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

    </>
  );
};

export default MonthPicker;
