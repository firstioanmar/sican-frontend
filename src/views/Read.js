import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/joy/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Read() {
  const { ceritaId } = useParams();

  // get data
  const [cerita, setCerita] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const formData = new FormData();
      formData.append('idcerita', ceritaId);
      await axios
        .post('http://localhost:1500/getCeritaByID', formData)
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

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          bgcolor: '#2980b9',
          color: '#fff',
        }}
      >
        <Link to={'/home'}>
          <Button variant="soft" startDecorator={<KeyboardArrowLeft />} color="default">
            Back
          </Button>
        </Link>
      </Paper>
      <Box component="ul" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {cerita.map((cerita) => (
          <>
            <Card
              component="li"
              sx={{ width: '100%', '--Card-radius': '0px' }}
              key={cerita.id_cerita}
            >
              <CardCover>
                <video autoPlay loop muted>
                  <source
                    src={
                      'http://localhost:1500/assets/' + cerita.fkg_penulis + '/' + cerita.videourl
                    }
                    type="video/mp4"
                  />
                </video>
              </CardCover>
              <CardContent>
                <Typography level="h6" fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 18 }}>
                  {cerita.judul}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ width: '100%', '--Card-radius': '0px' }}>
              <CardContent>
                <Typography level="body1" sx={{ textAlign: 'justify', wordWrap: 'break-word' }}>
                  {cerita.deskripsi}
                </Typography>
              </CardContent>
            </Card>
          </>
        ))}
      </Box>
    </Box>
  );
}
