import { VehicleType } from "@prisma/client";
import { z } from "zod";

export const testimonyFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  // phoneCountry: z.string(),
  phone_number: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  testimony: z.string(),
})

export type TestimonyFormSchema = z.infer<typeof testimonyFormSchema>

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const bookingFormSchema = z.object({
  // User information
  name: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Valid phone number is required" }),

  // Travel details
  originState: z.string().min(1, { message: "Please select location state" }),
  destination: z.string().min(3, { message: "Destination is required" }),
  pickupPoint: z.string().min(1, { message: "Pickup point is required" }),
  travelDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  travelTime: z.string().min(1, { message: "Please select a time" }),

  // Vehicle and seats
  vehicleType: z.nativeEnum(VehicleType, {
    errorMap: () => ({ message: "Please select a valid vehicle type" }),
  }),
  selectedSeats: z.array(z.string()).min(1, { message: "At least one seat must be selected" }),

  // Payment information
  totalPrice: z.number().positive({ message: "Total price must be greater than zero" }),
  paymentMethod: z.enum(["card", "transfer"], {
    errorMap: () => ({ message: "Please select a valid payment method" }),
  }),
})

  export const userFormSchema = z.object({
    name: z.string().min(3, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),

  })