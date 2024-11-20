import './App.css';
import {useState} from 'react';

function App() {
 const [money, setMoney] = useState('')
 const editMoney = (e) => {
  setMoney(e.target.value)
 }
  const paymentBody = {
    amount: money*100,
    currency: 'INR',
    accept_partial: true,
    first_min_partial_amount: 100,
    expire_by: Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000),
    reference_id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
    description: 'Payment for policy no #23456',
    customer: {
      name: 'Gaurav Kumar',
      contact: '+919000090000',
      email: 'gaurav.kumar@example.com',
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
    notes: {
      policy_name: 'Jeevan Bima',
    },
    callback_url: 'https://magicpayment.vercel.app/',
    callback_method: 'get',
  };

  const makePayment = async () => {
    try {
      const response = await fetch('https://backendrxpay.vercel.app/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentBody),
      });

      const data = await response.json();
      window.open(data.short_url, '_blank');
      console.log('Payment Link Created:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="App">
      <h1>Please make your payment</h1>
      <input type='number' value={money} onChange={editMoney} style ={{margin: '10px'}} ></input>
      <br/>
      <button onClick={makePayment} style ={{margin: '10px'}} disabled={money<1}>Make a Payment</button>
      <br/>
      <p1>created  by shailvi </p1>
    </div>
  );
}

export default App;
