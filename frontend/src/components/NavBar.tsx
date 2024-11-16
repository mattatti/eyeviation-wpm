import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import NotificationBell from './NotificationBell';

export default function NavBar() {
  return (
    <Box sx={{ position: 'absolute', top: 0, flexGrow: 1 }}>
      <AppBar sx={{ height: 48, justifyContent: 'center' }}>
        <Toolbar
          sx={{
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            noWrap
            component='div'
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            EyeViation Platform
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NotificationBell />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
