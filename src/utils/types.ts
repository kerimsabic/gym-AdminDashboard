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

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  userType: "ADMIN" | "MEMBER" | "TRAINER";
  email: string;
  userName: string;
  image?: string;
  qrCode: string;
  trainerEmail: string;
  TrainerImage: string;
  trainerName: string;
  trainerId: string;
  trainerUserType: "TRAINER";
  address:string;
  phone:string;
  statusType: StatusType
  password:string
  trainingPlanName:string;
  trainingPlanId:string

}

export interface Trainer  {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address:string;
  phone:string;
  statusType: StatusType
  password:string
  members:Member[]
}

export type TrainingPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  statusType: "online" | "offline";
}



