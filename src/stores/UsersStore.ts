import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../ioc/ownTypes";
import type { User } from "../models/User";
import type UserService from "../services/UserService";

@injectable()
export default class UsersStore {

    users : User[] = [];
    isLoading = false;
    totalPages = 0;
    currentPage = 1;

    constructor(   
        @inject(ownTypes.userService) private readonly userService: UserService
   ) {
       makeAutoObservable(this);
   }

    
    public init = async () => {
        this.getByPage(this.currentPage);
    }

    
    public changePage = async (page: number) => {
        this.currentPage = page;
        this.getByPage(page);
    }

    private getByPage = async (page: number) => {
        try {
            this.isLoading = true;
            const result = await this.userService.getByPage(page);
            this.users = result.data;
            this.totalPages = result.total_pages;
            
          } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
          }
        this.isLoading = false;
    }
}
