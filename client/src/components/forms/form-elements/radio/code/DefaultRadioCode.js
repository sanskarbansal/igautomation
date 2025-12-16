import CodeDialog from "../../../../shared/CodeDialog";
import React from "react";
const DefaultRadioCode = () => {
    return (
        <>
            <CodeDialog>
                {`
import * as React from 'react';
import { Box, Radio } from '@mui/material';

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <Radio
        checked={checked}
        onChange={handleChange}
    />
    <Radio disabled  />
    <Radio color="default" />
</Box>`}
            </CodeDialog>
        </>
    );
};

export default DefaultRadioCode;