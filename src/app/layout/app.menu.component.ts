import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ViewService } from '../services/view.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(private viewService:ViewService) { }
    ngOnInit() {
        this.getMenus();
    }
    getMenus()
    {
        this.viewService.configs().then((data:any)=>{
            console.log("menu from view service");
          
            let menu=data.model;
            console.log(menu);
            console.log(data);
            this.model=menu;

           
        })
    }
}
