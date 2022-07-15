/* eslint-disable arrow-body-style */
import React from 'react';
import Spinner from 'src/components/spinner';
import { Grid, Typography, useTheme, Button } from '@material-ui/core';
import { useGetReelLazyQuery, useGetReelQuery } from 'src/generated-types';
import EditReelButton from './edit-reel';
import { CATALOG_DEFINITION, CATALOG_STANDARD, getDisplayText } from 'src/config/catalogs';
import ReelTimelineBuilder from './reel-timeline-builder';

const ReelScreen = () => {
  const { data, loading, refetch } = useGetReelQuery({ fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-only' });

  const [getReel] = useGetReelLazyQuery({ fetchPolicy: 'cache-first' });

  const theme = useTheme();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Grid container direction='column' alignItems='center'>
      <Button
        onClick={async () => {
          const result = await getReel({});
          console.log('result', result);
        }}
      >
        Test
      </Button>
      <Grid item style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(2) }}>
        <Typography variant='h2' gutterBottom>
          {data.getReel.name}
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: theme.spacing(2) }}>
        <Typography variant='h4' gutterBottom>
          {data.getReel.description}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction='row' alignItems='center' spacing={1} style={{ marginBottom: theme.spacing(1) }}>
          <Grid item>
            <Typography variant='h4' gutterBottom>
              Standard: {getDisplayText(data.getReel.standard, CATALOG_STANDARD)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h4' gutterBottom>
              Definition: {getDisplayText(data.getReel.definition, CATALOG_DEFINITION)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginBottom: theme.spacing(2) }}>
        <EditReelButton reelSummary={data.getReel} />
      </Grid>
      <Grid item style={{ marginBottom: theme.spacing(2) }}>
        <ReelTimelineBuilder reel={data.getReel} />
      </Grid>
    </Grid>
  );
};

export default ReelScreen;
