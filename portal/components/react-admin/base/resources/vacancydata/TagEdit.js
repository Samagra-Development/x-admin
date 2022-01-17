import {
    BooleanInput,
    Edit,
    SaveButton,
    SimpleForm,
    TextInput,
    Toolbar,
    required,
    translate
} from 'react-admin';

import Button from '@material-ui/core/Button';
import React from 'react';

const TagEditToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

const TagEdit = ({ onCancel, ...props }) => {
    console.log({ props });
    return (< Edit title=" " {...props}>
        <SimpleForm toolbar={<TagEditToolbar onCancel={onCancel} />}>
            <BooleanInput label="Live" source="is_live" validate={required()} />
        </SimpleForm>
    </Edit >
    );
}

export default TagEdit;
