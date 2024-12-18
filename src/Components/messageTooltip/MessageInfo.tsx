import "../../styles/messageInfo.scss";

interface MessageInfoProps {
  onClose: () => void;
  message: string;
  type: "error" | "info";
}

export const MessageInfo: React.FC<MessageInfoProps> = ({
  onClose,
  message,
  type,
}) => {
  return (
    <div className="message-wrapper">
      <div className={`type-${type}`}>
        <span className="i">i</span>
      </div>
      <span className="line"></span>
      <div className="content-info">
        <p>{message}</p>
      </div>
      <span className="line"></span>
      <div className="infoBtn">
        <button onClick={onClose}>Понятно</button>
      </div>
    </div>
  );
};
