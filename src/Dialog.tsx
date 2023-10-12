import * as DialogPrimitive from '@radix-ui/react-dialog';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, type ReactNode } from 'react';

type DialogProps = {
  title: string;
  content: ReactNode;
  /** @default 'OK' */
  confirmButtonText?: string;
  /** @default 'Cancel' */
  cancelButtonText?: string;
  resolve: (confirmed: boolean) => void;
};

const dialogState = atom<DialogProps | null>(null);

export function useDialog() {
  const setDialog = useSetAtom(dialogState);

  const showDialog = useCallback(
    (props: Omit<DialogProps, 'resolve'>) => {
      return new Promise<boolean>((resolve) => {
        setDialog({
          ...props,
          resolve: (confirmed: boolean) => {
            setDialog(null);
            resolve(confirmed);
          },
        });
      });
    },
    [setDialog],
  );

  return {
    showDialog,
  };
}

export function DialogArea() {
  const dialog = useAtomValue(dialogState);

  if (dialog === null) return null;

  return <Dialog {...dialog} />;
}

function Dialog({ title, content, confirmButtonText = 'OK', cancelButtonText = 'Cancel', resolve }: DialogProps) {
  const onOpenChange = (opened: boolean) => {
    if (!opened) {
      resolve(false);
    }
  };

  return (
    <DialogPrimitive.Root defaultOpen onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='fixed inset-0 bg-black/5' />
        <div className='fixed inset-0 grid place-items-center'>
          <DialogPrimitive.Content className='grid w-4/5 gap-6 rounded-md bg-white p-8 shadow-md'>
            <DialogPrimitive.Title className='text-center text-2xl font-bold'>{title}</DialogPrimitive.Title>

            <div className='text-center'>{content}</div>

            <div className='flex items-center justify-center gap-2'>
              <button
                type='button'
                className='rounded-md bg-neutral-700 px-4 py-2 font-bold text-white transition-colors hover:bg-neutral-600 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-offset-2'
                onClick={() => resolve(true)}
              >
                {confirmButtonText}
              </button>

              <button
                type='button'
                className='rounded-md border border-neutral-700 bg-white px-4 py-2 font-bold text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-offset-2'
                onClick={() => resolve(false)}
              >
                {cancelButtonText}
              </button>
            </div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
