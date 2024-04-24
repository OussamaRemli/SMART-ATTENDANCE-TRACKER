import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { Book } from '@mui/icons-material';

const CardWrapper = styled(MainCard)(({ theme, clicked  }) => ({
    backgroundColor: clicked ? theme.palette.primary[800] : theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.primary[800],
    },
    '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const Module = ({ name, professor, isLoading, onClick, isActive }) => {
    const [clicked, setClicked] = useState(false);
    const theme = useTheme();

    const handleClick = () => {
        setClicked(true);
        onClick();
    };

  return (
    <div onClick={handleClick}>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false} clicked={isActive}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.primary[800],
                      color: '#fff'
                    }}
                  >
                    <Book fontSize='inherit'/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                      {name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="h6" sx={{ color: 'primary.light', mt: 0.25 }}>
                        Pr.<span style={{ fontWeight: 'bold' }}>{professor}</span>
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'primary.light', mt: 0.25 }}>
                        Nombre d'absence:<span style={{ fontWeight: 'bold' }}> X</span>
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </div>
  );
};

Module.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Module;
