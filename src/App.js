import React, { useState, useEffect} from 'react';


const initialData = {
  expenses: [], // Empty array
  categories: [
    {id: 1, name: "Food", icon: "🍽️", color: "#00ff88", budget: 0},
    {id: 2, name: "Transportation", icon: "🚗", color: "#00d4ff", budget: 0},
    {id: 3, name: "Entertainment", icon: "🎬", color: "#8b5cf6", budget: 0},
    {id: 4, name: "Shopping", icon: "🛍️", color: "#f59e0b", budget: 0},
    {id: 5, name: "Health", icon: "⚕️", color: "#10b981", budget: 0},
    {id: 6, name: "Education", icon: "📚", color: "#ef4444", budget: 0},
    {id: 7, name: "Bills", icon: "💡", color: "#06b6d4", budget: 0}
  ],
  monthlyBudget: 0 // Start with 0
};

// Helper functions
const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN', {maximumFractionDigits: 2})}`;
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

// CUSTOM CONFIRMATION MODAL COMPONENT
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, icon = "⚠️", confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => {
  if (!isOpen) return null;

  const typeColors = {
    danger: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.3)',
      confirmBg: 'linear-gradient(45deg, #ef4444, #dc2626)',
      iconBg: 'rgba(239, 68, 68, 0.2)'
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.3)',
      confirmBg: 'linear-gradient(45deg, #f59e0b, #d97706)',
      iconBg: 'rgba(245, 158, 11, 0.2)'
    },
    info: {
      bg: 'rgba(0, 212, 255, 0.1)',
      border: 'rgba(0, 212, 255, 0.3)',
      confirmBg: 'linear-gradient(45deg, #00d4ff, #0ea5e9)',
      iconBg: 'rgba(0, 212, 255, 0.2)'
    }
  };

  const colors = typeColors[type];

  return (
    <div 
      className="modal active" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001,
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        className="modal-content glass-card" 
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(17, 17, 17, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border}`,
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          animation: 'slideIn 0.3s ease-out'
        }}
      >
        {/* Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: colors.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          margin: '0 auto 20px',
          border: `1px solid ${colors.border}`
        }}>
          {icon}
        </div>

        {/* Title */}
        <h3 style={{ 
          color: '#ffffff', 
          fontSize: '1.3rem', 
          fontWeight: '600', 
          marginBottom: '12px',
          margin: '0 0 12px 0',
          textShadow: '0 2px 4px rgba(0, 212, 255, 0.3)'
        }}>
          {title}
        </h3>

        {/* Message */}
        <p style={{ 
          color: '#e5e5e5', 
          fontSize: '0.95rem', 
          lineHeight: '1.5',
          marginBottom: '30px',
          margin: '0 0 30px 0'
        }}>
          {message}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            onClick={onClose}
            style={{ 
              flex: 1,
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={e => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
            onMouseOut={e => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            style={{ 
              flex: 1,
              padding: '12px 24px',
              background: colors.confirmBg,
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ onAddFirst, onLoadDemo }) => (
  <div style={{
    textAlign: 'center',
    padding: '60px 20px',
    color: '#a1a1aa'
  }}>
    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💰</div>
    <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '12px' }}>
      Welcome to Budget Smart!
    </h3>
    <p style={{ fontSize: '1rem', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
      Start your financial journey by adding your first transaction or try our demo data.
    </p>
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <button 
        onClick={onLoadDemo}
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #00d4ff, #8b5cf6)',
          border: 'none',
          borderRadius: '25px',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        📊 Try Demo Data
      </button>
      <button 
        onClick={onAddFirst}
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #00ff88, #10b981)',
          border: 'none',
          borderRadius: '25px',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        💸 Add Transaction
      </button>
    </div>
  </div>
);

// Stats Card Component
const StatCard = ({ icon, title, value, change, type, delay = 0 }) => (
  <div className={`stat-card glass-card fade-in`} style={{animationDelay: `${delay}s`}}>
    <div className={`stat-icon ${type}-icon`}>
      {icon}
    </div>
    <div className="stat-content">
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
      <span className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
    </div>
  </div>
);

// Transaction Item Component WITH EDIT BUTTON
const TransactionItem = ({ transaction, categories, onDelete, onEdit }) => {
  const category = categories.find(c => c.name === transaction.category);
  return (
    <div className="transaction-item" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      marginBottom: '12px',
      transition: 'all 0.2s ease'
    }}>
      <div 
        className="transaction-icon" 
        style={{ 
          backgroundColor: category?.color || '#666',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem'
        }}
      >
        {category?.icon || '💰'}
      </div>
      <div className="transaction-details" style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#ffffff' }}>
          {transaction.description}
        </h4>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#a1a1aa' }}>
          {formatDate(transaction.date)} • {transaction.category}
        </p>
      </div>
      <div 
        className={`transaction-amount ${transaction.type}`}
        style={{ 
          fontSize: '1.1rem', 
          fontWeight: '700',
          color: transaction.type === 'expense' ? '#ef4444' : '#00ff88'
        }}
      >
        {transaction.type === 'expense' ? '-' : '+'}
        {formatCurrency(transaction.amount)}
      </div>
      
      {/* Action Buttons - EDIT AND DELETE */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {onEdit && (
          <button 
            onClick={() => onEdit(transaction)}
            style={{
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '6px',
              color: '#00d4ff',
              padding: '6px 12px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            ✏️ Edit
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => onDelete(transaction.id)}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              color: '#ef4444',
              padding: '6px 12px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
};

// Simple Chart Component
const SimpleChart = ({ expenses, categories }) => {
  const expensesByCategory = categories.map(category => {
    const categoryExpenses = expenses
      .filter(e => e.category === category.name && e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      category: category.name,
      amount: categoryExpenses,
      color: category.color,
      percentage: 0
    };
  }).filter(item => item.amount > 0);

  const total = expensesByCategory.reduce((sum, item) => sum + item.amount, 0);
  expensesByCategory.forEach(item => {
    item.percentage = total > 0 ? (item.amount / total * 100).toFixed(1) : 0;
  });

  return (
    <div style={{ padding: '20px' }}>
      {expensesByCategory.length > 0 ? (
        <div>
          {expensesByCategory.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: item.color, 
                borderRadius: '50%',
                marginRight: '12px'
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '600' }}>
                  {item.category}
                </div>
                <div style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>
                  {formatCurrency(item.amount)} ({item.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#a1a1aa', 
          padding: '40px 0',
          fontSize: '0.9rem'
        }}>
          No expense data available
        </div>
      )}
    </div>
  );
};

// Circular Progress Component
const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = "#00d4ff" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.4))'
          }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '700' }}>
          {percentage.toFixed(1)}%
        </div>
        <div style={{ color: '#a1a1aa', fontSize: '0.7rem' }}>
          Used
        </div>
      </div>
    </div>
  );
};

// Expense Form Component (Add New)
const ExpenseForm = ({ isOpen, onClose, onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      onSubmit({
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now()
      });
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal active" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '24px', color: '#ffffff' }}>Add New Transaction</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                background: '#1a1a1a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Category</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
              marginTop: '12px'
            }}>
              {categories.map(category => (
                <div
                  key={category.id}
                  onClick={() => setFormData({...formData, category: category.name})}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 12px',
                    background: formData.category === category.name 
                      ? 'rgba(0, 212, 255, 0.1)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: formData.category === category.name 
                      ? '1px solid #00d4ff' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#e5e5e5' }}>
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Enter description"
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="submit" 
              style={{ 
                flex: 1,
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #00d4ff, #8b5cf6)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Add Transaction
            </button>
            <button 
              type="button" 
              onClick={onClose}
              style={{ 
                flex: 1,
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// EDIT FORM COMPONENT - NEW!
const EditExpenseForm = ({ isOpen, onClose, onUpdate, expense, categories }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
    type: 'expense'
  });

  // Load expense data when modal opens
  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount.toString(),
        category: expense.category,
        description: expense.description,
        date: expense.date,
        type: expense.type
      });
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      onUpdate({
        ...expense,
        ...formData,
        amount: parseFloat(formData.amount)
      });
      onClose();
    }
  };

  if (!isOpen || !expense) return null;

  return (
    <div className="modal active" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '24px', color: '#ffffff' }}>✏️ Edit Transaction</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                background: '#1a1a1a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Category</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
              marginTop: '12px'
            }}>
              {categories.map(category => (
                <div
                  key={category.id}
                  onClick={() => setFormData({...formData, category: category.name})}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 12px',
                    background: formData.category === category.name 
                      ? 'rgba(0, 212, 255, 0.1)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: formData.category === category.name 
                      ? '1px solid #00d4ff' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#e5e5e5' }}>
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Enter description"
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e5e5e5'
            }}>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="submit" 
              style={{ 
                flex: 1,
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #00ff88, #10b981)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ✏️ Update Transaction
            </button>
            <button 
              type="button" 
              onClick={onClose}
              style={{ 
                flex: 1,
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [expenses, setExpenses] = useState(initialData.expenses);
  const [categories, setCategories] = useState(initialData.categories);
  const [monthlyBudget, setMonthlyBudget] = useState(initialData.monthlyBudget);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // NEW STATES FOR EDIT FUNCTIONALITY
  const [editExpense, setEditExpense] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  // NEW STATE FOR CUSTOM CONFIRMATION MODAL
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    icon: '⚠️',
    type: 'danger',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  });

  // Demo data loader
  const loadDemoData = () => {
    const demoExpenses = [
      {id: 1, amount: 450, category: "Food", description: "Lunch at restaurant", date: "2025-08-21", type: "expense"},
      {id: 2, amount: 280, category: "Transportation", description: "Metro/Bus pass", date: "2025-08-20", type: "expense"},
      {id: 3, amount: 25000, category: "Income", description: "Part-time salary", date: "2025-08-19", type: "income"},
      {id: 4, amount: 800, category: "Entertainment", description: "Movie + dinner", date: "2025-08-18", type: "expense"},
      {id: 5, amount: 300, category: "Food", description: "Weekly groceries", date: "2025-08-17", type: "expense"},
      {id: 6, amount: 1500, category: "Shopping", description: "Clothes", date: "2025-08-16", type: "expense"},
      {id: 7, amount: 150, category: "Food", description: "Coffee", date: "2025-08-15", type: "expense"},
      {id: 8, amount: 2000, category: "Bills", description: "Electricity bill", date: "2025-08-14", type: "expense"}
    ];
    
    const demoCategories = [
      {id: 1, name: "Food", icon: "🍽️", color: "#00ff88", budget: 8000},
      {id: 2, name: "Transportation", icon: "🚗", color: "#00d4ff", budget: 3000},
      {id: 3, name: "Entertainment", icon: "🎬", color: "#8b5cf6", budget: 2000},
      {id: 4, name: "Shopping", icon: "🛍️", color: "#f59e0b", budget: 5000},
      {id: 5, name: "Health", icon: "⚕️", color: "#10b981", budget: 2000},
      {id: 6, name: "Education", icon: "📚", color: "#ef4444", budget: 3000},
      {id: 7, name: "Bills", icon: "💡", color: "#06b6d4", budget: 5000}
    ];

    setExpenses(demoExpenses);
    setCategories(demoCategories);
    setMonthlyBudget(25000);
    setIsDemoMode(true);
    
    // Toast notification
    const toast = document.createElement('div');
    toast.textContent = 'Demo data loaded! 🎉';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 212, 255, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 2000;
    `;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  // UPDATED clearAllData function - with custom confirmation modal
  const clearAllData = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear All Data',
      message: 'This will permanently delete all your transactions, budgets, and settings. This action cannot be undone.',
      icon: '🗑️',
      type: 'danger',
      confirmText: 'Clear All',
      cancelText: 'Cancel',
      onConfirm: () => {
        setExpenses([]);
        setCategories(initialData.categories);
        setMonthlyBudget(0);
        setIsDemoMode(false);
        setConfirmModal({ ...confirmModal, isOpen: false });
        
        // Success toast
        const toast = document.createElement('div');
        toast.textContent = 'All data cleared! 🗑️';
        toast.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 2000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
      }
    });
  };

  // Calculate stats
  const totalIncome = expenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);
  
  const totalExpenses = expenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  const budgetLeft = monthlyBudget - totalExpenses;

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    // Toast notification
    const toast = document.createElement('div');
    toast.textContent = 'Transaction added successfully!';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 255, 136, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 2000;
    `;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  // UPDATED handleDeleteExpense function - with custom confirmation modal
  const handleDeleteExpense = (id) => {
    const transaction = expenses.find(e => e.id === id);
    
    setConfirmModal({
      isOpen: true,
      title: 'Delete Transaction',
      message: transaction 
        ? `Are you sure you want to delete "${transaction.description}" (${formatCurrency(transaction.amount)})?`
        : 'Are you sure you want to delete this transaction?',
      icon: '🗑️',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        setExpenses(expenses.filter(e => e.id !== id));
        setConfirmModal({ ...confirmModal, isOpen: false });
        
        // Success toast
        const toast = document.createElement('div');
        toast.textContent = '🗑️ Transaction deleted successfully!';
        toast.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 2000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
      }
    });
  };

  // NEW EDIT HANDLERS
  const handleEditExpense = (expense) => {
    setEditExpense(expense);
    setIsEditFormOpen(true);
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e));
    setIsEditFormOpen(false);
    setEditExpense(null);
    
    // Toast notification
    const toast = document.createElement('div');
    toast.textContent = 'Transaction updated successfully! ✏️';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 255, 136, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 2000;
    `;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const recentTransactions = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Render different views
  const renderContent = () => {
    switch(currentView) {
      case 'expenses':
        return (
          <div className="glass-card">
            <h2 style={{ color: '#ffffff', marginBottom: '24px' }}>All Transactions</h2>
            
            {/* Search and Filter */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  padding: '12px',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  minWidth: '150px'
                }}
              >
                <option value="" style={{ background: '#1a1a1a', color: '#ffffff' }}>
                  All Categories
                </option>
                {categories.map(cat => (
                  <option 
                    key={cat.id} 
                    value={cat.name}
                    style={{ background: '#1a1a1a', color: '#ffffff' }}
                  >
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Transactions List WITH EDIT */}
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    categories={categories}
                    onDelete={handleDeleteExpense}
                    onEdit={handleEditExpense} // NEW: Edit handler
                  />
                ))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  color: '#a1a1aa', 
                  padding: '40px 0',
                  fontSize: '0.9rem'
                }}>
                  No transactions found
                </div>
              )}
            </div>
          </div>
        );

      case 'budget':
        return (
          <div>
            {/* Overall Budget Overview */}
            <div className="glass-card" style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#ffffff', marginBottom: '24px', textAlign: 'center' }}>
                💰 Monthly Budget Overview
              </h2>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '40px',
                marginBottom: '30px' 
              }}>
                {/* Overall Budget Progress */}
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress 
                    percentage={monthlyBudget > 0 ? Math.min((totalExpenses / monthlyBudget) * 100, 100) : 0}
                    size={140}
                    strokeWidth={12}
                    color={budgetLeft >= 0 ? "#00ff88" : "#ef4444"}
                  />
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '600' }}>
                      Overall Budget
                    </div>
                    <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
                      {formatCurrency(totalExpenses)} / {formatCurrency(monthlyBudget)}
                    </div>
                  </div>
                </div>

                {/* Budget Statistics */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                  minWidth: '300px'
                }}>
                  <div style={{ 
                    padding: '20px', 
                    background: 'rgba(0, 255, 136, 0.1)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    textAlign: 'center' 
                  }}>
                    <div style={{ color: '#00ff88', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Remaining
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '700' }}>
                      {formatCurrency(Math.max(budgetLeft, 0))}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '20px', 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    textAlign: 'center' 
                  }}>
                    <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Spent
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '700' }}>
                      {formatCurrency(totalExpenses)}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '20px', 
                    background: 'rgba(0, 212, 255, 0.1)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    textAlign: 'center' 
                  }}>
                    <div style={{ color: '#00d4ff', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Daily Average
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '700' }}>
                      {formatCurrency(totalExpenses / 30)}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '20px', 
                    background: 'rgba(139, 92, 246, 0.1)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    textAlign: 'center' 
                  }}>
                    <div style={{ color: '#8b5cf6', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Savings Rate
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '700' }}>
                      {totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Budget Breakdown */}
            <div className="glass-card">
              <h3 style={{ color: '#ffffff', marginBottom: '24px', textAlign: 'center' }}>
                📊 Category-wise Budget Breakdown
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px' 
              }}>
                {categories.map(category => {
                  const spent = expenses
                    .filter(e => e.category === category.name && e.type === 'expense')
                    .reduce((sum, e) => sum + e.amount, 0);
                  const percentage = category.budget > 0 ? (spent / category.budget) * 100 : 0;
                  const remaining = category.budget - spent;
                  
                  return (
                    <div key={category.id} style={{
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Background gradient */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                        borderRadius: '16px 16px 0 0'
                      }}></div>

                      {/* Category Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: `linear-gradient(45deg, ${category.color}20, ${category.color}40)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          {category.icon}
                        </div>
                        <div>
                          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '600', margin: '0 0 4px 0' }}>
                            {category.name}
                          </h4>
                          <p style={{ color: '#a1a1aa', fontSize: '0.85rem', margin: 0 }}>
                            Budget: {formatCurrency(category.budget)}
                          </p>
                        </div>
                      </div>

                      {/* Progress Circle and Stats */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Mini circular progress */}
                        <CircularProgress 
                          percentage={Math.min(percentage, 100)}
                          size={80}
                          strokeWidth={6}
                          color={percentage > 100 ? "#ef4444" : category.color}
                        />

                        {/* Stats */}
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '12px' 
                          }}>
                            <span style={{ color: '#e5e5e5', fontSize: '0.9rem' }}>Spent</span>
                            <span style={{ 
                              color: percentage > 100 ? '#ef4444' : '#ffffff', 
                              fontSize: '1rem', 
                              fontWeight: '600' 
                            }}>
                              {formatCurrency(spent)}
                            </span>
                          </div>
                          
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '12px' 
                          }}>
                            <span style={{ color: '#e5e5e5', fontSize: '0.9rem' }}>Remaining</span>
                            <span style={{ 
                              color: remaining >= 0 ? '#00ff88' : '#ef4444', 
                              fontSize: '1rem', 
                              fontWeight: '600' 
                            }}>
                              {formatCurrency(Math.max(remaining, 0))}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status indicator */}
                      {percentage > 100 && (
                        <div style={{
                          marginTop: '16px',
                          padding: '8px 12px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          borderRadius: '8px',
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          textAlign: 'center'
                        }}>
                          ⚠️ Over Budget by {formatCurrency(spent - category.budget)}
                        </div>
                      )}
                      
                      {percentage > 80 && percentage <= 100 && (
                        <div style={{
                          marginTop: '16px',
                          padding: '8px 12px',
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.2)',
                          borderRadius: '8px',
                          color: '#f59e0b',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          textAlign: 'center'
                        }}>
                          ⚡ {(100 - percentage).toFixed(1)}% budget remaining
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div>
            <div className="glass-card" style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>📈 Expense Analytics</h2>
              <SimpleChart expenses={expenses} categories={categories} />
            </div>
            
            <div className="glass-card">
              <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>📊 Spending Insights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                  <div style={{ color: '#00ff88', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Average Daily Spending
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700' }}>
                    {formatCurrency(totalExpenses / 30)}
                  </div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
                  <div style={{ color: '#00d4ff', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Total Transactions
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700' }}>
                    {expenses.length}
                  </div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <div style={{ color: '#8b5cf6', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Largest Expense
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700' }}>
                    {expenses.filter(e => e.type === 'expense').length > 0 
                      ? formatCurrency(Math.max(...expenses.filter(e => e.type === 'expense').map(e => e.amount)))
                      : formatCurrency(0)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: // dashboard
        // Show empty state if no expenses
        if (expenses.length === 0) {
          return <EmptyState 
            onAddFirst={() => setIsFormOpen(true)} 
            onLoadDemo={loadDemoData}
          />;
        }
        
        return (
          <div className="dashboard-content">
            {/* Chart */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '20px', color: '#ffffff' }}>
                📊 Expense Categories
              </h3>
              <SimpleChart 
                expenses={expenses} 
                categories={categories} 
              />
            </div>

            {/* Recent Transactions WITH EDIT */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '20px', color: '#ffffff' }}>
                🕐 Recent Transactions
              </h3>
              <div className="recent-transactions" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      categories={categories}
                      onDelete={handleDeleteExpense}
                      onEdit={handleEditExpense} // NEW: Edit handler
                    />
                  ))
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#a1a1aa', 
                    padding: '40px 0',
                    fontSize: '0.9rem'
                  }}>
                    No transactions yet. Add your first expense!
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {/* Background Elements */}
      <div className="bg-gradient"></div>
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">💰 Budget Smart</h1>
            <nav className="nav">
              <button 
                className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`nav-btn ${currentView === 'expenses' ? 'active' : ''}`}
                onClick={() => setCurrentView('expenses')}
              >
                Expenses
              </button>
              <button 
                className={`nav-btn ${currentView === 'budget' ? 'active' : ''}`}
                onClick={() => setCurrentView('budget')}
              >
                Budget
              </button>
              <button 
                className={`nav-btn ${currentView === 'analytics' ? 'active' : ''}`}
                onClick={() => setCurrentView('analytics')}
              >
                Analytics
              </button>
            </nav>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn btn--primary"
                onClick={() => setIsFormOpen(true)}
              >
                <span className="btn-icon">+</span>
                Add Expense
              </button>
              
              {expenses.length > 0 && (
                <button 
                  onClick={clearAllData}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid #ef4444',
                    borderRadius: '25px',
                    color: '#ef4444',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="dashboard-grid">
          {/* Stats Cards - Show only if there's data */}
          {expenses.length > 0 && (
            <div className="stats-grid">
              <StatCard
                icon="💰"
                title="Total Income"
                value={formatCurrency(totalIncome)}
                change={5.2}
                type="income"
                delay={0.1}
              />
              <StatCard
                icon="💸"
                title="Total Expenses"
                value={formatCurrency(totalExpenses)}
                change={-2.1}
                type="expense"
                delay={0.2}
              />
              <StatCard
                icon="💵"
                title="Balance"
                value={formatCurrency(balance)}
                change={balance >= 0 ? 8.3 : -12.5}
                type="balance"
                delay={0.3}
              />
              <StatCard
                icon="🎯"
                title="Budget Left"
                value={formatCurrency(budgetLeft)}
                change={0}
                type="balance"
                delay={0.4}
              />
            </div>
          )}

          {/* Dynamic Content Based on View */}
          {renderContent()}
        </div>
      </main>

      {/* Add Expense Form Modal */}
      <ExpenseForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddExpense}
        categories={categories}
      />

      {/* NEW: Edit Expense Form Modal */}
      <EditExpenseForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setEditExpense(null);
        }}
        onUpdate={handleUpdateExpense}
        expense={editExpense}
        categories={categories}
      />

      {/* Custom Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        icon={confirmModal.icon}
        type={confirmModal.type}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
      />
    </div>
  );
}

export default App;
