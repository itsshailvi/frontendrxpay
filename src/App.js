import './App.css';

function App() {
  const paymentBody = {
    amount: 15000,
    currency: 'INR',
    accept_partial: true,
    first_min_partial_amount: 100,
    expire_by: 1732060800,
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
    callback_url: 'http://localhost:3000',
    callback_method: 'get',
  };

  const makePayment = async () => {
    try {
      const response = await fetch('http://localhost:3300/create-payment-link', {
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
      <button onClick={makePayment}>Make a Payment</button>
    </div>
  );
}

export default App;
