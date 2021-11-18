import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserStepperService {

  data: User = {} as User;

  constructor() { }
}
