import Header from '../components/auth/header';
import Signup from '../components/auth/signup';
import Navbar from '../components/shared/navbar';

export default function signup() {
	return (
		<div className="h-screen">
			<div className="absolute top-0 w-full">
				<Navbar />
			</div>
			<div className=" flex flex-col h-full w-full justify-center items-center">
				<Header
					heading="Signup to create an account"
					paragraph="Already have an account? "
					linkName="Login"
					linkUrl="/signin"
				/>
				<Signup />
			</div>
		</div>
	);
}
