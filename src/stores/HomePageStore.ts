import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

export enum TabsType {
  User,
  Users,
  Login,
  Resource,
  Resources,
  Register
}

@injectable()
export default class HomePageStore {

    currentTab = TabsType[TabsType.User];

    constructor(   
   ) {
       makeAutoObservable(this);
   }
    
    public changeTab = (tab: string | null) : void => {
      this.currentTab = !!tab ? tab : TabsType[TabsType.User];
    }
}
