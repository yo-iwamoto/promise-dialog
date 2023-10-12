import { DialogArea, useDialog } from './Dialog';

export function App() {
  const { showDialog } = useDialog();

  const onClickButton = async () => {
    const confirmed = await showDialog({
      title: 'データの送信',
      content: '本当に送信しますか？',
    });
    if (!confirmed) {
      alert('キャンセルしました');
      return;
    }

    alert('送信しました');
  };

  return (
    <>
      <main>
        <button type='button' onClick={onClickButton}>
          送信
        </button>
      </main>

      <DialogArea />
    </>
  );
}
