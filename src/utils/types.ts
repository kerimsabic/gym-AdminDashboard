export interface Link {
  name: string;
  icon: JSX.Element;
}

export type MenuSection = {
  title: string;
  links: Link[];
}

export enum StatusType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}
export enum UserType {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  MEMBER = 'MEMBER'
}

export type Member = {
  id?: string;
  firstName: string;
  lastName: string;
  userType: UserType
  email: string;
  userName: string;
  image?: string;
  qrCode: string;
  trainerEmail: string;
  TrainerImage: string;
  trainerName: string;
  trainerId: string;
  trainerUserType: UserType.TRAINER;   //ovo mozda samo treba UserType pa poslije staviti trener
  address: string;
  phone: string;
  statusType: StatusType
  password: string
  trainingPlanName: string;
  trainingPlanId: string
  numOfMonths: number

}

export type Admin = {
  id?: string;
  firstName: string;
  lastName: string;
  userType?: UserType | undefined;
  email: string;
  userName: string;
  image?: string;
  address: string;
  phone: string;
  statusType: StatusType
  password: string

}

export type Trainer = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  phone: string;
  statusType?: StatusType
  password: string
  members?: Member[]
  image?: string
  userType?: UserType;
}

export type TrainingPlan = {
  id?: string;
  name: string;
  description: string;
  price: string;
  statusType: StatusType;
}

export type Equipments = {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  image: string;
  serviceHistroy: Date[];
}

export type Membership = {
  id: string;
  member: Member;
  startDate: Date;
  endDate: Date;
  trainingPlan: TrainingPlan;
  statusType: StatusType;
}


export enum FormMode {
  ADD = 'add',
  EDIT = 'edit',
}


