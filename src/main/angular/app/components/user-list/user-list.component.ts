import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  addUser(): void {
    this.router.navigateByUrl("/users/create");
  }

  editUser(user: User): void {
    this.router.navigateByUrl(`/users/${user.userId}`);
  }

  private loadUsers(): void {
    this.userService.findAll().subscribe(users => this.users = users);
  }
}
