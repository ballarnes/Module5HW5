import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ContentType, MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import ownTypes from "../ioc/ownTypes";
import type { LoginResponse } from "../dtos/LoginResponse";
import type { RegisterResponse } from "../dtos/RegisterResponse";

export interface AuthenticationService {
    login(email: string, password: string): Promise<LoginResponse>;
    register(email: string, password: string): Promise<RegisterResponse>;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public async login(email: string, password: string): Promise<LoginResponse> {
        const headers = { contentType: ContentType.Json};
        const data = { email, password };
        const result = await this.httpService.send<LoginResponse>(`login`, MethodType.POST, headers, data);
        return result.data;
    }

    public async register(email: string, password: string): Promise<RegisterResponse> {
        const headers = { contentType: ContentType.Json};
        const data = { email, password };
        const result = await this.httpService.send<RegisterResponse>(`register`, MethodType.POST, headers, data);
        return result.data;
    }
}