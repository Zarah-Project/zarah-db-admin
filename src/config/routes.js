import React from 'react'

const DocumentList = React.lazy(() => import('../views/documents/DocumentList/DocumentList'));
const DocumentForm = React.lazy(() => import('../views/documents/DocumentForm/DocumentForm'));

const PeopleList = React.lazy(() => import('../views/people/PeopleList/PeopleList'));
const OrganisationList = React.lazy(() => import('../views/organisations/OrganisationList/OrganisationList'));
const PlaceList = React.lazy(() => import('../views/places/PlaceList/PlaceList'));
const EventList = React.lazy(() => import('../views/events/EventList/EventList'));


const UserProfileForm = React.lazy(() => import('../components/User/UserProfileForm/UserProfileForm'));

const routes = [
  {path: '/', exact: true, component: DocumentList},
  {path: '/documents', exact: true, component: DocumentList},
  {path: '/documents/create', exact: true, component: DocumentForm, action: 'create'},
  {path: '/documents/view/:id', exact: true, component: DocumentForm, action: 'view'},
  {path: '/documents/edit/:id', exact: true, component: DocumentForm, action: 'edit'},

  {path: '/events', exact: true, component: EventList},
  {path: '/people', exact: true, component: PeopleList},
  {path: '/organisations', exact: true, component: OrganisationList},
  {path: '/places', exact: true, component: PlaceList},

  {path: '/profile', exact: true, component: UserProfileForm},
];

export default routes;
