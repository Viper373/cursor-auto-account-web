import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Space } from 'antd';
import { HolderOutlined } from '@ant-design/icons';

const logBoxBaseStyle = {
  background: '#0b1020',
  color: '#c8d1ff',
  borderRadius: 6,
  border: '1px solid #1f2440',
  padding: 10,
  height: 260,
  overflowY: 'auto',
  overflowX: 'hidden',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 12,
  lineHeight: '18px',
  whiteSpace: 'pre-wrap',
  position: 'relative',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none' // IE/Edge
};

const DraggableLogPanel = ({ logs = [], onClear, mobile = false }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(260);
  const resizing = useRef(false);
  const start = useRef({ y: 0, h: 260 });
  const [cursor, setCursor] = useState('default');

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const onMove = (e) => {
      if (!resizing.current) return;
      const dy = e.clientY - start.current.y;
      const nextH = Math.max(120, Math.min(600, start.current.h + dy));
      setHeight(nextH);
    };
    const onUp = () => { resizing.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const onContainerMouseDown = (e) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const nearBottom = rect.bottom - e.clientY <= 8;
    if (!nearBottom) return;
    resizing.current = true;
    start.current = { y: e.clientY, h: height };
    e.preventDefault();
  };

  const onContainerMouseMove = (e) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const nearBottom = rect.bottom - e.clientY <= 8;
    setCursor(nearBottom ? 'ns-resize' : 'default');
  };

  const wrapperStyle = { position: 'relative' };

  return (
    <div style={wrapperStyle}>
      <Card
        title={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><HolderOutlined /> 实时日志</div>}
        size="small"
        extra={
          <Space>
            <Button size={mobile ? 'small' : 'middle'} onClick={onClear}>清空</Button>
          </Space>
        }
        style={{ marginBottom: 16 }}
        bodyStyle={{ padding: 12 }}
      >
        {/* 隐藏滚动条（webkit） */}
        <style>{`.log-box::-webkit-scrollbar{display:none;}`}</style>
        <div
          ref={contentRef}
          className="log-box"
          onMouseDown={onContainerMouseDown}
          onMouseMove={onContainerMouseMove}
          style={{ ...logBoxBaseStyle, height, cursor }}
        >
          {logs.length === 0 ? '等待任务…' : logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </Card>
    </div>
  );
};

export default DraggableLogPanel;


