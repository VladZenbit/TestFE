import { Box, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller, useFormContext } from 'react-hook-form';

import { SVGIcon } from '../svg-icon';

export interface RHFCheckboxProps
  extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
}

export const RHFCheckBox = (props: RHFCheckboxProps) => {
  const { name, helperText, ...otherProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <FormControlLabel
            {...otherProps}
            sx={{ m: 0 }}
            control={
              <Checkbox
                {...field}
                checked={field.value}
                icon={<SVGIcon name="Checkbox" />}
                checkedIcon={<SVGIcon name="CheckboxChecked" />}
                sx={{ width: 20, height: 20, mr: 1.5 }}
              />
            }
          />
          {(!!error || helperText) && (
            <FormHelperText sx={{ mt: 0.5, ml: 4 }} error={!!error}>
              <Typography variant="subtitle1">
                {error ? error?.message : helperText}
              </Typography>
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};
