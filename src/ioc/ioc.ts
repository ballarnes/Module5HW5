import { Container } from 'inversify';
import type { AuthenticationService} from '../services/AuthenticationService';
import DefaultAuthenticationService from '../services/AuthenticationService';
import type { HttpService} from '../services/HttpService';
import DefaultHttpService from '../services/HttpService';
import type { UserService} from '../services/UserService';
import DefaultUserService from '../services/UserService';
import type { ResourceService} from '../services/ResourceService';
import DefaultResourceService from '../services/ResourceService';
import HomePageStore from '../stores/HomePageStore'
import UserStore from '../stores/UserStore'
import ResourceStore from '../stores/ResourceStore'
import UsersStore from '../stores/UsersStore'
import ResourcesStore from '../stores/ResourceStore'
import LoginStore from '../stores/LoginStore'
import RegisterStore from '../stores/RegisterStore'
import ownTypes from './ownTypes';

export const container = new Container();
container.bind<HttpService>(ownTypes.httpService).to(DefaultHttpService).inSingletonScope();
container.bind<UserService>(ownTypes.userService).to(DefaultUserService).inSingletonScope();
container.bind<ResourceService>(ownTypes.resourceService).to(DefaultResourceService).inSingletonScope();
container.bind<AuthenticationService>(ownTypes.authenticationService).to(DefaultAuthenticationService).inSingletonScope();
container.bind<HomePageStore>(ownTypes.homePageStore).to(HomePageStore).inTransientScope();
container.bind<UserStore>(ownTypes.userStore).to(UserStore).inTransientScope();
container.bind<ResourceStore>(ownTypes.resourceStore).to(ResourceStore).inTransientScope();
container.bind<UsersStore>(ownTypes.usersStore).to(UsersStore).inTransientScope();
container.bind<ResourcesStore>(ownTypes.resourcesStore).to(ResourcesStore).inTransientScope();
container.bind<LoginStore>(ownTypes.loginStore).to(LoginStore).inTransientScope(); 
container.bind<RegisterStore>(ownTypes.registerStore).to(RegisterStore).inTransientScope(); 
