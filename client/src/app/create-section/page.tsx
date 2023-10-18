'use client';

import Navbar from '../components/shared/navbar';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const createSection = () => {
	return (
		<div className="h-screen">
			<div className="absolute top-0 w-full">
				<Navbar />
			</div>
			<div className="flex flex-col justify-center items-center h-full w-full">
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { my: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<div className="flex flex-col p-32">
						<h1 className="text-3xl font-bold text-[#3773cb] mb-4">
							Create Section
						</h1>
						<TextField
							id="outlined-basic"
							size="small"
							label="name"
							variant="outlined"
						/>
						<TextField
							id="outlined-basic"
							size="small"
							label="faculty email"
							variant="outlined"
						/>
						<TextField
							id="outlined-basic"
							size="small"
							label="course coordinator email"
							variant="outlined"
						/>
						<Button
							component="label"
							variant="contained"
							startIcon={<CloudUploadIcon />}
							style={{ marginTop: '0.4rem' }}
						>
							Upload Student List
							<VisuallyHiddenInput type="file" />
						</Button>
						<Button
							style={{ marginTop: '1rem' }}
							variant="outlined"
						>
							Submit
						</Button>
					</div>
				</Box>
			</div>
		</div>
	);
};
export default createSection;
