import Navbar from '../components/shared/navbar';

const section = () => {
	return (
		<div className="h-screen">
			<div className="absolute top-0 w-full">
				<Navbar />
			</div>
			<div className="flex flex-col h-full w-full">
				<div className="flex flex-col border border-red-800 p-32">
					<p className="text-5xl font-bold text-[#3773cb]">
						Sections
					</p>
          <div className='border border-green-600 py-12 flex gap-4'>
            <div className='border border-black w-auto text-center p-4 text-3xl'>A1</div>
            <div className='border border-black w-auto text-center p-4 text-3xl'>B1</div>
            <div className='border border-black w-auto text-center p-4 text-3xl'>C1</div>
          </div>
				</div>
			</div>
		</div>
	);
};

export default section;
