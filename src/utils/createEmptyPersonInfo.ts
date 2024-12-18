import { PersonInfo } from '../Redux/Types/types';

export const createEmptyPersonInfo = (): PersonInfo => ({
  is_adult: true, // по умолчанию true
  first_name: '',
  last_name: '',
  patronymic: '',
  gender: true, // по умолчанию true (мужчина)
  document_type: '',
  document_data: '',
});