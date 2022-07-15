/* eslint-disable arrow-body-style */
import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import FormButtons from 'src/components/ui/buttons/form-buttons';
import FormLayout from 'src/modules/form-layout';
import { TextArea, Select } from 'src/components/forms/formik-material-ui/formik-material-ui';
import { CATALOG_DEFINITION, CATALOG_STANDARD, ICatalogItem } from 'src/config/catalogs';
import { Definition, Standard } from 'src/generated-types';

export interface IReelFormValues {
  name: string;
  description: string;
  definition: Definition;
  standard: Standard;
}

interface IReelFormProps {
  onSubmit: (event: IReelFormValues) => Promise<void>;
  onCancel: () => void;
  allowSubmitPristine?: boolean;
  title: string;
  initialValues: IReelFormValues;
}

const ReelForm: React.FC<IReelFormProps> = ({ onSubmit, onCancel, allowSubmitPristine, title, initialValues }) => {
  const getOptionLabel = (option: ICatalogItem) => option.description;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string().required('Name required'),
        description: Yup.string().required('description required'),
      })}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      {(props) => {
        const { isSubmitting, isValid, dirty } = props;
        return (
          <FormLayout
            title={title}
            buttons={<FormButtons isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} onCancel={onCancel} allowSubmitPristine={allowSubmitPristine} />}
          >
            <Grid container direction='column'>
              <Grid container direction='column' alignItems='center' justifyContent='center' spacing={2}>
                <Grid item>
                  <Field name='name' component={TextField} label='Name' autoFocus />
                </Grid>
                <Grid item>
                  <Field name='description' component={TextArea} label='Description' autoFocus />
                </Grid>
                <Grid item>
                  <Field name='standard' component={Select} label='Standard' options={CATALOG_STANDARD} getOptionLabel={getOptionLabel} />
                </Grid>
                <Grid item>
                  <Field name='definition' component={Select} label='Definition' options={CATALOG_DEFINITION} getOptionLabel={getOptionLabel} />
                </Grid>
              </Grid>
            </Grid>
          </FormLayout>
        );
      }}
    </Formik>
  );
};

export default ReelForm;
