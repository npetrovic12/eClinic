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
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string
  ) {}
}

export const departmentOptions: any[] = [
  {
    value: Department.CARDIOLOGY,
    translation: 'userManagement.department.cardiology'
  },
  {
    value: Department.DENTISTRY,
    translation: 'userManagement.department.dentistry'
  },
  {
    value: Department.GASTROLOGY,
    translation: 'userManagement.department.gastrology'
  },
  {
    value: Department.GYNECOLOGY,
    translation: 'userManagement.department.gynecology'
  },
  {
    value: Department.NEUROLOGY,
    translation: 'userManagement.department.neurology'
  },
  {
    value: Department.PULMONOLOGY,
    translation: 'userManagement.department.pulmonology'
  }
];
