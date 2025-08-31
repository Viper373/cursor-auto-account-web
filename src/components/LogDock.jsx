import React, { useEffect, useRef } from 'react';
import { Card, Button } from 'antd';

const wrapperStyle = {
  position: 'fixed',
  right: 16,
  bottom: 16,
  width: 420,
  zIndex: 1000
};

const logBoxStyle = {
  background: '#0b1020',
  color: '#c8d1ff',
  borderRadius: 6,
  padding: 10,
  height: 180,
  overflowY: 'auto',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 12,
  lineHeight: '18px',
  whiteSpace: 'pre-wrap'
};

const LogDock = ({ title = '实时日志', logs = [], onClear, onHide, visible = true }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  if (!visible) return null;

  return (
    <div style={wrapperStyle}>
      <Card
        title={title}
        size="small"
        extra={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="small" onClick={onClear}>清空</Button>
            <Button size="small" onClick={onHide}>隐藏</Button>
          </div>
        }
      >
        <div ref={ref} style={logBoxStyle}>
          {logs.length === 0 ? '等待任务…' : logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </Card>
    </div>
  );
};

export default LogDock;


