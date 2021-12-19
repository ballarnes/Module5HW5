import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../ioc/ownTypes";
import type { Resource } from "../models/Resource";
import type ResourceService from "../services/ResourceService";

@injectable()
export default class ResourcesStore {

    resources : Resource[] = [];
    isLoading = false;
    totalPages = 0;
    currentPage = 1;

    constructor(   
        @inject(ownTypes.resourceService) private readonly resourceService: ResourceService
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
            const result = await this.resourceService.getByPage(page);
            this.resources = result.data;
            this.totalPages = result.total_pages;
            
          } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
          }
        this.isLoading = false;
    }
}
