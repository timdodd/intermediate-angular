import {Phone} from "./phone.model";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phones: Phone[];
}
