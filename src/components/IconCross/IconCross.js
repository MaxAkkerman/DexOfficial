import { SvgIcon } from '@mui/material';

import SvgCross from '../../images/icons/crossNew.inline.svg';

export default function IconCross(props) {
  return (
    <SvgIcon
      component={SvgCross}
      viewBox="0 0 12 12"
      sx={{ display: 'block' }}
      {...props}
    />
  );
}
