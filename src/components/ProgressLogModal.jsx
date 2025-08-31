import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'antd';

const containerStyle = {
  background: '#0b1020',
  color: '#c8d1ff',
  borderRadius: 6,
  padding: 12,
  height: 260,
  overflowY: 'auto',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 12,
  lineHeight: '18px',
  whiteSpace: 'pre-wrap'
};

// 简单可复用的进度日志弹窗
const ProgressLogModal = ({ open, title = '执行进度', logs = [], onCancel, closable = true, footerExtra }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={[
        ...(Array.isArray(footerExtra) ? footerExtra : footerExtra ? [footerExtra] : []),
        <Button key="close" onClick={onCancel}>关闭</Button>
      ]}
      closable={closable}
      destroyOnClose
      width={560}
    >
      <div ref={scrollRef} style={containerStyle}>
        {logs.length === 0 ? '正在准备中…' : logs.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </Modal>
  );
};

export default ProgressLogModal;


