import { type NextRequest, NextResponse } from "next/server"
import { userFormSchema } from "@/lib/validation-schema"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const validation = userFormSchema.safeParse(await req.json())

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues }, { status: 400 })
    }

    const data = validation.data

    // Create or find user

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    })
    

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


