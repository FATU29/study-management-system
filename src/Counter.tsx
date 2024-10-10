// src/Counter.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './stores'
import { decrement, increment, incrementByAmount } from './stores/exampleCount'
import { incrementAsync } from './stores/exampleCount/actions'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const status = useSelector((state: RootState) => state.counter.status)
  const dispatch = useDispatch<AppDispatch>()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div>
        <button 
          onClick={() => dispatch(decrement())}
          style={{ marginRight: '10px' }}
        >
          -
        </button>
        <span>{count}</span>
        <button 
          onClick={() => dispatch(increment())}
          style={{ marginLeft: '10px' }}
        >
          +
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button 
          onClick={() => dispatch(incrementByAmount(incrementValue))}
          style={{ marginRight: '10px' }}
        >
          Add Amount
        </button>
        <button 
          onClick={() => dispatch(incrementAsync(incrementValue))}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading...' : 'Add Async'}
        </button>
      </div>
      {status === 'failed' && <div style={{ color: 'red', marginTop: '10px' }}>Error occurred</div>}
    </div>
  )
}