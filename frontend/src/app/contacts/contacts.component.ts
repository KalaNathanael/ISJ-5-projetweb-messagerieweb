import { Component, Input, OnInit } from '@angular/core';
import { ContactsServicesService } from '../services/contacts-services.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders}  from '@angular/common/http';
declare  var jQuery:  any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: any[];
  contactEdit;
  contacts_added: any[];
  p: boolean;
  contactSubscription: Subscription;
  contactaddSubscription: Subscription;
  @Input() nameContact;
  @Input() emailContact;
  @Input() phoneContact;
  @Input() idContact;
  @Input() userContact;

  @Input() e;
  @Input() contact_added_to_list;
  contactsFilter;
  headers= new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDE1MzRiNThmYjQyOTVlMTQ5NjBlODEiLCJpYXQiOjE2MTI5ODYxMzQsImV4cCI6MTYxMzA3MjUzNH0.J0rGCzptAregnv1amRhbWEdQZHWEoIrMclb4sWl5f9M');


  constructor(private httpClient: HttpClient, private contactServices: ContactsServicesService) { }

  ngOnInit(): void {   
    this.contactServices.listContacts();
    this.contactSubscription = this.contactServices.contactsSubject.subscribe(
      (contacts: any[])=>{
        this.contacts = contacts;
        this.contactsFilter = this.contacts;
      }
    );
    this.contactaddSubscription = this.contactServices.contactsaddSubject.subscribe(
      (contacts_added: any[])=>{
        this.contacts_added = contacts_added;
      }
    );
    this.contactServices.emitContactAddSubject();
  }

  infoContact(contact){
    this.nameContact = contact.name;
    this.emailContact = contact.email;
    this.phoneContact = contact.phone;
    this.idContact = contact._id;
    this.contactServices.emitContactSubject();
  }

  editContact(form: NgForm){
    this.nameContact = (form.value.name) ? form.value.name : this.nameContact;
    this.emailContact = (form.value.email) ? form.value.email : this.emailContact;
    this.phoneContact = (form.value.phone) ? form.value.phone : this.phoneContact;
    this.contactEdit = {
      name: this.nameContact,
      email: this.emailContact,
      phone: this.phoneContact,
      id: this.idContact,
      user: this.contactServices.userId
    }
    this.contactServices.updateContact(this.contactEdit)
    this.contactServices.emitContactSubject();
    (function ($) {
      $(document).ready(function(){
        $('#editcontactform').modal('hide');
      });
    })(jQuery);
  }


  sendMessage(form: NgForm){
    console.log(form.value.message +"#####");
    this.contacts_added.forEach((contact)=>{console.log(contact.name);});
  }

  deleteContact(index){
    this.contactServices.deleteContact(index);
  }

  addContactForm(){
    this.p=true;
    for(let c of this.contacts_added){
        this.p = this.p && !(c.name===this.contacts[this.contact_added_to_list].name);
    }
    if(this.p){
      this.contactServices.contacts_added.push(this.contacts[this.contact_added_to_list]);
      this.contactServices.emitContactAddSubject();
    }
  }
  deleteListContactsToAdd(l){
    this.contactServices.contacts_added.splice(l,1);
    this.contactServices.emitContactAddSubject();
  }

  searchContact(){
    this.contactsFilter = [];
    if(!this.e){this.e="";}
    p: RegExp("  ","g");
    this.e=this.e.replace(this.p," ");
    this.e=this.e.toLowerCase();
    for(let contact of this.contacts){
      this.p=false;
      if(String(contact.name).toLowerCase().search(this.e)!=-1){
        this.p=true;
      }
      if(String(contact.email).toLowerCase().search(this.e)!=-1){
        this.p=true;
      }
      if(String(contact.phone).toLowerCase().search(this.e)!=-1){
        this.p=true;
      }
      if(this.p){
        this.contactsFilter.push(contact);
      }
    }    
    this.contactServices.emitContactFilterSubject();
  }

  onSubmit(form: NgForm){
    let contact={
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      user: this.contactServices.userId
    };
    this.contactServices.addContact(contact);
    
   (function ($) {
    $(document).ready(function(){
      $('#createcontactform').modal('hide');
    });
  })(jQuery);
        
  }

  ngOnDestroy(){
    this.contactSubscription.unsubscribe();
  }

}
