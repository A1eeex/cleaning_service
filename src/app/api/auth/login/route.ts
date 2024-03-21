import { NextResponse } from 'next/server';
import User from '../../../../../modules/User';
import jwt from 'jsonwebtoken';
import { connect } from '../../../../../db';


const generateToken = (id: string, email: string, roles: string[]) => {
  const payload = {
    id,
    email,
    roles,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'secret_key1.1', { expiresIn: '24h' });
};

export async function POST(request: Request, responce: Response) {
  try {
    const body = await request.json();
    const { email } = body;
    await connect();
    
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return new NextResponse(
        JSON.stringify({
          message: `Cant found user with ${email}  - email`,
        }),
        { status: 404 }
      );
    }

    const chackUserpassword = findUser.password;

    if (!chackUserpassword) {
      return new NextResponse(
        JSON.stringify({
          message: `Password incorrect`,
        }),
        { status: 401 }
      );
    }
    const token = generateToken(findUser._id, findUser.email, findUser.roles);
    return new NextResponse(
      JSON.stringify({
        message: 'Success correct login',
        token,
        redirectTo: '/',
      }),
      { status: 200 }
    );
  } catch (errors) {
    console.log('some problem with login =>', errors);

    return new NextResponse(
      JSON.stringify({ message: 'some problem with login===>', error: errors }),
      { status: 500 }
    );
  }
}
