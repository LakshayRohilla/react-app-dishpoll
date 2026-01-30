import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertMessage({severity="info", children}) {
  return (
    <Stack sx={{ width: '100%'}} spacing={2}>
      <Alert severity={severity} sx={{borderRadius:3}}>{children}</Alert>
    </Stack>
  );
}