import React, { useState } from 'react';
import { Card, Grid, Tooltip, Typography, useTheme } from '@material-ui/core';
import { format } from 'date-fns';
import Dialog from 'src/components/ui/dialog';
import { ClipTileFragment } from 'src/generated-types';

export interface SlotTileProps {
  clip: ClipTileFragment;
  startTimecode: string;
  endTimecode: string;
  onClick?: () => Promise<void>;
}

const SlotTile: React.FC<SlotTileProps> = ({ clip, startTimecode, endTimecode, onClick }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const theme = useTheme();

  const cardStyle = { background: isHighlighted ? theme.palette.primary.light : undefined, cursor: 'pointer' };

  return (
    <>
      <Tooltip title={`${clip.name}: ${clip.description}`} placement='top'>
        <Card
          elevation={10}
          onClick={onClick ? () => onClick() : undefined}
          style={cardStyle}
          onMouseOver={() => setIsHighlighted(true)}
          onMouseLeave={() => setIsHighlighted(false)}
        >
          <Grid container direction='column' style={{ margin: theme.spacing(1) }} alignItems='center'>
            <Grid item style={{ marginBottom: theme.spacing(1) }}>
              <Typography
                variant='h3'
                component='div'
                align='center'
                style={{ whiteSpace: 'nowrap', width: '400px', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {clip.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant='subtitle1'
                component='div'
                align='center'
                style={{ whiteSpace: 'nowrap', width: '400px', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {clip.description}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction='row' spacing={2}>
                <Grid item>
                  <Typography variant='subtitle2' component='div'>
                    Standard: {clip.standard}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' component='div'>
                    Definition: {clip.definition}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction='row' spacing={2}>
                <Grid item>
                  <Typography variant='subtitle2' component='div'>
                    Start: {startTimecode}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' component='div'>
                    End: {endTimecode}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Tooltip>
    </>
  );
};

export default SlotTile;
