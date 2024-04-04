import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef, ViewRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { isUndefined } from 'lodash';
import { AspDetailsDto } from 'src/app/models/Asp/AspDetailsDto.model';
import { AspService } from 'src/app/services/asp.service';
import { DataService } from 'src/app/services/data.service';
import { AspDetails } from 'src/app/models/Asp/AspDetails.model';


@Component({
  selector: 'app-asp',
  templateUrl: './asp.component.html',
  styleUrls: ['./asp.component.scss']
})
export class AspComponent implements OnInit {

  userAsp: any;
  aspUserList: any[] = [];
  dynamicForm: FormGroup;
  aspEmpty: any[] = [];
  aspTypeAll: any[] = [];
  fullAspUserDetailsList!: Map<number, Object>;
  tabValue: any[] = []
  listAspChild: any[][] = [];
  aspUserDetailsHashMap!: Map<String, any>
  aspDetails!: AspDetails;
  aspDetailsDto!: AspDetailsDto;

  aspLocalStorage: any;
  aspInput: AspDetails[] = [];
  valueCombobox: any[] = []
  hasAsp: any;
  submittedAsp = false
  aspTranslation: any;
  value: Boolean = false;
  isUser: any
  @Input() dataTransferTab: any;
  @Output() dataEventCreateEntity = new EventEmitter<any>();
  isSalir: Boolean = false

  keysite: any = environment.keySite;
  aspSelectedBeforSave: any;






  constructor(
    // private messageService: MessageService,
    private fb: FormBuilder, private ref: ChangeDetectorRef, private router: Router, private userAspService: AspService, private dataservice: DataService) {
    this.dynamicForm = this.fb.group({});
    console.log("router url : ", this.router.url)
    console.log("value valeeeeeeeeeeeeur :", this.value)

    if (this.router.url == "/asp") {
      this.router.events.subscribe((event) => {

        if (!isUndefined(event)) {
          //console.log("eventeeeeeeeeeeeeeeeee :",event)
          let err: any;
          err = event;
          if (!isUndefined(err) && err != null) {
            //console.log("err :",err)
            //console.log("err.id :",err.id)
            if (err.url != "/asp" && localStorage.getItem("token") !== null && !this.value && !this.isSalir) {
              console.log("different from asp")
              this.router.navigate(['asp'])

            } else if (err.url != "/asp" && localStorage.getItem("token") !== null && !this.value && !this.isSalir) {
              console.log("different from asp 2")
              this.router.navigate(['welcomePage'])
            }
          }
        }



      });

    }





  }

  ngOnInit() {
    this.getAllAspType();
    console.log('getAllAspType',this.listAspChild)

  }
  logout() {
    this.isSalir = true;
    localStorage.clear();
    this.router.navigateByUrl('/welcomePage');

  }
  getAllAspType() {
    this.hasAsp = localStorage.getItem('hasAsp');

    if (this.hasAsp === 'false') {
      this.userAspService.postUserAsp().subscribe((data: any) => {

        this.userAsp = data;
        this.aspTypeAll = this.userAsp.aspType;
        this.aspTranslation = this.userAsp.aspTraduction;
        this.fullAspUserDetailsList = this.userAsp.fullAspUserDetails

        // this.fullAspUserDetailsList.forEach((value, key) => {
        //   aspUserList.push(value);
        // });
        // let aspUserList: Object[] = Array.from(this.fullAspUserDetailsList.values());
        this.aspUserList = Object.values(this.fullAspUserDetailsList);
        console.log("aspUserListlllll", this.aspUserList);
        let i = 0;
        let lastAsp;
        let lastAspIndex: any;
        for (let asp of this.aspTypeAll) {
          this.dynamicForm.addControl(asp.name, this.fb.control('', []));
          let j = 0;
          for (let aspUserAsp of this.aspUserList) {
            if (aspUserAsp.aspType.level === asp.level) {
              this.dynamicForm.get(asp.name)?.patchValue(this.aspUserList[i]);
              this.dynamicForm.get(asp.name)?.disable({ onlySelf: true, emitEvent: false });
              this.listAspChild.push([this.aspUserList[i]]);
              console.log("asppppName", asp.name);
              lastAsp = this.aspUserList[i];
              lastAspIndex = i;
              break;
            }

            j++;
          }
          if (j === this.aspUserList.length) {
            this.listAspChild.push([]);
          }
          i++;
        }
        this.onAspChangeRecInit(lastAspIndex + 1, lastAspIndex, lastAsp);
        this.ref.detectChanges();
      })
    }
    if (this.hasAsp == 'true') {

      this.userAspService.postUserAsp().subscribe((data: any) => {

        this.userAsp = data;
        this.aspTranslation = this.userAsp.aspTraduction;
        this.aspTypeAll = this.userAsp.aspType;
        this.fullAspUserDetailsList = this.userAsp.fullAspUserDetails
        // this.aspUserList = Object.keys(this.fullAspUserDetailsList).map(r => this.fullAspUserDetailsList[r]);
        this.aspUserList = Object.values(this.fullAspUserDetailsList);
        let i = 0;
        for (let asp of this.aspTypeAll) {
          this.dynamicForm.addControl(asp.name, this.fb.control('', []));
          let j = 0;
          for (let aspUserAsp of this.aspUserList) {
            if (aspUserAsp.aspType.level === asp.level) {
              this.dynamicForm.get(asp.name)?.patchValue(this.aspUserList[i])
              this.listAspChild.push([this.aspUserList[i]]);
              console.log("asppppName", asp.name);

              break;
            }
            j++;
          }
          if (j === this.aspUserList.length) {
            this.listAspChild.push([]);
          }
          i++;
          this.dynamicForm.get(asp.name)?.disable({ onlySelf: true, emitEvent: false })

        }
        this.ref.detectChanges();
      })
    }


  }

  onAspChangeRecInit(i: number, index: number, aspSelected: any) {
    if (this.aspTypeAll.length === i) {

      return;
    }
    this.userAspService.postAspChild(aspSelected, this.aspTypeAll[i].level)
      .subscribe((data: any) => {
        this.listAspChild[i] = data;
        i = i + 1;
        this.onAspChangeRecInit(i, index, aspSelected);
      });

  }

  onAspChangeRec(i: number, index: number, aspNameSelected: any) {


    if (this.aspTypeAll.length === i) {
      return;
    }
    this.userAspService.postAspChild(this.dynamicForm.get(aspNameSelected.name)?.value, this.aspTypeAll[i].level)
      .subscribe((data: any) => {
        this.dynamicForm.get(this.aspTypeAll[i].name)?.patchValue(null)
        this.listAspChild[i] = data;
        i = i + 1;
        this.onAspChangeRec(i, index, aspNameSelected);
      });

  }


  showResponse(event: any) {

    console.log(event)


    if (event != null) {
      this.submittedAsp = true
      //  this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});


    }
  }

  submittedNotHasAsp() {
    this.submitted()
  }
  submittedHasAsp() {
    if (this.submittedAsp == true) {
      this.submitted()
    }
  }

  // }
  submitted() {

    this.value = true;
    this.aspInput = [];
    let stringFinal = "";
    for (let aspType of this.aspTypeAll) {
      this.aspDetails = new AspDetails()
      if (this.dynamicForm.get(aspType.name)?.value == "") {
        this.aspDetails.asp = null;
      }
      else {
        this.aspDetails.asp = this.dynamicForm.get(aspType.name)?.value
      }
      this.aspDetails.level = aspType.level;
      console.log(aspType.name)
      if (this.aspDetails.asp != null) {
        if (this.aspDetails.asp.aspType != null && this.aspDetails.asp.aspType.name != null)
          stringFinal = stringFinal + this.aspDetails.asp.aspType.name + " " + this.aspDetails.asp.name + " > ";
      }
      else {
        if (aspType != null && aspType.name != null)
          stringFinal = stringFinal + aspType.name + " " + "*" + " > ";
      }


      console.log("aspDetails");
      console.log(this.aspDetails);
      this.aspInput.push(this.aspDetails);
    }
    console.log("asp type ")
    console.log(this.aspInput);
    console.log("final string ");
    console.log(stringFinal);
    this.aspDetailsDto = new AspDetailsDto();
    this.aspDetailsDto.refreshToken = localStorage.getItem("refreshToken");
    this.aspDetailsDto.aspDetails = this.aspInput;


    this.userAspService.postAspDetails(this.aspDetailsDto).subscribe((data: any) => {
      console.log("data", data);
      localStorage.setItem("token", data.jwt)
      localStorage.setItem("aspDetails", stringFinal);
      this.router.navigateByUrl('');
      console.log("hi")
      this.aspInput.splice(0, this.aspInput.length)

    })





  }



}
