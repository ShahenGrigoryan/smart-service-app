export const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const getWeekAndDay = (dateISO) => {
  if (!dateISO) return { day: '', week: '' };
  const date = new Date(dateISO);
  const day = date.getDate();
  const week = weekDays[date.getDay()];
  return { day, week };
};

export const getTime = (date) => {
  const trueDate = new Date(date);
  const hours = trueDate.getHours();
  const minutes = trueDate.getMinutes() < 10 ? `0${trueDate.getMinutes()}` : trueDate.getMinutes();
  return `${hours}:${minutes}`;
};

export const getDate = (date) => {
  const trueDate = new Date(date);
  const day = trueDate.getDate() < 10 ? `0${trueDate.getDate()}` : trueDate.getDate();
  const month = trueDate.getMonth() + 1 < 10 ? `0${trueDate.getMonth() + 1}` : trueDate.getMonth() + 1;
  const year = trueDate.getFullYear();
  return `${day}.${month}.${year}`;
};

export const getAssigneeObject = (type, array) => {
  if (!array) return [{ name: '-' }];
  const assignees = array.filter((item) => (item.assignee_type === type));
  if (assignees?.length) return assignees;
  return [{ name: '-' }];
};

export const getKeysSum = (key, array = []) => {
  let sum = 0;
  array.forEach((item) => {
    sum += +item[key];
  });
  return sum;
};

export const desktopItemsSort = (a, b) => {
  if (a.created_at && b.created_at) {
    return new Date(a.created_at).getDate() - new Date(b.created_at).getDate();
  }
  if (a.created_at && !b.created_at) {
    return new Date(a.created_at).getDate() - new Date(b.plan).getDate();
  }
  if (!a.created_at && b.created_at) {
    return new Date(a.plan).getDate() - new Date(b.created_at).getDate();
  }
  return new Date(a.plan).getDate() - new Date(b.plan).getDate();
};

export const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

export const getParamsText = (paramsObj) => {
  if (!paramsObj) return '';
  let paramsText = '?';
  if (paramsObj) {
    const keys = Object.keys(paramsObj);
    const values = Object.values(paramsObj);
    keys.forEach((key, index) => {
      paramsText += `${key}=${values[index]}`;
      if (index !== keys.length - 1) paramsText += '&';
    });
  }
  return paramsText === '?' ? '' : paramsText;
};

export const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});
