import React from 'react';
import {
    Edit,
    TextInput,
    SimpleForm,
    required,
    SaveButton,
    Toolbar,
    translate
} from 'react-admin';
import Button from '@material-ui/core/Button';

const TagEditToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

const TagEdit = ({ onCancel, ...props }) => (
    <Edit title=" " {...props}>
        <SimpleForm toolbar={<TagEditToolbar onCancel={onCancel} />}>
            <TextInput source="is_live" validate={required()} />
        </SimpleForm>
    </Edit>
);

export default TagEdit;
