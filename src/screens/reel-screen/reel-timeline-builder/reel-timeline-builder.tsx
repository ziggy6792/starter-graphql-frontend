import React from 'react';
import { GetReelDocument, ReelDetailsFragment, useListClipsQuery, useUpdateReelMutation } from 'src/generated-types';
import Spinner from 'src/components/spinner';
import { Grid, Typography, useTheme } from '@material-ui/core';
import ClipTile from 'src/screens/reel-screen/clip-tile';

interface ReelTimelineBuilderProps {
  reel: ReelDetailsFragment;
}

console.log('bla');

const ReelTimelineBuilder: React.FC<ReelTimelineBuilderProps> = ({ reel }) => {
  const { data, loading } = useListClipsQuery({ variables: { filter: { definition: reel.definition, standard: reel.standard } } });

  const theme = useTheme();

  const [updateReel] = useUpdateReelMutation({
    refetchQueries: [
      {
        query: GetReelDocument,
      },
    ],
    awaitRefetchQueries: true,
  });

  if (loading) {
    return <Spinner />;
  }

  const addClip = async (clipIdx: number) => {
    const clipId = data.listClips.items[clipIdx].id;
    const currentTimelineClips = reel.timelineClips.items.map((timelineClip) => timelineClip.clip.id);
    updateReel({ variables: { input: { id: reel.id, clips: [...currentTimelineClips, clipId] } } });
  };

  const removeClip = async (clipIdx: number) => {
    const currentTimelineClips = reel.timelineClips.items.map((timelineClip) => timelineClip.clip.id);
    updateReel({ variables: { input: { id: reel.id, clips: currentTimelineClips.filter((clip, idx) => idx !== clipIdx) } } });
  };

  return (
    <>
      <Grid container direction='column' alignItems='center' justifyContent='center' style={{ marginBottom: theme.spacing(2) }}>
        <Grid item>
          <Typography variant='h3' component='div' gutterBottom>
            Avaiable Clips
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction='row' alignItems='center' justifyContent='center'>
            {data.listClips.items.map((clip, i) => (
              <Grid item key={clip.id}>
                <ClipTile clip={clip} startTimecode={clip.startTimecode} endTimecode={clip.endTimecode} onClick={() => addClip(i)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item>
          <Typography variant='h3' component='div' gutterBottom>
            Reel Timeline
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h4' component='div' gutterBottom>
            Total time: {reel.timelineClips.endTimecode}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction='row' alignItems='center' justifyContent='center'>
            {reel.timelineClips.items.length < 1 && (
              <>
                <Typography variant='h4' component='div' gutterBottom style={{ margin: theme.spacing(3) }}>
                  Please add some clips to the reel
                </Typography>
              </>
            )}
            {reel.timelineClips.items.length > 0 && (
              <>
                {reel.timelineClips.items.map((timelineClip, i) => (
                  <Grid item key={timelineClip.startTimecode}>
                    <ClipTile
                      clip={timelineClip.clip}
                      startTimecode={timelineClip.startTimecode}
                      endTimecode={timelineClip.endTimecode}
                      onClick={() => removeClip(i)}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReelTimelineBuilder;
