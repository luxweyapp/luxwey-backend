import { z } from 'zod';

export const userRegistrationSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
  company_name: z.string().min(1, 'Company name is required'),
  tax_id: z.string().min(1, 'Tax ID is required'),
  industry: z.string().min(1, 'Industry is required'),
});

export const kycDocumentSchema = z.object({
  user_id: z.string().uuid('Invalid user ID'),
  document_type: z.string().min(1, 'Document type is required'),
  document_url: z.string().url('Invalid document URL'),
});

export const invoiceSchema = z.object({
  invoice_id: z.string().uuid('Invalid invoice ID').optional(),
  invoice_number: z.string().min(1, "Invoice number is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price_per_unit: z.number().min(0, "Price must be non-negative"),
  total_price: z.number().min(0, "Total price must be non-negative"),
  payment_terms: z.string().min(1, "Payment terms are required"),
  due_date: z.date(),
  invoice_file: z.string().min(1, "Invoice file is required"),
  vendor_id: z.string().uuid('Invalid vendor ID'),
  terms_agreed: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

export const vendorSchema = z.object({
  vendor_id: z.string().uuid('Invalid vendor ID').optional(),
  name: z.string().min(1, "Vendor name is required"),
  contact_person: z.string().min(1, "Contact person is required"),
  contact_person_phone_number: z.string().min(1, "Contact person phone number is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email('Invalid email address'),
  bank_name: z.string().min(1, "Bank name is required"),
  bank_account_number: z.string().min(1, "Bank account number is required"),
});

export const milestoneSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  supporting_doc: z.string().min(1, "Supporting document is required"),
  bank_name: z.string().min(1, "Bank details are required"),
  bank_account_no: z.string().min(1, "Bank details are required"),
  due_date: z.date(),
  title: z.string().min(1,"Title is required"),
  payment_amount: z.number().min(0, "Payment amount must be non-negative"),
  invoice_id: z.string(),
});

export const userUpdateSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  company_name: z.string().min(1, 'Company name is required'),
  tax_id: z.string().min(1, 'Tax ID is required'),
  industry: z.string().min(1, 'Industry is required'),
  current_password: z.string().min(6, 'Current password is required').optional(),
  new_password: z.string().min(6, 'New password must be at least 6 characters long').optional(),
});

export const fundingRequestSchema = z.object({
  invoice_id: z.string(),
  requested_amount: z.number().min(0, "Requested amount must be non-negative"),
  your_contribution: z.number().min(0, "Your contribution must be non-negative"),
});

export const adminUpdateSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  current_password: z.string().min(8).optional(),
  new_password: z.string().min(8).optional(),
});
