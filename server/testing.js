const handleProceed = async () => {
  try {
    const response = await fetch('http://localhost:7839/handleOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error('Failed to send order data');
    }

    const responseData = await response.json();
  } catch (error) {
    console.error('Error sending order data:', error);
  }
};

handleProceed();