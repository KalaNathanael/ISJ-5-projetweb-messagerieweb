import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsServicesService {

  constructor(private httpClient: HttpClient, public userService : UserService) {
    this.userId = userService.activeUserId;
    this.token = userService.userToken;
    this.headers= new HttpHeaders().set('Authorization', 'Bearer '+this.token);
  }

  url="http://localhost:3000/api";
  userId : String;
  contactsSubject = new Subject<any[]>();
  contactsaddSubject = new Subject<any[]>();
  contactsFilterSubject = new Subject<any[]>();
  p: boolean;
  contacts;
  contacts_added=[];
  contactsFilter;
  compteurMessage=15;
  token : String;
  headers;

  
  emitContactSubject(){
    this.contactsSubject.next(this.contacts.slice());
  }

  emitContactAddSubject(){
    this.contactsaddSubject.next(this.contacts_added.slice());
  }

  emitContactFilterSubject(){
    this.contactsFilterSubject.next(this.contactsFilter.slice());
  }
  

  listContacts(){
    this.httpClient.get("http://localhost:3000/api/contacts/"+this.userId, {'headers':this.headers})
      .subscribe(
        (data) => {
          console.log("enter]]");
          this.contacts = data;
          this.emitContactSubject();
         },
        (error)=> {
          console.log('Error when listing contacts ! : ' + error);
        }
      );
  }


  addContact(contact){
    this.httpClient.post<any[]>(this.url+"/add-contact", contact, {'headers':this.headers})
      .subscribe(
        (response) => {
          this.listContacts();
        },
        (error) => {
          console.log('Error when adding a contact ! : ' + error);
        }
      );
  }



  updateContact(contact){
    this.httpClient.put<any[]>(this.url+"/update-contact/"+contact.id, contact, {'headers':this.headers})
      .subscribe(
        (response) => {
          this.listContacts();
        },
        (error) => {
          console.log('Error when updating a contact ! : ' + error);
        }
      );
  }


  deleteContact(contact){
    this.p=confirm("Voulez-vous vraiment supprimer ce contact");
    if(this.p){
      this.httpClient.delete<any[]>(this.url+"/delete-contact/"+contact, {'headers':this.headers})
        .subscribe(
          (response) => {
          this.listContacts();
        },
        (error) => {
        console.log('Error when deleting a contact ! : ' + error);
      }
    );
    }
  }


  sendMessage(contact){
    this.httpClient.post<any[]>(this.url+"/send-sms", contact, {'headers':this.headers})
        .subscribe(
          (response) => {
            console.log(response+ "@@@resultat envoi de message");
        },
        (error) => {
        console.log('Error when sending a message ! : ' + error);
      }
    );
  }
}
