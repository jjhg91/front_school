// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: (name) => path(ROOTS_DASHBOARD, `/user/${name}/profile`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  student:{
    root: path(ROOTS_DASHBOARD, '/student/list'),
    profile: (name) => path(ROOTS_DASHBOARD, `/student/${name}/profile`),
    list: path(ROOTS_DASHBOARD, '/student/list'),
    new: path(ROOTS_DASHBOARD, '/student/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/student/${name}/edit`),
  },
  representative:{
    root: path(ROOTS_DASHBOARD, '/representative/list'),
    list: path(ROOTS_DASHBOARD, '/representative/list'),
    new: path(ROOTS_DASHBOARD, '/representative/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/representative/${name}/edit`),
  },
  teacher:{
    root: path(ROOTS_DASHBOARD, '/teacher/list'),
    profile: (name) => path(ROOTS_DASHBOARD, `/teacher/${name}/profile`),
    list: path(ROOTS_DASHBOARD, '/teacher/list'),
    new: path(ROOTS_DASHBOARD, '/teacher/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/teacher/${name}/edit`),
  },
  staff:{
    root: path(ROOTS_DASHBOARD, '/staff/list'),
    list: path(ROOTS_DASHBOARD, '/staff/list'),
    new: path(ROOTS_DASHBOARD, '/staff/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/staff/${name}/edit`),
  },
  school: {
    root: path(ROOTS_DASHBOARD, '/school'),
    list: path(ROOTS_DASHBOARD, '/school/list'),
    new: path(ROOTS_DASHBOARD, '/school/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/school/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/school/${id}/edit`),
  },
  beca: {
    root: path(ROOTS_DASHBOARD, '/beca'),
    list: path(ROOTS_DASHBOARD, '/beca/list'),
    new: path(ROOTS_DASHBOARD, '/beca/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/beca/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/beca/${id}/edit`),
  },
  modality: {
    root: path(ROOTS_DASHBOARD, '/modality'),
    list: path(ROOTS_DASHBOARD, '/modality/list'),
    new: path(ROOTS_DASHBOARD, '/modality/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/modality/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/modality/${id}/edit`),
  },
  shift: {
    root: path(ROOTS_DASHBOARD, '/shift'),
    list: path(ROOTS_DASHBOARD, '/shift/list'),
    new: path(ROOTS_DASHBOARD, '/shift/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/shift/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/shift/${id}/edit`),
  },
  period: {
    root: path(ROOTS_DASHBOARD, '/period'),
    list: path(ROOTS_DASHBOARD, '/period/list'),
    newPeriodOffering: path(ROOTS_DASHBOARD, '/period/new/offering'),
    new: path(ROOTS_DASHBOARD, '/period/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/period/${id}`),
    editPeriodOffering: (id) => path(ROOTS_DASHBOARD, `/period/${id}/edit/offering`),
    edit: (id) => path(ROOTS_DASHBOARD, `/period/${id}/edit`),
  },
  speciality: {
    root: path(ROOTS_DASHBOARD, '/speciality'),
    list: path(ROOTS_DASHBOARD, '/speciality/list'),
    new: path(ROOTS_DASHBOARD, '/speciality/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/speciality/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/speciality/${id}/edit`),
  },
  course: {
    root: path(ROOTS_DASHBOARD, '/course'),
    list: path(ROOTS_DASHBOARD, '/course/list'),
    new: path(ROOTS_DASHBOARD, '/course/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/course/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/course/${id}/edit`),
  },
  productService: {
    root: path(ROOTS_DASHBOARD, '/productService'),
    list: path(ROOTS_DASHBOARD, '/productService/list'),
    new: path(ROOTS_DASHBOARD, '/productService/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/productService/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/productService/${id}/edit`),
  },
  preEnrollment: {
    root: path(ROOTS_DASHBOARD, '/preEnrollment'),
    list: path(ROOTS_DASHBOARD, '/preEnrollment/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/preEnrollment/${id}`),
    new: (id) => path(ROOTS_DASHBOARD, `/preEnrollment/${id}/new`),
    edit: (id) => path(ROOTS_DASHBOARD, `/preEnrollment/${id}/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
