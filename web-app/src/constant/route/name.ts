export enum GuestRoute {
  HOME = '/', // how to use this app
  SEARCH_EXAM_INTEGRATION = '/search_exam_integration',
}

export enum AccountRoute {
  PROFILE = '/profile',
}

export enum StudentRoute {
  DO_EXAM = '/do_exam',
  HISTORY = '/history',
  SEE_CLASS = '/class',
  SEE_EXAM_CLASS = '/class/exam',
  SEE_EXAM = '/exam',
}

export enum TeacherRoute {
  MANAGE_CLASS = '/manage_class',
  MANAGE_EXAM = '/manage_exam',
  MANAGE_CLASS_DETAIL = '/manage_class/detail',
}

export enum AdminRoute {
  DASHBOARD = '/admin',
  MANAGE_USER = '/manage_user',
  MANAGE_PUBLIC_EXAM = '/manage_public_exam',
}
