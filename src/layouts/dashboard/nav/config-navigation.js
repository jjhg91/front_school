// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [


  // TEST
  // ----------------------------------------------------------------------
  {
    subheader: 'USUARIOS',
    items: [
      {
        title: 'Estudiante',
        path: PATH_DASHBOARD.student.root,
        icon: ICONS.user,
        children: [
          { title: 'Listado', path: PATH_DASHBOARD.student.list },
        ],
      },
      {
        title: 'Representante',
        path: PATH_DASHBOARD.representative.root,
        icon: ICONS.user,
        children: [
          { title: 'Listado', path: PATH_DASHBOARD.representative.list },
        ],
      },
      {
        title: 'Profesor',
        path: PATH_DASHBOARD.teacher.root,
        icon: ICONS.user,
        children: [
          { title: 'Listado', path: PATH_DASHBOARD.teacher.list },
        ],
      },
      {
        title: 'Personal',
        path: PATH_DASHBOARD.staff.root,
        icon: ICONS.user,
        children: [
          { title: 'Listado', path: PATH_DASHBOARD.staff.list },
        ],
      },
    ]
  },
  {
    subheader: 'CONTROL ESTUDIO',
    items:[
      // PERIODO
      {
        title: 'periodo',
        path: PATH_DASHBOARD.period.root,
        icon: ICONS.calendar,
        children: [
          { title: 'list', path: PATH_DASHBOARD.period.list },
          // { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.period.new },
          // { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
      // SPECIALITY
      {
        title: 'especialdiad',
        path: PATH_DASHBOARD.speciality.root,
        icon: ICONS.kanban,
        children: [
          { title: 'list', path: PATH_DASHBOARD.speciality.list },
          // { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.speciality.new },
          // { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
      // CURSO
      {
        title: 'curso',
        path: PATH_DASHBOARD.course.root,
        icon: ICONS.folder,
        children: [
          { title: 'list', path: PATH_DASHBOARD.course.list },
        //  { title: 'details', path: PATH_DASHBOARD.course.demoView },
          { title: 'create', path: PATH_DASHBOARD.course.new },
          // { title: 'edit', path: PATH_DASHBOARD.course.demoEdit },
        ],
      },
      // MODALITY
      {
        title: 'turno',
        path: PATH_DASHBOARD.modality.root,
        icon: ICONS.blank,
        children: [
          { title: 'list', path: PATH_DASHBOARD.modality.list },
          // { title: 'details', path: PATH_DASHBOARD.modality.demoView },
          { title: 'create', path: PATH_DASHBOARD.modality.new },
          // { title: 'edit', path: PATH_DASHBOARD.modality.demoEdit },
        ],
      },
    ]
  },
  {
    subheader: 'ADMINISTRACION Y FINANZA',
    items:[
      // INVOICE
      {
        title: 'facturas',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          // { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          // { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
      // PRODUCTOS Y SERVICIOS
      {
        title: 'productos y servicios',
        path: PATH_DASHBOARD.productService.root,
        icon: ICONS.blank,
        children: [
          { title: 'list', path: PATH_DASHBOARD.productService.list },
          // { title: 'details', path: PATH_DASHBOARD.modality.demoView },
          { title: 'create', path: PATH_DASHBOARD.productService.new },
          // { title: 'edit', path: PATH_DASHBOARD.modality.demoEdit },
        ],
      },

    ]
  },
  // {
  //   subheader: 'TEST',
  //   items: [
  //   //   // USER
  //   //   {
  //   //     title: 'Usuarios',
  //   //     path: PATH_DASHBOARD.user.root,
  //   //     icon: ICONS.user,
  //   //     children: [
  //   //       { title: 'Estudiante', path: PATH_DASHBOARD.student.list },
  //   //       { title: 'Representante', path: PATH_DASHBOARD.user.list },
  //   //       { title: 'Profesor', path: PATH_DASHBOARD.user.list },
  //   //       { title: 'Personal', path: PATH_DASHBOARD.user.list },
  //   //       // { title: 'create usuario', path: PATH_DASHBOARD.user.new },
  //   //       // { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //   //       // { title: 'account', path: PATH_DASHBOARD.user.account },
  //   //       // { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //   //       // { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //   //     ],
  //   //   },

  //      // SCHOOL
  //     {
  //       title: 'school',
  //       path: PATH_DASHBOARD.school.root,
  //       icon: ICONS.banking,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.school.list },
  //         // { title: 'details', path: PATH_DASHBOARD.school.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.school.new },
  //         // { title: 'edit', path: PATH_DASHBOARD.school.demoEdit },
  //       ],
  //     },

  //      // BECA
  //     {
  //       title: 'beca',
  //       path: PATH_DASHBOARD.beca.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.beca.list },
  //         // { title: 'details', path: PATH_DASHBOARD.beca.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.beca.new },
  //         // { title: 'edit', path: PATH_DASHBOARD.beca.demoEdit },
  //       ],
  //     },

      

  //      // SHIFT
  //     {
  //       title: 'shift',
  //       path: PATH_DASHBOARD.shift.root,
  //       icon: ICONS.dashboard,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.shift.list },
  //         // { title: 'details', path: PATH_DASHBOARD.shift.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.shift.new },
  //         // { title: 'edit', path: PATH_DASHBOARD.shift.demoEdit },
  //       ],
  //     },

      

         



  //     // PENSUM
  //     {
  //       title: 'pensum',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.booking,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         // { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  //     // CALIFICACION
  //     {
  //       title: 'califacion',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.analytics,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         // { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  //     //  // INVOICE
  //     // {
  //     //   title: 'invoice',
  //     //   path: PATH_DASHBOARD.invoice.root,
  //     //   icon: ICONS.invoice,
  //     //   children: [
  //     //     { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //     //     { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //     //     { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //     //     { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //     //   ],
  //     // },

  //   ]
  // },


  // // MANAGEMENT
  // // ----------------------------------------------------------------------
  // {
  //     subheader: 'management',
  //     items: [

  //     // E-COMMERCE
  //     {
  //       title: 'ecommerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //       ],
  //     },

  //     // BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.blog.new },
  //       ],
  //     },
  //     {
  //       title: 'File manager',
  //       path: PATH_DASHBOARD.fileManager,
  //       icon: ICONS.folder,
  //     },
  //   ],
  // },

  // // GENERAL
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
  //     { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //     { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
  //   ],
  // },

  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     {
  //       title: 'chat',
  //       path: PATH_DASHBOARD.chat.root,
  //       icon: ICONS.chat,
  //     },
  //     {
  //       title: 'calendar',
  //       path: PATH_DASHBOARD.calendar,
  //       icon: ICONS.calendar,
  //     },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },

  // // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.lock,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level',
  //       path: '#/dashboard/menu_level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'menu_level_2a',
  //           path: '#/dashboard/menu_level/menu_level_2a',
  //         },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/dashboard/menu_level/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'item_disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },

  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'item_external_link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //     },
  //     {
  //       title: 'blank',
  //       path: PATH_DASHBOARD.blank,
  //       icon: ICONS.blank,
  //     },
  //   ],
  // },
];

export default navConfig;
