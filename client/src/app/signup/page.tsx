import Header from '../components/auth/header';
import Signup from '../components/auth/signup';
import Navbar from '../components/shared/navbar';

export default function signin() {
	return (
		<>
			<Navbar />
			<div className=" flex justify-center items-center">
				<div className="max-w-md">
					<Header
						heading="Signup to create an account"
						paragraph="Already have an account? "
						linkName="Login"
						linkUrl="/"
					/>
					<Signup />
				</div>
			</div>
		</>
	);
}
