import axios, { AxiosResponse } from 'axios';
import { DeleteHabitDto } from '../models/dtos/deleteHabitDto';
import { NewHabitDto } from '../models/dtos/newHabitDto';
import { updateHabitCompletionDto } from '../models/dtos/updateHabitCompletionDto';
import { Habit } from '../models/habit';
import { Month } from '../models/month';
import { AccessToken, UserFormValues } from '../models/userData';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use((config) => {
  const token = store.userStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Months = {
  details: () => requests.get<Month>('/month'),
};

const Habits = {
  create: (newHabitDto: NewHabitDto) =>
    requests.post<Habit>('/habit/create', newHabitDto),
  updateCompletion: (updateHabitCompletionDto: updateHabitCompletionDto) =>
    requests.patch('/habit/updateCompletion', updateHabitCompletionDto),
  delete: (deletHabitDto: DeleteHabitDto) =>
    requests.post<Habit>('/habit/delete', deletHabitDto),
  deleteAll: () => requests.patch<Habit>('/habit/deleteAll', {}),
};

const Account = {
  login: (user: UserFormValues) =>
    requests.post<AccessToken>('/auth/login', user),
  register: (user: UserFormValues) =>
    requests.post<AccessToken>('/auth/register', user),
};

const agent = {
  Months,
  Account,
  Habits,
};

export default agent;
