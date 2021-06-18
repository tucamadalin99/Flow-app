
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
    name: 'login'
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
    name: 'register'
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Account.vue') }
    ]
  },
  {
    path: '/changePass',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Password.vue') }
    ]
  },
  {
    path: '/activity',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Activity.vue') }
    ]
  },
  {
    path: '/tasks',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Tasks.vue') }
    ]
  },
  {
    path: '/board',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Board.vue') }
    ]
  },
  {
    path: '/agenda',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Agenda.vue') }
    ]
  },
  {
    path: '/contacts',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Contacts.vue') }
    ]
  }
  ,
  {
    path: '/team',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Lead.vue') }
    ]
  },
  {
    path: '/manager',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Manager.vue') }
    ]
  },
  {
    path: '/salaries',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Salary.vue') }
    ]
  },
  {
    path: '/gantt',
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: '', component: () => import('pages/Gantt.vue') }
    ]
  },
  {
    path: '/flow',
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: '', component: () => import('pages/Flow.vue') }
    ]
  }

]

export default routes
