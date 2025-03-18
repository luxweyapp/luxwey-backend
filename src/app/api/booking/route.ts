import { type NextRequest, NextResponse } from "next/server"
import { bookingFormSchema } from "@/lib/validation-schema"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const validation = bookingFormSchema.safeParse(await req.json())

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 })
    }

    const data = validation.data

    // Create or find user
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        phoneNumber: data.phoneNumber,
      },
      create: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
    })

    // Find vehicle by type
    const vehicle = await prisma.vehicle.findFirst({
      where: { type: data.vehicleType },
    })

    if (!vehicle) {
      return NextResponse.json({ error: "Selected vehicle type not found" }, { status: 404 })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        travelDate: new Date(data.travelDate),
        destination: data.destination,
        totalPrice: data.totalPrice,
        pickupPoint: data.pickupPoint,
        paymentStatus: "pending",
        // Create payment record
        payments: {
          create: {
            amount: data.totalPrice,
            status: "pending",
          },
        },
      },
      include: {
        payments: true,
      },
    })

    // Update seats for the booking
    const seatUpdates = data.selectedSeats.map((seatNumber) => {
      return prisma.seat.update({
        where: {
          id: seatNumber, // Assuming seatNumber is the seat ID
        },
        data: {
          isBooked: true,
          bookingId: booking.id,
        },
      })
    })

    // Execute all seat updates in a transaction
    await prisma.$transaction(seatUpdates)

    // Return the created booking with related data
    const completeBooking = await prisma.booking.findUnique({
      where: { id: booking.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
          },
        },
        seats: true,
        payments: true,
      },
    })

    return NextResponse.json(completeBooking)
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Get all bookings (for admin purposes)
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        seats: true,
        payments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

