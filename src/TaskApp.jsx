import React, { useState, useEffect } from 'react';

const DAYS_JP = ['日', '月', '火', '水', '木', '金', '土'];

// アイコンコンポーネント
const Icons = {
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  History: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>
    </svg>
  ),
  Back: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
};

const COLORS = ['#4A90D9', '#D97B4A', '#7AD94A', '#D94A7A', '#9B4AD9', '#D94A4A', '#4AD9D9', '#D9D94A'];

// 初期データ
const getInitialData = () => {
  const saved = localStorage.getItem('kidTaskAppV2');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data');
    }
  }
  
  return {
    // タスクのマスターリスト
    tasks: [
      { id: 1, name: 'しゅくだい', duration: 30, color: '#4A90D9' },
      { id: 2, name: 'ピアノ', duration: 20, color: '#D97B4A' },
      { id: 3, name: 'どくしょ', duration: 15, color: '#7AD94A' },
      { id: 4, name: 'かたづけ', duration: 10, color: '#D94A7A' },
      { id: 5, name: 'ゲーム', duration: 30, color: '#9B4AD9' },
      { id: 6, name: 'YouTube', duration: 20, color: '#D94A4A' },
    ],
    // 曜日ごとの設定 (0=日曜, 1=月曜, ...)
    weeklySchedule: {
      0: { time: 120, required: [1, 3], optional: [5, 6] },  // 日曜
      1: { time: 90, required: [1, 2, 3], optional: [5] },   // 月曜
      2: { time: 90, required: [1, 3, 4], optional: [5] },   // 火曜
      3: { time: 90, required: [1, 2, 3], optional: [5] },   // 水曜
      4: { time: 90, required: [1, 3, 4], optional: [5] },   // 木曜
      5: { time: 120, required: [1, 2], optional: [5, 6] },  // 金曜
      6: { time: 120, required: [1, 3], optional: [5, 6] },  // 土曜
    },
    history: [],
  };
};

export default function TaskApp() {
  const [data, setData] = useState(getInitialData);
  const [view, setView] = useState('today');
  const [selectedDay, setSelectedDay] = useState(null);
  const [todayCompleted, setTodayCompleted] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);

  // データをlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('kidTaskAppV2', JSON.stringify(data));
  }, [data]);

  // 今日の曜日を取得
  const today = new Date();
  const dayOfWeek = today.getDay();
  const todaySchedule = data.weeklySchedule[dayOfWeek];
  const todayTime = todaySchedule.time;

  // 今日のタスクを取得
  const getTodayTasks = (type) => {
    const taskIds = type === 'required' ? todaySchedule.required : todaySchedule.optional;
    return taskIds.map(id => data.tasks.find(t => t.id === id)).filter(Boolean);
  };

  const requiredTasks = getTodayTasks('required');
  const optionalTasks = getTodayTasks('optional');

  // 使った時間を計算
  const usedTime = Object.entries(todayCompleted).reduce((sum, [id, done]) => {
    if (done) {
      const task = data.tasks.find(t => t.id === parseInt(id));
      return sum + (task?.duration || 0);
    }
    return sum;
  }, 0);

  const remainingTime = todayTime - usedTime;

  // 今日の記録を保存
  const saveToday = () => {
    const completedTasks = Object.entries(todayCompleted)
      .filter(([_, done]) => done)
      .map(([id]) => {
        const task = data.tasks.find(t => t.id === parseInt(id));
        return { name: task.name, duration: task.duration };
      });

    if (completedTasks.length > 0) {
      const record = {
        date: today.toISOString().split('T')[0],
        dayOfWeek,
        totalTime: usedTime,
        availableTime: todayTime,
        tasks: completedTasks,
      };

      setData(prev => ({
        ...prev,
        history: [record, ...prev.history.slice(0, 29)]
      }));
    }

    setTodayCompleted({});
  };

  // タスクを追加
  const addTask = (task) => {
    setData(prev => ({
      ...prev,
      tasks: [...prev.tasks, { ...task, id: Date.now() }]
    }));
    setShowAddTask(false);
  };

  // タスクを更新
  const updateTask = (id, updates) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
    setEditingTask(null);
  };

  // タスクを削除
  const deleteTask = (id) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id),
      weeklySchedule: Object.fromEntries(
        Object.entries(prev.weeklySchedule).map(([day, schedule]) => [
          day,
          {
            ...schedule,
            required: schedule.required.filter(taskId => taskId !== id),
            optional: schedule.optional.filter(taskId => taskId !== id),
          }
        ])
      )
    }));
    setEditingTask(null);
  };

  // 曜日のスケジュールを更新
  const updateDaySchedule = (day, updates) => {
    setData(prev => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: { ...prev.weeklySchedule[day], ...updates }
      }
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 100%)',
      fontFamily: '"Zen Maru Gothic", "Hiragino Kaku Gothic ProN", sans-serif',
      padding: '16px',
      maxWidth: '500px',
      margin: '0 auto',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap" rel="stylesheet" />
      
      {/* ヘッダー */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingTop: '8px',
      }}>
        {view !== 'today' ? (
          <button
            onClick={() => { setView('today'); setSelectedDay(null); }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#64748B',
              fontSize: '15px',
            }}
          >
            <Icons.Back /> もどる
          </button>
        ) : (
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
            きょうのタスク
          </div>
        )}
        
        {view === 'today' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setView('tasks')}
              style={{
                background: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                color: '#64748B',
              }}
              title="タスク管理"
            >
              <Icons.Settings />
            </button>
            <button
              onClick={() => setView('weekly')}
              style={{
                background: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                color: '#64748B',
              }}
              title="曜日設定"
            >
              <Icons.Calendar />
            </button>
            <button
              onClick={() => setView('history')}
              style={{
                background: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                color: '#64748B',
              }}
              title="履歴"
            >
              <Icons.History />
            </button>
          </div>
        )}
      </header>

      {/* 今日の画面 */}
      {view === 'today' && (
        <div>
          {/* 今日の情報 */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '4px' }}>
                  {today.getMonth() + 1}月{today.getDate()}日（{DAYS_JP[dayOfWeek]}）
                </div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>
                  のこり {remainingTime}分
                </div>
              </div>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: `conic-gradient(#4ADE80 ${(usedTime / todayTime) * 360}deg, #E2E8F0 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#4ADE80',
                }}>
                  {Math.round((usedTime / todayTime) * 100)}%
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              fontSize: '13px',
              color: '#64748B',
            }}>
              <div>つかえる時間: {todayTime}分</div>
              <div>つかった時間: {usedTime}分</div>
            </div>
          </div>

          {/* 必須タスク */}
          {requiredTasks.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                color: '#475569',
                fontWeight: '500',
              }}>
                <Icons.Star />
                かならずやること
              </div>
              
              {requiredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  completed={todayCompleted[task.id]}
                  onToggle={() => setTodayCompleted(prev => ({
                    ...prev,
                    [task.id]: !prev[task.id]
                  }))}
                />
              ))}
            </div>
          )}

          {/* 余裕タスク */}
          {optionalTasks.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                color: '#475569',
                fontWeight: '500',
              }}>
                <Icons.Clock />
                じかんがあったら
              </div>
              
              {optionalTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  completed={todayCompleted[task.id]}
                  onToggle={() => setTodayCompleted(prev => ({
                    ...prev,
                    [task.id]: !prev[task.id]
                  }))}
                  disabled={!todayCompleted[task.id] && remainingTime < task.duration}
                />
              ))}
            </div>
          )}

          {requiredTasks.length === 0 && optionalTasks.length === 0 && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              color: '#94A3B8',
            }}>
              今日のタスクがありません<br />
              <button
                onClick={() => setView('weekly')}
                style={{
                  marginTop: '12px',
                  background: '#4ADE80',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                曜日設定を開く
              </button>
            </div>
          )}

          {/* 保存ボタン */}
          {Object.values(todayCompleted).some(v => v) && (
            <button
              onClick={saveToday}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)',
              }}
            >
              きょうのきろくをほぞん ✓
            </button>
          )}
        </div>
      )}

      {/* タスク管理画面 */}
      {view === 'tasks' && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '20px' }}>
            タスクいちらん
          </h2>
          
          {data.tasks.map(task => (
            <div
              key={task.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: task.color,
                }} />
                <div>
                  <div style={{ fontWeight: '500', color: '#1E293B' }}>{task.name}</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                    {task.duration}分
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditingTask(task)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                <Icons.Edit />
              </button>
            </div>
          ))}

          <button
            onClick={() => setShowAddTask(true)}
            style={{
              width: '100%',
              padding: '16px',
              background: 'white',
              border: '2px dashed #CBD5E1',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <Icons.Plus /> あたらしいタスク
          </button>
        </div>
      )}

      {/* 曜日設定画面 */}
      {view === 'weekly' && selectedDay === null && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '20px' }}>
            ようびごとの せってい
          </h2>
          
          {[1, 2, 3, 4, 5, 6, 0].map(day => {
            const schedule = data.weeklySchedule[day];
            const dayTasks = [...schedule.required, ...schedule.optional]
              .map(id => data.tasks.find(t => t.id === id))
              .filter(Boolean);
            
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  marginBottom: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontWeight: '600',
                    color: day === 0 || day === 6 ? '#F97316' : '#1E293B',
                    fontSize: '16px',
                  }}>
                    {DAYS_JP[day]}ようび
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{schedule.time}分</span>
                    <Icons.ChevronDown />
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {dayTasks.length > 0 ? dayTasks.map(task => (
                    <span
                      key={task.id}
                      style={{
                        background: task.color + '20',
                        color: task.color,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {task.name}
                    </span>
                  )) : (
                    <span style={{ color: '#94A3B8', fontSize: '13px' }}>タスクなし</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 曜日詳細設定画面 */}
      {view === 'weekly' && selectedDay !== null && (
        <DayScheduleEditor
          day={selectedDay}
          schedule={data.weeklySchedule[selectedDay]}
          tasks={data.tasks}
          onUpdate={(updates) => updateDaySchedule(selectedDay, updates)}
          onBack={() => setSelectedDay(null)}
        />
      )}

      {/* 履歴画面 */}
      {view === 'history' && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '20px' }}>
            これまでのきろく
          </h2>
          
          {data.history.length === 0 ? (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              color: '#94A3B8',
            }}>
              まだきろくがありません
            </div>
          ) : (
            data.history.map((record, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}>
                  <div style={{ fontWeight: '600', color: '#1E293B' }}>
                    {record.date} ({DAYS_JP[record.dayOfWeek]})
                  </div>
                  <div style={{
                    background: record.totalTime >= record.availableTime * 0.8 ? '#DCFCE7' : '#FEF3C7',
                    color: record.totalTime >= record.availableTime * 0.8 ? '#16A34A' : '#D97706',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}>
                    {record.totalTime}分 / {record.availableTime}分
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {record.tasks.map((task, j) => (
                    <span
                      key={j}
                      style={{
                        background: '#F1F5F9',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#475569',
                      }}
                    >
                      {task.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* タスク編集モーダル */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onSave={(updates) => updateTask(editingTask.id, updates)}
          onDelete={() => deleteTask(editingTask.id)}
          onClose={() => setEditingTask(null)}
        />
      )}

      {/* タスク追加モーダル */}
      {showAddTask && (
        <TaskModal
          onSave={addTask}
          onClose={() => setShowAddTask(false)}
        />
      )}
    </div>
  );
}

// 曜日スケジュール編集コンポーネント
function DayScheduleEditor({ day, schedule, tasks, onUpdate, onBack }) {
  const [time, setTime] = useState(schedule.time);
  const [required, setRequired] = useState(schedule.required);
  const [optional, setOptional] = useState(schedule.optional);

  const handleSave = () => {
    onUpdate({ time, required, optional });
    onBack();
  };

  const toggleTask = (taskId, type) => {
    if (type === 'required') {
      if (required.includes(taskId)) {
        setRequired(required.filter(id => id !== taskId));
      } else {
        setRequired([...required, taskId]);
        setOptional(optional.filter(id => id !== taskId));
      }
    } else {
      if (optional.includes(taskId)) {
        setOptional(optional.filter(id => id !== taskId));
      } else {
        setOptional([...optional, taskId]);
        setRequired(required.filter(id => id !== taskId));
      }
    }
  };

  const getTaskStatus = (taskId) => {
    if (required.includes(taskId)) return 'required';
    if (optional.includes(taskId)) return 'optional';
    return 'none';
  };

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '20px' }}>
        {DAYS_JP[day]}ようびの せってい
      </h2>

      {/* 時間設定 */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      }}>
        <div style={{ marginBottom: '12px', fontWeight: '500', color: '#475569' }}>
          つかえる時間: {time}分
        </div>
        <input
          type="range"
          min="30"
          max="180"
          step="10"
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value))}
          style={{
            width: '100%',
            accentColor: '#4ADE80',
          }}
        />
      </div>

      {/* タスク選択 */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      }}>
        <div style={{ marginBottom: '16px', fontWeight: '500', color: '#475569' }}>
          タスクをえらぶ
        </div>
        <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>
          タップで切りかえ: なし → かならず → よゆう → なし
        </div>

        {tasks.map(task => {
          const status = getTaskStatus(task.id);
          return (
            <div
              key={task.id}
              onClick={() => {
                if (status === 'none') toggleTask(task.id, 'required');
                else if (status === 'required') toggleTask(task.id, 'optional');
                else setOptional(optional.filter(id => id !== task.id));
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '12px',
                cursor: 'pointer',
                background: status === 'none' ? '#F8FAFC' : 
                           status === 'required' ? '#DCFCE7' : '#FEF3C7',
                border: status === 'none' ? '2px solid #E2E8F0' :
                        status === 'required' ? '2px solid #4ADE80' : '2px solid #F59E0B',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: task.color,
                }} />
                <span style={{ fontWeight: '500' }}>{task.name}</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>{task.duration}分</span>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: status === 'none' ? '#94A3B8' :
                       status === 'required' ? '#16A34A' : '#D97706',
              }}>
                {status === 'none' ? 'なし' : status === 'required' ? 'かならず' : 'よゆう'}
              </span>
            </div>
          );
        })}
      </div>

      {/* 保存ボタン */}
      <button
        onClick={handleSave}
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)',
        }}
      >
        ほぞんする
      </button>
    </div>
  );
}

// タスクアイテムコンポーネント
function TaskItem({ task, completed, onToggle, disabled }) {
  return (
    <div
      onClick={disabled ? undefined : onToggle}
      style={{
        background: completed ? task.color + '15' : 'white',
        borderRadius: '16px',
        padding: '16px 20px',
        marginBottom: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        border: completed ? `2px solid ${task.color}` : '2px solid transparent',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          border: `2px solid ${completed ? task.color : '#CBD5E1'}`,
          background: completed ? task.color : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          transition: 'all 0.2s ease',
        }}>
          {completed && <Icons.Check />}
        </div>
        <div>
          <div style={{
            fontWeight: '600',
            color: '#1E293B',
            textDecoration: completed ? 'line-through' : 'none',
          }}>
            {task.name}
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#94A3B8',
        fontSize: '14px',
      }}>
        <Icons.Clock />
        {task.duration}分
      </div>
    </div>
  );
}

// タスク編集/追加モーダル
function TaskModal({ task, onSave, onDelete, onClose }) {
  const [name, setName] = useState(task?.name || '');
  const [duration, setDuration] = useState(task?.duration || 15);
  const [color, setColor] = useState(task?.color || '#4A90D9');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name, duration, color });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 1000,
    }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '24px 24px 0 0',
          padding: '24px',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1E293B' }}>
          {task ? 'タスクをへんしゅう' : 'あたらしいタスク'}
        </h3>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500' }}>
            なまえ
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="タスクのなまえ"
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #E2E8F0',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '500' }}>
            じかん: {duration}分
          </label>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={duration}
            onChange={e => setDuration(parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: color,
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '12px', color: '#475569', fontWeight: '500' }}>
            いろ
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: c,
                  border: color === c ? '3px solid #1E293B' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  transform: color === c ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {task && onDelete && (
            <button
              onClick={onDelete}
              style={{
                padding: '14px',
                background: '#FEE2E2',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                color: '#DC2626',
              }}
            >
              <Icons.Trash />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px',
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#64748B',
            }}
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            style={{
              flex: 1,
              padding: '14px',
              background: name.trim() ? 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)' : '#E2E8F0',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              color: 'white',
            }}
          >
            ほぞん
          </button>
        </div>
      </div>
    </div>
  );
}
