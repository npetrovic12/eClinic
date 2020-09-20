import { Department } from './department.enum';

export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  about?: string;
  title?: string;
  department?: Department;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  image?: string;
  imageContentType?: string;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public about?: string,
    public title?: string,
    public department?: Department,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: any[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public image?: string,
    public imageContentType?: string
  ) {}
}

export interface DepartmentOption {
  value: Department;
  translation: string;
}

export const departmentOptions: DepartmentOption[] = [
  {
    value: Department.CARDIOLOGY,
    translation: 'departmentsPage.department.cardiology'
  },
  {
    value: Department.DENTISTRY,
    translation: 'departmentsPage.department.dentistry'
  },
  {
    value: Department.GASTROLOGY,
    translation: 'departmentsPage.department.gastrology'
  },
  {
    value: Department.GYNECOLOGY,
    translation: 'departmentsPage.department.gynecology'
  },
  {
    value: Department.NEUROLOGY,
    translation: 'departmentsPage.department.neurology'
  },
  {
    value: Department.PULMONOLOGY,
    translation: 'departmentsPage.department.pulmonology'
  }
];
