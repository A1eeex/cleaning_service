import { NextResponse } from "next/server";
import Role from "../../../../../modules/Role";
import { connect } from "../../../../../db";


export async function GET(request: Request, responce: Response) {
  try {
    const body = request.body;
    await connect();
    console.log(body);
    const newRole = new Role();
    const newAdmin = new Role({ value: 'ADMIN' });
    await newRole.save();
    await newAdmin.save();

    return new NextResponse(
      JSON.stringify({
        message: 'Users is created successfully',
        order: body,
      }),
      { status: 201 }
    );
  } catch (error:any) {
    console.log('Error post 500', error?.message);
  }
}
