// @flow
export type Lists = { [string]:  List };
export type Tasks = { [string]:  Task };
export type ListItems = { [string]:  ListItem };
export type Participants = { [string]:  Participant };
export type Contacts = { [string]:  Contact };

export interface Report extends Any {
}

export interface Geoloc {
  lat: string,
  lng: string,
}

export interface Company {
  name: string,
  identification: string,
  address: string,
  zipcode: string,
  _geoloc: Geoloc,
  city: string,
  phoneNumber: string,
  Tasks: Tasks,
  Contacts: Contacts,
}

export interface Contact {
  lastName: string,
  firstName: string,
  email: string,
  phoneNumber: string,
}

export interface User {
  profile: Profile,
  tasks: Tasks,
}

export interface Profile {
  lastName: string,
  firstName: string,
  birthday: number,
  isAdmin: boolean,
  phoneNumber: string,
  emailNotifications: boolean,
  phoneNotifications: boolean,
  matricule: string,
}

export interface List {
  name: string,
  description: string,
  items: ListItems,
}

export interface ListItem {
  title: string,
  done: boolean, 
}

export interface Task {
  title: string,
  time: number,
  date: string,
  imageURL: string,
  done: boolean,
  lists: Lists
}

export interface Participant {
  uid: string,
}
