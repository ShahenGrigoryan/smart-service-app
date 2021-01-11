import React, { useState } from 'react';
import {
  View, CheckBox, Text, Card,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskCheckListItemStart } from '../../redux/tasks/tasks.actions';
import { updateCheckCheckListItemStart } from '../../redux/checks/checks.actions';

const CheckListItem = ({ itemInfo, type }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const updateTodoItem = ({ todoItemId, completed_at }) => {
    if (type === 'task') {
      dispatch(updateTaskCheckListItemStart({
        token,
        taskTodoId: itemInfo.id,
        todoItemId,
        completed_at: !completed_at
          ? new Date(Date.now()).toISOString() : null,
      }));
    } else {
      dispatch(updateCheckCheckListItemStart({
        token,
        checkTodoId: itemInfo.id,
        todoItemId,
        completed_at: !completed_at
          ? new Date(Date.now()).toISOString() : null,
      }));
    }
  };
  const isAllChecked = (items) => {
    let count = 0;
    items.forEach((item) => {
      if (item?.completed_at) {
        count++;
      }
    });
    return count === items.length;
  };
  return (
    <Card style={{ paddingHorizontal: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: '15%' }}>
          <CheckBox checked={isAllChecked(itemInfo?.[type === 'task' ? 'task_todo_items' : 'entity_task_todo_items'])} />
        </View>
        <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => setOpen(!open)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '83%' }}>
              {itemInfo?.todo_template?.name}
            </Text>
            {open ? (<Entypo name="chevron-down" size={24} color="black" />) : (
              <Entypo name="chevron-right" size={24} color="black" />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {open && (
      <View style={{ paddingHorizontal: '5%', paddingBottom: 10 }}>
        {itemInfo?.[type === 'task' ? 'task_todo_items' : 'entity_task_todo_items']?.map((todoItem) => (
          <TouchableOpacity
            onPress={() => updateTodoItem({
              todoItemId: todoItem?.id,
              completed_at: todoItem.completed_at,
            })}
            key={todoItem.id}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View style={{ width: '15%' }}>
              <CheckBox
                checked={!!todoItem.completed_at}
                onPress={() => updateTodoItem({
                  todoItemId: todoItem?.id,
                  completed_at: todoItem.completed_at,
                })}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ width: '95%' }}>
                  {todoItem?.todo_item?.name}
                </Text>
              </View>
            </View>

          </TouchableOpacity>
        ))}

      </View>
      )}

    </Card>
  );
};

export default CheckListItem;
