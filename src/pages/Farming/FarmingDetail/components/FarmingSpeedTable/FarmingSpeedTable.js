import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { iconGenerator } from '@/iconGenerator';

const styles = {
  tableCell: {
    borderBottom: '1px solid var(--mainblock-border-color)',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
  },
};

function createData(value, start, end) {
  return { value, start, end };
}

const rows = [
  createData('0.84 WTON', 'Sep 05, 2021, 00:00', 'Sep 23, 2021, 00:00'),
  createData('0.95 WTON', 'Sep 23, 2021, 00:00', 'Oct 09, 2021, 00:00'),
  createData('1.1 WTON', 'Oct 09, 2021, 00:00', 'Nov 12, 2021, 00:00'),
  createData('1.45 WTON', 'Nov 12, 2021, 00:00', 'Jan 13, 2022, 00:00'),
  createData('0.85 WTON', 'Jan 13, 2022, 00:00', '-'),
];

export default function BasicTable(props) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650, '& .MuiTable-root': { fontFamily: 'Gilroy' } }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={styles.tableCell}>Farming speed, sec</TableCell>
            <TableCell sx={styles.tableCell} align="right">
              Start, UTC
            </TableCell>
            <TableCell sx={styles.tableCell} align="right">
              End, UTC
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <TableCell sx={styles.tableCell} component="th" scope="row">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt={props.token}
                    src={iconGenerator(props.token)}
                    sx={{
                      width: 24,
                      height: 24,
                      marginRight: 1,
                    }}
                  />
                  <b>{row.value}</b>
                </Box>
              </TableCell>
              <TableCell sx={styles.tableCell} align="right">
                <b>{row.start}</b>
              </TableCell>
              <TableCell sx={styles.tableCell} align="right">
                <b>{row.end}</b>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
