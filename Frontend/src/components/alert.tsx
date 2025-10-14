type Props = {
  message_alert: string;
};

function Alert(props: Props) {
  const { message_alert } = props;

  return (
    <div
      className={`absolute z-50 flex w-3/4 h-auto overflow-hidden bg-white shadow-lg max-w-100 rounded-xl right-5 top-5 p-4`}
    >
      <div className="mx-2.5 overflow-hidden w-full">
        <p className="mt-1.5 text-xl font-bold text-[peru] leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
          Notice !
        </p>
        <p className="overflow-hidden leading-5 break-all text-zinc-400 whitespace-pre-line h-auto">
          {message_alert}
        </p>
      </div>
    </div>
  );
}
export default Alert;
