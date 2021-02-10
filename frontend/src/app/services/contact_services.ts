import { Subject } from 'rxjs';
export class ContactServices {

  contactsSubject = new Subject<any[]>();
  contactsaddSubject = new Subject<any[]>();
  contactsFilterSubject = new Subject<any[]>();
  p: boolean;

  contacts=[
      {name:'ngaleu Nag', email:'ngaleu@gmail.com', phone:655074598},
      {name:'ngaMapouche', email:'ngaleu1@gmail.com', phone:600000000},
      {name:'ndane Amine', email:'ndaneamine@gmail.com', phone:655697842},
      {name:'SiakamOmer', email:'ngaleu3@gmail.com', phone:651254874}
  ];
  
  contacts_added = [];

  contactsFilter= [];

  addContact(contact){
    this.contacts.push(contact);
    this.emitContactSubject();
  }
  
  deleteContact(index){
    this.p=confirm("Voulez-vous vraiment supprimer le contact: "+this.contacts[index].name+" ?");
    if(this.p){
      this.contacts.splice(index,1);
      this.emitContactSubject();
    }
  }
  
  emitContactSubject(){
    this.contactsSubject.next(this.contacts.slice());
  }

  emitContactAddSubject(){
    this.contactsaddSubject.next(this.contacts_added.slice());
  }

  emitContactFilterSubject(){
    this.contactsFilterSubject.next(this.contactsFilter.slice());
  }
  
  update(contact){
    //this.contactsFilter.push(contact);
    this.contactsFilter.push(contact);
  }

}
