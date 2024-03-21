import { NextResponse } from 'next/server';
import User from '../../../../../modules/User';
import Role from '../../../../../modules/Role';
import { connect } from '../../../../../db';

export async function POST(request: Request, responce: Response) {
  try {
    if (!request.body) {
      throw new Error('Request body is empty');
    }
    const body = await request.json();
    const { email, password } = body;
 
    await connect();
    const candidateUser = await User.findOne({ email });
    if (candidateUser) {
      return new NextResponse(
        JSON.stringify({
          message: 'Sorry, but there is already a user with this email address',
        }),
        { status: 409 }
      );
    }

    const findUserRole = await Role.findOne({ value: 'USER' });
    const userRole = new Role(findUserRole);

    console.log('findUserRole ===>>', findUserRole);
    console.log('userRole ===>>', userRole);

    const newUser = await new User({
      email,
      password,
      roles: [findUserRole.value],
    });

    await newUser.save();

    return new NextResponse(
      JSON.stringify({
        message: 'Success register',
        user: { email, password, roles: [findUserRole.value] },
      }),
      { status: 200 }
    );
  } catch (errors) {
    console.log('some problem with register', errors);
    return new NextResponse(
      JSON.stringify({ message: 'some problem with register', error: errors }),
      { status: 500 }
    );
  }
}
