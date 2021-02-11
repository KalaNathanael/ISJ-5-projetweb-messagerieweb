import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsServicesService {

  constructor(private httpClient: HttpClient) { }

  url="http://localhost:3000/api";
  userId="601534b58fb4295e14960e81";
  contactsSubject = new Subject<any[]>();
  contactsaddSubject = new Subject<any[]>();
  contactsFilterSubject = new Subject<any[]>();
  p: boolean;
  contacts;
  contacts_added=[];
  contactsFilter;
  token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDE1MzRiNThmYjQyOTVlMTQ5NjBlODEiLCJpYXQiOjE2MTI5ODYxMzQsImV4cCI6MTYxMzA3MjUzNH0.J0rGCzptAregnv1amRhbWEdQZHWEoIrMclb4sWl5f9M';
  headers= new HttpHeaders().set('Authorization', 'Bearer '+this.token);

  
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
    this.httpClient.get("http://localhost:3000/api/contacts/601534b58fb4295e14960e81", {'headers':this.headers})
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
}
