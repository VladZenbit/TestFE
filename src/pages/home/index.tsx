import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  useTheme,
  Pagination,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { PATH_MAIN } from '@src/constants';

import Header from '../../components/Header';
import NoMovieContent from '../../components/NoMovieContent';
import { useMovies } from '../../hooks/useMovies';

const HomePage = () => {
  const theme = useTheme();
  const router = useRouter();

  const { movies, loading, error, metadata, handlePageChange } = useMovies();

  const handlePaginationChange = useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      handlePageChange(page);
    },
    [handlePageChange]
  );

  const handleMovieClick = useCallback(
    (id: string) => {
      router.push({
        pathname: PATH_MAIN.MOVIE,
        query: { id },
      });
    },
    [router]
  );

  const isNoMovies = useMemo(() => movies?.length === 0, [movies]);

  return (
    <Box
      sx={{
        padding: '120px',
        minHeight: '90vh',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          padding: '80px 24px 24px',
        },
      }}
    >
      <Header />
      <Grid
        container
        spacing={3}
        sx={{
          paddingTop: '120px',
          [theme.breakpoints.down('sm')]: {
            paddingTop: '80px',
          },
        }}
      >
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {isNoMovies ? (
          <NoMovieContent />
        ) : (
          movies?.map((movie) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={movie.id}>
              <Box
                onClick={() => handleMovieClick(movie.id)}
                sx={{
                  height: '504px',
                  maxWidth: '400px',
                  padding: '8px 0px 4px 10px',
                  backgroundColor: theme.palette.primary.dark,
                  borderRadius: '12px',
                  boxShadow: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  [theme.breakpoints.down('sm')]: {
                    height: '334px',
                    maxWidth: '180px',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: 'calc(100% - 8px)',
                    height: `calc(100% - 96px)`,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={movie.imageUrl}
                    alt={movie.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
                <Box sx={{ padding: '0 6px' }}>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 2, color: theme.palette.common.white }}
                  >
                    {movie.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginTop: 2, color: theme.palette.common.white }}
                  >
                    {movie.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      {!isNoMovies && movies && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '120px',
            [theme.breakpoints.down('sm')]: {
              padding: '40px 20px 20px',
            },
          }}
        >
          <Pagination
            count={metadata.pagesAmount}
            page={metadata.page}
            onChange={handlePaginationChange}
            siblingCount={1}
            boundaryCount={1}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
