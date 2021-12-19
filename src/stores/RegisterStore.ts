import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../ioc/ownTypes";
import type AuthenticationService from "../services/AuthenticationService";
import i18n from "../locales/config"

@injectable()
export default class RegisterStore {

    id = 0;
    email = '';
    password = '';
    passwordConfirm = '';
    isLoading = false;
    error = '';
    token = '';

    constructor(   
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService
   ) {
       makeAutoObservable(this);
   }

    
    public register = async () => {
        this.id = 0;
        this.token = '';
        this.error = '';
        try {
            if (this.password !== this.passwordConfirm) {
                this.error = i18n.t('register:error.passwordMismatch');
                return;
            }
            else {
                this.isLoading = true;
                const result = await this.authenticationService.register(this.email, this.password);
                this.id = result.id;
                this.token = result.token;
            }
          } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
          }
          this.isLoading = false;
    }

    
    public changeEmail = (text: string) : void => {
      this.email = text;
    }

    
    public changePassword = (text: string) : void => {
      this.password = text;
    }

    public changeConfirmPassword = (text: string) : void => {
        this.passwordConfirm = text;
      }
}
