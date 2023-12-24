export interface Link {
  name: string;
  icon: JSX.Element;
}

export type MenuSection = {
  title: string;
  links: Link[];
}

export type Member = {
  img: string;
  name: string;
  email: string;
  status: boolean;
  plan:string;
  id:string
}

export type Trainer = {
  img: string;
  name: string;
  email: string;
  status: boolean;
}

export type TrainingPlan ={
  planName: string;
  price: string;
  numOfUsers: number;
  status: boolean;
}



