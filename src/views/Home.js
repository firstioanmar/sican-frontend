import { React, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/Book';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Home() {
  // get data
  const [cerita, setCerita] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      await axios
        .get('http://localhost:1500/cerita')
        .then(({ data }) => {
          if (isMounted) {
            setCerita(data.response);
          }
        })
        .catch((error) => console.log(error));
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = [
    {
      label: 'si Kancil dan Buaya',
      imgPath:
        'https://cdn.popmama.com/content-images/post/20200605/kancil-buaya-1jpg-147a9d307b2d9ae70b6df1c4250e50e5.jpg',
    },
    {
      label: 'Tikus dan Singa yang mengajarkan kebaikan',
      imgPath:
        'https://cdn.popmama.com/content-images/post/20200618/dongeng-singan-tikusjpg-58eba366475abc118f17e805848f78b7.jpg',
    },
    {
      label: 'Kelinci yang sombong dan Kura-Kura',
      imgPath:
        'https://cdn.popmama.com/content-images/post/20200618/dongeng-kelinci-kurakurajpg-fccc1e45af07a3cf50f213fd1044ddc6.jpg',
    },
    {
      label: 'Putri yang ingar kepada si Katak',
      imgPath:
        'https://cdn.popmama.com/content-images/post/20200618/dongeng-putri-katakjpg-2aeb276ff2daffb2ce2527f18e2ddb55.jpg',
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const maxLength = 30;

  const truncateText = (text) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: '#2980b9',
            color: '#fff',
          }}
        >
          <Typography>SICAN APP</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {cerita.map((step, index) => (
            <div key={step.judul}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={'http://localhost:1500/assets/' + step.fkg_penulis + '/' + step.gambar}
                  alt={step.judul}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Box>
      <Divider />
      <Typography sx={{ background: '#eee', fontSize: 18, fontWeight: 700, padding: '2px 10px' }}>
        Cerita
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {cerita.map((cerita) => (
          <Link to={`/read/${cerita.id_cerita}`} key={cerita.id_cerita}>
            <ListItem key={cerita.id_cerita}>
              <ListItemAvatar>
                <Avatar>
                  <BookIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={cerita.judul} secondary={truncateText(cerita.deskripsi)} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}
