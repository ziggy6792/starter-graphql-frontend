import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Dialog from 'src/components/ui/dialog';
import ReelForm, { IReelFormValues } from 'src/components/forms/reel-form';
import { GetReelDocument, ReelSummaryFragment, useUpdateReelMutation } from 'src/generated-types';

interface EditReelButtonProps {
  reelSummary: ReelSummaryFragment;
}

const EditReelButton: React.FC<EditReelButtonProps> = ({ reelSummary }) => {
  const [open, setOpen] = useState(false);

  const [updateReel] = useUpdateReelMutation({
    refetchQueries: [
      {
        query: GetReelDocument,
      },
    ],
    awaitRefetchQueries: true,
  });

  const onUpdateReel = async (formValues: IReelFormValues): Promise<void> => {
    const variables = { input: { id: reelSummary.id, ...formValues } };
    await updateReel({ variables });
    setOpen(false);
    return null;
  };

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <ReelForm
          title='Edit Reel Details'
          onSubmit={onUpdateReel}
          onCancel={() => setOpen(false)}
          allowSubmitPristine={false}
          initialValues={{
            name: reelSummary.name,
            description: reelSummary.description,
            definition: reelSummary.definition,
            standard: reelSummary.standard,
          }}
        />
      </Dialog>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Edit Reel Details
      </Button>
    </>
  );
};

export default EditReelButton;
