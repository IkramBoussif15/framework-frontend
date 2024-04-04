import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'lodash';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { ComboboxFormat } from 'src/app/models/viewFormat/ComboboxFormat.model';
import { SearchSelected } from 'src/app/models/viewFormat/Search/SearchSelected.model';
import { Spec } from 'src/app/models/viewFormat/Spec.model';
import { searchData } from 'src/app/models/viewFormat/searchData.model';
import { doubleAmount } from 'src/app/pipes/pipeDoubleAmount';
import { ValidationAmount } from 'src/app/pipes/validationAmount';
import { ComboBoxService } from 'src/app/services/combo-box.service';
import { UpdateContexDtoService } from 'src/app/services/updateContexDto/update-contex-dto.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.scss',
  providers: [DatePipe],
})
export class SearchViewComponent {

  dataSelected :any;
  aspDetailsValue: any;
  delegationPart: any;
  partieDelg: any
  contentNull = "";
  contentMontantNull = 0.0;
  contentMontantNotNull: any;
  contenuData = "0000-01-01";
  updatebilling: boolean = false;

  dataSearch1: any;
  tabOpALLoperation: any[] = [];
  operateurSelected: any;
  operateurSelectedd: any;
  dates: Date[] = [];
  op1: boolean = false;
  dataSearch2: any;
  op3: boolean = false;
  filedop: any;
  es: any;
  count: any;
  /**/ //// */
  op: any;
  existeOp1: boolean = false;
  tabOp: any[] = [];
  tabOp1: any[] = [];
  op2: any;
  operateur: any;
  searchOperateurCloserr: boolean = false;
  //star = 'pi pi-filter';
  serv: any;
  obj: any;
  cities: SelectItem[] = [];
  criteriaSearchPanel: any;
  searchForm: FormGroup ;
  idSearchView: any;
  loading = false;
  existeOp: boolean = true;
  taskId: string = "bg-default";
  dataReturnSearch : any = {};
  dataSearch!: any;
  specsResultSearch: Spec = new Spec;
  selectedSearchView!: SearchSelected;
  y: any;
  existResultSearch = false;
  selectedWithSearch = [];
  existSelectedSearchView = false;
  dataCheckedInSelect : any[] = [];
  expanded: boolean = false;
  display: boolean = false;
  billingProvider = false;
  idservice: any;
  criteres: any;
  getresultsearch: boolean = false;
  url: any;
  dataTypeTransfer: any;
  idServiceFindByCriteria: any;
  fieldAvecContext: any;
  fieldParent: any;
  listFields: any = [];
  itemsSetBtn!: MenuItem[];
  items!: MenuItem[];
  fieldsWithoutSection: any[] = [];
  comboboxFormat = new ComboboxFormat();
  idEntitie: any;
  spinner: boolean = false;
  //@ViewChild(FormSearchChildComponent, { static: false })
  //searchViewSelected: FormSearchChildComponent;
  @Input() provisionView = false;
  @Input() idEntity = null;
  @Output() dataEventProvisionLineRoot = new EventEmitter<boolean>();
  @Input() isItHolderSpecification = false;
  //@Input() idSearchViewHolder;
  @Output() isHolderScreenEmitEvent = new EventEmitter<any>();
  addButtonPrefile = false;
  doubleAmounts = new doubleAmount();
  validationAmount = new ValidationAmount();

  constructor(
      private datePipe: DatePipe,
      private comboBoxService: ComboBoxService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private viewService: ViewService,
      public _updateContextDtoService: UpdateContexDtoService,
      //public archiveDumentService: ArchiveDumentService,
      private service: MessageService,
      private http: HttpClient
  ) {
      this.expanded = false;
      this.searchForm = this.fb.group({});

      if (!this.isItHolderSpecification) {
          if (this.provisionView == false) {
              this.route.params.subscribe((routeParams) => {
                  this.existResultSearch = false;
                  this.existSelectedSearchView = false;
                  this.idServiceFindByCriteria = routeParams['id'];
                  console.log(routeParams['id']);
                  this.fieldsWithoutSection = [];
                  this.getSearchView(routeParams['id']);
              });
          }
      }
  }

  ngOnInit(): void {
      if (!this.isItHolderSpecification) {
          this.existResultSearch = false;
          this.existSelectedSearchView = false;
          this.expanded = false;
          console.log("-------------expanded-------------");
          console.log(this.expanded);
          if (this.provisionView != false) {
              console.log("gggggg", this.idEntity);
              this.getSearchView(this.idEntity);
          }
      } else {
          //this.getSearchView(this.idSearchViewHolder);
      }
      // this.itemsSetBtn = [
      //     {
      //         label: 'Report format',
      //         icon: 'pi pi-upload',
      //         items: [{
      //             label: 'pdf', icon: 'pi pi-download', command: () => {
      //                 this.generateFeesRatiosReport("pdf");
      //             }
      //         },
      //         {
      //             label: 'xlsx', icon: 'pi pi-download', command: () => {
      //                 this.generateFeesRatiosReport("xlsx");
      //             }
      //         },
      //         {
      //             label: 'xls', icon: 'pi pi-download', command: () => {
      //                 this.generateFeesRatiosReport("xls");
      //             }
      //         },
      //         {
      //             label: 'html', icon: 'pi pi-download', command: () => {
      //                 this.generateFeesRatiosReport("html");
      //             }
      //         }
      //         ]
      //     }];

  }

  resultSelectedFieldValue(obj: any, selectedField: string, fieldsSeparator: string) {
      let arraySelectedField = selectedField.split(',');
      let result = '';
      for (let i = 0; i < arraySelectedField.length; i++) {
          let arrayField = arraySelectedField[i].split('.');
          let subObj = obj;
          for (let j = 0; j < arrayField.length; j++) {
              if (j == arrayField.length - 1 && arrayField[j] != null && subObj != null) {
                  if (i == 0) {
                      result = subObj[arrayField[j]];
                  } else {
                      result = result + fieldsSeparator + subObj[arrayField[j]];
                      console.log('_result concat ✅', result);
                  }
              } else if (subObj[arrayField[j]] != null) {
                  subObj = subObj[arrayField[j]];
              }
          }
      }
      return result;
  }

  searchOperateur() {
      this.cities = [
          { label: "==", value: { id: 1, op: "==" } },
          { label: "()", value: { id: 2, op: "()" } },
          { label: "!(", value: { id: 9, op: "!(" } },

          { label: "!=", value: { id: 3, op: "!=" } },
          { label: "%%", value: { id: 4, op: "%%" } },
          { label: "!%", value: { id: 4, op: "!%" } },

          { label: "NN", value: { id: 5, op: "NN" } },
          { label: "!N", value: { id: 6, op: "!N" } },

          { label: ">=", value: { id: 6, op: ">=" } },
          { label: "<=", value: { id: 7, op: "<=" } },
          {
              label: "[ ]",
              value: { id: 8, op: "[ ]" },
          },
      ];
      this.operateur = this.cities;
      console.log("operateur", this.operateur);
      this.op = false;
      this.op1 = false;
      this.op3 = false;
      this.tabOp = [];
      this.tabOp1 = [];
      this.searchOperateurCloserr = !this.searchOperateurCloserr;
  }

  notClicked(fieldKey: any) {
      if (this.tabOp1.includes(fieldKey)) {
          return false;
          return true;
      }
      if (this.tabOp.includes(fieldKey)) {
          return false;
      }
      return true;
  }

  onBeforeToggle() {
      this.expanded = false;
      console.log(" this.expanded255", this.expanded);
  }

  getOperateur(event: any, field: any) {
      console.log("fieldName", field);
      this.op2 = field;
      this.op3 = false;
      //this.op1=true

      this.operateurSelected = event.value.op;
      this.operateurSelectedd = event;

      let newSearchData = new searchData();
      newSearchData.fieldKey = field;
      newSearchData.operator = this.operateurSelectedd.value.op;
      let index = this.tabOpALLoperation.findIndex(
          (searchData) => searchData.fieldKey === field
      );

      if (index === -1) {
          this.tabOpALLoperation.push(newSearchData);
      } else {
          this.tabOpALLoperation[index] = newSearchData;
      }

      //this.tabOpALLoperation.push(newSearchData)
      console.log("this.tabOpALLoperation", this.tabOpALLoperation);

      console.log(event.value.op);
      if (event.value.op == "[ ]") {
          this.tabOp.push(field);
          this.filedop = field;
          console.log("tabOppppp", this.tabOp);
          console.log("exixeetee", this.existeOp);
          this.op = true;
      } else {
          let i = 0;
          for (let j of this.tabOp) {
              if (j == field) {
                  this.tabOp.splice(i, 1);
                  console.log("tabOp", this.tabOp);
                  this.op = false;
              }
              i++;
          }
      }
      if (event.value.op == "()") {
          this.tabOp1.push(field);

          this.filedop = field;
          this.op1 = true;
          this.op3 = true;
      } else {
          let i = 0;
          for (let j of this.tabOp1) {
              if (j == field) {
                  this.tabOp1.splice(i, 1);
                  console.log("tabOp1", this.tabOp1);
                  this.op1 = false;
              }
              i++;
          }
      }
  }

  getSearchView(idServiceSearchView: any) {
      this.billingProvider = false;
      // this.shoiwView=true;
      this.viewService
          .getSearchFormatSpecific(idServiceSearchView, null)
          .then((result: any) => {
              this.criteriaSearchPanel = result.panelSearch;
              this.count = 0;

              for (let filed of this.criteriaSearchPanel.fields) {
                  if (filed.fieldSectionDto != null) {
                      this.count++;

                      console.log("count", this.count);
                  } else if (filed.fieldSectionDto == null) {
                      console.log("cond2 ");

                      this.fieldsWithoutSection.push(filed);
                      console.log(
                          this.fieldsWithoutSection,
                          "fieldWithoutSection"
                      );
                  }

                  if (filed.fieldLabel == "task") {
                      filed.fieldMultiple = true;
                  }
                  if (filed.fieldLabel == "prefile Status") {
                      filed.fieldMultiple = true;
                  }
                  if (filed.fieldname == "incidenceCreator") {
                      filed.fieldValue =
                          this._updateContextDtoService.userCureent.username;
                      console.log("filedIncidenceCreator", filed);
                  }
              }
              console.log("criteriaSearchPanel", this.criteriaSearchPanel);
              if (this.criteriaSearchPanel.titlePanel == "Search Prefile") {
                  this.addButtonPrefile = true;
              } else {
                  this.addButtonPrefile = false;
              }
              console.log(this.criteriaSearchPanel.numberColumnPanel);
              this.y = this.criteriaSearchPanel.numberColumnPanel;
              console.log(this.y);
              let x = 0;
              this.display = true;

              for (let field of this.criteriaSearchPanel.fields) {
                  this.searchForm.addControl(
                      field.fieldKey,
                      this.fb.control("", [])
                  );
                  this.dataCheckedInSelect[x] = [];
                  x++;
              }

              for (let field of this.criteriaSearchPanel.fields) {
                  if (!field.isNotVisible && field.fieldSectionDto != null) {
                      this.listFields.push(field);
                  }
                  if (field.fieldtype == "enumeration") {
                      let dataDropDown : any[] = [];
                      let data = field.fieldDataForeignKey;
                      data.forEach((element: any) => {
                          console.log("----------element--------");
                          let json = { label: element, value: element };
                          dataDropDown.push(json);
                      });
                      field.fieldDataForeignKey = dataDropDown;
                  } 
                  else if (field.fieldIsForeigKey == true) {
                      var pathVariable = "classifier.id==1337870";
                      if (field.entityDataType != null) {
                          console.log(
                              "----------prefile with filtre entity data-------------"
                          );
                          pathVariable =
                              "entityType.codeEntity==" +
                              field.entityDataType;
                          console.log(
                              "---Path variable-------: " + pathVariable
                          );
                          if (field.isCountVerification == true) {
                              this.comboBoxService
                                  .getSearchCombobox(
                                      field.fieldUrlForeignKey,
                                      pathVariable,
                                      null
                                  )
                                  .then((result) => {
                                      console.log("test select or search");
                                      console.log(field.fieldname);
                                      console.log("result");
                                      console.log(result);
                                      if (result == null) {
                                          field.fieldtype = "search";
                                      } else {
                                          field.fieldDataForeignKey = result;
                                      }
                                  });
                          }
                      } 
                      else if (field.userType != null) {
                          pathVariable = field.userType + "=='true'";
                          console.log(
                              "---Path variable user-------: " + pathVariable
                          );
                          if (field.isCountVerification == true) {
                              this.comboBoxService
                                  .getSearchCombobox(
                                      field.fieldUrlForeignKey,
                                      pathVariable,
                                      null
                                  )
                                  .then((result) => {
                                      console.log("test select or search");
                                      console.log(field.fieldname);
                                      console.log("result");
                                      console.log(result);
                                      if (result == null) {
                                          field.fieldtype = "search";
                                      } else {
                                          field.fieldDataForeignKey = result;
                                      }
                                  });
                          } else {
                              console.log("DEFAULT SEARCH TYPE");
                              console.log(field.fieldname);
                              field.fieldtype = "search";
                          }
                      } 
                      else {
                          if (field.isCountVerification == true) {
                          //this block
                              this.comboBoxService
                                  .getSearchCombobox(
                                      field.fieldUrlForeignKey,
                                      null,
                                      null
                                  )
                                  .then((result) => {
                                      console.log("test select or search");
                                      console.log(field.fieldname);
                                      console.log("resulttttttt", result);
                                      console.log(result);
                                      if (result == null) {
                                          field.fieldtype = "search";
                                      } else {
                                          // field.fieldDataForeignKey = result;
                                          field.fieldDataForeignKey = result;
                                          console.log("myRESULTS",field.fieldDataForeignKey);
                                          
                                          field.fieldDataForeignKey.forEach((x: { dataSelectView: string | null; }) => {
                                              if (x.dataSelectView != null) {
                                                  x.dataSelectView = this.resultSelectedFieldValue(x, field.layoutByFieldDto.viewData, field.layoutByFieldDto.separatorData);
                      
                                              } else {
                                                  field.fieldDataForeignKey = field.fieldDataForeignKey.map((divition: any) => {
                                                      return {
                                                          ...divition,
                                                          dataSelectView: this.resultSelectedFieldValue(divition, field.layoutByFieldDto.viewData, field.layoutByFieldDto.separatorData),
                                                      };
                                                  });
                                              }
                                          });
                                      }
                                      console.log("update criterias ");
                                      console.log(this.criteriaSearchPanel);
                                      this.dataTypeTransfer =
                                          this.criteriaSearchPanel.fields;
                                      this.display = false;

                                      this.expanded = false;
                                      console.log(
                                          "-----------expanded get data--------"
                                      );
                                      console.log(this.expanded);
                                      console.log(
                                          "FIELDS---------",
                                          this.dataTypeTransfer
                                      );
                                  });
                          } else {
                              console.log("DEFAULT SEARCH TYPE");
                              console.log(field.fieldname);
                              field.fieldtype = "search";
                          }
                      }
                  }
              }
              this.display = false;
          });
  }

  createNewEntity(urlactionbtn: string) {
      var titlePanel = this.criteriaSearchPanel.titlePanel;
      console.log("HERE------", titlePanel);
      if (titlePanel == "Search EntitiesData") {
          this.router.navigateByUrl("/prototype");
      }
      else if (titlePanel == "Search JobEntry") {
          this.router.navigateByUrl("/scheduler");
      }
      else if (titlePanel == "Search Prefile") {
          //added test for aspdetails
          this.aspDetailsValue = localStorage.getItem("aspDetails");
          console.log('this.aspDetailsValue', this.aspDetailsValue);
          this.delegationPart = this.aspDetailsValue.split(" > ");

          if (this.delegationPart[4].includes("*")) {
              console.log('you need to fill ASP');
              console.log('delegationTest', this.delegationPart);
              this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se puede dar de alta cuando la delegacion es *' });
          }


          else if (!this.delegationPart[4].includes("*")) {
              this.router.navigateByUrl("/prefile");
              // }
              // else if (titlePanel == 'Search OperationType') {
              //     this.router.navigateByUrl('/operationtype');

          }


      } else if (titlePanel == "Search ExcelFileToPreFile") {
          let id = urlactionbtn.substring(
              urlactionbtn.lastIndexOf("/") + 1,
              urlactionbtn.length
          );
          console.log("id");
          console.log(id);
          this.router.navigateByUrl("/excelfilemanagement/" + id);
      } else if (titlePanel == "Search CargaMassiveSftp") {
          let id = urlactionbtn.substring(
              urlactionbtn.lastIndexOf("/") + 1,
              urlactionbtn.length
          );
          console.log("id");
          console.log(id);
          this.router.navigateByUrl("/cargamassivesftp/" + id);
      } else if (titlePanel == "Search ValoracionBancoFile") {
          let id = urlactionbtn.substring(
              urlactionbtn.lastIndexOf("/") + 1,
              urlactionbtn.length
          );
          console.log("id");
          console.log(id);
          this.router.navigateByUrl("/valoracionBancoFile/" + id);
      } 
      else if (titlePanel == "Search DailyAccountingTransfer" || titlePanel == "Search CargarMasiveDeBienes"|| titlePanel == "Search CargarMasiveDeProvision") {

          let id = urlactionbtn.substring(
              urlactionbtn.lastIndexOf("/") + 1,
              urlactionbtn.length
          );
          console.log("id");
          console.log(id);
          this.router.navigateByUrl("/receivedfond/" + id);
      } 
      else if (titlePanel == "Search UploadInternalTransferFile") {
          let id = urlactionbtn.substring(
              urlactionbtn.lastIndexOf("/") + 1,
              urlactionbtn.length
          );
          console.log("id");
          console.log(id);
          this.router.navigateByUrl("/internal/" + id);
      } else if (titlePanel == "Search UploadDocuments") {
          let id = urlactionbtn.substring(
              urlactionbtn.lastIndexOf("/") + 1,
              urlactionbtn.length
          );

          this.router.navigateByUrl("/UploadDocuments/" + id);
      } else if (titlePanel == "Search SlaProvision") {
          this.router.navigateByUrl("create-sla");
      } else if (titlePanel == "Search GenerateBill") {
          /***menu router */
          this.router.navigateByUrl("SimulatBill");
      } else if (titlePanel == "Search CancelBill") {
          this.router.navigateByUrl("CancelFactura");
      } else if (titlePanel == "Search Provision") {
          this.router.navigateByUrl("provision-view");
      } else if (titlePanel == "Search InputProvision") {
          this.router.navigateByUrl("simulation");
      } else if (titlePanel == "Search RequestAmount") {
          this.router.navigateByUrl("requestAmount");
      } else if (titlePanel == "Search JustifyDoc") {
          this.router.navigateByUrl("justifyDoc");
      } else {
          let id = urlactionbtn.substring(
              urlactionbtn.lastIndexOf("/") + 1,
              urlactionbtn.length
          );
          console.log("id");
          console.log(id);
          this.existResultSearch = true;
          this.router.navigateByUrl("/createview/" + id);
      }
  }

  searchEntity(url: any, field: any) {
      //filter
      this.dataSearch = null;
      console.log("search Entity url");

      for (let field of this.criteriaSearchPanel.fields) {
          console.log("testf", field.length);
          console.log("field", field);
          let name = field.fieldname;
          let a = field.fieldKey;
          console.log(this.dataSearch);

          // **if
          if (this.searchForm.get(a.toString())?.value == "") {
              console.log("FirstIf",this.dataSearch);
              this.dataReturnSearch[name] = null;
              console.log(this.dataSearch)
              for (let tabOpALLoperation of this.tabOpALLoperation) {
                  console.log(this.dataSearch)
                  if (
                      tabOpALLoperation.operator == "NN" &&
                      field.fieldKey == tabOpALLoperation.fieldKey
                  ) {
                      console.log(this.dataSearch)

                      if (this.dataSearch == null) {
                          console.log(this.dataSearch)

                          if (field.fieldtype == "date") {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  name +
                                  "=na=" +
                                  "'" +
                                  this.contenuData +
                                  "'";
                          }
                          else if (field.fieldtype == "doubleAmount") {
                              this.dataSearch = name + "=na=" + this.contentMontantNull;
                          }

                          else {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  name +
                                  "=na=" +
                                  "'" +
                                  this.contentNull +
                                  "'";
                          }
                      } else {
                          console.log(this.dataSearch)



                          if (field.fieldtype == "date") {
                              console.log(this.dataSearch)

                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=na=" +
                                  "'" +
                                  this.contenuData +
                                  "'";
                          }

                          else if (field.fieldtype == "doubleAmount") {
                              this.dataSearch = name + "=na=" + this.contentMontantNull;
                          }



                          else {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=na=" +
                                  "'" +
                                  this.contentNull +
                                  "'";
                          }
                      }

                      console.log("dattttttta  null ", this.dataSearch);
                  }
                  if (
                      tabOpALLoperation.operator == "!N" &&
                      field.fieldKey == tabOpALLoperation.fieldKey
                  ) {
                      console.log(this.dataSearch)
                      if (this.dataSearch == null) {
                          console.log(this.dataSearch)
                          if (field.fieldtype == "date") {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  name +
                                  "=nn=" +
                                  "'" +
                                  this.contenuData +
                                  "'";
                          }

                          else if (field.fieldtype == "doubleAmount") {
                              this.dataSearch =
                                  name +
                                  "=nn=" +
                                  this.contentMontantNull;
                          }

                          else {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  name +
                                  "=nn=" +
                                  "'" +
                                  this.contentNull +
                                  "'";
                          }
                      } else {
                          console.log(this.dataSearch)

                          if (field.fieldtype == "date") {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=nn=" +
                                  "'" +
                                  this.contenuData +
                                  "'";
                          }
                          else if (field.fieldtype == "doubleAmount") {
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=nn=" +
                                  this.contentMontantNull;
                          }


                          else {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=nn=" +
                                  "'" +
                                  this.contentNull +
                                  "'";
                          }
                      }
                  }
              }
          }

          // **else 

          else {
              console.log("elseOfif",this.dataSearch)
              console.log(this.dataSearch)


              if (field.fieldType == "localDateTime") {
                  console.log(this.dataSearch)
                  this.searchForm
                      .get(a.toString())?.setValue(
                          this.datePipe.transform(
                              this.searchForm.controls[
                                  field.fieldKey.toString()
                              ].value,
                              "yyyy-MM-ddTHH:mm:ss"
                          )
                      );
                  console.log(
                      "date",
                      this.datePipe.transform(
                          this.searchForm.controls[field.fieldKey.toString()]
                              .value,
                          "yyyy-MM-ddTHH:mm:ss"
                      )
                  );
              }
              this.dataReturnSearch[name] = this.searchForm.get(
                  a.toString()
              )?.value;

              let content = this.searchForm.get(a.toString())?.value;

              console.log("content data");
              console.log(content);
              console.log("maCHAINEEE",this.dataSearch);
              if(field.fieldType == "text") {
                  this.dataSearch = this.dataSearch + ";" + name + "==" + "'" + content + "'";
              }
              console.log("maCHAINEEE",this.dataSearch);

              if (field.fieldtype == "doubleAmount" && content.includes(',')) {
                  console.log('heeere');
                  content = content.replace(/,/g, '.');
              }

              if (this.dataSearch == null) {
                  console.log(this.dataSearch)

                 
                  console.log(this.dataSearch)

                  if (field.fieldIsForeigKey == true) {
                      if (field.fieldMultiple == true) {
                      
                       
                          console.log("maCHAINEEE",this.dataSearch);
                          console.log(this.dataSearch)
                          this.dataSearch = name + ".id=in=(";
                          content.forEach((element: { id: string; }) => {
                              console.log('elementttt',element);
                              if (element == content[content.length - 1]) {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      this.dataSearch + element.id;
                              }
                              //ikram
                              
                              else {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      this.dataSearch + element.id + ",";
                              }
                          });
                          console.log(this.dataSearch)
                          this.dataSearch = this.dataSearch + ")";
                          // this.dataSearch=name+".id=="+content[0].id;
                      } else {
                          console.log(this.dataSearch)
                          //firas
                          this.dataSearch = name + ".id==" + content.id;
                      }
                  } 
                  
                  
                  else {
                      console.log("BEFORE",this.dataSearch)
                      //1
                      this.dataSearch = name + "==" + "'" + content + "'";
                      console.log("AFTERRRRR",this.dataSearch)    
                      // if(field.fieldType == "text" || field.fieldType == "doubleAmount") {
                      //     console.log("hereeeee");
                      //     this.dataSearch = this.dataSearch + ";" + name + "==" + "'" + content + "'";
                      // }

                      for (let tabOpALLoperation of this.tabOpALLoperation) {
                          console.log(this.dataSearch);
                          //addedNow

                          if (tabOpALLoperation.operator == "()" && field.fieldtype == "doubleAmount" && content.includes(',')) {
                              console.log('heeere');
                              content = content.replace(/,/g, '.');
                          }

                          // if(tabOpALLoperation.operator == "[ ]" && field.fieldtype == "doubleAmount" && content.includes(';')) {
                          //     console.log('testcrochet');
                          //     content = content.replace(/,/g, ';');

                          // }

                          if (
                              tabOpALLoperation.operator == "==" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {

                              if (field.fieldtype == "doubleAmount" && content.includes(',')) {
                                  content = content.replace(/,/g, '.');

                                  console.log("contentForCase-equal", content);

                                  this.dataSearch = name + "==" + content;

                              }

                              else {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      name + "==" + "'" + content + "'";
                              }

                          }

                          if (
                              tabOpALLoperation.operator == "%%" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)

                              this.dataSearch =
                                  name + "=ke=" + "'" + content + "'";
                          }
                          if (
                              tabOpALLoperation.operator == "!%" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                             
                              console.log(this.dataSearch)

                              this.dataSearch =
                                  name + "=nk=" + "'" + content + "'";

                          }

                          if (
                              tabOpALLoperation.operator == ">=" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)

                              this.dataSearch =
                                  name + "=ge=" + "'" + content + "'";
                          }
                          if (
                              tabOpALLoperation.operator == "<=" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  name + "=le=" + "'" + content + "'";
                          }
                          if (
                              tabOpALLoperation.operator == "NN" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  name +
                                  "=na=" +
                                  "'" +
                                  this.contentNull +
                                  "'";
                          }
                          if (
                              tabOpALLoperation.operator == "!=" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {

                              if (field.fieldtype == "doubleAmount" && content.includes(',')) {
                                  content = content.replace(/,/g, '.');
                                  this.dataSearch =
                                      name + "!=" + content;

                              }
                              else {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      name + "!=" + "'" + content + "'";
                              }

                          }

                          if (
                              tabOpALLoperation.operator == "()" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              console.log('contetttttt', content); // 114,95;175,45 // en 114.95;175.45
                              if ((field.fieldtype == "doubleAmount" && content.includes(',') && content.includes(';')) || (field.fieldtype == "doubleAmount" && content.includes(';'))) {
                                  content = content.replace(/,/g, '.');
                                  content = content.replace(/;/g, ',');

                                  console.log("contentForCase-In", content);

                              }
                              this.dataSearch =
                                  name + "=in=" + "(" + content + ")";
                          }

                          if (
                              tabOpALLoperation.operator == "!(" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {

                              if ((field.fieldtype == "doubleAmount" && content.includes(';'))) {

                                  content = content.replace(/;/g, ',');

                                  console.log("contentForCase-In", content);

                              }


                              console.log(this.dataSearch)
                              this.dataSearch =
                                  name + "=out=" + "(" + content + ")";
                          }
                          if (
                              tabOpALLoperation.operator == "[ ]" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              if (field.fieldtype == "date") {
                                  console.log(this.dataSearch)
                                  this.dataSearch = 
                                      name +
                                      "=ge=" +
                                      "'" +
                                      content[0] +
                                      "'" +
                                      ";" +
                                      name +
                                      "=le=" +
                                      "'" +
                                      content[1] +
                                      "'";
                              }
                              //addedNow
                              else if (field.fieldtype == "doubleAmount") {
                                  console.log("contentAmount: " + content);
                                  content = content.split(';');
                                  console.log('contenttttttt', content);
                                  for (var i = 0; i < content.length; i++) {
                                      if (content[i].includes(',')) {
                                          let contentchanged = content.map(function (element: string) {
                                              return element.replace(',', '.');
                                          });

                                          content = contentchanged;
                                          console.log('contentchanged', content);
                                      }
                                  }
                                  this.dataSearch = name + "=ge=" + content[0] + ";" + name + "=le=" + content[1];
                              }

                              else {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      name +
                                      "=ge=" +
                                      "'" +
                                      content +
                                      "'" +
                                      ";" +
                                      name +
                                      "=le=" +
                                      "'" +
                                      content +
                                      "'";
                              }
                          }
                      }
                  }
                  console.log(this.dataSearch)
              } 
              
              else {
                  console.log(this.dataSearch)
                
                  
                  if(field.fieldMultiple != true){
                      this.dataSearch = this.dataSearch + ";" + name + "==" + "'" + content +"'";
                    } 


                  if (field.fieldIsForeigKey == true) {
                      console.log(this.dataSearch) 
                   
                      if (field.fieldMultiple == true) {
                          console.log(this.dataSearch)
                          this.dataSearch =
                              this.dataSearch + ";" + name + ".id=in=(";
                          content.forEach((element: { id: string; }) => {
                              if (element == content[content.length - 1]) {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      this.dataSearch + element.id;
                              } else {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      this.dataSearch + element.id + ",";
                              }
                          });
                          this.dataSearch = this.dataSearch + ")";
                          // this.dataSearch=this.dataSearch+";"+name+".id=="+content[0].id;
                      } 
                      
                      else {
                          console.log(this.dataSearch)
                          this.dataSearch =
                              this.dataSearch +
                              ";" +
                              name +
                              ".id==" +
                              content.id;
                      }
                  } else {
                      console.log(this.dataSearch)
                 

                      for (let tabOpALLoperation of this.tabOpALLoperation) {

                          console.log(this.dataSearch)
                          if (
                              tabOpALLoperation.operator == "==" &&
                              field.fieldKey == tabOpALLoperation.fieldKey

                          ) {


                              if (field.fieldtype == "doubleAmount" && content.includes(',')) {
                                  content = content.replace(/,/g, '.');

                                  console.log("contentForCase-equal", content);

                              }

                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "==" +
                                  "'" +
                                  content +
                                  "'";
                          }

                          if (
                              tabOpALLoperation.operator == "%%" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=ke=" +
                                  "'" +
                                  content +
                                  "'";
                          }
                          if (
                              tabOpALLoperation.operator == "!%" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=nk=" +
                                  "'" +
                                  content +
                                  "'";
                          }
                          if (
                              tabOpALLoperation.operator == "NN" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)

                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=na=" +
                                  "'" +
                                  this.contentNull +
                                  "'";
                          }

                          if (
                              tabOpALLoperation.operator == ">=" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                             
                              if(this.dataSearch.includes("Date")) {
                                  let mychaine1 = this.dataSearch.split(';');
                                  let partiesFiltrees: string[] = mychaine1.filter((partie: string | string[]) => !partie.includes("Date=="));
                                  let nouvelleChaine: string = partiesFiltrees.join(';');
                                  console.log("nouvelleChaine",nouvelleChaine);
                                  this.dataSearch = nouvelleChaine;
                              }
                              console.log('resultttt: ', this.dataSearch);
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=ge=" +
                                  "'" +
                                  content +
                                  "'";
                          }
                          if (
                              tabOpALLoperation.operator == "<=" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              if(this.dataSearch.includes("Date")) {
                                  let mychaine1 = this.dataSearch.split(';');
                                  let partiesFiltrees: string[] = mychaine1.filter((partie: string | string[]) => !partie.includes("Date=="));
                                  let nouvelleChaine: string = partiesFiltrees.join(';');
                                  console.log("nouvelleChaine",nouvelleChaine);
                                  this.dataSearch = nouvelleChaine;
                              }
                              console.log("ressss",this.dataSearch);
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=le=" +
                                  "'" +
                                  content +
                                  "'";
                          }

                          if (
                              tabOpALLoperation.operator == "!=" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {

                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "!=" +
                                  "'" +
                                  content +
                                  "'";
                          }

                          if (
                              tabOpALLoperation.operator == "()" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=in=" +
                                  "(" +
                                  content +
                                  ")";
                          }
                          if (
                              tabOpALLoperation.operator == "!(" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)
                              this.dataSearch =
                                  this.dataSearch +
                                  ";" +
                                  name +
                                  "=out=" +
                                  "(" +
                                  content +
                                  ")";
                          }

                          if (
                              tabOpALLoperation.operator == "[ ]" &&
                              field.fieldKey == tabOpALLoperation.fieldKey
                          ) {
                              console.log(this.dataSearch)

                              if (this.dataSearch.includes("Date")) {
                                  const regex = /Date$/;
                                  console.log('regex.test(input)', regex.test(this.dataSearch));
                               
                                  this.dataSearch = this.dataSearch.replace(/;[a-zA-Z]+Date=='\d{4}\/\d{2}\/\d{2},\d{4}\/\d{2}\/\d{2}'/, '');


                                  console.log('resultttt: ', this.dataSearch);
                                 
                              }


                              if (field.fieldtype == "date") {

                                  this.dataSearch =
                                      this.dataSearch + ";" +
                                      name +
                                      "=ge=" +
                                      "'" +
                                      content[0] +
                                      "'" +
                                      ";" +
                                      name +
                                      "=le=" +
                                      "'" +
                                      content[1] +
                                      "'";
                                  console.log(this.dataSearch)
                              } else {
                                  console.log(this.dataSearch)
                                  this.dataSearch =
                                      name +
                                      "=ge=" +
                                      "'" +
                                      content +
                                      "'" +
                                      ";" +
                                      name +
                                      "=le=" +
                                      "'" +
                                      content +
                                      "'";
                                  console.log(this.dataSearch)
                              }
                          }
                          if (!(this.dataSearch.includes('=' + name + "=") || this.dataSearch.includes(";" + name + "="))) {
                              this.dataSearch = this.dataSearch +
                                  ";" +
                                  name +
                                  "==" +
                                  "'" +
                                  content +
                                  "'";
                          }

                      }
                  }
              }
          }
      }

      console.log(this.dataSearch);
      console.log("----------------------------");

      console.log(this.dataSearch1);

      let urlactionbtn = this.criteriaSearchPanel.buttons[1].urlactionbtn;
      console.log("urlactionbtn", this.dataSearch);
      let urlactionbtnSearch =
          this.criteriaSearchPanel.buttons[0].urlactionbtn;
      let id = urlactionbtn.substring(
          urlactionbtn.lastIndexOf("/") + 1,
          urlactionbtn.length
      );
      this.specsResultSearch = new Spec();
      this.specsResultSearch.urlService = urlactionbtnSearch.substring(
          0,
          urlactionbtnSearch.lastIndexOf("/")
      );
      this.specsResultSearch.urlactionbtn = url;
      this.specsResultSearch.specification = this.dataSearch;
      this.specsResultSearch.idService = id;
      this.specsResultSearch.idServiceView =
          this.criteriaSearchPanel.idServiceView;
      this.specsResultSearch.idServiceUpdate =
          this.criteriaSearchPanel.idServiceUpdate;
      this.specsResultSearch.idServiceFindByCriteria =
          this.idServiceFindByCriteria;
      if (this.provisionView == true) {
          this.specsResultSearch.idServiceFindByCriteria = this.idEntity;
          this.specsResultSearch.nameEntity =
              this.criteriaSearchPanel.titlePanel.split(" ")[1];
      }
      if (this.isItHolderSpecification) {
          // this.specsResultSearch.idServiceFindByCriteria =
          //     this.idSearchViewHolder;
      }
      this.existResultSearch = true;
      console.log("spec result final search");
      console.log(this.specsResultSearch);

      this.expanded = true;
  }

  searchSelectedInput(field: any, idField: any) {
      console.log("field", field);

      if (this.criteriaSearchPanel.fields != null) {
          for (let fieldContext of this.criteriaSearchPanel.fields) {
              if (fieldContext.fieldname == field.fieldname) {
                  this.fieldAvecContext = fieldContext;
                  break;
              }
          }
      }

      this.selectedSearchView = new SearchSelected();
      this.existResultSearch = false;
      console.log("id Service");
      console.log(field.idService);
      console.log("field number :");
      console.log(idField);
      console.log("this.selectedSearchView", this.selectedSearchView);

      this.selectedSearchView.idFieldSelected = idField;

      this.selectedSearchView.fieldSelected = field;
      console.log(
          "selectedSearchView.idFieldSelected",
          this.selectedSearchView.idFieldSelected
      );
      console.log(
          "selectedSearchView.fieldSelected",
          this.selectedSearchView.fieldSelected
      );

      this.existResultSearch = false;
      this.expanded = true;
      this.existSelectedSearchView = true;
  }

  dataEventResultSearchSelected($event: { idFieldSelected: string | number; fieldSelected: { fieldname: any; fieldDataForeignKey: any; fieldMultiple: boolean; fieldtype: string; fieldKey: string | number; }; dataSelected: any; }) {
      console.log("melek", $event);

      console.log("melek", $event.idFieldSelected);

      console.log("melek", this.criteriaSearchPanel.fields);
      console.log(
          "nameeeeeee",
          this.criteriaSearchPanel.fields[$event.idFieldSelected]
      );
      if(!isUndefined(this.criteriaSearchPanel.fields[$event.idFieldSelected])) {
          this.dataSelected = this.criteriaSearchPanel.fields[$event.idFieldSelected].fieldLabel;
      }
      console.log("dataSelecteddddd",this.dataSelected);
      let name = $event.fieldSelected.fieldname;
      console.log("name", name);
      let data = $event.dataSelected;
      console.log("data");
      console.log(data);
      let indexFieldParent = 0;
      for (let fieldFindParent of this.criteriaSearchPanel.fields) {
          if (
              fieldFindParent.contextDto != null &&
              fieldFindParent.contextDto.mapperValues != null &&
              fieldFindParent.contextDto.mapperValues.value == null
          ) {
              let k = 0;
              for (let mapperValue of fieldFindParent.contextDto
                  .mapperValues) {
                  if (
                      mapperValue.originalField == name &&
                      mapperValue.targetField == "parentData"
                  ) {
                      console.log(
                          "field",
                          this.criteriaSearchPanel.fields[fieldFindParent]
                      );
                      this.criteriaSearchPanel.fields[
                          indexFieldParent
                      ].contextDto.mapperValues[k].value = data;

                      console.log("parent value", fieldFindParent);

                      break;
                  }
                  k++;
              }
          }
          indexFieldParent++;
      }
      $event.fieldSelected.fieldDataForeignKey = data;
      if (
          $event.fieldSelected
              .fieldMultiple == false
      ) {
          $event.fieldSelected.fieldtype =
              "select";
          this.searchForm.controls[$event.fieldSelected.fieldKey].setValue(
              data[0]
          );
          //this.OptionChanged(this.criteriaSearchPanel.fields[$event.idFieldSelected],data[0],false);
      } else if (
          $event.fieldSelected
              .fieldMultiple == true
      ) {
          $event.fieldSelected.fieldtype =
              "select";
          this.searchForm.controls[$event.fieldSelected.fieldKey].setValue(
              data
          );
          // this.OptionChanged(this.criteriaSearchPanel.fields[$event.idFieldSelected],data,false);
      }
      this.existSelectedSearchView = false;
      //*NOUHA-- this.searchViewSelected.existResultSearch=false;
      this.expanded = false;
  }

  dataEventProvisionLineHandler($event: boolean | undefined) {
      this.dataEventProvisionLineRoot.emit($event);
  }

  isHolderScreenEmitEventHandler($event: any) {
      this.isHolderScreenEmitEvent.emit($event);
  }

  isdisabled(field: { isDisabled: boolean; }) {
      if (field.isDisabled == true) {
          return true;
      } else {
          return false;
      }
  }

  /// montantField

  /*    separator(numb) {
          var str = numb.toString().split(',');
          str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          return str.join(',');
      }*/

  onNameChange(event: { target: { value: null; }; }, field: { fieldtype: string; fieldValue: null; }) {
      console.log("8field 👉️", field); // 👉️

      let _currency: any;

      console.log(
          "_currencyEN in pipe",
          (_currency = localStorage.getItem("currency"))
      );
      if (!isUndefined(field)) {
          if (field.fieldtype == "doubleAmount") {
              if (this.validationAmount.form(event.target.value) == false) {
                  event.target.value = null;
              } else {
                  if (!isUndefined(field)) {
                      if (field.fieldtype == "doubleAmount") {
                          if (field.fieldValue == null) {
                              field.fieldValue = this.doubleAmounts.separator(
                                  event.target.value
                              );
                          } else {
                              field.fieldValue =
                                  this.doubleAmounts.separatorViewEdit(
                                      event.target.value
                                  );
                          }
                      }
                  }
              }
          }
      }
  }

  generateFile() {
      this.dataSearch = null;
      console.log("search Entity url");
      for (let field of this.criteriaSearchPanel.fields) {
          let name = field.fieldname;
          let a = field.fieldKey;

          this.dataReturnSearch[name] = null;
          this.dataReturnSearch[name] = this.searchForm.get(a.toString())?.value;
      }
      console.log("testt" + this.dataReturnSearch["from"], this.dataReturnSearch["to"], this.dataReturnSearch["clientCode"], this.dataReturnSearch["pathFolder"])
      console.log("from", this.dataReturnSearch["from"]);
      var object = { "fromDate": this.dataReturnSearch["from"], "toDate": this.dataReturnSearch["to"], "clientCode": this.dataReturnSearch["clientCode"], "folderPath": this.dataReturnSearch["pathFolder"] }

      // this.archiveDumentService.archiveDocumentFile(object).subscribe((data: any) => {
      //     console.log(data);
      //     this.service.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Files are downloaded succesfully' });



      // },
      //     (error: { error: { message: any; }; }) => {
      //         console.log("error******************************", error);
      //         this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error.message });

      //     }
      // )
      console.log("afficheData", this.dataReturnSearch);

  }

}
