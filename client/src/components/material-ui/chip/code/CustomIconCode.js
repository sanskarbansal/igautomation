import CodeDialog from '../../../shared/CodeDialog';
import React from 'react';
const CustomIconCode = () => {
  return (
    <>
      <CodeDialog>
        {`
import * as React from 'react';
import { 
Avatar, 
Chip }  from '@mui/material';
import Grid from '@mui/material/Grid2';
import { 
IconCheck, 
IconChecks } from '@tabler/icons';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

<InlineItemCard>
    <Chip
        label="Custom Icon" color="primary" avatar={<Avatar >M</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconCheck width={20} />}
    />
    <Chip
        label="Custom Icon" color="secondary" avatar={<Avatar >S</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconChecks width={20} />}
    />
</InlineItemCard>`}
      </CodeDialog>
    </>
  );
};

export default CustomIconCode;
