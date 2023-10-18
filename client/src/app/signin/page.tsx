import Header from '../components/auth/header';
import Login from '../components/auth/signin';
import Navbar from '../components/shared/navbar';

export default function signin() {
	return (
		<div className='h-screen'>
			<div className='absolute top-0 w-full'>
			<Navbar />
			</div>
			<div className="flex flex-col justify-center items-center h-full w-full">

					<Header
						heading="Login to your account"
						paragraph="Don't have an account yet? "
						linkName="Signup"
						linkUrl="/signup"
					/>
					<Login />
				</div>
			</div>
	);
}
