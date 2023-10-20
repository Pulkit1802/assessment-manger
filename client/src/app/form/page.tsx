'use client';

import Navbar from '../components/shared/navbar';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 150,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 110,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.row.firstName || ''} ${params.row.lastName || ''}`,
	},
];

const rows = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const section = () => {
	return (
		<div className="h-screen bg-[#eff5ff]">
			<div className="absolute top-0 w-full">
				<Navbar />
			</div>
			<div className="flex flex-col h-full w-full">
				<div className="flex flex-col p-32">
					<p className="text-5xl font-bold text-[#3773cb]">
						Enter Marks
					</p>
					<div className="mt-8 flex gap-2">
						<Button variant="outlined">Generate Report</Button>
						<Button
							component="label"
							variant="contained"
							startIcon={<CloudUploadIcon />}
						>
							Upload Mark List
							<VisuallyHiddenInput type="file" />
						</Button>
						<Button variant="outlined">Download Excel</Button>
					</div>
					<div className="py-12 flex gap-4">
						<Box sx={{ height: 400, width: '100%' }}>
							<DataGrid
								rows={rows}
								columns={columns}
								initialState={{
									pagination: {
										paginationModel: {
											pageSize: 5,
										},
									},
								}}
                style={{
                  color: "#3773cb" 
                }}
								pageSizeOptions={[5]}
								checkboxSelection
								disableRowSelectionOnClick
							/>
						</Box>
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
