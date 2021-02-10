import { Component, Input, OnInit } from '@angular/core';
import { ContactServices } from '../services/contact_services';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
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
  @Input() name;
  @Input() email;
  @Input() phone;

  @Input() e;
  @Input() contact_added_to_list;
  contactsFilter: any[];

  constructor(private contactServices: ContactServices) { }

  ngOnInit(): void {
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
    this.contactServices.emitContactSubject();
    this.contactServices.emitContactAddSubject();
  }

  editContact(contact){
    this.name = contact.name;
    this.email = contact.email;
    this.phone = contact.phone;
    this.contactServices.emitContactSubject();
  }

  onEdit(form: NgForm){
    let i=0;
    for(let contact of this.contactServices.contacts){
      if(contact.name==this.name){
        console.log(this.name+"@@@");
        this.contactEdit = {
          name: form.value.name,
          email: form.value.email,
          phone: form.value.phone
        }
        console.log(form.value.name+"##")
        this.contactServices.contacts.splice(i,1,this.contactEdit);
        this.contactServices.emitContactSubject();
        (function ($) {
          $(document).ready(function(){
            $('#editcontactform').modal('hide');
          });
        })(jQuery);
      }
      i++;
    }
  }


  sendMessage(form: NgForm){
    console.log(form.value.phonenumber);
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
      phone: form.value.phone
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
