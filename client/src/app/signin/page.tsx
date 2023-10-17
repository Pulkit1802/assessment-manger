import Header from '../components/auth/header';
import Login from '../components/auth/signin';
import Navbar from '../components/shared/navbar';

export default function signin() {
	return (
		<>
			<Navbar />
			<div className=" flex justify-center items-center">
				<div className="max-w-md">
					<Header
						heading="Login to your account"
						paragraph="Don't have an account yet? "
						linkName="Signup"
						linkUrl="/signup"
					/>
					<Login />
				</div>
			</div>
		</>
	);
}
