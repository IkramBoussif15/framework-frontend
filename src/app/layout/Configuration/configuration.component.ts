import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ConfigService } from 'src/app/services/config.service';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [MessageService]
})
export class ConfigurationComponent implements OnInit {
  stepsItems: MenuItem[] = [];
  activeIndex=0;
  entitiesScanned:any=[];
  servicesScanned:any=[];
  stepsItems1: MenuItem[] = [];
  activeIndex1=0;
  dtosScanned:any=[];
  methodsScanned:any=[];
  composantDashboardScanned:any=[];
  composantsScanned:any=[];
  menusScanned:any=[];
  historyScanned:any=[];
  display=false;
  dateAuj!: Date;
  constructor(private configService:ConfigService,private service: MessageService) { }

  ngOnInit(): void {
  
    this.stepsItems = [
      {
          label: 'Scan & Update entities',
          command: (event: any) => {
            this.activeIndex = 0;
        }
      },

      {
          label: 'Scan services',
          command: (event: any) => {
            this.activeIndex = 1;
        }
      },
      {
          label: 'Scan Composants',
          command: (event: any) => {
            this.activeIndex = 2;
        }
      },
      {
          label: 'Scan Menus',
          command: (event: any) => {
            this.activeIndex = 3;
        }
      },
      {
        label: 'Update Composants and Fields',
        command: (event: any) => {
          this.activeIndex = 4;
      }
    },
    {
      label: 'Generate History Task By Prefile',
      command: (event: any) => {
        this.activeIndex = 5;
        
    },
  },
    {
      label: 'Get Notification Test',
      command: (event: any) => {
        this.activeIndex = 6;
        
    },

   
    
   
  }



  ];
  this.stepsItems1 = [
    {
      label: 'Scan Dtos',
      command: (event: any) => {
        this.activeIndex1 = 0;

    }
    },
    {
      label: 'Scan methods',
      command: (event: any) => {
        this.activeIndex1= 1;

    }
  },
  {
    label: 'Scan Composant Dashboard',
    command: (event: any) => {
      this.activeIndex1 = 2;

  }
},
{
  label: 'getAccref',
  command: (event: any) => {
    this.activeIndex1 = 3;

}
},
{
label: 'genICompta',
command: (event: any) => {
  this.activeIndex1 = 4;

}
}

  ];
  }



  scanEntities()
  {
    this.display=true;
    this.configService.ScanEntities().subscribe((data)=>{
      console.log("success scan entities");
      console.log(data);
      this.entitiesScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les entitées sont scanées' });
    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des entités' });


    }
    )
  }
  scanServices()
  {
    this.display=true;

    this.configService.ScanServices().subscribe((data)=>{
      console.log("success scan services");
      console.log(data);
      this.servicesScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les services sont scannées' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des services' });

    }
    )
  }
  scanComposants()
  {
    this.display=true;
    this.configService.ScanComposants().subscribe((data)=>{
      console.log("success scan composants");
      console.log(data);
      this.composantsScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les composants sont scannés' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des composants' });

    }
    )   
  }
  scanMenus()
  {    
    this.display=true;
    this.configService.ScanMenus().subscribe((data)=>{
      console.log("success scan menus");
      console.log(data);
      this.menusScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les menus sont scannés' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des menus' });

    }
    )
  }
  updateEntity()
  {
    this.display=true;
    this.configService.UpdateEntity().subscribe((data)=>{
      console.log("success update entity");
    
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les composants et fields ont name service and name Entity' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du modification des composants et fields' });

    }
    )   
  }



  generateHistory()
  {    
    this.display=true;
    this.configService.generateHistory(this.dateAuj).subscribe((data)=>{
      console.log("success scan History");
      console.log(data);
    
      this.historyScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les menus sont scannés' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des menus' });

    }
    )
  }

  scanDtos()
  {    
    this.display=true;
    this.configService.ScanDtos().subscribe((data)=>{
      console.log("success scan dtos");
      console.log(data);
      this.dtosScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les Dtos sont scannés' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des Dtos' });

    }
    )
  }

  scanMethods()
  {    
    this.display=true;
    this.configService.ScanMethods().subscribe((data)=>{
      console.log("success scan methods");
      console.log(data);
      this.methodsScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les methods sont scannés' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des methods' });

    }
    )
  }

  ScanComposantDashboard()
  {    
    this.display=true;
    this.configService.ScanComposantDashboard().subscribe((data)=>{
      console.log("success scan ComposantDashboard");
      console.log(data);
      this.composantDashboardScanned=data;
      this.display=false;
      this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les Composant Dashboard sont scannés' });


    },
    (error)=>{
      console.log("error");
      this.display=false;
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des Composant Dashboard' });

    }
    )
  }

  getNotificationTeste(){
    {    
     // this.display=true;
      this.configService.getNotificationTeste().subscribe((data)=>{
        console.log("Get Notifactiontest");
        console.log(data);
      
       // this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les Dtos sont scannés' });
  
  
      },
      (error)=>{
        console.log("error");
     //   this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des Dtos' });
  
      }
      )
    }




  }
  getAccref(){
    this.configService.getAccref().subscribe((data)=>{
      console.log("Get accref");
      console.log(data);
    
     // this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'toutes les Dtos sont scannés' });


    },
    (error)=>{
      console.log("error");
   //   this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'un erreur a été intervenu lors du scan des Dtos' });

    }
    )
  }

  genICompta(){

  }


  

}
