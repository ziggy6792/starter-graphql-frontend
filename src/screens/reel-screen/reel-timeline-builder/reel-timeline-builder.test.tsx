import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { ReelDetailsFragment } from 'src/generated-types';
import { renderWithApiProvider } from 'src/utils/test-utils';
import ReelTimelineBuilder from './reel-timeline-builder';

const mockReel = {
  __typename: 'Reel',
  timelineClips: {
    __typename: 'ClipTimeline',
    endTimecode: '00:00:15:27',
    items: [
      {
        __typename: 'ClipTimelineItem',
        startTimecode: '00:00:00:00',
        endTimecode: '00:00:15:27',
        clip: {
          __typename: 'Clip',
          id: '61530b2a582122227ab76673',
          name: "M&M's",
          description: 'description',
          startTimecode: '00:00:00:00',
          endTimecode: '00:00:15:27',
          standard: 'NTSC',
          definition: 'SD',
        },
      },
    ],
  },
  id: '61530b2a582122227ab76672',
  name: 'My Awesome Reel',
  description: 'My Awesome Reel Is Awesome',
  standard: 'NTSC',
  definition: 'SD',
};

const mockListClipsImplementation = (args: any) => {
  return {
    items: [
      {
        __typename: 'Clip',
        id: 'clip1',
        name: 'Name 1',
        description: 'Description 1',
        standard: 'PAL',
        definition: 'SD',
      },
      {
        __typename: 'Clip',
        id: 'clip2',
        name: 'Name 2',
        description: 'Description 2',
        standard: 'PAL',
        definition: 'SD',
      },
    ],
  };
};

describe('Reel Timeline Builder', () => {
  it('Should filter clips by standard and definition', async () => {
    const mockListClips = jest.fn(mockListClipsImplementation);
    renderWithApiProvider(<ReelTimelineBuilder reel={mockReel as ReelDetailsFragment} />, {
      mockResolvers: {
        Query: () => ({
          listClips: mockListClips,
        }),
      },
    });

    await waitFor(() => {
      expect(screen.getByText(/Avaiable Clips/i)).toBeInTheDocument();
    });

    expect(mockListClips).toHaveBeenCalledWith(
      {
        filter: { definition: 'SD', standard: 'NTSC' },
      },
      undefined,
      expect.anything()
    );

    expect(screen.getByText(/Name 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Name 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
  });

  it('Should correctly add clips', async () => {
    const mockUpdateReel = jest.fn((args: any) => {
      return [{ __typename: 'Reel' }];
    });

    renderWithApiProvider(<ReelTimelineBuilder reel={mockReel as ReelDetailsFragment} />, {
      mockResolvers: {
        Query: () => ({
          listClips: mockListClipsImplementation,
        }),
        Mutation: () => ({
          updateReel: mockUpdateReel,
        }),
      },
    });

    await waitFor(() => {
      expect(screen.getByText(/Avaiable Clips/i)).toBeInTheDocument();
    });

    const firstClip = screen.getByText(/Name 1/i);
    fireEvent.click(firstClip);

    // Wait for updateReel to be called with clip1 added
    await waitFor(() => {
      expect(mockUpdateReel).toHaveBeenCalledWith(
        {
          input: {
            clips: ['61530b2a582122227ab76673', 'clip1'],
            id: '61530b2a582122227ab76672',
          },
        },
        undefined,
        expect.anything()
      );
    });
  });
});
