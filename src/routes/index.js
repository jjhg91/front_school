import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  GeneralAppPage,
  GeneralFilePage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralAnalyticsPage,
  // Dashboard: User
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,
  // Dashboard: Student
  StudentProfilePage,
  StudentListPage,
  StudentCreatePage,
  StudentEditPage,
  // Dashboard: Representative
  RepresentativeListPage,
  RepresentativeCreatePage,
  RepresentativeEditPage,
  // Dashboard: Teacher
  TeacherProfilePage,
  TeacherListPage,
  TeacherCreatePage,
  TeacherEditPage,
  // Dashboard: Staff
  StaffListPage,
  StaffCreatePage,
  StaffEditPage,
  // Dashboard: School
  SchoolListPage,
  SchoolDetailsPage,
  SchoolCreatePage,
  SchoolEditPage,
  // Dashboard: Beca
  BecaListPage,
  BecaDetailsPage,
  BecaCreatePage,
  BecaEditPage,
  // Dashboard: Modality
  ModalityListPage,
  ModalityDetailsPage,
  ModalityCreatePage,
  ModalityEditPage,
  // Dashboard: Shift
  ShiftListPage,
  ShiftDetailsPage,
  ShiftCreatePage,
  ShiftEditPage,
  // Dashboard: Period
  PeriodListPage,
  PeriodDetailsPage,
  PeriodCreatePage,
  PeriodCreateOfferingPage,
  PeriodEditOfferingPage,
  PeriodEditPage,
  // Dashboard: Speciality
  SpecialityListPage,
  SpecialityDetailsPage,
  SpecialityCreatePage,
  SpecialityEditPage,
  // Dashboard: Course
  CourseListPage,
  CourseDetailsPage,
  CourseCreatePage,
  CourseEditPage,
  // Dashboard: ProductSerive
  ProductServiceListPage,
  ProductServiceDetailsPage,
  ProductServiceCreatePage,
  ProductServiceEditPage,
  // Dashboard: PreEnrollment
  // PreEnrollmentListPage,
  // PreEnrollmentDetailsPage,
  PreEnrollmentCreatePage,
  // PreEnrollmentEditPage,
  // Dashboard: Ecommerce
  EcommerceShopPage,
  EcommerceCheckoutPage,
  EcommerceProductListPage,
  EcommerceProductEditPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  // Dashboard: Invoice
  InvoiceListPage,
  InvoiceDetailsPage,
  InvoiceCreatePage,
  InvoiceEditPage,
  // Dashboard: Blog
  BlogPostsPage,
  BlogPostPage,
  BlogNewPostPage,
  // Dashboard: FileManager
  FileManagerPage,
  // Dashboard: App
  ChatPage,
  MailPage,
  CalendarPage,
  KanbanPage,
  //
  BlankPage,
  PermissionDeniedPage,
  //
  Page500,
  Page403,
  Page404,
  HomePage,
  FaqsPage,
  AboutPage,
  Contact,
  PricingPage,
  PaymentPage,
  ComingSoonPage,
  MaintenancePage,
  //
  ComponentsOverviewPage,
  FoundationColorsPage,
  FoundationTypographyPage,
  FoundationShadowsPage,
  FoundationGridPage,
  FoundationIconsPage,
  //
  MUIAccordionPage,
  MUIAlertPage,
  MUIAutocompletePage,
  MUIAvatarPage,
  MUIBadgePage,
  MUIBreadcrumbsPage,
  MUIButtonsPage,
  MUICheckboxPage,
  MUIChipPage,
  MUIDataGridPage,
  MUIDialogPage,
  MUIListPage,
  MUIMenuPage,
  MUIPaginationPage,
  MUIPickersPage,
  MUIPopoverPage,
  MUIProgressPage,
  MUIRadioButtonsPage,
  MUIRatingPage,
  MUISliderPage,
  MUIStepperPage,
  MUISwitchPage,
  MUITablePage,
  MUITabsPage,
  MUITextFieldPage,
  MUITimelinePage,
  MUITooltipPage,
  MUITransferListPage,
  MUITreesViewPage,
  //
  DemoAnimatePage,
  DemoCarouselsPage,
  DemoChartsPage,
  DemoCopyToClipboardPage,
  DemoEditorPage,
  DemoFormValidationPage,
  DemoImagePage,
  DemoLabelPage,
  DemoLightboxPage,
  DemoMapPage,
  DemoMegaMenuPage,
  DemoMultiLanguagePage,
  DemoNavigationBarPage,
  DemoOrganizationalChartPage,
  DemoScrollbarPage,
  DemoSnackbarPage,
  DemoTextMaxLinePage,
  DemoUploadPage,
  DemoMarkdownPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'ecommerce', element: <GeneralEcommercePage /> },
        { path: 'analytics', element: <GeneralAnalyticsPage /> },
        { path: 'banking', element: <GeneralBankingPage /> },
        { path: 'booking', element: <GeneralBookingPage /> },
        { path: 'file', element: <GeneralFilePage /> },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShopPage /> },
            { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
            { path: 'list', element: <EcommerceProductListPage /> },
            { path: 'product/new', element: <EcommerceProductCreatePage /> },
            { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: ':name/profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'student',
          children:[
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: ':name/profile', element: <StudentProfilePage /> },
            { path: 'list', element: <StudentListPage /> },
            { path: 'new', element: <StudentCreatePage /> },
            { path: ':name/edit', element: <StudentEditPage /> },
          ],
        },
        {
          path: 'representative',
          children:[
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'list', element: <RepresentativeListPage /> },
            { path: 'new', element: <RepresentativeCreatePage /> },
            { path: ':name/edit', element: <RepresentativeEditPage /> },
          ],
        },
        {
          path: 'teacher',
          children:[
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: ':name/profile', element: <TeacherProfilePage /> },
            { path: 'list', element: <TeacherListPage /> },
            { path: 'new', element: <TeacherCreatePage /> },
            { path: ':name/edit', element: <TeacherEditPage /> },
          ],
        },
        {
          path: 'staff',
          children:[
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'list', element: <StaffListPage /> },
            { path: 'new', element: <StaffCreatePage /> },
            { path: ':name/edit', element: <StaffEditPage /> },
          ],
        },
        {
          path: 'school',
          children: [
            { element: <Navigate to="/dashboard/school/list" replace />, index: true },
            { path: 'list', element: <SchoolListPage /> },
            { path: ':id', element: <SchoolDetailsPage /> },
            { path: ':id/edit', element: <SchoolEditPage /> },
            { path: 'new', element: <SchoolCreatePage /> },
          ],
        },
        {
          path: 'beca',
          children: [
            { element: <Navigate to="/dashboard/beca/list" replace />, index: true },
            { path: 'list', element: <BecaListPage /> },
            { path: ':id', element: <BecaDetailsPage /> },
            { path: ':id/edit', element: <BecaEditPage /> },
            { path: 'new', element: <BecaCreatePage /> },
          ],
        },
        {
          path: 'modality',
          children: [
            { element: <Navigate to="/dashboard/modality/list" replace />, index: true },
            { path: 'list', element: <ModalityListPage /> },
            { path: ':id', element: <ModalityDetailsPage /> },
            { path: ':id/edit', element: <ModalityEditPage /> },
            { path: 'new', element: <ModalityCreatePage /> },
          ],
        },
        {
          path: 'shift',
          children: [
            { element: <Navigate to="/dashboard/shift/list" replace />, index: true },
            { path: 'list', element: <ShiftListPage /> },
            { path: ':id', element: <ShiftDetailsPage /> },
            { path: ':id/edit', element: <ShiftEditPage /> },
            { path: 'new', element: <ShiftCreatePage /> },
          ],
        },
        {
          path: 'period',
          children: [
            { element: <Navigate to="/dashboard/period/list" replace />, index: true },
            { path: 'list', element: <PeriodListPage /> },
            { path: ':id', element: <PeriodDetailsPage /> },
            { path: ':id/edit/offering', element: <PeriodEditOfferingPage /> },
            { path: ':id/edit', element: <PeriodEditPage /> },
            { path: 'new/offering', element: <PeriodCreateOfferingPage /> },
            { path: 'new', element: <PeriodCreatePage /> },
          ],
        },
        {
          path: 'speciality',
          children: [
            { element: <Navigate to="/dashboard/speciality/list" replace />, index: true },
            { path: 'list', element: <SpecialityListPage /> },
            { path: ':id', element: <SpecialityDetailsPage /> },
            { path: ':id/edit', element: <SpecialityEditPage /> },
            { path: 'new', element: <SpecialityCreatePage /> },
          ],
        },
        {
          path: 'course',
          children: [
            { element: <Navigate to="/dashboard/course/list" replace />, index: true },
            { path: 'list', element: <CourseListPage /> },
            { path: ':id', element: <CourseDetailsPage /> },
            { path: ':id/edit', element: <CourseEditPage /> },
            { path: 'new', element: <CourseCreatePage /> },
          ],
        },
        {
          path: 'productService',
          children: [
            { element: <Navigate to="/dashboard/productService/list" replace />, index: true },
            { path: 'list', element: <ProductServiceListPage /> },
            { path: ':id', element: <ProductServiceDetailsPage /> },
            { path: ':id/edit', element: <ProductServiceEditPage /> },
            { path: 'new', element: <ProductServiceCreatePage /> },
          ],
        },
        {
          path: 'preEnrollment',
          children: [
            { element: <Navigate to="/dashboard/preEnrollment/list" replace />, index: true },
            // { path: 'list', element: <PreEnrollmentListPage /> },
            // { path: ':id', element: <PreEnrollmentDetailsPage /> },
            // { path: ':id/edit', element: <PreEnrollmentEditPage /> },
            { path: ':id/new', element: <PreEnrollmentCreatePage /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPostsPage /> },
            { path: 'post/:title', element: <BlogPostPage /> },
            { path: 'new', element: <BlogNewPostPage /> },
          ],
        },
        { path: 'files-manager', element: <FileManagerPage /> },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <MailPage /> },
            { path: 'label/:customLabel/:mailId', element: <MailPage /> },
            { path: ':systemLabel', element: <MailPage /> },
            { path: ':systemLabel/:mailId', element: <MailPage /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <FaqsPage /> },
        // Demo Components
        {
          path: 'components',
          children: [
            { element: <ComponentsOverviewPage />, index: true },
            {
              path: 'foundation',
              children: [
                { element: <Navigate to="/components/foundation/colors" replace />, index: true },
                { path: 'colors', element: <FoundationColorsPage /> },
                { path: 'typography', element: <FoundationTypographyPage /> },
                { path: 'shadows', element: <FoundationShadowsPage /> },
                { path: 'grid', element: <FoundationGridPage /> },
                { path: 'icons', element: <FoundationIconsPage /> },
              ],
            },
            {
              path: 'mui',
              children: [
                { element: <Navigate to="/components/mui/accordion" replace />, index: true },
                { path: 'accordion', element: <MUIAccordionPage /> },
                { path: 'alert', element: <MUIAlertPage /> },
                { path: 'autocomplete', element: <MUIAutocompletePage /> },
                { path: 'avatar', element: <MUIAvatarPage /> },
                { path: 'badge', element: <MUIBadgePage /> },
                { path: 'breadcrumbs', element: <MUIBreadcrumbsPage /> },
                { path: 'buttons', element: <MUIButtonsPage /> },
                { path: 'checkbox', element: <MUICheckboxPage /> },
                { path: 'chip', element: <MUIChipPage /> },
                { path: 'data-grid', element: <MUIDataGridPage /> },
                { path: 'dialog', element: <MUIDialogPage /> },
                { path: 'list', element: <MUIListPage /> },
                { path: 'menu', element: <MUIMenuPage /> },
                { path: 'pagination', element: <MUIPaginationPage /> },
                { path: 'pickers', element: <MUIPickersPage /> },
                { path: 'popover', element: <MUIPopoverPage /> },
                { path: 'progress', element: <MUIProgressPage /> },
                { path: 'radio-button', element: <MUIRadioButtonsPage /> },
                { path: 'rating', element: <MUIRatingPage /> },
                { path: 'slider', element: <MUISliderPage /> },
                { path: 'stepper', element: <MUIStepperPage /> },
                { path: 'switch', element: <MUISwitchPage /> },
                { path: 'table', element: <MUITablePage /> },
                { path: 'tabs', element: <MUITabsPage /> },
                { path: 'textfield', element: <MUITextFieldPage /> },
                { path: 'timeline', element: <MUITimelinePage /> },
                { path: 'tooltip', element: <MUITooltipPage /> },
                { path: 'transfer-list', element: <MUITransferListPage /> },
                { path: 'tree-view', element: <MUITreesViewPage /> },
              ],
            },
            {
              path: 'extra',
              children: [
                { element: <Navigate to="/components/extra/animate" replace />, index: true },
                { path: 'animate', element: <DemoAnimatePage /> },
                { path: 'carousel', element: <DemoCarouselsPage /> },
                { path: 'chart', element: <DemoChartsPage /> },
                { path: 'copy-to-clipboard', element: <DemoCopyToClipboardPage /> },
                { path: 'editor', element: <DemoEditorPage /> },
                { path: 'form-validation', element: <DemoFormValidationPage /> },
                { path: 'image', element: <DemoImagePage /> },
                { path: 'label', element: <DemoLabelPage /> },
                { path: 'lightbox', element: <DemoLightboxPage /> },
                { path: 'map', element: <DemoMapPage /> },
                { path: 'mega-menu', element: <DemoMegaMenuPage /> },
                { path: 'multi-language', element: <DemoMultiLanguagePage /> },
                { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
                { path: 'organization-chart', element: <DemoOrganizationalChartPage /> },
                { path: 'scroll', element: <DemoScrollbarPage /> },
                { path: 'snackbar', element: <DemoSnackbarPage /> },
                { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
                { path: 'upload', element: <DemoUploadPage /> },
                { path: 'markdown', element: <DemoMarkdownPage /> },
              ],
            },
          ],
        },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: 'pricing', element: <PricingPage /> },
        { path: 'payment', element: <PaymentPage /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
