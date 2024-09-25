const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const crypto = require('crypto');
const sha1 = require('sha1');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const nodemailer = require('nodemailer');

const db = require('../connection/config/database');

console.log(db, 'db')


// express dotenv cors crypto sha1 body-parser nodemailer mysql multer path wkhtmltopdf fs nodemon bcrypt axios



// http://192.168.0.107:5002/allUsers?email=abutaher01725@gmail.com
const usersModel = require('../model/Admin/usersListModel')
app.get('/user/allUser', usersModel.users_list)
app.get('/user/allUser/:id', usersModel.users_single)
app.get('/users', usersModel.users_controller)
app.get('/users/add', usersModel.addColumn)
app.get('/users/role_all', usersModel.role_list)
app.post('/send-otp', usersModel.send_users_number_otp)
// app.post('/send-otp/email', usersModel.emailOtpSend)
app.delete('/allUser/:id', usersModel.users_delete)
app.post('/updateUsers/:id', usersModel.users_edit)
app.put('/update/verification_code/:id', usersModel.UpdateSingleUserMobileVerificationCode)
app.put('/update/verification_code_email/:id', usersModel.UpdateSingleUserEmailVerificationCode)
app.get('/allUsers', usersModel.users_list_email_wise)
app.post('/login', usersModel.users_login);
app.post('/create-users', usersModel.users_create);
app.post('/admin/create_side_menu', usersModel.side_menu_create);
app.put('/admin/update_side_menu/:id', usersModel.side_menu_update);
app.put('/admin/reset_password/:id', usersModel.password_reset);
app.put('/updateLogin/:email', usersModel.updateLogin);



app.get('/menu_item/all', usersModel.menu_Item_list)
app.post('/menu_item/create', usersModel.menu_Item_create)
app.get('/admin_template_table/create', usersModel.admin_template_menu_table_create)
app.delete('/admin_template_table/delete/:id', usersModel.admin_template_menu_delete)
app.put('/admin_template_table/update/:id', usersModel.admin_template_menu_update)
app.delete('/admin_template_table/delete_all', usersModel.menu_item_delete_all)
app.post('/admin_template_table/post_all_data', usersModel.menu_item_create_bulk)
app.get('/page-group/display-name', usersModel.page_group_display_name_list);


// role

app.post('/user/user-role-create', usersModel.users_role_create);
app.get('/user/user-role-single/:id', usersModel.users_role_single);
app.put('/user/user-role/edit/:id', usersModel.users_role_update);
app.delete('/user/user-role/delete/:id', usersModel.users_role_delete);
app.get('/user/role', usersModel.users_role_permission_list);
app.get('/user-role/btn', usersModel.usersRoleBtn);


const adminPageList = require('../model/Admin/module_info/adminPageListModel')
app.get('/admin/allAdmin', adminPageList.getAllAdminPageList)

app.get('/admin/admin_panel_settings', adminPageList.admin_panel_settings_list)
app.get('/admin/admin_panel_settings/:id', adminPageList.admin_panel_settings_single)
app.get('/download/:columnName', adminPageList.getSingleAdminPanelSettingsDownload)
app.delete('/admin/admin_panel_settings/delete/:id', adminPageList.admin_panel_settings_delete)

app.get('/admin/module_info/module_info_all/:id/role', adminPageList.module_info_list_list)




app.get('/admin/allAdmin/:id', adminPageList.module_info_single)
app.delete('/admin/allAdmin/:id', adminPageList.module_info_delete)
app.post('/admin/delete/:id', adminPageList.module_info_delete)


const ModuleInfo = require('../model/Admin/module_info/moduleInfo')
app.post('/admin/allAdmin/', ModuleInfo.module_info_create)
app.post('/admin/copy/', ModuleInfo.module_info_copy)
app.post('/updateAdminList/:id', ModuleInfo.module_info_update)
app.delete('/admin/allAdmin/:id', ModuleInfo.module_info_delete)
app.get("/Pagination/:pageNo/:perPage", ModuleInfo.module_info_list_paigination);
app.post('/admin/module_info/delete/:id', ModuleInfo.module_info_delete)


// no need
app.get('/page-group/display-name/with-id', adminPageList.getPageGroupAndDisplayNameWithId)
app.get('/admin/allAdmin/', ModuleInfo.getAllAdminPageList)
app.get('/admin/module_info/module_info_all/:id', ModuleInfo.getAllAdminPageLists)
app.get('/admin/group-names-id', ModuleInfo.getPageGroupAndControllerNamesId)
app.get('/admin/users_role/users_role_permission/:id', ModuleInfo.users_role_permission_default_page)





const faIcons = require('../model/Admin/faIconsModel')
app.get('/faIcons', faIcons.getAllIconList)



const schoolShift = require('../model/Admin/school_shift/school_shiftt')
app.post('/Admin/school_shift/school_shift_create', schoolShift.school_shiftt_create)
app.get('/Admin/school_shift/school_shift_all', schoolShift.school_shift_list)
app.post('/Admin/school_shift/school_shift_delete/:id', schoolShift.school_shift_delete)
app.get('/Admin/school_shift/school_shift_all/:id', schoolShift.school_shift_single)
app.post('/Admin/school_shift/school_shift_edit/:id', schoolShift.school_shift_update)
app.get('/Admin/school_shift/school_shift_all/:pageNo/:perPage', schoolShift.school_shift_list_paigination)


const payRoll = require('../model/Admin/pay_roll_model/pay_roll_model')
app.post('/Admin/pay_roll/pay_roll_create', payRoll.payroll_create)
app.get('/Admin/pay_roll/pay_roll_all', payRoll.payroll_list)
app.post('/Admin/pay_roll/pay_roll_delete/:id', payRoll.payroll_delete)
app.post('/Admin/pay_roll/pay_roll_edit/:id', payRoll.payroll_update)
app.get('/Admin/pay_roll/pay_roll_all/:id', payRoll.payroll_single)
app.get('/Admin/pay_roll/pay_roll_list/:pageNo/:perPage', payRoll.payroll_list_paigination)

const EmployeeModel = require('../model/Admin/employee_model/employee_model')
app.get('/Admin/education/education_list', EmployeeModel.education_name_list)
app.get('/Admin/divisions/divisions_list', EmployeeModel.divisions_list)
app.get('/Admin/district/district_list', EmployeeModel.districts_list)
app.get('/Admin/upazilas/upazilas_list', EmployeeModel.upazilas_list)
app.post('/Admin/employee/employee_create', EmployeeModel.create_employee)
// app.get('/Admin/employee/employee_all', EmployeeModel.employee_list)
app.post('/Admin/employee/employee_delete/:id', EmployeeModel.employee_delete)
// app.post('/Admin/employee/employee_edit/:id', EmployeeModel.update_employee)
app.post('/Admin/employee/employee_edit/:id', EmployeeModel.employee_update)
app.get('/Admin/employee/employee_list', EmployeeModel.employee_all)
app.get('/Admin/employee/employee_list/:id', EmployeeModel.employee_all_single)
app.get('/Admin/employee/employee_list_for_attendance', EmployeeModel.employee_all_for_attendance)
app.post('/Admin/employee_user/employee_user_update/:id', EmployeeModel.user_update)
app.get('/Admin/designation/designation_list', EmployeeModel.designation_list)
app.get('/Admin/gender/gender_list', EmployeeModel.gender_list)
app.get('/Admin/religion/religion_list', EmployeeModel.religion_list)
app.post('/Admin/employee/quick_create_employee', EmployeeModel.quick_create_employee)
app.post('/Admin/employee/employee_promotion_create/:id', EmployeeModel.employee_promotion_create)
app.get('/Admin/employee/employee_geo/:id', EmployeeModel.employee_geo)
app.get('/Admin/employee/employee_list_role_wise', EmployeeModel.employee_list_role_wise)
app.post('/Admin/location/location_search', EmployeeModel.employee_location_search)
app.post('/Admin/location/location_pdf', EmployeeModel.employee_location_pdf)
app.get('/Admin/location/geo_location_all/:id', EmployeeModel.employee_geo_location_all)
app.get('/Admin/location/geo_location_all_live/:id', EmployeeModel.employee_geo_location_all_current_date)
app.get('/Admin/employee/employee_all_list', EmployeeModel.employee_all_list)
app.get('/Admin/employee/employee_all_list_settings', EmployeeModel.employee_all_list_settings)
app.get('/Admin/employee/employee_all_list/:id', EmployeeModel.employee_all_list_single)
app.post('/Admin/employee/employee_search', EmployeeModel.employee_search)
app.get('/Admin/employee/employee_list_paigination/:pageNo/:perPage', EmployeeModel.employee_list_paigination)
app.post('/Admin/employee/employee_list_pdf', EmployeeModel.employee_pdf)
app.post('/Admin/employee/employee_list_print', EmployeeModel.employee_list_print)



const CompanyModel = require('../model/Admin/company_model/company_model')
app.post('/Admin/company/company_create', CompanyModel.company_create)
app.get('/Admin/company/company_all', CompanyModel.company_list)
app.post('/Admin/company/company_edit/:id', CompanyModel.company_update)
app.get('/Admin/company/company_all/:id', CompanyModel.company_single)
app.post('/Admin/company/company_delete/:id', CompanyModel.company_delete)
app.get('/Admin/company/company_list/:pageNo/:perPage', CompanyModel.company_list_paigination)

const BranceModel = require('../model/Admin/brance_model/brance_model')
app.get('/Admin/company_type/company_type_all', BranceModel.company_type_list)
app.get('/Admin/branch/branch_all', BranceModel.brance_list)
app.post('/Admin/branch/branch_create', BranceModel.branch_create)
app.get('/Admin/branch/branch_all/:id', BranceModel.branch_single)
app.post('/Admin/branch/branch_edit/:id', BranceModel.branch_update)
app.post('/Admin/branch/branch_delete/:id', BranceModel.branch_delete)
app.get('/Admin/branch/branch_list/:pageNo/:perPage', BranceModel.branch_list_paigination)

const MobileAllwoanceModel = require('../model/Admin/mobile_allowance_model/mobile_allowance_model')
app.post('/Admin/mobile_allowance/mobile_allowance_create', MobileAllwoanceModel.mobile_allowance_create)
app.get('/Admin/mobile_allowance/mobile_allowance_all', MobileAllwoanceModel.mobile_allowance_list)
app.get('/Admin/mobile_allowance/mobile_allowance_all/:id', MobileAllwoanceModel.mobile_allowance_single)
app.post('/Admin/mobile_allowance/mobile_allowance_edit/:id', MobileAllwoanceModel.mobile_allowance_update)
app.post('/Admin/mobile_allowance/mobile_allowance_delete/:id', MobileAllwoanceModel.mobile_allowance_delete)
app.get('/Admin/mobile_allowance/mobile_allowance_list/:pageNo/:perPage', MobileAllwoanceModel.mobile_allowance_list_paigination)


const TransportAllwoanceModel = require('../model/Admin/transport_allowance_model/transport_allowance_model')

app.post('/Admin/transport_allowance/transport_allowance_create', TransportAllwoanceModel.transport_allowance_create)
app.get('/Admin/transport_allowance/transport_allowance_all', TransportAllwoanceModel.transport_allowance_list)
app.post('/Admin/transport_allowance/transport_allowance_edit/:id', TransportAllwoanceModel.transport_allowance_update)
app.get('/Admin/transport_allowance/transport_allowance_all/:id', TransportAllwoanceModel.transport_allowance_single)
app.post('/Admin/transport_allowance/transport_allowance_delete/:id', TransportAllwoanceModel.mobile_allowance_delete)
app.get('/Admin/transport_allowance/transport_allowance_list/:pageNo/:perPage', TransportAllwoanceModel.transport_allowance_list_paigination)


const OfficeVisitModel = require('../model/Admin/office_visit_model/office_visit_model')

app.post('/Admin/office_visit/office_visit_create', OfficeVisitModel.office_visit_creates)
app.get('/Admin/office_visit/office_visit_all/:id', OfficeVisitModel.office_visit_single)
app.get('/Admin/office_visit/office_visit_all', OfficeVisitModel.office_visit_list)
app.post('/Admin/office_visit/office_visit_remarks_create', OfficeVisitModel.office_visit_remarks_create)
app.post('/Admin/office_visit/office_visit_person_create', OfficeVisitModel.office_visit_person_create)
app.post('/Admin/office_visit/office_visit_delete/:id', OfficeVisitModel.office_visit_delete)
app.get('/Admin/office_visit/office_visit_list_single/:id', OfficeVisitModel.office_visit_list_single)
app.post('/Admin/office_visit/office_visit_edit/:id', OfficeVisitModel.office_visit_list_single_update)
app.get('/Admin/office_visit/office_visit_list/:pageNo/:perPage', OfficeVisitModel.office_visit_list_paigination)
app.get('/Admin/office_visit/office_visit_remarks_list/:id', OfficeVisitModel.office_visit_remarks_single)
app.get('/Admin/office_visit/office_visit_person_list/:id', OfficeVisitModel.office_visit_person_single)
app.post('/Admin/office_visit/office_visit_remarks_edit/:id', OfficeVisitModel.office_visit_remarks_update)
app.post('/Admin/office_visit/office_visit_person_edit/:id', OfficeVisitModel.office_visit_person_update)
app.post('/Admin/office_visit/office_visit_remarks_delete/:id', OfficeVisitModel.office_visit_remarks_delete)
app.post('/Admin/office_visit/office_visit_person_delete/:id', OfficeVisitModel.office_visit_person_delete)
app.get('/Admin/office_visit/office_visit_person_list/:pageNo/:perPage/:id', OfficeVisitModel.office_visit_person_list_pagination)
app.get('/Admin/office_visit/office_visit_remarks_list/:pageNo/:perPage/:id', OfficeVisitModel.office_visit_remarks_list_pagination)
app.get('/Admin/office_visit/office_visit_person_list_visit/:id', OfficeVisitModel.office_visit_person_single_visit)
app.get('/Admin/office_visit/office_visit_remarks_list_visit/:id', OfficeVisitModel.office_visit_remarks_single_visit)
app.post('/Admin/office_visit/office_visit_person_list_pdf', OfficeVisitModel.office_visit_person_pdf)
app.post('/Admin/office_visit/office_visit_remarks_list_pdf', OfficeVisitModel.office_visit_remarks_pdf)
app.post('/Admin/office_visit/office_visit_person_list_print', OfficeVisitModel.office_visit_person_print)
app.post('/Admin/office_visit/office_visit_remarks_list_print', OfficeVisitModel.office_visit_remarks_print)
app.post('/Admin/office_visit/office_visit_remarks_search/:id', OfficeVisitModel.office_visit_remarks_search)
app.post('/Admin/office_visit/office_visit_person_search/:id', OfficeVisitModel.office_visit_person_search)


const expenceCategoryModel = require(`../model/Admin/expense_category_model/expense_category_model`)
app.post('/Admin/expence_category/expence_category_create', expenceCategoryModel.expence_category_create);
app.get('/Admin/expence_category/expence_category_all', expenceCategoryModel.expence_category_list);
app.get('/Admin/expence_category/expence_category_all/:id', expenceCategoryModel.expense_category_single);
app.post('/Admin/expence_category/expence_category_edit/:id', expenceCategoryModel.expense_category_update);
app.post('/Admin/expence_category/expence_category_delete/:id', expenceCategoryModel.expense_category_delete);
app.get('/Admin/expence_category/expence_category_list_paigination/:pageNo/:perPage', expenceCategoryModel.expense_category_list_paigination);


const expenceModel = require(`../model/Admin/expense_model/expense_model`)
app.post('/Admin/expense/expense_create', expenceModel.expence_create)
app.post('/Admin/expense/expense_single_pdf', expenceModel.expense_single_pdf)
app.post('/Admin/expense/expense_search', expenceModel.expense_search)
app.get('/Admin/expense/expense_list/:pageNo/:perPage', expenceModel.expense_list_paigination)
app.get('/Admin/expense/expense_list', expenceModel.expence_category_list)
app.post('/Admin/expense/expense_delete/:id', expenceModel.expense_delete)
app.get('/Admin/expense/expense_all', expenceModel.expense_get)
app.get('/Admin/expense/expense_all/:id', expenceModel.expense_getById)
app.post('/Admin/expense/expense_update/:id', expenceModel.expense_update)
app.post('/Admin/expense/expense_pdf', expenceModel.expense_pdf)



const income_category_model = require(`../model/Admin/income_category_model/income_category_model`)
app.post('/Admin/income_category/income_category_create', income_category_model.income_category_create);
app.get('/Admin/income_category/income_category_all', income_category_model.income_category_list);
app.get('/Admin/income_category/income_category_all/:id', income_category_model.income_category_single);
app.post('/Admin/income_category/income_category_edit/:id', income_category_model.income_category_update);
app.post('/Admin/income_category/income_category_delete/:id', income_category_model.income_category_delete);
app.get('/Admin/income_category/income_category_list_paigination/:pageNo/:perPage', income_category_model.income_category_list_paigination);


const incomeModel = require(`../model/Admin/income_model/income_model`);
app.post('/Admin/income/income_create', incomeModel.income_create);
app.get('/Admin/income/income_list', incomeModel.income_category_list);
app.post('/Admin/income/income_search', incomeModel.income_search);
app.get('/Admin/income/income_list/:pageNo/:perPage', incomeModel.income_list_paigination);
app.post('/Admin/income/income_delete/:id', incomeModel.income_delete);
app.get('/Admin/income/income_all', incomeModel.income_get);
app.get('/Admin/income/income_all/:id', incomeModel.income_getById);
app.post('/Admin/income/income_update/:id', incomeModel.income_update);



const supplierModel = require(`../model/Admin/supplier_model/supplier_model`)
app.get('/Admin/supplier/supplier_list', supplierModel.supplier_address_list)
app.get('/Admin/supplier/due_amount/:supplier_id', supplierModel.supplier_due_amount)


const holidayCategoryModel = require(`../model/Admin/holiday_category_model/holiday_category_model`)
app.post('/Admin/holiday_category/holiday_category_create', holidayCategoryModel.holiday_category_create)
app.get('/Admin/holiday_category/holiday_category_all', holidayCategoryModel.holiday_category_list)
app.get('/Admin/holiday_category/holiday_category_all/:id', holidayCategoryModel.holiday_category_single)
app.post('/Admin/holiday_category/holiday_category_edit/:id', holidayCategoryModel.holiday_category_update)
app.post('/Admin/holiday_category/holiday_category_delete/:id', holidayCategoryModel.holiday_category_delete)
app.get('/Admin/holiday_category/holiday_category_list/:pageNo/:perPage', holidayCategoryModel.holiday_category_list_paigination)


const yearlyHolidayModel = require(`../model/Admin/yearly_holiday_modal/yearly_holiday_modal`)
app.post('/Admin/yearly_holiday/yearly_holiday_create', yearlyHolidayModel.yearly_holiday_create)
app.get('/Admin/yearly_holiday/yearly_holiday_all', yearlyHolidayModel.yearly_holiday_list)
app.get('/Admin/yearly_holiday/yearly_holiday_all_list', yearlyHolidayModel.yearly_holiday_list_all)
app.get('/Admin/yearly_holiday/yearly_holiday_all_list_id_table', yearlyHolidayModel.yearly_holiday_list_id_table)
app.get('/Admin/yearly_holiday/yearly_holiday_all/:id', yearlyHolidayModel.yearly_holiday_list_single)
app.post('/Admin/yearly_holiday/yearly_holiday_delete/:id', yearlyHolidayModel.yearly_holiday_delete)
app.get('/Admin/yearly_holiday/yearly_holiday_list/:pageNo/:perPage', yearlyHolidayModel.yearly_holiday_list_paigination)
app.post('/Admin/yearly_holiday/yearly_holiday_edit/:id', yearlyHolidayModel.yearly_holiday_update)


const leaveApplicationModel = require(`../model/Admin/leave_application_model/leave_application_model`)
app.post('/Admin/leave_application/leave_application_create', leaveApplicationModel.leave_application_create)
app.get('/Admin/leave_application/leave_application_all', leaveApplicationModel.leave_application_list)
app.get('/Admin/leave_application/leave_application_all/:id', leaveApplicationModel.leave_application_single)
app.get('/Admin/leave_application/leave_application_all/:pageNo/:perPage', leaveApplicationModel.leave_application_list_paigination)
app.post('/Admin/leave_application/leave_application_edit/:id', leaveApplicationModel.leave_application_update)
app.post('/Admin/leave_application/leave_application_delete/:id', leaveApplicationModel.leave_application_delete)
app.post('/Admin/leave_application/leave_application_approve', leaveApplicationModel.leave_application_approved)
app.post('/Admin/leave_application/leave_application_search', leaveApplicationModel.leave_application_list_search)
app.get('/Admin/leave_category/leave_category_list', leaveApplicationModel.leave_category_list)
app.post('/Admin/leave_application/leave_application_edit_status/:id', leaveApplicationModel.leave_application_update_status)
app.post('/Admin/leave_application/leave_application_pdf', leaveApplicationModel.leave_application_pdf)

const SalaryModel = require(`../model/Admin/salary_model/salary_model`)

app.get('/Admin/salary/salary_all', SalaryModel.employe_joining_list_salary)
app.post('/Admin/salary/salary_search', SalaryModel.employe_joining_list_salary_search)
app.get('/Admin/attendance_all/attendance_all', SalaryModel.employe_attendance_list)
app.get('/Admin/leave_approved/leave_approved_all', SalaryModel.employe_leave_approved_list)
app.post('/Admin/salary/salary_create', SalaryModel.salary_create)
app.get('/Admin/salary/salary_list', SalaryModel.employe_list_salary)
app.post('/Admin/salary/salary_list_search', SalaryModel.employe_list_salary_search)
app.post('/Admin/salary/salary_delete/:id', SalaryModel.salary_delete)
app.get('/Admin/salary/salary_list/:id', SalaryModel.employe_list_salary_single)
app.get('/Admin/salary/salary_details/:id', SalaryModel.employe_list_salary_single_search)
app.post('/Admin/salary/salary_edit/:id', SalaryModel.employee_salary_update)


const AccountHeadTypeModel = require(`../model/Admin/account_head_type_model/account_head_type_model`)
app.post('/Admin/account_head_type/account_head_type_create', AccountHeadTypeModel.account_head_type_create)
app.get('/Admin/account_head_type/account_head_type_all', AccountHeadTypeModel.account_head_type_list)
app.get('/Admin/account_head_type/account_head_type_all/:id', AccountHeadTypeModel.account_head_type_single)
app.post('/Admin/account_head_type/account_head_type_delete/:id', AccountHeadTypeModel.account_head_type_delete)
app.post('/Admin/account_head_type/account_head_type_edit/:id', AccountHeadTypeModel.account_head_type_update)
app.get('/Admin/account_head_type/account_head_type_all_paigination/:pageNo/:perPage', AccountHeadTypeModel.account_head_type_list_paigination)


const AccountHeadModel = require(`../model/Admin/account_head/account_head_model`)
app.post('/Admin/account_head/account_head_create', AccountHeadModel.account_head_create)
app.get('/Admin/account_head/account_head_all', AccountHeadModel.account_head_list)
app.post('/Admin/account_head/account_head_delete/:id', AccountHeadModel.account_head_delete)
app.get('/Admin/account_head/account_head_all/:id', AccountHeadModel.account_head_single)
app.post('/Admin/account_head/account_head_edit/:id', AccountHeadModel.account_head_update)
app.get('/Admin/account_head/account_head_list', AccountHeadModel.account_head_list_show)
app.get('/Admin/account_head/account_head_list_paigination/:pageNo/:perPage', AccountHeadModel.account_head_list_paigination)

//  Jewel Vai
const GenderModel = require("../model/Admin/gender_model/gender_model");
app.post("/Admin/gender/gender_create", GenderModel.gender_create);
app.get("/Admin/gender/gender_all", GenderModel.gender_list);
app.get("/Admin/gender/gender_all/:id", GenderModel.gender_single);
app.post("/Admin/gender/gender_edit/:id", GenderModel.gender_update);
app.post("/Admin/gender/gender_delete/:id", GenderModel.gender_delete);

// list Pagination
app.get(
  "/Admin/gender/gender_list_paigination/:pageNo/:perPage",
  GenderModel.gender_list_paigination
);

const LeaveCategoryModel = require("../model/Admin/leave_category_model/leave_category_model.js");

app.post(
  "/Admin/leave_category/leave_category_create",
  LeaveCategoryModel.leave_category_create
);
app.get(
  "/Admin/leave_category/leave_category_all",
  LeaveCategoryModel.leave_category_list
);
app.post(
  "/Admin/leave_category/leave_category_edit/:id",
  LeaveCategoryModel.leave_category_update
);
app.get(
  "/Admin/leave_category/leave_category_all/:id",
  LeaveCategoryModel.leave_category_single
);
app.get(
  "/Admin/leave_category/leave_category_all_paigination/:pageNo/:perPage",
  LeaveCategoryModel.leave_category_list_paigination
);
app.post(
  "/Admin/leave_category/leave_category_delete/:id",
  LeaveCategoryModel.leave_category_delete
);

const BloodGroupModel = require("../model/Admin/blood_group_model/blood_group_model.js");

// app.get(
//   "/Admin/blood_group/blood_group_all/:pageNo/:perPage",
//   BloodGroupModel.blood_list_paigination
// );
app.post(
  "/Admin/blood_group/blood_group_create",
  BloodGroupModel.blood_group_create
);
app.get("/Admin/blood_group/blood_group_all", BloodGroupModel.blood_group_list);
app.post(
  "/Admin/blood_group/blood_group_edit/:id",
  BloodGroupModel.blood_group_update
);
app.get(
  "/Admin/blood_group/blood_group_all/:id",
  BloodGroupModel.blood_group_single
);
app.post(
  "/Admin/blood_group/blood_group_delete/:id",
  BloodGroupModel.blood_group_delete
);
app.get(
  "/Admin/blood_group/blood_group_list_paigination/:pageNo/:perPage",
  BloodGroupModel.blood_group_list_paigination
);


const CompanyTypeModel = require("../model/Admin/company_type_model/company_type_model.js");
app.post(
  "/Admin/company_type/company_type_create",
  CompanyTypeModel.company_type_create
);
app.get(
  "/Admin/company_type/company_type_all",
  CompanyTypeModel.company_type_list
);
app.get(
  "/Admin/company_type/company_type_all/:id",
  CompanyTypeModel.company_type_single
);
app.post(
  "/Admin/company_type/company_type_edit/:id",
  CompanyTypeModel.company_type_update
);
app.post(
  "/Admin/company_type/company_type_delete/:id",
  CompanyTypeModel.company_type_delete
);

// list Pagination
app.get(
  "/Admin/company_type/company_type_list_paigination/:pageNo/:perPage",
  CompanyTypeModel.company_type_list_paigination
);


// Designation
const DesignationModel = require("../model/Admin/designation_model/designation_model.js");

app.post(
  "/Admin/designation/designation_create",
  DesignationModel.designation_create
);
app.get(
  "/Admin/designation/designation_all",
  DesignationModel.designation_list
);
app.post(
  "/Admin/designation/designation_delete/:id",
  DesignationModel.designation_delete
);
app.post(
  "/Admin/designation/designation_edit/:id",
  DesignationModel.designation_update
);
app.get(
  "/Admin/designation/designation_all/:id",
  DesignationModel.designation_single
);

// list Pagination
app.get(
  "/Admin/designation/designation_list_paigination/:pageNo/:perPage",
  DesignationModel.designation_list_paigination
);

// Profession
const ProfessionModel = require("../model/Admin/profession_model/profession_model.js");

app.post(
  "/Admin/profession/profession_create",
  ProfessionModel.profession_create
);
app.get("/Admin/profession/profession_all", ProfessionModel.profession_list);
app.post(
  "/Admin/profession/profession_delete/:id",
  ProfessionModel.profession_delete
);
app.post(
  "/Admin/profession/profession_edit/:id",
  ProfessionModel.profession_update
);
app.get(
  "/Admin/profession/profession_all/:id",
  ProfessionModel.profession_single
);

// list Pagination
app.get(
  "/Admin/profession/profession_list_paigination/:pageNo/:perPage",
  ProfessionModel.profession_list_paigination
);


const EducationModel = require("../model/Admin/education_model/education_model.js");
app.post("/Admin/education/education_create", EducationModel.education_create);
app.get("/Admin/education/education_all", EducationModel.education_list);
app.post(
  "/Admin/education/education_edit/:id",
  EducationModel.education_update
);
app.get("/Admin/education/education_all/:id", EducationModel.education_single);
app.post(
  "/Admin/education/education_delete/:id",
  EducationModel.education_delete
);
// list Pagination
app.get(
  "/Admin/education/education_list_paigination/:pageNo/:perPage",
  EducationModel.education_list_paigination
);


const ReligionModel = require("../model/Admin/religion_model/religion_model.js");
app.post("/Admin/religion/religion_create", ReligionModel.religion_create);
app.get("/Admin/religion/religion_all", ReligionModel.religion_list);
app.post("/Admin/religion/religion_edit/:id", ReligionModel.religion_update);
app.get("/Admin/religion/religion_all/:id", ReligionModel.religion_single);
app.post("/Admin/religion/religion_delete/:id", ReligionModel.religion_delete);
app.get("/Admin/religion/religion_list_paigination/:pageNo/:perPage", ReligionModel.religion_list_paigination);




// PhotoGalleryCategoryModel
const PhotoGalleryCategoryModel = require("../model/Admin/events_category_model/events_category.js");

app.post(
  "/Admin/events_category/events_category_create",
  PhotoGalleryCategoryModel.photo_gallery_category_create
);
app.get(
  "/Admin/events_category/events_category_all",
  PhotoGalleryCategoryModel.photo_gallery_category_list
);
app.post(
  "/Admin/events_category/events_category_edit/:id",
  PhotoGalleryCategoryModel.photo_gallery_category_update
);
app.get(
  "/Admin/events_category/events_category_all/:id",
  PhotoGalleryCategoryModel.photo_gallery_category_single
);
app.post(
  "/Admin/events_category/events_category_delete/:id",
  PhotoGalleryCategoryModel.photo_gallery_category_delete
);

// list Pagination
app.get(
  "/Admin/events_category/events_category_list_paigination/:pageNo/:perPage",
  PhotoGalleryCategoryModel.photo_gallery_category_list_paigination
);
// NewsCategoryModel
const NewsCategoryModel = require("../model/Admin/news_category_model/news_category.js");

app.post(
  "/Admin/news_category/news_category_create",
  NewsCategoryModel.news_category_create
);
app.get(
  "/Admin/news_category/news_category_all",
  NewsCategoryModel.news_category_list
);
app.post(
  "/Admin/news_category/news_category_edit/:id",
  NewsCategoryModel.news_category_update
);
app.get(
  "/Admin/news_category/news_category_all/:id",
  NewsCategoryModel.news_category_single
);
app.post(
  "/Admin/news_category/news_category_delete/:id",
  NewsCategoryModel.news_category_delete
);

// list Pagination
app.get(
  "/Admin/news_category/news_category_list_paigination/:pageNo/:perPage",
  NewsCategoryModel.news_category_list_paigination
);
// NoticeCategoryModel

const NoticeCategoryModel = require("../model/Admin/notice_category_model/notice_category.js");

app.post(
  "/Admin/notice_category/notice_category_create",
  NoticeCategoryModel.notice_category_create
);
app.get(
  "/Admin/notice_category/notice_category_all",
  NoticeCategoryModel.notice_category_list
);
app.post(
  "/Admin/notice_category/notice_category_edit/:id",
  NoticeCategoryModel.notice_category_update
);
app.get(
  "/Admin/notice_category/notice_category_all/:id",
  NoticeCategoryModel.notice_category_single
);
app.post(
  "/Admin/notice_category/notice_category_delete/:id",
  NoticeCategoryModel.notice_category_delete
);

// list Pagination
app.get(
  "/Admin/notice_category/notice_category_list_paigination/:pageNo/:perPage",
  NoticeCategoryModel.notice_category_list_paigination
);
// VideoGalleryCategoryModel

const VideoGalleryCategoryModel = require("../model/Admin/video_category_model/video_category.js");

app.post(
  "/Admin/video_gallery_category/video_gallery_category_create",
  VideoGalleryCategoryModel.video_gallery_category_create
);
app.get(
  "/Admin/video_gallery_category/video_gallery_category_all",
  VideoGalleryCategoryModel.video_gallery_category_list
);
app.post(
  "/Admin/video_gallery_category/video_gallery_category_edit/:id",
  VideoGalleryCategoryModel.video_gallery_category_update
);
app.get(
  "/Admin/video_gallery_category/video_gallery_category_all/:id",
  VideoGalleryCategoryModel.video_gallery_category_single
);
app.post(
  "/Admin/video_gallery_category/video_gallery_category_delete/:id",
  VideoGalleryCategoryModel.video_gallery_category_delete
);

// list Pagination
app.get(
  "/Admin/video_gallery_category/video_category_list_paigination/:pageNo/:perPage",
  VideoGalleryCategoryModel.video_gallery_category_list_paigination
);


// newsmodel
const NewsModel = require("../model/Admin/news_model/news_model.js");

app.post("/Admin/news/news_create", NewsModel.news_create);
app.get("/Admin/news/news_all", NewsModel.news_list);
app.post("/Admin/news/news_delete/:id", NewsModel.news_delete);
app.post("/Admin/news/news_edit/:id", NewsModel.news_update);
app.get("/Admin/news/news_all/:id", NewsModel.news_single);
app.post("/Admin/news/news_search", NewsModel.news_list_search);
app.post("/Admin/news/news_pdf", NewsModel.news_list_pdf);
app.post("/Admin/news/news_print", NewsModel.news_list_print);
// list pagenation
app.get(
  "/Admin/news/news_list_paigination/:pageNo/:perPage",
  NewsModel.news_list_paigination
);
// NoticeModel

const NoticeModel = require("../model/Admin/notice_model/notice_model.js");

app.post("/Admin/notice/notice_create", NoticeModel.notice_create);
app.get("/Admin/notice/notice_all", NoticeModel.notice_list);
app.post("/Admin/notice/notice_delete/:id", NoticeModel.notice_delete);
app.post("/Admin/notice/notice_edit/:id", NoticeModel.notice_update);
app.get("/Admin/notice/notice_all/:id", NoticeModel.notice_single);
app.post("/Admin/notice/notice_search", NoticeModel.notice_list_search);
app.post("/Admin/notice/notice_print", NoticeModel.notice_list_print);
app.post("/Admin/notice/notice_pdf", NoticeModel.notice_list_pdf);

// list Pagination
app.get(
  "/Admin/notice/notice_list_paigination/:pageNo/:perPage",
  NoticeModel.notice_list_paigination
);


// VideoGalleryModel

const VideoGalleryModel = require("../model/Admin/video_gallery_model/video_gallery.js");

app.post(
  "/Admin/video_gallery/video_gallery_create",
  VideoGalleryModel.video_gallery_create
);
app.get(
  "/Admin/video_gallery/video_gallery_all",
  VideoGalleryModel.video_gallery_list
);
app.post(
  "/Admin/video_gallery/video_gallery_delete/:id",
  VideoGalleryModel.video_gallery_delete
);
app.post(
  "/Admin/video_gallery/video_gallery_edit/:id",
  VideoGalleryModel.video_gallery_update
);
app.get(
  "/Admin/video_gallery/video_gallery_all/:id",
  VideoGalleryModel.video_gallery_single
);

app.get(
  "/Admin/video_gallery/video_gallery_list_paigination/:pageNo/:perPage",
  VideoGalleryModel.video_gallery_list_paigination
);



const AttendanceModel = require('../model/Admin/attendance_model/attendance_model')
app.post("/Admin/attendance/attendance_search", AttendanceModel.attendance_search
);
app.post("/Admin/attendance/attendance_create", AttendanceModel.attendance_create
);
app.post("/Admin/absent/absent_create", AttendanceModel.absent_create
);

app.post("/Admin/attendance/attendance_otp", AttendanceModel.send_attendance_otp
);
app.get("/Admin/attendance/attendance_all", AttendanceModel.attendance_list
);
app.get("/Admin/attendance/attendance_all_list", AttendanceModel.attendance_list_all_data
);
app.get("/Admin/absent/absent_all", AttendanceModel.absent_list);

app.post("/Admin/attendance/attendance_list_search", AttendanceModel.attendance_list_search
);
app.post("/Admin/attendance/attendance_list_pdf", AttendanceModel.attendance_list_pdf
);
app.post("/Admin/attendance/attendance_list_print", AttendanceModel.attendance_list_print
);
app.post("/Admin/attendance/attendance_log_search", AttendanceModel.attendance_log_search
);
app.post("/Admin/attendance/attendance_log_prtint", AttendanceModel.attendance_log_print
);
app.post("/Admin/attendance/attendance_log_pdf", AttendanceModel.attendance_log_pdf
);
app.post("/Admin/attendance/attendance_summary_search", AttendanceModel.attendance_summary_search
);
app.post("/Admin/attendance/attendance_summary_print", AttendanceModel.attendance_summary_print
);
app.post("/Admin/attendance/attendance_summary_pdf", AttendanceModel.attendance_summary_pdf
);
app.get("/Admin/attendance/attendance_details_list", AttendanceModel.attendance_details_list
);
app.post("/Admin/absent/absent_list_search", AttendanceModel.absent_list_search
);
app.post("/Admin/absent/absent_delete/:id", AttendanceModel.absent_delete
);
app.post("/Admin/attendance/attendance_delete/:id", AttendanceModel.attendance_delete
);
app.post("/Admin/attendance/attendance_details_print", AttendanceModel.attendance_details_print
);
app.post("/Admin/attendance/attendance_details_pdf", AttendanceModel.attendance_details_pdf
);
app.get("/Admin/attendance_sms/attendance_sms_campaign_category", AttendanceModel.sms_campaign_category_list
);

app.get("/Admin/absent_sms/absent_create_manual_attendance", AttendanceModel.absent_create_manual_attendance
);









const smsApiModel = require('../model/Admin/sms_api_model/sms_api_model')
app.post("/Admin/sms_api/sms_api_create", smsApiModel.create_sms_api
);
app.get("/Admin/sms_api/sms_api_all", smsApiModel.sms_api_list
);
app.get("/Admin/sms_api/sms_api_all/:id", smsApiModel.sms_api_list_single
);
app.post("/Admin/sms_api/sms_api_edit/:id", smsApiModel.sms_api_update
);
app.post("/Admin/sms_api/sms_api_delete/:id", smsApiModel.sms_api_delete
);
app.get("/Admin/all_table", smsApiModel.all_table_list
);

// npm uninstall react-html-table-to-excel


const smsSettings = require('../model/Admin/sms_settings_model/smsSettings')
app.post('/smsSettings', smsSettings.updateSmsSettings)
app.get('/smsSettings/', smsSettings.getSmsSettings)
// app.post('/api/all_table_data', smsSettings.all_table_data)



const moduleSettings = require('../model/Admin/module_settings_model/module_settings_model')
app.post('/Admin/module_settings/module_settings_create', moduleSettings.module_setting_create)
app.get('/Admin/module_settings/module_settings_all', moduleSettings.module_setting_list)

const brandModel = require('../model/Admin/brand_model/brand_model')
const { default: axios } = require('axios')
app.get('/status/all_status', brandModel.ListStatus)








const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.get('/', (req, res) => {
  res.send('Server running saklain mostak')
})


const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})



