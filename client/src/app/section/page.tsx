import Navbar from '../components/shared/navbar';
import { Button } from '@mui/material';

const section = () => {
	return (
		<div className="h-screen bg-[#eff5ff]">
			<div className="absolute top-0 w-full">
				<Navbar />
			</div>
			<div className="flex flex-col h-full w-full">
				<div className="flex flex-col p-32">
					<p className="text-5xl font-bold text-[#3773cb]">
						Sections
					</p>
					<div className="py-12 flex gap-4">
						<div className="border border-[#3773cb] text-[#3773cb] w-auto text-center p-4 text-3xl">
							A1
						</div>
						<div className="border border-[#3773cb] text-[#3773cb] w-auto text-center p-4 text-3xl">
							B1
						</div>
						<div className="border border-[#3773cb] text-[#3773cb] w-auto text-center p-4 text-3xl">
							C1
						</div>
					</div>
					<div>
						<Button variant="outlined">Submit</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default section;
