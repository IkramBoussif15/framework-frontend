import {Injectable} from '@angular/core';
import {isUndefined} from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { ContextDto } from 'src/app/models/viewFormat/ContextDto.model';

@Injectable({
    providedIn: 'root'
})
export class UpdateContexDtoService {
    contextDto = new ContextDto();
    contextDtoGlobal: any;
    sharedmessage: any;
    colorbubble: boolean = false;
    
    contextDtoEditPartial: any;
    listOperationByPrefile: any;
    objectPrefile: any;
    listHolderByOperationType: any;
    listCommissionByOperationType: any;
    listOtherPaymentByOperationType: any;
    listPropertyByOperationType: any;
    userCureent: any;
    deleteEntity:any
    chatId: any;
    roomId:any
    jobEntity:any
    isFromMassiveDoc: boolean = false;
    /* ---------- */
    listFilterForCommission: any;
     delegationContext: any;
     isCreatePrefile: boolean = false;
     private WasReadValue :  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

     setWasReadValue(value: boolean) {
        this.WasReadValue.next(value);
     }

     getWasReadValue(){
        return this.WasReadValue.asObservable();
     }


     setisFromMassiveDoc(isFromMassiveDoc: boolean){
        this.isFromMassiveDoc=isFromMassiveDoc
    }

    getisFromMassiveDoc(){
        return this.isFromMassiveDoc;
    }

     setIsCreatePrefile(isCreatePrefile: boolean){
        this.isCreatePrefile=isCreatePrefile
    }

    getIsCreatePrefile(){
        return this.isCreatePrefile;
    }
   
     setDelegationContext(delegationContext: any){
        this.delegationContext=delegationContext
    }

    getDelegationContext(){
        return this.delegationContext;
    }

    constructor() {
    }

    setRoomId(roomId: any){
        this.roomId=roomId
    }

    getRoomId(){
        return this.roomId;
    }

    setChatId(chatId: any){
        this.chatId=chatId;
    }
    getChatId(){
        return this.chatId
    }

    setSharedMessage(sharedmessage: any){
        this.sharedmessage=sharedmessage
    }
    getSharedMessage(){
        return this.sharedmessage
    }

    setContextDto(contextDto: ContextDto) {
        this.contextDto = contextDto;
    }

    getContextDto() {
        return this.contextDto;
    }

    setContextDtoGlobal(contextDtoGlobal: any) {
        this.contextDtoGlobal = contextDtoGlobal;
    }

    getContextDtoGlobal() {
        return this.contextDtoGlobal;
    }


    setContextDtoEditPartial(contextDtoEditPartial: any) {
        this.contextDtoEditPartial = contextDtoEditPartial;
    }

    getContextDtoEditPartial() {
        return this.contextDtoEditPartial;
    }


    setListOperationTypeByPrefile(listOperationByPrefile: any) {
        this.listOperationByPrefile = listOperationByPrefile;
    }

    getListOperationTypeByPrefile() {
        return this.listOperationByPrefile;
    }

    setListHolderByOperationType(listHolderByOperationType: any) {
        this.listHolderByOperationType = listHolderByOperationType;
    }

    getListHolderByOperationType() {
        return this.listHolderByOperationType;
    }

    setListCommissionByOperationType(listCommissionByOperationType: any) {
        this.listCommissionByOperationType = listCommissionByOperationType;
    }

    getListCommissionByOperationType() {
        return this.listCommissionByOperationType;
    }

    setListOtherPaymentByOperationType(listOtherPaymentByOperationType: any) {
        this.listOtherPaymentByOperationType = listOtherPaymentByOperationType;
    }

    getListOtherPaymentByOperationType() {
        return this.listOtherPaymentByOperationType;
    }

    setListPropertyByOperationType(listPropertyByOperationType: any) {


        this.listPropertyByOperationType = listPropertyByOperationType;

    }


    getListPropertyByOperationType() {
        return this.listPropertyByOperationType;
    }

    setObjectPrefile(objectPrefile: any) {
        this.objectPrefile = objectPrefile;
    }

    getObjectPrefile() {
        return this.objectPrefile;
    }


    /* ----------------- */
    setListFilterForCommission(listCommissionByOperationType: any) {
        this.listFilterForCommission = listCommissionByOperationType;
    }

    getListFilterForCommission() {
        return this.listFilterForCommission;
    }


    /* -------getUser---------- */
    setUserCurrent(userCureent: any) {
        this.userCureent = userCureent;
    }

    getuserCureent() {
        return this.userCureent;
    }
setDeleteEntity(deleteEntity: any){
    this.deleteEntity=deleteEntity
}
getDeleteEntity(deleteEntity: any){
    return this.deleteEntity
}
/************************************************* */

setJobEntity(jobEntity: any){
    this.jobEntity=jobEntity
}
getJobEntity(){
    return this.jobEntity
}



}