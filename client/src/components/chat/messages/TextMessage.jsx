import timeAgoFormat from '../../../utility/timeAgo.js';

function TextMessage({ message }) {
  return (
    <div>
      {message.content.message}
      <div
        style={{
          fontSize: '11px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {timeAgoFormat(message.createdAt, 'ko')} | read {message.readBy?.length}
      </div>
    </div>
  );
}

export default TextMessage;
