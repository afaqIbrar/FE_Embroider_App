import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import { Close } from '@mui/icons-material';
// import clsx from 'clsx';

export default function Popup({
  open,
  setOpen,
  title,
  content,
  actions,
  onClose,
  sx,
  subTitle,
  noPadding,
  noLineBreak = true,
  paperProps,
  closeIconSize = 12,
  headerClass,
  titleClass = 'text-xl font-semibold',
  dialogContentClasses,
  ...rest
}) {
  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={sx}
      PaperProps={paperProps}
      disablePortal
      {...rest}
    >
      <DialogTitle className={headerClass}>
        <div className="flex justify-between w-100">
          <p className={titleClass}>{title}</p>
          {/* <Close
            onClick={handleClose}
            className={clsx(
              `mt-[5px] cursor-pointer w-[${closeIconSize}px] h-[${closeIconSize}px] text-santaGray items-center`
            )}
          /> */}
        </div>
        {subTitle && <p className="text-sm font-normal mt-1">{subTitle}</p>}
      </DialogTitle>
      {!noLineBreak ? <hr /> : <></>}
      <DialogContent
        className={`${dialogContentClasses} ${noPadding ? 'p-0' : ''}`}
      >
        {content}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
