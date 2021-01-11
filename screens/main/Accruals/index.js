import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Text, View, Grid, Col, Row,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import AppCardStyles from '../Applications/Card/styles';
import CheckListStyles from '../CheckLists/styles';
import AccrualStyles from './styles';
import MonthPicker from '../../../components/UI/MonthPicker';
import { getPayrollsStart } from '../../../redux/user/user.actions';
import { getDaysInMonth, getKeysSum } from '../../../utils';
import PageWrapper from '../../../components/Containers/PageWrapper';

const Accruals = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.pages.loading);
  const date = new Date();
  const {
    token, user_id, payrolls, penalties,
  } = useSelector((state) => state.user);
  const getPayrolls = ({ startDate, endDate }) => {
    dispatch(getPayrollsStart({
      token, userId: user_id, startDate, endDate,
    }));
  };
  const [payrollsDate, setDate] = useState({
    startDate: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
    endDate: `${getDaysInMonth(date.getMonth() + 1, date.getFullYear())}.${date.getMonth() + 1}.${date.getFullYear()}`,
  });
  useEffect(() => {
    getPayrolls(payrollsDate);
  }, []);

  return (
    <PageWrapper
      onRefresh={() => getPayrolls(payrollsDate)}
    >
      <View style={CheckListStyles.header}>
        <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={CheckListStyles.headerTextView}>
          <Text style={CheckListStyles.headerText}>
            Начисления
          </Text>
        </View>
      </View>
      <MonthPicker onDateChange={({ startDate, endDate }) => {
        setDate({ startDate, endDate });
        getPayrolls({ startDate, endDate });
      }}
      />
      <View style={{ flexDirection: 'row', paddingHorizontal: 25 }}>
        <Grid>
          <Row>
            <Col>
              <Text style={AccrualStyles.colTitle}>К выплате</Text>
              <Text>
                {getKeysSum('wage', payrolls)}
                {' '}
                Р
              </Text>
            </Col>
            <Col>
              <Text style={AccrualStyles.colTitle}>Начислено</Text>
              <Text>
                {getKeysSum('total', payrolls)}
                {' '}
                Р
              </Text>
            </Col>
            <Col>
              <Text style={AccrualStyles.colTitle}>Штрафы</Text>
              <Text>
                {getKeysSum('penalty', penalties)}
                {' '}
                Р
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
        <Grid style={{
          borderStyle: 'solid', borderColor: '#a8a8a8', borderWidth: 1, marginTop: 20,
        }}
        >
          <Row style={AccrualStyles.row}>
            <Col style={AccrualStyles.col}>
              <Text style={AccrualStyles.colTitle}>Начисления</Text>
            </Col>
            <Col style={AccrualStyles.col}>
              <Text style={AccrualStyles.colTitle}>Базовый оклад</Text>
            </Col>
            <Col style={{ paddingVertical: 8, paddingLeft: 3 }}>
              <Text style={AccrualStyles.colTitle}>Бонусы</Text>
            </Col>
          </Row>
          {payrolls?.length ? payrolls?.map((item) => (
            <Row key={item.id} style={AccrualStyles.row}>
              <Col style={AccrualStyles.col}>
                <Text>{item?.total ?? '-'}</Text>
              </Col>
              <Col style={AccrualStyles.col}>
                <Text>{item?.salary ?? '-'}</Text>
              </Col>
              <Col style={{ paddingVertical: 8, paddingLeft: 3 }}>
                <Text>{item?.wage ?? '-'}</Text>
              </Col>
            </Row>
          )) : <Text>Нет начислений за заданный период</Text>}
        </Grid>
      </View>
    </PageWrapper>
  );
};

export default Accruals;
